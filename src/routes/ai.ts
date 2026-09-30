import express, { Router, Request, Response } from 'express';
import { z } from 'zod';
import { requireAuth, requireNonDemo } from '../middleware/auth';
import { createRateLimiter } from '../middleware/rateLimit';
import { config } from '../config';
import { pdfWithFallback } from '../services/pdf/render';
import { mainWriteHtml } from '../services/pdf/mainWriteHtml';
import { prisma } from '../prisma';
import { AiFn, AiRequestError, AiUnavailableError, callStructured, isAiAvailable, isTranscriptionAvailable, transcribeAudio } from '../services/ai/provider';
import { buildExplainPrompt, buildExplainQuestionPrompt, buildFeedbackPrompt, buildInterpretFeedbackPrompt, buildLightLanguagePrompt, buildListeningPrompt, buildMainWriteFeedbackPrompt, buildOutlinePrompt, buildRegisterComparePrompt, buildSpeakingPrompt, buildTeacherLensPrompt, countWords } from '../services/ai/prompts';
import { ExplainQuestionSchema, ExplainSchema, InterpretItemFeedbackSchema, LightLanguageFeedbackSchema, ListeningFeedbackSchema, MainWriteFeedbackSchema, OutlineFeedbackSchema, REGISTER_KEYS, RegisterCompareSchema, SpeakingFeedbackSchema, TeacherLensFeedbackSchema, WritingFeedbackSchema } from '../services/ai/schemas';
import { getUnit, getWritingTask } from '../services/content';
import { ExportFeedbackData, generateFeedbackMarkdown, generateFeedbackPdf } from '../services/ai/feedbackExport';

// AI is only ever called from an explicit user action (Get feedback / Explain).
// Everything the student typed is already saved locally and synced before this runs,
// so any failure here can never lose writing.
export const aiRouter = Router();
aiRouter.use(requireAuth);

const requireNonDemoAi = requireNonDemo('AI features', 'demo_ai_disabled');

const HOUR = 60 * 60 * 1000;
const feedbackLimiter = createRateLimiter({
  windowMs: HOUR,
  max: config.ai.feedbackPerHour,
  message: 'Feedback limit reached for this hour. Your writing is saved; try again later.',
  keyGenerator: (req) => `fb:${req.user!.id}`,
});
// Main Write has its own quota: other feedback can never use up the one the Main Text needs
const mainWriteLimiter = createRateLimiter({
  windowMs: HOUR,
  max: config.ai.mainWritePerHour,
  message: 'Main Write feedback limit reached for this hour. Your text is saved; try again later.',
  keyGenerator: (req) => `mw:${req.user!.id}`,
});
/** Applies a limiter chosen after validation (so a rejected request never costs quota). false = 429 sent. */
function withinLimit(limiter: ReturnType<typeof createRateLimiter>, req: Request, res: Response): boolean {
  let ok = false;
  limiter(req, res, () => { ok = true; });
  return ok;
}
const explainLimiter = createRateLimiter({
  windowMs: HOUR,
  max: config.ai.explainPerHour,
  message: 'Explain limit reached for this hour. Try again later.',
  keyGenerator: (req) => `ex:${req.user!.id}`,
});

const registerLimiter = createRateLimiter({
  windowMs: HOUR,
  max: config.ai.registerComparePerHour,
  message: 'Compare registers limit reached for this hour. Try again later.',
  keyGenerator: (req) => `rg:${req.user!.id}`,
});

const transcribeLimiter = createRateLimiter({
  windowMs: HOUR,
  max: config.ai.transcribePerHour,
  message: 'Transcription limit reached for this hour. Your recording is saved on this device; try again later.',
  keyGenerator: (req) => `tr:${req.user!.id}`,
});

const unitId = z.string().regex(/^(?:\d{2}|r[1-7])$/);

// Writing Support facts at submission (null = not known). Metadata only; they change nothing in the analysis.
const supportSchema = z.object({
  level: z.enum(['high', 'medium', 'light', 'off']).nullable(),
  used: z.boolean().nullable(),
  openedBeforeWriting: z.boolean().nullable(),
}).strict();

const feedbackSchema = z.object({
  unit: unitId,
  taskId: z.string().regex(/^[A-Za-z0-9_-]{1,32}$/),
  text: z.string().trim().min(1, 'Write something first'),
  outline: z.string().trim().max(8000).optional(),
  support: supportSchema.optional(),
});

const outlineSchema = z.object({
  unit: unitId,
  taskId: z.string().regex(/^[A-Za-z0-9_-]{1,32}$/),
  outline: z.string().trim().min(1, 'Write a few outline lines first').max(8000),
});

const teacherLensSchema = z.object({
  review: z.string().regex(/^r[1-7]$/),
  pointId: z.string().regex(/^[a-z0-9]{2,16}$/),
  customPoint: z.string().trim().max(160).optional().default(''),
  explanation: z.string().trim().min(1, 'Write the explanation first').max(2500),
  examples: z.array(z.string().trim().max(400)).max(2).default([]),
  difficulty: z.string().trim().max(1200).optional().default(''),
  response: z.string().trim().max(1500).optional().default(''),
  ccq: z.string().trim().max(400).optional().default(''),
});

const explainSchema = z.object({
  unit: unitId,
  section: z.string().regex(/^[a-z]{2,16}$/),
  selection: z.string().trim().min(1).max(120),
  context: z.string().max(1200).optional().default(''),
});

const explainQuestionReqSchema = z.object({
  unit: unitId,
  stage: z.string().regex(/^[a-z0-9:_-]{2,32}$/),
  taskId: z.string().regex(/^[A-Za-z0-9:_-]{1,32}$/),
  questionText: z.string().trim().min(1).max(2500),
});

const lightFeedbackSchema = z.object({
  unit: unitId,
  stage: z.string().regex(/^[a-z0-9:_-]{2,32}$/),
  taskId: z.string().regex(/^[A-Za-z0-9:_-]{1,32}$/),
  taskPrompt: z.string().max(2000).optional(),
  text: z.string().trim().min(1, 'Write something first').max(4000),
});

// Only the selected text (and, for course text, the sentence around it) is ever sent.
export const REGISTER_MAX_CHARS = 240;
const registerCompareReqSchema = z.object({
  unit: unitId,
  section: z.string().regex(/^[a-z0-9]{2,16}$/),
  source: z.enum(['book', 'mine']),
  selection: z.string().trim().min(1, 'Select a phrase or a sentence first').max(REGISTER_MAX_CHARS, 'Select a shorter passage: one sentence or a short phrase.').regex(/[A-Za-z]/, 'Select some English text'),
  context: z.string().max(600).optional().default(''),
});

const interpretFeedbackReqSchema = z.object({
  unit: unitId,
  itemId: z.string().regex(/^[A-Za-z0-9_-]{1,32}$/),
  text: z.string().trim().min(1, 'Write something first').max(4000),
});

// Each AI function has its own model; a function without one answers 503 instead of borrowing another model
const requireAi = (fn: AiFn) => (req: Request, res: Response, next: () => void) => {
  if (!isAiAvailable(fn)) {
    res.status(503).json({ error: 'ai_unavailable', message: 'AI feedback is not configured on this server.' });
    return;
  }
  next();
};

// Output caps per function (tokens). Sized to the current schemas; raise one only if its JSON truncates.
export const MAX_OUT = { writing: 4000, mainWrite: 6000, speakingFeedback: 2500, teacherLens: 1500, explain: 800, outline: 1200, listening: 800, lightLanguage: 800, interpretItem: 1200, explainQuestion: 400, registerCompare: 800 } as const;

function sendAiError(res: Response, err: unknown, kind: string) {
  if (err instanceof AiUnavailableError) {
    res.status(503).json({ error: 'ai_unavailable', message: 'AI is not configured on this server.' });
    return;
  }
  if (err instanceof AiRequestError) {
    const status = err.code === 'timeout' ? 504 : err.code === 'rate_limited' ? 429 : 502;
    res.status(status).json({ error: `ai_${err.code}`, message: err.message });
    return;
  }
  console.error(`[ai] ${kind} failed`, (err as Error)?.name);
  res.status(500).json({ error: 'internal_error', message: 'AI request failed' });
}

aiRouter.get('/status', (req: Request, res: Response) => {
  if (req.user?.isDemo) {
    res.json({ available: false, transcriptionAvailable: false, isDemo: true, feedbackMode: 'demo_disabled' });
    return;
  }
  const functions = Object.fromEntries((Object.keys(config.ai.models) as AiFn[]).map((fn) => [fn, isAiAvailable(fn)]));
  res.json({ available: isAiAvailable(), functions, transcriptionAvailable: isTranscriptionAvailable(), feedbackMode: 'transcript_only' });
});

const speechText = z.object({ unit: unitId, activityId: z.string().regex(/^(?:[a-z]\d|m\ds\d)$/), transcript: z.string().trim().min(1).max(20000) });
// Ids as authored: l1 · r1l1 · 23l1 (Units 23–32), questions q1 · 23l1q1; the content lookup still checks they exist
const listenText = z.object({ unit: unitId, activityId: z.string().regex(/^(?:l\d|r\dl\d|\d{2}l\d)$/), questionId: z.string().regex(/^(?:\d{2}l\d)?q\d$/), answer: z.string().trim().min(1).max(5000) });
const hasSpeaking = (unit: string, activity: string) => getUnit(unit)?.data?.speaking?.id === activity;

const requireTranscription = (_req: Request, res: Response, next: () => void) => {
  if (!isTranscriptionAvailable()) { res.status(503).json({ error:'ai_unavailable', message:'Transcription is not configured on this server.' }); return; }
  next();
};

aiRouter.post('/transcribe', requireNonDemoAi, requireTranscription, transcribeLimiter, express.raw({ type: ['audio/*','video/webm'], limit: '15mb' }), async (req: Request, res: Response): Promise<void> => {
  if (!Buffer.isBuffer(req.body) || !req.body.length) { res.status(400).json({ error:'validation_error', message:'No audio recording received.' }); return; }
  const unit=String(req.get('x-unit')||''), activity=String(req.get('x-activity')||''), filename=String(req.get('x-filename')||'recording.webm').replace(/[^A-Za-z0-9._-]/g,'_');
  if(!/^(?:\d{2}|r[1-7])$/.test(unit)||!hasSpeaking(unit,activity)){res.status(400).json({error:'validation_error',message:'Invalid speaking activity.'});return;}
  try { const out=await transcribeAudio(req.body,filename,req.get('content-type')||'audio/webm'); console.info(`[ai] transcription unit=${unit} activity=${activity} bytes=${req.body.length}`); res.json({success:true,transcript:out.text,uncertain:out.uncertain||[]}); }
  catch(err){sendAiError(res,err,'transcription');}
});

aiRouter.post('/speaking-feedback', requireNonDemoAi, requireAi('speakingFeedback'), feedbackLimiter, async(req:Request,res:Response):Promise<void>=>{
  const parsed=speechText.safeParse(req.body); if(!parsed.success){res.status(400).json({error:'validation_error',message:parsed.error.issues[0]?.message||'Invalid request'});return;}
  const prompt=buildSpeakingPrompt({unitId:parsed.data.unit,activityId:parsed.data.activityId,transcript:parsed.data.transcript}); if(!prompt){res.status(404).json({error:'not_found',message:'Unknown speaking task'});return;}
  try{const feedback=await callStructured({fn:'speakingFeedback',name:'speaking_feedback',system:prompt.system,user:prompt.user,schema:SpeakingFeedbackSchema,maxTokens:MAX_OUT.speakingFeedback});console.info(`[ai] speaking feedback unit=${parsed.data.unit} chars=${parsed.data.transcript.length}`);res.json({success:true,feedback,createdAt:new Date().toISOString()});}catch(err){sendAiError(res,err,'speaking feedback');}
});

aiRouter.post('/listening-feedback', requireNonDemoAi, requireAi('listening'), feedbackLimiter, async(req:Request,res:Response):Promise<void>=>{
  const parsed=listenText.safeParse(req.body); if(!parsed.success){res.status(400).json({error:'validation_error',message:parsed.error.issues[0]?.message||'Invalid request'});return;}
  const prompt=buildListeningPrompt({unitId:parsed.data.unit,activityId:parsed.data.activityId,questionId:parsed.data.questionId,answer:parsed.data.answer}); if(!prompt){res.status(404).json({error:'not_found',message:'Unknown open listening question'});return;}
  try{const feedback=await callStructured({fn:'listening',name:'listening_feedback',system:prompt.system,user:prompt.user,schema:ListeningFeedbackSchema,maxTokens:MAX_OUT.listening});console.info(`[ai] listening feedback unit=${parsed.data.unit} activity=${parsed.data.activityId}`);res.json({success:true,feedback});}catch(err){sendAiError(res,err,'listening feedback');}
});

aiRouter.post('/feedback', requireNonDemoAi, async (req: Request, res: Response): Promise<void> => {
  const parsed = feedbackSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid request' });
    return;
  }
  const { unit, taskId, text } = parsed.data;
  if (text.length > config.ai.maxWritingChars) {
    res.status(413).json({
      error: 'too_long',
      message: `This text is too long for feedback (max ${config.ai.maxWritingChars.toLocaleString('en')} characters).`,
    });
    return;
  }

  const found = getWritingTask(unit, taskId);
  if (!found) {
    res.status(404).json({ error: 'not_found', message: 'Unknown unit or writing task' });
    return;
  }

  // The curriculum decides what a Main Write is; nothing in the request can
  const isMain = !!(found.task && found.task.main);
  const fn: AiFn = isMain ? 'mainWrite' : 'writing';

  if (!isAiAvailable(fn)) {
    res.status(503).json({ error: 'ai_unavailable', message: `AI feedback is not configured for ${fn} on this server.` });
    return;
  }
  if (!withinLimit(isMain ? mainWriteLimiter : feedbackLimiter, req, res)) return;

  const started = Date.now();
  try {
    if (isMain) {
      const prompt = buildMainWriteFeedbackPrompt({ unitId: unit, taskId, text, outline: parsed.data.outline || undefined });
      if (!prompt) { res.status(404).json({ error: 'not_found', message: 'Unknown unit or writing task' }); return; }
      // What is actually used for THIS call; history never re-reads today's configuration
      const model = config.ai.models.mainWrite, reasoning = config.ai.reasoning.mainWrite || null;
      const feedback = await callStructured({
        fn: 'mainWrite',
        name: 'main_write_feedback',
        system: prompt.system,
        user: prompt.user,
        schema: MainWriteFeedbackSchema,
        maxTokens: MAX_OUT.mainWrite,
      });
      console.info(`[ai] main-write feedback unit=${unit} task=${taskId} model=${model} words=${countWords(text)} ms=${Date.now() - started}`);
      // Snapshot: the exact analysed text with what really happened. Append-only.
      const draft = found.isRevision ? 'revised' : 'first';
      const support = parsed.data.support || { level: null, used: null, openedBeforeWriting: null };
      let analysisId: string | null = null, createdAt = new Date().toISOString();
      try {
        const row = await prisma.mainWriteAnalysis.create({ data: {
          userId: req.user!.id, unit, taskId, baseTaskId: found.isRevision ? String(found.task.revisionOf || taskId) : taskId, draft,
          text, words: countWords(text), outline: parsed.data.outline || null, model, reasoning, promptVersion: prompt.promptVersion,
          expectedRegister: prompt.expectedRegister.id, feedback: feedback as any,
          supportLevel: support.level, supportUsed: support.used, supportOpenedBeforeWriting: support.openedBeforeWriting,
        } });
        analysisId = row.id; createdAt = row.createdAt.toISOString();
      } catch (e) {
        // A successful Main Write must have a durable historical snapshot.
        console.error(`[ai] main-write snapshot not saved unit=${unit} task=${taskId} err=${(e as Error)?.name}`);
        res.status(503).json({ error: 'snapshot_not_saved', message: 'The analysis could not be saved. Your draft is unchanged. Please try again later.' });
        return;
      }
      res.json({
        success: true,
        feedback,
        words: countWords(text),
        isMain: true,
        draft,
        analysisId,
        model,
        promptVersion: prompt.promptVersion,
        expectedRegister: prompt.expectedRegister.id,
        createdAt,
      });
    } else {
      const prompt = buildFeedbackPrompt({ unitId: unit, taskId, text, outline: parsed.data.outline || undefined });
      if (!prompt) { res.status(404).json({ error: 'not_found', message: 'Unknown unit or writing task' }); return; }
      const feedback = await callStructured({
        fn: 'writing',
        name: 'writing_feedback',
        system: prompt.system,
        user: prompt.user,
        schema: WritingFeedbackSchema,
        maxTokens: MAX_OUT.writing,
      });
      console.info(`[ai] feedback unit=${unit} task=${taskId} model=${config.ai.models.writing} words=${countWords(text)} ms=${Date.now() - started}`);
      res.json({
        success: true,
        feedback,
        words: countWords(text),
        isMain: false,
        model: config.ai.models.writing,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn(`[ai] feedback failed unit=${unit} task=${taskId} isMain=${isMain} ms=${Date.now() - started}`);
    sendAiError(res, err, 'feedback');
  }
});

aiRouter.get('/feedback/:unit/:taskId/:id/export', async (req: Request, res: Response): Promise<void> => {
  if (req.user!.isDemo) { res.status(403).json({ error: 'demo_ai_disabled', message: 'AI export is disabled in Demo Mode.' }); return; }
  const unit = String(req.params.unit);
  const taskId = String(req.params.taskId);
  const id = String(req.params.id);
  const format = String(req.query.format || 'pdf').toLowerCase();

  const [pfDoc, unitDoc] = await Promise.all([
    prisma.userDocument.findUnique({ where: { userId_key: { userId: req.user!.id, key: 'portfolio' } } }),
    prisma.userDocument.findUnique({ where: { userId_key: { userId: req.user!.id, key: `unit:${unit}` } } }),
  ]);

  const pData = (pfDoc?.data as any)?.pf || {};
  const baseKey = `${unit}:${taskId}`;
  const taskEntry = pData[baseKey] || {};
  const fbList: any[] = taskEntry.fb || [];
  const entry = fbList.find((f: any) => f.id === id);

  if (!entry) {
    res.status(404).json({ error: 'not_found', message: 'Saved feedback not found in your Writing Portfolio.' });
    return;
  }

  const uObj = getUnit(unit);
  const found = getWritingTask(unit, taskId);
  const uAnswers = (unitDoc?.data as any)?.answers || {};
  const revKey = found?.task?.revisionOf ? `${unit}:${found.task.id}` : `${unit}:${taskId}r`;
  const revText = String(uAnswers[revKey] || '').trim();
  const hasRevision = !!revText;

  // The persisted snapshot is the source of truth. An older analysis without one keeps its gaps
  // explicit: no current draft, today's model or a guessed support flag stands in for what was not recorded.
  const row = await prisma.mainWriteAnalysis.findFirst({ where: { id, userId: req.user!.id, unit, baseTaskId: taskId } });
  const laterRevision = row && row.draft === 'first'
    ? await prisma.mainWriteAnalysis.findFirst({ where: { userId: req.user!.id, unit, baseTaskId: taskId, draft: 'revised', createdAt: { gt: row.createdAt } }, orderBy: { createdAt: 'desc' } })
    : null;
  const bool = (v: unknown) => (typeof v === 'boolean' ? v : null);
  const legacyText = typeof entry.text === 'string' && entry.text.trim() ? entry.text : null;
  const draft: 'first' | 'revised' = (row?.draft as any) || entry.draft || 'first';
  const revision = draft === 'first'
    ? (laterRevision ? { text: laterRevision.text, analysedAt: laterRevision.createdAt.toISOString(), snapshot: true } : hasRevision ? { text: revText, analysedAt: null, snapshot: false } : null)
    : null;

  const exportData: ExportFeedbackData = {
    unit,
    unitTitle: uObj?.meta?.title || `Unit ${unit}`,
    taskId,
    taskKind: found?.task?.kind || 'Writing task',
    taskTitle: found?.task?.title || taskId,
    taskObjective: `Target: ${found?.task?.min || '—'}–${found?.task?.max || '—'} words`,
    taskPrompt: found?.task?.prompt || '',
    learnerText: row ? row.text : legacyText,
    snapshot: !!row || !!legacyText,
    words: row ? row.words : (entry.words || 0),
    draft,
    supportUsed: row ? row.supportUsed : bool(entry.support?.used),
    supportLevel: row ? row.supportLevel : (typeof entry.support?.level === 'string' ? entry.support.level : null),
    supportOpenedBeforeWriting: row ? row.supportOpenedBeforeWriting : bool(entry.support?.openedBeforeWriting),
    createdAt: row ? row.createdAt.toISOString() : (entry.at || ''),
    model: row ? row.model : (typeof entry.model === 'string' && entry.model ? entry.model : null),
    promptVersion: row ? row.promptVersion : (typeof entry.promptVersion === 'string' && entry.promptVersion ? entry.promptVersion : null),
    expectedRegister: row ? row.expectedRegister : null,
    feedback: row ? row.feedback : entry.f,
    revisionExists: hasRevision || !!laterRevision,
    revision,
  };

  if (format === 'md' || format === 'markdown' || format === 'json') {
    if (format === 'json') {
      res.json(exportData);
      return;
    }
    const md = generateFeedbackMarkdown(exportData);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="feedback-unit${unit}-${taskId}.md"`);
    res.send(md);
    return;
  }

  const pdf = await pdfWithFallback(() => mainWriteHtml(exportData), `A Mind in English · Main Write feedback · Unit ${unit}`, () => generateFeedbackPdf(exportData));
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="feedback-unit${unit}-${taskId}.pdf"`);
  res.setHeader('Cache-Control', 'private, no-store');
  res.send(pdf);
});

aiRouter.post('/explain', requireNonDemoAi, requireAi('explain'), explainLimiter, async (req: Request, res: Response): Promise<void> => {
  const parsed = explainSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid request' });
    return;
  }
  const prompt = buildExplainPrompt({ ...parsed.data, unitId: parsed.data.unit });
  if (!prompt) {
    res.status(404).json({ error: 'not_found', message: 'Unknown unit' });
    return;
  }
  try {
    const explanation = await callStructured({
      fn: 'explain',
      name: 'explanation',
      system: prompt.system,
      user: prompt.user,
      schema: ExplainSchema,
      maxTokens: MAX_OUT.explain,
    });
    console.info(`[ai] explain unit=${parsed.data.unit} chars=${parsed.data.selection.length}`);
    res.json({ success: true, explanation });
  } catch (err) {
    sendAiError(res, err, 'explain');
  }
});

// Optional, on click: questions and flags about a long-form outline. Never writes the essay.
aiRouter.post('/outline-feedback', requireNonDemoAi, requireAi('outline'), feedbackLimiter, async (req: Request, res: Response): Promise<void> => {
  const parsed = outlineSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid request' });
    return;
  }
  const prompt = buildOutlinePrompt({ unitId: parsed.data.unit, taskId: parsed.data.taskId, outline: parsed.data.outline });
  if (!prompt) {
    res.status(404).json({ error: 'not_found', message: 'Unknown unit or writing task' });
    return;
  }
  try {
    const feedback = await callStructured({ fn: 'outline', name: 'outline_feedback', system: prompt.system, user: prompt.user, schema: OutlineFeedbackSchema, maxTokens: MAX_OUT.outline });
    console.info(`[ai] outline feedback unit=${parsed.data.unit} task=${parsed.data.taskId} words=${countWords(parsed.data.outline)}`);
    res.json({ success: true, feedback, createdAt: new Date().toISOString() });
  } catch (err) {
    sendAiError(res, err, 'outline feedback');
  }
});

// Optional, on click: feedback on a Teacher Lens explanation (Reviews only). No scores, no teacher rating.
aiRouter.post('/teacher-lens-feedback', requireNonDemoAi, requireAi('teacherLens'), feedbackLimiter, async (req: Request, res: Response): Promise<void> => {
  const parsed = teacherLensSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid request' });
    return;
  }
  const d = parsed.data, review = getUnit(d.review);
  const known = (review?.data?.teacherLens?.points || []).find((p: any) => p.id === d.pointId);
  const point = d.pointId === 'other' ? d.customPoint : known ? `${known.label} (Unit ${known.unit})` : '';
  if (!review || !point) {
    res.status(d.pointId === 'other' ? 400 : 404).json({ error: d.pointId === 'other' ? 'validation_error' : 'not_found', message: d.pointId === 'other' ? 'Name the language point first' : 'Unknown review or language point' });
    return;
  }
  const prompt = buildTeacherLensPrompt({ reviewId: d.review, point, explanation: d.explanation, examples: d.examples.filter(Boolean), difficulty: d.difficulty, response: d.response, ccq: d.ccq });
  if (!prompt) {
    res.status(404).json({ error: 'not_found', message: 'Unknown review' });
    return;
  }
  try {
    const feedback = await callStructured({ fn: 'teacherLens', name: 'teacher_lens_feedback', system: prompt.system, user: prompt.user, schema: TeacherLensFeedbackSchema, maxTokens: MAX_OUT.teacherLens });
    console.info(`[ai] teacher lens feedback review=${d.review} point=${d.pointId} words=${countWords(d.explanation)}`);
    res.json({ success: true, feedback, createdAt: new Date().toISOString() });
  } catch (err) {
    sendAiError(res, err, 'teacher lens feedback');
  }
});

aiRouter.post('/light-feedback', requireNonDemoAi, requireAi('lightLanguage'), feedbackLimiter, async (req: Request, res: Response): Promise<void> => {
  const parsed = lightFeedbackSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid request' });
    return;
  }
  const prompt = buildLightLanguagePrompt({
    unitId: parsed.data.unit,
    stage: parsed.data.stage,
    taskId: parsed.data.taskId,
    taskPrompt: parsed.data.taskPrompt,
    text: parsed.data.text,
  });
  if (!prompt) {
    res.status(404).json({ error: 'not_found', message: 'Unknown unit' });
    return;
  }
  try {
    const feedback = await callStructured({
      fn: 'lightLanguage',
      name: 'light_language_feedback',
      system: prompt.system,
      user: prompt.user,
      schema: LightLanguageFeedbackSchema,
      maxTokens: MAX_OUT.lightLanguage,
    });
    console.info(`[ai] light feedback unit=${parsed.data.unit} task=${parsed.data.taskId} words=${countWords(parsed.data.text)}`);
    res.json({ success: true, feedback, createdAt: new Date().toISOString() });
  } catch (err) {
    sendAiError(res, err, 'light feedback');
  }
});

aiRouter.post('/interpret-feedback', requireNonDemoAi, requireAi('interpretItem'), feedbackLimiter, async (req: Request, res: Response): Promise<void> => {
  const parsed = interpretFeedbackReqSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid request' });
    return;
  }
  const prompt = buildInterpretFeedbackPrompt({
    unitId: parsed.data.unit,
    itemId: parsed.data.itemId,
    text: parsed.data.text,
  });
  if (!prompt) {
    res.status(404).json({ error: 'not_found', message: 'Unknown unit or interpret item' });
    return;
  }
  try {
    const feedback = await callStructured({
      fn: 'interpretItem',
      name: 'interpret_item_feedback',
      system: prompt.system,
      user: prompt.user,
      schema: InterpretItemFeedbackSchema,
      maxTokens: MAX_OUT.interpretItem,
    });
    console.info(`[ai] interpret feedback unit=${parsed.data.unit} item=${parsed.data.itemId} words=${countWords(parsed.data.text)}`);
    res.json({ success: true, feedback, createdAt: new Date().toISOString() });
  } catch (err) {
    sendAiError(res, err, 'interpret feedback');
  }
});

aiRouter.post('/explain-question', requireNonDemoAi, requireAi('explainQuestion'), explainLimiter, async (req: Request, res: Response): Promise<void> => {
  const parsed = explainQuestionReqSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid request' });
    return;
  }
  const prompt = buildExplainQuestionPrompt({
    unitId: parsed.data.unit,
    stage: parsed.data.stage,
    taskId: parsed.data.taskId,
    questionText: parsed.data.questionText,
  });
  if (!prompt) {
    res.status(404).json({ error: 'not_found', message: 'Unknown unit' });
    return;
  }
  try {
    const explanation = await callStructured({
      fn: 'explainQuestion',
      name: 'explain_question',
      system: prompt.system,
      user: prompt.user,
      schema: ExplainQuestionSchema,
      maxTokens: MAX_OUT.explainQuestion,
    });
    console.info(`[ai] explain question unit=${parsed.data.unit} task=${parsed.data.taskId}`);
    res.json({ success: true, explanation, createdAt: new Date().toISOString() });
  } catch (err) {
    sendAiError(res, err, 'explain question');
  }
});

// On click only ("compare registers"): one call, five registers, no history, nothing saved server-side.
aiRouter.post('/register-compare', requireNonDemoAi, requireAi('registerCompare'), registerLimiter, async (req: Request, res: Response): Promise<void> => {
  const parsed = registerCompareReqSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation_error', message: parsed.error.issues[0]?.message || 'Invalid request' });
    return;
  }
  const d = parsed.data;
  // The learner's own draft never travels beyond the selected words
  const context = d.source === 'mine' || d.context.trim() === d.selection ? '' : d.context.trim();
  const prompt = buildRegisterComparePrompt({ unitId: d.unit, section: d.section, source: d.source, selection: d.selection, context });
  if (!prompt) {
    res.status(404).json({ error: 'not_found', message: 'Unknown unit' });
    return;
  }
  try {
    const out = await callStructured({ fn: 'registerCompare', name: 'register_compare', system: prompt.system, user: prompt.user, schema: RegisterCompareSchema, maxTokens: MAX_OUT.registerCompare });
    if (out.canCompare && REGISTER_KEYS.some((k) => !String(out.registers?.[k]?.example || '').trim())) {
      res.status(502).json({ error: 'ai_bad_output', message: 'The AI response was incomplete. Try again later.' });
      return;
    }
    const comparison = { ...out, original: d.selection, changes: out.canCompare ? (out.changes || []).slice(0, 4) : [] };
    // Metadata only: never the selected text
    console.info(`[ai] register compare unit=${d.unit} source=${d.source} chars=${d.selection.length} context=${context ? 1 : 0} ok=${out.canCompare ? 1 : 0}`);
    res.json({ success: true, comparison });
  } catch (err) {
    sendAiError(res, err, 'register compare');
  }
});
