import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import request from 'supertest';

// The real OpenAI client runs against this stub: nothing leaves the machine.
const calls: { url: string; body: any }[] = [];
let reply: (body: any) => Response;
vi.stubGlobal('fetch', async (url: any, init: any) => {
  const body = init?.body && typeof init.body === 'string' ? JSON.parse(init.body) : null;
  if (String(url).startsWith('data:')) return new Response('');   // SDK-internal file shim, not an API request
  calls.push({ url: String(url), body });
  return reply(body);
});

import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';

const MODELS = { explain: 'gpt-5.4-nano', listening: 'gpt-5.4-nano', outline: 'gpt-5.4-nano', writing: 'gpt-5.4-nano', speakingFeedback: 'gpt-5.4-nano', teacherLens: 'gpt-5.4-nano', lightLanguage: 'gpt-5.4-nano', interpretItem: 'gpt-5.4-nano', explainQuestion: 'gpt-5.4-nano', mainWrite: 'gpt-5.6-sol', nightlyLearningReview: 'gpt-5.4-nano' };
const EFFORT = { explain: 'none', listening: 'none', outline: 'none', writing: 'none', speakingFeedback: 'none', teacherLens: 'none', lightLanguage: 'none', interpretItem: 'none', explainQuestion: 'none', mainWrite: 'medium', nightlyLearningReview: 'low' };
const completed = (json: any, model = 'stub') => new Response(JSON.stringify({
  id: 'resp_1', object: 'response', status: 'completed', model,
  output: [{ type: 'message', id: 'msg_1', status: 'completed', role: 'assistant', content: [{ type: 'output_text', text: JSON.stringify(json), annotations: [] }] }],
  usage: { input_tokens: 1200, input_tokens_details: { cached_tokens: 0 }, output_tokens: 300, output_tokens_details: { reasoning_tokens: 0 }, total_tokens: 1500 },
}), { status: 200, headers: { 'content-type': 'application/json' } });

const tl = { clarity: 'c', linguisticAccuracy: { summary: 's', issues: [] }, b1Appropriateness: 'b', examples: 'e', predictedDifficulty: 'p', learnerResponse: 'l', unnecessaryComplexity: 'u', ccq: 'q', suggestions: ['x'] };
const sec = { summary: 's', strengths: [], improvements: [] };
const writing = { estimatedLevel: { level: 'B2', rationale: 'r' }, taskAchievement: sec, clarity: sec, argumentationReasoning: sec, organisation: sec, cohesion: sec, grammarAccuracy: sec, vocabularyCollocations: sec, lexicalPrecision: sec, register: sec, naturalness: sec, questionsForWriter: [], recurringErrors: [], isolatedErrors: [], corrections: [], suggestedErrorLog: [], nextDraftPriorities: ['a', 'b'] };
const speaking = { analysisMode: 'transcript_only', limitation: 'l', taskFulfilment: 't', coherence: 'c', grammar: 'g', vocabulary: 'v', naturalPhrasing: 'n', discourseManagement: 'd', precisionRange: 'p', targetLanguage: 't', recurringErrors: [], correctedTranscript: 'c', corrections: [], nextAttemptPriorities: [] };
const listening = { understanding: 'u', missed: 'm', evidence: 'e', language: [], difficulty: 'd', nextTime: 'n' };
const explain = { expression: 'falter', definition: 'd', meaningInContext: 'm', partOfSpeech: 'verb', ipa: '', collocations: [], example: 'e', portuguese: 'p' };
const lightLang = { meaningClear: true, naturalVersion: null, pointsToNotice: [], errorLogCandidate: null, profileEvidence: { grammaticalAccuracyScore: 8, lexicalNaturalnessScore: 8, observedFeatures: [] } };
const interpretItem = { content: { verdict: 'developed', commentary: 'Good' }, language: lightLang };
const explainQ = { overview: 'Explain what the author means.', parts: ['State the claim', 'Give evidence'], keyTerms: [{ term: 'imposter syndrome', meaningInContext: 'feeling inadequate despite success' }], whatToFocusOn: 'Focus on explaining the reasoning clearly.' };

describe('AI cost configuration (per-function models, no fallback, no retries)', () => {
  const email = `aicost-${Date.now()}@example.com`;
  let cookie: string;
  const original = { ...config.ai };

  beforeAll(async () => {
    reply = () => new Response('{}', { status: 500 });
    const res = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
    cookie = res.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!;
  });
  afterEach(() => { Object.assign(config.ai, original); calls.length = 0; });
  afterAll(async () => { await prisma.user.deleteMany({ where: { email } }); await prisma.$disconnect(); });
  const configure = (models: Partial<typeof MODELS> = MODELS) => {
    config.ai.apiKey = 'sk-test-not-real';
    config.ai.models = { explain: '', writing: '', speakingFeedback: '', listening: '', outline: '', teacherLens: '', lightLanguage: '', interpretItem: '', explainQuestion: '', mainWrite: '', nightlyLearningReview: '', ...models };
    config.ai.reasoning = { ...EFFORT };
  };

  it('has no global model setting to fall back on', () => {
    expect('model' in config.ai).toBe(false);
    expect(Object.keys(config.ai.models).sort()).toEqual(['characterChat', 'conversationHelp', 'conversationReview', 'explain', 'explainQuestion', 'interpretItem', 'lightLanguage', 'listening', 'mainWrite', 'nightlyLearningReview', 'outline', 'registerCompare', 'speakingFeedback', 'teacherLens', 'writing']);
  });

  it('sends each endpoint to its own model, effort and output cap, keeping Structured Outputs', async () => {
    configure();
    const cases: [string, any, keyof typeof MODELS, number, any][] = [
      ['/api/ai/explain', { unit: '01', section: 'read', selection: 'falter', context: 'You falter.' }, 'explain', 800, explain],
      ['/api/ai/feedback', { unit: '01', taskId: 'w1', text: 'I have went there.' }, 'writing', 4000, writing],
      ['/api/ai/speaking-feedback', { unit: '01', activityId: 's1', transcript: 'He go to school yesterday.' }, 'speakingFeedback', 2500, speaking],
      ['/api/ai/listening-feedback', { unit: '01', activityId: 'l1', questionId: 'q3', answer: 'An analogy.' }, 'listening', 800, listening],
      ['/api/ai/outline-feedback', { unit: '04', taskId: '04w2', outline: 'Claim: stories select.' }, 'outline', 1200, { questions: [], gaps: [], inconsistencies: [], strengths: [] }],
      ['/api/ai/teacher-lens-feedback', { review: 'r1', pointId: 'usedto', explanation: 'We use used to for past habits.' }, 'teacherLens', 1500, tl],
      ['/api/ai/light-feedback', { unit: '01', stage: 'think', taskId: 't4', text: 'If they find evidence...' }, 'lightLanguage', 800, lightLang],
      ['/api/ai/interpret-feedback', { unit: '01', itemId: 'i8', text: 'The writer feels like a fraud.' }, 'interpretItem', 1200, interpretItem],
      ['/api/ai/explain-question', { unit: '01', stage: 'interpret', taskId: 'i8', questionText: 'Why does the author feel like a fraud?' }, 'explainQuestion', 400, explainQ],
    ];
    for (const [route, body, fn, cap, json] of cases) {
      calls.length = 0;
      reply = (b) => completed(json, b.model);
      const res = await request(app).post(route).set('Cookie', cookie).send(body);
      expect(res.status, route).toBe(200);
      expect(calls, route).toHaveLength(1);
      const sent = calls[0].body;
      expect(calls[0].url).toMatch(/\/responses$/);
      expect(sent.model, route).toBe(MODELS[fn]);
      expect(sent.reasoning, route).toEqual({ effort: EFFORT[fn] });
      expect(sent.max_output_tokens, route).toBe(cap);
      expect(sent.text.format.type, route).toBe('json_schema');
      expect(sent.text.format.strict, route).toBe(true);
      expect(sent.store).toBe(false);
    }
  });

  it('fails explicitly (503) for a function without a model, without calling any other model', async () => {
    configure({ explain: 'gpt-5.4-nano' });
    const res = await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: '01', taskId: 'w1', text: 'Hello' });
    expect(res.status).toBe(503);
    expect(calls).toHaveLength(0);
    const status = await request(app).get('/api/ai/status').set('Cookie', cookie);
    expect(status.body.functions).toMatchObject({ explain: true, writing: false, teacherLens: false });
  });

  it('never retries: a provider error costs exactly one request and surfaces as an error', async () => {
    configure();
    reply = () => new Response(JSON.stringify({ error: { message: 'boom', type: 'server_error' } }), { status: 500, headers: { 'content-type': 'application/json' } });
    const res = await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: '01', taskId: 'w1', text: 'Hello' });
    expect(res.status).toBe(502);
    expect(calls).toHaveLength(1);
  });

  it('rejects a truncated (incomplete) structured output instead of returning partial JSON', async () => {
    configure();
    reply = (b) => new Response(JSON.stringify({ id: 'r', object: 'response', status: 'incomplete', incomplete_details: { reason: 'max_output_tokens' }, model: b.model, output: [], usage: { input_tokens: 10, output_tokens: 4000, output_tokens_details: { reasoning_tokens: 0 } } }), { status: 200, headers: { 'content-type': 'application/json' } });
    const res = await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: '01', taskId: 'w1', text: 'Hello' });
    expect(res.status).toBe(502);
    expect(res.body.error).toBe('ai_bad_output');
    expect(calls).toHaveLength(1);
  });

  it('asks the transcription model for a verbatim English transcript, once', async () => {
    configure();
    config.ai.transcriptionModel = 'gpt-4o-mini-transcribe';
    reply = () => new Response(JSON.stringify({ text: 'He go to school yesterday.' }), { status: 200, headers: { 'content-type': 'application/json' } });
    const res = await request(app).post('/api/ai/transcribe').set('Cookie', cookie).set('Content-Type', 'audio/webm').set('X-Unit', '01').set('X-Activity', 's1').send(Buffer.from('audio'));
    expect(res.status).toBe(200);
    expect(res.body.transcript).toBe('He go to school yesterday.');
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toMatch(/\/audio\/transcriptions$/);
  });
});
