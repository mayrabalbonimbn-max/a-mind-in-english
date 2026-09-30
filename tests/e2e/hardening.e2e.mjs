/* Local test DB + tests/e2e/server.ts (fake providers only). No real learner data. */
import puppeteer from 'puppeteer-core';
import { PrismaClient } from '@prisma/client';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
const BASE = process.env.BASE || 'http://127.0.0.1:3491';
if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(BASE) || !/_test\b|_test$/.test(process.env.DATABASE_URL || '')) throw new Error('Local test targets only');
const prisma = new PrismaClient();
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const emails = [], results = [], errors = [], blocked = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok }); console.log(`${ok ? 'PASS' : 'FAIL'} ${name} ${detail}`); };
async function account() {
  const email = `hardening-e2e-${crypto.randomUUID()}@example.com`; emails.push(email);
  const r = await fetch(BASE + '/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'Password123!' }) });
  if (!r.ok) throw new Error('Registration failed'); return email;
}
async function page(context, email) {
  const p = await context.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  p.on('pageerror', e => errors.push(e.message));
  await p.setRequestInterception(true);
  p.on('request', r => { const u = r.url(); if (u.startsWith(BASE + '/') || u.startsWith('blob:') || u.startsWith('data:') || /^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(u)) r.continue(); else { blocked.push(u); r.abort(); } });
  await p.goto(BASE);
  await p.waitForSelector('#gate-form input[name=email]');
  await p.type('input[name=email]', email); await p.type('input[name=password]', 'Password123!'); await p.click('#gate-form button');
  await p.waitForFunction(() => window.KLANG_SYNC?.getUser() && !document.body.classList.contains('gated'));
  await saved(p); return p;
}
async function saved(p) { await p.waitForFunction(() => window.KLANG_SYNC?.getStatus() === 'saved_to_cloud', { timeout: 20000 }); }
async function go(p, hash) { await p.evaluate(h => location.hash = h, hash); await p.waitForFunction(h => location.hash === h && document.querySelector('#main').textContent.length > 20, {}, hash); }
async function answer(p, key, value) {
  await p.waitForSelector(`textarea[data-k="${key}"]`);
  await p.evaluate((k, v) => { const t = document.querySelector(`textarea[data-k="${k}"]`); t.value = v; t.dispatchEvent(new Event('input', { bubbles: true })); }, key, value);
}
const local = p => p.evaluate(() => JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))));
const api = (p, url, body) => p.evaluate(async (u, b) => { const r = await fetch(u, b ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) } : {}); return { status: r.status, body: await r.json() }; }, url, body);
const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'mind-hardening-'));
try {
  const email = await account(), other = await account();
  const c1 = await browser.createBrowserContext(), c2 = await browser.createBrowserContext();
  const A = await page(c1, email), B = await page(c2, email);
  await go(A, '#u01-interpret');
  const key = await A.$eval('#stage details[data-wsup]', e => e.dataset.wsup);
  await A.click(`details[data-wsup="${key}"] summary`);
  await answer(A, key, 'A qualified claim, written after opening support.'); await saved(A);
  check('support opened before production is persisted', (await local(A)).a[key + ':support']?.beforeWriting === true);
  await B.waitForFunction(k => JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))).a[k] === 'A qualified claim, written after opening support.', {}, key);
  check('context A answer reaches context B via real SSE', (await local(B)).a[key].includes('qualified'));
  await A.reload(); await A.waitForSelector('#stage');
  check('answer and provenance survive refresh', (await local(A)).a[key + ':support']?.beforeWriting === true && (await local(A)).a[key].includes('qualified'));
  await go(A, '#u01-think'); await go(B, '#r7-retrieve');
  const ka = await A.$eval('#stage textarea[data-k]', e => e.dataset.k), kb = await B.$eval('#main textarea[data-k]', e => e.dataset.k);
  await Promise.all([answer(A, ka, 'Independent unit work.'), answer(B, kb, 'Independent review seven work.')]);
  await Promise.all([saved(A), saved(B)]);
  await A.waitForFunction(k => JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))).a[k] === 'Independent review seven work.', {}, kb);
  check('different scopes edited concurrently preserve both', (await local(A)).a[ka] === 'Independent unit work.' && (await local(A)).a[kb] === 'Independent review seven work.');
  await B.reload(); await B.waitForSelector('#main textarea');
  check('Review 7 answer survives refresh', (await local(B)).a[kb] === 'Independent review seven work.');
  await go(A, '#u23-interpret');
  check('pending audio has no broken media or answer controls', await A.evaluate(() => [...document.querySelectorAll('.listen-card')].every(e => !e.querySelector('audio') && !e.querySelector('textarea[data-k]'))));
  const lr = await api(A, '/api/learning-review/run', {});
  check('Learning Review fake provider succeeds', lr.status === 200 && lr.body.status === 'completed');
  const noNew = await api(A, '/api/learning-review/run', {});
  check('second run without evidence short-circuits', noNew.body.status === 'no_new_evidence');
  const observation = lr.body.report?.observations;
  const report = lr.body.report;
  const patterns = Object.values(report?.patterns || {}).flat();
  const pattern = [...(Array.isArray(observation) ? observation : []), ...patterns].find(x => x?.patternKey || x?.key);
  // The fake report's key is fixed; dedicated judgment endpoint and export overlay are exercised.
  const judgment = await api(A, '/api/learning-review/judgments', { patternKey: 'e2e_qualified_claims', judgment: 'disagree' });
  check('Human Judgment persists on server', judgment.status === 200 && judgment.body.judgment === 'disagree');
  for (const format of ['json', 'md', 'pdf']) {
    const status = await A.evaluate(async (id, f) => (await fetch(`/api/learning-review/runs/${id}/export?format=${f}`)).status, report.runId, format);
    check('Learning Review export ' + format, status === 200);
  }
  await go(A, '#u23-think');
  const speech = await A.evaluate(async () => { const r = await fetch('/api/ai/transcribe', { method: 'POST', headers: { 'Content-Type': 'audio/webm', 'x-unit': '23', 'x-activity': window.KLANG.units['23'].speaking.id }, body: new Blob(['fake recording'], { type: 'audio/webm' }) }); return { status: r.status, body: await r.json() }; });
  check('fake transcription is associated with canonical U23 task', speech.status === 200 && speech.body.transcript === 'E2E fake transcript.');
  const malformed = await api(A, '/api/ai/feedback', { unit: '01', taskId: 'w2', text: 'text', support: { level: 'invalid', used: true, openedBeforeWriting: true } });
  check('malformed provenance rejected without AI', malformed.status === 400);
  // Exercise real backup and FileReader restore. Capture the actual downloaded Blob.
  await A.evaluate(() => { const old = URL.createObjectURL; URL.createObjectURL = function(blob) { if (blob.type === 'application/json') window.__backupText = blob.text(); return old.call(this, blob); }; });
  await A.click('[data-act=backup]');
  const exported = await A.evaluate(() => window.__backupText);
  check('actual JSON backup contains learner work', JSON.parse(exported).state.a[ka] === 'Independent unit work.');
  const file = path.join(temp, 'backup.json'); await fs.writeFile(file, exported);
  await go(A, '#u01-think'); await answer(A, ka, 'Newer work to replace only after confirmation.'); await saved(A);
  const input = await A.$('#bkfile'); await input.uploadFile(file);
  await A.waitForSelector('[data-act=dorestore]');
  check('restore explicitly warns of replacement before mutation', await A.$eval('#modal', e => /replaces/.test(e.textContent)) && (await local(A)).a[ka].includes('Newer'));
  await A.click('[data-act=dorestore]'); await saved(A);
  check('confirmed restore round-trips answer and support provenance', (await local(A)).a[ka] === 'Independent unit work.' && (await local(A)).a[key + ':support']?.beforeWriting === true);
  await fs.writeFile(file, JSON.stringify({ app: 'a-mind-in-english', state: { a: null } }));
  await (await A.$('#bkfile')).uploadFile(file);
  await A.waitForFunction(() => document.querySelector('#toast').textContent.includes('not a backup'));
  check('malformed restore leaves valid work untouched', (await local(A)).a[ka] === 'Independent unit work.');
  const c3 = await browser.createBrowserContext(); const C = await page(c3, other);
  check('different user cannot read sync documents', !(await api(C, '/api/docs')).body.documents.some(x => x.key === 'unit:01'));
  check('different user cannot export predictable run id', (await api(C, `/api/learning-review/runs/${report.runId}/export?format=json`)).status === 404);
  // Account switching in the SAME storage context: retain this failing guard until isolation is fixed.
  await api(A, '/api/auth/logout', {});
  await A.reload(); await A.waitForSelector('#gate-form');
  await A.type('input[name=email]', other); await A.type('input[name=password]', 'Password123!'); await A.click('#gate-form button');
  await A.waitForFunction(() => !document.body.classList.contains('gated'));
  check('account switch must not expose previous user local work', !(await local(A)).a[ka]);
  check('no JavaScript page errors', errors.length === 0, JSON.stringify(errors));
  check('zero provider requests', blocked.length === 0, JSON.stringify(blocked));
} finally {
  await browser.close(); await prisma.user.deleteMany({ where: { email: { in: emails } } }); await prisma.$disconnect();
  console.log(`${results.filter(x => x.ok).length}/${results.length} passed`);
}
process.exitCode = results.some(x => !x.ok) ? 1 : 0;
