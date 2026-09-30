import type { ConversationEpisode, ConversationTurn } from './contracts';

/**
 * The deterministic causal core lives in public/conversation-engine.js so the browser and the
 * server apply identical rules (no AI, no network). Same relative path from src/ and dist/.
 */
interface ReviewSelection {
  turns: ConversationTurn[];
  turnIds: string[];
  omittedTurnIds: string[];
  excludedTurnIds: string[];
  samplingApplied: boolean;
  traceIdsUsed: string[];
  tracedUserTurnIds: string[];
  limits: { maxTraceUsers: number; maxAdditionalUsers: number; reviewCharBudget: number; budgetExceeded: boolean };
  problems: string[];
}
interface ConversationEngine {
  SCHEMA_VERSION: string;
  COURSE: string;
  LIMITS: { maxTraceEntries: number; maxTraceUsers: number; maxAdditionalUsers: number; reviewCharBudget: number };
  causalOrder(turns: ConversationTurn[]): { ordered: ConversationTurn[]; problems: string[] };
  ancestry(turns: ConversationTurn[], leafId: string): Set<string>;
  validate(conversation: ConversationEpisode): { hard: string[]; soft: string[] };
  effectiveProvenance(conversation: ConversationEpisode, turn: ConversationTurn): ConversationTurn['provenance'] | null;
  reviewSelection(conversation: ConversationEpisode, limits?: Partial<ReviewSelection['limits']>): ReviewSelection;
}
// eslint-disable-next-line @typescript-eslint/no-require-imports
export const engine: ConversationEngine = require('../../../public/conversation-engine.js');

export function causalOrder(turns: ConversationTurn[]) {
  return engine.causalOrder(turns);
}

export function validateConversation(conversation: ConversationEpisode) {
  return engine.validate(conversation);
}

/** Problems that block an AI call: invalid graph, open branches, or unacknowledged merge conflicts. */
export function blockingProblems(conversation: ConversationEpisode): string[] {
  const { hard, soft } = engine.validate(conversation);
  const acknowledged = new Set(conversation.mergeState?.acknowledged || []);
  const merge = conversation.mergeState?.requiresResolution ? conversation.mergeState.reasons.filter(r => !acknowledged.has(r)) : [];
  return Array.from(new Set([...hard, ...soft.filter(r => !acknowledged.has(r)), ...merge]));
}

export function recentCausalContext(conversation: ConversationEpisode, leafId: string, limit = 10): ConversationTurn[] {
  const byId = new Map(conversation.turns.map(t => [t.id, t]));
  const chain: ConversationTurn[] = [];
  let current = byId.get(leafId);
  const seen = new Set<string>();
  while (current && chain.length < limit && !seen.has(current.id)) {
    chain.push(current); seen.add(current.id);
    current = current.parentTurnId ? byId.get(current.parentTurnId) : undefined;
  }
  return chain.reverse();
}

export function buildReviewSelection(conversation: ConversationEpisode, limits?: Partial<ReviewSelection['limits']>) {
  return engine.reviewSelection(conversation, limits);
}
