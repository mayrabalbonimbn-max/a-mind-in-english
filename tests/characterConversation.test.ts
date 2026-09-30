import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { config } from '../src/config';
import { prisma } from '../src/prisma';
import { __setStructuredCallForTests } from '../src/services/ai/provider';
import { __replaceCharacterCardsForTests } from '../src/services/conversation/registry';
import type { CharacterCard } from '../src/services/conversation/contracts';
import { allModels } from './helpers/aiModels';

const card: CharacterCard = {
  id: 'fixture_character', version: '1.0.0', sourceContentVersion: 'u01-v1', course: 'mind', unitId: '01', displayName: 'Fixture', targetLanguage: 'en',
  identityDisclosure: 'A text-based fixture.', knownFacts: [{ id: 'f1', text: 'The fixture left a language unused.' }], expressedBeliefs: ['Access can weaken.'],
  personalitySignals: ['direct'], unresolvedQuestions: [], conversationalStyle: ['brief and willing to disagree'], allowedInferences: ['may defend the stated belief'],
  forbiddenClaims: ['invented biography'], sourceExcerpts: [{ id: 'x1', text: 'Access is not identical to storage.', tags: ['core'] }],
  conversationGoals: [{ id: 'g1', text: 'Invite an evidence-versus-inference distinction.' }],
};
const memory = { summary: '', userPositions: [], volunteeredFacts: [], disagreements: [], openQuestions: [], positionChanges: [], coveredThroughTurnIds: [] };
const turn = { id: 'turn_user001', role: 'user', text: 'That sounds like an excuse.', parentTurnId: null, replyToTurnId: null, branchId: 'branch_0001', logicalClock: 1, clientId: 'device_0001', clientSequence: 1, createdAt: '2026-09-30T00:00:00.000Z', provenance: 'spontaneous', assistanceId: null };
const conversation = () => ({ conversationSchemaVersion: '1.0.0', conversationId: 'conversation_0001', course: 'mind', unitId: '01', characterId: card.id, characterCardVersion: card.version, sourceContentVersion: card.sourceContentVersion, mode: 'challenge', status: 'active', createdAt: '2026-09-30T00:00:00.000Z', updatedAt: '2026-09-30T00:00:00.000Z', endedAt: null, continuesFrom: null, turns: [turn], structuredMemory: memory, assessmentTrace: [], reviewState: { status: 'not_requested', revision: 0, result: null, audit: null }, profileEvidenceRefs: [] });

const aid = (id: string, parentTurnId: string | null, aidMode: 'explain' | 'formulate' = 'formulate') => ({ id, role: 'system_aid', text: 'I am not convinced by that.', aidMode, parentTurnId, replyToTurnId: parentTurnId, branchId: 'branch_0001', logicalClock: 0, clientId: 'server_aid', clientSequence: 0, createdAt: '2026-09-30T00:00:00.000Z', provenance: 'system_aid', assistanceId: id });
const ended = (c: any) => ({ ...c, status: 'ended', endedAt: '2026-09-30T00:10:00.000Z', endedAtTurnId: c.turns[c.turns.length - 1].id });

describe('character conversation engine API', () => {
  const email = `conversation-${Date.now()}@example.com`; let cookie = '';
  const original = { ...config.ai, models: { ...config.ai.models }, reasoning: { ...config.ai.reasoning } };
  beforeAll(async () => {
    const r = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
    cookie = r.headers['set-cookie'][0]; __replaceCharacterCardsForTests([card]);
  });
  afterEach(() => { Object.assign(config.ai, original); config.ai.models = { ...original.models }; config.ai.reasoning = { ...original.reasoning }; __setStructuredCallForTests(null); });
  afterAll(async () => { __replaceCharacterCardsForTests([]); await prisma.user.deleteMany({ where: { email } }); await prisma.$disconnect(); });

  it('uses trusted card context and returns a causal character turn plus trace without teaching', async () => {
    config.ai.apiKey = 'test'; config.ai.models = allModels('test-model'); let seen: any;
    __setStructuredCallForTests(async p => { seen = p; return { reply: 'An excuse for what? Evidence matters here.', memory, assessmentCandidates: [{ candidateType: 'counterargument_response', relevantUserTurnIds: [turn.id], note: 'The user challenged the claim.' }] }; });
    const r = await request(app).post('/api/ai/character-chat').set('Cookie', cookie).send({ conversation: conversation(), userTurnId: turn.id });
    expect(r.status).toBe(200); expect(r.body.characterTurn.replyToTurnId).toBe(turn.id); expect(r.body.characterTurn.parentTurnId).toBe(turn.id);
    expect(r.body.assessmentTraceEntries[0].turnIds).toContain(turn.id);
    expect(seen.system).toContain('not a language teacher'); expect(seen.user).toContain('Access is not identical to storage');
    expect(seen.user).not.toContain('answer key');
  });

  it('refuses unavailable historical canon instead of upgrading it', async () => {
    config.ai.apiKey = 'test'; config.ai.models = allModels('test-model'); const c: any = conversation(); c.characterCardVersion = '2.0.0';
    const r = await request(app).post('/api/ai/character-chat').set('Cookie', cookie).send({ conversation: c, userTurnId: turn.id });
    expect(r.status).toBe(409); expect(r.body.error).toBe('character_version_unavailable');
  });

  it('marks formulation help as scaffolded and keeps it outside the persona', async () => {
    config.ai.apiKey = 'test'; config.ai.models = allModels('test-model'); let seen: any;
    __setStructuredCallForTests(async p => { seen = p; return { explanation: null, options: ['I am not convinced by that.'] }; });
    const r = await request(app).post('/api/ai/conversation-help').set('Cookie', cookie).send({ conversation: conversation(), mode: 'formulate', targetTurnId: null, intent: 'não estou convencida' });
    expect(r.status).toBe(200); expect(r.body.scaffoldRequired).toBe(true); expect(seen.system).toContain('outside the character persona');
  });

  it('creates an auditable review and excludes scaffolded turns from profile candidates', async () => {
    config.ai.apiKey = 'test'; config.ai.models = allModels('review-model'); const c: any = ended(conversation()); c.turns[0].provenance = 'scaffolded'; c.turns[0].assistanceId = 'assist_0001';
    c.turns.unshift(aid('assist_0001', null));
    __setStructuredCallForTests(async () => ({ summary: 's', comprehension: { verdict: 'clear_evidence', commentary: 'c', evidence: [{ turnIds: [turn.id], observation: 'o' }] }, interaction: { unexpectedTurns: 'u', counterarguments: 'c', communicationBreakdowns: [] }, successfulLanguage: [], issues: [], independentChunks: [], grammarControl: 'g', reasoning: { commentary: 'r', evidenceTurnIds: [turn.id] }, reformulations: [], profileEvidenceCandidates: [{ dimension: 'written_accuracy', eligible: true, score: 9, weight: .5, turnIds: [turn.id], rationale: 'x' }] }));
    const r = await request(app).post('/api/ai/conversation-review').set('Cookie', cookie).send({ conversation: c });
    expect(r.status).toBe(200); const state = r.body.reviewState;
    expect(state.result.profileEvidenceCandidates[0].eligible).toBe(false); expect(state.audit.turnIdsConsidered).toContain(turn.id);
    expect(state.audit.reviewSchemaVersion).toBe('1.0.0'); expect(state.audit.modelConfigIdentifier.effectiveModel).toBe('review-model');
    expect(state.audit.evidenceEventIds).toEqual([]);
  });

  it('requires auth and blocks Demo before any provider call', async () => {
    config.ai.apiKey = 'test'; config.ai.models = allModels('test-model'); const spy = vi.fn(); __setStructuredCallForTests(spy as any);
    expect((await request(app).post('/api/ai/character-chat').send({ conversation: conversation(), userTurnId: turn.id })).status).toBe(401);
    await prisma.user.update({ where: { email }, data: { isDemo: true } });
    const login = await request(app).post('/api/auth/login').send({ email, password: 'Password123!' });
    const r = await request(app).post('/api/ai/character-chat').set('Cookie', login.headers['set-cookie'][0]).send({ conversation: conversation(), userTurnId: turn.id });
    expect(r.status).toBe(403); expect(spy).not.toHaveBeenCalled();
    await prisma.user.update({ where: { email }, data: { isDemo: false } });
  });
});

