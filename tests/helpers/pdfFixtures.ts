import type { ExportFeedbackData } from '../../src/services/ai/feedbackExport';
import type { LearningReport, ReportObservation, EvRef } from '../../src/services/learningReview/merge';

/* Layout fixtures for the designed PDFs: synthetic text written only to exercise the layout
   (short / medium / very long, few / many evidence, unknown fields, judgment present / absent).
   None of it comes from the approved visual models. */

const words = (n: number, seed = 'Layout test sentence number') => Array.from({ length: Math.ceil(n / 8) }, (_, i) => `${seed} ${i + 1} keeps the paragraph flowing, with a clause that adds a little more.`).join(' ').split(' ').slice(0, n).join(' ') + '.';
const paras = (n: number, each: number) => Array.from({ length: n }, (_, i) => words(each, `Paragraph ${i + 1} line`)).join('\n\n');
const sec = (summary: string, s = 0, i = 0) => ({ summary, strengths: Array.from({ length: s }, (_, k) => `Working point ${k + 1}: ${words(12, 'detail')}`), improvements: Array.from({ length: i }, (_, k) => `Sharpen point ${k + 1}: ${words(14, 'action')}`) });
const TYPES = ['STRONG_LANGUAGE', 'AWKWARD', 'STYLE_CHOICE', 'ERROR', 'REGISTER_MISMATCH'];

const base = (over: Partial<ExportFeedbackData>): ExportFeedbackData => ({
  unit: '07', unitTitle: 'Fixture Unit Title', taskId: '07w2', taskKind: 'Long-form reflective essay · LF', taskTitle: 'Fixture task title',
  taskObjective: 'Target: 800–1200 words', taskPrompt: words(45, 'Prompt clause'), learnerText: paras(3, 55), snapshot: true, words: 165, draft: 'first',
  supportUsed: true, supportLevel: 'medium', supportOpenedBeforeWriting: false, createdAt: '2026-10-01T09:15:00.000Z', model: 'fixture-model', promptVersion: 'main-write-v2',
  expectedRegister: 'reflective', feedback: {}, revisionExists: false, revision: null, ...over,
});

export const mainWriteFixtures: Record<string, ExportFeedbackData> = {
  'mw-short-unknown': base({
    learnerText: null, snapshot: false, words: 60, supportUsed: null, supportLevel: null, supportOpenedBeforeWriting: null, model: null, promptVersion: null, expectedRegister: null,
    taskPrompt: 'A short prompt.',
    feedback: { strengthsSummary: ['One clear strength.'], nextDraftPriorities: ['Develop the second paragraph.', 'Add one example.'], taskAchievement: sec('Short summary.'), estimatedLevel: { level: 'B2', rationale: 'Short rationale.' } },
  }),
  'mw-medium': base({
    feedback: {
      strengthsSummary: [words(20), words(12), words(14)], nextDraftPriorities: [words(18), words(16), words(10)],
      taskAchievement: sec(words(30), 1, 1), argumentDevelopment: sec(words(12), 1, 1), organisationCoherence: sec(words(16), 0, 1), grammaticalAccuracyRange: sec(words(12), 1, 0),
      lexicalPrecisionRange: sec(words(14), 1, 1), registerTone: sec(words(10)), hedgingStance: sec(words(11)),
      observations: TYPES.slice(0, 3).map((t, k) => ({ type: t, quote: words(18, `quote ${k}`), explanation: words(12), effect: words(10), revisionStrategy: words(11) })),
      questionsForWriter: [words(11) + '?', words(13) + '?'], suggestedErrorLog: [{ mine: words(5), corr: words(3), why: words(10), ex: words(8) }],
      estimatedLevel: { level: 'C1', rationale: words(14) },
    },
  }),
  'mw-long-revision': base({
    unit: '32', taskId: '32w2', taskKind: 'Final capstone essay', taskTitle: 'A very long fixture title that has to wrap across more than one line in the header card', words: 1800,
    learnerText: paras(24, 75), supportUsed: false, supportLevel: 'off', supportOpenedBeforeWriting: null,
    revisionExists: true, revision: { text: paras(6, 70), analysedAt: '2026-10-03T11:00:00.000Z', snapshot: true },
    feedback: {
      strengthsSummary: Array.from({ length: 6 }, () => words(26)), nextDraftPriorities: [words(30), words(28), words(26)],
      taskAchievement: sec(words(60), 3, 3), argumentDevelopment: sec(words(55), 3, 3), organisationCoherence: sec(words(50), 2, 3), clarity: sec(words(40), 2, 2),
      grammaticalAccuracyRange: sec(words(45), 3, 2), lexicalPrecisionRange: sec(words(45), 2, 3), registerTone: sec(words(30), 1, 1), hedgingStance: sec(words(35), 2, 2),
      cohesionPragmatics: sec(words(30), 1, 2), unnecessaryRepetition: sec(words(25), 0, 2),
      observations: Array.from({ length: 16 }, (_, k) => ({ type: TYPES[k % 5], quote: words(20 + (k % 4) * 15, `excerpt ${k}`), explanation: words(24), effect: words(18), revisionStrategy: words(22), microExample: k % 3 === 0 ? 'a short different example' : undefined })),
      recurringErrors: [{ pattern: words(6), examples: [words(10), words(9)], explanation: words(20) }], isolatedErrors: [{ original: words(6), correction: words(6), note: words(12) }],
      questionsForWriter: Array.from({ length: 4 }, () => words(18) + '?'),
      suggestedErrorLog: Array.from({ length: 4 }, () => ({ mine: words(9), corr: words(9), why: words(18), ex: words(12) })),
      estimatedLevel: { level: 'C1', rationale: words(30) },
    },
  }),
};

const ev = (n: number, k: number, origin: EvRef['origin'] = 'learner'): EvRef => ({ id: `ev${n}-${k}`, label: `Unit ${String(1 + (k % 9)).padStart(2, '0')} · INTERPRET · i${k + 1}`, origin, provenance: 'independent', kind: 'open_answer', at: '2026-09-28T10:00:00.000Z', snippet: words(10 + (k % 3) * 12, `snippet ${k}`), runId: 'r', activity: `i${k}` });
const obs = (label: string, status: string, nEv: number, nCounter: number, judgment: ReportObservation['humanJudgment'], long = false): ReportObservation => ({
  key: label.toLowerCase().replace(/\W+/g, '_'), label, status: status as any, confidence: 'moderate', evidenceCount: nEv, activityCount: Math.max(1, Math.min(nEv, 4)), sourceCount: 1,
  firstSeen: '2026-09-24T10:00:00.000Z', lastSeen: '2026-09-29T10:00:00.000Z', interpretation: words(long ? 120 : 30), implication: long ? words(40) : '',
  evidence: Array.from({ length: nEv }, (_, k) => ev(nEv, k)), counterEvidence: Array.from({ length: nCounter }, (_, k) => ev(90 + nCounter, k)), humanJudgment: judgment,
});
const emptySections = { gettingStronger: [], emerging: [], recurring: [], improving: [], recognitionToProduction: [], notEnoughEvidence: [] };
const report = (over: Partial<LearningReport>): LearningReport => ({
  version: 1, runId: 'fixture-run', generatedAt: '2026-10-01T20:00:00.000Z', trigger: 'manual', period: { from: '2026-09-22T00:00:00.000Z', to: '2026-10-01T20:00:00.000Z' },
  evidence: { total: 3, deferred: 0, byOrigin: { learner: 3, check: 0, record: 0, ai: 0 } as any, byProvenance: {}, byKind: {}, activities: ['Unit 01 · INTERPRET · i8'] },
  workedOn: [], ledger: [], sections: { ...emptySections } as any, nextSession: [], proposals: [], uncertainties: [], warnings: [],
  model: { name: 'fixture-model', reasoning: 'none', promptVersion: 'learning-review-v2' }, ...over,
} as LearningReport);

export const learningReviewFixtures: Record<string, LearningReport> = {
  'lr-first-few-nojudgment': report({
    period: { from: null, to: '2026-10-01T20:00:00.000Z' },
    workedOn: [{ area: 'Unit 01 · INTERPRET', facts: '1 piece of your own work', activities: ['i8'] }],
    sections: { ...emptySections, emerging: [obs('A single early observation', 'emerging', 1, 0, null)] } as any,
  }),
  'lr-many-judgments': report({
    evidence: { total: 64, deferred: 4, byOrigin: { learner: 41, check: 14, record: 6, ai: 3 } as any, byProvenance: {}, byKind: {}, activities: Array.from({ length: 30 }, (_, k) => `Unit ${String(1 + (k % 12)).padStart(2, '0')} · STAGE · activity ${k + 1}`) },
    workedOn: Array.from({ length: 6 }, (_, k) => ({ area: `Unit ${String(k + 1).padStart(2, '0')} · INTERPRET`, facts: `${k + 2} pieces of your own work, ${k} checked answers`, activities: Array.from({ length: 5 + k }, (_, j) => `${k}i${j}`) })),
    sections: {
      gettingStronger: [obs('Stronger pattern one', 'getting_stronger', 3, 0, 'agree'), obs('Stronger pattern two', 'getting_stronger', 2, 1, null)],
      emerging: [obs('Emerging pattern', 'emerging', 2, 0, 'not_sure')],
      recurring: [obs('Recurring pattern with many pieces of evidence', 'recurring', 8, 3, 'disagree', true), obs('Second recurring pattern', 'recurring', 4, 2, null)],
      improving: [obs('Improving pattern', 'improving', 3, 4, 'agree')],
      recognitionToProduction: [obs('Recognition to production', 'recognition_to_production', 2, 0, null)],
      notEnoughEvidence: Array.from({ length: 5 }, (_, k) => ({ label: `Not enough evidence ${k + 1}`, note: 'Seen once so far. A single occurrence is not treated as a difficulty.', evidence: k % 2 ? [ev(1, k)] : [] })),
    } as any,
    nextSession: Array.from({ length: 3 }, (_, k) => ({ action: words(16, `action ${k}`), why: words(18), evidence: [] })),
    proposals: [0, 1].map((k) => ({ unit: '08', unitTitle: 'Next Unit Title', activityId: `08i${k}`, activityLabel: `Unit 08 · INTERPRET · 08i${k}`, stage: 'interpret', action: 'adapt' as const, currentObjective: words(14), evidence: [ev(3, k)], patterns: ['Recurring pattern with many pieces of evidence'], proposedChange: words(24), rationale: words(20), workloadImpact: 'same' as const, constraints: [words(10), words(9)], risks: words(12), status: 'proposed · not applied' as const })),
    warnings: [words(16), words(12)], uncertainties: [words(18)],
  }),
  'lr-long-text-no-proposals': report({
    workedOn: [{ area: 'Unit 03 · WRITE', facts: words(40), activities: Array.from({ length: 40 }, (_, j) => `03w${j}`) }],
    sections: { ...emptySections, recurring: [obs('Very long interpretation', 'recurring', 12, 6, 'agree', true)] } as any,
    uncertainties: [words(60)],
  }),
};
