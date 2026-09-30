import fs from 'fs';
import path from 'path';
import vm from 'vm';

// Loads the real browser book (content + app.js) into a minimal fake DOM, so pages can be
// rendered to HTML strings and clicks dispatched without a browser.
const root = path.resolve(__dirname, '../..');
export const BOOK = (() => {
  const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
  return (html.match(/data-book="([^"]+)"/) || [])[1].split(/\s+/).filter(Boolean);
})();

// opts.sync: also load the real sync.js first, signed in as opts.sync.user, so remote documents
// arrive through the real hydration path (fetch answers /api/docs; nothing leaves the process).
export function loadApp(initialState?: any, opts: { fetch?: (url: string, init: any) => any; sync?: { user: any } } = {}) {
  const storage = new Map<string, string>();
  const fixtureOwner = opts.sync?.user?.id || 'test-user';
  const fixtureKey = (base: string) => base + '.account:' + encodeURIComponent(fixtureOwner);
  if (initialState) storage.set(fixtureKey('klang.mind.v1'), JSON.stringify(initialState));
  const listeners: Record<string, Function[]> = {};
  const on = (scope: string) => (ev: string, fn: Function) => ((listeners[scope + ev] ||= []).push(fn));
  const el = (): any => ({
    innerHTML: '', textContent: '', value: '', style: {}, dataset: {}, hidden: false,
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    querySelector: () => null, querySelectorAll: () => [], insertAdjacentHTML() {}, appendChild() {},
    addEventListener() {}, setAttribute() {}, removeAttribute() {}, remove() {}, focus() {}, scrollIntoView() {},
    getBoundingClientRect: () => ({ top: 0, left: 0, bottom: 0, width: 0 }),
  });
  const els: Record<string, any> = { '#main': el(), '#side': el(), '#topbar': el(), '#toast': el(), '#rprog': el() };
  const fetches: { url: string; body: any }[] = [];
  const location = { hash: '#home', href: 'http://localhost/', origin: 'http://localhost' };
  const document: any = {
    querySelector: (s: string) => els[s] || null,
    querySelectorAll: () => [],
    addEventListener: on('doc:'),
    body: el(),
    documentElement: { style: { setProperty() {} }, scrollHeight: 0 },
    createElement: el,
    getElementById: () => null,
    visibilityState: 'visible',
    currentScript: { dataset: { book: '' } },
  };
  const ctx: any = {
    document, location,
    localStorage: { getItem: (k: string) => storage.get(k) ?? null, setItem: (k: string, v: string) => storage.set(k, String(v)), removeItem: (k: string) => storage.delete(k) },
    sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    Headers, encodeURIComponent, AbortController, navigator: {}, CSS: { escape: (s: string) => s }, console, Math, Date, JSON, URL,
    setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    innerWidth: 1200, innerHeight: 800, scrollX: 0, scrollY: 0, scrollTo() {},
    addEventListener: on('win:'),
    getSelection: () => null,
    fetch: async (url: string, init: any) => {
      const body = init && init.body ? JSON.parse(init.body) : null;
      fetches.push({ url, body });
      if (url === '/api/ai/status') {
        const r = opts.fetch ? await opts.fetch(url, body) : null;
        if (r && r.status !== 503) return { ok: r.status >= 200 && r.status < 300, status: r.status, json: async () => r.body };
        return { ok: true, status: 200, json: async () => ({ available: true, configured: true, write: true, explain: true, speak: true, registerCompare: true }) };
      }
      const r = opts.fetch ? await opts.fetch(url, body) : { status: 503, body: {} };
      return { ok: r.status >= 200 && r.status < 300, status: r.status, json: async () => r.body };
    },
  };
  ctx.window = ctx;
  if (opts.sync) {
    Object.assign(ctx, { encodeURIComponent, EventSource: class { addEventListener() {} close() {} }, KLANG_AUTH: { user: opts.sync.user, sessionExpired() {}, signedOut() {} } });
    ctx.navigator.onLine = true;
  }
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'public/ownership.js'), 'utf8'), ctx);
  ctx.KLANG_OWNERSHIP.bind({ id: fixtureOwner });
  if (opts.sync) vm.runInContext(fs.readFileSync(path.join(root, 'public/sync.js'), 'utf8'), ctx, { filename: 'sync.js' });
  for (const f of BOOK) {
    if (f === 'boot.js') continue;
    vm.runInContext(fs.readFileSync(path.join(root, 'public', f), 'utf8'), ctx, { filename: f });
  }
  const state = () => JSON.parse(storage.get(fixtureKey('klang.mind.v1')) || '{}');
  const go = (hash: string) => { location.hash = '#' + hash; (listeners['win:hashchange'] || []).forEach(fn => fn()); return els['#main'].innerHTML as string; };
  const fire = (type: string, target: any) => (listeners['doc:' + type] || []).forEach(fn => fn({ target, preventDefault() {} }));
  const click = (dataset: Record<string, string>) => {
    const t: any = { dataset: { ...dataset }, classList: { contains: () => false, toggle() {} }, textContent: '', disabled: false, isConnected: true };
    t.closest = (sel: string) => {
      const parts = sel.split(',').map(s => s.trim());
      for (const p of parts) {
        if (p === 'button' || p === 'a' || p === '.vw' || p === '#stage' || p === '#pop' || p === '#modal') return t;
        if (p.startsWith('[data-')) {
          const m = p.match(/^\[data-([a-z0-9_-]+)(?:="([^"]+)")?\]$/i);
          if (m) {
            const key = m[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            const val = dataset[key] ?? dataset[m[1]];
            if (val !== undefined && (m[2] === undefined || val === m[2])) return t;
          }
        }
      }
      return null;
    };
    fire('click', t);
    return t;
  };
  const type = (k: string, value: string) => fire('input', { dataset: { k }, tagName: 'TEXTAREA', value });
  const select = (k: string, value: string) => fire('change', { dataset: { k }, tagName: 'SELECT', value, type: 'select-one' });
  const side = () => els['#side'].innerHTML as string;
  return { ctx, go, click, type, select, fire, state, fetches, storage, side, html: () => els['#main'].innerHTML as string };
}
