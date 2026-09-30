import { z } from 'zod/v4';
import { StructuredConversationMemorySchema } from '../conversation/contracts';

export const CharacterChatOutputSchema = z.object({
  reply: z.string().min(1).max(4000),
  // Coverage is set by the server from the causal graph, never by the model.
  memory: StructuredConversationMemorySchema.omit({ coveredThroughTurnIds: true }),
  assessmentCandidates: z.array(z.object({
    candidateType: z.enum(['comprehension','counterargument_response','comprehension_breakdown','concession_or_position_change','scaffolded_production','reasoning','language_sample']),
    relevantUserTurnIds: z.array(z.string()).min(1).max(4),
    note: z.string().max(320),
  })).max(5),
});

export const ConversationHelpOutputSchema = z.object({
  explanation: z.string().max(1600).nullable(),
  options: z.array(z.string().max(600)).max(3),
});

const issue = z.object({
  category: z.enum(['error', 'awkward', 'register', 'variant', 'suggestion']),
  original: z.string(),
  improved: z.string(),
  explanation: z.string(),
  turnIds: z.array(z.string()).min(1).max(6),
  recurring: z.boolean(),
  pedagogicallyRelevant: z.boolean(),
});

export const ConversationReviewOutputSchema = z.object({
  summary: z.string(),
  comprehension: z.object({
    verdict: z.enum(['clear_evidence', 'partial_evidence', 'breakdown', 'not_enough_evidence']),
    commentary: z.string(),
    evidence: z.array(z.object({ turnIds: z.array(z.string()).min(1), observation: z.string() })),
  }),
  interaction: z.object({ unexpectedTurns: z.string(), counterarguments: z.string(), communicationBreakdowns: z.array(z.string()) }),
  successfulLanguage: z.array(z.object({ text: z.string(), turnIds: z.array(z.string()).min(1), independentlyProduced: z.boolean() })),
  issues: z.array(issue),
  independentChunks: z.array(z.object({ chunk: z.string(), turnIds: z.array(z.string()).min(1) })),
  grammarControl: z.string(),
  reasoning: z.object({ commentary: z.string(), evidenceTurnIds: z.array(z.string()) }),
  reformulations: z.array(z.object({ original: z.string(), reformulated: z.string(), reason: z.string(), turnIds: z.array(z.string()).min(1) })),
  profileEvidenceCandidates: z.array(z.object({
    dimension: z.enum(['reading_comprehension','written_accuracy','written_range','vocabulary','grammar_control','critical_reasoning']),
    eligible: z.boolean(),
    score: z.number().min(0).max(10).nullable(),
    weight: z.number().min(0).max(0.5),
    turnIds: z.array(z.string()),
    rationale: z.string(),
  })),
});

