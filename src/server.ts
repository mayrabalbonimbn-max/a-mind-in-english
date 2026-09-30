import { app } from './app';
import { config, learningReviewConfigStatus } from './config';
import { prisma } from './prisma';

async function main() {
  // Test database connection on boot
  await prisma.$connect();
  console.log('Connected to PostgreSQL database');

  // Learning Review readiness, metadata only: a missing model or table explains a "not configured" page
  const lr = learningReviewConfigStatus();
  const tables = await prisma.$queryRaw<{ ok: boolean }[]>`SELECT to_regclass('public.learning_review_state') IS NOT NULL AND to_regclass('public.learning_review_runs') IS NOT NULL AS ok`.catch(() => [{ ok: false }]);
  console.log(`[learning-review] config AI_API_KEY=${lr.apiKey} AI_MODEL_NIGHTLY_LEARNING_REVIEW=${lr.model} AI_REASONING_NIGHTLY_LEARNING_REVIEW=${lr.reasoning} LEARNING_REVIEW_NIGHTLY=${lr.nightly} tables=${tables[0]?.ok ? 'PRESENT' : 'MISSING (run prisma migrate deploy)'}`);

  const server = app.listen(config.port, () => {
    console.log(`\n==================================================`);
    console.log(` A Mind in English · Server running`);
    console.log(` URL: http://localhost:${config.port}`);
    console.log(` Environment: ${config.nodeEnv}`);
    console.log(`==================================================\n`);
  });

  const shutdown = async () => {
    console.log('\nShutting down server gracefully...');
    // Open SSE streams would keep server.close() waiting forever
    setTimeout(() => process.exit(0), 5000).unref();
    server.close(async () => {
      await prisma.$disconnect();
      console.log('Database disconnected. Process exiting.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
