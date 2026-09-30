import { describe, it, expect, afterAll, afterEach, vi } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';
import { __setStructuredCallForTests } from '../src/services/ai/provider';
import { loadApp } from './helpers/appHarness';
import { loadSyncClient, flush } from './helpers/browserSync';
import { saveHumanJudgment } from '../src/services/learningReview/judgments';
const timer = require('../public/study-timer.js');
const backup = require('../public/backup.js');
const network = vi.fn(async () => { throw new Error('Real network forbidden'); });
vi.stubGlobal('fetch', network);
const users: string[] = [];
async function user() {
  const email = `hardening-${crypto.randomUUID()}@example.com`;
  const r = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
  users.push(r.body.user.id);
  return { id: r.body.user.id, cookie: r.headers['set-cookie'][0] };
}
afterAll(async () => { await prisma.user.deleteMany({ where: { id: { in: users } } }); await prisma.$disconnect(); expect(network).not.toHaveBeenCalled(); });
afterEach(() => { vi.restoreAllMocks(); __setStructuredCallForTests(null); });
const closed = { id: 'terminal', startedAt: '2026-09-30T09:00:00Z', endedAt: '2026-09-30T09:10:00Z', durationSeconds: 600, endReason: 'stale' };
const late = { id: closed.id, startedAt: closed.startedAt, lastSeenAt: '2026-09-30T10:30:00Z', confirmedAt: '2026-09-30T10:30:00Z' };

describe('Terminal timer authority', () => {
  it.each(['manual', 'stale', 'unconfirmed', 'superseded'])('late heartbeat cannot resurrect %s', reason => {
    const finalized = { activeSession: null, sessions: [{ ...closed, endReason: reason }] };
    const live = { activeSession: late, sessions: [] };
    for (const m of [timer.merge(finalized, live), timer.merge(live, finalized)]) {
      expect(m.activeSession).toBeNull(); expect(m.sessions).toEqual(finalized.sessions);
    }
  });
  it('a sub-five-second Stop does not count time and remains terminal', () => {
    const s: any = { activeSession: { ...late, lastSeenAt: closed.startedAt }, sessions: [] };
    timer.stop(s, Date.parse(closed.startedAt) + 1000);
    expect(s.sessions).toEqual([]);
    expect(timer.merge(s, { activeSession: late, sessions: [] }).activeSession).toBeNull();
  });
  it('out-of-order heartbeat does not move lastSeenAt backwards', () => {
    const s = { activeSession: { ...late }, sessions: [] };
    timer.reconcile(s, Date.parse(late.lastSeenAt) - 30000, true);
    expect(Date.parse(s.activeSession.lastSeenAt)).toBe(Date.parse(late.lastSeenAt));
  });
  it('server preserves finalized sessions through PUT, stale CAS and explicit resolution', async () => {
    const u = await user();
    const put = (data: any, rev: number) => request(app).put('/api/docs/study-timer').set('Cookie', u.cookie).send({ data, baseRevision: rev });
    expect((await put({ activeSession: null, sessions: [closed] }, 0)).status).toBe(200);
    const live = { activeSession: late, sessions: [] };
    const r = await put(live, 1);
    expect(r.body.doc.data).toEqual({ activeSession: null, sessions: [closed] });
    const stale = await put(live, 1); expect(stale.status).toBe(409);
    const resolve = await request(app).post('/api/sync/resolve-conflict').set('Cookie', u.cookie).send({ key: 'study-timer', resolvedData: live, expectedServerRevision: 2 });
    expect(resolve.status).toBe(200); expect(resolve.body.doc.data.activeSession).toBeNull();
    expect(resolve.body.doc.data.sessions).toEqual([closed]);
  });
  it('rejects malformed timer metadata on PUT and batch', async () => {
    const u = await user(); const data = { activeSession: late, sessions: 'broken' };
    expect((await request(app).put('/api/docs/study-timer').set('Cookie', u.cookie).send({ data, baseRevision: 0 })).status).toBe(400);
    const batch = await request(app).post('/api/sync/batch').set('Cookie', u.cookie).send({ documents: [{ key: 'study-timer', data }] });
    expect(batch.body.rejected[0].key).toBe('study-timer');
    expect(await prisma.userDocument.count({ where: { userId: u.id } })).toBe(0);
  });
});

describe('Judgment concurrency and isolation', () => {
  it('simultaneous different judgments survive; another user cannot export the report', async () => {
    const a = await user(), b = await user();
    await Promise.all([saveHumanJudgment(a.id, 'one', 'agree'), saveHumanJudgment(a.id, 'two', 'disagree')]);
    const doc = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId: a.id, key: 'learning-judgments' } } });
    expect(Object.keys((doc.data as any).judgments).sort()).toEqual(['one', 'two']);
    expect((await request(app).get('/api/docs').set('Cookie', b.cookie)).body.documents).toEqual([]);
    expect((await request(app).get('/api/docs/learning-judgments').set('Cookie', b.cookie)).status).toBe(400); // dedicated API, never generic sync
    await saveHumanJudgment(a.id, 'one', null);
    const next = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId: a.id, key: 'learning-judgments' } } });
    expect(Object.keys((next.data as any).judgments)).toEqual(['two']);
  });
});

describe('Backup validation before mutation', () => {
  const valid = () => ({ app: 'a-mind-in-english', v: 1, saved: '2026-09-30T12:00:00Z', state: { a: { '01:w2': 'Quotes “á” — text' }, sp: [], study: { activeSession: null, sessions: [closed] } } });
  it('round-trips Unicode, supports partial old state and ignores future fields', () => {
    const v: any = valid(); v.future = {}; v.state.future = [];
    expect(backup.validate(JSON.parse(JSON.stringify(v)))).toBe(true);
    expect(backup.validate({ app: 'a-mind-in-english', state: { a: {} } })).toBe(true);
  });
  it.each([null, [], { a: null }, { a: [] }, { a: {}, errs: {} }, { a: {}, sp: [{ id: 'x' }, { id: 'x' }] }, { a: {}, prefs: null }, { a: {}, study: { sessions: [ { ...closed, endedAt: 'broken' } ] } }, { a: { '01:w2:supportLevel': 'extreme' } }, { a: { '01:w2:support': { at: 'broken', level: 'high', beforeWriting: true } } }])('rejects corrupted state %j', state => {
    expect(backup.validate({ app: 'a-mind-in-english', state })).toBe(false);
  });
});

const state = () => ({ a: {}, sec: {}, ud: {}, rd: {} } as any);
async function syncHarness(extra: any, initial: any = {}) {
  const S = state();
  const c = loadSyncClient(async (url, opts) => {
    if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'test-user' } } };
    return extra(url, opts);
  }, initial);
  c.api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} }); await flush(); await flush();
  return { ...c, S };
}
describe('Sync authority and in-flight work', () => {
  it('a malformed success never clears pending work or claims cloud save', async () => {
    const c = await syncHarness((url: string) => url === '/api/docs' ? { status: 200, body: { documents: [] } } : { status: 200, body: { success: true } });
    c.S.a['01:q'] = 'safe'; c.api.markDirty('unit:01'); await c.api.syncPending();
    expect(c.api.getStatus()).toBe('sync_error');
    expect(JSON.parse(c.storage.get(c.context.KLANG_OWNERSHIP.key('klang.mind.pending.v1'))!)).toContain('unit:01');
    c.context.navigator.onLine = false;
  });
  it('a malformed pull does not treat the server as empty and migrate local data', async () => {
    const c = await syncHarness(() => ({ status: 200, body: {} }));
    expect(c.api.getStatus()).toBe('sync_error');
  });
  it('an older whole-document pull cannot overwrite newer hydrated data', async () => {
    let rev = 3;
    const c = await syncHarness(() => ({ status: 200, body: { documents: [{ key: 'unit:01', revision: rev, data: { answers: { '01:q': `revision ${rev}` } } }] } }));
    expect(c.S.a['01:q']).toBe('revision 3'); rev = 2; c.fire('online'); await flush(); await flush();
    expect(c.S.a['01:q']).toBe('revision 3');
  });
  it('typing during first-upload batch remains pending and is uploaded afterward', async () => {
    let release!: () => void;
    const S = { ...state(), a: { '01:q': 'before' } };
    const c = loadSyncClient(async (url, opts) => {
      if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u' } } };
      if (url === '/api/docs') return { status: 200, body: { documents: [] } };
      if (url === '/api/sync/batch') {
        await new Promise<void>(r => release = r);
        return { status: 200, body: { success: true, saved: [{ key: 'unit:01', revision: 1 }], conflicts: [] } };
      }
      return 'network-error';
    });
    c.api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} }); await flush(); await flush();
    S.a['01:q'] = 'after'; c.api.markDirty('unit:01'); release(); await flush(); await flush();
    expect(S.a['01:q']).toBe('after'); expect(JSON.parse(c.storage.get(c.context.KLANG_OWNERSHIP.key('klang.mind.pending.v1'))!)).toContain('unit:01');
    c.context.navigator.onLine = false;
  });
});


describe('Main Write durable success', () => {
  it('a failed snapshot insert returns an error and never a successful analysis id', async () => {
    const u = await user();
    const old = { key: config.ai.apiKey, models: config.ai.models };
    config.ai.apiKey = 'fake-no-network'; config.ai.models = { ...old.models, mainWrite: 'fake' };
    __setStructuredCallForTests(async () => ({} as any));
    vi.spyOn(prisma.mainWriteAnalysis, 'create').mockRejectedValueOnce(new Error('synthetic storage failure'));
    try {
      const r = await request(app).post('/api/ai/feedback').set('Cookie', u.cookie).send({ unit: '01', taskId: 'w2', text: 'Snapshot failure test.' });
      expect(r.status).toBe(503); expect(r.body.error).toBe('snapshot_not_saved'); expect(r.body.success).not.toBe(true);
      expect(await prisma.mainWriteAnalysis.count({ where: { userId: u.id } })).toBe(0);
    } finally { config.ai.apiKey = old.key; config.ai.models = old.models; }
  });
});


describe('Safe request failures', () => {
  it('invalid JSON is a 400 and raw submitted writing is neither logged nor returned', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    const r = await request(app).post('/api/sync/batch').set('Content-Type', 'application/json').send('{"private draft: do not log this":');
    expect(r.status).toBe(400); expect(r.text).not.toContain('private draft');
    expect(JSON.stringify(log.mock.calls)).not.toContain('private draft');
  });
  it('missing/null document data cannot replace valid answers', async () => {
    const u = await user();
    for (const body of [{ baseRevision: 0 }, { data: null, baseRevision: 0 }, { data: [] }]) {
      expect((await request(app).put('/api/docs/unit:01').set('Cookie', u.cookie).send(body)).status).toBe(400);
    }
    expect(await prisma.userDocument.count({ where: { userId: u.id } })).toBe(0);
    expect((await request(app).put('/api/docs/english-profile').set('Cookie', u.cookie).send({ data: null, baseRevision: 0 })).status).toBe(200);
  });
});


describe('Support activation event ordering', () => {
  it('summary activation before immediate typing remains before-writing even when toggle arrives later', () => {
    const a = loadApp();
    const d = { open: false, dataset: { wsup: '01:w2', level: 'high' } };
    a.fire('click', { closest: (selector: string) => selector === 'summary' ? { parentElement: d } : null });
    a.type('01:w2', 'Typed immediately after opening.');
    a.fire('toggle', { ...d, open: true });
    expect(a.state().a['01:w2:support'].beforeWriting).toBe(true);
  });
});


it('a legacy null Profile does not block hydration of other documents', async () => {
  const c = await syncHarness(() => ({ status: 200, body: { documents: [
    { key: 'english-profile', revision: 1, data: null },
    { key: 'unit:01', revision: 1, data: { answers: { '01:q': 'server work' } } },
  ] } }));
  expect(c.S.a['01:q']).toBe('server work');
  expect(c.api.getStatus()).toBe('saved_to_cloud');
});


it('Learning Review lease acquisition failure reaches safe error handling', async () => {
  const u = await user();
  await prisma.userDocument.create({ data: { userId: u.id, key: 'unit:01', data: { answers: { '01:i8': 'A real inference.' } } } });
  const old = { key: config.ai.apiKey, models: config.ai.models };
  config.ai.apiKey = 'fake-no-network'; config.ai.models = { ...old.models, nightlyLearningReview: 'fake' };
  vi.spyOn(prisma.learningReviewState, 'updateMany').mockRejectedValueOnce(new Error('synthetic DB failure'));
  try {
    const r = await request(app).post('/api/learning-review/run').set('Cookie', u.cookie);
    expect(r.status).toBe(500); expect(r.text).not.toContain('synthetic');
    expect(await prisma.learningReviewRun.count({ where: { userId: u.id } })).toBe(0);
  } finally { config.ai.apiKey = old.key; config.ai.models = old.models; }
});

describe('Account request ownership boundary', () => {
  it('rejects A-originated writes, reads, logout and SSE with B cookies', async () => {
    const a = await user(), b = await user();
    const put = await request(app).put('/api/docs/unit:01').set('Cookie', b.cookie).set('X-Learner-Id', a.id).send({ data: { answers: { '01:q': 'A private work' } }, baseRevision: 0 });
    expect(put.status).toBe(403); expect(put.headers['x-account-changed']).toBe('1');
    expect((await request(app).get('/api/docs').set('Cookie', b.cookie).set('X-Learner-Id', a.id)).status).toBe(403);
    expect((await request(app).get('/api/auth/me').set('Cookie', b.cookie).set('X-Learner-Id', a.id)).status).toBe(403);
    expect((await request(app).post('/api/auth/logout').set('Cookie', b.cookie).set('X-Learner-Id', a.id)).status).toBe(403);
    expect((await request(app).get('/api/sync/events?owner=' + a.id).set('Cookie', b.cookie)).status).toBe(403);
    expect((await request(app).get('/api/auth/me').set('Cookie', b.cookie)).body.user.id).toBe(b.id);
    expect(await prisma.userDocument.count({ where: { userId: b.id } })).toBe(0);
  });
  it('refuses unbound old browser mutations and accepts correctly bound work', async () => {
    const a = await user();
    const data = { data: { answers: { '01:q': 'owned A' } }, baseRevision: 0 };
    expect((await request(app).put('/api/docs/unit:01').set('Cookie', a.cookie).set('Sec-Fetch-Site', 'same-origin').send(data)).status).toBe(428);
    expect((await request(app).put('/api/docs/unit:01').set('Cookie', a.cookie).set('Sec-Fetch-Site', 'same-origin').set('X-Learner-Id', a.id).send(data)).status).toBe(200);
    expect((await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId: a.id, key: 'unit:01' } } })).data).toEqual(data.data);
  });
});
