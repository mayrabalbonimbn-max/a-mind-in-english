import { describe, expect, it } from 'vitest';

const engine = require('../public/conversation-engine.js');
const profile = require('../public/profile.js');
const T = (m: number) => `2026-09-30T12:${String(m).padStart(2, '0')}:00.000Z`;

function reviewed(id: string, candidates: any[], unit = '01') {
  let c = engine.createEpisode({ conversationId: id, unitId: unit, characterId: 'unit01_narrator', characterCardVersion: '1', sourceContentVersion: 'u01-read-1', createdAt: T(0) });
  c = engine.appendUserTurn(c, { id: `${id}_u1`, text: 'Access, not loss.', clientId: 'device_0001', clientSequence: 1, createdAt: T(1) });
  c = engine.endConversation(c, T(2));
  c.reviewState = { status: 'complete', revision: 1, result: { profileEvidenceCandidates: candidates.map(x => ({ eligible: true, score: 7, weight: 0.3, turnIds: [`${id}_u1`], rationale: 'r', evidenceEventId: `character_conversation:${id}:review:1:${x.dimension}`, ...x })) }, audit: { reviewedAt: T(3) } };
  return c;
}
const state = (conversations: any[]) => ({ a: {}, pf: {}, sp: [], errs: [], conversations: Object.fromEntries(conversations.map(c => [c.conversationId, c])) });
const fromConversations = (ev: any[]) => ev.filter(e => e.source === 'character_conversation');

describe('Review → English Profile (local integration)', () => {
  it('a frozen review becomes conversation-scoped written evidence in the real harvest', () => {
    const ev = fromConversations(profile.harvestEvidence(state([reviewed('conversation_p1', [{ dimension: 'written_accuracy' }, { dimension: 'critical_reasoning' }])]), { units: {} }));
    expect(ev.map((e: any) => e.dimensions[0]).sort()).toEqual(['critical_reasoning', 'written_accuracy']);
    ev.forEach((e: any) => { expect(e.channel).toBe('written'); expect(e.contextId).toBe('character_conversation:conversation_p1'); });
  });

  it('recomputing never duplicates, and unreviewed or ineligible candidates add nothing', () => {
    const conv = reviewed('conversation_p2', [{ dimension: 'written_range' }, { dimension: 'vocabulary', eligible: false, evidenceEventId: null, score: null }]);
    const unreviewed = { ...reviewed('conversation_p3', [{ dimension: 'grammar_control' }]), reviewState: { status: 'not_requested', revision: 0, result: null, audit: null } };
    const S = state([conv, unreviewed]);
    const a = fromConversations(profile.harvestEvidence(S, { units: {} })), b = fromConversations(profile.harvestEvidence(S, { units: {} }));
    expect(a).toEqual(b);
    expect(a.map((e: any) => e.dimensions[0])).toEqual(['written_range']);
  });

  it('text chat never feeds spoken production', () => {
    const S = state([reviewed('conversation_p4', [{ dimension: 'spoken_production' }, { dimension: 'written_accuracy' }])]);
    const full = profile.generateFullProfile(S, { units: {} });
    const spoken = full.dimensions ? full.dimensions.find((d: any) => d.key === 'spoken_production') : null;
    expect(fromConversations(profile.harvestEvidence(S, { units: {} })).some((e: any) => e.contributions.spoken_production !== undefined)).toBe(false);
    if (spoken) expect(spoken.evidenceCount).toBe(0);
  });

  it('one conversation cannot turn a single-source dimension into high confidence; two different ones may add diversity', () => {
    const dim = profile.DIMENSIONS.find((d: any) => d.key === 'written_accuracy');
    const base = Array.from({ length: dim.highEvidence }, (_, i) => ({ id: `pf_${i}`, source: 'writing_portfolio', unit: i % 2 ? '01' : '02', contributions: { written_accuracy: 7 }, weight: 1 }));
    expect(profile.computeDimensionProfile(base, dim).confidence).not.toBe('high');
    const one = fromConversations(profile.harvestEvidence(state([reviewed('conversation_p5', [{ dimension: 'written_accuracy', score: 10 }])]), { units: {} }));
    expect(profile.computeDimensionProfile([...base, ...one], dim).confidence).not.toBe('high');
    const two = fromConversations(profile.harvestEvidence(state([reviewed('conversation_p5', [{ dimension: 'written_accuracy' }]), reviewed('conversation_p6', [{ dimension: 'written_accuracy' }])]), { units: {} }));
    expect(profile.computeDimensionProfile([...base, ...two], dim).confidence).toBe('high');
  });

  it('a single conversation alone never produces a level', () => {
    const S = state([reviewed('conversation_p7', [{ dimension: 'written_accuracy', score: 10 }, { dimension: 'reading_comprehension', score: 10 }])]);
    const ev = profile.harvestEvidence(S, { units: {} });
    profile.DIMENSIONS.forEach((d: any) => expect(profile.computeDimensionProfile(ev, d).level).toBeNull());
  });
});
