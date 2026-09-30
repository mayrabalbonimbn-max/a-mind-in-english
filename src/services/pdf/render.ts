import fs from 'fs';
import { footerTemplate } from './theme';

/* HTML → PDF with a headless Chromium, the engine the approved models were made with.
   Isolated: JavaScript off and every network request refused, so a document can only show the
   HTML it was given (embedded fonts included). One short-lived browser per export: exports are rare,
   and nothing stays in memory afterwards. Returns null when no Chromium is available, so callers
   can fall back to the plain PDF instead of failing. */

const CANDIDATES = [
  process.env.PDF_CHROME_PATH || '',
  '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

export function chromePath(): string | null {
  if (process.env.PDF_ENGINE === 'plain') return null;   // explicit opt-out (the test suite uses it)
  for (const p of CANDIDATES) { try { if (fs.existsSync(p)) return p; } catch { /* next */ } }
  return null;
}

export async function htmlToPdf(html: string, footerLabel: string): Promise<Buffer | null> {
  const executablePath = chromePath();
  if (!executablePath) return null;
  const puppeteer = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    // --no-sandbox: the API runs as root on the server; the page has no JavaScript and no network
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--font-render-hinting=none'],
    timeout: 20_000,
  });
  try {
    const pg = await browser.newPage();
    await pg.setJavaScriptEnabled(false);
    await pg.setRequestInterception(true);
    pg.on('request', (req) => (req.url().startsWith('data:') ? req.continue() : req.abort()));
    await pg.setContent(html, { waitUntil: 'load', timeout: 20_000 });
    await pg.evaluateHandle('document.fonts.ready');
    const pdf = await pg.pdf({
      format: 'A4', printBackground: true, preferCSSPageSize: true,
      displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: footerTemplate(footerLabel),
      timeout: 30_000,
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close().catch(() => {});
  }
}

/** The designed PDF, or the plain one when no Chromium is available or rendering fails: an export never breaks. */
export async function pdfWithFallback(html: () => string, footerLabel: string, plain: () => Buffer): Promise<Buffer> {
  try {
    const designed = await htmlToPdf(html(), footerLabel);
    if (designed) return designed;
  } catch (e) {
    console.error(`[pdf] designed export failed, plain PDF used err=${(e as Error)?.name}`);
  }
  return plain();
}
