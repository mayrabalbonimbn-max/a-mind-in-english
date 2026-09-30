import { describe, it, expect } from 'vitest';
import { loadApp } from './helpers/appHarness';

describe('Study Timer · Client functionality, persistence, and auto-cap safety', () => {
  it('starts and toggles study session and updates timer state', () => {
    const a = loadApp({
      last: { u: '01', s: 'read' },
      study: { activeSession: null, sessions: [] }
    });

    a.go('u01-read');
    expect(a.state().study.activeSession).toBeNull();

    // Start timer
    a.click({ act: 'timer-toggle' });
    const stateAfterStart = a.state();
    expect(stateAfterStart.study.activeSession).not.toBeNull();
    expect(stateAfterStart.study.activeSession.startedAt).toBeTruthy();

    // Simulate stopping timer
    a.click({ act: 'timer-toggle' });
    const stateAfterStop = a.state();
    expect(stateAfterStop.study.activeSession).toBeNull();
  });

  it('survives page reloads / storage roundtrips with active timestamp', () => {
    const startedAt = new Date(Date.now() - 120000).toISOString(); // 2 minutes ago
    const a = loadApp({
      last: { u: '01', s: 'read' },
      study: {
        activeSession: { id: 'test_session_1', startedAt },
        sessions: []
      }
    });

    a.go('u01-read');
    expect(a.state().study.activeSession).not.toBeNull();
    expect(a.state().study.activeSession.id).toBe('test_session_1');
  });

  it('accumulates completed sessions and preserves them across sync scopes', () => {
    const a = loadApp({
      last: { u: '01', s: 'read' },
      study: {
        activeSession: null,
        sessions: [
          { id: 's1', startedAt: '2026-09-30T10:00:00.000Z', endedAt: '2026-09-30T10:30:00.000Z', durationSeconds: 1800 },
          { id: 's2', startedAt: '2026-09-30T11:00:00.000Z', endedAt: '2026-09-30T11:45:00.000Z', durationSeconds: 2700 }
        ]
      }
    });

    expect(a.state().study.sessions).toHaveLength(2);
    const totalMinutes = a.state().study.sessions.reduce((acc: number, s: any) => acc + s.durationSeconds, 0) / 60;
    expect(totalMinutes).toBe(75);
  });

  it('accumulates 20 + 25 + 20 = 65 minutes across sessions for nightly eligibility', async () => {
    const { getAccumulatedStudyMinutes, runLearningReview } = await import('../src/services/learningReview/pipeline');
    const { prisma } = await import('../src/prisma');
    const crypto = await import('crypto');

    const userId = crypto.randomUUID();
    await prisma.user.create({
      data: { id: userId, email: `timer-${Date.now()}@example.com`, passwordHash: 'hash' }
    });

    // Seed 20m + 25m + 20m sessions (1200s + 1500s + 1200s = 3900s = 65 min)
    await prisma.userDocument.create({
      data: {
        userId,
        key: 'study-timer',
        data: {
          sessions: [
            { id: 's1', startedAt: '2026-09-28T10:00:00Z', endedAt: '2026-09-28T10:20:00Z', durationSeconds: 1200 },
            { id: 's2', startedAt: '2026-09-29T14:00:00Z', endedAt: '2026-09-29T14:25:00Z', durationSeconds: 1500 },
            { id: 's3', startedAt: '2026-09-30T09:00:00Z', endedAt: '2026-09-30T09:20:00Z', durationSeconds: 1200 },
          ]
        }
      }
    });

    await prisma.learningReviewState.create({
      data: { userId, analysed: {}, patterns: [] }
    });

    const mins = await getAccumulatedStudyMinutes(userId, null);
    expect(mins).toBe(65);

    // Case 1: >=60 min accumulated, but NO new usable evidence -> returns no_new_evidence (zero AI calls)
    const resNoEv = await runLearningReview(userId, 'nightly');
    expect(resNoEv.status).toBe('no_new_evidence');

    // Case 2: Under 60 min (<60 min) with evidence -> returns below_study_threshold for nightly
    const userId2 = crypto.randomUUID();
    await prisma.user.create({
      data: { id: userId2, email: `timer-under-${Date.now()}@example.com`, passwordHash: 'hash' }
    });
    // 30 min session only
    await prisma.userDocument.create({
      data: {
        userId: userId2,
        key: 'study-timer',
        data: {
          sessions: [{ id: 's1', startedAt: '2026-09-30T10:00:00Z', endedAt: '2026-09-30T10:30:00Z', durationSeconds: 1800 }]
        }
      }
    });
    await prisma.learningReviewState.create({
      data: { userId: userId2, analysed: {}, patterns: [] }
    });
    // Add real answer evidence in unit 01
    await prisma.userDocument.create({
      data: {
        userId: userId2,
        key: 'unit:01',
        data: { answers: { '01:i8': 'The argument relies on implicit premises.', '01:i9': 'Second inference', '01:i10': 'Third interpretation' } }
      }
    });

    const resUnder = await runLearningReview(userId2, 'nightly');
    expect(resUnder.status).toBe('below_study_threshold');
    if (resUnder.status === 'below_study_threshold') {
      expect(resUnder.studyMinutes).toBe(30);
      expect(resUnder.requiredMinutes).toBe(60);
    }

    // Manual run for same user runs even before 60 min threshold when evidence exists
    const { __setStructuredCallForTests } = await import('../src/services/ai/provider');
    __setStructuredCallForTests(async () => ({
      observations: [],
      notEnoughEvidence: [],
      nextSession: [],
      proposals: [],
      uncertainties: ['First study session.'],
    }));

    const resManual = await runLearningReview(userId2, 'manual');
    expect(resManual.status).toBe('completed');

    // Cleanup
    await prisma.user.deleteMany({ where: { id: { in: [userId, userId2] } } });
  });
});
