import { app } from './app';
import { config } from './config';
import { prisma } from './prisma';

async function main() {
  // Test database connection on boot
  await prisma.$connect();
  console.log('Connected to PostgreSQL database');

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
