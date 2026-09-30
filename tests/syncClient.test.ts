import { describe, it, expect } from 'vitest';
import { loadSyncClient, flush } from './helpers/browserSync';

const emptyState = () => ({ a: {}, sec: {}, ud: {}, rd: {}, md: {}, gl: {}, bm: [], bank: [], errs: [], pf: {}, last: null, prefs: { fs: 19, w: 66 }, ca: [], lb: null } as any);

describe('sync.js local-first client', () => {
  it('maps every save key to its real document scope', () => {
    const { api } = loadSyncClient(async () => ({ status: 200, body: {} }));
    expect(api.keyToScope('01:read:q1')).toBe('unit:01');
    expect(api.keyToScope('unit:01')).toBe('unit:01');
    expect(api.keyToScope('r1:m1w1')).toBe('review:1');
    expect(api.keyToScope('review:2')).toBe('review:2');
    for (const k of ['glossary', 'language-bank', 'error-log', 'bookmarks', 'portfolio', 'current-affairs', 'progress']) {
      expect(api.keyToScope(k)).toBe(k);
    }
    expect(api.keyToScope(undefined)).toBe('progress');
  });

  it('serialises and syncs Module Review answers as an independent document', async () => {
    const S = emptyState();
    const puts: any[] = [];
    const { api } = loadSyncClient(async (url, opts) => {
      if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u', email: 'e' } } };
      if (url === '/api/docs') return { status: 200, body: { documents: [{ key: 'progress', data: {}, revision: 1 }] } };
      if (opts?.method === 'PUT') { const body = JSON.parse(opts.body); puts.push({ url, body }); return { status: 200, body: { success: true, doc: { key: 'review:1', data: body.data, revision: 1 } } }; }
      return { status: 200, body: {} };
    });
    api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 20));
    S.a['r1:m1w1'] = 'A saved synthesis'; S.sec['r1:synthesis'] = true; S.rd['1'] = true;
    api.markDirty(api.keyToScope('r1:m1w1')); await api.syncPending();
    const put = puts.find(x => x.url.includes('review'));
    expect(put.body.data.answers['r1:m1w1']).toBe('A saved synthesis');
    expect(put.body.data.sections['r1:synthesis']).toBe(true);
    expect(put.body.data.done).toBe(true);
  });

  it('text typed while a save is in flight is not dropped from the pending queue', async () => {
    const S = emptyState();
    const puts: any[] = [];
    let releaseFirst!: () => void;
    const { api } = loadSyncClient(async (url, opts) => {
      if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u', email: 'e' } } };
      if (url === '/api/docs') return { status: 200, body: { documents: [{ key: 'progress', data: {}, revision: 1 }] } };
      if (opts?.method === 'PUT') {
        const body = JSON.parse(opts.body);
        puts.push(body);
        if (puts.length === 1) await new Promise<void>((r) => (releaseFirst = r));
        return { status: 200, body: { success: true, doc: { key: 'unit:01', data: body.data, revision: body.baseRevision + 1 } } };
      }
      return { status: 200, body: {} };
    });
    api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await flush(); await flush();

    S.a['01:q'] = 'first';
    api.markDirty('unit:01');
    const p = api.syncPending();
    await flush();
    S.a['01:q'] = 'first and more';
    api.markDirty('unit:01'); // typed during flight
    releaseFirst();
    await p;
    await new Promise((r) => setTimeout(r, 900)); // debounce re-run
    expect(puts).toHaveLength(2);
    expect(puts[1].data.answers['01:q']).toBe('first and more');
    expect(puts[1].baseRevision).toBe(1);
  });

  it('hydration never overwrites a scope with unsynced local edits', async () => {
    const S = emptyState();
    S.a['01:q'] = 'offline draft';
    const { api } = loadSyncClient(
      async (url, opts) => {
        if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u', email: 'e' } } };
        if (url === '/api/docs')
          return { status: 200, body: { documents: [{ key: 'unit:01', data: { answers: { '01:q': 'other device' }, sections: {}, done: false }, revision: 5 }] } };
        if (opts?.method === 'PUT') return 'network-error';
        return { status: 200, body: {} };
      },
      { 'klang.mind.revs.v1': JSON.stringify({ 'unit:01': 3 }), 'klang.mind.pending.v1': JSON.stringify(['unit:01']) }
    );
    api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 20));
    expect(S.a['01:q']).toBe('offline draft');
  });

  it('pre-existing local work on a never-synced device is kept and pushed, not replaced', async () => {
    const S = emptyState();
    S.gl['serendipity'] = 'new';
    const puts: any[] = [];
    const { api } = loadSyncClient(async (url, opts) => {
      if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u', email: 'e' } } };
      if (url === '/api/docs') return { status: 200, body: { documents: [{ key: 'glossary', data: { gl: { other: 'know' } }, revision: 2 }] } };
      if (opts?.method === 'PUT') {
        puts.push({ url, body: JSON.parse(opts.body) });
        return { status: 409, body: { error: 'conflict', serverDoc: { key: 'glossary', data: { gl: { other: 'know' } }, revision: 2 } } };
      }
      return { status: 200, body: {} };
    });
    api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 20));
    expect(S.gl['serendipity']).toBe('new');
    expect(puts[0].url).toBe('/api/docs/glossary');
    expect(api.getStatus()).toBe('sync_conflict');
  });

  it('offline: work stays pending and is retried when the connection returns', async () => {
    const S = emptyState();
    let online = false;
    const puts: any[] = [];
    const { api, fire, context } = loadSyncClient(async (url, opts) => {
      if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u', email: 'e' } } };
      if (url === '/api/docs') return { status: 200, body: { documents: [{ key: 'progress', data: {}, revision: 1 }] } };
      if (opts?.method === 'PUT') {
        if (!online) return 'network-error';
        const body = JSON.parse(opts.body);
        puts.push(body);
        return { status: 200, body: { success: true, doc: { data: body.data, revision: body.baseRevision + 1 } } };
      }
      return { status: 200, body: {} };
    });
    api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await flush(); await flush();
    S.errs.push({ id: 'e1', mine: 'I am agree', corr: 'I agree' });
    api.markDirty('error-log');
    await api.syncPending();
    expect(api.getStatus()).toBe('offline');
    online = true;
    context.navigator.onLine = true;
    fire('online');
    await new Promise((r) => setTimeout(r, 20));
    expect(puts[0].data.errs[0].corr).toBe('I agree');
    expect(api.getStatus()).toBe('saved_to_cloud');
  });
});

describe('sync.js with the auth gate', () => {
  const authStub = (user: any) => {
    const calls: string[] = [];
    return { calls, gate: { user, sessionExpired: () => calls.push('expired'), signedOut: (u: boolean) => calls.push('signedOut:' + u) } };
  };
  const signedIn = { id: 'u', email: 'e', name: 'Mayra' };

  it('uses the session verified by the gate (no second /me call)', async () => {
    const urls: string[] = [];
    const { api, context } = loadSyncClient(async (url) => {
      urls.push(url);
      if (url === '/api/docs') return { status: 200, body: { documents: [{ key: 'progress', data: {}, revision: 1 }] } };
      return { status: 200, body: {} };
    });
    context.window.KLANG_AUTH = authStub(signedIn).gate;
    api.init({ state: emptyState(), onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 20));
    expect(urls).not.toContain('/api/auth/me');
    expect(api.getUser().email).toBe('e');
    expect(api.getStatus()).toBe('saved_to_cloud');
  });

  it('expired session: writing stays local and pending, and the gate takes over', async () => {
    const S = emptyState();
    const { api, context, storage } = loadSyncClient(async (url, opts) => {
      if (url === '/api/docs') return { status: 200, body: { documents: [{ key: 'progress', data: {}, revision: 1 }] } };
      if (opts?.method === 'PUT') return { status: 401, body: { error: 'unauthorized' } };
      return { status: 200, body: {} };
    });
    const auth = authStub(signedIn);
    context.window.KLANG_AUTH = auth.gate;
    api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 20));

    S.a['01:w2'] = 'An essay I must never lose';
    api.markDirty('unit:01');
    // Another A tab can have queued work that this stale tab never loaded.
    storage.set('klang.mind.pending.v1.account:u', JSON.stringify(['unit:01', 'review:7']));
    await api.syncPending();

    expect(JSON.parse(storage.get('klang.mind.pending.v1.account:u')!)).toContain('review:7');
    expect(auth.calls).toEqual(['expired']);
    expect(api.getUser()).toBeNull();
    expect(api.getStatus()).toBe('saved_locally');
    expect(JSON.parse(storage.get('klang.mind.pending.v1.account:u')!)).toContain('unit:01');
    expect(S.a['01:w2']).toBe('An essay I must never lose');
  });

  it('after signing in again, the pending writing is reconciled with the server', async () => {
    const puts: any[] = [];
    const S = emptyState();
    S.a['01:w2'] = 'Written while the session was expired';
    const { api, context } = loadSyncClient(
      async (url, opts) => {
        if (url === '/api/docs') return { status: 200, body: { documents: [{ key: 'unit:01', data: { answers: { '01:w2': 'older' }, sections: {}, done: false }, revision: 3 }] } };
        if (opts?.method === 'PUT') {
          const body = JSON.parse(opts.body);
          puts.push(body);
          return { status: 200, body: { success: true, doc: { data: body.data, revision: 4 } } };
        }
        return { status: 200, body: {} };
      },
      { 'klang.mind.revs.v1': JSON.stringify({ 'unit:01': 3 }), 'klang.mind.pending.v1': JSON.stringify(['unit:01']) }
    );
    context.window.KLANG_AUTH = authStub(signedIn).gate;
    api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 30));
    expect(S.a['01:w2']).toBe('Written while the session was expired');
    expect(puts[0].data.answers['01:w2']).toBe('Written while the session was expired');
    expect(puts[0].baseRevision).toBe(3);
    expect(api.getStatus()).toBe('saved_to_cloud');
  });

  it('sign out pushes pending work, invalidates the session and keeps local data', async () => {
    const S = emptyState();
    const calls: string[] = [];
    const { api, context, storage } = loadSyncClient(async (url, opts) => {
      calls.push(`${opts?.method || 'GET'} ${url}`);
      if (url === '/api/docs') return { status: 200, body: { documents: [{ key: 'progress', data: {}, revision: 1 }] } };
      if (opts?.method === 'PUT') return { status: 200, body: { success: true, doc: { revision: 1 } } };
      return { status: 200, body: { success: true } };
    });
    const auth = authStub(signedIn);
    context.window.KLANG_AUTH = auth.gate;
    api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 20));
    S.bank.push({ id: 'b1', e: 'in a matter of days' });
    api.markDirty('language-bank');
    await api.logout();
    expect(calls.indexOf('PUT /api/docs/language-bank')).toBeLessThan(calls.indexOf('POST /api/auth/logout'));
    expect(auth.calls).toEqual(['signedOut:false']);
    expect(api.getUser()).toBeNull();
    expect(storage.get('klang.mind.pending.v1.account:u')).toBe('[]');
    expect(S.bank).toHaveLength(1);
  });

  it('coming back online never claims "Saved to cloud" without asking the server', async () => {
    const urls: string[] = [];
    let serverUp = true;
    const { api, context, fire } = loadSyncClient(async (url) => {
      urls.push(url);
      if (url === '/api/docs') return serverUp ? { status: 200, body: { documents: [{ key: 'progress', data: {}, revision: 1 }] } } : { status: 500, body: {} };
      return { status: 200, body: {} };
    });
    context.window.KLANG_AUTH = authStub(signedIn).gate;
    api.init({ state: emptyState(), onRemoteUpdate() {}, onSaveLocal() {} });
    await new Promise((r) => setTimeout(r, 20));
    serverUp = false;
    const before = urls.length;
    fire('online');
    await new Promise((r) => setTimeout(r, 20));
    expect(urls.slice(before)).toContain('/api/docs');
    expect(api.getStatus()).toBe('sync_error');
  });
});
