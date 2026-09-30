-- Nightly Learning Review (additive only: two new tables, nothing existing is altered)
CREATE TABLE "learning_review_state" (
    "userId" TEXT NOT NULL,
    "analysed" JSONB NOT NULL DEFAULT '{}',
    "patterns" JSONB NOT NULL DEFAULT '[]',
    "lastSuccessfulRunId" TEXT,
    "leaseRunId" TEXT,
    "leaseExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning_review_state_pkey" PRIMARY KEY ("userId")
);

CREATE TABLE "learning_review_runs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "fromRunId" TEXT,
    "fromAt" TIMESTAMP(3),
    "toAt" TIMESTAMP(3) NOT NULL,
    "docRevisions" JSONB NOT NULL,
    "evidenceIds" JSONB NOT NULL,
    "deferredCount" INTEGER NOT NULL DEFAULT 0,
    "model" TEXT NOT NULL,
    "reasoning" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL,
    "errorCode" TEXT,
    "report" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "learning_review_runs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "learning_review_runs_userId_startedAt_idx" ON "learning_review_runs"("userId", "startedAt");

ALTER TABLE "learning_review_state" ADD CONSTRAINT "learning_review_state_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "learning_review_runs" ADD CONSTRAINT "learning_review_runs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
