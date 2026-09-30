import fs from 'fs';
import path from 'path';
import vm from 'vm';

// Loads public/sync.js into a minimal fake browser so its local-first logic can
// be tested without a real browser. fetchImpl receives (url, options).
// Bare revision/pending fixture keys represent owned account-u metadata, not legacy data.
// Real legacy quarantine is covered by accountOwnership.test.ts and browser E2E.
export type FetchImpl = (url: string, opts: any) => Promise<{ status: number; body: any } | 'network-error'>;

export function loadSyncClient(fetchImpl: FetchImpl, initialStorage: Record<string, string> = {}) {
  const storage = new Map(Object.entries(initialStorage).map(([k, v]) => [['klang.mind.revs.v1', 'klang.mind.pending.v1'].includes(k) ? k + '.account:u' : k, v]));
  const listeners: Record<string, Function[]> = {};
  const fakeElement = (): any => ({
    style: {},
    setAttribute() {},
    appendChild() {},
    remove() {},
    querySelector: () => null,
    addEventListener() {},
    set innerHTML(_v: string) {},
    set textContent(_v: string) {},
  });
  const modals: string[] = [];
  const document = {
    visibilityState: 'visible',
    querySelectorAll: () => [],
    getElementById: () => null,
    createElement: fakeElement,
    addEventListener: (ev: string, fn: Function) => ((listeners['doc:' + ev] ||= []).push(fn)),
    body: { appendChild: (el: any) => modals.push(el.id || 'el') },
  };
  const window: any = {
    addEventListener: (ev: string, fn: Function) => ((listeners[ev] ||= []).push(fn)),
  };
  const context: any = {
    window,
    document,
    navigator: { onLine: true },
    localStorage: {
      getItem: (k: string) => (storage.has(k) ? storage.get(k)! : null),
      setItem: (k: string, v: string) => storage.set(k, String(v)),
      removeItem: (k: string) => storage.delete(k),
    },
    EventSource: class {
      addEventListener() {}
      close() {}
    },
    fetch: async (url: string, opts: any) => {
      const r = await fetchImpl(url, opts);
      if (r === 'network-error') throw new TypeError('Failed to fetch');
      return { ok: r.status >= 200 && r.status < 300, status: r.status, json: async () => r.body };
    },
    setTimeout,
    clearTimeout,
    console,
    Headers, URL, location: { href: 'http://localhost/', origin: 'http://localhost' },
    AbortController,
    Math,
    Date,
    JSON,
    encodeURIComponent,
  };
  Object.assign(context, window);
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.resolve(__dirname, '../../public/ownership.js'), 'utf8'), context);
  const conversationCode = fs.readFileSync(path.resolve(__dirname, '../../public/conversation-engine.js'), 'utf8');
  vm.runInContext(conversationCode, context);
  vm.runInContext(fs.readFileSync(path.resolve(__dirname, '../../public/study-timer.js'), 'utf8'), context);
  const code = fs.readFileSync(path.resolve(__dirname, '../../public/sync.js'), 'utf8');
  vm.runInContext(code, context);
  return { api: context.KLANG_SYNC, storage, context, modals, fire: (ev: string) => (listeners[ev] || []).forEach((f) => f()) };
}

export const flush = () => new Promise((r) => setTimeout(r, 0));
