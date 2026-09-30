import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';

describe('Document Sync & Concurrency API', () => {
  const user1Email = `user1-${Date.now()}@example.com`;
  const user2Email = `user2-${Date.now()}@example.com`;
  const password = 'Password123!';
  let user1Cookie: string;
  let user2Cookie: string;
  let user1Id: string;
  let user2Id: string;

  beforeAll(async () => {
    await prisma.$connect();

    // Register user 1
    const res1 = await request(app)
      .post('/api/auth/register')
      .send({ email: user1Email, password, name: 'User One' });
    user1Cookie = res1.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!;
    user1Id = res1.body.user.id;

    // Register user 2
    const res2 = await request(app)
      .post('/api/auth/register')
      .send({ email: user2Email, password, name: 'User Two' });
    user2Cookie = res2.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!;
    user2Id = res2.body.user.id;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: { in: [user1Email, user2Email] } },
    }).catch(() => {});
    await prisma.$disconnect();
  });

  it('requires authentication for sync endpoints', async () => {
    const res = await request(app).get('/api/docs');
    expect(res.status).toBe(401);
  });

  it('creates a new document with initial revision = 1', async () => {
    const unitData = {
      answers: { '01:q1': 'My answer from Browser A' },
      sections: { '01:know': true },
      done: false,
    };

    const res = await request(app)
      .put('/api/docs/unit:01')
      .set('Cookie', user1Cookie)
      .send({
        data: unitData,
        baseRevision: 0,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.doc.key).toBe('unit:01');
    expect(res.body.doc.revision).toBe(1);
    expect(res.body.doc.data.answers['01:q1']).toBe('My answer from Browser A');
  });

  it('persists a Module Review as its own PostgreSQL document', async () => {
    const data = { answers: { 'r1:m1w1': 'Cross-device review draft' }, sections: { 'r1:synthesis': true }, done: false };
    const put = await request(app).put('/api/docs/review:1').set('Cookie', user1Cookie).send({ data, baseRevision: 0 });
    expect(put.status).toBe(200);
    expect(put.body.doc.key).toBe('review:1');
    const get = await request(app).get('/api/docs/review:1').set('Cookie', user1Cookie);
    expect(get.status).toBe(200);
    expect(get.body.doc.data.answers['r1:m1w1']).toBe('Cross-device review draft');
  });

  it('updates a document when baseRevision matches (revision increments)', async () => {
    const updatedData = {
      answers: { '01:q1': 'My answer updated' },
      sections: { '01:know': true, '01:read': true },
      done: false,
    };

    const res = await request(app)
      .put('/api/docs/unit:01')
      .set('Cookie', user1Cookie)
      .send({
        data: updatedData,
        baseRevision: 1, // matches current server revision
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.doc.revision).toBe(2);
    expect(res.body.doc.data.answers['01:q1']).toBe('My answer updated');
  });

  it('rejects stale update with 409 Conflict without data loss (optimistic concurrency)', async () => {
    // Client attempts to send baseRevision: 1, but server is already at revision 2
    const staleData = {
      answers: { '01:q1': 'Conflicting edit from offline Browser B' },
      sections: { '01:know': true },
      done: false,
    };

    const res = await request(app)
      .put('/api/docs/unit:01')
      .set('Cookie', user1Cookie)
      .send({
        data: staleData,
        baseRevision: 1, // Stale! Server is at 2
      });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe('conflict');
    expect(res.body.key).toBe('unit:01');
    expect(res.body.serverDoc.revision).toBe(2);
    expect(res.body.serverDoc.data.answers['01:q1']).toBe('My answer updated');

    // Verify conflict was recorded in DB so neither version is lost
    const conflictInDb = await prisma.documentConflict.findFirst({
      where: { userId: user1Id, key: 'unit:01' },
    });
    expect(conflictInDb).toBeDefined();
    expect((conflictInDb?.clientData as any).answers['01:q1']).toBe('Conflicting edit from offline Browser B');
    expect(conflictInDb?.serverRev).toBe(2);
    expect(conflictInDb?.clientRev).toBe(1);
    expect(conflictInDb?.resolved).toBe(false);
  });

  it('resolves conflict explicitly and marks it resolved in DB', async () => {
    const mergedData = {
      answers: {
        '01:q1': 'Merged answer from both Browser A & B',
      },
      sections: { '01:know': true, '01:read': true },
      done: false,
    };

    const res = await request(app)
      .post('/api/sync/resolve-conflict')
      .set('Cookie', user1Cookie)
      .send({
        key: 'unit:01',
        resolvedData: mergedData,
        expectedServerRevision: 2,
        resolutionType: 'client_merged',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.doc.revision).toBe(3);
    expect(res.body.doc.data.answers['01:q1']).toBe('Merged answer from both Browser A & B');

    // Verify marked resolved in DB
    const conflictInDb = await prisma.documentConflict.findFirst({
      where: { userId: user1Id, key: 'unit:01' },
    });
    expect(conflictInDb?.resolved).toBe(true);
    expect(conflictInDb?.resolution).toBe('client_merged');
  });

  it('handles batch sync with multiple documents', async () => {
    const batchRes = await request(app)
      .post('/api/sync/batch')
      .set('Cookie', user1Cookie)
      .send({
        documents: [
          {
            key: 'glossary',
            data: { gl: { '01:v:fluency': 'learning' } },
            baseRevision: 0,
          },
          {
            key: 'language-bank',
            data: { bank: [{ id: 'b1', t: 'Word', e: 'nuance', m: 'subtle distinction', d: '2026-09-28' }] },
            baseRevision: 0,
          },
        ],
      });

    expect(batchRes.status).toBe(200);
    expect(batchRes.body.success).toBe(true);
    expect(batchRes.body.saved.length).toBe(2);
    expect(batchRes.body.conflicts.length).toBe(0);
  });

  it('isolates data between different users (User 2 cannot see User 1 data)', async () => {
    const res = await request(app)
      .get('/api/docs')
      .set('Cookie', user2Cookie);

    expect(res.status).toBe(200);
    expect(res.body.documents).toEqual([]); // User 2 has no documents
  });
});
