import { Request, Response, NextFunction } from 'express';

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message?: string;
  keyGenerator?: (req: Request) => string;
}

interface AttemptRecord {
  count: number;
  resetAt: number;
}

export function createRateLimiter(options: RateLimitOptions) {
  const attempts = new Map<string, AttemptRecord>();
  const { windowMs, max, message = 'Too many attempts. Please try again later.' } = options;

  // Cleanup expired entries periodically
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of attempts.entries()) {
      if (now > record.resetAt) {
        attempts.delete(key);
      }
    }
  }, Math.min(windowMs, 60000)).unref();

  return (req: Request, res: Response, next: NextFunction): void => {
    const key = options.keyGenerator
      ? options.keyGenerator(req)
      : (req.ip || req.socket.remoteAddress || 'unknown');

    const now = Date.now();
    let record = attempts.get(key);

    if (!record || now > record.resetAt) {
      record = { count: 1, resetAt: now + windowMs };
      attempts.set(key, record);
      next();
      return;
    }

    record.count++;
    if (record.count > max) {
      const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
      res.setHeader('Retry-After', retryAfterSec);
      res.status(429).json({
        error: 'rate_limited',
        message,
        retryAfterSec,
      });
      return;
    }

    next();
  };
}
