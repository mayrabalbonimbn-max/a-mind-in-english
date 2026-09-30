import { config } from '../config';
import { prisma } from '../prisma';
import { learningReviewAvailable, runLearningReview } from '../services/learningReview/pipeline';

/* Nightly Learning Review, run by the server's crontab (not by a timer inside the web process):
     30 4 * * *  cd /var/www/amind && node dist/cli/nightlyLearningReview.js >> /var/log/amind-learning-review.log 2>&1
   Same pipeline as "Run review now". It does nothing unless LEARNING_REVIEW_NIGHTLY=true, and only
   for learners whose first review was started by hand. For each one, the pipeline itself checks
   deterministically for study time (>= 60 accumulated minutes) and new evidence: nothing new → no AI call. */

export async function nightly(): Promise<{ users: number; completed: number; skipped: number; busy: number; failed: number }> {
  const out = { users: 0, completed: 0, skipped: 0, busy: 0, failed: 0 };
  if (!config.learningReview.nightlyEnabled) { console.info('[learning-review] nightly disabled (LEARNING_REVIEW_NIGHTLY is not true)'); return out; }
  if (!learningReviewAvailable()) { console.info('[learning-review] nightly skipped: model not configured'); return out; }
  const enrolled = await prisma.learningReviewState.findMany({
    where: { lastSuccessfulRunId: { not: null }, user: { isDemo: false } },
    select: { userId: true },
  });
  for (const { userId } of enrolled) {
    out.users++;
    const r = await runLearningReview(userId, 'nightly');
    if (r.status === 'completed') out.completed++;
    else if (r.status === 'no_new_evidence' || r.status === 'below_study_threshold') out.skipped++;
    else if (r.status === 'busy') out.busy++;
    else out.failed++;
  }
  console.info(`[learning-review] nightly done users=${out.users} completed=${out.completed} skipped=${out.skipped} busy=${out.busy} failed=${out.failed}`);
  return out;
}

if (require.main === module) {
  nightly()
    .then(async (r) => { await prisma.$disconnect(); process.exit(r.failed ? 1 : 0); })
    .catch(async (err) => { console.error('[learning-review] nightly crashed', (err as Error)?.name); await prisma.$disconnect(); process.exit(2); });
}
