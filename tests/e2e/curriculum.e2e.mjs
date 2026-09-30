/* Real-browser smoke of the whole curriculum: every stage of Units 01–32 and Reviews 1–7 is rendered and
   inspected (errors, leaked undefined/NaN, blank activities, dead media, 404/400, overflow), plus review
   routing, refresh, U23/U32 speaking, U20/U23 media, and phone widths. Fake AI, test DB only:
   BASE=http://127.0.0.1:3497 OUT=… node tests/e2e/curriculum.e2e.mjs */
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
const UNIT_STAGES = ['know', 'read', 'interpret', 'notice', 'steal', 'think', 'write', 'edit', 'retrieve'];
const REVIEW_STAGES = ['retrieve', 'language', 'steal', 'glossary', 'errors', 'reading', 'reasoning', 'editing', 'synthesis', 'assessment'];
const responses = [];
// What a page must never show: missing fields leaking as text, activities rendering nothing, dead media
const inspect = p => p.eval(`(() => {
  const main = document.querySelector('#main');
  const text = main.innerText;
  const leak = (text.match(/\\bundefined\\b|\\bNaN\\b|\\[object Object\\]/g) || []);
  const emptyQ = [...main.querySelectorAll('.q')].filter(q => !q.innerText.trim() && !q.querySelector('textarea,input,select,button')).length;
  const emptyQs = [...main.querySelectorAll('.qs')].filter(q => !q.children.length).length;
  const audio = [...main.querySelectorAll('audio[src]')].map(a => a.getAttribute('src'));
  const vw = document.documentElement.clientWidth;
  // Content inside a deliberate scroll strip (stepper, tables) may extend; nothing else may leave the screen
  const inScroller = e => { for (let x = e.parentElement; x && x !== main; x = x.parentElement) { const o = getComputedStyle(x).overflowX; if (o === 'auto' || o === 'scroll' || o === 'hidden') return true; } return false; };
  const over = [...main.querySelectorAll('*')].some(e => { const r = e.getBoundingClientRect(); return r.width && r.right > vw + 1 && getComputedStyle(e).position !== 'fixed' && !inScroller(e); });
  return { leak, emptyQ, emptyQs, audio, over, len: text.length };
})()`);

const prisma = new PrismaClient();
const email = `e2e-curriculum-${Date.now()}@example.com`;
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
  check('signed in, book loaded', await A.waitFor(`!!window.KLANG_STUDY && !document.body.classList.contains('gated')`, 15000));

  const audioChecked = new Set(), audioBad = [];
  const sweep = async (label, hashes, ready) => {
    const failures = [];
    for (const h of hashes) {
      await A.eval(`location.hash = ${JSON.stringify(h)}`);
      const ok = await A.waitFor(`!!document.querySelector(${JSON.stringify(ready)}) && location.hash === ${JSON.stringify(h)}`, 6000);
      await sleep(60);
      const r = await inspect(A);
      if (!ok || r.leak.length || r.emptyQ || r.emptyQs || r.over || r.len < 200) failures.push(`${h} ${JSON.stringify({ ok, leak: r.leak.slice(0, 3), emptyQ: r.emptyQ, emptyQs: r.emptyQs, over: r.over, len: r.len })}`);
      for (const src of r.audio) if (!audioChecked.has(src)) { audioChecked.add(src); const s = await A.eval(`fetch(${JSON.stringify(src)}, { method: 'HEAD', credentials: 'include' }).then(r => r.status)`); if (s !== 200) audioBad.push(`${h} ${src} ${s}`); }
    }
    check(`${label}: ${hashes.length} pages render, nothing leaks, no empty activity, no overflow`, failures.length === 0, failures.slice(0, 6).join(' || '));
  };
  const units = Array.from({ length: 32 }, (_, i) => String(i + 1).padStart(2, '0'));
  await sweep('Units 01–32 × 9 stages (desktop)', units.flatMap(u => UNIT_STAGES.map(s => `#u${u}-${s}`)), '.shead');
  await sweep('Reviews 1–7 × 10 stages (desktop)', [1, 2, 3, 4, 5, 6, 7].flatMap(r => REVIEW_STAGES.map(s => `#r${r}-${s}`)), '.shead');
  check('every player points to a file that exists (HEAD 200)', audioBad.length === 0 && audioChecked.size > 0, `${audioChecked.size} files checked; bad: ${audioBad.slice(0, 4).join(', ')}`);

  /* Navigation: the sidebar opens every review; refresh keeps the place and the answers */
  for (const r of [1, 3, 7]) {
    await A.eval(`location.hash = '#home'`); await sleep(200);
    await click(A, `#side a[href="#r${r}"]`);
    check(`sidebar link opens Review ${r}`, await A.waitFor(`location.hash.startsWith('#r${r}') && /Module ${r} · Cumulative review/i.test(document.querySelector('#main').innerText)`, 6000));
  }
  await A.eval(`location.hash = '#r7-retrieve'`); await A.waitFor(`!!document.querySelector('#main textarea[data-k^="r7:"]')`, 6000);
  await A.eval(`(() => { const t = document.querySelector('#main textarea[data-k^="r7:"]'); t.value = 'An answer written in Review 7.'; t.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await A.waitFor(`/saved to cloud/i.test(document.querySelector('[data-sync-status]')?.innerText || '')`, 15000);
  await A.cmd('Page.reload'); await sleep(1500);
  check('refresh keeps Review 7 open with the answer', await A.waitFor(`location.hash === '#r7-retrieve' && [...document.querySelectorAll('#main textarea[data-k^="r7:"]')].some(t => t.value === 'An answer written in Review 7.')`, 10000));

  /* U23 / U32 speaking, U20 media, U23 listening without a recording */
  for (const u of ['23', '32']) {
    await A.eval(`location.hash = '#u${u}-think'`); await A.waitFor(`!!document.querySelector('.media-lab')`, 6000);
    const sp = await A.eval(`(() => { const b = document.querySelector('[data-act="sprecord"]'); const lab = b && b.closest('.media-lab'); return { rec: !!b, sid: b && b.dataset.sid, prompt: lab ? lab.querySelector('.lead')?.innerText.length : 0 }; })()`);
    check(`U${u} speaking renders with its task and record control`, sp.rec && sp.sid === 's1' && sp.prompt > 40, JSON.stringify(sp));
  }
  await A.eval(`location.hash = '#u20-interpret'`); await A.waitFor(`!!document.querySelector('.listen-card')`, 6000);
  const u20 = await A.eval(`({ audio: document.querySelectorAll('.listen-card audio').length, notice: /Audio not recorded yet/.test(document.querySelector('.media-lab').innerText) })`);
  check('U20 listening: pending notice, no player (recording not produced; reference now its own unit)', u20.audio === 0 && u20.notice, JSON.stringify(u20));
  await A.eval(`location.hash = '#u23-interpret'`); await A.waitFor(`!!document.querySelector('.listen-card')`, 6000);
  const u23 = await A.eval(`({ submit: document.querySelectorAll('.listen-card [data-act="lisubmit"]').length, preview: document.querySelectorAll('fieldset.li-preview[disabled]').length, quote: !!document.querySelector('[id="q-23:23i4"]') })`);
  check('U23 listening is a preview only; its quote item renders', u23.submit === 0 && u23.preview === 2 && u23.quote, JSON.stringify(u23));
  await A.eval(`location.hash = '#u01-interpret'`); await A.waitFor(`!!document.querySelector('.listen-card audio')`, 6000);
  check('U01 keeps its recorded players', await A.eval(`document.querySelectorAll('.listen-card audio').length === 2`));

  /* Representative surfaces on phones */
  for (const w of [390, 320]) {
    await A.size(w, 780);
    await sweep(`${w}px representative (U01, U16, U23, U32, R1, R3, R7)`, ['#u01-read', '#u01-interpret', '#u16-write', '#u16-think', '#u23-interpret', '#u23-edit', '#u32-think', '#u32-write', '#r1-reading', '#r3-editing', '#r3-assessment', '#r7-synthesis', '#r7-language'], '.shead');
  }
  await A.size(1440, 900);

  const mine = events.filter(e => e.sessionId === A.sessionId);
  const errors = mine.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error') || (e.method === 'Log.entryAdded' && e.params.entry.level === 'error'))
    .map(e => e.params.exceptionDetails?.exception?.description || e.params.entry?.text || (e.params.args || []).map(a => a.value).join(' '));
  check('no page error / console error', errors.length === 0, errors.slice(0, 3).join(' | '));
  const bad = responses.filter(r => r.s === 404 || r.s >= 500 || (r.s === 400 && !/\/api\/docs\/[^?]+$/.test(r.u)));
  check('no 404, no 5xx, no unexpected 400', bad.length === 0, JSON.stringify(bad.slice(0, 5)));
} catch (err) {
  check('E2E crashed', false, err.stack || String(err));
} finally {
  await prisma.user.deleteMany({ where: { email } }).catch(() => {});
  await prisma.$disconnect();
  try { ws && ws.close(); } catch { }
  chrome.kill();
  const failed = results.filter(r => !r.ok);
  fs.writeFileSync(path.join(OUT, 'curriculum-results.json'), JSON.stringify(results, null, 2));
  console.log(`\n${results.length - failed.length}/${results.length} passed · screenshots in ${OUT}`);
  process.exit(failed.length ? 1 : 0);
}
