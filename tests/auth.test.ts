import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';

describe('Authentication API', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'Password123!';
  let sessionCookie: string;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    // Cleanup test user
    const user = await prisma.user.findUnique({ where: { email: testEmail } });
    if (user) {
      await prisma.user.delete({ where: { id: user.id } }).catch(() => {});
    }
    await prisma.$disconnect();
  });

  it('registers a new user with Argon2id password hash and sets HttpOnly cookie', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: testPassword,
        name: 'Mayra Test',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe(testEmail);
    expect(res.body.user.passwordHash).toBeUndefined(); // Never leak password hash

    // Check Set-Cookie
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies.some((c: string) => c.includes('klang_session=') && c.includes('HttpOnly'))).toBe(true);

    // Verify password was hashed with Argon2id in database
    const dbUser = await prisma.user.findUnique({ where: { email: testEmail } });
    expect(dbUser).toBeDefined();
    expect(dbUser?.passwordHash.startsWith('$argon2id$')).toBe(true);
  });

  it('rejects duplicate email registration', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: testPassword,
      });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe('email_taken');
  });

  it('fails login with invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: 'WrongPassword!',
      });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('invalid_credentials');
  });

  it('succeeds login with correct password and returns session', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: testPassword,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe(testEmail);

    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    sessionCookie = cookies.find((c: string) => c.includes('klang_session='))!;
  });

  it('returns current user with /api/auth/me when authenticated', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', sessionCookie);

    expect(res.status).toBe(200);
    expect(res.body.authenticated).toBe(true);
    expect(res.body.user.email).toBe(testEmail);
  });

  it('returns authenticated: false when no cookie is sent', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.status).toBe(200);
    expect(res.body.authenticated).toBe(false);
    expect(res.body.user).toBeNull();
  });

  it('logs out and clears session cookie', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', sessionCookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    // Subsequent /me should now be unauthenticated
    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Cookie', sessionCookie);

    expect(meRes.body.authenticated).toBe(false);
  });
});
