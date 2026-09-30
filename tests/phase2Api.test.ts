import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import request from 'supertest';
import { zodTextFormat } from 'openai/helpers/zod';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';
import { allModels } from './helpers/aiModels';
import { __setStructuredCallForTests, __setTranscriptionCallForTests } from '../src/services/ai/provider';
import { OutlineFeedbackSchema, TeacherLensFeedbackSchema, WritingFeedbackSchema } from '../src/services/ai/schemas';

const tlFeedback = { clarity: 'c', linguisticAccuracy: { summary: 's', issues: [] }, b1Appropriateness: 'b', examples: 'e', predictedDifficulty: 'p', learnerResponse: 'l', unnecessaryComplexity: 'u', ccq: 'q', suggestions: ['x'] };
const outlineFb = { questions: ['What is the claim?'], gaps: [], inconsistencies: [], strengths: ['clear order'] };

describe('Phase 2 AI endpoints', () => {
  const email = `phase2-${Date.now()}@example.com`;
  let cookie: string;
  const original = { ...config.ai };

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
    cookie = res.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!;
  });
  afterEach(() => { Object.assign(config.ai, original); __setStructuredCallForTests(null); __setTranscriptionCallForTests(null); });
  afterAll(async () => { await prisma.user.deleteMany({ where: { email } }); await prisma.$disconnect(); });
  const ai = () => { config.ai.apiKey = 'test-key'; config.ai.models = allModels('test-model'); };

  it('new schemas are valid structured-output formats and writing feedback uses the general criteria', () => {
    expect(() => zodTextFormat(TeacherLensFeedbackSchema, 'tl')).not.toThrow();
    expect(() => zodTextFormat(OutlineFeedbackSchema, 'ol')).not.toThrow();
    expect(() => zodTextFormat(WritingFeedbackSchema, 'wf')).not.toThrow();
    const keys = Object.keys(WritingFeedbackSchema.shape);
    for (const k of ['taskAchievement', 'clarity', 'argumentationReasoning', 'organisation', 'cohesion', 'grammarAccuracy', 'vocabularyCollocations', 'lexicalPrecision', 'register', 'naturalness', 'questionsForWriter']) expect(keys).toContain(k);
    expect(Object.keys(TeacherLensFeedbackSchema.shape).join(' ')).not.toMatch(/score|grade|rating|level/i);
  });

  it('writing feedback is not framed as exam preparation and forbids replacing paragraphs', async () => {
    ai(); let seen: any;
    __setStructuredCallForTests(async (p: any) => ((seen = p), {}) as any);
    await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: '04', taskId: '04w2', text: 'Draft', outline: 'Claim: X. Moves: A, B.' });
    expect(seen.system).not.toMatch(/examiner/i);
    expect(seen.system).toContain('This is not exam preparation');
    expect(seen.system).toContain('never replace whole paragraphs');
    expect(seen.user).toContain('<writer_outline>');
    expect(seen.user).toContain('Claim: X. Moves: A, B.');
  });

  it('timed challenge drafts get feedback with timed context', async () => {
    ai(); let seen: any;
    __setStructuredCallForTests(async (p: any) => ((seen = p), {}) as any);
    const res = await request(app).post('/api/ai/feedback').set('Cookie', cookie).send({ unit: 'r2', taskId: 'm2tc1', text: 'Timed essay.' });
    expect(res.status).toBe(200);
    expect(seen.user).toContain('45 minutes');
  });

  it('outline feedback only asks and flags, on request', async () => {
    ai(); let seen: any;
    __setStructuredCallForTests(async (p: any) => ((seen = p), outlineFb) as any);
    const res = await request(app).post('/api/ai/outline-feedback').set('Cookie', cookie).send({ unit: '07', taskId: '07w2', outline: 'Claim: friendship rules change.' });
    expect(res.status).toBe(200);
    expect(res.body.feedback.questions).toHaveLength(1);
    expect(seen.system).toContain('Never write sentences, paragraphs, a thesis statement');
    const revision = await request(app).post('/api/ai/outline-feedback').set('Cookie', cookie).send({ unit: '07', taskId: '07w2r', outline: 'x' });
    expect(revision.status).toBe(404);
  });

  it('teacher lens feedback uses trusted review data, gives no score and rejects unknown points', async () => {
    ai(); let seen: any;
    __setStructuredCallForTests(async (p: any) => ((seen = p), tlFeedback) as any);
    const ok = await request(app).post('/api/ai/teacher-lens-feedback').set('Cookie', cookie)
      .send({ review: 'r1', pointId: 'usedto', explanation: 'We use used to for past habits that are not true now.', examples: ['I used to live in Recife.'], difficulty: 'Confusing it with be used to.', response: 'Ask: do I live there now?', ccq: '' });
    expect(ok.status).toBe(200);
    expect(seen.user).toContain('used to / would / be used to (Unit 05)');
    expect(seen.user).toContain('(none — optional)');
    expect(seen.system).toContain('Do NOT give a score');
    expect(seen.system).toContain('never penalise its absence');
    expect(seen.system).toMatch(/do not mention certification schemes/i);
    const unknown = await request(app).post('/api/ai/teacher-lens-feedback').set('Cookie', cookie).send({ review: 'r1', pointId: 'modperf', explanation: 'x' });
    expect(unknown.status).toBe(404); // Module 2 point is not part of Review 1
    const other = await request(app).post('/api/ai/teacher-lens-feedback').set('Cookie', cookie).send({ review: 'r1', pointId: 'other', explanation: 'x' });
    expect(other.status).toBe(400);
  });

  it('never calls the provider without explicit configuration', async () => {
    config.ai.apiKey = '';
    const spy = vi.fn(); __setStructuredCallForTests(spy as any);
    const res = await request(app).post('/api/ai/teacher-lens-feedback').set('Cookie', cookie).send({ review: 'r1', pointId: 'usedto', explanation: 'x' });
    expect(res.status).toBe(503);
    expect(spy).not.toHaveBeenCalled();
  });

  it('SAY IT works for Units 02–10 and Reviews, still transcript-only', async () => {
    ai(); config.ai.transcriptionModel = 'test-transcribe';
    __setTranscriptionCallForTests(async () => ({ text: 'raw words', uncertain: [] }));
    const tr = await request(app).post('/api/ai/transcribe').set('Cookie', cookie).set('Content-Type', 'audio/webm').set('X-Unit', 'r1').set('X-Activity', 'm1s1').send(Buffer.from('audio'));
    expect(tr.status).toBe(200);
    const bad = await request(app).post('/api/ai/transcribe').set('Cookie', cookie).set('Content-Type', 'audio/webm').set('X-Unit', '05').set('X-Activity', 's9').send(Buffer.from('audio'));
    expect(bad.status).toBe(400);
    let seen: any;
    __setStructuredCallForTests(async (p: any) => ((seen = p), { analysisMode: 'transcript_only' }) as any);
    const sp = await request(app).post('/api/ai/speaking-feedback').set('Cookie', cookie).send({ unit: 'r1', activityId: 'm1s1', transcript: 'My answer.' });
    expect(sp.status).toBe(200);
    expect(seen.system).toContain('You received ONLY an automatic transcript, never audio.');
    expect(seen.system).toMatch(/MUST NOT claim to assess pronunciation, accent/);
    expect(seen.system).toContain('their absence is not evidence of fluency');
    expect(seen.user).toContain('oral fluency'); // review rubric line…
    expect(seen.system).toContain('cannot be judged from a transcript'); // …handled explicitly
    const u07 = await request(app).post('/api/ai/speaking-feedback').set('Cookie', cookie).send({ unit: '07', activityId: 's1', transcript: 'x' });
    expect(u07.status).toBe(200);
  });

  it('raw audio is never stored in PostgreSQL by transcription', async () => {
    ai(); config.ai.transcriptionModel = 'test-transcribe';
    __setTranscriptionCallForTests(async () => ({ text: 't', uncertain: [] }));
    await request(app).post('/api/ai/transcribe').set('Cookie', cookie).set('Content-Type', 'audio/webm').set('X-Unit', '03').set('X-Activity', 's1').send(Buffer.from('RAW-AUDIO-BYTES'));
    const docs = await request(app).get('/api/docs').set('Cookie', cookie);
    expect(JSON.stringify(docs.body)).not.toContain('RAW-AUDIO-BYTES');
  });
});
