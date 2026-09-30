import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config';
import { prisma } from './prisma';
import { authenticateSession } from './middleware/auth';
import { authRouter } from './routes/auth';
import { syncRouter } from './routes/sync';
import { aiRouter } from './routes/ai';
import { characterConversationRouter } from './routes/characterConversation';
import { learningReviewRouter } from './routes/learningReview';

export const app = express();

// Trust proxy for secure cookie handling behind reverse proxies
app.set('trust proxy', 1);

// Basic security headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "media-src 'self' blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );
  next();
});

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (same-origin, curl); localhost only outside production
      const isLocalDev =
        config.nodeEnv !== 'production' &&
        !!origin &&
        (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1'));
      if (!origin || isLocalDev) {
        callback(null, true);
      } else {
        callback(null, origin === config.corsOrigin);
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(authenticateSession);
// Bind browser requests to the account that created the work, not a later shared cookie.
app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.path.startsWith('/api/') || ['/api/auth/login', '/api/auth/register', '/api/health'].includes(req.path)) return next();
  const expected = req.get('X-Learner-Id') || (req.path === '/api/sync/events' && typeof req.query.owner === 'string' ? req.query.owner : undefined);
  if (req.user && expected && expected !== req.user.id) {
    res.setHeader('X-Account-Changed', '1');
    res.status(403).json({ error: 'account_changed' }); return;
  }
  if (req.user && req.get('Sec-Fetch-Site') && (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) || req.path === '/api/sync/events') && !expected) {
    res.status(428).json({ error: 'account_owner_required' }); return;
  }
  next();
});

// Health check endpoint (public)
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'ok', timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'degraded', database: 'unreachable', timestamp: new Date().toISOString() });
  }
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/ai', aiRouter);
app.use('/api/ai', characterConversationRouter);
app.use('/api/learning-review', learningReviewRouter);
app.use('/api', syncRouter);

// Private app: without a session only the sign-in shell is served. Everything else in
// public/ (app.js, data/curriculum.js, data/unit-*.js and any future asset) needs a session.
// Allowlist on purpose, so a new file is private by default.
export const GATE_ASSETS = new Set(['/', '/index.html', '/styles.css', '/sync.js', '/ownership.js', '/boot.js',
  // App icon + manifest: fetched by browsers/OS without the session cookie; they contain no course content
  '/manifest.webmanifest', '/favicon.ico', '/apple-touch-icon.png',
  '/icons/icon-192.png', '/icons/icon-512.png', '/icons/maskable-192.png', '/icons/maskable-512.png']);
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api/')) return next();
  const isGateAsset = GATE_ASSETS.has(req.path);
  if (!isGateAsset && !req.user && path.extname(req.path)) {
    res.status(401).setHeader('Cache-Control', 'no-store');
    res.type('text/plain').send('Sign in required');
    return;
  }
  // Always revalidate, so a signed-out browser cannot reuse a cached copy of the book
  res.setHeader('Cache-Control', isGateAsset ? 'no-cache' : 'private, no-cache');
  next();
});

// Static frontend file serving strictly from public/ allowlist directory
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir, { index: 'index.html', dotfiles: 'ignore', cacheControl: false }));

// 404 handler for unknown API routes
app.use('/api', (req: Request, res: Response) => {
  res.status(404).json({ error: 'not_found', message: 'API route not found' });
});

// Catch-all for frontend client routes: send index.html
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Body-parser errors contain raw request text; never log their bodies or stacks.
  if (err?.type === 'entity.parse.failed' || err?.type === 'entity.too.large') {
    res.status(err.type === 'entity.too.large' ? 413 : 400).json({ error: 'validation_error', message: 'Invalid request body.' });
    return;
  }
  console.error('Unhandled server error:', err?.name);
  res.status(500).json({
    error: 'internal_server_error',
    message: 'An unexpected error occurred',
  });
});
