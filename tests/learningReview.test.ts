import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import request from 'supertest';

// Any request the real OpenAI client could make lands here: the suite proves nothing leaves the machine.
const network: string[] = [];
vi.stubGlobal('fetch', async (url: any) => { network.push(String(url)); return new Response('{}', { status: 500 }); });

import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';
import { allModels } from './helpers/aiModels';
import { loadApp } from './helpers/appHarness';
import { __setStructuredCallForTests, AiRequestError } from '../src/services/ai/provider';
import { activityIndex, extractEvidence, LIMITS } from '../src/services/learningReview/evidence';
import { mergeReview, PatternState, BASE_CONSTRAINTS } from '../src/services/learningReview/merge';
import { runLearningReview, nextUnstudiedUnit } from '../src/services/learningReview/pipeline';
import { LearningReviewOutputSchema } from '../src/services/learningReview/schema';
import { nightly } from '../src/cli/nightlyLearningReview';

const SECRET = 'ZEBRA-SENTINEL-7731';   // appears only in learner text: must never reach a log
const U1 = [...activityIndex('01').values()];
const OPEN = U1.filter((a) => a.stage === 'interpret' && a.type === 'open').map((a) => a.id);
const MC = U1.filter((a) => a.stage === 'interpret' && a.type === 'mc').map((a) => a.id);
const THINK_OPEN = U1.filter((a) => a.stage === 'think' && a.type === 'open').map((a) => a.id);
const empty = { observations: [], notEnoughEvidence: [], nextSession: [], proposals: [], uncertainties: [] };
const out = (o: any = {}) => ({ ...empty, ...o });
const obs = (o: any) => ({ kind: 'difficulty', patternKey: 'hedging_strong_claims', label: 'Strong claims without hedging', priorPattern: null, evidenceFor: [], evidenceAgainst: [], interpretation: 'You state inferences as certainties.', claimedConfidence: 'high', implication: '', ...o });

let calls: any[] = [];
let respond: (p: any) => any = () => out();
const fake = () => {
  config.ai.apiKey = 'sk-test-not-real'; config.ai.models = allModels('fake-model') as any;
  __setStructuredCallForTests(async (p: any) => { calls.push(p); return respond(p); });
};
const original = { ai: { ...config.ai }, lr: { ...config.learningReview } };
const stamp = Date.now();
const emails: string[] = [];
async function user(tag: string) {
  const email = `lr-${tag}-${stamp}@example.com`; emails.push(email);
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
const snapshotDocs = async (userId: string) => JSON.stringify(await prisma.userDocument.findMany({ where: { userId }, orderBy: { key: 'asc' }, select: { key: true, data: true, revision: true, updatedAt: true } }));
const dataHash = () => crypto.createHash('sha256').update(fs.readdirSync(path.resolve(__dirname, '../public/data')).sort().map((f) => fs.readFileSync(path.resolve(__dirname, '../public/data', f), 'utf8')).join('')).digest('hex');

afterEach(() => { Object.assign(config.ai, original.ai); Object.assign(config.learningReview, original.lr); __setStructuredCallForTests(null); calls = []; respond = () => out(); });
afterAll(async () => { await prisma.user.deleteMany({ where: { email: { in: emails } } }); await prisma.$disconnect(); });

/* ── A. Evidence: what exists, where it comes from, minimised ── */
describe('Learning Review · evidence', () => {
  it('reads only real synced data, labels origin, and never sends whole texts', () => {
    const long = 'word '.repeat(900);
    const docs: any[] = [
      { key: 'unit:01', revision: 3, updatedAt: new Date(), data: unit01({
        [`01:${OPEN[0]}`]: 'The author implies memory is stored, not lost.',
        [`01:${OPEN[0]}:intfb`]: { at: '2026-09-29T10:00:00Z', f: { content: { verdict: 'partial', commentary: 'c' }, language: { meaningClear: true, pointsToNotice: [{ quote: 'is stored', category: 'error', issue: 'x', suggestion: 'y' }], errorLogCandidate: null } } },
        [`01:${MC[0]}`]: '1', [`01:${MC[0]}:checked`]: { answer: '1', at: '2026-09-29T09:00:00Z' },
        [`01:${MC[1]}`]: '2', [`01:${MC[1]}:checked`]: { answer: '0', at: '2026-09-29T09:00:00Z' },   // changed after the check: not evidence
        '01:w2': long,
      }) },
      { key: 'glossary', revision: 1, updatedAt: new Date(), data: { gl: { '01:x:abc': 'learning' }, glx: [{ id: 'abc', term: 'tip of my tongue', u: '01' }] } },
      { key: 'bookmarks', revision: 1, updatedAt: new Date(), data: { bm: [{ x: 1 }] } },
      { key: 'english-profile', revision: 1, updatedAt: new Date(), data: { overall: 'B2' } },
    ];
    const ev = extractEvidence(docs);
    const byId = Object.fromEntries(ev.map((e) => [e.id, e]));
    expect(byId[`ans:01:${OPEN[0]}`].origin).toBe('learner');
    expect(byId[`intfb:01:${OPEN[0]}`].origin).toBe('ai');
    expect(byId[`intfb:01:${OPEN[0]}`].linkedTo).toBe(`ans:01:${OPEN[0]}`);
    expect(byId[`chk:01:${MC[0]}`].origin).toBe('check');
    expect(byId[`chk:01:${MC[1]}`]).toBeUndefined();
    expect(byId['gl:01:x:abc'].text).toContain('tip of my tongue');
    expect(byId['ans:01:w2'].kind).toBe('writing_draft');
    expect(byId['ans:01:w2'].text.length).toBeLessThan(LIMITS.writing + 40);
    expect(ev.some((e) => /bookmark|profile/.test(e.id))).toBe(false);
    expect(ev.every((e) => /^[0-9a-f]{20}$/.test(e.hash))).toBe(true);
  });

  it('the next unstudied unit is the one after the furthest unit with work', () => {
    const n = nextUnstudiedUnit([{ key: 'unit:01', revision: 1, updatedAt: new Date(), data: unit01({ [`01:${OPEN[0]}`]: 'x' }) }]);
    expect(n!.id).toBe('02');
    expect(n!.candidates.length).toBeGreaterThan(0);
    expect(n!.candidates.every((a) => ['know', 'interpret', 'notice', 'steal', 'think', 'write'].includes(a.stage) && ['open', 'produce', 'writing'].includes(a.type))).toBe(true);
    expect(nextUnstudiedUnit([])).toBeNull();
  });
});

/* ── B. Deterministic guards (the model cannot overclaim) ── */
describe('Learning Review · guards', () => {
  const item = (n: number, activity = OPEN[n % OPEN.length], origin: any = 'learner') => ({ id: `ans:01:${activity}:${n}`, hash: 'h' + n, unit: '01', stage: 'interpret', activityId: activity, activityLabel: `Unit 01 · INTERPRET · ${activity}`, origin, kind: origin === 'ai' ? 'interpret_feedback' : 'open_answer', at: '2026-09-29T10:00:00.000Z', task: 't', text: `answer ${n}`, production: origin === 'learner' });
  const merge = (batch: any[], output: any, prior: PatternState[] = [], nextUnit: any = null) => {
    const refs = new Map(batch.map((e, i) => [e.id, `E${i + 1}`]));
    return mergeReview({ runId: 'run-test', now: '2026-09-30T20:00:00.000Z', trigger: 'manual', period: { from: null, to: '2026-09-30T20:00:00.000Z' }, batch, deferred: 0, refs, prior, output, nextUnit, hintPairs: [], model: { name: 'fake', reasoning: 'none', promptVersion: 'v' } });
  };

  it('a single error never becomes a recurring difficulty, whatever the model claims', () => {
    const { report } = merge([item(1)], out({ observations: [obs({ evidenceFor: ['E1'], claimedConfidence: 'high' })] }));
    expect(report.sections.recurring).toHaveLength(0);
    expect(report.sections.notEnoughEvidence[0].note).toMatch(/Seen once/);
  });

  it('weak evidence (two items, one activity) stays a possible pattern with low confidence', () => {
    const { patterns } = merge([item(1, OPEN[0]), item(2, OPEN[0])], out({ observations: [obs({ evidenceFor: ['E1', 'E2'] })] }));
    expect(patterns[0].status).toBe('possible_pattern');
    expect(patterns[0].confidence).toBe('low');
  });

  it('recurring needs ≥3 pieces in ≥2 activities; confidence is capped by the evidence', () => {
    const { report, patterns } = merge([item(1, OPEN[0]), item(2, OPEN[1]), item(3, OPEN[2])], out({ observations: [obs({ evidenceFor: ['E1', 'E2', 'E3'], claimedConfidence: 'high' })] }));
    expect(patterns[0].status).toBe('recurring');
    expect(patterns[0].confidence).toBe('moderate');
    expect(report.sections.recurring[0].evidenceCount).toBe(3);
    expect(report.sections.recurring[0].activityCount).toBe(3);
  });

  it('earlier AI feedback alone never carries a pattern beyond low confidence', () => {
    const { patterns } = merge([1, 2, 3, 4, 5].map((n) => item(n, OPEN[n % 3], 'ai')), out({ observations: [obs({ evidenceFor: ['E1', 'E2', 'E3', 'E4', 'E5'] })] }));
    expect(patterns[0].confidence).toBe('low');
  });

  const priorRecurring = (): PatternState => {
    const refs = [1, 2, 3].map((n) => ({ id: `old${n}`, label: 'l', origin: 'learner' as const, kind: 'open_answer', at: '2026-09-20T10:00:00.000Z', snippet: 's', runId: 'old', activity: `01:${OPEN[n - 1]}` }));
    return { key: 'hedging_strong_claims', label: 'Strong claims', track: 'difficulty', status: 'recurring', confidence: 'moderate', evidence: refs, counterEvidence: [], activityCount: 3, sourceCount: 1, firstSeen: '2026-09-20T10:00:00.000Z', lastSeen: '2026-09-20T10:00:00.000Z', interpretation: 'i', implication: '', history: [] };
  };

  it('an improving pattern is possible (prior difficulty + new counter-evidence)', () => {
    const { report } = merge([item(1)], out({ observations: [obs({ kind: 'improving', priorPattern: 'P1', evidenceAgainst: ['E1'] })] }), [priorRecurring()]);
    expect(report.sections.improving[0].status).toBe('improving');
    expect(report.sections.improving[0].firstSeen).toBe('2026-09-20T10:00:00.000Z');
  });

  it('a resolved pattern is possible, but only with a prior difficulty and counter-evidence in 2 activities', () => {
    const ok = merge([item(1, OPEN[0]), item(2, OPEN[1])], out({ observations: [obs({ kind: 'resolved', priorPattern: 'P1', evidenceAgainst: ['E1', 'E2'] })] }), [priorRecurring()]);
    expect(ok.report.sections.improving[0].status).toBe('apparently_resolved');
    const noPrior = merge([item(1, OPEN[0]), item(2, OPEN[1])], out({ observations: [obs({ kind: 'resolved', evidenceAgainst: ['E1', 'E2'] })] }));
    expect(noPrior.patterns[0].status).not.toBe('apparently_resolved');
  });

  it('references outside this period are dropped; an observation with none is discarded', () => {
    const { report, patterns } = merge([item(1)], out({ observations: [obs({ evidenceFor: ['E9', 'P1', 'C1'] })] }));
    expect(patterns).toHaveLength(0);
    expect(report.warnings.join(' ')).toMatch(/discarded because they cited no evidence/);
  });

  it('an empty answer stays empty: no section is invented', () => {
    const { report } = merge([item(1)], out());
    const s = report.sections;
    expect([s.gettingStronger, s.emerging, s.recurring, s.improving, s.recognitionToProduction, s.notEnoughEvidence, report.nextSession, report.proposals].every((x) => x.length === 0)).toBe(true);
    expect(report.workedOn.length).toBe(1);   // FACT: what was studied is always reported
  });

  it('generic next-session advice is discarded; concrete, evidenced advice is kept (max 3)', () => {
    const { report } = merge([item(1)], out({ nextSession: [
      { action: 'Improve your grammar.', why: 'because grammar', patternKeys: [], evidence: ['E1'] },
      { action: 'Rewrite your answer to i3 with one hedged claim ("seems to", "suggests").', why: 'Your i3 answer states an inference as fact.', patternKeys: [], evidence: ['E1'] },
      { action: 'Compare two answers and mark each claim as fact or inference.', why: 'Nothing to cite here at all.', patternKeys: [], evidence: [] },
    ] }));
    expect(report.nextSession).toHaveLength(1);
    expect(report.nextSession[0].action).toMatch(/Rewrite your answer/);
  });

  it('proposals: only eligible next-unit activities, only for a supported difficulty, never applied', () => {
    const next = nextUnstudiedUnit([{ key: 'unit:01', revision: 1, updatedAt: new Date(), data: unit01({ [`01:${OPEN[0]}`]: 'x' }) }])!;
    const target = next.candidates.find((a) => a.stage === 'interpret')!;
    const batch = [item(1, OPEN[0]), item(2, OPEN[1]), item(3, OPEN[2])];
    const prop = (activityId: string) => ({ activityId, action: 'adapt', patternKeys: ['hedging_strong_claims'], proposedChange: 'Keep the reading objective; require one cautious disagreement.', rationale: 'Repeated overclaiming across three activities.', workloadImpact: 'same', risks: 'May narrow the task.', extraConstraints: [] });
    const good = merge(batch, out({ observations: [obs({ evidenceFor: ['E1', 'E2', 'E3'] })], proposals: [prop(target.id), prop('02r1'), prop(OPEN[0])] }), [], next);
    expect(good.report.proposals).toHaveLength(1);
    const p = good.report.proposals[0];
    expect(p).toMatchObject({ unit: '02', activityId: target.id, status: 'proposed · not applied' });
    expect(p.currentObjective).toContain(target.q.slice(0, 20));
    expect(p.constraints.slice(0, BASE_CONSTRAINTS.length)).toEqual(BASE_CONSTRAINTS);
    expect(good.report.warnings.join(' ')).toMatch(/2 adaptation proposal\(s\) were withheld/);
    const weak = merge([item(1)], out({ observations: [obs({ evidenceFor: ['E1'] })], proposals: [prop(target.id)] }), [], next);
    expect(weak.report.proposals).toHaveLength(0);
  });

  it('counter-evidence ratio prevents false recurring difficulty when positive uses dominate', () => {
    // 2 problem items + 6 positive counter-evidence items
    const problems = [item(1, OPEN[0]), item(2, OPEN[1])];
    const positives = [3, 4, 5, 6, 7, 8].map((n) => ({ ...item(n, OPEN[n % OPEN.length]), positive: true }));
    const all = [...problems, ...positives];
    const { patterns, report } = merge(all, out({
      observations: [obs({
        evidenceFor: ['E1', 'E2'],
        evidenceAgainst: ['E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
        claimedConfidence: 'high',
      })],
    }));
    // High ratio of positive counter-evidence prevents status from being recurring difficulty
    expect(patterns[0].status).not.toBe('recurring');
    expect(report.sections.recurring).toHaveLength(0);
  });

  it('human rejection (disagree) marks pattern as rejected_by_human and suppresses proposals', () => {
    const next = nextUnstudiedUnit([{ key: 'unit:01', revision: 1, updatedAt: new Date(), data: unit01({ [`01:${OPEN[0]}`]: 'x' }) }])!;
    const target = next.candidates.find((a) => a.stage === 'interpret')!;
    const batch = [item(1, OPEN[0]), item(2, OPEN[1]), item(3, OPEN[2])];
    const prop = (activityId: string) => ({ activityId, action: 'adapt', patternKeys: ['hedging_strong_claims'], proposedChange: 'Require hedged claims.', rationale: 'Rationale.', workloadImpact: 'same', risks: 'r', extraConstraints: [] });
    const humanJudgments = { hedging_strong_claims: 'disagree' as const };
    const res = mergeReview({
      runId: 'run-test', now: '2026-09-30T20:00:00.000Z', trigger: 'manual', period: { from: null, to: '2026-09-30T20:00:00.000Z' },
      batch, deferred: 0, refs: new Map(batch.map((e, i) => [e.id, `E${i + 1}`])), prior: [],
      output: out({ observations: [obs({ evidenceFor: ['E1', 'E2', 'E3'] })], proposals: [prop(target.id)] }),
      nextUnit: next, hintPairs: [], humanJudgments, model: { name: 'fake', reasoning: 'none', promptVersion: 'v' },
    });
    expect(res.patterns[0].status).toBe('rejected_by_human');
    expect(res.report.proposals).toHaveLength(0);
  });

  it('invalid structured output is rejected by the schema', () => {
    expect(LearningReviewOutputSchema.safeParse(out()).success).toBe(true);
    expect(LearningReviewOutputSchema.safeParse({ observations: [] }).success).toBe(false);
    expect(LearningReviewOutputSchema.safeParse(out({ observations: [obs({ kind: 'certain_failure' })] })).success).toBe(false);
    expect(LearningReviewOutputSchema.safeParse(out({ proposals: [{ activityId: 'x' }] })).success).toBe(false);
  });
});

/* ── C. Pipeline, boundary, concurrency, failure (test database, fake provider) ── */
describe('Learning Review · pipeline', () => {
  it('no new activity → zero AI calls (also with nothing studied at all)', async () => {
    fake();
    const u = await user('none');
    expect(await runLearningReview(u.id, 'manual')).toEqual({ status: 'no_new_evidence' });
    expect(calls).toHaveLength(0);
    expect(await prisma.learningReviewRun.count({ where: { userId: u.id } })).toBe(0);
  });

  it('new activity → exactly one analysis; the boundary then stops a second one; only changes are re-sent', async () => {
    fake();
    const u = await user('one');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'First answer.', [`01:${OPEN[1]}`]: 'Second answer.' }));
    const r1 = await runLearningReview(u.id, 'manual');
    expect(r1.status).toBe('completed');
    expect(calls).toHaveLength(1);
    expect(calls[0].fn).toBe('nightlyLearningReview');
    expect(calls[0].user).toContain('First answer.');
    expect(await runLearningReview(u.id, 'manual')).toEqual({ status: 'no_new_evidence' });
    expect(calls).toHaveLength(1);

    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'First answer.', [`01:${OPEN[1]}`]: 'Second answer, revised.' }));
    const r2 = await runLearningReview(u.id, 'manual');
    expect(r2.status).toBe('completed');
    expect(calls).toHaveLength(2);
    expect(calls[1].user).toContain('Second answer, revised.');
    expect(calls[1].user.split('NEW EVIDENCE')[1].split('PRIOR PATTERNS')[0]).not.toContain('First answer.');
    const run = await prisma.learningReviewRun.findUniqueOrThrow({ where: { id: (r2 as any).runId } });
    expect(run.evidenceIds).toEqual([`ans:01:${OPEN[1]}`]);
    expect(run.fromRunId).toBe((r1 as any).runId);
    expect((run.docRevisions as any)['unit:01']).toBe(2);
    expect(run).toMatchObject({ model: 'fake-model', promptVersion: 'learning-review-v1', status: 'succeeded' });
  });

  it('button and scheduler at the same time → one analysis', async () => {
    fake();
    config.learningReview.nightlyEnabled = true;
    const u = await user('race');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Seed.' }));
    await runLearningReview(u.id, 'manual');                  // first review by hand: enrols the nightly job
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Seed.', [`01:${OPEN[1]}`]: 'New work.' }));
    calls = [];
    respond = async () => { await new Promise((r) => setTimeout(r, 150)); return out(); };
    const [a, b] = await Promise.all([runLearningReview(u.id, 'manual'), nightly()]);
    expect(calls).toHaveLength(1);
    expect([a.status, b.completed ? 'completed' : b.busy ? 'busy' : 'other'].sort()).toEqual(['busy', 'completed']);
    expect(await runLearningReview(u.id, 'manual')).toEqual({ status: 'no_new_evidence' });
    expect(calls).toHaveLength(1);
  });

  it('two clicks at once through the API → one 200, one 409, one AI call', async () => {
    fake();
    const u = await user('clicks');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Clicked twice.' }));
    respond = async () => { await new Promise((r) => setTimeout(r, 150)); return out(); };
    const [a, b] = await Promise.all([1, 2].map(() => request(app).post('/api/learning-review/run').set('Cookie', u.cookie).send({})));
    expect([a.status, b.status].sort()).toEqual([200, 409]);
    expect(calls).toHaveLength(1);
  });

  it('failure keeps the previous report and the boundary; a manual retry is safe', async () => {
    fake();
    const u = await user('fail');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Kept.' }));
    const ok = await runLearningReview(u.id, 'manual');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Kept.', [`01:${OPEN[1]}`]: 'Will fail first.' }));
    respond = () => { throw new AiRequestError('timeout', 'timeout'); };
    const bad = await request(app).post('/api/learning-review/run').set('Cookie', u.cookie).send({});
    expect(bad.status).toBe(504);
    expect(bad.body.previousKept).toBe(true);
    const get = await request(app).get('/api/learning-review').set('Cookie', u.cookie);
    expect(get.body.report.runId).toBe((ok as any).runId);
    expect(get.body.lastRun.status).toBe('failed');
    expect(get.body.pending).toBe(1);
    respond = () => out();
    const retry = await runLearningReview(u.id, 'manual');
    expect(retry.status).toBe('completed');
    expect(calls[calls.length - 1].user).toContain('Will fail first.');
  });

  it('invalid structured output → run failed, nothing committed', async () => {
    fake();
    const u = await user('badout');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'x y z' }));
    respond = () => ({ observations: 'not an array' });
    const r = await runLearningReview(u.id, 'manual');
    expect(r).toMatchObject({ status: 'failed', code: 'ai_bad_output' });
    const st = await prisma.learningReviewState.findUniqueOrThrow({ where: { userId: u.id } });
    expect(st.lastSuccessfulRunId).toBeNull();
    expect(st.analysed).toEqual({});
  });

  it('a crashed run (expired lease) is taken over after a restart; a live lease blocks', async () => {
    fake();
    const u = await user('restart');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'After restart.' }));
    await prisma.learningReviewState.create({ data: { userId: u.id, leaseRunId: 'dead-run', leaseExpiresAt: new Date(Date.now() + 60_000) } });
    expect((await runLearningReview(u.id, 'manual')).status).toBe('busy');
    expect(calls).toHaveLength(0);
    await prisma.learningReviewRun.create({ data: { id: crypto.randomUUID(), userId: u.id, trigger: 'nightly', status: 'running', toAt: new Date(), docRevisions: {}, evidenceIds: [], model: 'm', reasoning: 'r', promptVersion: 'v' } });
    await prisma.learningReviewState.update({ where: { userId: u.id }, data: { leaseExpiresAt: new Date(Date.now() - 1000) } });
    expect((await runLearningReview(u.id, 'manual')).status).toBe('completed');
    expect(await prisma.learningReviewRun.count({ where: { userId: u.id, status: 'abandoned' } })).toBe(1);
  });

  it('logs carry metadata only: no answers, snippets or report text', async () => {
    fake();
    const u = await user('logs');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: `My answer ${SECRET}.`, [`01:${OPEN[1]}`]: `Another ${SECRET}.` }));
    const lines: string[] = [];
    const spies = (['log', 'info', 'warn', 'error'] as const).map((m) => vi.spyOn(console, m).mockImplementation((...a: any[]) => { lines.push(a.map(String).join(' ')); }));
    respond = () => out({ observations: [obs({ kind: 'emerging', evidenceFor: ['E1'], interpretation: `Interpretation mentioning ${SECRET}.` })] });
    await runLearningReview(u.id, 'manual');
    respond = () => { throw new AiRequestError('x', 'upstream'); };
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: `Changed ${SECRET}.` }));
    await runLearningReview(u.id, 'manual');
    spies.forEach((s) => s.mockRestore());
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.join('\n')).not.toContain(SECRET);
    expect(lines.join('\n')).not.toMatch(/Interpretation mentioning/);
  });

  it('the review never writes learner data or curriculum: answers, Glossary, Error Log, progress unchanged; nothing applied', async () => {
    fake();
    const u = await user('readonly');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'A', [`01:${OPEN[1]}`]: 'B', [`01:${OPEN[2]}`]: 'C' }));
    await doc(u.id, 'glossary', { gl: { '01:x:g1': 'learning' }, glx: [{ id: 'g1', term: 'dark corridors', u: '01' }] });
    await doc(u.id, 'error-log', { errs: [{ id: 'e1', mine: 'I am agree', corr: 'I agree', why: 'verb', ex: '', u: '01', n: 0, last: '' }] });
    await doc(u.id, 'progress', { md: {}, last: null, prefs: { fs: 19, w: 66 }, lb: null });
    const before = await snapshotDocs(u.id), curriculum = dataHash();
    const next = nextUnstudiedUnit(await prisma.userDocument.findMany({ where: { userId: u.id } }) as any)!;
    respond = () => out({
      observations: [obs({ evidenceFor: ['E1', 'E2', 'E3'] })],
      proposals: [{ activityId: next.candidates[0].id, action: 'replace', patternKeys: ['hedging_strong_claims'], proposedChange: 'Replace with an equivalent task requiring cautious disagreement.', rationale: 'Repeated across three answers.', workloadImpact: 'same', risks: 'r', extraConstraints: [] }],
    });
    const r = await runLearningReview(u.id, 'manual');
    expect(r.status).toBe('completed');
    expect((r as any).report.proposals[0].status).toBe('proposed · not applied');
    expect(await snapshotDocs(u.id)).toBe(before);
    expect(dataHash()).toBe(curriculum);
    for (const p of ['/api/learning-review/apply', `/api/learning-review/proposals/0/apply`]) expect((await request(app).post(p).set('Cookie', u.cookie).send({})).status).toBe(404);
  });
});

/* ── D. API: auth, Demo, rate limit, PDF ── */
describe('Learning Review · API', () => {
  it('requires a session', async () => {
    expect((await request(app).get('/api/learning-review')).status).toBe(401);
    expect((await request(app).post('/api/learning-review/run').send({})).status).toBe(401);
    expect((await request(app).get(`/api/learning-review/runs/${crypto.randomUUID()}/pdf`)).status).toBe(401);
  });

  it('Demo: no review, no AI (same policy as every AI feature)', async () => {
    fake();
    const email = `lr-demo-${stamp}@example.com`; emails.push(email);
    const { hashPassword } = await import('../src/services/authService');
    await prisma.user.create({ data: { email, passwordHash: await hashPassword('Password123!'), isDemo: true } });
    const login = await request(app).post('/api/auth/login').send({ email, password: 'Password123!' });
    const cookie = login.headers['set-cookie'].find((c: string) => c.includes('klang_session')).split(';')[0];
    expect((await request(app).get('/api/learning-review').set('Cookie', cookie)).body).toMatchObject({ isDemo: true, available: false });
    expect((await request(app).post('/api/learning-review/run').set('Cookie', cookie).send({})).status).toBe(403);
    expect(calls).toHaveLength(0);
  });

  it('not configured → 503 without calling anything', async () => {
    config.ai.models = { ...config.ai.models, nightlyLearningReview: '' };
    const u = await user('nocfg');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'x' }));
    expect((await request(app).post('/api/learning-review/run').set('Cookie', u.cookie).send({})).status).toBe(503);
  });

  it('manual rate limit counts only runs that reach the AI', async () => {
    fake();
    const u = await user('limit');
    let n = 0;
    const run = () => request(app).post('/api/learning-review/run').set('Cookie', u.cookie).send({});
    for (let i = 0; i < config.learningReview.perHour; i++) {
      await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: `v${++n}` }));
      expect((await run()).status).toBe(200);
      expect((await run()).body.status).toBe('no_new_evidence');   // free: no new evidence, no AI
    }
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: `v${++n}` }));
    expect((await run()).status).toBe(429);
    expect(calls).toHaveLength(config.learningReview.perHour);
  });

  it('exports a readable PDF of the owner\'s report only', async () => {
    fake();
    const u = await user('pdf'), other = await user('pdf-other');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Claims “with” curly quotes — and → arrows.', [`01:${OPEN[1]}`]: 'b', [`01:${OPEN[2]}`]: 'c' }));
    respond = () => out({ observations: [obs({ evidenceFor: ['E1', 'E2', 'E3'] })], nextSession: [{ action: 'Rewrite one claim from your first answer with a hedge.', why: 'It states an inference as fact.', patternKeys: ['hedging_strong_claims'], evidence: ['E1'] }], uncertainties: ['Only one unit studied so far.'] });
    const r: any = await runLearningReview(u.id, 'manual');
    const res = await request(app).get(`/api/learning-review/runs/${r.runId}/pdf`).set('Cookie', u.cookie).buffer(true).parse((resp, cb) => { const b: Buffer[] = []; resp.on('data', (c: Buffer) => b.push(c)); resp.on('end', () => cb(null, Buffer.concat(b))); });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('application/pdf');
    const pdf: Buffer = res.body, text = pdf.toString('latin1');
    expect(text.startsWith('%PDF-1.4')).toBe(true);
    expect(text.trimEnd().endsWith('%%EOF')).toBe(true);
    const xref = Number(text.match(/startxref\n(\d+)/)![1]);
    expect(text.slice(xref, xref + 4)).toBe('xref');
    for (const s of ['Learning Review', 'Evidence considered', 'Recurring patterns', 'AI INTERPRETATION', 'Next session', 'Proposed adaptations', 'Warnings and uncertainties', 'Only one unit studied']) expect(text).toContain(s);
    expect(text).not.toContain(r.runId);
    expect(text).not.toContain('fake-model');
    expect((await request(app).get(`/api/learning-review/runs/${r.runId}/pdf`).set('Cookie', other.cookie)).status).toBe(404);

    // Markdown export
    const mdRes = await request(app).get(`/api/learning-review/runs/${r.runId}/export?format=md`).set('Cookie', u.cookie);
    expect(mdRes.status).toBe(200);
    expect(mdRes.headers['content-type']).toContain('text/markdown');
    expect(mdRes.text).toContain('# Learning Review · A Mind in English');
    expect(mdRes.text).toContain('Strong claims without hedging');

    // JSON export
    const jsonRes = await request(app).get(`/api/learning-review/runs/${r.runId}/export?format=json`).set('Cookie', u.cookie);
    expect(jsonRes.status).toBe(200);
    expect(jsonRes.body.runId).toBe(r.runId);
    expect(jsonRes.body.workedOn).toBeDefined();

    // HTML export: same saved report, readable, no internal ids, other users cannot read it
    const htmlRes = await request(app).get(`/api/learning-review/runs/${r.runId}/export?format=html`).set('Cookie', u.cookie);
    expect(htmlRes.status).toBe(200);
    expect(htmlRes.headers['content-type']).toContain('text/html');
    for (const s of ['Learning Review', 'Recurring patterns', 'AI interpretation', 'Next session', 'Proposed adaptations', 'Strong claims without hedging', 'Only one unit studied']) expect(htmlRes.text).toContain(s);
    expect(htmlRes.text).toContain('Claims “with” curly quotes');
    expect(htmlRes.text).not.toContain(r.runId);
    expect((await request(app).get(`/api/learning-review/runs/${r.runId}/export?format=html`).set('Cookie', other.cookie)).status).toBe(404);
  });

  it('records human judgments via /api/learning-review/judgments endpoint', async () => {
    const u = await user('judge');
    const res = await request(app)
      .post('/api/learning-review/judgments')
      .set('Cookie', u.cookie)
      .send({ patternKey: 'hedging_strong_claims', judgment: 'agree' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const doc = await prisma.userDocument.findUnique({
      where: { userId_key: { userId: u.id, key: 'learning-judgments' } },
    });
    expect((doc?.data as any)?.judgments?.hedging_strong_claims).toBe('agree');
  });

  it('nightly: off unless enabled; only for learners whose first review was manual; nothing new → no AI', async () => {
    fake();
    const u = await user('nightly');
    await doc(u.id, 'unit:01', unit01({ [`01:${OPEN[0]}`]: 'Not enrolled yet.' }));
    expect((await nightly()).users).toBe(0);                     // disabled by default
    config.learningReview.nightlyEnabled = true;
    await nightly();
    expect(calls.filter((c) => c.user.includes('Not enrolled yet.'))).toHaveLength(0);   // first review stays a human act
    await runLearningReview(u.id, 'manual');
    const before = calls.length;
    const r = await nightly();
    expect(r.completed).toBe(0);
    expect(calls.length).toBe(before);                            // enrolled, nothing new → zero AI
  });
});

/* ── E. Browser book: page, sidebar, no apply control ── */
describe('Learning Review · page', () => {
  it('has a Notebook entry and a page that says it uses AI and changes nothing', () => {
    const a = loadApp();
    const html = a.go('learning');
    expect(html).toContain('Learning <em>Review</em>');
    expect(html).toMatch(/cannot change your book/);
    expect(a.side()).toContain('href="#learning"');
    const src = fs.readFileSync(path.resolve(__dirname, '../public/learning-review.js'), 'utf8');
    expect(src).toMatch(/Uses AI/);
    expect(src).toMatch(/Nothing new to review yet\./);
    expect(src).not.toMatch(/apply all|data-lr="apply"|\/apply/i);
    expect(src).not.toMatch(/S\.(a|gl|errs|glx|pf)\b|save\(/);   // never touches learner state
  });
});

it('no real network call was made by this suite', () => { expect(network).toEqual([]); });
