import { EventEmitter } from 'events';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma';

export interface DocumentPayload {
  key: string;
  data: any;
  baseRevision?: number | null;
}

export interface SyncDocResult {
  status: 'saved' | 'conflict';
  doc?: {
    key: string;
    data: any;
    revision: number;
    updatedAt: Date;
  };
  conflict?: {
    key: string;
    clientRevision: number;
    serverDoc: {
      key: string;
      data: any;
      revision: number;
      updatedAt: Date;
    };
  };
}

class SyncEventBus extends EventEmitter {}
const syncEmitter = new SyncEventBus();

export function subscribeToUserSyncEvents(
  userId: string,
  handler: (event: { key: string; revision: number; updatedAt: Date; senderSession?: string }) => void
): () => void {
  const channel = `sync:${userId}`;
  syncEmitter.on(channel, handler);
  return () => {
    syncEmitter.off(channel, handler);
  };
}

export function broadcastUserSyncEvent(params: {
  userId: string;
  key: string;
  revision: number;
  updatedAt: Date;
  senderSession?: string;
}): void {
  syncEmitter.emit(`sync:${params.userId}`, {
    key: params.key,
    revision: params.revision,
    updatedAt: params.updatedAt,
    senderSession: params.senderSession,
  });
}

export async function getUserDocuments(userId: string) {
  return prisma.userDocument.findMany({
    where: { userId },
    select: {
      key: true,
      data: true,
      revision: true,
      updatedAt: true,
    },
    orderBy: { key: 'asc' },
  });
}

export async function getUserDocument(userId: string, key: string) {
  return prisma.userDocument.findUnique({
    where: {
      userId_key: { userId, key },
    },
    select: {
      key: true,
      data: true,
      revision: true,
      updatedAt: true,
    },
  });
}

const docSelect = {
  key: true,
  data: true,
  revision: true,
  updatedAt: true,
} as const;

function isUniqueViolation(err: unknown): boolean {
  return err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002';
}

/**
 * Saves a document using optimistic concurrency with a real compare-and-swap:
 * the revision check happens inside the UPDATE's WHERE clause, so two writers
 * holding the same baseRevision can never both succeed.
 * Rejected writes are persisted in document_conflicts so no version is lost.
 */
export async function upsertDocumentWithConcurrency(
  userId: string,
  key: string,
  data: any,
  baseRevision?: number | null,
  senderSession?: string
): Promise<SyncDocResult> {
  const clientRev = baseRevision ?? 0;

  const result = await prisma.$transaction(async (tx): Promise<SyncDocResult> => {
    const existing = await tx.userDocument.findUnique({
      where: { userId_key: { userId, key } },
    });

    // Scenario 1: Document does not exist yet on server
    if (!existing) {
      const newDoc = await tx.userDocument.create({
        data: { userId, key, data, revision: 1 },
        select: docSelect,
      });
      return { status: 'saved', doc: newDoc };
    }

    // Scenario 2: Compare-and-swap on revision
    if (clientRev === existing.revision) {
      const cas = await tx.userDocument.updateMany({
        where: { id: existing.id, revision: clientRev },
        data: { data, revision: { increment: 1 } },
      });
      if (cas.count === 1) {
        const updated = await tx.userDocument.findUniqueOrThrow({
          where: { id: existing.id },
          select: docSelect,
        });
        return { status: 'saved', doc: updated };
      }
    }

    // Scenario 3: Revision mismatch (or lost the CAS race) -> CONFLICT
    const current = await tx.userDocument.findUniqueOrThrow({
      where: { id: existing.id },
      select: docSelect,
    });
    await tx.documentConflict.create({
      data: {
        userId,
        key,
        clientData: data,
        clientRev,
        serverData: current.data as any,
        serverRev: current.revision,
      },
    });
    return {
      status: 'conflict',
      conflict: { key, clientRevision: clientRev, serverDoc: current },
    };
  }).catch(async (err): Promise<SyncDocResult> => {
    // Two first-writes raced on the same key: the loser becomes a conflict
    if (!isUniqueViolation(err)) throw err;
    const current = await prisma.userDocument.findUniqueOrThrow({
      where: { userId_key: { userId, key } },
      select: docSelect,
    });
    await prisma.documentConflict.create({
      data: {
        userId,
        key,
        clientData: data,
        clientRev,
        serverData: current.data as any,
        serverRev: current.revision,
      },
    });
    return {
      status: 'conflict',
      conflict: { key, clientRevision: clientRev, serverDoc: current },
    };
  });

  // Broadcast only after the transaction has committed
  if (result.status === 'saved' && result.doc) {
    broadcastUserSyncEvent({
      userId,
      key,
      revision: result.doc.revision,
      updatedAt: result.doc.updatedAt,
      senderSession,
    });
  }

  return result;
}

export async function batchSyncDocuments(
  userId: string,
  documents: DocumentPayload[],
  senderSession?: string
): Promise<{
  saved: Array<{ key: string; data: any; revision: number; updatedAt: Date }>;
  conflicts: Array<{ key: string; clientRevision: number; serverDoc: any }>;
}> {
  const saved: Array<{ key: string; data: any; revision: number; updatedAt: Date }> = [];
  const conflicts: Array<{ key: string; clientRevision: number; serverDoc: any }> = [];

  for (const doc of documents) {
    const res = await upsertDocumentWithConcurrency(
      userId,
      doc.key,
      doc.data,
      doc.baseRevision,
      senderSession
    );

    if (res.status === 'saved' && res.doc) {
      saved.push(res.doc);
    } else if (res.status === 'conflict' && res.conflict) {
      conflicts.push(res.conflict);
    }
  }

  return { saved, conflicts };
}

export type ResolveConflictResult =
  | {
      status: 'resolved';
      doc: {
        key: string;
        data: any;
        revision: number;
        updatedAt: Date;
      };
    }
  | {
      status: 'conflict';
      conflict: {
        key: string;
        clientRevision: number;
        serverDoc: {
          key: string;
          data: any;
          revision: number;
          updatedAt: Date;
        };
      };
    };

export async function resolveDocumentConflict(params: {
  userId: string;
  key: string;
  resolvedData: any;
  expectedServerRevision: number;
  resolutionType: string;
  senderSession?: string;
}): Promise<ResolveConflictResult> {
  const result = await prisma.$transaction(async (tx): Promise<ResolveConflictResult> => {
    const existing = await tx.userDocument.findUnique({
      where: {
        userId_key: { userId: params.userId, key: params.key },
      },
      select: { id: true },
    });

    if (!existing) {
      throw new Error('Document not found for conflict resolution');
    }

    // Compare-and-swap: the revision condition is part of the UPDATE itself
    const cas = await tx.userDocument.updateMany({
      where: {
        id: existing.id,
        revision: params.expectedServerRevision,
      },
      data: {
        data: params.resolvedData,
        revision: { increment: 1 },
      },
    });

    const current = await tx.userDocument.findUniqueOrThrow({
      where: { id: existing.id },
      select: docSelect,
    });

    if (cas.count === 0) {
      // Document has evolved since conflict was displayed!
      // Record this attempt in document_conflicts so no version is ever lost
      await tx.documentConflict.create({
        data: {
          userId: params.userId,
          key: params.key,
          clientData: params.resolvedData,
          clientRev: params.expectedServerRevision,
          serverData: current.data as any,
          serverRev: current.revision,
          resolution: `stale_resolution_attempted_${params.resolutionType}`,
        },
      });

      return {
        status: 'conflict',
        conflict: {
          key: params.key,
          clientRevision: params.expectedServerRevision,
          serverDoc: current,
        },
      };
    }

    // Mark previous conflicts as resolved
    await tx.documentConflict.updateMany({
      where: {
        userId: params.userId,
        key: params.key,
        resolved: false,
      },
      data: {
        resolved: true,
        resolvedAt: new Date(),
        resolution: params.resolutionType,
      },
    });

    return { status: 'resolved', doc: current };
  });

  // Broadcast only after the transaction has committed
  if (result.status === 'resolved') {
    broadcastUserSyncEvent({
      userId: params.userId,
      key: params.key,
      revision: result.doc.revision,
      updatedAt: result.doc.updatedAt,
      senderSession: params.senderSession,
    });
  }

  return result;
}
