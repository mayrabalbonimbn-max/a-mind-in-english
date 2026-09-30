/* A MIND IN ENGLISH · retrieval.js
   Personal Retrieval: picks a small, spaced dose of the learner's own LEARNING items and
   Error Log patterns from EARLIER units for the RETRIEVE stage. Pure functions only; the
   app stores what was shown in S.a["NN:pr:log"] (unit scope, so it syncs like any answer). */
(function () {
  'use strict';

  // Minimum days before an item may reappear, by how many times it has already been shown.
  const GAPS = [0, 2, 4, 8, 16, 30];
  const MAX_LOG = 12;
  const gapFor = times => GAPS[Math.min(times, GAPS.length - 1)];
  const dayNum = d => Math.floor(Date.parse(String(d).slice(0, 10)) / 864e5);
  const daysBetween = (a, b) => (a && b ? dayNum(b) - dayNum(a) : Infinity);

  // Deterministic tie-break, so the same day shows the same dose on every render/device
  function jitter(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0) / 4294967296;
  }

  function parseLog(v) {
    if (typeof v !== 'string' || !v) return [];
    try { const a = JSON.parse(v); return Array.isArray(a) ? a.filter(e => e && typeof e.d === 'string') : []; } catch (e) { return []; }
  }

  // id -> { times, last } across every unit's log
  function historyFrom(answers) {
    const h = new Map();
    Object.keys(answers || {}).forEach(k => {
      if (!/^\d\d:pr:log$/.test(k)) return;
      parseLog(answers[k]).forEach(e => {
        const ids = new Set([].concat(e.seen || [], e.g || [], e.e || []));
        ids.forEach(id => {
          const x = h.get(id) || { times: 0, last: '' };
          x.times++; if (e.d > x.last) x.last = e.d;
          h.set(id, x);
        });
      });
    });
    return h;
  }

  // Records what was shown today in this unit. Returns the new log string, or null if unchanged.
  function logSelection(prev, today, ids) {
    const log = parseLog(prev), g = ids.filter(x => x.startsWith('g:')), e = ids.filter(x => x.startsWith('e:'));
    const last = log[log.length - 1];
    if (last && last.d === today) {
      const seen = Array.from(new Set([].concat(last.seen || [], last.g || [], last.e || [], ids)));
      if (seen.length === (last.seen || []).length && JSON.stringify(last.g) === JSON.stringify(g) && JSON.stringify(last.e) === JSON.stringify(e)) return null;
      log[log.length - 1] = { d: today, g, e, seen };
    } else {
      log.push({ d: today, g, e, seen: ids.slice() });
    }
    return JSON.stringify(log.slice(-MAX_LOG));
  }

  /* opts: { unit, order, today, learning:[{id,u,title,added}], errors:[{id,u,mine,corr,why,category,n,last}],
             answers, context, grammarTerms, skip, fresh, maxLearning, maxErrors } */
  function select(opts) {
    const o = Object.assign({ maxLearning: 2, maxErrors: 1, skip: [], context: '', grammarTerms: [], learning: [], errors: [], answers: {} }, opts);
    const order = o.order || [], pos = u => order.indexOf(u), here = pos(o.unit);
    const earlier = u => { const p = pos(u); return p >= 0 && here >= 0 && p < here; };
    const hist = historyFrom(o.answers), skip = new Set(o.skip), ctx = String(o.context || '').toLowerCase();
    const seed = `${o.today}|${o.unit}`;

    // Today's dose for this unit stays put across re-renders (unless the learner asked for other items)
    const todayLog = parseLog(o.answers[`${o.unit}:pr:log`]).filter(e => e.d === o.today).pop();
    const pinned = new Set(o.fresh || !todayLog ? [] : [].concat(todayLog.g || [], todayLog.e || []));

    const spaced = (id, extraLast, extraTimes) => {
      if (pinned.has(id)) return true;
      const x = hist.get(id) || { times: 0, last: '' };
      const times = Math.max(x.times, extraTimes || 0), last = [x.last, extraLast || ''].sort().pop();
      return !times || !last || daysBetween(last, o.today) >= gapFor(times);
    };

    const learning = o.learning.filter(it => {
      if (!it || !it.id || skip.has(it.id)) return false;
      if (pinned.has(it.id)) return true;
      if (!earlier(it.u)) return false;                                      // previous units only
      if (it.added && daysBetween(it.added, o.today) < 1) return false;      // not the day it was added
      return spaced(it.id);
    }).map(it => {
      const x = hist.get(it.id) || { times: 0, last: '' };
      const t = String(it.title || '').toLowerCase().trim();
      const related = t.length >= 4 && ctx.includes(t);
      const score = (pinned.has(it.id) ? 100 : 0) + 10 + (x.times ? Math.min(daysBetween(x.last, o.today), 30) / 3 : 8)
        + (related ? 5 : 0) - x.times * 0.5 + jitter(seed + it.id) * 2;
      return Object.assign({}, it, { related, times: x.times, score });
    }).sort((a, b) => b.score - a.score).slice(0, o.maxLearning);

    const catCount = {};
    o.errors.forEach(r => { const c = String(r.category || '').toLowerCase().trim(); if (c) catCount[c] = (catCount[c] || 0) + 1; });
    const terms = (o.grammarTerms || []).map(t => String(t).toLowerCase()).filter(t => t.length >= 5);
    const errors = o.errors.filter(r => {
      const id = 'e:' + r.id;
      if (!r || !r.id || skip.has(id)) return false;
      if (!String(r.mine || '').trim() || !String(r.corr || '').trim()) return false;
      if (pinned.has(id)) return true;
      if (r.u && /^\d\d$/.test(r.u) && !earlier(r.u)) return false;          // not this unit's (or a later unit's) fresh errors
      if (r.last === o.today) return false;                                  // reviewed today already
      return spaced(id, r.last, r.n || 0);
    }).map(r => {
      const id = 'e:' + r.id, n = r.n || 0, x = hist.get(id) || { times: 0, last: '' };
      const text = [r.mine, r.corr, r.why, r.category].join(' ').toLowerCase();
      const related = terms.some(t => text.includes(t));
      const recurring = (catCount[String(r.category || '').toLowerCase().trim()] || 0) >= 2;
      const last = [x.last, r.last || ''].sort().pop();
      const score = (pinned.has(id) ? 100 : 0) + 10 + (n === 0 ? 6 : Math.max(0, 4 - n)) + (recurring ? 4 : 0) + (related ? 5 : 0)
        + (last ? Math.min(daysBetween(last, o.today), 30) / 5 : 6) + jitter(seed + id) * 2;
      return Object.assign({}, r, { key: id, related, recurring, score });
    }).sort((a, b) => b.score - a.score).slice(0, o.maxErrors);

    return { learning, errors, ids: learning.map(x => x.id).concat(errors.map(x => x.key)) };
  }

  const api = { select, historyFrom, logSelection, parseLog, GAPS };
  if (typeof window !== 'undefined') window.KLANG_RETRIEVAL = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
