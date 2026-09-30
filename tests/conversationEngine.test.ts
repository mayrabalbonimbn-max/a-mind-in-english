import { describe, expect, it } from 'vitest';

const engine = require('../public/conversation-engine.js');
const t = (id: string, role: string, parentTurnId: string|null, logicalClock: number, clientId = 'device_a') => ({
  id, role, text: id, parentTurnId, replyToTurnId: role === 'character' ? parentTurnId : null,
  branchId: 'branch_0001', logicalClock, clientId, clientSequence: logicalClock,
  createdAt: `2026-09-30T00:00:${String(logicalClock).padStart(2, '0')}.000Z`,
  provenance: role === 'character' ? 'character' : 'spontaneous', assistanceId: null,
});
const episode = (turns: any[]) => ({
  conversationSchemaVersion: '1.0.0', conversationId: 'conversation_0001', course: 'mind', unitId: '01',
  characterId: 'fixture_character', characterCardVersion: '1.0.0', sourceContentVersion: 'u01-v1',
  mode: 'normal', status: 'active', createdAt: '2026-09-30T00:00:00.000Z', updatedAt: '2026-09-30T00:00:00.000Z', endedAt: null, continuesFrom: null,
  turns, structuredMemory: { summary: '', userPositions: [], volunteeredFacts: [], disagreements: [], openQuestions: [], positionChanges: [], coveredThroughTurnIds: [] },
  assessmentTrace: [], reviewState: { status: 'not_requested', revision: 0, result: null, audit: null }, profileEvidenceRefs: [],
});

describe('conversation causal data engine', () => {
  it('orders by parent causality even when timestamps and logical clocks are misleading', () => {
    const a = t('turn_0001', 'user', null, 20);
    const b = t('turn_0002', 'character', a.id, 2);
    const c = t('turn_0003', 'user', b.id, 1);
    expect(engine.causalOrder([c, b, a]).ordered.map((x: any) => x.id)).toEqual([a.id, b.id, c.id]);
  });

  it('preserves both device branches and marks them for explicit resolution', () => {
    const root = t('turn_root1', 'character', null, 1);
    const local = episode([root, t('turn_local', 'user', root.id, 2, 'device_a')]);
    const remote = episode([root, t('turn_remote', 'user', root.id, 2, 'device_b')]);
    const merged = engine.merge(local, remote);
    expect(merged.turns.map((x: any) => x.id)).toEqual(expect.arrayContaining(['turn_local', 'turn_remote']));
    expect(merged.mergeState.requiresResolution).toBe(true);
    expect(merged.mergeState.reasons.some((x: string) => x.startsWith('divergent_children:'))).toBe(true);
  });

  it('refuses silent card/source upgrades', () => {
    const local = episode([]); const remote = episode([]); remote.characterCardVersion = '2.0.0';
    const merged = engine.merge(local, remote);
    expect(merged.mergeState.reasons).toContain('version_or_identity_mismatch:characterCardVersion');
  });

  it('keeps every traced turn and adds a deterministic spread for long reviews', () => {
    const turns: any[] = [];
    for (let i = 0; i < 30; i++) turns.push(t(`turn_${String(i).padStart(4, '0')}`, i % 2 ? 'character' : 'user', i ? turns[i - 1].id : null, i));
    const conv = episode(turns);
    conv.assessmentTrace.push({ id: 'trace_0001', candidateType: 'reasoning', turnIds: ['turn_0014'], note: 'candidate', sourceCallId: 'call_00001', createdAt: '2026-09-30T00:00:30.000Z' });
    const a = engine.reviewSelection(conv, 4); const b = engine.reviewSelection(conv, 4);
    expect(a.turnIds).toEqual(b.turnIds);
    expect(a.turnIds).toContain('turn_0014');
    expect(a.samplingApplied).toBe(true);
    expect(a.omittedTurnIds.length).toBeGreaterThan(0);
  });
});


/* ───────────── Phase C: causal core, versioning, trace, merge, profile adapter ───────────── */
const profile = require('../public/profile.js');
const T = (m: number) => `2026-09-30T10:${String(m).padStart(2, '0')}:00.000Z`;
const fresh = (id = 'conversation_0001') => engine.createEpisode({ conversationId: id, unitId: '01', characterId: 'fixture_character', characterCardVersion: '1.0.0', sourceContentVersion: 'u01-v1', createdAt: T(0) });
let n = 0;
const say = (c: any, id: string, extra: any = {}) => engine.appendUserTurn(c, { id, text: id, clientId: extra.clientId || 'device_a', clientSequence: ++n, createdAt: extra.createdAt || T(1), ...extra });
const reply = (c: any, id: string, to: string, createdAt = T(2)) => {
  const parent = c.turns.find((x: any) => x.id === to);
  return engine.appendTurn(c, { id, role: 'character', text: id, parentTurnId: to, replyToTurnId: to, branchId: parent.branchId, logicalClock: Math.max(...c.turns.map((x: any) => x.logicalClock)) + 1, clientId: 'server_ai', clientSequence: 0, createdAt, provenance: 'character', assistanceId: null });
};
const aidAt = (c: any, id: string, parentTurnId: string | null, aidMode = 'formulate') => engine.appendTurn(c, { id, role: 'system_aid', text: 'help', aidMode, parentTurnId, replyToTurnId: parentTurnId, branchId: 'branch_aid01', logicalClock: 50, clientId: 'server_aid', clientSequence: 0, createdAt: T(3), provenance: 'system_aid', assistanceId: id });

describe('causality is independent of clocks', () => {
  it('a reply stamped earlier than its question (clock skew) still follows it', () => {
    let c = say(fresh(), 'user_q0001', { createdAt: T(30) });
    c = reply(c, 'char_r0001', 'user_q0001', T(5));
    c = say(c, 'user_q0002', { createdAt: T(1), clientId: 'device_b' });
    const shuffled = [...c.turns].reverse();
    expect(engine.causalOrder(shuffled).ordered.map((x: any) => x.id)).toEqual(['user_q0001', 'char_r0001', 'user_q0002']);
    expect(engine.validate(c)).toEqual({ hard: [], soft: [] });
  });

  it('concurrent branches stay explicit: no active leaf, no END, until the learner chooses', () => {
    let c = reply(say(fresh(), 'user_q0001'), 'char_r0001', 'user_q0001');
    const a = say(c, 'user_a0001', { clientId: 'device_a' });
    const b = say(c, 'user_b0001', { clientId: 'device_b', createdAt: T(0) });
    c = engine.merge(a, b);
    expect(c.turns.map((x: any) => x.id)).toEqual(expect.arrayContaining(['user_a0001', 'user_b0001']));
    expect(engine.activeLeaf(c)).toBeNull();
    expect(() => engine.endConversation(c, T(9))).toThrow('conversation_requires_resolution');
    expect(() => say(c, 'user_c0001')).toThrow('conversation_requires_resolution');
    const chosen = engine.chooseBranch(c, 'char_r0001', 'user_b0001', T(8));
    expect(chosen.mergeState.requiresResolution).toBe(false);
    expect(engine.activeLeaf(chosen)).toBe('user_b0001');
    expect(chosen.turns).toHaveLength(c.turns.length); // the other branch is preserved, not deleted
  });

  it('help is a causal sibling of the production it scaffolds; wrong anchors are rejected', () => {
    let c = reply(say(fresh(), 'user_q0001'), 'char_r0001', 'user_q0001');
    c = aidAt(c, 'aid_f00001', 'char_r0001');
    c = say(c, 'user_s0001');
    expect(c.turns.find((x: any) => x.id === 'user_s0001')).toMatchObject({ provenance: 'scaffolded', assistanceId: 'aid_f00001', parentTurnId: 'char_r0001' });
    const wrong = JSON.parse(JSON.stringify(c)); wrong.turns.find((x: any) => x.id === 'aid_f00001').parentTurnId = 'user_q0001';
    expect(engine.validate(wrong).hard).toContain('scaffold_link_invalid:user_s0001');
    const spont = JSON.parse(JSON.stringify(c)); Object.assign(spont.turns.find((x: any) => x.id === 'user_s0001'), { provenance: 'spontaneous' });
    expect(engine.validate(spont).hard).toContain('spontaneous_with_assistance:user_s0001');
    // Even if a client mislabels, a turn answering where formulation help was shown is treated as scaffolded.
    const unlabeled = JSON.parse(JSON.stringify(c)); Object.assign(unlabeled.turns.find((x: any) => x.id === 'user_s0001'), { provenance: 'spontaneous', assistanceId: null });
    expect(engine.effectiveProvenance(unlabeled, unlabeled.turns.find((x: any) => x.id === 'user_s0001'))).toBe('scaffolded');
  });

  it('a meaning explanation does not turn the next answer into scaffolded production', () => {
    let c = reply(say(fresh(), 'user_q0001'), 'char_r0001', 'user_q0001');
    c = aidAt(c, 'aid_e00001', 'char_r0001', 'explain');
    c = say(c, 'user_s0001');
    expect(c.turns.find((x: any) => x.id === 'user_s0001').provenance).toBe('spontaneous');
  });

  it('character turns may open the conversation but otherwise must answer a user turn', () => {
    const open = engine.appendTurn(fresh(), { id: 'char_open01', role: 'character', text: 'Hello.', parentTurnId: null, replyToTurnId: null, branchId: 'branch_0001', logicalClock: 0, clientId: 'server_ai', clientSequence: 0, createdAt: T(0), provenance: 'character', assistanceId: null });
    expect(engine.validate(say(open, 'user_q0001')).hard).toEqual([]);
    const bad = JSON.parse(JSON.stringify(open)); bad.turns[0].replyToTurnId = 'char_open01';
    expect(engine.validate(bad).hard).toContain('character_reply_mismatch:char_open01');
  });
});

describe('versioning, END and continuation', () => {
  it('history keeps its schema, card and source versions; merges never upgrade them', () => {
    const local = fresh(); const remote = { ...fresh(), characterCardVersion: '2.0.0', sourceContentVersion: 'u01-v2', conversationSchemaVersion: '9.9.9' };
    const merged = engine.merge(local, remote);
    expect(merged.mergeState.reasons).toEqual(expect.arrayContaining(['version_or_identity_mismatch:characterCardVersion', 'version_or_identity_mismatch:sourceContentVersion', 'version_or_identity_mismatch:conversationSchemaVersion']));
    expect([merged.characterCardVersion, merged.sourceContentVersion, merged.conversationSchemaVersion]).toEqual(['1.0.0', 'u01-v1', '1.0.0']);
  });

  it('END freezes the episode at the current leaf', () => {
    const c = engine.endConversation(reply(say(fresh(), 'user_q0001'), 'char_r0001', 'user_q0001'), T(9));
    expect(c).toMatchObject({ status: 'ended', endedAt: T(9), endedAtTurnId: 'char_r0001' });
    expect(() => say(c, 'user_q0002')).toThrow('conversation_ended');
  });

  it('a continuation is a new episode on the same frozen versions; upgrades are explicit and recorded', () => {
    const ended = engine.endConversation(reply(say(fresh(), 'user_q0001'), 'char_r0001', 'user_q0001'), T(9));
    const before = JSON.stringify(ended);
    expect(() => engine.createContinuation(fresh(), { conversationId: 'conversation_0002', createdAt: T(10) })).toThrow('previous_episode_not_ended');
    const next = engine.createContinuation(ended, { conversationId: 'conversation_0002', createdAt: T(10) });
    expect(next).toMatchObject({ continuesFrom: 'conversation_0001', versionPolicy: 'inherited', characterCardVersion: '1.0.0', sourceContentVersion: 'u01-v1', status: 'active', turns: [] });
    expect(next.structuredMemory.volunteeredFacts).toEqual([]);
    const upgraded = engine.createContinuation(ended, { conversationId: 'conversation_0003', createdAt: T(10), upgrade: { characterCardVersion: '2.0.0', sourceContentVersion: 'u01-v2' } });
    expect(upgraded).toMatchObject({ versionPolicy: 'explicit_upgrade', characterCardVersion: '2.0.0' });
    expect(JSON.stringify(ended)).toBe(before);
  });
});

describe('merge: no loss, real conflicts exposed', () => {
  it('two tabs appending in turn merge to the full history without conflict', () => {
    const a = say(fresh(), 'user_q0001');
    const b = reply(JSON.parse(JSON.stringify(a)), 'char_r0001', 'user_q0001');
    const m = engine.merge(a, b);
    expect(m.turns.map((x: any) => x.id)).toEqual(['user_q0001', 'char_r0001']);
    expect(m.mergeState.requiresResolution).toBe(false);
  });

  it('ended on one device, edited on another: every turn is kept and the conflict is visible', () => {
    const base = reply(say(fresh(), 'user_q0001'), 'char_r0001', 'user_q0001');
    const ended = engine.endConversation(base, T(9));
    const edited = say(JSON.parse(JSON.stringify(base)), 'user_late01');
    for (const m of [engine.merge(ended, edited), engine.merge(edited, ended)]) {
      expect(m.status).toBe('ended'); expect(m.endedAtTurnId).toBe('char_r0001');
      expect(m.turns.map((x: any) => x.id)).toContain('user_late01');
      expect(m.mergeState.reasons).toContain('turns_outside_ended_path:1:user_late01');
      const ack = engine.acknowledgeConflicts(m, m.mergeState.reasons);
      expect(ack.mergeState.requiresResolution).toBe(false);
      expect(engine.reviewSelection(ack).excludedTurnIds).toEqual(['user_late01']);
    }
  });

  it('a frozen review is never replaced by an unreviewed copy; two frozen reviews are both preserved', () => {
    const ended = engine.endConversation(say(fresh(), 'user_q0001'), T(9));
    const reviewA = { status: 'complete', revision: 1, result: { summary: 'a' }, audit: { reviewedAt: T(20) } };
    const reviewB = { status: 'complete', revision: 1, result: { summary: 'b' }, audit: { reviewedAt: T(21) } };
    expect(engine.merge(ended, { ...ended, reviewState: reviewA }).reviewState).toEqual(reviewA);
    expect(engine.merge({ ...ended, reviewState: reviewA }, ended).reviewState).toEqual(reviewA);
    const both = engine.merge({ ...ended, reviewState: reviewB }, { ...ended, reviewState: reviewA });
    expect(both.reviewState).toEqual(reviewA);
    expect(both.reviewConflicts).toEqual([reviewB]);
    expect(both.mergeState.reasons).toContain('review_divergence');
  });

  it('an immutable id reused with different content is preserved and flagged, never overwritten silently', () => {
    const a = say(fresh(), 'user_q0001');
    const b = JSON.parse(JSON.stringify(a)); b.turns[0].text = 'edited elsewhere';
    const m = engine.merge(a, b);
    expect(m.mergeState.reasons).toContain('turn_id_collision:user_q0001');
    expect(m.mergeState.preservedVariants.map((v: any) => v.item.text)).toContain('user_q0001');
    expect(engine.refreshMergeState(m).mergeState.reasons).toContain('turn_id_collision:user_q0001'); // sticky
  });

  it('derived memory follows the deeper causal point; the trace is merged independently', () => {
    let c = reply(say(fresh(), 'user_q0001'), 'char_r0001', 'user_q0001');
    c = reply(say(c, 'user_q0002'), 'char_r0002', 'user_q0002');
    const shallow = { ...c, structuredMemory: { ...c.structuredMemory, summary: 'shallow', coveredThroughTurnIds: ['char_r0001'] } };
    const deep = { ...c, structuredMemory: { ...c.structuredMemory, summary: 'deep', coveredThroughTurnIds: ['char_r0002'] } };
    expect(engine.merge(shallow, deep).structuredMemory.summary).toBe('deep');
    expect(engine.merge(deep, shallow).structuredMemory.summary).toBe('deep');
    const entry = { id: 'trace_same0001', candidateType: 'reasoning', turnIds: ['user_q0002'], note: 'x', sourceCallId: 'call_00000001', createdAt: T(5) };
    const m = engine.merge({ ...deep, assessmentTrace: [entry] }, { ...shallow, assessmentTrace: [{ ...entry, note: 'retry', createdAt: T(4) }] });
    expect(m.assessmentTrace).toEqual([{ ...entry, note: 'retry', createdAt: T(4) }]);
    expect(m.mergeState.requiresResolution).toBe(false);
    expect(m.structuredMemory.summary).toBe('deep');
  });
});

describe('assessment trace and review selection', () => {
  it('trace entries must point at real turns including a user turn', () => {
    const c = say(fresh(), 'user_q0001');
    c.assessmentTrace.push({ id: 'trace_bad00001', candidateType: 'reasoning', turnIds: ['ghost_turn1'], note: '', sourceCallId: 'call_00000001', createdAt: T(1) });
    expect(engine.validate(c).hard).toEqual(expect.arrayContaining(['trace_unknown_turn:trace_bad00001', 'trace_without_user_turn:trace_bad00001']));
  });

  it('long conversations: bounded, deterministic, traced moments first, omissions listed', () => {
    let c = fresh();
    for (let i = 0; i < 120; i++) { c = say(c, `user_${String(i).padStart(5, '0')}`, { text: 'x'.repeat(300) }); c = reply(c, `char_${String(i).padStart(5, '0')}`, `user_${String(i).padStart(5, '0')}`); }
    for (let i = 0; i < 60; i++) c.assessmentTrace.push({ id: `trace_${String(i).padStart(6, '0')}`, candidateType: 'reasoning', turnIds: [`user_${String(i * 2).padStart(5, '0')}`], note: '', sourceCallId: 'call_00000001', createdAt: T(1) });
    const a = engine.reviewSelection(c), b = engine.reviewSelection(c);
    expect(a.turnIds).toEqual(b.turnIds);
    const users = a.turns.filter((x: any) => x.role === 'user');
    expect(users.length).toBeLessThanOrEqual(engine.LIMITS.maxTraceUsers + engine.LIMITS.maxAdditionalUsers);
    expect(a.tracedUserTurnIds).toHaveLength(engine.LIMITS.maxTraceUsers);
    expect(a.turns.reduce((s: number, x: any) => s + x.text.length, 0)).toBeLessThanOrEqual(engine.LIMITS.reviewCharBudget);
    expect(a.turnIds.length + a.omittedTurnIds.length).toBe(c.turns.length);
    expect(a.samplingApplied).toBe(true);
    // Every selected user turn comes with the character reply that answered it.
    users.forEach((u: any) => expect(a.turnIds).toContain(u.id.replace('user_', 'char_')));
  });
});

describe('profile evidence adapter (one conversation = one shared context)', () => {
  const reviewed = (candidates: any[]) => ({
    ...engine.endConversation(say(fresh(), 'user_q0001'), T(9)),
    reviewState: { status: 'complete', revision: 1, result: { profileEvidenceCandidates: candidates }, audit: { reviewedAt: T(20) } },
  });
  const cand = (dimension: string, over: any = {}) => ({ dimension, eligible: true, score: 8, weight: 0.5, turnIds: ['user_q0001'], rationale: 'r', evidenceEventId: `character_conversation:conversation_0001:review:1:${dimension}`, ...over });

  it('emits written, conversation-scoped evidence only for eligible candidates; never speaking', () => {
    const ev = engine.profileEvidenceFromReview(reviewed([cand('written_accuracy'), cand('vocabulary', { eligible: false, evidenceEventId: null }), cand('spoken_production'), cand('critical_reasoning')]));
    expect(ev.map((e: any) => e.dimensions[0])).toEqual(['written_accuracy', 'critical_reasoning']);
    ev.forEach((e: any) => { expect(e.channel).toBe('written'); expect(e.contextId).toBe('character_conversation:conversation_0001'); expect(e.contributions).not.toHaveProperty('spoken_production'); });
    expect(engine.profileEvidenceFromReview(fresh())).toEqual([]);
  });

  it('recomputing is idempotent and a single conversation cannot establish a level or high confidence', () => {
    const conv = reviewed([cand('written_accuracy', { score: 10 }), cand('reading_comprehension', { score: 10 })]);
    const once = engine.profileEvidenceFromReview(conv), twice = engine.profileEvidenceFromReview(conv);
    expect(twice).toEqual(once);
    const unique = Array.from(new Map([...once, ...twice].map((e: any) => [e.id, e])).values());
    expect(unique).toHaveLength(2);
    for (const dim of profile.DIMENSIONS) {
      const r = profile.computeDimensionProfile(unique, dim);
      expect(r.level).toBeNull();
      expect(r.confidence).not.toBe('high');
    }
  });
});

describe('Phase D engine additions', () => {
  it('a branch the learner set aside is not an end conflict, but stays excluded from review', () => {
    let c = reply(say(fresh(), 'user_q0001'), 'char_r0001', 'user_q0001');
    const merged = engine.merge(say(c, 'user_a0001'), say(c, 'user_b0001', { clientId: 'device_b' }));
    const chosen = engine.chooseBranch(merged, 'char_r0001', 'user_a0001', T(8));
    const ended = engine.endConversation(chosen, T(9));
    expect(engine.validate(ended)).toEqual({ hard: [], soft: [] });
    expect(ended.turns.map((t: any) => t.id)).toContain('user_b0001');
    expect(engine.reviewSelection(ended).excludedTurnIds).toEqual(['user_b0001']);
    // A device writing after END is still a real conflict.
    const late = engine.merge(ended, say(JSON.parse(JSON.stringify(chosen)), 'user_late01'));
    expect(late.mergeState.reasons.some((r: string) => r.startsWith('turns_outside_ended_path:1:user_late01'))).toBe(true);
  });

  it('a continuation may carry the argument, never volunteered facts or the free summary', () => {
    const base = say(fresh(), 'user_q0001');
    base.structuredMemory = { summary: 'Lives in Recife with two cats.', userPositions: ['Relearning is only a head start.'], volunteeredFacts: ['Lives in Recife'], disagreements: ['Metaphor too comforting'], openQuestions: ['What would falsify it?'], positionChanges: [], coveredThroughTurnIds: [] };
    const ended = engine.endConversation(base, T(9));
    const next = engine.createContinuation(ended, { conversationId: 'conversation_0002', createdAt: T(10), carryArgument: true });
    expect(next.structuredMemory).toMatchObject({ summary: '', volunteeredFacts: [], userPositions: ['Relearning is only a head start.'], disagreements: ['Metaphor too comforting'], openQuestions: ['What would falsify it?'] });
    expect(engine.createContinuation(ended, { conversationId: 'conversation_0003', createdAt: T(10) }).structuredMemory.userPositions).toEqual([]);
  });
});
