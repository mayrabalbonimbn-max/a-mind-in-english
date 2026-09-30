import { z } from 'zod/v4';

export const CONVERSATION_SCHEMA_VERSION = '1.0.0';
export const CHARACTER_CHAT_CONTRACT_VERSION = '1.0.0';
export const CONVERSATION_HELP_CONTRACT_VERSION = '1.0.0';
export const CONVERSATION_REVIEW_CONTRACT_VERSION = '1.0.0';
export const CONVERSATION_REVIEW_SCHEMA_VERSION = '1.0.0';

const id = z.string().regex(/^[A-Za-z0-9_-]{8,96}$/);
const isoDate = z.string().datetime({ offset: true });

export const ConversationTurnSchema = z.object({
  id,
  role: z.enum(['user', 'character', 'system_aid']),
  text: z.string().min(1).max(8000),
  parentTurnId: id.nullable(),
  replyToTurnId: id.nullable(),
  branchId: id,
  logicalClock: z.number().int().nonnegative(),
  clientId: id,
  clientSequence: z.number().int().nonnegative(),
  createdAt: isoDate,
  provenance: z.enum(['spontaneous', 'scaffolded', 'character', 'system_aid']),
  assistanceId: id.nullable().default(null),
  // Only on system_aid turns: which help produced it (formulate = HELP ME SAY THIS).
  aidMode: z.enum(['explain', 'formulate']).optional(),
});

export const AssessmentTraceEntrySchema = z.object({
  id,
  candidateType: z.enum([
    'comprehension',
    'counterargument_response',
    'comprehension_breakdown',
    'concession_or_position_change',
    'scaffolded_production',
    'reasoning',
    'language_sample',
  ]),
  turnIds: z.array(id).min(1).max(6),
  note: z.string().max(320),
  sourceCallId: id,
  createdAt: isoDate,
});

export const StructuredConversationMemorySchema = z.object({
  summary: z.string().max(2400),
  userPositions: z.array(z.string().max(320)).max(12),
  volunteeredFacts: z.array(z.string().max(320)).max(12),
  disagreements: z.array(z.string().max(320)).max(12),
  openQuestions: z.array(z.string().max(320)).max(10),
  positionChanges: z.array(z.string().max(320)).max(8),
  coveredThroughTurnIds: z.array(id).max(8),
});

export const EmptyConversationMemory = {
  summary: '', userPositions: [], volunteeredFacts: [], disagreements: [],
  openQuestions: [], positionChanges: [], coveredThroughTurnIds: [],
} as const;

const ReviewAuditSchema = z.object({
  reviewSchemaVersion: z.string().min(1).max(32),
  promptContractVersion: z.string().min(1).max(32),
  reviewedAt: isoDate,
  // Frozen snapshot of what the reviewed episode was built on.
  episodeVersions: z.object({
    conversationSchemaVersion: z.string().max(32),
    characterCardVersion: z.string().max(32),
    sourceContentVersion: z.string().max(64),
  }),
  turnIdsConsidered: z.array(id),
  omittedTurnIds: z.array(id),
  excludedTurnIds: z.array(id),
  samplingApplied: z.boolean(),
  selectionLimits: z.record(z.string(), z.union([z.number(), z.boolean()])),
  userTurnProvenance: z.object({ spontaneous: z.array(id), scaffolded: z.array(id) }),
  assessmentTraceIdsUsed: z.array(id),
  modelConfigIdentifier: z.object({
    provider: z.string().max(32),
    function: z.literal('conversationReview'),
    configuredModel: z.string().max(160),
    effectiveModel: z.string().max(160),
    reasoning: z.string().max(32),
  }),
  evidenceEventIds: z.array(z.string().max(180)),
});

export const ConversationReviewStateSchema = z.object({
  status: z.enum(['not_requested', 'pending', 'complete', 'failed']),
  revision: z.number().int().nonnegative(),
  result: z.unknown().nullable(),
  audit: ReviewAuditSchema.nullable(),
});

export const ConversationEpisodeSchema = z.object({
  conversationSchemaVersion: z.literal(CONVERSATION_SCHEMA_VERSION),
  conversationId: id,
  course: z.literal('mind'),
  unitId: z.string().regex(/^\d{2}$/),
  characterId: z.string().regex(/^[a-z0-9_-]{3,64}$/),
  characterCardVersion: z.string().min(1).max(32),
  sourceContentVersion: z.string().min(1).max(64),
  mode: z.enum(['normal', 'challenge']),
  status: z.enum(['active', 'ended']),
  createdAt: isoDate,
  updatedAt: isoDate,
  endedAt: isoDate.nullable(),
  // END CONVERSATION freezes the episode at this turn; turns off its path stay preserved but outside review.
  endedAtTurnId: id.nullable().default(null),
  continuesFrom: id.nullable(),
  // original = new episode; inherited = continuation on the same frozen versions; explicit_upgrade = learner chose newer canon.
  versionPolicy: z.enum(['original', 'inherited', 'explicit_upgrade']).default('original'),
  turns: z.array(ConversationTurnSchema).max(1000),
  structuredMemory: StructuredConversationMemorySchema,
  assessmentTrace: z.array(AssessmentTraceEntrySchema).max(1000),
  branchResolutions: z.array(z.object({ parentTurnId: id.nullable(), keptTurnId: id, resolvedAt: isoDate })).max(200).default([]),
  reviewState: ConversationReviewStateSchema,
  // A second frozen review that met this one in a merge: preserved, never discarded.
  reviewConflicts: z.array(ConversationReviewStateSchema).max(4).default([]),
  profileEvidenceRefs: z.array(z.string().max(180)).max(32),
  mergeState: z.object({
    requiresResolution: z.boolean(),
    reasons: z.array(z.string().max(2000)),
    preservedVariants: z.array(z.unknown()).max(50).default([]),
    acknowledged: z.array(z.string().max(2000)).max(100).default([]),
  }).optional(),
});

export type ConversationEpisode = z.infer<typeof ConversationEpisodeSchema>;
export type ConversationTurn = z.infer<typeof ConversationTurnSchema>;

export interface CharacterCard {
  id: string;
  version: string;
  sourceContentVersion: string;
  course: 'mind';
  unitId: string;
  displayName: string;
  // Public presentation (the only card fields ever sent to the browser).
  subtitle?: string;
  disclosure?: string;
  targetLanguage: 'en';
  identityDisclosure: string;
  knownFacts: Array<{ id: string; text: string }>;
  experiences?: string[];
  relationships?: string[];
  expressedBeliefs: string[];
  personalitySignals: string[];
  unresolvedQuestions: string[];
  conversationalStyle: string[];
  allowedInferences: string[];
  forbiddenClaims: string[];
  sourceExcerpts: Array<{ id: string; text: string; tags: string[] }>;
  conversationGoals: Array<{ id: string; text: string }>;
  // What Challenge Mode presses on (never hostility; conceding stays possible).
  challengeFocus?: string[];
  // Deterministic first lines: no AI call is spent on a greeting.
  openings?: { normal: string; challenge: string };
  continuationOpenings?: { normal: string; challenge: string };
}

export const CharacterChatRequestSchema = z.object({
  conversation: ConversationEpisodeSchema,
  userTurnId: id,
});

export const ConversationHelpRequestSchema = z.object({
  conversation: ConversationEpisodeSchema,
  mode: z.enum(['explain', 'formulate']),
  // explain: the character turn to explain. formulate: the turn the learner wants to answer (null = opening).
  targetTurnId: id.nullable(),
  intent: z.string().trim().max(2000).default(''),
});

export const ConversationReviewRequestSchema = z.object({
  conversation: ConversationEpisodeSchema,
});

