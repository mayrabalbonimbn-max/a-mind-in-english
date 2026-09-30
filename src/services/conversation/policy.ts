import { ConversationEpisodeSchema, type CharacterCard, type ConversationEpisode } from './contracts';

// Default teacher moves the persona must not make (feedback belongs to the separate review).
const TEACHER_PATTERNS = [
  /\bgreat (answer|job|point)\b/i,
  /\bgood (answer|job)\b/i,
  /\bwell done\b/i,
  /\byou should say\b/i,
  /\bthe correct (form|way|sentence|word) is\b/i,
  /\b(a|the) better way to say\b/i,
  /\byour (grammar|english|sentence) (is|was)\b/i,
];

const normalise = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

/** Deterministic check of a character reply: no teacher moves, no leaked hidden context. */
export function characterReplyViolations(reply: string, card: CharacterCard): string[] {
  const problems: string[] = [];
  if (TEACHER_PATTERNS.some(p => p.test(reply))) problems.push('teacher_behaviour');
  const text = normalise(reply);
  if (/hidden_conversation_goals|supported_inferences|forbidden_claims|<canon>|source_excerpts/i.test(reply)) problems.push('internal_context_leak');
  if (card.conversationGoals.some(g => g.text.length >= 12 && text.includes(normalise(g.text)))) problems.push('internal_context_leak');
  return Array.from(new Set(problems));
}

const IDENTITY_FIELDS = ['conversationSchemaVersion', 'conversationId', 'course', 'unitId', 'characterId', 'characterCardVersion',
  'sourceContentVersion', 'continuesFrom', 'versionPolicy', 'mode', 'createdAt'] as const;

/**
 * Server-side rules for a conversation document written through sync: it must be a valid episode,
 * and relative to the stored copy nothing immutable may change. Turns and trace entries are
 * append-only, an ended episode stays ended at the same turn, and a completed review is frozen.
 */
export function conversationWriteProblems(key: string, data: unknown, stored: unknown): string[] {
  const parsed = ConversationEpisodeSchema.safeParse(data);
  if (!parsed.success) return [`invalid_conversation:${parsed.error.issues[0]?.path.join('.') || 'document'}`];
  const next = parsed.data;
  const problems: string[] = [];
  if (`conversation:${next.conversationId}` !== key) problems.push('conversation_key_mismatch');
  const previous = stored ? ConversationEpisodeSchema.safeParse(stored) : null;
  if (!previous || !previous.success) return problems;
  const prev: ConversationEpisode = previous.data;
  IDENTITY_FIELDS.forEach(f => { if ((prev[f] ?? null) !== (next[f] ?? null)) problems.push(`immutable_field_changed:${f}`); });
  const nextTurns = new Map(next.turns.map(t => [t.id, JSON.stringify(t)] as const));
  prev.turns.forEach(t => {
    const now = nextTurns.get(t.id);
    if (now === undefined) problems.push(`turn_removed:${t.id}`);
    else if (now !== JSON.stringify(t)) problems.push(`turn_modified:${t.id}`);
  });
  const nextTrace = new Set(next.assessmentTrace.map(a => a.id));
  prev.assessmentTrace.forEach(a => { if (!nextTrace.has(a.id)) problems.push(`trace_removed:${a.id}`); });
  const flagged = (reason: string) => (next.mergeState?.reasons || []).includes(reason) || (next.mergeState?.acknowledged || []).includes(reason);
  if (prev.status === 'ended' && (next.status !== 'ended' ||
      ((next.endedAtTurnId !== prev.endedAtTurnId || next.endedAt !== prev.endedAt) && !flagged('end_divergence')))) problems.push('ended_episode_changed');
  // A frozen review may only move aside when two concurrent reviews meet: it must stay preserved and the divergence exposed.
  if (prev.reviewState.status === 'complete' && JSON.stringify(prev.reviewState) !== JSON.stringify(next.reviewState)) {
    const preserved = next.reviewConflicts.some(r => JSON.stringify(r) === JSON.stringify(prev.reviewState));
    if (!preserved || !flagged('review_divergence') || next.reviewState.status !== 'complete') problems.push('frozen_review_changed');
  }
  const nextAlternates = new Set(next.reviewConflicts.map(r => JSON.stringify(r)));
  prev.reviewConflicts.forEach(r => { if (!nextAlternates.has(JSON.stringify(r))) problems.push('preserved_review_removed'); });
  return problems;
}

/** The first line is the card's deterministic opening for that mode (original or continuation), never client text. */
export function openingProblems(conversation: ConversationEpisode, card: CharacterCard): string[] {
  const set = conversation.continuesFrom ? card.continuationOpenings : card.openings;
  const expected = set ? set[conversation.mode] : null;
  return conversation.turns
    .filter(t => t.role === 'character' && !t.parentTurnId)
    .filter(t => !expected || t.text !== expected)
    .map(t => `opening_mismatch:${t.id}`);
}

/** The only card fields the browser ever receives. */
export function publicCharacter(card: CharacterCard) {
  return {
    id: card.id, version: card.version, sourceContentVersion: card.sourceContentVersion, unitId: card.unitId,
    displayName: card.displayName, subtitle: card.subtitle || '', disclosure: card.disclosure || '', targetLanguage: card.targetLanguage,
    openings: card.openings || null, continuationOpenings: card.continuationOpenings || null, modes: ['normal', 'challenge'] as const,
  };
}
