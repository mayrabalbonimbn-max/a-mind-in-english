# A MIND IN ENGLISH

## Product Context & Living Specification

> **Status:** Living product specification\
> **Last updated:** 2026-09-30\
> **Scope:** Product, pedagogy, learner experience, AI architecture,
> evidence model, assessment, privacy, and high-level operational
> constraints.

------------------------------------------------------------------------

## 0. Instructions for every coding agent

This document is the high-level source of truth for **A Mind in
English**.

Every coding agent must read it before making product-level changes.

At the end of every development round, verify whether the work changed
any documented:

-   product behavior;
-   feature status;
-   pedagogical decision;
-   learner flow;
-   relevant architecture;
-   AI model or model routing;
-   evidence/tracking behavior;
-   Adaptive Learning behavior;
-   privacy/data handling;
-   assessment behavior;
-   Core/Optional behavior;
-   deployment or production status that materially changes this
    specification.

If yes, update the relevant section before finishing.

This document is **not a changelog**. Do not add every refactor, bug
fix, filename, test run, temporary implementation detail, or command
executed.

Keep these states distinct:

-   **IMPLEMENTED** --- exists in the current product/codebase and has
    been completed.
-   **IN DEVELOPMENT** --- actively being built or partially
    implemented; do not describe as production-ready.
-   **PLANNED** --- approved direction, not yet implemented.
-   **DEFERRED** --- intentionally postponed.

When a decision changes, update the relevant section instead of leaving
contradictory versions.

If this document conflicts with the code:

1.  investigate the discrepancy;
2.  distinguish unfinished implementation from an actual product
    contradiction;
3.  do not silently change a pedagogical/product decision just to match
    the code;
4.  surface contradictions that require a product decision.

Never include secrets, API keys, chain-of-thought, unnecessary personal
information, or sensitive learner content here.

Before the final report of every development round, answer internally:

> **Does `MIND_PRODUCT_CONTEXT.md` still accurately describe the product
> after my changes?**

Final development reports should include either:

`MIND_PRODUCT_CONTEXT.md: UNCHANGED`

or

`MIND_PRODUCT_CONTEXT.md: UPDATED — [short description]`

------------------------------------------------------------------------

# PART I --- PRODUCT IDENTITY

## 1. What A Mind in English is

**Status: IMPLEMENTED / foundational product identity**

A Mind in English is a personal digital study book for advanced English
study.

It is not intended to be:

-   a school;
-   a traditional LMS;
-   a gamified language app;
-   a generic chatbot;
-   an infinite AI exercise generator;
-   an analytics dashboard.

Product identity:

**A MIND IN ENGLISH**\
**B2+ → C1**\
**PERSONAL STUDY BOOK**\
**32 UNITS · 7 MODULES**

Core line:

> **Read. Think. Write.**

The product uses English to develop the ability to:

-   read;
-   interpret;
-   think;
-   argue;
-   write;
-   listen;
-   speak;
-   revise;
-   retrieve knowledge;
-   notice nuance and register;
-   transfer language into new contexts;
-   become increasingly independent.

The goal is not activity completion for its own sake. The goal is
advanced, usable English.

------------------------------------------------------------------------

## 2. Why the product exists

The learner can communicate naturally and consume advanced English, but
productive ability is uneven.

After a long period without regular formal study and long-form
structured writing, productive English became more conversational and
informal than desired.

A recurring problem is not lack of ideas, but converting ideas into:

-   structured arguments;
-   analytical responses;
-   formal writing;
-   professional/academic language;
-   sustained, organized English.

A central distinction in the product is therefore:

> **I understand this**\
> is not the same as\
> **I can produce this independently.**

The product should help move knowledge through different forms of
evidence such as:

**recognition → supported production → independent production →
spontaneous transfer → delayed retrieval**

This must never become a fake linear mastery bar.

------------------------------------------------------------------------

## 3. Product philosophy

**Status: foundational constraint**

The primary pedagogical cycle is:

**INPUT → COMPREHENSION → NOTICING → LANGUAGE → THINKING → PRODUCTION →
FEEDBACK → REVISION → RETRIEVAL**

AI may:

-   explain;
-   diagnose;
-   identify patterns;
-   compare;
-   question;
-   give feedback;
-   provide bounded support when the learner is stuck;
-   observe longitudinal evidence;
-   propose adaptations.

AI should not replace:

-   the learner's initial attempt;
-   thinking;
-   argumentation;
-   meaningful production;
-   revision;
-   independent assessment;
-   human pedagogical judgment.

The long-term goal is not to build a system that knows the most about
the learner.

The goal is to build a system that helps the learner need less
assistance to use English well.

------------------------------------------------------------------------

# PART II --- CURRICULUM AND LEARNING EXPERIENCE

## 4. Curriculum

**Status: IMPLEMENTED across all 32 Units and 7 Modules**

Curriculum architecture:

-   32 Units;
-   7 Modules (Module 1: Language, Memory & The Self; Module 2: Work, Craft & Mastery; Module 3: Society, Power & Politics; Module 4: Technology & Modern Life; Module 5: Photography, Art & the Act of Looking; Module 6: Reasoning, Persuasion & Argument; Module 7: Writing & Voice).

Current curriculum state:

-   Units 01--32: **IMPLEMENTED**
-   Module Reviews 1--7: **IMPLEMENTED**
-   Pronunciation in Context (Units 01--32): **IMPLEMENTED**
-   Audio Production Guide (`MIND_AUDIO_RECORDING_GUIDE.md`): **IMPLEMENTED** with full scripts, voice casting, and speech pacing ready for studio/ElevenLabs generation.
-   Recorded audio: **PARTIAL** --- only Units 01--10 and Module Reviews 1--2 have audio files; the rest is scripted but not yet recorded (see §15).
-   Structural integrity (not yet deployed): every stage of Units 01--32 and Module Reviews 1--7 is validated against the fields the book actually renders, and a browser smoke renders all of them. Reviews 3--7 are reachable from the sidebar and by route (previously only Reviews 1--2 opened), and their activities render (Reviews 5--7 had been written without item types and showed nothing).

Curriculum scale:

-   32 Units (\~75–85 activities each);
-   7 Comprehensive Module Reviews;
-   64 Unit Listening tracks + 14 Module Review Listening tracks (full scripts & exercises; audio recorded for 24 of them);
-   32 Unit Speaking prompts + 7 Module Review Speaking tasks;
-   roughly 350–450 hours of deep study material;
-   6 Long-form writing units (Units 10, 16, 20, 24, 27, 31) plus the Capstone essay (Unit 32, 1,200–1,800 words);
-   Full B2+ → solid C1 progression focusing on intellectual sovereignty, epistemic modesty, register control, and analytical nuance.

A known product risk is excessive volume. The Core path provides a curated 30–45 minute essential cycle per unit (1 THINK, 3 INTERPRET, 4 STEAL chunks, 3 RETRIEVE), keeping all other activities open for extra practice.

------------------------------------------------------------------------

## 5. Unit stages

**Status: IMPLEMENTED**

The main stages are:

1.  **KNOW**
2.  **READ**
3.  **INTERPRET**
4.  **NOTICE**
5.  **STEAL**
6.  **THINK**
7.  **WRITE**
8.  **EDIT**
9.  **RETRIEVE**

Listening is commonly integrated into INTERPRET.

Speaking is commonly integrated into THINK.

------------------------------------------------------------------------

## 6. KNOW

**Status: IMPLEMENTED**

KNOW provides preparatory/background knowledge where useful.

It is generally treated as optional in the current Core/Optional
presentation.

Its role is preparation, not assessment.

------------------------------------------------------------------------

## 7. READ

**Status: IMPLEMENTED / protected**

READ uses adult, substantive texts rather than simplified content merely
because the reader is a language learner.

Texts may include:

-   narrative;
-   essay;
-   analysis;
-   counterpoints;
-   competing perspectives.

READ/source texts are protected from automatic Adaptive Learning
changes.

------------------------------------------------------------------------

## 8. INTERPRET

**Status: IMPLEMENTED**

INTERPRET works on:

-   comprehension;
-   inference;
-   argument;
-   evidence;
-   interpretation;
-   critical reading.

It contains objective and open activities.

For AI-evaluated open interpretation, the model is explicitly told when
it has **not** seen the full source reading. It must not pretend to know
source details it was not given.

Current verdict vocabulary includes:

-   `developed`
-   `partial`
-   `needs_clarification`
-   `not_answered`

Old behavior that could overstate misunderstanding has been removed.

------------------------------------------------------------------------

## 9. NOTICE

**Status: IMPLEMENTED**

NOTICE works on language in context:

-   grammar;
-   usage;
-   nuance;
-   register;
-   linguistic patterns.

Grammar should not become disconnected drills by default.

The current Core layer identifies one principal NOTICE focus per Unit.

------------------------------------------------------------------------

## 10. STEAL

**Status: IMPLEMENTED**

STEAL is for language worth reusing:

-   vocabulary;
-   chunks;
-   collocations;
-   pronunciation;
-   functional language;
-   reusable argumentative language.

The current Core layer includes four reusable argumentative frames per
Unit.

------------------------------------------------------------------------

## 11. THINK

**Status: IMPLEMENTED**

THINK is central to the identity of the product.

The aim is not merely correct English, but using English to think.

Tasks may involve:

-   interpretation;
-   argumentation;
-   hypotheses;
-   competing explanations;
-   ethics;
-   causal reasoning;
-   calibrated confidence;
-   evidence;
-   narrative analysis.

There is currently exactly **one manually selected Core THINK activity
per Unit**. Other THINK activities remain available as:

`optional · extra practice`

Nothing is hidden or blocked.

Core THINK selection is pedagogical, not mechanical.

Current selections:

-   U01 → T5
-   U02 → T4
-   U03 → T5
-   U04 → T3
-   U05 → T5
-   U06 → T5
-   U07 → T3
-   U08 → T5
-   U09 → T4
-   U10 → T5
-   U11 → T1
-   U12 → T1
-   U13 → T2
-   U14--U32 → T1

The selected THINK should, where possible, feed meaningfully into the
Unit's main writing.

------------------------------------------------------------------------

## 12. WRITE

**Status: IMPLEMENTED (including Main Write feedback via GPT-5.6 Sol; see
Part X)**

WRITE contains shorter open production and longer writing.

Each Unit has a principal **MAIN WRITE / MAIN TEXT** (marked as the
task that goes into the Writing Portfolio and as Core).

Writing tasks may include an optional outline step with its own AI
outline feedback before drafting.

The Main Text is treated as the most pedagogically important production
in the Unit.

The purpose is not for AI to produce polished writing on the learner's
behalf.

The intended cycle is:

**learner writes → receives high-quality diagnosis → understands the
feedback → revises independently**

------------------------------------------------------------------------

## 13. EDIT and revision history

**Status: IMPLEMENTED (Draft 1 and Draft 2 stored separately; feedback
never modifies drafts)**

EDIT should center the learner's own revision.

The required conceptual sequence is:

**DRAFT 1 → FEEDBACK → DRAFT 2**

Draft 1 must not disappear when Draft 2 is created.

Original feedback must not be silently overwritten.

This sequence is valuable evidence because it distinguishes:

-   initial independent production;
-   feedback received;
-   successful self-revision;
-   unresolved issues;
-   later independent transfer.

Future feedback on Draft 2 should be a separate/versioned analysis, not
a mutation of the Draft 1 analysis.

**Main Write snapshot semantics (IMPLEMENTED, not yet deployed):** when
a Main Write analysis succeeds, the server stores an append-only record
of it: the exact text analysed (a snapshot, never the live field), the
model and prompt version actually used, the expected register, the
feedback and the Writing Support facts at submission. In a Unit, the
analysed Draft 1 is then read-only; "start Draft 2" copies it into the
separate Draft 2 (EDIT), and the learner revises there. Draft 2 analyses
are separate records. History is never trimmed. Module Review main tasks
have no Draft 2 task, so their Draft 1 is not frozen, but every analysis
of them is still kept as a snapshot.

------------------------------------------------------------------------

## 14. RETRIEVE

**Status: IMPLEMENTED / protected**

RETRIEVE tests later access to knowledge.

Immediate post-instruction performance is not equivalent to retention.

Delayed retrieval can be stronger evidence than immediate supported
performance.

RETRIEVE is protected from automatic curriculum modification.

### Personal Retrieval

**Status: IMPLEMENTED (deterministic, zero AI calls)**

Within RETRIEVE, the product picks a small spaced dose of the learner's
own Glossary `LEARNING` items and Error Log entries from **earlier**
Units.

-   Spacing gaps grow with each showing (0, 2, 4, 8, 16, 30 days);
-   selection is deterministic per day, so it is the same on every
    device;
-   the learner may shuffle to other due items;
-   marking an Error Log item as reviewed increments its review count.

It reuses existing learner material; it never generates new exercises.

------------------------------------------------------------------------

## 15. Listening

**Status: IMPLEMENTED for Units 01--10 and Module Reviews 1--2; audio for
the rest PLANNED**

The product currently has 24 recorded audio assets: two per Unit for
Units 01--10 and two per Review for Module Reviews 1--2.

Units 11--32 and Module Reviews 3--7 already contain listening scripts
and exercises; their recordings do not exist yet. Recording them is
tracked in `MIND_AUDIO_RECORDING_GUIDE.md`.

**Media readiness:** a listening is either recorded (its file exists and
is checked) or explicitly not ready (`audioReady: false`). A track that
is not ready shows a notice and a preview of its passes and questions:
no player, no answering, no transcript standing in for the audio, and
nothing counted against progress. Work submitted earlier stays visible.

Listening activities follow a multi-pass structure (gist → evidence →
framing language) and support AI feedback on open answers.

Current decision:

**Use and validate the existing audio before generating more.**

Some current audio may sound too much like written essays being read
aloud.

Future listening scripts should be designed for listening and may
include:

-   monologues;
-   dialogues;
-   varied speakers;
-   varied accents;
-   varied registers;
-   natural listening situations.

Dynamic audio generation is not a current priority.

------------------------------------------------------------------------

## 16. Speaking

**Status: IMPLEMENTED**

Current flow includes:

**MediaRecorder → IndexedDB → Whisper → transcript → feedback**

Important evidence limitation:

Whisper may normalize speech.

Therefore Whisper transcripts must not be treated as reliable primary
evidence for fine-grained:

-   grammatical accuracy;
-   pronunciation;
-   intelligibility.

They may be used cautiously for:

-   content;
-   lexical range;
-   attempted production;
-   idea development.

All Units and Reviews use one speaking contract (task, preparation,
timing, targets, rubric). Units 23--32 were written as a three-part
card; their canonical task is built from their own words and the full
card is kept.

Privacy: recordings stay in the browser's IndexedDB. Only transcript,
feedback and metadata sync. Speaking feedback is transcript-only, and the
UI says so. Corrections from speaking feedback can be sent to the Error
Log by the learner.

------------------------------------------------------------------------

# PART III --- SUPPORTING FEATURES

## 17. Text-Based Narrator

**Status: IMPLEMENTED for Unit 01; expansion DEFERRED**

Current route:

`#talk01`

Modes include:

-   Normal
-   Challenge
-   Help Me Say This
-   Conversation Review

The Narrator is intended to create more natural production
opportunities.

It should be used and validated before expanding to later Units.

### Help Me Say This

Help Me Say This is **support**.

Language generated through it must not be treated as independent learner
production.

Where provenance allows, Adaptive Learning should mark subsequent
relevant evidence as `support_used`.

------------------------------------------------------------------------

## 18. Notebook

**Status: IMPLEMENTED**

Notebook-related features include:

-   Glossary;
-   Error Log;
-   Bookmarks (words, chunks, paragraphs, questions);
-   Writing Portfolio (every writing task with first and revised drafts,
    word counts and status; setting a task to "Final" records the date);
-   Current Affairs Lab (a reusable structure for reading the news, with
    export);
-   Search;
-   Learning Review (see Part VI).

### Language Bank

**Status: REMOVED from visible/product flows**

Language Bank was removed from the UI and active product flows.

Backward-compatible stored data/sync handling remains where necessary to
avoid data loss.

Do not reintroduce Language Bank as a new feature without an explicit
product decision.

------------------------------------------------------------------------

## 19. Glossary

**Status: IMPLEMENTED**

Glossary stores vocabulary/chunks and learner-managed learning state.

Items such as `LEARNING` may become useful evidence for later Reviews.

Adaptive Learning must not silently add items to Glossary.

------------------------------------------------------------------------

## 20. Error Log

**Status: IMPLEMENTED**

Error Log is learner-facing bookkeeping for meaningful errors/patterns.

A maintenance pass fixed evidence lookup differences such as `u` versus
`unit`.

Adaptive Learning must not silently add entries to Error Log.

------------------------------------------------------------------------

## 21. English Profile

**Status: IMPLEMENTED with conservative evidence behavior**

Recent maintenance removed misleading precision.

Current principles include:

-   only explicit Writing feedback with CEFR evidence generates a level
    estimate;
-   level evidence is limited to appropriate Written Accuracy/Range
    dimensions;
-   no invented fallback such as 7.5;
-   A1 remains A1 rather than being artificially raised;
-   grammar does not feed Critical Reasoning;
-   an activity can count as evidence without producing a level
    estimate;
-   UI may say `Evidence recorded · no level estimate`;
-   Register Control is hidden.

Do not introduce pseudo-precision.

------------------------------------------------------------------------

## 22. Register & Tone

**Status: IMPLEMENTED**

`COMPARE REGISTERS` is an explicit learner action.

Registers include:

-   CASUAL
-   NEUTRAL
-   PROFESSIONAL
-   FORMAL
-   ACADEMIC

Registers are not a hierarchy where academic automatically means better.

The feature exists to teach contextual appropriateness.

It does not automatically rewrite/save learner work.

------------------------------------------------------------------------

## 23. Writing Support

**Status: IMPLEMENTED**

Writing Support is deterministic/local and makes **zero OpenAI calls**.

It can provide:

-   REGISTER;
-   USEFUL LANGUAGE;
-   WRITING TIPS.

### Writing Support intensity

**Status: IMPLEMENTED and deployed (2026-09-30)**

Levels: **HIGH · MEDIUM · LIGHT · OFF**. A level means only "how much
language scaffolding I want available for this task". It is not a
difficulty setting and not a judgment of ability: HIGH is not weaker,
OFF is not stronger. No level carries score, reward, badge, streak,
penalty or any mastery/CEFR effect.

-   **Default** comes from the Unit: HIGH → Units 01--02; MEDIUM →
    Units 03--05; LIGHT → Units 06--32 / Reviews.
-   **Learner override** per activity: the learner may choose any level
    for any eligible activity, in any direction; the choice is kept for
    that activity only and never becomes a global preference.
-   HIGH shows the register explanation, more frames, step-by-step tips
    and "before you write" for writing; MEDIUM keeps register, a few
    frames and one tip; LIGHT is a reminder (register, two frames, one
    check); a collapsed "need more support?" stays available at HIGH,
    MEDIUM and LIGHT. OFF shows no support; the task itself is unchanged.
-   The panel stays collapsed whatever the level; choosing a level is
    not opening it.
-   Eligibility is unchanged by the levels (no support on Timed
    Challenge, RETRIEVE, NOTICE, STEAL, EDIT or objective items).

**Provenance: selected level ≠ actual use.** The book records, per
activity, the level chosen and, separately, whether support was actually
opened (first opening only: when, at which level, and whether anything
had been written yet). Selecting a level alone is never `support_used`;
OFF is never `support_used`. No keystrokes or extra text are recorded.

The Learning Review receives these facts as context only. It may
describe habits across tasks (for example, starting independently and
opening support later) but must not treat a level as evidence of
ability, and it cannot change any level. Suggesting a level in the
future would be a proposal only: **AI proposes, learner decides.**

It may appear in relevant open KNOW/INTERPRET/THINK/WRITE/review
contexts.

It should not:

-   answer the task;
-   provide task-specific evidence;
-   produce a model paragraph;
-   solve the learner's argument.

The learner should generally attempt independently first and use support
when genuinely stuck.

Adaptive Learning must distinguish supported from independent production
whenever possible.

------------------------------------------------------------------------

## 24. Core / Optional

**Status: IMPLEMENTED as presentation metadata for all 32 Units**

Core/Optional was added to reduce the feeling that every one of \~75--83
activities must be completed.

Nothing was removed or blocked.

Core per Unit: READ; three INTERPRET items (main idea plus the two
closest to the THINK focus); the principal NOTICE focus; four STEAL
frames; one THINK; the Main WRITE; EDIT; RETRIEVE r1, r2 and r7. KNOW
and all unmarked activities are extra practice.

Core is the pedagogical spine.

Optional remains available as additional practice.

The current implementation is presentation-oriented and does not
automatically redefine all progress/completion semantics.

### Future question

**Status: PLANNED / unresolved**

Audit whether visual completion/progress should eventually be Core-based
while Optional behaves like a practice library.

Do not change this silently.

------------------------------------------------------------------------

## 24a. On-demand AI help and feedback tools

**Status: IMPLEMENTED**

Every AI action is started by the learner. None rewrites or saves learner
work automatically. Each has its own model, reasoning setting and hourly
rate limit (see §51).

-   **Writing feedback** --- structured feedback on open writing, saved
    in the Writing Portfolio; suggestions can be sent to the Error Log.
    Main Write tasks use the Sol path (Part X).
-   **Outline feedback** --- feedback on a plan before drafting.
-   **Light language feedback** --- brief language feedback on short open
    answers (including the "why" of True/False items), with an optional
    Error Log candidate.
-   **Interpret feedback** --- feedback on open INTERPRET answers (§8).
-   **Explain this question** --- clarifies what a question is asking,
    without answering it.
-   **Explain selection** --- select text to get an explanation, save it
    to the Glossary, or compare registers (§22).
-   **Listening feedback** --- feedback on open listening answers.
-   **Speaking feedback** --- transcript-based feedback (§16).
-   **Teacher Lens** (Module Reviews only, optional) --- explains one
    point; secondary to the learner's own study.

------------------------------------------------------------------------

## 24b. Timed Essay

**Status: IMPLEMENTED (Module Reviews)**

The Module Review synthesis includes a timed essay: the learner starts
the clock, writes against a countdown and submits; feedback becomes
available only after submission. An attempt can be discarded (with
confirmation) and restarted.

------------------------------------------------------------------------

## 24c. Reading and study tools

**Status: IMPLEMENTED**

-   Focus mode, adjustable font size and column width;
-   "reveal what you missed" and "compare with one edited version" on
    Reviews;
-   per-Unit Markdown export (copy or download) of the learner's work;
-   copy writing, reset Unit (with confirmation);
-   JSON backup and restore;
-   installable web app (PWA manifest and icons).

------------------------------------------------------------------------

## 24d. Demo Mode

**Status: IMPLEMENTED**

Demo accounts (`isDemo` on the user, the only source of truth) are
read-only: no saving, sync, backup/restore, recording, transcription,
AI feedback or Learning Review. Demo users are never included in the
nightly Learning Review.

------------------------------------------------------------------------

# PART IV --- RECENT STABLE BASELINE

## 25. Maintenance baseline before Adaptive Learning

**Status: IMPLEMENTED and deployed**

A major maintenance pass completed before Adaptive Learning work began.

It included:

-   Timed Essay ID collision fix and safe legacy handling;
-   visible/product removal of Language Bank;
-   Profile corrections;
-   Interpret corrections;
-   Whisper rate limiting;
-   Error Log evidence fix;
-   Core/Optional metadata;
-   manually selected Core THINK activities;
-   CSS corrections;
-   account/sync copy corrections;
-   E2E protections against real providers.

Pre-deploy validation included:

-   376/376 tests passing;
-   typecheck passing;
-   build passing;
-   maintenance E2E 38/38;
-   desktop and mobile checks;
-   zero real OpenAI;
-   zero real Whisper.

The maintenance release was deployed and verified successfully before
Adaptive Learning development began.

------------------------------------------------------------------------

# PART V --- ADAPTIVE LEARNING

## 26. Adaptive Learning purpose

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Adaptive Learning is approved.

It is not:

-   a recommendation feed;
-   an automatic curriculum editor;
-   a learner scoring engine;
-   a psychological model;
-   an infinite remediation generator.

It is an evidence-based longitudinal layer that helps the study book
observe learning.

High-level flow:

**STUDY**\
↓\
**QUALIFIED EVIDENCE**\
↓\
**LEARNING REVIEW**\
↓\
**LONGITUDINAL LEARNING STATE**\
↓\
**PROPOSED ADAPTATIONS**\
↓\
**HUMAN REVIEW**\
↓\
**possible manual curriculum change**

Core rule:

> **AI PROPOSES. HUMAN DECIDES.**

The AI has no authority to modify a Unit automatically.

------------------------------------------------------------------------

## 27. Factual Learning Ledger vs Pedagogical Hypotheses

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

The system must keep two conceptual layers separate.

### A. Factual Learning Ledger

Observable information such as:

-   evidence ID;
-   Unit;
-   activity;
-   modality;
-   timestamp;
-   original learner production;
-   objective check;
-   support usage;
-   revision state;
-   retrieval;
-   opportunity where reliably known;
-   positive evidence;
-   negative evidence;
-   provenance.

### B. Pedagogical Hypotheses

Interpretations such as:

-   strength;
-   emerging;
-   recurring difficulty/pattern;
-   improving;
-   apparently resolved;
-   recognition → production;
-   confidence;
-   conflicting evidence;
-   rationale;
-   human judgment.

AI prose is not the source of truth for factual history.

Avoid summary-of-summary drift.

The state should remain auditable/reconstructible from evidence
references whenever practical.

------------------------------------------------------------------------

## 28. Evidence provenance and quality

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Evidence should distinguish, when available:

-   `independent`
-   `support_used`
-   `after_feedback`
-   `revision`
-   `retrieval`
-   `objective_check`
-   `original_learner_production`
-   `ai_generated_assessment`
-   `transcript`
-   `record/noticing`

These are not pedagogically equivalent.

Examples:

-   a correct Draft 2 after feedback is not equivalent to a correct
    Draft 1;
-   a response produced after Writing Support is not equivalent to
    independent production;
-   Draft 1 → feedback → Draft 2 is valuable evidence of revision
    ability.

AI-generated feedback must remain secondary evidence, not be recycled as
unquestioned learner truth.

------------------------------------------------------------------------

## 29. Opportunities

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Raw error count is not enough.

The system should represent genuine **opportunities** to demonstrate a
target when those opportunities can be determined reliably.

Example:

-   3 problems in 3 genuine opportunities;
-   3 problems in 40 opportunities with 37 appropriate uses.

These support very different interpretations.

Likewise, absence of a structure does not prove inability if the task
did not naturally invite its use.

Desired reasoning frame:

**opportunity → learner evidence → counter-evidence → interpretation**

When opportunity cannot be established reliably:

`UNKNOWN / INSUFFICIENT DATA`

Never invent a denominator.

------------------------------------------------------------------------

## 30. Positive and counter-evidence

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

The learner model must not become a catalogue of defects.

It should preserve evidence of:

-   appropriate use;
-   strengths;
-   improvement;
-   successful revision;
-   transfer;
-   delayed retrieval;
-   stable independent performance.

Counter-evidence should prevent false recurring patterns.

------------------------------------------------------------------------

## 31. Pattern thresholds

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

A simple rule such as `N occurrences = recurring` is insufficient.

Where available, pattern logic should consider:

-   occurrence count;
-   opportunity count;
-   positive/counter-evidence;
-   number of activities;
-   session diversity;
-   modality diversity;
-   independent vs supported production;
-   before/after feedback;
-   first seen;
-   last seen.

One occurrence must not automatically become a consolidated difficulty.

Deterministic code should own counts, boundaries and enforceable guards.

The model interprets language and pedagogical meaning; it should not
invent counts/status.

Confidence should be qualitative:

-   LOW
-   MODERATE
-   HIGH

Avoid pseudo-precise mastery scores.

------------------------------------------------------------------------

## 32. Recognition → Production

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Recognition → Production is evidence framing, not a mastery meter.

Possible evidence stages include:

-   noticed;
-   recognized;
-   cued production;
-   supported production;
-   independent production;
-   spontaneous transfer;
-   delayed retrieval.

Do not assume a strictly linear progression.

Absence of a later stage is not automatically failure.

A recognition → production gap requires genuine production opportunity,
not mere absence of a form.

------------------------------------------------------------------------

# PART VI --- LEARNING REVIEW

## 33. Learning Review

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Learning Review asks:

> **What can the available evidence actually support about the learner's
> recent learning?**

Potential sections:

-   WHAT YOU WORKED ON
-   GETTING STRONGER
-   EMERGING
-   RECURRING PATTERNS
-   IMPROVING / RESOLVING
-   RECOGNITION → PRODUCTION
-   NOT ENOUGH EVIDENCE YET
-   NEXT SESSION
-   PROPOSED ADAPTATIONS

Sections may be empty.

Never fabricate observations to fill the interface.

Valid conclusions include:

-   `Not enough evidence yet.`
-   `Opportunity could not be determined.`
-   `Evidence is mixed.`
-   `No curriculum adaptation is justified by the current evidence.`

Abstention is a feature, not a failure.

------------------------------------------------------------------------

## 34. Incremental analysis

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Learning Review should process:

**NEW EVIDENCE SINCE LAST SUCCESSFUL REVIEW**

plus

**a small structured accumulated learning state**

It should not repeatedly resend:

-   the entire learner history;
-   entire Units;
-   every old response;
-   long text where a structured evidence item/snippet is sufficient.

Avoid recursive AI summaries becoming the learner model.

------------------------------------------------------------------------

## 35. Next Session

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

A Learning Review may produce at most 2--3 small, actionable priorities.

Avoid vague recommendations such as:

-   improve grammar;
-   expand vocabulary;
-   practice writing.

Each priority must be evidence-based.

The report should not become a list of defects.

------------------------------------------------------------------------

## 36. Human judgment

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

The learner should be able to respond to AI interpretations with:

-   AGREE
-   DISAGREE
-   NOT SURE

This is judgment about the interpretation, not modification of original
evidence.

A rejected AI hypothesis must not silently propagate as established fact
in future reviews.

Human agreement also does not transform a hypothesis into primary
evidence.

The interface should preserve:

**FACT / EVIDENCE**\
**AI INTERPRETATION**\
**HUMAN JUDGMENT**\
**PROPOSAL**

Persistence (IMPLEMENTED, not yet deployed): judgments are stored on the
server (with the time they were made) and shown on every device, in the
page and in the PDF, Markdown and JSON exports. Choosing the same
judgment again clears it on the server too. A judgment never changes
evidence or the stored report. A disagreement applies to the hypothesis
as it stood when judged: without new supporting evidence it stays
rejected and its proposals are suppressed; new evidence after it may
start a **new** hypothesis built only from that evidence, judged afresh,
while the rejected version stays in the pattern's history.

------------------------------------------------------------------------

# PART VII --- STUDY TIMER AND AUTOMATIC REVIEW

## 37. Study Timer

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

The learner explicitly starts and stops a study session.

Desired behavior:

-   manual Start;
-   manual Stop/Pause as appropriate;
-   visible elapsed time;
-   user-scoped;
-   persisted;
-   survives refresh;
-   survives closing/reopening the app;
-   does not depend on a continuously open tab;
-   prevents simultaneous sessions;
-   stores real session duration and timestamps;
-   includes conservative protection against a forgotten timer.

A forgotten timer must not silently record an absurd study duration.

Current behavior: a Study Timer widget in the desktop sidebar (between
the account box and Progress) and in the mobile top bar shows minutes
studied today and the running session; sessions are stored in the synced
`study-timer` document (merged by session id across devices, never
dropped).

There is **no maximum session length**: a confirmed long session counts
in full. Protection is against abandonment only, based on the last
reliable moment:

-   while the app runs with the timer on, a heartbeat records it as
    alive; if the app stops running for a long gap (closed, device
    asleep), the session ends at the last heartbeat and the learner is
    told what was not counted;
-   after a long unconfirmed stretch the learner is asked "Still
    studying?"; confirming (or pausing) keeps every minute, and an
    unanswered question ends the session where it was asked.

Nothing is inferred from mouse, keyboard or scroll activity.

"X min today" is presentation only. Learning Review eligibility uses
study time recorded since the last **successful** review (§38), across
days.

Study time is **not evidence of mastery**.

It is context and an eligibility signal for automatic Learning Review.

------------------------------------------------------------------------

## 38. Nightly Learning Review

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Automatic Learning Review remains part of the approved design.

Desired eligibility:

**NEW USABLE EVIDENCE**

and

**at least 60 accumulated minutes of Study Sessions since the last
successful Learning Review**

The 60 minutes may accumulate across days.

Example:

-   Monday: 20 min
-   Tuesday: 25 min
-   Wednesday: 20 min
-   total: 65 min

The next nightly window may run the review.

If there is no usable evidence:

**zero AI call**

even if 60 minutes have accumulated.

A successful review advances the relevant evidence/study boundary.

A failed review must not consume the boundary.

The 60-minute threshold is an eligibility signal, not a claim about
learning quality.

Current operational gates:

-   the nightly job runs from the server crontab (04:30), not inside the
    web process;
-   it does nothing unless `LEARNING_REVIEW_NIGHTLY=true` and the
    Learning Review model is configured;
-   it only includes learners whose **first** review was started by hand
    via Run Review Now, and never demo accounts.

------------------------------------------------------------------------

## 39. Run Review Now

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

A manual `Run review now` action uses the **same pipeline** as nightly
execution.

It is not a simplified test pipeline.

It may run before 60 minutes have accumulated, but should be
conservative about limited evidence.

If there is no new evidence:

**zero AI call**

and show a clear message such as:

`Nothing new to review yet.`

The previous successful report must remain available if a new run fails.

Current behavior: the 60-minute study threshold applies to nightly runs
only. The Learning Review needs its own model configured on the server
(intended: GPT-5.4 Nano), independent of the Main Write model; without
it the page states that it is not configured and nothing is analysed. Manual runs that reach the AI are rate-limited (default 4 per
hour); a click with nothing new never counts. Evidence per run is capped
(default 60 items); the rest is deferred to the next run, never dropped.

------------------------------------------------------------------------

## 40. Idempotency and concurrency

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Manual and nightly runs may overlap.

The same evidence boundary must not be analyzed twice concurrently.

The pipeline should be:

-   idempotent;
-   concurrency-safe;
-   restart-safe.

Runs should record appropriate metadata such as:

-   from/to boundary;
-   evidence boundary/IDs;
-   status;
-   startedAt;
-   completedAt;
-   model/config metadata;
-   prompt/schema version.

Failures must not destroy the prior successful report.

Logs must not contain learner content.

------------------------------------------------------------------------

# PART VIII --- PROPOSED ADAPTATIONS

## 41. Proposed Next-Unit Adaptations

**Status: IMPLEMENTED as proposals only (codebase; production rollout: see §70)**

Adaptive Learning may propose an adaptation for a future/unstarted Unit.

It must not apply it.

A proposal should identify:

-   target Unit;
-   target activity;
-   current objective;
-   supporting evidence;
-   proposed pedagogical change;
-   rationale;
-   workload impact;
-   constraints;
-   risks.

Default preference:

**REUSE / REPRIORITIZE / REPLACE / ADAPT \> ADD**

Do not automatically respond to difficulty by increasing workload.

It is valid and expected for many reviews to propose no curriculum
change.

------------------------------------------------------------------------

## 42. Workload budget

**Status: design principle**

Activity count alone is not workload.

A long essay and four tiny objective items are not equivalent.

Adaptation logic should consider approximate cognitive/time burden where
the architecture can do so reliably.

Do not add remediation piles.

------------------------------------------------------------------------

## 43. Core/Optional as a future adaptation

**Status: PLANNED**

A future proposal may suggest changing which existing activity is Core
rather than generating new content.

This can be a low-cost adaptation.

It remains a **proposal only**.

Adaptive Learning must never silently change Core/Optional assignments.

------------------------------------------------------------------------

# PART IX --- ADAPTIVE MODULE REVIEW

## 44. Current Module Reviews

**Status: IMPLEMENTED as static/fallback Reviews**

Current Review structure includes:

1.  Retrieve from Memory
2.  Language Check
3.  Vocabulary Steal
4.  Personal Glossary
5.  Error Log
6.  Transfer Reading
7.  Reasoning Lab
8.  Editing Lab
9.  Synthesis Writing
10. Self-Assessment

Current Reviews are primarily fixed, with limited learner-specific use
such as Glossary/Error Log.

They remain the fallback until adaptive Reviews are validated.

------------------------------------------------------------------------

## 45. Adaptive Module Review direction

**Status: PLANNED / audit in progress**

Future principle:

**STRUCTURE = STABLE**\
**SOME CONTENT = ADAPTIVE**\
**SOME CONTENT = BLIND**

The Review must reflect what was actually studied without becoming an
assessment made entirely from known weaknesses.

Potentially more adaptive:

-   Retrieve from Memory;
-   Personal Glossary;
-   Error Log;
-   part of Language Check.

Areas that should preserve strong independent/blind assessment:

-   Transfer Reading;
-   Reasoning Lab;
-   Editing Lab;
-   Synthesis Writing;
-   Timed/independent assessment.

Preserve:

-   novelty;
-   transfer;
-   comparability;
-   difficulty;
-   independent assessment.

Adaptive Review generation must not leak previous answers.

Audio assets may remain pre-produced/fixed or selected from an
appropriate bank.

Do not destroy the current Reviews while developing this system.

------------------------------------------------------------------------

# PART X --- MAIN WRITE AND GPT-5.6 SOL

## 46. Main Write model routing

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

The Main Text is important enough to justify a stronger model.

Approved model:

**GPT-5.6 Sol**

This routing is intentionally narrow.

Do not use Sol for:

-   evidence counting;
-   trivial extraction;
-   deterministic classification;
-   timer logic;
-   boundary logic;
-   routine low-value operations.

Use a separate configuration, conceptually:

`AI_MAIN_WRITE_MODEL=gpt-5.6-sol`

The existing cheaper/free model routing remains appropriate elsewhere
unless separately changed.

------------------------------------------------------------------------

## 47. Main Write feedback goals

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Main Write feedback should examine at least:

-   Task Achievement
-   Argument Development
-   Organization / Coherence
-   Clarity
-   Grammatical Accuracy
-   Grammatical Range
-   Lexical Precision
-   Lexical Range
-   Collocation / Naturalness
-   Register
-   Hedging / Stance
-   Cohesion
-   Pragmatics
-   Unnecessary Repetition
-   Strengths

Feedback must distinguish:

### ERROR

A genuine language error.

### AWKWARD / LESS NATURAL

Understandable and possibly grammatical language that is less natural or
less idiomatic in context.

### REGISTER MISMATCH

Language that may be correct/natural but is inappropriate for the task's
register.

### STYLE CHOICE

A valid choice that does not require correction merely because another
formulation exists.

### STRONG / EFFECTIVE LANGUAGE

Language/argumentation that works particularly well and should be
preserved or reused.

The model must not behave like a defect detector.

Positive evidence matters.

------------------------------------------------------------------------

## 48. Main Write must not generate Draft 2

**Status: approved constraint**

GPT-5.6 Sol must not provide a full rewritten essay or replacement
paragraph that does the revision for the learner.

It may:

-   cite a learner excerpt;
-   identify the issue;
-   classify it;
-   explain its effect;
-   suggest a revision strategy;
-   ask a useful question;
-   provide a very short micro-example when genuinely necessary,
    preferably in a different context.

It must not produce:

`Here is an improved version of your essay...`

The intended flow is:

**DRAFT 1 → SOL FEEDBACK → LEARNER WRITES DRAFT 2**

------------------------------------------------------------------------

## 49. Main Write evidence

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

The system should preserve enough provenance to distinguish:

-   original Draft 1;
-   whether Writing Support was used before submission;
-   Sol feedback;
-   Draft 2;
-   later feedback if any.

Do not overwrite Draft 1.

Do not overwrite the original Sol analysis.

Future Draft 2 analysis should be separately versioned.

Current behavior (IMPLEMENTED, not yet deployed): see the snapshot
semantics in §13. Each analysis records what really happened; an older
analysis that did not record something (text, model, prompt version,
support) shows it as not recorded, never inferred from today's
configuration or the current draft. Writing Support facts follow §23:
`supportUsed` is true only if the panel was actually opened;
`supportOpenedBeforeWriting` says whether anything had been written
first; unknown stays unknown.

**Expected register** comes from the task's own metadata (its kind):
personal or reflective tasks expect a natural personal voice; analytical
and argumentative tasks an appropriately formal, calibrated one; a task
whose kind says nothing uses a neutral default. The feedback is told that
formality is not quality.

**Quota:** Main Write feedback has its own hourly per-learner limit
(default 6), separate from all other feedback (default 12); requests
rejected as invalid do not count. The server alone decides whether a
task is a Main Write.

------------------------------------------------------------------------

# PART XI --- AI MODEL STRATEGY

## 50. Deterministic code

Use deterministic code whenever possible for:

-   counts;
-   boundaries;
-   evidence IDs;
-   timestamps;
-   dedupe;
-   idempotency;
-   opportunity data when reliably inferable;
-   provenance;
-   support flags;
-   before/after relationships;
-   enforceable pattern guards.

Do not pay a model to do bookkeeping that code can do reliably.

------------------------------------------------------------------------

## 51. GPT-5.4 Nano

**Status: current/default for appropriate tasks**

Nano remains appropriate for frequent structured work where it is
sufficient, including the initial Learning Review design.

Routing is configured **per AI function** (explain, writing, main write,
speaking feedback, listening, outline, teacher lens, light language,
interpret item, explain question, character chat, conversation help,
conversation review, register compare, Learning Review), each with its
own optional reasoning-effort setting. There is no global fallback: an
empty model disables only that function. Whisper handles transcription.

The architecture should allow the Learning Review model to be changed
independently later.

Do not add an automatic expensive fallback.

------------------------------------------------------------------------

## 52. GPT-5.6 Sol

**Status: approved for Main Write**

Sol is reserved for the Main Write feedback path because that is a
high-value, low-frequency judgment task.

The stronger model should be spent where nuanced pedagogical judgment
matters most.

------------------------------------------------------------------------

## 53. Future model benchmark

**Status: PLANNED**

After a real Main Text exists, the same evidence bundle may deliberately
be tested with:

-   Nano;
-   Luna;
-   Sol.

The comparison should use the same:

-   learner text;
-   task;
-   rubric;
-   prompt;
-   structured schema.

This benchmark must not run automatically.

Do not create benchmark UI now.

Do not spend real tokens on benchmark calls during development.

The goal is to choose based on actual pedagogical quality, not model
branding.

------------------------------------------------------------------------

# PART XII --- EXPORTS AND AUDITABILITY

## 54. Learning Review PDF

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Learning Review should be exportable on demand as a self-contained PDF
for external human/AI review.

It should include, as appropriate:

-   analysis period;
-   relevant Study Sessions;
-   activities considered;
-   evidence quantity/types;
-   strengths/progress;
-   patterns;
-   confidence;
-   opportunities when known;
-   counter-evidence;
-   necessary evidence snippets;
-   uncertainty;
-   Next Session priorities;
-   adaptation proposals;
-   target Unit/activity;
-   current objective;
-   constraints;
-   warnings.

It must clearly distinguish:

-   FACT / EVIDENCE
-   AI INTERPRETATION
-   HUMAN JUDGMENT
-   PROPOSAL

Do not include:

-   chain-of-thought;
-   secrets;
-   API keys;
-   irrelevant technical details.

PDF is generated **on demand**, not automatically every night.

**Visual design (IMPLEMENTED, not yet deployed):** the Learning Review
and Main Write feedback PDFs follow the approved visual models kept in
`modelo pdf/` (layout only; every word of content comes from the
persisted analysis). They are rendered by a headless Chromium with the
book's own fonts embedded; with no Chromium available, the export falls
back to a plain PDF instead of failing.

------------------------------------------------------------------------

## 55. Learning Review audit export

**Status: IMPLEMENTED (Markdown and JSON; codebase; production rollout: see §70)**

A structured Markdown and/or JSON export is desirable for auditability
and sharing with another AI.

It may contain:

-   evidence references;
-   observations;
-   interpretations;
-   confidence;
-   opportunities;
-   counter-evidence;
-   human judgment;
-   proposals;
-   model metadata;
-   prompt version;
-   schema version.

The factual ledger remains authoritative.

------------------------------------------------------------------------

## 56. Main Write feedback export

**Status: IMPLEMENTED (codebase; production rollout: see §70)**

Sol feedback must be exportable so it can be audited externally.

Preferred formats:

-   PDF as the primary human-readable artifact;
-   Markdown as a portable/auditable artifact.

The export must be self-contained and include:

1.  Unit;
2.  activity;
3.  activity objective;
4.  original task prompt;
5.  complete Draft 1;
6.  whether Writing Support was used before submission, if known;
7.  date/time;
8.  model;
9.  feedback prompt/schema version;
10. complete persisted feedback.

Specific observations should preserve, when available:

-   learner excerpt;
-   classification;
-   explanation;
-   impact;
-   revision strategy.

Classification vocabulary:

-   ERROR
-   AWKWARD / LESS NATURAL
-   REGISTER MISMATCH
-   STYLE CHOICE
-   STRONG / EFFECTIVE LANGUAGE

Export must **not** trigger a new AI call.

PDF and Markdown must serialize the same saved analysis.

Do not include:

-   chain-of-thought;
-   secrets;
-   API keys;
-   unrelated learner data;
-   unrelated activities;
-   internal technical logs.

The complete Draft 1 is appropriate in this explicitly requested learner
export because external review requires the original text.

------------------------------------------------------------------------

## 57. Future Writing Case Study

**Status: DEFERRED**

Preserve architecture so a future export could show:

**Draft 1 → Sol feedback → Draft 2 → changes → successful revisions →
unresolved issues → later transfer/retrieval**

Do not build this merely because the data model can support it.

------------------------------------------------------------------------

# PART XIII --- PRIVACY AND DATA MINIMIZATION

## 58. Data minimization

**Status: required constraint**

Adaptive Learning may process personal writing.

Send only the evidence necessary for the task.

Do not send:

-   entire Units when activity metadata is enough;
-   entire history on every review;
-   full long responses when a trustworthy structured item/snippet is
    enough.

Exception:

Main Write feedback necessarily receives the Main Text being evaluated.

Learner-requested exports may contain the learner's full Draft because
the export exists specifically for external review.

------------------------------------------------------------------------

## 59. Logs

Technical logs must not contain:

-   learner answers;
-   drafts;
-   transcripts;
-   evidence snippets;
-   report content.

Logs should contain metadata only.

------------------------------------------------------------------------

# PART XIV --- VALIDATION AND FIRST REAL USE

## 60. Development provider policy

**Status: required**

During development/testing of Adaptive Learning and Main Write model
routing:

-   ZERO real OpenAI calls;
-   ZERO real Whisper calls;
-   use fake providers/test data;
-   do not consume real Unit 01 evidence;
-   do not advance the real learner evidence boundary;
-   do not create a fake successful review on the real learner.

------------------------------------------------------------------------

## 61. First real Adaptive Learning test

**Status: PLANNED after safe deployment**

The first real Learning Review should be deliberately initiated by the
learner after implementation is validated and deployed.

Expected flow:

**real study evidence → Run Review Now → real Learning Review → export
PDF/Markdown → external audit**

The first review is a validation event, not just another feature demo.

------------------------------------------------------------------------

## 62. How to judge Adaptive Learning quality

Do not judge the system merely by whether the report sounds intelligent.

Ask:

1.  Did it accurately describe what happened?
2.  Did it separate observation from interpretation?
3.  Did it consider positive evidence?
4.  Did it consider genuine opportunities?
5.  Did it avoid turning one error into a recurring difficulty?
6.  Did it recognize improvement when supported?
7.  Did it abstain when evidence was insufficient?
8.  Did it distinguish supported from independent production?
9.  Did it avoid treating prior AI feedback as primary truth?
10. Did Next Session priorities change a useful study decision?
11. Did proposed adaptations preserve the original Unit objective?
12. Was "no adaptation justified" sometimes the correct conclusion?

------------------------------------------------------------------------

# PART XV --- PRODUCT GUARDRAILS

## 63. What the Mind must not become

The identity is:

> **Read. Think. Write.**

Do not let the experience become:

> **Track. Analyze. Optimize.**

Adaptive Learning should remain behind the study experience.

The learner should primarily feel that they are:

-   reading;
-   thinking;
-   writing;
-   listening;
-   speaking;
-   revising;
-   remembering.

Not feeding an analytics system.

------------------------------------------------------------------------

## 64. Explicitly unwanted directions

Do not introduce without a new explicit product decision:

-   XP;
-   streaks;
-   leaderboards;
-   gamification;
-   mastery percentages;
-   pseudo-precise CEFR bars;
-   analytics dashboards;
-   recommendation feeds;
-   automatic curriculum mutation;
-   `Apply All`;
-   endless auto-remediation;
-   infinite AI-generated exercises;
-   psychological learner modeling;
-   personality inference;
-   motivation inference;
-   dynamic audio generation as a current priority.

------------------------------------------------------------------------

## 65. Workload principle

When a difficulty is detected, prefer:

**REUSE → REPRIORITIZE → ADAPT → REPLACE**

before:

**ADD**

The system must consider cognitive/time burden, not only number of
activities.

More practice is not automatically better practice.

------------------------------------------------------------------------

## 66. Learner agency

If there is tension between:

**more automation**\
and\
**learner agency**

preserve learner agency.

If there is tension between:

**more personalization**\
and\
**independent assessment**

preserve a meaningful blind assessment component.

If there is tension between:

**more features**\
and\
**actual study**

prefer actual study.

------------------------------------------------------------------------

# PART XVI --- TECHNICAL / OPERATIONAL CONTEXT

## 67. Production context

**Status: current known context; verify before operational changes**

Production domain:

`mind.balbonilab.com`

Application path:

`/var/www/amind`

PM2 process:

`amind-api`

Port:

`3420`

The application includes:

-   authentication;
-   PostgreSQL;
-   local-first state;
-   sync;
-   revision/CAS behavior;
-   SSE;
-   conflict handling;
-   JSON backup/restore.

Do not infer additional operational details without inspecting the
current project/infrastructure.

------------------------------------------------------------------------

## 68. Other projects on the host

The VPS is shared with other projects.

Mind changes must not casually:

-   restart unrelated PM2 processes;
-   alter unrelated databases;
-   alter unrelated `.env` files;
-   delete unrelated files;
-   modify unrelated applications;
-   change global infrastructure unnecessarily.

Relevant separate projects include:

-   Deutsch im Kopf;
-   KLANG;
-   other services on the host.

Treat them as out of scope.

------------------------------------------------------------------------

## 69. Deployment rule for active development rounds

Do not deploy automatically.

Do not run production migrations without explicit authorization.

Do not perform real-provider tests without explicit authorization.

A coding task ending in `READY TO DEPLOY` is not itself authorization to
deploy.

------------------------------------------------------------------------

# PART XVII --- CURRENT DEVELOPMENT STATUS

## 70. Adaptive Learning implementation state

**Status: IMPLEMENTED and deployed to production (2026-09-30)**

The Adaptive Learning round is implemented in the codebase:

-   evidence extractor with provenance, opportunities and
    positive/counter-evidence;
-   factual ledger kept separate from AI hypotheses (deterministic merge
    and guards);
-   incremental pipeline with DB lease, run records and safe failure;
-   Learning Review schema, prompt, UI (`#learning`) and API;
-   human Agree / Disagree / Not sure, with rejected hypotheses
    suppressed;
-   next-Unit adaptation proposals (proposal only);
-   Study Timer and 60-minute accumulated eligibility for nightly runs;
-   nightly CLI (crontab, opt-in by environment flag);
-   Learning Review PDF, Markdown and JSON exports;
-   GPT-5.6 Sol routing, richer taxonomy and PDF/Markdown export for
    Main Write feedback;
-   Draft 1 → feedback → Draft 2 preservation;
-   Prisma migration `learning_review` and tests.

Production state (verified on the server at deploy):

-   the code and the `learning_review` migration are live;
-   the Learning Review has its own model configured (GPT-5.4 Nano),
    independent of Main Write;
-   the nightly job is **off** (`LEARNING_REVIEW_NIGHTLY=false`, no
    crontab entry);
-   no Learning Review has run yet: the first real review is reserved
    for the learner (§61).

Main Write's model is not set explicitly on the server (the code default
applies); verify before describing Sol feedback as validated in use. The adaptive/blind
Module Review split remains PLANNED (§45).

------------------------------------------------------------------------

# PART XVIII --- FEATURE STATUS SNAPSHOT

## 71. IMPLEMENTED

At a high level:

-   Units 01--32 fully authored, contract-tested, and integrated;
-   Module Reviews 1--7 with all review stages (Retrieval, Language Check, Steal, Transfer Reading, Reasoning Lab, Editing Lab, Synthesis Essay, Timed Essay, Teach It, Listening, Speaking);
-   Pronunciation in Context entries for all 32 Units;
-   Audio Recording & Production Guide (`MIND_AUDIO_RECORDING_GUIDE.md`);
-   Core / Optional activity mapping for all 32 Units;
-   KNOW / READ / INTERPRET / NOTICE / STEAL / THINK / WRITE / EDIT /
    RETRIEVE complete stage flows across all 32 units;
-   speaking recording/transcription flow;
-   recorded audio for Units 01--10 and Module Reviews 1--2 (24 files);
-   Unit 01 Narrator;
-   Glossary;
-   Error Log;
-   Personal Retrieval (spaced, deterministic);
-   Notebook tools (Bookmarks, Writing Portfolio, Current Affairs Lab,
    Search);
-   on-demand AI tools (writing, outline, light, interpret, listening
    and speaking feedback; explain question/selection; Teacher Lens);
-   Timed Essay in Module Reviews;
-   reading tools, Markdown export, JSON backup/restore, PWA;
-   Demo Mode (read-only, no AI);
-   conservative English Profile behavior;
-   Compare Registers;
-   deterministic Writing Support;
-   local-first/sync/account infrastructure;
-   Study Timer with manual Start / Stop, user-scoped persistence and refresh survival;
-   Nightly Learning Review with 60-minute active study eligibility check + new usable evidence gate;
-   Run Review Now manual action with shared pipeline and safe fallback;
-   Factual Evidence Ledger with opportunity tracking, counter-evidence and provenance categories;
-   Longitudinal Learning Review & Learning State;
-   Human Judgment (Agree / Disagree / Not sure) with automatic proposal suppression on rejection;
-   Proposed Next-Unit Adaptations specification without automated curriculum mutation;
-   GPT-5.6 Sol model routing strictly reserved for authenticated Main Write production;
-   Main Write feedback taxonomy with anti-ghostwriting guarantees (no Draft 2 rewriting);
-   Draft 1 → Feedback → Draft 2 preservation without destructive overwriting;
-   Self-contained exports in PDF, Markdown and JSON for both Main Write Feedback and Learning Review;
-   Idempotency, lease safety and concurrency protections;
-   stable pre-Adaptive maintenance release.

Adaptive Learning items above are implemented in the codebase; see §70
for production status.

------------------------------------------------------------------------

## 72. IN DEVELOPMENT

-   (none in active development; see §73 for what comes next)

------------------------------------------------------------------------

## 73. PLANNED

-   audio recording for Units 11--32 and Module Reviews 3--7 via
    ElevenLabs using `MIND_AUDIO_RECORDING_GUIDE.md`;
-   validation of the first real Learning Review by the learner after deployment;
-   deliberate Nano/Luna/Sol Main Write benchmark if useful;
-   possible future change of Learning Review model if evidence shows
    Nano is insufficient;
-   Adaptive Module Review (Phase 2) with stable structure + adaptive
    consolidation + blind assessment;
-   possible Core/Optional reprioritization proposals;
-   possible future Core-based progress semantics after explicit
    decision;
-   future Writing Case Study export.

------------------------------------------------------------------------

## 74. DEFERRED

-   Narrator expansion beyond current validated use;
-   full Adaptive Module Review until the learner model is validated;
-   Writing Case Study;
-   unnecessary automation/features that do not improve real study.

------------------------------------------------------------------------

# PART XIX --- DECISION PRIORITY

## 75. Decision hierarchy

When implementation choices conflict, use this order:

1.  **Pedagogical validity**
2.  **Learner agency**
3.  **Integrity of independent evidence**
4.  **Actual usefulness during study**
5.  **Auditability**
6.  **Privacy/data minimization**
7.  **Technical robustness**
8.  **Automation convenience**
9.  **Visual sophistication**

Do not sacrifice the first items to make the product appear more
"AI-powered."

------------------------------------------------------------------------

# PART XX --- NORTH STAR

## 76. Final product principle

A Mind in English began as a personal study book.

It is evolving into:

> **a study book that can observe how the learner learns, preserve the
> difference between evidence and interpretation, and adapt the path
> without taking control of the curriculum.**

The authority chain is:

**MY WORK**\
↓\
**EVIDENCE**\
↓\
**SYSTEM OBSERVATION**\
↓\
**AI INTERPRETATION**\
↓\
**HUMAN JUDGMENT**\
↓\
**POSSIBLE ADAPTATION**

Never:

**AI DECIDES → CURRICULUM CHANGES**

And the learner-facing heart of the product remains:

> **Read. Think. Write.**

## Visual system · MIND (2026-09-30, local, not deployed)

-   Brand: the visible wordmark, cover lockup, seal monogram, arch caption, sidebar footer, letter signature and Markdown export header say MIND (was KLANG). Technical names stay: `window.KLANG*` globals, `klang.mind.*` storage keys, `klang.gate.msg`, `klang_session` cookie, `klang-private-recordings-v1` IndexedDB — renaming them would orphan saved data or sessions.
-   Palette: pink editorial. Semantic tokens in `public/styles.css :root` (`--bg`, `--bg-subtle`, `--surface*`, `--text*`, `--accent*`, `--border*`, `--interactive*`, `--success/warning/error/info/neutral`); legacy names (`--esp`, `--creme`, `--rosa`, `--ink`…) map onto them. Former dark contexts re-point their on-dark tokens to espresso ink in one scoped rule. Espresso is ink, lines, small marks and the primary CTA only.
-   Sidebar = table of contents: continue CTA, search, MODULES, NOTEBOOK; account + sync, Study Timer and progress in one strip docked at the sidebar foot (order ACCOUNT → TIMER → PROGRESS kept).
-   Learning Review page groups the same persisted report as: At a glance · What's working · Patterns · Since last review · Next session · Proposals · Uncertainties · Evidence (evidence behind `details`). FACT / AI INTERPRETATION / YOUR JUDGMENT / PROPOSAL tags kept. PDFs unchanged.
-   Edit labels: "Draft 1 — as analysed" and "Draft 2 — your revision". Portfolio/feedback chips say "Feedback" (not "AI feedback").
-   No behaviour change: no scoring, pedagogy, sync, auth, prompts, timer logic or curriculum touched.
