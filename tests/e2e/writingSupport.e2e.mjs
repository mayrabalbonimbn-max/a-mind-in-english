/* Real-browser E2E for Writing Support levels (High · Medium · Light · Off): defaults per unit,
   collapsed state, switching with typed text, keyboard, provenance (use + before/after writing),
   refresh, sync, Main Write, 1440 / 390 / 320 px. Fake AI, test database only:
   BASE=http://127.0.0.1:3491 OUT=/path/for/screenshots node tests/e2e/writingSupport.e2e.mjs */
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
const ctl = (k) => `[data-wsupw="${k}"]`;
const state = (p, k) => p.eval(`(() => { const w = document.querySelector('${ctl(k)}'); if (!w) return null; const d = w.querySelector('details.wsup'); return { pressed: [...w.querySelectorAll('.wslv-o[aria-pressed="true"]')].map(b => b.textContent), details: !!d, open: !!(d && d.open), level: d ? d.dataset.level : 'off', off: !!w.querySelector('.wsup-off') }; })()`);

const prisma = new PrismaClient();
const email = `e2e-writing-support-${Date.now()}@example.com`;
try {
  await connect();
  await fetch(BASE + '/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'Password123!' }) });
  const { browserContextId } = await send('Target.createBrowserContext');
  const A = await newPage(browserContextId);
  await A.size(1440, 900);
  await A.goto(BASE + '/');
  await A.eval(`fetch('/api/auth/login', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: ${JSON.stringify(email)}, password: 'Password123!' }) }).then(r => r.status)`);
  await A.cmd('Page.reload'); await sleep(900);
  check('signed in, book loaded', await A.waitFor(`!!window.KLANG_REGISTER && !document.body.classList.contains('gated')`, 15000));

  // Samples: [page, default level, which control]
  const firstCtl = (page) => A.eval(`document.querySelector('#stage [data-wsupw]')?.dataset.wsupw || null`);
  const mainCtl = () => A.eval(`(() => { const t = [...document.querySelectorAll('#stage .wtask')].find(w => /in your portfolio/i.test(w.innerText)); return t ? t.querySelector('[data-wsupw]')?.dataset.wsupw : null; })()`);
  const samples = [['#u01-interpret', 'High', firstCtl], ['#u01-think', 'High', firstCtl], ['#u01-write', 'High', mainCtl], ['#u05-interpret', 'Medium', firstCtl], ['#u10-interpret', 'Light', firstCtl], ['#u16-write', 'Light', mainCtl], ['#u32-write', 'Light', mainCtl], ['#u32-think', 'Light', firstCtl]];
  const keys = {};
  for (const [hash, def, pick] of samples) {
    await go(A, hash, '.shead');
    const k = await pick(); keys[hash] = k;
    const s = k && await state(A, k);
    check(`${hash}: default ${def}, collapsed`, s && s.pressed.join() === def && s.details && !s.open, JSON.stringify({ k, s }));
  }
  await go(A, '#u01-interpret', '.shead');
  const layout1440 = await layout(A);
  check('desktop: no horizontal overflow with the control', !layout1440.over, JSON.stringify(layout1440));
  await A.shot('01-u01-interpret-default');

  /* Level changes on Unit 01 INTERPRET, with text already typed */
  const k1 = keys['#u01-interpret'];
  const TYPED = 'I started this answer on my own before choosing any support.';
  await A.eval(`(() => { const t = document.querySelector('textarea[data-k="${k1}"]'); t.value = ${JSON.stringify(TYPED)}; t.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  const qBefore = await A.eval(`document.getElementById('q-${k1}')?.querySelector('.qt')?.innerText`);
  for (const [lvl, label] of [['medium', 'Medium'], ['light', 'Light'], ['off', 'Off'], ['high', 'High']]) {
    await click(A, `${ctl(k1)} [data-level="${lvl}"]`); await sleep(250);
    const s = await state(A, k1);
    const kept = await A.eval(`document.querySelector('textarea[data-k="${k1}"]').value`);
    const qNow = await A.eval(`document.getElementById('q-${k1}')?.querySelector('.qt')?.innerText`);
    check(`switch to ${label}: pressed, ${lvl === 'off' ? 'no support content' : 'still collapsed'}, typed text kept, prompt unchanged`, s.pressed.join() === label && (lvl === 'off' ? (!s.details && s.off) : (s.details && !s.open && s.level === lvl)) && kept === TYPED && qNow === qBefore, JSON.stringify(s));
    if (lvl === 'light') await A.shot('02-u01-light');
  }
  const st1 = await local(A);
  check('switching levels recorded no support use', !st1.a[`${k1}:support`], JSON.stringify(st1.a[`${k1}:support`] || null));

  /* Keyboard: Tab to a level and press Enter */
  await A.eval(`document.querySelector('${ctl(k1)} [data-level="medium"]').focus()`);
  await A.cmd('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' });
  await A.cmd('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  await sleep(250);
  check('keyboard: Enter on a focused level selects it', (await state(A, k1)).pressed.join() === 'Medium');

  /* Opening after starting to write → used, not before writing */
  await click(A, `${ctl(k1)} details.wsup > summary`); await sleep(250);
  const st2 = await local(A);
  check('opening support records level + "after starting to write"', st2.a[`${k1}:support`]?.level === 'medium' && st2.a[`${k1}:support`]?.beforeWriting === false, JSON.stringify(st2.a[`${k1}:support`]));
  await A.shot('03-u01-medium-open');

  /* Opening before writing (Unit 05) */
  await go(A, '#u05-interpret', '.shead');
  const k5 = keys['#u05-interpret'];
  await click(A, `${ctl(k5)} details.wsup > summary`); await sleep(250);
  const st3 = await local(A);
  check('Unit 05: opened before writing anything → beforeWriting true, level medium', st3.a[`${k5}:support`]?.beforeWriting === true && st3.a[`${k5}:support`]?.level === 'medium', JSON.stringify(st3.a[`${k5}:support`]));

  /* Main Write (Unit 16): choose Off; draft untouched */
  await go(A, '#u16-write', '.wtask');
  const k16 = keys['#u16-write'];
  await click(A, `${ctl(k16)} [data-level="off"]`); await sleep(250);
  check('Unit 16 Main Write: Off shows no support, the task and its buttons remain', (await state(A, k16)).off && await A.eval(`!!document.querySelector('textarea[data-k="${k16}"]') && !!document.querySelector('[data-act="aifb"][data-q="${k16}"]')`));

  /* Refresh + cloud */
  await A.waitFor(`document.querySelector('[data-sync-status]')?.innerText.includes('Saved to cloud')`, 10000);
  await A.cmd('Page.reload'); await sleep(1500);
  await go(A, '#u01-interpret', '.shead');
  check('refresh: Unit 01 choice (Medium) persisted, typed text still there', (await state(A, k1)).pressed.join() === 'Medium' && await A.eval(`document.querySelector('textarea[data-k="${k1}"]').value`) === TYPED);
  const other = await A.eval(`[...document.querySelectorAll('#stage [data-wsupw]')].map(w => w.dataset.wsupw).find(x => x !== ${JSON.stringify(k1)})`);
  check('another activity in the same unit kept its default (High)', (await state(A, other)).pressed.join() === 'High', other);
  const cloud = await A.eval(`fetch('/api/docs/unit%3A01', { credentials: 'include' }).then(r => r.json())`);
  const ans = cloud?.doc?.data?.answers || {};
  check('sync: choice and use reached the cloud beside the answer', ans[`${k1}:supportLevel`] === 'medium' && ans[`${k1}:support`]?.beforeWriting === false && ans[k1] === TYPED, JSON.stringify({ l: ans[`${k1}:supportLevel`], s: ans[`${k1}:support`] }));
  const u16 = await A.eval(`fetch('/api/docs/unit%3A16', { credentials: 'include' }).then(r => r.json())`);
  check('sync: Unit 16 Main Write choice (off) reached the cloud', u16?.doc?.data?.answers?.[`${k16}:supportLevel`] === 'off');

  /* Mobile */
  for (const w of [390, 320]) {
    await A.size(w, 780);
    for (const hash of ['#u01-interpret', '#u01-write', '#u10-interpret', '#u32-think']) {
      await go(A, hash, '.shead');
      const k = keys[hash];
      const box = await A.eval(`(() => { const bs = [...document.querySelectorAll('${ctl(k)} .wslv-o')].map(b => b.getBoundingClientRect()); return { minH: Math.min(...bs.map(r => r.height)), right: Math.max(...bs.map(r => r.right)), vw: document.documentElement.clientWidth }; })()`);
      const l = await layout(A);
      check(`${w}px ${hash}: control fits, touch-sized, no horizontal overflow`, !l.over && box.right <= box.vw && box.minH >= 40, JSON.stringify({ box, l }));
      await A.eval(`document.querySelector('${ctl(k)}').scrollIntoView({ block: 'center' })`); await sleep(200);
      await A.shot(`${w}-${hash.slice(1)}`);
    }
    await go(A, '#u10-interpret', '.shead');
    await click(A, `${ctl(keys['#u10-interpret'])} [data-level="high"]`); await sleep(250);
    await click(A, `${ctl(keys['#u10-interpret'])} details.wsup > summary`); await sleep(250);
    const l = await layout(A);
    check(`${w}px: High opened on Unit 10, no overflow`, !l.over && (await state(A, keys['#u10-interpret'])).open, JSON.stringify(l));
    await A.eval(`document.querySelector('${ctl(keys['#u10-interpret'])}').scrollIntoView({ block: 'start' })`); await sleep(200);
    await A.shot(`${w}-u10-high-open`);
    const menu = await A.eval(`(() => { const b = document.querySelector('#topbar [data-act="menu"]').getBoundingClientRect(); return { right: Math.round(b.right), vw: document.documentElement.clientWidth }; })()`);
    check(`${w}px: top-bar menu button fully visible`, menu.right <= menu.vw, JSON.stringify(menu));
  }
  await A.size(1440, 900);

  const mine = events.filter(e => e.sessionId === A.sessionId);
  const errors = mine.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error') || (e.method === 'Log.entryAdded' && e.params.entry.level === 'error'))
    .map(e => e.params.exceptionDetails?.exception?.description || e.params.entry?.text || (e.params.args || []).map(a => a.value).join(' '));
  check('no console errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  const hosts = new Set(mine.filter(e => e.method === 'Network.requestWillBeSent').map(e => { try { return new URL(e.params.request.url).host; } catch { return 'data'; } }));
  const external = [...hosts].filter(h => h && h !== new URL(BASE).host && !/^fonts\.(googleapis|gstatic)\.com$/.test(h) && h !== 'data');
  check('no request leaves for any AI provider', external.length === 0, [...hosts].join(', '));
  const aiCalls = mine.filter(e => e.method === 'Network.requestWillBeSent' && /\/api\/ai\/(?!status)/.test(e.params.request.url)).map(e => e.params.request.url);
  check('Writing Support made no AI call', aiCalls.length === 0, aiCalls.join(', '));
} catch (err) {
  check('E2E crashed', false, err.stack || String(err));
} finally {
  await prisma.user.deleteMany({ where: { email } }).catch(() => {});
  await prisma.$disconnect();
  try { ws && ws.close(); } catch { }
  chrome.kill();
  const failed = results.filter(r => !r.ok);
  fs.writeFileSync(path.join(OUT, 'writing-support-results.json'), JSON.stringify(results, null, 2));
  console.log(`\n${results.length - failed.length}/${results.length} passed · screenshots in ${OUT}`);
  process.exit(failed.length ? 1 : 0);
}
