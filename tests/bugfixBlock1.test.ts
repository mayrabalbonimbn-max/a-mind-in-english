import { describe, it, expect, afterAll, afterEach, vi } from 'vitest';
import request from 'supertest';

// Any request the real OpenAI client could make lands here: the suite proves nothing leaves the machine.
const network: string[] = [];
vi.stubGlobal('fetch', async (url: any) => { network.push(String(url)); return new Response('{}', { status: 500 }); });

import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';
import { allModels } from './helpers/aiModels';
import { loadApp } from './helpers/appHarness';
import { loadSyncClient } from './helpers/browserSync';
import { __setStructuredCallForTests } from '../src/services/ai/provider';
import { MAIN_WRITE_SYSTEM, buildMainWriteFeedbackPrompt, mainWriteRegister } from '../src/services/ai/prompts';
import { activityIndex } from '../src/services/learningReview/evidence';
import { mergeReview, withCurrentJudgments, normalizeJudgments } from '../src/services/learningReview/merge';
import { runLearningReview } from '../src/services/learningReview/pipeline';
import { getUnit } from '../src/services/content';

const mwFeedback = () => ({
  estimatedLevel: { level: 'C1-', rationale: 'r' },
  taskAchievement: { summary: 'Covers the prompt.' }, argumentDevelopment: { summary: 's' }, organisationCoherence: { summary: 's' },
  clarity: { summary: 's' }, grammaticalAccuracyRange: { summary: 's' }, lexicalPrecisionRange: { summary: 's' }, registerTone: { summary: 's' },
  hedgingStance: { summary: 's' }, cohesionPragmatics: { summary: 's' }, unnecessaryRepetition: { summary: 's' },
  strengthsSummary: ['Clear voice', 'Honest example'],
  observations: [{ quote: 'I remember', type: 'STRONG_LANGUAGE', explanation: 'Concrete opening.', effect: 'Engages.', revisionStrategy: 'Keep it.' }],
  questionsForWriter: ['What changed afterwards?'], recurringErrors: [], isolatedErrors: [], suggestedErrorLog: [], nextDraftPriorities: ['Develop paragraph two'],
});
const wFeedback = () => ({ estimatedLevel: { level: 'B2', rationale: 'r' }, taskAchievement: { summary: 's', strengths: [], improvements: [] }, recurringErrors: [], isolatedErrors: [], corrections: [], suggestedErrorLog: [], questionsForWriter: [], nextDraftPriorities: ['x'] });

let calls: any[] = [];
const original = { ai: { ...config.ai, models: { ...config.ai.models }, reasoning: { ...config.ai.reasoning } } };
function fakeAi(mainModel = 'sol-at-call-time') {
  config.ai.apiKey = 'sk-test-not-real';
  config.ai.models = { ...(allModels('nano-fake') as any), mainWrite: mainModel };
  __setStructuredCallForTests(async (p: any) => { calls.push(p); return p.fn === 'mainWrite' ? mwFeedback() : p.name === 'learning_review' ? lrOut() : wFeedback(); });
}
let lrOut: () => any = () => ({ observations: [], notEnoughEvidence: [], nextSession: [], proposals: [], uncertainties: [] });
afterEach(() => { Object.assign(config.ai, original.ai, { models: { ...original.ai.models }, reasoning: { ...original.ai.reasoning } }); __setStructuredCallForTests(null); calls = []; });

const stamp = Date.now();
const emails: string[] = [];
async function user(tag: string) {
  const email = `bf1-${tag}-${stamp}@example.com`; emails.push(email);
  const res = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
  const cookie = res.headers['set-cookie'].find((c: string) => c.includes('klang_session')).split(';')[0];
  return { id: (await prisma.user.findUniqueOrThrow({ where: { email } })).id, cookie };
}
async function doc(userId: string, key: string, data: any) {
  const cur = await prisma.userDocument.findUnique({ where: { userId_key: { userId, key } } });
  if (cur) await prisma.userDocument.update({ where: { id: cur.id }, data: { data, revision: cur.revision + 1 } });
  else await prisma.userDocument.create({ data: { userId, key, data } });
}
afterAll(async () => { await prisma.user.deleteMany({ where: { email: { in: emails } } }); await prisma.$disconnect(); });

const D1 = 'I remember the first week in a new language. Draft one, exactly as I sent it.';
const post = (u: any, body: any) => request(app).post('/api/ai/feedback').set('Cookie', u.cookie).send(body);
const pdfOf = (res: any) => (res.body as Buffer).toString('latin1');
const binary = (r: any) => r.buffer(true).parse((resp: any, cb: any) => { const b: Buffer[] = []; resp.on('data', (c: Buffer) => b.push(c)); resp.on('end', () => cb(null, Buffer.concat(b))); });

/* ── Main Write snapshot, history, metadata, export ── */
describe('Main Write · the analysed Draft 1 is a persisted snapshot', () => {
  it('1–5, 8–10. snapshot + real metadata persisted; later edits and config changes never leak into history or export; Draft 2 is separate', async () => {
    fakeAi('sol-at-call-time');
    const u = await user('snap');
    const r1 = await post(u, { unit: '01', taskId: 'w2', text: `  ${D1}  `, support: { level: 'high', used: true, openedBeforeWriting: false } });
    expect(r1.status).toBe(200);
    expect(r1.body).toMatchObject({ isMain: true, draft: 'first', model: 'sol-at-call-time', promptVersion: 'main-write-v2', analysisId: expect.any(String) });
    const row = await prisma.mainWriteAnalysis.findUniqueOrThrow({ where: { id: r1.body.analysisId } });
    expect(row).toMatchObject({ text: D1, unit: '01', taskId: 'w2', baseTaskId: 'w2', draft: 'first', model: 'sol-at-call-time', promptVersion: 'main-write-v2', supportLevel: 'high', supportUsed: true, supportOpenedBeforeWriting: false, expectedRegister: 'reflective' });

    // the learner's live field changes and today's configuration changes: history does not
    await doc(u.id, 'unit:01', { answers: { '01:w2': 'EDITED LATER — not what was analysed', '01:w2r': 'My Draft 2, revised by me.' }, sections: {}, done: false });
    config.ai.models.mainWrite = 'sol-new-config';
    await doc(u.id, 'portfolio', { pf: { '01:w2': { fb: [{ id: r1.body.analysisId, at: r1.body.createdAt, draft: 'first', words: 14, f: r1.body.feedback }] } } });
    const md = await request(app).get(`/api/ai/feedback/01/w2/${r1.body.analysisId}/export?format=md`).set('Cookie', u.cookie);
    expect(md.text).toContain(D1);
    expect(md.text).toContain('exactly as analysed');
    expect(md.text).not.toContain('EDITED LATER');
    expect(md.text).toContain('**Model:** sol-at-call-time');
    expect(md.text).not.toContain('sol-new-config');
    expect(md.text).toContain('**Prompt & Schema Version:** main-write-v2');
    expect(md.text).toContain('Yes, opened after starting to write · level chosen: high');
    expect(md.text).toContain('## Draft 2 · current text, not analysed yet');
    const json = await request(app).get(`/api/ai/feedback/01/w2/${r1.body.analysisId}/export?format=json`).set('Cookie', u.cookie);
    expect(json.body).toMatchObject({ learnerText: D1, snapshot: true, model: 'sol-at-call-time', promptVersion: 'main-write-v2', supportUsed: true, supportLevel: 'high', supportOpenedBeforeWriting: false });
    const pdf = await binary(request(app).get(`/api/ai/feedback/01/w2/${r1.body.analysisId}/export?format=pdf`).set('Cookie', u.cookie));
    expect(pdfOf(pdf)).toContain('exactly as analysed');
    expect(pdfOf(pdf)).not.toContain('EDITED LATER');

    // Draft 2 analysed separately: its own row, Draft 1 untouched, and the Draft 1 export now shows the analysed Draft 2
    const r2 = await post(u, { unit: '01', taskId: 'w2r', text: 'My Draft 2, revised by me.' });
    expect(r2.body).toMatchObject({ draft: 'revised', model: 'sol-new-config' });
    const rows = await prisma.mainWriteAnalysis.findMany({ where: { userId: u.id }, orderBy: { createdAt: 'asc' } });
    expect(rows.map((r) => [r.draft, r.baseTaskId, r.text])).toEqual([['first', 'w2', D1], ['revised', 'w2', 'My Draft 2, revised by me.']]);
    expect(rows[1].supportUsed).toBeNull();                                   // not sent → not known, never invented
    const md2 = await request(app).get(`/api/ai/feedback/01/w2/${r1.body.analysisId}/export?format=md`).set('Cookie', u.cookie);
    expect(md2.text).toMatch(/## Draft 2 · as analysed on/);
    expect(md2.text).toContain(D1);
  });

  it('6–7. analyses are append-only: a second one keeps the first, and more than 20 are all kept (server and portfolio)', async () => {
    fakeAi();
    const u = await user('many');
    for (let i = 0; i < 22; i++) await prisma.mainWriteAnalysis.create({ data: { userId: u.id, unit: '01', taskId: 'w2', baseTaskId: 'w2', draft: 'first', text: `t${i}`, words: 1, model: 'm', promptVersion: 'main-write-v2', feedback: {} } });
    await post(u, { unit: '01', taskId: 'w2', text: D1 });
    expect(await prisma.mainWriteAnalysis.count({ where: { userId: u.id } })).toBe(23);

    const fb = Array.from({ length: 25 }, (_, i) => ({ id: `old${i}`, at: '2026-09-01T10:00:00.000Z', draft: 'revised', words: 10, f: { estimatedLevel: { level: 'B2', rationale: 'r' }, nextDraftPriorities: [] } }));
    const a: any = loadApp({ a: { '01:w2r': 'Revised text.' }, pf: { '01:w2': { fb } } }, { fetch: (url: string) => url === '/api/ai/feedback' ? { status: 200, body: { success: true, feedback: mwFeedback(), words: 2, isMain: true, draft: 'revised', analysisId: 'srv-1', model: 'sol', promptVersion: 'main-write-v2', createdAt: new Date().toISOString() } } : { status: 404, body: {} } });
    a.go('u01-edit');
    a.click({ act: 'aifb', q: '01:w2r' });
    await new Promise((r) => setTimeout(r, 20));
    const kept = a.state().pf['01:w2'].fb;
    expect(kept).toHaveLength(26);
    expect(kept[0].id).toBe('old0');
    expect(kept[25]).toMatchObject({ id: 'srv-1', model: 'sol', promptVersion: 'main-write-v2', text: 'Revised text.', snapshot: true });
  });
});

describe('Main Write · Draft 1 frozen in the book, Draft 2 separate', () => {
  const okFetch = (url: string) => url === '/api/ai/feedback'
    ? { status: 200, body: { success: true, feedback: mwFeedback(), words: 14, isMain: true, draft: 'first', analysisId: 'srv-a', model: 'sol', promptVersion: 'main-write-v2', createdAt: '2026-10-01T10:00:00.000Z' } }
    : { status: 404, body: {} };

  it('after feedback Draft 1 is read-only, typing cannot change it, "start Draft 2" copies it into its own field', async () => {
    const a: any = loadApp({ a: { '01:w2': D1 }, last: { u: '01', s: 'write' } }, { fetch: okFetch });
    expect(a.go('u01-write')).not.toMatch(/data-k="01:w2"[^>]*readonly/);
    a.click({ act: 'aifb', q: '01:w2' });
    await new Promise((r) => setTimeout(r, 20));
    const html = a.go('u01-write');
    expect(html).toMatch(/data-k="01:w2"[^>]*readonly aria-readonly="true"/);
    expect(html).toContain('Draft 1 · analysed');
    expect(html).toContain('data-act="startdraft2"');
    expect(html).not.toMatch(/data-act="aifb" data-q="01:w2"/);
    a.type('01:w2', 'overwritten attempt');
    expect(a.state().a['01:w2']).toBe(D1);
    a.click({ act: 'startdraft2', q: '01:w2' });
    expect(a.state().a['01:w2r']).toBe(D1);
    expect(a.state().a['01:w2']).toBe(D1);
    a.type('01:w2r', 'My own Draft 2.');
    expect(a.state().a['01:w2r']).toBe('My own Draft 2.');
    expect(a.state().a['01:w2']).toBe(D1);
    // refresh
    const b: any = loadApp(a.state());
    expect(b.go('u01-write')).toMatch(/data-k="01:w2"[^>]*readonly/);
    expect(b.state().a['01:w2r']).toBe('My own Draft 2.');
  });

  it('EDIT shows Draft 1 as analysed (snapshot), even if an older version of the book let the field change later', () => {
    const a: any = loadApp({ a: { '01:w2': 'changed after feedback in an older version' }, pf: { '01:w2': { fb: [{ id: 'x', at: '2026-10-01T10:00:00.000Z', draft: 'first', words: 14, f: { estimatedLevel: { level: 'B2', rationale: 'r' } }, text: D1, snapshot: true }] } } });
    const html = a.go('u01-edit');
    expect(html).toContain('as analysed');
    expect(html).toContain(D1.replace(/'/g, '&#39;'));
  });

  it('Module Review main tasks (no Draft 2 task) are never frozen', async () => {
    const r1 = getUnit('r1')!.data.synthesis;
    expect(r1.main).toBe(true);
    const a: any = loadApp({ a: { [`r1:${r1.id}`]: 'Synthesis text.' }, pf: { [`r1:${r1.id}`]: { fb: [{ id: 'y', draft: 'first', at: '2026-10-01T10:00:00.000Z', f: { estimatedLevel: { level: 'B2', rationale: 'r' } } }] } } });
    expect(a.go('r1-synthesis')).not.toMatch(new RegExp(`data-k="r1:${r1.id}"[^>]*readonly`));
  });
});

describe('Main Write · Writing Support provenance at submission', () => {
  const body = async (state: any) => {
    const a: any = loadApp(state, { fetch: () => ({ status: 503, body: {} }) });
    a.go('u01-write');
    a.click({ act: 'aifb', q: '01:w2' });
    await new Promise((r) => setTimeout(r, 10));
    return a.fetches.find((f: any) => f.url === '/api/ai/feedback').body.support;
  };
  it('11. HIGH chosen, never opened → used false', async () => { expect(await body({ a: { '01:w2': D1, '01:w2:supportLevel': 'high' } })).toEqual({ level: 'high', used: false, openedBeforeWriting: null }); });
  it('12/14. opened before writing → used true, openedBeforeWriting true', async () => { expect(await body({ a: { '01:w2': D1, '01:w2:support': { at: 't', level: 'high', beforeWriting: true } } })).toEqual({ level: 'high', used: true, openedBeforeWriting: true }); });
  it('15. opened after starting to write → openedBeforeWriting false', async () => { expect(await body({ a: { '01:w2': D1, '01:w2:supportLevel': 'light', '01:w2:support': { at: 't', level: 'light', beforeWriting: false } } })).toEqual({ level: 'light', used: true, openedBeforeWriting: false }); });
  it('13. OFF, never opened → used false', async () => { expect(await body({ a: { '01:w2': D1, '01:w2:supportLevel': 'off' } })).toEqual({ level: 'off', used: false, openedBeforeWriting: null }); });
  it('16. an old use record (timestamp only) → used true, openedBeforeWriting unknown (null)', async () => { expect(await body({ a: { '01:w2': D1, '01:w2:support': '2026-09-29T10:00:00.000Z' } })).toEqual({ level: 'high', used: true, openedBeforeWriting: null }); });

  it('the server rejects malformed provenance instead of storing it', async () => {
    fakeAi();
    const u = await user('prov');
    expect((await post(u, { unit: '01', taskId: 'w2', text: D1, support: { level: 'extreme', used: 'yes', openedBeforeWriting: null } })).status).toBe(400);
    expect(calls).toHaveLength(0);
  });
});

describe('Main Write · backward compatibility', () => {
  it('34–35. an older portfolio entry (no snapshot, model, prompt version or support) still exports, with gaps explicit, nothing invented', async () => {
    fakeAi('sol-today');
    const u = await user('legacy');
    await doc(u.id, 'unit:01', { answers: { '01:w2': 'CURRENT TEXT, edited since' }, sections: {}, done: false });
    await doc(u.id, 'portfolio', { pf: { '01:w2': { fb: [{ id: 'legacy1', at: '2026-09-20T10:00:00.000Z', draft: 'first', words: 300, f: { estimatedLevel: { level: 'B2', rationale: 'r' }, strengthsSummary: ['old'] } }] } } });
    const md = await request(app).get('/api/ai/feedback/01/w2/legacy1/export?format=md').set('Cookie', u.cookie);
    expect(md.status).toBe(200);
    expect(md.text).toContain('The analysed text was not recorded for this earlier analysis');
    expect(md.text).not.toContain('CURRENT TEXT, edited since');
    expect(md.text).toContain('**Model:** not recorded for this analysis');
    expect(md.text).not.toContain('sol-today');
    expect(md.text).toContain('**Writing Support Used Before Submission:** Unknown (not recorded)');
    const json = await request(app).get('/api/ai/feedback/01/w2/legacy1/export?format=json').set('Cookie', u.cookie);
    expect(json.body).toMatchObject({ learnerText: null, snapshot: false, model: null, promptVersion: null, supportUsed: null });
    // the book still renders the old entry
    const a: any = loadApp({ a: { '01:w2': 'x' }, pf: { '01:w2': { fb: [{ id: 'legacy1', at: '2026-09-20T10:00:00.000Z', draft: 'first', words: 300, f: { estimatedLevel: { level: 'B2', rationale: 'r' } } }] } } });
    expect(a.go('u01-write')).toContain('data-act="fbopen"');
  });

  it('36. a portfolio entry with a snapshot syncs like any other portfolio data', async () => {
    const pushed: any[] = [];
    const client = loadSyncClient(async (url, opts) => {
      if (opts?.body) pushed.push(JSON.parse(opts.body));
      if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u', email: 'e' } } };
      if (url === '/api/docs') return { status: 200, body: { success: true, documents: [] } };
      if (url === '/api/sync/batch') return { status: 200, body: { success: true, saved: [], conflicts: [], rejected: [] } };
      return { status: 200, body: {} };
    });
    const S: any = { a: { '01:w2': D1 }, sec: {}, ud: {}, rd: {}, pf: { '01:w2': { fb: [{ id: 'srv-a', draft: 'first', text: D1, snapshot: true, model: 'sol', promptVersion: 'main-write-v2', support: { level: 'high', used: false, openedBeforeWriting: null } }] } } };
    client.api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 40));
    const pf = pushed.flatMap((b) => b.documents || []).find((d: any) => d.key === 'portfolio');
    expect(pf.data.pf['01:w2'].fb[0]).toMatchObject({ text: D1, model: 'sol', promptVersion: 'main-write-v2' });
  });
});

/* ── Register ── */
describe('Main Write · expected register comes from the task', () => {
  const promptFor = (u: string, id: string) => buildMainWriteFeedbackPrompt({ unitId: u, taskId: id, text: 'x' })!;
  it('26. analytical task → academic · analytical', () => {
    expect(promptFor('13', '13w2').user).toContain('<expected_register>Academic · analytical.');
  });
  it('27. reflective task is not pushed towards academic', () => {
    const p = promptFor('01', 'w2');
    expect(p.user).toContain('<expected_register>Neutral · reflective.');
    expect(p.user).toContain('an academic register is not expected');
  });
  it('28. personal task: the first person and a personal voice are not register problems; formality is never quality', () => {
    expect(promptFor('02', '02w2').user).toContain('The first person, contractions and a personal voice are appropriate');
    expect(MAIN_WRITE_SYSTEM).toContain('never reward a more formal or academic style for its own sake');
    expect(MAIN_WRITE_SYSTEM).not.toMatch(/Appropriate academic\/analytical register/);
  });
  it('29. unknown or vague kinds use a neutral default', () => {
    expect(mainWriteRegister({ kind: 'Long-form essay' }).id).toBe('neutral_default');
    expect(mainWriteRegister({}).id).toBe('neutral_default');
    expect(promptFor('20', '20w2').user).toContain('The task does not specify a register');
    expect(mainWriteRegister({ kind: 'Personal / analytical essay' }).id).toBe('personal_analytical');
    expect(mainWriteRegister({ kind: 'Argumentative essay' }).id).toBe('argumentative');
  });
});

/* ── Quotas and server authority ── */
describe('Main Write · its own quota; the server decides what is a Main Write', () => {
  it('30. general feedback exhausted → Main Write still available', async () => {
    fakeAi();
    const u = await user('q-general');
    for (let i = 0; i < config.ai.feedbackPerHour; i++) expect((await post(u, { unit: '01', taskId: 'w1', text: `short ${i}` })).status).toBe(200);
    expect((await post(u, { unit: '01', taskId: 'w1', text: 'one more' })).status).toBe(429);
    expect((await post(u, { unit: '01', taskId: 'w2', text: D1 })).status).toBe(200);
  });

  it('31–32. Main Write quota: invalid requests are free; changing the payload cannot escape the quota', async () => {
    fakeAi();
    const u = await user('q-main');
    for (let i = 0; i < 3; i++) expect((await post(u, { unit: '01', taskId: 'w2', text: '' })).status).toBe(400);
    for (let i = 0; i < config.ai.mainWritePerHour; i++) expect((await post(u, { unit: '01', taskId: 'w2', text: `${D1} ${i}`, main: false, fn: 'writing' })).status).toBe(200);
    expect((await post(u, { unit: '01', taskId: 'w2', text: 'again', main: false, isMain: false, model: 'nano' })).status).toBe(429);
    expect((await post(u, { unit: '01', taskId: 'w2r', text: 'draft two' })).status).toBe(429);   // Draft 2 is the same Main Text
    expect((await post(u, { unit: '01', taskId: 'w1', text: 'short task still fine' })).status).toBe(200);
    expect(calls.filter((c) => c.fn === 'mainWrite')).toHaveLength(config.ai.mainWritePerHour);
  });

  it('33. a normal task cannot be turned into a Main Write (no Sol, no snapshot row)', async () => {
    fakeAi();
    const u = await user('authority');
    const r = await post(u, { unit: '01', taskId: 'w1', text: 'short', main: true, isMain: true, fn: 'mainWrite', model: 'gpt-5.6-sol' });
    expect(r.status).toBe(200);
    expect(r.body.isMain).toBe(false);
    expect(calls[0].fn).toBe('writing');
    expect(await prisma.mainWriteAnalysis.count({ where: { userId: u.id } })).toBe(0);
  });
});

/* ── Human Judgment ── */
const OPEN = [...activityIndex('01').values()].filter((a) => a.stage === 'interpret' && a.type === 'open').map((a) => a.id);
const THINK = [...activityIndex('01').values()].filter((a) => a.stage === 'think' && a.type === 'open').map((a) => a.id);
const obs = (o: any) => ({ kind: 'difficulty', patternKey: 'hedging_strong_claims', label: 'Strong claims without hedging', priorPattern: null, evidenceFor: [], evidenceAgainst: [], interpretation: 'ORIGINAL AI HYPOTHESIS: inferences stated as certainties.', claimedConfidence: 'moderate', implication: '', ...o });

async function reviewed(tag: string) {
  fakeAi();
  const u = await user(tag);
  await doc(u.id, 'unit:01', { answers: { [`01:${OPEN[0]}`]: 'This proves it.', [`01:${OPEN[1]}`]: 'Clearly true.', [`01:${THINK[0]}`]: 'Certainly so.' }, sections: {}, done: false });
  lrOut = () => ({ observations: [obs({ evidenceFor: ['E1', 'E2', 'E3'] })], notEnoughEvidence: [], nextSession: [], proposals: [], uncertainties: [] });
  const r: any = await runLearningReview(u.id, 'manual');
  expect(r.status).toBe('completed');
  return { u, runId: r.runId as string };
}
const judge = (u: any, judgment: any, patternKey = 'hedging_strong_claims') => request(app).post('/api/learning-review/judgments').set('Cookie', u.cookie).send({ patternKey, judgment });
const shown = async (u: any) => {
  const g = await request(app).get('/api/learning-review').set('Cookie', u.cookie);
  const s = g.body.report.sections;
  return [...s.gettingStronger, ...s.emerging, ...s.recurring, ...s.improving, ...s.recognitionToProduction].find((o: any) => o.key === 'hedging_strong_claims');
};

describe('Human Judgment · persisted, clearable, exported, used next time', () => {
  it('17–20. agree / disagree / not sure / clear persist across reloads (and devices: the server is the source)', async () => {
    const { u } = await reviewed('judge');
    expect((await shown(u)).humanJudgment ?? null).toBeNull();
    for (const j of ['agree', 'disagree', 'not_sure']) {
      expect((await judge(u, j)).body).toMatchObject({ success: true, judgment: j });
      expect((await shown(u)).humanJudgment).toBe(j);           // a fresh GET = a reload or another device
    }
    expect((await judge(u, null)).body).toMatchObject({ success: true, judgment: null });
    expect((await shown(u)).humanJudgment).toBeNull();
    const d = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId: u.id, key: 'learning-judgments' } } });
    expect((d.data as any).judgments.hedging_strong_claims).toBeUndefined();
  });

  it('21. invalid values are rejected', async () => {
    const { u } = await reviewed('judge-bad');
    for (const j of ['maybe', 'AGREE', 1, '', undefined]) expect((await judge(u, j)).status).toBe(400);
    expect((await judge(u, 'agree', 'bad key with spaces')).status).toBe(400);
    expect((await judge(u, 'agree', 'x'.repeat(200))).status).toBe(400);
  });

  it('22. PDF, Markdown and JSON exports carry the current judgment', async () => {
    const { u, runId } = await reviewed('judge-export');
    await judge(u, 'disagree');
    const md = await request(app).get(`/api/learning-review/runs/${runId}/export?format=md`).set('Cookie', u.cookie);
    expect(md.text).toContain('**Human Judgment:** disagree');
    const json = await request(app).get(`/api/learning-review/runs/${runId}/export?format=json`).set('Cookie', u.cookie);
    expect(JSON.stringify(json.body)).toContain('"humanJudgment":"disagree"');
    const pdf = await binary(request(app).get(`/api/learning-review/runs/${runId}/export?format=pdf`).set('Cookie', u.cookie));
    expect(pdfOf(pdf)).toContain('HUMAN JUDGMENT');
    expect(pdfOf(pdf)).toContain('Disagree');
    await judge(u, null);
    expect((await request(app).get(`/api/learning-review/runs/${runId}/export?format=md`).set('Cookie', u.cookie)).text).not.toContain('Human Judgment');
  });

  it('23–25. the next review sees the judgment; facts and the original hypothesis are untouched; new evidence may open a new hypothesis', async () => {
    const { u, runId } = await reviewed('judge-next');
    const unitBefore = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId: u.id, key: 'unit:01' } } });
    await judge(u, 'disagree');
    // FACT unchanged, stored report unchanged (the judgment lives beside it)
    const unitAfter = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId: u.id, key: 'unit:01' } } });
    expect(unitAfter.data).toEqual(unitBefore.data);
    const run = await prisma.learningReviewRun.findUniqueOrThrow({ where: { id: runId } });
    expect(JSON.stringify(run.report)).toContain('ORIGINAL AI HYPOTHESIS');
    // next review: the model is told about the judgment
    await doc(u.id, 'unit:01', { ...(unitAfter.data as any), answers: { ...(unitAfter.data as any).answers, [`01:${OPEN[2]}`]: 'It is proven.' } });
    lrOut = () => ({ observations: [obs({ priorPattern: 'P1', evidenceFor: ['E1'], interpretation: 'A NEW hypothesis from new evidence only.' })], notEnoughEvidence: [], nextSession: [], proposals: [], uncertainties: [] });
    calls = [];
    const r2: any = await runLearningReview(u.id, 'manual');
    expect(r2.status).toBe('completed');
    expect(calls[0].user).toContain('human judgment: disagree');
    const state = await prisma.learningReviewState.findUniqueOrThrow({ where: { userId: u.id } });
    const p = (state.patterns as any[]).find((x) => x.key === 'hedging_strong_claims');
    expect(p.status).toBe('one_off');                              // one new piece: a new, weak hypothesis, not "recurring"
    expect(p.humanJudgment).toBeNull();
    expect(p.evidence).toHaveLength(1);
    expect(p.history.some((h: any) => h.status === 'rejected_by_human' && h.humanJudgment === 'disagree')).toBe(true);
    // the old run still holds the original hypothesis
    expect(JSON.stringify((await prisma.learningReviewRun.findUniqueOrThrow({ where: { id: runId } })).report)).toContain('ORIGINAL AI HYPOTHESIS');
    // and the old judgment does not attach itself to the new hypothesis on the page (now under "not enough evidence")
    const page = await request(app).get('/api/learning-review').set('Cookie', u.cookie);
    expect(page.body.report.sections.notEnoughEvidence.map((x: any) => x.label)).toContain('Strong claims without hedging');
    expect(JSON.stringify(page.body.report)).not.toContain('"humanJudgment":"disagree"');
  });

  it('older stores (bare strings) still count as judgments; withCurrentJudgments never mutates the stored report', () => {
    expect(normalizeJudgments({ a: 'agree', b: { judgment: 'not_sure', at: '2026-10-01T00:00:00.000Z' }, c: 'nonsense', d: null })).toEqual({ a: { judgment: 'agree', at: null }, b: { judgment: 'not_sure', at: '2026-10-01T00:00:00.000Z' } });
    const report: any = { sections: { recurring: [{ key: 'a', interpretation: 'i', humanJudgment: null }] } };
    const view = withCurrentJudgments(report, normalizeJudgments({ a: 'agree' }));
    expect(view.sections.recurring[0].humanJudgment).toBe('agree');
    expect(report.sections.recurring[0].humanJudgment).toBeNull();
    expect(typeof mergeReview).toBe('function');
  });

  it('the page clears a judgment by choosing it again, and shows only what the server confirmed', async () => {
    const report = { runId: 'r', generatedAt: '2026-10-01T00:00:00.000Z', period: { from: null, to: '2026-10-01T00:00:00.000Z' }, evidence: { total: 1, byOrigin: { learner: 1, check: 0, record: 0, ai: 0 }, deferred: 0 }, workedOn: [], sections: { gettingStronger: [], emerging: [], recurring: [{ key: 'k1', label: 'L', status: 'recurring', confidence: 'moderate', evidenceCount: 3, activityCount: 2, sourceCount: 1, firstSeen: '2026-09-01', lastSeen: '2026-09-02', interpretation: 'i', implication: '', evidence: [], counterEvidence: [], humanJudgment: 'agree' }], improving: [], recognitionToProduction: [], notEnoughEvidence: [] }, nextSession: [], proposals: [], warnings: [], uncertainties: [] };
    const posted: any[] = [];
    let fail = false;
    const a: any = loadApp({}, { fetch: (url: string, body: any) => url === '/api/learning-review' ? { status: 200, body: { available: true, report, pending: 0 } } : url === '/api/learning-review/judgments' ? (posted.push(body), fail ? { status: 500, body: {} } : { status: 200, body: { success: true, judgment: body.judgment } }) : { status: 404, body: {} } });
    a.go('learning');
    await new Promise((r) => setTimeout(r, 10));
    a.click({ lrJudge: 'agree', lrKey: 'k1' });
    await new Promise((r) => setTimeout(r, 10));
    expect(posted.pop()).toEqual({ patternKey: 'k1', judgment: null });                // same choice again = clear
    expect(a.ctx.KLANG_LEARNING_REVIEW._state().DATA.report.sections.recurring[0].humanJudgment).toBeNull();
    fail = true;
    a.click({ lrJudge: 'disagree', lrKey: 'k1' });
    await new Promise((r) => setTimeout(r, 10));
    expect(a.ctx.KLANG_LEARNING_REVIEW._state().DATA.report.sections.recurring[0].humanJudgment).toBeNull();   // not saved → not shown
  });
});

it('no real network call was made by this suite', () => { expect(network).toEqual([]); });
