/* Real-browser E2E for the maintenance pass: Timed-essay id migration, Error Log in Module Review,
   retired Language Bank, Profile without invented levels, Interpret badges, Core marks, copy and
   the .btn.dark padding, at 1440, 390 and 320 px, watching the console and every outgoing request.
   Needs the E2E server (tests/e2e/server.ts, fake AI, fake transcription) on BASE and the test database:
   BASE=http://127.0.0.1:3491 OUT=/path/for/screenshots node tests/e2e/maintenance.e2e.mjs */
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

const ESSAY = 'LEGACY ESSAY: a later language is never only a tool, because it changes what I notice.';
const LEGACY = {
  a: {
    'r1:m1t1': ESSAY, 'r1:m1t1:checked': { answer: '2', at: '2026-09-20T09:00:00Z' },
    'r1:tc:start': '2026-09-20T09:00:00Z', 'r1:tc:end': '2026-09-20T09:40:00Z',
    '01:i8': 'She felt like a fraud.', '01:i8:intfb': { at: '2026-09-20T10:00:00Z', f: { content: { verdict: 'misunderstood', commentary: 'OLD-VERDICT-COMMENT' }, language: { meaningClear: true, pointsToNotice: [] } } },
    '01:i9': 'Automaticity.', '01:i9:intfb': { at: '2026-09-20T10:00:00Z', f: { content: { verdict: 'developed', commentary: 'NEW-VERDICT-COMMENT' }, language: { meaningClear: true, pointsToNotice: [] } } },
  },
  pf: {
    'r1:m1t1': { s: 'First draft done', fb: [{ id: 'fbr1', at: '2026-09-20T10:00:00Z', draft: 'first', words: 290, f: { estimatedLevel: { level: 'B2+', rationale: 'r' }, suggestedErrorLog: [], nextDraftPriorities: ['a', 'b'] } }] },
    '01:w2': { fb: [{ id: 'fbw2', at: '2026-09-20T10:00:00Z', draft: 'first', words: 400, f: { estimatedLevel: { level: 'B2', rationale: 'r' }, suggestedErrorLog: [], suggestedLanguageBank: [{ type: 'Chunk', entry: 'OLD-BANK-SUGGESTION', meaning: 'm', example: 'e' }], nextDraftPriorities: ['a', 'b'] } }] },
  },
  errs: [
    { id: 'e-sp', mine: 'SPOKEN-ROW he go', corr: 'he goes', why: 'agreement', ex: '', unit: '03', source: 'speaking', n: 0, last: '' },
    { id: 'e-li', mine: 'LIGHT-ROW', corr: 'c', why: 'w', ex: '', unit: '02', source: 'light_feedback', n: 0, last: '' },
  ],
  bank: [{ id: 'b-old', t: 'Chunk', e: 'OLD-BANK-ENTRY', m: 'kept for compatibility', x: '', s: 'Unit 01', d: '2026-09-01' }],
  sp: [1, 2, 3].map(n => ({ id: `sp_e2e_${n}`, unit: '01', activityId: 's1', attempt: n, date: `2026-09-2${n}T10:00:00Z`, duration: 60, transcript: 'I have went there.', feedback: { analysisMode: 'transcript_only', grammar: 'g', corrections: [{ original: 'have went', better: 'have gone', why: 'participle', category: 'Grammar' }], languageBank: [{ entry: 'OLD-SPOKEN-BANK', meaning: 'm', example: 'e' }] } })),
};

const prisma = new PrismaClient();
const email = `e2e-maintenance-${Date.now()}@example.com`;
try {
  await connect();
  await fetch(BASE + '/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'Password123!' }) });
  const { browserContextId } = await send('Target.createBrowserContext');
  const A = await newPage(browserContextId);
  await A.size(1440, 900);
  await A.goto(BASE + '/');
  // Legacy data on this device before the new build loads (as after an update)
  await A.eval(`localStorage.setItem('klang.mind.v1', ${JSON.stringify(JSON.stringify(LEGACY))})`);
  await A.eval(`fetch('/api/auth/login', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: ${JSON.stringify(email)}, password: 'Password123!' }) }).then(r => r.status)`);
  await A.cmd('Page.reload'); await sleep(900);
  check('signed in, book loaded', await A.waitFor(`!!window.KLANG_PROFILE && !document.body.classList.contains('gated')`, 15000));
  await A.waitFor(`document.querySelector('[data-sync-status]')?.innerText.includes('Saved to cloud')`, 10000);

  /* Timed essay id migration, in the real page and through the cloud */
  const st = await A.eval(`JSON.parse(localStorage.getItem('klang.mind.v1'))`);
  check('essay moved to its own id; MCQ answer restored; Portfolio moved', st.a['r1:m1tc1'] === ESSAY && st.a['r1:m1t1'] === '2' && st.pf['r1:m1tc1']?.fb?.[0]?.id === 'fbr1' && !st.pf['r1:m1t1'], JSON.stringify({ tc: st.a['r1:m1tc1'], mcq: st.a['r1:m1t1'], pf: Object.keys(st.pf) }));
  const cloud = await A.eval(`fetch('/api/docs/review%3A1', { credentials: 'include' }).then(r => r.json())`);
  check('the cloud copy of Review 1 has the migrated keys', cloud?.doc?.data?.answers?.['r1:m1tc1'] === ESSAY && cloud.doc.data.answers['r1:m1t1'] === '2', JSON.stringify(cloud?.doc?.data?.answers || cloud).slice(0, 200));
  const bankCloud = await A.eval(`fetch('/api/docs/language-bank', { credentials: 'include' }).then(r => r.json())`);
  check('old Language Bank data is kept and still syncs (compatibility)', bankCloud?.doc?.data?.bank?.[0]?.e === 'OLD-BANK-ENTRY', JSON.stringify(bankCloud).slice(0, 160));
  await go(A, '#r1-synthesis', '.block.timed');
  check('Review 1 shows the migrated Timed essay and its feedback', await A.eval(`[...document.querySelectorAll('.block.timed textarea')].some(t => t.value.includes('LEGACY ESSAY')) && !!document.querySelector('.block.timed [data-act="fbopen"][data-pk="r1:m1tc1"]')`));
  await go(A, '#r1-reasoning', 'input[name="r1:m1t1"]');
  check('Reasoning Lab MCQ keeps its own answer', await A.eval(`document.querySelector('input[name="r1:m1t1"][value="2"]').checked`));

  /* Error Log in Module Review */
  await go(A, '#r1-errors', '.shead');
  const errs = await text(A);
  check('Module Review Error Log shows speaking and "check my english" rows', errs.includes('SPOKEN-ROW') && errs.includes('LIGHT-ROW'), errs.slice(0, 200));

  /* Home, sidebar, copy, Language Bank gone, .btn.dark */
  await go(A, '#home', '.cover');
  const home = await text(A), side = await A.eval(`document.querySelector('#side').innerText`);
  check('Home and sidebar: no Language Bank', !/language bank/i.test(home) && !/language bank/i.test(side));
  check('Home copy: synced, no "for correction"', home.includes('synced to your account') && !home.includes('for correction'));
  check('sidebar copy: no "this browser only"', side.includes('Saved in this browser and synced to your account') && !side.includes('browser only'));
  const sectionPad = await A.eval(`parseFloat(getComputedStyle(document.querySelector('section.dark')).paddingTop)`);
  check('Home dark sections keep their padding', sectionPad >= 32, String(sectionPad));
  await A.shot('01-home-1440');
  await go(A, '#bank', '.cover');
  check('#bank no longer opens a page', await A.eval(`!!document.querySelector('.cover') && !document.querySelector('#bankform')`));

  /* Unit pages: core marks, optional stages, feedback without Bank */
  await go(A, '#u01-know', '.stage-foot');
  const btn = await A.eval(`(() => { const b = document.querySelector('.stage-foot .btn.dark'); const s = getComputedStyle(b); return { t: s.paddingTop, l: s.paddingLeft, h: Math.round(b.getBoundingClientRect().height) }; })()`);
  check('.btn.dark has button padding, not section padding', btn.t === '11px' && btn.l === '20px' && btn.h < 60, JSON.stringify(btn));
  check('KNOW is marked optional, still complete-able', await A.eval(`document.querySelector('.shead').innerText.toLowerCase().includes('optional · extra practice') && !!document.querySelector('[data-sec="01:know"]')`));
  await go(A, '#u01-interpret', '.shead');
  const interp = await A.eval(`({ core: document.querySelectorAll('#stage .tago.core').length, qs: document.querySelectorAll('#stage .q').length, dev: /\\bDeveloped\\b/i.test(document.body.innerText), mis: /Misunderstood/i.test(document.body.innerText), oldNote: document.body.innerText.includes('OLD-VERDICT-COMMENT') })`);
  check('INTERPRET: core marks on a few items, all items still there', interp.core >= 3 && interp.qs > interp.core, JSON.stringify(interp));
  check('INTERPRET badges: "Developed" shown; an old verdict keeps its comment without a "Misunderstood" badge', interp.dev && !interp.mis && interp.oldNote, JSON.stringify(interp));
  await A.shot('02-interpret-1440');
  await go(A, '#u01-write', '.wtask');
  await A.eval(`document.querySelector('[data-act="fbopen"][data-pk="01:w2"]').click()`);
  await A.waitFor(`!!document.querySelector('#modal .fbx')`);
  check('writing feedback: no Language Bank section (even in an old report)', await A.eval(`!/Language Bank|OLD-BANK-SUGGESTION/.test(document.querySelector('#modal').innerText) && /Suggested Error Log entries/i.test(document.querySelector('#modal').innerText)`));
  await A.eval(`document.querySelector('#modal [data-act="close"]').click()`);
  await go(A, '#u01-think', '.media-lab');
  const think = await A.eval(`({ core: [...document.querySelectorAll('#stage .q .tago.core')].map(t => t.closest('.q').id), opt: [...document.querySelectorAll('#stage .q .tago')].filter(t => t.textContent === 'optional · extra practice').length, qs: document.querySelectorAll('#stage .q[id^="q-01:t"]').length, sec: !!document.querySelector('[data-sec="01:think"]') })`);
  check('THINK: one core activity (T5), the others optional, all still there and complete-able', JSON.stringify(think.core) === '["q-01:t5"]' && think.opt === think.qs - 1 && think.qs === 5 && think.sec, JSON.stringify(think));
  await A.eval(`document.querySelectorAll('.attempts details').forEach(d => d.open = true)`);
  check('speaking feedback: Error Log only, no Bank', await A.eval(`!!document.querySelector('[data-act="sp2err"]') && !document.querySelector('[data-act="sp2bank"]') && !/Language Bank|OLD-SPOKEN-BANK/.test(document.body.innerText)`));

  /* Profile */
  await go(A, '#profile', '.profile-grid');
  const prof = await text(A);
  check('Profile: no Register Control, speaking shown as evidence without a level', !/Register Control/i.test(prof) && prof.includes('Evidence recorded · no level estimate'), prof.slice(0, 120));
  check('Profile: no invented overall level', await A.eval(`!document.querySelector('.profile-hero.ready')`));

  /* Mobile widths */
  for (const w of [390, 320]) {
    await A.size(w, 780);
    for (const [hash, ready, name] of [['#home', '.cover', 'home'], ['#u01-interpret', '.shead', 'interpret'], ['#u01-know', '.stage-foot', 'know'], ['#r1-errors', '.shead', 'review-errors'], ['#r1-synthesis', '.block.timed', 'review-timed'], ['#profile', '.profile-grid', 'profile']]) {
      await go(A, hash, ready);
      const l = await layout(A);
      check(`${w}px ${name}: no horizontal overflow`, !l.over, JSON.stringify(l));
      await A.shot(`${w}-${name}`);
    }
    await go(A, '#u01-know', '.stage-foot');
    const b = await A.eval(`(() => { const s = getComputedStyle(document.querySelector('.stage-foot .btn.dark')); return s.paddingTop + ' ' + s.paddingLeft; })()`);
    check(`${w}px: .btn.dark keeps button padding`, b === '11px 20px', b);
  }
  await A.size(1440, 900);

  /* Console and network */
  const mine = events.filter(e => e.sessionId === A.sessionId);
  const errors = mine.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error') || (e.method === 'Log.entryAdded' && e.params.entry.level === 'error'))
    .map(e => e.params.exceptionDetails?.exception?.description || e.params.entry?.text || (e.params.args || []).map(a => a.value).join(' '));
  check('no console errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  const hosts = new Set(mine.filter(e => e.method === 'Network.requestWillBeSent').map(e => { try { return new URL(e.params.request.url).host; } catch { return 'data'; } }));
  const external = [...hosts].filter(h => h && h !== new URL(BASE).host && !/^fonts\.(googleapis|gstatic)\.com$/.test(h) && h !== 'data');
  check('no request leaves for any AI provider (only this server and web fonts)', external.length === 0 && ![...hosts].some(h => /openai/.test(h)), [...hosts].join(', '));
  const aiCalls = mine.filter(e => e.method === 'Network.requestWillBeSent' && /\/api\/ai\/(?!status)/.test(e.params.request.url)).map(e => e.params.request.url);
  check('no AI endpoint was called at all during this run', aiCalls.length === 0, aiCalls.join(', '));
} catch (err) {
  check('E2E crashed', false, err.stack || String(err));
} finally {
  await prisma.user.deleteMany({ where: { email } }).catch(() => {});
  await prisma.$disconnect();
  try { ws && ws.close(); } catch { }
  chrome.kill();
  const failed = results.filter(r => !r.ok);
  fs.writeFileSync(path.join(OUT, 'maintenance-results.json'), JSON.stringify(results, null, 2));
  console.log(`\n${results.length - failed.length}/${results.length} passed · screenshots in ${OUT}`);
  process.exit(failed.length ? 1 : 0);
}
