/* Validate backups before any state mutation. Unknown future fields are ignored by the importer. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KLANG_BACKUP = factory();
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const MAX_BYTES = 10 * 1024 * 1024;
  const record = v => !!v && typeof v === 'object' && !Array.isArray(v);
  const date = v => typeof v === 'string' && Number.isFinite(Date.parse(v));
  function validate(o) {
    if (!record(o) || o.app !== 'a-mind-in-english' || !record(o.state) || !record(o.state.a)) return false;
    if (o.saved !== undefined && !date(o.saved)) return false;
    const s = o.state;
    for (const k of ['sec', 'ud', 'rd', 'md', 'gl', 'pf', 'conversations', 'learningJudgments']) if (s[k] !== undefined && !record(s[k])) return false;
    for (const k of ['glx', 'bm', 'bank', 'errs', 'sp', 'ca']) {
      if (s[k] === undefined) continue;
      if (!Array.isArray(s[k]) || s[k].some(x => !record(x))) return false;
      const ids = s[k].filter(x => x.id !== undefined).map(x => x.id);
      if (ids.some(id => typeof id !== 'string' || !id) || new Set(ids).size !== ids.length) return false;
      for (const x of s[k]) for (const d of ['date', 'at', 'createdAt', 'updatedAt']) if (x[d] !== undefined && x[d] !== null && !date(x[d])) return false;
    }
    if (s.prefs !== undefined && (!record(s.prefs) || !Number.isFinite(s.prefs.fs) || !Number.isFinite(s.prefs.w))) return false;
    for (const [k, v] of Object.entries(s.a)) {
      if (k.endsWith(':supportLevel') && !['high', 'medium', 'light', 'off'].includes(v)) return false;
      if (k.endsWith(':support')) {
        if (typeof v === 'string') { if (!date(v)) return false; }
        else if (!record(v) || !date(v.at) || !['high', 'medium', 'light', 'off'].includes(v.level) || typeof v.beforeWriting !== 'boolean') return false;
      }
    }
    for (const p of Object.values(s.pf || {})) {
      if (!record(p) || (p.fb !== undefined && !Array.isArray(p.fb))) return false;
      for (const f of p.fb || []) {
        if (!record(f) || !record(f.f)) return false;
        if (f.at !== undefined && !date(f.at)) return false;
        if (f.support !== undefined) {
          const x = f.support;
          if (!record(x) || (x.level != null && !['high', 'medium', 'light', 'off'].includes(x.level)) || (x.used != null && typeof x.used !== 'boolean') || (x.openedBeforeWriting != null && typeof x.openedBeforeWriting !== 'boolean')) return false;
        }
      }
    }
    if (s.study !== undefined) {
      if (!record(s.study) || !Array.isArray(s.study.sessions)) return false;
      if (s.study.finalizedIds !== undefined && (!Array.isArray(s.study.finalizedIds) || s.study.finalizedIds.some(id => typeof id !== 'string'))) return false;
      const ids = new Set();
      for (const x of s.study.sessions) {
        if (!record(x) || typeof x.id !== 'string' || ids.has(x.id) || !date(x.startedAt) || !date(x.endedAt) || Date.parse(x.endedAt) < Date.parse(x.startedAt) || !Number.isFinite(x.durationSeconds) || x.durationSeconds < 0) return false;
        ids.add(x.id);
      }
      const a = s.study.activeSession;
      if (a != null && (!record(a) || typeof a.id !== 'string' || ids.has(a.id) || !date(a.startedAt) || (a.lastSeenAt !== undefined && !date(a.lastSeenAt)) || (a.confirmedAt !== undefined && !date(a.confirmedAt)))) return false;
    }
    return true;
  }
  return Object.freeze({ validate, MAX_BYTES });
});
