/* Local E2E server: the real app on the TEST database, with a deterministic fake AI provider.
   Never used in production and never calls a real model. Run:
   DATABASE_URL=postgresql://…/amindinenglish_test NODE_ENV=test ALLOW_REGISTRATION=true COOKIE_SECURE=false \
     npx tsx tests/e2e/server.ts 3491 */
import { app } from '../../src/app';
import { config } from '../../src/config';
import { __setStructuredCallForTests, __setTranscriptionCallForTests, AiRequestError } from '../../src/services/ai/provider';
import { allModels } from '../helpers/aiModels';

if (!/_test\b|_test$/.test(process.env.DATABASE_URL || '')) { console.error('Refusing to start: DATABASE_URL must be a *_test database.'); process.exit(1); }
const port = Number(process.argv[2] || 3491);
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
const userTurns = (prompt: string) => Array.from(prompt.matchAll(/<turn id="([^"]+)" role="user"/g)).map(m => m[1]);
let replies = 0;

config.ai.apiKey = 'e2e-fake-not-real';
config.ai.models = allModels('e2e-fake');
// E2E_LR=off: the same server with the Learning Review model unset (the "not configured" state)
if (process.env.E2E_LR === 'off') config.ai.models.nightlyLearningReview = '';
// Transcription is faked too: with a (fake) key set, an unstubbed call would try to reach the real provider
__setTranscriptionCallForTests(async () => ({ text: 'E2E fake transcript.', uncertain: [] }));
__setStructuredCallForTests((async (p: any) => {
  await delay(350);
  if (p.name === 'character_chat') {
    const target = (p.user.match(/<respond_to_turn>([^<]+)<\/respond_to_turn>/) || [])[1];
    replies++;
    return {
      reply: replies % 2 ? 'That is a fair point. But what exactly does my moment in the bakery prove, in your view?' : 'I can accept part of that. Relearning quickly is not the same as knowing. So how sure should I be?',
      memory: { summary: `E2E summary after ${replies} replies.`, userPositions: ['The learner questions the access explanation.'], volunteeredFacts: [], disagreements: [], openQuestions: [], positionChanges: [] },
      assessmentCandidates: target ? [{ candidateType: 'reasoning', relevantUserTurnIds: [target], note: 'E2E candidate.' }] : [],
    };
  }
  if (p.name === 'register_compare') {
    const sel = (p.user.match(/<selection>([\s\S]*?)<\/selection>/) || [])[1] || '';
    if (/FAIL/.test(sel)) throw new AiRequestError('The AI provider returned an error', 'upstream');
    const v = (example: string, bestFor: string) => ({ example, bestFor });
    return {
      canCompare: true, note: '', original: sel, meaning: 'Saying that something went quiet but is still there.',
      registers: { casual: v("It's gone quiet, but it's still there.", 'chatting with a friend'), neutral: v('It has gone quiet, but it is still there.', 'most everyday situations'), professional: v('It is less active at the moment, but it has not disappeared.', 'a work update'), formal: v('It has become less active; it has not, however, disappeared.', 'an official letter'), academic: v('This knowledge appears dormant rather than lost.', 'an essay or report') },
      changes: [{ feature: 'Contractions', explanation: '"It\'s gone" is relaxed; the neutral version spells it out.' }, { feature: 'Framing', explanation: 'The academic version names the claim ("dormant rather than lost") instead of the speaker\'s experience.' }, { feature: 'Hedging', explanation: '"appears" calibrates certainty.' }],
      interchangeabilityNote: 'The academic sentence would sound distant in a chat, and the casual one too loose in an essay.',
    };
  }
  if (p.name === 'main_write_feedback' || p.name === 'writing_feedback') {
    const sec = (summary: string) => ({ summary, strengths: [], improvements: [] });
    return {
      estimatedLevel: { level: 'B2+', rationale: 'E2E fake estimate.' },
      taskAchievement: sec('E2E fake: the text answers the prompt.'), argumentDevelopment: sec('s'), organisationCoherence: sec('s'), clarity: sec('s'),
      grammaticalAccuracyRange: sec('s'), lexicalPrecisionRange: sec('s'), registerTone: sec('s'), hedgingStance: sec('s'), cohesionPragmatics: sec('s'), unnecessaryRepetition: sec('s'),
      argumentationReasoning: sec('s'), organisation: sec('s'), cohesion: sec('s'), grammarAccuracy: sec('s'), vocabularyCollocations: sec('s'), lexicalPrecision: sec('s'), register: sec('s'), naturalness: sec('s'),
      strengthsSummary: ['E2E fake strength one', 'E2E fake strength two'],
      observations: [{ quote: 'first week', type: 'STRONG_LANGUAGE', explanation: 'Concrete.', effect: 'Engages the reader.', revisionStrategy: 'Keep it.' }],
      questionsForWriter: ['E2E fake question?'], recurringErrors: [], isolatedErrors: [], corrections: [], suggestedErrorLog: [], nextDraftPriorities: ['E2E fake priority'],
    };
  }
  if (p.name === 'learning_review') {
    // Learner text containing FAIL-REVIEW makes the fake provider fail, to show the failure state
    if (/FAIL-REVIEW/.test(p.user)) throw new AiRequestError('The AI provider returned an error', 'upstream');
    const first = /\bE1 \|/.test(p.user) ? 'E1' : null;
    return {
      observations: first ? [{ kind: 'strength', patternKey: 'e2e_qualified_claims', label: 'Qualified claims (E2E fake)', priorPattern: null, evidenceFor: [first], evidenceAgainst: [], interpretation: 'E2E fake interpretation: the answer qualifies its claim.', claimedConfidence: 'low', implication: '' }] : [],
      notEnoughEvidence: [], nextSession: [], proposals: [], uncertainties: ['E2E fake review: very little evidence so far.'],
    };
  }
  if (p.name === 'conversation_help') {
    if (/<mode>explain<\/mode>/.test(p.user)) return { explanation: 'The voice is asking whether you find its explanation convincing or only comforting.', options: [] };
    return { explanation: null, options: ['I am not fully convinced by that.', 'I see it a little differently.'] };
  }
  const ids = userTurns(p.user);
  return {
    summary: 'You engaged with the main claim and questioned the evidence.',
    comprehension: { verdict: 'partial_evidence', commentary: 'You understood the central claim about access.', evidence: ids.length ? [{ turnIds: [ids[0]], observation: 'You restated the access idea in your own words.' }] : [] },
    interaction: { unexpectedTurns: 'When the voice asked for proof, you answered with a reason.', counterarguments: 'You responded to the counterpoint.', communicationBreakdowns: [] },
    successfulLanguage: ids.length ? [{ text: 'I am not fully convinced', turnIds: [ids[ids.length - 1]], independentlyProduced: true }] : [],
    issues: ids.length ? [
      { category: 'error', original: 'since years', improved: 'for years', explanation: 'Use "for" with a period of time.', turnIds: [ids[0]], recurring: false, pedagogicallyRelevant: true },
      { category: 'register', original: 'gonna', improved: 'going to', explanation: 'Fine in chat; more neutral in writing.', turnIds: [ids[0]], recurring: false, pedagogicallyRelevant: false },
    ] : [],
    independentChunks: [], grammarControl: 'Mostly controlled.', reasoning: { commentary: 'You separated what happened from what it means.', evidenceTurnIds: ids.slice(0, 1) },
    reformulations: ids.length ? [{ original: 'I agree you understood', reformulated: 'I agree that you understood', reason: 'Use "that" to introduce the clause in writing.', turnIds: [ids[0]] }] : [],
    profileEvidenceCandidates: ids.length ? [{ dimension: 'written_accuracy', eligible: true, score: 6, weight: 0.3, turnIds: [ids[0]], rationale: 'Controlled written sentence in the first reply.' }] : [],
  };
}) as any);

app.listen(port, '127.0.0.1', () => console.log(`E2E server on http://127.0.0.1:${port}`));
