import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { hashPassword } from '../src/services/authService';

describe('Demo Mode Security & Isolation', () => {
  const normalEmail = `normal-${Date.now()}@example.com`;
  const demoEmail = `demo-${Date.now()}@example.com`;
  const password = 'Password123!Secure';

  let normalCookie: string;
  let demoCookie: string;
  let demoUserId: string;

  beforeAll(async () => {
    await prisma.$connect();
    const pwHash = await hashPassword(password);

    // Create normal user
    await prisma.user.create({
      data: {
        email: normalEmail,
        passwordHash: pwHash,
        name: 'Mayra Normal',
        isDemo: false,
      },
    });

    // Create demo user
    const demoUser = await prisma.user.create({
      data: {
        email: demoEmail,
        passwordHash: pwHash,
        name: 'Demo Visitor',
        isDemo: true,
      },
    });
    demoUserId = demoUser.id;

    // Login normal user
    const normalLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: normalEmail, password });
    expect(normalLogin.status).toBe(200);
    expect(normalLogin.body.user.isDemo).toBe(false);
    normalCookie = normalLogin.headers['set-cookie'][0];

    // Login demo user
    const demoLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: demoEmail, password });
    expect(demoLogin.status).toBe(200);
    expect(demoLogin.body.user.isDemo).toBe(true);
    demoCookie = demoLogin.headers['set-cookie'][0];
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: { in: [normalEmail, demoEmail] } },
    }).catch(() => {});
    await prisma.$disconnect();
  });

  it('GET /api/auth/me returns isDemo: true for demo user and false for normal user', async () => {
    const resDemo = await request(app)
      .get('/api/auth/me')
      .set('Cookie', demoCookie);
    expect(resDemo.status).toBe(200);
    expect(resDemo.body.user.isDemo).toBe(true);

    const resNormal = await request(app)
      .get('/api/auth/me')
      .set('Cookie', normalCookie);
    expect(resNormal.status).toBe(200);
    expect(resNormal.body.user.isDemo).toBe(false);
  });

  it('GET /api/ai/status reports unavailable and isDemo: true for demo user', async () => {
    const resDemo = await request(app)
      .get('/api/ai/status')
      .set('Cookie', demoCookie);
    expect(resDemo.status).toBe(200);
    expect(resDemo.body.available).toBe(false);
    expect(resDemo.body.transcriptionAvailable).toBe(false);
    expect(resDemo.body.isDemo).toBe(true);
    expect(resDemo.body.feedbackMode).toBe('demo_disabled');
  });

  it('blocks demo user from PUT /api/docs/:key with 403 demo_read_only', async () => {
    const res = await request(app)
      .put('/api/docs/unit:01')
      .set('Cookie', demoCookie)
      .send({ data: { answers: { '01:q1': 'test' } }, baseRevision: 0 });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('demo_read_only');
  });

  it('blocks demo user from POST /api/sync/batch with 403 demo_read_only', async () => {
    const res = await request(app)
      .post('/api/sync/batch')
      .set('Cookie', demoCookie)
      .send({
        documents: [
          { key: 'glossary', data: { gl: {} }, baseRevision: 0 },
        ],
      });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('demo_read_only');
  });

  it('blocks demo user from POST /api/sync/resolve-conflict with 403 demo_read_only', async () => {
    const res = await request(app)
      .post('/api/sync/resolve-conflict')
      .set('Cookie', demoCookie)
      .send({
        key: 'unit:01',
        data: { answers: {} },
        resolutionChoice: 'keep_local',
        expectedServerRevision: 1,
      });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('demo_read_only');
  });

  it('blocks demo user from GET /api/sync/events with 403 demo_read_only', async () => {
    const res = await request(app)
      .get('/api/sync/events?clientId=test')
      .set('Cookie', demoCookie);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('demo_read_only');
  });

  it('returns empty list for GET /api/docs and 404 for GET /api/docs/:key for demo user without DB query', async () => {
    const listRes = await request(app)
      .get('/api/docs')
      .set('Cookie', demoCookie);
    expect(listRes.status).toBe(200);
    expect(listRes.body.documents).toEqual([]);

    const singleRes = await request(app)
      .get('/api/docs/unit:01')
      .set('Cookie', demoCookie);
    expect(singleRes.status).toBe(404);
  });

  it('blocks demo user from AI endpoints with 403 demo_ai_disabled', async () => {
    // POST /api/ai/feedback
    const fbRes = await request(app)
      .post('/api/ai/feedback')
      .set('Cookie', demoCookie)
      .send({ unit: '01', taskId: 'w1', text: 'This is a test essay for demo mode.' });
    expect(fbRes.status).toBe(403);
    expect(fbRes.body.error).toBe('demo_ai_disabled');

    // POST /api/ai/explain
    const expRes = await request(app)
      .post('/api/ai/explain')
      .set('Cookie', demoCookie)
      .send({ unit: '01', section: 'read', selection: 'test word' });
    expect(expRes.status).toBe(403);
    expect(expRes.body.error).toBe('demo_ai_disabled');

    // POST /api/ai/transcribe
    const trRes = await request(app)
      .post('/api/ai/transcribe')
      .set('Cookie', demoCookie)
      .set('Content-Type', 'audio/webm')
      .set('X-Unit', '01')
      .set('X-Activity', 's1')
      .send(Buffer.from('fake-audio'));
    expect(trRes.status).toBe(403);
    expect(trRes.body.error).toBe('demo_ai_disabled');

    // POST /api/ai/speaking-feedback
    const spRes = await request(app)
      .post('/api/ai/speaking-feedback')
      .set('Cookie', demoCookie)
      .send({ unit: '01', activityId: 's1', transcript: 'Hello world transcript' });
    expect(spRes.status).toBe(403);
    expect(spRes.body.error).toBe('demo_ai_disabled');

    // POST /api/ai/listening-feedback
    const liRes = await request(app)
      .post('/api/ai/listening-feedback')
      .set('Cookie', demoCookie)
      .send({ unit: '01', activityId: 'l1', questionId: 'q1', answer: 'Open response answer' });
    expect(liRes.status).toBe(403);
    expect(liRes.body.error).toBe('demo_ai_disabled');

    // POST /api/ai/light-feedback
    const lightRes = await request(app)
      .post('/api/ai/light-feedback')
      .set('Cookie', demoCookie)
      .send({ unit: '01', stage: 'think', taskId: 't1', text: 'Some user answer' });
    expect(lightRes.status).toBe(403);
    expect(lightRes.body.error).toBe('demo_ai_disabled');

    // POST /api/ai/interpret-feedback
    const intRes = await request(app)
      .post('/api/ai/interpret-feedback')
      .set('Cookie', demoCookie)
      .send({ unit: '01', itemId: 'i1', text: 'My interpretation' });
    expect(intRes.status).toBe(403);
    expect(intRes.body.error).toBe('demo_ai_disabled');

    // POST /api/ai/explain-question
    const expQRes = await request(app)
      .post('/api/ai/explain-question')
      .set('Cookie', demoCookie)
      .send({ unit: '01', stage: 'interpret', taskId: 'i1', questionText: 'Explain the question' });
    expect(expQRes.status).toBe(403);
    expect(expQRes.body.error).toBe('demo_ai_disabled');
  });

  it('guarantees demo user has exactly 0 records in user_documents table', async () => {
    const count = await prisma.userDocument.count({
      where: { userId: demoUserId },
    });
    expect(count).toBe(0);
  });

  it('allows normal user to write, sync, and check documents without regression', async () => {
    const putRes = await request(app)
      .put('/api/docs/unit:01')
      .set('Cookie', normalCookie)
      .send({ data: { answers: { '01:q1': 'mayra text' } }, baseRevision: 0 });

    expect(putRes.status).toBe(200);
    expect(putRes.body.success).toBe(true);
    expect(putRes.body.doc.revision).toBe(1);

    const getRes = await request(app)
      .get('/api/docs/unit:01')
      .set('Cookie', normalCookie);
    expect(getRes.status).toBe(200);
    expect(getRes.body.doc.data.answers['01:q1']).toBe('mayra text');
  });
});
