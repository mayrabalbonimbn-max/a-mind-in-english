import type { z } from 'zod/v4';
import type { ConversationReviewOutputSchema } from '../ai/characterSchemas';
import type { ConversationEpisode, ConversationTurn } from './contracts';
import { engine } from './context';

type ReviewOutput = z.infer<typeof ConversationReviewOutputSchema>;

/**
 * Deterministic post-processing of the model's review: the model proposes, this decides what may
 * count. Only considered USER turns can carry language evidence; character turns are context only;
 * scaffolded turns can be discussed but never support independent productive evidence.
 */
export function sanitizeReview(output: ReviewOutput, conversation: ConversationEpisode, consideredTurnIds: string[]) {
  const considered = new Set(consideredTurnIds);
  const byId = new Map(conversation.turns.map(t => [t.id, t] as const));
  const provenance = (id: string) => engine.effectiveProvenance(conversation, byId.get(id) as ConversationTurn);
  const userIds = (ids: string[]) => Array.from(new Set(ids.filter(id => considered.has(id) && byId.get(id)?.role === 'user')));
  const spontaneousIds = (ids: string[]) => userIds(ids).filter(id => provenance(id) === 'spontaneous');

  const comprehensionEvidence = output.comprehension.evidence
    .map(e => ({ ...e, turnIds: userIds(e.turnIds) }))
    .filter(e => e.turnIds.length);
  const independentComprehension = comprehensionEvidence.some(e => e.turnIds.some(id => provenance(id) === 'spontaneous'));
  const issues = output.issues
    .map(issue => ({ ...issue, turnIds: userIds(issue.turnIds) }))
    .filter(issue => issue.turnIds.length)
    .map(issue => ({
      ...issue,
      // Error Log stays manual; this only marks what may be offered for it.
      errorLogEligible: issue.category === 'error' || (issue.category === 'awkward' && (issue.recurring || issue.pedagogicallyRelevant)),
    }));

  const seenDimensions = new Set<string>();
  const revision = conversation.reviewState.revision + 1;
  const profileEvidenceCandidates = output.profileEvidenceCandidates.flatMap(candidate => {
    if (seenDimensions.has(candidate.dimension)) return [];
    seenDimensions.add(candidate.dimension);
    const turnIds = userIds(candidate.turnIds);
    const hasScaffold = turnIds.some(id => provenance(id) === 'scaffolded');
    // Reading needs concrete, independent comprehension tied to specific turns.
    const readingOk = candidate.dimension !== 'reading_comprehension' ||
      (independentComprehension && ['clear_evidence', 'partial_evidence'].includes(output.comprehension.verdict));
    const eligible = candidate.eligible && turnIds.length > 0 && !hasScaffold && readingOk && candidate.weight > 0 && candidate.score !== null;
    return [{
      ...candidate, turnIds, eligible, score: eligible ? candidate.score : null,
      evidenceEventId: eligible ? `character_conversation:${conversation.conversationId}:review:${revision}:${candidate.dimension}` : null,
    }];
  });

  const result = {
    ...output,
    comprehension: { ...output.comprehension, evidence: comprehensionEvidence },
    successfulLanguage: output.successfulLanguage
      .map(s => ({ ...s, turnIds: userIds(s.turnIds) }))
      .filter(s => s.turnIds.length)
      .map(s => ({ ...s, independentlyProduced: s.independentlyProduced && s.turnIds.every(id => provenance(id) === 'spontaneous') })),
    issues,
    independentChunks: output.independentChunks.map(c => ({ ...c, turnIds: spontaneousIds(c.turnIds) })).filter(c => c.turnIds.length),
    reasoning: { ...output.reasoning, evidenceTurnIds: userIds(output.reasoning.evidenceTurnIds) },
    reformulations: output.reformulations.map(r => ({ ...r, turnIds: userIds(r.turnIds) })).filter(r => r.turnIds.length),
    profileEvidenceCandidates,
  };
  const evidenceEventIds = profileEvidenceCandidates.flatMap(c => (c.evidenceEventId ? [c.evidenceEventId] : []));
  const consideredUsers = userIds(consideredTurnIds);
  const userTurnProvenance = {
    spontaneous: consideredUsers.filter(id => provenance(id) === 'spontaneous'),
    scaffolded: consideredUsers.filter(id => provenance(id) === 'scaffolded'),
  };
  return { result, evidenceEventIds, revision, userTurnProvenance };
}
