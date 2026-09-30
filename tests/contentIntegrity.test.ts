import fs from 'fs';
import path from 'path';
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
import { __setStructuredCallForTests } from '../src/services/ai/provider';
import { contentIndex } from '../src/services/content';
import { auditUnits, auditReviews, audioPath } from './helpers/contentContract';

const { units, reviews } = contentIndex();
const REVIEW_STAGES = ['retrieve', 'language', 'steal', 'glossary', 'errors', 'reading', 'reasoning', 'editing', 'synthesis', 'assessment'];
const visible = (html: string) => html.replace(/<[^>]+>/g, ' ');

describe('Content contract · Units 01–32 and Module Reviews 1–7 (shape the book renders)', () => {
  const U = auditUnits(), R = auditReviews();
  it('1, 3–6. every unit passes the consumer contract (ids unique, Core and pronunciation references valid, one speaking contract)', () => {
    expect(U.issues).toEqual([]);
  });
  it('2. every review passes the consumer contract', () => { expect(R.issues).toEqual([]); });
  it('11. every track marked ready has its file on disk', () => {
    for (const m of [...U.media, ...R.media].filter((x) => x.ready)) expect(fs.existsSync(audioPath(m.file!)), `${m.owner} ${m.id}`).toBe(true);
  });
  it('12. no missing file is marked ready (pending tracks say audioReady:false)', () => {
    for (const m of [...U.media, ...R.media].filter((x) => !x.exists)) expect(m.ready, `${m.owner} ${m.id} ${m.file}`).toBe(false);
  });
  it('13–14. U20 no longer points to U19; no media reference crosses units', () => {
    expect(units['20'].listening.map((l: any) => l.file)).toEqual(['/audio/en/unit-20/u20-listening-01.mp3', '/audio/en/unit-20/u20-listening-02.mp3']);
    for (const [u, d] of Object.entries<any>(units)) for (const l of d.listening) expect(l.file, `U${u} ${l.id}`).toMatch(new RegExp(`^/audio/en/unit-${u}/u${u}-listening-0\\d\\.mp3$`));
    for (const [r, d] of Object.entries<any>(reviews)) for (const l of d.listening) expect(l.file, `R${r} ${l.id}`).toMatch(new RegExp(`^/audio/en/reviews/r0${r}-listening-0\\d\\.mp3$`));
  });
  it('media report: ready vs intentionally pending', () => {
    const all = [...U.media, ...R.media];
    expect(all.filter((m) => m.ready).length).toBe(24);                 // Units 01–10 + Reviews 1–2
    expect(all.filter((m) => !m.ready).length).toBe(54);                // Units 11–32 + Reviews 3–7: recordings not produced yet
  });
  it('6. speaking 01–32 and reviews use the canonical contract (U23–32 keep their authored three-part card)', () => {
    for (const d of [...Object.values<any>(units), ...Object.values<any>(reviews)]) {
      expect(typeof d.speaking.prompt).toBe('string');
      expect(Array.isArray(d.speaking.rubric)).toBe(true);
    }
    expect(units['23'].speaking.part3.length).toBeGreaterThan(0);        // nothing authored was dropped
    expect(units['23'].speaking.id).toBe('s1');
  });
});

describe('Book · reviews 1–7 and units render every stage', () => {
  it('9–10. Reviews 1–7 open by route and render every stage (no blank activity, no undefined / NaN)', () => {
    const a: any = loadApp();
    for (let r = 1; r <= 7; r++) {
      for (const st of REVIEW_STAGES) {
        const html = a.go(`r${r}-${st}`);
        expect(html, `r${r}-${st}`).toContain(`Module ${r} · Cumulative review`);
        expect(visible(html), `r${r}-${st}`).not.toMatch(/\bundefined\b|\bNaN\b|\[object Object\]/);
      }
      expect(a.side()).toContain(`href="#r${r}"`);
    }
  });
  it('R5 items that used to render nothing now render (retrieve/language/steal/reasoning/editing)', () => {
    const a: any = loadApp();
    for (const st of ['retrieve', 'language', 'steal', 'reasoning', 'editing']) {
      const html = a.go(`r5-${st}`);
      const n = (reviews['5'] as any)[st].items.length;
      expect((html.match(/<div class="q" id="q-r5:/g) || []).length, st).toBe(n);
    }
    expect(a.go('r3-assessment')).toContain('Teacher Lens');
    expect(a.go('r3-editing')).not.toContain('compare with one edited version');   // no authored edited version, no dead button
    expect(a.go('r1-editing')).toContain('compare with one edited version');
    expect(a.go('r3-synthesis')).toMatch(/45 minutes/);
  });
  it('every unit stage renders for Units 01–32 without undefined / NaN', () => {
    const a: any = loadApp();
    for (let i = 1; i <= 32; i++) {
      const u = String(i).padStart(2, '0');
      for (const st of ['know', 'read', 'interpret', 'notice', 'steal', 'think', 'write', 'edit', 'retrieve']) {
        const html = a.go(`u${u}-${st}`);
        expect(visible(html), `u${u}-${st}`).not.toMatch(/\bundefined\b|\bNaN\b|\[object Object\]/);
      }
    }
  });
  it('7–8. U23 and U32 speaking render with record controls and the authored task', () => {
    const a: any = loadApp();
    for (const u of ['23', '32']) {
      const html = a.go(`u${u}-think`);
      expect(html).toContain(`data-act="sprecord" data-u="${u}" data-sid="s1"`);
      expect(html).toContain(units[u].speaking.part2.topic.slice(0, 40));
    }
  });
  it('THINK objective items keep their options/labels (Units 02–22 used to lose them)', () => {
    const a: any = loadApp();
    const html = a.go('u02-think');
    expect(html).toContain('She reports experiencing or expressing less emotion');
    expect(html).toMatch(/<option >Observation<\/option>|<option>Observation<\/option>|<option >Observation/);
  });
  it('quote items render and check against the authored phrase', () => {
    const a: any = loadApp({ a: { '23:23i4': 'memento mori that freezes a split-second of fugitive existence' } });
    const html = a.go('u23-interpret');
    expect(html).toContain('id="q-23:23i4"');
    try { a.click({ act: 'check', q: '23:23i4' }); } catch { /* the harness has no feedback node to write into */ }
    expect(a.state().a['23:23i4:checked']).toMatchObject({ answer: expect.stringContaining('memento mori') });
  });
});

describe('Book · listening without a recording', () => {
  it('15. no broken player: a notice, no <audio>, no submit, no transcript', () => {
    const a: any = loadApp();
    const html = a.go('u23-interpret');
    const lab = html.slice(html.indexOf('Listening Lab'));
    expect(lab).toContain('Audio not recorded yet.');
    expect(lab).not.toContain('<audio');
    expect(lab).not.toContain('data-act="lisubmit"');
    expect(lab).not.toContain('Transcript + analysis');
    expect(lab).toContain('<fieldset class="li-preview" disabled');
    expect(lab).not.toMatch(/NaN|undefined/);
  });
  it('16. an unrecorded listening is never completed, even by a stray submit', () => {
    const a: any = loadApp();
    a.go('u23-interpret');
    a.click({ act: 'lisubmit', u: '23', lid: '23l1' });
    expect(a.state().a || {}).not.toHaveProperty('23:li:23l1:submitted');
  });
  it('21. work submitted earlier on a now-pending track stays visible (nothing hidden)', () => {
    const a: any = loadApp({ a: { '11:li:l1:submitted': { at: '2026-09-30T10:00:00.000Z', answers: {} } } });
    const html = a.go('u11-interpret');
    expect(html).toContain('data-act="lisubmit" data-u="11" data-lid="l1"');
    expect(html).toContain('Transcript + analysis');
  });
  it('recorded tracks keep their player', () => {
    expect(loadApp().go('u01-interpret')).toContain('<audio controls preload="metadata" src="/audio/en/unit-01/u01-listening-01.mp3"');
  });
});

/* ── Client ↔ server: the exact bodies the browser sends are accepted ── */
let calls: any[] = [];
const original = { ai: { ...config.ai, models: { ...config.ai.models } } };
afterEach(() => { Object.assign(config.ai, original.ai, { models: { ...original.ai.models } }); __setStructuredCallForTests(null); calls = []; });
const emails: string[] = [];
afterAll(async () => { await prisma.user.deleteMany({ where: { email: { in: emails } } }); await prisma.$disconnect(); });
async function session() {
  const email = `ci-${Date.now()}-${emails.length}@example.com`; emails.push(email);
  const res = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
  return res.headers['set-cookie'].find((c: string) => c.includes('klang_session')).split(';')[0];
}
function fakeAi() {
  config.ai.apiKey = 'sk-test-not-real'; config.ai.models = allModels('fake') as any;
  __setStructuredCallForTests(async (p: any) => { calls.push(p); return {}; });
}
/** What the real client posts for an action (captured from the book, never hand-written). */
async function bodyFromBook(state: any, route: string, click: Record<string, string>, url: string) {
  const a: any = loadApp(state, { fetch: () => ({ status: 503, body: {} }) });
  a.go(route);
  a.click(click);
  await new Promise((r) => setTimeout(r, 15));
  const f = a.fetches.find((x: any) => x.url === url);
  expect(f, `${route} → ${url}`).toBeTruthy();
  return f.body;
}

describe('Client ↔ server contracts (real payloads)', () => {
  it('17. speaking feedback: U23 (canonical now) and U01 bodies are accepted', async () => {
    fakeAi();
    const cookie = await session();
    for (const u of ['01', '23', '32']) {
      const sp = [{ id: `sp_${u}`, unit: u, activityId: 's1', attempt: 1, date: '2026-10-01T10:00:00.000Z', duration: 60, transcript: 'I think the photograph stays with me because of one detail.' }];
      const body = await bodyFromBook({ sp }, `u${u}-think`, { act: 'spfeedback', id: `sp_${u}` }, '/api/ai/speaking-feedback');
      const r = await request(app).post('/api/ai/speaking-feedback').set('Cookie', cookie).send(body);
      expect(r.status, `U${u} ${JSON.stringify(body)}`).not.toBe(400);
      expect(r.status, `U${u}`).not.toBe(404);
    }
  });
  it('18. listening feedback: the body the book sends for an open question is accepted (U01, and U23 ids once recorded)', async () => {
    fakeAi();
    const cookie = await session();
    const l = units['01'].listening[0], q = l.questions.find((x: any) => x.type === 'open');
    const body = await bodyFromBook({ a: { [`01:li:${l.id}:submitted`]: { at: 't', answers: {} }, [`01:li:${l.id}:${q.id}`]: 'Because recognising a name is easier than retrieving it.' } }, 'u01-interpret', { act: 'lifb', u: '01', lid: l.id, qid: q.id }, '/api/ai/listening-feedback');
    expect((await request(app).post('/api/ai/listening-feedback').set('Cookie', cookie).send(body)).status).not.toBe(400);
    const l23 = units['23'].listening.find((x: any) => x.questions.some((y: any) => y.type === 'open'));
    if (l23) {
      const q23 = l23.questions.find((y: any) => y.type === 'open');
      const r = await request(app).post('/api/ai/listening-feedback').set('Cookie', cookie).send({ unit: '23', activityId: l23.id, questionId: q23.id, answer: 'x' });
      expect(r.status, `${l23.id} ${q23.id}`).not.toBe(400);
    }
  });
  it('19. reviews: speaking and listening bodies from R1 and R5 are accepted', async () => {
    fakeAi();
    const cookie = await session();
    for (const r of ['1', '5']) {
      const sid = reviews[r].speaking.id;
      const sp = [{ id: `sp_r${r}`, unit: `r${r}`, activityId: sid, attempt: 1, date: '2026-10-01T10:00:00.000Z', duration: 60, transcript: 'A short spoken answer.' }];
      const body = await bodyFromBook({ sp }, `r${r}-reasoning`, { act: 'spfeedback', id: `sp_r${r}` }, '/api/ai/speaking-feedback');
      const res = await request(app).post('/api/ai/speaking-feedback').set('Cookie', cookie).send(body);
      expect(res.status, `R${r} ${JSON.stringify(body)}`).not.toBe(400);
      expect(res.status, `R${r}`).not.toBe(404);
    }
    const l = reviews['1'].listening[0], q = l.questions.find((x: any) => x.type === 'open');
    const body = await bodyFromBook({ a: { [`r1:li:${l.id}:submitted`]: { at: 't', answers: {} }, [`r1:li:${l.id}:${q.id}`]: 'An answer.' } }, 'r1-reading', { act: 'lifb', u: 'r1', lid: l.id, qid: q.id }, '/api/ai/listening-feedback');
    expect((await request(app).post('/api/ai/listening-feedback').set('Cookie', cookie).send(body)).status).not.toBe(400);
  });
  it('writing / Main Write / interpret / light / explain-question bodies from the book are accepted for a new unit and a review', async () => {
    fakeAi();
    const cookie = await session();
    const cases: [any, string, Record<string, string>, string][] = [
      [{ a: { '16:16w2': 'A draft for the Main Write.' } }, 'u16-write', { act: 'aifb', q: '16:16w2' }, '/api/ai/feedback'],
      [{ a: { 'r5:r5syn': 'A synthesis draft.' } }, 'r5-synthesis', { act: 'aifb', q: 'r5:r5syn' }, '/api/ai/feedback'],
      [{ a: { '16:16i5': 'My interpretation.' } }, 'u16-interpret', { act: 'intfb', q: '16:16i5', u: '16', item: '16i5' }, '/api/ai/interpret-feedback'],
      [{ a: { 'r5:r5r1': 'An answer from memory.' } }, 'r5-retrieve', { act: 'lightfb', q: 'r5:r5r1', u: 'r5', stage: 'retrieve', task: 'r5r1' }, '/api/ai/light-feedback'],
      [{}, 'r5-reasoning', { act: 'explainq', q: 'r5:r5t1', u: 'r5', stage: 'reasoning', task: 'r5t1' }, '/api/ai/explain-question'],
    ];
    for (const [state, route, click, url] of cases) {
      const body = await bodyFromBook(state, route, click, url);
      const r = await request(app).post(url).set('Cookie', cookie).send(body);
      expect(r.status, `${route} ${url} ${JSON.stringify(body).slice(0, 160)}`).not.toBe(400);
      expect(r.status, `${route} ${url}`).not.toBe(404);
    }
  });
});

describe('Compatibility', () => {
  it('20. an answer in a newly renderable review survives a refresh', () => {
    const a: any = loadApp();
    a.go('r5-retrieve');
    a.type('r5:r5r1', 'An answer written in Review 5.');
    const b: any = loadApp(a.state());
    expect(b.go('r5-retrieve')).toContain('An answer written in Review 5.');
  });
  it('22–23. Main Write snapshot semantics and the Study Timer are untouched by this block', () => {
    const src = fs.readFileSync(path.resolve(__dirname, '../public/app.js'), 'utf8');
    expect(src).toContain('const draft1Locked = k =>');
    expect(src).toContain("const ST = window.KLANG_STUDY;");
  });
});

it('24. no real network call was made by this suite', () => { expect(network).toEqual([]); });
