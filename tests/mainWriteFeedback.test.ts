import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';
import { allModels } from './helpers/aiModels';
import { __setStructuredCallForTests } from '../src/services/ai/provider';
import { MAIN_WRITE_SYSTEM, buildMainWriteFeedbackPrompt } from '../src/services/ai/prompts';
import { MainWriteFeedbackSchema } from '../src/services/ai/schemas';

describe('Main Write Feedback · Model routing, prompt rules, and exports', () => {
  const email = `mainwrite-${Date.now()}@example.com`;
  let cookie: string;
  const originalAi = { ...config.ai };

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
    cookie = res.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!;
  });

  afterEach(() => {
    Object.assign(config.ai, originalAi);
    __setStructuredCallForTests(null);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
    await prisma.$disconnect();
  });

  const configureAi = () => {
    config.ai.apiKey = 'test-fake-key-no-network';
    config.ai.models = allModels('test-model');
    config.ai.models.mainWrite = 'gpt-5.6-sol';
    config.ai.models.writing = 'gpt-5.4-nano';
  };

  it('routes main writing task (main: true) to mainWrite function and Sol model', async () => {
    configureAi();
    let capturedCall: any = null;
    __setStructuredCallForTests(async (params: any) => {
      capturedCall = params;
      return {
        taskAchievement: { summary: 'Good task achievement', strengths: ['Covers all points'], improvements: [] },
        argumentDevelopment: { summary: 'Strong thesis' },
        organisationCoherence: { summary: 'Logical structure' },
        clarity: { summary: 'Clear syntax' },
        grammaticalAccuracyRange: { summary: 'Advanced control' },
        lexicalPrecisionRange: { summary: 'Precise collocations' },
        registerTone: { summary: 'Appropriate formal tone' },
        hedgingStance: { summary: 'Calibrated claims' },
        cohesionPragmatics: { summary: 'Good transitions' },
        unnecessaryRepetition: { summary: 'No fluff' },
        strengthsSummary: ['Clear voice', 'Good reasoning'],
        observations: [
          {
            quote: 'I believe that',
            type: 'STYLE_CHOICE',
            explanation: 'First person is acceptable in essay stance.',
            effect: 'Direct authorial voice.',
            revisionStrategy: 'Keep or hedge depending on preference.',
          }
        ],
        questionsForWriter: ['What about the alternative view?'],
        nextDraftPriorities: ['Deepen the conclusion'],
      };
    });

    // 04w2 is a main write task in Unit 04
    const res = await request(app)
      .post('/api/ai/feedback')
      .set('Cookie', cookie)
      .send({
        unit: '04',
        taskId: '04w2',
        text: 'This is my comprehensive essay for unit four discussing memory and learning in depth.',
      });

    expect(res.status).toBe(200);
    expect(res.body.isMain).toBe(true);
    expect(res.body.model).toBe('gpt-5.6-sol');
    expect(capturedCall).not.toBeNull();
    expect(capturedCall.fn).toBe('mainWrite');
  });

  it('routes non-main writing task to standard writing function and Nano model', async () => {
    configureAi();
    let capturedCall: any = null;
    __setStructuredCallForTests(async (params: any) => {
      capturedCall = params;
      return {
        estimatedLevel: { level: 'B2', rationale: 'Solid intermediate grammar' },
        taskAchievement: { summary: 'Done well', strengths: [], improvements: [] },
        clarity: { summary: 'Clear', strengths: [], improvements: [] },
        argumentationReasoning: { summary: 'Reasonable', strengths: [], improvements: [] },
        organisation: { summary: 'Structured', strengths: [], improvements: [] },
        cohesion: { summary: 'Cohesive', strengths: [], improvements: [] },
        grammarAccuracy: { summary: 'Good', strengths: [], improvements: [] },
        vocabularyCollocations: { summary: 'Accurate', strengths: [], improvements: [] },
        lexicalPrecision: { summary: 'Good', strengths: [], improvements: [] },
        register: { summary: 'Appropriate', strengths: [], improvements: [] },
        naturalness: { summary: 'Natural', strengths: [], improvements: [] },
        recurringErrors: [],
        isolatedErrors: [],
        corrections: [],
        suggestedErrorLog: [],
        questionsForWriter: [],
        nextDraftPriorities: ['Focus on vocabulary'],
      };
    });

    // w1 in Unit 01 is not a main task (short writing)
    const res = await request(app)
      .post('/api/ai/feedback')
      .set('Cookie', cookie)
      .send({
        unit: '01',
        taskId: 'w1',
        text: 'A short reflection on language learning.',
      });

    expect(res.status).toBe(200);
    expect(res.body.isMain).toBe(false);
    expect(res.body.model).toBe('gpt-5.4-nano');
    expect(capturedCall).not.toBeNull();
    expect(capturedCall.fn).toBe('writing');
  });

  it('enforces pedagogical principles in Main Write prompt: NO rewriting, observation classification', () => {
    expect(MAIN_WRITE_SYSTEM).toContain('NO DRAFT 2 REWRITING');
    expect(MAIN_WRITE_SYSTEM).toContain('ERROR');
    expect(MAIN_WRITE_SYSTEM).toContain('AWKWARD');
    expect(MAIN_WRITE_SYSTEM).toContain('REGISTER_MISMATCH');
    expect(MAIN_WRITE_SYSTEM).toContain('STYLE_CHOICE');
    expect(MAIN_WRITE_SYSTEM).toContain('STRONG_LANGUAGE');
    expect(MAIN_WRITE_SYSTEM).toContain('This is not exam preparation');
    expect(MAIN_WRITE_SYSTEM).toContain('never replace whole paragraphs');

    const prompt = buildMainWriteFeedbackPrompt({
      unitId: '04',
      taskId: '04w2',
      text: 'Sample student text.',
      outline: 'Claim: Stories shape perception.',
    });
    expect(prompt).not.toBeNull();
    expect(prompt!.system).toBe(MAIN_WRITE_SYSTEM);
    expect(prompt!.user).toContain('<student_text');
    expect(prompt!.user).toContain('<writer_outline>');
  });

  it('exports saved feedback as PDF and Markdown without performing any AI calls', async () => {
    const feedbackId = `fb_${Date.now()}`;
    // Seed feedback into user portfolio document
    await prisma.userDocument.upsert({
      where: { userId_key: { userId: (await prisma.user.findUniqueOrThrow({ where: { email } })).id, key: 'portfolio' } },
      create: {
        userId: (await prisma.user.findUniqueOrThrow({ where: { email } })).id,
        key: 'portfolio',
        data: {
          pf: {
            '04:04w2': {
              fb: [
                {
                  id: feedbackId,
                  at: new Date().toISOString(),
                  words: 120,
                  draft: 'first',
                  model: 'gpt-5.6-sol',
                  promptVersion: 'main-write-v1',
                  f: {
                    taskAchievement: { summary: 'Strong coverage of prompt.' },
                    strengthsSummary: ['Clear thesis', 'Analytical depth'],
                    observations: [
                      {
                        quote: 'It goes without saying',
                        type: 'AWKWARD',
                        explanation: 'Cliche filler.',
                        effect: 'Weakens analytical tone.',
                        revisionStrategy: 'State the premise directly.',
                      }
                    ],
                    questionsForWriter: ['Why this example?'],
                    nextDraftPriorities: ['Tighten transitions'],
                  },
                }
              ]
            }
          }
        }
      },
      update: {}
    });

    // Test Markdown export
    const mdRes = await request(app)
      .get(`/api/ai/feedback/04/04w2/${feedbackId}/export?format=md`)
      .set('Cookie', cookie);
    expect(mdRes.status).toBe(200);
    expect(mdRes.headers['content-type']).toContain('text/markdown');
    expect(mdRes.text).toContain('# Main Write Feedback · Unit 04');
    expect(mdRes.text).toContain('gpt-5.6-sol');
    expect(mdRes.text).toContain('Genuine Strengths');
    expect(mdRes.text).toContain('It goes without saying');

    // Test PDF export
    const pdfRes = await request(app)
      .get(`/api/ai/feedback/04/04w2/${feedbackId}/export?format=pdf`)
      .set('Cookie', cookie);
    expect(pdfRes.status).toBe(200);
    expect(pdfRes.headers['content-type']).toContain('application/pdf');
    expect(pdfRes.body).toBeInstanceOf(Buffer);
    expect(pdfRes.body.toString('latin1', 0, 4)).toBe('%PDF');

    // Test JSON export
    const jsonRes = await request(app)
      .get(`/api/ai/feedback/04/04w2/${feedbackId}/export?format=json`)
      .set('Cookie', cookie);
    expect(jsonRes.status).toBe(200);
    expect(jsonRes.body.unit).toBe('04');
    expect(jsonRes.body.taskId).toBe('04w2');
    expect(jsonRes.body.model).toBe('gpt-5.6-sol');

    // Test HTML export: readable page, opened inline or downloaded, with its own strict CSP
    const htmlRes = await request(app)
      .get(`/api/ai/feedback/04/04w2/${feedbackId}/export?format=html`)
      .set('Cookie', cookie);
    expect(htmlRes.status).toBe(200);
    expect(htmlRes.headers['content-type']).toContain('text/html');
    expect(htmlRes.headers['content-disposition']).toMatch(/^inline;/);
    expect(htmlRes.headers['content-security-policy']).toMatch(/script-src 'nonce-[A-Za-z0-9+/=]+'/);
    expect(htmlRes.text).toContain('<!doctype html>');
    expect(htmlRes.text).toContain('It goes without saying');
    expect(htmlRes.text).toContain('Awkward · less natural');
    expect(htmlRes.text).toContain('Tighten transitions');
    const dl = await request(app)
      .get(`/api/ai/feedback/04/04w2/${feedbackId}/export?format=html&download=1`)
      .set('Cookie', cookie);
    expect(dl.headers['content-disposition']).toBe('attachment; filename="feedback-unit04-04w2.html"');
  });
});
