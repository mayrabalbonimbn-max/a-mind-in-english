/* A MIND IN ENGLISH · boot.js
   Auth gate. Nothing of the book is loaded until the server confirms a session:
   the book scripts (content in data/*.js and app.js) are also refused by the
   server without a session, so this is not only a visual block. */
(function () {
  'use strict';

  const BOOK = (document.currentScript.dataset.book || '').split(/\s+/).filter(Boolean);
  const WM = 'M4 96V4L44 70L84 4V96M112 4V96M140 96V4L202 96V4M230 4H262A46 46 0 0 1 262 96H230Z';
  const MSG_KEY = 'klang.gate.msg';
  let bookLoading = null;
  let leaving = false;

  // Leaving the book always goes through a full page load, so nothing of it stays in
  // memory or on screen. Every keystroke is already in localStorage and the pending-sync
  // queue is persisted, so no writing is lost; after sign-in the normal startup reconciles.
  function relock(message, url) {
    if (leaving) return;
    leaving = true;
    auth.user = null;
    try { sessionStorage.setItem(MSG_KEY, message); } catch (e) { }
    document.body.classList.add('gated');
    if (url) location.replace(url);
    else location.reload();
  }

  const auth = (window.KLANG_AUTH = {
    user: null,
    // The server answered 401 (session expired or revoked)
    accountChanged() { relock("The active account changed. Your work remains with its original account."); },
    sessionExpired() {
      relock('Your session has ended. Sign in again: your work is safe on this device and will sync after you sign in.');
    },
    // After Sign out (session already invalidated on the server)
    signedOut(unsynced) {
      relock(unsynced ? 'Signed out. Some changes had not synced yet: they are kept on this device and will sync next time you sign in.' : '', '/');
    },
  });

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Could not load ' + src));
      document.body.appendChild(s);
    });
  }

  function loadBook() {
    if (!bookLoading) {
      bookLoading = (async () => {
        for (const src of BOOK) await loadScript(src);
      })();
    }
    return bookLoading;
  }

  async function getJson(url, opts) {
    try {
      const res = await fetch(url, Object.assign({ credentials: 'include', headers: { Accept: 'application/json', 'Content-Type': 'application/json' } }, opts));
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    } catch (e) {
      return { ok: false, status: 0, data: {} };
    }
  }

  function gateEl() {
    let g = document.getElementById('gate');
    if (!g) {
      g = document.createElement('div');
      g.id = 'gate';
      document.body.appendChild(g);
    }
    return g;
  }

  function showGate(message) {
    document.body.classList.add('gated');
    const g = gateEl();
    g.hidden = false;
    g.innerHTML = `
      <main class="gate-card" aria-labelledby="gate-title">
        <svg class="gate-wm" viewBox="-6 -6 320 108" role="img" aria-label="MIND"><path d="${WM}" fill="none" stroke="#371B18" stroke-width="8" stroke-linejoin="miter" stroke-miterlimit="10"/></svg>
        <h1 id="gate-title" class="gate-title">A Mind in English</h1>
        <form id="gate-form" class="gate-form" novalidate>
          <label>Email<input class="ti" name="email" type="email" autocomplete="username" autocapitalize="off" spellcheck="false" required></label>
          <label>Password<input class="ti" name="password" type="password" autocomplete="current-password" required></label>
          <p class="gate-msg" role="alert" ${message ? '' : 'hidden'}></p>
          <button class="btn rosa wide" type="submit">Sign in</button>
        </form>
      </main>`;
    const msg = g.querySelector('.gate-msg');
    if (message) msg.textContent = message;
    const form = g.querySelector('#gate-form');
    form.addEventListener('submit', onSubmit);
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    setTimeout(() => form.elements.email.focus(), 0);
  }

  function hideGate() {
    const g = document.getElementById('gate');
    if (g) {
      g.hidden = true;
      g.innerHTML = '';
    }
    document.body.classList.remove('gated');
  }

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const msg = form.querySelector('.gate-msg');
    const btn = form.querySelector('button[type=submit]');
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;
    if (!email || !password) {
      msg.textContent = 'Enter your email and password.';
      msg.hidden = false;
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Signing in…';
    const r = await getJson('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    form.elements.password.value = '';
    btn.disabled = false;
    btn.textContent = 'Sign in';
    if (!r.ok || !r.data.success) {
      msg.textContent =
        r.status === 0 ? 'No connection. Check your internet and try again.'
        : r.status === 429 ? (r.data.message || 'Too many attempts. Please wait and try again.')
        : 'Invalid email or password.';
      msg.hidden = false;
      return;
    }
    await enter(r.data.user);
  }

  async function enter(user) {
    window.KLANG_OWNERSHIP.bind(user);
    window.KLANG_SYNC.prepare();
    auth.user = user;
    try {
      // app.js starts sync with auth.user: hydrate from the cloud (never overwriting
      // unsynced local edits), push the pending queue, then open SSE
      await loadBook();
      hideGate();
    } catch (err) {
      showGate('Could not load the book. Check your connection and reload the page.');
    }
  }

  async function start() {
    let message = '';
    try { message = sessionStorage.getItem(MSG_KEY) || ''; sessionStorage.removeItem(MSG_KEY); } catch (e) { }
    const r = await getJson('/api/auth/me');
    if (r.ok && r.data.authenticated) return enter(r.data.user);
    if (r.status === 0) return showGate('No connection. Check your internet and reload the page.');
    showGate(message);
  }

  start();
})();
