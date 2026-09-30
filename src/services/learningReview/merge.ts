import type { ActivityInfo, EvidenceItem, OpportunityInfo, Origin, Provenance } from './evidence';
import { clip } from './evidence';
import type { LearningReviewOutput, Observation } from './schema';

/* Learning Review · the server's authority. The model interprets; this file decides what the
   interpretation is allowed to claim. Counts, dates, status and confidence come from the evidence:
     • a reference that is not in this run's evidence is dropped;
     • one occurrence is a one-off, two a possible pattern, "recurring" needs ≥3 in ≥2 activities;
     • positive counter-evidence prevents false recurring difficulties;
     • support_used does not count as independent mastery;
     • human judgment (agree / disagree / not_sure) is respected; explicitly rejected hypotheses
       are never propagated as facts;
     • proposals only target an eligible activity of the next unstudied unit, and only for a
       recurring difficulty with at least moderate confidence. Nothing is ever applied. */

export type Confidence = 'low' | 'moderate' | 'high';
export type Status = 'one_off' | 'possible_pattern' | 'recurring' | 'improving' | 'apparently_resolved'
  | 'emerging' | 'getting_stronger' | 'recognition_to_production' | 'rejected_by_human';
export type HumanJudgment = 'agree' | 'disagree' | 'not_sure';

export interface EvRef {
  id: string;
  label: string;
  origin: Origin;
  provenance: Provenance;
  kind: string;
  at: string | null;
  snippet: string;
  runId: string;
  activity: string;
  positive?: boolean;
  opportunity?: OpportunityInfo;
  supportUsed?: boolean;
  afterFeedback?: boolean;
}

export interface PatternState {
  key: string;
  label: string;
  track: 'difficulty' | 'positive';
  status: Status;
  confidence: Confidence;
  evidence: EvRef[];
  counterEvidence: EvRef[];
  activityCount: number;
  sourceCount: number;
  firstSeen: string;
  lastSeen: string;
  interpretation: string;
  implication: string;
  humanJudgment?: HumanJudgment | null;
  opportunitySummary?: string;
  history: { runId: string; at: string; status: Status; humanJudgment?: HumanJudgment | null }[];
}

export interface ReportObservation {
  key: string;
  label: string;
  status: Status;
  confidence: Confidence;
  evidenceCount: number;
  activityCount: number;
  sourceCount: number;
  firstSeen: string;
  lastSeen: string;
  interpretation: string;
  implication: string;
  evidence: EvRef[];
  counterEvidence: EvRef[];
  humanJudgment?: HumanJudgment | null;
  opportunitySummary?: string;
}

export interface ReportProposal {
  unit: string;
  unitTitle: string;
  activityId: string;
  activityLabel: string;
  stage: string;
  action: 'adapt' | 'replace' | 'add';
  currentObjective: string;
  evidence: EvRef[];
  patterns: string[];
  proposedChange: string;
  rationale: string;
  workloadImpact: 'same' | 'lower' | 'higher';
  constraints: string[];
  risks: string;
  status: 'proposed · not applied';
}

export interface LearningReport {
  version: 1;
  runId: string;
  generatedAt: string;
  trigger: string;
  period: { from: string | null; to: string };
  evidence: {
    total: number;
    deferred: number;
    byOrigin: Record<Origin, number>;
    byProvenance: Record<string, number>;
    byKind: Record<string, number>;
    activities: string[];
  };
  workedOn: { area: string; facts: string; activities: string[] }[];
  ledger: EvRef[]; // Factual Learning Ledger
  sections: {
    gettingStronger: ReportObservation[];
    emerging: ReportObservation[];
    recurring: ReportObservation[];
    improving: ReportObservation[];
    recognitionToProduction: ReportObservation[];
    notEnoughEvidence: { label: string; note: string; evidence: EvRef[] }[];
  };
  nextSession: { action: string; why: string; evidence: EvRef[] }[];
  proposals: ReportProposal[];
  uncertainties: string[];   // the model's own stated limits (AI)
  warnings: string[];        // the app's deterministic notes (FACT)
  model: { name: string; reasoning: string; promptVersion: string };
}

const RANK: Record<Confidence, number> = { low: 0, moderate: 1, high: 2 };
const minConf = (a: Confidence, b: Confidence): Confidence => (RANK[a] <= RANK[b] ? a : b);
export const normKey = (k: string) => String(k || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 48) || 'pattern';
const MAX_REFS = 8;

export function toRef(e: EvidenceItem, runId: string): EvRef {
  return {
    id: e.id,
    label: e.activityLabel,
    origin: e.origin,
    provenance: e.provenance,
    kind: e.kind,
    at: e.at,
    snippet: clip(e.text, 240),
    runId,
    activity: `${e.unit}:${e.activityId}`,
    positive: e.positive,
    opportunity: e.opportunity,
    supportUsed: e.supportUsed,
    afterFeedback: e.afterFeedback,
  };
}

const uniq = (refs: EvRef[]) => {
  const s = new Set<string>();
  return refs.filter((r) => (s.has(r.id) ? false : (s.add(r.id), true)));
};
const activities = (refs: EvRef[]) => new Set(refs.map((r) => r.activity)).size;
const sources = (refs: EvRef[]) => new Set(refs.map((r) => `${r.origin}:${r.kind}`)).size;

/** What the evidence can support, whatever the model claims. */
export function evidenceConfidence(refs: EvRef[], counterRefs: EvRef[] = []): Confidence {
  const direct = refs.filter((r) => r.origin !== 'ai');
  if (!direct.length) return 'low';                          // earlier AI feedback alone never carries a pattern
  const independent = direct.filter((r) => !r.supportUsed);
  if (!independent.length) return 'low';                      // only supported production -> low confidence

  // Counter evidence lowers confidence in a difficulty pattern
  if (counterRefs.length >= refs.length && counterRefs.length > 0) return 'low';

  const n = refs.length, a = activities(refs), s = sources(refs);
  if (n >= 5 && a >= 3 && s >= 2) return 'high';
  if (n >= 3 && a >= 2) return 'moderate';
  return 'low';
}

export function difficultyStatus(allFor: EvRef[], allAgainst: EvRef[] = []): Status {
  // Strong counter-evidence prevents false recurring difficulty
  if (allAgainst.length >= 2 * allFor.length && allAgainst.length >= 2) {
    return 'one_off';
  }
  if (allAgainst.length >= 4 && allFor.length <= 2) {
    return 'one_off';
  }
  if (allFor.length >= 3 && activities(allFor) >= 2) return 'recurring';
  return allFor.length >= 2 ? 'possible_pattern' : 'one_off';
}

const GENERIC = /^(try to |you should |keep |continue to )?(improve|work on|practi[cs]e|expand|review|revise|focus on)( your)? (grammar|vocabulary|writing|reading|speaking|listening|english|accuracy|fluency)\.?$|^read more\.?$|^practi[cs]e more\.?$/i;
export const isGeneric = (s: string) => GENERIC.test(String(s || '').trim()) || String(s || '').trim().split(/\s+/).length < 4;

export const PROPOSAL_STAGES = new Set(['know', 'interpret', 'notice', 'steal', 'think', 'write']);
export const PROPOSAL_TYPES = new Set(['open', 'produce', 'writing']);
export const BASE_CONSTRAINTS = [
  'Same approximate workload as the current activity.',
  'Preserve the activity\'s original pedagogical objective.',
  'Do not introduce grammar beyond the unit\'s own targets.',
  'Do not reveal or imply answers.',
  'Do not increase the expected word count.',
];

export interface MergeInput {
  runId: string;
  now: string;
  trigger: string;
  period: { from: string | null; to: string };
  batch: EvidenceItem[];
  deferred: number;
  refs: Map<string, string>;                         // evidence id -> E#
  prior: PatternState[];                             // P1… in this order
  output: LearningReviewOutput;
  nextUnit: { id: string; title: string; candidates: ActivityInfo[] } | null;
  model: { name: string; reasoning: string; promptVersion: string };
  hintPairs: { glossaryId: string; productionId: string }[];
  judgments?: Record<string, HumanJudgment>;
  humanJudgments?: Record<string, HumanJudgment>;
}

export function mergeReview(input: MergeInput): { report: LearningReport; patterns: PatternState[] } {
  const { runId, now, batch, prior, output } = input;
  const judgments = input.humanJudgments || input.judgments || {};
  const byRef = new Map<string, EvidenceItem>();
  batch.forEach((e) => { const r = input.refs.get(e.id); if (r && r.startsWith('E')) byRef.set(r, e); });
  const resolve = (refs: string[]) => uniq((refs || []).map((r) => byRef.get(String(r).trim().toUpperCase())).filter(Boolean).map((e) => toRef(e!, runId)));
  const warnings: string[] = [];
  let droppedObs = 0;

  const patterns = new Map<string, PatternState>(prior.map((p) => {
    const clone: PatternState = JSON.parse(JSON.stringify(p));
    if (judgments[clone.key]) clone.humanJudgment = judgments[clone.key];
    return [clone.key, clone];
  }));
  const touched: { p: PatternState; newFor: EvRef[]; newAgainst: EvRef[] }[] = [];

  for (const o of output.observations as Observation[]) {
    const newFor = resolve(o.evidenceFor), newAgainst = resolve(o.evidenceAgainst);
    if (!newFor.length && !newAgainst.length) { droppedObs++; continue; }
    const pm = o.priorPattern && /^P\d+$/i.test(o.priorPattern) ? prior[Number(o.priorPattern.slice(1)) - 1] : undefined;
    const key = pm ? pm.key : normKey(o.patternKey);
    const before = patterns.get(key);

    const currentJudgment = judgments[key] || before?.humanJudgment || null;
    const wasRejected = currentJudgment === 'disagree';

    const difficultyTrack = ['difficulty', 'improving', 'resolved'].includes(o.kind);
    let status: Status, track: 'difficulty' | 'positive' = difficultyTrack ? 'difficulty' : 'positive';
    let allFor = uniq([...(before && !wasRejected ? before.evidence : []), ...newFor]);
    const allAgainst = uniq([...(before?.counterEvidence || []), ...newAgainst]);
    const priorDifficulty = before && !wasRejected && before.track === 'difficulty' && before.evidence.length > 0;

    if (wasRejected) {
      status = 'rejected_by_human';
    } else if (o.kind === 'resolved' && priorDifficulty && ['recurring', 'improving', 'possible_pattern'].includes(before!.status)
      && newAgainst.length >= 2 && activities(newAgainst) >= 2 && newFor.length === 0) {
      status = 'apparently_resolved';
    } else if ((o.kind === 'resolved' || o.kind === 'improving') && priorDifficulty && newAgainst.length >= 1) {
      status = 'improving';
    } else if (difficultyTrack) {
      if (!newFor.length) { // "improving" without prior difficulty: what is left is a positive observation
        track = 'positive';
        allFor = uniq([...(before?.track === 'positive' ? before.evidence : []), ...newAgainst]);
        status = allFor.length >= 2 && activities(allFor) >= 2 ? 'getting_stronger' : 'emerging';
      } else {
        status = difficultyStatus(allFor, allAgainst);
      }
    } else if (o.kind === 'recognition_to_production') {
      const produced = newFor.filter((r) => ['open_answer', 'writing_draft', 'justification', 'conversation_turns', 'speaking_transcript', 'personal_retrieval_answer', 'metacognition', 'listening_answer', 'outline'].includes(r.kind));
      const recognised = newFor.some((r) => r.origin === 'record' || r.origin === 'check') || (before?.evidence || []).some((r) => r.origin === 'record' || r.origin === 'check')
        || input.hintPairs.some((h) => produced.some((p) => p.id === h.productionId));
      status = produced.length && recognised ? 'recognition_to_production' : 'emerging';
    } else {
      status = allFor.length >= 2 && activities(allFor) >= 2 && o.kind === 'strength' ? 'getting_stronger' : 'emerging';
    }

    const basis = status === 'improving' || status === 'apparently_resolved' ? uniq([...allFor, ...allAgainst]) : allFor;
    let confidence = minConf(o.claimedConfidence, evidenceConfidence(basis, allAgainst));
    if (status === 'one_off') confidence = 'low';

    const dates = [...newFor, ...newAgainst].map((r) => r.at).filter(Boolean) as string[];

    const p: PatternState = {
      key,
      label: clip(o.label, 120),
      track,
      status,
      confidence,
      evidence: allFor.slice(-MAX_REFS),
      counterEvidence: allAgainst.slice(-MAX_REFS),
      activityCount: activities(uniq([...allFor, ...allAgainst])),
      sourceCount: sources(uniq([...allFor, ...allAgainst])),
      firstSeen: before?.firstSeen || (dates.length ? dates.sort()[0] : now),
      lastSeen: dates.length ? dates.sort().slice(-1)[0] > now ? now : dates.sort().slice(-1)[0] : now,
      interpretation: clip(o.interpretation, 600),
      implication: clip(o.implication, 360),
      humanJudgment: currentJudgment,
      history: [...(before?.history || []), { runId, at: now, status, humanJudgment: currentJudgment }].slice(-10),
    };
    if (p.lastSeen < p.firstSeen) p.lastSeen = p.firstSeen;
    patterns.set(key, p);
    touched.push({ p, newFor, newAgainst });
  }

  if (droppedObs) warnings.push(`${droppedObs} AI observation(s) were discarded because they cited no evidence from this period.`);

  const view = (p: PatternState): ReportObservation => ({
    key: p.key,
    label: p.label,
    status: p.status,
    confidence: p.confidence,
    evidenceCount: p.evidence.length,
    activityCount: p.activityCount,
    sourceCount: p.sourceCount,
    firstSeen: p.firstSeen,
    lastSeen: p.lastSeen,
    interpretation: p.interpretation,
    implication: p.implication,
    evidence: p.evidence,
    counterEvidence: p.counterEvidence,
    humanJudgment: p.humanJudgment,
  });

  const shown = new Map<string, PatternState>();
  touched.forEach((t) => shown.set(t.p.key, t.p));
  const list = [...shown.values()];
  const by = (...s: Status[]) => list.filter((p) => s.includes(p.status)).map(view);

  const notEnough: LearningReport['sections']['notEnoughEvidence'] = [];
  list.filter((p) => p.status === 'one_off' || p.status === 'possible_pattern').forEach((p) => notEnough.push({
    label: p.label,
    evidence: p.evidence,
    note: p.status === 'one_off' ? 'Seen once so far. A single occurrence is not treated as a difficulty.' : `Seen ${p.evidence.length} times${p.activityCount < 2 ? ' in one activity' : ''}. Not yet enough to call it a recurring pattern.`,
  }));
  (output.notEnoughEvidence || []).forEach((n) => notEnough.push({ label: clip(n.label, 120), note: clip(n.note, 360), evidence: resolve(n.evidence) }));

  const surviving = new Set(list.map((p) => p.key));
  const nextSession = (output.nextSession || []).map((n) => ({ n, ev: resolve(n.evidence), keys: (n.patternKeys || []).map(normKey).filter((k) => surviving.has(k)) }))
    .filter(({ n, ev, keys }) => !isGeneric(n.action) && (ev.length || keys.length))
    .slice(0, 3)
    .map(({ n, ev, keys }) => ({ action: clip(n.action, 300), why: clip(n.why, 360), evidence: ev.length ? ev : keys.flatMap((k) => shown.get(k)!.evidence.slice(-2)) }));
  const genericDropped = (output.nextSession || []).length - nextSession.length;
  if (genericDropped > 0) warnings.push(`${genericDropped} next-session suggestion(s) were discarded for being generic or not tied to evidence.`);

  // Proposals: specification only, never applied.
  const proposals: ReportProposal[] = [];
  let withheld = 0;
  const cand = new Map((input.nextUnit?.candidates || []).map((a) => [a.id, a]));
  for (const pr of output.proposals || []) {
    const a = cand.get(String(pr.activityId).trim());
    const keys = (pr.patternKeys || []).map(normKey).filter((k) => surviving.has(k));
    const support = keys.map((k) => shown.get(k)!).filter((p) => p.track === 'difficulty' && ['recurring', 'improving'].includes(p.status) && RANK[p.confidence] >= RANK.moderate);
    if (!input.nextUnit || !a || !support.length || proposals.some((x) => x.activityId === a.id) || proposals.length >= 2) { withheld++; continue; }
    proposals.push({
      unit: input.nextUnit.id,
      unitTitle: input.nextUnit.title,
      activityId: a.id,
      stage: a.stage,
      activityLabel: `Unit ${input.nextUnit.id} · ${a.stage.toUpperCase()} · ${a.id}${a.tag ? ` (${a.tag})` : ''}`,
      action: pr.action,
      currentObjective: `${a.stage.toUpperCase()}${a.tag ? ` · ${a.tag}` : ''} · "${a.q}"${a.min ? ` (${a.min}–${a.max} words)` : ''}`,
      evidence: uniq(support.flatMap((p) => p.evidence.slice(-3))).slice(0, 6),
      patterns: support.map((p) => p.label),
      proposedChange: clip(pr.proposedChange, 700),
      rationale: clip(pr.rationale, 420),
      workloadImpact: pr.workloadImpact,
      constraints: [...BASE_CONSTRAINTS, ...(a.min ? [`Keep the ${a.min}–${a.max} word range.`] : []), ...(pr.extraConstraints || []).map((c) => clip(c, 200))],
      risks: clip(pr.risks, 420) || '—',
      status: 'proposed · not applied',
    });
    if (pr.action === 'add' || pr.workloadImpact === 'higher') warnings.push(`The proposal for ${a.id} would increase the workload of Unit ${input.nextUnit.id}; prefer adapting an existing activity.`);
  }
  if (withheld) warnings.push(`${withheld} adaptation proposal(s) were withheld: the evidence was not strong enough, or the target was not an eligible activity of the next unit.`);
  if (input.deferred) warnings.push(`${input.deferred} newer evidence item(s) did not fit in this review and will be analysed in the next one.`);
  if (!batch.some((e) => e.origin === 'learner')) warnings.push('This period contains no new writing or answers of your own, only checks, records or earlier AI feedback.');
  if (batch.some((e) => e.origin === 'ai')) warnings.push('Earlier AI feedback was treated as secondary evidence: no pattern rests on it alone.');

  const byOrigin = { learner: 0, check: 0, record: 0, ai: 0 } as Record<Origin, number>;
  const byProvenance: Record<string, number> = {};
  const byKind: Record<string, number> = {};
  batch.forEach((e) => {
    byOrigin[e.origin]++;
    byProvenance[e.provenance] = (byProvenance[e.provenance] || 0) + 1;
    byKind[e.kind] = (byKind[e.kind] || 0) + 1;
  });

  const groups = new Map<string, EvidenceItem[]>();
  batch.forEach((e) => { const area = e.activityLabel.split(' · ').slice(0, 2).join(' · '); groups.set(area, [...(groups.get(area) || []), e]); });
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const workedOn = [...groups.entries()].map(([area, items]) => {
    const c = (o: Origin) => items.filter((i) => i.origin === o).length;
    const parts = [c('learner') && plural(c('learner'), 'piece') + ' of your own work', c('check') && plural(c('check'), 'checked answer'), c('record') && plural(c('record'), 'record'), c('ai') && plural(c('ai'), 'earlier AI assessment')].filter(Boolean);
    return { area, facts: parts.join(', '), activities: [...new Set(items.map((i) => i.activityLabel.split(' · ').slice(2).join(' · ') || i.activityLabel))] };
  });

  const ledger: EvRef[] = batch.map((e) => toRef(e, runId));

  const report: LearningReport = {
    version: 1,
    runId,
    generatedAt: now,
    trigger: input.trigger,
    period: input.period,
    evidence: {
      total: batch.length,
      deferred: input.deferred,
      byOrigin,
      byProvenance,
      byKind,
      activities: [...new Set(batch.map((e) => e.activityLabel))],
    },
    workedOn,
    ledger,
    sections: {
      gettingStronger: by('getting_stronger'),
      emerging: by('emerging'),
      recurring: by('recurring'),
      improving: by('improving', 'apparently_resolved'),
      recognitionToProduction: by('recognition_to_production'),
      notEnoughEvidence: notEnough,
    },
    nextSession,
    proposals,
    uncertainties: (output.uncertainties || []).map((u) => clip(u, 360)).filter(Boolean),
    warnings,
    model: input.model,
  };
  return { report, patterns: [...patterns.values()] };
}
