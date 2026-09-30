import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { subscribeToUserSyncEvents } from '../src/services/syncService';

// These tests fire requests truly in parallel to prove the compare-and-swap
// holds under races, not just in sequential happy paths.
describe('Atomic compare-and-swap under real concurrency', () => {
  const email = `cas-${Date.now()}@example.com`;
  let cookie: string;
  let userId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email, password: 'Password123!', name: 'CAS' });
    cookie = res.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!;
    userId = res.body.user.id;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } }).catch(() => {});
    await prisma.$disconnect();
  });

  const put = (key: string, text: string, baseRevision: number) =>
    request(app)
      .put(`/api/docs/${key}`)
      .set('Cookie', cookie)
      .send({ data: { answers: { '02:q1': text }, sections: {}, done: false }, baseRevision });

  it('parallel first writes to a new key: exactly one saves, the rest become 409 conflicts (never 500)', async () => {
    const results = await Promise.all(Array.from({ length: 8 }, (_, i) => put('unit:02', `first-${i}`, 0)));
    const statuses = results.map((r) => r.status).sort();
    expect(statuses.filter((s) => s === 200)).toHaveLength(1);
    expect(statuses.filter((s) => s === 409)).toHaveLength(7);

    const conflicts = await prisma.documentConflict.count({ where: { userId, key: 'unit:02' } });
    expect(conflicts).toBe(7);
  });

  it('parallel updates with the same baseRevision: exactly one wins, losers are preserved', async () => {
    const doc = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId, key: 'unit:02' } } });
    const base = doc.revision;
    const before = await prisma.documentConflict.count({ where: { userId, key: 'unit:02' } });

    const results = await Promise.all(Array.from({ length: 10 }, (_, i) => put('unit:02', `racer-${i}`, base)));
    const winners = results.filter((r) => r.status === 200);
    expect(winners).toHaveLength(1);
    expect(winners[0].body.doc.revision).toBe(base + 1);

    const after = await prisma.documentConflict.count({ where: { userId, key: 'unit:02' } });
    expect(after - before).toBe(9);

    const final = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId, key: 'unit:02' } } });
    expect(final.revision).toBe(base + 1);
    expect((final.data as any).answers['02:q1']).toBe(winners[0].body.doc.data.answers['02:q1']);
  });

  it('parallel conflict resolutions against the same revision: exactly one applies', async () => {
    const doc = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId, key: 'unit:02' } } });
    const results = await Promise.all(
      Array.from({ length: 6 }, (_, i) =>
        request(app)
          .post('/api/sync/resolve-conflict')
          .set('Cookie', cookie)
          .send({
            key: 'unit:02',
            resolvedData: { answers: { '02:q1': `resolution-${i}` }, sections: {}, done: false },
            expectedServerRevision: doc.revision,
            resolutionType: 'merged',
          })
      )
    );
    expect(results.filter((r) => r.status === 200)).toHaveLength(1);
    expect(results.filter((r) => r.status === 409)).toHaveLength(5);

    const final = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId, key: 'unit:02' } } });
    expect(final.revision).toBe(doc.revision + 1);

    const stale = await prisma.documentConflict.count({
      where: { userId, key: 'unit:02', resolution: 'stale_resolution_attempted_merged' },
    });
    expect(stale).toBe(5);
  });

  it('a racing write between read and resolve never gets overwritten', async () => {
    const doc = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId, key: 'unit:02' } } });
    const [write, resolve] = await Promise.all([
      put('unit:02', 'concurrent-writer', doc.revision),
      request(app)
        .post('/api/sync/resolve-conflict')
        .set('Cookie', cookie)
        .send({
          key: 'unit:02',
          resolvedData: { answers: { '02:q1': 'concurrent-resolver' }, sections: {}, done: false },
          expectedServerRevision: doc.revision,
        }),
    ]);
    // Exactly one of the two may win; the other must be told about the conflict
    expect([write.status, resolve.status].sort()).toEqual([200, 409]);
    const final = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId, key: 'unit:02' } } });
    expect(final.revision).toBe(doc.revision + 1);
  });

  it('SSE broadcast never carries the session token or sender id to other devices', async () => {
    const events: any[] = [];
    const unsubscribe = subscribeToUserSyncEvents(userId, (e) => events.push(e));
    const doc = await prisma.userDocument.findUniqueOrThrow({ where: { userId_key: { userId, key: 'unit:02' } } });
    await put('unit:02', 'broadcast-check', doc.revision).set('X-Client-Id', 'tab_abcdefgh1234');
    unsubscribe();

    expect(events).toHaveLength(1);
    const rawToken = decodeURIComponent(cookie.split(';')[0].split('=')[1]);
    expect(JSON.stringify(events)).not.toContain(rawToken);
    expect(events[0].senderSession).toBe('tab_abcdefgh1234');
  });

  it('stores only a hash of the session token in the database', async () => {
    const rawToken = decodeURIComponent(cookie.split(';')[0].split('=')[1]);
    const plain = await prisma.session.findUnique({ where: { token: rawToken } });
    expect(plain).toBeNull();
    const me = await request(app).get('/api/auth/me').set('Cookie', cookie);
    expect(me.body.authenticated).toBe(true);
  });
});
