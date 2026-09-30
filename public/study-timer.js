/* A MIND IN ENGLISH · study-timer.js
   Study Timer rules. Pure and deterministic (no DOM, no network): loaded by the browser and
   required by the server, so the display and the Learning Review count time the same way.

   The learner starts and pauses a session by hand; nothing is inferred from mouse, keyboard or
   scroll. There is NO maximum session length: a confirmed 6-hour session counts 6 hours.
   What is protected against is an abandoned session, using the last reliable moment:
     • heartbeat  while the app is running with the timer on, lastSeenAt moves forward.
       If the app stops running for longer than STALE_GAP (closed, device asleep), the session
       ends at lastSeenAt: time nobody can vouch for is not counted.
     • check-in   after CHECKIN_AFTER without a confirmation the learner is asked "still studying?".
       Yes (or Pause) keeps every minute. No answer within CHECKIN_WINDOW ends the session where
       the question appeared, so a timer left running in an open tab cannot count indefinitely. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KLANG_STUDY = factory();
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this), function () {
  'use strict';
  const MIN = 60 * 1000;
  const HEARTBEAT_MS = 30 * 1000;          // local heartbeat while the app runs
  const HEARTBEAT_SYNC_MS = 5 * MIN;       // how often the heartbeat is synced to other devices
  const STALE_GAP_MS = 20 * MIN;           // app not running this long → session ended at lastSeenAt
  const CHECKIN_AFTER_MS = 90 * MIN;       // unconfirmed running time before "still studying?"
  const CHECKIN_WINDOW_MS = 20 * MIN;      // unanswered this long → session ends at the question
  const MIN_SESSION_SECONDS = 5;           // an accidental double click is not a session

  const ms = iso => { const n = Date.parse(iso); return isNaN(n) ? null : n; };
  const iso = n => new Date(n).toISOString();
  const sid = () => 'st_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

  function normalize(study) {
    const s = study && typeof study === 'object' ? study : {};
    if (!Array.isArray(s.sessions)) s.sessions = [];
    if (!s.activeSession || !s.activeSession.startedAt || ms(s.activeSession.startedAt) == null) s.activeSession = null;
    return s;
  }

  /** The last moment the running session is known to have been alive. */
  function lastSeen(a) { return Math.max(ms(a.startedAt) || 0, ms(a.lastSeenAt) || 0); }
  function confirmedAt(a) { return Math.max(ms(a.startedAt) || 0, ms(a.confirmedAt) || 0); }

  function close(study, endMs, reason) {
    const a = study.activeSession;
    study.activeSession = null;
    const start = ms(a.startedAt), end = Math.max(start, endMs);
    const seconds = Math.floor((end - start) / 1000);
    if (seconds < MIN_SESSION_SECONDS) {
      // Accidental sessions do not count as study, but still cannot be resurrected.
      study.finalizedIds = [...new Set([...(study.finalizedIds || []), a.id])];
      return null;
    }
    const s = { id: a.id, startedAt: a.startedAt, endedAt: iso(end), durationSeconds: seconds, endReason: reason };
    study.sessions.push(s);
    return s;
  }

  function start(study, now) {
    normalize(study);
    if (study.activeSession) return study.activeSession;
    const t = iso(now);
    study.activeSession = { id: sid(), startedAt: t, lastSeenAt: t, confirmedAt: t };
    return study.activeSession;
  }

  /** Ends an abandoned session at its last reliable moment; otherwise records a heartbeat.
      Returns { closed, reason, uncountedSeconds } when it ended the session, else null. */
  function reconcile(study, now, heartbeat) {
    normalize(study);
    const a = study.activeSession;
    if (!a) return null;
    const seen = lastSeen(a), asked = confirmedAt(a) + CHECKIN_AFTER_MS;
    const stale = now - seen > STALE_GAP_MS;
    const unanswered = now >= asked + CHECKIN_WINDOW_MS;
    if (stale || unanswered) {
      const end = Math.min(stale ? seen : Infinity, unanswered ? asked : Infinity);
      const reason = end === seen && stale ? 'stale' : 'unconfirmed';
      return { closed: close(study, end, reason), reason, uncountedSeconds: Math.floor((now - end) / 1000) };
    }
    if (heartbeat) a.lastSeenAt = iso(Math.max(now, seen));
    return null;
  }

  /** Manual Pause: every minute up to now counts, unless the session had already been abandoned. */
  function stop(study, now) {
    const r = reconcile(study, now, false);
    if (r) return r;
    if (!study.activeSession) return null;
    return { closed: close(study, now, 'manual'), reason: 'manual', uncountedSeconds: 0 };
  }

  /** "Yes, still studying": confirms everything up to now. */
  function confirm(study, now) {
    normalize(study);
    const a = study.activeSession;
    if (!a) return false;
    a.confirmedAt = a.lastSeenAt = iso(now);
    return true;
  }

  function checkInDue(study, now) {
    const a = study && study.activeSession;
    return !!a && now >= confirmedAt(a) + CHECKIN_AFTER_MS;
  }

  function elapsedSeconds(study, now) {
    const a = study && study.activeSession;
    const st = a ? ms(a.startedAt) : null;
    return st == null ? 0 : Math.max(0, Math.floor((now - st) / 1000));
  }

  /** A closed session as [start, end] in ms. The end never goes beyond the recorded duration. */
  function interval(s) {
    if (!s) return null;
    const st = ms(s.startedAt), en = ms(s.endedAt);
    if (st == null || en == null || en < st) return null;
    const dur = typeof s.durationSeconds === 'number' && isFinite(s.durationSeconds) ? Math.max(0, s.durationSeconds) : (en - st) / 1000;
    return [st, Math.min(en, st + dur * 1000)];
  }

  /** Seconds of study inside [fromMs, toMs): overlapping sessions (two devices) are counted once.
      No per-session maximum: only real, recorded intervals. */
  function countSeconds(intervals, fromMs, toMs) {
    const lo = fromMs == null ? -Infinity : fromMs, hi = toMs == null ? Infinity : toMs;
    const clipped = intervals.filter(Boolean).map(([a, b]) => [Math.max(a, lo), Math.min(b, hi)]).filter(([a, b]) => b > a).sort((x, y) => x[0] - y[0]);
    let total = 0, curA = null, curB = null;
    for (const [a, b] of clipped) {
      if (curB == null || a > curB) { if (curB != null) total += curB - curA; curA = a; curB = b; }
      else curB = Math.max(curB, b);
    }
    if (curB != null) total += curB - curA;
    return Math.floor(total / 1000);
  }

  /** Recorded study since a boundary (a Learning Review's toAt). Only closed sessions count. */
  function secondsSince(study, sinceMs, untilMs) {
    const s = normalize(study);
    return countSeconds(s.sessions.map(interval), sinceMs, untilMs);
  }

  /** Display only ("23 min today"): today's part of closed sessions plus the running one. */
  function todaySeconds(study, now) {
    const s = normalize(study);
    const midnight = new Date(now); midnight.setHours(0, 0, 0, 0);
    const list = s.sessions.map(interval);
    if (s.activeSession) list.push([ms(s.activeSession.startedAt), now]);
    return countSeconds(list, midnight.getTime(), now);
  }

  /** Lossless merge of two copies (two devices): sessions are united by id, never dropped.
      One running session at most: if two devices each started one, the older one is closed
      at its last heartbeat. */
  function merge(localCopy, remoteCopy) {
    const a = normalize(JSON.parse(JSON.stringify(localCopy || {})));
    const b = normalize(JSON.parse(JSON.stringify(remoteCopy || {})));
    const byId = new Map();
    for (const s of [...b.sessions, ...a.sessions]) {
      if (!s || !s.startedAt) continue;
      const id = s.id || `${s.startedAt}|${s.endedAt}`;
      const prev = byId.get(id);
      if (!prev || (ms(s.endedAt) || 0) < (ms(prev.endedAt) || 0)) byId.set(id, s);
    }
    // Finalized sessions are terminal, including stale/unconfirmed/superseded ends.
    const out = { activeSession: null, sessions: [] };
    const finalizedIds = [...new Set([...(a.finalizedIds || []), ...(b.finalizedIds || [])])].sort();
    if (finalizedIds.length) out.finalizedIds = finalizedIds;
    const actives = [a.activeSession, b.activeSession].filter(x => x && x.id && !byId.has(x.id) && !finalizedIds.includes(x.id));
    if (actives.length === 2 && actives[0].id === actives[1].id) {
      const [x, y] = actives;
      out.activeSession = Object.assign({}, x, { lastSeenAt: iso(Math.max(lastSeen(x), lastSeen(y))), confirmedAt: iso(Math.max(confirmedAt(x), confirmedAt(y))) });
    } else if (actives.length) {
      actives.sort((x, y) => lastSeen(y) - lastSeen(x) || String(x.id).localeCompare(String(y.id)));
      out.activeSession = actives[0];
      for (const other of actives.slice(1)) {
        const tmp = { activeSession: other, sessions: [] };
        const s = close(tmp, lastSeen(other), 'superseded');
        if (s) byId.set(s.id, s);
        else if (tmp.finalizedIds) out.finalizedIds = [...new Set([...(out.finalizedIds || []), ...tmp.finalizedIds])].sort();
      }
    }
    out.sessions = [...byId.values()].sort((x, y) => (ms(x.startedAt) || 0) - (ms(y.startedAt) || 0));
    return out;
  }

  return Object.freeze({
    HEARTBEAT_MS, HEARTBEAT_SYNC_MS, STALE_GAP_MS, CHECKIN_AFTER_MS, CHECKIN_WINDOW_MS, MIN_SESSION_SECONDS,
    normalize, start, stop, confirm, reconcile, checkInDue, elapsedSeconds,
    interval, countSeconds, secondsSince, todaySeconds, merge,
  });
});
