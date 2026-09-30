import crypto from 'crypto';
import { prisma } from '../../prisma';
import { config } from '../../config';
import { AiRequestError, AiUnavailableError, callStructuredWithUsage, isAiAvailable } from '../ai/provider';
import { contentIndex } from '../content';
import { activityIndex, EVIDENCE_DOC, EvidenceItem, extractEvidence, newEvidence, DocLike } from './evidence';
import { buildLearningReviewPrompt, PROMPT_VERSION } from './prompt';
import { LearningReviewOutputSchema } from './schema';
import { LearningReport, mergeReview, PatternState, PROPOSAL_STAGES, PROPOSAL_TYPES, normalizeJudgments, judgmentApplies } from './merge';

/* The ONE Learning Review pipeline. "Run review now" and the nightly job both call runLearningReview;
   there is no second, simplified path.
     1. take the learner's lease (DB row, compare-and-swap; works across processes and restarts)
     2. for nightly runs: check study time threshold (>=60 min accumulated study since last review)
     3. read synced documents, compute evidence and diff it against stored boundary.
        Nothing new → release, return. ZERO AI calls.
     4. record the run (from/to, doc revisions, evidence ids, model), call the model once
     5. validate, apply deterministic guards & human judgments, commit report + boundary + patterns
   A failure never touches the state: previous report stays current and same evidence is kept. */

export const FN = 'nightlyLearningReview' as const;
const LEASE_MS = () => config.learningReview.timeoutMs + 60_000;

export type RunResult =
  | { status: 'completed'; runId: string; report: LearningReport }
  | { status: 'no_new_evidence' }
  | { status: 'below_study_threshold'; studyMinutes: number; requiredMinutes: number }
  | { status: 'busy' }
  | { status: 'failed'; runId: string; code: string };

// Metadata only: never answers, drafts, transcripts, snippets or report content.
const log = (msg: string) => console.info(`[learning-review] ${msg}`);

async function loadDocs(userId: string): Promise<DocLike[]> {
  const docs = await prisma.userDocument.findMany({ where: { userId }, select: { key: true, data: true, revision: true, updatedAt: true } });
  return docs.filter((d) => EVIDENCE_DOC(d.key));
}

async function ensureState(userId: string) {
  try {
    await prisma.learningReviewState.create({ data: { userId } });
  } catch { /* exists already: fine */ }
}

/** Lease: exactly one holder at a time; an expired lease (crash, restart) can be taken over. */
async function acquireLease(userId: string, runId: string): Promise<boolean> {
  await ensureState(userId);
  const now = new Date();
  const got = await prisma.learningReviewState.updateMany({
    where: { userId, OR: [{ leaseExpiresAt: null }, { leaseExpiresAt: { lt: now } }] },
    data: { leaseRunId: runId, leaseExpiresAt: new Date(now.getTime() + LEASE_MS()) },
  });
  return got.count === 1;
}

async function releaseLease(userId: string, runId: string) {
  await prisma.learningReviewState.updateMany({ where: { userId, leaseRunId: runId }, data: { leaseRunId: null, leaseExpiresAt: null } });
}

// Same rules as the browser (public/study-timer.js): real recorded intervals, overlaps counted once
type StudyRules = { secondsSince(study: unknown, sinceMs: number | null, untilMs?: number | null): number };
const studyRules: StudyRules = require('../../../public/study-timer.js');
export const NIGHTLY_MIN_STUDY_MINUTES = 60;

/** Study minutes recorded since the last successful review (its toAt), across any number of days.
    Only closed sessions count, and only the part after the boundary. There is no per-session
    maximum: a confirmed long session counts in full (abandoned ones are ended by the timer rules). */
export async function getAccumulatedStudyMinutes(userId: string, sinceDate: Date | null): Promise<number> {
  const timerDoc = await prisma.userDocument.findUnique({
    where: { userId_key: { userId, key: 'study-timer' } },
  });
  if (!timerDoc || !timerDoc.data) return 0;
  return Math.floor(studyRules.secondsSince(timerDoc.data, sinceDate ? sinceDate.getTime() : null, Date.now()) / 60);
}

/** The next unit not yet studied: the first unit after the furthest one with any work in it. */
export function nextUnstudiedUnit(docs: DocLike[]) {
  const { unitIds, units } = contentIndex();
  const studied = new Set(docs.filter((d) => /^unit:\d\d$/.test(d.key)).filter((d) => {
    const a = d.data?.answers || {}, s = d.data?.sections || {};
    // Writing Support choice/use is metadata, not work
    return d.data?.done || Object.entries(a).some(([k, v]) => !/:support(Level)?$/.test(k) && v !== '' && v != null && v !== false) || Object.values(s).some(Boolean);
  }).map((d) => d.key.slice(5)));
  if (!studied.size) return null;
  const furthest = Math.max(...unitIds.map((id, i) => (studied.has(id) ? i : -1)));
  const next = unitIds.slice(furthest + 1).find((id) => !studied.has(id));
  if (!next) return null;
  const candidates = [...activityIndex(next).values()].filter((a) => PROPOSAL_STAGES.has(a.stage) && PROPOSAL_TYPES.has(a.type));
  return { id: next, title: String(units[next]?.title || ''), candidates };
}

/** Glossary items rated LEARNING/KNOW that reappear in the learner's own new production (computed, not AI). */
export function recognitionHints(all: EvidenceItem[], batch: EvidenceItem[]) {
  const terms = all.filter((e) => e.kind === 'glossary_status' && /marked (LEARNING|KNOW)$/.test(e.text))
    .map((e) => ({ id: e.id, term: (e.text.match(/^"(.+)" marked/) || [])[1] || '' })).filter((t) => t.term.replace(/…$/, '').length >= 4);
  const out: { glossaryId: string; productionId: string; line: string }[] = [];
  for (const t of terms) {
    const needle = t.term.replace(/…$/, '').toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(^|[^a-z])${needle}([^a-z]|$)`, 'i');
    batch.filter((e) => e.production && e.origin === 'learner' && re.test(e.text)).forEach((p) =>
      out.push({ glossaryId: t.id, productionId: p.id, line: `Glossary item "${t.term}" appears in the learner's own text: ${p.activityLabel}` }));
  }
  return out.slice(0, 8);
}

/** Deterministic, no AI: how much evidence is waiting, study time accumulated, and is a run in progress. */
export async function learningReviewStatus(userId: string) {
  const [state, docs] = await Promise.all([prisma.learningReviewState.findUnique({ where: { userId } }), loadDocs(userId)]);
  const all = extractEvidence(docs);
  const { total } = newEvidence(all, (state?.analysed as any) || {}, config.learningReview.maxItems);
  const running = !!(state?.leaseExpiresAt && state.leaseExpiresAt > new Date());

  const prevRun = state?.lastSuccessfulRunId
    ? await prisma.learningReviewRun.findUnique({ where: { id: state.lastSuccessfulRunId }, select: { toAt: true } })
    : null;
  const studyMinutes = await getAccumulatedStudyMinutes(userId, prevRun?.toAt || null);

  return {
    pending: total,
    running,
    lastSuccessfulRunId: state?.lastSuccessfulRunId || null,
    studyMinutes,
    nightlyEligible: studyMinutes >= NIGHTLY_MIN_STUDY_MINUTES && total > 0,
  };
}

export async function runLearningReview(userId: string, trigger: 'manual' | 'nightly'): Promise<RunResult> {
  const runId = crypto.randomUUID();
  if (!(await acquireLease(userId, runId))) { log(`busy trigger=${trigger}`); return { status: 'busy' }; }
  let recorded = false;
  try {
    const state = (await prisma.learningReviewState.findUnique({ where: { userId } }))!;
    // A run that died while holding an (now expired) lease is closed, not resumed
    if (state.leaseRunId === runId) await prisma.learningReviewRun.updateMany({ where: { userId, status: 'running' }, data: { status: 'abandoned', completedAt: new Date() } });

    const prevRun = state.lastSuccessfulRunId ? await prisma.learningReviewRun.findUnique({ where: { id: state.lastSuccessfulRunId }, select: { id: true, toAt: true } }) : null;

    // Nightly only: at least 60 study minutes accumulated since the last successful review (any number of days).
    // "Run review now" skips this, but still needs new evidence below.
    if (trigger === 'nightly') {
      const studyMinutes = await getAccumulatedStudyMinutes(userId, prevRun?.toAt || null);
      if (studyMinutes < NIGHTLY_MIN_STUDY_MINUTES) {
        log(`nightly skipped: below_study_threshold (${studyMinutes} min < ${NIGHTLY_MIN_STUDY_MINUTES} min)`);
        return { status: 'below_study_threshold', studyMinutes, requiredMinutes: NIGHTLY_MIN_STUDY_MINUTES };
      }
    }

    const docs = await loadDocs(userId);
    const analysed = (state.analysed as Record<string, string>) || {};
    const all = extractEvidence(docs);
    const { batch, deferred } = newEvidence(all, analysed, config.learningReview.maxItems);
    if (!batch.length) { log(`no_new_evidence trigger=${trigger}`); return { status: 'no_new_evidence' }; }

    const snapshotAt = new Date();
    const model = config.ai.models[FN] || '', reasoning = config.ai.reasoning[FN] || '';
    await prisma.learningReviewRun.create({ data: {
      id: runId, userId, trigger, status: 'running', fromRunId: prevRun?.id || null, fromAt: prevRun?.toAt || null, toAt: snapshotAt,
      docRevisions: Object.fromEntries(docs.map((d) => [d.key, d.revision])), evidenceIds: batch.map((e) => e.id), deferredCount: deferred,
      model, reasoning, promptVersion: PROMPT_VERSION,
    } });
    recorded = true;

    // Load human judgments on hypotheses if available
    const judgmentsDoc = await prisma.userDocument.findUnique({ where: { userId_key: { userId, key: 'learning-judgments' } } });
    const judgments = normalizeJudgments((judgmentsDoc?.data as any)?.judgments);

    // References: E# for new evidence, C# for context (earlier learner work an AI item assesses)
    const refs = new Map<string, string>();
    batch.forEach((e, i) => refs.set(e.id, `E${i + 1}`));
    const byId = new Map(all.map((e) => [e.id, e]));
    const context = [...new Set(batch.map((e) => e.linkedTo).filter((id): id is string => !!id && !refs.has(id) && byId.has(id)))].map((id) => byId.get(id)!);
    context.forEach((e, i) => refs.set(e.id, `C${i + 1}`));
    // Prior patterns with the learner's CURRENT judgments (a later change or clear is what the model sees)
    const prior = (((state.patterns as unknown) as PatternState[]) || []).map((p) => {
      const j = judgments[p.key];
      return { ...p, humanJudgment: judgmentApplies(p.hypothesisSince, j) ? j.judgment : null };
    });
    const nextUnit = nextUnstudiedUnit(docs);
    const hints = recognitionHints(all, batch);
    const prompt = buildLearningReviewPrompt({ batch, context, refs, patterns: prior, hints: hints.map((h) => h.line), nextUnit });

    log(`calling trigger=${trigger} run=${runId} items=${batch.length} context=${context.length} deferred=${deferred} prior=${prior.length} next=${nextUnit?.id || '-'}`);
    const { output } = await callStructuredWithUsage({
      fn: FN, name: 'learning_review', system: prompt.system, user: prompt.user,
      schema: LearningReviewOutputSchema, maxTokens: config.learningReview.maxOutputTokens, timeoutMs: config.learningReview.timeoutMs,
    });
    // Validate schema
    const parsed = LearningReviewOutputSchema.safeParse(output);
    if (!parsed.success) throw new AiRequestError('The AI response did not match the review format', 'bad_output');

    const now = new Date().toISOString();
    const { report, patterns } = mergeReview({
      runId, now, trigger, period: { from: prevRun?.toAt ? prevRun.toAt.toISOString() : null, to: snapshotAt.toISOString() },
      batch, deferred, refs, prior, output: parsed.data, nextUnit, hintPairs: hints, judgments,
      model: { name: model, reasoning: reasoning || 'default', promptVersion: PROMPT_VERSION },
    });
    const nextAnalysed = { ...analysed, ...Object.fromEntries(batch.map((e) => [e.id, e.hash])) };

    const committed = await prisma.$transaction(async (tx) => {
      const cas = await tx.learningReviewState.updateMany({
        where: { userId, leaseRunId: runId },
        data: { analysed: nextAnalysed, patterns: patterns as any, lastSuccessfulRunId: runId, leaseRunId: null, leaseExpiresAt: null },
      });
      if (cas.count !== 1) return false;
      await tx.learningReviewRun.update({ where: { id: runId }, data: { status: 'succeeded', report: report as any, completedAt: new Date() } });
      return true;
    });
    if (!committed) {
      await prisma.learningReviewRun.update({ where: { id: runId }, data: { status: 'failed', errorCode: 'lease_lost', completedAt: new Date() } });
      log(`failed run=${runId} code=lease_lost`);
      return { status: 'failed', runId, code: 'lease_lost' };
    }
    log(`succeeded trigger=${trigger} run=${runId} observations=${patterns.length} proposals=${report.proposals.length} warnings=${report.warnings.length}`);
    return { status: 'completed', runId, report };
  } catch (err) {
    const code = err instanceof AiUnavailableError ? 'ai_unavailable' : err instanceof AiRequestError ? `ai_${err.code}` : 'internal_error';
    if (recorded) await prisma.learningReviewRun.update({ where: { id: runId }, data: { status: 'failed', errorCode: code, completedAt: new Date() } }).catch(() => {});
    log(`failed trigger=${trigger} run=${runId} code=${code}${code === 'internal_error' ? ` err=${(err as Error)?.name}` : ''}`);
    return { status: 'failed', runId, code };
  } finally {
    await releaseLease(userId, runId).catch(() => {});
  }
}

export const learningReviewAvailable = () => isAiAvailable(FN);

/** Latest successful report plus the latest run's outcome (a failed run never replaces the report). */
export async function latestLearningReview(userId: string) {
  const state = await prisma.learningReviewState.findUnique({ where: { userId } });
  const latest = state?.lastSuccessfulRunId ? await prisma.learningReviewRun.findUnique({ where: { id: state.lastSuccessfulRunId } }) : null;
  const lastRun = await prisma.learningReviewRun.findFirst({ where: { userId }, orderBy: { startedAt: 'desc' }, select: { id: true, status: true, startedAt: true, completedAt: true, errorCode: true, trigger: true } });
  return { report: (latest?.report as unknown as LearningReport) || null, lastRun };
}
