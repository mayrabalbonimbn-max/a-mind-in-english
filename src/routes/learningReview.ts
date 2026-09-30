import { Router, Request, Response } from 'express';
import { requireAuth, requireNonDemo } from '../middleware/auth';
import { createRateLimiter } from '../middleware/rateLimit';
import { config } from '../config';
import { prisma } from '../prisma';
import { latestLearningReview, learningReviewAvailable, learningReviewStatus, runLearningReview } from '../services/learningReview/pipeline';
import { pdfWithFallback } from '../services/pdf/render';
import { learningReviewHtml } from '../services/pdf/learningReviewHtml';
import { reportPdf, reportMarkdown } from '../services/learningReview/pdf';
import { JUDGMENTS, normalizeJudgments, withCurrentJudgments } from '../services/learningReview/merge';
import type { LearningReport, HumanJudgment } from '../services/learningReview/merge';

const JUDGMENTS_KEY = 'learning-judgments';
async function currentJudgments(userId: string) {
  const doc = await prisma.userDocument.findUnique({ where: { userId_key: { userId, key: JUDGMENTS_KEY } } });
  return normalizeJudgments((doc?.data as any)?.judgments);
}

/* Learning Review API. Read the latest report, run the (single) pipeline by hand,
   record human judgments on hypotheses, export PDF or Markdown.
   There is deliberately no endpoint that applies a proposal or writes to the curriculum or to the
   learner's documents: the review observes; a human decides. */
export const learningReviewRouter = Router();
learningReviewRouter.use(requireAuth);

const HOUR = 60 * 60 * 1000;
// Counts only runs that reach the AI: a click with nothing new is answered before this limiter
const runLimiter = createRateLimiter({
  windowMs: HOUR,
  max: config.learningReview.perHour,
  message: 'Learning Review limit reached for this hour. Your previous review is still here; try again later.',
  keyGenerator: (req) => `lr:${req.user!.id}`,
});

learningReviewRouter.get('/', async (req: Request, res: Response) => {
  if (req.user!.isDemo) {
    res.json({ isDemo: true, available: false, report: null, lastRun: null, pending: 0, running: false, studyMinutes: 0, nightlyEligible: false, nightlyEnabled: false });
    return;
  }
  try {
    const [{ report, lastRun }, status, judgments] = await Promise.all([latestLearningReview(req.user!.id), learningReviewStatus(req.user!.id), currentJudgments(req.user!.id)]);
    res.json({
      isDemo: false,
      available: learningReviewAvailable(),
      // The stored report with the learner's current judgments (the judgments store is the source)
      report: report ? withCurrentJudgments(report, judgments) : null,
      lastRun,
      pending: status.pending,
      running: status.running,
      studyMinutes: status.studyMinutes,
      nightlyEligible: status.nightlyEligible,
      nightlyEnabled: config.learningReview.nightlyEnabled,
    });
  } catch (err) {
    console.error('[learning-review] status failed', (err as Error)?.name);
    res.status(500).json({ error: 'internal_error', message: 'Could not load the Learning Review' });
  }
});

learningReviewRouter.post('/run', requireNonDemo('The Learning Review', 'demo_ai_disabled'), async (req: Request, res: Response, next) => {
  if (!learningReviewAvailable()) { res.status(503).json({ error: 'ai_unavailable', message: 'The Learning Review is not configured on this server.' }); return; }
  try {
    // Deterministic pre-check: nothing new means no AI call and no rate-limit cost
    const status = await learningReviewStatus(req.user!.id);
    if (status.running) { res.status(409).json({ error: 'review_running', message: 'A review is already running.' }); return; }
    if (!status.pending) { res.json({ status: 'no_new_evidence' }); return; }
  } catch (err) { next(err); return; }
  runLimiter(req, res, async () => {
    const r = await runLearningReview(req.user!.id, 'manual');
    if (r.status === 'completed') { res.json({ status: 'completed', report: r.report }); return; }
    if (r.status === 'no_new_evidence') { res.json({ status: 'no_new_evidence' }); return; }
    if (r.status === 'below_study_threshold') { res.json({ status: 'below_study_threshold', studyMinutes: r.studyMinutes, requiredMinutes: r.requiredMinutes }); return; }
    if (r.status === 'busy') { res.status(409).json({ error: 'review_running', message: 'A review is already running.' }); return; }
    const http = r.code === 'ai_timeout' ? 504 : r.code === 'ai_rate_limited' ? 429 : r.code === 'ai_unavailable' ? 503 : 502;
    res.status(http).json({ error: r.code, message: 'The review could not be completed. Your previous review is unchanged, and the same evidence will be used next time.', previousKept: true });
  });
});

// Human feedback on AI hypotheses: agree | disagree | not_sure, or null to clear.
// A judgment is about the interpretation only: it never changes evidence, the stored report or facts.
const PATTERN_KEY = /^[A-Za-z0-9_.:-]{1,120}$/;
learningReviewRouter.post('/judgments', async (req: Request, res: Response): Promise<void> => {
  if (req.user!.isDemo) { res.status(403).json({ error: 'demo_disabled', message: 'Judgments disabled in Demo Mode.' }); return; }
  const { patternKey, judgment } = req.body || {};
  const clear = judgment === null;
  if (typeof patternKey !== 'string' || !PATTERN_KEY.test(patternKey) || (!clear && !JUDGMENTS.includes(judgment))) {
    res.status(400).json({ error: 'validation_error', message: 'Invalid patternKey or judgment.' });
    return;
  }
  const userId = req.user!.id;
  const saved = await prisma.$transaction(async (tx) => {
    const existing = await tx.userDocument.findUnique({ where: { userId_key: { userId, key: JUDGMENTS_KEY } } });
    const judgments = normalizeJudgments((existing?.data as any)?.judgments);
    if (clear) delete judgments[patternKey];
    else judgments[patternKey] = { judgment: judgment as HumanJudgment, at: new Date().toISOString() };
    if (existing) await tx.userDocument.update({ where: { id: existing.id }, data: { data: { judgments } as any, revision: existing.revision + 1 } });
    else await tx.userDocument.create({ data: { userId, key: JUDGMENTS_KEY, data: { judgments } as any } });
    return judgments[patternKey] || null;
  });
  res.json({ success: true, patternKey, judgment: saved ? saved.judgment : null, at: saved ? saved.at : null });
});

learningReviewRouter.get('/runs/:id/export', async (req: Request, res: Response): Promise<void> => {
  if (req.user!.isDemo) { res.status(403).json({ error: 'demo_ai_disabled', message: 'The Learning Review is disabled in Demo Mode.' }); return; }
  const id = String(req.params.id || '');
  const format = String(req.query.format || 'pdf').toLowerCase();
  if (!/^[0-9a-f-]{36}$/.test(id)) { res.status(400).json({ error: 'invalid_id' }); return; }
  const run = await prisma.learningReviewRun.findFirst({ where: { id, userId: req.user!.id, status: 'succeeded' }, select: { report: true } });
  if (!run || !run.report) { res.status(404).json({ error: 'not_found', message: 'Review not found' }); return; }
  const report = withCurrentJudgments(run.report as unknown as LearningReport, await currentJudgments(req.user!.id));

  if (format === 'json') {
    res.json(report);
    return;
  }
  if (format === 'md' || format === 'markdown') {
    const md = reportMarkdown(report);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="learning-review-${report.generatedAt.slice(0, 10)}.md"`);
    res.send(md);
    return;
  }

  const pdf = await pdfWithFallback(() => learningReviewHtml(report), 'A Mind in English · Learning Review', () => reportPdf(report));
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="learning-review-${report.generatedAt.slice(0, 10)}.pdf"`);
  res.setHeader('Cache-Control', 'private, no-store');
  res.send(pdf);
});

learningReviewRouter.get('/runs/:id/pdf', async (req: Request, res: Response) => {
  if (req.user!.isDemo) { res.status(403).json({ error: 'demo_ai_disabled', message: 'The Learning Review is disabled in Demo Mode.' }); return; }
  const id = String(req.params.id || '');
  if (!/^[0-9a-f-]{36}$/.test(id)) { res.status(400).json({ error: 'invalid_id' }); return; }
  const run = await prisma.learningReviewRun.findFirst({ where: { id, userId: req.user!.id, status: 'succeeded' }, select: { report: true } });
  if (!run || !run.report) { res.status(404).json({ error: 'not_found', message: 'Review not found' }); return; }
  const report = withCurrentJudgments(run.report as unknown as LearningReport, await currentJudgments(req.user!.id));
  const pdf = await pdfWithFallback(() => learningReviewHtml(report), 'A Mind in English · Learning Review', () => reportPdf(report));
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="learning-review-${report.generatedAt.slice(0, 10)}.pdf"`);
  res.setHeader('Cache-Control', 'private, no-store');
  res.send(pdf);
});
