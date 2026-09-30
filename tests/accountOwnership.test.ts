import { describe, it, expect } from 'vitest';
import fs from 'fs';
import vm from 'vm';
function browser(fetchImpl: any = async () => ({ status: 200, json: async () => ({}) }), shared = new Map<string, string>()) {
  const events: Record<string, any> = {};
  let invalidated = 0;
  const ctx: any = { URL, Headers, AbortController, Date, JSON, encodeURIComponent,
    location: { href: 'http://localhost/', origin: 'http://localhost' },
    localStorage: { getItem: (k: string) => shared.get(k) ?? null, setItem: (k: string, v: string) => shared.set(k, v), removeItem: (k: string) => shared.delete(k) },
    addEventListener: (e: string, f: any) => events[e] = f, fetch: fetchImpl,
    KLANG_AUTH: { accountChanged: () => invalidated++ } };
  ctx.window = ctx; vm.createContext(ctx); vm.runInContext(fs.readFileSync('public/ownership.js', 'utf8'), ctx);
  return { ctx, api: ctx.KLANG_OWNERSHIP, shared, events, invalidations: () => invalidated };
}
describe('Immutable local account ownership', () => {
  it('never selects legacy unowned data and never rebinds an existing document', () => {
    const b = browser(); const raw = '{"a":{"01:q":"private legacy"}}'; b.shared.set('klang.mind.v1', raw);
    b.api.bind({ id: 'A' }); expect(b.shared.get(b.api.key('klang.mind.v1'))).toBeUndefined();
    expect(b.api.legacyRecovery().rawLegacyState).toBe(raw);
    expect(() => b.api.bind({ id: 'B' })).toThrow('account_changed');
    expect(b.shared.get('klang.mind.v1')).toBe(raw);
  });
  it('storage change invalidates A and retains A work when B opens; A can recover later', () => {
    const a = browser(); a.api.bind({ id: 'A' }); const key = a.api.key('klang.mind.v1'); a.shared.set(key, 'A work');
    const b = browser(undefined, a.shared); b.api.bind({ id: 'B' }); a.events.storage({ key: 'klang.mind.active-account.v1' });
    expect(a.invalidations()).toBe(1); expect(() => a.api.key('klang.mind.v1')).toThrow('account_changed');
    expect(b.shared.get(b.api.key('klang.mind.v1'))).toBeUndefined();
    const again = browser(undefined, a.shared); again.api.bind({ id: 'A' }); expect(again.shared.get(again.api.key('klang.mind.v1'))).toBe('A work');
  });
  it('stamps the dispatch owner and aborts/rejects a late response after switch', async () => {
    let finish: any, signal: any, headers: any;
    const a = browser((_u: any, opts: any) => { signal = opts.signal; headers = opts.headers; return new Promise(r => finish = r); });
    a.api.bind({ id: 'A' }); const pending = a.ctx.fetch('/api/docs/unit:01', { method: 'PUT', body: '{}' });
    expect(headers.get('X-Learner-Id')).toBe('A'); browser(undefined, a.shared).api.bind({ id: 'B' });
    a.events.storage({ key: 'klang.mind.active-account.v1' }); expect(signal.aborted).toBe(true);
    finish({ status: 200, json: async () => ({ data: 'A' }) }); await expect(pending).rejects.toThrow('account_changed');
  });
  it('refuses body consumption that finishes after an account switch', async () => {
    let finish: any;
    const a = browser(async () => ({ status: 200, json: () => new Promise(r => finish = r) })); a.api.bind({ id: 'A' });
    const response = await a.ctx.fetch('/api/docs'); const body = response.json();
    browser(undefined, a.shared).api.bind({ id: 'B' }); finish({ documents: ['A'] });
    await expect(body).rejects.toThrow('account_changed');
  });
  it('preserves malformed legacy data byte-for-byte for recovery', () => {
    const a = browser(); a.shared.set('klang.mind.v1', '{broken'); a.api.bind({ id: 'A' });
    expect(a.api.legacyRecovery().rawLegacyState).toBe('{broken'); expect(a.api.legacyRecovery().state).toBeNull();
    expect(a.shared.get('klang.mind.v1')).toBe('{broken');
  });
});

it('loads owned revisions before startup edits and preserves them when sync starts', async () => {
  const { loadSyncClient, flush } = await import('./helpers/browserSync');
  const puts: any[] = [];
  const c = loadSyncClient(async (url, opts) => {
    if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u' } } };
    if (url === '/api/docs') return { status: 200, body: { documents: [{ key: 'unit:01', data: {}, revision: 3 }] } };
    const body = JSON.parse(opts.body); puts.push(body);
    return { status: 200, body: { success: true, doc: { key: decodeURIComponent(url.split('/').pop()!), data: body.data, revision: body.baseRevision + 1 } } };
  }, { 'klang.mind.revs.v1': '{"unit:01":3}', 'klang.mind.pending.v1': '["review:7"]' });
  c.context.KLANG_OWNERSHIP.bind({ id: 'u' }); c.api.prepare(); c.api.markDirty('unit:01');
  c.api.init({ state: { a: { '01:q': 'startup edit' }, sec: {}, ud: {}, rd: {} }, onRemoteUpdate() {}, onSaveLocal() {} });
  await flush(); await flush();
  expect(puts.some(p => p.baseRevision === 3 && p.data.answers['01:q'] === 'startup edit')).toBe(true);
  expect(puts.some(p => p.baseRevision === 0 && p.data.done === false)).toBe(true);
});
