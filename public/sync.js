/* A MIND IN ENGLISH · sync.js
   Local-first cloud persistence with optimistic concurrency, SSE real-time broadcast,
   secure cookie sessions, and explicit conflict resolution.
*/
(function () {
  'use strict';

  const REV_KEY = 'klang.mind.revs.v1';
  const PENDING_KEY = 'klang.mind.pending.v1';

  const STATUS_LABELS = {
    saved_locally: 'Saved locally',
    syncing: 'Syncing…',
    saved_to_cloud: 'Saved to cloud',
    offline: 'Offline · saved locally',
    sync_error: 'Sync error',
    sync_conflict: 'Sync conflict',
    demo_mode: 'DEMO MODE · Changes are not saved',
  };

  const STATUS_CLASSES = {
    saved_locally: 'st-local',
    syncing: 'st-syncing',
    saved_to_cloud: 'st-cloud',
    offline: 'st-offline',
    sync_error: 'st-error',
    sync_conflict: 'st-conflict',
    demo_mode: 'st-demo',
  };

  // State
  let currentUser = null;
  let sessionLost = false;
  let currentStatus = 'saved_locally';
  let revisions = {}; // { [scopeKey]: number }
  let pendingScopes = new Set();
  let syncTimer = null;
  let sseSource = null;
  let sseRetryTimer = null;
  let activeConflict = null;
  let isSyncing = false;
  let retryTimer = null;
  const editSeq = {}; // { [scope]: number } bumps on every local edit, so in-flight saves never drop newer typing
  const conflictScopes = new Set(); // scopes waiting for the user's conflict decision

  // Per-tab id: lets the server skip echoing our own saves back via SSE,
  // while other tabs on this same device still receive them.
  const CLIENT_ID = 'tab_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  const RETRY_MS = 15000;

  // App callbacks
  let appState = null;
  let onRemoteUpdate = null;
  let onSaveLocal = null;

  // Load saved revisions & pending queue from localStorage
  try {
    const rawRevs = localStorage.getItem(REV_KEY);
    if (rawRevs) revisions = JSON.parse(rawRevs);
    const rawPending = localStorage.getItem(PENDING_KEY);
    if (rawPending) {
      const arr = JSON.parse(rawPending);
      if (Array.isArray(arr)) arr.forEach((k) => pendingScopes.add(k));
    }
  } catch (e) {
    console.warn('Could not read sync metadata from localStorage', e);
  }

  function saveSyncMeta() {
    try {
      localStorage.setItem(REV_KEY, JSON.stringify(revisions));
      localStorage.setItem(PENDING_KEY, JSON.stringify(Array.from(pendingScopes)));
    } catch (e) {}
  }

  /* ── Scope Mapping Helpers ────────────────────────── */
  const NAMED_SCOPES = ['glossary', 'language-bank', 'error-log', 'bookmarks', 'portfolio', 'speaking', 'current-affairs', 'progress', 'english-profile', 'study-timer', 'learning-judgments'];

  function keyToScope(key) {
    if (!key) return 'progress';
    const k = String(key);
    if (/^unit:\d\d$/.test(k)) return k;
    if (/^review:[1-7]$/.test(k)) return k;
    if (/^conversation:[A-Za-z0-9_-]{8,96}$/.test(k)) return k;
    if (NAMED_SCOPES.includes(k)) return k;
    const m = k.match(/^(\d\d):/);
    if (m) return `unit:${m[1]}`;
    const r = k.match(/^r([1-7]):/);
    if (r) return `review:${r[1]}`;
    return 'progress';
  }

  function decomposeState(S) {
    const docs = {};

    // 1. Units
    const unitMap = {};
    if (S.a) {
      Object.keys(S.a).forEach((k) => {
        const u = (k.match(/^(\d\d):/) || [])[1];
        if (u) {
          unitMap[u] = unitMap[u] || { answers: {}, sections: {}, done: false };
          unitMap[u].answers[k] = S.a[k];
        }
      });
    }
    if (S.sec) {
      Object.keys(S.sec).forEach((k) => {
        const u = (k.match(/^(\d\d):/) || [])[1];
        if (u) {
          unitMap[u] = unitMap[u] || { answers: {}, sections: {}, done: false };
          unitMap[u].sections[k] = S.sec[k];
        }
      });
    }
    if (S.ud) {
      Object.keys(S.ud).forEach((u) => {
        if (S.ud[u]) {
          unitMap[u] = unitMap[u] || { answers: {}, sections: {}, done: false };
          unitMap[u].done = true;
        }
      });
    }

    Object.keys(unitMap).forEach((u) => {
      docs[`unit:${u}`] = unitMap[u];
    });

    // 2. Module Reviews
    const reviewMap = {};
    if (S.a) Object.keys(S.a).forEach((k) => {
      const id = (k.match(/^r([1-7]):/) || [])[1];
      if (id) { reviewMap[id] = reviewMap[id] || { answers: {}, sections: {}, done: false }; reviewMap[id].answers[k] = S.a[k]; }
    });
    if (S.sec) Object.keys(S.sec).forEach((k) => {
      const id = (k.match(/^r([1-7]):/) || [])[1];
      if (id) { reviewMap[id] = reviewMap[id] || { answers: {}, sections: {}, done: false }; reviewMap[id].sections[k] = S.sec[k]; }
    });
    if (S.rd) Object.keys(S.rd).forEach((id) => {
      if (S.rd[id]) { reviewMap[id] = reviewMap[id] || { answers: {}, sections: {}, done: false }; reviewMap[id].done = true; }
    });
    Object.keys(reviewMap).forEach((id) => { docs[`review:${id}`] = reviewMap[id]; });

    // 3. Notebook & global
    docs['glossary'] = { gl: S.gl || {}, glx: S.glx || [] };
    docs['language-bank'] = { bank: S.bank || [] };
    docs['error-log'] = { errs: S.errs || [] };
    docs['bookmarks'] = { bm: S.bm || [] };
    docs['portfolio'] = { pf: S.pf || {} };
    docs['speaking'] = { attempts: S.sp || [] };
    docs['current-affairs'] = { ca: S.ca || [] };
    docs['progress'] = {
      md: S.md || {},
      last: S.last || null,
      prefs: S.prefs || { fs: 19, w: 66 },
      lb: S.lb || null,
    };
    if (S.profile) docs['english-profile'] = S.profile;
    docs['study-timer'] = S.study || { activeSession: null, sessions: [] };
    docs['learning-judgments'] = { judgments: S.learningJudgments || {} };
    if (S.conversations) Object.keys(S.conversations).forEach((id) => {
      if (S.conversations[id]) docs[`conversation:${id}`] = S.conversations[id];
    });

    return docs;
  }

  function extractScopeData(S, scope) {
    if (scope.startsWith('conversation:')) {
      const id = scope.slice('conversation:'.length);
      return S.conversations?.[id] || null;
    }
    if (scope.startsWith('unit:')) {
      const u = scope.slice(5);
      const answers = {};
      const sections = {};
      if (S.a) {
        Object.keys(S.a).forEach((k) => {
          if (k.startsWith(u + ':')) answers[k] = S.a[k];
        });
      }
      if (S.sec) {
        Object.keys(S.sec).forEach((k) => {
          if (k.startsWith(u + ':')) sections[k] = S.sec[k];
        });
      }
      return {
        answers,
        sections,
        done: !!(S.ud && S.ud[u]),
      };
    }
    if (scope.startsWith('review:')) {
      const id = scope.slice(7), prefix = `r${id}:`, answers = {}, sections = {};
      if (S.a) Object.keys(S.a).forEach((k) => { if (k.startsWith(prefix)) answers[k] = S.a[k]; });
      if (S.sec) Object.keys(S.sec).forEach((k) => { if (k.startsWith(prefix)) sections[k] = S.sec[k]; });
      return { answers, sections, done: !!(S.rd && S.rd[id]) };
    }

    switch (scope) {
      case 'glossary':
        return { gl: S.gl || {}, glx: S.glx || [] };
      case 'language-bank':
        return { bank: S.bank || [] };
      case 'error-log':
        return { errs: S.errs || [] };
      case 'bookmarks':
        return { bm: S.bm || [] };
      case 'portfolio':
        return { pf: S.pf || {} };
      case 'speaking':
        return { attempts: S.sp || [] };
      case 'current-affairs':
        return { ca: S.ca || [] };
      case 'english-profile':
        return S.profile || null;
      case 'study-timer':
        return S.study || { activeSession: null, sessions: [] };
      case 'learning-judgments':
        return { judgments: S.learningJudgments || {} };
      case 'progress':
      default:
        return {
          md: S.md || {},
          last: S.last || null,
          prefs: S.prefs || { fs: 19, w: 66 },
          lb: S.lb || null,
        };
    }
  }

  function applyScopeData(S, scope, data) {
    if (!data) return;

    if (scope.startsWith('conversation:')) {
      const id = scope.slice('conversation:'.length);
      S.conversations = S.conversations || {};
      S.conversations[id] = data;
      return;
    }

    if (scope.startsWith('unit:')) {
      const u = scope.slice(5);
      // Clean previous unit entries
      if (S.a) {
        Object.keys(S.a).forEach((k) => {
          if (k.startsWith(u + ':')) delete S.a[k];
        });
      }
      if (S.sec) {
        Object.keys(S.sec).forEach((k) => {
          if (k.startsWith(u + ':')) delete S.sec[k];
        });
      }

      // Merge new
      S.a = S.a || {};
      S.sec = S.sec || {};
      S.ud = S.ud || {};

      if (data.answers) Object.assign(S.a, data.answers);
      if (data.sections) Object.assign(S.sec, data.sections);
      S.ud[u] = !!data.done;
      return;
    }
    if (scope.startsWith('review:')) {
      const id = scope.slice(7), prefix = `r${id}:`;
      if (S.a) Object.keys(S.a).forEach((k) => { if (k.startsWith(prefix)) delete S.a[k]; });
      if (S.sec) Object.keys(S.sec).forEach((k) => { if (k.startsWith(prefix)) delete S.sec[k]; });
      S.a = S.a || {}; S.sec = S.sec || {}; S.rd = S.rd || {};
      if (data.answers) Object.assign(S.a, data.answers);
      if (data.sections) Object.assign(S.sec, data.sections);
      S.rd[id] = !!data.done;
      return;
    }

    switch (scope) {
      case 'glossary':
        S.gl = Object.assign({}, data.gl || {});
        S.glx = Array.isArray(data.glx) ? data.glx : [];
        break;
      case 'language-bank':
        S.bank = Array.isArray(data.bank) ? data.bank : [];
        break;
      case 'error-log':
        S.errs = Array.isArray(data.errs) ? data.errs : [];
        break;
      case 'bookmarks':
        S.bm = Array.isArray(data.bm) ? data.bm : [];
        break;
      case 'portfolio':
        S.pf = Object.assign({}, data.pf || {});
        break;
      case 'speaking':
        S.sp = Array.isArray(data.attempts) ? data.attempts : [];
        break;
      case 'current-affairs':
        S.ca = Array.isArray(data.ca) ? data.ca : [];
        break;
      case 'english-profile':
        if (data) S.profile = data;
        break;
      case 'study-timer':
        if (data) S.study = data;
        break;
      case 'learning-judgments':
        if (data && data.judgments) S.learningJudgments = data.judgments;
        break;
      case 'progress':
        if (data.md) S.md = data.md;
        if (data.last) S.last = data.last;
        if (data.prefs) S.prefs = data.prefs;
        if (data.lb) S.lb = data.lb;
        break;
    }
  }

  function isEmptyScopeData(scope, data) {
    if (!data) return true;
    if (scope.startsWith('conversation:')) return !Array.isArray(data.turns) || data.turns.length === 0;
    if (scope.startsWith('unit:') || scope.startsWith('review:')) {
      return !data.done &&
        !Object.values(data.answers || {}).some((v) => v) &&
        !Object.values(data.sections || {}).some((v) => v);
    }
    switch (scope) {
      case 'glossary': return !Object.values(data.gl || {}).some((v) => v) && !(data.glx || []).length;
      case 'language-bank': return !(data.bank || []).length;
      case 'error-log': return !(data.errs || []).length;
      case 'bookmarks': return !(data.bm || []).length;
      case 'portfolio': return !Object.keys(data.pf || {}).length;
      case 'speaking': return !(data.attempts || []).length;
      case 'current-affairs': return !(data.ca || []).length;
      case 'english-profile': return !data || !data.overall;
      default: return true; // progress/prefs: server copy is fine to adopt
    }
  }

  function hasLocalWork(S) {
    if (!S) return false;
    const hasAnswers = S.a && Object.keys(S.a).some((k) => S.a[k]);
    const hasBank = S.bank && S.bank.length > 0;
    const hasErrs = S.errs && S.errs.length > 0;
    const hasBm = S.bm && S.bm.length > 0;
    const hasCa = S.ca && S.ca.length > 0;
    const hasGl = (S.gl && Object.keys(S.gl).some((k) => S.gl[k])) || (S.glx && S.glx.length > 0);
    const hasUd = S.ud && Object.keys(S.ud).some((k) => S.ud[k]);
    const hasRd = S.rd && Object.keys(S.rd).some((k) => S.rd[k]);
    const hasSpeaking = S.sp && S.sp.length > 0;
    const hasProfile = S.profile && S.profile.overall;
    const hasConversations = S.conversations && Object.keys(S.conversations).length > 0;
    return !!(hasAnswers || hasBank || hasErrs || hasBm || hasCa || hasGl || hasUd || hasRd || hasSpeaking || hasProfile || hasConversations);
  }

  /* ── UI Status Rendering ──────────────────────────── */
  function setStatus(status, details) {
    currentStatus = status;
    renderStatusBadge();
  }

  function renderStatusBadge() {
    const label = STATUS_LABELS[currentStatus] || currentStatus;
    const cls = STATUS_CLASSES[currentStatus] || '';

    // Update in sidebar and topbar
    const targets = document.querySelectorAll('[data-sync-status]');
    targets.forEach((el) => {
      el.className = `sync-badge ${cls}`;
      el.setAttribute('title', `Cloud sync status: ${label}`);
      el.innerHTML = `<span class="dot"></span><span class="lbl">${label}</span>`;
      if (currentStatus === 'sync_conflict') {
        el.style.cursor = 'pointer';
        el.onclick = () => activeConflict && showConflictModal(activeConflict);
      } else {
        el.style.cursor = 'default';
        el.onclick = null;
      }
    });
  }

  /* ── API Calls ────────────────────────────────────── */
  async function apiFetch(endpoint, options = {}) {
    const opts = Object.assign(
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Client-Id': CLIENT_ID,
        },
        credentials: 'include',
      },
      options
    );

    if (opts.body && typeof opts.body !== 'string') {
      opts.body = JSON.stringify(opts.body);
    }

    try {
      const res = await fetch(endpoint, opts);
      const data = await res.json().catch(() => ({}));
      if (res.status === 401 && !endpoint.startsWith('/api/auth/')) handleUnauthorized();
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      return { ok: false, status: 0, networkError: true, err };
    }
  }

  /* ── Session loss ─────────────────────────────────── */
  // The server no longer accepts this session: stop syncing, keep every local change
  // (localStorage + pending queue) and hand over to the auth gate.
  function handleUnauthorized() {
    if (sessionLost) return;
    sessionLost = true;
    currentUser = null;
    stopRealtime();
    saveSyncMeta();
    setStatus('saved_locally');
    if (window.KLANG_AUTH) window.KLANG_AUTH.sessionExpired();
  }

  function stopRealtime() {
    clearTimeout(syncTimer);
    clearTimeout(retryTimer);
    clearTimeout(sseRetryTimer);
    if (sseSource) {
      sseSource.close();
      sseSource = null;
    }
  }

  // Only the backend can confirm "Saved to cloud"; anything still pending is local-only.
  function settleStatus() {
    if (pendingScopes.size > 0) {
      setStatus('saved_locally');
      clearTimeout(syncTimer);
      syncTimer = setTimeout(syncPending, 800);
    } else {
      setStatus('saved_to_cloud');
    }
  }

  /* ── Sync Engine ──────────────────────────────────── */
  function scheduleRetry() {
    clearTimeout(retryTimer);
    retryTimer = setTimeout(() => {
      if (pendingScopes.size > 0) syncPending();
    }, RETRY_MS);
  }

  function markDirty(scope) {
    if (!scope) return;
    if (currentUser?.isDemo) {
      setStatus('demo_mode');
      return;
    }
    editSeq[scope] = (editSeq[scope] || 0) + 1;
    pendingScopes.add(scope);
    saveSyncMeta();
    setStatus('saved_locally');

    // Debounce cloud sync: 800ms
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      syncPending();
    }, 800);
  }

  async function syncPending() {
    if (!currentUser) return;
    if (currentUser.isDemo) {
      setStatus('demo_mode');
      return;
    }
    if (pendingScopes.size === 0) return;
    if (isSyncing) return;

    if (!navigator.onLine) {
      setStatus('offline');
      scheduleRetry();
      return;
    }

    isSyncing = true;
    setStatus('syncing');

    const scopesToSync = Array.from(pendingScopes).filter((s) => !conflictScopes.has(s));
    let anyError = false;
    let anyConflict = false;
    let editedDuringFlight = false;

    for (const scope of scopesToSync) {
      const seqAtSend = editSeq[scope] || 0;
      const data = extractScopeData(appState, scope);
      const baseRevision = revisions[scope] ?? 0;

      const res = await apiFetch(`/api/docs/${encodeURIComponent(scope)}`, {
        method: 'PUT',
        body: { data, baseRevision },
      });

      if (res.networkError) {
        saveSyncMeta();
        isSyncing = false;
        setStatus('offline');
        scheduleRetry();
        return;
      }

      if (res.ok && res.data.success) {
        revisions[scope] = res.data.doc.revision;
        // Only clear if nothing was typed in this scope while the request was in flight
        if ((editSeq[scope] || 0) === seqAtSend) {
          pendingScopes.delete(scope);
        } else {
          editedDuringFlight = true;
        }
      } else if (res.status === 409 && res.data && res.data.serverDoc && scope.startsWith('conversation:') && window.KLANG_CONVERSATIONS) {
        // Conversations merge losslessly by immutable turn id; real conflicts stay visible in mergeState
        const merged = window.KLANG_CONVERSATIONS.merge(extractScopeData(appState, scope) || data, res.data.serverDoc.data);
        await resolveConflict(scope, merged, res.data.serverDoc.revision, 'conversation_merge');
      } else if (res.status === 409 && res.data && res.data.serverDoc) {
        // Concurrency conflict: local copy stays untouched and pending until the user decides
        anyConflict = true;
        conflictScopes.add(scope);
        activeConflict = {
          key: scope,
          clientData: data,
          clientRevision: baseRevision,
          serverDoc: res.data.serverDoc,
        };
        showConflictModal(activeConflict);
        break; // stop until resolved
      } else if (res.status === 401) {
        break; // handled by apiFetch: gate takes over, queue stays pending
      } else {
        anyError = true;
      }
    }

    saveSyncMeta();
    isSyncing = false;
    if (!currentUser) return;

    if (anyConflict) {
      setStatus('sync_conflict');
    } else if (anyError) {
      setStatus('sync_error');
      if (currentUser) scheduleRetry();
    } else if (editedDuringFlight) {
      clearTimeout(syncTimer);
      syncTimer = setTimeout(syncPending, 800);
    } else if (pendingScopes.size === 0) {
      setStatus('saved_to_cloud');
    } else {
      // Edits arrived for other scopes while we were busy
      clearTimeout(syncTimer);
      syncTimer = setTimeout(syncPending, 800);
    }
  }

  /* ── Remote Document Pull & Hydration ─────────────── */
  async function fetchAndHydrate(isInitialLogin = false) {
    if (!currentUser) return;
    if (currentUser.isDemo) {
      setStatus('demo_mode');
      return;
    }

    setStatus('syncing');
    const res = await apiFetch('/api/docs');

    if (res.networkError) {
      setStatus('offline');
      return;
    }

    if (!res.ok) {
      if (res.status !== 401) setStatus('sync_error');
      return;
    }

    const remoteDocs = res.data.documents || [];

    // Case 1: Remote is empty, but local has data -> Migration!
    if (remoteDocs.length === 0) {
      if (hasLocalWork(appState)) {
        console.log('Remote is empty. Performing initial migration of local state to cloud...');
        const docs = decomposeState(appState);
        const batchList = Object.keys(docs).map((key) => ({
          key,
          data: docs[key],
          baseRevision: 0,
        }));

        const uploadRes = await apiFetch('/api/sync/batch', {
          method: 'POST',
          body: { documents: batchList },
        });

        if (uploadRes.ok && uploadRes.data.success) {
          uploadRes.data.saved.forEach((d) => {
            revisions[d.key] = d.revision;
            pendingScopes.delete(d.key);
          });
          // Anything that raced with another device stays pending and will surface as a conflict
          uploadRes.data.conflicts.forEach((c) => pendingScopes.add(c.key));
          (uploadRes.data.rejected || []).forEach((r) => pendingScopes.add(r.key));
          saveSyncMeta();
        } else {
          if (uploadRes.status === 401) return;
          setStatus(uploadRes.networkError ? 'offline' : 'sync_error');
          scheduleRetry();
          return;
        }
      }
      if (pendingScopes.size > 0) syncPending();
      else setStatus('saved_to_cloud');
      return;
    }

    // Case 2: Remote has documents -> hydrate, but NEVER overwrite unsynced local edits.
    // A pending scope is pushed with its baseRevision; if the server moved on, the
    // server answers 409 and the user chooses — nothing is replaced silently.
    let changed = false;
    remoteDocs.forEach((doc) => {
      if (pendingScopes.has(doc.key)) return;

      // Work written on this device before it ever synced this scope must not be discarded
      if (revisions[doc.key] === undefined) {
        const local = extractScopeData(appState, doc.key);
        if (!isEmptyScopeData(doc.key, local) && JSON.stringify(local) !== JSON.stringify(doc.data)) {
          pendingScopes.add(doc.key);
          revisions[doc.key] = 0;
          return;
        }
      }

      if (revisions[doc.key] !== doc.revision) {
        applyScopeData(appState, doc.key, doc.data);
        revisions[doc.key] = doc.revision;
        changed = true;
      }
    });

    saveSyncMeta();
    if (onSaveLocal) onSaveLocal();

    if (changed && onRemoteUpdate) {
      onRemoteUpdate();
    }

    if (pendingScopes.size > 0) {
      syncPending();
    } else {
      setStatus('saved_to_cloud');
    }
  }

  /* ── Real-Time SSE Subscription ───────────────────── */
  function startSse() {
    if (sseSource) sseSource.close();
    if (!currentUser || currentUser.isDemo) return;

    sseSource = new EventSource(`/api/sync/events?clientId=${encodeURIComponent(CLIENT_ID)}`, { withCredentials: true });
    let hadError = false;

    sseSource.onopen = () => {
      // After a dropped connection we may have missed events: re-pull
      if (hadError) {
        hadError = false;
        fetchAndHydrate();
      }
    };

    sseSource.addEventListener('doc_saved', (e) => {
      try {
        const payload = JSON.parse(e.data);
        const key = payload.key;
        const newRev = payload.revision;

        // If another device updated this scope and we are not currently editing it:
        if (!pendingScopes.has(key)) {
          fetchSingleDoc(key);
        }
      } catch (err) {
        console.warn('SSE event parse error', err);
      }
    });

    sseSource.onerror = () => {
      // The browser reconnects by itself, unless the server refused the stream (e.g. 401)
      hadError = true;
      if (sseSource && sseSource.readyState === 2 && currentUser) {
        sseSource = null;
        clearTimeout(sseRetryTimer);
        sseRetryTimer = setTimeout(async () => {
          const me = await apiFetch('/api/auth/me');
          if (me.ok && me.data.authenticated) {
            startSse();
            fetchAndHydrate();
          } else if (me.ok) {
            handleUnauthorized();
          } else {
            startSse();
          }
        }, 3000);
      }
    };
  }

  async function fetchSingleDoc(key) {
    const res = await apiFetch(`/api/docs/${encodeURIComponent(key)}`);
    if (res.ok && res.data.doc) {
      const doc = res.data.doc;
      // The user may have started typing in this scope while we were fetching
      if (pendingScopes.has(doc.key)) return;
      if ((revisions[doc.key] ?? 0) >= doc.revision) return;
      applyScopeData(appState, doc.key, doc.data);
      revisions[doc.key] = doc.revision;
      saveSyncMeta();
      if (onSaveLocal) onSaveLocal();
      if (onRemoteUpdate) onRemoteUpdate();
      settleStatus();
    }
  }

  /* ── Conflict Resolution Modal & Logic ────────────── */
  function showConflictModal(conflict) {
    const existing = document.getElementById('sync-conflict-modal');
    if (existing) existing.remove();

    const modalEl = document.createElement('div');
    modalEl.className = 'modal sync-conflict-modal';
    modalEl.id = 'sync-conflict-modal';

    const serverTime = conflict.serverDoc.updatedAt
      ? new Date(conflict.serverDoc.updatedAt).toLocaleTimeString()
      : 'recently';

    const box = document.createElement('div');
    box.className = 'box';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.style.maxWidth = '720px';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.gap = '10px';
    header.style.marginBottom = '12px';
    header.innerHTML = `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#D05353"></span><h3 style="margin:0">Sync Conflict Detected</h3>`;
    box.appendChild(header);

    const desc1 = document.createElement('p');
    desc1.textContent = `Document "${conflict.key}" was modified on another device (at revision ${conflict.serverDoc.revision}, around ${serverTime}) while you also made edits here (at revision ${conflict.clientRevision}).`;
    box.appendChild(desc1);

    const desc2 = document.createElement('p');
    desc2.style.color = 'var(--ink)';
    desc2.textContent = 'No data was deleted. Both versions are preserved. Select how to resolve:';
    box.appendChild(desc2);

    const previewGrid = document.createElement('div');
    previewGrid.className = 'conflict-preview';
    previewGrid.style.display = 'grid';
    previewGrid.style.gridTemplateColumns = '1fr 1fr';
    previewGrid.style.gap = '12px';
    previewGrid.style.margin = '16px 0';

    // Left column: Client (This Device)
    const clientCol = document.createElement('div');
    clientCol.style.cssText = 'background:var(--white);padding:12px;border-radius:12px;border:1px solid var(--line-l)';
    const clientTitle = document.createElement('b');
    clientTitle.style.cssText = 'display:block;font-size:12px;text-transform:uppercase;color:var(--cinza);margin-bottom:6px';
    clientTitle.textContent = "This Device's Version";
    const clientPre = document.createElement('div');
    clientPre.style.cssText = 'font-size:13px;max-height:160px;overflow:auto;white-space:pre-wrap;font-family:monospace';
    clientPre.textContent = summarizeScopeData(conflict.clientData);
    clientCol.appendChild(clientTitle);
    clientCol.appendChild(clientPre);
    previewGrid.appendChild(clientCol);

    // Right column: Server / Other Device
    const serverCol = document.createElement('div');
    serverCol.style.cssText = 'background:var(--white);padding:12px;border-radius:12px;border:1px solid var(--line-l)';
    const serverTitle = document.createElement('b');
    serverTitle.style.cssText = 'display:block;font-size:12px;text-transform:uppercase;color:var(--cinza);margin-bottom:6px';
    serverTitle.textContent = "Server / Other Device's Version";
    const serverPre = document.createElement('div');
    serverPre.style.cssText = 'font-size:13px;max-height:160px;overflow:auto;white-space:pre-wrap;font-family:monospace';
    serverPre.textContent = summarizeScopeData(conflict.serverDoc.data);
    serverCol.appendChild(serverTitle);
    serverCol.appendChild(serverPre);
    previewGrid.appendChild(serverCol);

    box.appendChild(previewGrid);

    // Actions
    const acts = document.createElement('div');
    acts.className = 'acts';
    acts.style.cssText = 'gap:8px;display:flex;flex-wrap:wrap;justify-content:flex-end';

    const btnKeepServer = document.createElement('button');
    btnKeepServer.className = 'btn line';
    btnKeepServer.textContent = 'Keep server/other device version';
    btnKeepServer.onclick = async () => {
      applyScopeData(appState, conflict.key, conflict.serverDoc.data);
      revisions[conflict.key] = conflict.serverDoc.revision;
      pendingScopes.delete(conflict.key);
      conflictScopes.delete(conflict.key);
      saveSyncMeta();
      if (onSaveLocal) onSaveLocal();
      if (onRemoteUpdate) onRemoteUpdate();
      activeConflict = null;
      modalEl.remove();
      settleStatus();
    };

    const btnKeepBoth = document.createElement('button');
    btnKeepBoth.className = 'btn line';
    btnKeepBoth.textContent = 'Keep both versions / recover both';
    btnKeepBoth.onclick = async () => {
      // Use the latest local text, including anything typed after the conflict appeared
      const mine = extractScopeData(appState, conflict.key);
      const merged = mergePreservingBothVersions(conflict.key, mine, conflict.serverDoc.data);
      modalEl.remove();
      await resolveConflict(conflict.key, merged, conflict.serverDoc.revision, 'both_preserved');
    };

    const btnKeepMine = document.createElement('button');
    btnKeepMine.className = 'btn dark';
    btnKeepMine.textContent = 'Keep this device version →';
    btnKeepMine.onclick = async () => {
      modalEl.remove();
      const mine = extractScopeData(appState, conflict.key);
      await resolveConflict(conflict.key, mine, conflict.serverDoc.revision, 'client_overwrote');
    };

    acts.appendChild(btnKeepServer);
    acts.appendChild(btnKeepBoth);
    acts.appendChild(btnKeepMine);
    box.appendChild(acts);

    modalEl.appendChild(box);
    document.body.appendChild(modalEl);
  }

  function summarizeScopeData(data) {
    if (!data) return 'empty';
    if (data.answers) {
      const keys = Object.keys(data.answers);
      return keys.map((k) => `${k}: ${String(data.answers[k]).slice(0, 100)}`).join('\n');
    }
    if (data.bank) return `${data.bank.length} bank entries:\n` + data.bank.map(b => `- ${b.e}: ${b.m}`).join('\n');
    if (data.errs) return `${data.errs.length} error entries:\n` + data.errs.map(e => `- ${e.mine} -> ${e.corr}`).join('\n');
    if (data.bm) return `${data.bm.length} bookmarks`;
    if (data.ca) return `${data.ca.length} current affairs entries`;
    if (data.conversationId && Array.isArray(data.turns)) return `${data.turns.length} conversation turns · ${data.status || 'active'}`;
    return JSON.stringify(data, null, 2).slice(0, 300);
  }

  function mergePreservingBothVersions(key, clientData, serverData) {
    if (key.startsWith('conversation:')) {
      if (!window.KLANG_CONVERSATIONS) return Object.assign({}, serverData || {}, clientData || {}, {
        mergeState: { requiresResolution: true, reasons: ['conversation_engine_unavailable'] },
      });
      return window.KLANG_CONVERSATIONS.merge(clientData, serverData);
    }
    if (key.startsWith('unit:') || key.startsWith('review:')) {
      const clientAnswers = (clientData && clientData.answers) || {};
      const serverAnswers = (serverData && serverData.answers) || {};
      const allKeys = new Set([...Object.keys(clientAnswers), ...Object.keys(serverAnswers)]);
      const mergedAnswers = {};

      allKeys.forEach((k) => {
        const inClient = k in clientAnswers;
        const inServer = k in serverAnswers;
        if (inClient && inServer && (typeof clientAnswers[k] === 'object' || typeof serverAnswers[k] === 'object')) {
          // Stored feedback objects cannot be concatenated as text: keep this device's copy
          mergedAnswers[k] = clientAnswers[k] ?? serverAnswers[k];
        } else if (inClient && inServer) {
          const valClient = String(clientAnswers[k] ?? '');
          const valServer = String(serverAnswers[k] ?? '');
          if (valClient === valServer) {
            mergedAnswers[k] = clientAnswers[k];
          } else {
            // NEVER silently overwrite two different versions of the same string!
            // Preserve both clearly with headers so no writing is ever lost
            mergedAnswers[k] = `[This device version]:\n${valClient}\n\n[Server / other device version]:\n${valServer}`;
          }
        } else if (inClient) {
          mergedAnswers[k] = clientAnswers[k];
        } else {
          mergedAnswers[k] = serverAnswers[k];
        }
      });

      const clientSec = (clientData && clientData.sections) || {};
      const serverSec = (serverData && serverData.sections) || {};
      const mergedSections = Object.assign({}, serverSec, clientSec);

      return {
        answers: mergedAnswers,
        sections: mergedSections,
        done: !!(clientData?.done || serverData?.done),
      };
    }

    if (key === 'language-bank') {
      const bMap = new Map();
      (serverData?.bank || []).forEach((b) => bMap.set(b.id || b.e, b));
      (clientData?.bank || []).forEach((b) => {
        if (bMap.has(b.id || b.e) && JSON.stringify(bMap.get(b.id || b.e)) !== JSON.stringify(b)) {
          // Both modified: preserve both with unique keys
          bMap.set((b.id || b.e) + '_local', b);
        } else {
          bMap.set(b.id || b.e, b);
        }
      });
      return { bank: Array.from(bMap.values()) };
    }

    if (key === 'bookmarks') {
      const bmMap = new Map();
      (serverData?.bm || []).forEach((b) => bmMap.set(b.id, b));
      (clientData?.bm || []).forEach((b) => bmMap.set(b.id, b));
      return { bm: Array.from(bmMap.values()) };
    }

    if (key === 'error-log') {
      const errMap = new Map();
      (serverData?.errs || []).forEach((e) => errMap.set(e.id, e));
      (clientData?.errs || []).forEach((e) => {
        if (errMap.has(e.id) && JSON.stringify(errMap.get(e.id)) !== JSON.stringify(e)) {
          errMap.set(e.id + '_local', e);
        } else {
          errMap.set(e.id, e);
        }
      });
      return { errs: Array.from(errMap.values()) };
    }

    if (key === 'glossary') {
      // Custom entries merge by id; if both sides edited the same entry, keep both
      const gxMap = new Map();
      (serverData?.glx || []).forEach((g) => gxMap.set(g.id, g));
      (clientData?.glx || []).forEach((g) => {
        if (gxMap.has(g.id) && JSON.stringify(gxMap.get(g.id)) !== JSON.stringify(g)) {
          gxMap.set(g.id + '_local', Object.assign({}, g, { id: g.id + '_local' }));
        } else {
          gxMap.set(g.id, g);
        }
      });
      return {
        gl: Object.assign({}, serverData?.gl || {}, clientData?.gl || {}),
        glx: Array.from(gxMap.values()),
      };
    }

    if (key === 'portfolio') {
      // Status fields: this device wins; saved AI feedback: union by id so none is lost
      const sPf = serverData?.pf || {};
      const cPf = clientData?.pf || {};
      const pf = {};
      new Set([...Object.keys(sPf), ...Object.keys(cPf)]).forEach((k) => {
        const a = sPf[k] || {};
        const b = cPf[k] || {};
        const fbMap = new Map();
        (a.fb || []).forEach((f) => fbMap.set(f.id, f));
        (b.fb || []).forEach((f) => fbMap.set(f.id, f));
        const merged = Object.assign({}, a, b);
        if (fbMap.size) merged.fb = Array.from(fbMap.values()).sort((x, y) => String(x.at).localeCompare(String(y.at)));
        pf[k] = merged;
      });
      return { pf };
    }

    return Object.assign({}, serverData || {}, clientData || {});
  }

  async function resolveConflict(key, resolvedData, expectedServerRevision, resolutionType, attempt = 0) {
    setStatus('syncing');
    const seqAtSend = editSeq[key] || 0;
    const isConversation = key.startsWith('conversation:') && !!window.KLANG_CONVERSATIONS;
    const res = await apiFetch('/api/sync/resolve-conflict', {
      method: 'POST',
      body: {
        key,
        resolvedData,
        expectedServerRevision,
        resolutionType,
      },
    });

    if (res.status === 409 && isConversation && res.data && res.data.serverDoc && attempt < 3) {
      // Another device wrote again meanwhile: merge once more (lossless) instead of asking
      return resolveConflict(key, window.KLANG_CONVERSATIONS.merge(resolvedData, res.data.serverDoc.data), res.data.serverDoc.revision, resolutionType, attempt + 1);
    }

    if (res.status === 409) {
      // Document changed on server again during resolution!
      activeConflict = {
        key,
        clientData: resolvedData,
        clientRevision: expectedServerRevision,
        serverDoc: res.data.serverDoc,
      };
      setStatus('sync_conflict');
      showConflictModal(activeConflict);
      return;
    }

    if (res.ok && res.data.doc) {
      revisions[key] = res.data.doc.revision;
      conflictScopes.delete(key);
      activeConflict = null;
      if ((editSeq[key] || 0) === seqAtSend) {
        applyScopeData(appState, key, resolvedData);
        pendingScopes.delete(key);
      } else if (isConversation) {
        // New turns were added during resolution: keep them on top of the merged history
        applyScopeData(appState, key, window.KLANG_CONVERSATIONS.merge(extractScopeData(appState, key) || resolvedData, resolvedData));
        clearTimeout(syncTimer);
        syncTimer = setTimeout(syncPending, 800);
      } else {
        // User kept typing during resolution: keep local text and push it on top
        clearTimeout(syncTimer);
        syncTimer = setTimeout(syncPending, 800);
      }
      saveSyncMeta();
      if (onSaveLocal) onSaveLocal();
      if (onRemoteUpdate) onRemoteUpdate();
      settleStatus();
    } else {
      if (res.status === 401) return;
      setStatus(res.networkError ? 'offline' : 'sync_error');
      if (activeConflict) showConflictModal(activeConflict);
    }
  }

  /* ── Auth ─────────────────────────────────────────── */
  function startSession(user) {
    sessionLost = false;
    currentUser = user;
    updateAccountUI();
    if (currentUser?.isDemo) {
      setStatus('demo_mode');
      return Promise.resolve();
    }
    startSse();
    return fetchAndHydrate(false);
  }

  async function checkAuth() {
    // The auth gate (boot.js) already verified the session before loading the book
    if (window.KLANG_AUTH && window.KLANG_AUTH.user) return startSession(window.KLANG_AUTH.user);
    const res = await apiFetch('/api/auth/me');
    if (res.ok && res.data.authenticated) return startSession(res.data.user);
    if (res.ok) {
      handleUnauthorized();
      return;
    }
    setStatus(res.networkError ? 'offline' : 'sync_error');
  }

  async function logout() {
    // Last chance to push unsynced work; whatever cannot be sent stays on this device
    if (pendingScopes.size > 0 && navigator.onLine && !isSyncing) await syncPending();
    const unsynced = pendingScopes.size > 0;
    sessionLost = true; // our own 401s after this point are expected
    stopRealtime();
    await apiFetch('/api/auth/logout', { method: 'POST' });
    currentUser = null;
    saveSyncMeta();
    if (window.KLANG_AUTH) window.KLANG_AUTH.signedOut(unsynced);
    else updateAccountUI();
  }

  function updateAccountUI() {
    const sideAccount = document.getElementById('side-account');
    if (sideAccount) {
      const who = currentUser ? escapeHtml(currentUser.name || currentUser.email) : '';
      sideAccount.innerHTML = `
          <div class="user-info">
            <span class="u-name">${who}</span>
            <button type="button" class="btn-logout" id="act-logout">Sign out</button>
          </div>
          <div data-sync-status class="sync-badge ${STATUS_CLASSES[currentStatus] || ''}"><span class="dot"></span><span class="lbl">${STATUS_LABELS[currentStatus]}</span></div>
        `;
      document.getElementById('act-logout')?.addEventListener('click', (e) => {
        e.currentTarget.disabled = true;
        e.currentTarget.textContent = 'Signing out…';
        logout();
      });
    }

    // Topbar indicator
    const topSync = document.getElementById('topbar-sync');
    if (topSync) {
      topSync.innerHTML = `<div data-sync-status class="sync-badge ${STATUS_CLASSES[currentStatus] || ''}"><span class="dot"></span><span class="lbl">${STATUS_LABELS[currentStatus]}</span></div>`;
    }
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ── Network State Listeners ──────────────────────── */
  window.addEventListener('online', () => {
    if (!currentUser) {
      setStatus('saved_locally');
    } else if (pendingScopes.size > 0) {
      syncPending();
    } else {
      fetchAndHydrate();
    }
  });

  window.addEventListener('offline', () => {
    setStatus('offline');
  });

  // Sync on tab visibility focus
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && currentUser) {
      fetchAndHydrate();
    }
  });

  /* ── Public API ───────────────────────────────────── */
  window.KLANG_SYNC = {
    init: function (options) {
      appState = options.state;
      onRemoteUpdate = options.onRemoteUpdate;
      onSaveLocal = options.onSaveLocal;
      checkAuth();
    },
    markDirty,
    keyToScope,
    syncPending,
    logout,
    getStatus: () => currentStatus,
    getUser: () => currentUser,
    renderStatusBadge,
    updateAccountUI,
  };
})();
