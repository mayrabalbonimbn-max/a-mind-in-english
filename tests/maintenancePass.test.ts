import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { loadApp } from './helpers/appHarness';
import { buildInterpretFeedbackPrompt } from '../src/services/ai/prompts';
import { SpeakingFeedbackSchema, WritingFeedbackSchema } from '../src/services/ai/schemas';

const root = path.resolve(__dirname, '..');
const read = (f: string) => fs.readFileSync(path.join(root, f), 'utf8');
const { harvestEvidence, generateFullProfile } = require('../public/profile.js');
const flush = () => new Promise((r) => setImmediate(r));
const ESSAY_1 = 'A first language is part of who I am, but a later one is not only a tool.';
const ESSAY_2 = 'Every language I use changes what I notice, so it cannot be a mere tool.';
const fb = (id: string, level = 'B2') => ({ id, at: '2026-09-20T10:00:00Z', draft: 'first', words: 300, f: { estimatedLevel: { level, rationale: 'r' } } });

/* ── A. Module Review: the Timed essay no longer shares the Reasoning Lab MCQ's id ── */
describe('Module Review · Timed essay id collision', () => {
  it('the Timed essays have their own ids, distinct from every Reasoning Lab item', () => {
    const a = loadApp();
    const R = a.ctx.KLANG.reviews;
    expect(R[1].timed.id).toBe('m1tc1');
    expect(R[2].timed.id).toBe('m2tc1');
    for (const id of [1, 2]) {
      const ids = JSON.stringify(R[id]).match(/"id":"[^"]+"/g)!;
      expect(ids.filter((x: string) => x === `"id":"${R[id].timed.id}"`)).toHaveLength(1);
      expect(R[id].reasoning.items.some((it: any) => it.id === `m${id}t1` && it.type === 'mc')).toBe(true);
    }
  });

  it('MCQ → essay (old data): the essay moves to the new key and the overwritten MCQ answer comes back from its check record', () => {
    const a = loadApp({ a: { 'r1:m1t1': ESSAY_1, 'r1:m1t1:checked': { answer: '2', at: '2026-09-20T10:00:00Z' }, 'r1:tc:start': '2026-09-20T09:00:00Z', 'r1:tc:end': '2026-09-20T09:40:00Z' }, pf: { 'r1:m1t1': { s: 'Revised', fb: [fb('f1')] } } });
    const s = a.state();
    expect(s.a['r1:m1tc1']).toBe(ESSAY_1);
    expect(s.a['r1:m1t1']).toBe('2');
    expect(s.pf['r1:m1tc1']).toMatchObject({ s: 'Revised' });
    expect(s.pf['r1:m1tc1'].fb.map((f: any) => f.id)).toEqual(['f1']);
    expect(s.pf['r1:m1t1']).toBeUndefined();
    const html = a.go('r1-synthesis');
    expect(html).toContain(ESSAY_1);
    expect(html).toContain('data-act="fbopen" data-pk="r1:m1tc1"');   // Portfolio feedback still reachable
    expect(a.go('r1-reasoning')).toMatch(/name="r1:m1t1" data-k="r1:m1t1" value="2" checked/);
  });

  it('essay → MCQ (old data): a digit under the shared key stays with the MCQ, and nothing moves', () => {
    const a = loadApp({ a: { 'r2:m2t1': '1', 'r2:m2tc1': ESSAY_2 } });
    const s = a.state();
    expect(s.a['r2:m2t1']).toBe('1');
    expect(s.a['r2:m2tc1']).toBe(ESSAY_2);
    expect(Object.keys(s.a).filter(k => k.includes('legacy'))).toEqual([]);
  });

  it('new data: answering the MCQ and writing the essay no longer overwrite each other, in either order', () => {
    for (const order of [['mcq', 'essay'], ['essay', 'mcq']]) {
      const a = loadApp();
      a.go('r1-synthesis');
      for (const step of order) {
        if (step === 'mcq') a.fire('change', { type: 'radio', dataset: { k: 'r1:m1t1' }, value: '2' });
        else { a.click({ act: 'tcstart', r: '1' }); a.type('r1:m1tc1', ESSAY_1); a.click({ act: 'tcsubmit', r: '1' }); }
      }
      expect(a.state().a['r1:m1t1'], order.join('→')).toBe('2');
      expect(a.state().a['r1:m1tc1'], order.join('→')).toBe(ESSAY_1);
    }
  });

  it('collision without overwrite: different texts under both keys are both kept, visible and never duplicated', () => {
    const a = loadApp({ a: { 'r1:m1t1': ESSAY_1, 'r1:m1tc1': ESSAY_2, 'r1:m1tc1:legacy': 'An even older text.' } });
    const s = a.state();
    expect(s.a['r1:m1tc1']).toBe(ESSAY_2);
    expect(s.a['r1:m1tc1:legacy']).toBe('An even older text.');   // an existing preserved copy is never replaced
    expect(s.a['r1:m1tc1:legacy:2']).toBe(ESSAY_1);
    expect(s.a['r1:m1t1']).toBeUndefined();
    const html = a.go('r1-synthesis');
    expect(html).toContain('Earlier text for this essay');
    expect(html).toContain(ESSAY_1);
    expect(html).toContain('An even older text.');
    // Idempotent: the same old text arriving again (e.g. from an old device) is not stored twice
    const b = loadApp(Object.assign(a.state(), { a: Object.assign(a.state().a, { 'r1:m1t1': ESSAY_1 }) }));
    expect(Object.keys(b.state().a).filter(k => k.startsWith('r1:m1tc1:legacy'))).toHaveLength(2);
  });

  it('the Portfolio merges feedback from both keys without losing any report', () => {
    const a = loadApp({ a: { 'r2:m2t1': ESSAY_2 }, pf: { 'r2:m2t1': { s: 'Drafting', fb: [fb('old1'), fb('same')] }, 'r2:m2tc1': { s: 'Final', d: '2026-09-28', fb: [fb('same'), fb('new1')] } } });
    const pf = a.state().pf['r2:m2tc1'];
    expect(pf.s).toBe('Final');
    expect(pf.d).toBe('2026-09-28');
    expect(pf.fb.map((f: any) => f.id).sort()).toEqual(['new1', 'old1', 'same']);
  });

  it('restore: an old backup with the essay under the shared key is migrated as it is restored', () => {
    const a = loadApp();
    a.ctx.FileReader = class { result = ''; onload: any; readAsText(f: any) { this.result = f.text; this.onload(); } };
    const backup = { app: 'a-mind-in-english', v: 1, saved: '2026-09-01T00:00:00Z', state: { a: { 'r1:m1t1': ESSAY_1, 'r1:m1t1:checked': { answer: '0' } }, pf: { 'r1:m1t1': { fb: [fb('f9')] } }, bank: [{ id: 'b1', e: 'old entry' }] } };
    a.fire('change', { id: 'bkfile', dataset: {}, files: [{ text: JSON.stringify(backup) }], value: '' });
    a.click({ act: 'dorestore' });
    const s = a.state();
    expect(s.a['r1:m1tc1']).toBe(ESSAY_1);
    expect(s.a['r1:m1t1']).toBe('0');
    expect(s.pf['r1:m1tc1'].fb[0].id).toBe('f9');
    expect(s.bank).toEqual([{ id: 'b1', e: 'old entry' }]);   // the retired bank survives a restore untouched
  });

  it('sync: a review document from an older device is migrated on arrival and pushed back', async () => {
    const remote = { key: 'review:1', revision: 3, data: { answers: { 'r1:m1t1': ESSAY_1, 'r1:m1t1:checked': { answer: '2' } }, sections: {}, done: false } };
    const a = loadApp({}, { sync: { user: { id: 'u1', email: 'x@example.com', isDemo: false } }, fetch: (url: string) => url === '/api/docs' ? { status: 200, body: { documents: [remote] } } : { status: 503, body: {} } });
    await flush(); await flush(); await flush();
    const s = a.state();
    expect(s.a['r1:m1tc1']).toBe(ESSAY_1);
    expect(s.a['r1:m1t1']).toBe('2');
    expect(JSON.parse(a.storage.get('klang.mind.pending.v1') || '[]')).toContain('review:1');
  });
});

/* ── B. English Profile: only an explicit writing CEFR estimate becomes a level ── */
describe('English Profile · no invented levels', () => {
  const light = (score: number) => ({ at: '2026-09-20T10:00:00Z', f: { meaningClear: true, pointsToNotice: [], profileEvidence: { grammaticalAccuracyScore: score, lexicalNaturalnessScore: score, observedFeatures: [] } } });

  it('a 0–10 quick-check score never becomes a CEFR level, however many there are', () => {
    const a: any = {};
    ['01', '02', '03', '04', '05', '06'].forEach(u => { a[`${u}:t4:lightfb`] = light(9.5); a[`${u}:i8:intfb`] = { at: 'x', f: { content: { verdict: 'developed', commentary: 'c' }, language: light(9.5).f } }; });
    const P = generateFullProfile({ a }, {});
    for (const d of P.dimensions) expect(d.level, d.key).toBe(null);
    const acc = P.dimensions.find((d: any) => d.key === 'written_accuracy');
    expect(acc.evidenceCount).toBe(12);
    expect(P.overall.level).toBe(null);
  });

  it('no 7.5 fallback: a writing report without a CEFR estimate is evidence without a score', () => {
    const ev = harvestEvidence({ pf: { '01:w2': { fb: [{ id: 'x', at: 't', f: { taskAchievement: { summary: 's' } } }] } } }, {});
    expect(ev).toHaveLength(1);
    expect(ev[0].contributions).toEqual({});
    expect(JSON.stringify(ev)).not.toContain('7.5');
  });

  it('A1 stays A1 (0 is a level, not a missing value)', () => {
    const pf = { '01:w1': { fb: [fb('a', 'A1')] }, '02:w1': { fb: [fb('b', 'A1')] } };
    const P = generateFullProfile({ pf }, {});
    const acc = P.dimensions.find((d: any) => d.key === 'written_accuracy');
    expect(acc.level).toBe('A1');
    expect(acc.score).toBe(0);
  });

  it('explicit writing CEFR feeds Written accuracy and range only; grammar never becomes critical reasoning', () => {
    const pf: any = {};
    ['01', '02', '03'].forEach(u => { pf[`${u}:w2`] = { fb: [{ ...fb(u, 'C1'), f: { estimatedLevel: { level: 'C1', rationale: 'r' }, argumentationReasoning: { summary: 's' }, grammarAccuracy: { summary: 'g' } } }] }; });
    const a: any = { '01:t4:lightfb': light(10), '02:r6:lightfb': light(10) };
    const P = generateFullProfile({ pf, a }, {});
    const dim = (k: string) => P.dimensions.find((d: any) => d.key === k);
    expect(dim('written_accuracy').level).toBe('C1');
    expect(dim('written_range').level).toBe('C1');
    for (const k of ['grammar_control', 'vocabulary', 'critical_reasoning']) {
      expect(dim(k).level, k).toBe(null);
      expect(dim(k).score, k).toBe(null);
    }
    expect(dim('critical_reasoning').evidenceCount).toBe(3);   // assessed, not levelled
  });

  it('speaking feedback is evidence without a level', () => {
    const sp = [1, 2, 3].map(n => ({ id: `s${n}`, unit: '0' + n, activityId: 's1', attempt: 1, feedback: { analysisMode: 'transcript_only', grammar: 'g' } }));
    const d = generateFullProfile({ sp }, {}).dimensions.find((x: any) => x.key === 'spoken_production');
    expect(d.evidenceCount).toBe(3);
    expect(d.level).toBe(null);
  });

  it('a Narrator conversation review score (0–10, no CEFR anchor) never becomes a level', () => {
    const conv = (id: string) => ({ conversationId: id, unitId: '01', reviewState: { status: 'complete', audit: { reviewedAt: '2026-09-20' }, result: { profileEvidenceCandidates: [
      { eligible: true, evidenceEventId: `${id}-g`, dimension: 'grammar_control', score: 9, weight: 0.5, turnIds: [] },
      { eligible: true, evidenceEventId: `${id}-v`, dimension: 'vocabulary', score: 9, weight: 0.5, turnIds: [] },
    ] } } });
    const conversations: any = {}; ['conv_aaaaaaaa', 'conv_bbbbbbbb', 'conv_cccccccc', 'conv_dddddddd'].forEach(id => { conversations[id] = conv(id); });
    const ev = harvestEvidence({ conversations }, {});
    expect(ev).toHaveLength(8);
    ev.forEach((e: any) => expect(e.contributions).toEqual({}));
    const P = generateFullProfile({ conversations }, {});
    for (const k of ['grammar_control', 'vocabulary']) {
      const d = P.dimensions.find((x: any) => x.key === k);
      expect(d.evidenceCount).toBe(4);
      expect(d.level).toBe(null);
    }
  });

  it('the Profile page shows evidence without a level and no Register Control block', () => {
    const sp = [1, 2, 3].map(n => ({ id: `s${n}`, unit: '0' + n, activityId: 's1', attempt: 1, date: '2026-09-20', feedback: { grammar: 'g' } }));
    const a = loadApp({ sp });
    const html = a.go('profile');
    expect(html).not.toMatch(/Register Control|register-control-block|STRONG CONTROL|CONVERSATIONAL/);
    expect(html).toContain('Evidence recorded · no level estimate');
  });
});

/* ── C. INTERPRET feedback: judged without the reading ── */
describe('Interpret feedback · without the reading', () => {
  it('the prompt says the model has not seen the reading and sends no paragraph of it', () => {
    const p = buildInterpretFeedbackPrompt({ unitId: '01', itemId: 'i8', text: 'She felt like a fraud because…' })!;
    expect(p.system).toContain('You have NOT seen the reading');
    expect(p.user).toContain('You have not seen the reading');
    expect(p.system).toMatch(/NEVER say that the answer is or is not supported by the text/);
    expect(p.system).not.toMatch(/'accurate'|'insightful'|'misunderstood'|keyInsightCaptured/);
    const a = loadApp();
    const main = a.ctx.KLANG.units['01'].read.main;
    for (const para of main.paras) expect(p.user).not.toContain(String(para).replace(/<[^>]+>/g, '').slice(0, 60));
  });

  it('badges: the four verdicts get their own labels; older or unknown verdicts get no badge (never "Misunderstood")', () => {
    const f = (verdict: string) => ({ at: 'x', f: { content: { verdict, commentary: `note-${verdict}` }, language: { meaningClear: true, pointsToNotice: [] } } });
    const a = loadApp({ a: { '01:i8': 'x', '01:i8:intfb': f('developed'), '01:i9': 'x', '01:i9:intfb': f('partial'), '01:i10': 'x', '01:i10:intfb': f('not_answered'), '01:i11': 'x', '01:i11:intfb': f('needs_clarification'), '01:i12': 'x', '01:i12:intfb': f('misunderstood'), '01:i13': 'x', '01:i13:intfb': f('accurate'), '01:i14': 'x', '01:i14:intfb': f('something_new') } });
    const html = a.go('u01-interpret');
    for (const label of ['>Developed<', '>Partial<', '>Not answered<', '>Question clarification<']) expect(html).toContain(label);
    expect(html).not.toMatch(/Misunderstood|>Accurate<|>Insightful<|Not assessable/);
    for (const v of ['misunderstood', 'accurate', 'something_new']) expect(html).toContain(`note-${v}`);   // the comment stays
  });
});

/* ── D. Language Bank: retired from the experience, old data kept ── */
describe('Language Bank · retired', () => {
  const OLD_BANK = [{ id: 'b1', t: 'Chunk', e: 'at a critical juncture', m: 'at a decisive point', x: '', s: 'Unit 01', d: '2026-09-01' }];

  it('no page, route, sidebar link, Home card or form', () => {
    const a = loadApp({ bank: OLD_BANK });
    const home = a.go('home');
    expect(home).not.toMatch(/Language Bank|href="#bank"/);
    expect(a.side()).not.toMatch(/Language Bank|href="#bank"/);
    const bankRoute = a.go('bank');
    expect(bankRoute).not.toMatch(/bankform|My Language/);
    expect(bankRoute).toContain('class="cover"');
    expect(read('public/app.js')).not.toMatch(/renderBank|bankform|data-bkf|sp2bank|fb2bank|rg2bank|registerToBank|addSuggestionToBank/);
  });

  it('writing and speaking feedback show no Bank suggestions, even in reports saved before', () => {
    const a = loadApp({ pf: { '01:w2': { fb: [{ id: 'f1', at: '2026-09-20T10:00:00Z', draft: 'first', words: 300, f: { estimatedLevel: { level: 'B2', rationale: 'r' }, suggestedErrorLog: [], suggestedLanguageBank: [{ type: 'Chunk', entry: 'OLD-BANK-ENTRY', meaning: 'm', example: 'e' }], nextDraftPriorities: [] } }] } },
      sp: [{ id: 'sp1', unit: '01', activityId: 's1', attempt: 1, date: '2026-09-20T10:00:00Z', duration: 60, transcript: 't', feedback: { grammar: 'g', corrections: [{ original: 'o', better: 'b', why: 'w' }], languageBank: [{ entry: 'OLD-SPOKEN-ENTRY', meaning: 'm', example: 'e' }] } }] });
    const modals: any[] = [];
    a.ctx.document.body.appendChild = (el: any) => modals.push(el);
    a.go('u01-write');
    a.click({ act: 'fbopen', pk: '01:w2', id: 'f1' });
    const modal = modals.at(-1).innerHTML;
    expect(modal).toContain('Suggested Error Log entries');
    expect(modal).not.toMatch(/Language Bank|OLD-BANK-ENTRY/);
    const think = a.go('u01-think');
    expect(think).toContain('data-act="sp2err"');
    expect(think).not.toMatch(/Language Bank|OLD-SPOKEN-ENTRY/);
  });

  it('the AI schemas and the speaking prompt no longer ask for Bank suggestions', () => {
    expect(Object.keys(WritingFeedbackSchema.shape)).not.toContain('suggestedLanguageBank');
    expect(Object.keys(SpeakingFeedbackSchema.shape)).not.toContain('languageBank');
    expect(read('src/services/ai/prompts.ts')).not.toMatch(/language bank/i);
  });

  it('the Narrator review offers only the Error Log, and nothing reaches the Bank', () => {
    const code = read('public/character-chat.js');
    expect(code).not.toMatch(/bank-issue|bank-reform|saveBank|addBank|SAVE TO LANGUAGE BANK|language-bank/);
    expect(code).toContain('ADD TO ERROR LOG');
  });

  it('Register & Tone: "Nothing is saved." and no save buttons', () => {
    const code = read('public/app.js');
    expect(code).toContain('Nothing is saved.</p>');
    expect(code).not.toMatch(/rg-save|Nothing is saved unless you save it/);
  });

  it('no flow writes to the Bank, and old entries survive everything else', () => {
    const a = loadApp({ bank: OLD_BANK });
    a.go('u01-interpret'); a.go('u01-think'); a.go('u01-write'); a.go('r1-synthesis'); a.go('glossary'); a.go('errors');
    a.click({ act: 'adderr' });
    a.click({ act: 'sp2bank', id: 'x', i: '0' }); a.click({ act: 'fb2bank', pk: '01:w2', id: 'x', i: '0' }); a.click({ act: 'rg2bank', rk: 'formal' });
    expect(a.state().bank).toEqual(OLD_BANK);
  });

  it('backward compatibility: the old sync scope and backups still carry the bank', () => {
    expect(read('src/routes/sync.ts')).toMatch(/\|language-bank\|/);
    const sync = read('public/sync.js');
    expect(sync).toContain("docs['language-bank'] = { bank: S.bank || [] }");
    expect(sync).toContain("case 'language-bank':");
    const app = read('public/app.js');
    expect(app).toMatch(/const DEF = \{.*bank: \[\], errs: \[\]/);
    expect(app).toContain("['glossary', 'language-bank', 'error-log'");   // a restore still pushes old bank data
    expect(app).toContain("const data = { app: 'a-mind-in-english', v: 1, saved: new Date().toISOString(), state: S }");
  });
});

/* ── E. Error Log in the Module Review ── */
describe('Module Review · Error Log step reads every source', () => {
  const errs = [
    { id: 'e-sp', mine: 'SPOKEN-ROW', corr: 'c', why: 'w', unit: '03', source: 'speaking', n: 0, last: '' },
    { id: 'e-light', mine: 'LIGHT-ROW', corr: 'c', why: 'w', unit: '02', source: 'light_feedback', n: 0, last: '' },
    { id: 'e-writing', mine: 'WRITING-ROW', corr: 'c', why: 'w', u: '04', n: 0, last: '' },
    { id: 'e-review-sp', mine: 'REVIEW-SPOKEN-ROW', corr: 'c', why: 'w', unit: 'r1', source: 'speaking', n: 0, last: '' },
    { id: 'e-manual', mine: 'MANUAL-ROW', corr: 'c', why: 'a tense problem', n: 0, last: '' },
    { id: 'e-other', mine: 'MODULE-2-ROW', corr: 'c', why: 'w', unit: '07', source: 'speaking', n: 0, last: '' },
  ];

  it('speaking and "check my english" rows (stored as `unit`) appear next to writing rows (stored as `u`)', () => {
    const a = loadApp({ errs });
    const html = a.go('r1-errors');
    for (const m of ['SPOKEN-ROW', 'LIGHT-ROW', 'WRITING-ROW', 'REVIEW-SPOKEN-ROW', 'MANUAL-ROW']) expect(html, m).toContain(m);
    expect(html).not.toContain('MODULE-2-ROW');
    expect(html).toContain('Unit 03');
    expect(a.go('r2-errors')).toContain('MODULE-2-ROW');
  });

  it('old rows are read as they are: nothing is rewritten', () => {
    const a = loadApp({ errs });
    a.go('r1-errors');
    expect(a.state().errs).toEqual(errs);
  });

  it('rows added now from speaking and "check my english" reach the Review', () => {
    const a = loadApp({ sp: [{ id: 'sp1', unit: '02', activityId: 's1', attempt: 1, date: 'x', duration: 60, transcript: 't', feedback: { corrections: [{ original: 'NEW-SPOKEN', better: 'b', why: 'w' }] } }],
      a: { '03:t4': 'x', '03:t4:lightfb': { at: 'x', f: { meaningClear: true, pointsToNotice: [], errorLogCandidate: { mine: 'NEW-LIGHT', corr: 'c', why: 'w', ex: 'e' } } } } });
    a.click({ act: 'sp2err', id: 'sp1', i: '0' });
    a.click({ act: 'light2err', k: '03:t4' });
    const html = a.go('r1-errors');
    expect(html).toContain('NEW-SPOKEN');
    expect(html).toContain('NEW-LIGHT');
  });
});

/* ── F. Core / Optional: presentation metadata only ── */
describe('Core path · metadata only', () => {
  const src = read('public/app.js');
  const CORE = (() => { const m = src.match(/const CORE = (\{[\s\S]*?\n  \});/)!; return Function(`return ${m[1]}`)(); })();

  it('every unit with content has core metadata that points at real items', () => {
    const a = loadApp();
    const U = a.ctx.KLANG.units;
    expect(Object.keys(CORE).sort()).toEqual(Object.keys(U).sort());
    for (const u of Object.keys(U)) {
      const d = U[u], c = CORE[u];
      const interpretIds = d.interpret.items.map((i: any) => i.id);
      c.interpret.forEach((id: string) => expect(interpretIds, `${u} ${id}`).toContain(id));
      expect(d.interpret.items.find((i: any) => i.id === c.interpret[0]).tag).toBe('Main idea');
      expect(d.notice.focuses[c.notice], u).toBeTruthy();
      const chunkIds = d.steal.chunks.map((ch: any) => ch.task.id);
      c.steal.forEach((id: string) => expect(chunkIds, `${u} ${id}`).toContain(id));
      const thinkIds = d.think.items.map((i: any) => i.id);
      expect(c.think, u).toHaveLength(1);
      expect(thinkIds, `${u} ${c.think[0]}`).toContain(c.think[0]);
      const retrieve = d.retrieve.items.map((i: any) => i.id);
      expect(c.retrieve.map((id: string) => retrieve.indexOf(id)), u).toEqual([0, 1, 6]);   // r1, r2, r7
      expect(d.write.items.filter((i: any) => i.main), u).toHaveLength(1);
      expect(d.edit.revised.revisionOf).toBe(d.write.items.find((i: any) => i.main).id);
    }
  });

  it('the essential cycle is marked in every unit, and KNOW / other THINK stay open as extra practice', () => {
    const a = loadApp();
    for (const u of Object.keys(a.ctx.KLANG.units)) {
      for (const st of ['read', 'interpret', 'notice', 'steal', 'think', 'write', 'edit', 'retrieve']) expect(a.go(`u${u}-${st}`), `${u} ${st}`).toContain('class="tago core"');
      for (const st of ['know', 'think']) {
        const html = a.go(`u${u}-${st}`);
        expect(html, `${u} ${st}`).toContain('optional · extra practice');
        expect(html, `${u} ${st}`).toContain('data-sec=');
        expect(html, `${u} ${st}`).not.toMatch(/disabled title="Optional|aria-disabled/);
      }
      // THINK: exactly one hand-picked core activity; every other THINK activity is labelled optional, and all still render
      const think = a.go(`u${u}-think`), items = a.ctx.KLANG.units[u].think.items;
      expect((think.match(/class="tago core"/g) || []).length, u).toBe(1);
      expect(think, u).toMatch(new RegExp(`id="q-${u}:${CORE[u].think[0]}"><div class="qh">(?:(?!</div>).)*class="tago core"`));
      expect((think.match(/<span class="tago">optional · extra practice<\/span>/g) || []).length, u).toBe(items.length - 1);
      for (const it of items) expect(think, `${u} ${it.id}`).toContain(`id="q-${u}:${it.id}"`);
      const interp = a.go(`u${u}-interpret`);
      expect((interp.match(/class="tago core"/g) || []).length, u).toBe(CORE[u].interpret.length);
      expect(interp.match(/class="q" id="q-/g)!.length, u).toBeGreaterThan(CORE[u].interpret.length);   // optional items still rendered
    }
  });

  it('THINK core picks are the hand-chosen ones, not a positional rule', () => {
    expect(Object.fromEntries(Object.entries(CORE).map(([u, c]: [string, any]) => [u, c.think]))).toEqual({
      '01': ['t5'], '02': ['02t4'], '03': ['03t5'], '04': ['04t3'], '05': ['05t5'],
      '06': ['06t5'], '07': ['07t3'], '08': ['08t5'], '09': ['09t4'], '10': ['10t5'],
      '11': ['11t1'], '12': ['12t1'], '13': ['13t2'], '14': ['14t1'], '15': ['15t1'],
      '16': ['16t1'], '17': ['17t1'], '18': ['18t1'], '19': ['19t1'], '20': ['20t1'],
      '21': ['21t1'], '22': ['22t1'], '23': ['23t1'], '24': ['24t1'], '25': ['25t1'],
      '26': ['26t1'], '27': ['27t1'], '28': ['28t1'], '29': ['29t1'], '30': ['30t1'],
      '31': ['31t1'], '32': ['32t1']
    });
  });

  it('completion and progress are unchanged: nothing is computed from core, nothing is written', () => {
    const state = { sec: { '01:know': true, '01:think': true }, ud: { '02': true }, a: { '01:i2': '1' } };
    const a = loadApp(state);
    const before = a.state();
    const side = () => (a.side().match(/<span>Progress<\/span><b>(\d+)%<\/b>/) || [])[1];
    const pct = side();
    for (const st of ['know', 'read', 'interpret', 'notice', 'steal', 'think', 'write', 'edit', 'retrieve']) a.go(`u01-${st}`);
    expect(side()).toBe(pct);
    const after = a.state();
    for (const k of ['sec', 'ud', 'a', 'md', 'rd']) expect(after[k] || {}, k).toEqual(before[k] || {});
    expect(Object.keys(after)).not.toContain('core');
    expect(src).not.toMatch(/S\.core|core:\s*true.*save\(/);
  });

  it('reviews carry no core marks', () => {
    const a = loadApp();
    expect(a.go('r1-retrieve')).not.toContain('class="tago core"');
  });
});

/* ── G. Copy and CSS ── */
describe('Copy and CSS', () => {
  it('copy that stopped being true with sync is corrected', () => {
    const a = loadApp();
    const home = a.go('home');
    expect(home).toContain('synced to your account');
    expect(home).not.toMatch(/send it for correction|saved automatically in this browser\b(?! as)/);
    expect(a.side()).not.toContain('Saved automatically in this browser only');
    expect(a.side()).toContain('Saved in this browser and synced to your account');
    expect(a.go('glossary')).not.toContain('whoever corrects');
    expect(read('public/app.js')).toContain('everything currently saved in this browser and, once it syncs, in your account');
  });

  it('.dark styles only the Home sections, so .btn.dark keeps the normal button padding', () => {
    const css = read('public/styles.css');
    expect(css).not.toMatch(/(^|[\s,}])\.dark(\s*\{|\s+\.|,)/m);
    expect(css).toMatch(/section\.dark\{background:var\(--esp\);color:var\(--creme\);padding:/);
    expect(css).toContain('.btn.dark{background:var(--esp);color:var(--creme)}');
    const home = loadApp().go('home');
    expect((home.match(/<section class="dark">/g) || []).length).toBe(2);
    expect(read('public/app.js')).not.toMatch(/<(?!section)[a-z]+ class="dark"/);   // no other element relies on a bare .dark
  });
});
