import { z } from 'zod/v4';

const section = z.object({
  summary: z.string().describe('2–4 sentence assessment of this dimension, addressed to the student as "you".'),
  strengths: z.array(z.string()).describe('Concrete strengths, quoting the student where useful.'),
  improvements: z.array(z.string()).describe('Concrete, actionable improvements.'),
});

export const WritingFeedbackSchema = z.object({
  estimatedLevel: z.object({
    level: z.string().describe('CEFR estimate for this piece of writing, e.g. "B2", "B2+", "C1-".'),
    rationale: z.string(),
  }),
  // General criteria for advanced writing (not exam bands). Keys kept stable for saved reports.
  taskAchievement: section.describe('Task fulfilment: does the text do what the prompt asks, fully and relevantly?'),
  clarity: section.describe('Clarity: can the reader follow each point without rereading? Is the main claim unmistakable?'),
  argumentationReasoning: section.describe('Argument and development: are ideas developed, supported and qualified rather than listed or asserted?'),
  organisation: section.describe('Organisation: paragraphing, sequencing and the shape of the whole text, including opening and ending.'),
  cohesion: section.describe('Cohesion: reference, linking and signposting between sentences and paragraphs.'),
  grammarAccuracy: section.describe('Grammatical control: accuracy and range of structures, including this unit\'s targets where relevant.'),
  vocabularyCollocations: section.describe('Lexical range: variety of vocabulary, collocations and chunks.'),
  lexicalPrecision: section.describe('Lexical precision: whether words say exactly what is meant (near-synonyms, connotation, over-general words).'),
  register: section.describe('Register: consistency and appropriateness of formality and tone for the genre.'),
  naturalness: section.describe('Naturalness: whether phrasing sounds like proficient English rather than translation.'),
  questionsForWriter: z.array(z.string()).describe('2–4 questions a thoughtful reader would ask the writer (about intention, evidence, logic or consistency). Questions only: never rewritten sentences.'),
  recurringErrors: z.array(
    z.object({
      pattern: z.string().describe('Name of the recurring error pattern.'),
      examples: z.array(z.string()).describe('Exact quotes from the student text.'),
      explanation: z.string(),
    })
  ),
  isolatedErrors: z.array(z.object({ original: z.string(), correction: z.string(), note: z.string() })),
  corrections: z.array(
    z.object({
      original: z.string().describe('Exact excerpt from the student text.'),
      corrected: z.string(),
      explanation: z.string(),
    })
  ),
  suggestedErrorLog: z.array(
    z.object({
      mine: z.string().describe("The student's original sentence or phrase."),
      corr: z.string().describe('Corrected version.'),
      why: z.string().describe('Short rule or reason.'),
      ex: z.string().describe('A new example sentence using the correct form.'),
    })
  ),
  // No Language Bank suggestions: the Language Bank is retired (older saved reports may still carry them).
  nextDraftPriorities: z.array(z.string()).describe('Exactly 2 or 3 priorities for the next draft, most important first.'),
});

export type WritingFeedback = z.infer<typeof WritingFeedbackSchema>;

export const ObservationTypeSchema = z.enum([
  'ERROR',
  'AWKWARD',
  'REGISTER_MISMATCH',
  'STYLE_CHOICE',
  'STRONG_LANGUAGE',
]);

export const MainWriteObservationSchema = z.object({
  type: ObservationTypeSchema.describe('ERROR: clear grammatical or lexical error; AWKWARD: grammatically correct but unnatural or clumsy; REGISTER_MISMATCH: grammatically correct but too informal or inappropriate in tone; STYLE_CHOICE: legitimate stylistic option; STRONG_LANGUAGE: effective, sophisticated or exceptionally natural phrasing.'),
  quote: z.string().describe('Exact quote from the student text.'),
  explanation: z.string().describe('Plain English explanation of what is happening in this excerpt.'),
  effect: z.string().describe('The communicative or rhetorical effect on the reader.'),
  revisionStrategy: z.string().describe('Actionable strategy for the writer to revise it herself. Do NOT rewrite the sentence for her.'),
  microExample: z.string().optional().describe('Only if indispensable, a short 3-6 word example in an entirely different context.'),
});

export const MainWriteFeedbackSchema = z.object({
  estimatedLevel: z.object({
    level: z.string().describe('CEFR estimate for this piece of writing, e.g. "B2", "B2+", "C1-", "C1".'),
    rationale: z.string(),
  }),
  taskAchievement: section.describe('Task fulfilment: does the text do what the prompt asks, fully and relevantly?'),
  argumentDevelopment: section.describe('Argument and development: how claims are stated, substantiated, qualified and weighed.'),
  organisationCoherence: section.describe('Organisation and global coherence: line of argument, transitions, opening and ending.'),
  clarity: section.describe('Clarity: readability, precision of meaning, and avoidance of ambiguity.'),
  grammaticalAccuracyRange: section.describe('Grammatical control and range of complex structures, including unit grammar targets.'),
  lexicalPrecisionRange: section.describe('Lexical precision, range, collocations and idiomatic naturalness.'),
  registerTone: section.describe('Register and tone: fit to the register this task calls for (see expected_register). Formality is not quality: a personal or reflective task is not better for sounding academic.'),
  hedgingStance: section.describe('Hedging and stance: epistemic calibration, cautious claims, avoidance of false certainty.'),
  cohesionPragmatics: section.describe('Cohesion and discourse pragmatics: logical flow, referencing, and reader management.'),
  unnecessaryRepetition: section.describe('Repetition of words, frames or ideas that could be condensed or varied.'),
  strengthsSummary: z.array(z.string()).describe('Genuine strengths of the piece (at least 2-4 concrete strengths).'),
  observations: z.array(MainWriteObservationSchema).max(16).describe('Detailed classified observations of specific excerpts across the text.'),
  questionsForWriter: z.array(z.string()).max(4).describe('2–4 questions a thoughtful reader would ask the writer.'),
  recurringErrors: z.array(
    z.object({
      pattern: z.string(),
      examples: z.array(z.string()),
      explanation: z.string(),
    })
  ).max(5),
  isolatedErrors: z.array(z.object({ original: z.string(), correction: z.string(), note: z.string() })).max(6),
  suggestedErrorLog: z.array(
    z.object({
      mine: z.string(),
      corr: z.string(),
      why: z.string(),
      ex: z.string(),
    })
  ).max(4),
  nextDraftPriorities: z.array(z.string()).min(2).max(3).describe('Exactly 2 or 3 priorities for Draft 2, most important first.'),
});

export type MainWriteFeedback = z.infer<typeof MainWriteFeedbackSchema>;
export type MainWriteObservation = z.infer<typeof MainWriteObservationSchema>;

export const ExplainSchema = z.object({
  expression: z.string(),
  definition: z.string().describe('Clear learner-dictionary definition in English.'),
  meaningInContext: z.string().describe('What it means in this specific sentence.'),
  partOfSpeech: z.string(),
  ipa: z.string().describe('IPA transcription, or empty string when not applicable (e.g. long phrases).'),
  collocations: z.array(z.string()),
  example: z.string().describe('One natural additional example sentence.'),
  portuguese: z.string().describe('Short explanation in Brazilian Portuguese.'),
});

export type Explanation = z.infer<typeof ExplainSchema>;

export const ListeningFeedbackSchema = z.object({
  understanding: z.string(), missed: z.string(), evidence: z.string(), language: z.array(z.string()),
  difficulty: z.string(), nextTime: z.string(),
});

export const SpeakingFeedbackSchema = z.object({
  analysisMode: z.literal('transcript_only'),
  limitation: z.string(),
  taskFulfilment: z.string(), coherence: z.string(), grammar: z.string(), vocabulary: z.string(),
  naturalPhrasing: z.string(), discourseManagement: z.string(), precisionRange: z.string(), targetLanguage: z.string(),
  recurringErrors: z.array(z.string()), correctedTranscript: z.string(),
  corrections: z.array(z.object({ original: z.string(), better: z.string(), why: z.string(), category: z.string() })),
  nextAttemptPriorities: z.array(z.string()),
});

export const OutlineFeedbackSchema = z.object({
  questions: z.array(z.string()).describe('3–6 questions a careful reader would ask about this plan. Questions only.'),
  gaps: z.array(z.string()).describe('Requirements of the task that the outline does not yet address. Empty if none.'),
  inconsistencies: z.array(z.string()).describe('Places where planned moves contradict each other or the governing claim. Empty if none.'),
  strengths: z.array(z.string()).describe('1–3 things in the plan that already work, quoting it briefly.'),
});

export const TeacherLensFeedbackSchema = z.object({
  clarity: z.string().describe('Is the explanation clear and logically ordered for a B1 learner? Quote her wording.'),
  linguisticAccuracy: z.object({
    summary: z.string().describe('Is the rule itself accurate? Is her own English accurate?'),
    issues: z.array(z.object({ original: z.string(), better: z.string(), why: z.string() })),
  }),
  b1Appropriateness: z.string().describe('Is the language and metalanguage appropriate for B1?'),
  examples: z.string().describe('Are the two examples natural, correct and genuinely illustrative of the point?'),
  predictedDifficulty: z.string().describe('Does the predicted difficulty for Portuguese speakers make sense? Be specific.'),
  learnerResponse: z.string().describe('Is the response to the learner constructive, and does it lead the learner to notice rather than hand over the answer?'),
  unnecessaryComplexity: z.string().describe('Anything unnecessarily complicated, abstract or terminology-heavy that could be cut.'),
  ccq: z.string().describe('Comment on the CCQ if present. If absent, say briefly whether one would help for this point; never penalise its absence.'),
  suggestions: z.array(z.string()).describe('2–3 concrete revisions to this explanation.'),
});

export const LightLanguageFeedbackSchema = z.object({
  meaningClear: z.boolean().describe('Is the student\'s intended meaning clear without rereading?'),
  naturalVersion: z.string().nullable().describe('A refined, natural C1-level version of the student\'s text. Null if the original is already fully natural.'),
  pointsToNotice: z.array(
    z.object({
      quote: z.string().describe('Exact fragment from student text.'),
      category: z.enum(['error', 'awkward', 'register', 'variant', 'suggestion']).describe('error = incorrect in context; awkward = understandable but unidiomatic; register = legitimate but different formality; variant = legitimate English variant; suggestion = purely stylistic alternative.'),
      issue: z.string().describe('Brief explanation of why it is an error, awkward phrasing, register mismatch, variant, or stylistic suggestion.'),
      suggestion: z.string().describe('The natural alternative.'),
    })
  ).max(4),
  errorLogCandidate: z.object({
    mine: z.string().describe('Original excerpt containing an error.'),
    corr: z.string().describe('Corrected version.'),
    why: z.string().describe('Concise rule or reason.'),
    ex: z.string().describe('A new natural example sentence.'),
  }).nullable(),
  profileEvidence: z.object({
    grammaticalAccuracyScore: z.number().min(0).max(10).describe('0-10 accuracy score. Errors reduce this. Register, variants and stylistic suggestions NEVER reduce this score.'),
    lexicalNaturalnessScore: z.number().min(0).max(10).describe('0-10 naturalness score. Awkward phrasing may moderately adjust this. Variants and stylistic suggestions NEVER reduce this score.'),
    observedFeatures: z.array(z.string()).describe('Short tags of observed patterns, e.g. "past_tense_consistency", "collocation_precision".'),
  }),
});

export type LightLanguageFeedback = z.infer<typeof LightLanguageFeedbackSchema>;

export const InterpretItemFeedbackSchema = z.object({
  // Judged without the reading (the model only sees the question and the guide), so no verdict
  // can claim that an answer is faithful to, or a misreading of, the text.
  content: z.object({
    verdict: z.enum([
      'developed',
      'partial',
      'needs_clarification',
      'not_answered',
    ]).describe('developed = addresses every part of the question as the guide describes; partial = only part of the question, or only partly developed; needs_clarification = the student says the question was unclear; not_answered = empty, minimal or off-topic.'),
    commentary: z.string().describe('2-3 sentences on how fully the answer does what the question asks, judged against the question and the guide only. Never say whether it is supported by, accurate to or a misreading of the reading, which you have not seen.'),
  }),
  language: LightLanguageFeedbackSchema,
});

export type InterpretItemFeedback = z.infer<typeof InterpretItemFeedbackSchema>;

export const ExplainQuestionSchema = z.object({
  overview: z.string().describe('A plain, simple rephrasing of what the task asks the student to do, without giving any answer or clues to the answer.'),
  parts: z.array(z.string()).describe('If the question has multiple components, a breakdown of each part in clear, simple English. Empty if single part.'),
  keyTerms: z.array(z.object({
    term: z.string().describe('A word or phrase from the prompt instruction that might need clarifying.'),
    meaningInContext: z.string().describe('What this instruction term means here.'),
  })).max(3),
  whatToFocusOn: z.string().describe('A guidance statement describing the type of thinking required without mentioning any specific facts or conclusions.'),
});

export type ExplainQuestion = z.infer<typeof ExplainQuestionSchema>;


// Compare registers: the same intention in five contexts. Fixed keys guarantee exactly five registers.
const registerVersion = z.object({
  example: z.string().describe('What a competent speaker or writer would naturally say or write in this context, with the same intention. Identical to another register when that is genuinely the natural wording.'),
  bestFor: z.string().describe('One short phrase: the situation or relationship where this version fits.'),
});

export const RegisterCompareSchema = z.object({
  canCompare: z.boolean().describe('false only when the selection is too fragmentary or ambiguous to keep its meaning across registers.'),
  note: z.string().describe('When canCompare is false: one plain sentence saying what is missing. Otherwise an empty string.'),
  original: z.string().describe('The selected text, unchanged.'),
  meaning: z.string().describe('The communicative intention in one short sentence (what the speaker is doing), or empty when canCompare is false.'),
  registers: z.object({
    casual: registerVersion,
    neutral: registerVersion,
    professional: registerVersion,
    formal: registerVersion,
    academic: registerVersion,
  }).describe('Empty strings everywhere when canCompare is false.'),
  changes: z.array(z.object({
    feature: z.string().describe('The linguistic feature, e.g. "hedging", "personal vs impersonal framing", "contractions".'),
    explanation: z.string().describe('One or two short sentences quoting the versions.'),
  })).describe('2–4 real differences between the versions. Empty when canCompare is false.'),
  interchangeabilityNote: z.string().describe('One or two sentences on why these versions are not interchangeable, only when that is genuinely instructive here; otherwise an empty string.'),
});

export type RegisterCompare = z.infer<typeof RegisterCompareSchema>;
export const REGISTER_KEYS = ['casual', 'neutral', 'professional', 'formal', 'academic'] as const;
