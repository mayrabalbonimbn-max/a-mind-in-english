/* Register & Tone: one pedagogical system, three uses.
   - Writing support (before writing): register guide + useful language + writing tips.
     Deterministic and local: chosen from the activity's stage and its existing tag/kind.
     It never reads the question text, the learner's answers, Profile or Error Log, and never calls AI.
   - Compare registers (on request): the five register definitions below also brief the AI prompt.
   Every frame is content-free: it helps the learner phrase her own idea and never states one.
   UMD: browser (window.KLANG_REGISTER) and server (require). */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KLANG_REGISTER = factory();
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this), function () {
  'use strict';

  // Five contexts, not five levels of quality.
  const REGISTERS = [
    { id: 'casual', label: 'Casual', gist: 'Talking to friends or people you know well. Contractions, everyday words, direct stance, relaxed structure.' },
    { id: 'neutral', label: 'Neutral', gist: 'Clear, ordinary English that fits most situations: neither chatty nor stiff.' },
    { id: 'professional', label: 'Professional', gist: 'Work contexts with colleagues or clients. Diplomatic, tactful, cooperative; criticism is softened and framed around the task.' },
    { id: 'formal', label: 'Formal', gist: 'Official or distant relationships: letters, institutions, ceremonies. Fewer contractions, more careful word choice and politeness.' },
    { id: 'academic', label: 'Academic', gist: 'Writing about ideas and evidence. Attention moves from the writer to the claim; certainty is calibrated with hedging; precise, not ornate.' },
  ];

  // Stable task profiles: register + communicative purpose.
  const PROFILES = {
    personal: {
      register: 'neutral', purpose: 'personal',
      why: 'Your own experience, told clearly. First person and contractions are natural here.',
      summary: 'Start from one specific moment, then say what it shows you.',
      steps: ['Start with a specific situation, not a general statement.', 'Say what happened or what you noticed.', 'Say what it shows you, or what you are still unsure about.'],
      frames: ['The first thing that comes to mind is…', 'I remember a time when…', 'What I noticed was…', 'Looking back, I think…', "I'm still not sure whether…"],
      note: 'One real moment is easier to write about than “always” or “never”.',
    },
    reflective: {
      register: 'neutral', purpose: 'reflective',
      why: 'Thinking aloud about a text: personal and clear, but not chatty.',
      summary: 'Say what you think, why, and where in the text you see it.',
      steps: ['State what you think.', 'Explain why.', 'Connect it to something specific in the text.'],
      frames: ['What stands out to me is…', 'This seems to suggest that…', 'I think the writer is suggesting that…', 'What makes this more complicated is…', "However, I wouldn't necessarily say that…"],
      note: "If your view isn't absolute, add a qualification.",
    },
    analytical: {
      register: 'academic', purpose: 'analytical',
      why: 'The focus moves from you to the text and its evidence. Fewer “I think”s, more precise verbs.',
      summary: 'Point, evidence, what it suggests, why it matters.',
      steps: ['Identify the point you want to analyse.', 'Point to the evidence.', 'Explain what the evidence suggests.', 'Say why that matters.'],
      frames: ['The passage suggests that…', 'This is particularly clear when…', 'This may indicate that…', 'This can be read as…', 'The distinction matters because…'],
      note: "Hedge what the text doesn't fully prove: may, seems to, suggests.",
    },
    persuasive: {
      register: 'neutral', purpose: 'persuasive',
      why: 'Taking a position and defending it: direct, but fair to the other side.',
      summary: 'Position, strongest reason, one fair objection.',
      steps: ['State your position.', 'Give your strongest reason.', 'Support or illustrate it.', 'Consider a reasonable counterargument.', 'Refine your position if necessary.'],
      frames: ['I would argue that…', 'The strongest reason for this is…', 'However, this depends on…', 'A possible counterargument is…', 'Even so, …'],
      note: 'A qualified position is usually stronger than an absolute one.',
    },
    argumentative: {
      register: 'academic', purpose: 'argumentative',
      why: 'A reasoned case for a reader who may disagree. The position is yours; the evidence carries it.',
      summary: 'Claim, reasons, a real objection, a refined claim.',
      steps: ['State your position.', 'Give your strongest reason.', 'Support or illustrate it.', 'Consider a reasonable counterargument.', 'Refine your position if necessary.'],
      frames: ['I would argue that…', 'The most convincing reason is…', 'It could be objected that…', 'This objection holds only if…', 'On balance, …'],
      note: 'Academic is not “harder words”: it is calibrated certainty and a visible line of reasoning.',
    },
    reasoning: {
      register: 'neutral', purpose: 'analytical',
      why: 'Working notes for careful thinking. Plain, precise English is enough.',
      summary: 'More than one explanation, then what would decide between them.',
      steps: ['Name what you are testing.', 'Give more than one explanation or option.', 'Say what evidence would tell them apart.', 'Say how confident you are.'],
      frames: ['One possible explanation is…', 'Another way of reading this is…', 'This would be weakened if…', 'The evidence only shows that…', 'It depends on whether…'],
      note: 'Separate what you observe from what you infer.',
    },
  };

  // Process help for writing tasks (never an outline with content).
  const PLAN = {
    title: 'Before you write',
    lead: "If you're stuck, don't force the introduction first.",
    steps: ['Write your main point in plain English.', 'List 2–3 ideas you want to develop.', 'Give each paragraph one job.', 'Decide what evidence or example belongs in each.', 'Then write the opening.'],
  };

  // Support fades across the book; it never disappears ("need more support?" stays available).
  function levelFor(unitId) {
    const u = String(unitId || '');
    if (u === '01' || u === '02') return 'high';
    if (u === '03' || u === '04' || u === '05') return 'medium';
    return 'light';   // Units 06–10 and Module Reviews
  }
  const SHOWN = { high: { frames: 4, steps: true, why: true, plan: true }, medium: { frames: 3, steps: false, why: true, plan: false }, light: { frames: 2, steps: false, why: false, plan: false } };

  const has = (s, re) => re.test(String(s || ''));
  /** Which profile fits an activity, from its stage and existing tag/kind only. null = no support. */
  function profileFor(stage, item) {
    if (!item || item.timed) return null;                      // Timed Challenge: independent performance
    const tag = item.tag || '', kind = item.kind || '';
    if (item.type === 'writing') {
      if (stage !== 'write' && stage !== 'synthesis') return null;   // EDIT revision already has its checklist
      if (has(kind, /argument|critical|ethical/i)) return 'argumentative';
      if (has(kind, /decision/i)) return 'reasoning';
      if (has(kind, /personal/i)) return 'personal';
      if (has(kind, /reflect|short response/i)) return 'reflective';
      return 'analytical';   // analytical, evidence, concept, interpretive, historical, synthesis…
    }
    if (item.type !== 'open') return null;                     // mc, tf, produce, match, label: no scaffold
    if (stage === 'know') return 'personal';
    if (stage === 'think' || stage === 'reasoning') return has(tag, /apply it to yourself/i) ? 'personal' : 'reasoning';
    if (stage === 'interpret') {
      if (has(tag, /position|ethic|principle/i)) return 'persuasive';
      if (has(tag, /^interpretation$|ending|authorial|does it follow|unsaid|application/i)) return 'reflective';
      return 'analytical';
    }
    return null;   // retrieve, notice, steal, language, editing…: protected or form-focused
  }

  function supportFor(unitId, stage, item) {
    const id = profileFor(stage, item);
    if (!id) return null;
    const p = PROFILES[id], level = levelFor(unitId), show = SHOWN[level];
    const isWriting = item.type === 'writing';
    const label = `${p.register} · ${p.purpose}`.toUpperCase();
    const more = {
      why: show.why ? '' : p.why,
      steps: show.steps ? [] : p.steps,
      frames: p.frames.slice(show.frames),
      plan: isWriting && !show.plan ? PLAN : null,
      note: show.steps ? '' : p.note,
    };
    return {
      profile: id, level, label, register: p.register, purpose: p.purpose,
      why: show.why ? p.why : '',
      frames: p.frames.slice(0, show.frames),
      steps: show.steps ? p.steps : [],
      summary: show.steps ? '' : p.summary,
      note: show.steps ? p.note : '',
      plan: isWriting && show.plan ? PLAN : null,
      more: (more.why || more.steps.length || more.frames.length || more.plan) ? more : null,
    };
  }

  return { REGISTERS, PROFILES, PLAN, levelFor, profileFor, supportFor };
});
