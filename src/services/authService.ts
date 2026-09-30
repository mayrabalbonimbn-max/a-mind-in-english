import crypto from 'crypto';
import argon2 from 'argon2';
import { prisma } from '../prisma';
import { config } from '../config';

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: 'lax' as const,
    maxAge: config.sessionTtlDays * 24 * 60 * 60 * 1000,
    path: '/',
  };
}

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536, // 64 MB
    timeCost: 3,
    parallelism: 1,
  });
}

export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, plain);
  } catch {
    return false;
  }
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Only a SHA-256 digest of the cookie token is stored, so a database leak
// does not hand out usable session cookies.
export function hashSessionToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function createSession(userId: string, ipAddress?: string, userAgent?: string) {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + config.sessionTtlDays * 24 * 60 * 60 * 1000);

  const session = await prisma.session.create({
    data: {
      userId,
      token: hashSessionToken(token),
      expiresAt,
      ipAddress,
      userAgent,
    },
  });

  return { session, token, expiresAt };
}

const DUMMY_HASH =
  '$argon2id$v=19$m=65536,p=1,t=3$DSA53PnY+Y8LXFHKJQ2RyQ$p+3A50yHx5dYe8wa5izsmWnANZA1KZ4mGxHQ3sTjSXc';

export async function registerUser(params: {
  email: string;
  password: string;
  name?: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const normalizedEmail = params.email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existing) {
    throw new Error('Email is already registered');
  }

  const passwordHash = await hashPassword(params.password);

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      passwordHash,
      name: params.name?.trim() || null,
    },
    select: {
      id: true,
      email: true,
      name: true,
      isDemo: true,
      createdAt: true,
    },
  });

  const sessionData = await createSession(user.id, params.ipAddress, params.userAgent);

  return {
    user,
    token: sessionData.token,
    expiresAt: sessionData.expiresAt,
  };
}

export async function loginUser(params: {
  email: string;
  password: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const normalizedEmail = params.email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    // Burn comparable time so response timing does not reveal which emails exist
    await verifyPassword(DUMMY_HASH, params.password);
    throw new Error('Invalid email or password');
  }

  const valid = await verifyPassword(user.passwordHash, params.password);
  if (!valid) {
    throw new Error('Invalid email or password');
  }

  const sessionData = await createSession(user.id, params.ipAddress, params.userAgent);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      isDemo: user.isDemo,
      createdAt: user.createdAt,
    },
    token: sessionData.token,
    expiresAt: sessionData.expiresAt,
  };
}

export async function logoutSession(token: string): Promise<void> {
  await prisma.session.deleteMany({ where: { token: hashSessionToken(token) } }).catch(() => {});
}
