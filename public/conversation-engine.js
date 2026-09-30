/* Character conversation data engine: versioning, causal order, merge and review sampling.
   Pure and deterministic (no AI, no network): loaded by the browser and required by the server,
   so both sides apply exactly the same causal rules. Timestamps are never the ordering authority. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KLANG_CONVERSATIONS = factory();
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this), function () {
  'use strict';
  const SCHEMA_VERSION = '1.0.0';
  const COURSE = 'mind';
  const LIMITS = Object.freeze({ maxTraceEntries: 200, maxTraceUsers: 24, maxAdditionalUsers: 18, reviewCharBudget: 48000, maxPreservedVariants: 50 });
  // Merge reasons that stay until explicitly acknowledged; graph problems are recomputed instead.
  const STICKY = ['turn_id_collision', 'version_or_identity_mismatch', 'review_divergence', 'end_divergence', 'branch_resolution_divergence'];
  const clone = value => JSON.parse(JSON.stringify(value));
  const compare = (a, b) => (a.logicalClock || 0) - (b.logicalClock || 0) ||
    String(a.clientId).localeCompare(String(b.clientId)) ||
    (a.clientSequence || 0) - (b.clientSequence || 0) || String(a.id).localeCompare(String(b.id));
  const isDialogue = t => t.role !== 'system_aid';
  const byIdMap = turns => new Map((turns || []).map(t => [t.id, t]));

  function causalOrder(turns) {
    const byId = byIdMap(turns);
    const indegree = new Map((turns || []).map(t => [t.id, 0]));
    const children = new Map();
    const problems = [];
    (turns || []).forEach(turn => {
      if (!turn.parentTurnId) return;
      if (!byId.has(turn.parentTurnId)) { problems.push(`missing_parent:${turn.id}`); return; }
      children.set(turn.parentTurnId, [...(children.get(turn.parentTurnId) || []), turn]);
      indegree.set(turn.id, (indegree.get(turn.id) || 0) + 1);
    });
    const ready = (turns || []).filter(t => indegree.get(t.id) === 0).sort(compare);
    const ordered = [];
    while (ready.length) {
      const turn = ready.shift(); ordered.push(turn);
      (children.get(turn.id) || []).forEach(child => {
        const n = (indegree.get(child.id) || 1) - 1; indegree.set(child.id, n);
        if (n === 0) { ready.push(child); ready.sort(compare); }
      });
    }
    if (ordered.length !== (turns || []).length) problems.push('causal_cycle');
    return { ordered, problems };
  }

  /** Ids on the parent chain from leafId up to its root (inclusive). */
  function ancestry(turns, leafId) {
    const byId = byIdMap(turns), seen = new Set();
    let current = byId.get(leafId);
    while (current && !seen.has(current.id)) { seen.add(current.id); current = current.parentTurnId ? byId.get(current.parentTurnId) : undefined; }
    return seen;
  }

  function resolutionMap(resolutions) {
    const map = new Map();
    (resolutions || []).forEach(r => map.set(r.parentTurnId || 'root', r.keptTurnId));
    return map;
  }

  /** Dialogue turns sharing a parent are concurrent branches unless a resolution keeps one of them. */
  function branchProblems(turns, resolutions) {
    const children = new Map();
    (turns || []).filter(isDialogue).forEach(t => {
      const parent = t.parentTurnId || 'root';
      children.set(parent, [...(children.get(parent) || []), t]);
    });
    const kept = resolutionMap(resolutions);
    const problems = [];
    children.forEach((list, parent) => {
      if (list.length < 2) return;
      if (kept.has(parent) && list.some(t => t.id === kept.get(parent))) return;
      problems.push(`divergent_children:${parent}:${list.map(t => t.id).sort().join(',')}`);
    });
    return problems;
  }

  /** The formulation aid (if any) anchored at the same point a user turn answers. */
  function formulateAidFor(turns, parentTurnId) {
    return (turns || []).filter(t => t.role === 'system_aid' && t.aidMode === 'formulate' && (t.parentTurnId || null) === (parentTurnId || null)).sort(compare)[0] || null;
  }

  /** Conservative provenance: a user turn answering where formulation help was shown counts as scaffolded. */
  function effectiveProvenance(conversation, turn) {
    if (!turn || turn.role !== 'user') return turn ? turn.provenance : null;
    if (turn.provenance === 'scaffolded') return 'scaffolded';
    return formulateAidFor(conversation.turns, turn.parentTurnId) ? 'scaffolded' : 'spontaneous';
  }

  function provenanceProblems(turns) {
    const byId = byIdMap(turns), problems = [];
    const allowed = { user: ['spontaneous', 'scaffolded'], character: ['character'], system_aid: ['system_aid'] };
    (turns || []).forEach(t => {
      if (!(allowed[t.role] || []).includes(t.provenance)) problems.push(`role_provenance_mismatch:${t.id}`);
      if (t.role === 'character') {
        // Either an opening line (no parent) or a reply to the user turn it follows.
        const target = byId.get(t.replyToTurnId);
        const opening = !t.parentTurnId && !t.replyToTurnId;
        if (!opening && (!target || target.role !== 'user' || t.replyToTurnId !== t.parentTurnId)) problems.push(`character_reply_mismatch:${t.id}`);
        if (t.assistanceId) problems.push(`character_with_assistance:${t.id}`);
      }
      if (t.role === 'user' && t.replyToTurnId && t.replyToTurnId !== t.parentTurnId) problems.push(`reply_mismatch:${t.id}`);
      if (t.role === 'system_aid' && t.assistanceId !== t.id) problems.push(`aid_identity_mismatch:${t.id}`);
      if (t.role === 'user' && t.provenance === 'spontaneous' && t.assistanceId) problems.push(`spontaneous_with_assistance:${t.id}`);
      if (t.role === 'user' && t.provenance === 'scaffolded') {
        const aid = byId.get(t.assistanceId);
        // Help and the production it scaffolds answer the same turn: siblings under one parent.
        if (!aid || aid.role !== 'system_aid' || (aid.parentTurnId || null) !== (t.parentTurnId || null)) problems.push(`scaffold_link_invalid:${t.id}`);
      }
    });
    return problems;
  }

  function traceProblems(conversation) {
    const byId = byIdMap(conversation.turns), problems = [];
    (conversation.assessmentTrace || []).forEach(entry => {
      if ((entry.turnIds || []).some(id => !byId.has(id))) problems.push(`trace_unknown_turn:${entry.id}`);
      if (!(entry.turnIds || []).some(id => byId.get(id)?.role === 'user')) problems.push(`trace_without_user_turn:${entry.id}`);
    });
    return problems;
  }

  /** Turns preserved in an ended episode that are not on its frozen path (e.g. a device that kept writing). */
  function outsideEndedPath(conversation) {
    if (conversation.status !== 'ended') return [];
    const path = conversation.endedAtTurnId ? ancestry(conversation.turns, conversation.endedAtTurnId) : new Set();
    return (conversation.turns || []).filter(t => isDialogue(t) && !path.has(t.id)).map(t => t.id).sort();
  }

  /** Branches the learner explicitly set aside (chooseBranch): preserved, and already resolved. */
  function resolvedAway(conversation) {
    const out = new Set(), turns = conversation.turns || [];
    const walk = id => { out.add(id); turns.filter(t => t.parentTurnId === id).forEach(t => walk(t.id)); };
    (conversation.branchResolutions || []).forEach(r => turns
      .filter(t => isDialogue(t) && (t.parentTurnId || null) === (r.parentTurnId || null) && t.id !== r.keptTurnId)
      .forEach(t => walk(t.id)));
    return out;
  }

  /**
   * hard: the document is not a valid causal episode (always blocks AI calls).
   * soft: real conflicts that stay visible until the learner resolves or acknowledges them.
   */
  function validate(conversation) {
    const turns = conversation.turns || [];
    const hard = [];
    const seen = new Set();
    turns.forEach(t => { if (seen.has(t.id)) hard.push(`duplicate_turn_id:${t.id}`); seen.add(t.id); });
    hard.push(...causalOrder(turns).problems, ...provenanceProblems(turns), ...traceProblems(conversation));
    if (conversation.status === 'active' && conversation.endedAtTurnId) hard.push('ended_marker_on_active');
    if (conversation.status === 'ended' && !conversation.endedAtTurnId && turns.some(isDialogue)) hard.push('ended_without_frozen_turn');
    if (conversation.endedAtTurnId && !turns.some(t => t.id === conversation.endedAtTurnId)) hard.push('ended_turn_missing');
    const soft = [];
    if (conversation.status === 'ended') {
      const away = resolvedAway(conversation);
      const outside = outsideEndedPath(conversation).filter(id => !away.has(id));
      if (outside.length) soft.push(`turns_outside_ended_path:${outside.length}:${outside.slice(0, 20).join(',')}`);
    } else {
      soft.push(...branchProblems(turns, conversation.branchResolutions));
    }
    return { hard: Array.from(new Set(hard)), soft };
  }

  /** Last dialogue turn of the single unambiguous (or explicitly resolved) path; null if branches are open. */
  function activeLeaf(conversation) {
    const dialogue = (conversation.turns || []).filter(isDialogue);
    if (!dialogue.length) return null;
    const kept = resolutionMap(conversation.branchResolutions);
    const childrenOf = parent => dialogue.filter(t => (t.parentTurnId || 'root') === parent);
    let parent = 'root', leaf = null;
    for (let guard = 0; guard <= dialogue.length; guard++) {
      const list = childrenOf(parent);
      if (!list.length) return leaf;
      const next = list.length === 1 ? list[0] : list.find(t => t.id === kept.get(parent));
      if (!next) return null;
      leaf = next.id; parent = next.id;
    }
    return null;
  }

  function sticky(reasons) { return (reasons || []).filter(r => STICKY.some(p => r.startsWith(p))); }

  /** Recomputes graph conflicts; sticky merge conflicts stay until acknowledged. Turns are never removed. */
  function refreshMergeState(conversation) {
    const next = clone(conversation);
    const previous = next.mergeState || {};
    const acknowledged = previous.acknowledged || [];
    const { hard, soft } = validate(next);
    const reasons = Array.from(new Set([...sticky(previous.reasons), ...hard, ...soft])).filter(r => !acknowledged.includes(r));
    next.mergeState = { requiresResolution: reasons.length > 0, reasons, preservedVariants: previous.preservedVariants || [], acknowledged };
    return next;
  }

  function unionById(local, remote, kind, conflicts, preserved, tolerant) {
    const map = new Map();
    (remote || []).forEach(item => map.set(item.id, clone(item)));
    (local || []).forEach(item => {
      const existing = map.get(item.id);
      if (!existing) { map.set(item.id, clone(item)); return; }
      if (JSON.stringify(existing) === JSON.stringify(item)) return;
      if (tolerant) {
        // Content-derived ids (trace): same id = same candidate; keep the earliest record.
        if (String(item.createdAt) < String(existing.createdAt)) map.set(item.id, clone(item));
        return;
      }
      conflicts.push(`${kind}_id_collision:${item.id}`);
      preserved.push({ kind, source: 'local', item: clone(item) });
    });
    return Array.from(map.values());
  }

  const reviewRank = s => ({ complete: 3, pending: 2, failed: 1, not_requested: 0 }[s?.status] ?? 0);

  function mergeReview(local, remote, conflicts) {
    const l = local.reviewState, r = remote.reviewState;
    const alternates = [...(local.reviewConflicts || []), ...(remote.reviewConflicts || [])];
    if (l?.status === 'complete' && r?.status === 'complete' && JSON.stringify(l) !== JSON.stringify(r)) {
      conflicts.push('review_divergence');
      // Deterministic primary (earliest review); the other frozen review is preserved, never discarded.
      const [primary, other] = [l, r].sort((a, b) => String(a.audit?.reviewedAt).localeCompare(String(b.audit?.reviewedAt)) || JSON.stringify(a).localeCompare(JSON.stringify(b)));
      alternates.push(other);
      return { reviewState: clone(primary), reviewConflicts: dedupeJson(alternates).slice(0, 4) };
    }
    const chosen = reviewRank(r) > reviewRank(l) || (reviewRank(r) === reviewRank(l) && (r?.revision || 0) > (l?.revision || 0)) ? r : l;
    return { reviewState: clone(chosen || { status: 'not_requested', revision: 0, result: null, audit: null }), reviewConflicts: dedupeJson(alternates).slice(0, 4) };
  }

  function dedupeJson(list) {
    const seen = new Set();
    return (list || []).filter(x => { const k = JSON.stringify(x); if (seen.has(k)) return false; seen.add(k); return true; });
  }

  function memoryDepth(conversation, memory) {
    const leaf = (memory?.coveredThroughTurnIds || [])[0];
    return leaf ? ancestry(conversation.turns, leaf).size : 0;
  }

  function merge(local, remote) {
    const conflicts = [], preserved = [...(local.mergeState?.preservedVariants || []), ...(remote.mergeState?.preservedVariants || [])];
    for (const field of ['conversationSchemaVersion', 'conversationId', 'course', 'unitId', 'characterId', 'characterCardVersion', 'sourceContentVersion', 'continuesFrom', 'mode']) {
      if ((local[field] ?? null) !== (remote[field] ?? null)) conflicts.push(`version_or_identity_mismatch:${field}`);
    }
    const turns = unionById(local.turns, remote.turns, 'turn', conflicts, preserved, false);
    const assessmentTrace = unionById(local.assessmentTrace, remote.assessmentTrace, 'trace', conflicts, preserved, true);
    const resolutions = new Map();
    [...(remote.branchResolutions || []), ...(local.branchResolutions || [])].forEach(r => {
      const key = r.parentTurnId || 'root', old = resolutions.get(key);
      if (old && old.keptTurnId !== r.keptTurnId) conflicts.push(`branch_resolution_divergence:${key}`);
      else if (!old) resolutions.set(key, clone(r));
    });
    const ended = [local, remote].filter(c => c.status === 'ended');
    if (ended.length === 2 && local.endedAtTurnId !== remote.endedAtTurnId) conflicts.push('end_divergence');
    const endSource = ended.sort((a, b) => String(a.endedAt).localeCompare(String(b.endedAt)))[0] || null;
    const review = mergeReview(local, remote, conflicts);
    const merged = Object.assign({}, clone(remote), clone(local), {
      turns: causalOrder(turns).ordered,
      assessmentTrace,
      branchResolutions: Array.from(resolutions.values()),
      status: endSource ? 'ended' : 'active',
      endedAt: endSource ? endSource.endedAt : null,
      endedAtTurnId: endSource ? (endSource.endedAtTurnId ?? null) : null,
      reviewState: review.reviewState,
      reviewConflicts: review.reviewConflicts,
      updatedAt: [local.updatedAt, remote.updatedAt].filter(Boolean).sort().pop(),
      profileEvidenceRefs: Array.from(new Set([...(remote.profileEvidenceRefs || []), ...(local.profileEvidenceRefs || [])])),
    });
    // Derived memory: keep whichever summary covers the deeper point of the conversation (rebuildable).
    merged.structuredMemory = clone(memoryDepth(merged, remote.structuredMemory) > memoryDepth(merged, local.structuredMemory) ? remote.structuredMemory : local.structuredMemory);
    merged.mergeState = {
      requiresResolution: false,
      reasons: [...sticky(local.mergeState?.reasons), ...sticky(remote.mergeState?.reasons), ...conflicts],
      preservedVariants: dedupeJson(preserved).slice(0, LIMITS.maxPreservedVariants),
      acknowledged: Array.from(new Set([...(local.mergeState?.acknowledged || []), ...(remote.mergeState?.acknowledged || [])])),
    };
    return refreshMergeState(merged);
  }

  function assertWritable(conversation) {
    if (conversation.status !== 'active') throw new Error('conversation_ended');
    if (conversation.mergeState?.requiresResolution) throw new Error('conversation_requires_resolution');
  }

  function appendTurn(conversation, turn) {
    if (turn.role !== 'system_aid') assertWritable(conversation);
    else if (conversation.mergeState?.requiresResolution) throw new Error('conversation_requires_resolution');
    // Meaning explanations may be requested on a frozen episode; formulation help may not.
    else if (conversation.status !== 'active' && turn.aidMode === 'formulate') throw new Error('conversation_ended');
    if ((conversation.turns || []).some(t => t.id === turn.id)) throw new Error('duplicate_turn_id');
    if (turn.parentTurnId && !(conversation.turns || []).some(t => t.id === turn.parentTurnId)) throw new Error('missing_parent');
    const next = clone(conversation); next.turns.push(clone(turn)); next.updatedAt = turn.createdAt;
    const problems = provenanceProblems(next.turns);
    if (problems.length) throw new Error(problems[0]);
    return next;
  }

  /** Builds a user turn with causal metadata; provenance is scaffolded whenever formulation help is linked. */
  function appendUserTurn(conversation, input) {
    assertWritable(conversation);
    const turns = conversation.turns || [];
    const parentTurnId = input.parentTurnId === undefined ? activeLeaf(conversation) : input.parentTurnId;
    const parent = turns.find(t => t.id === parentTurnId);
    const aid = input.assistanceId ? turns.find(t => t.id === input.assistanceId) : formulateAidFor(turns, parentTurnId);
    const siblings = turns.filter(t => isDialogue(t) && (t.parentTurnId || null) === (parentTurnId || null));
    const turn = {
      id: input.id, role: 'user', text: input.text,
      parentTurnId: parentTurnId || null, replyToTurnId: parent && parent.role === 'character' ? parent.id : null,
      branchId: parent && !siblings.length ? parent.branchId : (input.branchId || input.id),
      logicalClock: Math.max(0, ...turns.map(t => t.logicalClock || 0)) + 1,
      clientId: input.clientId, clientSequence: input.clientSequence, createdAt: input.createdAt,
      provenance: aid ? 'scaffolded' : 'spontaneous', assistanceId: aid ? aid.id : null,
    };
    return appendTurn(conversation, turn);
  }

  function chooseBranch(conversation, parentTurnId, keptTurnId, resolvedAt) {
    const kept = (conversation.turns || []).find(t => t.id === keptTurnId);
    if (!kept || (kept.parentTurnId || null) !== (parentTurnId || null)) throw new Error('invalid_branch_choice');
    const next = clone(conversation);
    next.branchResolutions = (next.branchResolutions || []).filter(r => (r.parentTurnId || null) !== (parentTurnId || null));
    next.branchResolutions.push({ parentTurnId: parentTurnId || null, keptTurnId, resolvedAt });
    return refreshMergeState(next);
  }

  function acknowledgeConflicts(conversation, reasons) {
    const next = clone(conversation);
    next.mergeState = Object.assign({ reasons: [], preservedVariants: [] }, next.mergeState || {});
    next.mergeState.acknowledged = Array.from(new Set([...(next.mergeState.acknowledged || []), ...(reasons || [])]));
    return refreshMergeState(next);
  }

  function createEpisode(input) {
    return {
      conversationSchemaVersion: SCHEMA_VERSION, conversationId: input.conversationId, course: COURSE, unitId: input.unitId,
      characterId: input.characterId, characterCardVersion: input.characterCardVersion, sourceContentVersion: input.sourceContentVersion,
      mode: input.mode || 'normal', status: 'active', createdAt: input.createdAt, updatedAt: input.createdAt, endedAt: null, endedAtTurnId: null,
      continuesFrom: input.continuesFrom || null, versionPolicy: input.versionPolicy || 'original',
      turns: [], structuredMemory: { summary: '', userPositions: [], volunteeredFacts: [], disagreements: [], openQuestions: [], positionChanges: [], coveredThroughTurnIds: [] },
      assessmentTrace: [], branchResolutions: [], reviewState: { status: 'not_requested', revision: 0, result: null, audit: null }, reviewConflicts: [], profileEvidenceRefs: [],
    };
  }

  /** END CONVERSATION: freezes the episode at the current unambiguous leaf. */
  function endConversation(conversation, endedAt) {
    assertWritable(conversation);
    const { hard, soft } = validate(conversation);
    if (hard.length || soft.length) throw new Error('conversation_requires_resolution');
    const leaf = activeLeaf(conversation);
    const next = clone(conversation);
    Object.assign(next, { status: 'ended', endedAt, endedAtTurnId: leaf, updatedAt: endedAt });
    return next;
  }

  /**
   * A later session is a new episode linked by continuesFrom. It inherits the frozen versions;
   * moving to a newer card/source is only possible explicitly and is recorded as such.
   * Memory starts empty: facts shared in one episode are not carried into another automatically.
   * With carryArgument, only the argument itself continues (positions, disagreements, open questions,
   * position changes); never volunteered personal facts or the free-text summary.
   */
  function createContinuation(previous, input) {
    if (previous.status !== 'ended') throw new Error('previous_episode_not_ended');
    const upgrade = input.upgrade || null;
    const next = createEpisode({
      conversationId: input.conversationId, unitId: previous.unitId, characterId: previous.characterId,
      characterCardVersion: upgrade ? upgrade.characterCardVersion : previous.characterCardVersion,
      sourceContentVersion: upgrade ? upgrade.sourceContentVersion : previous.sourceContentVersion,
      mode: input.mode || previous.mode, createdAt: input.createdAt, continuesFrom: previous.conversationId,
      versionPolicy: upgrade ? 'explicit_upgrade' : 'inherited',
    });
    if (input.carryArgument && previous.structuredMemory) {
      ['userPositions', 'disagreements', 'openQuestions', 'positionChanges'].forEach(k => { next.structuredMemory[k] = clone(previous.structuredMemory[k] || []); });
    }
    return next;
  }

  function evenSpread(list, count) {
    const take = Math.min(count, list.length), out = [];
    for (let i = 0; i < take; i++) out.push(list[take === 1 ? 0 : Math.round(i * (list.length - 1) / (take - 1))]);
    return out;
  }

  /**
   * Review evidence selection for long conversations: traced moments first, then a deterministic
   * spread of the remaining user turns, each with its causal neighbourhood, inside a size budget.
   * Everything left out is listed (never silent truncation). Ended episodes use only their frozen path.
   */
  function reviewSelection(conversation, limits) {
    const L = Object.assign({}, LIMITS, typeof limits === 'number' ? { maxAdditionalUsers: limits } : (limits || {}));
    const { ordered, problems } = causalOrder(conversation.turns || []);
    const excluded = new Set(outsideEndedPath(conversation));
    const pool = ordered.filter(t => !excluded.has(t.id) && !(t.role === 'system_aid' && t.parentTurnId && excluded.has(t.parentTurnId)));
    const byId = byIdMap(pool);
    const unitFor = user => {
      const ids = [];
      if (user.parentTurnId && byId.has(user.parentTurnId)) ids.push(user.parentTurnId);
      ids.push(user.id);
      if (user.assistanceId && byId.has(user.assistanceId)) ids.push(user.assistanceId);
      pool.filter(t => t.replyToTurnId === user.id).forEach(t => ids.push(t.id));
      return ids;
    };
    const users = pool.filter(t => t.role === 'user');
    const tracedIds = new Set();
    (conversation.assessmentTrace || []).forEach(a => (a.turnIds || []).forEach(id => { if (byId.get(id)?.role === 'user') tracedIds.add(id); }));
    const traced = evenSpread(users.filter(u => tracedIds.has(u.id)), L.maxTraceUsers);
    const tracedSet = new Set(traced.map(u => u.id));
    const spread = evenSpread(users.filter(u => !tracedIds.has(u.id)), L.maxAdditionalUsers);
    const selected = new Set();
    let chars = 0, budgetExceeded = false;
    [...traced, ...spread].forEach(user => {
      const fresh = unitFor(user).filter(id => !selected.has(id));
      const cost = fresh.reduce((n, id) => n + String(byId.get(id).text || '').length, 0);
      if (chars + cost > L.reviewCharBudget) { budgetExceeded = true; return; }
      chars += cost; fresh.forEach(id => selected.add(id));
    });
    const turns = pool.filter(t => selected.has(t.id));
    const omittedTurnIds = pool.filter(t => !selected.has(t.id)).map(t => t.id);
    const selectedUsers = new Set(turns.filter(t => t.role === 'user').map(t => t.id));
    const traceIdsUsed = (conversation.assessmentTrace || []).filter(a => (a.turnIds || []).some(id => selectedUsers.has(id))).map(a => a.id);
    return {
      turns, turnIds: turns.map(t => t.id), omittedTurnIds, excludedTurnIds: Array.from(excluded),
      samplingApplied: omittedTurnIds.length > 0, traceIdsUsed, tracedUserTurnIds: Array.from(tracedSet),
      limits: { maxTraceUsers: L.maxTraceUsers, maxAdditionalUsers: L.maxAdditionalUsers, reviewCharBudget: L.reviewCharBudget, budgetExceeded },
      problems,
    };
  }

  const MODALITY = { reading_comprehension: 'receptive', written_accuracy: 'productive', written_range: 'productive', vocabulary: 'systemic', grammar_control: 'systemic', critical_reasoning: 'cognitive' };

  /**
   * Adapter to the existing English Profile evidence shape. One reviewed conversation is one shared
   * context: at most one evidence per dimension, all with the same contextId, written channel only
   * (text chat never feeds spoken_production). Ineligible or scaffolded candidates produce nothing.
   * Same input -> same ids, so recomputing never duplicates.
   */
  function profileEvidenceFromReview(conversation) {
    const review = conversation && conversation.reviewState;
    if (!review || review.status !== 'complete' || !review.result) return [];
    const contextId = `character_conversation:${conversation.conversationId}`;
    const seen = new Set(), out = [];
    (review.result.profileEvidenceCandidates || []).forEach(c => {
      if (!c.eligible || !c.evidenceEventId || typeof c.score !== 'number' || !(c.weight > 0) || !MODALITY[c.dimension]) return;
      if (seen.has(c.evidenceEventId)) return; seen.add(c.evidenceEventId);
      out.push({
        id: c.evidenceEventId, source: 'character_conversation', contextId, unit: conversation.unitId,
        taskId: `conversation:${conversation.conversationId}`, modality: MODALITY[c.dimension], channel: 'written',
        dimensions: [c.dimension], contributions: { [c.dimension]: c.score }, weight: Math.min(c.weight, 0.5),
        turnIds: (c.turnIds || []).slice(), at: review.audit ? review.audit.reviewedAt : null,
      });
    });
    return out;
  }

  return {
    SCHEMA_VERSION, COURSE, LIMITS, causalOrder, ancestry, branchProblems, provenanceProblems, effectiveProvenance, formulateAidFor,
    validate, activeLeaf, refreshMergeState, merge, appendTurn, appendUserTurn, chooseBranch, acknowledgeConflicts,
    createEpisode, endConversation, createContinuation, reviewSelection, outsideEndedPath, profileEvidenceFromReview,
  };
});
