/* A MIND IN ENGLISH · app.js
   Plain JavaScript. Everything you write is saved in this browser (localStorage) and synced to the
   account by sync.js; "back up everything" downloads a copy of all the work. */
(function () {
  'use strict';

  const K = window.KLANG || {};
  const CUR = K.curriculum;
  const UNITS = K.units || {};
  const REVIEWS = K.reviews || {};
  const STAGES = [
    ['know', 'Know'], ['read', 'Read'], ['interpret', 'Interpret'], ['notice', 'Notice'], ['steal', 'Steal'],
    ['think', 'Think'], ['write', 'Write'], ['edit', 'Edit'], ['retrieve', 'Retrieve']
  ];
  const STAGE_TITLES = {
    know: 'Enough context to think', read: 'Read it slowly', interpret: 'Read between the lines',
    notice: 'Grammar & language in context', steal: 'Language worth stealing', think: 'Thinking Lab',
    write: 'Write', edit: 'Edit your draft', retrieve: 'Close the book'
  };
  /* Core path: presentation-only metadata. It never changes progress, completion or what can be opened.
     CORE marks each unit's essential cycle READ → INTERPRET → NOTICE → STEAL → WRITE → EDIT → later RETRIEVE.
     Chosen unit by unit: the main-idea question plus the two INTERPRET questions closest to the unit's THINK
     focus; the NOTICE focus that the unit's own grammar retrieval (r5) returns to (focus 1 in every unit so far);
     four reusable argument frames from STEAL; one THINK activity per unit, picked by hand as the bridge from
     understanding to the unit's argument and main WRITE task; the main WRITE task (it.main); r1, r2 and r7 of RETRIEVE.
     KNOW, the other THINK activities and everything unmarked is extra practice: always available, never required. */
  const CORE_STAGE = { know: 'optional', read: 'core', edit: 'core' };
  const CORE = {
    '01': { think: ['t5'], interpret: ['i1', 'i10', 'i14'], notice: 0, steal: ['c3', 'c4', 'c9', 'c12'], retrieve: ['r1', 'r2', 'r7'] },
    '02': { think: ['02t4'], interpret: ['02i1', '02i6', '02i11'], notice: 0, steal: ['02c2', '02c3', '02c6', '02c7'], retrieve: ['02r1', '02r2', '02r7'] },
    '03': { think: ['03t5'], interpret: ['03i1', '03i7', '03i10'], notice: 0, steal: ['03c1', '03c5', '03c8', '03c9'], retrieve: ['03r1', '03r2', '03r7'] },
    '04': { think: ['04t3'], interpret: ['04i1', '04i6', '04i9'], notice: 0, steal: ['04c3', '04c5', '04c8', '04c9'], retrieve: ['04r1', '04r2', '04r7'] },
    '05': { think: ['05t5'], interpret: ['05i1', '05i10', '05i11'], notice: 0, steal: ['05c3', '05c4', '05c6', '05c9'], retrieve: ['05r1', '05r2', '05r7'] },
    '06': { think: ['06t5'], interpret: ['06i1', '06i6', '06i10'], notice: 0, steal: ['06c1', '06c2', '06c6', '06c10'], retrieve: ['06r1', '06r2', '06r7'] },
    '07': { think: ['07t3'], interpret: ['07i1', '07i8', '07i11'], notice: 0, steal: ['07c3', '07c6', '07c7', '07c9'], retrieve: ['07r1', '07r2', '07r7'] },
    '08': { think: ['08t5'], interpret: ['08i1', '08i6', '08i9'], notice: 0, steal: ['08c1', '08c4', '08c5', '08c7'], retrieve: ['08r1', '08r2', '08r7'] },
    '09': { think: ['09t4'], interpret: ['09i1', '09i9', '09i11'], notice: 0, steal: ['09c3', '09c5', '09c6', '09c8'], retrieve: ['09r1', '09r2', '09r7'] },
    '10': { think: ['10t5'], interpret: ['10i1', '10i7', '10i9'], notice: 0, steal: ['10c4', '10c6', '10c7', '10c10'], retrieve: ['10r1', '10r2', '10r7'] },
    '11': { think: ['11t1'], interpret: ['11i1', '11i3', '11i5'], notice: 0, steal: ['11c1', '11c2', '11c4', '11c7'], retrieve: ['11r1', '11r2', '11r7'] },
    '12': { think: ['12t1'], interpret: ['12i1', '12i2', '12i5'], notice: 0, steal: ['12c1', '12c3', '12c5', '12c7'], retrieve: ['12r1', '12r2', '12r7'] },
    '13': { think: ['13t2'], interpret: ['13i1', '13i3', '13i5'], notice: 0, steal: ['13c1', '13c2', '13c5', '13c8'], retrieve: ['13r1', '13r2', '13r7'] },
    '14': { think: ['14t1'], interpret: ['14i1', '14i2', '14i5'], notice: 0, steal: ['14c1', '14c2', '14c4', '14c6'], retrieve: ['14r1', '14r2', '14r7'] },
    '15': { think: ['15t1'], interpret: ['15i1', '15i3', '15i5'], notice: 0, steal: ['15c1', '15c3', '15c5', '15c7'], retrieve: ['15r1', '15r2', '15r7'] },
    '16': { think: ['16t1'], interpret: ['16i1', '16i2', '16i5'], notice: 0, steal: ['16c1', '16c3', '16c5', '16c8'], retrieve: ['16r1', '16r2', '16r7'] },
    '17': { think: ['17t1'], interpret: ['17i1', '17i3', '17i5'], notice: 0, steal: ['17c1', '17c2', '17c5', '17c7'], retrieve: ['17r1', '17r2', '17r7'] },
    '18': { think: ['18t1'], interpret: ['18i1', '18i2', '18i5'], notice: 0, steal: ['18c1', '18c3', '18c4', '18c6'], retrieve: ['18r1', '18r2', '18r7'] },
    '19': { think: ['19t1'], interpret: ['19i1', '19i3', '19i5'], notice: 0, steal: ['19c1', '19c2', '19c5', '19c8'], retrieve: ['19r1', '19r2', '19r7'] },
    '20': { think: ['20t1'], interpret: ['20i1', '20i2', '20i5'], notice: 0, steal: ['20c1', '20c3', '20c5', '20c7'], retrieve: ['20r1', '20r2', '20r7'] },
    '21': { think: ['21t1'], interpret: ['21i1', '21i2', '21i5'], notice: 0, steal: ['21c1', '21c2', '21c4', '21c5'], retrieve: ['21r1', '21r2', '21r7'] },
    '22': { think: ['22t1'], interpret: ['22i1', '22i3', '22i5'], notice: 0, steal: ['22c1', '22c3', '22c5', '22c7'], retrieve: ['22r1', '22r2', '22r7'] },
    '23': { think: ['23t1'], interpret: ['23i1', '23i2', '23i5'], notice: 0, steal: ['23c1', '23c2', '23c3', '23c8'], retrieve: ['23r1', '23r2', '23r7'] },
    '24': { think: ['24t1'], interpret: ['24i1', '24i3', '24i5'], notice: 0, steal: ['24c1', '24c3', '24c4', '24c5'], retrieve: ['24r1', '24r2', '24r7'] },
    '25': { think: ['25t1'], interpret: ['25i1', '25i2', '25i5'], notice: 0, steal: ['25c1', '25c2', '25c3', '25c7'], retrieve: ['25r1', '25r2', '25r7'] },
    '26': { think: ['26t1'], interpret: ['26i1', '26i2', '26i5'], notice: 0, steal: ['26c1', '26c3', '26c4', '26c5'], retrieve: ['26r1', '26r2', '26r7'] },
    '27': { think: ['27t1'], interpret: ['27i1', '27i2', '27i5'], notice: 0, steal: ['27c1', '27c2', '27c4', '27c7'], retrieve: ['27r1', '27r2', '27r7'] },
    '28': { think: ['28t1'], interpret: ['28i1', '28i2', '28i5'], notice: 0, steal: ['28c1', '28c2', '28c3', '28c7'], retrieve: ['28r1', '28r2', '28r7'] },
    '29': { think: ['29t1'], interpret: ['29i1', '29i2', '29i5'], notice: 0, steal: ['29c1', '29c2', '29c5', '29c6'], retrieve: ['29r1', '29r2', '29r7'] },
    '30': { think: ['30t1'], interpret: ['30i1', '30i2', '30i5'], notice: 0, steal: ['30c1', '30c2', '30c3', '30c5'], retrieve: ['30r1', '30r2', '30r7'] },
    '31': { think: ['31t1'], interpret: ['31i1', '31i2', '31i5'], notice: 0, steal: ['31c1', '31c2', '31c4', '31c5'], retrieve: ['31r1', '31r2', '31r7'] },
    '32': { think: ['32t1'], interpret: ['32i1', '32i2', '32i5'], notice: 0, steal: ['32c1', '32c2', '32c3', '32c7'], retrieve: ['32r1', '32r2', '32r7'] }
  };
  const isCore = (u, stage, id) => { const c = CORE[u]; return !!(c && Array.isArray(c[stage]) && c[stage].includes(id)); };
  const CORE_TAG = '<span class="tago core" title="Part of this unit\'s essential cycle">core</span>';
  const OPTIONAL_TAG = '<span class="tago">optional · extra practice</span>';
  const REVIEW_STAGES = [
    ['retrieve', 'Retrieve from memory'], ['language', 'Language check'], ['steal', 'Vocabulary + Steal'],
    ['glossary', 'Personal glossary'], ['errors', 'Error Log'], ['reading', 'Transfer reading'],
    ['reasoning', 'Reasoning Lab'], ['editing', 'Editing Lab'], ['synthesis', 'Synthesis writing'],
    ['assessment', 'Self-assessment']
  ];
  const ALL = [];
  CUR.modules.forEach(m => m.units.forEach(u => { u.module = m.id; u.moduleTitle = m.title; ALL.push(u); }));
  const meta = id => ALL.find(u => u.id === id);
  const has = id => !!UNITS[id];

  /* ── storage ─────────────────────────────── */
  const isDemo = () => !!(window.KLANG_AUTH && window.KLANG_AUTH.user && window.KLANG_AUTH.user.isDemo);
  const SKEY = 'klang.mind.v1';
  const DEMO_SKEY = 'klang.mind.demo.v1';
  // bank: the retired Language Bank. Never shown or written any more; kept so old data survives sync, backup and restore.
  const DEF = { a: {}, sec: {}, ud: {}, rd: {}, md: {}, gl: {}, glx: [], bm: [], bank: [], errs: [], pf: {}, sp: [], last: null, prefs: { fs: 19, w: 66 }, ca: [], lb: null, conversations: {}, study: { activeSession: null, sessions: [] }, learningJudgments: {} };
  const DEF_DEMO = {
    ...DEF,
    gl: { '01:v:precedent': 'know', '01:c:point-in-time': 'learning' },
    errs: [
      { id: 'demo-e1', mine: 'I have seen him yesterday.', corr: 'I saw him yesterday.', why: 'Definite past time reference requires simple past, not present perfect.', ex: 'I saw her at the conference two days ago.', n: 1, last: '2026-09-29' }
    ]
  };

  let S = JSON.parse(JSON.stringify(DEF));
  let storageOK = true;

  function activeStorage() {
    return isDemo() ? sessionStorage : localStorage;
  }

  function activeStorageKey() {
    return isDemo() ? DEMO_SKEY : SKEY;
  }

  try {
    if (isDemo()) {
      const rawDemo = sessionStorage.getItem(DEMO_SKEY);
      if (rawDemo) {
        const o = JSON.parse(rawDemo);
        Object.keys(DEF).forEach(k => { if (o[k] !== undefined) S[k] = o[k]; });
      } else {
        S = JSON.parse(JSON.stringify(DEF_DEMO));
        sessionStorage.setItem(DEMO_SKEY, JSON.stringify(S));
      }
    } else {
      const raw = localStorage.getItem(SKEY);
      if (raw) { const o = JSON.parse(raw); Object.keys(DEF).forEach(k => { if (o[k] !== undefined) S[k] = o[k]; }); }
    }
  } catch (e) { storageOK = false; }

  /* Module Reviews 1–2 used to store the Timed essay under the Reasoning Lab MCQ's id (m1t1 / m2t1),
     so answering one overwrote the other. The essay now has its own id (data/module-reviews.js).
     Essay text still under the shared key moves to the new key; the MCQ keeps the old key and only
     ever holds an option index. Text is never dropped: if both keys hold different text, the older one
     is kept under "<new key>:legacy" (then ":legacy:2"…) and shown under the essay. If the essay had
     overwritten a checked MCQ answer, that answer comes back from its ":checked" record. */
  const LEGACY_TIMED_IDS = { 1: 'm1t1', 2: 'm2t1' };
  const legacyKeys = (a, newK) => Object.keys(a || {}).filter(k => k === `${newK}:legacy` || k.startsWith(`${newK}:legacy:`)).sort();
  function migrateLegacyTimed(state) {
    const scopes = [];
    Object.keys(LEGACY_TIMED_IDS).forEach(id => {
      const t = REVIEWS[id] && REVIEWS[id].timed; if (!t) return;
      const oldK = `r${id}:${LEGACY_TIMED_IDS[id]}`, newK = `r${id}:${t.id}`;
      if (oldK === newK) return;
      const v = state.a && state.a[oldK];
      if (typeof v === 'string' && v.trim() && !/^\d+$/.test(v.trim())) {
        const cur = String(state.a[newK] || '');
        if (!cur.trim()) state.a[newK] = v;
        else if (cur !== v && !legacyKeys(state.a, newK).some(k => state.a[k] === v)) {
          let slot = `${newK}:legacy`, n = 1;
          while (state.a[slot] !== undefined) slot = `${newK}:legacy:${++n}`;
          state.a[slot] = v;
        }
        delete state.a[oldK];
        const ck = state.a[`${oldK}:checked`];
        if (ck && /^\d+$/.test(String(ck.answer))) state.a[oldK] = String(ck.answer);
        scopes.push(`review:${id}`);
      }
      if (state.pf && state.pf[oldK]) {
        const from = state.pf[oldK], to = state.pf[newK] || {}, seen = new Set((to.fb || []).map(f => f.id));
        state.pf[newK] = Object.assign({}, from, to, { fb: (to.fb || []).concat((from.fb || []).filter(f => !seen.has(f.id))) });
        delete state.pf[oldK];
        scopes.push('portfolio');
      }
    });
    return scopes;
  }
  function applyLegacyMigration() {
    const scopes = migrateLegacyTimed(S);
    if (scopes.length) { saveNow(); scopes.forEach(notifySync); }
  }

  function notifySync(scopeOrKey) {
    if (isDemo()) return;
    if (window.KLANG_SYNC && scopeOrKey) {
      const scope = window.KLANG_SYNC.keyToScope(scopeOrKey);
      window.KLANG_SYNC.markDirty(scope);
    }
  }

  function save(scopeOrKey) {
    try {
      activeStorage().setItem(activeStorageKey(), JSON.stringify(S));
    } catch (e) {
      storageOK = false;
    }
    if (scopeOrKey) notifySync(scopeOrKey);
  }

  function saveNow(scopeOrKey) {
    try {
      activeStorage().setItem(activeStorageKey(), JSON.stringify(S));
      if (scopeOrKey) notifySync(scopeOrKey);
      return true;
    } catch (e) {
      storageOK = false;
      return false;
    }
  }

  /* ── helpers ─────────────────────────────── */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const strip = s => String(s || '').replace(/\{\{([^|}]+)\|[^}]+\}\}/g, '$1').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
  const vw = (s, u) => String(s).replace(/\{\{([^|}]+)\|([^}]+)\}\}/g, (m, w, k) => `<span class="vw" role="button" tabindex="0" data-v="${u}:${k}">${w}</span>`);
  const words = t => (String(t || '').trim().match(/[A-Za-zÀ-ÿ0-9’'-]+/g) || []).length;
  const today = () => new Date().toISOString().slice(0, 10);
  const uid = () => Math.random().toString(36).slice(2, 9);
  const LET = 'ABCDEFGH';
  let REG = {};

  const ICON = {
    bm: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/></svg>',
    err: '<svg viewBox="0 0 24 24"><path d="M4 20h16"/><path d="M6 16l9-9 3 3-9 9H6z"/></svg>',
    pf: '<svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7M9 8h3"/></svg>',
    ca: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/></svg>',
    gl: '<svg viewBox="0 0 24 24"><path d="M4 5h16M4 10h16M4 15h10M4 20h7"/></svg>'
  };
  const WM = 'M4 4V96M4 60L58 4M24 40L62 96M84 4V92H130M146 96L190 8L234 96M254 96V4L316 96V4M425.7 23.6A46 46 0 1 0 434 50H394';
  const wordmark = (c = '#F3EBE3', cls = 'wm') => `<svg class="${cls}" viewBox="-2 -6 446 108" role="img" aria-label="KLANG"><path d="${WM}" fill="none" stroke="${c}" stroke-width="8" stroke-linejoin="miter" stroke-miterlimit="10"/></svg>`;
  const lockup = () => `<svg viewBox="-2 -6 660 108" role="img" aria-label="KLANG, o som da língua"><path d="${WM}" fill="none" stroke="#F3EBE3" stroke-width="8" stroke-linejoin="miter" stroke-miterlimit="10"/><g fill="#E8BCC1" font-family="Jost, Futura, sans-serif" font-size="19" font-weight="500" letter-spacing="7"><text x="500" y="22">O SOM</text><text x="500" y="56">DA</text><text x="500" y="90">LÍNGUA</text></g></svg>`;

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2000);
  }
  function copyText(txt, okMsg) {
    const fallback = () => {
      const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e) { }
      ta.remove(); toast(ok ? okMsg : 'Copy blocked here. Select the text and copy it manually.');
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(() => toast(okMsg), fallback);
      else fallback();
    } catch (e) { fallback(); }
  }

  /* ── progress ─────────────────────────────── */
  const secDone = (u, s) => !!S.sec[u + ':' + s];
  const unitSecCount = u => STAGES.filter(([s]) => secDone(u, s)).length;
  function unitState(u) {
    if (S.ud[u]) return 'done';
    if (unitSecCount(u) || Object.keys(S.a).some(k => k.startsWith(u + ':') && S.a[k])) return 'part';
    return '';
  }
  function overall() {
    let done = 0; ALL.forEach(u => { done += S.ud[u.id] ? STAGES.length : unitSecCount(u.id); });
    return Math.round(done / (ALL.length * STAGES.length) * 100);
  }
  const modDone = m => !!S.md[m.id] || (m.units.every(u => S.ud[u.id]) && (!REVIEWS[m.id] || S.rd[m.id]));
  function continueTarget() {
    if (S.last && /^r[12]$/.test(S.last.u) && REVIEWS[S.last.u.slice(1)]) return `${S.last.u}-${S.last.s || 'retrieve'}`;
    if (S.last && has(S.last.u)) return `u${S.last.u}-${S.last.s || 'know'}`;
    const first = ALL.find(u => has(u.id) && !S.ud[u.id]) || ALL[0];
    return `u${first.id}-know`;
  }

  /* ── glossary helpers ─────────────────────── */
  function glossaryEntries() {
    const out = [];
    Object.keys(UNITS).sort().forEach(u => {
      const d = UNITS[u]; if (!d.steal) return;
      (d.steal.vocab || []).forEach(v => out.push({ u, key: 'v:' + v.key, kind: 'word', title: v.w, def: v.def, extra: (v.col || []).join(' · ') }));
      (d.steal.chunks || []).forEach(c => out.push({ u, key: 'c:' + c.key, kind: 'chunk', title: c.c, def: c.meaning, extra: c.ex }));
    });
    (S.glx || []).forEach(g => out.push({ u: g.u, key: 'x:' + g.id, kind: 'mine', title: esc(g.term), def: esc(g.meaning || g.mydef || ''), extra: esc([g.ctx, g.ex, g.notes].filter(Boolean).join(' · ')), mine: g }));
    return out;
  }
  const glStatus = (u, key) => S.gl[u + ':' + key] || '';
  function statusCtl(u, key) {
    const cur = glStatus(u, key);
    return `<span class="status" role="group" aria-label="Status">${['new', 'learning', 'know'].map(s => `<button type="button" data-gl="${u}:${key}" data-st="${s}" class="${cur === s ? 'on' : ''}" aria-pressed="${cur === s}">${s.toUpperCase()}</button>`).join('')}</span>`;
  }
  const isBm = id => S.bm.some(b => b.id === id);
  function bmBtn(id, type, u, text, ref) {
    return `<button type="button" class="ibtn bmk ${isBm(id) ? 'on' : ''}" title="Bookmark" aria-label="Bookmark" data-bm='${esc(JSON.stringify({ id, type, u, text: strip(text).slice(0, 220), ref }))}'>${ICON.bm}</button>`;
  }

  /* ── item renderers ─────────────────────── */
  function wcHtml(k, min, max) {
    const n = words(S.a[k]);
    return `<div class="wc" data-for="${k}" data-min="${min}" data-max="${max}">${wcInner(n, min, max)}</div>`;
  }
  function wcInner(n, min, max) {
    const cap = max * 1.25, pct = Math.min(100, n / cap * 100);
    return `<b>${n}</b> words <span>· target ${min}–${max}</span><span class="wbar"><s style="left:${min / cap * 100}%;width:${(max - min) / cap * 100}%"></s><i style="width:${pct}%"></i></span>`;
  }
  function wcClass(el) {
    const n = words(S.a[el.dataset.for]), min = +el.dataset.min, max = +el.dataset.max;
    el.innerHTML = wcInner(n, min, max);
    el.classList.toggle('in', n >= min && n <= max); el.classList.toggle('over', n > max);
  }
  const ta = (k, rows = 3, ph = 'Write your answer…', extra = '') => `<textarea class="ta" id="f-${k.replace(/:/g, '-')}" data-k="${k}" rows="${rows}" placeholder="${ph}" ${extra}>${esc(S.a[k] || '')}</textarea>`;

  function qHead(u, it, num, stage) {
    const core = (it._stage === 'interpret' || it._stage === 'retrieve' || it._stage === 'think') && isCore(u, it._stage, it.id);
    const optional = it._stage === 'think' && CORE[u] && !core;
    return `<div class="qh">${num ? `<span class="qn">${num}</span>` : ''}${it.tag ? `<span class="tagp">${esc(it.tag)}</span>` : ''}${core ? CORE_TAG : ''}${optional ? OPTIONAL_TAG : ''}</div>`;
  }

  function renderSavedLightFeedback(k) {
    const fb = S.a[`${k}:lightfb`] || S.a[`${k}:intfb`];
    if (!fb || !fb.f) return '';
    const f = fb.f;
    const content = f.content;
    const lang = f.language || f;

    let html = '<div class="light-fb">';
    if (content) {
      // Task-coverage verdicts only. Older saved checks may carry text-fidelity verdicts (accurate,
      // misunderstood…) that were given without the reading: their comment stays, without a badge.
      let vBadge = '';
      if (content.verdict === 'developed') vBadge = '<span class="tagp" style="background:#e8f5e9;color:#2e7d32">Developed</span>';
      else if (content.verdict === 'partial') vBadge = '<span class="tagp" style="background:#fff8e1;color:#b45309">Partial</span>';
      else if (content.verdict === 'needs_clarification') vBadge = '<span class="tagp" style="background:#e0f2fe;color:#0369a1">Question clarification</span>';
      else if (content.verdict === 'not_answered') vBadge = '<span class="tagp" style="background:#f1f5f9;color:#475569">Not answered</span>';

      html += `<div class="int-content-block"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><b>Your interpretation:</b> ${vBadge}</div><p>${esc(content.commentary)}</p></div>`;
    }

    html += `<div class="int-lang-block" style="${content ? 'margin-top:10px' : ''}"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><b>Language feedback:</b> <span style="font-size:13px;color:${lang.meaningClear ? '#2e7d32' : '#b45309'}">${lang.meaningClear ? 'Meaning is clear' : 'Meaning could be clearer'}</span></div>`;

    if (lang.naturalVersion) {
      html += `<p style="margin:6px 0 2px;font-size:13.5px;color:var(--cinza)"><b>More natural version:</b></p><div class="model" style="margin-bottom:8px">“${esc(lang.naturalVersion)}”</div>`;
    }

    if (lang.pointsToNotice && lang.pointsToNotice.length) {
      html += `<p style="margin:6px 0 2px;font-size:13.5px;color:var(--cinza)"><b>Things to notice:</b></p><ul class="sup" style="margin:4px 0 8px">${lang.pointsToNotice.map(p => `<li><s>${esc(p.quote)}</s> → <b>${esc(p.suggestion)}</b> <em>(${esc(p.issue)}${p.category ? ` · ${p.category}` : ''})</em></li>`).join('')}</ul>`;
    }

    if (lang.errorLogCandidate) {
      const c = lang.errorLogCandidate;
      html += `<div style="margin-top:8px"><button class="btn ghost sm" data-act="light2err" data-k="${k}">+ add “${esc(c.mine)}” to Error Log</button></div>`;
    }

    html += '</div></div>';
    return html;
  }

  function renderSavedExplainQuestion(k) {
    const eq = S.a[`${k}:explainq`];
    if (!eq || !eq.f) return '';
    const f = eq.f;
    return `<div class="fb" style="background:var(--bg-warm, #f8f6f2);border-left:3px solid var(--accent, #b45309);padding:12px 14px;margin-top:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><b style="font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:var(--accent, #b45309)">Understanding the question</b><small class="muted">${esc(String(eq.at || '').slice(0, 10))}</small></div>
      <p style="margin:0 0 6px"><b>Overview:</b> ${esc(f.overview)}</p>
      ${(f.parts || []).length ? `<p style="margin:0 0 4px"><b>Parts to address:</b></p><ul style="margin:0 0 6px;padding-left:18px">${f.parts.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
      ${(f.keyTerms || []).length ? `<p style="margin:0 0 4px"><b>Key terms:</b></p><ul style="margin:0 0 6px;padding-left:18px">${f.keyTerms.map(kt => `<li><b>${esc(kt.term)}:</b> ${esc(kt.meaningInContext || kt.meaning)}</li>`).join('')}</ul>` : ''}
      <p style="margin:0;font-size:13px;color:var(--text-muted, #555)"><b>Focus on:</b> ${esc(f.whatToFocusOn)}</p>
    </div>`;
  }

  /* ── writing support: register guide + useful language + writing tips (register.js; local, never AI) ── */
  function supportHtml(u, it, stage) {
    const RG = window.KLANG_REGISTER, s = RG && RG.supportFor(u, stage, it);
    if (!s) return '';
    const frames = a => a.length ? `<ul class="wsf">${a.map(x => `<li>“${esc(x)}”</li>`).join('')}</ul>` : '';
    const steps = a => a.length ? `<ol class="wss">${a.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : '';
    const note = t => t ? `<p class="wsn">${esc(t)}</p>` : '';
    const plan = p => p ? `<div class="wsk">${esc(p.title)}</div>${note(p.lead)}<ul class="wss">${p.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
    const m = s.more;
    return `<details class="wsup" data-level="${s.level}"><summary>writing support <span aria-hidden="true">→</span></summary><div class="wsb">
      <div class="wsk">Register</div><p class="wsl">${esc(s.label)}</p>${note(s.why)}
      <div class="wsk">Useful language</div>${frames(s.frames)}
      <div class="wsk">Writing tips</div>${note(s.summary)}${steps(s.steps)}${note(s.note)}
      ${plan(s.plan)}
      ${m ? `<details class="wsmore"><summary>need more support? <span aria-hidden="true">→</span></summary><div>${note(m.why)}${m.steps.length ? `<div class="wsk">Step by step</div>${steps(m.steps)}` : ''}${note(m.note)}${m.frames.length ? `<div class="wsk">More useful language</div>${frames(m.frames)}` : ''}${plan(m.plan)}</div></details>` : ''}
      <p class="wsfoot">Frames, not answers: the ideas are yours.</p></div></details>`;
  }

  function renderItem(u, it, num, stage) {
    const k = u + ':' + it.id; REG[k] = it; it._stage = stage;
    const bm = bmBtn(k, 'question', u, it.q || it.title || '', `u${u}-${stage}`);
    switch (it.type) {
      case 'mc': return `<div class="q" id="q-${k}">${qHead(u, it, num)}<div class="qt">${it.q}</div>
        <div class="opts">${(it.options || it.choices || []).map((o, i) => `<label class="opt"><input type="radio" name="${k}" data-k="${k}" value="${i}" ${String(S.a[k]) === String(i) ? 'checked' : ''}><span><span class="l">${LET[i]}</span>${o}</span></label>`).join('')}</div>
        <div class="qact"><button class="btn line sm" data-act="check" data-q="${k}">check answer →</button>${bm}</div><div class="fbw" data-fb="${k}"></div></div>`;
      case 'tf': return `<div class="q" id="q-${k}">${qHead(u, it, num)}<div class="qt">${it.q}</div>
        <div class="tf">${['True', 'False'].map((o, i) => `<label class="opt"><input type="radio" name="${k}" data-k="${k}" value="${o}" ${S.a[k] === o ? 'checked' : ''}><span>${o}</span></label>`).join('')}</div>
        ${ta(k + ':why', 2, 'Justify with evidence from the text…')}
        <div class="qact"><button class="btn line sm" data-act="check" data-q="${k}">check answer →</button>${isDemo() ? '' : `<button class="btn line sm" data-act="whylightfb" data-q="${k}" data-u="${u}" data-task="${it.id}">check my english</button>`}${bm}</div><div class="fbw" data-fb="${k}"></div><div class="lightfbw" data-lightfb="${k}:why">${renderSavedLightFeedback(k + ':why')}</div></div>`;
      case 'open': {
        const isInterpret = stage === 'interpret';
        const aiBtn = isDemo() ? '' : isInterpret
          ? `<button class="btn line sm" data-act="intfb" data-q="${k}" data-u="${u}" data-item="${it.id}">check interpretation & english →</button>`
          : `<button class="btn line sm" data-act="lightfb" data-q="${k}" data-u="${u}" data-stage="${stage}" data-task="${it.id}">check my english →</button>`;
        const explainBtn = isDemo() ? '' : `<button class="btn ghost sm" data-act="explainq" data-q="${k}" data-u="${u}" data-stage="${stage}" data-task="${it.id}">explain the question</button>`;
        return `<div class="q" id="q-${k}">${qHead(u, it, num)}<div class="qt">${it.q}</div>${supportHtml(u, it, stage)}${ta(k, it.rows || 4)}
        ${it.target ? wcHtml(k, it.target[0], it.target[1]) : ''}
        <div class="qact">${it.guide ? `<button class="btn line sm" data-act="guide" data-q="${k}">see guidance</button>` : ''}${explainBtn}${aiBtn}${bm}</div><div class="fbw" data-fb="${k}"></div><div class="explainqw" data-explainq="${k}">${renderSavedExplainQuestion(k)}</div><div class="lightfbw" data-lightfb="${k}">${renderSavedLightFeedback(k)}</div></div>`;
      }
      case 'produce': return `<div class="q" id="q-${k}">${qHead(u, it, num)}<div class="qt">${it.q}</div>${ta(k, 2, 'Your version…')}
        <div class="qact"><button class="btn line sm" data-act="model" data-q="${k}">check answer →</button>${bm}</div><div class="fbw" data-fb="${k}"></div></div>`;
      case 'label': return `<div class="q" id="q-${k}">${qHead(u, it, num)}<div class="qt">${it.q}</div>
        <div class="ltable">${(it.rows || []).map((r, i) => `<div class="lrow" data-row="${k}:${i}"><span>${r.text || r}</span><select data-k="${k}:${i}" aria-label="Label"><option value="">choose…</option>${(it.labels || []).map(l => `<option ${S.a[k + ':' + i] === l ? 'selected' : ''}>${l}</option>`).join('')}</select></div>`).join('')}</div>
        <div class="qact"><button class="btn line sm" data-act="label" data-q="${k}">check answers →</button>${bm}</div></div>`;
      case 'match': {
        const rights = (it.pairs || []).map(p => p[1]).slice().sort();
        return `<div class="q" id="q-${k}">${qHead(u, it, num)}<div class="qt">${it.q}</div>
        <div class="ltable">${(it.pairs || []).map((p, i) => `<div class="lrow" data-row="${k}:${i}" style="grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)"><b style="font-weight:600">${p[0]}</b><select data-k="${k}:${i}" aria-label="Match"><option value="">choose…</option>${rights.map(r => `<option ${S.a[k + ':' + i] === r ? 'selected' : ''}>${r}</option>`).join('')}</select></div>`).join('')}</div>
        <div class="qact"><button class="btn line sm" data-act="match" data-q="${k}">check answers →</button>${bm}</div></div>`;
      }
      case 'group': return `<div class="qs">${it.lead ? `<p class="sub" style="margin:0">${it.lead}</p>` : ''}${it.items.map((x, i) => renderItem(u, x, (i + 1) + '', stage)).join('')}</div>`;
      default: return '';
    }
  }
  function renderWriting(u, it, stage) {
    const k = u + ':' + it.id; REG[k] = it; it._stage = stage;
    return `<div class="wtask ${it.revisionOf ? 'revised' : ''}" id="q-${k}">
      <div class="wk"><span class="tagp">${esc(it.kind)}</span><span class="tago">${it.min}–${it.max} words</span>${it.main ? '<span class="tago">In your portfolio</span>' : ''}${it.main && stage === 'write' && CORE[u] ? CORE_TAG : ''}</div>
      <h3>${esc(it.title)}</h3><div class="pr">${it.prompt}</div>
      ${it.support ? (Array.isArray(it.support) ? `<ul class="sup">${it.support.map(s => `<li>${s}</li>`).join('')}</ul>` : `<p class="sup">${it.support}</p>`) : ''}
      ${supportHtml(u, it, stage)}
      ${isLongForm(it) ? lfFlow(k, it) + outlineHtml(k) : ''}
      ${ta(k, 14, 'Start writing…', 'spellcheck="true"')}
      ${wcHtml(k, it.min, it.max)}
      <div class="qact" style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
        ${it.guide ? `<button class="btn line sm" data-act="guide" data-q="${k}">see guidance</button>` : ''}
        <button class="btn line sm" data-act="copyone" data-q="${k}">copy this text</button>
        ${aiFeedbackBtn(k)}
      </div><div class="fbw" data-fb="${k}"></div>
      <div class="aifb" data-aifb="${k}">${savedFeedbackHtml(k)}</div></div>`;
  }

  /* ── long-form writing: optional outline → draft → feedback → revision ── */
  const isLongForm = it => !it.revisionOf && !it.timed && +it.min >= 800;
  function lfFlow(k, it) {
    const u = k.split(':')[0], rev = UNITS[u] && UNITS[u].edit && UNITS[u].edit.revised;
    const hasRev = rev && rev.revisionOf === it.id;
    const done = [
      !!String(S.a[`${k}:outline`] || '').trim(),
      words(S.a[k]) >= it.min,
      ((S.pf[k] || {}).fb || []).some(f => f.draft === 'first'),
      hasRev && !!String(S.a[`${u}:${rev.id}`] || '').trim()
    ];
    const labels = ['Outline <small>optional</small>', 'Draft', 'Feedback <small>when you ask</small>', hasRev ? `<a href="#u${u}-edit">Revision in EDIT</a>` : 'Revision'];
    return `<ol class="lfflow" aria-label="Long-form workflow">${labels.map((l, i) => `<li class="${done[i] ? 'on' : ''}">${l}</li>`).join('')}</ol>`;
  }
  function outlineHtml(k) {
    const ok = `${k}:outline`, v = S.a[ok] || '';
    const btn = isDemo() ? '' : `<button class="btn line sm" data-act="outlinefb" data-q="${k}">question my outline</button>`;
    return `<details class="acc outline" ${v ? 'open' : ''}><summary>Plan first <small>optional outline</small></summary><div class="accb">
      <p class="muted" style="font-size:14px;margin-bottom:10px">A few lines are enough. If you ask, the AI only asks questions and flags gaps or inconsistencies; it never writes sentences or a thesis for you.</p>
      ${ta(ok, 7, 'Governing claim (one sentence):&#10;Moves, one line each:&#10;1.&#10;2.&#10;3.&#10;Where the strongest objection goes:&#10;What the ending does (not a repeat):')}
      <div class="qact">${btn}</div><div data-outfb="${k}">${outlineFeedbackHtml(S.a[`${ok}:fb`])}</div></div></details>`;
  }
  function outlineFeedbackHtml(fb) {
    if (!fb || !fb.f) return '';
    const f = fb.f, list = (t, a) => (a || []).length ? `<p><b>${t}</b></p><ul>${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
    return `<div class="fb"><span class="v" style="color:var(--ink)">Questions on your outline · ${esc(String(fb.at || '').slice(0, 10))}</span>${list('Questions a careful reader would ask', f.questions)}${list('Parts of the task not yet planned', f.gaps)}${list('Possible inconsistencies', f.inconsistencies)}${list('Already working', f.strengths)}<p class="muted" style="font-size:13px">Your outline was not changed.</p></div>`;
  }

  /* ── listening + speaking (embedded in the nine-stage architecture) ── */
  const listeningKey = (u, l, q) => `${u}:li:${l}:${q}`;
  // Recorded audio: exact m:ss of the real file. Not yet recorded: only the planned target.
  const listenLength = l => l.audioReady === false
    ? `~${Math.max(1, Math.round(l.duration / 60))} min planned`
    : `${Math.floor(l.duration / 60)}:${String(l.duration % 60).padStart(2, '0')}`;
  function listeningQuestion(u, l, q, i) {
    const k = listeningKey(u, l.id, q.id), submitted = !!S.a[`${u}:li:${l.id}:submitted`], val = S.a[k] || '';
    let control = '';
    if (q.type === 'mc') control = `<div class="opts">${q.options.map((x, n) => `<label class="opt ${submitted ? (n === q.answer ? 'right' : (+val === n ? 'wrong' : '')) : ''}"><input type="radio" name="${k}" data-k="${k}" value="${n}" ${+val === n && val !== '' ? 'checked' : ''}> <span><b>${LET[n]}.</b> ${esc(x)}</span></label>`).join('')}</div>`;
    else if (q.type === 'tf') control = `<div class="opts">${['True','False'].map(x => `<label class="opt ${submitted ? (((x === 'True') === q.answer) ? 'right' : (val === x ? 'wrong' : '')) : ''}"><input type="radio" name="${k}" data-k="${k}" value="${x}" ${val === x ? 'checked' : ''}> <span>${x}</span></label>`).join('')}</div>`;
    else control = ta(k, q.type === 'fill' ? 2 : 5, q.type === 'fill' ? 'Complete from memory…' : 'Your answer…');
    let feedback = '';
    if (submitted) {
      if (q.type === 'mc') feedback = `<div class="fb ${+val === q.answer ? 'good' : 'bad'}"><span class="v">${+val === q.answer ? 'Correct' : `Answer: ${LET[q.answer]}`}</span>${q.explain}</div>`;
      else if (q.type === 'tf') feedback = `<div class="fb ${((val === 'True') === q.answer) ? 'good' : 'bad'}"><span class="v">${((val === 'True') === q.answer) ? 'Correct' : `Answer: ${q.answer ? 'True' : 'False'}`}</span>${q.explain}</div>`;
      else if (q.type === 'fill') { const ok = (q.answers || []).some(a => a.split('|').every(x => val.toLowerCase().includes(x.toLowerCase()))); feedback = `<div class="fb ${ok ? 'good' : 'bad'}"><span class="v">${ok ? 'Matched' : 'Check the transcript'}</span>${q.explain}</div>`; }
      else { const saved = S.a[`${k}:feedback`]; feedback = `<div class="fb"><span class="v">Rubric</span><ul>${q.rubric.map(x => `<li>${x}</li>`).join('')}</ul>${saved ? `<p><b>AI feedback:</b> ${esc(saved.understanding || '')}</p><p><b>Missed / distorted:</b> ${esc(saved.missed || '')}</p><p><b>Evidence:</b> ${esc(saved.evidence || '')}</p><p><b>Next time:</b> ${esc(saved.nextTime || '')}</p>` : (isDemo() ? '<button class="btn line sm" disabled title="AI feedback is unavailable in Demo Mode.">AI feedback unavailable in Demo Mode</button>' : `<button class="btn line sm" data-act="lifb" data-u="${u}" data-lid="${l.id}" data-qid="${q.id}">get semantic feedback</button>`)}</div>`; }
    }
    return `<div class="q"><div class="qh"><span class="qn">${String(i + 1).padStart(2,'0')}</span><span class="tagp">${esc(q.tag)}</span></div><div class="qt">${q.q}</div>${control}${feedback}</div>`;
  }
  function listeningHtml(u, list) {
    if (!list || !list.length) return '';
    return `<div class="block media-lab"><div class="bhead"><span class="kl">LISTEN</span><h3>Listening Lab</h3><span class="tago">completed activities, not a proficiency score</span></div><p class="sub">The transcript stays hidden until you submit. Use the three passes for gist, detail, then language.</p>${list.map(l => {
      const submitted = !!S.a[`${u}:li:${l.id}:submitted`];
      const audioFile = l.file || l.audio || '';
      const audioControl = l.audioReady === false
        ? `<div class="media-notice" style="padding:10px 14px;background:var(--bg-warm, #f8f6f2);border-left:3px solid var(--accent, #b45309);margin:12px 0;font-size:0.92rem;color:var(--text-muted, #555);"><strong>Audio production in progress</strong> — the studio master is being prepared. You may preview the passes, exercise questions, and submit your answers.</div>`
        : `<audio controls preload="metadata" src="${esc(audioFile)}" data-listen-audio="${l.id}"></audio><p class="media-error" data-audio-error="${l.id}" hidden>Audio unavailable. The activity is preserved; try again after checking the connection or asset.</p>`;
      const passes = Array.isArray(l.passes) ? l.passes : ['First listen · grasp main idea', 'Second listen · track specific details', 'Third listen · examine language and nuances'];
      return `<section class="listen-card"><div class="wk"><span class="tagp">${esc(l.format || 'Audio')}</span><span class="tago">${esc(l.level || 'C1')} · ${listenLength(l)}</span></div><h3>${esc(l.title)}</h3><ol class="sup">${passes.map(x => `<li>${esc(x)}</li>`).join('')}</ol>${audioControl}<div class="qs">${(l.questions || []).map((q,i) => listeningQuestion(u,l,q,i)).join('')}</div><button class="btn dark" data-act="lisubmit" data-u="${u}" data-lid="${l.id}">${submitted ? 'resubmit answers' : 'submit listening'}</button>${submitted ? `<details class="acc"><summary>Transcript + analysis <small>available after submission</small></summary><div class="accb transcript">${esc(l.transcript || '').replace(/\n\n/g,'</p><p>')}</div></details>` : ''}</section>`;
    }).join('')}</div>`;
  }
  const attemptsFor = (u, id) => (S.sp || []).filter(x => x.unit === u && x.activityId === id).sort((a,b) => a.attempt - b.attempt);
  function speakingHtml(u, s) {
    if (!s) return '';
    const id = s.id || 's1';
    const label = s.label || 'Speaking Lab';
    const level = s.level || 'C1';
    const seconds = Array.isArray(s.seconds) ? s.seconds : [60, 120];
    const prompt = s.prompt || (s.part2 ? s.part2.topic : 'Spontaneous speaking task');
    const prepare = s.prepare || (s.part2 ? (s.part2.guide || (s.part2.prompts || []).join(' · ')) : 'Prepare with keywords, not a script.');
    const targets = Array.isArray(s.targets) ? s.targets : [];
    const rubric = Array.isArray(s.rubric) ? s.rubric : ['Task achievement and fluency', 'Coherence and lexical range', 'Grammatical accuracy and pronunciation'];
    const at = attemptsFor(u, id), last = at[at.length - 1];
    const history = at.length ? `<div class="attempts"><h4>Speaking portfolio</h4>${at.map(a => `<details><summary>Attempt ${a.attempt} · ${a.date.slice(0,10)} · ${a.duration}s ${a.transcript ? '· transcribed' : ''}</summary><div class="accb"><button class="btn line sm" data-act="spplay" data-id="${a.id}">play local recording</button>${a.transcript ? `<p><b>Original transcript</b></p><p>${esc(a.transcript)}</p>` : '<p class="muted">No transcript yet.</p>'}${a.feedback ? speakingFeedbackHtml(a) : ''}<label>Self-check<textarea class="ta" rows="3" data-sp-self="${a.id}" placeholder="What worked? What will you change?">${esc(a.selfCheck || '')}</textarea></label></div></details>`).join('')}</div>` : '<p class="muted">No attempt yet.</p>';
    const recDisabled = isDemo();
    const recStatusMsg = recDisabled
      ? 'Recording and AI feedback are disabled in Demo Mode.'
      : (window.KLANG_MEDIA && window.KLANG_MEDIA.supported() ? 'Microphone permission is requested only when you press record.' : 'Recording is not supported in this browser.');
    return `<div class="block media-lab"><div class="bhead"><span class="kl">${esc(label)}</span><h3>Spontaneous response</h3><span class="tago">${esc(level)} · ${seconds[0]}–${seconds[1]} sec</span></div><p class="lead">${esc(prompt)}</p><div class="note"><b>Prepare with keywords, not a script.</b> ${esc(prepare)}</div>${targets.length ? `<p><b>Language you may draw on:</b> ${targets.map(esc).join(' · ')}</p>` : ''}${PRON[u] ? `<p class="muted pron-link">Pronunciation focus of this unit: <a href="#u${u}-steal" data-flash="pron-${u}">${esc(strip(PRON[u].focus))}</a>. Worth a minute before you record; only you can judge it on replay.</p>` : ''}<div class="recorder"><div class="timer" data-rec-timer>00:00</div><button class="btn dark" data-act="sprecord" data-u="${u}" data-sid="${id}" ${recDisabled ? 'disabled title="Recording is disabled in Demo Mode."' : ''}>record</button><button class="btn line" data-act="spstop" disabled>stop</button><audio controls data-sp-player hidden></audio><p class="muted" data-rec-status>${recStatusMsg}</p></div>${last ? `<div class="qact"><button class="btn line sm" data-act="spplay" data-id="${last.id}">play latest</button><button class="btn line sm" data-act="sptranscribe" data-id="${last.id}" ${recDisabled ? 'disabled' : ''}>${last.transcript ? 'transcribe again' : 'transcribe'}</button>${last.transcript ? `<button class="btn dark sm" data-act="spfeedback" data-id="${last.id}" ${recDisabled ? 'disabled' : ''}>get feedback</button>` : ''}<button class="btn line sm" data-act="sprecord" data-u="${u}" data-sid="${id}" ${recDisabled ? 'disabled' : ''}>try again</button></div>` : ''}<p class="privacy-note"><b>Private by design:</b> recording stays in this browser’s IndexedDB. Only transcript, feedback and metadata sync. Feedback is transcript-only and cannot assess pronunciation, rhythm, pauses or actual fluency.</p>${history}<div class="q"><div class="qt">Self-check after replay</div><ul class="sup">${rubric.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div>`;
  }
  function speakingFeedbackHtml(a) { const f = a.feedback || {}; return `<div class="fb"><span class="v">Transcript-only analysis</span><p class="muted">No acoustic claims are made.${f.limitation ? ` ${esc(f.limitation)}` : ''}</p>${['taskFulfilment','coherence','grammar','vocabulary','naturalPhrasing','discourseManagement','precisionRange','targetLanguage'].map(k => f[k] ? `<p><b>${esc(k.replace(/([A-Z])/g,' $1'))}:</b> ${esc(f[k])}</p>` : '').join('')}${(f.corrections || []).map((c,i) => `<div class="model"><b>Original:</b> ${esc(c.original)}<br><b>Better:</b> ${esc(c.better)}<br><b>Why:</b> ${esc(c.why)} <button class="btn ghost sm" data-act="sp2err" data-id="${a.id}" data-i="${i}">add to Error Log</button></div>`).join('')}</div>`; }

  /* ── stage renderers ─────────────────────── */
  const R = {};
  R.know = (u, d) => {
    const k = d.know;
    return `<div class="block"><p class="lead">${k.lead}</p></div>
    <div class="block"><div class="bhead"><h3>Key ideas</h3><span class="tago">Primer</span></div>
      <dl class="defs">${k.terms.map(t => `<div><dt>${t.term}</dt><dd>${t.def}</dd></div>`).join('')}</dl></div>
    ${k.timeline ? `<div class="block"><div class="bhead"><h3>A short timeline</h3></div><div class="timeline">${k.timeline.map(t => `<div><b>${t.when}</b>${t.what}</div>`).join('')}</div></div>` : ''}
    ${k.views ? `<div class="block"><div class="bhead"><h3>${k.views.title}</h3></div><div class="views"><div class="v"><h4>${k.views.a.name}</h4><p>${k.views.a.text}</p></div><div class="v"><h4>${k.views.b.name}</h4><p>${k.views.b.text}</p></div></div><div class="note">${k.views.note}</div></div>` : ''}
    ${(k.items || []).length ? `<div class="block"><div class="qs">${k.items.map(it => renderItem(u, it, '', 'know')).join('')}</div></div>` : ''}`;
  };
  function readingHtml(u, r, which) {
    const n = words(r.paras.map(strip).join(' '));
    const paras = r.paras.map((p, i) => {
      const id = `${u}:p:${which}:${i + 1}`;
      const note = r.notes && r.notes[i + 1] ? `<div class="mn">${r.notes[i + 1]}</div>` : '';
      const pull = r.pull && r.pull.after === i + 1 ? `<blockquote class="pull">${r.pull.text}</blockquote>` : '';
      return `<div class="rp"><button class="pn ${isBm(id) ? 'bm' : ''}" title="Bookmark this paragraph" data-bm='${esc(JSON.stringify({ id, type: 'paragraph', u, text: strip(p).slice(0, 220), ref: `u${u}-read` }))}'>${i + 1}</button><p>${vw(p, u)}</p>${note}</div>${pull}`;
    }).join('');
    return `<article class="reading"><div class="rmeta"><span class="tagp">${r.label}</span><span class="tago">${r.format}</span><span class="tago">${n.toLocaleString('en')} words · ${Math.max(1, Math.round(n / 200))} min</span></div>
      <h3 class="rt">${r.title}</h3><p class="stand">${r.standfirst}</p><div class="rule"></div><div class="rbody">${paras}</div></article>`;
  }
  R.read = (u, d) => `<div class="rtools"><button class="btn dark sm" data-act="focus">focus reading mode →</button><span class="muted" style="font-size:13.5px;align-self:center">Highlighted words open their definition. Numbers in the margin bookmark a paragraph.</span></div>
    ${readingHtml(u, d.read.main, 'main')}
    ${d.read.counter ? `<div class="counterwrap">${readingHtml(u, d.read.counter, 'counter')}</div>` : ''}
    ${window.KLANG_CHAT ? window.KLANG_CHAT.ctaHtml(u) : ''}
    ${(d.read.sources || []).length ? `<div class="block"><div class="bhead"><h3>Sources & further reading</h3><span class="tago">Evidence behind the unit</span></div><ul class="sup">${d.read.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>${s.note ? ` — ${esc(s.note)}` : ''}</li>`).join('')}</ul></div>` : ''}`;
  R.interpret = (u, d) => `<div class="block"><p class="sub" style="margin:0 0 20px">${d.interpret.lead}</p><div class="qs">${d.interpret.items.map((it, i) => renderItem(u, it, String(i + 1).padStart(2, '0'), 'interpret')).join('')}</div></div>${listeningHtml(u, d.listening)}`;
  R.notice = (u, d) => {
    const n = d.notice;
    const focus = (f, i) => `<div class="block"><div class="bhead"><span class="kl">Focus ${i + 1}</span><h3>${f.title}</h3>${CORE[u] && CORE[u].notice === i ? CORE_TAG : ''}</div><p class="sub">${f.sub || ''}</p>
      <div class="bhead" style="margin-top:22px"><h3 style="font-size:17px">Notice it</h3><span class="tago">From the reading</span></div>
      <div class="noticeit">${(f.noticeIt || []).map(s => `<div><span>${s}</span></div>`).join('')}</div>
      <div class="bhead" style="margin-top:26px"><h3 style="font-size:17px">What do you notice?</h3><span class="tago">Before the explanation</span></div>
      <div class="qs">${(f.ask || []).map((it, j) => renderItem(u, it, String(j + 1), 'notice')).join('')}</div>
      <details class="acc"><summary>Grammar in context <small>open after you've answered</small></summary><div class="accb">${f.explain || ''}</div></details>
      ${f.help ? `<details class="acc help"><summary>Need help? · resumo em português</summary><div class="accb">${f.help}</div></details>` : ''}
      ${f.compare && (f.compare.head || Array.isArray(f.compare)) ? `<div class="bhead" style="margin-top:28px"><h3 style="font-size:17px">Compare</h3></div><div class="tscroll"><table class="cmp"><thead><tr>${(f.compare.head || ['Pattern', 'Example']).map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${(f.compare.rows || (Array.isArray(f.compare) ? f.compare : [])).map(r => `<tr>${(Array.isArray(r) ? r : [r]).map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}
      <div class="bhead" style="margin-top:28px"><h3 style="font-size:17px">Make it yours</h3><span class="tago">${(f.make || []).length} tasks</span></div>
      <div class="qs">${(f.make || []).map((it, j) => renderItem(u, it, String(j + 1), 'notice')).join('')}</div>
      ${f.radar && f.radar.length ? `<div class="bhead" style="margin-top:28px"><h3 style="font-size:17px">Error radar</h3><span class="tago">Common at B1/B2</span></div>
      <div class="radar">${f.radar.map(r => typeof r === 'string' ? `<div><em>${r}</em></div>` : `<div>${r.wrong ? `<s>${r.wrong}</s>` : ''}${r.right ? `<ins>${r.right}</ins>` : ''}<em>${r.why || ''}</em></div>`).join('')}</div>` : ''}</div>`;
    return n.focuses.map(focus).join('') + (n.mini ? `<div class="block"><div class="bhead"><span class="kl">Also</span><h3>${n.mini.title}</h3></div>
      <div class="q" style="margin-bottom:16px"><div class="accb" style="padding:0">${n.mini.explain}</div></div>
      <div class="qs">${n.mini.items.map((it, j) => renderItem(u, it, String(j + 1), 'notice')).join('')}</div></div>` : '');
  };
  R.steal = (u, d) => {
    const s = d.steal;
    const vc = v => `<div class="vcard" id="v-${u}-${v.key}"><header><h4>${v.w}</h4>${v.pron ? `<span class="pr">${v.pron}</span>` : ''}<span class="pos">${v.pos}</span></header>
      <p class="def">${v.def}</p><p class="ctx">${v.ctx}</p><p class="ex">${v.ex}</p>
      <dl><dt>Collocations</dt><dd>${v.col.join(' · ')}</dd><dt>Synonyms</dt><dd>${v.syn.join(', ')}</dd>${v.ant ? `<dt>Opposites</dt><dd>${(Array.isArray(v.ant) ? v.ant : [v.ant]).join(', ')}</dd>` : ''}</dl>
      ${v.note ? `<p class="nt">${v.note}</p>` : ''}
      <footer>${statusCtl(u, 'v:' + v.key)}<span class="push"></span>${bmBtn(`${u}:v:${v.key}`, 'word', u, `${v.w}: ${v.def}`, `u${u}-steal`)}</footer></div>`;
    const cc = c => `<div class="chunk" id="c-${u}-${c.key}"><div style="display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap"><h4 style="flex:1">${c.c}</h4>${isCore(u, 'steal', c.task.id) ? CORE_TAG : ''}${statusCtl(u, 'c:' + c.key)}${bmBtn(`${u}:c:${c.key}`, 'chunk', u, `${c.c}: ${c.meaning}`, `u${u}-steal`)}</div>
      <p style="font-size:15.5px">${c.meaning}</p><div class="cm"><span>${c.func}</span><span>${c.reg}</span></div><p class="ex" style="font-size:14.5px"><i>${c.ex}</i></p>
      <div class="task">${renderItem(u, c.task, '', 'steal')}</div></div>`;
    return `<div class="block"><div class="bhead"><span class="kl">A</span><h3>Vocabulary worth knowing</h3><span class="tago">${s.vocab.length} words</span></div>
      <p class="sub">Mark each word: NEW, LEARNING or KNOW. Your marks feed My Glossary, and LEARNING words go into your export.</p>
      <div class="vgrid">${s.vocab.map(vc).join('')}</div></div>
      <div class="block"><div class="bhead"><span class="kl">B</span><h3>Language worth stealing</h3><span class="tago">${s.chunks.length} chunks</span></div>
      <p class="sub">Chunks, collocations and sentence frames to take into your own writing. Each has a quick task.</p>
      <div class="qs">${s.chunks.map(cc).join('')}</div></div>
      ${s.practice.map(p => `<div class="block"><div class="bhead"><span class="kl">Practice</span><h3>${p.title}</h3></div>${renderItem(u, p, '', 'steal')}</div>`).join('')}
      ${pronunciationHtml(u)}`;
  };

  /* ── pronunciation in context (a block inside STEAL, not a stage) ── */
  const PRON = K.pronunciation || {};
  function pronunciationHtml(u) {
    const p = PRON[u]; if (!p) return '';
    const d = UNITS[u];
    // Only existing, ready recordings; after submission, so the listening task is not spoiled
    const listen = (p.listen || []).map(x => {
      const l = (d.listening || []).find(y => y.id === x.lid);
      if (!l || l.audioReady === false) return '';
      const heard = !!S.a[`${u}:li:${l.id}:submitted`];
      return `<div class="pron-listen"><b>Hear it</b> in <i>${esc(l.title)}</i> — ${esc(x.cue)}: “${esc(x.phrase)}”.${heard ? `<audio controls preload="none" src="${esc(l.file)}"></audio>` : ` <a href="#u${u}-interpret">Submit this listening in INTERPRET first →</a>`}</div>`;
    }).join('');
    const task = Object.assign({ id: 'pron', type: 'produce' }, p.task, { model: [].concat(p.task.model) });
    return `<div class="block pron" id="pron-${u}"><div class="bhead"><span class="kl">Pronunciation</span><h3>Pronunciation in context</h3><span class="tago">${p.tags.map(esc).join(' · ')}</span></div>
      <h4 class="pron-focus">${p.focus}</h4><p class="sub">${p.why}</p>
      <p class="pron-notation">${p.notation || 'IPA uses a British reference; US forms are given where they differ in a way worth noticing.'} No recording needed.</p>
      <ul class="pron-items">${p.items.map(it => `<li><span class="pt">${it.text}</span>${it.ipa ? `<span class="ipa">${esc(it.ipa)}</span>` : ''}${it.us ? `<span class="ipa us"><small>US</small> ${esc(it.us)}</span>` : ''}<span class="src">${esc(it.src)}</span>${it.note ? `<em>${it.note}</em>` : ''}</li>`).join('')}</ul>
      <div class="note"><b>Listen for:</b> ${p.listenFor}</div>
      ${p.variety ? `<p class="pron-extra"><b>Varieties.</b> ${p.variety}</p>` : ''}
      ${p.also ? `<p class="pron-extra"><b>Also.</b> ${p.also}</p>` : ''}
      ${listen}
      ${p.brazil ? `<details class="acc help"><summary>For Portuguese speakers</summary><div class="accb">${p.brazil}</div></details>` : ''}
      <div class="qs" style="margin-top:16px">${renderItem(u, task, '', 'steal')}</div></div>`;
  }
  R.think = (u, d) => {
    const t = d.think;
    return `<div class="block"><div class="bhead"><h3>${t.title}</h3></div><p class="lead" style="margin-bottom:20px">${t.lead}</p>
      <div class="tdefs">${t.defs.map(x => `<div><b>${x.term}</b><p>${x.def}</p></div>`).join('')}</div></div>
      <div class="block"><div class="qs">${t.items.map((it, i) => renderItem(u, it, 'T' + (i + 1), 'think')).join('')}</div></div>
      <div class="block"><div class="bhead"><h3>How did your conclusion move?</h3><span class="tago">optional metacognition</span></div><div class="qs"><div class="q"><div class="qt">BEFORE · What was your first conclusion?</div>${ta(`${u}:meta:before`,3)}</div><div class="q"><div class="qt">AFTER · Did it change? WHY: new evidence, a missed distinction, an assumption, a counterargument, uncertainty—or no change?</div>${ta(`${u}:meta:after`,4)}</div></div></div>${speakingHtml(u, d.speaking)}`;
  };
  R.write = (u, d) => {
    const w = d.write;
    return `<div class="block"><div class="wfocus"><h3>${w.focus.title}</h3><p>${w.focus.text}</p><div class="pair"><div class="w"><b>Weak</b>${w.focus.weak}</div><div class="s"><b>Strong</b>${w.focus.strong}</div></div></div></div>
      ${w.items.map(it => `<div class="block">${renderWriting(u, it, 'write')}</div>`).join('')}`;
  };
  R.edit = (u, d) => {
    const e = d.edit, dk = u + ':' + e.draftOf, draft = S.a[dk] || '';
    const done = e.checklist.filter((c, i) => S.a[`${u}:ck:${i}`]).length;
    return `<div class="block"><details class="acc" ${draft ? '' : 'open'}><summary>Your first draft <small>${words(draft)} words</small></summary><div class="accb" style="white-space:pre-wrap">${draft ? esc(draft) : '<span class="muted">You haven\'t written the first draft yet. Go back to WRITE first.</span>'}</div></details></div>
      <div class="block"><div class="bhead"><h3>Checklist</h3><span class="tago">Read your draft once for each line</span></div>
      <div class="checks">${e.checklist.map((c, i) => `<label class="ck"><input type="checkbox" data-ck="${u}:ck:${i}" ${S.a[`${u}:ck:${i}`] ? 'checked' : ''}><span>${c}</span></label>`).join('')}<div class="count" data-cc="${u}">${done} of ${e.checklist.length} checked</div></div></div>
      <div class="block"><div class="bhead"><h3>Second draft challenge</h3><span class="tago">Choose 2 or 3</span></div>
      <div class="checks">${e.challenges.map((c, i) => `<label class="ck"><input type="checkbox" data-ck="${u}:ch:${i}" ${S.a[`${u}:ch:${i}`] ? 'checked' : ''}><span>${c}</span></label>`).join('')}</div></div>
      ${revisionPointers(dk)}
      <div class="block">${renderWriting(u, e.revised, 'edit')}</div>`;
  };
  // Links the first-draft feedback to the revision: priorities and questions only, never rewritten text
  function revisionPointers(dk) {
    const fb = ((S.pf[dk] || {}).fb || []).filter(f => f.draft === 'first').pop();
    if (!fb || !fb.f) return '';
    const pri = fb.f.nextDraftPriorities || [], qs = fb.f.questionsForWriter || [];
    if (!pri.length && !qs.length) return '';
    return `<div class="block"><div class="bhead"><h3>From your latest feedback</h3><span class="tago">first draft · ${esc(String(fb.at).slice(0, 10))}</span></div>
      ${pri.length ? `<ol class="sup">${pri.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}
      ${qs.length ? `<p class="muted" style="margin:10px 0 4px">Questions a reader asked about your draft:</p><ul class="sup">${qs.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      <p class="muted" style="font-size:13px;margin-top:8px">You decide what to change. <button class="btn ghost sm" data-act="fbopen" data-pk="${dk}" data-id="${esc(fb.id)}">open the full feedback</button></p></div>`;
  }
  R.retrieve = (u, d) => {
    const r = d.retrieve;
    return `<div class="block"><p class="lead">${r.lead}</p></div>
      <div class="block"><div class="qs">${r.items.map((it, i) => renderItem(u, it, String(i + 1), 'retrieve')).join('')}</div></div>
      ${retrievalBlock(u)}
      <div class="block"><button class="btn dark" data-act="reveal">reveal what you missed →</button><div id="reveal" hidden style="margin-top:18px"></div></div>`;
  };
  function revealHtml(u) {
    const d = UNITS[u];
    return `<div class="q"><div class="bhead"><h3>Vocabulary</h3></div><p style="font-size:15.5px;line-height:1.8">${d.steal.vocab.map(v => `<b>${v.w}</b>`).join(' · ')}</p>
      <div class="bhead" style="margin-top:18px"><h3>Chunks</h3></div><p style="font-size:15.5px;line-height:1.8">${d.steal.chunks.map(c => c.c).join(' · ')}</p>
      <div class="bhead" style="margin-top:18px"><h3>The unit in brief</h3></div><div class="accb" style="padding:0">${d.retrieve.reveal.summary}</div></div>`;
  }

  /* ── views ───────────────────────────────── */
  const main = () => $('#main');

  function renderHome() {
    const pct = overall(), udone = ALL.filter(u => S.ud[u.id]).length;
    const seal = `<svg class="seal" viewBox="0 0 200 200" role="img" aria-label="Seal: Mayra Balboni, B2+ to C1, Personal Study Book, Volume I">
      <circle cx="100" cy="100" r="98" fill="#E8BCC1"/><circle cx="100" cy="100" r="62" fill="none" stroke="#1C1817" stroke-opacity=".45"/>
      <defs><path id="sealc" d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1 -160 0"/></defs>
      <g class="ring"><text fill="#1C1817" font-family="Jost, Futura, sans-serif" font-size="10.5" font-weight="500" letter-spacing="2"><textPath href="#sealc" textLength="496" lengthAdjust="spacing">MAYRA BALBONI · B2+ → C1 · PERSONAL STUDY BOOK · VOL. I ·</textPath></text></g>
      <g transform="translate(50 50)"><path d="M36 22V78M36 53L64 22M47 44L66 78" fill="none" stroke="#1C1817" stroke-width="5"/></g></svg>`;
    const modCards = CUR.modules.map(m => `<article class="modcard"><header><div><div class="ml">Module ${m.id}</div><h3>${m.title}</h3></div>${modDone(m) ? '<span class="mark done">Complete</span>' : ''}</header>
      <ol>${m.units.map(u => `<li class="${has(u.id) ? '' : 'soon'}"><a href="#u${u.id}"><span class="n">${u.id}</span><span class="t">${u.title}</span><span class="tg">${u.star ? '<span class="mark star" title="Special long reading">★ long read</span>' : ''}${u.lf ? '<span class="mark lf" title="Long-form writing">LF</span>' : ''}${S.ud[u.id] ? '<span class="mark done">done</span>' : (has(u.id) ? '' : '<span class="mark soon">soon</span>')}</span></a></li>`).join('')}
      ${REVIEWS[m.id]
        ? `<li><a href="#r${m.id}"><span class="n">↺</span><span class="t">Module ${m.id} Review</span><span class="tg">${S.rd[m.id] ? '<span class="mark done">done</span>' : '<span class="mark lf">review</span>'}</span></a></li>`
        : `<li class="soon"><a aria-disabled="true" style="cursor:default"><span class="n">↺</span><span class="t">Module ${m.id} Review</span><span class="tg"><span class="mark soon">soon</span></span></a></li>`}</ol>
      <footer><span>${m.units.filter(u => S.ud[u.id]).length} of ${m.units.length} units complete</span><label class="toggle"><input type="checkbox" data-md="${m.id}" ${S.md[m.id] ? 'checked' : ''}> mark module complete</label></footer></article>`).join('');
    main().innerHTML = `
    <section class="cover" aria-label="Cover">
      <div class="cover-top rise">${lockup()}<div class="vol">Personal Study Book<br>Vol. I · 2026</div></div>
      <div class="cover-grid">
        <div>
          <div class="kicker rise d2">B2+ → C1 · Personal Study Book · Vol. I</div>
          <h1 class="rise d2"><span>A Mind</span><span class="in">in</span><span><em>English</em></span></h1>
          <p class="rtw rise d3">Read. Think. <b>Write.</b></p>
          <div class="who rise d4"><strong>Mayra Balboni</strong><span>32 units · 7 modules</span></div>
        </div>
        <div class="arch-wrap rise d3"><div class="arch"><span class="glow"></span><div class="hand">back to<br>depth</div><div class="foot">KLANG · 2026</div></div>${seal}</div>
      </div>
      <div class="cycle">${STAGES.map(x => x[1]).map(s => `<span>${s}</span>`).join('')}</div>
      <svg class="torn" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true"><path d="M0 34 L70 46 L120 30 L190 54 L250 40 L320 62 L380 48 L450 70 L520 56 L590 80 L660 64 L720 84 L800 70 L870 90 L950 76 L1020 96 L1100 82 L1180 100 L1260 86 L1340 104 L1440 90 L1440 110 L0 110Z" fill="#E8BCC1"/><path d="M0 62 L60 72 L130 58 L200 78 L270 66 L340 86 L400 74 L480 92 L540 80 L620 98 L690 86 L760 100 L840 90 L910 104 L990 94 L1060 106 L1140 96 L1220 108 L1300 98 L1380 110 L1440 104 L1440 110 L0 110Z" fill="#F3EBE3"/></svg>
    </section>

    <section class="sheet"><div class="wrap letter">
      <div><div class="eyebrow">Before you begin</div><h2 class="h2">This is not <em>a course</em></h2></div>
      <div class="body">
        <p>Nobody is going to teach you from these pages, and you are not going to teach yourself. This is a place to read slowly, think carefully and write often, in a language you already know well and want to know precisely.</p>
        <p>Your last test showed a familiar profile: reading, listening, writing and speaking around B2, with grammatical control less stable. That is not a gap in ability. It is a gap in precision and automaticity, the distance between knowing a structure and producing it without thinking. Everything here is built to close that distance: long texts, language taken from those texts, grammar that grows out of real sentences, arguments to take apart and rebuild, and a great deal of writing.</p>
        <p>Each unit asks one question. None of them has a simple answer, and none of them tries to hand you one.</p>
        <p class="sig">KLANG · Personal Study Book · Mayra Balboni</p>
      </div></div></section>

    <section class="dark"><div class="wrap">
      <div class="eyebrow">How every unit works</div><h2 class="h2">Nine stages, <em>always in this order</em></h2>
      <p class="lead muted">The order matters. You get context before you read, notice language before you study it, and write only after you have something to say. You finish every unit by remembering it without looking.</p>
      <div class="cyc-grid">
        ${[['Know', 'Just enough context to think: key ideas, a timeline, two ways of seeing the issue.'], ['Read', 'One long text written for this book, and often a shorter counterpoint that disagrees.'], ['Interpret', 'Main idea, inference, tone, evidence, what is left unsaid. Objective answers are checked only when you ask.'], ['Notice', 'Two grammar focuses taken from the reading. You look before you get the explanation.'], ['Steal', 'Words and chunks worth taking into your own writing, each with a quick task.'], ['Think', 'A lab for reasoning: claims, evidence, assumptions, causes, framing.'], ['Write', 'Short responses, reflective essays, argumentative essays and long-form pieces.'], ['Edit', 'A checklist for this unit and a second-draft challenge. Revision is where accuracy is built.'], ['Retrieve', 'Close the book. Recall, reuse, summarise. Then check what you missed.']].map((s, i) => `<div><b>${String(i + 1).padStart(2, '0')}</b><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}
      </div></div></section>

    <section class="sheet" id="contents"><div class="wrap">
      <div class="eyebrow">Contents</div><h2 class="h2">Seven modules, <em>thirty-two questions</em></h2>
      <div class="home-prog"><div class="big">${pct}<small>%</small></div><div class="meta"><div class="bar"><i style="width:${pct}%"></i></div><span>${udone} of ${ALL.length} units complete · ${Object.keys(UNITS).length} written so far</span></div><a class="btn rosa" href="#${continueTarget()}">continue studying →</a></div>
      <div class="modgrid">${modCards}</div>
      <p class="muted" style="margin-top:18px;font-size:14px">★ long read = main text of 1,500–2,000 words · LF = long-form writing (800–1,200 words)</p>
    </div></section>

    <section class="dark"><div class="wrap">
      <div class="eyebrow">Your notebook</div><h2 class="h2">What you keep <em>across the book</em></h2>
      <div class="toolgrid">
        ${[['glossary', ICON.gl, 'My Glossary', 'Every word and chunk from the units, with your NEW / LEARNING / KNOW marks.'], ['errors', ICON.err, 'My Error Log', 'Your sentence, the correction, why, a new example. Fill it after each correction.'], ['portfolio', ICON.pf, 'My Writing Portfolio', 'Every writing task, with first and revised drafts, word counts and status.'], ['bookmarks', ICON.bm, 'Bookmarks', 'Words, chunks, paragraphs and questions you saved to come back to.'], ['current', ICON.ca, 'Current Affairs Lab', 'A reusable structure for reading the news in English without losing your mind.']].map(t => `<a href="#${t[0]}">${t[1]}<h3>${t[2]}</h3><p>${t[3]}</p></a>`).join('')}
      </div>
      <p class="muted" style="margin-top:26px;font-size:14px;max-width:70ch">${isDemo() ? 'In this demo session, changes stay in this tab only and are not saved to an account' : 'Everything you write is saved in this browser as you type and synced to your account when you are online'}${storageOK ? '' : ' (saving is blocked in this window, so your answers will be lost when you close it)'}. Use <b style="color:var(--creme)">Export my work</b> in each unit for a Markdown copy of that unit, and <b style="color:var(--creme)">back up everything</b> (in the sidebar) to download a file with all your work.</p>
    </div></section>`;
  }

  function renderSoon(id) {
    const m = meta(id);
    main().innerHTML = `<section class="uhero"><span class="pill">Module ${m.module} · Unit ${m.id}</span><h1>${m.title}</h1>
      <div class="qcard"><div class="l">The question</div><p>${m.q}</p></div><div style="height:40px"></div></section>
      <section class="page"><div class="inner"><div class="soonbox"><span class="tagp">In preparation</span>
      <p style="margin-top:14px;font-size:16px;line-height:1.6">This unit is being written. Here is what it will cover.</p>
      <dl><dt>Module</dt><dd>${m.moduleTitle}</dd><dt>Notice</dt><dd>${m.grammar}</dd><dt>Think</dt><dd>${m.think}</dd><dt>Cumulative reasoning tool</dt><dd>${m.criticalThinking || ''}</dd><dt>Write</dt><dd>${m.write}</dd>${m.star ? '<dt>Reading</dt><dd>★ Special long reading, 1,500–2,000 words</dd>' : ''}</dl></div></div></section>`;
  }

  function renderUnit(id, stage) {
    if (!has(id)) return renderSoon(id);
    const d = UNITS[id], m = meta(id);
    if (!stage || !R[stage]) stage = (S.last && S.last.u === id && S.last.s) || 'know';
    S.last = { u: id, s: stage }; save();
    REG = {};
    const si = STAGES.findIndex(s => s[0] === stage);
    const mainWords = words(d.read.main.paras.map(strip).join(' '));
    const body = R[stage](id, d);
    const prev = STAGES[si - 1], next = STAGES[si + 1];
    main().innerHTML = `
    <section class="uhero">
      <span class="pill">Module ${m.module} · Unit ${id}</span>
      <h1>${d.title} <em>${d.titleEm}</em></h1>
      <div class="qcard"><div class="l">The question</div><p>${d.question}</p></div>
      <div class="meta"><div><b>Read</b><span>${d.read.main.format} · ${mainWords.toLocaleString('en')} words${d.read.counter ? ' + counterpoint' : ''}</span></div><div><b>Notice</b><span>${m.grammar}</span></div><div><b>Think</b><span>${m.think}</span></div><div><b>Write</b><span>${m.write}</span></div></div>
      <div class="uactions">
        <button class="btn out sm" data-act="export" data-u="${id}">export my work</button>
        <button class="btn out sm" data-act="copywriting" data-u="${id}">copy writing</button>
        <button class="btn out sm" data-act="reset" data-u="${id}">reset unit</button>
        <span class="sp"></span>
        <label class="toggle" style="color:var(--taupe)"><input type="checkbox" data-ud="${id}" ${S.ud[id] ? 'checked' : ''}> unit completed</label>
      </div>
      <nav class="stepper" aria-label="Unit stages"><ol>${STAGES.map(([s, l], i) => `<li class="${s === stage ? 'on' : ''} ${secDone(id, s) ? 'done' : ''}"><button data-go="u${id}-${s}" aria-label="${l}" ${s === stage ? 'aria-current="step"' : ''}>${secDone(id, s) && s !== stage ? '✓' : i + 1}</button><span>${l}</span></li>`).join('')}</ol></nav>
    </section>
    <section class="page" id="stage"><div class="inner">
      <div class="shead"><span class="tagp">${String(si + 1).padStart(2, '0')} · ${STAGES[si][1]}</span><h2>${STAGE_TITLES[stage]}</h2>${CORE[id] && CORE_STAGE[stage] === 'core' ? CORE_TAG : ''}${CORE[id] && CORE_STAGE[stage] === 'optional' ? '<span class="tago">optional · extra practice</span>' : ''}<span class="tago">Unit ${id}</span></div>
      ${CORE[id] ? '<p class="core-note"><b>Core</b> marks the essential cycle of this unit. Everything else is extra practice: open to you, never required.</p>' : ''}
      ${body}
    </div>
    <div class="stage-foot">
      ${prev ? `<a class="btn line" href="#u${id}-${prev[0]}">← ${prev[1].toLowerCase()}</a>` : '<span></span>'}
      <label class="done-t"><input type="checkbox" data-sec="${id}:${stage}" ${secDone(id, stage) ? 'checked' : ''}> section completed</label>
      ${next ? `<a class="btn dark" href="#u${id}-${next[0]}">${next[1].toLowerCase()} →</a>` : `<a class="btn dark" href="#home">back to contents →</a>`}
    </div></section>`;
    $$('.wc', main()).forEach(wcClass);
  }

  /* ── cumulative module reviews ───────────── */
  const reviewPrefix = id => `r${id}`;
  const reviewSecDone = (id, stage) => !!S.sec[`${reviewPrefix(id)}:${stage}`];
  const reviewItems = (id, items, stage) => `<div class="block"><div class="qs">${items.map((it, i) => renderItem(reviewPrefix(id), it, String(i + 1).padStart(2, '0'), stage)).join('')}</div></div>`;

  function reviewReading(id, r) {
    const pfx = reviewPrefix(id);
    const n = words(r.paras.map(strip).join(' '));
    return `<div class="rtools"><button class="btn dark sm" data-act="focus">focus reading mode →</button><span class="muted" style="font-size:13.5px;align-self:center">A new text: transfer what you know rather than recalling the unit readings.</span></div>
      <article class="reading"><div class="rmeta"><span class="tagp">${r.label}</span><span class="tago">${r.format}</span><span class="tago">${n.toLocaleString('en')} words · ${Math.max(1, Math.round(n / 200))} min</span></div>
      <h3 class="rt">${r.title}</h3><p class="stand">${r.standfirst}</p><div class="rule"></div><div class="rbody">${r.paras.map((p, i) => `<div class="rp"><span class="pn">${i + 1}</span><p>${p}</p></div>`).join('')}</div></article>
      ${reviewItems(id, r.items, 'reading')}`;
  }

  function reviewGlossary(id, d) {
    const entries = glossaryEntries().filter(e => d.units.includes(e.u) && ['new', 'learning'].includes(glStatus(e.u, e.key))).slice(0, 12);
    if (!entries.length) return `<div class="block"><div class="bhead"><h3>Personal glossary retrieval</h3><span class="tago">NEW & LEARNING</span></div>
      <p class="lead">There are no NEW or LEARNING items from Units ${d.units[0]}–${d.units[d.units.length - 1]} yet.</p>
      <p class="sub">This is a valid state, not an error. Mark items in STEAL or My Glossary and they will appear here automatically. Continue the review with the production prompt below.</p>
      <div class="q"><div class="qt">From memory, write five expressions from this module and use each in a new context.</div>${ta(`${reviewPrefix(id)}:gl:fallback`, 7)}</div></div>`;
    return `<div class="block"><div class="bhead"><h3>Personal glossary retrieval</h3><span class="tago">${entries.length} NEW & LEARNING</span></div>
      <p class="sub">Definitions are hidden. Reconstruct a meaning, one natural partner word and an original sentence before checking the Glossary.</p>
      <div class="qs">${entries.map((e, i) => { const k = `${reviewPrefix(id)}:gl:${e.u}:${e.key}`; return `<div class="q"><div class="qh"><span class="qn">${String(i + 1).padStart(2, '0')}</span><span class="tagp">Unit ${e.u}</span></div><div class="qt"><b>${e.title}</b></div>${ta(k, 3, 'Meaning + collocation/chunk partner + your sentence…')}<div class="qact"><a class="btn line sm" href="#glossary">check in My Glossary →</a></div></div>`; }).join('')}</div></div>`;
  }

  // Rows added from writing feedback and conversations store the unit as `u`; rows from speaking and
  // "check my english" store it as `unit` (possibly a review prefix such as "r1"). Read both, change neither.
  const errUnit = r => { const x = r.u || r.unit || ''; return /^\d\d$/.test(x) ? x : ''; };
  function relatedErrors(id, d) {
    const terms = id === '1'
      ? /past|present perfect|article|tense|aspect|gerund|infinitive|used to|would|preposition|remember|remind|recall/i
      : /modal|certainty|countab|relative|participle|conditional|wish|reported|distance|say|tell/i;
    return S.errs.filter(r => {
      const u = errUnit(r);
      if (u) return d.units.includes(u);
      return (r.u || r.unit) === reviewPrefix(id) || terms.test([r.why, r.mine, r.corr].join(' '));
    });
  }

  function reviewErrors(id, d) {
    const rows = relatedErrors(id, d).slice(0, 10);
    if (!rows.length) return `<div class="block"><div class="bhead"><h3>Error Log check</h3><span class="tago">Personal patterns</span></div>
      <p class="lead">No Error Log entries can currently be linked to this module.</p><p class="sub">Nothing breaks: add relevant errors later and they will become retrieval opportunities here. For now, diagnose one error pattern you remember making in Units ${d.units[0]}–${d.units[d.units.length - 1]}.</p>
      <div class="q">${ta(`${reviewPrefix(id)}:er:fallback`, 5, 'The pattern, a correction, why, and a fresh example…')}</div></div>`;
    return `<div class="block"><div class="bhead"><h3>Error Log check</h3><span class="tago">${rows.length} personal pattern${rows.length === 1 ? '' : 's'}</span></div>
      <p class="sub">Correct each original again before revealing the correction stored in your Error Log.</p><div class="qs">${rows.map((r, i) => {
        const k = `${reviewPrefix(id)}:er:${r.id}`;
        REG[k] = { id: `er:${r.id}`, type: 'produce', model: [esc(r.corr || 'No stored correction yet.')], explain: esc(r.why || 'No explanation stored yet.') };
        return `<div class="q"><div class="qh"><span class="qn">${String(i + 1).padStart(2, '0')}</span>${errUnit(r) ? `<span class="tagp">Unit ${esc(errUnit(r))}</span>` : ''}</div><div class="qt">${esc(r.mine || '(Original sentence is empty)')}</div>${ta(k, 3, 'Correct it again without looking…')}<div class="qact"><button class="btn line sm" data-act="errmodel" data-q="${k}">check stored correction →</button></div><div class="fbw" data-fb="${k}"></div></div>`;
      }).join('')}</div></div>`;
  }

  function objectiveStats(id, category) {
    const d = REVIEWS[id], pfx = reviewPrefix(id); let attempted = 0, correct = 0, total = 0; const weak = [];
    const walk = n => {
      if (Array.isArray(n)) return n.forEach(walk);
      if (!n || typeof n !== 'object') return;
      if (n.scoreCategory === category && ['mc', 'tf'].includes(n.type)) {
        total++; const a = S.a[`${pfx}:${n.id}`];
        if (a !== undefined && a !== '') {
          attempted++; const ok = n.type === 'mc' ? +a === n.answer : (a === 'True') === n.answer;
          if (ok) correct++; else weak.push(`Unit ${n.unit} · ${n.area}`);
        }
      }
      Object.keys(n).forEach(k => walk(n[k]));
    };
    walk(d); return { attempted, correct, total, weak: Array.from(new Set(weak)), pct: attempted ? Math.round(correct / attempted * 100) : null };
  }

  function diagnosticCard(id, key, label) {
    const d = REVIEWS[id], s = objectiveStats(id, key);
    const status = !s.attempted ? 'NOT ASSESSED' : s.pct >= 80 ? 'STRONG' : s.pct >= 55 ? 'REVIEW' : 'RELEARN';
    const cls = status === 'STRONG' ? 'good' : status === 'RELEARN' ? 'bad' : '';
    const revisit = !s.attempted ? (d.areas[key] || []) : s.weak.length ? s.weak : ['No incorrect objective items in this category. Maintain through later retrieval.'];
    return `<div class="q"><div class="bhead"><h3>${label}</h3><span class="tagp ${cls}">${status}</span></div>
      <p>${s.attempted ? `${s.correct} of ${s.attempted} attempted objective items correct (${s.pct}%). ${s.attempted < s.total ? `${s.total - s.attempted} items remain unanswered.` : ''}` : 'No objective evidence yet. Complete and check the relevant tasks first.'}</p>
      <details class="acc"><summary>${s.attempted ? 'Evidence-based review priorities' : 'Targets not yet assessed'}</summary><div class="accb"><ul>${revisit.map(x => `<li>${x}</li>`).join('')}</ul></div></details></div>`;
  }

  function reviewAssessment(id, d) {
    const k = `${reviewPrefix(id)}:${d.synthesis.id}`, draft = S.a[k] || '', fb = ((S.pf[k] || {}).fb || []);
    const lDone = d.units.reduce((n,u)=>n+((UNITS[u]?.listening||[]).filter(l=>S.a[`${u}:li:${l.id}:submitted`]).length),0);
    const lTotal = d.units.reduce((n,u)=>n+(UNITS[u]?.listening||[]).length,0), sp = (S.sp||[]).filter(a=>d.units.includes(a.unit));
    return `<div class="block"><p class="lead">This diagnosis uses only evidence the system actually has. Objective items produce STRONG / REVIEW / RELEARN. Open reasoning and writing remain ungraded unless you request feedback or assess them yourself.</p></div>
      <div class="review-diagnostic">${diagnosticCard(id, 'grammar', 'Language')}${diagnosticCard(id, 'vocabulary', 'Vocabulary & chunks')}${diagnosticCard(id, 'reading', 'Reading')}${diagnosticCard(id, 'reasoning', 'Reasoning')}<div class="q"><div class="bhead"><h3>Listening</h3><span class="tagp">ACTIVITY EVIDENCE</span></div><p>${lDone} of ${lTotal} available listening activities completed. This is completion, not proficiency.</p></div><div class="q"><div class="bhead"><h3>Speaking</h3><span class="tagp">PORTFOLIO EVIDENCE</span></div><p>${sp.length} attempt${sp.length===1?'':'s'} saved${sp.filter(a=>a.feedback).length?`, ${sp.filter(a=>a.feedback).length} with feedback`:''}. No global CEFR level is inferred.</p></div></div>
      <div class="block"><div class="bhead"><h3>Writing</h3><span class="tagp">${fb.length ? 'EVIDENCE AVAILABLE' : draft ? 'AWAITING ASSESSMENT' : 'NOT YET ATTEMPTED'}</span></div>
        <p>${draft ? `${words(draft)} words saved.` : 'No synthesis draft yet.'} ${fb.length ? `${fb.length} saved AI feedback report${fb.length === 1 ? '' : 's'} can support your judgment.` : 'No automatic writing score has been invented.'}</p>
        <div class="q"><div class="qt">Based on your draft and any feedback, what is strongest? What needs review? Which Unit should you revisit first, and why?</div>${ta(`${reviewPrefix(id)}:self:writing`, 7)}</div>
      </div>`;
  }

  function renderReviewBody(id, stage, d) {
    if (stage === 'retrieve' || stage === 'language' || stage === 'steal') {
      const x = d[stage]; return `<div class="block"><p class="lead">${x.lead}</p></div>${reviewItems(id, x.items, stage)}`;
    }
    if (stage === 'reasoning') {
      const x = d.reasoning;
      let h = `<div class="block"><p class="lead">${x.lead}</p></div>${reviewItems(id, x.items, 'reasoning')}`;
      if (d.speaking) h += speakingHtml(reviewPrefix(id), d.speaking);
      return h;
    }
    if (stage === 'glossary') return reviewGlossary(id, d);
    if (stage === 'errors') return reviewErrors(id, d);
    if (stage === 'reading') {
      let h = reviewReading(id, d.reading);
      if (d.listening && d.listening.length) h += listeningHtml(reviewPrefix(id), d.listening);
      return h;
    }
    if (stage === 'editing') return `<div class="block"><p class="lead">${d.editing.lead}</p><article class="edit-source">${esc(d.editing.text)}</article></div>${reviewItems(id, d.editing.items, 'editing')}<div class="block"><button class="btn line" data-act="reviewmodel" data-r="${id}">compare with one edited version →</button><div id="review-model" hidden class="fb" style="margin-top:16px"></div></div>`;
    if (stage === 'synthesis') return `<div class="block"><p class="lead">Transfer ideas and language across the module. This task is included in your Writing Portfolio and supports Get feedback.</p></div><div class="block">${renderWriting(reviewPrefix(id), d.synthesis, 'synthesis')}</div>${timedHtml(id, d)}`;
    return reviewAssessment(id, d) + teacherLensHtml(id, d);
  }

  /* ── timed challenge (optional, once per review; self-assessment, not surveillance) ── */
  function timedHtml(id, d) {
    const t = d.timed; if (!t) return '';
    const p = reviewPrefix(id), k = `${p}:${t.id}`, start = S.a[`${p}:tc:start`], end = S.a[`${p}:tc:end`];
    REG[k] = t; t._stage = 'synthesis';
    const head = `<div class="bhead"><span class="kl">Optional</span><h3>Timed challenge</h3><span class="tago">${t.minutes} minutes · ${t.min}–${t.max} words</span></div>`;
    // Text found under the old shared id that differed from this essay (see migrateLegacyTimed): kept, read-only
    const legacy = legacyKeys(S.a, k).filter(x => String(S.a[x] || '').trim()).map(x => `<details class="acc"><summary>Earlier text for this essay <small>kept from a previous version of the book</small></summary><div class="accb" style="white-space:pre-wrap">${esc(S.a[x])}</div></details>`).join('');
    if (!start) return `<div class="block timed">${head}<p class="sub">One essay under time pressure, once per module, to see what your English does without support. Suggested rhythm: 5 minutes planning, 35 writing, 5 checking. Don’t use AI, dictionaries or translators while the clock runs; feedback is available only after you submit. Nothing is monitored — the point is an honest picture for yourself.</p>
      <button class="btn dark" data-act="tcstart" data-r="${id}">start the ${t.minutes}-minute challenge →</button>${legacy}</div>`;
    const body = `<div class="wtask" id="q-${k}"><div class="wk"><span class="tagp">${esc(t.kind)}</span><span class="tago">${t.min}–${t.max} words</span></div><h3>${esc(t.title)}</h3><div class="pr">${t.prompt}</div>`;
    if (!end) return `<div class="block timed">${head}${body}
      <div class="tc-timer" data-tc-timer data-start="${esc(start)}" data-min="${t.minutes}">${t.minutes}:00 left</div>
      ${ta(k, 14, 'Write here…', 'spellcheck="false"')}${wcHtml(k, t.min, t.max)}
      <div class="qact" style="margin-top:14px"><button class="btn dark sm" data-act="tcsubmit" data-r="${id}">submit — I’ve finished</button></div></div>${legacy}</div>`;
    const used = Math.max(1, Math.round((Date.parse(end) - Date.parse(start)) / 60000));
    return `<div class="block timed">${head}${body}
      <p class="muted" style="margin:10px 0">Submitted ${esc(end.slice(0, 10))} · ${used} minute${used === 1 ? '' : 's'} used${used > t.minutes ? ` (${used - t.minutes} over)` : ''} · ${words(S.a[k])} words. The text is kept exactly as submitted.</p>
      ${ta(k, 14, '', 'readonly')}
      <div class="qact" style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">${aiFeedbackBtn(k)}<button class="btn ghost sm" data-act="tcreset" data-r="${id}">discard and start again</button></div>
      <div class="aifb" data-aifb="${k}">${savedFeedbackHtml(k)}</div></div>${legacy}</div>`;
  }
  function tickTimed() {
    $$('[data-tc-timer]').forEach(el => {
      const left = Date.parse(el.dataset.start) + (+el.dataset.min) * 60000 - Date.now();
      if (left <= 0) { el.textContent = 'Time is up — finish your sentence and submit.'; el.classList.add('over'); return; }
      const s = Math.ceil(left / 1000);
      el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} left`;
    });
  }
  setInterval(tickTimed, 1000);

  /* ── teacher lens (Reviews only; secondary to the learner's own study) ── */
  function teacherLensHtml(id, d) {
    const tl = d.teacherLens; if (!tl) return '';
    const p = reviewPrefix(id), k = f => `${p}:tl:${f}`, pick = S.a[k('point')] || '';
    const chosen = tl.points.find(x => x.id === pick);
    const step = (n, q, body) => `<div class="q"><div class="qh"><span class="qn">${n}</span></div><div class="qt">${q}</div>${body}</div>`;
    const ccqNote = chosen ? (chosen.ccq === 'good' ? 'A CCQ suits this point.' : 'Optional here: this point is mainly about form, so a CCQ may not be the right tool.') : 'Only if a CCQ genuinely suits your point; leave it blank otherwise.';
    return `<div class="block tlens"><div class="bhead"><span class="kl">Teacher Lens</span><h3>Explain one point</h3><span class="tago">optional</span></div>
      <p class="sub">${tl.lead}</p>
      <div class="qs">
        ${step(1, 'Choose one language point from this module.', `<select class="ti" data-k="${k('point')}" aria-label="Language point"><option value="">choose…</option>${tl.points.map(x => `<option value="${x.id}" ${pick === x.id ? 'selected' : ''}>${esc(x.label)} · Unit ${x.unit}</option>`).join('')}<option value="other" ${pick === 'other' ? 'selected' : ''}>Another point from this module…</option></select>
          ${pick === 'other' ? ta(k('custom'), 1, 'Name the language point…') : ''}${chosen ? `<p class="muted" style="font-size:13.5px;margin-top:6px">${esc(chosen.hint)}</p>` : ''}`)}
        ${step(2, 'Explain it to a B1 student in clear English.', ta(k('explain'), 6, 'About 80–120 words…') + wcHtml(k('explain'), 80, 120))}
        ${step(3, 'Give two natural examples.', ta(k('ex1'), 2, 'Example 1…') + ta(k('ex2'), 2, 'Example 2…'))}
        ${step(4, 'Predict one likely difficulty or mistake for a Portuguese-speaking learner.', ta(k('difficulty'), 3))}
        ${step(5, 'How would you respond to that learner without simply giving the answer?', ta(k('response'), 3, 'A question, a prompt, a contrast…'))}
        ${step(6, 'One concept-checking question <small class="muted">(if it fits)</small>', `<p class="muted" style="font-size:13.5px;margin-bottom:6px">${ccqNote}</p>${ta(k('ccq'), 2, 'Optional…')}`)}
      </div>
      <div class="qact" style="margin-top:14px">${isDemo() ? '<button class="btn line sm" disabled title="AI feedback is disabled in Demo Mode.">AI feedback disabled</button>' : `<button class="btn line sm" data-act="tlfb" data-r="${id}">get feedback on this explanation</button>`}</div>
      <div data-tlfb="${id}">${teacherLensFeedbackHtml(S.a[k('feedback')])}</div></div>`;
  }
  function teacherLensFeedbackHtml(fb) {
    if (!fb || !fb.f) return '';
    const f = fb.f, row = (t, v) => v ? `<p><b>${t}.</b> ${esc(v)}</p>` : '';
    const acc = f.linguisticAccuracy || {};
    return `<div class="fb"><span class="v" style="color:var(--ink)">Feedback on this explanation · ${esc(String(fb.at || '').slice(0, 10))}</span>
      ${row('Clarity', f.clarity)}${row('Linguistic accuracy', acc.summary)}${(acc.issues || []).length ? `<ul>${acc.issues.map(x => `<li><s>${esc(x.original)}</s> → <ins>${esc(x.better)}</ins> <em>${esc(x.why)}</em></li>`).join('')}</ul>` : ''}
      ${row('Appropriate for B1', f.b1Appropriateness)}${row('Examples', f.examples)}${row('Predicted difficulty', f.predictedDifficulty)}${row('Response to the learner', f.learnerResponse)}${row('Unnecessary complexity', f.unnecessaryComplexity)}${row('CCQ', f.ccq)}
      ${(f.suggestions || []).length ? `<p><b>To revise</b></p><ol>${f.suggestions.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}
      <p class="muted" style="font-size:13px">Feedback on this piece of explanation only — not a judgement of you as a teacher.</p></div>`;
  }
  async function requestTeacherLensFeedback(id, btn) {
    const p = reviewPrefix(id), v = f => String(S.a[`${p}:tl:${f}`] || '').trim();
    if (!v('point') || !v('explain')) { toast('Choose a point and write the explanation first'); return; }
    if (v('point') === 'other' && !v('custom')) { toast('Name the language point first'); return; }
    if (window.KLANG_SYNC && !window.KLANG_SYNC.getUser()) { needSignIn(); return; }
    saveNow(`${p}:tl`);
    const old = btn.textContent; btn.disabled = true; btn.textContent = 'reading your explanation…';
    const r = await aiFetch('/api/ai/teacher-lens-feedback', { review: p, pointId: v('point'), customPoint: v('custom'), explanation: v('explain'), examples: [v('ex1'), v('ex2')].filter(Boolean), difficulty: v('difficulty'), response: v('response'), ccq: v('ccq') });
    btn.disabled = false; btn.textContent = old;
    if (r.status === 401) { needSignIn(); return; }
    if (!r.ok) { toast(aiError(r)); return; }
    S.a[`${p}:tl:feedback`] = { at: r.data.createdAt || new Date().toISOString(), f: r.data.feedback };
    save(`${p}:tl:feedback`);
    const box = $(`[data-tlfb="${id}"]`); if (box) box.innerHTML = teacherLensFeedbackHtml(S.a[`${p}:tl:feedback`]);
    toast('Feedback saved with this review');
  }

  function renderReview(id, stage) {
    const d = REVIEWS[id]; if (!d) return renderHome();
    if (!stage || !REVIEW_STAGES.some(x => x[0] === stage)) stage = (S.last && S.last.u === reviewPrefix(id) && S.last.s) || 'retrieve';
    S.last = { u: reviewPrefix(id), s: stage }; save(); REG = {};
    const si = REVIEW_STAGES.findIndex(x => x[0] === stage), prev = REVIEW_STAGES[si - 1], next = REVIEW_STAGES[si + 1];
    const body = renderReviewBody(id, stage, d), readWords = words(d.reading.paras.join(' '));
    main().innerHTML = `<section class="uhero review-hero"><span class="pill">Module ${id} · Cumulative review</span><h1>${d.title}</h1>
      <div class="qcard"><div class="l">The challenge</div><p>${d.question}</p></div>
      <div class="meta"><div><b>Scope</b><span>Units ${d.units[0]}–${d.units[d.units.length - 1]}</span></div><div><b>Transfer read</b><span>${readWords} words</span></div><div><b>Method</b><span>Active recall · interleaving · transfer</span></div><div><b>Synthesis</b><span>600–900 words</span></div></div>
      <div class="uactions"><button class="btn out sm" data-act="copywriting" data-u="${reviewPrefix(id)}">copy writing</button><span class="sp"></span><label class="toggle" style="color:var(--taupe)"><input type="checkbox" data-rd="${id}" ${S.rd[id] ? 'checked' : ''}> review completed</label></div>
      <nav class="stepper review-stepper" aria-label="Review stages"><ol>${REVIEW_STAGES.map(([s, l], i) => `<li class="${s === stage ? 'on' : ''} ${reviewSecDone(id, s) ? 'done' : ''}"><button data-go="r${id}-${s}" aria-label="${l}" ${s === stage ? 'aria-current="step"' : ''}>${reviewSecDone(id, s) && s !== stage ? '✓' : i + 1}</button><span>${l}</span></li>`).join('')}</ol></nav></section>
      <section class="page"><div class="inner"><div class="shead"><span class="tagp">${String(si + 1).padStart(2, '0')} · Review</span><h2>${REVIEW_STAGES[si][1]}</h2><span class="tago">Module ${id}</span></div>${body}</div>
      <div class="stage-foot">${prev ? `<a class="btn line" href="#r${id}-${prev[0]}">← ${prev[1].toLowerCase()}</a>` : '<span></span>'}<label class="done-t"><input type="checkbox" data-rsec="${id}:${stage}" ${reviewSecDone(id, stage) ? 'checked' : ''}> section completed</label>${next ? `<a class="btn dark" href="#r${id}-${next[0]}">${next[1].toLowerCase()} →</a>` : '<a class="btn dark" href="#home">back to contents →</a>'}</div></section>`;
    $$('.wc', main()).forEach(wcClass);
  }

  function renderGlossary() {
    const f = GLF;
    let list = glossaryEntries();
    const counts = { all: list.length, new: 0, learning: 0, know: 0, none: 0 };
    list.forEach(e => { const s = glStatus(e.u, e.key); counts[s || 'none']++; });
    if (f.st !== 'all') list = list.filter(e => (glStatus(e.u, e.key) || 'none') === f.st);
    if (f.kind !== 'all') list = list.filter(e => e.kind === f.kind);
    if (f.q) { const q = f.q.toLowerCase(); list = list.filter(e => (e.title + ' ' + e.def + ' ' + e.extra).toLowerCase().includes(q)); }
    main().innerHTML = `<section class="tpage"><div class="inner"><div class="eyebrow">Notebook</div><h1>My <em>Glossary</em></h1>
      <p class="intro">All the vocabulary and chunks from the units you have, plus anything you select in a text and add yourself. Change the status here or in the unit. Words marked LEARNING go into each unit's export and come back later in Personal retrieval.</p>
      <div class="filters"><input class="ti" id="glq" type="search" placeholder="Search the glossary…" value="${esc(f.q)}">
        ${[['all', 'All'], ['new', 'New'], ['learning', 'Learning'], ['know', 'Know'], ['none', 'Unmarked']].map(([k, l]) => `<button class="chipf ${f.st === k ? 'on' : ''}" data-glf="st:${k}">${l} · ${counts[k]}</button>`).join('')}
        <span style="width:10px"></span>${[['all', 'Everything'], ['word', 'Words'], ['chunk', 'Chunks'], ['mine', 'Added by me']].map(([k, l]) => `<button class="chipf ${f.kind === k ? 'on' : ''}" data-glf="kind:${k}">${l}</button>`).join('')}</div>
      <div class="glist">${list.length ? list.map(e => e.mine ? `<div class="gitem"><div><h4>${e.title}</h4><small>added by me · Unit ${e.u}${e.mine.sec ? ' · ' + esc(e.mine.sec) : ''}</small></div><p>${e.def || '<span class="muted">No meaning yet</span>'}${e.mine.ctx ? `<br><i>${esc(e.mine.ctx)}</i>` : ''}</p><div class="ga">${statusCtl(e.u, e.key)}<button class="btn ghost sm" data-act="gxedit" data-id="${esc(e.mine.id)}">edit</button><button class="btn ghost sm" data-del="glx:${esc(e.mine.id)}">delete</button><a class="ibtn" title="Open source" aria-label="Open source" href="#u${e.u}-${esc(e.mine.sec || 'read')}">→</a></div></div>` : `<div class="gitem"><div><h4>${e.title}</h4><small>${e.kind} · Unit ${e.u}</small></div><p>${e.def}</p><div class="ga">${statusCtl(e.u, e.key)}<a class="ibtn" title="Open in unit" aria-label="Open in unit" href="#u${e.u}-steal" data-flash="${e.kind === 'word' ? 'v' : 'c'}-${e.u}-${e.key.slice(2)}">→</a></div></div>`).join('') : '<div class="empty">Nothing matches these filters.</div>'}</div></div></section>`;
  }
  let GLF = { st: 'all', kind: 'all', q: '' };


  function renderErrors() {
    main().innerHTML = `<section class="tpage"><div class="inner"><div class="eyebrow">Notebook</div><h1>My Error <em>Log</em></h1>
      <p class="intro">After each correction, log the errors that matter: the ones you make more than once. Write a new example of your own, then review the log regularly. Each review is counted.</p>
      <div style="margin-bottom:16px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn dark" data-act="adderr">add a row →</button><span class="muted" style="align-self:center;font-size:14px">${S.errs.length} entries</span></div>
      <div class="etable"><table><thead><tr><th style="width:21%">My sentence</th><th style="width:21%">Correction</th><th style="width:21%">Why</th><th style="width:21%">New example</th><th>Review</th></tr></thead><tbody>
      ${S.errs.length ? S.errs.map(r => `<tr>${['mine', 'corr', 'why', 'ex'].map(f => `<td><textarea aria-label="${f}" data-err="${r.id}:${f}">${esc(r[f] || '')}</textarea></td>`).join('')}<td><div class="rv"><button class="btn line sm" data-rev="${r.id}">reviewed</button><span>${r.n || 0}× ${r.last ? '· ' + r.last : ''}</span><button class="btn ghost sm" data-del="err:${r.id}">delete</button></div></td></tr>`).join('') : `<tr><td colspan="5"><div class="empty" style="border:0">No entries yet. Add a row after your next correction.</div></td></tr>`}
      </tbody></table></div></div></section>`;
  }

  const PF_ST = ['Not started', 'Drafting', 'First draft done', 'Revised', 'Final'];
  function writingTasks() {
    const out = [];
    Object.keys(UNITS).sort().forEach(u => {
      const d = UNITS[u]; const rev = d.edit && d.edit.revised;
      (d.write.items || []).forEach(it => out.push({ u, it, rev: rev && rev.revisionOf === it.id ? rev : null }));
    });
    Object.keys(REVIEWS).sort().forEach(id => [REVIEWS[id].synthesis, REVIEWS[id].timed].filter(Boolean).forEach(it => out.push({ u: reviewPrefix(id), it, rev: null })));
    return out;
  }
  function renderPortfolio() {
    const rows = writingTasks();
    main().innerHTML = `<section class="tpage"><div class="inner"><div class="eyebrow">Notebook</div><h1>My Writing <em>Portfolio</em></h1>
      <p class="intro">Every writing task in the book, in one place. Drafts are written inside each unit; here you track their status. Setting a task to "Final" records today's date.</p>
      <div class="pf">${rows.map(({ u, it, rev }) => {
        const k = u + ':' + it.id, p = S.pf[k] || {}, t1 = S.a[k] || '', t2 = rev ? (S.a[u + ':' + rev.id] || '') : '';
        const st = p.s || (t1 ? 'Drafting' : 'Not started');
        const isReview = /^r\d$/.test(u);
        return `<div class="pfrow"><div class="top"><span class="un">${isReview ? `Module ${u.slice(1)} Review` : `Unit ${u}`}</span><div><h4>${esc(it.title)}</h4><small>${esc(it.kind)} · ${it.min}–${it.max} words</small></div>
          <div class="nums">First draft · <b>${words(t1)}</b>${rev ? `<br>Revised · <b>${words(t2)}</b>` : ''}</div>
          <div style="display:grid;gap:6px;justify-items:end"><select data-pf="${k}:s" aria-label="Status">${PF_ST.map(s => `<option ${s === st ? 'selected' : ''}>${s}</option>`).join('')}</select><input type="date" data-pf="${k}:d" value="${esc(p.d || '')}" aria-label="Date completed"></div></div>
          <details><summary>show drafts</summary><div class="drafts"><div><b>First draft</b>${t1 ? esc(t1) : '<span class="muted">Empty</span>'}</div><div><b>Revised draft</b>${rev ? (t2 ? esc(t2) : '<span class="muted">Empty</span>') : '<span class="muted">No revision stage for this task</span>'}</div></div>
          ${(p.fb || []).length ? `<div class="pffb"><b>AI feedback</b>${p.fb.slice().reverse().map(f => `<button class="btn line sm" data-act="fbopen" data-pk="${k}" data-id="${esc(f.id)}">${esc(f.at.slice(0, 10))} · ${f.draft === 'revised' ? 'revised' : 'first'} draft · ${esc(f.f.estimatedLevel.level)}</button>`).join('')}</div>` : ''}
          <p style="margin-top:10px"><a class="btn ghost sm" href="#${isReview ? `${u}-synthesis` : `u${u}-${it._stage || 'write'}`}">open ${isReview ? 'review' : 'unit'} →</a></p></details></div>`;
      }).join('')}</div>
      <p class="muted" style="margin-top:18px;font-size:14px">New units add their writing tasks here automatically.</p></div></section>`;
  }

  function renderBookmarks() {
    const types = ['word', 'chunk', 'paragraph', 'question'];
    main().innerHTML = `<section class="tpage"><div class="inner"><div class="eyebrow">Notebook</div><h1><em>Bookmarks</em></h1>
      <p class="intro">Use the bookmark icon on words, chunks and questions, or the paragraph numbers in the margin of each reading.</p>
      ${S.bm.length ? types.map(t => { const l = S.bm.filter(b => b.type === t); return l.length ? `<div class="block" style="margin-top:26px"><div class="bhead"><h3 style="text-transform:capitalize">${t}s</h3><span class="tago">${l.length}</span></div><div class="bmlist">${l.map(b => `<div class="bmitem"><span class="ty">Unit ${b.u}</span><div><p>${esc(b.text)}</p></div><div style="display:flex;gap:8px"><a class="btn line sm" href="#${b.ref}">open →</a><button class="btn ghost sm" data-unbm="${esc(b.id)}">remove</button></div></div>`).join('')}</div></div>` : ''; }).join('') : '<div class="empty">No bookmarks yet.</div>'}
    </div></section>`;
  }

  const CA_FIELDS = [
    ['happened', 'What happened?', 'The event in two or three neutral sentences. Who, what, when, where.'],
    ['know', 'What do we know?', 'Facts that are confirmed by more than one reliable source.'],
    ['uncertain', 'What is still uncertain?', 'Open questions, disputed numbers, things that depend on future decisions.'],
    ['institutions', 'Who are the relevant institutions?', 'Which bodies have the power to act here (Congress, STF, TSE, a ministry, a state government…) and what can each legally do?'],
    ['interpretations', 'What are the competing interpretations?', 'Describe at least two, each in the way its own defenders would put it.'],
    ['evidence', 'What evidence is being used?', 'Data, documents, testimony. Who produced it? What does it actually show?'],
    ['verify', 'What should I verify?', 'Claims to check against primary sources (TSE, IBGE, Câmara, Senado, Diário Oficial, Banco Central).'],
    ['vocab', 'Vocabulary from the issue', 'Words and terms you needed to understand the coverage.'],
    ['chunks', '5 useful chunks', 'Chunks you could reuse in writing about any political or social issue.'],
    ['think', 'Think', 'What assumption does each interpretation depend on? What would change your mind?']
  ];
  function renderCurrent() {
    main().innerHTML = `<section class="tpage"><div class="inner"><div class="eyebrow">Outside the units</div><h1>Current Affairs <em>Lab</em></h1>
      <p class="intro">Units go out of date; this structure doesn't. Use it whenever a story in Brazil or elsewhere catches your attention: read the coverage in English (and in Portuguese, if you like), then work through the steps below. You can add new issues at any time; each one is saved here with its own notes and writing.</p>
      <div class="cal-steps">${[['1 · Separate', 'What happened from what people say it means.'], ['2 · Locate', 'Which institution can actually do something.'], ['3 · Compare', 'At least two interpretations, stated fairly.'], ['4 · Write', '250–400 words, with a clear main idea.']].map(s => `<div><b>${s[0]}</b>${s[1]}</div>`).join('')}</div>
      <form class="form caform" id="caform"><label>New issue<input class="ti" id="ca-t" required placeholder="e.g. A Senate vote on…"></label><label>Date<input class="ti" id="ca-d" type="date" value="${today()}"></label><button class="btn dark" type="submit">add issue →</button></form>
      ${S.ca.length ? S.ca.slice().reverse().map((c, idx) => `<details class="issue" ${idx === 0 ? 'open' : ''}><summary><h3>${esc(c.title)}</h3><small>${esc(c.date)}</small></summary><div class="ib">
        ${CA_FIELDS.map(([f, l, h]) => `<label for="ca-${c.id}-${f}">${l}<span>${h}</span><textarea class="ta" id="ca-${c.id}-${f}" data-ca="${c.id}:${f}" rows="3">${esc((c.f || {})[f] || '')}</textarea></label>`).join('')}
        <label for="ca-${c.id}-write">Write · 250–400 words<span>Your own position, or an explanation of why the question is harder than it looks.</span><textarea class="ta" id="ca-${c.id}-write" data-ca="${c.id}:write" rows="10">${esc((c.f || {}).write || '')}</textarea></label>
        <div class="wc" data-ca-wc="${c.id}"></div>
        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><button class="btn line sm" type="button" data-act="caexport" data-id="${c.id}">copy as markdown</button><button class="btn ghost sm" type="button" data-del="ca:${c.id}">delete issue</button></div>
      </div></details>`).join('') : '<div class="empty">No issues yet. Add the first one above.</div>'}
    </div></section>`;
    S.ca.forEach(c => caWc(c.id));
  }
  function caWc(id) {
    const el = $(`[data-ca-wc="${id}"]`); if (!el) return;
    const c = S.ca.find(x => x.id === id); const n = words((c.f || {}).write);
    el.innerHTML = wcInner(n, 250, 400); el.classList.toggle('in', n >= 250 && n <= 400); el.classList.toggle('over', n > 400);
  }

  let SQ = '';
  function searchIndex() {
    const out = [];
    ALL.forEach(u => out.push({ ty: 'Unit ' + u.id, t: u.title, s: `${u.q} · ${u.grammar} · ${u.think} · ${u.write}`, h: `u${u.id}` }));
    Object.keys(UNITS).forEach(u => {
      const d = UNITS[u];
      d.steal.vocab.forEach(v => out.push({ ty: 'Word', t: v.w, s: v.def + ' · ' + v.col.join(', '), h: `u${u}-steal`, fl: `v-${u}-${v.key}` }));
      d.steal.chunks.forEach(c => out.push({ ty: 'Chunk', t: c.c, s: c.meaning + ' · ' + c.ex, h: `u${u}-steal`, fl: `c-${u}-${c.key}` }));
      d.notice.focuses.forEach(f => out.push({ ty: 'Grammar', t: f.title, s: `Unit ${u} · ${f.sub}`, h: `u${u}-notice` }));
      [['main', d.read.main], ['counter', d.read.counter]].forEach(([w, r]) => r && r.paras.forEach((p, i) => out.push({ ty: 'Reading', t: `${r.title} · ¶${i + 1}`, s: strip(p), h: `u${u}-read` })));
    });
    return out;
  }
  function renderSearch() {
    const q = SQ.trim().toLowerCase();
    let res = [];
    if (q.length >= 2) res = searchIndex().filter(r => (r.t + ' ' + r.s).toLowerCase().includes(q)).slice(0, 60);
    const hl = s => { const i = s.toLowerCase().indexOf(q); if (i < 0) return esc(s.slice(0, 180)); const a = Math.max(0, i - 70); return (a ? '…' : '') + esc(s.slice(a, i)) + '<mark>' + esc(s.slice(i, i + q.length)) + '</mark>' + esc(s.slice(i + q.length, i + q.length + 110)) + '…'; };
    main().innerHTML = `<section class="tpage"><div class="inner"><div class="eyebrow">Search</div><h1>${q ? `“${esc(SQ)}”` : 'Search'}</h1>
      <p class="intro">Searches unit themes and questions, grammar focuses, vocabulary, chunks and the full text of every reading.</p>
      <div class="sres">${q.length < 2 ? '<div class="empty">Type at least two letters in the search box.</div>' : res.length ? res.map(r => `<a href="#${r.h}" ${r.fl ? `data-flash="${r.fl}"` : ''}><span class="ty">${r.ty}</span><div><p><b>${hl(r.t)}</b></p><small>${hl(r.s)}</small></div></a>`).join('') : '<div class="empty">No results.</div>'}</div></div></section>`;
  }

  /* ── sidebar ─────────────────────────────── */
  function profileBadgeText() {
    if (!window.KLANG_PROFILE) return 'GATHERING EVIDENCE';
    try {
      const P = window.KLANG_PROFILE.generateFullProfile(S, K);
      if (P && P.overall && P.overall.status === 'ready') {
        return `${P.overall.level} · ${P.overall.confidence.toUpperCase()}`;
      }
    } catch (e) {
      console.warn('[profile] error computing badge', e);
    }
    return 'GATHERING EVIDENCE';
  }

  function renderProfile(retryCount = 0) {
    if (!window.KLANG_PROFILE && retryCount < 5) {
      setTimeout(() => renderProfile(retryCount + 1), 40);
      return;
    }
    let P = null;
    if (window.KLANG_PROFILE) {
      try {
        P = window.KLANG_PROFILE.generateFullProfile(S, K);
      } catch (e) {
        console.error('[profile] error generating full profile', e);
      }
    }
    if (!P) {
      P = {
        version: 1,
        overall: { status: 'learning', level: null, score: null, confidence: 'not_enough_evidence', assessedActivitiesCount: 0, dimensionsEvaluated: 0, message: 'Complete unit activities, writing drafts, and listening tasks to build your profile evidence.' },
        dimensions: (window.KLANG_PROFILE ? window.KLANG_PROFILE.DIMENSIONS : [
          { key: 'reading_comprehension', label: 'Reading comprehension' },
          { key: 'listening_comprehension', label: 'Listening comprehension' },
          { key: 'written_accuracy', label: 'Written accuracy' },
          { key: 'written_range', label: 'Written range' },
          { key: 'vocabulary', label: 'Vocabulary' },
          { key: 'grammar_control', label: 'Grammar control' },
          { key: 'spoken_production', label: 'Spoken production', note: 'Transcript analysis only (no acoustic/pronunciation claims)' },
          { key: 'critical_reasoning', label: 'Critical reasoning in English', note: 'Observable task performance, not general intelligence' }
        ]).map(d => ({ key: d.key, label: d.label, level: null, score: null, confidence: 'not_enough_evidence', evidenceCount: 0, note: d.note })),
        registerControl: { status: 'not_enough_evidence', label: 'Not enough evidence', summary: 'Complete more writing and language-assessed tasks to map your register flexibility across contexts.', evidenceCount: 0, insights: [] },
        strengths: [],
        priorities: [],
        evidenceCount: 0,
        lastCalculatedAt: new Date().toISOString()
      };
    }

    const ov = P.overall;
    const isReady = ov && ov.status === 'ready';
    const confClass = ov && ov.confidence === 'high' ? 'good' : ov && ov.confidence === 'medium' ? 'medium' : 'muted';
    const confLabel = ov && ov.confidence === 'high' ? 'High confidence' : ov && ov.confidence === 'medium' ? 'Medium confidence' : 'Low confidence';

    const dimsHtml = P.dimensions.map(d => {
      const hasLevel = d.level !== null;
      const confTag = d.confidence === 'high' ? '<span class="tago" style="background:#e8f5e9;color:#2e7d32">HIGH CONFIDENCE</span>' :
                      d.confidence === 'medium' ? '<span class="tago" style="background:#fff8e1;color:#b45309">MEDIUM CONFIDENCE</span>' :
                      d.confidence === 'low' ? '<span class="tago" style="background:#f5f5f5;color:#616161">LOW CONFIDENCE</span>' :
                      '<span class="tago" style="background:#fce4ec;color:#c2185b">NEEDS EVIDENCE</span>';

      // Evidence without a CEFR estimate (speaking, quick checks, conversations) is shown as evidence, never as a level
      const levelDisplay = hasLevel ? `<div class="p-level">${esc(d.level)}</div>` : `<div class="p-level none">${d.evidenceCount ? 'Evidence recorded · no level estimate' : 'Not enough evidence yet'}</div>`;
      const ptsDisplay = `<div class="p-pts">${d.evidenceCount} evidence point${d.evidenceCount === 1 ? '' : 's'}${d.unitsCount ? ` · ${d.unitsCount} unit${d.unitsCount === 1 ? '' : 's'}` : ''}</div>`;
      const performanceDisplay = d.performance ? `<div class="p-pts">${d.performance.correct}/${d.performance.evaluated} checked objective items correct · performance evidence, not a CEFR result</div>` : '';

      const pctPos = hasLevel ? Math.max(0, Math.min(100, ((d.score || 0) / 10) * 100)) : 0;
      const trackHtml = hasLevel ? `
        <div class="cefr-track" title="Estimated position: ${d.level}">
          <div class="cefr-scale"><span>A1</span><span>B1</span><span>B2</span><span>C1</span><span>C2</span></div>
          <div class="cefr-bar"><div class="cefr-fill" style="width:${pctPos}%"></div><div class="cefr-pin" style="left:${pctPos}%"></div></div>
        </div>
      ` : '';

      const noteHtml = d.note ? `<p class="p-note">${esc(d.note)}</p>` : '';

      return `
        <div class="profile-card">
          <div class="p-head">
            <h3>${esc(d.label)}</h3>
            ${confTag}
          </div>
          ${levelDisplay}
          ${ptsDisplay}
          ${performanceDisplay}
          ${trackHtml}
          ${noteHtml}
        </div>
      `;
    }).join('');

    // Register Control (P.registerControl) is not shown: it is inferred from keywords in AI feedback, not from evidence
    const strengthsHtml = P.strengths && P.strengths.length ? `
      <div class="block" style="margin-top:24px">
        <div class="bhead"><span class="kl">Strengths</span><h3>Demonstrated areas of strength</h3></div>
        <ul class="sup">${P.strengths.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      </div>
    ` : '';

    const prioritiesHtml = P.priorities && P.priorities.length ? `
      <div class="block" style="margin-top:20px">
        <div class="bhead"><span class="kl">Priorities</span><h3>Current consolidation priorities</h3></div>
        <ul class="sup">${P.priorities.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
      </div>
    ` : '';

    main().innerHTML = `
      <section class="tpage"><div class="inner">
        <div class="eyebrow">Evidence-based progression</div>
        <h1>Current English <em>Profile</em></h1>
        <p class="intro">Your English profile emerges continuously from observable evidence produced across reading, listening, writing, speaking, grammar and reasoning tasks. No CEFR level is ever invented without concrete proof.</p>

        <div class="profile-hero ${isReady ? 'ready' : 'learning'}">
          <div class="hero-top">
            <div>
              <span class="tagp">${isReady ? 'ESTABLISHED PROFILE' : 'CONTINUOUS EVIDENCE GATHERING'}</span>
              <h2 class="hero-level">${isReady ? ov.level : 'Still learning about your English'}</h2>
              <p class="hero-sub">${isReady ? `Your English shows consistent ${ov.level}-level evidence across multiple assessed skills.` : ov.message}</p>
            </div>
            ${isReady ? `<div class="hero-badge ${confClass}"><b>${confLabel}</b><span>${ov.assessedActivitiesCount} evidence points</span></div>` : ''}
          </div>
        </div>

        <div class="profile-grid">
          ${dimsHtml}
        </div>

        ${strengthsHtml}
        ${prioritiesHtml}

        <div class="block" style="margin-top:28px">
          <div class="bhead"><h3>Assessment methodology & limitations</h3></div>
          <p class="muted" style="font-size:14px;line-height:1.6">
            • <b>Evidence-based:</b> Levels are computed through conservative percentile aggregation. A single outlier performance never distorts the overall profile.<br>
            • <b>Speaking limitation:</b> Speaking is analyzed from automated verbatim transcripts only. Pronunciation, accent, acoustic rhythm and intonation are not evaluated here.<br>
            • <b>Critical reasoning:</b> Measures performance on structured argumentation and evidence-evaluation tasks in this book, not general intelligence.<br>
            • <b>Private:</b> All assessment evidence stays on your device and private cloud sync.
          </p>
        </div>
      </div></section>
    `;
  }

  function renderSide(hash) {
    const pct = overall();
    const curU = (hash.match(/^u(\d\d)/) || [])[1];
    const curReview = (hash.match(/^r([12])/) || [])[1];
    const curMod = curReview ? +curReview : (curU && meta(curU) ? meta(curU).module : null);
    $('#side').innerHTML = `
      <a class="brand" href="#home" aria-label="Home">${wordmark()}<span>A Mind in English</span></a>
      <div id="side-account" class="side-account"></div>
      <div id="side-timer" class="side-timer">${sideTimerHtml()}</div>
      <div class="prog"><div class="row"><span>Progress</span><b>${pct}%</b></div><div class="bar"><i style="width:${pct}%"></i></div></div>
      <div class="side-profile-widget">
        <div class="row"><span>English Profile</span><b>${profileBadgeText()}</b></div>
        <a href="#profile">view english profile →</a>
      </div>
      <a class="btn rosa wide" href="#${continueTarget()}">continue studying →</a>
      <div class="search">${ICON.search}<input id="sq" type="search" placeholder="Search themes, words, texts…" value="${esc(SQ)}" aria-label="Search"></div>
      <div><div class="nav-label">Modules</div><div class="mods">${CUR.modules.map(m => `<details ${m.id === (curMod || 1) ? 'open' : ''}><summary><span class="mn">${m.id}</span><span class="mt">${m.title}</span><span class="mc">${m.units.filter(u => S.ud[u.id]).length}/${m.units.length}</span></summary>
        <ul>${m.units.map(u => `<li><a href="#u${u.id}" class="${u.id === curU ? 'on' : ''} ${has(u.id) ? '' : 'soon'}"><span class="n">${u.id}</span><span>${u.title}</span><span class="st ${unitState(u.id)}"></span></a></li>`).join('')}${REVIEWS[m.id] ? `<li><a href="#r${m.id}" class="${String(m.id) === curReview ? 'on' : ''}"><span class="n">↺</span><span>Module Review</span><span class="st ${S.rd[m.id] ? 'done' : ''}"></span></a></li>` : ''}</ul></details>`).join('')}</div></div>
      <div><div class="nav-label">Notebook</div><div class="tools">
        ${[['home', ICON.home, 'Home & contents', ''], ['profile', ICON.pf, 'English Profile', ''], ['learning', ICON.book, 'Learning Review', ''], ['glossary', ICON.gl, 'My Glossary', glossaryEntries().filter(e => glStatus(e.u, e.key) === 'learning').length || ''], ['errors', ICON.err, 'My Error Log', S.errs.length || ''], ['portfolio', ICON.pf, 'My Writing Portfolio', ''], ['bookmarks', ICON.bm, 'Bookmarks', S.bm.length || ''], ['current', ICON.ca, 'Current Affairs Lab', '']].map(t => `<a href="#${t[0]}" class="${hash === t[0] ? 'on' : ''}">${t[1]}<span>${t[2]}</span><span class="ct">${t[3]}</span></a>`).join('')}
      </div></div>
      ${backupBox()}
      <p class="side-foot">KLANG · o som da língua</p>`;
    if (window.KLANG_SYNC) window.KLANG_SYNC.updateAccountUI();
  }

  /* ── backup & restore ──────────────────── */
  const BK_DAYS = 7;
  function daysSince(d) { if (!d) return Infinity; return Math.floor((Date.parse(today()) - Date.parse(d)) / 864e5); }
  function hasWork() { return Object.keys(S.a).some(k => S.a[k]) || S.bank.length || S.errs.length || S.ca.length || (S.sp || []).length; }
  function backupBox() {
    if (isDemo()) {
      return `<div class="bkbox"><div class="nav-label" style="margin:0">Demo session</div>
        <p>Backup and restore are disabled for demo accounts.</p>
        <button class="btn rosa sm wide" data-act="backup" disabled>back up everything ↓</button>
        <button class="btn out sm wide" data-act="restore" disabled>restore a backup</button>
        <small>Demo state is temporary</small></div>`;
    }
    const n = daysSince(S.lb), due = hasWork() && n >= BK_DAYS;
    const when = !S.lb ? 'No backup yet' : n === 0 ? 'Last backup: today' : n === 1 ? 'Last backup: yesterday' : `Last backup: ${n} days ago`;
    return `<div class="bkbox ${due ? 'due' : ''}"><div class="nav-label" style="margin:0">Your work</div>
      <p>Saved in this browser and synced to your account. ${due ? '<b>Time for a backup.</b>' : 'Back up regularly so nothing gets lost.'}</p>
      <button class="btn rosa sm wide" data-act="backup">back up everything ↓</button>
      <button class="btn out sm wide" data-act="restore">restore a backup</button>
      <small>${when}</small>
      <input type="file" id="bkfile" accept=".json,application/json" hidden></div>`;
  }
  function doBackup() {
    const data = { app: 'a-mind-in-english', v: 1, saved: new Date().toISOString(), state: S };
    const name = `a-mind-in-english-backup-${today()}.json`;
    downloadFile(name, JSON.stringify(data, null, 1), 'application/json', () => { S.lb = today(); saveNow(); renderSide(location.hash.slice(1) || 'home'); });
  }
  function readBackup(file) {
    const r = new FileReader();
    r.onload = () => {
      let o; try { o = JSON.parse(r.result); } catch (e) { toast('This file is not a valid backup.'); return; }
      const st = o && o.app === 'a-mind-in-english' && o.state;
      if (!st || typeof st.a !== 'object') { toast('This file is not a backup from A Mind in English.'); return; }
      const nA = Object.keys(st.a).filter(k => st.a[k]).length;
      modal(`<h3>Restore this backup?</h3><p>Backup from <b>${esc((o.saved || '').slice(0, 10) || 'unknown date')}</b>: ${nA} saved answers, ${(st.errs || []).length} error-log rows, ${(st.sp || []).length} speaking attempts.</p>
        <p>This <b>replaces</b> everything currently saved in this browser and, once it syncs, in your account. If you have newer work here, back it up first.</p>
        <div class="acts"><button class="btn line" data-act="close">cancel</button><button class="btn line" data-act="backup">back up current first</button><button class="btn dark" data-act="dorestore">restore →</button></div>`);
      PENDING = st;
    };
    r.readAsText(file);
  }
  let PENDING = null;
  function applyRestore() {
    if (!PENDING) return;
    const fresh = JSON.parse(JSON.stringify(DEF));
    Object.keys(DEF).forEach(k => { if (PENDING[k] !== undefined) fresh[k] = PENDING[k]; });
    // Mutate in place: the sync engine holds a reference to S
    Object.keys(S).forEach(k => { delete S[k]; }); Object.assign(S, fresh); PENDING = null;
    migrateLegacyTimed(S);   // an old backup may still hold the Timed essay under the shared key
    const ok = saveNow();
    if (window.KLANG_SYNC) {
      ['glossary', 'language-bank', 'error-log', 'bookmarks', 'portfolio', 'speaking', 'current-affairs', 'progress'].forEach(k => window.KLANG_SYNC.markDirty(k));
      window.KLANG_SYNC.markDirty('english-profile');
      Object.keys(UNITS).forEach(u => window.KLANG_SYNC.markDirty('unit:' + u));
      Object.keys(REVIEWS).forEach(id => window.KLANG_SYNC.markDirty('review:' + id));
      window.KLANG_SYNC.syncPending();
    }
    closeModal(); applyPrefs(); route();
    toast(ok ? 'Backup restored' : 'Restored for now, but this browser is blocking saving');
  }
  document.addEventListener('change', e => { if (e.target.id === 'bkfile' && e.target.files[0]) { readBackup(e.target.files[0]); e.target.value = ''; } });

  /* ── router ──────────────────────────────── */
  let lastRoute = '';
  function route() {
    document.body.classList.remove('nav-open');
    closePop();
    const h = (location.hash || '#home').slice(1) || 'home';
    let m = h.match(/^u(\d\d)(?:-([a-z]+))?$/);
    const r = h.match(/^r([12])(?:-([a-z]+))?$/);
    if (m && !meta(m[1])) m = null;
    const talk = h.match(/^talk(\d\d)(?:-([A-Za-z0-9_-]{8,96}))?$/);
    const prevUnit = (lastRoute.match(/^u(\d\d)/) || [])[1];
    if (!m && !r) exitFocus();
    if (talk && window.KLANG_CHAT && window.KLANG_CHAT.hasCharacter(talk[1])) window.KLANG_CHAT.render(talk[1], talk[2] || null, lastRoute === h ? null : { focus: '#talk-title' });
    else if (m) renderUnit(m[1], m[2]);
    else if (r && REVIEWS[r[1]]) renderReview(r[1], r[2]);
    else if (h === 'profile') renderProfile();
    else if (h === 'learning' && window.KLANG_LEARNING_REVIEW) window.KLANG_LEARNING_REVIEW.render();
    else if (h === 'glossary') renderGlossary();
    else if (h === 'errors') renderErrors();
    else if (h === 'portfolio') renderPortfolio();
    else if (h === 'bookmarks') renderBookmarks();
    else if (h === 'current') renderCurrent();
    else if (h === 'search') renderSearch();
    else if (h === 'contents') { renderHome(); setTimeout(() => { const c = $('#contents'); c && c.scrollIntoView(); }, 0); }
    else renderHome();
    renderSide(h);
    if (h === 'search' && innerWidth > 980) { const q = $('#sq'); if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); } }
    if ((m && prevUnit === m[1] || r && lastRoute.startsWith(`r${r[1]}`)) && !document.body.classList.contains('focus')) {
      const st = $('.stepper'); if (st) window.scrollTo(0, st.getBoundingClientRect().top + window.scrollY - 80);
    } else if (talk && lastRoute === h) {
      // same conversation re-rendered (sync update): keep the reader where they are
    } else if (h !== 'contents' && h !== 'search') window.scrollTo(0, 0);
    if (FLASH) { const el = document.getElementById(FLASH); if (el) { el.scrollIntoView({ block: 'center' }); el.classList.add('flash'); } FLASH = null; }
    lastRoute = h;
  }
  let FLASH = null;

  /* ── focus mode ──────────────────────────── */
  function applyPrefs() {
    document.documentElement.style.setProperty('--read-size', S.prefs.fs + 'px');
    document.documentElement.style.setProperty('--read-width', S.prefs.w + 'ch');
  }
  function enterFocus() { document.body.classList.add('focus'); window.scrollTo(0, 0); }
  function exitFocus() { document.body.classList.remove('focus'); }
  window.addEventListener('scroll', () => {
    if (!document.body.classList.contains('focus')) return;
    const h = document.documentElement.scrollHeight - innerHeight;
    $('#rprog').style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
  }, { passive: true });

  /* ── popover ─────────────────────────────── */
  function closePop() { const p = $('#pop'); if (p) p.remove(); }
  function openPop(el) {
    closePop();
    const [u, key] = el.dataset.v.split(':');
    const v = UNITS[u].steal.vocab.find(x => x.key === key); if (!v) return;
    const p = document.createElement('div'); p.className = 'pop'; p.id = 'pop'; p.setAttribute('role', 'dialog');
    p.innerHTML = `<div><h4>${v.w}</h4><div class="pos">${v.pos}${v.pron ? ' · ' + v.pron : ''}</div></div><p>${v.def}</p><div class="row">${statusCtl(u, 'v:' + key)}<button class="lnk" data-flashgo="v-${u}-${key}" data-h="u${u}-steal">full card →</button></div>`;
    document.body.appendChild(p);
    const r = el.getBoundingClientRect();
    let left = r.left + scrollX; const w = p.offsetWidth;
    left = Math.max(16, Math.min(left, scrollX + innerWidth - w - 16));
    p.style.left = left + 'px'; p.style.top = (r.bottom + scrollY + 8) + 'px';
  }

  /* ── modal ───────────────────────────────── */
  function modal(html) {
    closeModal();
    const m = document.createElement('div'); m.className = 'modal'; m.id = 'modal';
    m.innerHTML = `<div class="box" role="dialog" aria-modal="true">${html}</div>`;
    m.addEventListener('click', e => { if (e.target === m) closeModal(); });
    document.body.appendChild(m);
    const f = m.querySelector('button, textarea'); f && f.focus();
  }
  function closeModal() { const m = $('#modal'); if (m) m.remove(); }

  /* ── export ──────────────────────────────── */
  const ITEM_TYPES = new Set(['mc', 'tf', 'open', 'produce', 'label', 'match', 'writing']);
  function collect(d) {
    const out = [];
    const walk = (n, stage) => {
      if (Array.isArray(n)) return n.forEach(x => walk(x, stage));
      if (n && typeof n === 'object') {
        if (n.id && ITEM_TYPES.has(n.type)) out.push({ stage, it: n });
        Object.keys(n).forEach(k => { if (k !== '_stage') walk(n[k], stage); });
      }
    };
    STAGES.forEach(([s]) => walk(d[s], s));
    return out;
  }
  function answerMd(u, it) {
    const k = u + ':' + it.id, a = S.a[k];
    switch (it.type) {
      case 'mc': return a === undefined || a === '' ? '' : `${LET[+a]}. ${strip(it.options[+a])}`;
      case 'tf': { const w = S.a[k + ':why']; return (a || w) ? `${a || '—'}${w ? ' · ' + w : ''}` : ''; }
      case 'label': return it.rows.map((r, i) => S.a[k + ':' + i] ? `- ${strip(r.text)} → **${S.a[k + ':' + i]}**` : '').filter(Boolean).join('\n');
      case 'match': return it.pairs.map((p, i) => S.a[k + ':' + i] ? `- ${p[0]} → ${S.a[k + ':' + i]}` : '').filter(Boolean).join('\n');
      default: return a || '';
    }
  }
  function buildMd(u) {
    const d = UNITS[u], m = meta(u);
    const L = [`# Unit ${u} · ${m.title}`, '', `*A Mind in English · KLANG Personal Study Book · exported ${today()}*`, '', `**The question:** ${d.question}`, ''];
    const items = collect(d);
    STAGES.forEach(([s, label]) => {
      const rows = items.filter(x => x.stage === s).map(x => {
        const ans = answerMd(u, x.it); if (!ans) return '';
        if (x.it.type === 'writing') return `### ${x.it.kind}: ${x.it.title}\n\n*Word count: ${words(ans)} (target ${x.it.min}–${x.it.max})*\n\n${strip(x.it.prompt)}\n\n---\n\n${ans}\n`;
        return `**${strip(x.it.q || x.it.title)}**\n\n${ans}\n`;
      }).filter(Boolean);
      if (s === 'edit') {
        const ck = d.edit.checklist.filter((c, i) => S.a[`${u}:ck:${i}`]);
        const ch = d.edit.challenges.filter((c, i) => S.a[`${u}:ch:${i}`]);
        if (ck.length) rows.unshift(`**Checklist items I checked:**\n\n${ck.map(c => '- ' + c).join('\n')}\n`);
        if (ch.length) rows.unshift(`**Second draft challenges I chose:**\n\n${ch.map(c => '- ' + c).join('\n')}\n`);
      }
      if (rows.length) L.push(`## ${label.toUpperCase()}${s === 'think' ? ' · Thinking Lab' : ''}`, '', ...rows, '');
    });
    if (PRON[u] && S.a[`${u}:pron`]) L.push('## PRONUNCIATION IN CONTEXT', '', `**${strip(PRON[u].task.q)}**`, '', S.a[`${u}:pron`], '');
    const learn = d.steal.vocab.filter(v => glStatus(u, 'v:' + v.key) === 'learning');
    const learnC = d.steal.chunks.filter(c => glStatus(u, 'c:' + c.key) === 'learning');
    if (learn.length || learnC.length) {
      L.push('## Language I marked as LEARNING', '');
      learn.forEach(v => L.push(`- **${v.w}**: ${v.def}`));
      learnC.forEach(c => L.push(`- **${c.c}**: ${c.meaning}`));
      L.push('');
    }
    L.push('---', '', '*Note for the corrector: I am a B2+ English teacher working towards C1. Please correct grammar, word choice and naturalness, explain the recurring patterns, and point out where I used the unit\'s target language well or badly.*');
    return L.join('\n');
  }
  let DL = null;
  if (window.claude && typeof window.claude.use === 'function') { window.claude.use('downloads').then(d => { DL = d; }).catch(() => { }); }
  function downloadMd(name, txt) { downloadFile(name, txt, 'text/markdown'); }
  function downloadFile(name, txt, type, onDone) {
    if (DL) {
      DL.save({ filename: name, data: txt }).then(() => { toast('File saved'); onDone && onDone(); }).catch(e => {
        if (e && e.code === 'declined') return;
        toast(e && e.code === 'rate_limited' ? 'A save prompt is already open' : 'Download unavailable here. Use copy instead.');
      });
      return;
    }
    try {
      const b = new Blob([txt], { type }); const a = document.createElement('a');
      a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      toast('Download started'); onDone && onDone();
    } catch (e) { toast('Download blocked here. Use copy instead.'); }
  }
  function exportModal(u) {
    const md = buildMd(u);
    modal(`<h3>Export my work · Unit ${u}</h3><p>Your answers, writing, Thinking Lab responses and LEARNING vocabulary as Markdown. Copy it into a message, or download it as a .md file.</p>
      <textarea class="ta" readonly id="mdout">${esc(md)}</textarea>
      <div class="acts"><button class="btn line" data-act="close">close</button><button class="btn line" data-act="dlmd" data-u="${u}">download .md</button><button class="btn dark" data-act="copymd">copy markdown →</button></div>`);
  }
  function writingText(u) {
    if (/^r[12]$/.test(u)) {
      const r = REVIEWS[u.slice(1)];
      return [r.synthesis, r.timed].filter(Boolean).map(it => { const t = S.a[`${u}:${it.id}`]; return t ? `${it.kind}: ${it.title} (${words(t)} words)\n\n${t}` : ''; }).filter(Boolean).join('\n\n———\n\n');
    }
    const d = UNITS[u], all = collect(d).filter(x => x.it.type === 'writing');
    return all.map(x => { const t = S.a[u + ':' + x.it.id]; return t ? `${x.it.kind}: ${x.it.title} (${words(t)} words)\n\n${t}` : ''; }).filter(Boolean).join('\n\n———\n\n');
  }
  function resetModal(u) {
    modal(`<h3>Reset Unit ${u}?</h3><p>This deletes your answers, writing, checklists and progress for this unit. Your glossary marks, error log and bookmarks stay. It can't be undone, so export first if you want a copy.</p>
      <div class="acts"><button class="btn line" data-act="close">cancel</button><button class="btn line" data-act="export" data-u="${u}">export first</button><button class="btn dark" data-act="doreset" data-u="${u}">reset unit →</button></div>`);
  }

  /* ── AI (backend only; called only on explicit clicks) ── */
  let AI_OK = null; // null = unknown (signed out), true/false once the server answers
  async function aiFetch(path, body) {
    try {
      const res = await fetch(path, { method: body ? 'POST' : 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: body ? JSON.stringify(body) : undefined });
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    } catch (e) { return { ok: false, status: 0, data: {} }; }
  }
  async function checkAi() {
    const r = await aiFetch('/api/ai/status');
    AI_OK = r.ok ? !!r.data.available : null;
    $$('[data-act="aifb"]').forEach(b => { b.disabled = AI_OK === false; b.title = AI_OK === false ? 'AI feedback is not configured on the server' : ''; });
    return AI_OK;
  }
  // The server no longer accepts the session: back to the auth gate (local work is kept)
  function needSignIn() {
    if (window.KLANG_AUTH) window.KLANG_AUTH.sessionExpired();
    else toast('Please sign in again');
  }
  const aiError = r => r.status === 0 ? 'No connection. Your text is saved; try again when you are online.' : (r.data && r.data.message) || 'The AI request failed. Your text is saved.';

  let ACTIVE_REC = null;
  const speakingAttempt = id => (S.sp || []).find(x => x.id === id);
  async function startSpeaking(u, sid) {
    const box = $('.recorder'), status = box && $('[data-rec-status]', box);
    if (!window.KLANG_MEDIA || !window.KLANG_MEDIA.supported()) { if (status) status.textContent = 'Recording is not supported in this browser.'; return; }
    if (ACTIVE_REC) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = window.KLANG_MEDIA.preferredMime(), chunks = [], started = Date.now();
      const recorder = mime ? new MediaRecorder(stream, { type: mime }) : new MediaRecorder(stream);
      recorder.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
      recorder.onstop = async () => {
        clearInterval(ACTIVE_REC && ACTIVE_REC.timer); stream.getTracks().forEach(x => x.stop());
        const duration = Math.max(1, Math.round((Date.now() - started) / 1000));
        const id = `sp_${Date.now()}_${uid()}`, blob = new Blob(chunks, { type: recorder.mimeType || mime || 'audio/webm' });
        const attempt = attemptsFor(u, sid).length + 1;
        await window.KLANG_MEDIA.put(id, blob);
        S.sp.push({ id, unit: u, activityId: sid, attempt, date: new Date().toISOString(), duration, mime: blob.type, transcript: '', correctedTranscript: '', feedback: null, selfCheck: '', audioStorage: 'indexeddb-local' });
        save('speaking'); ACTIVE_REC = null; rerenderOwner(u, 'think'); toast(`Attempt ${attempt} saved on this device`);
      };
      recorder.start(250); ACTIVE_REC = { recorder, started, timer: setInterval(() => { const el = $('[data-rec-timer]'); if (el) { const s = Math.floor((Date.now() - started) / 1000); el.textContent = `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`; } }, 250) };
      if (status) status.textContent = 'Recording…'; $$('[data-act="spstop"]').forEach(b => b.disabled = false); $$('[data-act="sprecord"]').forEach(b => b.disabled = true);
    } catch (e) { if (status) status.textContent = e && e.name === 'NotAllowedError' ? 'Microphone permission was denied. Change browser permission, then press record again.' : 'The microphone could not be started.'; }
  }
  function stopSpeaking() { if (ACTIVE_REC && ACTIVE_REC.recorder.state !== 'inactive') ACTIVE_REC.recorder.stop(); }
  async function playSpeaking(id) {
    const blob = await window.KLANG_MEDIA.get(id).catch(() => null), p = $('[data-sp-player]');
    if (!blob || !p) { toast('This recording exists only on the device where it was made'); return; }
    if (p.src && p.src.startsWith('blob:')) URL.revokeObjectURL(p.src); p.src = URL.createObjectURL(blob); p.hidden = false; await p.play().catch(() => {});
  }
  async function transcribeSpeaking(id, btn) {
    const a = speakingAttempt(id), blob = await window.KLANG_MEDIA.get(id).catch(() => null); if (!a || !blob) { toast('Local recording not found'); return; }
    const old = btn.textContent; btn.disabled = true; btn.textContent = 'transcribing…';
    try {
      const r = await fetch('/api/ai/transcribe', { method:'POST', credentials:'include', headers:{'Content-Type':blob.type || 'audio/webm','X-Unit':a.unit,'X-Activity':a.activityId,'X-Filename':`attempt-${a.attempt}.${(blob.type || '').includes('mp4') ? 'm4a' : 'webm'}`}, body:blob });
      const data = await r.json().catch(() => ({}));
      if (r.status === 401) { needSignIn(); return; } if (!r.ok) { toast(data.message || 'Transcription failed. The recording is still stored locally.'); return; }
      a.transcript = data.transcript || ''; a.transcriptionUncertain = data.uncertain || []; save('speaking'); rerenderOwner(a.unit, 'think'); toast('Transcript saved');
    } catch (e) { toast('Transcription failed. The recording is still stored locally.'); } finally { btn.disabled = false; btn.textContent = old; }
  }
  async function feedbackSpeaking(id, btn) {
    const a = speakingAttempt(id); if (!a || !a.transcript) return;
    const old = btn.textContent; btn.disabled = true; btn.textContent = 'analysing transcript…';
    const r = await aiFetch('/api/ai/speaking-feedback', { unit:a.unit, activityId:a.activityId, transcript:a.transcript });
    btn.disabled = false; btn.textContent = old; if (r.status === 401) { needSignIn(); return; } if (!r.ok) { toast(aiError(r)); return; }
    a.feedback = r.data.feedback; a.feedbackMode = 'transcript_only'; a.correctedTranscript = r.data.feedback.correctedTranscript || ''; save('speaking'); rerenderOwner(a.unit,'think'); toast('Speaking feedback saved');
  }
  async function feedbackListening(u, lid, qid, btn) {
    const k = listeningKey(u,lid,qid), answer = String(S.a[k] || '').trim(); if (!answer) { toast('Answer the question first'); return; }
    const old=btn.textContent; btn.disabled=true; btn.textContent='checking meaning…'; const r=await aiFetch('/api/ai/listening-feedback',{unit:u,activityId:lid,questionId:qid,answer}); btn.disabled=false;btn.textContent=old;
    if (r.status===401) { needSignIn(); return; } if(!r.ok){toast(aiError(r));return;} S.a[`${k}:feedback`]=r.data.feedback; save(k); rerenderOwner(u,'interpret');
  }

  async function requestLightFeedback(k, u, stage, taskId, btn) {
    const text = String(S.a[k] || '').trim();
    if (!text) { toast('Write your answer first'); return; }
    if (window.KLANG_SYNC && !window.KLANG_SYNC.getUser()) { needSignIn(); return; }
    saveNow(k);
    const old = btn.textContent; btn.disabled = true; btn.textContent = 'checking your english…';
    const r = await aiFetch('/api/ai/light-feedback', { unit: u, stage: stage || 'general', taskId: taskId || 'task', text });
    btn.disabled = false; btn.textContent = old;
    if (r.status === 401) { needSignIn(); return; }
    if (!r.ok) { toast(aiError(r)); return; }
    S.a[`${k}:lightfb`] = { at: r.data.createdAt || new Date().toISOString(), f: r.data.feedback };
    save(k);
    const box = $(`[data-lightfb="${CSS.escape(k)}"]`);
    if (box) box.innerHTML = renderSavedLightFeedback(k);
    toast('Language feedback received');
  }

  async function requestInterpretFeedback(k, u, itemId, btn) {
    const text = String(S.a[k] || '').trim();
    if (!text) { toast('Write your interpretation first'); return; }
    if (window.KLANG_SYNC && !window.KLANG_SYNC.getUser()) { needSignIn(); return; }
    saveNow(k);
    const old = btn.textContent; btn.disabled = true; btn.textContent = 'checking interpretation…';
    const r = await aiFetch('/api/ai/interpret-feedback', { unit: u, itemId, text });
    btn.disabled = false; btn.textContent = old;
    if (r.status === 401) { needSignIn(); return; }
    if (!r.ok) { toast(aiError(r)); return; }
    S.a[`${k}:intfb`] = { at: r.data.createdAt || new Date().toISOString(), f: r.data.feedback };
    save(k);
    const box = $(`[data-lightfb="${CSS.escape(k)}"]`);
    if (box) box.innerHTML = renderSavedLightFeedback(k);
    toast('Interpretation & language feedback received');
  }

  async function requestExplainQuestion(k, u, stage, taskId, btn) {
    const it = REG[k];
    const qText = it ? (it.q || it.prompt || it.title || '') : '';
    if (!qText) { toast('Question text not found'); return; }
    if (window.KLANG_SYNC && !window.KLANG_SYNC.getUser()) { needSignIn(); return; }
    const old = btn.textContent; btn.disabled = true; btn.textContent = 'explaining question…';
    const r = await aiFetch('/api/ai/explain-question', { unit: u, stage: stage || 'general', taskId: taskId || 'task', questionText: qText });
    btn.disabled = false; btn.textContent = old;
    if (r.status === 401) { needSignIn(); return; }
    if (!r.ok) { toast(aiError(r)); return; }
    S.a[`${k}:explainq`] = { at: r.data.createdAt || new Date().toISOString(), f: r.data.explanation };
    save(k);
    const box = $(`[data-explainq="${CSS.escape(k)}"]`);
    if (box) box.innerHTML = renderSavedExplainQuestion(k);
    toast('Question breakdown ready');
  }

  /* ── writing feedback ─────────────────────── */
  const baseTaskKey = k => { const it = REG[k]; const u = k.split(':')[0]; return it && it.revisionOf ? `${u}:${it.revisionOf}` : k; };
  const feedbackFor = k => { const pk = baseTaskKey(k), draft = REG[k] && REG[k].revisionOf ? 'revised' : 'first'; return ((S.pf[pk] || {}).fb || []).filter(f => f.draft === draft); };
  function aiFeedbackBtn(k) {
    if (isDemo()) {
      return `<button class="btn line sm" data-act="aifb" data-q="${k}" disabled title="AI feedback is disabled in Demo Mode.">AI feedback disabled</button>`;
    }
    return `<button class="btn line sm" data-act="aifb" data-q="${k}" ${AI_OK === false ? 'disabled title="AI feedback is not configured on the server"' : ''}>get feedback</button>`;
  }
  function savedFeedbackHtml(k) {
    const list = feedbackFor(k); if (!list.length) return '';
    const pk = baseTaskKey(k);
    return `<div class="fbsaved"><span class="tago">Saved feedback</span>${list.slice().reverse().map(f => `<button class="btn ghost sm" data-act="fbopen" data-pk="${pk}" data-id="${esc(f.id)}">${esc(f.at.slice(0, 16).replace('T', ' '))} · ${esc(f.f.estimatedLevel.level)} · ${f.words} words</button>`).join('')}</div>`;
  }
  async function requestFeedback(k, btn) {
    const it = REG[k]; const text = (S.a[k] || '').trim();
    if (!text) { toast('Write something first'); return; }
    if (window.KLANG_SYNC && !window.KLANG_SYNC.getUser()) { needSignIn(); return; }
    // The draft is already in localStorage (saved on every keystroke); make sure of it before a slow call
    saveNow(k);
    const [u, taskId] = k.split(':');
    const label = btn.textContent; btn.disabled = true; btn.textContent = 'reading your text…';
    const outline = String(S.a[`${baseTaskKey(k)}:outline`] || '').trim();
    const r = await aiFetch('/api/ai/feedback', Object.assign({ unit: u, taskId, text }, outline ? { outline } : {}));
    btn.disabled = false; btn.textContent = label;
    if (r.status === 401) { needSignIn(); return; }
    if (r.status === 503) { AI_OK = false; btn.disabled = true; toast('AI feedback is not available on this server'); return; }
    if (!r.ok) { toast(aiError(r)); return; }
    const pk = baseTaskKey(k);
    const entry = { id: uid() + uid(), at: r.data.createdAt || new Date().toISOString(), draft: it.revisionOf ? 'revised' : 'first', words: r.data.words, f: r.data.feedback };
    S.pf[pk] = S.pf[pk] || {};
    S.pf[pk].fb = (S.pf[pk].fb || []).concat(entry).slice(-20);
    save('portfolio');
    const box = $(`[data-aifb="${CSS.escape(k)}"]`); if (box) box.innerHTML = savedFeedbackHtml(k);
    openFeedbackModal(pk, entry.id);
    toast('Feedback saved to your Writing Portfolio');
  }
  function deleteFeedback(pk, id, t) {
    if (t.dataset.armed !== '1') { t.dataset.armed = '1'; t.textContent = 'confirm remove'; return; }
    const p = S.pf[pk]; if (!p || !p.fb) return;
    p.fb = p.fb.filter(f => f.id !== id); save('portfolio'); closeModal();
    $$('[data-aifb]').forEach(b => { b.innerHTML = savedFeedbackHtml(b.dataset.aifb); });
    if (location.hash === '#portfolio') renderPortfolio();
    toast('Feedback removed');
  }
  // Keys are stable so older saved feedback still renders; clarity, organisation and lexicalPrecision
  // exist only in newer reports and are skipped when absent.
  async function requestOutlineFeedback(k, btn) {
    const outline = String(S.a[`${k}:outline`] || '').trim();
    if (!outline) { toast('Write a few outline lines first'); return; }
    if (window.KLANG_SYNC && !window.KLANG_SYNC.getUser()) { needSignIn(); return; }
    saveNow(`${k}:outline`);
    const [u, taskId] = k.split(':');
    const old = btn.textContent; btn.disabled = true; btn.textContent = 'reading your outline…';
    const r = await aiFetch('/api/ai/outline-feedback', { unit: u, taskId, outline });
    btn.disabled = false; btn.textContent = old;
    if (r.status === 401) { needSignIn(); return; }
    if (!r.ok) { toast(aiError(r)); return; }
    S.a[`${k}:outline:fb`] = { at: r.data.createdAt || new Date().toISOString(), f: r.data.feedback };
    save(`${k}:outline:fb`);
    const box = $(`[data-outfb="${CSS.escape(k)}"]`); if (box) box.innerHTML = outlineFeedbackHtml(S.a[`${k}:outline:fb`]);
  }
  const FB_SECTIONS = [['taskAchievement', 'Task fulfilment'], ['clarity', 'Clarity'], ['argumentationReasoning', 'Argument & development'], ['organisation', 'Organisation'], ['cohesion', 'Cohesion'], ['grammarAccuracy', 'Grammatical control'], ['vocabularyCollocations', 'Lexical range & collocation'], ['lexicalPrecision', 'Lexical precision'], ['register', 'Register'], ['naturalness', 'Naturalness']];
  const SOL_SECTIONS = [['taskAchievement', 'Task Achievement'], ['argumentDevelopment', 'Argument Development'], ['organisationCoherence', 'Organisation & Coherence'], ['clarity', 'Clarity'], ['grammaticalAccuracyRange', 'Grammatical Accuracy & Range'], ['lexicalPrecisionRange', 'Lexical Precision & Range'], ['registerTone', 'Register & Tone'], ['hedgingStance', 'Hedging & Stance'], ['cohesionPragmatics', 'Cohesion & Pragmatics'], ['unnecessaryRepetition', 'Unnecessary Repetition']];
  const reviewTask = (u, tid) => { const r = /^r[1-7]$/.test(u) && REVIEWS[u.slice(1)]; return r ? [r.synthesis, r.timed].find(x => x && x.id === tid) : null; };
  function openFeedbackModal(pk, id) {
    const e = ((S.pf[pk] || {}).fb || []).find(f => f.id === id); if (!e) return;
    const f = e.f, n = { i: 2 };
    const li = arr => (arr || []).length ? `<ul>${arr.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
    const head = t => `<h4 class="fbh"><span>${String(n.i++).padStart(2, '0')}</span>${t}</h4>`;
    const [u, tid] = pk.split(':');
    const task = (UNITS[u] && UNITS[u].write.items.find(x => x.id === tid)) || reviewTask(u, tid) || {};
    const sourceLabel = /^r[12]$/.test(u) ? `Module ${u.slice(1)} Review` : `Unit ${u}`;
    const isSol = !!f.observations || !!f.argumentDevelopment || !!f.strengthsSummary;
    const sections = isSol ? SOL_SECTIONS : FB_SECTIONS;
    modal(`<div class="fbx">
      <div class="wk"><span class="tagp">AI feedback</span><span class="tago">${sourceLabel} · ${esc(task.title || '')}</span><span class="tago">${e.draft === 'revised' ? 'Revised draft' : 'First draft'} · ${e.words} words · ${esc(e.at.slice(0, 10))}</span></div>
      ${f.estimatedLevel ? `<h4 class="fbh"><span>01</span>Estimated level of this writing</h4><p class="lvl"><b>${esc(f.estimatedLevel.level)}</b> ${esc(f.estimatedLevel.rationale)}</p>` : ''}
      ${(f.strengthsSummary || []).length ? `${head('Genuine Strengths')}${li(f.strengthsSummary)}` : ''}
      ${sections.filter(([key]) => f[key]).map(([key, title]) => { const x = f[key]; return `${head(title)}<p>${esc(x.summary || x)}</p>${(x.strengths || []).length ? `<div class="fbl good"><b>Working</b>${li(x.strengths)}</div>` : ''}${(x.improvements || []).length ? `<div class="fbl"><b>To improve</b>${li(x.improvements)}</div>` : ''}`; }).join('')}
      ${(f.observations || []).length ? `${head('Specific Classified Observations')}${f.observations.map(o => `<div class="fbl"><b>[${esc(o.type)}] “${esc(o.quote)}”</b><p>${esc(o.explanation)}</p><p class="muted">Effect: ${esc(o.effect)} · Strategy: ${esc(o.revisionStrategy)}${o.microExample ? ' · Example: ' + esc(o.microExample) : ''}</p></div>`).join('')}` : ''}
      ${f.recurringErrors ? `${head('Recurring errors')}${(f.recurringErrors || []).length ? f.recurringErrors.map(r => `<div class="fbl"><b>${esc(r.pattern)}</b>${li(r.examples)}<p>${esc(r.explanation)}</p></div>`).join('') : '<p class="muted">None identified.</p>'}` : ''}
      ${f.isolatedErrors ? `${head('Isolated errors')}${(f.isolatedErrors || []).length ? `<ul>${f.isolatedErrors.map(x => `<li><s>${esc(x.original)}</s> → <ins>${esc(x.correction)}</ins> <em>${esc(x.note)}</em></li>`).join('')}</ul>` : '<p class="muted">None identified.</p>'}` : ''}
      ${f.corrections ? `${head('Corrections with explanations')}${(f.corrections || []).map(c => `<div class="fbc"><s>${esc(c.original)}</s><ins>${esc(c.corrected)}</ins><em>${esc(c.explanation)}</em></div>`).join('') || '<p class="muted">None.</p>'}` : ''}
      ${head('Suggested Error Log entries')}${(f.suggestedErrorLog || []).map((x, i) => `<div class="fbc"><s>${esc(x.mine)}</s><ins>${esc(x.corr)}</ins><em>${esc(x.why)}${x.ex ? ' · ' + esc(x.ex) : ''}</em><button class="btn line sm" data-act="fb2err" data-pk="${pk}" data-id="${esc(id)}" data-i="${i}">add to Error Log</button></div>`).join('') || '<p class="muted">None.</p>'}
      ${head('Priorities for the next draft')}<ol>${(f.nextDraftPriorities || []).map(x => `<li>${esc(x)}</li>`).join('')}</ol>
      <div class="fb-export-acts" style="display:flex;gap:8px;margin:14px 0 6px;flex-wrap:wrap">
        <a class="btn line sm" href="/api/ai/feedback/${esc(u)}/${esc(tid)}/${esc(id)}/export?format=pdf" download>export PDF →</a>
        <a class="btn line sm" href="/api/ai/feedback/${esc(u)}/${esc(tid)}/${esc(id)}/export?format=md" download>export Markdown →</a>
      </div>
      <p class="muted" style="font-size:13px;margin-top:14px">Your drafts are never changed by feedback. This feedback is saved in your Writing Portfolio.</p>
      <div class="acts"><button class="btn ghost sm" data-act="fbdel" data-pk="${pk}" data-id="${esc(id)}">remove this feedback</button><button class="btn dark" data-act="close">close</button></div></div>`);
  }
  function suggestion(t, kind) {
    const e = ((S.pf[t.dataset.pk] || {}).fb || []).find(f => f.id === t.dataset.id);
    return e && e.f[kind] && e.f[kind][+t.dataset.i];
  }
  function markAdded(t) { t.disabled = true; t.textContent = 'added ✓'; }
  function addSuggestionToErrorLog(t) {
    const x = suggestion(t, 'suggestedErrorLog'); if (!x) return;
    if (S.errs.some(r => r.mine === x.mine && r.corr === x.corr)) { markAdded(t); toast('Already in your Error Log'); return; }
    const source = t.dataset.pk.split(':')[0];
    S.errs.push({ id: uid(), mine: x.mine, corr: x.corr, why: x.why, ex: x.ex, u: /^\d\d$/.test(source) ? source : '', n: 0, last: '' }); save('error-log');
    markAdded(t); renderSide(location.hash.slice(1)); toast('Added to your Error Log');
  }

  /* ── select text → glossary / explain ─────── */
  let SELCTX = null, EXCTX = null, selTimer = null, selPressed = false;
  const normTerm = s => String(s || '').toLowerCase().replace(/[“”"‘’'.,;:!?()]/g, '').replace(/\s+/g, ' ').trim();
  function closeSelPop() { const p = $('#selpop'); if (p) p.remove(); }
  function sentenceAround(text, sel) {
    const t = String(text || '').replace(/\s+/g, ' ').trim();
    const parts = t.split(/(?<=[.!?…])\s+(?=[A-Z“"‘(])/);
    const hit = parts.find(p => p.toLowerCase().includes(sel.toLowerCase())) || '';
    return hit.slice(0, 600);
  }
  const REG_MIN_WORDS = 3, REG_MAX_CHARS = 240;
  // While a timed challenge runs, no AI help is offered from the page
  const timedRunning = () => !!document.querySelector('[data-tc-timer]');
  function currentSelection() {
    if (!S.last || !has(S.last.u)) return null;
    const unit = S.last.u, sec = S.last.s || 'read', ai = !timedRunning();
    // Own writing: only "compare registers", and only the selected words ever leave the page
    const a = document.activeElement;
    if (a && a.tagName === 'TEXTAREA' && a.closest && a.closest('#stage') && !a.readOnly && a.selectionEnd > a.selectionStart) {
      const text = a.value.slice(a.selectionStart, a.selectionEnd).replace(/\s+/g, ' ').trim();
      if (!ai || text.split(' ').length < REG_MIN_WORDS || text.length > REG_MAX_CHARS || !/[A-Za-z]/.test(text)) return null;
      const r = a.getBoundingClientRect();
      return { term: text, text, source: 'mine', canGloss: false, canReg: true, u: unit, sec, ctx: '', rect: { left: r.left, width: r.width, top: Math.max(r.top, 8), bottom: Math.min(r.bottom, innerHeight - 70) } };
    }
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return null;
    const text = sel.toString().replace(/\s+/g, ' ').trim().replace(/^[“"‘(]+|[”"’)]+$/g, '');
    const term = text.replace(/[”"’).,;:!?]+$/g, '');
    if (!term || !/[A-Za-z]/.test(term)) return null;
    const n = term.split(' ').length;
    const canGloss = term.length <= 80 && n <= 8, canReg = ai && n >= REG_MIN_WORDS && text.length <= REG_MAX_CHARS;
    if (!canGloss && !canReg) return null;
    const range = sel.getRangeAt(0);
    const node = range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
    if (!node || !node.closest('#stage') || node.closest('textarea, input, select, button, .stepper, .qact, .stage-foot')) return null;
    const block = node.closest('p, li, dd, dt, blockquote, td, h3, h4, .qt') || node;
    return { term, text, source: 'book', canGloss, canReg, ai, u: unit, sec, ctx: sentenceAround(block.textContent, term), rect: range.getBoundingClientRect() };
  }
  function showSelPop() {
    const info = currentSelection();
    if (!info) { if (!selPressed) closeSelPop(); return; }
    SELCTX = info; closeSelPop();
    const p = document.createElement('div'); p.className = 'selpop'; p.id = 'selpop'; p.setAttribute('role', 'toolbar'); p.setAttribute('aria-label', 'Selected text');
    const off = AI_OK === false ? 'disabled title="AI is not configured on the server"' : '';
    p.innerHTML = (info.canGloss ? `<button type="button" data-act="selgl">Add to Glossary</button>${info.ai ? `<button type="button" data-act="selex" ${off}>Explain</button>` : ''}` : '')
      + (info.canReg ? `<button type="button" data-act="selrg" ${off}>compare registers</button>` : '');
    // Keep the selection alive while the popover is pressed (desktop and touch)
    p.addEventListener('pointerdown', e => { selPressed = true; e.preventDefault(); });
    p.addEventListener('pointerup', () => setTimeout(() => { selPressed = false; }, 400));
    document.body.appendChild(p);
    const r = info.rect, w = p.offsetWidth, h = p.offsetHeight;
    // Below the selection so it does not cover the native iOS/Android selection menu
    let top = r.bottom + 10; if (top + h > innerHeight - 8) top = Math.max(8, r.top - h - 10);
    const left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, innerWidth - w - 8));
    p.style.top = top + 'px'; p.style.left = left + 'px';
  }
  document.addEventListener('selectionchange', () => { clearTimeout(selTimer); selTimer = setTimeout(showSelPop, 280); });
  // Selections inside a textarea do not always reach document "selectionchange"
  ['select', 'mouseup', 'keyup', 'touchend'].forEach(ev => document.addEventListener(ev, e => {
    if (e.target && e.target.tagName === 'TEXTAREA') { clearTimeout(selTimer); selTimer = setTimeout(showSelPop, 280); }
  }, true));
  window.addEventListener('scroll', () => { if (!selPressed) closeSelPop(); }, { passive: true });

  function builtInMatch(u, term) {
    const d = UNITS[u]; if (!d || !d.steal) return null;
    const n = normTerm(term);
    const v = d.steal.vocab.find(x => strip(x.w).split('/').map(normTerm).includes(n) || normTerm(x.key.replace(/-/g, ' ')) === n);
    if (v) return { flash: `v-${u}-${v.key}`, h: `u${u}-steal`, label: strip(v.w) };
    const c = d.steal.chunks.find(x => normTerm(strip(x.c)) === n);
    if (c) return { flash: `c-${u}-${c.key}`, h: `u${u}-steal`, label: strip(c.c) };
    return null;
  }
  function glossaryModal(pre, editId) {
    pre = pre || {};
    const dup = !editId && (S.glx || []).find(g => normTerm(g.term) === normTerm(pre.term));
    if (dup) {
      modal(`<h3>Already in your glossary</h3><p><b>${esc(dup.term)}</b> was added from Unit ${esc(dup.u)}${dup.d ? ' on ' + esc(dup.d) : ''}.</p>
        <div class="acts"><button class="btn line" data-act="close">close</button><button class="btn dark" data-act="gxedit" data-id="${esc(dup.id)}">edit that entry →</button></div>`);
      return;
    }
    const builtIn = !editId && builtInMatch(pre.u, pre.term);
    if (builtIn) {
      modal(`<h3>Already in this unit's vocabulary</h3><p><b>${esc(builtIn.label)}</b> has its own card in STEAL, with a NEW / LEARNING / KNOW mark that feeds My Glossary.</p>
        <div class="acts"><button class="btn line" data-act="close">close</button><button class="btn dark" data-flashgo="${builtIn.flash}" data-h="${builtIn.h}">open the card →</button></div>`);
      return;
    }
    const st = editId ? (S.gl[pre.u + ':x:' + editId] || '') : 'new';
    const secName = (STAGES.find(s => s[0] === pre.sec) || [0, pre.sec || ''])[1];
    modal(`<h3>${editId ? 'Edit glossary entry' : 'Add to My Glossary'}</h3><p>From Unit ${esc(pre.u)}${secName ? ' · ' + esc(secName) : ''}. Only the expression is required; complete the rest now or later.</p>
      <form id="gxform" class="form gxform" data-id="${esc(editId || '')}" data-u="${esc(pre.u)}" data-sec="${esc(pre.sec || '')}">
        <label class="span2">Word / expression<input class="ti" name="term" required maxlength="80" value="${esc(pre.term || '')}"></label>
        <label>Status<select name="st">${['new', 'learning', 'know'].map(s => `<option value="${s}" ${st === s ? 'selected' : ''}>${s.toUpperCase()}</option>`).join('')}</select></label>
        <label>Source<input class="ti" value="Unit ${esc(pre.u)}${secName ? ' · ' + esc(secName) : ''}" disabled></label>
        <label class="full">Sentence / context<textarea class="ti" name="ctx" rows="2">${esc(pre.ctx || '')}</textarea></label>
        <label class="full">Meaning<textarea class="ti" name="meaning" rows="2">${esc(pre.meaning || '')}</textarea></label>
        <label class="full">My definition<textarea class="ti" name="mydef" rows="2" placeholder="In your own words">${esc(pre.mydef || '')}</textarea></label>
        <label class="full">My example<textarea class="ti" name="ex" rows="2" placeholder="A sentence of your own">${esc(pre.ex || '')}</textarea></label>
        <label class="full">Notes<textarea class="ti" name="notes" rows="2">${esc(pre.notes || '')}</textarea></label>
        <div class="full acts" style="margin-top:4px"><button type="button" class="btn line" data-act="close">cancel</button><button type="submit" class="btn dark">${editId ? 'save changes →' : 'add to glossary →'}</button></div>
      </form>`);
  }
  function saveGlossaryForm(f) {
    const v = n => (f.elements[n] ? f.elements[n].value : '').trim();
    const term = v('term'); if (!term) return;
    const editId = f.dataset.id, u = f.dataset.u;
    if (!editId && (S.glx || []).some(g => normTerm(g.term) === normTerm(term))) { toast('Already in your glossary'); return; }
    S.glx = S.glx || [];
    const fields = { term, ctx: v('ctx'), meaning: v('meaning'), mydef: v('mydef'), ex: v('ex'), notes: v('notes') };
    let id = editId;
    if (editId) { const g = S.glx.find(x => x.id === editId); if (g) Object.assign(g, fields); }
    else { id = uid() + uid(); S.glx.push(Object.assign({ id, u, sec: f.dataset.sec, d: today() }, fields)); }
    S.gl[u + ':x:' + id] = v('st') || 'new';
    save('glossary'); closeModal(); window.getSelection && window.getSelection().removeAllRanges();
    if (location.hash === '#glossary') renderGlossary();
    renderSide(location.hash.slice(1));
    toast(editId ? 'Glossary entry updated' : 'Added to My Glossary');
  }
  async function explainModal(sel) {
    if (!sel) return;
    if (window.KLANG_SYNC && !window.KLANG_SYNC.getUser()) { needSignIn(); return; }
    modal(`<h3>${esc(sel.term)}</h3><p class="muted">Explaining in context…</p>`);
    const r = await aiFetch('/api/ai/explain', { unit: sel.u, section: sel.sec, selection: sel.term, context: sel.ctx });
    if (r.status === 401) { closeModal(); needSignIn(); return; }
    if (r.status === 503) AI_OK = false;
    if (!r.ok) { EXCTX = { sel, meaning: '' }; modal(`<h3>${esc(sel.term)}</h3><p>${esc(aiError(r))}</p><div class="acts"><button class="btn line" data-act="close">close</button><button class="btn dark" data-act="exgl">add to glossary anyway →</button></div>`); return; }
    const x = r.data.explanation;
    EXCTX = { sel, meaning: [x.definition, x.meaningInContext ? `In this text: ${x.meaningInContext}` : ''].filter(Boolean).join('\n') };
    modal(`<div class="fbx"><div class="wk"><span class="tagp">Explain</span><span class="tago">${esc(x.partOfSpeech)}</span>${x.ipa ? `<span class="tago">${esc(x.ipa)}</span>` : ''}</div>
      <h3>${esc(x.expression || sel.term)}</h3>
      <p><b>Definition.</b> ${esc(x.definition)}</p>
      <p><b>In this text.</b> ${esc(x.meaningInContext)}</p>
      ${sel.ctx ? `<p class="muted"><i>${esc(sel.ctx)}</i></p>` : ''}
      ${(x.collocations || []).length ? `<p><b>Collocations.</b> ${x.collocations.map(esc).join(' · ')}</p>` : ''}
      <p><b>Another example.</b> <i>${esc(x.example)}</i></p>
      ${x.portuguese ? `<details class="acc help"><summary>Em português</summary><div class="accb">${esc(x.portuguese)}</div></details>` : ''}
      <p class="muted" style="font-size:13px;margin-top:14px">Nothing is saved unless you add it.</p>
      <div class="acts"><button class="btn line" data-act="close">close</button><button class="btn dark" data-act="exgl">add to glossary →</button></div></div>`);
  }

  /* ── compare registers (explicit click only; one call per selection, kept for this session) ── */
  const RGCACHE = new Map();
  const RG_KEYS = ['casual', 'neutral', 'professional', 'formal', 'academic'];
  const rgLabel = k => ((window.KLANG_REGISTER && window.KLANG_REGISTER.REGISTERS.find(r => r.id === k)) || { label: k }).label;
  const rgSent = sel => `Sent to the AI provider: only the selected text${sel.source === 'book' && sel.ctx ? ' and the sentence it comes from' : ''}.`;
  async function registerModal(sel) {
    if (!sel) return;
    if (window.KLANG_SYNC && !window.KLANG_SYNC.getUser()) { needSignIn(); return; }
    const head = `<div class="wk"><span class="tagp">Register &amp; tone</span></div><div class="rg-k">Original</div><p class="rg-orig">“${esc(sel.text)}”</p>`;
    modal(`<div class="fbx rgx">${head}<p class="muted">Comparing registers… ${esc(rgSent(sel))}</p></div>`);
    const body = { unit: sel.u, section: sel.sec, source: sel.source, selection: sel.text, context: sel.source === 'book' ? sel.ctx : '' };
    const key = JSON.stringify(body);
    let r = RGCACHE.get(key);
    if (!r) { r = await aiFetch('/api/ai/register-compare', body); if (r.ok) RGCACHE.set(key, r); }
    if (r.status === 401) { closeModal(); needSignIn(); return; }
    if (r.status === 503) AI_OK = false;
    if (!r.ok || !r.data || !r.data.comparison) {
      modal(`<div class="fbx rgx">${head}<p>${esc(aiError(r))}</p><p class="muted rg-foot">Nothing was saved or changed.</p><div class="acts"><button class="btn line" data-act="close">close</button></div></div>`);
      return;
    }
    modal(registerHtml(r.data.comparison, sel, head));
    // Start at the top: focus "close" rather than the first "save" button, without scrolling
    const c = $('#modal [data-act="close"]'); if (c) c.focus({ preventScroll: true });
  }
  function registerHtml(x, sel, head) {
    const norm = t => String(t || '').toLowerCase().replace(/[^a-z0-9']+/g, ' ').trim();
    if (!x.canCompare) return `<div class="fbx rgx">${head}<p>${esc(x.note || 'This selection needs more context to keep its meaning. Try selecting the whole sentence.')}</p>
      <p class="muted rg-foot">${esc(rgSent(sel))}</p><div class="acts"><button class="btn line" data-act="close">close</button></div></div>`;
    const rows = RG_KEYS.map((k, i) => {
      const v = (x.registers || {})[k] || {}, same = RG_KEYS.slice(0, i).find(j => norm(((x.registers || {})[j] || {}).example) === norm(v.example));
      return `<div class="rg-row"><dt>${esc(rgLabel(k))}</dt><dd><p class="rg-ex">${esc(v.example)}</p><p class="rg-for">${same ? `same as ${esc(rgLabel(same).toLowerCase())} · ` : ''}${esc(v.bestFor)}</p></dd></div>`;
    }).join('');
    const changes = (x.changes || []).filter(c => c && c.explanation);
    return `<div class="fbx rgx">${head}${x.meaning ? `<p class="rg-mean">${esc(x.meaning)}</p>` : ''}
      <dl class="rg-list">${rows}</dl>
      ${changes.length ? `<div class="rg-k">What changed?</div><ul class="rg-ch">${changes.map(c => `<li><b>${esc(c.feature)}.</b> ${esc(c.explanation)}</li>`).join('')}</ul>` : ''}
      ${x.interchangeabilityNote ? `<div class="rg-k">These aren't interchangeable</div><p>${esc(x.interchangeabilityNote)}</p>` : ''}
      <p class="muted rg-foot">Five contexts, not five levels: none of these is “better English”. ${esc(rgSent(sel))} Nothing is saved.</p>
      <div class="acts"><button class="btn line" data-act="close">close</button></div></div>`;
  }

  /* ── glossary → retrieval ─────────────────── */
  // Returns up to n NEW/LEARNING items (unit vocabulary, chunks and your own entries), shuffled.
  function retrievalPool(n, u) {
    const pool = glossaryEntries().filter(e => ['new', 'learning'].includes(glStatus(e.u, e.key)))
      .map(e => ({ u: e.u, key: e.key, text: strip(e.title), st: glStatus(e.u, e.key), w: (e.u === u ? 2 : 1) + (glStatus(e.u, e.key) === 'learning' ? 1 : 0) }));
    // Weighted shuffle: LEARNING and this unit's words come up more often
    pool.forEach(p => { p.r = Math.random() * p.w; });
    return pool.sort((a, b) => b.r - a.r).slice(0, n);
  }
  window.KLANG_GLOSSARY = { retrievalPool };

  /* ── personal retrieval: spaced LEARNING items + Error Log patterns from earlier units ── */
  // Evolves the old "From your glossary" block (same place, same u:rg answer). Selection lives in
  // retrieval.js; what was actually used is logged in S.a["u:pr:log"] only when the learner engages.
  const PR_SKIP = {}, PR_FRESH = {}, PR_SHOWN = {};
  const prKey = (u, id) => `${u}:pr:${id.replace(/[^A-Za-z0-9]+/g, '_')}`;
  function personalSelection(u) {
    const RT = window.KLANG_RETRIEVAL; if (!RT) return { learning: [], errors: [], ids: [] };
    const d = UNITS[u], m = meta(u);
    const learning = glossaryEntries().filter(e => glStatus(e.u, e.key) === 'learning').map(e => e.mine
      ? { id: `g:${e.u}:${e.key}`, u: e.u, key: e.key, title: e.mine.term, def: e.mine.meaning || e.mine.mydef || '', extra: e.mine.ex || e.mine.ctx || '', added: e.mine.d || '' }
      : { id: `g:${e.u}:${e.key}`, u: e.u, key: e.key, title: strip(e.title), def: strip(e.def), extra: strip(e.extra), added: '' });
    const context = [].concat(d.read.main.paras, d.read.counter ? d.read.counter.paras : [], d.steal.chunks.map(c => c.c)).map(strip).join(' ');
    const errors = (S.errs || []).map(r => ({ id: r.id, u: r.u || r.unit || '', mine: r.mine, corr: r.corr, why: r.why, category: r.category, n: r.n || 0, last: r.last || '' }));
    return RT.select({ unit: u, order: ALL.map(x => x.id), today: today(), learning, errors, answers: S.a, context, grammarTerms: String(m.grammar || '').toLowerCase().split(/[^a-z]+/), skip: PR_SKIP[u] || [], fresh: !!PR_FRESH[u] });
  }
  function prLog(u) {
    const ids = PR_SHOWN[u]; if (!ids || !ids.length || !window.KLANG_RETRIEVAL) return;
    const next = window.KLANG_RETRIEVAL.logSelection(S.a[`${u}:pr:log`], today(), ids);
    PR_FRESH[u] = false;
    if (next) { S.a[`${u}:pr:log`] = next; save(`${u}:pr:log`); }
  }
  function retrievalBlock(u) {
    const sel = personalSelection(u), own = S.a[u + ':rg'] || '';
    PR_SHOWN[u] = sel.ids;
    const head = `<div class="bhead"><span class="kl">Personal</span><h3>Personal retrieval</h3><span class="tago">spaced · from earlier units</span></div>`;
    if (!sel.ids.length && !own) return `<div class="block pretr">${head}<p class="muted" style="font-size:14.5px">Nothing is due here yet. Words and chunks you mark LEARNING, and patterns in your Error Log, will come back in later units in small, spaced doses.</p></div>`;
    const lItems = sel.learning.map(x => `<div class="q"><div class="qh"><span class="tagp">LEARNING · Unit ${esc(x.u)}</span>${x.related ? '<span class="tago">also in this unit</span>' : ''}</div><div class="qt"><b>${esc(x.title)}</b></div>
      ${ta(prKey(u, x.id), 2, 'From memory: meaning, a natural partner word, your own sentence…')}
      <details class="acc"><summary>check</summary><div class="accb">${esc(x.def) || '<span class="muted">No meaning saved yet.</span>'}${x.extra ? `<br><small class="muted">${esc(x.extra)}</small>` : ''}<div style="margin-top:10px">${statusCtl(x.u, x.key)} <span class="muted" style="font-size:13px">Mark KNOW once it is consolidated and it stops coming back.</span></div></div></details></div>`).join('');
    const eItems = sel.errors.map(r => {
      const k = prKey(u, r.key);
      REG[k] = { id: 'pr', type: 'produce', model: [esc(r.corr)], explain: esc(r.why || '') };
      return `<div class="q"><div class="qh"><span class="tagp">Error Log${r.u ? ` · Unit ${esc(r.u)}` : ''}</span>${r.recurring ? '<span class="tago">recurring pattern</span>' : ''}</div><div class="qt">${esc(r.mine)}</div>
        ${ta(k, 2, 'Correct it again without looking…')}<div class="qact"><button class="btn line sm" data-act="errmodel" data-q="${k}">check stored correction →</button><button class="btn ghost sm" data-act="prrev" data-u="${u}" data-id="${esc(r.id)}">count as reviewed</button></div><div class="fbw" data-fb="${k}"></div></div>`;
    }).join('');
    return `<div class="block pretr">${head}<p class="sub">A small dose from your own notebook. Recall before you check; items come back at growing intervals until you mark them KNOW or review the error.</p>
      ${sel.ids.length ? `<div class="qs">${lItems}${eItems}</div>` : '<p class="muted" style="font-size:14.5px">Nothing else is due today.</p>'}
      ${sel.learning.length || own ? `<div class="q" style="margin-top:14px"><div class="qt">Use the retrieved language in two or three new sentences on a different topic.</div>${ta(u + ':rg', 4, 'Your sentences…')}</div>` : ''}
      ${sel.ids.length ? `<div class="qact" style="margin-top:10px"><button class="btn line sm" data-act="rgshuffle" data-u="${u}">show other items</button></div>` : ''}</div>`;
  }

  /* ── events ──────────────────────────────── */
  document.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.k && t.tagName === 'TEXTAREA') {
      S.a[t.dataset.k] = t.value; save(t.dataset.k);
      const w = $(`.wc[data-for="${CSS.escape(t.dataset.k)}"]`); if (w) wcClass(w);
      const pr = t.dataset.k.match(/^(\d\d):(?:pr:|rg$)/); if (pr) prLog(pr[1]);
    } else if (t.dataset.err) {
      const [id, f] = t.dataset.err.split(':'); const r = S.errs.find(x => x.id === id); if (r) { r[f] = t.value; save('error-log'); }
    } else if (t.dataset.ca) {
      const [id, f] = t.dataset.ca.split(':'); const c = S.ca.find(x => x.id === id); if (c) { c.f = c.f || {}; c.f[f] = t.value; save('current-affairs'); if (f === 'write') caWc(id); }
    } else if (t.dataset.spSelf) {
      const a = speakingAttempt(t.dataset.spSelf); if (a) { a.selfCheck = t.value; save('speaking'); }
    } else if (t.id === 'sq') {
      SQ = t.value; clearTimeout(t._t);
      t._t = setTimeout(() => { if (location.hash !== '#search') location.hash = 'search'; else renderSearch(); }, 250);
    } else if (t.id === 'glq') {
      GLF.q = t.value; const pos = t.selectionStart; renderGlossary(); const n = $('#glq'); n.focus(); n.setSelectionRange(pos, pos);
    }
  });
  document.addEventListener('error', e => { const t = e.target; if (t && t.dataset && t.dataset.listenAudio) { const m = $(`[data-audio-error="${CSS.escape(t.dataset.listenAudio)}"]`); if (m) m.hidden = false; } }, true);
  document.addEventListener('change', e => {
    const t = e.target;
    if (t.type === 'radio' && t.dataset.k) {
      S.a[t.dataset.k] = t.value;
      delete S.a[`${t.dataset.k}:checked`];
      const li = t.dataset.k.match(/^([^:]+):li:([^:]+):/);
      if (li) delete S.a[`${li[1]}:li:${li[2]}:submitted`];
      save(t.dataset.k);
    }
    else if (t.tagName === 'SELECT' && t.dataset.k) {
      S.a[t.dataset.k] = t.value; save(t.dataset.k);
      const tl = t.dataset.k.match(/^r([1-7]):tl:point$/); if (tl) renderReviewKeepScroll(tl[1], 'assessment');
    }
    else if (t.dataset.ck) {
      S.a[t.dataset.ck] = t.checked; save(t.dataset.ck);
      const u = t.dataset.ck.split(':')[0], cc = $(`[data-cc="${u}"]`);
      if (cc) cc.textContent = `${UNITS[u].edit.checklist.filter((c, i) => S.a[`${u}:ck:${i}`]).length} of ${UNITS[u].edit.checklist.length} checked`;
    }
    else if (t.dataset.sec) { S.sec[t.dataset.sec] = t.checked; save(t.dataset.sec); const [u, s] = t.dataset.sec.split(':'); renderUnitKeepScroll(u, s); toast(t.checked ? 'Section marked as completed' : 'Section unmarked'); }
    else if (t.dataset.rsec) { const [id, s] = t.dataset.rsec.split(':'); S.sec[`r${id}:${s}`] = t.checked; save(`r${id}:${s}`); renderReviewKeepScroll(id, s); toast(t.checked ? 'Review section marked as completed' : 'Review section unmarked'); }
    else if (t.dataset.ud) { S.ud[t.dataset.ud] = t.checked; save('unit:' + t.dataset.ud); renderSide(location.hash.slice(1)); toast(t.checked ? 'Unit marked as completed' : 'Unit unmarked'); }
    else if (t.dataset.rd) { S.rd[t.dataset.rd] = t.checked; save('review:' + t.dataset.rd); renderSide(location.hash.slice(1)); toast(t.checked ? 'Module Review marked as completed' : 'Module Review unmarked'); }
    else if (t.dataset.md) { S.md[t.dataset.md] = t.checked; save('progress'); renderHomeKeepScroll(); }
    else if (t.dataset.pf) {
      const parts = t.dataset.pf.split(':'), f = parts.pop(), k = parts.join(':');
      S.pf[k] = S.pf[k] || {}; S.pf[k][f] = t.value;
      if (f === 's' && t.value === 'Final' && !S.pf[k].d) { S.pf[k].d = today(); const di = t.parentNode.querySelector('input[type=date]'); if (di) di.value = today(); }
      save('portfolio');
    }
  });
  function renderUnitKeepScroll(u, s) { const y = scrollY; renderUnit(u, s); renderSide(location.hash.slice(1)); window.scrollTo(0, y); }
  function renderReviewKeepScroll(id, s) { const y = scrollY; renderReview(id, s); renderSide(location.hash.slice(1)); window.scrollTo(0, y); }
  // Listening and SAY IT also live inside Reviews (prefix r1, r2): re-render whichever page owns them
  function rerenderOwner(u, unitStage) {
    if (/^r[1-7]$/.test(u)) return renderReviewKeepScroll(u.slice(1), S.last && S.last.u === u ? S.last.s : undefined);
    renderUnitKeepScroll(u, unitStage);
  }
  function renderHomeKeepScroll() { const y = scrollY; renderHome(); renderSide('home'); window.scrollTo(0, y); }

  document.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.id === 'caform') {
      const t = $('#ca-t').value.trim(); if (!t) return;
      S.ca.push({ id: uid(), title: t, date: $('#ca-d').value || today(), f: {} }); save('current-affairs'); renderCurrent();
    } else if (e.target.id === 'gxform') {
      saveGlossaryForm(e.target);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePop(); closeSelPop(); closeModal(); exitFocus(); document.body.classList.remove('nav-open'); }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('vw')) { e.preventDefault(); openPop(e.target); }
  });

  document.addEventListener('click', e => {
    if (window.KLANG_CHAT && window.KLANG_CHAT.onClick(e)) return;
    if (window.KLANG_LEARNING_REVIEW && window.KLANG_LEARNING_REVIEW.onClick(e)) return;
    const t = e.target.closest('button, a, .vw, [data-glf]');
    if (!t) { if (!e.target.closest('#pop')) closePop(); return; }
    if (t.classList.contains('vw')) { openPop(t); return; }
    if (t.dataset.flash) FLASH = t.dataset.flash;
    if (t.dataset.flashgo) { FLASH = t.dataset.flashgo; closePop(); if (location.hash === '#' + t.dataset.h) route(); else location.hash = t.dataset.h; return; }
    if (t.dataset.go) { location.hash = t.dataset.go; return; }
    if (t.dataset.gl) {
      const k = t.dataset.gl, s = t.dataset.st;
      S.gl[k] = S.gl[k] === s ? '' : s; save('glossary');
      $$(`[data-gl="${CSS.escape(k)}"]`).forEach(b => { const on = S.gl[k] === b.dataset.st; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
      if (location.hash === '#glossary') { const y = scrollY; renderGlossary(); window.scrollTo(0, y); }
      renderSide(location.hash.slice(1));
      return;
    }
    if (t.dataset.bm) {
      const b = JSON.parse(t.dataset.bm); const i = S.bm.findIndex(x => x.id === b.id);
      if (i >= 0) { S.bm.splice(i, 1); toast('Bookmark removed'); } else { S.bm.push(Object.assign(b, { d: today() })); toast('Bookmarked'); }
      save('bookmarks'); t.classList.toggle('on', i < 0); t.classList.toggle('bm', i < 0); renderSide(location.hash.slice(1)); return;
    }
    if (t.dataset.unbm) { S.bm = S.bm.filter(b => b.id !== t.dataset.unbm); save('bookmarks'); renderBookmarks(); renderSide('bookmarks'); return; }
    if (t.dataset.glf) { const [k, v] = t.dataset.glf.split(':'); GLF[k] = v; renderGlossary(); return; }
    if (t.dataset.del) {
      if (t.dataset.armed !== '1') { t.dataset.armed = '1'; t.textContent = 'confirm delete'; setTimeout(() => { if (t.isConnected) { t.dataset.armed = ''; t.textContent = t.dataset.del.startsWith('ca') ? 'delete issue' : 'delete'; } }, 3000); return; }
      const [kind, id] = t.dataset.del.split(':');
      if (kind === 'err') { S.errs = S.errs.filter(b => b.id !== id); save('error-log'); renderErrors(); renderSide('errors'); }
      if (kind === 'ca') { S.ca = S.ca.filter(b => b.id !== id); save('current-affairs'); renderCurrent(); }
      if (kind === 'glx') { const g = S.glx.find(x => x.id === id); S.glx = S.glx.filter(x => x.id !== id); if (g) delete S.gl[g.u + ':x:' + id]; save('glossary'); renderGlossary(); renderSide('glossary'); }
      return;
    }
    if (t.dataset.rev) { const r = S.errs.find(x => x.id === t.dataset.rev); r.n = (r.n || 0) + 1; r.last = today(); save('error-log'); renderErrors(); toast('Review counted'); return; }
    const act = t.dataset.act; if (!act) return;
    const k = t.dataset.q, it = k && REG[k];
    const fb = k && $(`[data-fb="${CSS.escape(k)}"]`);
    switch (act) {
      case 'check': {
        if (it.type === 'mc') {
          const a = S.a[k];
          $$(`input[name="${CSS.escape(k)}"]`).forEach(inp => inp.closest('.opt').classList.remove('right', 'wrong'));
          if (a === undefined || a === '') { fb.innerHTML = `<div class="fb"><span class="v">No answer yet</span>Choose an option first.</div>`; break; }
          const ok = +a === it.answer;
          S.a[`${k}:checked`] = { answer: String(a), at: new Date().toISOString() }; save(k);
          $$(`input[name="${CSS.escape(k)}"]`).forEach(inp => { if (+inp.value === it.answer) inp.closest('.opt').classList.add('right'); else if (inp.checked) inp.closest('.opt').classList.add('wrong'); });
          fb.innerHTML = `<div class="fb ${ok ? 'good' : 'bad'}"><span class="v">${ok ? 'Correct' : 'Not quite · the answer is ' + LET[it.answer]}</span>${it.explain}</div>`;
        } else if (it.type === 'tf') {
          const a = S.a[k];
          if (!a) { fb.innerHTML = `<div class="fb"><span class="v">No answer yet</span>Choose True or False first, and justify it.</div>`; break; }
          const ok = (a === 'True') === it.answer;
          S.a[`${k}:checked`] = { answer: String(a), at: new Date().toISOString() }; save(k);
          fb.innerHTML = `<div class="fb ${ok ? 'good' : 'bad'}"><span class="v">${ok ? 'Correct' : 'Not quite'} · ${it.answer ? 'True' : 'False'}</span>${it.explain}</div>`;
        }
        break;
      }
      case 'guide':
        if (fb.innerHTML) { fb.innerHTML = ''; t.textContent = 'see guidance'; break; }
        fb.innerHTML = `<div class="fb"><span class="v" style="color:var(--ink)">What a strong answer might consider</span><ul>${it.guide.map(g => `<li>${g}</li>`).join('')}</ul></div>`; t.textContent = 'hide guidance'; break;
      case 'model':
        if (fb.innerHTML) { fb.innerHTML = ''; break; }
        fb.innerHTML = `<div class="fb"><span class="v" style="color:var(--ink)">${it.model.length > 1 ? 'Possible answers' : 'Model answer'}</span>${it.model.map(m => `<div class="model">${m}</div>`).join('')}${it.explain ? `<p style="margin-top:8px">${it.explain}</p>` : ''}${S.a[k] ? '' : '<p class="muted" style="margin-top:6px;font-size:13.5px">Tip: write your own version before checking. It\'s the attempt that builds accuracy.</p>'}</div>`; break;
      case 'errmodel':
        if (!(S.a[k] || '').trim()) { toast('Attempt the correction before checking'); break; }
        { const pr = k.match(/^(\d\d):pr:/); if (pr) prLog(pr[1]); }
        if (fb.innerHTML) { fb.innerHTML = ''; break; }
        fb.innerHTML = `<div class="fb"><span class="v" style="color:var(--ink)">Stored correction</span>${it.model.map(m => `<div class="model">${m}</div>`).join('')}${it.explain ? `<p style="margin-top:8px">${it.explain}</p>` : ''}</div>`; break;
      case 'label': case 'match': {
        const rows = it.type === 'label' ? it.rows : it.pairs; let right = 0;
        rows.forEach((r, i) => {
          const el = $(`[data-row="${CSS.escape(k + ':' + i)}"]`); const val = S.a[k + ':' + i]; const ans = it.type === 'label' ? r.answer : r[1];
          el.classList.remove('right', 'wrong'); const old = el.querySelector('.lx'); if (old) old.remove();
          const ok = val === ans; if (ok) right++;
          el.classList.add(ok ? 'right' : 'wrong');
          if (it.type === 'label') el.insertAdjacentHTML('beforeend', `<div class="lx"><b>${ans}.</b> ${r.explain}</div>`);
          else if (!ok) el.insertAdjacentHTML('beforeend', `<div class="lx">→ ${ans}</div>`);
        });
        toast(`${right} of ${rows.length} correct`); break;
      }
      case 'copyone': copyText(S.a[k] || '', 'Text copied'); break;
      case 'focus': enterFocus(); break;
      case 'fs-': S.prefs.fs = Math.max(15, S.prefs.fs - 1); applyPrefs(); save('progress'); break;
      case 'fs+': S.prefs.fs = Math.min(26, S.prefs.fs + 1); applyPrefs(); save('progress'); break;
      case 'width': S.prefs.w = S.prefs.w === 58 ? 66 : S.prefs.w === 66 ? 76 : 58; applyPrefs(); save('progress'); toast(S.prefs.w === 58 ? 'Narrow column' : S.prefs.w === 66 ? 'Standard column' : 'Wide column'); break;
      case 'exitfocus': exitFocus(); break;
      case 'reveal': { const r = $('#reveal'); r.hidden = !r.hidden; if (!r.hidden) { r.innerHTML = revealHtml(location.hash.slice(2, 4)); t.textContent = 'hide →'; } else t.textContent = 'reveal what you missed →'; break; }
      case 'reviewmodel': { const box = $('#review-model'), d = REVIEWS[t.dataset.r]; if (!box || !d) break; box.hidden = !box.hidden; box.innerHTML = box.hidden ? '' : `<span class="v" style="color:var(--ink)">One edited version</span><p>${esc(d.editing.model)}</p>`; t.textContent = box.hidden ? 'compare with one edited version →' : 'hide edited version'; break; }
      case 'lisubmit': {
        const owner = /^r[1-7]$/.test(t.dataset.u) ? REVIEWS[t.dataset.u.slice(1)] : UNITS[t.dataset.u];
        const activity = owner && (owner.listening || []).find(x => x.id === t.dataset.lid), answers = {};
        (activity?.questions || []).forEach(q => { if (['mc','tf','fill'].includes(q.type)) answers[q.id] = S.a[`${t.dataset.u}:li:${t.dataset.lid}:${q.id}`]; });
        S.a[`${t.dataset.u}:li:${t.dataset.lid}:submitted`] = { at: new Date().toISOString(), answers };
        save(`${t.dataset.u}:li`); rerenderOwner(t.dataset.u,'interpret'); toast('Answers submitted · transcript unlocked'); break;
      }
      case 'lifb': if (isDemo()) { toast('AI feedback is disabled in Demo Mode.'); break; } feedbackListening(t.dataset.u,t.dataset.lid,t.dataset.qid,t); break;
      case 'sprecord': if (isDemo()) { toast('Recording is disabled in Demo Mode.'); break; } startSpeaking(t.dataset.u,t.dataset.sid); break;
      case 'spstop': stopSpeaking(); break;
      case 'spplay': playSpeaking(t.dataset.id); break;
      case 'sptranscribe': if (isDemo()) { toast('Transcription is disabled in Demo Mode.'); break; } transcribeSpeaking(t.dataset.id,t); break;
      case 'spfeedback': if (isDemo()) { toast('AI feedback is disabled in Demo Mode.'); break; } feedbackSpeaking(t.dataset.id,t); break;
      case 'sp2err': { const a=speakingAttempt(t.dataset.id), c=a&&a.feedback&&a.feedback.corrections&&a.feedback.corrections[+t.dataset.i]; if(c){S.errs.push({id:uid(),mine:c.original,corr:c.better,why:c.why,ex:'',category:c.category||'Speaking',unit:a.unit,source:'speaking',n:0,last:''});save('error-log');t.disabled=true;t.textContent='added';toast('Added to Error Log');} break; }
      case 'export': exportModal(t.dataset.u); break;
      case 'copymd': copyText($('#mdout').value, 'Markdown copied'); break;
      case 'dlmd': downloadMd(`unit-${t.dataset.u}-${today()}.md`, $('#mdout').value); break;
      case 'close': closeModal(); break;
      case 'copywriting': { const txt = writingText(t.dataset.u); if (!txt) toast('No writing in this unit yet'); else copyText(txt, 'Writing copied'); break; }
      case 'reset': resetModal(t.dataset.u); break;
      case 'doreset': {
        const u = t.dataset.u;
        Object.keys(S.a).forEach(x => { if (x.startsWith(u + ':')) delete S.a[x]; });
        Object.keys(S.sec).forEach(x => { if (x.startsWith(u + ':')) delete S.sec[x]; });
        Object.keys(S.pf).forEach(x => { if (x.startsWith(u + ':')) delete S.pf[x]; });
        delete S.ud[u]; if (S.last && S.last.u === u) S.last = { u, s: 'know' };
        save('unit:' + u); notifySync('portfolio'); closeModal(); location.hash = `u${u}-know`; route(); toast(`Unit ${u} reset`); break;
      }
      case 'adderr': S.errs.push({ id: uid(), mine: '', corr: '', why: '', ex: '', n: 0, last: '' }); save('error-log'); renderErrors(); renderSide('errors'); { const all = $$('[data-err]'); const last = all[all.length - 4]; last && last.focus(); } break;
      case 'caexport': {
        const c = S.ca.find(x => x.id === t.dataset.id); const f = c.f || {};
        const md = [`# Current Affairs Lab · ${c.title}`, `*${c.date}*`, ''].concat(CA_FIELDS.map(([k2, l]) => f[k2] ? `## ${l}\n\n${f[k2]}\n` : '')).concat(f.write ? [`## Writing (${words(f.write)} words)\n\n${f.write}`] : []).filter(Boolean).join('\n');
        copyText(md, 'Issue copied as markdown'); break;
      }
      case 'menu': document.body.classList.toggle('nav-open'); break;
      case 'backup': if (isDemo()) { toast('Backup is disabled in Demo Mode.'); break; } doBackup(); break;
      case 'restore': if (isDemo()) { toast('Restore is disabled in Demo Mode.'); break; } { const f = $('#bkfile'); f && f.click(); break; }
      case 'dorestore': if (isDemo()) { toast('Restore is disabled in Demo Mode.'); break; } applyRestore(); break;
      case 'aifb': if (isDemo()) { toast('AI feedback is disabled in Demo Mode.'); break; } requestFeedback(k, t); break;
      case 'fbopen': openFeedbackModal(t.dataset.pk, t.dataset.id); break;
      case 'fbdel': deleteFeedback(t.dataset.pk, t.dataset.id, t); break;
      case 'fb2err': addSuggestionToErrorLog(t); break;
      case 'selgl': closeSelPop(); glossaryModal(SELCTX); break;
      case 'selex': if (isDemo()) { closeSelPop(); toast('AI explanation is disabled in Demo Mode.'); break; } closeSelPop(); explainModal(SELCTX); break;
      case 'selrg': if (isDemo()) { closeSelPop(); toast('AI features are disabled in Demo Mode.'); break; } closeSelPop(); registerModal(SELCTX); break;
      case 'exgl': glossaryModal(Object.assign({}, EXCTX.sel, { meaning: EXCTX.meaning })); break;
      case 'gxedit': { const g = S.glx.find(x => x.id === t.dataset.id); if (g) glossaryModal(g, g.id); break; }
      case 'rgshuffle': {
        const u = t.dataset.u, prevSkip = PR_SKIP[u], prevFresh = PR_FRESH[u];
        PR_SKIP[u] = (prevSkip || []).concat(PR_SHOWN[u] || []); PR_FRESH[u] = true;
        if (!personalSelection(u).ids.length) { PR_SKIP[u] = prevSkip; PR_FRESH[u] = prevFresh; toast('No other items are due today'); break; }
        renderUnitKeepScroll(u, 'retrieve'); break;
      }
      case 'prrev': {
        const r = S.errs.find(x => x.id === t.dataset.id); if (!r) break;
        prLog(t.dataset.u); r.n = (r.n || 0) + 1; r.last = today(); save('error-log');
        t.disabled = true; t.textContent = 'reviewed ✓'; renderSide(location.hash.slice(1)); toast('Review counted in your Error Log'); break;
      }
      case 'outlinefb': if (isDemo()) { toast('AI feedback is disabled in Demo Mode.'); break; } requestOutlineFeedback(k, t); break;
      case 'tlfb': if (isDemo()) { toast('AI feedback is disabled in Demo Mode.'); break; } requestTeacherLensFeedback(t.dataset.r, t); break;
      case 'tcstart': { const p = reviewPrefix(t.dataset.r); S.a[`${p}:tc:start`] = new Date().toISOString(); delete S.a[`${p}:tc:end`]; save(`${p}:tc`); renderReviewKeepScroll(t.dataset.r, 'synthesis'); toast('Clock started · good luck'); break; }
      case 'tcsubmit': { const p = reviewPrefix(t.dataset.r); S.a[`${p}:tc:end`] = new Date().toISOString(); save(`${p}:tc`); renderReviewKeepScroll(t.dataset.r, 'synthesis'); toast('Submitted · feedback is now available'); break; }
      case 'tcreset': {
        if (t.dataset.armed !== '1') { t.dataset.armed = '1'; t.textContent = 'confirm: discard this attempt'; setTimeout(() => { if (t.isConnected) { t.dataset.armed = ''; t.textContent = 'discard and start again'; } }, 3000); break; }
        const p = reviewPrefix(t.dataset.r), tk = REVIEWS[t.dataset.r].timed;
        [`${p}:tc:start`, `${p}:tc:end`, `${p}:${tk.id}`].forEach(x => { delete S.a[x]; });
        save(`${p}:tc`); renderReviewKeepScroll(t.dataset.r, 'synthesis'); toast('Timed attempt discarded'); break;
      }
      case 'explainq': {
        if (isDemo()) { toast('AI features are disabled in Demo Mode.'); break; }
        requestExplainQuestion(t.dataset.q, t.dataset.u, t.dataset.stage, t.dataset.task, t);
        break;
      }
      case 'lightfb': {
        if (isDemo()) { toast('AI feedback is disabled in Demo Mode.'); break; }
        requestLightFeedback(t.dataset.q, t.dataset.u, t.dataset.stage, t.dataset.task, t);
        break;
      }
      case 'intfb': {
        if (isDemo()) { toast('AI feedback is disabled in Demo Mode.'); break; }
        requestInterpretFeedback(t.dataset.q, t.dataset.u, t.dataset.item, t);
        break;
      }
      case 'whylightfb': {
        if (isDemo()) { toast('AI feedback is disabled in Demo Mode.'); break; }
        const whyKey = t.dataset.q + ':why';
        requestLightFeedback(whyKey, t.dataset.u, 'interpret_tf_why', (t.dataset.task || 'tf') + '_why', t);
        break;
      }
      case 'light2err': {
        const k = t.dataset.k;
        const fb = S.a[`${k}:lightfb`] || S.a[`${k}:intfb`];
        const cand = fb && fb.f && (fb.f.errorLogCandidate || (fb.f.language && fb.f.language.errorLogCandidate));
        if (cand) {
          S.errs.push({
            id: uid(),
            mine: cand.mine,
            corr: cand.corr,
            why: cand.why,
            ex: cand.ex,
            category: 'Written language',
            unit: k.split(':')[0],
            source: 'light_feedback',
            n: 0,
            last: ''
          });
          save('error-log');
          t.disabled = true;
          t.textContent = 'added to Error Log ✓';
          toast('Added to Error Log');
        }
        break;
      }
      case 'timer-toggle': toggleStudyTimer(); break;
    }
  });

  /* ── study timer ─────────────────────────── */
  const MAX_STUDY_SESSION_SECONDS = 14400; // 4 hours safety auto-cap
  function formatTimer(totalSec) {
    const s = Math.max(0, Math.floor(totalSec));
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    const p2 = n => String(n).padStart(2, '0');
    return hrs > 0 ? `${p2(hrs)}:${p2(mins)}:${p2(secs)}` : `${p2(mins)}:${p2(secs)}`;
  }

  function getTimerElapsed() {
    if (!S.study || !S.study.activeSession || !S.study.activeSession.startedAt) return 0;
    const startMs = Date.parse(S.study.activeSession.startedAt);
    if (isNaN(startMs)) return 0;
    return Math.floor((Date.now() - startMs) / 1000);
  }

  function todayStudyMinutes() {
    const todayStr = new Date().toISOString().slice(0, 10);
    const completedSec = (S.study?.sessions || [])
      .filter(s => (s.endedAt || s.startedAt || '').slice(0, 10) === todayStr)
      .reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    const activeSec = S.study?.activeSession ? getTimerElapsed() : 0;
    return Math.floor((completedSec + activeSec) / 60);
  }

  function sideTimerHtml() {
    const isRunning = !!(S.study && S.study.activeSession);
    const todayMins = todayStudyMinutes();
    const elapsed = isRunning ? getTimerElapsed() : 0;
    return `<div class="side-timer-widget ${isRunning ? 'running' : ''}">
      <div class="side-timer-row">
        <div class="side-timer-meta">
          <span class="side-timer-label">Study Timer</span>
          <span class="side-timer-stat" id="side-timer-stat">${todayMins} min today${isRunning ? ` · ${formatTimer(elapsed)}` : ''}</span>
        </div>
        <button type="button" class="timer-toggle-btn ${isRunning ? 'on' : ''}" data-act="timer-toggle" title="${isRunning ? 'Pause/Stop Study Timer' : 'Start Study Timer'}">
          ${isRunning ? 'Pause ⏸' : 'Start ▶'}
        </button>
      </div>
    </div>`;
  }

  function tickStudyTimer() {
    if (!S.study) S.study = { activeSession: null, sessions: [] };
    if (S.study.activeSession) {
      const elapsed = getTimerElapsed();
      if (elapsed >= MAX_STUDY_SESSION_SECONDS) {
        const active = S.study.activeSession;
        S.study.sessions = S.study.sessions || [];
        S.study.sessions.push({
          id: active.id,
          startedAt: active.startedAt,
          endedAt: new Date(Date.parse(active.startedAt) + MAX_STUDY_SESSION_SECONDS * 1000).toISOString(),
          durationSeconds: MAX_STUDY_SESSION_SECONDS,
          capped: true,
        });
        S.study.activeSession = null;
        save('study-timer');
        updateTimerUI();
        toast('Study session capped at 4 hours');
      } else {
        const sideStat = $('#side-timer-stat');
        if (sideStat) {
          const todayMins = todayStudyMinutes();
          sideStat.textContent = `${todayMins} min today · ${formatTimer(elapsed)}`;
        }
        const clock = $('#timer-clock');
        if (clock) clock.textContent = formatTimer(elapsed);
        const topEl = $('#topbar-timer');
        if (topEl) topEl.classList.add('running');
      }
    } else {
      const topEl = $('#topbar-timer');
      if (topEl) {
        topEl.classList.remove('running');
        const clock = $('#timer-clock');
        if (clock) clock.textContent = '00:00';
      }
    }
  }

  function updateTimerUI() {
    const isRunning = !!(S.study && S.study.activeSession);
    const elapsed = isRunning ? getTimerElapsed() : 0;
    const sideEl = $('#side-timer');
    if (sideEl) {
      sideEl.innerHTML = sideTimerHtml();
    }
    const topEl = $('#topbar-timer');
    if (topEl) {
      topEl.innerHTML = `<button type="button" class="timer-btn ${isRunning ? 'on' : ''}" data-act="timer-toggle" title="${isRunning ? 'Pause/Stop Study Timer' : 'Start Study Timer'}"><span class="timer-icon" aria-hidden="true">${isRunning ? '⏸' : '▶'}</span><span class="timer-clock" id="timer-clock">${formatTimer(elapsed)}</span></button>`;
      if (isRunning) topEl.classList.add('running'); else topEl.classList.remove('running');
    }
  }

  function toggleStudyTimer() {
    if (!S.study) S.study = { activeSession: null, sessions: [] };
    if (S.study.activeSession) {
      const active = S.study.activeSession;
      const elapsed = Math.min(MAX_STUDY_SESSION_SECONDS, getTimerElapsed());
      if (elapsed >= 5) {
        S.study.sessions = S.study.sessions || [];
        S.study.sessions.push({
          id: active.id,
          startedAt: active.startedAt,
          endedAt: new Date().toISOString(),
          durationSeconds: elapsed,
          capped: elapsed >= MAX_STUDY_SESSION_SECONDS,
        });
      }
      S.study.activeSession = null;
      save('study-timer');
      toast('Study timer paused');
    } else {
      S.study.activeSession = {
        id: 'st_' + Date.now() + '_' + uid(),
        startedAt: new Date().toISOString(),
      };
      save('study-timer');
      toast('Study timer started');
    }
    updateTimerUI();
  }

  /* ── boot ────────────────────────────────── */
  document.body.insertAdjacentHTML('beforeend', `<div class="focusbar" role="toolbar" aria-label="Reading controls"><button data-act="fs-" aria-label="Smaller text">A−</button><button data-act="fs+" aria-label="Larger text">A+</button><button data-act="width">width</button><button class="x" data-act="exitfocus">exit focus</button></div><div class="rprog" id="rprog"></div><div class="toast" id="toast" role="status" aria-live="polite"></div>`);
  $('#topbar').innerHTML = `<a href="#home" aria-label="Home">${wordmark('#F3EBE3', 'wm')}</a><div id="topbar-timer" class="topbar-timer"></div><div id="topbar-sync"></div><button data-act="menu" aria-label="Open navigation"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>menu</button>`;
  updateTimerUI();
  setInterval(tickStudyTimer, 1000);
  applyPrefs();
  // Conversation UI (character-chat.js): gets state, storage and the AI fetcher; the server stays the authority
  if (window.KLANG_CHAT) window.KLANG_CHAT.attach({ state: () => S, save, isDemo, main, aiFetch, needSignIn });
  // Learning Review (learning-review.js): attached with state/save for human judgments
  if (window.KLANG_LEARNING_REVIEW) window.KLANG_LEARNING_REVIEW.attach({ main, esc, isDemo, needSignIn, state: () => S, save });
  window.addEventListener('hashchange', route);
  applyLegacyMigration();
  route();

  if (window.KLANG_SYNC) {
    window.KLANG_SYNC.init({
      state: S,
      onRemoteUpdate: () => {
        applyLegacyMigration();   // a document synced from an older device may use the shared key
        applyPrefs();
        updateTimerUI();
        route();
      },
      onSaveLocal: () => {
        saveNow();
      },
    });
  }
  checkAi();
})();
