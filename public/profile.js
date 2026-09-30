/* A MIND IN ENGLISH · profile.js
   Evidence-based English Profile engine. Pure JavaScript, deterministic, idempotent.
   Computes CEFR-aligned estimates and confidence across 8 skills from accumulated evidence. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.KLANG_PROFILE = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CEFR_LEVELS = ['A1', 'A1+', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+', 'C1', 'C1+', 'C2'];
  const CEFR_MAP = {
    'A1': 0, 'A1+': 1, 'A2': 2, 'A2+': 3, 'B1': 4, 'B1+': 5,
    'B2': 6, 'B2+': 7, 'C1': 8, 'C1+': 9, 'C2': 10
  };

  const DIMENSIONS = [
    { key: 'reading_comprehension', label: 'Reading comprehension', category: 'receptive', minEvidence: 4, highEvidence: 8 },
    { key: 'listening_comprehension', label: 'Listening comprehension', category: 'receptive', minEvidence: 3, highEvidence: 6 },
    { key: 'written_accuracy', label: 'Written accuracy', category: 'productive', minEvidence: 2, highEvidence: 5 },
    { key: 'written_range', label: 'Written range', category: 'productive', minEvidence: 2, highEvidence: 5 },
    { key: 'vocabulary', label: 'Vocabulary', category: 'systemic', minEvidence: 4, highEvidence: 8 },
    { key: 'grammar_control', label: 'Grammar control', category: 'systemic', minEvidence: 4, highEvidence: 8 },
    { key: 'spoken_production', label: 'Spoken production', category: 'productive', minEvidence: 2, highEvidence: 4, note: 'Transcript analysis only (no acoustic/pronunciation claims)' },
    { key: 'critical_reasoning', label: 'Critical reasoning in English', category: 'cognitive', minEvidence: 3, highEvidence: 6, note: 'Observable task performance, not general intelligence' }
  ];

  function scoreToLevel(score) {
    if (score == null || isNaN(score)) return null;
    const idx = Math.max(0, Math.min(CEFR_LEVELS.length - 1, Math.round(score)));
    return CEFR_LEVELS[idx];
  }

  function parseCefrString(str) {
    if (!str || typeof str !== 'string') return null;
    const clean = str.trim().toUpperCase().replace(/[-–]/g, '');
    if (CEFR_MAP[clean] !== undefined) return CEFR_MAP[clean];
    if (clean.startsWith('C2')) return 10;
    if (clean.startsWith('C1+')) return 9;
    if (clean.startsWith('C1')) return 8;
    if (clean.startsWith('B2+')) return 7;
    if (clean.startsWith('B2')) return 6;
    if (clean.startsWith('B1+')) return 5;
    if (clean.startsWith('B1')) return 4;
    if (clean.startsWith('A2+')) return 3;
    if (clean.startsWith('A2')) return 2;
    if (clean.startsWith('A1')) return 0;
    return null;
  }

  function createEvidenceId(source, unit, taskId, attempt) {
    return `${source}:${unit}:${taskId}${attempt != null ? ':' + attempt : ''}`;
  }

  /**
   * Evaluates a collection of evidences for a specific dimension.
   */
  function computeDimensionProfile(evidences, dimConfig) {
    const key = dimConfig.key;
    const relevant = evidences.filter(e =>
      (e.contributions && typeof e.contributions[key] === 'number') ||
      (Array.isArray(e.dimensions) && e.dimensions.includes(key))
    );
    const scored = relevant.filter(e => e.contributions && typeof e.contributions[key] === 'number');
    const count = relevant.length;
    const units = new Set(relevant.map(e => e.unit).filter(Boolean));
    // A single conversation must not count as a second independent source: conversation evidence
    // widens source diversity only once two different conversations contribute.
    const conversationContexts = new Set(relevant.filter(e => e.source === 'character_conversation').map(e => e.contextId));
    const sources = new Set(relevant.filter(e => e.source !== 'character_conversation' || conversationContexts.size >= 2).map(e => e.source).filter(Boolean));
    const objective = relevant.filter(e => e.performance && typeof e.performance.correct === 'boolean');
    const performance = objective.length ? {
      evaluated: objective.length,
      correct: objective.filter(e => e.performance.correct).length,
      accuracy: Math.round(objective.filter(e => e.performance.correct).length / objective.length * 100)
    } : null;

    // Determine confidence
    let confidence = 'low';
    if (count >= dimConfig.highEvidence && units.size >= 2 && sources.size >= 2) {
      confidence = 'high';
    } else if (count >= dimConfig.minEvidence && (units.size >= 2 || sources.size >= 2)) {
      confidence = 'medium';
    } else if (count >= dimConfig.minEvidence) {
      confidence = 'low';
    }

    if (count < dimConfig.minEvidence) {
      return {
        key,
        label: dimConfig.label,
        category: dimConfig.category,
        level: null,
        score: null,
        confidence: 'not_enough_evidence',
        evidenceCount: count,
        unitsCount: units.size,
        scoredEvidenceCount: scored.length,
        performance,
        note: dimConfig.note || null
      };
    }

    // Deterministic objective items are valuable performance evidence, but they are
    // not psychometrically calibrated CEFR items. They can increase the evidence
    // count and longitudinality without manufacturing a learner level from the
    // curriculum target or from chance performance.
    if (scored.length < 2) {
      return {
        key,
        label: dimConfig.label,
        category: dimConfig.category,
        level: null,
        score: null,
        confidence: units.size >= 2 ? 'low' : 'not_enough_evidence',
        evidenceCount: count,
        unitsCount: units.size,
        scoredEvidenceCount: scored.length,
        performance,
        note: dimConfig.note || null
      };
    }

    // Weighted average score
    let totalWeight = 0;
    let weightedSum = 0;
    scored.forEach(e => {
      const weight = e.weight || 1.0;
      const score = e.contributions[key];
      weightedSum += score * weight;
      totalWeight += weight;
    });

    const avgScore = totalWeight > 0 ? weightedSum / totalWeight : 0;
    const level = scoreToLevel(avgScore);

    return {
      key,
      label: dimConfig.label,
      category: dimConfig.category,
      level,
      score: Math.round(avgScore * 10) / 10,
      confidence,
      evidenceCount: count,
      unitsCount: units.size,
      scoredEvidenceCount: scored.length,
      performance,
      note: dimConfig.note || null
    };
  }

  /**
   * Computes the overall English profile using a conservative 40th-percentile aggregation.
   */
  function computeOverallProfile(dimensions) {
    const defined = dimensions.filter(d => d.level !== null && d.score !== null);
    if (defined.length < 3) {
      return {
        status: 'insufficient_evidence',
        level: null,
        confidence: 'not_enough_evidence',
        message: 'Still learning about your English. Complete more activities across different skills to see an overall level.',
        dimensionsReady: defined.length,
        dimensionsRequired: 3
      };
    }

    const hasReceptive = defined.some(d => d.category === 'receptive');
    const hasProductive = defined.some(d => d.category === 'productive');

    if (!hasReceptive || !hasProductive) {
      return {
        status: 'needs_receptive_and_productive',
        level: null,
        confidence: 'not_enough_evidence',
        message: 'Evidence is needed in both receptive (reading/listening) and productive (writing/speaking) skills before an overall profile can be established.',
        hasReceptive,
        hasProductive
      };
    }

    // Sort scores ascending
    const scores = defined.map(d => d.score).sort((a, b) => a - b);
    // 40th percentile index (conservative)
    const p40Index = Math.floor(scores.length * 0.4);
    const p40Score = scores[p40Index];

    // High confidence overall requires at least 4 dimensions with medium/high confidence
    const confidentDims = defined.filter(d => d.confidence === 'high' || d.confidence === 'medium').length;
    let overallConfidence = 'low';
    if (confidentDims >= 5 && defined.length >= 6) {
      overallConfidence = 'high';
    } else if (confidentDims >= 3) {
      overallConfidence = 'medium';
    }

    return {
      status: 'ready',
      level: scoreToLevel(p40Score),
      score: Math.round(p40Score * 10) / 10,
      confidence: overallConfidence,
      assessedActivitiesCount: defined.reduce((sum, d) => sum + d.evidenceCount, 0),
      dimensionsEvaluated: defined.length
    };
  }

  /**
   * Extracts evidence from the app state S.
   */
  function harvestEvidence(S, curriculum) {
    const evidences = [];
    const seenIds = new Set();

    function addEvidence(ev) {
      if (!ev || !ev.id || seenIds.has(ev.id)) return;
      seenIds.add(ev.id);
      evidences.push(ev);
    }

    if (!S || typeof S !== 'object') return evidences;

    const units = curriculum && curriculum.units && typeof curriculum.units === 'object' ? curriculum.units : {};
    const objectiveResult = (item, value) => {
      if (item.type === 'mc') return Number(value) === item.answer;
      if (item.type === 'tf') return (value === 'True') === item.answer;
      if (item.type === 'fill') return (item.answers || []).some(answer =>
        String(answer).split('|').every(part => String(value || '').toLowerCase().includes(part.toLowerCase()))
      );
      return null;
    };
    const evaluatedSnapshot = (marker, current, item) => {
      if (!marker) return null;
      const answer = marker === true ? current : marker.answer;
      if (String(answer) !== String(current)) return null;
      const correct = objectiveResult(item, current);
      return typeof correct === 'boolean' ? { answer, correct, at: marker.at || null } : null;
    };

    // 0. Deterministic receptive evidence. Structural placement is the explicit
    // construct metadata: objective items under INTERPRET assess reading; objective
    // items under listening assess listening. Grammar/STEAL MCs are never traversed.
    Object.keys(units).forEach(unit => {
      const data = units[unit] || {};
      (data.interpret?.items || []).forEach(item => {
        if (!['mc', 'tf'].includes(item.type)) return;
        const key = `${unit}:${item.id}`, current = S.a && S.a[key];
        const evaluated = evaluatedSnapshot(S.a && S.a[`${key}:checked`], current, item);
        if (!evaluated) return;
        addEvidence({
          id: createEvidenceId('objective_reading', unit, item.id),
          source: 'objective_reading', unit, taskId: item.id, modality: 'receptive',
          dimensions: ['reading_comprehension'], performance: { correct: evaluated.correct },
          timestamp: evaluated.at,
          details: { construct: item.tag || 'reading_comprehension', selectedAnswer: evaluated.answer, canonicalAnswer: item.answer }
        });
      });
      (data.listening || []).forEach(activity => {
        const submitted = S.a && S.a[`${unit}:li:${activity.id}:submitted`];
        if (!submitted) return;
        (activity.questions || []).forEach(item => {
          if (!['mc', 'tf', 'fill'].includes(item.type)) return;
          const key = `${unit}:li:${activity.id}:${item.id}`, current = S.a && S.a[key];
          const marker = submitted === true ? true : { answer: submitted.answers && submitted.answers[item.id], at: submitted.at };
          const evaluated = evaluatedSnapshot(marker, current, item);
          if (!evaluated) return;
          addEvidence({
            id: createEvidenceId('objective_listening', unit, `${activity.id}_${item.id}`),
            source: 'objective_listening', unit, taskId: `${activity.id}:${item.id}`, modality: 'receptive',
            dimensions: ['listening_comprehension'], performance: { correct: evaluated.correct },
            timestamp: evaluated.at,
            details: { construct: item.tag || 'listening_comprehension', selectedAnswer: evaluated.answer, canonicalAnswer: item.answer ?? item.answers }
          });
        });
      });
    });

    // 1. Harvest from Writing Portfolio (Full Writing Feedback)
    if (S.pf && typeof S.pf === 'object') {
      Object.keys(S.pf).forEach(taskKey => {
        const p = S.pf[taskKey];
        if (!p || !Array.isArray(p.fb)) return;
        const [unit, taskId] = taskKey.split(':');
        p.fb.forEach((fbEntry, idx) => {
          if (!fbEntry || !fbEntry.f) return;
          const f = fbEntry.f;
          // The report's own CEFR estimate is for this piece of writing as a whole, so it only
          // scores the two writing dimensions. No estimate means no score (never a default level);
          // the other dimensions only record that the draft was assessed.
          const levelScore = parseCefrString(f.estimatedLevel && f.estimatedLevel.level);
          const evId = createEvidenceId('writing_fb', unit, taskId, idx);

          addEvidence({
            id: evId,
            source: 'writing_fb',
            unit,
            taskId,
            timestamp: fbEntry.at || new Date().toISOString(),
            weight: 1.0,
            dimensions: ['written_accuracy', 'written_range', 'grammar_control', 'vocabulary'].concat(f.argumentationReasoning ? ['critical_reasoning'] : []),
            contributions: levelScore === null ? {} : {
              written_accuracy: levelScore,
              written_range: levelScore
            },
            details: {
              levelEstimate: f.estimatedLevel ? f.estimatedLevel.level : null,
              words: fbEntry.words || 0
            }
          });
        });
      });
    }

    // 2. Harvest from Speaking Portfolio (Speaking SAY IT)
    if (Array.isArray(S.sp)) {
      S.sp.forEach(attempt => {
        if (!attempt || !attempt.feedback) return;
        const evId = createEvidenceId('speaking_fb', attempt.unit, attempt.activityId, attempt.attempt || 1);
        // Speaking feedback is qualitative and transcript-only: an assessed attempt counts as
        // spoken-production evidence, never as a level (only an explicit writing CEFR estimate scores).
        addEvidence({
          id: evId,
          source: 'speaking_fb',
          unit: attempt.unit,
          taskId: attempt.activityId,
          timestamp: attempt.date || new Date().toISOString(),
          weight: 0.85,
          dimensions: ['spoken_production'],
          contributions: {},
          details: {
            analysisMode: 'transcript_only',
            duration: attempt.duration,
          },
        });
      });
    }

    // 3. Harvest from Listening Submissions & Feedback in S.a
    if (S.a && typeof S.a === 'object') {
      Object.keys(S.a).forEach(k => {
        // Listening open feedback
        if (k.includes(':li:') && k.endsWith(':feedback')) {
          const fb = S.a[k];
          if (fb && typeof fb === 'object' && fb.understanding) {
            const parts = k.split(':');
            const unit = parts[0];
            const lid = parts[2];
            const qid = parts[3];
            const evId = createEvidenceId('listening_fb', unit, `${lid}_${qid}`);
            addEvidence({
              id: evId,
              source: 'listening_fb',
              unit,
              taskId: `${lid}:${qid}`,
              timestamp: new Date().toISOString(),
              weight: 0.7,
              dimensions: ['listening_comprehension'],
              performance: { assessed: true, result: 'semantic_feedback' },
            });
          }
        }

        // Light language feedback or Interpret feedback in S.a
        if (k.endsWith(':lightfb') || k.endsWith(':intfb')) {
          const fb = S.a[k];
          if (fb && fb.f) {
            const baseKey = k.replace(/:lightfb$/, '').replace(/:intfb$/, '');
            const parts = baseKey.split(':');
            const unit = parts[0];
            const taskId = parts.slice(1).join('_');
            const evId = createEvidenceId('light_fb', unit, taskId);
            // A quick check's 0–10 accuracy/naturalness numbers are not CEFR levels, and an INTERPRET
            // verdict is given without the reading in front of the model: neither becomes a level.
            // The check still counts as written-language evidence, without a score.
            addEvidence({
              id: evId,
              source: 'light_fb',
              unit,
              taskId,
              timestamp: fb.at || new Date().toISOString(),
              weight: 0.4,
              dimensions: ['written_accuracy', 'grammar_control', 'vocabulary'],
            });
          }
        }
      });
    }

    // 4. Reviewed character conversations (text chat): one conversation = one shared context,
    // at most one evidence per dimension, written channel only, scaffolded turns already excluded
    // by the frozen review. Derived on every recompute, so ids never duplicate.
    const conv = conversationEngine();
    if (conv && S.conversations && typeof S.conversations === 'object') {
      Object.keys(S.conversations).sort().forEach(id => {
        // A conversation review's 0–10 candidate score has no CEFR anchor: keep the evidence, not the number
        conv.profileEvidenceFromReview(S.conversations[id]).forEach(ev => addEvidence(Object.assign({}, ev, { contributions: {} })));
      });
    }

    return evidences;
  }

  // The deterministic conversation engine (browser global, or the sibling file under Node).
  function conversationEngine() {
    if (typeof globalThis !== 'undefined' && globalThis.KLANG_CONVERSATIONS) return globalThis.KLANG_CONVERSATIONS;
    try { return typeof require === 'function' ? require('./conversation-engine.js') : null; } catch (e) { return null; }
  }

  /**
   * Computes Register Control qualitative indicator.
   * Purely informative; does NOT alter the 8 CEFR dimensions or the overall percentile aggregation.
   * Evaluates how the user adjusts tone between conversational, neutral, and academic contexts.
   */
  function computeRegisterProfile(S, evidences) {
    if (!S || typeof S !== 'object') {
      return {
        status: 'not_enough_evidence',
        label: 'Not enough evidence',
        summary: 'Complete more writing and language-assessed tasks to map your register flexibility across contexts.',
        evidenceCount: 0,
        insights: []
      };
    }

    let positiveConversational = 0;
    let positiveFormal = 0;
    let registerMismatchesInFormal = 0;
    let revisedRegisterAdaptations = 0;
    const insights = [];

    // 1. Analyze Full Writing Portfolio (S.pf)
    if (S.pf && typeof S.pf === 'object') {
      Object.keys(S.pf).forEach(k => {
        const item = S.pf[k];
        const feedbacks = (item && Array.isArray(item.fb)) ? item.fb : [];
        const firstDraftFb = feedbacks.find(f => f.draft === 'first');
        const revisedDraftFb = feedbacks.find(f => f.draft === 'revised');

        feedbacks.forEach(fb => {
          const f = fb.f;
          if (!f) return;

          // Check register feedback section in writing feedback
          if (f.register) {
            const regStrengths = (f.register.strengths || []).join(' ').toLowerCase();
            const regImprv = (f.register.improvements || []).join(' ').toLowerCase();
            const regSummary = (f.register.summary || '').toLowerCase();

            if (regStrengths.includes('appropriate') || regStrengths.includes('academic') || regStrengths.includes('formal') || regStrengths.includes('tone') || regStrengths.includes('calibrated') || regStrengths.includes('hedging')) {
              positiveFormal++;
            }
            if (regImprv.includes('informal') || regImprv.includes('conversational') || regImprv.includes('colloquial') || regSummary.includes('too conversational') || regSummary.includes('informal phrasing')) {
              registerMismatchesInFormal++;
            }
          }
        });

        // Check if revision addressed register appropriately
        if (firstDraftFb && revisedDraftFb) {
          const firstImprv = (firstDraftFb.f?.register?.improvements || []).join(' ').toLowerCase();
          const revisedSummary = (revisedDraftFb.f?.register?.summary || '').toLowerCase();
          const revisedStrengths = (revisedDraftFb.f?.register?.strengths || []).join(' ').toLowerCase();

          if (firstImprv.includes('conversational') || firstImprv.includes('informal')) {
            if (revisedSummary.includes('improved') || revisedStrengths.includes('register') || revisedStrengths.includes('academic') || revisedStrengths.includes('more formal') || revisedStrengths.includes('better tone')) {
              revisedRegisterAdaptations++;
            }
          }
        }
      });
    }

    // 2. Analyze Light Language Feedback & Interpret Feedback in S.a
    if (S.a && typeof S.a === 'object') {
      Object.keys(S.a).forEach(k => {
        if (k.endsWith(':lightfb') || k.endsWith(':intfb')) {
          const fb = S.a[k];
          if (!fb || !fb.f) return;
          const lang = fb.f.language || fb.f;
          const points = lang.pointsToNotice || [];
          const isAnalyticalContext = k.includes(':write') || k.includes(':int') || k.includes(':rev') || k.includes('interpret');
          const isReflectiveContext = k.includes(':think') || k.includes(':steal') || k.includes('tf:why');

          const hasRegisterNotice = points.some(p => p.category === 'register');

          if (hasRegisterNotice) {
            if (isAnalyticalContext) {
              registerMismatchesInFormal++;
            } else {
              // In personal/reflective contexts, informal phrasing is acknowledged without mismatch penalty
              positiveConversational++;
            }
          } else {
            if (lang.meaningClear && (lang.profileEvidence?.lexicalNaturalnessScore >= 7.5)) {
              if (isAnalyticalContext) positiveFormal++;
              if (isReflectiveContext) positiveConversational++;
            }
          }
        }
      });
    }

    // 3. Analyze Speaking Attempts in S.sp
    if (S.sp && Array.isArray(S.sp) && S.sp.length > 0) {
      positiveConversational += S.sp.length;
    }

    const totalEvidence = positiveConversational + positiveFormal + registerMismatchesInFormal + revisedRegisterAdaptations;

    if (totalEvidence < 3) {
      return {
        status: 'not_enough_evidence',
        label: 'Not enough evidence',
        summary: 'Complete more analytical writing and reflective tasks with feedback to map your register flexibility across contexts.',
        evidenceCount: totalEvidence,
        insights: []
      };
    }

    // Determine qualitative state
    let status = 'developing_flexibility';
    let label = 'Developing register flexibility';
    let summary = 'You demonstrate developing register awareness across different task types.';

    if (registerMismatchesInFormal > 0 && positiveFormal === 0 && revisedRegisterAdaptations === 0) {
      status = 'predominantly_conversational';
      label = 'Predominantly conversational';
      summary = 'Your conversational English is natural and confident. In analytical writing, some conversational phrasing and informal discourse markers still appear where a more neutral or calibrated academic register would be more effective.';
      insights.push('Conversational discourse markers occasionally appear in analytical tasks');
      insights.push('Opportunity to incorporate calibrated hedging in formal arguments');
    } else if (revisedRegisterAdaptations > 0 || (registerMismatchesInFormal > 0 && positiveFormal > 0)) {
      status = 'developing_flexibility';
      label = 'Developing register flexibility';
      summary = 'You are actively developing register awareness, adjusting your tone between informal reflection and analytical writing. Revisions show conscious attention to replacing conversational idioms with calibrated formal phrasing.';
      if (revisedRegisterAdaptations > 0) {
        insights.push('Demonstrated ability to revise conversational phrasing into academic prose');
      }
      insights.push('Growing differentiation between personal reflection and analytical essays');
    } else if (positiveFormal >= 2 && positiveConversational >= 1 && registerMismatchesInFormal === 0) {
      status = 'flexible_control';
      label = 'Flexible register control';
      summary = 'You move effectively between conversational and formal written English, adjusting stance, vocabulary, and degree of certainty to the task.';
      insights.push('Fluid switching between reflective and formal modes');
      insights.push('Natural use of hedging and calibrated claims in analytical writing');
    } else if (positiveFormal >= 4 && registerMismatchesInFormal === 0) {
      status = 'strong_formal_control';
      label = 'Strong academic / formal control';
      summary = 'You consistently maintain calibrated academic stance, precision, and appropriate hedging in formal writing without resorting to artificial jargon or unnecessary complexity.';
      insights.push('Consistently calibrated stance and evidence integration');
      insights.push('Precise formal register maintained across multi-paragraph essays');
    } else {
      status = 'developing_flexibility';
      label = 'Developing register flexibility';
      summary = 'You demonstrate solid register awareness across assessed tasks, with clear differentiation between reflective and analytical contexts.';
    }

    return {
      status,
      label,
      summary,
      evidenceCount: totalEvidence,
      insights
    };
  }

  /**
   * Generates the complete profile state object.
   */
  function generateFullProfile(S, curriculum) {
    const evidences = harvestEvidence(S, curriculum);
    const dimensionProfiles = DIMENSIONS.map(d => computeDimensionProfile(evidences, d));
    const overall = computeOverallProfile(dimensionProfiles);
    const registerControl = computeRegisterProfile(S, evidences);

    // Extract top strengths and priorities
    const strengths = [];
    const priorities = [];

    dimensionProfiles.forEach(d => {
      if (d.score !== null) {
        if (d.score >= 8.0) {
          strengths.push(`${d.label} (${d.level})`);
        } else if (d.score <= 6.5) {
          priorities.push(`Consolidate ${d.label.toLowerCase()} towards C1 consistency`);
        }
      }
    });

    // Add Error Log patterns if available
    if (S && Array.isArray(S.errs) && S.errs.length > 0) {
      const activeErrors = S.errs.filter(e => (e.n || 0) < 2);
      if (activeErrors.length > 0) {
        priorities.push(`${activeErrors.length} active pattern${activeErrors.length === 1 ? '' : 's'} in Error Log to review`);
      }
    }

    return {
      version: 1,
      overall,
      dimensions: dimensionProfiles,
      registerControl,
      strengths: strengths.slice(0, 4),
      priorities: priorities.slice(0, 4),
      evidenceCount: evidences.length,
      lastCalculatedAt: new Date().toISOString()
    };
  }

  return {
    CEFR_LEVELS,
    CEFR_MAP,
    DIMENSIONS,
    scoreToLevel,
    parseCefrString,
    createEvidenceId,
    computeDimensionProfile,
    computeOverallProfile,
    computeRegisterProfile,
    harvestEvidence,
    generateFullProfile
  };
});
