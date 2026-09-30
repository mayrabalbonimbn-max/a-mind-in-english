/* Real-browser layout check of the mobile top bar (logo · Study Timer · sync status · menu) at 390 and
   320 px, timer stopped / running / over one hour, every sync label; plus desktop 1440. Fake AI, test DB:
   BASE=http://127.0.0.1:3497 OUT=/path/for/screenshots node tests/e2e/topbar.e2e.mjs */
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



const H = 60 * 60 * 1000;
const click = (p, sel) => p.eval(`(() => { const b = document.querySelector(${JSON.stringify(sel)}); if (!b) return false; b.click(); return true; })()`);
const LABELS = ['Saved to cloud', 'Saved locally', 'Syncing…', 'Offline · saved locally', 'Sync error', 'Sync conflict', 'DEMO MODE · Changes are not saved'];
// Geometry of the four top-bar items: inside the viewport, no overlap, menu reachable
const measure = p => p.eval(`(() => {
  const vw = document.documentElement.clientWidth;
  const bar = document.querySelector('#topbar');
  const items = { logo: bar.querySelector('a'), timer: bar.querySelector('#topbar-timer .timer-btn'), sync: bar.querySelector('#topbar-sync [data-sync-status]'), menu: bar.querySelector('[data-act="menu"]') };
  const r = {}; for (const [k, el] of Object.entries(items)) { if (!el) { r[k] = null; continue; } const b = el.getBoundingClientRect(); r[k] = { l: Math.round(b.left), r: Math.round(b.right), t: Math.round(b.top), b: Math.round(b.bottom), w: Math.round(b.width), h: Math.round(b.height) }; }
  const list = Object.entries(r).filter(([, v]) => v);
  const overlaps = []; for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) { const [a, A] = list[i], [c, C] = list[j]; if (A.l < C.r - 0.5 && C.l < A.r - 0.5 && A.t < C.b - 0.5 && C.t < A.b - 0.5) overlaps.push(a + '/' + c); }
  const outside = list.filter(([, v]) => v.l < 0 || v.r > vw).map(([k]) => k);
  const m = r.menu, hit = m && document.elementFromPoint((m.l + m.r) / 2, (m.t + m.b) / 2);
  const bb = bar.getBoundingClientRect();
  return { vw, r, overlaps, outside, menuHit: !!(hit && hit.closest('[data-act="menu"]')), barH: Math.round(bb.height), barW: Math.round(bb.width), timerText: items.timer && items.timer.innerText.replace(/\\s+/g, ' ') };
})()`);

const prisma = new PrismaClient();
const email = `e2e-topbar-${Date.now()}@example.com`;
try {
  await connect();
  await fetch(BASE + '/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'Password123!' }) });
  const { browserContextId } = await send('Target.createBrowserContext');
  const A = await newPage(browserContextId);
  await A.size(1440, 900);
  await A.goto(BASE + '/');
  await A.eval(`fetch('/api/auth/login', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: ${JSON.stringify(email)}, password: 'Password123!' }) }).then(r => r.status)`);
  await A.cmd('Page.reload'); await sleep(900);
  check('signed in, book loaded', await A.waitFor(`!!window.KLANG_STUDY && !document.body.classList.contains('gated')`, 15000));
  await A.waitFor(`document.querySelector('[data-sync-status]')?.innerText.includes('Saved to cloud')`, 10000);

  /* Desktop: top bar hidden, sidebar timer unchanged */
  await go(A, '#home', '.cover');
  const desk = await A.eval(`({ topbar: getComputedStyle(document.querySelector('#topbar')).display, side: !!document.querySelector('#side-timer .timer-toggle-btn')?.offsetHeight })`);
  check('1440px: top bar hidden, sidebar timer shown (unchanged)', desk.topbar === 'none' && desk.side, JSON.stringify(desk));
  await A.shot('1440-home');

  // stopped · running (3 min) · long (10 h 42 min, confirmed now so it is not ended by the check-in)
  let timerFixture = 0;
  const setTimer = (mode) => {
    const ago = mode === 'long' ? 10 * H + 42 * 60000 : 3 * 60000;
    return A.eval(`(() => { const s = JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))); const now = Date.now();
      s.study = s.study || { activeSession: null, sessions: [] };
      s.study.activeSession = ${mode === 'stopped'} ? null : { id: 'st_topbar_${++timerFixture}', startedAt: new Date(now - ${ago}).toISOString(), lastSeenAt: new Date(now).toISOString(), confirmedAt: new Date(now).toISOString() };
      localStorage.setItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'), JSON.stringify(s)); })()`);
  };

  for (const w of [390, 320]) {
    await A.size(w, 780);
    for (const mode of ['stopped', 'running', 'long']) {
      await setTimer(mode);
      await A.cmd('Page.reload'); await sleep(1600);
      await A.waitFor(`!!document.querySelector('#topbar [data-act="menu"]')`, 8000);
      await go(A, '#u01-interpret', '.shead');
      for (const label of LABELS) {
        await A.eval(`document.querySelectorAll('#topbar-sync [data-sync-status] .lbl').forEach(l => l.textContent = ${JSON.stringify(label)})`);
        await sleep(60);
        const m = await measure(A);
        const ok = m.r.menu && m.r.timer && m.r.sync && m.r.logo && !m.outside.length && !m.overlaps.length && m.menuHit && m.barW <= m.vw && m.barH <= 96;
        check(`${w}px timer ${mode} · sync "${label}": all four visible, no overlap, menu reachable`, ok, JSON.stringify({ outside: m.outside, overlaps: m.overlaps, menuHit: m.menuHit, barH: m.barH, barW: m.barW, timer: m.timerText, menu: m.r.menu, sync: m.r.sync }));
      }
      if (mode === 'long') check(`${w}px: running time over 1 hour shown in full`, /\d\d:\d\d:\d\d/.test((await measure(A)).timerText || ''), (await measure(A)).timerText);
      await A.eval(`document.querySelectorAll('#topbar-sync [data-sync-status] .lbl').forEach(l => l.textContent = 'Saved to cloud')`);
      await A.shot(`${w}-${mode}`);
    }
    // the menu really opens the navigation, and the timer button still works
    await click(A, '#topbar [data-act="menu"]'); await sleep(400);
    check(`${w}px: menu opens the navigation`, await A.eval(`document.body.classList.contains('nav-open')`));
    await A.shot(`${w}-nav-open`);
    await A.eval(`document.body.classList.remove('nav-open')`);
    await click(A, '#topbar-timer [data-act="timer-toggle"]'); await sleep(300);
    check(`${w}px: timer button still toggles (was running → paused)`, await A.eval(`!JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))).study.activeSession`));
    const l = await layout(A);
    check(`${w}px: no horizontal overflow`, !l.over, JSON.stringify(l));
  }
  await A.size(1440, 900);

  const mine = events.filter(e => e.sessionId === A.sessionId);
  const errors = mine.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error') || (e.method === 'Log.entryAdded' && e.params.entry.level === 'error'))
    .map(e => e.params.exceptionDetails?.exception?.description || e.params.entry?.text || (e.params.args || []).map(a => a.value).join(' '));
  check('no console errors', errors.length === 0, errors.slice(0, 3).join(' | '));
} catch (err) {
  check('E2E crashed', false, err.stack || String(err));
} finally {
  await prisma.user.deleteMany({ where: { email } }).catch(() => {});
  await prisma.$disconnect();
  try { ws && ws.close(); } catch { }
  chrome.kill();
  const failed = results.filter(r => !r.ok);
  fs.writeFileSync(path.join(OUT, 'topbar-results.json'), JSON.stringify(results, null, 2));
  console.log(`\n${results.length - failed.length}/${results.length} passed · screenshots in ${OUT}`);
  process.exit(failed.length ? 1 : 0);
}
