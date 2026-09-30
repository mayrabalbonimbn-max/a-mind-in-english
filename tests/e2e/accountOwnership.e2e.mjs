/* Account-switch regressions. Local fake server and disposable test users only. */
import puppeteer from 'puppeteer-core';
import { PrismaClient } from '@prisma/client';
const BASE = process.env.BASE || 'http://127.0.0.1:3491';
if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(BASE) || !/_test\b|_test$/.test(process.env.DATABASE_URL || '')) throw new Error('Local test targets only');
const prisma = new PrismaClient(), emails = [], results = [], errors = [], providerCalls = [];
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const check = (name, ok) => { results.push(!!ok); console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); };
async function account() {
  const email = `ownership-${crypto.randomUUID()}@example.com`; emails.push(email);
  const r = await fetch(BASE + '/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'Password123!' }) });
  if (!r.ok) throw new Error('register failed'); return { email, id: (await r.json()).user.id };
}
async function newPage(context) {
  const p = await context.newPage(); p.on('pageerror', e => errors.push(e.message));
  await p.setRequestInterception(true);
  p.on('request', r => {
    if (!r.url().startsWith(BASE) && !/^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(r.url()) && !/^(blob|data):/.test(r.url())) { providerCalls.push(r.url()); return r.abort(); }
    if (p.holdReads && r.url() === BASE + '/api/docs' && r.method() === 'GET') { p.heldRead = r; return; }
    if (p.blockWrites && /\/api\/(docs|sync\/batch)/.test(r.url()) && r.method() !== 'GET') return r.abort();
    if (p.freezeReload && r.url() === BASE + '/api/auth/me') return r.abort();
    r.continue();
  });
  await p.goto(BASE); return p;
}
async function signIn(p, account) {
  await p.waitForSelector('#gate-form'); await p.type('input[name=email]', account.email); await p.type('input[name=password]', 'Password123!'); await p.click('#gate-form button');
  await p.waitForFunction(() => window.KLANG_SYNC?.getUser() && !document.body.classList.contains('gated'));
}
const saved = p => p.waitForFunction(() => window.KLANG_SYNC?.getStatus() === 'saved_to_cloud');
const local = p => p.evaluate(() => JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))));
async function docs(p) { return p.evaluate(async () => (await (await fetch('/api/docs')).json()).documents); }
async function rawRecording(p, value) { return p.evaluate(async v => { if (v) await window.KLANG_MEDIA.put('same-attempt', new Blob([v], { type: 'audio/webm' })); const b = await window.KLANG_MEDIA.get('same-attempt'); return b ? await b.text() : null; }, value); }
try {
  const A = await account(), B = await account(), context = await browser.createBrowserContext();
  const p = await newPage(context);
  const legacy = JSON.stringify({ a: { '01:q': 'UNOWNED LEGACY WORK' }, sp: [{ id: 'legacy-attempt', transcript: 'legacy private transcript' }] });
  await p.evaluate(async raw => {
    localStorage.setItem('klang.mind.v1', raw); localStorage.setItem('klang.mind.pending.v1', '["unit:01"]'); localStorage.setItem('klang.mind.revs.v1', '{"unit:01":7}');
    const db = await new Promise((resolve, reject) => { const r = indexedDB.open('klang-private-recordings-v1', 1); r.onupgradeneeded = () => r.result.createObjectStore('recordings'); r.onsuccess = () => resolve(r.result); r.onerror = reject; });
    await new Promise((resolve, reject) => { const t = db.transaction('recordings', 'readwrite'); t.objectStore('recordings').put(new Blob(['legacy recording']), 'same-attempt'); t.oncomplete = resolve; t.onerror = reject; }); db.close();
  }, legacy);
  await signIn(p, A); await saved(p);
  check('legacy work is not assigned to first signed-in account', !JSON.stringify(await local(p)).includes('UNOWNED'));
  check('legacy pending queue is not uploaded', !(await docs(p)).some(d => JSON.stringify(d.data).includes('UNOWNED')));
  check('legacy recordings are not automatically attached', await rawRecording(p) === null);
  await p.evaluate(() => location.hash = '#u01-think'); await p.waitForSelector('#stage textarea[data-k]');
  const key = await p.$eval('#stage textarea[data-k]', t => t.dataset.k);
  await p.evaluate((k) => { const t = document.querySelector(`textarea[data-k="${k}"]`); t.value = 'ACCOUNT A OWNED WORK'; t.dispatchEvent(new Event('input', { bubbles: true })); }, key); await saved(p);
  check('A work created and synced with A ownership', (await docs(p)).some(d => JSON.stringify(d.data).includes('ACCOUNT A OWNED WORK')));
  check('A recording stored', await rawRecording(p, 'A recording') === 'A recording');
  // Keep one pending A edit while a second same-origin tab changes the cookie to B.
  const stale = await newPage(context); await stale.waitForFunction(() => window.KLANG_SYNC?.getUser()); await saved(stale);
  stale.freezeReload = true;
  // Keep this test tab alive after relock to observe cancellation of an actual browser request.
  await stale.evaluate(() => { window.KLANG_AUTH.accountChanged = window.KLANG_AUTH.sessionExpired = () => document.body.classList.add('gated'); const Native = window.AbortController; window.AbortController = class extends Native { constructor() { super(); window.__ownershipSignal = this.signal; } }; });
  stale.holdReads = true;
  await stale.evaluate(() => { window.__lateResult = 'waiting'; fetch('/api/docs').then(r => r.json()).then(() => { window.__lateResult = 'accepted'; }, () => { window.__lateResult = 'rejected'; }); window.__lateSignal = window.__ownershipSignal; });
  while (!stale.heldRead) await new Promise(resolve => setTimeout(resolve, 10));
  const switcher = await newPage(context); await switcher.waitForFunction(() => window.KLANG_SYNC?.getUser()); await saved(switcher);
  switcher.blockWrites = true;
  p.blockWrites = true;
  await p.evaluate((k) => { const t = document.querySelector(`textarea[data-k="${k}"]`); t.value = 'ACCOUNT A PENDING WORK'; t.dispatchEvent(new Event('input', { bubbles: true })); }, key);
  await p.waitForFunction(() => JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.pending.v1'))).includes('unit:01'));
  await p.evaluate(k => {
    const stateKey = window.KLANG_OWNERSHIP.key('klang.mind.v1'), s = JSON.parse(localStorage.getItem(stateKey));
    s.a['r7:owned'] = 'ACCOUNT A review'; s.a[k + ':support'] = { at: new Date().toISOString(), level: 'low', beforeWriting: true };
    s.ud['01'] = true; s.rd['7'] = true; s.md['1'] = true; s.gl['01:v:fluency'] = 'know';
    s.glx = [{ id: 'owned-glossary', word: 'ACCOUNT A glossary' }]; s.bm = ['01'];
    s.errs = [{ id: 'owned-error', mine: 'ACCOUNT A error', corr: 'correction', why: 'reason', ex: '', n: 1, last: '2026-09-30' }];
    s.pf[k] = { text: 'ACCOUNT A portfolio', fb: [] }; s.ca = [{ id: 'owned-news', topic: 'ACCOUNT A current affairs' }];
    s.sp = [{ id: 'same-attempt', unit: '01', activityId: 's1', transcript: 'ACCOUNT A transcript', date: new Date().toISOString(), duration: 1 }];
    s.study = { activeSession: null, sessions: [{ id: 'owned-timer', startedAt: '2026-09-30T09:00:00Z', endedAt: '2026-09-30T09:10:00Z', durationSeconds: 600, endReason: 'manual' }] };
    s.learningJudgments = { owned_pattern: { judgment: 'agree', updatedAt: new Date().toISOString() } };
    localStorage.setItem(stateKey, JSON.stringify(s));
    localStorage.setItem(window.KLANG_OWNERSHIP.key('klang.mind.pending.v1'), JSON.stringify(['unit:01', 'review:7', 'progress', 'glossary', 'error-log', 'portfolio', 'bookmarks', 'current-affairs', 'speaking', 'study-timer']));
    localStorage.setItem(window.KLANG_OWNERSHIP.key('klang.mind.talkclient.v1'), '{"id":"A-private-client","seq":5}');
    sessionStorage.setItem(window.KLANG_OWNERSHIP.key('klang.mind.talkdraft.v1'), '{"draft":"ACCOUNT A draft"}');
  }, key);
  await switcher.evaluate(async () => { await fetch('/api/auth/logout', { method: 'POST' }); });
  switcher.blockWrites = false;
  await switcher.reload(); await signIn(switcher, B); await saved(switcher);
  check('B sees none of A answers or transcripts', !JSON.stringify(await local(switcher)).includes('ACCOUNT A') && (await local(switcher)).sp.length === 0);
  check('all persisted learner domains are isolated from B', await switcher.evaluate(() => { const s = JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))); return !s.ud['01'] && !s.rd['7'] && !s.md['1'] && !s.gl['01:v:fluency'] && !s.glx.length && !s.errs.length && !Object.keys(s.pf).length && !s.bm.length && !s.ca.length && !s.study.sessions.length && !Object.keys(s.learningJudgments).length && !localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.talkclient.v1')) && !sessionStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.talkdraft.v1')); }));
  check('B sync contains no A pending data', !(await docs(switcher)).some(d => JSON.stringify(d.data).includes('ACCOUNT A')));
  check('B cannot read A IndexedDB recording with same attempt id', await rawRecording(switcher) === null);
  check('B recording has its own store', await rawRecording(switcher, 'B recording') === 'B recording');
  await stale.waitForFunction(() => document.body.classList.contains('gated'));
  check('in-flight browser request is aborted after account switch', await stale.evaluate(() => window.__lateSignal.aborted));
  stale.holdReads = false; await stale.heldRead.abort().catch(() => {});
  await stale.waitForFunction(() => window.__lateResult === 'rejected');
  check('in-flight browser response cannot hydrate a changed account', await stale.evaluate(() => window.__lateResult === 'rejected'));
  check('stale A tab relocks on account switch', await stale.evaluate(() => document.body.classList.contains('gated')));
  // A captured owner with the now-current B cookie cannot be accepted, even if dispatched late.
  const cookies = await context.cookies(), cookie = cookies.map(c => `${c.name}=${c.value}`).join('; ');
  const delayed = await fetch(BASE + '/api/docs/unit:01', { method: 'PUT', headers: { Cookie: cookie, 'X-Learner-Id': A.id, 'Content-Type': 'application/json' }, body: JSON.stringify({ data: { answers: { [key]: 'DELAYED A REQUEST' } }, baseRevision: 0 }) });
  check('pending A request cannot be accepted as B work', delayed.status === 403);
  check('B remains uncontaminated after delayed A request', !(await docs(switcher)).some(d => JSON.stringify(d.data).includes('ACCOUNT A') || JSON.stringify(d.data).includes('DELAYED')));
  const pendingA = await switcher.evaluate(id => JSON.parse(localStorage.getItem('klang.mind.pending.v1.account:' + encodeURIComponent(id))), A.id);
  check('A pending queue remains owned and recoverable', pendingA.includes('unit:01'));
  await switcher.reload(); await switcher.waitForFunction(() => window.KLANG_SYNC?.getUser()); await saved(switcher);
  check('refresh after B switch keeps B state isolated', !JSON.stringify(await local(switcher)).includes('ACCOUNT A') && await rawRecording(switcher) === 'B recording');
  check('unowned legacy state and queue remain byte-for-byte intact', await switcher.evaluate(raw => localStorage.getItem('klang.mind.v1') === raw && localStorage.getItem('klang.mind.pending.v1') === '["unit:01"]' && localStorage.getItem('klang.mind.revs.v1') === '{"unit:01":7}', legacy));
  check('explicit recovery copy labels legacy ownership unassigned', await switcher.evaluate(raw => { const copy = window.KLANG_OWNERSHIP.legacyRecovery(); return copy.ownership === 'unassigned' && copy.rawLegacyState === raw; }, legacy));
  // Freeze old B tabs so they do not immediately re-enter A and flush the pending queue before verification.
  p.blockWrites = false; p.freezeReload = true;
  await switcher.evaluate(async () => { await window.KLANG_SYNC.logout(); }); await switcher.waitForSelector('#gate-form');
  await signIn(switcher, A); await saved(switcher);
  check('switch back to A recovers A pending answer', (await local(switcher)).a[key] === 'ACCOUNT A PENDING WORK');
  check('recovered A pending work syncs only to A', (await docs(switcher)).some(d => JSON.stringify(d.data).includes('ACCOUNT A PENDING WORK')));
  check('A recovers glossary, progress, portfolio, transcript, timer and judgment cache', await switcher.evaluate(() => { const s = JSON.parse(localStorage.getItem(window.KLANG_OWNERSHIP.key('klang.mind.v1'))); return s.ud['01'] && s.rd['7'] && s.gl['01:v:fluency'] === 'know' && s.sp[0]?.transcript === 'ACCOUNT A transcript' && s.study.sessions.some(x => x.id === 'owned-timer') && s.learningJudgments.owned_pattern?.judgment === 'agree' && JSON.stringify(s.pf).includes('ACCOUNT A portfolio'); }));
  check('switch back to A recovers A recording', await rawRecording(switcher) === 'A recording');
  const bdocs = await prisma.userDocument.findMany({ where: { userId: B.id } });
  check('B database documents never contain A work', bdocs.every(d => !JSON.stringify(d.data).includes('ACCOUNT A') && !JSON.stringify(d.data).includes('DELAYED')));
  check('legacy IndexedDB recording remains safely preserved', await switcher.evaluate(async () => {
    const db = await new Promise(resolve => { const r = indexedDB.open('klang-private-recordings-v1', 1); r.onsuccess = () => resolve(r.result); });
    const blob = await new Promise(resolve => { const r = db.transaction('recordings').objectStore('recordings').get('same-attempt'); r.onsuccess = () => resolve(r.result); }); db.close(); return await blob.text() === 'legacy recording';
  }));
  check('no page JavaScript errors', errors.length === 0); if (errors.length) console.log(errors);
  check('zero real provider requests', providerCalls.length === 0);
} finally {
  await browser.close(); await prisma.user.deleteMany({ where: { email: { in: emails } } }); await prisma.$disconnect();
  console.log(`${results.filter(Boolean).length}/${results.length} passed`);
}
process.exitCode = results.some(x => !x) ? 1 : 0;
