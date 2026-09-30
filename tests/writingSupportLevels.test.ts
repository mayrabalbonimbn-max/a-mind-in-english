import fs from 'fs';
import path from 'path';
import { describe, it, expect, vi } from 'vitest';

// Any request the real OpenAI client could make lands here: the suite proves nothing leaves the machine.
const network: string[] = [];
vi.stubGlobal('fetch', async (url: any) => { network.push(String(url)); return new Response('{}', { status: 500 }); });

import { getUnit } from '../src/services/content';
import { extractEvidence } from '../src/services/learningReview/evidence';
import { evidenceLine, LEARNING_REVIEW_SYSTEM } from '../src/services/learningReview/prompt';
import { loadApp } from './helpers/appHarness';
import { loadSyncClient } from './helpers/browserSync';

const RG = require('../public/register.js');
const LEVELS = ['high', 'medium', 'light', 'off'];
const IDS = Array.from({ length: 32 }, (_, i) => String(i + 1).padStart(2, '0'));

// Every activity the book renders in every unit and review, with its stage
function activities() {
  const out: { u: string; stage: string; it: any }[] = [];
  const walk = (u: string, stage: string, items: any[]) => (items || []).forEach((it) => it && (it.type === 'group' ? walk(u, stage, it.items) : out.push({ u, stage, it })));
  for (const u of IDS) {
    const d = getUnit(u)!.data;
    walk(u, 'know', d.know?.items); walk(u, 'interpret', d.interpret?.items); walk(u, 'think', d.think?.items); walk(u, 'retrieve', d.retrieve?.items);
    (d.notice?.focuses || []).forEach((f: any) => { walk(u, 'notice', f.ask); walk(u, 'notice', f.make); });
    if (d.notice?.mini) walk(u, 'notice', d.notice.mini.items);
    (d.steal?.chunks || []).forEach((c: any) => walk(u, 'steal', [c.task])); walk(u, 'steal', d.steal?.practice);
    walk(u, 'write', d.write?.items);
    if (d.edit?.revised) walk(u, 'edit', [d.edit.revised]);
  }
  for (const r of ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7']) {
    const d = getUnit(r)?.data; if (!d) continue;
    for (const st of ['retrieve', 'language', 'steal', 'reasoning', 'editing']) walk(r, st, d[st]?.items);
    walk(r, 'synthesis', [d.synthesis]); walk(r, 'synthesis', [d.timed]);
  }
  return out;
}
const ALL = activities();
const eligible = ALL.filter((x) => RG.profileFor(x.stage, x.it));
const firstOpen = (u: string, stage = 'interpret') => ALL.find((x) => x.u === u && x.stage === stage && x.it.type === 'open' && RG.profileFor(stage, x.it))!;
const mainOf = (u: string) => (getUnit(u)!.data.write.items as any[]).find((w) => w.main)!;
// The whole Writing Support control of one activity: from its wrapper to the wrapper's end
const block = (html: string, k: string) => {
  const i = html.indexOf(`data-wsupw="${k}"`);
  if (i < 0) return '';
  const ends = ['</details></div>', 'writing support · off</p></div>'].map((e) => { const j = html.indexOf(e, i); return j < 0 ? Infinity : j + e.length; });
  return html.slice(i, Math.min(...ends));
};
const I = firstOpen('01');                   // Unit 01 INTERPRET (default HIGH)
const K = `01:${I.it.id}`;

describe('Writing Support levels · defaults and content', () => {
  it('1. first visit uses the pedagogical default of the unit (01–02 high, 03–05 medium, later units light)', () => {
    const a: any = loadApp();
    // Units 23–32 have no open INTERPRET item in the current curriculum: their THINK is used instead
    for (const [u, level, stage] of [['01', 'high', 'interpret'], ['02', 'high', 'interpret'], ['05', 'medium', 'interpret'], ['10', 'light', 'interpret'], ['16', 'light', 'interpret'], ['32', 'light', 'think']]) {
      const x = firstOpen(u, stage);
      const html = a.go(`u${u}-${stage}`);
      const b = block(html, `${u}:${x.it.id}`);
      expect(b, u).toMatch(new RegExp(`data-level="${level}" aria-pressed="true"`));
      expect(b, u).toContain(`<details class="wsup" data-level="${level}"`);
    }
    expect(a.state().a || {}).toEqual({});          // a default is not a stored choice
  });

  it('2–5. HIGH is the fullest layer, MEDIUM a subset, LIGHT a reminder, OFF nothing', () => {
    const at = (l: string) => RG.supportFor('01', I.stage, I.it, l);
    const [h, m, l] = [at('high'), at('medium'), at('light')];
    expect(h.why).not.toBe(''); expect(h.steps.length).toBeGreaterThanOrEqual(3); expect(h.frames.length).toBe(4); expect(h.note).not.toBe('');
    expect(m.why).not.toBe(''); expect(m.steps).toEqual([]); expect(m.frames.length).toBe(3); expect(m.summary).not.toBe(''); expect(m.note).not.toBe('');
    expect(l.why).toBe(''); expect(l.steps).toEqual([]); expect(l.frames.length).toBe(2); expect(l.note).not.toBe('');
    for (const f of m.frames) expect(h.frames).toContain(f);
    for (const f of l.frames) expect(m.frames).toContain(f);
    expect(at('off')).toBeNull();
    const w = mainOf('01');
    expect(RG.supportFor('01', 'write', w, 'high').plan).not.toBeNull();       // "before you write" in HIGH
    expect(RG.supportFor('01', 'write', w, 'medium').plan).toBeNull();

    const a: any = loadApp({ a: { [`${K}:supportLevel`]: 'off' } });
    const off = block(a.go('u01-interpret'), K);
    expect(off).toContain('writing support · off');
    expect(off).not.toMatch(/<details|Useful language|Writing tips|Register<\/div>/);
    const lightHtml = block(loadApp({ a: { [`${K}:supportLevel`]: 'light' } }).go('u01-interpret'), K);
    expect(lightHtml).toContain('Check before you submit');
    const visible = lightHtml.slice(0, lightHtml.indexOf('<details class="wsmore"') > 0 ? lightHtml.indexOf('<details class="wsmore"') : undefined);
    expect(visible).not.toMatch(/<ol class="wss">/);                  // steps only behind "need more support?"
    expect(visible).not.toContain('Thinking aloud');                    // no register explanation in LIGHT
  });

  it('collapsed by default at every level, HIGH included', () => {
    for (const l of ['high', 'medium', 'light']) {
      const html = loadApp({ a: { [`${K}:supportLevel`]: l } }).go('u01-interpret');
      expect(html).not.toMatch(/<details class="wsup"[^>]*\sopen/);
    }
  });
});

describe('Writing Support levels · learner choice', () => {
  it('6–8. changing the level changes neither the prompt, the answer, nor Core/Optional', () => {
    const a: any = loadApp({ a: { [K]: 'My own answer.' }, last: { u: '01', s: 'interpret' } });
    const before = a.go('u01-interpret');
    const qt = (h: string) => (h.match(/<div class="qt">[\s\S]*?<\/div>/g) || []).join('|');
    const core = (h: string) => (h.match(/tago core|optional · extra practice/g) || []).length;
    for (const level of LEVELS) {
      a.click({ act: 'wslevel', wsk: K, level });
      const after = a.go('u01-interpret');
      expect(qt(after)).toBe(qt(before));
      expect(core(after)).toBe(core(before));
      expect(a.state().a[K]).toBe('My own answer.');
    }
  });

  it('9–10. the choice persists per activity (refresh) and does not change any other activity', () => {
    const other = ALL.find((x) => x.u === '01' && x.stage === 'interpret' && x.it.type === 'open' && x.it.id !== I.it.id && RG.profileFor('interpret', x.it))!;
    const a: any = loadApp({ last: { u: '01', s: 'interpret' } });
    a.go('u01-interpret');
    a.click({ act: 'wslevel', wsk: K, level: 'off' });
    a.click({ act: 'wslevel', wsk: `01:${mainOf('01').id}`, level: 'medium' });
    expect(a.state().a[`${K}:supportLevel`]).toBe('off');
    expect(a.state().a[`01:${other.it.id}:supportLevel`]).toBeUndefined();
    const b: any = loadApp(a.state());                                  // refresh
    const html = b.go('u01-interpret');
    expect(block(html, K)).toContain('writing support · off');
    expect(block(html, `01:${other.it.id}`)).toMatch(/data-level="high" aria-pressed="true"/);
    expect(block(b.go('u01-write'), `01:${mainOf('01').id}`)).toMatch(/data-level="medium" aria-pressed="true"/);
    expect(block(b.go('u02-interpret'), `02:${firstOpen('02').it.id}`)).toMatch(/data-level="high" aria-pressed="true"/);
  });

  it('choosing a level is not study work: the unit does not become "in progress"', () => {
    const a: any = loadApp({ a: { '05:x:supportLevel': 'off', '05:y:support': { at: '2026-09-30T10:00:00Z', level: 'medium', beforeWriting: true } } });
    a.go('home');
    expect(a.side()).not.toMatch(/href="#u05"[^>]*>[\s\S]*?<span class="st part">/);
  });
});

describe('Writing Support levels · provenance', () => {
  const used = (a: any, k = K) => a.state().a[`${k}:support`];

  it.each(['high', 'medium', 'light'])('11–13. %s selected but never opened → supportUsed false', (level) => {
    const a: any = loadApp();
    a.go('u01-interpret');
    a.click({ act: 'wslevel', wsk: K, level });
    expect(used(a)).toBeUndefined();
    const ev = extractEvidence([{ key: 'unit:01', revision: 1, updatedAt: new Date(), data: { answers: { [K]: 'Answer.', ...a.state().a }, sections: {}, done: false } }] as any);
    const e = ev.find((x: any) => x.id === `ans:01:${I.it.id}`)!;
    expect(e.supportUsed).toBe(false);
    expect(e.provenance).toBe('independent');
    expect(e.support).toEqual({ level, used: false, openedBeforeWriting: null });
  });

  it('14/16. opening before writing anything → supportUsed true, openedBeforeWriting true', () => {
    const a: any = loadApp();
    a.go('u01-interpret');
    a.fire('toggle', { open: true, dataset: { wsup: K, level: 'high' } });
    expect(used(a)).toMatchObject({ level: 'high', beforeWriting: true });
    expect(Object.keys(used(a)).sort()).toEqual(['at', 'beforeWriting', 'level']);     // three facts, no text
  });

  it('17. starting to write, then opening → openedBeforeWriting false; later opens do not rewrite the first', () => {
    const a: any = loadApp({ a: { [K]: 'I started on my own' } });
    a.go('u01-interpret');
    a.fire('toggle', { open: true, dataset: { wsup: K, level: 'light' } });
    const first = used(a);
    expect(first).toMatchObject({ level: 'light', beforeWriting: false });
    a.fire('toggle', { open: true, dataset: { wsup: K, level: 'high' } });
    expect(used(a)).toEqual(first);
  });

  it('15. OFF → nothing to open, supportUsed false', () => {
    const a: any = loadApp({ a: { [`${K}:supportLevel`]: 'off' } });
    expect(block(a.go('u01-interpret'), K)).not.toContain('<details');
    a.fire('toggle', { open: true, dataset: { wsup: K, level: 'off' } });   // even a stray event is ignored
    expect(used(a)).toBeUndefined();
  });

  it('18. provenance travels with the unit document through sync and back', async () => {
    const pushed: any[] = [];
    const client = loadSyncClient(async (url, opts) => {
      if (opts?.body) pushed.push(JSON.parse(opts.body));
      if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u', email: 'e' } } };
      if (url === '/api/docs') return { status: 200, body: { success: true, documents: [] } };
      if (url === '/api/sync/batch') return { status: 200, body: { success: true, saved: [], conflicts: [], rejected: [] } };
      return { status: 200, body: { success: true, doc: { revision: 1 } } };
    });
    const rec = { at: '2026-09-30T10:00:00.000Z', level: 'medium', beforeWriting: false };
    const S: any = { a: { [K]: 'x', [`${K}:supportLevel`]: 'medium', [`${K}:support`]: rec }, sec: {}, ud: {}, rd: {} };
    client.api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 40));
    const unitDoc = pushed.flatMap((b) => b.documents || []).find((d: any) => d.key === 'unit:01');
    expect(unitDoc.data.answers[`${K}:supportLevel`]).toBe('medium');
    expect(unitDoc.data.answers[`${K}:support`]).toEqual(rec);
  });

  it('19. the Learning Review receives the facts as context, with a rule against reading them as ability', () => {
    const answers = { [K]: 'My answer.', [`${K}:supportLevel`]: 'high', [`${K}:support`]: { at: '2026-09-30T10:00:00.000Z', level: 'high', beforeWriting: false } };
    const e = extractEvidence([{ key: 'unit:01', revision: 1, updatedAt: new Date(), data: { answers, sections: {}, done: false } }] as any).find((x: any) => x.id === `ans:01:${I.it.id}`)!;
    expect(e.provenance).toBe('support_used');
    expect(e.support).toEqual({ level: 'high', used: true, openedBeforeWriting: false });
    const line = evidenceLine('E1', e, () => undefined);
    expect(line).toContain('support: level high chosen, opened after starting to write');
    expect(line).not.toMatch(/weak|strong|score|%/i);
    expect(LEARNING_REVIEW_SYSTEM).toMatch(/Never conclude that a high level means weak ability or that off means strong ability/);
    // an old record (timestamp only, before levels existed) still counts as used, level unknown
    const old = extractEvidence([{ key: 'unit:01', revision: 1, updatedAt: new Date(), data: { answers: { [K]: 'x', [`${K}:support`]: '2026-09-29T10:00:00.000Z' }, sections: {}, done: false } }] as any).find((x: any) => x.id === `ans:01:${I.it.id}`)!;
    expect(old.support).toEqual({ level: null, used: true, openedBeforeWriting: null });
  });

  it('the Learning Review never changes a level: no code path writes :supportLevel on the server', () => {
    const src = ['src/services/learningReview/pipeline.ts', 'src/services/learningReview/merge.ts', 'src/routes/learningReview.ts', 'public/learning-review.js']
      .map((f) => fs.readFileSync(path.resolve(__dirname, '..', f), 'utf8')).join('\n');
    expect(src).not.toMatch(/supportLevel['"`]?\s*[\]:]?\s*=/);
  });
});

describe('Writing Support levels · eligibility, Main Write, anti-ghostwriting', () => {
  it('20. eligibility is unchanged: no protected activity gains support at any level', () => {
    for (const x of ALL) {
      const protectedStage = x.it.timed || ['retrieve', 'notice', 'steal', 'edit', 'language', 'editing'].includes(x.stage) || !['open', 'writing'].includes(x.it.type);
      if (protectedStage) for (const l of LEVELS) expect(RG.supportFor(x.u, x.stage, x.it, l), `${x.u} ${x.stage} ${x.it.id}`).toBeNull();
    }
    const a: any = loadApp();
    for (const s of ['u01-retrieve', 'u05-notice', 'u10-steal', 'u16-edit', 'u32-retrieve', 'r1-retrieve']) expect(a.go(s), s).not.toContain('data-wsupw');
    const running: any = loadApp({ a: { 'r1:tc:start': new Date().toISOString() } });
    const html = running.go('r1-synthesis');
    expect(html.slice(html.indexOf('class="block timed"'))).not.toContain('wsup');
    // exactly one control per eligible activity on a page
    const u01 = a.go('u01-interpret');
    expect((u01.match(/data-wsupw=/g) || []).length).toBe(eligible.filter((x) => x.u === '01' && x.stage === 'interpret').length);
  });

  it('21–23. Main Write: level and use stay beside the draft; the feedback request is unchanged', async () => {
    const w = mainOf('16'), k = `16:${w.id}`;
    const a: any = loadApp({ a: { [k]: 'Draft one text stays exactly as written.' }, last: { u: '16', s: 'write' } }, { fetch: () => ({ status: 503, body: {} }) });
    const html = a.go('u16-write');
    expect(block(html, k)).toMatch(/data-level="light" aria-pressed="true"/);
    a.click({ act: 'wslevel', wsk: k, level: 'high' });
    a.fire('toggle', { open: true, dataset: { wsup: k, level: 'high' } });
    expect(a.state().a[k]).toBe('Draft one text stays exactly as written.');
    expect(a.state().pf || {}).toEqual({});
    a.click({ act: 'aifb', q: k });
    await new Promise((r) => setTimeout(r, 10));
    const req = a.fetches.find((f: any) => f.url === '/api/ai/feedback');
    expect(req).toBeTruthy();
    expect(Object.keys(req.body).sort()).toEqual(['support', 'taskId', 'text', 'unit']);    // server still decides main/Sol
    expect(req.body.support).toEqual({ level: 'high', used: true, openedBeforeWriting: false });   // provenance only (draft already had text)
    expect(req.body.text).toBe('Draft one text stays exactly as written.');
  });

  it('Unit 32 Capstone keeps its support (eligible under the current curriculum), default light', () => {
    const w = mainOf('32');
    expect(RG.profileFor('write', w)).toBeTruthy();
    expect(block(loadApp().go('u32-write'), `32:${w.id}`)).toMatch(/data-level="light" aria-pressed="true"/);
  });

  it('24. no level contains an answer: content never depends on the task and holds only open frames', () => {
    for (const x of eligible) for (const l of ['high', 'medium', 'light']) {
      const s = RG.supportFor(x.u, x.stage, x.it, l);
      const blind = RG.supportFor(x.u, x.stage, { ...x.it, q: 'ZZZ', prompt: 'ZZZ', title: 'ZZZ', guide: null, support: null, model: null }, l);
      expect(blind, `${x.u} ${x.it.id} ${l}`).toEqual(s);
      for (const f of [...s.frames, ...(s.more ? s.more.frames : [])]) { expect(f).toMatch(/…$/); expect(f.split(' ').length).toBeLessThanOrEqual(8); }
    }
  });

  it('25–26. compact, accessible control: keyboard buttons, touch size on phones, no overflow rules broken', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../public/styles.css'), 'utf8');
    expect(css).toMatch(/\.wslv-o:focus-visible\{/);
    expect(css).toMatch(/@media \(max-width:640px\)\{\s*\.wslv\{position:static;flex-wrap:wrap/);
    expect(css).toMatch(/\.wslv-o\{min-height:40px/);
    const html = loadApp().go('u01-interpret');
    expect(html).toMatch(/class="wslv" role="group" aria-label="Writing support: choose how much language support you want for this task"/);
    expect(html).toMatch(/<button type="button" class="wslv-o on" data-act="wslevel"[^>]*aria-pressed="true">High<\/button>/);
    expect(block(html, K)).not.toMatch(/difficulty|easy|hard|level \d|score/i);
  });
});

it('no real network call was made by this suite', () => { expect(network).toEqual([]); });
