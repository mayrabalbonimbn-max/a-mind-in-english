/* Real-browser E2E for Register & Tone (writing support + compare registers). Headless Chrome over CDP.
   Needs the E2E server (tests/e2e/server.ts, fake AI) on BASE and the test database. Run:
   BASE=http://127.0.0.1:3491 OUT=/path/for/screenshots node tests/e2e/register.e2e.mjs */
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

/* ── minimal CDP client ── */
// Never attach to someone else's browser: the debugging port must be free before our own Chrome starts.
if (await fetch(`http://127.0.0.1:${PORT}/json/version`).then(() => true, () => false)) { console.error(`Port ${PORT} is already in use; not attaching to another browser.`); process.exit(2); }
const PROFILE = path.join(OUT, 'profile');
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
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
    targetId, sessionId,
    cmd: (m, prm) => send(m, prm, sessionId),
    eval: async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }, sessionId); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result.value; },
    async goto(url) { await this.cmd('Page.navigate', { url }); await sleep(900); },
    async waitFor(expr, ms = 8000) { const t = Date.now(); while (Date.now() - t < ms) { try { if (await this.eval(expr)) return true; } catch { } await sleep(120); } return false; },
    async shot(name) { const { data } = await this.cmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(data, 'base64')); },
    async size(width, height = 860) { await this.cmd('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 }); await sleep(250); },
    async key(key, modifiers = 0) {
      const code = key === 'Enter' ? 'Enter' : key === 'Escape' ? 'Escape' : key;
      const vk = key === 'Enter' ? 13 : key === 'Escape' ? 27 : 0;
      await this.cmd('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: vk, modifiers, text: key === 'Enter' ? '\r' : undefined });
      await this.cmd('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: vk, modifiers });
    },
    click: (text, sel = 'button, a') => p.eval(`(() => { const el = [...document.querySelectorAll(${JSON.stringify(sel)})].find(e => e.textContent.includes(${JSON.stringify(text)}) && !e.disabled); if (!el) return false; el.click(); return true; })()`),
    type: (sel, text) => p.eval(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); el.focus(); el.value = ${JSON.stringify(text)}; el.dispatchEvent(new Event('input', { bubbles: true })); return true; })()`),
  };
  await p.cmd('Page.enable'); await p.cmd('Runtime.enable'); await p.cmd('Network.enable');
  return p;
}
async function signIn(p, email) {
  await p.goto(BASE + '/');
  await p.eval(`fetch('/api/auth/login', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: ${JSON.stringify(email)}, password: 'Password123!' }) }).then(r => r.status)`);
  await p.cmd('Page.reload'); await sleep(900);
  return p.waitFor(`!!window.KLANG_REGISTER && !document.body.classList.contains('gated')`, 15000);
}
const layout = p => p.eval(`(() => {
  const vw = document.documentElement.clientWidth;
  const over = document.documentElement.scrollWidth > vw + 1;
  const cut = [...document.querySelectorAll('.wsup, .wsup *, .modal .box, .modal .box *, .selpop, .selpop button')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > vw + 1 || r.left < -1); }).map(e => e.textContent.trim().slice(0, 30));
  const clipped = [...document.querySelectorAll('.rg-ex, .selpop button, .wsup summary')].filter(e => e.scrollWidth > e.clientWidth + 2).map(e => e.textContent.trim().slice(0, 30));
  const offenders = over ? [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > vw + 1; }).slice(0, 6).map(e => (e.id ? '#' + e.id : e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0]) + ':' + Math.round(e.getBoundingClientRect().right)) : [];
  return { vw, over, cut, clipped, offenders };
})()`);


const prisma = new PrismaClient();
const email = `e2e-register-${Date.now()}@example.com`;
const aiCalls = [];
// Select the first words of the first reading paragraph (a real DOM range, like a mouse selection)
const selectReading = (p, words) => p.eval(`(() => {
  const para = [...document.querySelectorAll('#stage .reading p')].find(x => x.textContent.split(' ').length > 12);
  const walker = document.createTreeWalker(para, NodeFilter.SHOW_TEXT); let node, text = '';
  while ((node = walker.nextNode())) { if (node.textContent.trim().split(/\\s+/).length >= ${words}) break; }
  const m = node.textContent.match(/^\\s*((?:\\S+\\s+){${words - 1}}\\S+)/);
  const start = node.textContent.indexOf(m[1]);
  const r = document.createRange(); r.setStart(node, start); r.setEnd(node, start + m[1].length);
  para.scrollIntoView({ block: 'center' });
  const s = getSelection(); s.removeAllRanges(); s.addRange(r);
  return m[1];
})()`);
const popover = p => p.eval(`(() => { const s = document.querySelector('#selpop'); return s ? [...s.querySelectorAll('button')].map(b => b.textContent) : null; })()`);

try {
  await connect();
  await fetch(BASE + '/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'Password123!' }) });
  const { browserContextId } = await send('Target.createBrowserContext');
  const A = await newPage(browserContextId);
  await A.size(1440, 900);
  check('signed in, book loaded', await signIn(A, email));

  /* Writing support: collapsed, local, one entry */
  await A.goto(`${BASE}/#u01-interpret`); await A.waitFor(`!!document.querySelector('.wsup')`);
  await A.eval(`(() => { const f = window.fetch; window.__ai = []; window.fetch = (u, o) => { if (String(u).includes('/api/ai/') && !String(u).endsWith('/status')) window.__ai.push({ u: String(u), b: o && o.body }); return f(u, o); }; })()`);
  const ws = await A.eval(`(() => { const d = [...document.querySelectorAll('details.wsup')]; return { n: d.length, open: d.filter(x => x.open).length, h: Math.round(d[0].getBoundingClientRect().height) }; })()`);
  check('Unit 01 INTERPRET: one collapsed "writing support" per open question', ws.n === 7 && ws.open === 0 && ws.h <= 40, JSON.stringify(ws));
  await A.eval(`(() => { const d = document.querySelectorAll('details.wsup')[1]; d.open = true; d.scrollIntoView({ block: 'start' }); window.scrollBy(0, -80); })()`);
  await A.shot('01-writing-support-u01-1440');
  check('opening it shows register, useful language and tips, with no AI call', await A.eval(`(() => { const b = document.querySelectorAll('details.wsup')[1].innerText; return /REGISTER/.test(b) && /USEFUL LANGUAGE/.test(b) && /WRITING TIPS/.test(b) && window.__ai.length === 0; })()`));
  await A.goto(`${BASE}/#u07-interpret`); await A.waitFor(`!!document.querySelector('.wsup')`);
  await A.eval(`(() => { const d = document.querySelector('details.wsup'); d.open = true; d.querySelector('details.wsmore').open = true; d.scrollIntoView({ block: 'start' }); window.scrollBy(0, -80); })()`);
  await A.shot('02-writing-support-u07-more-1440');
  check('Unit 07: lighter layer + "need more support?"', await A.eval(`document.querySelector('details.wsup').querySelectorAll(':scope > .wsb > .wsf li').length === 2 && /Step by step/i.test(document.querySelector("details.wsmore").innerText)`));
  await A.goto(`${BASE}/#u01-retrieve`);
  check('RETRIEVE has no support', await A.waitFor(`!!document.querySelector('#stage') && !document.querySelector('.wsup')`));

  /* Compare registers from the reading */
  await A.goto(`${BASE}/#u01-read`); await A.waitFor(`!!document.querySelector('#stage .reading p')`);
  await selectReading(A, 2);
  await A.waitFor(`!!document.querySelector('#selpop')`, 3000);
  const two = await popover(A);
  check('two words: Glossary + Explain only', JSON.stringify(two) === JSON.stringify(['Add to Glossary', 'Explain']), JSON.stringify(two));
  const picked = await selectReading(A, 6);
  await A.waitFor(`document.querySelector('#selpop') && document.querySelector('#selpop').textContent.includes('compare registers')`, 3000);
  const six = await popover(A);
  check('a phrase adds "compare registers"', six && six.includes('compare registers') && six.length === 3, JSON.stringify(six));
  check('selecting sends nothing', await A.eval(`window.__ai.length === 0`));
  await A.shot('03-popover-1440');
  await A.eval(`document.querySelector('#selpop [data-act="selrg"]').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); document.querySelector('#selpop [data-act="selrg"]').click()`);
  check('loading state names what is sent', await A.waitFor(`/Comparing registers/.test(document.querySelector('#modal')?.innerText || '') && /only the selected text/.test(document.querySelector('#modal').innerText)`, 3000));
  check('result: five registers', await A.waitFor(`document.querySelectorAll('#modal .rg-row').length === 5`, 5000));
  const sent = await A.eval(`window.__ai.map(x => ({ u: x.u, b: JSON.parse(x.b) }))`);
  check('exactly one call, only unit/section/source/selection/context', sent.length === 1 && sent[0].u.endsWith('/api/ai/register-compare') && Object.keys(sent[0].b).sort().join() === 'context,section,selection,source,unit' && sent[0].b.selection === picked, JSON.stringify(sent));
  check('What changed + not interchangeable + no score', await A.eval(`(() => { const t = document.querySelector('#modal').innerText; return /WHAT CHANGED\\?/i.test(t) && /THESE AREN.T INTERCHANGEABLE/i.test(t) && !/score|CEFR|%/i.test(t); })()`));
  await A.shot('04-result-1440');
  // The Language Bank is retired: no save buttons, and the result says plainly that nothing is saved
  check('no save buttons; "Nothing is saved."', await A.eval(`!document.querySelector('#modal [data-rk], #modal .rg-save') && !/Language Bank/i.test(document.querySelector('#modal').innerText) && document.querySelector('#modal .rg-foot').innerText.trim().endsWith('Nothing is saved.')`));
  const bank = await A.eval(`JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))).bank || []`);
  check('nothing written to the retired Language Bank', bank.length === 0, JSON.stringify(bank));
  await A.eval(`document.querySelector('#modal [data-act="close"]').click()`);

  /* Mobile */
  for (const w of [320, 390]) {
    await A.size(w, 780);
    await A.goto(`${BASE}/#u01-read`); await A.waitFor(`!!document.querySelector('#stage .reading p')`);
    await selectReading(A, 6);
    await A.waitFor(`document.querySelector('#selpop') && document.querySelector('#selpop').textContent.includes('compare registers')`, 3000);
    const lp = await layout(A); check(`${w}px: popover fits`, !lp.over && !lp.cut.length, JSON.stringify(lp));
    if (w === 390) await A.shot('05-popover-390');
    await A.eval(`document.querySelector('#selpop [data-act="selrg"]').click()`);
    await A.waitFor(`document.querySelectorAll('#modal .rg-row').length === 5`, 5000);
    const lm = await layout(A); check(`${w}px: result fits, nothing clipped`, !lm.over && !lm.cut.length && !lm.clipped.length, JSON.stringify(lm));
    await A.shot(`06-result-${w}`);
    await A.eval(`document.querySelector('#modal .box').scrollTop = 9999`); await A.shot(`07-result-${w}-bottom`);
    await A.eval(`document.querySelector('#modal [data-act="close"]').click()`);
    await A.goto(`${BASE}/#u01-interpret`); await A.waitFor(`!!document.querySelector('.wsup')`);
    await A.eval(`(() => { const d = document.querySelectorAll('details.wsup')[0]; d.open = true; d.scrollIntoView({ block: 'start' }); })()`);
    const lw = await layout(A); check(`${w}px: writing support fits`, !lw.over && !lw.cut.length && !lw.clipped.length, JSON.stringify(lw));
    await A.shot(`08-writing-support-${w}`);
  }
  await A.size(1440, 900);

  /* Own writing (textarea): only the selected words */
  await A.goto(`${BASE}/#u01-interpret`); await A.waitFor(`!!document.querySelector('textarea[data-k="01:i8"]')`);
  await A.eval(`window.__ai.length = 0`);
  await A.eval(`(() => { const t = document.querySelector('textarea[data-k="01:i8"]'); t.scrollIntoView({ block: 'center' }); t.focus(); t.value = 'PRIVATE start. I reckon it was a bad call to leave. PRIVATE end.'; t.dispatchEvent(new Event('input', { bubbles: true })); const s = t.value.indexOf('I reckon'); t.setSelectionRange(s, s + 'I reckon it was a bad call to leave.'.length); })()`);
  check('selection in own answer offers only compare registers', await A.waitFor(`(() => { const s = document.querySelector('#selpop'); return s && s.querySelectorAll('button').length === 1 && s.textContent.includes('compare registers'); })()`, 3000), JSON.stringify(await popover(A)));
  await A.shot('09-own-writing-popover');
  await A.eval(`document.querySelector('#selpop [data-act="selrg"]').click()`);
  await A.waitFor(`document.querySelectorAll('#modal .rg-row').length === 5`, 5000);
  const mine = await A.eval(`window.__ai.map(x => JSON.parse(x.b))`);
  check('own writing: only the selected words are sent', mine.length === 1 && mine[0].source === 'mine' && mine[0].context === '' && !JSON.stringify(mine).includes('PRIVATE'), JSON.stringify(mine));
  await A.eval(`document.querySelector('#modal [data-act="close"]').click()`);

  /* Provider failure */
  await A.eval(`(() => { const t = document.querySelector('textarea[data-k="01:i8"]'); t.focus(); t.value = 'This will FAIL on purpose here.'; t.dispatchEvent(new Event('input', { bubbles: true })); t.setSelectionRange(0, t.value.length); })()`);
  await A.waitFor(`!!document.querySelector('#selpop [data-act="selrg"]')`, 3000);
  await A.eval(`document.querySelector('#selpop [data-act="selrg"]').click()`);
  check('provider error: clean message and a close button', await A.waitFor(`/provider returned an error/.test(document.querySelector('#modal')?.innerText || '') && !!document.querySelector('#modal [data-act="close"]')`, 5000));
  await A.shot('10-error');
  await A.eval(`document.querySelector('#modal [data-act="close"]').click()`);

  /* Timed challenge: no support, no AI from the page */
  await A.goto(`${BASE}/#r1-synthesis`); await A.waitFor(`!!document.querySelector('[data-act="tcstart"]')`);
  check('synthesis task keeps writing support', await A.eval(`!!document.querySelector('.wsup')`));
  await A.eval(`document.querySelector('[data-act="tcstart"]').click()`);
  await A.waitFor(`!!document.querySelector('[data-tc-timer]')`);
  check('timed block has no writing support', await A.eval(`!document.querySelector('.block.timed .wsup')`));
  await A.eval(`(() => { const t = document.querySelector('.block.timed textarea'); t.focus(); t.value = 'I think this is quite a bad idea overall.'; t.dispatchEvent(new Event('input', { bubbles: true })); t.setSelectionRange(0, t.value.length); })()`);
  await new Promise(r => setTimeout(r, 700));
  check('timed textarea: no compare registers', await A.eval(`!document.querySelector('#selpop')`));
  await A.eval(`(() => { const p = document.querySelector('.block.timed .pr'); const r = document.createRange(); r.selectNodeContents(p); const s = getSelection(); s.removeAllRanges(); s.addRange(r); })()`);
  await new Promise(r => setTimeout(r, 700));
  const timedPop = await popover(A);
  check('timed prompt: no AI actions offered', !timedPop || (!timedPop.includes('compare registers') && !timedPop.includes('Explain')), JSON.stringify(timedPop));
  await A.eval(`document.querySelector('[data-act="tcsubmit"]') && document.querySelector('[data-act="tcsubmit"]').click()`);
} catch (err) {
  check('E2E crashed', false, err.stack || String(err));
} finally {
  await prisma.user.deleteMany({ where: { email } }).catch(() => {});
  await prisma.$disconnect();
  try { ws && ws.close(); } catch { }
  chrome.kill();
  const failed = results.filter(r => !r.ok);
  fs.writeFileSync(path.join(OUT, 'register-results.json'), JSON.stringify(results, null, 2));
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  process.exit(failed.length ? 1 : 0);
}
