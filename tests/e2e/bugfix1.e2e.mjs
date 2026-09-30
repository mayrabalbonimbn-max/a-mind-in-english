/* Real-browser E2E for Bugfix Block 1: Main Write Draft 1 snapshot/freeze → Draft 2 → refresh → export,
   with Writing Support provenance; Human Judgment agree / disagree / clear across reloads; 1440/390/320.
   Fake AI, test database only: BASE=http://127.0.0.1:3497 OUT=… node tests/e2e/bugfix1.e2e.mjs */
import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const BASE = process.env.BASE || 'http://127.0.0.1:3491';
const OUT = process.env.OUT || path.join(os.tmpdir(), `klang-e2e-${Date.now()}`);
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 20000 + Math.floor(Math.random() * 20000);
fs.mkdirSync(OUT, { recursive: true });
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ── minimal CDP client (same as the other E2E scripts) ── */
if (await fetch(`http://127.0.0.1:${PORT}/json/version`).then(() => true, () => false)) { console.error(`Port ${PORT} is already in use; not attaching to another browser.`); process.exit(2); }
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(OUT, 'profile')}`, '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
let ws, seq = 0; const waiting = new Map(), events = [];
async function connect() {
  for (let i = 0; i < 50; i++) { try { const v = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); ws = new WebSocket(v.webSocketDebuggerUrl); break; } catch { await sleep(200); } }
  if (chrome.exitCode !== null) throw new Error('our Chrome exited; refusing to use another browser');
  await new Promise(r => ws.addEventListener('open', r));
  ws.addEventListener('message', m => { const d = JSON.parse(m.data); if (d.id && waiting.has(d.id)) { const w = waiting.get(d.id); waiting.delete(d.id); d.error ? w.rej(new Error(d.error.message)) : w.res(d.result); } else events.push(d); });
}
const send = (method, params = {}, sessionId) => new Promise((res, rej) => { const id = ++seq; waiting.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params, sessionId })); });
async function newPage(contextId) {
  const { targetId } = await send('Target.createTarget', { url: 'about:blank', browserContextId: contextId });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const p = {
    sessionId,
    cmd: (m, prm) => send(m, prm, sessionId),
    eval: async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }, sessionId); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result.value; },
    async goto(url) { await this.cmd('Page.navigate', { url }); await sleep(900); },
    async waitFor(expr, ms = 8000) { const t = Date.now(); while (Date.now() - t < ms) { try { if (await this.eval(expr)) return true; } catch { } await sleep(120); } return false; },
    async shot(name) { const { data } = await this.cmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(data, 'base64')); },
    async size(width, height = 860) { await this.cmd('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 }); await sleep(250); },
  };
  await p.cmd('Page.enable'); await p.cmd('Runtime.enable'); await p.cmd('Network.enable'); await p.cmd('Log.enable');
  return p;
}
const layout = p => p.eval(`(() => {
  const vw = document.documentElement.clientWidth, over = document.documentElement.scrollWidth > vw + 1;
  const offenders = over ? [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > vw + 1; }).slice(0, 6).map(e => (e.id ? '#' + e.id : e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0]) + ':' + Math.round(e.getBoundingClientRect().right)) : [];
  return { vw, over, offenders };
})()`);
const go = async (p, hash, ready = '#main > *') => { await p.eval(`location.hash = ${JSON.stringify(hash)}`); await p.waitFor(`!!document.querySelector(${JSON.stringify(ready)})`); await sleep(250); };
const text = p => p.eval(`document.querySelector('#main').innerText`);



const click = (p, sel) => p.eval(`(() => { const b = document.querySelector(${JSON.stringify(sel)}); if (!b) return false; b.click(); return true; })()`);
const local = p => p.eval(`JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1')))`);
const typeInto = (p, k, text) => p.eval(`(() => { const t = document.querySelector('textarea[data-k="${k}"]'); t.value = ${JSON.stringify(text)}; t.dispatchEvent(new Event('input', { bubbles: true })); return t.value; })()`);
const synced = p => p.waitFor(`/saved to cloud/i.test(document.querySelector('[data-sync-status]')?.innerText || '')`, 15000);
const pressed = p => p.eval(`[...document.querySelectorAll('[data-lr-judge][aria-pressed="true"]')].map(b => b.dataset.lrJudge)`);
const D1 = 'Draft one: the first week in a new language felt like walking with borrowed shoes. This is exactly what I sent.';
const D2 = 'Draft two: I rewrote the opening in my own way, keeping the image but making the claim more precise.';
const responses = [];

const prisma = new PrismaClient();
const email = `e2e-bugfix1-${Date.now()}@example.com`;
try {
  await connect();
  await fetch(BASE + '/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'Password123!' }) });
  const { browserContextId } = await send('Target.createBrowserContext');
  const A = await newPage(browserContextId);
  ws.addEventListener('message', m => { const d = JSON.parse(m.data); if (d.method === 'Network.responseReceived' && d.sessionId === A.sessionId) responses.push({ s: d.params.response.status, u: d.params.response.url }); });
  await A.size(1440, 900);
  await A.goto(BASE + '/');
  await A.eval(`fetch('/api/auth/login', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: ${JSON.stringify(email)}, password: 'Password123!' }) }).then(r => r.status)`);
  await A.cmd('Page.reload'); await sleep(900);
  check('signed in, book loaded', await A.waitFor(`!!window.KLANG_REGISTER && !document.body.classList.contains('gated')`, 15000));

  /* A–D: Main Write, Draft 1, Writing Support used after starting, feedback (fake) */
  await go(A, '#u01-write', '.wtask');
  check('A. Unit 01 Main Write (01:w2) is open', await A.eval(`!!document.querySelector('textarea[data-k="01:w2"]')`));
  await typeInto(A, '01:w2', D1);
  await click(A, '[data-wsupw="01:w2"] details.wsup > summary'); await sleep(250);
  check('C. Writing Support opened after starting to write', (await local(A)).a['01:w2:support']?.beforeWriting === false);
  await click(A, '[data-act="aifb"][data-q="01:w2"]');
  check('D. feedback (fake) returned and saved', await A.waitFor(`!!document.querySelector('#modal .fbx') || !!(JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))).pf?.['01:w2']?.fb?.length)`, 15000));
  await click(A, '#modal [data-act="close"]'); await sleep(300);
  const entry = (await local(A)).pf['01:w2'].fb[0];
  check('D. portfolio entry holds the snapshot and the real metadata', entry.text === D1 && entry.model === 'e2e-fake' && entry.promptVersion === 'main-write-v2' && entry.support?.used === true && entry.support?.openedBeforeWriting === false && entry.support?.level === 'high', JSON.stringify({ ...entry, f: undefined }));

  /* E: Draft 1 frozen */
  await go(A, '#u01-write', '.wtask');
  const frozen = await A.eval(`(() => { const t = document.querySelector('textarea[data-k="01:w2"]'); return { ro: t.readOnly, note: !!document.querySelector('.draft-frozen'), fbBtn: !!document.querySelector('[data-act="aifb"][data-q="01:w2"]') }; })()`);
  check('E. Draft 1 is read-only after feedback, with a Draft 2 path and no second request on it', frozen.ro && frozen.note && !frozen.fbBtn, JSON.stringify(frozen));
  await A.eval(`document.querySelector('textarea[data-k="01:w2"]').focus()`);
  await A.cmd('Input.insertText', { text: ' TYPED INTO DRAFT ONE' }); await sleep(200);
  check('E. typing into Draft 1 changes nothing', (await local(A)).a['01:w2'] === D1 && await A.eval(`document.querySelector('textarea[data-k="01:w2"]').value`) === D1);
  await A.shot('01-draft1-frozen');

  /* F–G: Draft 2 */
  await click(A, '[data-act="startdraft2"]');
  await A.waitFor(`location.hash === '#u01-edit' && !!document.querySelector('textarea[data-k="01:w2r"]')`, 8000); await sleep(300);
  check('F. "start Draft 2" opens EDIT with Draft 2 starting from Draft 1', await A.eval(`document.querySelector('textarea[data-k="01:w2r"]').value`) === D1);
  check('F. EDIT shows Draft 1 as analysed', /as analysed/i.test(await A.eval(`document.querySelector('#stage details.acc summary')?.innerText || ''`)));
  await typeInto(A, '01:w2r', D2);
  await synced(A);

  /* H–K: refresh */
  await A.cmd('Page.reload'); await sleep(1500);
  await go(A, '#u01-write', '.wtask');
  check('H–I. after refresh Draft 1 is still the original and still frozen', await A.eval(`(() => { const t = document.querySelector('textarea[data-k="01:w2"]'); return t.value === ${JSON.stringify(D1)} && t.readOnly; })()`));
  await go(A, '#u01-edit', '.shead');
  check('J. Draft 2 is still separate', await A.eval(`document.querySelector('textarea[data-k="01:w2r"]').value`) === D2);
  check('K. the saved feedback still belongs to Draft 1', (await local(A)).pf['01:w2'].fb.filter(f => f.draft === 'first').length === 1);

  /* L–M: export = the analysed snapshot + recorded provenance */
  const md = await A.eval(`fetch('/api/ai/feedback/01/w2/${entry.id}/export?format=md', { credentials: 'include' }).then(r => r.text())`);
  const learner = md.split('## Learner Text')[1] || '';
  check('L. export Draft 1 = the analysed text (not the live field, not Draft 2)', learner.includes('exactly as analysed') && learner.split('---')[0].includes(D1) && !learner.split('---')[0].includes(D2), md.slice(0, 300));
  check('L. export also shows the Draft 2 that belongs with it', /## Draft 2 · current text, not analysed yet/.test(md) && md.includes(D2));
  check('M. export provenance and metadata are the recorded ones', md.includes('Yes, opened after starting to write · level chosen: high') && md.includes('**Model:** e2e-fake') && md.includes('**Prompt & Schema Version:** main-write-v2'));
  const row = await prisma.mainWriteAnalysis.findFirst({ where: { user: { email } } });
  check('server snapshot row = exactly what was analysed', row?.text === D1 && row?.supportUsed === true && row?.supportOpenedBeforeWriting === false, JSON.stringify(row && { text: row.text.slice(0, 40), su: row.supportUsed }));

  /* N–W: Human Judgment on a Learning Review (fake provider) */
  await go(A, '#u01-interpret', '.shead');
  await A.eval(`(() => { const t = document.querySelector('#stage .q textarea[data-k^="01:"]'); t.value = 'The narrator is not sure the language is gone.'; t.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await synced(A);
  await go(A, '#learning', '#lr-page');
  await A.waitFor(`!!document.querySelector('[data-lr="run"]')`, 8000);
  await click(A, '[data-lr="run"]');
  check('N. Learning Review fixture (fake) with an AI hypothesis', await A.waitFor(`!!document.querySelector('[data-lr-judge="agree"]')`, 15000));
  const flow = [['agree', 'O–Q. Agree persists after refresh', ['agree']], ['disagree', 'R–T. Disagree persists after refresh', ['disagree']], ['disagree', 'U–W. clearing (same choice again) persists after refresh', []]];
  for (const [choice, label, expected] of flow) {
    await click(A, `[data-lr-judge="${choice}"]`); await sleep(600);
    await A.cmd('Page.reload'); await sleep(1200);
    await go(A, '#learning', '#lr-page');
    await A.waitFor(`!!document.querySelector('[data-lr-judge]')`, 10000);
    const now = await pressed(A);
    check(label, JSON.stringify(now) === JSON.stringify(expected), JSON.stringify(now));
  }
  const store = await prisma.userDocument.findFirst({ where: { user: { email }, key: 'learning-judgments' } });
  check('the server store matches the page (cleared)', store && Object.keys(store.data.judgments || {}).length === 0, JSON.stringify(store?.data));
  await A.shot('02-learning-judgments');

  /* Mobile */
  for (const w of [390, 320]) {
    await A.size(w, 780);
    for (const [hash, ready] of [['#u01-write', '.wtask'], ['#u01-edit', '.shead'], ['#learning', '#lr-page']]) {
      await go(A, hash, ready); await sleep(400);
      if (hash === '#u01-write') await A.eval(`document.querySelector('.draft-frozen').scrollIntoView({ block: 'center' })`);
      const l = await layout(A);
      check(`${w}px ${hash}: no horizontal overflow`, !l.over, JSON.stringify(l));
      await A.shot(`${w}-${hash.slice(1)}`);
    }
  }
  await A.size(1440, 900);

  const mine = events.filter(e => e.sessionId === A.sessionId);
  const errors = mine.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error') || (e.method === 'Log.entryAdded' && e.params.entry.level === 'error'))
    .map(e => e.params.exceptionDetails?.exception?.description || e.params.entry?.text || (e.params.args || []).map(a => a.value).join(' '));
  check('no console errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  const bad = responses.filter(r => r.s >= 500);
  check('no 5xx', bad.length === 0, JSON.stringify(bad));
  const hosts = new Set(mine.filter(e => e.method === 'Network.requestWillBeSent').map(e => { try { return new URL(e.params.request.url).host; } catch { return 'data'; } }));
  check('no request leaves for any AI provider', [...hosts].every(h => !h || h === 'data' || h === new URL(BASE).host || /^fonts\.(googleapis|gstatic)\.com$/.test(h)), [...hosts].join(', '));
} catch (err) {
  check('E2E crashed', false, err.stack || String(err));
} finally {
  await prisma.user.deleteMany({ where: { email } }).catch(() => {});
  await prisma.$disconnect();
  try { ws && ws.close(); } catch { }
  chrome.kill();
  const failed = results.filter(r => !r.ok);
  fs.writeFileSync(path.join(OUT, 'bugfix1-results.json'), JSON.stringify(results, null, 2));
  console.log(`\n${results.length - failed.length}/${results.length} passed · screenshots in ${OUT}`);
  process.exit(failed.length ? 1 : 0);
}
