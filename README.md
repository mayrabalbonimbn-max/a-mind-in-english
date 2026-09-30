# A Mind in English

> **Read. Think. Write.**

**A Mind in English** is a personal English-learning platform I built to
take my English from **B2+/C1 to a genuinely solid C1**.

It combines a **32-unit curriculum across 7 modules** with reading,
listening, speaking, vocabulary, grammar, interpretation, argumentation,
writing, revision, and retrieval. But the goal is not to complete
exercises for the sake of completing exercises. The goal is to use
English to **read deeply, think clearly, argue precisely, and produce
independently**.

The platform also uses different AI systems for different jobs. Some
evaluate responses, some work with register and naturalness, **Whisper
transcribes spoken production**, and the **Learning Review** analyzes
evidence accumulated over time to identify recurring patterns, progress,
difficulties, and possible opportunities for adaptation.

The principal writing task in each Unit receives deeper analysis from
**GPT-5.6 Sol**. The model diagnoses the writing without replacing it:
**Draft 1 remains intact, feedback is provided, and Draft 2 is written
independently by the learner**.

Over time, the platform can build pedagogical hypotheses from actual
learning evidence and propose adjustments to the study path. Those
changes are never automatic.

> **In other words: I built an English course for myself that is
> gradually learning how I learn.**

The governing principle is simple:

> **AI proposes. Human decides.**

------------------------------------------------------------------------

## Why I built it

My English is already strong enough for conversation and for consuming a
large amount of English naturally, but that does not mean every skill is
equally developed.

After a long period without consistent formal study or regular long-form
writing, I wanted something more specific than a conventional
advanced-English course. I wanted a system that could help turn
intuitive, often informal English into more deliberate control over:

-   structured and long-form writing;
-   argument development;
-   grammar and lexical precision;
-   natural collocation;
-   cohesion and information flow;
-   register and tone;
-   stance, hedging, and qualification;
-   deep reading and listening;
-   spontaneous spoken production;
-   revision, retrieval, and transfer.

That is why A Mind in English is deliberately built around **production
and reasoning**, not mechanical exercise volume.

------------------------------------------------------------------------

## The learning experience

Each Unit follows a deliberate progression:

1.  **KNOW** --- build useful background knowledge
2.  **READ** --- engage with adult, intellectually substantive texts
3.  **INTERPRET** --- examine meaning, evidence, inference, and argument
4.  **NOTICE** --- study grammar, usage, nuance, and register in context
5.  **STEAL** --- collect reusable chunks, collocations, and rhetorical
    language
6.  **THINK** --- reason, compare explanations, challenge assumptions,
    and form a position
7.  **WRITE** --- produce independent short and long-form texts
8.  **EDIT** --- revise the learner's own work after feedback
9.  **RETRIEVE** --- return to knowledge later without simply rereading
    answers

The underlying pedagogical cycle is:

``` text
INPUT → COMPREHENSION → NOTICING → LANGUAGE → THINKING
      → PRODUCTION → FEEDBACK → REVISION → RETRIEVAL → TRANSFER
```

The core distinction is:

> **Understanding something is not the same as being able to produce it
> independently.**

------------------------------------------------------------------------

## Current curriculum

-   **32 Units** planned across **7 Modules**
-   **Units 01--10** currently implemented
-   **Module Reviews 1 and 2** implemented
-   **Units 11--32** planned
-   Approximately **100--130 hours** of existing study material
-   Long-form writing, listening, speaking, revision, and delayed
    retrieval integrated into the curriculum

The curriculum moves from more personal and narrative work toward
increasingly analytical, abstract, and independent production.

Progression is not defined only by harder vocabulary or longer texts. It
also develops through greater ambiguity, more demanding reasoning,
competing interpretations, register control, synthesis, retrieval
distance, and independence.

------------------------------------------------------------------------

## AI architecture

AI is used as a collection of **specialized tools**, not as a single
tutor that controls the course.

Different functions have different responsibilities, prompts, models,
evidence rules, and safeguards.

### Response evaluation

Open-ended responses can receive task-specific analysis while preserving
the distinction between what the learner actually produced and what an
AI later interpreted.

### Register & Tone

A dedicated comparison tool can show how the same underlying meaning
changes across registers such as:

-   casual;
-   neutral;
-   professional;
-   formal;
-   academic.

Registers are treated as different communicative choices, not as a
hierarchy in which "more formal" automatically means "better".

### Writing Support

Writing Support is deliberately constrained. It can provide useful
language, register guidance, or writing strategy when needed, but it
should not construct the learner's argument or provide a ready-made
answer.

Supported production and independent production remain distinguishable
in the learning evidence.

### Main Write · GPT-5.6 Sol

Every Unit has a principal writing task.

The intended workflow is:

``` text
DRAFT 1
   ↓
DEEP WRITING ANALYSIS
   ↓
LEARNER REVISION
   ↓
DRAFT 2
```

The principal task is routed server-side to **GPT-5.6 Sol** for deeper
analysis.

The feedback can examine areas such as:

-   task achievement;
-   argument development;
-   organization and coherence;
-   clarity;
-   grammatical accuracy and range;
-   lexical precision and range;
-   collocation and naturalness;
-   register;
-   hedging and stance;
-   cohesion;
-   repetition;
-   language that is grammatical but overly informal;
-   language that is grammatical but awkward;
-   effective language and strengths.

Observations can distinguish between:

-   `ERROR`
-   `AWKWARD`
-   `REGISTER_MISMATCH`
-   `STYLE_CHOICE`
-   `STRONG_LANGUAGE`

The system is designed to **diagnose and coach rather than ghostwrite**.
It does not generate a replacement essay or a ready-made Draft 2.

### Speaking · Whisper

Speaking tasks can be recorded in the browser and transcribed with
**Whisper**.

The transcript can support analysis of content, structure, and language,
but it is not treated as ground truth for pronunciation, prosody, or
fine acoustic judgments.

### Text-based conversation

Unit 01 includes a contextual text-based Narrator for sustained
interaction after reading, with normal and challenge modes, optional
formulation support, and a separate conversation review.

The character remains a character rather than turning into a language
teacher mid-conversation. Supported language is tracked separately from
spontaneous production.

------------------------------------------------------------------------

## Adaptive Learning

A Mind in English is gradually evolving from a static personal study
book into a system that can **observe learning longitudinally without
taking control of the curriculum**.

The authority chain is:

``` text
LEARNER WORK
    ↓
FACTUAL EVIDENCE
    ↓
SYSTEM OBSERVATION
    ↓
PEDAGOGICAL HYPOTHESIS
    ↓
HUMAN JUDGMENT
    ↓
PROPOSED ADAPTATION
    ↓
POSSIBLE HUMAN-APPROVED CHANGE
```

The system separates three things that are easy to blur together:

1.  **What actually happened**
2.  **What the system thinks it may mean**
3.  **What could be changed because of it**

A single error is not automatically a difficulty. Lack of evidence is
not automatically a weakness. Recognition is not the same as independent
production.

Patterns require repeated evidence, and positive counter-evidence
matters alongside mistakes.

The learner can explicitly respond to hypotheses rather than having the
system silently decide that an interpretation is true.

### Learning Review

The Learning Review looks across qualified evidence from study activity
and can identify:

-   recurring patterns;
-   areas of progress;
-   strengths;
-   unresolved difficulties;
-   contradictory evidence;
-   areas where there is not enough evidence yet;
-   possible future adaptation targets.

A review can be run manually. Automatic review eligibility also
considers accumulated study time and whether genuinely new usable
evidence exists.

**Study time itself is never treated as evidence of mastery.**

### Adaptation

Adaptation prefers **replacement, reprioritization, and reuse** before
simply adding more exercises.

The adaptive layer can propose changes, but it does not silently:

-   rewrite Units;
-   alter completion;
-   change answer keys;
-   change scoring;
-   reorder the curriculum;
-   mutate independent assessments;
-   turn hypotheses into facts.

> **AI proposes. Human decides.**

------------------------------------------------------------------------

## Evidence integrity

The project deliberately distinguishes between different kinds of
evidence.

Examples include:

-   original Writing Draft 1;
-   learner-written Draft 2;
-   open interpretation responses;
-   objective checks;
-   speaking transcripts;
-   spontaneous Narrator turns;
-   supported Narrator turns;
-   glossary noticing;
-   Error Log practice;
-   retrieval work;
-   Module Review performance.

Evidence is interpreted according to what the activity actually gave the
learner an opportunity to demonstrate.

For example:

-   recognition does not prove production;
-   a revised draft does not prove the original production was
    independent;
-   a transcript does not prove pronunciation quality;
-   using formulation support is not equivalent to producing the same
    language spontaneously;
-   study duration does not prove learning.

This distinction is central to the adaptive architecture.

------------------------------------------------------------------------

## Core and optional practice

The curriculum contains a large amount of material, but not every
activity has equal pedagogical weight.

Each Unit therefore exposes a visible **Core** path while preserving
additional work as **Optional** practice.

Core/Optional is presentation metadata rather than a mechanism for
hiding content or forcing completion.

The goal is to preserve depth without turning the course into an endless
checklist.

------------------------------------------------------------------------

## Module Reviews

Module Reviews provide cumulative work across Units.

They can include:

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

Independent assessment retains a meaningful fixed or blind component.
Future adaptive review work is kept separate from that principle.

------------------------------------------------------------------------

## Notebook tools

The study environment also includes:

-   **Personal Glossary**
-   **Error Log**
-   **Bookmarks**
-   **Writing Portfolio**
-   **Current Affairs workspace**
-   **Search**

These tools support noticing, deliberate practice, transfer, and
revisiting previous work without turning the platform into a generic
productivity dashboard.

------------------------------------------------------------------------

## English Profile

The English Profile provides conservative, evidence-based estimates.

It distinguishes receptive and productive evidence, avoids invented
precision, and does not infer proficiency merely from activity
completion or time spent studying.

The longitudinal Learning Review and the English Profile are separate
systems with different purposes.

------------------------------------------------------------------------

## Design principles

-   Learner production comes before assistance.
-   AI feedback must not replace thinking or revision.
-   Supported and independent production are not equivalent evidence.
-   Recognition is not treated as mastery.
-   Positive evidence and counter-evidence matter alongside errors.
-   A single mistake does not automatically become a recurring pattern.
-   "Not enough evidence yet" is a valid conclusion.
-   Study time is context, not proof of learning.
-   Adaptation should prefer reuse and reprioritization before adding
    more work.
-   Independent assessment must retain a meaningful blind component.
-   Registers are communicative choices, not a simple better/worse
    ladder.
-   Feedback should preserve learner agency.
-   The system should become more informed without becoming more
    controlling.

------------------------------------------------------------------------

## Technology

### Frontend

-   HTML, CSS, and vanilla JavaScript
-   Local-first application state
-   Responsive PWA interface
-   MediaRecorder and IndexedDB for speaking work

### Backend

-   Node.js
-   Express 5
-   TypeScript
-   PostgreSQL
-   Prisma ORM
-   Cookie-based authenticated sessions

### Persistence and sync

-   Per-user JSON documents
-   Optimistic concurrency with compare-and-swap revisions
-   Explicit conflict handling
-   Server-Sent Events for cross-device updates
-   Local persistence with offline/reconnect behavior

### AI

-   OpenAI Responses API with Structured Outputs
-   Independent model configuration per function
-   Server-authoritative routing for privileged model use
-   No silent fallback to a more expensive model
-   Metadata-only technical logging
-   AI features can be disabled independently without disabling the
    study book

------------------------------------------------------------------------

## Project structure

``` text
public/                 Browser application and curriculum content
  data/                 Unit and Module Review content
  audio/                Listening assets
src/                    Express/TypeScript backend
  routes/               Auth, sync, AI, and learning APIs
  services/             Content, persistence, AI, and learning logic
prisma/                 Database schema and migrations
tests/                  Unit, integration, sync, and scenario tests
docs/                   Supporting production documentation
```

The full product, pedagogical, architectural, evidence, privacy, and
model-governance specification lives in
[`MIND_PRODUCT_CONTEXT.md`](MIND_PRODUCT_CONTEXT.md).

Agents making product-level changes should read that document before
modifying behavior.

------------------------------------------------------------------------

## Running locally

### Requirements

-   A recent Node.js release
-   PostgreSQL

### Installation

For a clean environment with an existing lockfile:

``` bash
npm ci
cp .env.example .env
```

Configure at least `DATABASE_URL` in `.env`. AI configuration is
optional.

Generate the Prisma client and apply the database migrations to the
intended development database:

``` bash
npm run prisma:generate
npx prisma migrate deploy
```

Start the development server:

``` bash
npm run dev
```

The default local server runs on:

``` text
http://localhost:3000
```

### AI configuration

Set `AI_API_KEY` and only the model variables for the functions you
intentionally want to enable.

Each AI function is configured independently. An empty model variable
should disable that function rather than silently borrowing another
model.

See [`.env.example`](.env.example) for the available settings and rate
limits.

For isolated development, testing, or cloud-agent work, production
credentials are not required and should not be copied into the
environment.

------------------------------------------------------------------------

## Validation

Run the automated test suite:

``` bash
npm test
```

Run static type checking:

``` bash
npm run typecheck
```

Build the production server:

``` bash
npm run build
```

Database-backed tests require an isolated test PostgreSQL database.
`TEST_DATABASE_URL` can be used to point test preparation at that
database.

Tests and development environments should not make real provider calls
unless a test is explicitly designed and authorized to do so.

------------------------------------------------------------------------

## Privacy and evidence integrity

The application handles personal writing and learning evidence
conservatively:

-   prompts and learner content are not written to technical logs;
-   only task-relevant context should be sent to AI functions;
-   AI assessments remain secondary evidence;
-   learner facts are not used for personality or motivation inference;
-   deterministic code owns IDs, counts, timestamps, boundaries, and
    deduplication;
-   exports never include API keys, secrets, chain-of-thought, or
    unrelated learner data;
-   learner drafts, transcripts, recordings, sessions, and longitudinal
    evidence are runtime data, not repository content.

A source repository should contain code, curriculum, schemas,
documentation, synthetic fixtures, and tests --- **not real learner data
or production secrets**.

------------------------------------------------------------------------

## Product direction

A Mind in English is evolving from a personal study book into:

> **a study book that can observe how the learner learns, preserve the
> difference between evidence and interpretation, and adapt the path
> without taking control of the curriculum**

It deliberately avoids:

-   XP, streaks, leaderboards, and gamification;
-   mastery percentages and pseudo-precise CEFR dashboards;
-   recommendation feeds;
-   automatic curriculum mutation;
-   endless AI-generated remediation;
-   psychological learner modelling;
-   treating more AI as automatically better learning.

The learner-facing heart of the product remains:

> **Read. Think. Write.**

And the adaptive principle remains:

> **AI proposes. Human decides.**
