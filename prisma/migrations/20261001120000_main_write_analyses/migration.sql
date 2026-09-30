-- Main Write analysis snapshots (additive only: one new table, nothing existing is altered)
CREATE TABLE "main_write_analyses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "baseTaskId" TEXT NOT NULL,
    "draft" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "words" INTEGER NOT NULL,
    "outline" TEXT,
    "model" TEXT NOT NULL,
    "reasoning" TEXT,
    "promptVersion" TEXT NOT NULL,
    "expectedRegister" TEXT,
    "feedback" JSONB NOT NULL,
    "supportLevel" TEXT,
    "supportUsed" BOOLEAN,
    "supportOpenedBeforeWriting" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "main_write_analyses_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "main_write_analyses_userId_unit_baseTaskId_createdAt_idx" ON "main_write_analyses"("userId", "unit", "baseTaskId", "createdAt");

ALTER TABLE "main_write_analyses" ADD CONSTRAINT "main_write_analyses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
