import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';

describe('Audited Corrections & Security Suite', () => {
  const userEmail = `audited-${Date.now()}@klang.com`;
  const password = 'Password2026!';
  let userCookie: string;
  let userId: string;

  beforeAll(async () => {
    await prisma.$connect();

    const regRes = await request(app)
      .post('/api/auth/register')
      .send({ email: userEmail, password, name: 'Mayra Balboni' });
    userCookie = regRes.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!;
    userId = regRes.body.user.id;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: userEmail } }).catch(() => {});
    await prisma.$disconnect();
  });

  /* ── 1. Atomic Conflict Resolution ──────────────────────── */
  it('conflito na revision N → terceiro write cria N+1 → tentativa de resolver usando N deve falhar (409) e jamais sobrescrever N+1', async () => {
    // 1. Initial document at revision 1
    const initRes = await request(app)
      .put('/api/docs/unit:01')
      .set('Cookie', userCookie)
      .send({
        data: {
          answers: { '01:q1': 'Initial text at revision 1' },
          sections: { '01:know': true },
          done: false,
        },
        baseRevision: 0,
      });
    expect(initRes.status).toBe(200);
    expect(initRes.body.doc.revision).toBe(1);

    // 2. Terceiro write (Device C) atualiza para revision 2
    const thirdWriteRes = await request(app)
      .put('/api/docs/unit:01')
      .set('Cookie', userCookie)
      .send({
        data: {
          answers: { '01:q1': 'Version from Device C at revision 2' },
          sections: { '01:know': true },
          done: false,
        },
        baseRevision: 1,
      });
    expect(thirdWriteRes.status).toBe(200);
    expect(thirdWriteRes.body.doc.revision).toBe(2);

    // 3. Device A tenta resolver conflito assumindo expectedServerRevision: 1 (stale!)
    const staleResolveRes = await request(app)
      .post('/api/sync/resolve-conflict')
      .set('Cookie', userCookie)
      .send({
        key: 'unit:01',
        resolvedData: {
          answers: { '01:q1': 'Attempted resolution using stale rev 1' },
          sections: { '01:know': true },
          done: false,
        },
        expectedServerRevision: 1, // Stale! Server is already at 2
        resolutionType: 'stale_client_merge',
      });

    // 4. Deve falhar com 409 Conflict
    expect(staleResolveRes.status).toBe(409);
    expect(staleResolveRes.body.error).toBe('conflict');
    expect(staleResolveRes.body.serverDoc.revision).toBe(2);
    expect(staleResolveRes.body.serverDoc.data.answers['01:q1']).toBe('Version from Device C at revision 2');

    // 5. Garantir que revision 2 NUNCA foi sobrescrita no banco
    const dbDoc = await prisma.userDocument.findUnique({
      where: { userId_key: { userId, key: 'unit:01' } },
    });
    expect(dbDoc?.revision).toBe(2);
    expect((dbDoc?.data as any).answers['01:q1']).toBe('Version from Device C at revision 2');

    // 6. Garantir que a tentativa foi registrada em document_conflicts
    const recordedConflict = await prisma.documentConflict.findFirst({
      where: { userId, key: 'unit:01', clientRev: 1, serverRev: 2 },
    });
    expect(recordedConflict).toBeDefined();
    expect((recordedConflict?.clientData as any).answers['01:q1']).toBe('Attempted resolution using stale rev 1');
  });

  /* ── 2. XSS & HTML Injection Protection ─────────────────── */
  it('preserva dados com tags HTML/script sem interpretar nem causar injeção', async () => {
    const maliciousInput = {
      answers: {
        '01:w1': '<script>alert("xss")</script><img src=x onerror=alert(1)>Critical essay on Hamlet',
      },
      sections: { '01:know': true },
      done: false,
    };

    const saveRes = await request(app)
      .put('/api/docs/unit:01')
      .set('Cookie', userCookie)
      .send({ data: maliciousInput, baseRevision: 2 });

    expect(saveRes.status).toBe(200);
    expect(saveRes.body.doc.revision).toBe(3);
    // Returned safely as plain JSON string without execution
    expect(saveRes.body.doc.data.answers['01:w1']).toBe(
      '<script>alert("xss")</script><img src=x onerror=alert(1)>Critical essay on Hamlet'
    );
  });

  /* ── 3. Registration Control (ALLOW_REGISTRATION) ───────── */
  it('rejeita cadastros com 403 Forbidden quando allowRegistration for desabilitado', async () => {
    // Temporarily disable registration
    const previousSetting = config.allowRegistration;
    config.allowRegistration = false;

    try {
      const regRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `blocked-${Date.now()}@klang.com`,
          password: 'Password123!',
        });

      expect(regRes.status).toBe(403);
      expect(regRes.body.error).toBe('registration_disabled');

      // Verify /api/auth/config and /api/auth/me report allowRegistration: false
      const configRes = await request(app).get('/api/auth/config');
      expect(configRes.status).toBe(200);
      expect(configRes.body.allowRegistration).toBe(false);

      const meRes = await request(app).get('/api/auth/me');
      expect(meRes.status).toBe(200);
      expect(meRes.body.allowRegistration).toBe(false);
    } finally {
      config.allowRegistration = previousSetting;
    }
  });

  /* ── 4. Static Serving Allowlist ────────────────────────── */
  it('serve arquivos públicos permitidos com sucesso', async () => {
    const resHtml = await request(app).get('/index.html');
    expect(resHtml.status).toBe(200);
    expect(resHtml.headers['content-type']).toContain('text/html');

    const resCss = await request(app).get('/styles.css');
    expect(resCss.status).toBe(200);
    expect(resCss.headers['content-type']).toContain('text/css');

    const resSyncJs = await request(app).get('/sync.js');
    expect(resSyncJs.status).toBe(200);

    // The book itself is private: served only with a session
    const resAppJs = await request(app).get('/app.js').set('Cookie', userCookie);
    expect(resAppJs.status).toBe(200);

    const resCurriculum = await request(app).get('/data/curriculum.js').set('Cookie', userCookie);
    expect(resCurriculum.status).toBe(200);
  });

  it('bloqueia e jamais expõe arquivos internos (src, prisma, tests, .env, package.json)', async () => {
    // Attempting to access sensitive internal files must NOT return their contents
    const resEnv = await request(app).get('/.env');
    // Either served as index.html (SPA fallback) or 404, but NEVER the raw .env file
    if (resEnv.status === 200) {
      expect(resEnv.text).not.toContain('DATABASE_URL');
      expect(resEnv.text).toContain('<!doctype html>');
    } else {
      expect([401, 403, 404]).toContain(resEnv.status);
    }

    const resPackage = await request(app).get('/package.json');
    if (resPackage.status === 200) {
      expect(resPackage.text).not.toContain('"dependencies"');
      expect(resPackage.text).toContain('<!doctype html>');
    } else {
      expect([401, 403, 404]).toContain(resPackage.status);
    }

    const resSrc = await request(app).get('/src/config.ts');
    if (resSrc.status === 200) {
      expect(resSrc.text).not.toContain('export const config');
      expect(resSrc.text).toContain('<!doctype html>');
    } else {
      expect([401, 403, 404]).toContain(resSrc.status);
    }

    const resPrisma = await request(app).get('/prisma/schema.prisma');
    if (resPrisma.status === 200) {
      expect(resPrisma.text).not.toContain('model User');
      expect(resPrisma.text).toContain('<!doctype html>');
    } else {
      expect([401, 403, 404]).toContain(resPrisma.status);
    }
  });
});
