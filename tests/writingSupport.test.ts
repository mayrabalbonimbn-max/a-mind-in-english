import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { getUnit } from '../src/services/content';
import { loadApp } from './helpers/appHarness';

// Writing support (register guide + useful language + writing tips) is local, deterministic content.
const RG = require('../public/register.js');
const UNITS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

// Every activity the book renders, with the stage it is rendered in
function activities() {
  const out: { u: string; stage: string; it: any }[] = [];
  const walk = (u: string, stage: string, items: any[]) => (items || []).forEach((it) => it && (it.type === 'group' ? walk(u, stage, it.items) : out.push({ u, stage, it })));
  for (const u of UNITS) {
    const d = getUnit(u)!.data;
    walk(u, 'know', d.know?.items); walk(u, 'interpret', d.interpret?.items); walk(u, 'think', d.think?.items); walk(u, 'retrieve', d.retrieve?.items);
    (d.notice?.focuses || []).forEach((f: any) => { walk(u, 'notice', f.ask); walk(u, 'notice', f.make); });
    if (d.notice?.mini) walk(u, 'notice', d.notice.mini.items);
    (d.steal?.chunks || []).forEach((c: any) => walk(u, 'steal', [c.task])); walk(u, 'steal', d.steal?.practice);
    walk(u, 'write', d.write?.items);
    if (d.edit?.revised) walk(u, 'edit', [d.edit.revised]);
  }
  for (const r of ['r1', 'r2']) {
    const d = getUnit(r)!.data;
    for (const st of ['retrieve', 'language', 'steal', 'reasoning', 'editing']) walk(r, st, d[st]?.items);
    walk(r, 'synthesis', [d.synthesis]);
    walk(r, 'synthesis', [d.timed]);
  }
  return out;
}
const ALL = activities();

describe('Writing support · deterministic scaffolding', () => {
  it('support fades by unit: high in 01–02, medium in 03–05, light in 06–10 and the reviews', () => {
    const interpretOf = (u: string) => ALL.find((x) => x.u === u && x.stage === 'interpret' && x.it.type === 'open')!;
    for (const u of ['01', '02']) {
      const s = RG.supportFor(u, 'interpret', interpretOf(u).it);
      expect(s.level).toBe('high');
      expect(s.frames.length).toBeGreaterThanOrEqual(3);
      expect(s.frames.length).toBeLessThanOrEqual(5);
      expect(s.steps.length).toBeGreaterThanOrEqual(3);
      expect(s.why).not.toBe('');
    }
    for (const u of ['03', '04', '05']) {
      const s = RG.supportFor(u, 'interpret', interpretOf(u).it);
      expect(s.level).toBe('medium');
      expect(s.frames.length).toBeGreaterThanOrEqual(2);
      expect(s.frames.length).toBeLessThanOrEqual(4);
      expect(s.steps).toEqual([]);
      expect(s.summary).not.toBe('');
    }
    for (const u of ['06', '07', '08', '09', '10', 'r1']) {
      const item = u === 'r1' ? getUnit('r1')!.data.synthesis : interpretOf(u).it;
      const s = RG.supportFor(u, u === 'r1' ? 'synthesis' : 'interpret', item);
      expect(s.level).toBe('light');
      expect(s.frames.length).toBeLessThanOrEqual(2);
      expect(s.steps).toEqual([]);
    }
  });

  it('keeps extra support reachable ("need more support?") where the visible layer is lighter', () => {
    for (const x of ALL) {
      const s = RG.supportFor(x.u, x.stage, x.it);
      if (!s) continue;
      if (s.level === 'high') { expect(s.more === null || s.more.frames.length > 0).toBe(true); continue; }
      expect(s.more, `${x.u} ${x.it.id}`).not.toBeNull();
      expect(s.more.steps.length).toBeGreaterThan(0);
      expect(s.frames.length + s.more.frames.length).toBe(5);
      if (x.it.type === 'writing') expect(s.more.plan).not.toBeNull();
    }
  });

  it('offers support only on learning tasks: never on Timed Challenge, Retrieve, Notice, Steal, Edit or objective items', () => {
    const shown = new Set<string>();
    for (const x of ALL) {
      const s = RG.supportFor(x.u, x.stage, x.it);
      if (x.it.timed || ['retrieve', 'notice', 'steal', 'edit', 'language', 'editing'].includes(x.stage) || !['open', 'writing'].includes(x.it.type)) expect(s, `${x.u} ${x.stage} ${x.it.id}`).toBeNull();
      if (s) shown.add(x.stage);
    }
    expect([...shown].sort()).toEqual(['interpret', 'know', 'reasoning', 'synthesis', 'think', 'write']);   // Review Reasoning Lab = transfer, not recall
    expect(RG.supportFor('r1', 'synthesis', getUnit('r1')!.data.timed)).toBeNull();
  });

  it('never contains the answer: the support does not depend on the question at all and holds only open frames', () => {
    for (const x of ALL) {
      const s = RG.supportFor(x.u, x.stage, x.it);
      if (!s) continue;
      // Replacing the question (and guide) changes nothing: no content of the task can leak into the tips
      const blind = RG.supportFor(x.u, x.stage, { ...x.it, q: 'ZZZ', prompt: 'ZZZ', title: 'ZZZ', guide: null, support: null, model: null });
      expect(blind).toEqual(s);
    }
    for (const p of Object.values<any>(RG.PROFILES)) {
      expect(p.frames.length).toBeLessThanOrEqual(5);
      // Frames are unfinished openings, not statements about any text
      for (const f of p.frames) expect(f, f).toMatch(/…$/);
      for (const f of p.frames) expect(f.split(' ').length, f).toBeLessThanOrEqual(8);
    }
    // No unit-specific vocabulary from the course inside the static support
    const src = fs.readFileSync(path.resolve(__dirname, '../public/register.js'), 'utf8').toLowerCase();
    for (const w of ['narrator', 'memory', 'migration', 'love', 'attrition', 'bakery', 'honest', 'sunk cost', 'recife']) expect(src).not.toContain(w);
  });

  it('matches the register to the task type in a stable way', () => {
    const at = (u: string, id: string) => ALL.find((x) => x.u === u && x.it.id === id)!;
    const label = (u: string, id: string) => RG.supportFor(u, at(u, id).stage, at(u, id).it).label;
    expect(label('01', 'k1')).toBe('NEUTRAL · PERSONAL');          // Before you read
    expect(label('01', 'i9')).toBe('ACADEMIC · ANALYTICAL');       // Argument structure
    expect(label('01', 'i8')).toBe('NEUTRAL · REFLECTIVE');        // Interpretation
    expect(label('02', '02i12')).toBe('NEUTRAL · PERSUASIVE');     // Position
    expect(label('01', 't5')).toBe('NEUTRAL · PERSONAL');          // Apply it to yourself
    expect(label('02', '02t3')).toBe('NEUTRAL · ANALYTICAL');      // Thinking Lab
    expect(label('09', '09w2')).toBe('ACADEMIC · ARGUMENTATIVE');  // Argumentative essay
    expect(label('01', 'w2')).toBe('NEUTRAL · REFLECTIVE');        // Reflective essay
    expect(label('02', '02w2')).toBe('NEUTRAL · PERSONAL');        // Personal essay
  });
});

describe('Writing support · in the book', () => {
  const aiFetches = (a: any) => a.fetches.filter((f: any) => /\/api\/ai\//.test(f.url) && f.url !== '/api/ai/status');

  it('renders one collapsed entry per supported activity and calls no AI', () => {
    const a: any = loadApp();
    const html = a.go('u01-interpret');
    const open = getUnit('01')!.data.interpret.items.filter((i: any) => i.type === 'open').length;
    expect((html.match(/<details class="wsup"/g) || []).length).toBe(open);
    expect(html).not.toMatch(/<details class="wsup"[^>]*\sopen/);         // closed by default (light on mobile)
    expect((html.match(/<summary>writing support/g) || []).length).toBe(open); // a single entry, not two links
    expect(html).toContain('NEUTRAL · REFLECTIVE');
    for (const s of ['u01-know', 'u01-think', 'u01-write', 'u03-interpret', 'u06-interpret', 'r1-synthesis']) a.go(s);
    expect(aiFetches(a)).toHaveLength(0);
  });

  it('shows the deeper layer only behind "need more support?" in later units', () => {
    const a: any = loadApp();
    expect(a.go('u01-interpret')).not.toContain('Step by step');      // Units 01–02 already show the steps
    const u06 = a.go('u06-interpret');
    expect(u06).toContain('<summary>need more support?');
    expect(u06).toContain('Step by step');
  });

  it('never appears on Retrieve, Notice or Steal, nor in the Timed Challenge', () => {
    const a: any = loadApp();
    for (const s of ['u01-retrieve', 'u05-retrieve', 'u01-notice', 'u01-steal', 'u01-edit', 'r1-retrieve']) expect(a.go(s), s).not.toContain('class="wsup"');
    const running: any = loadApp({ a: { 'r1:tc:start': new Date().toISOString() } });
    const html = running.go('r1-synthesis');
    const timed = html.slice(html.indexOf('class="block timed"'));
    expect(timed).toContain('data-tc-timer');
    expect(timed).not.toContain('wsup');
    expect(html.slice(0, html.indexOf('class="block timed"'))).toContain('class="wsup"');   // synthesis keeps it
  });

  it('opening or ignoring the support changes no progress, score or saved state', () => {
    const a: any = loadApp({ a: { '01:i8': 'my answer' }, ud: {}, last: { u: '01', s: 'interpret' } });
    a.go('u01-interpret');
    const before = a.state();
    a.go('u01-interpret');
    const after = a.state();
    for (const k of ['a', 'ud', 'md', 'rd', 'gl', 'bank', 'errs', 'pf', 'sp']) expect(after[k], k).toEqual(before[k]);
    expect(JSON.stringify(after)).not.toMatch(/wsup|writing support|register guide/i);
  });

  it('has a phone layout and keeps the collapsed entry compact', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../public/styles.css'), 'utf8');
    expect(css).toMatch(/details\.wsup>summary[^{]*\{[^}]*font-size:12px/);
    expect(css).toMatch(/@media \(max-width:640px\)\{\s*\.rgx \.rg-row\{grid-template-columns:minmax\(0,1fr\) auto/);
  });
});
