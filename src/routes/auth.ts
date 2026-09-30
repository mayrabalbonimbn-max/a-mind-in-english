import { Router, Request, Response } from 'express';
import { z } from 'zod';
import {
  registerUser,
  loginUser,
  logoutSession,
  getSessionCookieOptions,
} from '../services/authService';
import { createRateLimiter } from '../middleware/rateLimit';
import { config } from '../config';

export const authRouter = Router();

// Rate limiter for login: max 10 failed/repeated requests per 15 min per IP
const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts. Please wait 15 minutes before trying again.',
  keyGenerator: (req) => `${req.ip || 'ip'}:${req.body?.email || 'unknown'}`,
});

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must have at least 8 characters'),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

authRouter.post('/register', async (req: Request, res: Response): Promise<void> => {
  if (!config.allowRegistration) {
    res.status(403).json({
      error: 'registration_disabled',
      message: 'Account registration is disabled.',
    });
    return;
  }

  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      error: 'validation_error',
      message: parseResult.error.issues[0]?.message || 'Invalid input',
      details: parseResult.error.issues,
    });
    return;
  }

  try {
    const { user, token } = await registerUser({
      email: parseResult.data.email,
      password: parseResult.data.password,
      name: parseResult.data.name,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.cookie(config.sessionCookieName, token, getSessionCookieOptions());
    res.status(201).json({
      success: true,
      user,
    });
  } catch (err: any) {
    if (err.message === 'Email is already registered') {
      res.status(409).json({
        error: 'email_taken',
        message: 'This email is already registered. Please sign in.',
      });
      return;
    }
    console.error('Registration error:', (err as Error)?.name);
    res.status(500).json({
      error: 'internal_error',
      message: 'Failed to create account. Please try again.',
    });
  }
});

authRouter.post('/login', loginLimiter, async (req: Request, res: Response): Promise<void> => {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      error: 'validation_error',
      message: parseResult.error.issues[0]?.message || 'Invalid credentials',
    });
    return;
  }

  try {
    const { user, token } = await loginUser({
      email: parseResult.data.email,
      password: parseResult.data.password,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.cookie(config.sessionCookieName, token, getSessionCookieOptions());
    res.json({
      success: true,
      user,
    });
  } catch (err: any) {
    res.status(401).json({
      error: 'invalid_credentials',
      message: 'Invalid email or password',
    });
  }
});

authRouter.post('/logout', async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.[config.sessionCookieName];
  if (token) {
    await logoutSession(token);
  }
  res.clearCookie(config.sessionCookieName, { path: '/' });
  res.json({ success: true, message: 'Logged out successfully' });
});

authRouter.get('/config', (req: Request, res: Response): void => {
  res.json({
    allowRegistration: config.allowRegistration,
  });
});

authRouter.get('/me', (req: Request, res: Response): void => {
  if (!req.user) {
    res.json({
      authenticated: false,
      user: null,
      allowRegistration: config.allowRegistration,
    });
    return;
  }
  res.json({
    authenticated: true,
    user: req.user,
    allowRegistration: config.allowRegistration,
  });
});
