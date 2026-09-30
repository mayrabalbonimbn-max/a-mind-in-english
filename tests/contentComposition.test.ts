import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { describe, expect, it } from 'vitest';
import { contentIndex, getUnit, getWritingTask } from '../src/services/content';

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'public/data');

function loadDependencyOrderedBook() {
  const sandbox: any = { window: {} };
  vm.createContext(sandbox);
  const files = fs.readdirSync(dataDir).filter((file) => file.endsWith('.js'));
  const phase = (file: string) => {
    if (file === 'curriculum.js') return 0;
    if (file === 'critical-thinking.js') return 1;
    if (file === 'unit-core.js') return 2;
    if (/^unit-\d{2}\.js$/.test(file)) return 3;
    if (/^unit-\d{2}-.+\.js$/.test(file)) return 4;
    return 5;
  };
  files.sort((a, b) => phase(a) - phase(b) || a.localeCompare(b));
  for (const file of files) {
    vm.runInContext(fs.readFileSync(path.join(dataDir, file), 'utf8'), sandbox, { filename: file });
  }
  return JSON.parse(JSON.stringify(sandbox.window.KLANG));
}

describe('server-side content composition', () => {
  const unit = getUnit('01')!;

  it('preserves Unit 01 base content together with its listening and speaking extension', () => {
    expect(unit).toBeTruthy();
    for (const stage of ['know', 'read', 'interpret', 'notice', 'steal', 'think', 'write', 'edit', 'retrieve']) {
      expect(unit.data[stage], stage).toBeTruthy();
    }
    expect(unit.data.read.main.paras.length).toBeGreaterThan(0);
    expect(unit.data.listening.map((activity: any) => activity.id)).toEqual(['l1', 'l2']);
    expect(unit.data.listening[0].file).toBe('/audio/en/unit-01/u01-listening-01.mp3');
    expect(unit.data.speaking.id).toBe('s1');
  });

  it('keeps Main Write, cumulative reasoning, and Core/Optional references intact', () => {
    const main = getWritingTask('01', 'w2');
    expect(main?.task.main).toBe(true);
    expect(getWritingTask('01', 'w2r')).toMatchObject({ isRevision: true });
    expect((unit.meta as any).criticalThinking).toBe('evidence vs inference · uncertainty');

    const app = fs.readFileSync(path.join(root, 'public/app.js'), 'utf8');
    const match = app.match(/const CORE = (\{[\s\S]*?\n  \});/);
    expect(match).toBeTruthy();
    const core = Function(`return ${match![1]}`)()['01'];
    const ids = {
      interpret: unit.data.interpret.items.map((item: any) => item.id),
      steal: unit.data.steal.chunks.map((chunk: any) => chunk.task.id),
      think: unit.data.think.items.map((item: any) => item.id),
      retrieve: unit.data.retrieve.items.map((item: any) => item.id),
    };
    for (const area of Object.keys(ids) as Array<keyof typeof ids>) {
      core[area].forEach((id: string) => expect(ids[area], `${area}:${id}`).toContain(id));
    }
  });

  it('matches a dependency-ordered browser composition without silently losing unit or review fields', () => {
    const expected = loadDependencyOrderedBook();
    const actual = contentIndex();
    expect(JSON.parse(JSON.stringify(actual.units))).toEqual(expected.units);
    expect(JSON.parse(JSON.stringify(actual.reviews))).toEqual(expected.reviews);
    expect(getUnit('r1')?.data.listening[0].id).toBe('r1l1');
    expect(getUnit('r1')?.data.speaking.id).toBe('m1s1');
  });

  it('is resilient to reverse or arbitrary load order: unit-01-media before unit-01 does not lose media', () => {
    const sandbox: any = { window: {} };
    vm.createContext(sandbox);
    // Execute unit-01-media.js FIRST, then unit-01.js
    const mediaCode = fs.readFileSync(path.join(dataDir, 'unit-01-media.js'), 'utf8');
    const unit01Code = fs.readFileSync(path.join(dataDir, 'unit-01.js'), 'utf8');
    vm.runInContext(mediaCode, sandbox, { filename: 'unit-01-media.js' });
    vm.runInContext(unit01Code, sandbox, { filename: 'unit-01.js' });

    const u01 = sandbox.window.KLANG.units['01'];
    expect(u01).toBeTruthy();
    expect(u01.id).toBe('01');
    expect(u01.know).toBeTruthy();
    expect(u01.read).toBeTruthy();
    expect(u01.listening).toHaveLength(2);
    expect(u01.listening[0].id).toBe('l1');
    expect(u01.listening[1].id).toBe('l2');
    expect(u01.speaking).toBeTruthy();
    expect(u01.speaking.id).toBe('s1');
  });

  it('guarantees every unit 01–32 has complete, queryable listening and speaking in server getUnit', () => {
    for (let i = 1; i <= 32; i++) {
      const id = String(i).padStart(2, '0');
      const u = getUnit(id);
      expect(u, `Unit ${id} must exist`).toBeTruthy();
      expect(u!.data.listening, `Unit ${id} must have listening`).toBeDefined();
      expect(u!.data.listening.length, `Unit ${id} must have listening items`).toBeGreaterThan(0);
      expect(u!.data.speaking, `Unit ${id} must have speaking`).toBeDefined();
      if (u!.data.speaking.id) {
        expect(u!.data.speaking.id).toBe('s1');
      }
    }
  });
});
