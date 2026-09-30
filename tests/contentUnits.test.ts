import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { describe, expect, it } from 'vitest';

const dataDir = path.resolve(process.cwd(), 'public/data');

function loadBook() {
  const sandbox: any = { window: {} };
  vm.createContext(sandbox);
  const files = ['curriculum.js', 'unit-core.js', 'unit-01-media.js', 'unit-01.js']
    .concat(Array.from({ length: 31 }, (_, i) => `unit-${String(i + 2).padStart(2, '0')}.js`), ['pronunciation.js', 'module-reviews.js']);
  files.forEach((file) => vm.runInContext(fs.readFileSync(path.join(dataDir, file), 'utf8'), sandbox, { filename: file }));
  return sandbox.window.KLANG;
}

const words = (value: unknown) => (String(value ?? '')
  .replace(/\{\{([^|}]+)\|[^}]+\}\}/g, '$1')
  .replace(/<[^>]+>/g, ' ')
  .match(/[A-Za-zÀ-ÿ0-9’'-]+/g) || []).length;

const deepCount = (items: any[] = []): number => items.reduce((sum, item) => sum + 1 + deepCount(item.items || []), 0);

describe('Units 01–32 curriculum content contract', () => {
  const K = loadBook();
  const metadata = K.curriculum.modules.flatMap((module: any) => module.units);

  it('loads the complete sequence of 32 units without gaps', () => {
    expect(Object.keys(K.units).sort((a, b) => Number(a) - Number(b)))
      .toEqual(Array.from({ length: 32 }, (_, i) => String(i + 1).padStart(2, '0')));
    expect(metadata.every((unit: any) => !!K.units[unit.id])).toBe(true);
  });

  for (let n = 1; n <= 32; n += 1) {
    const id = String(n).padStart(2, '0');
    const unit = K.units[id];
    const meta = metadata.find((item: any) => item.id === id);

    it(`Unit ${id} has all substantive stages and meets pedagogical targets`, () => {
      expect(unit, `Unit ${id} must exist`).toBeTruthy();
      for (const stage of ['know', 'read', 'interpret', 'notice', 'steal', 'think', 'write', 'edit', 'retrieve']) {
        expect(unit[stage], `${id}:${stage}`).toBeTruthy();
      }
      expect(deepCount(unit.know.items || [unit.know])).toBeGreaterThanOrEqual(1);
      expect(deepCount(unit.interpret.items || unit.interpret)).toBeGreaterThanOrEqual(7);
      expect(unit.notice.focuses.length).toBeGreaterThanOrEqual(2);
      expect(unit.steal.vocab.length).toBeGreaterThanOrEqual(10);
      expect(unit.steal.chunks.length).toBeGreaterThanOrEqual(10);
      expect(deepCount(unit.think.items || unit.think)).toBeGreaterThanOrEqual(4);
      expect(unit.write.items.length).toBeGreaterThanOrEqual(2);
      expect(unit.edit.checklist.length).toBeGreaterThanOrEqual(5);
      expect(deepCount(unit.retrieve.items || [unit.retrieve])).toBeGreaterThanOrEqual(4);

      const mainWords = words(unit.read.main.paras.join(' '));
      const counterWords = unit.read.counter?.paras ? words(unit.read.counter.paras.join(' ')) : 0;
      const totalReadingWords = mainWords + counterWords;

      if (meta.star) {
        expect(totalReadingWords, `Unit ${id} star reading length`).toBeGreaterThanOrEqual(950);
      } else {
        expect(totalReadingWords, `Unit ${id} standard reading length`).toBeGreaterThanOrEqual(600);
      }

      if (meta.lf) {
        const mainWriting = unit.write.items.find((item: any) => item.main);
        expect(mainWriting, `Unit ${id} main write`).toBeTruthy();
        expect(mainWriting.max, `Unit ${id} main write max`).toBeGreaterThanOrEqual(1200);
      }

      const sources = unit.read.sources || unit.sources;
      if (Number(id) > 1) {
        expect(sources?.length, `Unit ${id} sources`).toBeGreaterThan(0);
        sources.forEach((source: any) => expect(source.url).toMatch(/^https:\/\//));
        expect(unit.listening?.length, `Unit ${id} listening`).toBe(2);
        expect(unit.speaking, `Unit ${id} speaking`).toBeTruthy();
      }
    });
  }
});

describe('Module Reviews 1–7 content contract', () => {
  const K = loadBook();
  for (let m = 1; m <= 7; m += 1) {
    const id = String(m);
    const review = K.reviews[id];
    it(`Module ${id} Review is cumulative, substantive and transfer-based`, () => {
      expect(review, `Review ${id} must exist`).toBeTruthy();
      expect(review.units.length).toBeGreaterThanOrEqual(3);
      for (const section of ['retrieve', 'language', 'steal', 'reading', 'reasoning', 'editing', 'synthesis', 'listening', 'speaking']) {
        expect(review[section], `Review ${id} section ${section}`).toBeTruthy();
      }
      expect(review.retrieve.items.length).toBeGreaterThanOrEqual(7);
      expect(review.language.items.length).toBeGreaterThanOrEqual(12);
      expect(review.steal.items.length).toBeGreaterThanOrEqual(10);
      expect(review.reading.items.length).toBeGreaterThanOrEqual(8);
      const readWords = words(review.reading.paras.join(' '));
      expect(readWords, `Review ${id} reading words`).toBeGreaterThanOrEqual(450);
      expect(readWords, `Review ${id} reading words`).toBeLessThanOrEqual(1100);
      expect(review.reasoning.items.length).toBeGreaterThanOrEqual(6);
      expect(review.editing.items.length).toBeGreaterThanOrEqual(2);
      expect(review.synthesis.min).toBe(600);
      expect(review.synthesis.max).toBe(900);
      expect(review.listening.length).toBe(2);
      expect(review.speaking).toBeTruthy();
    });
  }
});
