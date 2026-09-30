import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma';
import { config } from '../config';
import { hashSessionToken } from '../services/authService';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string | null;
  isDemo: boolean;
}

export interface AuthenticatedSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
      session?: AuthenticatedSession;
    }
  }
}

export async function authenticateSession(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.cookies?.[config.sessionCookieName];

  if (!token || typeof token !== 'string') {
    next();
    return;
  }

  try {
    const session = await prisma.session.findUnique({
      where: { token: hashSessionToken(token) },
      include: {
        user: {
          select: { id: true, email: true, name: true, isDemo: true },
        },
      },
    });

    if (!session) {
      next();
      return;
    }

    if (session.expiresAt < new Date()) {
      // Session expired: clean up
      await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
      res.clearCookie(config.sessionCookieName, { path: '/' });
      next();
      return;
    }

    req.user = session.user;
    req.session = {
      id: session.id,
      userId: session.userId,
      token: session.token,
      expiresAt: session.expiresAt,
    };
    next();
  } catch (err) {
    console.error('Error authenticating session:', err);
    next();
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: 'unauthorized',
      message: 'Authentication required. Please sign in.',
    });
    return;
  }
  next();
}

/**
 * Guards against writes, sync, or paid AI actions from demo sessions.
 * isDemo on the user model is the sole authoritative source of truth.
 */
export function requireNonDemo(actionDesc = 'This feature', errorCode = 'demo_read_only') {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.isDemo) {
      res.status(403).json({
        error: errorCode,
        message: `${actionDesc} is disabled in Demo Mode.`,
      });
      return;
    }
    next();
  };
}
