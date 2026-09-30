import { describe, expect, it } from 'vitest';
import { exportCsp, renderLearningReviewHtml, renderMainWriteHtml } from '../src/services/exportHtml';

const EVIL = '<script>alert(1)</script><img src=x onerror=alert(2)>';

const mainWrite = (over: any = {}) => ({
  unit: '04', unitTitle: 'The Stories We Tell Ourselves', taskId: '04w2', taskKind: 'Long-form essay', taskTitle: 'A story I tell',
  taskObjective: 'Target: 800–1200 words', taskPrompt: 'Write about a story.', learnerText: `First line.\n\nSecond ${EVIL}`, words: 4,
  draft: 'first' as const, supportUsed: false, createdAt: '2026-09-30T10:00:00.000Z', model: 'gpt-5.6-sol', promptVersion: 'main-write-v1',
  feedback: {
    estimatedLevel: { level: 'C1', rationale: 'Controlled.' },
    taskAchievement: { summary: `Covers it ${EVIL}`, strengths: ['Clear'], improvements: ['Develop'] },
    strengthsSummary: ['Voice'],
    observations: [{ type: 'STRONG_LANGUAGE', quote: EVIL, explanation: 'Works.', effect: 'Vivid.', revisionStrategy: 'Keep it.' }],
    nextDraftPriorities: ['Sharpen the ending', 'Cut repetition'],
  },
  ...over,
});

describe('HTML exports', () => {
  it('Main Write: escapes learner and model text, keeps Draft 1 whole, shows every part', () => {
    const html = renderMainWriteHtml(mainWrite(), 'N0nce');
    expect(html).not.toContain('<script>alert');
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('First line.\n\nSecond');
    for (const s of ['A story I tell', 'Unit 04', 'Draft 1 · 4 words', 'Strong language', 'Sharpen the ending', 'Diagnosis by dimension', 'gpt-5.6-sol', 'main-write-v1', 'Exporting makes no AI call'])
      expect(html).toContain(s);
    // The only script is the nonce'd print button
    expect(html.match(/<script/g)).toHaveLength(1);
    expect(html).toContain('<script nonce="N0nce">');
    expect(html).toContain('@media print');
  });

  it('Main Write: says support was not recorded instead of claiming it was not used', () => {
    expect(renderMainWriteHtml(mainWrite(), 'n')).toContain('Writing support: not recorded');
    expect(renderMainWriteHtml(mainWrite({ supportUsed: true }), 'n')).toContain('Writing support used');
  });

  it('Main Write: older (non-Sol) reports still render', () => {
    const html = renderMainWriteHtml(mainWrite({ feedback: { grammarAccuracy: { summary: 'Old key' }, corrections: [{ original: 'a', corrected: 'b', explanation: 'c' }], nextDraftPriorities: [] } }), 'n');
    expect(html).toContain('Old key');
    expect(html).toContain('Isolated errors');
  });

  it('Learning Review: labels fact, AI, judgment and proposal, escapes everything, omits empty sections', () => {
    const ref = { id: 'ans:01:i1', label: 'Unit 01 · INTERPRET · i1', origin: 'learner', provenance: 'independent', kind: 'open_answer', at: '2026-09-29T00:00:00Z', snippet: EVIL, runId: 'run-1', activity: '01:i1' } as any;
    const obs = { key: 'k', label: 'Hedging', status: 'recurring', confidence: 'moderate', evidenceCount: 1, activityCount: 1, sourceCount: 1, firstSeen: '2026-09-29T00:00:00Z', lastSeen: '2026-09-29T00:00:00Z', interpretation: 'You state inferences as facts.', implication: '', evidence: [ref], counterEvidence: [], humanJudgment: 'disagree' } as any;
    const report: any = {
      version: 1, runId: 'run-secret-id', generatedAt: '2026-09-30T00:00:00Z', trigger: 'manual', period: { from: null, to: '2026-09-30T00:00:00Z' },
      evidence: { total: 1, deferred: 0, byOrigin: { learner: 1, check: 0, record: 0, ai: 0 }, byProvenance: {}, byKind: {}, activities: ['Unit 01 · INTERPRET · i1'] },
      workedOn: [], ledger: [ref],
      sections: { gettingStronger: [], emerging: [], recurring: [obs], improving: [], recognitionToProduction: [], notEnoughEvidence: [] },
      nextSession: [], proposals: [], uncertainties: [], warnings: [], model: { name: 'm', reasoning: 'r', promptVersion: 'v' },
    };
    const html = renderLearningReviewHtml(report, 'n');
    expect(html).not.toContain('<script>alert');
    expect(html).not.toContain('run-secret-id');
    for (const s of ['Recurring patterns', 'AI interpretation', 'You disagreed with this interpretation.', 'Fact · evidence', 'first review', 'None. The evidence in this period does not justify changing the next unit.'])
      expect(html).toContain(s);
    expect(html).not.toContain('Getting stronger');
  });

  it('CSP allows only fonts and the nonce script', () => {
    const csp = exportCsp('abc');
    expect(csp).toContain("script-src 'nonce-abc'");
    expect(csp).toContain("default-src 'none'");
    expect(csp).not.toContain('unsafe-eval');
  });
});
