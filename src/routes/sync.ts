import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { requireAuth, requireNonDemo } from '../middleware/auth';
import {
  getUserDocuments,
  getUserDocument,
  upsertDocumentWithConcurrency,
  batchSyncDocuments,
  resolveDocumentConflict,
  subscribeToUserSyncEvents,
} from '../services/syncService';
import { conversationWriteProblems } from '../services/conversation/policy';

export const syncRouter = Router();

// All sync routes require authenticated user
syncRouter.use(requireAuth);

const clientIdPattern = /^[A-Za-z0-9_-]{8,64}$/;

// Identifies the sending tab/device so SSE can skip echoing a save back to its origin.
// Never uses the session token: that value must not travel to other devices.
function getSenderId(req: Request): string | undefined {
  const header = req.get('x-client-id');
  if (header && clientIdPattern.test(header)) return header;
  return req.session?.id;
}

const documentKeyPattern = /^(unit:\d{2}|review:[1-7]|conversation:[A-Za-z0-9_-]{8,96}|glossary|language-bank|error-log|bookmarks|portfolio|speaking|current-affairs|progress|english-profile)$/;

/** Conversation documents are validated and append-only on the server (turns, trace, frozen end/review). */
async function conversationRejection(userId: string, key: string, data: unknown, baseRevision: number | null | undefined): Promise<string[]> {
  if (!key.startsWith('conversation:')) return [];
  const stored = await getUserDocument(userId, key);
  // Append-only is checked against the copy this write would replace. With a stale base the
  // compare-and-swap answers 409 with the server copy, so the device can merge instead.
  const replaces = stored && (baseRevision ?? 0) === stored.revision;
  return conversationWriteProblems(key, data, replaces ? stored.data : null);
}

function sendConversationRejection(res: Response, problems: string[]) {
  const invalid = problems.some(p => p.startsWith('invalid_conversation') || p === 'conversation_key_mismatch');
  res.status(invalid ? 400 : 409).json({ error: invalid ? 'invalid_conversation' : 'conversation_write_rejected', message: 'Conversation history is append-only.', problems });
}

const docPayloadSchema = z.object({
  data: z.any(),
  baseRevision: z.number().int().nonnegative().nullable().optional(),
});

const batchPayloadSchema = z.object({
  documents: z.array(
    z.object({
      key: z.string().regex(documentKeyPattern, 'Invalid document key format'),
      data: z.any(),
      baseRevision: z.number().int().nonnegative().nullable().optional(),
    })
  ),
});

const resolveConflictSchema = z.object({
  key: z.string().regex(documentKeyPattern, 'Invalid document key format'),
  resolvedData: z.any(),
  expectedServerRevision: z.number().int().positive(),
  resolutionType: z.string().default('merged'),
});

// GET /api/docs - Retrieve all documents for authenticated user
syncRouter.get('/docs', async (req: Request, res: Response): Promise<void> => {
  if (req.user?.isDemo) {
    res.json({ success: true, documents: [] });
    return;
  }
  try {
    const documents = await getUserDocuments(req.user!.id);
    res.json({
      success: true,
      documents,
    });
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ error: 'internal_error', message: 'Failed to fetch documents' });
  }
});

// GET /api/docs/:key - Retrieve a single document
syncRouter.get('/docs/:key', async (req: Request, res: Response): Promise<void> => {
  const key = req.params.key as string;
  if (!documentKeyPattern.test(key)) {
    res.status(400).json({ error: 'invalid_key', message: 'Invalid document key format' });
    return;
  }

  if (req.user?.isDemo) {
    res.status(404).json({ error: 'not_found', message: 'Document not found' });
    return;
  }

  try {
    const doc = await getUserDocument(req.user!.id, key);
    if (!doc) {
      res.status(404).json({ error: 'not_found', message: 'Document not found' });
      return;
    }
    res.json({ success: true, doc });
  } catch (err) {
    console.error('Error fetching document:', err);
    res.status(500).json({ error: 'internal_error', message: 'Failed to fetch document' });
  }
});

// PUT /api/docs/:key - Upsert single document with optimistic concurrency check
syncRouter.put('/docs/:key', requireNonDemo('Saving documents', 'demo_read_only'), async (req: Request, res: Response): Promise<void> => {
  const key = req.params.key as string;
  if (!documentKeyPattern.test(key)) {
    res.status(400).json({ error: 'invalid_key', message: 'Invalid document key format' });
    return;
  }

  const parseResult = docPayloadSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      error: 'validation_error',
      message: parseResult.error.issues[0]?.message || 'Invalid document payload',
    });
    return;
  }

  try {
    const rejection = await conversationRejection(req.user!.id, key, parseResult.data.data, parseResult.data.baseRevision);
    if (rejection.length) { sendConversationRejection(res, rejection); return; }
    const senderSession = getSenderId(req);
    const result = await upsertDocumentWithConcurrency(
      req.user!.id,
      key,
      parseResult.data.data,
      parseResult.data.baseRevision,
      senderSession
    );

    if (result.status === 'conflict') {
      res.status(409).json({
        error: 'conflict',
        message: 'Conflict detected: document on server has a newer revision',
        ...result.conflict,
      });
      return;
    }

    res.json({
      success: true,
      doc: result.doc,
    });
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).json({ error: 'internal_error', message: 'Failed to save document' });
  }
});

// POST /api/sync/batch - Sync multiple documents at once (e.g. migration, offline reconnect)
syncRouter.post('/sync/batch', requireNonDemo('Batch document synchronization', 'demo_read_only'), async (req: Request, res: Response): Promise<void> => {
  const parseResult = batchPayloadSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      error: 'validation_error',
      message: parseResult.error.issues[0]?.message || 'Invalid batch payload',
    });
    return;
  }

  try {
    const senderSession = getSenderId(req);
    // Invalid conversation documents are left out (and stay pending on the device), never half-applied.
    const rejected: { key: string; problems: string[] }[] = [];
    const accepted = [];
    for (const doc of parseResult.data.documents) {
      const problems = await conversationRejection(req.user!.id, doc.key, doc.data, doc.baseRevision);
      if (problems.length) rejected.push({ key: doc.key, problems }); else accepted.push(doc);
    }
    const { saved, conflicts } = await batchSyncDocuments(
      req.user!.id,
      accepted,
      senderSession
    );

    res.json({
      success: true,
      saved,
      conflicts,
      rejected,
      hasConflicts: conflicts.length > 0,
    });
  } catch (err) {
    console.error('Error in batch sync:', err);
    res.status(500).json({ error: 'internal_error', message: 'Batch sync failed' });
  }
});

// POST /api/sync/resolve-conflict - Resolve a specific conflict explicitly
syncRouter.post('/sync/resolve-conflict', requireNonDemo('Conflict resolution', 'demo_read_only'), async (req: Request, res: Response): Promise<void> => {
  const parseResult = resolveConflictSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      error: 'validation_error',
      message: parseResult.error.issues[0]?.message || 'Invalid resolve payload',
    });
    return;
  }

  try {
    const rejection = await conversationRejection(req.user!.id, parseResult.data.key, parseResult.data.resolvedData, parseResult.data.expectedServerRevision);
    if (rejection.length) { sendConversationRejection(res, rejection); return; }
    const senderSession = getSenderId(req);
    const result = await resolveDocumentConflict({
      userId: req.user!.id,
      key: parseResult.data.key,
      resolvedData: parseResult.data.resolvedData,
      expectedServerRevision: parseResult.data.expectedServerRevision,
      resolutionType: parseResult.data.resolutionType,
      senderSession,
    });

    if (result.status === 'conflict') {
      res.status(409).json({
        error: 'conflict',
        message: 'Conflict detected: document revision changed on server before resolution could be applied',
        ...result.conflict,
      });
      return;
    }

    res.json({
      success: true,
      doc: result.doc,
    });
  } catch (err: any) {
    console.error('Error resolving conflict:', err);
    res.status(500).json({ error: 'internal_error', message: 'Failed to resolve conflict' });
  }
});

// GET /api/sync/events - Real-time Server-Sent Events stream
syncRouter.get('/sync/events', requireNonDemo('Sync events', 'demo_read_only'), (req: Request, res: Response): void => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  // Send initial connection event
  res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

  const queryClientId = typeof req.query.clientId === 'string' ? req.query.clientId : '';
  const currentSender = clientIdPattern.test(queryClientId) ? queryClientId : req.session?.id;
  const unsubscribe = subscribeToUserSyncEvents(req.user!.id, (event) => {
    // Only broadcast to OTHER tabs/devices of the same user
    if (event.senderSession && event.senderSession === currentSender) {
      return;
    }
    const { senderSession, ...publicEvent } = event;
    res.write(`event: doc_saved\ndata: ${JSON.stringify(publicEvent)}\n\n`);
  });

  // Keep-alive heartbeat every 20s
  const heartbeat = setInterval(() => {
    res.write(`: heartbeat\n\n`);
  }, 20000);

  req.on('close', () => {
    clearInterval(heartbeat);
    unsubscribe();
  });
});
