/* Real-browser E2E for character conversations (headless Chrome over CDP, no extra dependencies).
   Needs the E2E server (tests/e2e/server.ts) on BASE and the test database. Run:
   BASE=http://127.0.0.1:3491 OUT=/path/for/screenshots node tests/e2e/conversation.e2e.mjs */
import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const BASE = process.env.BASE || 'http://127.0.0.1:3491';
const OUT = process.env.OUT || path.join(os.tmpdir(), `klang-e2e-${Date.now()}`);
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 20000 + Math.floor(Math.random() * 20000);
const PRODUCT = 'mind';
const L = { unit: '01', cta: 'TALK TO THE NARRATOR', meaning: 'WHAT DID THEY MEAN', helpSay: 'HELP ME SAY THIS', end: 'END CONVERSATION', endYes: 'Yes, end it', review: 'REVIEW THE CONVERSATION', cont: 'CONTINUE', withHelp: 'written with help', reviewH: ['What you understood', 'How you responded', 'Your language', 'Reasoning'], demo: 'not available in Demo Mode', fork: 'Continue from this version' };
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
  return p.waitFor(`!!window.KLANG_CHAT && !document.body.classList.contains('gated')`, 15000);
}
const convs = p => p.eval(`JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key(${JSON.stringify('klang.mind.v1')})) || '{}').conversations || {}`);
const serverDocs = p => p.eval(`fetch('/api/docs', { credentials: 'include' }).then(r => r.json()).then(d => d.documents.filter(x => x.key.startsWith('conversation:')))`);
const layout = p => p.eval(`(() => {
  const vw = document.documentElement.clientWidth;
  const over = document.documentElement.scrollWidth > vw + 1;
  const cut = [...document.querySelectorAll('.talk button, .talk a, .talk .turn-text, .talk h1, .talk-cta, .talk-cta a')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > vw + 1 || r.left < -1); }).map(e => e.textContent.trim().slice(0, 30));
  const clipped = [...document.querySelectorAll('.talk .turn-text, .talk .btn')].filter(e => e.scrollWidth > e.clientWidth + 2).map(e => e.textContent.trim().slice(0, 30));
  const offenders = over ? [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > vw + 1; }).slice(0, 6).map(e => (e.id ? '#' + e.id : e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0]) + ':' + Math.round(e.getBoundingClientRect().right)) : [];
  return { vw, over, cut, clipped, offenders };
})()`);

const prisma = new PrismaClient();
const stamp = Date.now();
const email = `e2e-talk-${stamp}@example.com`, demoEmail = `e2e-demo-${stamp}@example.com`;

try {
  await connect();
  for (const e of [email, demoEmail]) await fetch(BASE + '/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: e, password: 'Password123!' }) });
  if (PRODUCT === 'mind') await prisma.user.update({ where: { email: demoEmail }, data: { isDemo: true } });

  /* Device A */
  const { browserContextId: ctxA } = await send('Target.createBrowserContext');
  const A = await newPage(ctxA);
  await A.size(1440);
  check('A: signed in and book loaded', await signIn(A, email));

  // CTA in the unit, after the reading
  await A.goto(`${BASE}/#u${L.unit}-read`);
  check('CTA appears in READ of Unit 01', await A.waitFor(`[...document.querySelectorAll('.talk-cta a')].some(a => a.textContent.includes(${JSON.stringify(L.cta)}))`));
  check('CTA sits after the counterpoint, no new stage', await A.eval(`(() => { const c = document.querySelector('.counterwrap'), t = document.querySelector('.talk-cta'); return !!(c && t && (c.compareDocumentPosition(t) & 4)) && document.querySelectorAll('.stepper li').length === 9; })()`));
  await A.goto(`${BASE}/#u02-read`);
  check('no CTA in other units', await A.eval(`!document.querySelector('.talk-cta')`));
  await A.goto(`${BASE}/#u${L.unit}-read`); await A.waitFor(`!!document.querySelector('.talk-cta a')`);
  await A.size(390, 844); await A.eval(`document.querySelector('.talk-cta').scrollIntoView({ block: 'center' })`); await A.shot(`${PRODUCT}-00-cta-390`);
  const ctaLay = await layout(A); check('CTA fits 390px', !ctaLay.over && !ctaLay.cut.length, JSON.stringify(ctaLay));
  await A.size(1440);
  await A.eval(`document.querySelector('.talk-cta a').click()`);
  check('start screen with Normal/Challenge', await A.waitFor(`document.querySelectorAll('input[name="mode"]').length === 2`));
  await A.shot(`${PRODUCT}-01-start-1440`);
  await A.eval(`document.querySelector('input[name="mode"][value="challenge"]').click()`);
  await A.click('→', '[data-cc="start"]');
  check('deterministic opening shown without an AI call', await A.waitFor(`document.querySelectorAll('.talk-log .turn-voice').length === 1`));
  const c1 = Object.values(await convs(A))[0];
  check('episode created in Challenge with the card opening and frozen versions', c1 && c1.mode === 'challenge' && c1.turns[0].clientId === 'card_opening' && c1.characterCardVersion === '1', c1 && `${c1.characterId}@${c1.characterCardVersion}`);

  // keyboard: Shift+Enter newline, Enter sends
  await A.type('#talk-input', 'I think the bakery shows understanding');
  await A.eval(`(() => { const t = document.querySelector('#talk-input'); t.setSelectionRange(t.value.length, t.value.length); })()`);
  await A.key('Enter', 8);
  const afterShift = await A.eval(`document.querySelector('#talk-input').value`);
  check('Shift+Enter adds a line break and does not send', afterShift.includes('\n') && (await A.eval(`document.querySelectorAll('.talk-log .turn-you').length`)) === 0);
  await A.type('#talk-input', 'I am agree that you understood, but it does not prove the words were still there since years.');
  await A.key('Enter');
  check('Enter sends; thinking state visible', await A.waitFor(`document.querySelectorAll('.talk-log .turn-you').length === 1`, 3000));
  check('character reply arrives', await A.waitFor(`document.querySelectorAll('.talk-log .turn-voice').length === 2`));
  check('focus stays in the composer after the reply', await A.eval(`document.activeElement && document.activeElement.id === 'talk-input'`));
  check('no inline correction in the transcript', await A.eval(`!/you should say|correct form|better way to say/i.test(document.querySelector('.talk-log').textContent)`));

  // WHAT DID THEY MEAN
  await A.eval(`[...document.querySelectorAll('[data-cc="explain"]')].pop().click()`);
  check('meaning help appears outside the persona', await A.waitFor(`[...document.querySelectorAll('.aid')].some(a => a.textContent.length > 40)`));
  // HELP ME SAY THIS → use → send
  await A.click(L.helpSay, '[data-cc="helpopen"]');
  check('help panel opens with focus in the intent field', await A.waitFor(`document.activeElement && document.activeElement.id === 'talk-intent'`));
  await A.key('Escape');
  check('Escape closes help and returns focus to its button', await A.waitFor(`!document.querySelector('#talk-help') && document.activeElement && document.activeElement.dataset.cc === 'helpopen'`));
  await A.click(L.helpSay, '[data-cc="helpopen"]');
  await A.type('#talk-intent', 'quero dizer que não estou totalmente convencida');
  await A.eval(`document.querySelector('#talk-help form button[type="submit"]').click()`);
  check('formulations returned', await A.waitFor(`document.querySelectorAll('.talk-options li').length >= 2`));
  await A.shot(`${PRODUCT}-02-help-1440`);
  await A.eval(`document.querySelector('.talk-options button').click()`);
  const inserted = await A.eval(`document.querySelector('#talk-input').value`);
  await A.type('#talk-input', inserted + ' Maybe it is only a head start.');
  await A.key('Enter');
  await A.waitFor(`document.querySelectorAll('.talk-log .turn-voice').length === 3`);
  const c2 = Object.values(await convs(A))[0];
  const scaffolded = c2.turns.filter(t => t.role === 'user')[1];
  check('adapted help-based reply is stored as scaffolded and linked to the help', scaffolded && scaffolded.provenance === 'scaffolded' && !!scaffolded.assistanceId, scaffolded && scaffolded.provenance);
  check('UI marks it as written with help', await A.eval(`document.querySelector('.talk-log').textContent.includes(${JSON.stringify(L.withHelp)})`));

  // refresh keeps everything
  await A.cmd('Page.reload'); await sleep(1500);
  check('refresh: transcript restored', await A.waitFor(`document.querySelectorAll('.talk-log .turn').length === 5`, 10000));
  await sleep(1500);
  const docsA = await serverDocs(A);
  check('synced to the server as a conversation document', docsA.length === 1 && docsA[0].data.turns.length >= 6, `${docsA.length} doc(s)`);

  /* Device B: another browser context (separate storage) = logout/login elsewhere */
  const { browserContextId: ctxB } = await send('Target.createBrowserContext');
  const B = await newPage(ctxB);
  await B.size(390, 844);
  check('B: signed in', await signIn(B, email));
  await B.goto(`${BASE}/#talk${L.unit}`);
  check('B: same conversation hydrated from the server', await B.waitFor(`document.querySelectorAll('.talk-log .turn').length === 5`, 10000));
  await B.shot(`${PRODUCT}-03-conversation-390`);

  // Concurrent branch: B offline writes, A online writes, B reconnects
  await B.cmd('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await B.eval(`window.dispatchEvent(new Event('offline'))`);
  await B.type('#talk-input', 'Written on the phone while offline.'); await B.key('Enter');
  await B.waitFor(`document.querySelectorAll('.talk-log .turn-you').length === 3`, 4000);
  await A.type('#talk-input', 'Written on the laptop at the same time.'); await A.key('Enter');
  await A.waitFor(`document.querySelectorAll('.talk-log .turn-voice').length === 4`);
  await sleep(1200);
  await B.cmd('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await B.eval(`window.dispatchEvent(new Event('online'))`);
  check('B: branch surfaces as an explicit choice, nothing silently chosen', await B.waitFor(`!!document.querySelector('.talk-conflict .talk-fork')`, 12000));
  await B.eval(`document.querySelector('.talk-conflict').scrollIntoView({ block: 'start' })`);
  await B.shot(`${PRODUCT}-04-branch-390`);
  const lay = await layout(B);
  check('B: branch UI fits 390px', !lay.over && !lay.cut.length, JSON.stringify(lay));
  const docsAfter = await serverDocs(B);
  const texts = docsAfter[0].data.turns.map(t => t.text);
  check('no turn lost in the merge', texts.includes('Written on the phone while offline.') && texts.includes('Written on the laptop at the same time.'));
  await B.eval(`[...document.querySelectorAll('.talk-fork li')].find(li => li.textContent.includes('laptop')).querySelector('button').click()`);
  check('B: choosing a version resolves and keeps the other aside', await B.waitFor(`!document.querySelector('.talk-conflict') && !!document.querySelector('.talk-aside')`, 6000));

  // END → REVIEW → refresh → frozen → CONTINUE (on A)
  await sleep(1500);
  await A.goto(`${BASE}/#talk${L.unit}`); await A.waitFor(`!!document.querySelector('[data-cc="end"]')`, 8000);
  await A.click(L.end, '[data-cc="end"]');
  check('END asks for confirmation inline (no browser dialog)', await A.waitFor(`!!document.querySelector('.talk-confirm')`));
  await A.click(L.endYes, '[data-cc="endyes"]');
  const tall = await A.eval(`[...document.querySelectorAll('.talk .btn')].filter(b => b.getBoundingClientRect().height > 70).map(b => { const c = getComputedStyle(b); return { text: b.textContent.trim().slice(0, 30), h: b.getBoundingClientRect().height, w: b.getBoundingClientRect().width, pad: c.padding, fs: c.fontSize, lh: c.lineHeight, display: c.display, minH: c.minHeight, ar: c.aspectRatio, parent: b.parentElement.className }; })`);
  check('buttons keep their normal size', !tall.length, JSON.stringify(tall));
  check('ended: no composer, review offered', await A.waitFor(`!document.querySelector('#talk-input') && !!document.querySelector('[data-cc="review"]')`));
  const ended = Object.values(await convs(A)).find(c => c.status === 'ended');
  check('ended episode frozen at a turn', ended && ended.endedAtTurnId && ended.endedAt);
  await A.click(L.review, '[data-cc="review"]');
  check('review shows the four sections, no score', await A.waitFor(`${JSON.stringify(L.reviewH)}.every(h => document.querySelector('.talk-review').textContent.includes(h))`, 8000) && await A.eval(`!/score|\\/100|winner|\\d+%/i.test(document.querySelector('.talk-review').textContent)`));
  await A.shot(`${PRODUCT}-05-review-1440`);
  await A.cmd('Page.reload'); await sleep(1500);
  check('refresh: review still there and frozen (no review button)', await A.waitFor(`!!document.querySelector('.talk-review') && !document.querySelector('[data-cc="review"]')`, 10000));
  /* E1: explicit Error Log action (the Language Bank is retired) and Review → Profile */
  check('review footer says the conversation counts as written Profile evidence', await A.eval(`document.querySelector('.rv-foot').textContent.includes("counts as one piece of written evidence")`));
  const acts = await A.eval(`[...document.querySelectorAll('.talk-review .rv-cat')].map(c => ({ cat: c.querySelector('.rv-cat-k').className, buttons: [...c.querySelectorAll('.rv-act')].map(b => b.textContent.trim()) }))`);
  const errCat = acts.find(a => a.cat.includes('cat-error')), regCat = acts.find(a => a.cat.includes('cat-register'));
  check('Error Log offered only for the error; no Language Bank action anywhere', errCat && errCat.buttons.includes("ADD TO ERROR LOG") && regCat && regCat.buttons.length === 0 && await A.eval(`!document.querySelector('[data-cc^="bank"]') && !/LANGUAGE BANK/i.test(document.querySelector('.talk-review').innerText)`), JSON.stringify(acts));
  const nothingYet = await A.eval(`(() => { const s = JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))); return (s.errs || []).filter(e => e.source === 'character_conversation').length + (s.bank || []).filter(b => String(b.ref || '').startsWith('conversation:')).length; })()`);
  check('nothing is saved automatically', nothingYet === 0, String(nothingYet));
  await A.eval(`[...document.querySelectorAll('.talk-review .rv-cat')].find(c => c.querySelector('.cat-error')).querySelector('.rv-act').click()`);
  await A.eval(`[...document.querySelectorAll('.talk-review .rv-cat')].find(c => c.querySelector('.cat-error')).querySelector('.rv-act').click()`);
  const saved = await A.eval(`(() => { const s = JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))); return { errs: (s.errs || []).filter(e => e.source === 'character_conversation'), bank: (s.bank || []).filter(b => String(b.ref || '').startsWith('conversation:')) }; })()`);
  check('Error Log entry saved once, in the product\'s own shape', saved.errs.length === 1 && saved.errs[0].mine === "since years" && !!saved.errs[0].ref, JSON.stringify(saved.errs));
  check('nothing saved to the retired Language Bank', saved.bank.length === 0, JSON.stringify(saved.bank));
  await A.cmd('Page.reload'); await sleep(1500); await A.waitFor(`!!document.querySelector('.talk-review')`, 10000);
  check('after refresh the saved action stays marked as saved', await A.eval(`[...document.querySelectorAll('.rv-act')].filter(b => b.disabled).length >= 1`));
  const prof = await A.eval(`(() => { const s = JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))); const P = window.KLANG_PROFILE; if (!P) return null; return (() => { const ev = P.harvestEvidence(s, { units: window.KLANG.units }).filter(e => e.source === 'character_conversation'); return { count: ev.length, spoken: ev.some(e => e.contributions.spoken_production !== undefined) }; })(); })()`);
  check('the real Profile engine in the page counts the conversation once, as written evidence', prof && prof.count === 1 && !prof.spoken, JSON.stringify(prof));
  await A.goto(`${BASE}/#errors`); await sleep(400);
  check('the entry appears on the Error Log page', await A.eval(`document.querySelector('#main').innerHTML.includes("since years")`));
  await A.goto(`${BASE}/#talk${L.unit}`); await A.waitFor(`!!document.querySelector('.talk-review')`, 8000);
  const beforeReview = JSON.stringify((Object.values(await convs(A)).find(c => c.status === 'ended') || {}).reviewState);
  await A.click(L.cont, '[data-cc="continue"]');
  check('CONTINUE creates a new episode linked to the old one', await A.waitFor(`document.querySelectorAll('.talk-log .turn-voice').length === 1 && !!document.querySelector('.talk-earlier')`));
  const all = Object.values(await convs(A));
  const next = all.find(c => c.continuesFrom);
  const old = all.find(c => next && c.conversationId === next.continuesFrom);
  check('old episode untouched (still ended, same review)', old && old.status === 'ended' && JSON.stringify(old.reviewState) === beforeReview);
  check('continuation keeps the card version (inherited)', next && next.versionPolicy === 'inherited' && next.characterCardVersion === old.characterCardVersion);

  /* Demo (server is the authority; the page only explains) */
  if (PRODUCT === 'mind') {
    const { browserContextId: ctxD } = await send('Target.createBrowserContext');
    const D = await newPage(ctxD);
    await D.size(375, 812);
    await signIn(D, demoEmail);
    events.length = 0;
    await D.goto(`${BASE}/#talk${L.unit}`);
    check('Demo: feature visible, composer disabled, explained', await D.waitFor(`document.querySelector('.talk-note') && document.querySelector('.talk-note').textContent.includes(${JSON.stringify(L.demo)}) && document.querySelector('#talk-input').disabled`, 8000));
    const aiCalls = events.filter(e => e.method === 'Network.requestWillBeSent' && /\/api\/ai\/(character-chat|conversation-)/.test(e.params.request.url));
    check('Demo: no AI request made', aiCalls.length === 0);
    const direct = await D.eval(`fetch('/api/ai/character-chat', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: '{}' }).then(r => r.status)`);
    check('Demo: server refuses character-chat (403) even when called directly', direct === 403, String(direct));
    await D.shot(`${PRODUCT}-06-demo-375`);
  }

  /* Baseline: existing pages at 320px (tells a pre-existing overflow apart from the conversation UI) */
  await A.size(320, 740);
  for (const h of ['#home', `#u${L.unit}-read`]) {
    await A.goto(`${BASE}/${h}`); await sleep(400);
    const b = await A.eval(`(() => { const vw = document.documentElement.clientWidth; return { vw, over: document.documentElement.scrollWidth > vw + 1, topbarButton: (() => { const x = document.querySelector('#topbar button'); if (!x) return null; const r = x.getBoundingClientRect(); return { text: x.textContent.trim(), right: Math.round(r.right) }; })(), sync: (document.querySelector('#topbar-sync') || {}).textContent }; })()`);
    console.log(`INFO  baseline ${h} at 320px: ${JSON.stringify(b)}`);
  }
  await A.size(1440);

  /* Mobile / widths on the live conversation and the review */
  await A.goto(`${BASE}/#talk${L.unit}`); await A.waitFor(`!!document.querySelector('.talk-log')`);
  await A.click(L.helpSay, '[data-cc="helpopen"]');
  for (const w of [320, 375, 390, 393, 430, 768, 1440]) {
    await A.size(w, w < 768 ? 740 : 900);
    const l = await layout(A);
    const composer = await A.eval(`(() => { window.scrollTo(0, document.documentElement.scrollHeight); const f = document.querySelector('.talk-compose'); if (!f) return null; const r = f.getBoundingClientRect(); return r.bottom <= innerHeight + 1 && r.top >= 0; })()`);
    check(`${w}px: no horizontal overflow, nothing cut, composer in viewport`, !l.over && !l.cut.length && !l.clipped.length && composer !== false, JSON.stringify({ ...l, composer }));
    if ([320, 390, 768].includes(w)) await A.shot(`${PRODUCT}-07-live-${w}`);
  }
  await A.goto(`${BASE}/#talk${L.unit}-${old.conversationId}`);
  for (const w of [320, 1440]) { await A.size(w, 800); await A.waitFor(`!!document.querySelector('.talk-review')`); const l = await layout(A); check(`review at ${w}px fits`, !l.over && !l.cut.length, JSON.stringify(l)); await A.shot(`${PRODUCT}-08-review-${w}`); }
  await A.cmd('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  check('reduced motion: no animation on the thinking dots', await A.eval(`(() => { const d = document.createElement('span'); d.className = 'talk-dots'; document.body.appendChild(d); const a = getComputedStyle(d).animationName; d.remove(); return a === 'none'; })()`));
} catch (err) {
  check('E2E crashed', false, err.stack || String(err));
} finally {
  await prisma.user.deleteMany({ where: { email: { in: [email, demoEmail] } } }).catch(() => {});
  await prisma.$disconnect();
  try { ws && ws.close(); } catch { }
  chrome.kill();
  const failed = results.filter(r => !r.ok);
  fs.writeFileSync(path.join(OUT, `${PRODUCT}-results.json`), JSON.stringify(results, null, 2));
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  process.exit(failed.length ? 1 : 0);
}
