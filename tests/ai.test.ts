import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import request from 'supertest';
import { zodTextFormat } from 'openai/helpers/zod';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';
import { allModels } from './helpers/aiModels';
import { __setStructuredCallForTests, __setTranscriptionCallForTests, AiRequestError } from '../src/services/ai/provider';
import { ExplainSchema, ListeningFeedbackSchema, SpeakingFeedbackSchema, WritingFeedbackSchema } from '../src/services/ai/schemas';

const sec = { summary: 's', strengths: ['a'], improvements: ['b'] };
const fakeFeedback = {
  estimatedLevel: { level: 'B2+', rationale: 'r' },
  taskAchievement: sec, grammarAccuracy: sec, vocabularyCollocations: sec, cohesion: sec,
  argumentationReasoning: sec, naturalness: sec, register: sec,
  recurringErrors: [{ pattern: 'PP vs PS', examples: ['I have visited in 2014'], explanation: 'e' }],
  isolatedErrors: [], corrections: [{ original: 'I have forgot', corrected: 'I have forgotten', explanation: 'pp' }],
  suggestedErrorLog: [{ mine: 'I have forgot', corr: 'I have forgotten', why: 'past participle', ex: 'I have forgotten it.' }],
  nextDraftPriorities: ['one', 'two'],
};

describe('AI endpoints', () => {
  const email = `ai-${Date.now()}@example.com`;
  let cookie: string;
  const original = { ...config.ai };

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
    cookie = res.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!;
  });
  afterEach(() => {
    Object.assign(config.ai, original);
    __setStructuredCallForTests(null);
    __setTranscriptionCallForTests(null);
  });
  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
    await prisma.$disconnect();
  });

  it('schemas convert to valid structured-output formats', () => {
    expect(() => zodTextFormat(WritingFeedbackSchema, 'writing_feedback')).not.toThrow();
    expect(() => zodTextFormat(ExplainSchema, 'explanation')).not.toThrow();
    expect(() => zodTextFormat(ListeningFeedbackSchema, 'listening_feedback')).not.toThrow();
    expect(() => zodTextFormat(SpeakingFeedbackSchema, 'speaking_feedback')).not.toThrow();
  });

  it('transcribes only an explicit authenticated audio upload and preserves raw wording', async () => {
    config.ai.apiKey='test-key'; config.ai.models = allModels('test-model'); config.ai.transcriptionModel='test-transcribe';
    __setTranscriptionCallForTests(async (_b,name,mime)=>({text:'I have forgot the word.',uncertain:['forgot']}));
    const res=await request(app).post('/api/ai/transcribe').set('Cookie',cookie).set('Content-Type','audio/webm').set('X-Unit','01').set('X-Activity','s1').set('X-Filename','attempt.webm').send(Buffer.from('audio'));
    expect(res.status).toBe(200);expect(res.body.transcript).toBe('I have forgot the word.');expect(res.body.uncertain).toEqual(['forgot']);
  });

  it('returns clean failures when transcription or speaking AI is unavailable', async () => {
    config.ai.apiKey='';
    const tr=await request(app).post('/api/ai/transcribe').set('Cookie',cookie).set('Content-Type','audio/webm').send(Buffer.from('audio'));
    expect(tr.status).toBe(503);
    const sp=await request(app).post('/api/ai/speaking-feedback').set('Cookie',cookie).send({unit:'01',activityId:'s1',transcript:'hello'});
    expect(sp.status).toBe(503);
  });

  it('requires authentication', async () => {
    const res = await request(app).post('/api/ai/feedback').send({ unit: '01', taskId: 'w1', text: 'x' });
    expect(res.status).toBe(401);
  });

  it('reports unavailable (and never calls the provider) when no API key is configured', async () => {
    config.ai.apiKey = '';
    const spy = vi.fn();
    __setStructuredCallForTests(spy as any);
    const status = await request(app).get('/api/ai/status').set('Cookie', cookie);
    expect(status.body.available).toBe(false);
    const res = await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: '01', taskId: 'w1', text: 'Hello' });
    expect(res.status).toBe(503);
    expect(spy).not.toHaveBeenCalled();
    // The rest of the app keeps working
    const docs = await request(app).get('/api/docs').set('Cookie', cookie);
    expect(docs.status).toBe(200);
  });

  it('builds the prompt from trusted unit data and returns structured feedback', async () => {
    config.ai.apiKey = 'test-key'; config.ai.models = allModels('test-model');
    let seen: any;
    __setStructuredCallForTests(async (p: any) => {
      seen = p;
      return fakeFeedback;
    });
    const res = await request(app)
      .post('/api/ai/feedback')
      .set('Cookie', cookie)
      .send({ unit: '01', taskId: 'w2', text: 'I have forgot my German when I moved back.' });
    expect(res.status).toBe(200);
    expect(res.body.feedback.estimatedLevel.level).toBe('B2+');
    expect(seen.user).toContain('Present Perfect vs Past Simple');
    expect(seen.user).toContain('on the tip of my tongue');
    expect(seen.user).toContain('Something that went quiet');
    expect(seen.user).toContain('Claim, evidence, assumption, inference');
    expect(seen.user).toContain('I have forgot my German');
    expect(seen.user).toContain('FIRST draft');
  });

  it('revised draft feedback uses the original prompt and the edit checklist', async () => {
    config.ai.apiKey = 'test-key'; config.ai.models = allModels('test-model');
    let seen: any;
    __setStructuredCallForTests(async (p: any) => ((seen = p), fakeFeedback));
    const res = await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: '01', taskId: 'w2r', text: 'Draft two.' });
    expect(res.status).toBe(200);
    expect(seen.user).toContain('REVISED');
    expect(seen.user).toContain('Begin with one specific moment');
  });

  it('supports trusted AI feedback for Module Review synthesis writing', async () => {
    config.ai.apiKey = 'test-key'; config.ai.models = allModels('test-model');
    let seen: any;
    __setStructuredCallForTests(async (p: any) => ((seen = p), fakeFeedback));
    const res = await request(app).post('/api/ai/feedback').set('Cookie', cookie)
      .send({ unit: 'r1', taskId: 'm1w1', text: 'The past is reconstructed through evidence, inference and narrative.' });
    expect(res.status).toBe(200);
    expect(seen.user).toContain('Module 1 Review');
    expect(seen.user).toContain('600–900 words');
    expect(seen.user).toContain('Past Simple');
    expect(seen.user).toContain('carry the echoes of');
  });

  it('rejects oversized texts and unknown tasks without calling the provider', async () => {
    config.ai.apiKey = 'test-key'; config.ai.models = allModels('test-model');
    const spy = vi.fn();
    __setStructuredCallForTests(spy as any);
    const big = await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: '01', taskId: 'w1', text: 'a '.repeat(config.ai.maxWritingChars) });
    expect(big.status).toBe(413);
    const unknown = await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: '09', taskId: 'w1', text: 'hi' });
    expect(unknown.status).toBe(404);
    expect(spy).not.toHaveBeenCalled();
  });

  it('maps provider timeouts to a clean 504 and never echoes the essay in logs', async () => {
    config.ai.apiKey = 'test-key'; config.ai.models = allModels('test-model');
    __setStructuredCallForTests(async () => {
      throw new AiRequestError('The AI took too long to answer', 'timeout');
    });
    const logs: string[] = [];
    const capture = (...a: any[]) => logs.push(a.join(' '));
    const spies = [vi.spyOn(console, 'info').mockImplementation(capture), vi.spyOn(console, 'warn').mockImplementation(capture), vi.spyOn(console, 'error').mockImplementation(capture)];
    const secret = 'MY-PRIVATE-ESSAY-SENTENCE';
    const res = await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: '01', taskId: 'w1', text: secret });
    spies.forEach((s) => s.mockRestore());
    expect(res.status).toBe(504);
    expect(res.body.error).toBe('ai_timeout');
    expect(logs.join('\n')).not.toContain(secret);
  });

  it('explain returns a structured explanation', async () => {
    config.ai.apiKey = 'test-key'; config.ai.models = allModels('test-model');
    let seen: any;
    __setStructuredCallForTests(async (p: any) => {
      seen = p;
      return { expression: 'falter', definition: 'd', meaningInContext: 'm', partOfSpeech: 'verb', ipa: '/ˈfɔːl.tər/', collocations: ['voice falters'], example: 'e', portuguese: 'hesitar' };
    });
    const res = await request(app).post('/api/ai/explain').set('Cookie', cookie).send({ unit: '01', section: 'read', selection: 'falter', context: 'You falter, you search.' });
    expect(res.status).toBe(200);
    expect(res.body.explanation.partOfSpeech).toBe('verb');
    expect(seen.user).toContain('<selection>falter</selection>');
    const tooLong = await request(app).post('/api/ai/explain').set('Cookie', cookie).send({ unit: '01', section: 'read', selection: 'x'.repeat(200) });
    expect(tooLong.status).toBe(400);
  });

  it('rate-limits feedback per user', async () => {
    config.ai.apiKey = 'test-key'; config.ai.models = allModels('test-model');
    __setStructuredCallForTests(async () => fakeFeedback);
    const statuses: number[] = [];
    for (let i = 0; i < config.ai.feedbackPerHour + 2; i++) {
      const r = await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: '01', taskId: 'w1', text: 'Some text' });
      statuses.push(r.status);
    }
    expect(statuses).toContain(429);
  });
});
