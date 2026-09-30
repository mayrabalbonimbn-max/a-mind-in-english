import { Prisma } from '@prisma/client';
import { prisma } from '../../prisma';
import { normalizeJudgments, HumanJudgment } from './merge';

/** Whole-document updates must serialize: concurrent judgments on different patterns survive. */
export async function saveHumanJudgment(userId: string, patternKey: string, judgment: HumanJudgment | null) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await prisma.$transaction(async tx => {
        const existing = await tx.userDocument.findUnique({ where: { userId_key: { userId, key: 'learning-judgments' } } });
        const judgments = normalizeJudgments((existing?.data as any)?.judgments);
        if (judgment === null) delete judgments[patternKey];
        else judgments[patternKey] = { judgment, at: new Date().toISOString() };
        if (existing) await tx.userDocument.update({ where: { id: existing.id }, data: { data: { judgments } as any, revision: { increment: 1 } } });
        else await tx.userDocument.create({ data: { userId, key: 'learning-judgments', data: { judgments } as any } });
        return judgments[patternKey] || null;
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    } catch (err) {
      if (!(err instanceof Prisma.PrismaClientKnownRequestError) || !['P2034', 'P2002'].includes(err.code) || attempt === 2) throw err;
    }
  }
  throw new Error('Judgment could not be saved');
}
