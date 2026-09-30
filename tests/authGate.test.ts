import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import http from 'http';
import { AddressInfo } from 'net';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';
import { allModels } from './helpers/aiModels';
import { hashPassword } from '../src/services/authService';
import { __setStructuredCallForTests } from '../src/services/ai/provider';

// The app is private: without a session nothing but the sign-in shell may be served.
const PEDAGOGICAL_MARKERS = ['Everything Is Still in the House', 'KLANG.units', 'KLANG.curriculum', 'When a Language Goes Quiet'];

function expectNoContent(body: string) {
  for (const m of PEDAGOGICAL_MARKERS) expect(body).not.toContain(m);
}

/** Opens an SSE stream on a real socket and resolves with status + first chunk. */
function openSse(cookie?: string): Promise<{ status: number; first: string }> {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address() as AddressInfo;
      const req = http.get(
        { port, path: '/api/sync/events?clientId=tab_testclient1', headers: cookie ? { Cookie: cookie } : {} },
        (res) => {
          res.once('data', (chunk) => {
            resolve({ status: res.statusCode || 0, first: chunk.toString() });
            req.destroy();
            server.close();
          });
        }
      );
      req.on('error', (e) => {
        server.close();
        reject(e);
      });
    });
  });
}

describe('Auth gate · without a session', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('GET / delivers only the sign-in shell, never the book', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('boot.js');
    expect(res.text).not.toMatch(/<script src="app\.js">/);
    expect(res.text).not.toMatch(/<script src="data\//);
    expectNoContent(res.text);
  });

  it('the gate assets are public and contain no pedagogical content', async () => {
    for (const f of ['/boot.js', '/sync.js', '/styles.css', '/index.html']) {
      const res = await request(app).get(f);
      expect(res.status).toBe(200);
      expectNoContent(res.text);
    }
  });

  it('pedagogical content and app code cannot be fetched directly', async () => {
    const paths = [
      '/data/unit-01.js',
      '/data/curriculum.js',
      '/app.js',
      '/DATA/unit-01.js',
      '/data/./unit-01.js',
      '/data%2Funit-01.js',
      '/x/../data/unit-01.js',
      '/data/unit-99.js',
    ];
    for (const p of paths) {
      const res = await request(app).get(p);
      expect(res.status, p).toBe(401);
      expectNoContent(res.text);
    }
  });

  it('document, sync and AI APIs answer 401', async () => {
    const calls = [
      request(app).get('/api/docs'),
      request(app).get('/api/docs/unit:01'),
      request(app).put('/api/docs/unit:01').send({ data: {}, baseRevision: 0 }),
      request(app).post('/api/sync/batch').send({ documents: [] }),
      request(app).post('/api/sync/resolve-conflict').send({}),
      request(app).get('/api/ai/status'),
      request(app).post('/api/ai/feedback').send({ unit: '01', taskId: 'w1', text: 'hello' }),
      request(app).post('/api/ai/explain').send({ unit: '01', section: 'read', selection: 'falter' }),
    ];
    for (const c of calls) {
      const res = await c;
      expect(res.status).toBe(401);
    }
  });

  it('SSE answers 401', async () => {
    const res = await request(app).get('/api/sync/events');
    expect(res.status).toBe(401);
  });

  it('registration stays closed when ALLOW_REGISTRATION=false', async () => {
    const prev = config.allowRegistration;
    config.allowRegistration = false;
    const res = await request(app).post('/api/auth/register').send({ email: `x-${Date.now()}@example.com`, password: 'Password123!' });
    config.allowRegistration = prev;
    expect(res.status).toBe(403);
  });
});

describe('Auth gate · with a session', () => {
  const email = `gate-${Date.now()}@example.com`;
  const password = 'Gate-Password-2026';
  let cookie: string;
  let userId: string;
  const original = { ...config.ai };

  beforeAll(async () => {
    // Accounts are created administratively (as in production), not via public sign-up
    const user = await prisma.user.create({ data: { email, passwordHash: await hashPassword(password), name: 'Gate' } });
    userId = user.id;
    const res = await request(app).post('/api/auth/login').send({ email, password });
    expect(res.status).toBe(200);
    cookie = res.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!.split(';')[0];
  });
  afterEach(() => {
    Object.assign(config.ai, original);
    __setStructuredCallForTests(null);
  });
  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
    await prisma.$disconnect();
  });

  it('wrong password does not get in', async () => {
    const res = await request(app).post('/api/auth/login').send({ email, password: 'wrong-password' });
    expect(res.status).toBe(401);
    expect(res.headers['set-cookie']).toBeUndefined();
  });

  it('the app and the units load, marked private', async () => {
    for (const f of ['/app.js', '/data/curriculum.js', '/data/unit-01.js']) {
      const res = await request(app).get(f).set('Cookie', cookie);
      expect(res.status, f).toBe(200);
      expect(res.headers['cache-control']).toContain('private');
    }
    const unit = await request(app).get('/data/unit-01.js').set('Cookie', cookie);
    expect(unit.text).toContain('Everything Is Still in the House');
  });

  it('sync and Glossary work', async () => {
    const glossary = { gl: { '01:x:abc': 'new' }, glx: [{ id: 'abc', term: 'unglamorous', u: '01', sec: 'read', ctx: 'the ordinary, unglamorous word' }] };
    const put = await request(app).put('/api/docs/glossary').set('Cookie', cookie).send({ data: glossary, baseRevision: 0 });
    expect(put.status).toBe(200);
    const get = await request(app).get('/api/docs/glossary').set('Cookie', cookie);
    expect(get.body.doc.data.glx[0].term).toBe('unglamorous');
  });

  it('SSE opens a stream', async () => {
    const { status, first } = await openSse(cookie);
    expect(status).toBe(200);
    expect(first).toContain('connected');
  });

  it('AI endpoints are available when configured', async () => {
    config.ai.apiKey = 'test-key';
    config.ai.models = allModels('test-model');
    __setStructuredCallForTests(async () => ({
      expression: 'falter', definition: 'd', meaningInContext: 'm', partOfSpeech: 'verb', ipa: '', collocations: [], example: 'e', portuguese: 'p',
    }) as any);
    const status = await request(app).get('/api/ai/status').set('Cookie', cookie);
    expect(status.body.available).toBe(true);
    const res = await request(app).post('/api/ai/explain').set('Cookie', cookie).send({ unit: '01', section: 'read', selection: 'falter' });
    expect(res.status).toBe(200);
  });

  it('an expired session is refused everywhere, and the saved data survives', async () => {
    const login = await request(app).post('/api/auth/login').send({ email, password });
    const c2 = login.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!.split(';')[0];
    await prisma.session.updateMany({ where: { userId, createdAt: { gte: new Date(Date.now() - 5000) } }, data: { expiresAt: new Date(Date.now() - 1000) } });

    expect((await request(app).get('/api/docs').set('Cookie', c2)).status).toBe(401);
    expect((await request(app).get('/data/unit-01.js').set('Cookie', c2)).status).toBe(401);
    expect((await request(app).get('/api/auth/me').set('Cookie', c2)).body.authenticated).toBe(false);
    // Nothing was deleted by the expiry: signing in again brings the data back
    const again = await request(app).post('/api/auth/login').send({ email, password });
    const c3 = again.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!.split(';')[0];
    const get = await request(app).get('/api/docs/glossary').set('Cookie', c3);
    expect(get.body.doc.data.glx[0].term).toBe('unglamorous');
    cookie = c3;
  });

  it('sign out invalidates the session on the server: book, APIs and SSE are closed again', async () => {
    const out = await request(app).post('/api/auth/logout').set('Cookie', cookie);
    expect(out.status).toBe(200);
    expect((await request(app).get('/api/auth/me').set('Cookie', cookie)).body.authenticated).toBe(false);
    expect((await request(app).get('/app.js').set('Cookie', cookie)).status).toBe(401);
    expect((await request(app).get('/data/unit-01.js').set('Cookie', cookie)).status).toBe(401);
    expect((await request(app).get('/api/docs').set('Cookie', cookie)).status).toBe(401);
    expect((await request(app).get('/api/sync/events').set('Cookie', cookie)).status).toBe(401);
  });
});
