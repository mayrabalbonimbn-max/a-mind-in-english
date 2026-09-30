import fs from 'fs';
import path from 'path';
import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import { mainWriteHtml } from '../src/services/pdf/mainWriteHtml';
import { learningReviewHtml } from '../src/services/pdf/learningReviewHtml';
import { htmlToPdf, chromePath } from '../src/services/pdf/render';
import { mainWriteFixtures, learningReviewFixtures } from './helpers/pdfFixtures';
import { app } from '../src/app';
import { prisma } from '../src/prisma';

const visible = (html: string) => html.replace(/<style>[\s\S]*?<\/style>/, '').replace(/<[^>]+>/g, ' ');
const withChrome = (fn: () => Promise<void>) => async () => {
  const before = process.env.PDF_ENGINE;
  delete process.env.PDF_ENGINE;                  // the suite pins the plain engine; this block tests the designed one
  try { await fn(); } finally { process.env.PDF_ENGINE = before; }
};
const hasChrome = (() => { const b = process.env.PDF_ENGINE; delete process.env.PDF_ENGINE; const c = !!chromePath(); process.env.PDF_ENGINE = b; return c; })();

describe('Designed PDFs · content comes only from persisted data', () => {
  const all = [...Object.entries(mainWriteFixtures).map(([n, d]) => [n, mainWriteHtml(d)]), ...Object.entries(learningReviewFixtures).map(([n, r]) => [n, learningReviewHtml(r)])];

  it.each(all)('%s: no undefined / null / NaN / [object Object] ever reaches the page', (_n, html) => {
    expect(visible(html)).not.toMatch(/\bundefined\b|\bNaN\b|\bnull\b|\[object Object\]/);
  });

  it('no network: fonts are embedded, nothing is fetched from outside', () => {
    for (const [, html] of all) {
      expect(html).toContain("src:url(data:font/ttf;base64,");
      expect(html.replace(/data:[^)]+\)/g, '')).not.toMatch(/https?:\/\//);
    }
  });

  it('nothing from the approved models\' demo content is in the templates', () => {
    const src = ['mainWriteHtml.ts', 'learningReviewHtml.ts', 'theme.ts'].map((f) => fs.readFileSync(path.resolve(__dirname, '../src/services/pdf', f), 'utf8')).join('\n');
    for (const demo of ['São Paulo', 'The story I tell about a decision', 'Using contrast to structure an argument', 'Strong claims stated without hedging', 'Article use with abstract nouns', 'Admittedly', '04i3']) expect(src).not.toContain(demo);
  });

  it('learner text is escaped, never executed', () => {
    const d = { ...mainWriteFixtures['mw-medium'], learnerText: '<script>alert(1)</script><img src=x onerror=1>' };
    const html = mainWriteHtml(d);
    expect(html).not.toContain('<script>alert(1)');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('unknown / not recorded fields are said, never invented', () => {
    const html = visible(mainWriteHtml(mainWriteFixtures['mw-short-unknown']));
    expect(html).toContain('Writing support: not recorded');
    expect(html).toContain('Model not recorded');
    expect(html).toContain('prompt not recorded');
    expect(html).toContain('The analysed text was not recorded for this earlier analysis');
    const medium = visible(mainWriteHtml(mainWriteFixtures['mw-medium']));
    expect(medium).toContain('Writing support: used · opened after starting · medium');
    expect(medium).toContain('Exactly the text that was analysed.');
  });

  it('Human Judgment shown when present, absent otherwise; FACT / AI / JUDGMENT / PROPOSAL labelled', () => {
    const many = visible(learningReviewHtml(learningReviewFixtures['lr-many-judgments']));
    for (const t of ['You agreed with this interpretation.', 'You disagreed with this interpretation.', 'You were not sure about this interpretation.', 'Fact · evidence', 'AI interpretation', 'Proposal · adapt · not applied']) expect(many).toContain(t);
    const few = learningReviewHtml(learningReviewFixtures['lr-first-few-nojudgment']);
    expect(few).not.toContain('class="chip judge">Your judgment</span>You');
    expect(visible(few)).toContain('None. The evidence in this period does not justify changing the next unit.');
    expect(visible(few)).toContain('first review');
  });

  it('empty sections are left out; numbering stays continuous', () => {
    const nums = [...mainWriteHtml(mainWriteFixtures['mw-short-unknown']).matchAll(/<span class="n">(\d\d)<\/span>/g)].map((m) => m[1]);
    expect(nums).toEqual(nums.map((_, i) => String(i + 1).padStart(2, '0')));
  });
});

describe.skipIf(!hasChrome)('Designed PDFs · rendered by Chromium', () => {
  it('Main Write and Learning Review render with the embedded Jost/Figtree, multi-page, with a footer on every page', withChrome(async () => {
    for (const [html, label] of [[mainWriteHtml(mainWriteFixtures['mw-long-revision']), 'MW'], [learningReviewHtml(learningReviewFixtures['lr-many-judgments']), 'LR']]) {
      const pdf = (await htmlToPdf(html, `A Mind in English · ${label}`))!;
      const text = pdf.toString('latin1');
      expect(text.startsWith('%PDF')).toBe(true);
      expect(text).toMatch(/FontName \/[A-Z]{6}\+Jost/);
      expect(text).toMatch(/FontName \/[A-Z]{6}\+Figtree/);
      expect((text.match(/\/Type\s*\/Page[^s]/g) || []).length).toBeGreaterThan(3);
    }
  }), 120_000);

  it('the export routes serve the designed PDF when Chromium is available', withChrome(async () => {
    const email = `pdfdesign-${Date.now()}@example.com`;
    const res = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
    const cookie = res.headers['set-cookie'].find((c: string) => c.includes('klang_session')).split(';')[0];
    const u = await prisma.user.findUniqueOrThrow({ where: { email } });
    const row = await prisma.mainWriteAnalysis.create({ data: { userId: u.id, unit: '01', taskId: 'w2', baseTaskId: 'w2', draft: 'first', text: 'My analysed draft.', words: 3, model: 'm', promptVersion: 'main-write-v2', feedback: { strengthsSummary: ['A strength.'], estimatedLevel: { level: 'B2', rationale: 'r' } } } });
    await prisma.userDocument.create({ data: { userId: u.id, key: 'portfolio', data: { pf: { '01:w2': { fb: [{ id: row.id, at: row.createdAt.toISOString(), draft: 'first', words: 3, f: row.feedback }] } } } } });
    const pdf = await request(app).get(`/api/ai/feedback/01/w2/${row.id}/export?format=pdf`).set('Cookie', cookie).buffer(true).parse((r: any, cb: any) => { const b: Buffer[] = []; r.on('data', (c: Buffer) => b.push(c)); r.on('end', () => cb(null, Buffer.concat(b))); });
    expect(pdf.status).toBe(200);
    expect((pdf.body as Buffer).toString('latin1')).toMatch(/FontName \/[A-Z]{6}\+Jost/);
    await prisma.user.delete({ where: { id: u.id } });
  }), 120_000);
});

afterAll(async () => { await prisma.$disconnect(); });
