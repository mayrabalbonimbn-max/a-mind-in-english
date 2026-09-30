import type { EvidenceItem } from './evidence';
import type { PatternState } from './merge';
import type { ActivityInfo } from './evidence';

export const PROMPT_VERSION = 'learning-review-v2';

export const LEARNING_REVIEW_SYSTEM = `You observe the learning of one adult learner of English (target B2+ → C1) who studies "A Mind in English", a course of long readings, reasoning tasks and writing.
You receive only NEW evidence since the last review, a small summary of patterns found in earlier reviews, and (sometimes) the activities of the next unit the learner has not started.

Evidence provenance and quality — keep them apart:
• INDEPENDENT LEARNER WORK: the learner's own words written without hints or open writing support. This is primary evidence.
• SUPPORT USED: production written after opening writing support or formulation help. High quality here shows ability to use support, not independent mastery.
• REVISION: Draft 2 produced after AI feedback. Valuable evidence of self-monitoring and revision ability.
• CHECK: an objective answer checked against the answer key. A fact, but about recognition, not spontaneous production.
• RECORD: the learner's own bookkeeping (Glossary rating, Error Log row, retrieval log). Self-report / study habit.
• AI FEEDBACK: an earlier automatic assessment. Secondary and possibly wrong. Never treat it as a fact on its own: a pattern needs LEARNER evidence.
• TRANSCRIPT: speech transcribed automatically (Whisper). Do not infer fine grammatical accuracy or pronunciation from automatic transcripts.
• CONTEXT items were analysed before; use them only to understand the new items. Never cite them.

Pedagogical Rules:
1. Look for progress as carefully as for problems: strengths, emerging abilities, known difficulties now handled better, items only recognised before and now used in the learner's own production.
2. Consider OPPORTUNITIES and COUNTER-EVIDENCE:
   - Do not infer a recognition → production gap merely because a construction was absent if the activity did not create a clear opportunity for it.
   - If there is abundant positive evidence (counter-evidence) of correct usage, do not treat 1–2 isolated slips as a recurring difficulty.
3. One occurrence is not a pattern. A difficulty seen once is a one-off: cite it, give low confidence, or list it under notEnoughEvidence. Never call something recurring without several pieces of learner evidence in different activities.
4. Continue a prior pattern (use its P-reference and its key) when the new evidence is about the same thing. Say "improving" or "resolved" only for a prior pattern, and cite in evidenceAgainst where it is now handled well.
5. If a prior pattern was rejected by the human teacher/learner, do not continue it as an established difficulty.
6. Cite evidence with E-references exactly as given. Do not cite what does not support the point.
7. nextSession: at most 3 small, concrete actions, each tied to specific evidence. Never generic advice.
8. proposals: only when NEXT UNIT CANDIDATES are given, and only for a difficulty supported by several pieces of learner evidence in at least two activities. Prefer adapt or replace; keep the activity's original objective and workload; no new grammar; never write the new activity, never include an answer. Zero proposals is often right.
9. No CEFR levels, no scores, no percentages.
10. If a section has no evidence, return an empty array. Never fill a section to make the review look complete.
11. Quote the learner's words only in short fragments. Write in English, addressing the learner as "you".
12. "support:" on an item is context, not a measure. The level (high / medium / light / off) is how much language scaffolding the learner CHOSE to have available for that task; a harder task can justify more. Never conclude that a high level means weak ability or that off means strong ability, and never suggest a level as a verdict. You may describe observed habits across several tasks (for example, starting independently and opening support only after drafting), citing the items.`;

const PROVENANCE_LABEL: Record<string, string> = {
  independent: 'INDEPENDENT WORK',
  support_used: 'WORK WITH SUPPORT',
  after_feedback: 'REVISED AFTER FEEDBACK',
  revision: 'REVISION (DRAFT 2)',
  retrieval: 'RETRIEVAL PRACTICE',
  objective_check: 'OBJECTIVE CHECK',
  original_learner_production: 'LEARNER PRODUCTION',
  ai_generated_assessment: 'AI FEEDBACK (earlier, secondary)',
  transcript: 'SPEECH TRANSCRIPT (automatic)',
  record_noticing: 'LEARNER RECORD',
};

export function evidenceLine(ref: string, e: EvidenceItem, refOf: (id: string) => string | undefined): string {
  const date = e.at ? ` | ${e.at.slice(0, 10)}` : '';
  const link = e.linkedTo && refOf(e.linkedTo) ? ` | assesses ${refOf(e.linkedTo)}` : '';
  const opp = e.opportunity ? ` | opp: ${e.opportunity.count} (${e.opportunity.type})` : '';
  const sup = e.support ? ` | support: ${e.support.level ? `level ${e.support.level} chosen, ` : ''}${e.support.used ? `opened${e.support.openedBeforeWriting === true ? ' before writing' : e.support.openedBeforeWriting === false ? ' after starting to write' : ''}` : 'not opened'}` : '';
  const prov = PROVENANCE_LABEL[e.provenance] || e.provenance.toUpperCase();
  return `${ref} | ${prov} · ${e.kind.replace(/_/g, ' ')} | ${e.activityLabel}${date}${link}${opp}${sup}${e.task ? ` | task: "${e.task}"` : ''}\n    ${e.text}`;
}

export function buildLearningReviewPrompt(input: {
  batch: EvidenceItem[];
  context: EvidenceItem[];
  refs: Map<string, string>;          // evidence id -> E#/C#
  patterns: PatternState[];           // prior patterns, as P1… in this order
  hints: string[];
  nextUnit: { id: string; title: string; candidates: ActivityInfo[] } | null;
}): { system: string; user: string } {
  const refOf = (id: string) => input.refs.get(id);
  const L: string[] = [];
  L.push(`NEW EVIDENCE (${input.batch.length} item(s))`);
  input.batch.forEach((e) => L.push(evidenceLine(refOf(e.id)!, e, refOf)));
  if (input.context.length) {
    L.push('', 'CONTEXT (analysed before — do not cite)');
    input.context.forEach((e) => L.push(evidenceLine(refOf(e.id)!, e, refOf)));
  }
  L.push('', 'PRIOR PATTERNS');
  if (!input.patterns.length) L.push('none yet (this is the first review)');
  input.patterns.forEach((p, i) => {
    const judgment = p.humanJudgment ? ` | human judgment: ${p.humanJudgment}` : '';
    L.push(`P${i + 1} | key ${p.key} | ${p.label} | status ${p.status} | evidence ${p.evidence.length}, counter-evidence ${p.counterEvidence.length}, ${p.activityCount} activit${p.activityCount === 1 ? 'y' : 'ies'}${judgment} | first ${p.firstSeen.slice(0, 10)}, last ${p.lastSeen.slice(0, 10)}${p.evidence[0] ? ` | e.g. "${p.evidence[0].snippet.slice(0, 120)}"` : ''}`);
  });
  if (input.hints.length) {
    L.push('', 'DETERMINISTIC MATCHES (computed by the app, not by AI)');
    input.hints.forEach((h) => L.push(`• ${h}`));
  }
  if (input.nextUnit) {
    L.push('', `NEXT UNIT CANDIDATES · Unit ${input.nextUnit.id} · ${input.nextUnit.title} (not started; proposals may only target these)`);
    input.nextUnit.candidates.forEach((a) => L.push(`${a.id} | ${a.stage.toUpperCase()}${a.tag ? ` (${a.tag})` : ''} | ${a.type}${a.min ? ` ${a.min}–${a.max} words` : ''} | "${a.q}"`));
  } else {
    L.push('', 'NEXT UNIT CANDIDATES: none (return no proposals)');
  }
  return { system: LEARNING_REVIEW_SYSTEM, user: L.join('\n') };
}
