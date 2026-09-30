/* One immutable authenticated owner per document. Legacy unowned stores are never adopted. */
(function () {
  'use strict';
  const ACTIVE = 'klang.mind.active-account.v1';
  let owner = null, invalid = false;
  const requests = new Set();
  function invalidate() {
    if (invalid) return;
    invalid = true;
    requests.forEach(c => c.abort());
    window.KLANG_SYNC?.accountChanged?.();
    window.KLANG_AUTH?.accountChanged?.();
  }
  function assertCurrent() {
    if (!owner || invalid || localStorage.getItem(ACTIVE) !== owner) {
      invalidate();
      throw new Error('account_changed');
    }
    return owner;
  }
  function bind(user) {
    if (!user || typeof user.id !== 'string' || !user.id) throw new Error('missing_account_owner');
    if (owner && owner !== user.id) { invalidate(); throw new Error('account_changed'); }
    if (invalid) throw new Error('account_changed');
    owner = user.id;
    localStorage.setItem(ACTIVE, owner);
    return owner;
  }
  function key(base) { return base + '.account:' + encodeURIComponent(assertCurrent()); }
  function release() {
    if (localStorage.getItem(ACTIVE) === owner) localStorage.removeItem(ACTIVE);
    invalidate();
  }
  window.addEventListener('storage', e => {
    if (owner && (e.key === ACTIVE || e.key === null) && localStorage.getItem(ACTIVE) !== owner) invalidate();
  });
  window.addEventListener('focus', () => { if (owner) { try { assertCurrent(); } catch (_) {} } });
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async function (input, options) {
    const url = new URL(typeof input === 'string' ? input : input.url, location.href);
    const scoped = owner && url.origin === location.origin && url.pathname.startsWith('/api/') && !['/api/auth/login', '/api/auth/register'].includes(url.pathname);
    if (!scoped) return nativeFetch(input, options);
    const expected = assertCurrent(), controller = new AbortController();
    const headers = new Headers(options?.headers || (typeof input !== 'string' ? input.headers : undefined));
    headers.set('X-Learner-Id', expected);
    const signal = options?.signal || (typeof input !== 'string' ? input.signal : undefined);
    const abort = () => controller.abort();
    if (signal?.aborted) abort();
    signal?.addEventListener('abort', abort, { once: true });
    requests.add(controller);
    try {
      const response = await nativeFetch(input, Object.assign({}, options, { headers, signal: controller.signal }));
      assertCurrent();
      if (response.status === 403 && response.headers?.get('X-Account-Changed') === '1') { invalidate(); throw new Error('account_changed'); }
      // Body consumption can finish after the response headers and an account switch.
      for (const name of ['json', 'text', 'blob', 'arrayBuffer', 'formData']) {
        if (typeof response[name] !== 'function') continue;
        const read = response[name].bind(response);
        response[name] = async (...args) => { assertCurrent(); const value = await read(...args); assertCurrent(); return value; };
      }
      return response;
    } finally {
      requests.delete(controller);
      signal?.removeEventListener('abort', abort);
    }
  };
  window.KLANG_OWNERSHIP = { bind, key, assertCurrent, release, invalidate, owner: () => owner,
    hasLegacy: () => localStorage.getItem('klang.mind.v1') !== null,
    legacyRecovery: () => {
      const raw = localStorage.getItem('klang.mind.v1'); let state = null;
      try { state = JSON.parse(raw); } catch (_) {}
      return { app: 'a-mind-in-english', v: 1, ownership: 'unassigned', saved: new Date().toISOString(), state, rawLegacyState: raw, legacySync: { revisions: localStorage.getItem('klang.mind.revs.v1'), pending: localStorage.getItem('klang.mind.pending.v1') }, legacyConversationClient: localStorage.getItem('klang.mind.talkclient.v1'), legacyDrafts: window.sessionStorage?.getItem('klang.mind.talkdraft.v1') ?? null, legacyDemoState: window.sessionStorage?.getItem('klang.mind.demo.v1') ?? null };
    } };
})();
