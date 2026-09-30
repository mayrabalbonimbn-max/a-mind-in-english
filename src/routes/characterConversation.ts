import { createHash, randomUUID } from 'crypto';
import { Router, Request, Response, NextFunction } from 'express';
import { requireAuth, requireNonDemo } from '../middleware/auth';
import { createRateLimiter } from '../middleware/rateLimit';
import { config } from '../config';
import { AiRequestError, AiUnavailableError, callStructuredWithUsage, isAiAvailable } from '../services/ai/provider';
import { CharacterChatOutputSchema, ConversationHelpOutputSchema, ConversationReviewOutputSchema } from '../services/ai/characterSchemas';
import { buildCharacterChatPrompt, buildConversationHelpPrompt, buildConversationReviewPrompt } from '../services/ai/characterPrompts';
import {
  AssessmentTraceEntrySchema,
  CHARACTER_CHAT_CONTRACT_VERSION,
  CONVERSATION_HELP_CONTRACT_VERSION,
  CONVERSATION_REVIEW_CONTRACT_VERSION,
  CONVERSATION_REVIEW_SCHEMA_VERSION,
  CharacterChatRequestSchema,
  ConversationHelpRequestSchema,
  ConversationReviewRequestSchema,
  type CharacterCard,
  type ConversationEpisode,
} from '../services/conversation/contracts';
import { blockingProblems, engine, validateConversation } from '../services/conversation/context';
import { currentCharacterCards, getCharacterCard } from '../services/conversation/registry';
import { characterReplyViolations, openingProblems, publicCharacter } from '../services/conversation/policy';
import { sanitizeReview } from '../services/conversation/review';

export const characterConversationRouter = Router();
characterConversationRouter.use(requireAuth);
const paidFeature = requireNonDemo('Character conversations', 'demo_ai_disabled');
const HOUR = 60 * 60 * 1000;
const chatLimiter = createRateLimiter({ windowMs: HOUR, max: config.ai.characterChatPerHour, keyGenerator: req => `character:${req.user!.id}` });
const helpLimiter = createRateLimiter({ windowMs: HOUR, max: config.ai.conversationHelpPerHour, keyGenerator: req => `conversation-help:${req.user!.id}` });
const reviewLimiter = createRateLimiter({ windowMs: HOUR, max: config.ai.conversationReviewPerHour, keyGenerator: req => `conversation-review:${req.user!.id}` });

// Metadata only: never the transcript, the prompt or personal content.
function logCall(endpoint: string, started: number, status: number, model?: string) {
  console.info(`[ai] endpoint=${endpoint} status=${status} ms=${Date.now() - started}${model ? ` model=${model}` : ''}`);
}

function sendError(res: Response, err: unknown) {
  if (err instanceof AiUnavailableError) { res.status(503).json({ error: 'ai_unavailable', message: 'AI is not configured on this server.' }); return; }
  if (err instanceof AiRequestError) {
    const status = err.code === 'timeout' ? 504 : err.code === 'rate_limited' ? 429 : 502;
    res.status(status).json({ error: `ai_${err.code}`, message: err.message }); return;
  }
  console.error('[ai] character conversation failed', (err as Error)?.name);
  res.status(500).json({ error: 'internal_error', message: 'AI request failed' });
}

function requireFunction(name: 'characterChat'|'conversationHelp'|'conversationReview') {
  return (_req: Request, res: Response, next: NextFunction) => {
    if (!isAiAvailable(name)) { res.status(503).json({ error: 'ai_unavailable', function: name, message: 'This conversation function is not configured.' }); return; }
    next();
  };
}

function resolveCard(conversation: ConversationEpisode, res: Response): CharacterCard | null {
  const card = getCharacterCard(conversation.characterId, conversation.characterCardVersion);
  if (!card) { res.status(409).json({ error: 'character_version_unavailable', message: 'This historical character-card version is not available.' }); return null; }
  if (card.course !== conversation.course || card.unitId !== conversation.unitId || card.sourceContentVersion !== conversation.sourceContentVersion) {
    res.status(409).json({ error: 'conversation_version_mismatch', message: 'Conversation canon cannot be upgraded or changed silently.' }); return null;
  }
  return card;
}

/** Content-derived id: the same candidate for the same turns is one trace entry, however often it is reported. */
const traceId = (type: string, turnIds: string[]) => `trace_${createHash('sha256').update(`${type}|${[...turnIds].sort().join(',')}`).digest('hex').slice(0, 32)}`;

// Public presentation of the unit's characters (no canon, goals or excerpts). No AI call, so Demo may see it.
characterConversationRouter.get('/characters/:unitId', (req, res): void => {
  const unitId = String(req.params.unitId || '');
  if (!/^\d{2}$/.test(unitId)) { res.status(400).json({ error: 'invalid_unit' }); return; }
  res.json({
    success: true,
    characters: currentCharacterCards(unitId).map(publicCharacter),
    available: { characterChat: isAiAvailable('characterChat'), conversationHelp: isAiAvailable('conversationHelp'), conversationReview: isAiAvailable('conversationReview') },
    demo: !!req.user?.isDemo,
  });
});

characterConversationRouter.post('/character-chat', paidFeature, requireFunction('characterChat'), chatLimiter, async (req, res): Promise<void> => {
  const started = Date.now();
  const parsed = CharacterChatRequestSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid conversation' }); return; }
  const conversation = parsed.data.conversation;
  if (conversation.status !== 'active') { res.status(409).json({ error: 'conversation_not_writable', message: 'This conversation has ended.' }); return; }
  const problems = blockingProblems(conversation);
  if (problems.length) { res.status(409).json({ error: 'conversation_requires_resolution', problems, message: 'Resolve the conversation state before sending another message.' }); return; }
  const card = resolveCard(conversation, res); if (!card) return;
  const userTurn = conversation.turns.find(t => t.id === parsed.data.userTurnId);
  if (!userTurn || userTurn.role !== 'user') { res.status(400).json({ error: 'invalid_user_turn', message: 'The reply target must be a user turn.' }); return; }
  const opening = openingProblems(conversation, card);
  if (opening.length) { res.status(409).json({ error: 'opening_mismatch', problems: opening, message: 'The conversation must start with the character\'s own opening.' }); return; }
  if (conversation.turns.some(t => t.role === 'character' && t.replyToTurnId === userTurn.id)) {
    res.status(409).json({ error: 'turn_already_answered', message: 'This message already has a reply.' }); return;
  }
  const prompt = buildCharacterChatPrompt(card, conversation, userTurn.id);
  try {
    const callId = randomUUID();
    const { output, usage } = await callStructuredWithUsage({ fn: 'characterChat', name: 'character_chat', system: prompt.system, user: prompt.user, schema: CharacterChatOutputSchema, maxTokens: 900 });
    const violations = characterReplyViolations(output.reply, card);
    if (violations.length) { logCall('character-chat', started, 502, usage?.model); res.status(502).json({ error: 'ai_character_contract_violation', violations, message: 'The reply broke the character contract and was discarded.' }); return; }
    const knownUserIds = new Set(conversation.turns.filter(t => t.role === 'user').map(t => t.id));
    const characterTurnId = randomUUID();
    const createdAt = new Date().toISOString();
    const characterTurn = {
      id: characterTurnId, role: 'character' as const, text: output.reply,
      parentTurnId: userTurn.id, replyToTurnId: userTurn.id, branchId: userTurn.branchId,
      logicalClock: Math.max(...conversation.turns.map(t => t.logicalClock), 0) + 1,
      clientId: 'server_ai', clientSequence: userTurn.clientSequence,
      createdAt, provenance: 'character' as const, assistanceId: null,
    };
    const existingTrace = new Set(conversation.assessmentTrace.map(a => a.id));
    const room = Math.max(0, engine.LIMITS.maxTraceEntries - conversation.assessmentTrace.length);
    const trace = output.assessmentCandidates.flatMap(candidate => {
      const turnIds = Array.from(new Set(candidate.relevantUserTurnIds.filter(id => knownUserIds.has(id))));
      if (!turnIds.length) return [];
      const id = traceId(candidate.candidateType, turnIds);
      if (existingTrace.has(id)) return [];
      existingTrace.add(id);
      return [AssessmentTraceEntrySchema.parse({ id, candidateType: candidate.candidateType, turnIds: [...turnIds, characterTurnId], note: candidate.note, sourceCallId: callId, createdAt })];
    }).slice(0, room);
    // Derived, conversation-scoped memory: coverage is the new causal leaf, set here rather than by the model.
    const structuredMemory = { ...output.memory, coveredThroughTurnIds: [characterTurnId] };
    logCall('character-chat', started, 200, usage?.model);
    res.json({ success: true, contractVersion: CHARACTER_CHAT_CONTRACT_VERSION, callId, characterTurn, structuredMemory, assessmentTraceEntries: trace, model: usage?.model || config.ai.models.characterChat });
  } catch (err) { logCall('character-chat', started, err instanceof AiRequestError ? 502 : 500); sendError(res, err); }
});

characterConversationRouter.post('/conversation-help', paidFeature, requireFunction('conversationHelp'), helpLimiter, async (req, res): Promise<void> => {
  const started = Date.now();
  const parsed = ConversationHelpRequestSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid request' }); return; }
  const { conversation, mode, targetTurnId, intent } = parsed.data;
  const { hard } = validateConversation(conversation);
  if (hard.length) { res.status(409).json({ error: 'invalid_causal_graph', problems: hard }); return; }
  if (mode === 'formulate' && (conversation.status !== 'active' || conversation.mergeState?.requiresResolution)) {
    res.status(409).json({ error: 'conversation_not_writable', message: 'Formulation help is only available in an open conversation.' }); return;
  }
  const card = resolveCard(conversation, res); if (!card) return;
  const target = targetTurnId ? conversation.turns.find(t => t.id === targetTurnId) : null;
  if (mode === 'explain' && target?.role !== 'character') { res.status(400).json({ error: 'invalid_target_turn', message: 'Choose a character message to explain.' }); return; }
  if (mode === 'formulate' && targetTurnId && (!target || target.role === 'system_aid')) { res.status(400).json({ error: 'invalid_target_turn', message: 'Choose the message you want to answer.' }); return; }
  if (mode === 'formulate' && !intent.trim()) { res.status(400).json({ error: 'validation_error', message: 'Describe what you want to say.' }); return; }
  const prompt = buildConversationHelpPrompt(card, conversation, mode, targetTurnId, intent);
  try {
    const { output, usage } = await callStructuredWithUsage({ fn: 'conversationHelp', name: 'conversation_help', system: prompt.system, user: prompt.user, schema: ConversationHelpOutputSchema, maxTokens: 600 });
    const assistanceId = randomUUID();
    const text = (mode === 'explain' ? output.explanation : output.options.join('\n')) || '';
    // The help is a causal sibling of the answer it supports: same parent, marked system_aid.
    const aidTurn = text.trim() ? {
      id: assistanceId, role: 'system_aid' as const, text, aidMode: mode,
      parentTurnId: targetTurnId, replyToTurnId: targetTurnId, branchId: target?.branchId || assistanceId,
      logicalClock: Math.max(...conversation.turns.map(t => t.logicalClock), 0) + 1,
      clientId: 'server_aid', clientSequence: 0, createdAt: new Date().toISOString(), provenance: 'system_aid' as const, assistanceId,
    } : null;
    logCall('conversation-help', started, 200, usage?.model);
    res.json({ success: true, contractVersion: CONVERSATION_HELP_CONTRACT_VERSION, assistanceId, scaffoldRequired: mode === 'formulate', aidTurn, ...output });
  } catch (err) { logCall('conversation-help', started, err instanceof AiRequestError ? 502 : 500); sendError(res, err); }
});

characterConversationRouter.post('/conversation-review', paidFeature, requireFunction('conversationReview'), reviewLimiter, async (req, res): Promise<void> => {
  const started = Date.now();
  const parsed = ConversationReviewRequestSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid conversation' }); return; }
  const conversation = parsed.data.conversation;
  if (conversation.status !== 'ended') { res.status(409).json({ error: 'conversation_not_ended', message: 'End the conversation before reviewing it.' }); return; }
  if (conversation.reviewState.status === 'complete') { res.status(409).json({ error: 'review_frozen', message: 'This conversation already has a frozen review.' }); return; }
  const problems = blockingProblems(conversation);
  if (problems.length) { res.status(409).json({ error: 'unresolved_conversation_branch', problems, message: 'Resolve conversation conflicts before review.' }); return; }
  const card = resolveCard(conversation, res); if (!card) return;
  const prompt = buildConversationReviewPrompt(card, conversation);
  try {
    const { output, usage } = await callStructuredWithUsage({ fn: 'conversationReview', name: 'conversation_review', system: prompt.system, user: prompt.user, schema: ConversationReviewOutputSchema, maxTokens: 3200 });
    const { result, evidenceEventIds, revision, userTurnProvenance } = sanitizeReview(output, conversation, prompt.selection.turnIds);
    const audit = {
      reviewSchemaVersion: CONVERSATION_REVIEW_SCHEMA_VERSION,
      promptContractVersion: CONVERSATION_REVIEW_CONTRACT_VERSION,
      reviewedAt: new Date().toISOString(),
      episodeVersions: { conversationSchemaVersion: conversation.conversationSchemaVersion, characterCardVersion: conversation.characterCardVersion, sourceContentVersion: conversation.sourceContentVersion },
      turnIdsConsidered: prompt.selection.turnIds,
      omittedTurnIds: prompt.selection.omittedTurnIds,
      excludedTurnIds: prompt.selection.excludedTurnIds,
      samplingApplied: prompt.selection.samplingApplied,
      selectionLimits: prompt.selection.limits,
      userTurnProvenance,
      assessmentTraceIdsUsed: prompt.selection.traceIdsUsed,
      modelConfigIdentifier: { provider: config.ai.provider, function: 'conversationReview' as const, configuredModel: config.ai.models.conversationReview, effectiveModel: usage?.model || config.ai.models.conversationReview, reasoning: config.ai.reasoning.conversationReview || 'default' },
      evidenceEventIds,
    };
    logCall('conversation-review', started, 200, usage?.model);
    res.json({ success: true, reviewState: { status: 'complete', revision, result, audit }, evidenceEventIds });
  } catch (err) { logCall('conversation-review', started, err instanceof AiRequestError ? 502 : 500); sendError(res, err); }
});
