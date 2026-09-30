/* Real-browser E2E for the Study Timer and the Learning Review: sidebar timer (desktop), top-bar
   timer (mobile), heartbeat/stale end, check-in without a cap, sync; Learning Review empty /
   nothing new / success / failure / not configured / load error, PDF + Markdown export; 1440, 390
   and 320 px. Fake AI only, test database only. Needs the E2E server (tests/e2e/server.ts):
   BASE=http://127.0.0.1:3491 OUT=/path/for/screenshots node tests/e2e/studyReview.e2e.mjs */
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
const toastText = p => p.eval(`document.querySelector('#toast')?.innerText || ''`);
const lrControls = p => p.eval(`document.querySelector('#lr-controls')?.innerText || ''`);
const lrBody = p => p.eval(`document.querySelector('#lr-body')?.innerText || ''`);
const H = 60 * 60 * 1000;

const prisma = new PrismaClient();
const email = `e2e-study-review-${Date.now()}@example.com`;
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

  /* ── Study Timer · desktop ── */
  await go(A, '#home', '.cover');
  const order = await A.eval(`(() => { const y = s => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top) : null; }; return { acc: y('#side-account'), timer: y('#side-timer'), prog: y('#side .prog'), visible: !!document.querySelector('#side-timer')?.offsetHeight, topbar: getComputedStyle(document.querySelector('#topbar')).display }; })()`);
  check('desktop: timer visible in the sidebar, ACCOUNT → STUDY TIMER → PROGRESS', order.visible && order.acc <= order.timer && order.timer < order.prog, JSON.stringify(order));
  const idle = await A.eval(`document.querySelector('#side-timer').innerText`);
  check('desktop idle: "0 min today" and "Start ▶"', /0 min today/.test(idle) && /Start ▶/.test(idle), idle.replace(/\n/g, ' / '));
  await A.shot('01-desktop-timer-idle');
  await click(A, '#side-timer [data-act="timer-toggle"]');
  await sleep(2300);
  const running = await A.eval(`document.querySelector('#side-timer').innerText`);
  check('desktop running: "N min today · mm:ss" and "Pause ⏸"', /\d+ min today · 00:0[1-9]/.test(running) && /Pause ⏸/.test(running), running.replace(/\n/g, ' / '));
  await A.shot('02-desktop-timer-running');
  const st1 = await A.eval(`JSON.parse(localStorage.getItem('klang.mind.v1')).study`);
  check('start persisted with heartbeat fields', !!(st1.activeSession && st1.activeSession.lastSeenAt && st1.activeSession.confirmedAt), JSON.stringify(st1.activeSession));
  await A.cmd('Page.reload'); await sleep(1500);
  await A.waitFor(`!!document.querySelector('#side-timer .timer-toggle-btn')`, 10000);
  const afterReload = await A.eval(`({ id: JSON.parse(localStorage.getItem('klang.mind.v1')).study.activeSession?.id, label: document.querySelector('#side-timer').innerText })`);
  check('refresh: the same session is still running', afterReload.id === st1.activeSession.id && /Pause/.test(afterReload.label), JSON.stringify(afterReload));
  await sleep(4000);
  await click(A, '#side-timer [data-act="timer-toggle"]');
  await sleep(300);
  const st2 = await A.eval(`JSON.parse(localStorage.getItem('klang.mind.v1')).study`);
  check('pause: session closed with its real duration', !st2.activeSession && st2.sessions.length === 1 && st2.sessions[0].durationSeconds >= 5 && st2.sessions[0].endReason === 'manual', JSON.stringify(st2.sessions));
  await A.waitFor(`document.querySelector('[data-sync-status]')?.innerText.includes('Saved to cloud')`, 10000);
  const cloud = await A.eval(`fetch('/api/docs/study-timer', { credentials: 'include' }).then(r => r.json())`);
  check('sync: the session reached the cloud', cloud?.doc?.data?.sessions?.[0]?.id === st2.sessions[0].id, JSON.stringify(cloud?.doc?.data || cloud).slice(0, 160));

  /* Reopen after the app was closed for hours with the timer on: ends at the last heartbeat */
  const stale = await A.eval(`(() => { const s = JSON.parse(localStorage.getItem('klang.mind.v1')); const now = Date.now(); s.study.activeSession = { id: 'st_e2e_stale', startedAt: new Date(now - 5 * ${H}).toISOString(), lastSeenAt: new Date(now - 5 * ${H} + 40 * 60000).toISOString(), confirmedAt: new Date(now - 5 * ${H}).toISOString() }; localStorage.setItem('klang.mind.v1', JSON.stringify(s)); return true; })()`);
  await A.cmd('Page.reload'); await sleep(2200);
  const st3 = await A.eval(`JSON.parse(localStorage.getItem('klang.mind.v1')).study`);
  const staleSession = st3.sessions.find(s => s.id === 'st_e2e_stale');
  check('reopen hours later: session ended at the last heartbeat (40 min kept, the rest not counted)', stale && !st3.activeSession && staleSession && staleSession.durationSeconds === 2400 && staleSession.endReason === 'stale', JSON.stringify(staleSession));
  check('the learner is told what was not counted', /not counted/.test(await toastText(A)), await toastText(A));
  await A.shot('03-desktop-stale-notice');

  /* Long session: "still studying?" check-in, confirmed → keeps counting (no cap) */
  await A.eval(`(() => { const s = JSON.parse(localStorage.getItem('klang.mind.v1')); const now = Date.now(); s.study.activeSession = { id: 'st_e2e_long', startedAt: new Date(now - 4.5 * ${H}).toISOString(), lastSeenAt: new Date(now - 30000).toISOString(), confirmedAt: new Date(now - 95 * 60000).toISOString() }; localStorage.setItem('klang.mind.v1', JSON.stringify(s)); })()`);
  await A.cmd('Page.reload'); await sleep(2500);
  check('check-in card appears after 90 unconfirmed minutes', await A.waitFor(`!document.querySelector('#study-checkin').hidden`, 5000));
  const ask = await A.eval(`document.querySelector('#study-checkin').innerText`);
  check('check-in wording: still studying, with the real running time', /Still studying\?/.test(ask) && /4 h 30 min/.test(ask), ask.replace(/\n/g, ' / '));
  await A.shot('04-desktop-checkin');
  await click(A, '#study-checkin [data-act="timer-confirm"]');
  await sleep(1300);
  await click(A, '#side-timer [data-act="timer-toggle"]');
  await sleep(300);
  const long = (await A.eval(`JSON.parse(localStorage.getItem('klang.mind.v1')).study`)).sessions.find(s => s.id === 'st_e2e_long');
  check('a confirmed 270-minute session is kept in full (no cap)', long && long.durationSeconds >= 270 * 60 && long.endReason === 'manual', JSON.stringify(long));
  await A.waitFor(`document.querySelector('[data-sync-status]')?.innerText.includes('Saved to cloud')`, 10000);

  /* ── Learning Review · desktop (fake provider, test database) ── */
  await go(A, '#learning', '#lr-page');
  await A.waitFor(`!!document.querySelector('#lr-controls [data-lr="run"]')`, 8000);
  const c0 = await lrControls(A);
  check('configured: "run review now" present, study time since last review shown', /run review now/.test(c0) && /Study timer since your last review: \d+ min/.test(c0) && /Nothing new since your last review/.test(c0), c0.replace(/\n/g, ' / '));
  check('empty state: no review yet', /No review yet/.test(await lrBody(A)));
  await A.shot('05-lr-empty-1440');
  await click(A, '[data-lr="run"]');
  await A.waitFor(`/Nothing new to review yet\\./.test(document.querySelector('#lr-controls').innerText)`, 8000);
  check('run with nothing new → "Nothing new to review yet." (no AI)', /Nothing new to review yet\./.test(await lrControls(A)));
  const runs0 = await prisma.learningReviewRun.count({ where: { user: { email } } });
  check('no run was recorded for "nothing new"', runs0 === 0, String(runs0));

  // Some real study in the book, synced
  await go(A, '#u01-interpret', '.shead');
  const k = await A.eval(`(() => { const t = document.querySelector('#stage .q textarea[data-k^="01:"]'); t.value = 'The narrator hedges: she is not sure the language is gone, only quieter.'; t.dispatchEvent(new Event('input', { bubbles: true })); return t.dataset.k; })()`);
  await sleep(1500);
  await A.waitFor(`document.querySelector('[data-sync-status]')?.innerText.includes('Saved to cloud')`, 10000);
  await go(A, '#learning', '#lr-page');
  await A.waitFor(`/1 new item/.test(document.querySelector('#lr-controls').innerText)`, 8000);
  check('new evidence is detected', /1 new item since your last review/.test(await lrControls(A)), k);
  await click(A, '[data-lr="run"]');
  await A.waitFor(`/Review complete/.test(document.querySelector('#lr-controls').innerText)`, 15000);
  const body = await lrBody(A);
  check('success: report shown with Fact / AI interpretation / Proposal labels', /Learning review/i.test(body) && /\bFact\b/i.test(body) && /AI interpretation/i.test(body) && /Proposed adaptations/i.test(body), body.slice(0, 200).replace(/\n/g, ' / '));
  const links = await A.eval(`[...document.querySelectorAll('#lr-report [data-lr="pdf"], #lr-report [data-lr="md"]')].map(a => a.getAttribute('href'))`);
  check('export controls: PDF and Markdown', links.length === 2 && /format=pdf/.test(links[0]) && /format=md/.test(links[1]), JSON.stringify(links));
  const exp = await A.eval(`Promise.all(${JSON.stringify(links)}.map(h => fetch(h, { credentials: 'include' }).then(async r => ({ s: r.status, t: r.headers.get('content-type'), head: (await r.text()).slice(0, 40) }))))`);
  check('exports download (PDF + Markdown) from the saved review', exp[0].s === 200 && /pdf/.test(exp[0].t) && exp[0].head.startsWith('%PDF') && exp[1].s === 200 && /markdown/.test(exp[1].t), JSON.stringify(exp));
  await A.shot('06-lr-report-1440');
  const runsOk = await prisma.learningReviewRun.findMany({ where: { user: { email } }, select: { status: true, model: true } });
  check('exports made no extra AI run', runsOk.length === 1 && runsOk[0].status === 'succeeded' && runsOk[0].model === 'e2e-fake', JSON.stringify(runsOk));

  // Failure: the previous report stays, nothing is consumed
  await go(A, '#u01-interpret', '.shead');
  await A.eval(`(() => { const t = [...document.querySelectorAll('#stage .q textarea[data-k^="01:"]')][1]; t.value = 'FAIL-REVIEW second answer.'; t.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await sleep(1500);
  await A.waitFor(`document.querySelector('[data-sync-status]')?.innerText.includes('Saved to cloud')`, 10000);
  await go(A, '#learning', '#lr-page');
  await A.waitFor(`!!document.querySelector('#lr-controls [data-lr="run"]')`, 8000);
  await click(A, '[data-lr="run"]');
  await A.waitFor(`/could not be completed/.test(document.querySelector('#lr-controls').innerText)`, 15000);
  const failC = await lrControls(A), failB = await lrBody(A);
  check('error state: failure message, previous review still shown, evidence still pending', /could not be completed/.test(failC) && /Qualified claims|Learning review/i.test(failB) && /1 new item/.test(failC), failC.replace(/\n/g, ' / '));
  await A.shot('07-lr-failure-1440');

  // Not configured and load error (UI states; the server answer is replaced in this page only)
  await A.eval(`(() => { window.__of = window.__of || window.fetch; window.fetch = (u, o) => String(u).endsWith('/api/learning-review') ? Promise.resolve(new Response(JSON.stringify({ isDemo: false, available: false, report: null, pending: 0 }), { status: 200 })) : window.__of(u, o); })()`);
  await go(A, '#home', '.cover'); await go(A, '#learning', '#lr-page'); await sleep(600);
  const nc = await lrControls(A);
  check('not configured: safe message, no run button', /not configured on this server yet/.test(nc) && !(await A.eval(`!!document.querySelector('[data-lr="run"]')`)), nc);
  await A.shot('08-lr-not-configured');
  await A.eval(`window.fetch = (u, o) => String(u).endsWith('/api/learning-review') ? Promise.resolve(new Response('{"error":"internal_error"}', { status: 500 })) : window.__of(u, o)`);
  await go(A, '#home', '.cover'); await go(A, '#learning', '#lr-page'); await sleep(600);
  const le = await lrControls(A);
  check('server error: "could not be loaded", not "not configured", with a retry', /could not be loaded/.test(le) && !/not configured/.test(le) && /try again/.test(le), le);
  await A.eval(`window.fetch = window.__of`);
  await click(A, '[data-lr="reload"]');
  await A.waitFor(`!!document.querySelector('#lr-controls [data-lr="run"]')`, 8000);
  check('retry loads the real page again', /run review now/.test(await lrControls(A)));

  /* ── Mobile ── */
  for (const w of [390, 320]) {
    await A.size(w, 780);
    await go(A, '#home', '.cover');
    const tb = await A.eval(`(() => { const b = document.querySelector('#topbar-timer .timer-btn'); return { shown: getComputedStyle(document.querySelector('#topbar')).display !== 'none' && !!b && b.offsetWidth > 0, text: b && b.innerText }; })()`);
    check(`${w}px: timer in the top bar`, tb.shown, JSON.stringify(tb));
    await click(A, '#topbar-timer [data-act="timer-toggle"]'); await sleep(1300);
    check(`${w}px: start from the top bar`, await A.eval(`!!JSON.parse(localStorage.getItem('klang.mind.v1')).study.activeSession && document.querySelector('#topbar-timer .timer-btn').classList.contains('on')`));
    let l = await layout(A);
    check(`${w}px home with timer running: no horizontal overflow`, !l.over, JSON.stringify(l));
    await A.shot(`${w}-home-timer`);
    // check-in card on a phone
    await A.eval(`(() => { const s = JSON.parse(localStorage.getItem('klang.mind.v1')); s.study.activeSession.confirmedAt = new Date(Date.now() - 100 * 60000).toISOString(); s.study.activeSession.startedAt = s.study.activeSession.confirmedAt; localStorage.setItem('klang.mind.v1', JSON.stringify(s)); })()`);
    await A.cmd('Page.reload'); await sleep(2500);
    await A.waitFor(`!document.querySelector('#study-checkin').hidden`, 5000);
    l = await layout(A);
    check(`${w}px check-in card: visible, no overflow`, await A.eval(`!document.querySelector('#study-checkin').hidden && document.querySelector('#study-checkin').getBoundingClientRect().right <= document.documentElement.clientWidth`) && !l.over, JSON.stringify(l));
    await A.shot(`${w}-checkin`);
    await click(A, '#study-checkin [data-act="timer-toggle"]'); await sleep(500);
    check(`${w}px: pause from the check-in`, await A.eval(`!JSON.parse(localStorage.getItem('klang.mind.v1')).study.activeSession`));
    await go(A, '#learning', '#lr-page');
    await A.waitFor(`!!document.querySelector('#lr-controls [data-lr="run"]')`, 8000);
    l = await layout(A);
    const usable = await A.eval(`(() => { const b = document.querySelector('[data-lr="run"]'); const r = b.getBoundingClientRect(); return r.width > 100 && r.right <= document.documentElement.clientWidth; })()`);
    check(`${w}px Learning Review: usable, no horizontal overflow`, usable && !l.over, JSON.stringify(l));
    await A.shot(`${w}-learning-review`);
  }
  await A.size(1440, 900);

  /* Console and network */
  const mine = events.filter(e => e.sessionId === A.sessionId);
  const errors = mine.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error') || (e.method === 'Log.entryAdded' && e.params.entry.level === 'error'))
    .map(e => e.params.exceptionDetails?.exception?.description || e.params.entry?.text || (e.params.args || []).map(a => a.value).join(' '))
    .filter(t => !/status of 500|status of 50[234]/.test(t));   // the deliberate 500/502 of the error-state checks
  check('no console errors (besides the deliberate error-state responses)', errors.length === 0, errors.slice(0, 3).join(' | '));
  const hosts = new Set(mine.filter(e => e.method === 'Network.requestWillBeSent').map(e => { try { return new URL(e.params.request.url).host; } catch { return 'data'; } }));
  const external = [...hosts].filter(h => h && h !== new URL(BASE).host && !/^fonts\.(googleapis|gstatic)\.com$/.test(h) && h !== 'data');
  check('no request leaves for any AI provider (only this server and web fonts)', external.length === 0 && ![...hosts].some(h => /openai|elevenlabs/.test(h)), [...hosts].join(', '));
} catch (err) {
  check('E2E crashed', false, err.stack || String(err));
} finally {
  await prisma.user.deleteMany({ where: { email } }).catch(() => {});
  await prisma.$disconnect();
  try { ws && ws.close(); } catch { }
  chrome.kill();
  const failed = results.filter(r => !r.ok);
  fs.writeFileSync(path.join(OUT, 'study-review-results.json'), JSON.stringify(results, null, 2));
  console.log(`\n${results.length - failed.length}/${results.length} passed · screenshots in ${OUT}`);
  process.exit(failed.length ? 1 : 0);
}
