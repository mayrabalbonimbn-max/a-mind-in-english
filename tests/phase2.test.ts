import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { describe, expect, it } from 'vitest';
import { loadApp } from './helpers/appHarness';

const root = path.resolve(__dirname, '..');
const read = (f: string) => fs.readFileSync(path.join(root, f), 'utf8');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RT = require('../public/retrieval.js');

const UNITS = Array.from({ length: 10 }, (_, i) => String(i + 1).padStart(2, '0'));
const STAGES = ['know', 'read', 'interpret', 'notice', 'steal', 'think', 'write', 'edit', 'retrieve'];
const plain = (s: unknown) => String(s ?? '').replace(/\{\{([^|}]+)\|[^}]+\}\}/g, '$1').replace(/<[^>]+>/g, '').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ');

function loadBook() {
  const ctx: any = { window: {} };
  vm.createContext(ctx);
  ['curriculum.js', 'critical-thinking.js', 'unit-01.js', 'unit-01-media.js', 'unit-core.js', ...UNITS.slice(1).map(u => `unit-${u}.js`), 'pronunciation.js', 'module-reviews.js']
    .forEach(f => vm.runInContext(read(`public/data/${f}`), ctx, { filename: f }));
  return ctx.window.KLANG;
}
const K = loadBook();
const corpus = (o: any): string => typeof o === 'string' ? plain(o) : o && typeof o === 'object' ? Object.values(o).map(corpus).join(' ') : '';

/* ───────────────────────── Pronunciation in Context ───────────────────────── */
describe('Pronunciation in Context', () => {
  it('gives every Unit 01–10 exactly one focus with 3–6 items, a micro-task and a short explanation', () => {
    for (const u of UNITS) {
      const p = K.pronunciation[u];
      expect(p, u).toBeTruthy();
      expect(typeof p.focus).toBe('string');
      expect(p.items.length, u).toBeGreaterThanOrEqual(3);
      expect(p.items.length, u).toBeLessThanOrEqual(6);
      expect(p.task.q && p.task.model, u).toBeTruthy();
      expect(plain(p.why).split(' ').length, u).toBeLessThan(90);
      expect(p.listenFor, u).toBeTruthy();
    }
  });

  it('uses a different focus in each unit and never recycles a generic phoneme list', () => {
    const foci = UNITS.map(u => plain(K.pronunciation[u].focus).toLowerCase());
    expect(new Set(foci).size).toBe(10);
    const generic = UNITS.filter(u => /θ|ð|ɪ\/ vs|iː\/ vs/.test(K.pronunciation[u].focus + K.pronunciation[u].why));
    expect(generic).toEqual([]);
  });

  it('takes its sentences and words from the unit itself', () => {
    for (const u of UNITS) {
      const text = corpus(K.units[u]).toLowerCase();
      for (const it of K.pronunciation[u].items) {
        // "a → b" word families: at least one member is in the unit; "…" elisions: every fragment is
        const sides = plain(it.text).split('→').map(side => side.split('…').map(x => x.replace(/^[\s."]+|[\s."]+$/g, '').replace(/^he said, /i, '').toLowerCase()).filter(Boolean));
        expect(sides.some(frags => frags.every(x => text.includes(x))), `${u}: ${it.text}`).toBe(true);
      }
    }
  });

  it('keeps IPA well formed (slashes balanced, stress marks only inside transcriptions)', () => {
    for (const u of UNITS) for (const it of K.pronunciation[u].items) {
      for (const f of ['ipa', 'us']) {
        const v = it[f]; if (!v || !v.startsWith('/')) continue;
        expect((v.match(/\//g) || []).length % 2, `${u} ${f}: ${v}`).toBe(0);
        expect(v, `${u}: no ASCII apostrophe as stress mark`).not.toMatch(/'/);
      }
    }
  });

  it('only points to existing, ready recordings whose transcript contains the phrase', () => {
    for (const u of UNITS) for (const x of K.pronunciation[u].listen || []) {
      const l = K.units[u].listening.find((y: any) => y.id === x.lid);
      expect(l, `${u} ${x.lid}`).toBeTruthy();
      expect(l.audioReady, `${u} ${x.lid} must be ready`).not.toBe(false);
      expect(fs.existsSync(path.join(root, 'public', l.file)), l.file).toBe(true);
      expect(plain(l.transcript), `${u} ${x.lid}`).toContain(plain(x.phrase));
    }
  });

  it('marks variety differences instead of presenting one accent as universal', () => {
    const withVariety = UNITS.filter(u => K.pronunciation[u].variety || K.pronunciation[u].items.some((i: any) => i.us));
    expect(withVariety.length).toBeGreaterThanOrEqual(6);
    expect(plain(K.pronunciation['06'].variety)).toMatch(/British.*American|American.*British/);
  });

  it('renders inside STEAL (not as a stage) with a pointer from SAY IT, and never claims AI assessed pronunciation', () => {
    const app = loadApp();
    for (const u of UNITS) {
      const steal = app.go(`u${u}-steal`);
      expect(steal, u).toContain('Pronunciation in context');
      expect(steal).toContain(`id="pron-${u}"`);
      expect(steal).toContain('No recording needed');
      const think = app.go(`u${u}-think`);
      expect(think).toContain(`data-flash="pron-${u}"`);
    }
    const src = read('public/data/pronunciation.js') + read('public/app.js');
    expect(src).not.toMatch(/AI (has )?(assessed|evaluated) (your )?pronunciation/i);
  });

  it('reveals the model answer of every micro-activity on click (regression: string model crashed)', () => {
    const a = loadApp();
    const original = a.ctx.document.querySelector;
    for (const u of UNITS) {
      a.go(`u${u}-steal`);
      const fb: any = { innerHTML: '' };
      a.ctx.document.querySelector = (sel: string) => sel === `[data-fb="${u}:pron"]` ? fb : original(sel);
      expect(() => a.click({ act: 'model', q: `${u}:pron` }), u).not.toThrow();
      expect(fb.innerHTML, u).toContain('Model answer');
    }
  });

  it('offers replay of Unit 01 audio only after the listening has been submitted', () => {
    expect(loadApp().go('u01-steal')).toContain('Submit this listening in INTERPRET first');
    const after = loadApp({ a: { '01:li:l2:submitted': true, '01:li:l1:submitted': true } }).go('u01-steal');
    expect(after).toContain('src="/audio/en/unit-01/u01-listening-02.mp3"');
  });
});

/* ───────────────────────── Architecture preserved ───────────────────────── */
describe('Nine-stage architecture and Units 01–10 unchanged', () => {
  const app = read('public/app.js');

  it('keeps exactly the nine stages and the ten review stages', () => {
    expect(app).toContain("['know', 'Know'], ['read', 'Read'], ['interpret', 'Interpret'], ['notice', 'Notice'], ['steal', 'Steal'],\n    ['think', 'Think'], ['write', 'Write'], ['edit', 'Edit'], ['retrieve', 'Retrieve']");
    expect(app).not.toMatch(/\['(pronunciation|teach|teacher)',/i);
  });

  it('renders every stage of every unit without errors', () => {
    const a = loadApp();
    for (const u of UNITS) for (const s of STAGES) {
      const html = a.go(`u${u}-${s}`);
      expect(html, `${u}-${s}`).toContain(`Unit ${u}`);
    }
  });

  it('adds no Teacher Lens to units and stores new layers outside the unit files', () => {
    for (const u of UNITS) {
      expect(K.units[u].teacherLens).toBeUndefined();
      expect(K.units[u].pronunciation).toBeUndefined();
    }
    for (const u of UNITS.slice(1)) expect(read(`public/data/unit-${u}.js`)).not.toMatch(/teacherLens|K\.pronunciation|u\.pronunciation/);
    const a = loadApp();
    for (const u of UNITS) for (const s of STAGES) expect(a.go(`u${u}-${s}`)).not.toContain('Teacher Lens');
  });
});

/* ───────────────────────── Teacher Lens (Reviews only) ───────────────────────── */
describe('Teacher Lens', () => {
  it('exists only in Reviews 1–2, with points drawn from each review’s own units', () => {
    for (const id of ['1', '2']) {
      const r = K.reviews[id];
      expect(r.teacherLens.points.length).toBeGreaterThanOrEqual(5);
      r.teacherLens.points.forEach((p: any) => { expect(r.units).toContain(p.unit); expect(['good', 'partial', 'weak']).toContain(p.ccq); });
      expect(r.teacherLens.points.some((p: any) => p.ccq !== 'good'), 'some points must not force a CCQ').toBe(true);
    }
  });

  it('appears at the end of Self-assessment, not as a new review stage, with the six steps', () => {
    const a = loadApp();
    const html = a.go('r1-assessment');
    expect(html).toContain('Teacher Lens');
    for (const q of ['Choose one language point from this module.', 'Explain it to a B1 student in clear English.', 'Give two natural examples.', 'Predict one likely difficulty or mistake for a Portuguese-speaking learner.', 'without simply giving the answer', 'One concept-checking question']) expect(html).toContain(q);
    expect(html.indexOf('Teacher Lens')).toBeGreaterThan(html.indexOf('Writing</h3>'));
    for (const s of ['retrieve', 'language', 'steal', 'glossary', 'errors', 'reading', 'reasoning', 'editing', 'synthesis']) expect(a.go(`r1-${s}`)).not.toContain('Teacher Lens');
    expect(a.go('r2-assessment')).toContain('Teacher Lens');
  });

  it('persists every field in the review document and keeps the CCQ optional', () => {
    const a = loadApp();
    a.go('r2-assessment');
    a.select('r2:tl:point', 'saytell');
    for (const f of ['explain', 'ex1', 'ex2', 'difficulty', 'response']) a.type(`r2:tl:${f}`, `my ${f}`);
    const st = a.state();
    expect(st.a['r2:tl:point']).toBe('saytell');
    expect(st.a['r2:tl:explain']).toBe('my explain');
    expect(a.html()).toContain('the CCQ is optional here');
    const sync = loadSyncApi();
    expect(sync.keyToScope('r2:tl:explain')).toBe('review:2');
    expect(sync.keyToScope('r1:tl:feedback')).toBe('review:1');
  });

  it('asks for AI feedback only on click and sends the chosen point, never automatically', async () => {
    const a = loadApp(undefined, { fetch: (url) => url === '/api/ai/teacher-lens-feedback' ? { status: 200, body: { success: true, createdAt: '2026-09-29T10:00:00Z', feedback: { clarity: 'Clear.', linguisticAccuracy: { summary: 'Accurate.', issues: [] }, b1Appropriateness: 'Fine', examples: 'Natural', predictedDifficulty: 'Plausible', learnerResponse: 'Constructive', unnecessaryComplexity: 'None', ccq: 'Not needed here', suggestions: ['Shorten'] } } } : { status: 503, body: {} } });
    a.go('r1-assessment'); a.select('r1:tl:point', 'usedto'); a.type('r1:tl:explain', 'We use used to for past habits.');
    expect(a.fetches.filter(f => f.url.includes('teacher-lens'))).toHaveLength(0);
    a.click({ act: 'tlfb', r: '1' });
    await new Promise(r => setImmediate(r));
    const call = a.fetches.find(f => f.url === '/api/ai/teacher-lens-feedback')!;
    expect(call.body).toMatchObject({ review: 'r1', pointId: 'usedto', explanation: 'We use used to for past habits.' });
    expect(a.state().a['r1:tl:feedback'].f.clarity).toBe('Clear.');
  });
});

/* ───────────────────────── Timed challenge ───────────────────────── */
describe('Timed challenge (Reviews only, optional)', () => {
  it('is offered once per review, starts on click, and shows feedback only after submission', () => {
    for (const u of UNITS) expect(JSON.stringify(K.units[u])).not.toContain('"timed":true');
    const a = loadApp();
    let html = a.go('r1-synthesis');
    expect(html).toContain('Timed challenge');
    expect(html).not.toContain('data-q="r1:m1tc1"');
    a.click({ act: 'tcstart', r: '1' });
    html = a.html();
    expect(html).toContain('data-tc-timer');
    expect(html).not.toContain('data-act="aifb" data-q="r1:m1tc1"');
    a.type('r1:m1tc1', 'My timed essay.');
    a.click({ act: 'tcsubmit', r: '1' });
    html = a.html();
    expect(html).toContain('data-act="aifb" data-q="r1:m1tc1"');
    expect(html).toContain('readonly');
    expect(a.state().a['r1:m1tc1']).toBe('My timed essay.');
  });
});

/* ───────────────────────── Personal Retrieval (pure) ───────────────────────── */
describe('Personal Retrieval selection', () => {
  const order = UNITS.concat(['11', '12']);
  const base = { unit: '05', order, today: '2026-10-10', answers: {} as Record<string, any> };
  const L = (u: string, key: string, extra: any = {}) => ({ id: `g:${u}:${key}`, u, key, title: key, ...extra });
  const E = (id: string, extra: any = {}) => ({ id, mine: `wrong ${id}`, corr: `right ${id}`, why: 'why', n: 0, last: '', u: '', ...extra });

  it('returns nothing (and invents nothing) when there is no personal history', () => {
    const r = RT.select({ ...base, learning: [], errors: [] });
    expect(r.ids).toEqual([]);
  });

  it('draws LEARNING only from earlier units, at most two, plus at most one error', () => {
    const learning = [L('01', 'v:a'), L('02', 'v:b'), L('03', 'v:c'), L('05', 'v:here'), L('07', 'v:later')];
    const r = RT.select({ ...base, learning, errors: [E('e1'), E('e2'), E('e3')] });
    expect(r.learning).toHaveLength(2);
    expect(r.errors).toHaveLength(1);
    r.learning.forEach((x: any) => expect(['01', '02', '03']).toContain(x.u));
  });

  it('does not retrieve a custom item on the day it was added', () => {
    const r = RT.select({ ...base, learning: [L('02', 'x:new', { added: '2026-10-10' })], errors: [] });
    expect(r.ids).toEqual([]);
    const later = RT.select({ ...base, learning: [L('02', 'x:new', { added: '2026-10-08' })], errors: [] });
    expect(later.ids).toEqual(['g:02:x:new']);
  });

  it('spaces repetitions at growing intervals using the logs of every unit', () => {
    const item = L('01', 'v:a');
    const shown = (days: string[]) => ({ '03:pr:log': JSON.stringify(days.map(d => ({ d, g: [item.id], e: [], seen: [item.id] }))) });
    expect(RT.select({ ...base, learning: [item], answers: shown(['2026-10-09']) }).ids).toEqual([]);           // 1 day after 1st show (gap 2)
    expect(RT.select({ ...base, learning: [item], answers: shown(['2026-10-08']) }).ids).toEqual([item.id]);    // gap reached
    expect(RT.select({ ...base, learning: [item], answers: shown(['2026-10-01', '2026-10-07']) }).ids).toEqual([]); // 2 shows → gap 4
    expect(RT.select({ ...base, learning: [item], answers: shown(['2026-10-01', '2026-10-06']) }).ids).toEqual([item.id]);
  });

  it('prefers items not yet seen and keeps today’s dose stable across re-renders', () => {
    const seenOld = L('01', 'v:old'), fresh = L('02', 'v:fresh'), third = L('03', 'v:third');
    const answers = { '04:pr:log': JSON.stringify([{ d: '2026-10-05', g: [seenOld.id], e: [], seen: [seenOld.id] }]) };
    const r = RT.select({ ...base, learning: [seenOld, fresh, third], answers, maxLearning: 2 });
    expect(r.learning.map((x: any) => x.id)).not.toContain(seenOld.id);
    const log = RT.logSelection(undefined, base.today, r.ids);
    const again = RT.select({ ...base, learning: [seenOld, fresh, third], answers: { ...answers, '05:pr:log': log }, maxLearning: 2 });
    expect(again.ids).toEqual(r.ids);
  });

  it('can show other items on request without repeating the current ones', () => {
    const learning = [L('01', 'v:a'), L('02', 'v:b'), L('03', 'v:c'), L('04', 'v:d')];
    const first = RT.select({ ...base, learning, errors: [] });
    const other = RT.select({ ...base, learning, errors: [], skip: first.ids, fresh: true });
    expect(other.ids.length).toBe(2);
    other.ids.forEach((id: string) => expect(first.ids).not.toContain(id));
  });

  it('handles Error Log patterns: complete rows only, earlier units only, spaced by reviews, recurring first', () => {
    const errors = [
      E('blank', { corr: '' }),
      E('thisunit', { u: '05' }),
      E('today', { last: '2026-10-10', n: 1 }),
      E('reviewed-twice', { n: 2, last: '2026-10-08' }),
      E('single', { category: 'Articles' }),
      E('rec1', { category: 'Speaking' }), E('rec2', { category: 'Speaking', n: 5, last: '2026-01-01' }),
    ];
    const r = RT.select({ ...base, learning: [], errors, maxErrors: 3 });
    const ids = r.errors.map((x: any) => x.id);
    expect(ids).not.toContain('blank'); expect(ids).not.toContain('thisunit');
    expect(ids).not.toContain('today'); expect(ids).not.toContain('reviewed-twice');
    expect(ids[0]).toBe('rec1');
  });

  it('prefers errors related to the current unit’s grammar', () => {
    const errors = [E('a', { why: 'article with abstract noun' }), E('b', { why: 'mixed conditional needs would' })];
    const r = RT.select({ ...base, unit: '09', learning: [], errors, grammarTerms: ['conditionals', 'mixed'] });
    expect(r.errors[0].id).toBe('b');
    expect(r.errors[0].related).toBe(true);
  });

  it('logs compactly: no duplicate write for the same dose, capped history', () => {
    const one = RT.logSelection(undefined, '2026-10-10', ['g:01:v:a']);
    expect(RT.logSelection(one, '2026-10-10', ['g:01:v:a'])).toBeNull();
    let log: string | undefined;
    for (let i = 1; i <= 20; i++) log = RT.logSelection(log, `2026-10-${String(i).padStart(2, '0')}`, ['g:01:v:a']) || log;
    expect(JSON.parse(log!)).toHaveLength(12);
    expect(RT.parseLog('[This device version]:\n[]')).toEqual([]);
  });
});

/* ───────────────────────── Personal Retrieval (in the app) ───────────────────────── */
describe('Personal Retrieval in RETRIEVE', () => {
  it('shows a short empty state without personal data, and no Error Log rows', () => {
    const html = loadApp().go('u05-retrieve');
    expect(html).toContain('Personal retrieval');
    expect(html).toContain('Nothing is due here yet');
    expect(html).not.toContain('data-act="prrev"');
  });

  it('preserves answers already written in the old glossary block', () => {
    const html = loadApp({ a: { '05:rg': 'My earlier sentences' } }).go('u05-retrieve');
    expect(html).toContain('My earlier sentences');
  });

  it('retrieves LEARNING items and an Error Log pattern from earlier units, then logs only on engagement', () => {
    const st = {
      gl: { '01:v:attrition': 'learning', '02:v:salient': 'learning', '05:v:friction': 'learning', '01:v:erode': 'know' },
      errs: [{ id: 'e1', mine: 'I have seen him yesterday.', corr: 'I saw him yesterday.', why: 'finished time', u: '01', n: 0, last: '' }],
    };
    const a = loadApp(st);
    const html = a.go('u05-retrieve');
    expect(html).toContain('attrition'); expect(html).toContain('salient');
    expect(html).not.toMatch(/LEARNING · Unit 05/);
    expect(html).toContain('I have seen him yesterday.');
    expect(a.state().a?.['05:pr:log']).toBeUndefined();
    a.type('05:pr:e_e1', 'I saw him yesterday.');
    const log = JSON.parse(a.state().a['05:pr:log']);
    expect(log[0].seen).toEqual(expect.arrayContaining(['g:01:v:attrition', 'g:02:v:salient', 'e:e1']));
    a.click({ act: 'prrev', u: '05', id: 'e1' });
    expect(a.state().errs[0].n).toBe(1);
    expect(a.go('u05-retrieve')).toContain('I have seen him yesterday.'); // today's dose stays put
  });
});

/* ───────────────────────── Writing workflow ───────────────────────── */
describe('Long-form writing workflow', () => {
  it('offers an optional outline only on 800+ word tasks, without shortening them', () => {
    const lf = UNITS.filter(u => K.units[u].write.items.some((w: any) => w.min >= 800));
    expect(lf).toEqual(['04', '07', '10']);
    lf.forEach(u => { const w = K.units[u].write.items.find((x: any) => x.main); expect([w.min, w.max]).toEqual([800, 1200]); });
    const a = loadApp();
    expect(a.go('u04-write')).toContain('optional outline');
    expect(a.go('u04-write')).toContain('lfflow');
    expect(a.go('u03-write')).not.toContain('optional outline');
    expect(a.go('u04-edit')).not.toContain('optional outline');
  });

  it('sends the outline with draft feedback and shows next-draft priorities in EDIT', async () => {
    const fb = { estimatedLevel: { level: 'C1-', rationale: 'r' }, taskAchievement: { summary: 's', strengths: [], improvements: [] }, nextDraftPriorities: ['Sharpen the thesis'], questionsForWriter: ['What does the ending add?'] };
    const a = loadApp({ a: { '04:04w2': 'Draft text', '04:04w2:outline': 'Claim: stories shape us' } }, { fetch: url => url === '/api/ai/feedback' ? { status: 200, body: { success: true, words: 2, createdAt: '2026-09-29T10:00:00Z', feedback: fb } } : { status: 503, body: {} } });
    a.go('u04-write');
    a.click({ act: 'aifb', q: '04:04w2' });
    await new Promise(r => setImmediate(r));
    expect(a.fetches.find(f => f.url === '/api/ai/feedback')!.body).toMatchObject({ unit: '04', taskId: '04w2', outline: 'Claim: stories shape us' });
    const edit = a.go('u04-edit');
    expect(edit).toContain('Sharpen the thesis');
    expect(edit).toContain('What does the ending add?');
    expect(a.state().a['04:04w2']).toBe('Draft text'); // the draft is never altered by feedback
  });

  it('still renders feedback saved before the new criteria existed', () => {
    const old = { id: 'f1', at: '2026-09-01T00:00:00Z', draft: 'first', words: 3, f: { estimatedLevel: { level: 'B2+', rationale: 'r' }, taskAchievement: { summary: 'old', strengths: [], improvements: [] }, grammarAccuracy: { summary: 'g', strengths: [], improvements: [] }, nextDraftPriorities: ['x'] } };
    const a = loadApp({ pf: { '01:w2': { fb: [old] } } });
    a.go('u01-write');
    expect(() => a.click({ act: 'fbopen', pk: '01:w2', id: 'f1' })).not.toThrow();
  });
});

/* ───────────────────────── Speaking privacy ───────────────────────── */
describe('Speaking privacy and review-safe SAY IT', () => {
  const app = read('public/app.js'), media = read('public/media.js'), sync = read('public/sync.js');

  it('keeps raw audio in IndexedDB only and syncs metadata only', () => {
    expect(media).toContain("indexedDB.open(DB, 1)");
    expect(media).not.toContain('localStorage');
    expect(sync).toContain("docs['speaking'] = { attempts: S.sp || [] }");
    const push = app.match(/S\.sp\.push\(\{[^}]+\}\)/)![0];
    expect(push).not.toMatch(/[{,]\s*blob\s*[,}]|base64|dataurl/i); // only blob.type (the MIME string) is kept
    expect(push).toContain("audioStorage: 'indexeddb-local'");
  });

  it('never deletes attempts: new recordings append with an incremented number', () => {
    expect(app).toContain('const attempt = attemptsFor(u, sid).length + 1');
    expect(app).not.toMatch(/S\.sp\s*=\s*S\.sp\.filter/);
  });

  it('renders SAY IT in a Review without crashing and keeps attempts listed', () => {
    const a = loadApp({ sp: [{ id: 'sp1', unit: 'r1', activityId: 'm1s1', attempt: 1, date: '2026-09-29T10:00:00Z', duration: 80, transcript: 'hello', feedback: null, selfCheck: '', audioStorage: 'indexeddb-local' }] });
    const html = a.go('r1-reasoning');
    expect(html).toContain('Attempt 1');
    expect(html).toContain('cannot assess pronunciation');
  });
});

/* ───────────────────────── Conflict merge covers reviews ───────────────────────── */
describe('Conflict “keep both” for review documents', () => {
  const code = read('public/sync.js');
  const fnSrc = code.slice(code.indexOf('function mergePreservingBothVersions'), code.indexOf('async function resolveConflict'));
  const merge = vm.runInNewContext(`(${fnSrc.replace('function mergePreservingBothVersions', 'function')})`);

  it('keeps server-only Teacher Lens answers and both versions of edited text', () => {
    const m = merge('review:1', { answers: { 'r1:tl:explain': 'mine', 'r1:tl:ex1': 'a' }, sections: {} }, { answers: { 'r1:tl:explain': 'theirs', 'r1:tl:ccq': 'server only' }, sections: {} });
    expect(m.answers['r1:tl:ccq']).toBe('server only');
    expect(m.answers['r1:tl:explain']).toContain('mine');
    expect(m.answers['r1:tl:explain']).toContain('theirs');
  });

  it('does not stringify stored feedback objects', () => {
    const m = merge('review:1', { answers: { 'r1:tl:feedback': { at: '1', f: {} } } }, { answers: { 'r1:tl:feedback': { at: '2', f: {} } } });
    expect(m.answers['r1:tl:feedback']).toEqual({ at: '1', f: {} });
  });
});

/* ───────────────────────── Unit 04 · Listening 2 speakers ───────────────────────── */
describe('Unit 04 Listening 2 matches the recorded voices', () => {
  it('labels the two voices Speaker A / Speaker B everywhere the learner sees them', () => {
    const l = K.units['04'].listening.find((x: any) => x.id === 'l2');
    const visible = JSON.stringify(l);
    expect(visible).not.toMatch(/Sarah|Daniel/);
    expect(l.transcript).toMatch(/^Speaker A: /);
    expect(l.transcript).toContain('\n\nSpeaker B: ');
    expect(l.transcript).toContain('Dan McAdams'); // cited researcher, not a speaker
    expect(l.questions.find((q: any) => q.id === 'q3').answers).toEqual(['retrospective coherence']);
    expect(l.questions.find((q: any) => q.id === 'q1').answer).toBe(1);
  });
});

/* ───────────────────────── Recorded audio ───────────────────────── */
describe('Listening audio availability', () => {
  const all: [string, any][] = [];
  UNITS.forEach(u => (K.units[u].listening || []).forEach((l: any) => all.push([u, l])));
  ['1', '2'].forEach(r => (K.reviews[r].listening || []).forEach((l: any) => all.push(['r' + r, l])));

  it('marks a listening ready exactly when a valid MP3 exists at its canonical path', () => {
    for (const [o, l] of all) {
      const canonical = o.startsWith('r') ? `/audio/en/reviews/r0${o[1]}-listening-0${l.id.slice(-1)}.mp3` : `/audio/en/unit-${o}/u${o}-listening-0${l.id.slice(-1)}.mp3`;
      expect(l.file, `${o} ${l.id}`).toBe(canonical);
      const p = path.join(root, 'public', l.file), exists = fs.existsSync(p);
      expect(l.audioReady !== false, `${o} ${l.id}`).toBe(exists);
      if (exists) {
        const b = fs.readFileSync(p);
        expect(b.subarray(0, 3).toString('ascii') === 'ID3' || (b[0] === 0xff && (b[1] & 0xe0) === 0xe0), l.file).toBe(true);
        expect(b.length, l.file).toBeGreaterThan(500_000);
      }
    }
  });

  const hasAfinfo = (() => { try { require('child_process').execFileSync('afinfo', ['-h'], { stdio: 'ignore' }); return true; } catch (e: any) { return e.code !== 'ENOENT'; } })();
  it.skipIf(!hasAfinfo)('uses the real length of each recorded MP3 as its duration', () => {
    for (const [o, l] of all) {
      if (l.audioReady === false) continue;
      const info = require('child_process').execFileSync('afinfo', [path.join(root, 'public', l.file)], { encoding: 'utf8' });
      const real = Number((info.match(/estimated duration: ([\d.]+)/) || [])[1]);
      expect(Math.abs(l.duration - real), `${o} ${l.id}: ${l.duration}s vs ${real}s`).toBeLessThanOrEqual(1);
    }
  });

  it('shows recorded audio as exact m:ss and unrecorded audio as a planned estimate', () => {
    const a = loadApp();
    const u04 = a.go('u04-interpret');
    expect(u04).toContain('1:36'); // l1: 96 s
    expect(u04).toContain('1:23'); // l2: 83 s, no longer shown as a rounded minute
    expect(u04).not.toMatch(/\d min<\/span>/);
    for (const u of UNITS) expect(a.go(`u${u}-interpret`), u).not.toContain('min planned');
    for (const r of ['1', '2']) expect(a.go(`r${r}-reading`), r).not.toContain('min planned');
    // The planned-estimate branch still exists for any future unrecorded listening
    a.ctx.KLANG.units['09'].listening[0].audioReady = false;
    expect(a.go('u09-interpret')).toContain('min planned');
  });

  it('has all 24 listenings recorded and active', () => {
    expect(all).toHaveLength(24);
    expect(all.filter(([, l]) => l.audioReady === false)).toEqual([]);
  });
});

/* ───────────────────────── Scope guards ───────────────────────── */
describe('Scope guards', () => {
  it('does not touch Deutsch im Kopf: no reference to Kopf or its server paths in this project', () => {
    const files: string[] = [];
    const walk = (d: string) => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
      if (['node_modules', 'dist', '.git', 'audio'].includes(e.name)) return;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p); else if (/\.(ts|js|json|md|conf|html|css|prisma|sql)$/.test(e.name)) files.push(p);
    });
    walk(root);
    const hits = files.filter(f => !f.endsWith('phase2.test.ts') && !f.endsWith('MIND_PRODUCT_CONTEXT.md') && /kopf|\/var\/www\/kopf/i.test(fs.readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });

  it('adds no database migration', () => {
    expect(fs.readdirSync(path.join(root, 'prisma/migrations')).filter(d => d !== 'migration_lock.toml').sort())
      .toEqual(['20260928193342_init', '20260929162142_add_user_is_demo', '20260930170000_learning_review']);
  });
});

function loadSyncApi() {
  const ctx: any = { window: {}, document: { addEventListener() {}, querySelectorAll: () => [], getElementById: () => null }, localStorage: { getItem: () => null, setItem() {} }, navigator: { onLine: true }, console, setTimeout, clearTimeout };
  ctx.window.addEventListener = () => {};
  vm.createContext(ctx);
  vm.runInContext(read('public/sync.js'), ctx);
  return ctx.window.KLANG_SYNC;
}
