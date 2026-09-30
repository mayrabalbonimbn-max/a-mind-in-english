import { defineConfig } from 'vitest/config';

// Tests run against a dedicated database, never the dev or production one.
// Prepare it once with: npm run test:db:prepare
export default defineConfig({
  test: {
    env: {
      NODE_ENV: 'test',
      DATABASE_URL:
        process.env.TEST_DATABASE_URL || 'postgresql://mayrabalboni@localhost:5432/amindinenglish_test',
      ALLOW_REGISTRATION: 'true',
      COOKIE_SECURE: 'false',
      AI_API_KEY: '',
      OPENAI_API_KEY: '',
      AI_MODEL: '',
    },
    fileParallelism: false,
    maxWorkers: 1,
  },
});
