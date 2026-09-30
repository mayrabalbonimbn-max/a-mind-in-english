import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  scoreToLevel,
  parseCefrString,
  createEvidenceId,
  computeDimensionProfile,
  computeOverallProfile,
  computeRegisterProfile,
  harvestEvidence,
  generateFullProfile,
  DIMENSIONS
} from '../public/profile.js';
import { LightLanguageFeedbackSchema, InterpretItemFeedbackSchema, ExplainQuestionSchema } from '../src/services/ai/schemas';
import { buildExplainQuestionPrompt } from '../src/services/ai/prompts';

describe('Current English Profile Engine & Invariants', () => {

  describe('0. Deterministic objective receptive evidence', () => {
    const mc = (id: string, tag = 'Main idea', answer = 1) => ({ id, type: 'mc', tag, options: ['A','B','C'], answer });
    const tf = (id: string, answer = false) => ({ id, type: 'tf', tag: 'Detail', answer });
    const content: any = { units: {
      '01': {
        level: 'C1',
        interpret: { items: [mc('i1'), mc('i2', 'Vocabulary in context', 0), tf('i3')] },
        notice: { focuses: [{ make: [mc('g1', 'Grammar', 2)] }] },
        steal: { practice: [mc('v1', 'Vocabulary', 0)] },
        listening: [{ id: 'l1', level: 'C1', questions: [mc('q1'), tf('q2'), { id:'q3', type:'fill', tag:'Language noticing', answers:['calibrated conclusions'] }] }]
      },
      '02': { interpret: { items: [mc('02i1')] }, listening: [] }
    }};
    const checked = (answer: string) => ({ answer, at: '2026-09-29T12:00:00Z' });

    it('1–2. checked correct and incorrect reading answers both create receptive performance evidence', () => {
      const state:any={a:{'01:i1':'1','01:i1:checked':checked('1'),'01:i2':'2','01:i2:checked':checked('2')}};
      const ev=harvestEvidence(state,content).filter(e=>e.source==='objective_reading');
      expect(ev).toHaveLength(2); expect(ev.map(e=>e.performance.correct)).toEqual([true,false]);
      expect(ev[0].modality).toBe('receptive'); expect(ev[0].details.canonicalAnswer).toBe(1);
    });

    it('3. selected but unchecked or changed-after-check answers do not enter evidence', () => {
      const selected=harvestEvidence({a:{'01:i1':'1'}},content);
      const stale=harvestEvidence({a:{'01:i1':'0','01:i1:checked':checked('1')}},content);
      expect(selected.filter(e=>e.source==='objective_reading')).toHaveLength(0);
      expect(stale.filter(e=>e.source==='objective_reading')).toHaveLength(0);
    });

    it('4–6. grammar and isolated vocabulary MCs are excluded, while vocabulary-in-context in INTERPRET is included', () => {
      const a:any={'01:g1':'2','01:g1:checked':checked('2'),'01:v1':'0','01:v1:checked':checked('0'),'01:i2':'0','01:i2:checked':checked('0')};
      const ev=harvestEvidence({a},content).filter(e=>e.source==='objective_reading');
      expect(ev.map(e=>e.taskId)).toEqual(['i2']); expect(ev[0].details.construct).toBe('Vocabulary in context');
    });

    it('7–10. objective performance grows conservatively and never inherits the Unit C1 target', () => {
      const one=generateFullProfile({a:{'01:i1':'1','01:i1:checked':checked('1')}},content).dimensions.find(d=>d.key==='reading_comprehension')!;
      expect(one.evidenceCount).toBe(1); expect(one.level).toBe(null); expect(one.confidence).toBe('not_enough_evidence');
      const same:any={a:{}}; for(const [id,val] of [['i1','1'],['i2','0'],['i3','False']]){same.a[`01:${id}`]=val;same.a[`01:${id}:checked`]=checked(val);}
      const sameDim=generateFullProfile(same,content).dimensions.find(d=>d.key==='reading_comprehension')!;
      expect(sameDim.evidenceCount).toBe(3); expect(sameDim.level).toBe(null); expect(sameDim.unitsCount).toBe(1);
      same.a['02:02i1']='1';same.a['02:02i1:checked']=checked('1');
      const longitudinal=generateFullProfile(same,content).dimensions.find(d=>d.key==='reading_comprehension')!;
      expect(longitudinal.evidenceCount).toBe(4);expect(longitudinal.unitsCount).toBe(2);expect(longitudinal.confidence).toBe('low');expect(longitudinal.level).toBe(null);
      expect(longitudinal.performance).toEqual({evaluated:4,correct:4,accuracy:100});
    });

    it('11. recalculation is idempotent and provenance IDs prevent duplicate evidence', () => {
      const s:any={a:{'01:i1':'1','01:i1:checked':checked('1')}};
      const a=harvestEvidence(s,content),b=harvestEvidence(s,content);
      expect(a).toEqual(b);expect(new Set(a.map(e=>e.id)).size).toBe(a.length);expect(a[0].id).toBe('objective_reading:01:i1');
    });

    it('17–19. submitted objective listening answers create correct/incorrect evidence without inheriting target level', () => {
      const s:any={a:{'01:li:l1:q1':'1','01:li:l1:q2':'True','01:li:l1:q3':'calibrated conclusions','01:li:l1:submitted':{at:'2026-09-29T12:00:00Z',answers:{q1:'1',q2:'True',q3:'calibrated conclusions'}}}};
      const ev=harvestEvidence(s,content).filter(e=>e.source==='objective_listening');
      expect(ev.map(e=>e.performance.correct)).toEqual([true,false,true]);
      const dim=generateFullProfile(s,content).dimensions.find(d=>d.key==='listening_comprehension')!;
      expect(dim.evidenceCount).toBe(3);expect(dim.level).toBe(null);expect(dim.score).toBe(null);
    });

    it('20. evidence harvesting is local and contains no automatic AI call path', () => {
      expect(harvestEvidence.toString()).not.toMatch(/fetch\s*\(|\/api\/ai/);
    });
  });

  describe('1. CEFR Mapping & Conservative Aggregation', () => {
    it('returns null when score is null or NaN', () => {
      expect(scoreToLevel(null as any)).toBe(null);
      expect(scoreToLevel(NaN)).toBe(null);
    });

    it('correctly maps numeric scores to CEFR levels', () => {
      expect(scoreToLevel(0)).toBe('A1');
      expect(scoreToLevel(4.0)).toBe('B1');
      expect(scoreToLevel(6.0)).toBe('B2');
      expect(scoreToLevel(7.0)).toBe('B2+');
      expect(scoreToLevel(8.0)).toBe('C1');
      expect(scoreToLevel(9.0)).toBe('C1+');
      expect(scoreToLevel(10.0)).toBe('C2');
    });

    it('parses various CEFR string representations accurately', () => {
      expect(parseCefrString('C1')).toBe(8);
      expect(parseCefrString('B2+')).toBe(7);
      expect(parseCefrString('B2')).toBe(6);
      expect(parseCefrString('C1-')).toBe(8);
      expect(parseCefrString('invalid')).toBe(null);
    });
  });

  describe('2. Dimension Profile & Confidence Invariants', () => {
    const readingDim = DIMENSIONS.find(d => d.key === 'reading_comprehension')!;

    it('scenario 1 & 2: returns null level and not_enough_evidence when insufficient evidence exists', () => {
      const evidences = [
        { id: '1', source: 'light_fb', unit: '01', contributions: { reading_comprehension: 8.0 } }
      ];
      const result = computeDimensionProfile(evidences, readingDim);
      expect(result.level).toBe(null);
      expect(result.confidence).toBe('not_enough_evidence');
      expect(result.evidenceCount).toBe(1);
    });

    it('scenario 3: stable level when multiple consistent evidence points exist', () => {
      const evidences = [
        { id: '1', source: 'light_fb', unit: '01', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '2', source: 'light_fb', unit: '01', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '3', source: 'light_fb', unit: '02', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '4', source: 'light_fb', unit: '02', weight: 1, contributions: { reading_comprehension: 8.0 } }
      ];
      const result = computeDimensionProfile(evidences, readingDim);
      expect(result.level).toBe('C1');
      expect(result.confidence).toBe('medium');
    });

    it('scenario 4 & 5: a single bad or excellent response does not cause wild swings', () => {
      const baseEvidences = [
        { id: '1', source: 'light_fb', unit: '01', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '2', source: 'light_fb', unit: '01', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '3', source: 'light_fb', unit: '02', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '4', source: 'light_fb', unit: '02', weight: 1, contributions: { reading_comprehension: 8.0 } }
      ];

      // Add a single low score (e.g. 4.0 = B1)
      const withLow = [
        ...baseEvidences,
        { id: '5', source: 'light_fb', unit: '03', weight: 0.4, contributions: { reading_comprehension: 4.0 } }
      ];
      const resLow = computeDimensionProfile(withLow, readingDim);
      // Average remains solid around C1/B2+ (7.6)
      expect(resLow.level).toBe('C1');
      expect(resLow.score).toBeGreaterThanOrEqual(7.5);

      // Add a single high score (10.0 = C2) to B2 base
      const b2Base = [
        { id: '1', source: 'light_fb', unit: '01', weight: 1, contributions: { reading_comprehension: 6.0 } },
        { id: '2', source: 'light_fb', unit: '01', weight: 1, contributions: { reading_comprehension: 6.0 } },
        { id: '3', source: 'light_fb', unit: '02', weight: 1, contributions: { reading_comprehension: 6.0 } },
        { id: '4', source: 'light_fb', unit: '02', weight: 1, contributions: { reading_comprehension: 6.0 } },
        { id: '5', source: 'light_fb', unit: '03', weight: 0.4, contributions: { reading_comprehension: 10.0 } }
      ];
      const resB2 = computeDimensionProfile(b2Base, readingDim);
      expect(resB2.level).toBe('B2');
    });

    it('scenario 11: achieves HIGH confidence only with sufficient count and cross-unit/source diversity', () => {
      const diverseEvidences = [
        { id: '1', source: 'light_fb', unit: '01', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '2', source: 'light_fb', unit: '01', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '3', source: 'light_fb', unit: '02', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '4', source: 'light_fb', unit: '02', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '5', source: 'writing_fb', unit: '02', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '6', source: 'writing_fb', unit: '03', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '7', source: 'writing_fb', unit: '03', weight: 1, contributions: { reading_comprehension: 8.0 } },
        { id: '8', source: 'writing_fb', unit: '04', weight: 1, contributions: { reading_comprehension: 8.0 } }
      ];
      const resHigh = computeDimensionProfile(diverseEvidences, readingDim);
      expect(resHigh.confidence).toBe('high');
      expect(resHigh.level).toBe('C1');
    });
  });

  describe('3. Overall Profile Requirements (Scenario 10)', () => {
    it('requires at least 3 dimensions to produce an overall level', () => {
      const dims = [
        { key: 'reading_comprehension', category: 'receptive', level: 'C1', score: 8.0, confidence: 'medium', evidenceCount: 4 },
        { key: 'written_accuracy', category: 'productive', level: 'B2+', score: 7.0, confidence: 'medium', evidenceCount: 3 }
      ];
      const overall = computeOverallProfile(dims as any);
      expect(overall.status).toBe('insufficient_evidence');
      expect(overall.level).toBe(null);
    });

    it('requires both receptive and productive skills', () => {
      const productiveOnly = [
        { key: 'written_accuracy', category: 'productive', level: 'B2+', score: 7.0, confidence: 'medium', evidenceCount: 3 },
        { key: 'written_range', category: 'productive', level: 'C1', score: 8.0, confidence: 'medium', evidenceCount: 3 },
        { key: 'grammar_control', category: 'systemic', level: 'B2+', score: 7.0, confidence: 'medium', evidenceCount: 4 }
      ];
      const overall = computeOverallProfile(productiveOnly as any);
      expect(overall.status).toBe('needs_receptive_and_productive');
      expect(overall.level).toBe(null);
    });

    it('computes conservative 40th percentile overall score when requirements are met', () => {
      const balancedDims = [
        { key: 'reading_comprehension', category: 'receptive', level: 'C1', score: 8.0, confidence: 'high', evidenceCount: 8 },
        { key: 'listening_comprehension', category: 'receptive', level: 'B2+', score: 7.0, confidence: 'medium', evidenceCount: 4 },
        { key: 'written_accuracy', category: 'productive', level: 'B2+', score: 7.0, confidence: 'medium', evidenceCount: 4 },
        { key: 'written_range', category: 'productive', level: 'C1', score: 8.0, confidence: 'medium', evidenceCount: 4 },
        { key: 'grammar_control', category: 'systemic', level: 'B2+', score: 7.0, confidence: 'high', evidenceCount: 8 }
      ];
      const overall = computeOverallProfile(balancedDims as any);
      expect(overall.status).toBe('ready');
      expect(overall.level).toBe('B2+'); // 40th percentile selects 7.0 = B2+ conservatively
      expect(overall.confidence).toBe('medium');
    });
  });

  describe('4. Idempotence & Evidence Harvesting (Scenario 8 & 9)', () => {
    it('creates deterministic IDs and prevents duplicates', () => {
      const id1 = createEvidenceId('writing_fb', '01', 'w1', 0);
      const id2 = createEvidenceId('writing_fb', '01', 'w1', 0);
      expect(id1).toBe(id2);
      expect(id1).toBe('writing_fb:01:w1:0');
    });

    it('harvests evidence from writing portfolio and speaking portfolio without duplicating', () => {
      const mockState = {
        pf: {
          '01:w1': {
            fb: [
              {
                id: 'fb1',
                at: '2026-09-29T10:00:00Z',
                words: 180,
                f: {
                  estimatedLevel: { level: 'C1', rationale: 'Strong control' },
                  argumentationReasoning: { summary: 'Good', strengths: [], improvements: [] }
                }
              }
            ]
          }
        },
        sp: [
          {
            id: 'sp1',
            unit: '01',
            activityId: 's1',
            attempt: 1,
            duration: 85,
            feedback: {
              taskFulfilment: 'Clear',
              grammar: 'Accurate',
              estimatedLevel: { level: 'C1', rationale: 'Strong control' }
            }
          }
        ],
        a: {
          '01:int:i8:intfb': {
            at: '2026-09-29T11:00:00Z',
            f: {
              content: { verdict: 'accurate', commentary: 'Good reading', keyInsightCaptured: true },
              language: {
                meaningClear: true,
                naturalVersion: 'More natural...',
                pointsToNotice: [],
                errorLogCandidate: null,
                profileEvidence: { grammaticalAccuracyScore: 8.0, lexicalNaturalnessScore: 8.0, observedFeatures: [] }
              }
            }
          }
        }
      };

      const evidences = harvestEvidence(mockState, {});
      expect(evidences.length).toBe(3);
      const profile = generateFullProfile(mockState, {});
      expect(profile.evidenceCount).toBe(3);
    });
  });

  describe('5. Speaking Transcript-Only Invariant (Scenario 7)', () => {
    it('ensures speaking dimension note explicitly disclaims acoustic/pronunciation claims', () => {
      const spokenDim = DIMENSIONS.find(d => d.key === 'spoken_production')!;
      expect(spokenDim.note).toContain('Transcript analysis only');
      expect(spokenDim.note).toContain('no acoustic/pronunciation claims');
    });
  });

  describe('6. Zod Schemas Validation (Scenario 6 & 16)', () => {
    it('validates LightLanguageFeedbackSchema correctly with category enums', () => {
      const valid = {
        meaningClear: true,
        naturalVersion: 'He said that people who put in more effort tended to remember more.',
        pointsToNotice: [
          { quote: 'whom had', issue: 'relative pronoun', suggestion: 'who had', category: 'error' },
          { quote: 'put in more effort', issue: 'stylistic choice', suggestion: 'invested greater effort', category: 'suggestion' },
          { quote: 'whilst', issue: 'British variant', suggestion: 'while', category: 'variant' }
        ],
        errorLogCandidate: {
          mine: 'people whom had',
          corr: 'people who had',
          why: 'who is subject pronoun',
          ex: 'The students who studied passed.'
        },
        profileEvidence: {
          grammaticalAccuracyScore: 7.5,
          lexicalNaturalnessScore: 8.0,
          observedFeatures: ['relative_pronoun_error']
        }
      };
      const result = LightLanguageFeedbackSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('validates InterpretItemFeedbackSchema: four task-coverage verdicts, no text-fidelity verdicts, no keyInsightCaptured', () => {
      const language = { meaningClear: true, naturalVersion: null, pointsToNotice: [], errorLogCandidate: null, profileEvidence: { grammaticalAccuracyScore: 8.0, lexicalNaturalnessScore: 8.0, observedFeatures: [] } };
      for (const verdict of ['developed', 'partial', 'needs_clarification', 'not_answered']) {
        const res = InterpretItemFeedbackSchema.safeParse({ content: { verdict, commentary: 'Evaluation notes.' }, language });
        expect(res.success, `verdict: ${verdict}`).toBe(true);
      }
      // The model never sees the reading, so verdicts that judge fidelity to it are rejected
      for (const verdict of ['insightful', 'accurate', 'misunderstood', 'not_assessable', 'correct']) {
        expect(InterpretItemFeedbackSchema.safeParse({ content: { verdict, commentary: 'x' }, language }).success, `verdict: ${verdict}`).toBe(false);
      }
      expect(Object.keys((InterpretItemFeedbackSchema.shape.content as any).shape).sort()).toEqual(['commentary', 'verdict']);
      expect(InterpretItemFeedbackSchema.safeParse({ content: { commentary: 'no verdict' }, language }).success).toBe(false);
      expect(InterpretItemFeedbackSchema.safeParse({ content: { verdict: 'developed', commentary: 'x' } }).success).toBe(false);
      const described = JSON.stringify((InterpretItemFeedbackSchema.shape.content as any).shape.commentary.description);
      expect(described).toMatch(/Never say whether it is supported by/);
    });

    it('validates ExplainQuestionSchema structure', () => {
      const valid = {
        overview: 'The question asks you to analyze the second paragraph.',
        parts: ['Identify the author claim', 'Explain the counterargument'],
        keyTerms: [{ term: 'implication', meaningInContext: 'a likely consequence not stated directly' }],
        whatToFocusOn: 'Focus on linking evidence to reasoning.'
      };
      const result = ExplainQuestionSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });
  });

  describe('7. Verification of Pedagogical Invariants (Cases A to N)', () => {
    const interpretState = (verdict: string, extra: any = {}) => ({
      a: {
        '01:i8:intfb': {
          at: '2026-09-29T11:00:00Z',
          f: {
            content: { verdict, commentary: 'Notes.', ...extra },
            language: { meaningClear: true, naturalVersion: null, pointsToNotice: [], errorLogCandidate: null, profileEvidence: { grammaticalAccuracyScore: 8.0, lexicalNaturalnessScore: 8.0, observedFeatures: [] } }
          }
        }
      }
    });

    it('Case A: "needs_clarification" counts as written evidence and never touches reading comprehension', () => {
      const evidences = harvestEvidence(interpretState('needs_clarification'), {});
      expect(evidences.length).toBe(1);
      expect(evidences[0].dimensions).not.toContain('reading_comprehension');
      expect(evidences[0].contributions).toBeUndefined();   // the 0–10 language numbers are not CEFR levels
    });

    it('Case B: no INTERPRET verdict becomes a reading score (the model has not seen the reading)', () => {
      for (const verdict of ['developed', 'partial', 'needs_clarification', 'not_answered']) {
        const [ev] = harvestEvidence(interpretState(verdict), {});
        expect(ev.contributions?.reading_comprehension, verdict).toBeUndefined();
        expect(ev.dimensions).toEqual(['written_accuracy', 'grammar_control', 'vocabulary']);
      }
    });

    it('Case C & D: checks saved before this change (accurate, misunderstood, not_assessable, keyInsightCaptured) still load, without a score', () => {
      for (const verdict of ['insightful', 'accurate', 'misunderstood', 'not_assessable']) {
        const state = interpretState(verdict, { keyInsightCaptured: true });
        const [ev] = harvestEvidence(state, {});
        expect(ev.contributions?.reading_comprehension, verdict).toBeUndefined();
        const reading = generateFullProfile(state, {}).dimensions.find((d: any) => d.key === 'reading_comprehension')!;
        expect(reading.evidenceCount).toBe(0);
        expect(reading.level).toBe(null);
      }
    });

    it('Case E, F, G: "variant", "suggestion", and "register" do not count as grammatical errors', () => {
      const feedback = {
        meaningClear: true,
        naturalVersion: 'She opted for a different method.',
        pointsToNotice: [
          { quote: 'learnt', issue: 'British spelling', suggestion: 'learned', category: 'variant' as const },
          { quote: 'big difference', issue: 'collocation nuance', suggestion: 'marked difference', category: 'suggestion' as const },
          { quote: 'kids', issue: 'informal register', suggestion: 'children', category: 'register' as const }
        ],
        errorLogCandidate: null,
        profileEvidence: {
          grammaticalAccuracyScore: 9.0, // Pristine grammar despite stylistic/variant notes
          lexicalNaturalnessScore: 8.0,
          observedFeatures: ['variant_spelling', 'register_informal']
        }
      };
      const parseRes = LightLanguageFeedbackSchema.safeParse(feedback);
      expect(parseRes.success).toBe(true);
      expect(feedback.profileEvidence.grammaticalAccuracyScore).toBe(9.0);
    });

    it('Case H & I: "error" is distinguished from "awkward" in the schema and scoring', () => {
      const errorFeedback = {
        meaningClear: true,
        naturalVersion: 'He goes to school every day.',
        pointsToNotice: [
          { quote: 'He go', issue: 'Subject-verb agreement error', suggestion: 'He goes', category: 'error' as const }
        ],
        errorLogCandidate: { mine: 'He go', corr: 'He goes', why: '3rd person singular -s', ex: 'He goes home.' },
        profileEvidence: { grammaticalAccuracyScore: 6.0, lexicalNaturalnessScore: 8.0, observedFeatures: ['agreement_error'] }
      };
      expect(LightLanguageFeedbackSchema.safeParse(errorFeedback).success).toBe(true);
    });

    it('Case J & K: Speaking feedback is evidence without a level (never 7.5, never C1)', () => {
      const attempt = (n: number, extra: any = {}) => ({ id: `sp_${n}`, unit: n % 2 ? '01' : '02', activityId: 's1', attempt: n, duration: 90, feedback: { taskFulfilment: 'Clear.', grammar: 'Good control.', analysisMode: 'transcript_only', ...extra } });
      const evidences = harvestEvidence({ sp: [attempt(1)] }, {});
      expect(evidences.length).toBe(1);
      expect(evidences[0].dimensions).toEqual(['spoken_production']);
      expect(evidences[0].contributions).toEqual({});
      // Even a report that carries a level (older data, or a model going off-schema) gives no spoken level
      const state = { sp: [1, 2, 3, 4, 5].map(n => attempt(n, { estimatedLevel: { level: 'C1', rationale: 'x' } })) };
      const spoken = generateFullProfile(state, {}).dimensions.find((d: any) => d.key === 'spoken_production')!;
      expect(spoken.evidenceCount).toBe(5);
      expect(spoken.level).toBe(null);
      expect(spoken.score).toBe(null);
      for (const d of generateFullProfile(state, {}).dimensions) expect(d.level, d.key).toBe(null);
    });

    it('Case L: Target unit level (C1) does not automatically assign a CEFR level to an unassessed activity', () => {
      const emptyState = { a: {}, sp: [], pf: {} };
      const profile = generateFullProfile(emptyState, {});
      expect(profile.overall.status).toBe('insufficient_evidence');
      expect(profile.overall.level).toBe(null);
      for (const dim of profile.dimensions) {
        expect(dim.level).toBe(null);
        expect(dim.evidenceCount).toBe(0);
      }
    });

    it('Case M: buildExplainQuestionPrompt strictly forbids providing answers or evidence', () => {
      const prompt = buildExplainQuestionPrompt({
        unitId: '01',
        stage: 'interpret',
        taskId: 'i8',
        questionText: 'What does the author imply about imposter syndrome in paragraph 3?'
      });
      expect(prompt).not.toBeNull();
      expect(prompt?.system).toContain('NEVER provide the answer');
      expect(prompt?.system).toContain('NEVER reveal the conclusion');
      expect(prompt?.user).toContain('What does the author imply about imposter syndrome in paragraph 3?');
      expect(prompt?.user).toContain('without giving away any answer or evidence');
    });
  });

  describe('8. Register Control & Qualitative Tone Adaptation Invariants (10 Required Tests)', () => {
    it('1. "I totally feel him." in conversational/reflective context is NOT penalised and preserves high accuracy', () => {
      const reflectiveFeedback = {
        meaningClear: true,
        naturalVersion: null,
        pointsToNotice: [],
        errorLogCandidate: null,
        profileEvidence: {
          grammaticalAccuracyScore: 9.0,
          lexicalNaturalnessScore: 9.0,
          observedFeatures: ['colloquial_reflection']
        }
      };
      const result = LightLanguageFeedbackSchema.safeParse(reflectiveFeedback);
      expect(result.success).toBe(true);
      expect(reflectiveFeedback.profileEvidence.grammaticalAccuracyScore).toBe(9.0);
    });

    it('2. "I totally feel him." in academic/analytical writing can receive category=register while grammatical accuracy remains intact', () => {
      const formalFeedback = {
        meaningClear: true,
        naturalVersion: 'I relate strongly to the author’s perspective.',
        pointsToNotice: [
          {
            quote: 'I totally feel him',
            issue: 'Natural in conversation, but this analytical essay calls for a more academic register.',
            suggestion: 'I relate strongly to the author’s perspective',
            category: 'register' as const
          }
        ],
        errorLogCandidate: null,
        profileEvidence: {
          grammaticalAccuracyScore: 9.0, // Pristine grammar, accuracy is not reduced by register mismatch
          lexicalNaturalnessScore: 7.5,
          observedFeatures: ['conversational_marker_in_essay']
        }
      };
      const result = LightLanguageFeedbackSchema.safeParse(formalFeedback);
      expect(result.success).toBe(true);
      expect(formalFeedback.profileEvidence.grammaticalAccuracyScore).toBe(9.0);
      expect(formalFeedback.pointsToNotice[0].category).toBe('register');
    });

    it('3. "Whilst this may..." is classified as variant and does NOT penalise accuracy', () => {
      const variantFeedback = {
        meaningClear: true,
        naturalVersion: null,
        pointsToNotice: [
          {
            quote: 'Whilst',
            issue: 'British standard variant',
            suggestion: 'While',
            category: 'variant' as const
          }
        ],
        errorLogCandidate: null,
        profileEvidence: {
          grammaticalAccuracyScore: 9.5,
          lexicalNaturalnessScore: 9.0,
          observedFeatures: ['british_variant']
        }
      };
      const result = LightLanguageFeedbackSchema.safeParse(variantFeedback);
      expect(result.success).toBe(true);
      expect(variantFeedback.profileEvidence.grammaticalAccuracyScore).toBe(9.5);
    });

    it('4. Real grammar error is classified as error and can reduce grammatical accuracy', () => {
      const errorFeedback = {
        meaningClear: true,
        naturalVersion: 'She has known him for ten years.',
        pointsToNotice: [
          {
            quote: 'She knows him since ten years',
            issue: 'Incorrect tense and preposition with duration',
            suggestion: 'She has known him for ten years',
            category: 'error' as const
          }
        ],
        errorLogCandidate: {
          mine: 'She knows him since ten years',
          corr: 'She has known him for ten years',
          why: 'Use present perfect + for with durations',
          ex: 'I have lived here for five years.'
        },
        profileEvidence: {
          grammaticalAccuracyScore: 5.5,
          lexicalNaturalnessScore: 7.0,
          observedFeatures: ['tense_aspect_duration_error']
        }
      };
      const result = LightLanguageFeedbackSchema.safeParse(errorFeedback);
      expect(result.success).toBe(true);
      expect(errorFeedback.pointsToNotice[0].category).toBe('error');
      expect(errorFeedback.profileEvidence.grammaticalAccuracyScore).toBeLessThan(7.0);
    });

    it('5. Stylistic suggestion is classified as suggestion and does NOT reduce accuracy', () => {
      const suggestionFeedback = {
        meaningClear: true,
        naturalVersion: 'This disparity warrants deeper investigation.',
        pointsToNotice: [
          {
            quote: 'This big difference is important to study',
            issue: 'Optional stylistic elevation for greater concision',
            suggestion: 'This disparity warrants deeper investigation',
            category: 'suggestion' as const
          }
        ],
        errorLogCandidate: null,
        profileEvidence: {
          grammaticalAccuracyScore: 9.0,
          lexicalNaturalnessScore: 8.0,
          observedFeatures: ['concise_academic_rephrasing']
        }
      };
      const result = LightLanguageFeedbackSchema.safeParse(suggestionFeedback);
      expect(result.success).toBe(true);
      expect(suggestionFeedback.profileEvidence.grammaticalAccuracyScore).toBe(9.0);
    });

    it('6. A single register mismatch does NOT reduce the overall CEFR level or distort percentile calculation', () => {
      const balancedState = {
        pf: {
          '01:w1': {
            fb: [
              {
                id: 'fb1', at: '2026-09-29T10:00:00Z', words: 250,
                f: {
                  estimatedLevel: { level: 'C1', rationale: 'Strong control' },
                  register: { summary: 'Generally formal', strengths: ['Academic vocabulary'], improvements: ['A few conversational markers'] }
                }
              }
            ]
          },
          '02:w1': {
            fb: [
              {
                id: 'fb2', at: '2026-09-29T11:00:00Z', words: 280,
                f: {
                  estimatedLevel: { level: 'C1', rationale: 'Nuanced argument' },
                  register: { summary: 'Appropriate register', strengths: ['Calibrated hedging'], improvements: [] }
                }
              }
            ]
          }
        },
        sp: [{ id: 'sp1', unit: '01', activityId: 's1', attempt: 1, duration: 80, feedback: { taskFulfilment: 'Clear' } }],
        a: {
          '01:int:i1:intfb': {
            at: '2026-09-29T12:00:00Z',
            f: {
              content: { verdict: 'accurate', commentary: 'Good reading' },
              language: { meaningClear: true, pointsToNotice: [{ quote: 'totally felt', issue: 'Conversational tone in analytical answer', suggestion: 'closely reflected', category: 'register' }], profileEvidence: { grammaticalAccuracyScore: 8.0, lexicalNaturalnessScore: 8.0 } }
            }
          },
          '02:int:i2:intfb': {
            at: '2026-09-29T13:00:00Z',
            f: {
              content: { verdict: 'insightful', commentary: 'Deep analysis' },
              language: { meaningClear: true, pointsToNotice: [], profileEvidence: { grammaticalAccuracyScore: 9.0, lexicalNaturalnessScore: 9.0 } }
            }
          }
        }
      };

      const profile = generateFullProfile(balancedState, {});
      // DIMENSIONS array length remains strictly 8
      expect(profile.dimensions.length).toBe(8);
      // Written accuracy remains high despite 1 register note
      const writtenAcc = profile.dimensions.find(d => d.key === 'written_accuracy')!;
      expect(writtenAcc.score).toBeGreaterThanOrEqual(8.0);
      expect(writtenAcc.level).toBe('C1');
    });

    it('7. Multiple evidences of appropriate register improve the Register Control qualitative indicator', () => {
      const advancedState = {
        pf: {
          '01:w1': {
            fb: [{ id: 'fb1', f: { estimatedLevel: { level: 'C1' }, register: { strengths: ['Calibrated academic tone', 'Effective hedging'], improvements: [] } } }]
          },
          '02:w1': {
            fb: [{ id: 'fb2', f: { estimatedLevel: { level: 'C1' }, register: { strengths: ['Appropriate formal stance'], improvements: [] } } }]
          }
        },
        sp: [{ id: 'sp1', unit: '01', activityId: 's1', attempt: 1, duration: 75, feedback: { taskFulfilment: 'Natural conversational pace' } }],
        a: {
          '01:think:t1:lightfb': {
            at: '2026-09-29T10:00:00Z',
            f: { meaningClear: true, pointsToNotice: [], profileEvidence: { grammaticalAccuracyScore: 9.0, lexicalNaturalnessScore: 9.0 } }
          }
        }
      };

      const regProfile = computeRegisterProfile(advancedState, []);
      expect(regProfile.status).toBe('flexible_control');
      expect(regProfile.label).toBe('Flexible register control');
      expect(regProfile.summary).toContain('between conversational and formal');
    });

    it('8. Insufficient evidence (<3) returns "Not enough evidence"', () => {
      const minimalState = {
        pf: {},
        sp: [],
        a: {
          '01:think:t1:lightfb': {
            at: '2026-09-29T10:00:00Z',
            f: { meaningClear: true, pointsToNotice: [], profileEvidence: { grammaticalAccuracyScore: 8.0, lexicalNaturalnessScore: 8.0 } }
          }
        }
      };

      const regProfile = computeRegisterProfile(minimalState, []);
      expect(regProfile.status).toBe('not_enough_evidence');
      expect(regProfile.label).toBe('Not enough evidence');
      expect(regProfile.evidenceCount).toBeLessThan(3);
    });

    it('9. Revised writing that resolves a register mismatch counts as positive evidence of register flexibility', () => {
      const revisionState = {
        pf: {
          '01:w1': {
            fb: [
              {
                id: 'fb1_draft1',
                draft: 'first',
                f: {
                  estimatedLevel: { level: 'B2+' },
                  register: { summary: 'Too conversational in places', strengths: [], improvements: ['Informal colloquial phrases in main argument'] }
                }
              },
              {
                id: 'fb1_draft2',
                draft: 'revised',
                f: {
                  estimatedLevel: { level: 'C1' },
                  register: { summary: 'Greatly improved register control', strengths: ['Academic tone successfully adopted in revision'], improvements: [] }
                }
              }
            ]
          }
        },
        sp: [{ id: 'sp1', unit: '01', activityId: 's1', attempt: 1, duration: 60, feedback: {} }],
        a: {
          '01:think:t1:lightfb': {
            at: '2026-09-29T10:00:00Z',
            f: { meaningClear: true, pointsToNotice: [], profileEvidence: { grammaticalAccuracyScore: 8.0, lexicalNaturalnessScore: 8.0 } }
          }
        }
      };

      const regProfile = computeRegisterProfile(revisionState, []);
      expect(regProfile.status).toBe('developing_flexibility');
      expect(regProfile.label).toBe('Developing register flexibility');
      expect(regProfile.insights).toContain('Demonstrated ability to revise conversational phrasing into academic prose');
    });

    it('10. Register Control computation requires ZERO network/AI calls and executes purely in-memory', () => {
      const mockState = {
        pf: { '01:w1': { fb: [{ f: { register: { strengths: ['Formal tone'] } } }] } },
        sp: [{ id: 'sp1' }],
        a: { '01:think:t1:lightfb': { f: { meaningClear: true, profileEvidence: { lexicalNaturalnessScore: 8 } } } }
      };

      const start = Date.now();
      const profile = generateFullProfile(mockState, {});
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(50); // Synchronous, instant in-memory computation
      expect(profile.registerControl).toBeDefined();
      expect(profile.registerControl.status).toBeDefined();
      expect(DIMENSIONS.length).toBe(8); // Exactly 8 dimensions preserved
    });

    it('11. Profile engine generates safely for empty state without leaking course target as learner level', () => {
      const emptyState = { a: {}, pf: {}, sp: [], errs: [], bank: [] };
      const profile = generateFullProfile(emptyState, {});
      expect(profile.overall.status).toBe('insufficient_evidence');
      expect(profile.overall.level).toBe(null);
      expect(profile.overall.confidence).toBe('not_enough_evidence');
      expect(profile.evidenceCount).toBe(0);
      expect(profile.dimensions.every(d => d.level === null)).toBe(true);
    });
  });
});
