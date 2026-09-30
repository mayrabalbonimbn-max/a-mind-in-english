import { describe, it, expect, afterAll, afterEach, vi } from 'vitest';
import request from 'supertest';

// Any request the real OpenAI client could make lands here: the suite proves nothing leaves the machine.
const network: string[] = [];
vi.stubGlobal('fetch', async (url: any) => { network.push(String(url)); return new Response('{}', { status: 500 }); });

import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config, learningReviewConfigStatus } from '../src/config';
import { allModels } from './helpers/aiModels';
import { loadApp } from './helpers/appHarness';
import { loadSyncClient } from './helpers/browserSync';
import { __setStructuredCallForTests, AiRequestError, isAiAvailable } from '../src/services/ai/provider';
import { activityIndex } from '../src/services/learningReview/evidence';
import { getAccumulatedStudyMinutes, learningReviewStatus, runLearningReview } from '../src/services/learningReview/pipeline';
import { nightly } from '../src/cli/nightlyLearningReview';
import { getUnit } from '../src/services/content';

const ST = require('../public/study-timer.js');
const MIN = 60_000;
const T0 = Date.parse('2026-09-28T09:00:00.000Z');
const clone = (x: any) => JSON.parse(JSON.stringify(x));

/** A learner who studies for `minutes`, the app open throughout, confirming each check-in. */
function studyFor(minutes: number, start = T0) {
  const study = ST.normalize({});
  ST.start(study, start);
  for (let m = 1; m <= minutes; m++) {
    const now = start + m * MIN;
    if (ST.checkInDue(study, now)) ST.confirm(study, now);          // the learner answers "yes, keep counting"
    expect(ST.reconcile(study, now, true)).toBeNull();
  }
  const r = ST.stop(study, start + minutes * MIN);
  return { study, r };
}

/* ── Study Timer rules (public/study-timer.js, shared by browser and server) ── */
describe('Study Timer · rules: manual, no maximum, abandoned sessions end at the last reliable moment', () => {
  it('1–2. manual start and manual pause record one real session', () => {
    const s = ST.normalize({});
    ST.start(s, T0);
    expect(s.activeSession).toMatchObject({ startedAt: new Date(T0).toISOString() });
    for (let m = 1; m < 25; m++) ST.reconcile(s, T0 + m * MIN, true);   // the app is open: heartbeat
    const r = ST.stop(s, T0 + 25 * MIN);
    expect(r.reason).toBe('manual');
    expect(s.activeSession).toBeNull();
    expect(s.sessions).toEqual([expect.objectContaining({ durationSeconds: 25 * 60, endReason: 'manual' })]);
  });

  it('6. several sessions on the same day are all kept', () => {
    const s = ST.normalize({});
    for (const [a, b] of [[0, 20], [60, 85], [180, 200]]) {
      ST.start(s, T0 + a * MIN);
      for (let m = a + 1; m < b; m++) ST.reconcile(s, T0 + m * MIN, true);
      ST.stop(s, T0 + b * MIN);
    }
    expect(s.sessions).toHaveLength(3);
    expect(ST.secondsSince(s, null, T0 + 300 * MIN)).toBe((20 + 25 + 20) * 60);
  });

  it.each([150, 270, 360])('7–9. a legitimate %i-minute session is preserved in full (no arbitrary cap)', (minutes) => {
    const { study, r } = studyFor(minutes);
    expect(r.reason).toBe('manual');
    expect(study.sessions[0].durationSeconds).toBe(minutes * 60);
    expect(ST.secondsSince(study, null, T0 + 24 * 60 * MIN)).toBe(minutes * 60);
  });

  it('9. the rules module has no maximum session length', () => {
    const src = require('fs').readFileSync(require('path').resolve(__dirname, '../public/study-timer.js'), 'utf8');
    expect(src).not.toMatch(/MAX_STUDY|14400|4 \* 60 \* 60|capped/);
  });

  it('10a. the app closed with the timer on: the session ends at the last heartbeat, not when reopened', () => {
    const s = ST.normalize({});
    ST.start(s, T0);
    for (let m = 1; m <= 40; m++) ST.reconcile(s, T0 + m * MIN, true);
    const r = ST.reconcile(s, T0 + 40 * MIN + 3 * 60 * MIN, true);   // reopened three hours later
    expect(r.reason).toBe('stale');
    expect(s.activeSession).toBeNull();
    expect(s.sessions[0].durationSeconds).toBe(40 * 60);
    expect(r.uncountedSeconds).toBe(3 * 60 * 60);
  });

  it('10b. an open tab left running cannot count indefinitely: an unanswered check-in ends it where it was asked', () => {
    const s = ST.normalize({});
    ST.start(s, T0);
    let r: any = null;
    for (let m = 1; m <= 12 * 60 && !r; m++) r = ST.reconcile(s, T0 + m * MIN, true);   // heartbeats, nobody answers
    expect(r.reason).toBe('unconfirmed');
    expect(s.sessions[0].durationSeconds).toBe(ST.CHECKIN_AFTER_MS / 1000);
    expect(ST.secondsSince(s, null, T0 + 24 * 60 * MIN)).toBe(ST.CHECKIN_AFTER_MS / 1000);
  });

  it('10c. a short break (app closed a few minutes) does not end the session', () => {
    const s = ST.normalize({});
    ST.start(s, T0);
    ST.reconcile(s, T0 + 10 * MIN, true);
    expect(ST.reconcile(s, T0 + 25 * MIN, true)).toBeNull();          // 15 min gap < stale gap
    expect(ST.stop(s, T0 + 40 * MIN).closed.durationSeconds).toBe(40 * 60);
  });

  it('pausing while the check-in is on screen keeps every minute up to the pause', () => {
    const s = ST.normalize({});
    ST.start(s, T0);
    for (let m = 1; m <= 100; m++) ST.reconcile(s, T0 + m * MIN, true);
    expect(ST.checkInDue(s, T0 + 100 * MIN)).toBe(true);
    expect(ST.stop(s, T0 + 100 * MIN).closed.durationSeconds).toBe(100 * 60);
  });

  it('display: "today" counts from local midnight and includes the running session', () => {
    const now = Date.now();
    const s = ST.normalize({ sessions: [{ id: 'y', startedAt: new Date(now - 30 * 60 * MIN).toISOString(), endedAt: new Date(now - 29 * 60 * MIN).toISOString(), durationSeconds: 3600 }] });
    ST.start(s, now - 5 * MIN);
    const midnight = new Date(now); midnight.setHours(0, 0, 0, 0);
    expect(ST.todaySeconds(s, now)).toBe(Math.min(5 * 60, Math.floor((now - midnight.getTime()) / 1000)));
  });

  it('merge (two devices): sessions are united, never dropped; overlaps are counted once', () => {
    const a = { activeSession: null, sessions: [{ id: 's1', startedAt: '2026-09-28T09:00:00.000Z', endedAt: '2026-09-28T09:20:00.000Z', durationSeconds: 1200 }] };
    const b = { activeSession: null, sessions: [{ id: 's2', startedAt: '2026-09-29T09:00:00.000Z', endedAt: '2026-09-29T09:25:00.000Z', durationSeconds: 1500 }, { id: 's1dup', startedAt: '2026-09-28T09:10:00.000Z', endedAt: '2026-09-28T09:20:00.000Z', durationSeconds: 600 }] };
    const m = ST.merge(a, b);
    expect(m.sessions.map((s: any) => s.id).sort()).toEqual(['s1', 's1dup', 's2']);
    expect(ST.merge(b, a)).toEqual(m);
    expect(ST.secondsSince(m, null, null)).toBe(1200 + 1500);         // s1dup overlaps s1
  });

  it('merge: a stale copy that ended a session does not beat the device that kept it alive; a manual Pause does', () => {
    const live = { activeSession: { id: 'x', startedAt: '2026-09-30T09:00:00.000Z', lastSeenAt: '2026-09-30T10:30:00.000Z', confirmedAt: '2026-09-30T09:00:00.000Z' }, sessions: [] };
    const staleClosed = { activeSession: null, sessions: [{ id: 'x', startedAt: '2026-09-30T09:00:00.000Z', endedAt: '2026-09-30T09:10:00.000Z', durationSeconds: 600, endReason: 'stale' }] };
    expect(ST.merge(staleClosed, live).activeSession.id).toBe('x');
    const paused = { activeSession: null, sessions: [{ ...staleClosed.sessions[0], endReason: 'manual' }] };
    const m = ST.merge(paused, live);
    expect(m.activeSession).toBeNull();
    expect(m.sessions).toHaveLength(1);
  });

  it('merge: two sessions started on two devices → one keeps running, the other is closed at its heartbeat', () => {
    const a = { activeSession: { id: 'a', startedAt: '2026-09-30T09:00:00.000Z', lastSeenAt: '2026-09-30T09:30:00.000Z' }, sessions: [] };
    const b = { activeSession: { id: 'b', startedAt: '2026-09-30T09:05:00.000Z', lastSeenAt: '2026-09-30T09:40:00.000Z' }, sessions: [] };
    const m = ST.merge(a, b);
    expect(m.activeSession.id).toBe('b');
    expect(m.sessions).toEqual([expect.objectContaining({ id: 'a', durationSeconds: 30 * 60, endReason: 'superseded' })]);
  });
});

/* ── Study Timer in the real browser book (app.js + study-timer.js) ── */
describe('Study Timer · browser book', () => {
  it('desktop sidebar: ACCOUNT → STUDY TIMER → PROGRESS, "0 min today · Start ▶", then "Pause ⏸"', () => {
    const a = loadApp({ last: { u: '01', s: 'read' } });
    a.go('home');
    const side = a.side();
    const iAcc = side.indexOf('id="side-account"'), iTimer = side.indexOf('id="side-timer"'), iProg = side.indexOf('class="prog"');
    expect(iAcc).toBeGreaterThan(-1);
    expect(iAcc).toBeLessThan(iTimer);
    expect(iTimer).toBeLessThan(iProg);
    expect(side).toContain('0 min today');
    expect(side).toContain('Start ▶');
    a.click({ act: 'timer-toggle' });
    a.go('home');
    expect(a.side()).toContain('Pause ⏸');
    expect(a.side().replace(/<[^>]+>/g, '')).toMatch(/0 min today · 00:0\d/);
  });

  it('1–5. start, pause, refresh and reopen keep the sessions; multiple sessions the same day', () => {
    const a = loadApp({ last: { u: '01', s: 'read' } });
    a.click({ act: 'timer-toggle' });
    const active = a.state().study.activeSession;
    expect(active).toMatchObject({ id: expect.any(String), startedAt: expect.any(String), lastSeenAt: expect.any(String) });

    // refresh / reopen shortly after: the same session is still running
    const b = loadApp(a.state());
    expect(b.state().study.activeSession.id).toBe(active.id);

    // a finished session from earlier today plus this one
    const earlier = { id: 'st_earlier', startedAt: new Date(Date.now() - 50 * MIN).toISOString(), endedAt: new Date(Date.now() - 30 * MIN).toISOString(), durationSeconds: 1200 };
    const st = b.state(); st.study.sessions.push(earlier);
    st.study.activeSession.startedAt = new Date(Date.now() - 10 * MIN).toISOString();
    const c = loadApp(st);
    c.click({ act: 'timer-toggle' });
    expect(c.state().study.activeSession).toBeNull();
    expect(c.state().study.sessions).toHaveLength(2);
    expect(c.state().study.sessions[1].durationSeconds).toBeGreaterThanOrEqual(10 * 60);
  });

  it('4/10. reopened hours after the app was closed: ended at the last heartbeat, nothing extra counted', () => {
    const started = Date.now() - 5 * 60 * MIN, seen = started + 45 * MIN;
    const a = loadApp({ study: { activeSession: { id: 'st_old', startedAt: new Date(started).toISOString(), lastSeenAt: new Date(seen).toISOString(), confirmedAt: new Date(started).toISOString() }, sessions: [] } });
    const s = a.state().study;
    expect(s.activeSession).toBeNull();
    expect(s.sessions).toEqual([expect.objectContaining({ id: 'st_old', durationSeconds: 45 * 60, endReason: 'stale' })]);
    expect(a.fetches.length).toBeGreaterThanOrEqual(0);
  });

  it('"yes, keep counting" confirms the running session', () => {
    const a = loadApp({ study: { activeSession: { id: 'st_c', startedAt: new Date(Date.now() - 95 * MIN).toISOString(), lastSeenAt: new Date().toISOString(), confirmedAt: new Date(Date.now() - 95 * MIN).toISOString() }, sessions: [] } });
    expect(ST.checkInDue(a.state().study, Date.now())).toBe(true);
    a.click({ act: 'timer-confirm' });
    expect(ST.checkInDue(a.state().study, Date.now())).toBe(false);
    expect(a.state().study.activeSession.id).toBe('st_c');
  });

  it('the app code has no arbitrary session cap and never infers study from input events', () => {
    const src = require('fs').readFileSync(require('path').resolve(__dirname, '../public/app.js'), 'utf8');
    const timer = src.slice(src.indexOf('/* ── study timer'), src.indexOf('/* ── boot'));
    expect(timer).not.toMatch(/MAX_STUDY|14400|capped at/);
    expect(timer).not.toMatch(/mousemove|keydown|scroll|pointer/);
  });

  it('5. sync: a 409 on study-timer merges both devices\' sessions without a conflict modal', async () => {
    const server: any = { data: { activeSession: null, sessions: [{ id: 'phone', startedAt: '2026-09-29T09:00:00.000Z', endedAt: '2026-09-29T09:25:00.000Z', durationSeconds: 1500 }] }, revision: 3 };
    const puts: any[] = [];
    const client = loadSyncClient(async (url, opts) => {
      const body = opts?.body ? JSON.parse(opts.body) : {};
      if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u', email: 'e' } } };
      if (url === '/api/docs') return { status: 200, body: { success: true, documents: [] } };
      if (url === '/api/docs/study-timer' && opts?.method === 'PUT') {
        puts.push(body);
        if (body.baseRevision !== server.revision) return { status: 409, body: { error: 'conflict', serverDoc: { key: 'study-timer', data: clone(server.data), revision: server.revision } } };
      }
      if (url === '/api/sync/resolve-conflict') {
        server.data = clone(body.resolvedData); server.revision++;
        return { status: 200, body: { success: true, doc: { key: 'study-timer', data: body.resolvedData, revision: server.revision } } };
      }
      return { status: 200, body: {} };
    });
    const S: any = { a: {}, sec: {}, ud: {}, rd: {}, study: { activeSession: null, sessions: [{ id: 'laptop', startedAt: '2026-09-28T09:00:00.000Z', endedAt: '2026-09-28T09:20:00.000Z', durationSeconds: 1200 }] } };
    client.api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 30));
    client.api.markDirty('study-timer');
    await client.api.syncPending();
    await new Promise((r) => setTimeout(r, 30));
    expect(client.modals).toHaveLength(0);
    expect(server.data.sessions.map((s: any) => s.id).sort()).toEqual(['laptop', 'phone']);
    expect(S.study.sessions.map((s: any) => s.id).sort()).toEqual(['laptop', 'phone']);
  });
});

/* ── Learning Review eligibility and boundaries (server, fake provider) ── */
const OPEN = [...activityIndex('01').values()].filter((a) => a.stage === 'interpret' && a.type === 'open').map((a) => a.id);
const empty = { observations: [], notEnoughEvidence: [], nextSession: [], proposals: [], uncertainties: [] };
let calls: any[] = [];
let respond: (p: any) => any = () => empty;
const fake = () => {
  config.ai.apiKey = 'sk-test-not-real';
  config.ai.models = allModels('fake-nano') as any;
  __setStructuredCallForTests(async (p: any) => { calls.push(p); return respond(p); });
};
const original = { ai: { ...config.ai, models: { ...config.ai.models } }, lr: { ...config.learningReview } };
const stamp = Date.now();
const emails: string[] = [];
async function user(tag: string) {
  const email = `strv-${tag}-${stamp}@example.com`; emails.push(email);
  const res = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
  const cookie = res.headers['set-cookie'].find((c: string) => c.includes('klang_session')).split(';')[0];
  const u = await prisma.user.findUniqueOrThrow({ where: { email } });
  return { id: u.id, cookie };
}
async function doc(userId: string, key: string, data: any) {
  const cur = await prisma.userDocument.findUnique({ where: { userId_key: { userId, key } } });
  if (cur) await prisma.userDocument.update({ where: { id: cur.id }, data: { data, revision: cur.revision + 1 } });
  else await prisma.userDocument.create({ data: { userId, key, data } });
}
const unit01 = (answers: Record<string, any>) => ({ answers, sections: {}, done: false });
const session = (id: string, startMs: number, minutes: number) => ({ id, startedAt: new Date(startMs).toISOString(), endedAt: new Date(startMs + minutes * MIN).toISOString(), durationSeconds: minutes * 60, endReason: 'manual' });
// The enrolment review happened `minutes` ago, so study seeded after it counts toward the next one
async function reviewedAgo(userId: string, minutes: number) {
  const st = await prisma.learningReviewState.findUniqueOrThrow({ where: { userId } });
  await prisma.learningReviewRun.update({ where: { id: st.lastSuccessfulRunId! }, data: { toAt: new Date(Date.now() - minutes * MIN) } });
}
const daysAgo = (d: number, h = 9) => { const t = new Date(Date.now() - d * 24 * 60 * MIN); t.setHours(h, 0, 0, 0); return t.getTime(); };

afterEach(() => {
  Object.assign(config.ai, original.ai, { models: { ...original.ai.models } });
  Object.assign(config.learningReview, original.lr);
  __setStructuredCallForTests(null); calls = []; respond = () => empty;
});
afterAll(async () => { await prisma.user.deleteMany({ where: { email: { in: emails } } }); await prisma.$disconnect(); });

describe('Learning Review · eligibility (study time since the last successful review + new evidence)', () => {
  it('11. 20 + 25 + 20 minutes on different days = 65 minutes since the boundary (midnight does not reset it)', async () => {
    const u = await user('65');
    await doc(u.id, 'study-timer', { activeSession: null, sessions: [session('mon', daysAgo(3), 20), session('tue', daysAgo(2), 25), session('wed', daysAgo(1), 20)] });
    expect(await getAccumulatedStudyMinutes(u.id, null)).toBe(65);
    expect(await getAccumulatedStudyMinutes(u.id, new Date(daysAgo(3, 23)))).toBe(45);
  });

  it('150 / 270 / 360-minute sessions reach the server in full: no clamp on the backend either', async () => {
    const u = await user('long');
    await doc(u.id, 'study-timer', { activeSession: null, sessions: [session('a', daysAgo(3), 150), session('b', daysAgo(2), 270), session('c', daysAgo(1), 360)] });
    expect(await getAccumulatedStudyMinutes(u.id, null)).toBe(150 + 270 + 360);
  });

  it('only the part of a session after the boundary counts; duplicated sessions count once; a running session does not count yet', async () => {
    const u = await user('clip');
    const s = daysAgo(1);
    await doc(u.id, 'study-timer', { activeSession: { id: 'run', startedAt: new Date(Date.now() - 30 * MIN).toISOString() }, sessions: [session('x', s, 90), session('x-copy', s, 90)] });
    expect(await getAccumulatedStudyMinutes(u.id, null)).toBe(90);
    expect(await getAccumulatedStudyMinutes(u.id, new Date(s + 60 * MIN))).toBe(30);
  });

  it('12. nightly: ≥60 min + new evidence → one AI review', async () => {
    fake(); config.learningReview.nightlyEnabled = true;
    const u = await user('n-yes');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'First.' }));
    expect((await runLearningReview(u.id, 'manual')).status).toBe('completed');        // enrolment is a human act
    await reviewedAgo(u.id, 180);
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'First.', [`01:${OPEN[1]}`]: 'New evidence.' }));
    await doc(u.id, 'study-timer', { activeSession: null, sessions: [session('a', Date.now() - 70 * MIN - 1000, 65)] });
    expect((await learningReviewStatus(u.id)).nightlyEligible).toBe(true);
    calls = [];
    const r = await runLearningReview(u.id, 'nightly');
    expect(r.status).toBe('completed');
    expect(calls).toHaveLength(1);
  });

  it('13. nightly: ≥60 min + zero new evidence → zero AI', async () => {
    fake(); config.learningReview.nightlyEnabled = true;
    const u = await user('n-noev');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Only this.' }));
    await runLearningReview(u.id, 'manual');
    await reviewedAgo(u.id, 180);
    await doc(u.id, 'study-timer', { activeSession: null, sessions: [session('a', Date.now() - 130 * MIN, 120)] });
    calls = [];
    expect(await runLearningReview(u.id, 'nightly')).toEqual({ status: 'no_new_evidence' });
    expect(calls).toHaveLength(0);
  });

  it('14. nightly: <60 min + new evidence → zero AI', async () => {
    fake(); config.learningReview.nightlyEnabled = true;
    const u = await user('n-short');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'One.' }));
    await runLearningReview(u.id, 'manual');
    await reviewedAgo(u.id, 180);
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'One.', [`01:${OPEN[1]}`]: 'Two.' }));
    await doc(u.id, 'study-timer', { activeSession: null, sessions: [session('a', Date.now() - 50 * MIN, 45)] });
    calls = [];
    expect(await runLearningReview(u.id, 'nightly')).toMatchObject({ status: 'below_study_threshold', studyMinutes: 45, requiredMinutes: 60 });
    expect(calls).toHaveLength(0);
    const n = await nightly();
    expect(n.completed).toBe(0);
    expect(calls).toHaveLength(0);
  });

  it('15. manual "Run review now": <60 min + new evidence → allowed (same pipeline)', async () => {
    fake();
    const u = await user('m-short');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Ten minutes of work.' }));
    await doc(u.id, 'study-timer', { activeSession: null, sessions: [session('a', Date.now() - 20 * MIN, 10)] });
    const res = await request(app).post('/api/learning-review/run').set('Cookie', u.cookie).send({});
    expect(res.body.status).toBe('completed');
    expect(calls).toHaveLength(1);
    expect(calls[0].fn).toBe('nightlyLearningReview');
  });

  it('16. manual with no new evidence → zero AI, "no_new_evidence" (page: "Nothing new to review yet.")', async () => {
    fake();
    const u = await user('m-none');
    await doc(u.id, 'study-timer', { activeSession: null, sessions: [session('a', Date.now() - 200 * MIN, 180)] });
    const res = await request(app).post('/api/learning-review/run').set('Cookie', u.cookie).send({});
    expect(res.body).toEqual({ status: 'no_new_evidence' });
    expect(calls).toHaveLength(0);
  });
});

describe('Learning Review · boundaries', () => {
  it('17–18. a successful review advances both the study-time and the evidence boundary', async () => {
    fake();
    const u = await user('b-ok');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Evidence.' }));
    await doc(u.id, 'study-timer', { activeSession: null, sessions: [session('a', Date.now() - 100 * MIN, 90)] });
    const before = await learningReviewStatus(u.id);
    expect(before).toMatchObject({ pending: 1, studyMinutes: 90 });
    expect((await runLearningReview(u.id, 'manual')).status).toBe('completed');
    const after = await learningReviewStatus(u.id);
    expect(after).toMatchObject({ pending: 0, studyMinutes: 0, nightlyEligible: false });
  });

  it('19–20. a failed review consumes neither study time nor evidence, and keeps the previous report', async () => {
    fake();
    const u = await user('b-fail');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Evidence.' }));
    await doc(u.id, 'study-timer', { activeSession: null, sessions: [session('a', Date.now() - 100 * MIN, 90)] });
    respond = () => { throw new AiRequestError('timeout', 'timeout'); };
    expect(await runLearningReview(u.id, 'manual')).toMatchObject({ status: 'failed', code: 'ai_timeout' });
    const state = await prisma.learningReviewState.findUniqueOrThrow({ where: { userId: u.id } });
    expect(state.lastSuccessfulRunId).toBeNull();
    expect(state.analysed).toEqual({});
    expect(await learningReviewStatus(u.id)).toMatchObject({ pending: 1, studyMinutes: 90, running: false });
    respond = () => empty;
    expect((await runLearningReview(u.id, 'manual')).status).toBe('completed');
    expect(calls).toHaveLength(2);
  });

  it('21. manual and scheduler at the same moment → one successful review for the boundary, one AI call', async () => {
    fake(); config.learningReview.nightlyEnabled = true;
    const u = await user('b-race');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Seed.' }));
    await runLearningReview(u.id, 'manual');
    await reviewedAgo(u.id, 180);
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Seed.', [`01:${OPEN[1]}`]: 'Raced.' }));
    await doc(u.id, 'study-timer', { activeSession: null, sessions: [session('a', Date.now() - 80 * MIN, 75)] });
    calls = [];
    respond = async () => { await new Promise((r) => setTimeout(r, 150)); return empty; };
    const [m, n] = await Promise.all([runLearningReview(u.id, 'manual'), runLearningReview(u.id, 'nightly')]);
    expect([m.status, n.status].sort()).toEqual(['busy', 'completed']);
    expect(calls).toHaveLength(1);
    const ok = await prisma.learningReviewRun.findMany({ where: { userId: u.id, status: 'succeeded' } });
    expect(ok).toHaveLength(2);                                      // the enrolment review + exactly one for this boundary
    expect(await runLearningReview(u.id, 'nightly')).toEqual({ status: 'below_study_threshold', studyMinutes: 0, requiredMinutes: 60 });
  });
});

describe('Learning Review · configuration', () => {
  it('22. configured → GET says available and reports the nightly setting; the page offers "run review now"', async () => {
    fake();
    const u = await user('cfg-ok');
    const get = await request(app).get('/api/learning-review').set('Cookie', u.cookie);
    expect(get.body).toMatchObject({ available: true, nightlyEnabled: false, pending: 0, studyMinutes: 0 });

    const a = loadApp({}, { fetch: (url) => url === '/api/learning-review' ? { status: 200, body: { ...get.body, pending: 2 } } : { status: 404, body: {} } });
    a.go('learning');
    await new Promise((r) => setTimeout(r, 10));
    const { controls } = a.ctx.KLANG_LEARNING_REVIEW._html();
    expect(controls).toContain('data-lr="run"');
    expect(controls).toContain('2 new items since your last review.');
    expect(controls).toContain('Reviews run only when you ask for one.');
  });

  it('23. missing model → safe "not configured" message, no run button, POST 503 without any call', async () => {
    fake(); config.ai.models.nightlyLearningReview = '';
    const u = await user('cfg-missing');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'x' }));
    const get = await request(app).get('/api/learning-review').set('Cookie', u.cookie);
    expect(get.body.available).toBe(false);
    expect((await request(app).post('/api/learning-review/run').set('Cookie', u.cookie).send({})).status).toBe(503);
    expect(calls).toHaveLength(0);
    const a = loadApp({}, { fetch: () => ({ status: 200, body: get.body }) });
    a.go('learning');
    await new Promise((r) => setTimeout(r, 10));
    const { controls } = a.ctx.KLANG_LEARNING_REVIEW._html();
    expect(controls).toContain('not configured on this server yet. Your work is safe');
    expect(controls).not.toContain('data-lr="run"');
  });

  it('23b. a server error or offline is not reported as "not configured"', async () => {
    for (const status of [500, 0]) {
      const a = loadApp({}, { fetch: () => (status ? { status, body: { error: 'internal_error' } } : { status: 0, body: {} }) });
      a.go('learning');
      await new Promise((r) => setTimeout(r, 10));
      const { controls } = a.ctx.KLANG_LEARNING_REVIEW._html();
      expect(controls).not.toContain('not configured');
      expect(controls).toContain('could not be loaded');
      expect(controls).toContain('data-lr="reload"');
    }
  });

  it('24. Main Write (Sol) and Learning Review are configured independently; the review never uses the Main Write model', async () => {
    fake();
    config.ai.models.mainWrite = 'sol-for-main-write';
    config.ai.models.nightlyLearningReview = '';
    expect(isAiAvailable('mainWrite')).toBe(true);
    expect(isAiAvailable('nightlyLearningReview')).toBe(false);
    config.ai.models.mainWrite = '';
    config.ai.models.nightlyLearningReview = 'nano-for-review';
    expect(isAiAvailable('mainWrite')).toBe(false);
    expect(isAiAvailable('nightlyLearningReview')).toBe(true);

    config.ai.models.mainWrite = 'sol-for-main-write';
    const u = await user('cfg-indep');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'x' }));
    const r: any = await runLearningReview(u.id, 'manual');
    const run = await prisma.learningReviewRun.findUniqueOrThrow({ where: { id: r.runId } });
    expect(run.model).toBe('nano-for-review');
    expect(calls[0].fn).toBe('nightlyLearningReview');
  });

  it('config status reports DEFINED / MISSING only, never a value', () => {
    config.ai.apiKey = 'sk-SENTINEL-never-print';
    config.ai.models.nightlyLearningReview = 'gpt-5.4-nano';
    const s = learningReviewConfigStatus();
    expect(s).toMatchObject({ apiKey: 'DEFINED', model: 'DEFINED' });
    expect(JSON.stringify(s)).not.toMatch(/SENTINEL|gpt-5/);
  });
});

describe('Learning Review · exports serialise the saved review without calling the AI', () => {
  it('PDF and Markdown: no new AI call, no secrets, no chain-of-thought, no full drafts', async () => {
    fake();
    const u = await user('export');
    const long = 'Long draft sentence that keeps going. '.repeat(80);
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: long }));
    const r: any = await runLearningReview(u.id, 'manual');
    expect(calls).toHaveLength(1);
    const md = await request(app).get(`/api/learning-review/runs/${r.runId}/export?format=md`).set('Cookie', u.cookie);
    const pdf = await request(app).get(`/api/learning-review/runs/${r.runId}/export?format=pdf`).set('Cookie', u.cookie).buffer(true).parse((resp, cb) => { const b: Buffer[] = []; resp.on('data', (c: Buffer) => b.push(c)); resp.on('end', () => cb(null, Buffer.concat(b))); });
    expect(md.status).toBe(200);
    expect(pdf.status).toBe(200);
    expect(calls).toHaveLength(1);                                   // exports never call the model
    for (const text of [md.text, (pdf.body as Buffer).toString('latin1')]) {
      expect(text).not.toContain('sk-test-not-real');
      expect(text).not.toMatch(/reasoning_content|chain[- ]of[- ]thought/i);
      expect(text).not.toContain(long.trim());                        // never the whole draft
    }
    const a = loadApp({}, { fetch: (url) => url === '/api/learning-review' ? { status: 200, body: { available: true, report: r.report, pending: 0, studyMinutes: 0 } } : { status: 404, body: {} } });
    a.go('learning');
    await new Promise((res) => setTimeout(res, 10));
    const { report } = a.ctx.KLANG_LEARNING_REVIEW._html();
    expect(report).toContain(`/api/learning-review/runs/${r.runId}/export?format=pdf`);
    expect(report).toContain(`/api/learning-review/runs/${r.runId}/export?format=md`);
  });
});

describe('Baseline media (regression guard)', () => {
  it('25–26. Unit 01 keeps listening + speaking with its real audio; Units 01–32 resolve listening + speaking', () => {
    const fs = require('fs'), path = require('path');
    const u1 = getUnit('01')!.data;
    expect(u1.listening.map((l: any) => l.id)).toEqual(['l1', 'l2']);
    expect(u1.speaking.id).toBe('s1');
    expect(u1.title).toBeTruthy();
    for (const l of u1.listening) expect(fs.existsSync(path.resolve(__dirname, '../public' + l.file)), l.file).toBe(true);
    for (let i = 1; i <= 32; i++) {
      const id = String(i).padStart(2, '0');
      const d = getUnit(id)!.data;
      expect(d.listening.length, id).toBeGreaterThan(0);
      expect(d.listening.every((l: any) => l.id && (l.transcript || l.script) && Array.isArray(l.questions)), id).toBe(true);
      expect(d.speaking, id).toBeTruthy();
    }
  });
});

it('no real network call was made by this suite', () => { expect(network).toEqual([]); });

describe('Evidence safety · Writing Support provenance', () => {
  it('opening Writing Support is recorded and the answer becomes support_used, not independent', async () => {
    const { extractEvidence } = await import('../src/services/learningReview/evidence');
    const a = loadApp({ last: { u: '01', s: 'interpret' } });
    const html = a.go('u01-interpret');
    const key = (html.match(/data-wsup="([^"]+)"/) || [])[1];
    expect(key).toMatch(/^01:/);
    a.fire('toggle', { open: true, dataset: { wsup: key } });
    expect(a.state().a[`${key}:support`]).toMatchObject({ at: expect.stringMatching(/^\d{4}-/), beforeWriting: true });
    const id = key.slice(3);
    const ev = extractEvidence([{ key: 'unit:01', revision: 1, updatedAt: new Date(), data: { answers: { [key]: 'My supported answer.', [`${key}:support`]: a.state().a[`${key}:support`] }, sections: {}, done: false } }] as any);
    expect(ev.find((e: any) => e.id === `ans:01:${id}`)).toMatchObject({ provenance: 'support_used', supportUsed: true });
  });
});

describe('Study Timer · server sync contract', () => {
  it('the server accepts, stores and returns the study-timer document (single PUT and first-upload batch)', async () => {
    const u = await user('sync-key');
    const data = { activeSession: null, sessions: [session('k1', Date.now() - 90 * MIN, 80)] };
    const put = await request(app).put('/api/docs/study-timer').set('Cookie', u.cookie).send({ data, baseRevision: 0 });
    expect(put.status).toBe(200);
    const get = await request(app).get('/api/docs/study-timer').set('Cookie', u.cookie);
    expect(get.status).toBe(200);
    expect(get.body.doc.data.sessions[0].id).toBe('k1');
    expect(await getAccumulatedStudyMinutes(u.id, null)).toBe(80);

    const v = await user('sync-batch');
    const batch = await request(app).post('/api/sync/batch').set('Cookie', v.cookie).send({ documents: [{ key: 'study-timer', data, baseRevision: 0 }, { key: 'progress', data: { md: {} }, baseRevision: 0 }] });
    expect(batch.status).toBe(200);
    expect(batch.body.saved.map((d: any) => d.key).sort()).toEqual(['progress', 'study-timer']);
  });

  it('the client never uploads the server-owned learning-judgments document', async () => {
    const bodies: any[] = [];
    const client = loadSyncClient(async (url, opts) => {
      if (opts?.body) bodies.push({ url, body: JSON.parse(opts.body) });
      if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u', email: 'e' } } };
      if (url === '/api/docs') return { status: 200, body: { success: true, documents: [] } };
      if (url === '/api/sync/batch') return { status: 200, body: { success: true, saved: [], conflicts: [], rejected: [] } };
      return { status: 200, body: { success: true, doc: { revision: 1 } } };
    });
    const S: any = { a: { '01:i8': 'work' }, sec: {}, ud: {}, rd: {}, study: { activeSession: null, sessions: [] }, learningJudgments: { p: 'agree' } };
    client.api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 40));
    client.api.markDirty('learning-judgments');
    await client.api.syncPending();
    const keys = bodies.flatMap((b) => (b.body.documents || []).map((d: any) => d.key).concat(b.url.startsWith('/api/docs/') ? [decodeURIComponent(b.url.slice(10))] : []));
    expect(keys).toContain('study-timer');
    expect(keys).not.toContain('learning-judgments');
  });
});
