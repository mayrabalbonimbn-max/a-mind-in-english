import { z } from 'zod/v4';

/* What the model may say. It points at evidence by reference (E1, E2 … / P1 …); it never sets
   counts, dates, final status or confidence: the server derives those from the evidence itself. */

// References are checked against the evidence by the server (unknown ones are dropped, never trusted)
const ref = z.string().max(12);
const key = z.string().min(2).max(64);

export const ObservationSchema = z.object({
  kind: z.enum(['strength', 'emerging', 'difficulty', 'improving', 'resolved', 'recognition_to_production'])
    .describe('strength = done well across activities; emerging = a new ability starting to appear; difficulty = something that went wrong; improving = a known difficulty now partly handled; resolved = a known difficulty now handled well; recognition_to_production = an item the learner had only recognised/recorded now used in the learner\'s own production.'),
  patternKey: key.describe('Short stable snake_case name for the pattern, e.g. "hedging_strong_claims". Reuse the key of a prior pattern when it is the same pattern.'),
  label: z.string().min(3).max(160).describe('Plain-English name of the pattern, specific to what was observed.'),
  priorPattern: ref.nullable().describe('P-reference of the prior pattern this continues, or null.'),
  evidenceFor: z.array(ref).max(8).describe('E-references that show this pattern (for a difficulty: where it went wrong; for a strength: where it went well).'),
  evidenceAgainst: z.array(ref).max(8).describe('E-references where the learner handled the same thing well (for difficulty/improving/resolved) or badly (for strength). Empty when none.'),
  interpretation: z.string().min(10).max(700).describe('Your interpretation in 1–2 sentences, addressed to the learner as "you". Say what the evidence suggests, not more.'),
  claimedConfidence: z.enum(['low', 'moderate', 'high']),
  implication: z.string().max(400).describe('What this means for the next study session, or an empty string.'),
});

export const LearningReviewOutputSchema = z.object({
  observations: z.array(ObservationSchema).max(12),
  notEnoughEvidence: z.array(z.object({
    label: z.string().min(3).max(160),
    note: z.string().max(400).describe('What is missing before anything can be said.'),
    evidence: z.array(ref).max(4),
  })).max(5),
  nextSession: z.array(z.object({
    action: z.string().min(10).max(320).describe('One small, concrete thing to do in the next session, tied to a specific activity or language point. Never generic advice.'),
    why: z.string().min(10).max(400),
    patternKeys: z.array(key).max(3),
    evidence: z.array(ref).max(4),
  })).max(3),
  proposals: z.array(z.object({
    activityId: z.string().max(40).describe('Id of one activity from the NEXT UNIT CANDIDATES list, exactly as listed.'),
    action: z.enum(['adapt', 'replace', 'add']).describe('Prefer adapt or replace. add only when nothing in the list can carry the change.'),
    patternKeys: z.array(key).min(1).max(3),
    proposedChange: z.string().min(20).max(800).describe('The pedagogical change as a specification for a human author: keep the activity\'s original objective; never write the new activity, never include an answer.'),
    rationale: z.string().min(10).max(500),
    workloadImpact: z.enum(['same', 'lower', 'higher']),
    risks: z.string().max(500),
    extraConstraints: z.array(z.string().max(240)).max(4),
  })).max(2),
  uncertainties: z.array(z.string().max(400)).max(5).describe('Honest limits of this review (thin evidence, earlier AI feedback only, one unit only…).'),
});

export type LearningReviewOutput = z.infer<typeof LearningReviewOutputSchema>;
export type Observation = z.infer<typeof ObservationSchema>;
