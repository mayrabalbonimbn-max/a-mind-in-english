# HARDENING REPORT

Historical audit: the account-ownership HOLD below was subsequently resolved and verified locally. See `ACCOUNT_OWNERSHIP_HARDENING_REPORT.md` for the current readiness verdict; the original failing result is retained as audit evidence.

## BASELINE
- Git: clean at `53ad561`; no tracked diff, untracked files or concurrent edits. Ignored dependencies/build/runtime files preserved.
- Tests: 581/581, 37 files (71.26 s). Typecheck and build: pass.
- E2E initial parallel run: Study Review 38/40; Bugfix 1 28/30 (P2028 transaction expiration under simultaneous Chromium load); Writing Support 38/38; topbar 53/53; curriculum 17/17. Sequential repeat results below.
- Inspected package.json/lock, all four migrations, Prisma schema and test harnesses before code changes. Test DB is localhost/amindinenglish_test. No production or real providers.

## DATA OWNERSHIP MAP
Established before code changes. All synced documents are keyed by authenticated user and logical scope; the browser is the local editing authority until CAS acceptance. Server revision is cloud authority. Ordinary conflicts require human resolution; no automatic general last-write-wins.

| Domain | Client | Server / source of truth | Sync / deletion / export |
|---|---|---|---|
| Auth/session | HttpOnly cookie, KLANG_AUTH identity in memory | User + Session; token hash, expiry | Session invalidation; not in backup |
| Unit answers | S.a in klang.mind.v1 | unit:01…32 answers in UserDocument | Whole scope CAS, answer deletion by replacement; JSON/My Work |
| Review answers | S.a with r1…r7 prefixes | review:1…7 answers | Same CAS, JSON/Review exports |
| Unit progress | S.sec/S.ud | unit:* sections/done | Scope replacement; JSON |
| Review progress | S.sec/S.rd | review:* sections/done | Scope replacement; JSON |
| Glossary | S.gl/S.glx | glossary | CAS; explicit keep-both unions entries; delete through scope replacement; JSON/Markdown |
| Error Log | S.errs | error-log | CAS; keep-both retains conflicting versions; JSON/Markdown |
| Portfolio | S.pf | portfolio + separate immutable MainWriteAnalysis | Portfolio visibility is document-owned; removing entry does not delete analysis rows; JSON/feedback exports |
| Bookmarks | S.bm | bookmarks | CAS; keep-both unions ids; JSON |
| Current Affairs | S.ca | current-affairs | CAS; JSON/Markdown |
| Study Timer | S.study | study-timer | Session-id merge on conflicts; closed intervals feed eligibility; JSON |
| Support provenance | S.a :support/:supportLevel; historical S.pf.fb.support | Unit/Review document + analysis nullable support fields | CAS facts; historical feedback export uses snapshots |
| Main Write analyses | Portfolio caches response | MainWriteAnalysis append-only rows | No sync document for table; exports require visible portfolio entry; rows cascade on user deletion |
| Learning Review runs | Rendered fetched report | LearningReviewRun + LearningReviewState | Server lease and evidence hashes; PDF/MD/JSON; no client backup of full run history |
| Human Judgment | S.learningJudgments cache + live API response | learning-judgments server document | Dedicated endpoint; generic sync writes forbidden by key allowlist; exports overlay current judgment |
| Speaking recordings | IndexedDB klang-private-recordings-v1 / recordings | No server recording store | Device only; raw bytes excluded from JSON; replacement creates new attempt id |
| Speaking transcripts | S.sp entries with id/unit/activityId | speaking attempts document | CAS metadata/text; JSON, no binary backup |
| Listening feedback | S.a li:* feedback | Unit/Review document | CAS; JSON/My Work |
| Profile | S.profile derived/local | english-profile cached document | CAS; derived from eligible writing feedback; JSON |
| Sync documents | Local revisions/pending queue | UserDocument + DocumentConflict | Atomic revision CAS, rejected copy retained, SSE process-local; no generic delete endpoint |

Offline edits are saved locally with a persisted pending queue; refresh reloads that queue. Across devices, server revision mismatch yields 409. Across tabs, shared localStorage and independent in-memory app state require further safeguards: storage is currently origin-wide, not account-scoped. An account switch can inherit the previous account's local work; this is a confirmed unresolved isolation risk, not covered by server ownership checks. Recordings are also origin-wide.

## CONFIRMED BUGS FOUND
| Severity | Reproduction / root cause | Bounded fix | Regression evidence |
|---|---|---|---|
| Critical, unresolved | A logs out, B signs into the same context; B sees A's S.a. Origin-wide state/revisions/pending queue load before account reconciliation, then initial cloud migration can copy A's work to B. | No speculative migration or deletion of legacy data. Requires an account-owned local persistence boundary and stale-tab/session guard. | New real-browser account-switch assertion fails. Separate-context server isolation assertions pass. |
| High | Merge a finalized stale/unconfirmed session with a later active heartbeat: old merge removed the closed record. Matching-revision server writes and explicit resolution also replaced timer history. | Every finalized id is terminal; server merges within CAS, retains previously finalized server records. Short accidental stops retain ids without counting study. | hardening.test.ts: four end reasons, both merge directions, short Stop, PUT/409/resolve. Existing timer regression updated: its former expectation contradicted this block's invariant. |
| High | Database snapshot insert fails after provider succeeds: route returned success with analysisId null. | 503 snapshot_not_saved; draft unchanged, no successful analysis claim. | Injected failed create; no analysis row or success response. |
| High | Concurrent judgments for different pattern keys read the same JSON and last UPDATE drops one. | Serializable transaction, increment revision atomically, bounded retry for serialization/first-create races. | Simultaneous saveHumanJudgment calls preserve both; clearing one preserves the other. |
| High | First-upload batch starts, learner types, upload acknowledgment deletes pending key without comparing edit generation. | Snapshot edit generations at batch submission; clear only unchanged scopes. | Deferred batch response while typing; latest answer remains pending. |
| High | An older full-document pull arrives after newer hydration; previous code applied any unequal revision. | Hydrate only strictly newer revisions. | Older pull cannot replace revision 3 with revision 2. |
| Medium | A malformed HTTP 200 acknowledgment can clear pending work or crash at doc.revision; malformed pull can appear to be an empty server. No client request deadline. | Check acknowledgment revision and collection shapes; keep pending work; 20-second abort deadline. | Malformed success/pull tests, preserved pending queue; deadline code inspected (real 20-second elapsed case not browser-tested). |
| High | JSON backup accepts a:null/arrays and arbitrary container types, then replaces valid state. Restored study/conversations were not dirtied. | Validate supported shapes, duplicate ids, dates, provenance and 10 MB size before confirmation/mutation; clear obsolete pending import; include timer/conversation scopes. Retain server-owned judgments and terminal timer ledger. | 10 corruption variants, Unicode/partial/future-state validation, actual browser Blob export/FileReader restore, invalid restore leaves work unchanged. |
| Medium | Timer heartbeat delivered with older time moves lastSeenAt backwards. Equal-heartbeat competing active ids have input-order-dependent selection. | Heartbeat is monotonic; equal timestamps break ties by id. Conflicting closed copies conservatively retain earliest finalized interval. | Out-of-order heartbeat test; deterministic code inspection. |
| High | JSON parser error contains submitted raw body and global handler logs entire error; malformed JSON returns 500. Sync/auth catch handlers also log raw Prisma errors. | Metadata-only error names; safe 400 for malformed JSON / 413 for size limit. | Submitted private marker is neither logged nor returned; malformed request 400. |
| Medium | General sync accepted missing/null/array data, enabling invalid answer documents. | Require JSON object; retain null compatibility for the derived english-profile only; validate timer metadata on all write paths. | Missing/null/array rejected without writes; null profile preserved; malformed timer excluded from batch. |

Additional confirmed provenance bug: the browser queues native details.toggle, allowing immediate input to arrive first. Opening support then typing could be recorded as after-writing. The client now records the opening activation before subsequent input, with toggle retained for programmatic opening; new deterministic event-order test and repeated browser support/refresh/restore flow verify it. The sync pull validator also preserves legacy null english-profile documents instead of rejecting the entire pull; new hydration regression covers that compatibility case.

Learning Review failure safety: errors during lease acquisition escaped the async rate-limiter callback. The run route now forwards callback rejection to safe application error handling; a synthetic database failure regression verifies HTTP 500 without a run or leaked internals. Existing boundary/provider failure semantics are unchanged.

## REJECTED / FALSE POSITIVE FINDINGS
- Main Write authority is already server-derived from getWritingTask; `main`, `isMain`, `fn`, model/register/prompt-version overrides do not select Main Write or its quota. Existing malicious-payload tests verify this.
- Existing general CAS is real: revision is in UPDATE WHERE, not only a prior read. First-write races become stored conflicts, and conflict resolution also uses CAS.
- Pending audio is intentional content state, not a missing-media bug. U11–32/R3–7 have no player/answer controls and do not count towards progress.
- Initial Bugfix 1 500 was P2028 under simultaneous test-browser load; unchanged-code sequential repeat passed 30/30. Timeout behavior remains an operational risk; no arbitrary DB timeout increase made.
- A mobile timer fixture rewound only client timestamps after a server confirmation. The hardened merge correctly preserved the newer confirmation. E2E now seeds both server and local copies of its synthetic time fixture; it does not weaken the invariant.
- Snapshot analysed text is request-trimmed because that is the text actually sent; surrounding whitespace is not falsely claimed as analysed.

## SYNC / CONCURRENCY
| Case | Evidence / result |
|---|---|
| A one browser → second | New E2E: real SSE delivers answer to separate authenticated context. |
| B independent changes | New E2E: Unit and Review 7 edited concurrently, both retained. Same-scope independent changes use explicit conflict resolution, not automatic field merge. |
| C same item | Existing concurrency/client tests: one CAS winner, loser retained in DocumentConflict; human choice required. Full two-browser same-item UI resolution not added. |
| D stale reconnect | Existing offline/pending tests + new monotonic pull: dirty local scope is not hydrated over; stale server write returns 409. |
| E offline edit | Existing syncClient.test.ts offline retry and reauthentication tests preserve queue; no blanket browser-offline matrix. |
| F delete vs stale edit | Stale CAS prevents silent replacement. Explicit keep-both unions can reintroduce deleted ids: no per-item deletion tombstones for ordinary domains. Product decision required. |
| G rapid saves | Existing in-flight typing generation guard and new first-upload race test. |
| H duplicate/retry | Repeated stale revision becomes conflict; generic documents are not idempotency-key deduplicated. Rejected copies can repeat. |
| I out-of-order | New whole-pull monotonic test; existing single-pull checks already skip older revisions. |
| J refresh pending | Existing persisted pending metadata tests + real answer/provenance refresh. Shared-storage races between tabs remain. |
| K logout/login | Same-user pending reauth tested; new cross-account same-context test fails. In-flight old-tab requests are not bound to the identity that originated them. |
| L rejection | 400/401/409 validation/conflicts tested; pending queue retained. |
| M timeout | Client abort deadline added; network errors covered. Exhaustive real elapsed timeout/browser-sleep flow not verified. |
| N malformed | New malformed acknowledgment/pull and payload tests preserve work. Deep schemas for all notebook domains remain absent. |
| O version/CAS | Existing concurrency tests plus new terminal-timer CAS/resolve. |

Remaining risks: origin-wide localStorage, independent tab memory writing the same whole state, manual keep-both semantics for structured answers, no deletion tombstones for ordinary items, generic documents only shallowly validated, SSE process-local (multi-process delivery relies on later pull), no idempotency for AI feedback. Cloud status requires an accepted server revision; it cannot guarantee other tabs have no pending work.

## STUDY TIMER
- Start: creates one local active session; server merge leaves at most one active copy after synchronization.
- Pause/Stop: finalizes current interval. Resume is a new session, not reopening the finalized id. UI's current toggle says Pause; no separate new Stop design introduced.
- Refresh, stale gap >20 min, sleep/close: ends at last reliable heartbeat; the browser E2E now passes the stale notice and 40-minute retention scenario.
- 90-minute check-in / no response: deterministic rules end at the question after the 20-minute answer window; confirmed 270-minute session retained without cap.
- Cross-tab/device: session-id merge and server terminal protection tested; two genuinely disconnected devices can each run locally until sync, so globally immediate exclusive activity is not guaranteed offline.
- Cross-midnight: countSeconds clips only today presentation, factual stored interval remains intact; overlap union prevents double counting. Existing deterministic interval tests cover long intervals; no new timezone/DST browser matrix.
- Finalized session resurrection: fixed for manual, stale, unconfirmed, superseded and sub-five-second stops; server acceptance and resolution use the same rule.
- Restore no longer deletes terminal study history. Server-known terminal records win over modified copies.

## WRITING SUPPORT
Defaults HIGH/MEDIUM/LIGHT/OFF are computed without recording explicit choice; level selection does not itself record use. Opening support records first use and before-writing based on the answer/outline then present. Opening after writing stays false. Existing level and Bugfix tests cover short answers, Main Write, revision and Review contexts; new E2E covers before-writing + refresh + sync + restore. Main Write submission stores nullable historical facts; old absent metadata stays unknown in exports. Malformed submission and backup support values are rejected. Levels are prompt support facts, not learner-strength scores; no HIGH/OFF proficiency inference added.

## MAIN WRITE
- Authority/quotas: curriculum determines task and revision ownership and Main Write classification. Dedicated limiter independent of general feedback; changing payload fields cannot bypass it. Validation before Main quota. Existing quota-boundary and authority tests reused.
- Snapshot: server persists analysed trimmed text, unit/task/baseTask/draft, timestamp/id, configured model/reasoning, prompt version, expected register, feedback and nullable support facts. Snapshot persistence failure now prevents success.
- Draft 1: Unit UI freezes analysed first draft; Draft 2 copied into separate EDIT answer; analyses append independently. Module Reviews keep editable first drafts because they have no identical revision lifecycle.
- Exports: original snapshot text/model/prompt/support/feedback survive edits/configuration changes. Legacy metadata remains null. Current unanalysed Draft 2 is explicitly labelled as current, not substituted for analysed Draft 1.
- Deletion: Unit reset removes local portfolio/answer entries and syncs editable scopes; analysis rows remain. Export requires portfolio entry, so retained table rows are not a visible recovery endpoint. User deletion cascades rows. No retention-policy change.
- Provider failure: charged attempt remains charged. Snapshot-storage failure likewise remains an attempted quota use. UI disables an active submission, SDK automatic retries are zero; retried/duplicate POSTs can still call provider and create separate rows.
- Remaining historical gaps: snapshot stores expectedRegister, not a frozen full curriculum task prompt/title/objective. Export reconstructs that task context from current curriculum. Stored model is configured model, not necessarily an effective provider-reported alias/version. These should be addressed before claiming complete historical task/context truth.
- No DB request-id uniqueness or Main Write idempotency key; quotas are process-memory, reset on restart and are not shared between workers.

## LEARNING REVIEW
- Actual sources: recognised open/production/writing answers; checked MCQ/TF; justifications/outlines/metacognition/retrieval/pronunciation logs; listening answers/checks/feedback; portfolio feedback snapshots/summaries; speaking transcript/feedback; Error Log; Glossary self-rating; conversation spontaneous/support-used turns and review summaries; support facts attached to relevant answers.
- Excluded: quote activity type (production extractor accepts open/produce/writing), raw audio, bookmarks, progress/preferences, Current Affairs, derived Profile and retired Language Bank. MainWriteAnalysis table is not independently queried as a ledger source: portfolio copies are used. No new source added.
- Evidence quality: origins/provenance/opportunities distinguish learner, check, record and AI; transcript limitation is explicit. AI-only or entirely supported evidence cannot receive high confidence. Difficulty threshold is >=3 refs in >=2 activities; single error remains one-off. Counter-evidence coexists.
- Implemented statuses: one_off, possible_pattern, recurring, improving, apparently_resolved, rejected_by_human, plus strength statuses. No new longitudinal/CEFR states introduced.
- Boundaries: ids+hashes; changed items become new, not merely a timestamp delta. Only successful commit advances analysed hashes. New E2E repeated run short-circuits; existing failure/retry/lease tests retained. Lease acquisition and commit are DB CAS; old holder cannot commit after takeover.
- Factual ledger is deterministic; interpretation/proposal layer remains separate. Human judgment never becomes English-performance evidence.
- Judgment persistence: serializable server saves; UI same-choice clear contract retained; browser Agree/Disagree refresh and PDF/MD exports verified in Bugfix E2E. Export overlays current judgment onto immutable saved report; it is not a frozen historical judgment snapshot.
- Rejected hypothesis: no new evidence means no provider call. Merger suppresses rejected hypotheses unless fresh supporting refs permit a new hypothesis; prior rejection remains in history. Definition of materially new evidence is new/changed fingerprints, not an independently validated semantic novelty measure. History is trimmed to ten pattern entries; this is an existing limitation.
- Privacy: pipeline filters evidence docs, clips snippets (answer 600, writing 900, transcript 600, turn 280 / six turns), sends referenced relevant context and small prior patterns/candidate activities. No sessions/password hashes, account metadata or binary recordings enter prompt. Logs metadata only after catch-handler hardening. Pedagogical context was not reduced.

## AI ROUTES
All aiRouter and characterConversation routes require authenticated session; demo use blocked. Function-specific configuration gates, quotas, SDK timeout/maxRetries=0, structured response schemas and safe AiRequestError mapping retained.

| Route / family | Validation and authority | Rate limit / failure notes |
|---|---|---|
| feedback/Main Write | Unit/task lookup; text/outline limits; strict support schema; curriculum chooses main | Main dedicated quota vs general quota; Main snapshot must persist |
| outline | Real writing task + outline size | General feedback quota; safe provider failures |
| explain | Selection/context size | Explain quota; no curriculum-specific task required |
| light-language-feedback | Unit/activity and text | Feedback quota; schema validates provider output through SDK |
| interpret-item-feedback | Real interpreted item + answer | Feedback quota; no fabricated full-source-reading authority |
| explain-question | Real question/id | Explain quota |
| teacher-lens | Review/point lookup | Feedback quota |
| register-compare | Bounded selection | Explain quota; not profile production evidence |
| speaking-feedback | Canonical unit/review speaking id + transcript max 20k | Feedback quota; transcript-only |
| listening-feedback | Canonical track/open question id + answer max 5k | Feedback quota |
| transcribe | Raw audio max 15 MB, validated Unit/task headers | Dedicated transcription limiter; fake hook used |
| Narrator chat/help/review | Authoritative registry; conversation/turn schemas and append-only policy | Function quotas; immutable turn/review rules; fake provider only |
| Learning Review | User-owned synced evidence, DB lease | Own limiter; no-new-evidence precheck; failure keeps boundary/report |

Limiters are in-process. Most non-Main routes spend quota before all route validation; retries are charged. Malformed-provider/failure tests exist in AI/conversation/Learning Review suites; an exhaustive new fault-injection test on every route was not performed. No claim of end-to-end exactly-once AI execution.

## SPEAKING
IndexedDB bytes stay device-local; metadata, transcript and feedback belong to a distinct attempt id/unit/activityId. New recording creates a new attempt rather than attaching prior transcript. Canonical U01–22/U23–32/Review lookups are contract-tested; new browser fake transcription validates U23. No real MediaRecorder permission/audio capture or exhaustive replacement/deletion browser test added. Re-transcription currently replaces transcript without clearing older feedback/correctedTranscript: a known stale-assessment risk. Delayed speaking feedback can attach to a subsequently changed transcript because response handling has no transcript generation check. IndexedDB transaction helper resolves on request success rather than transaction commit: durability failure after request success is not explicitly handled. Raw recordings are not backed up or portable across devices/accounts.

## LISTENING
Content integrity tests check ready files for U01–10/R1–2; U11–32/R3–7 explicitly pending. Browser curriculum suite renders all stages, fetches ready audio and checks errors/overflow. Pending questions are preview-only; earlier work remains visible; no false completion added. Canonical ids accepted by server, including numbered U23–32 ids. Duration presentation avoids NaN. No missing audio generated.

## CONTENT CONTRACT
Reused actual structural audit for 32 Units and seven Reviews: ids/references/renderer fields, Core, EDIT, speaking/listening/pronunciation, all route/stage rendering, undefined/NaN/object leakage. 17/17 curriculum browser suite. No curriculum rewrite or activity-count replacement.

## ROUTING
Existing router safely falls back to Home for malformed ids/hashes; valid stage helpers default safely. Curriculum E2E covers direct route/refresh and Review 7 persistence; all nine Unit/ten Review stages rendered. Home, notebook, Learning Review, Profile and Unit 01 Narrator covered by existing suites. No exhaustive newly added malformed-hash browser enumeration.

## EXPORTS
Main Write PDF/MD/JSON and Learning Review PDF/MD/JSON serialize saved analysis/report; no AI call on export. My Work/Review/portfolio backup are editable-current-work exports, not claims of immutable analysis history. Existing PDF fixture/design tests cover long text/Unicode/escaping and designed-engine fallback. New E2E exercised all three Learning Review formats. Approved PDF styling unchanged. Historical task prompt/title and current judgment overlays have limitations described above.

## BACKUP / RESTORE
Explicit replacement confirmation already existed and is retained. New validator rejects broken container types, duplicate collection ids, invalid dates/support/timer metadata; supports partial old and unknown future fields (unknown keys ignored by importer). 10 MB cap/read failures handled; old pending import cleared before new file. Actual browser backup, confirmed replacement and answer/support round-trip passed; malformed state leaves current work untouched. Terminal timer ledger and server judgments retained. Restore is not a merge of editable answers and does not back up server analysis/run tables or raw audio. Conversation server append-only policy may reject a destructive old conversation restore; retained as unresolved policy boundary. Nested schemas are not exhaustive; full every-domain state equivalence is not claimed.

## AUTH / USER ISOLATION
Two test users; server queries scope documents/runs/analyses by authenticated user and foreign-id exports return 404. Existing auth/session/hash tests pass. New E2E separate-context document and export isolation pass; same-context account switch fails and blocks readiness. Login/logout around old tabs and origin-wide IndexedDB need the same ownership boundary. No real learner account used.

## DATABASE
Inspected all four migrations and schema. User relationships cascade for sessions, documents, conflicts, LR state/runs and analyses. Document uniqueness is userId+key. User/time indexes exist for queried LR and analysis history; no speculative index added. LR leaseRunId/lastSuccessfulRunId are application-managed string references (not FK). Main analyses are append-only by application contract, not a database trigger. Test users cleaned with cascading delete; no production migrations.

## ERROR HANDLING
400/401/409/429/provider 5xx paths covered by existing/new tests; 403 demo/isolation and 404 foreign/missing resources covered. New malformed JSON is 400, size parser errors 413, logs do not contain submitted raw body. Local pending state survives malformed acknowledgment/offline. SDK retry zero and UI submission disable retained. Network abort added to sync only; other client fetch families still lack a uniform deadline/generation guard. Origin-wide storage remains the major silent-loss/leak risk.

## SECURITY BASICS
.env ignored; tracked environment file is .env.example. No client API key found in public source. HttpOnly cookie; secure in production configuration; token stored hashed; private assets/AI/export routes authenticated; CSP blocks foreign scripts/connects; learner HTML/export escaping exists. This was source/contract inspection, not the separate penetration audit. Deep nested synced/backup content and every HTML sink were not exhaustively proven safe.

npm audit: three high entries representing one transitive advisory chain (`deepmerge-ts` → `@prisma/config` → dev CLI `prisma`), recursive-object-graph stack exhaustion, GHSA-ggr8-5vv4-36mx. JSON requests cannot encode cyclic object references; no route found that feeds untrusted recursive graphs into that CLI merge. This contextualizes exposure, not a universal exploitability proof. No dependency upgrade or lockfile change.

## ACCESSIBILITY
Existing source/tests preserve button semantics, pressed/current state, labels, focus-visible styles, sidebar navigation, timer accessible labels, disclosures and Escape handling. No visual redesign. General modal initially focuses a control but lacks a complete focus trap/return-to-trigger behavior; sync conflict modal lacks explicit initial keyboard focus. These are remaining accessibility findings. Contrast/touch targets not comprehensively measured across all functional text. Do not interpret responsive passes as full accessibility certification.

## RESPONSIVE
Existing browser suites cover 1440/390/320, timer/check-in, support, topbar, Learning Review and representative all-stage Unit/Review/notebook pages; curriculum checks horizontal overflow and bad rendered tokens. Feedback modal exercised in Bugfix suite. No CSS change made.

## TESTS ADDED
- tests/hardening.test.ts: 30 assertions/cases (terminal timer incl short Stop, server CAS/resolve, monotonic heartbeat, malformed timer/docs, concurrent judgment isolation, backup corruption/Unicode compatibility, sync malformed responses/out-of-order/batch typing, failed Main snapshot, safe malformed JSON logging).
- tests/e2e/hardening.e2e.mjs: real login/answer/support/refresh/SSE/concurrent different-scope sync/R7/pending U23/fake transcription/Learning Review no-new/judgment/three exports/actual backup restore/two-user server isolation/account-switch regression. One deliberate guard fails on the confirmed unresolved client isolation bug.
- Existing Study Review browser fixture seeds both authoritative copies to respect monotonic server confirmation. Existing timer unit expectation updated to terminal finalization.

## FILES CHANGED
Changed:
- MIND_PRODUCT_CONTEXT.md, HARDENING_REPORT.md
- public/app.js, public/index.html, public/backup.js, public/study-timer.js, public/sync.js
- src/app.ts, src/middleware/auth.ts, src/routes/auth.ts, src/routes/ai.ts, src/routes/sync.ts, src/routes/learningReview.ts
- src/services/syncService.ts, src/services/learningReview/judgments.ts
- tests/hardening.test.ts, tests/helpers/appHarness.ts, tests/helpers/browserSync.ts, tests/studyTimerReview.test.ts
- tests/e2e/hardening.e2e.mjs, tests/e2e/studyReview.e2e.mjs, tests/e2e/topbar.e2e.mjs

Bounded app changes: backup read/restore and support activation only; no broad app.js refactor. Added backup validator, judgment concurrency helper, hardening unit/E2E tests and this report. Prisma schema, migrations, dependencies, curriculum, models, quotas and approved visual system unchanged.

## TEST RESULTS
- Total: 611. Passed: 611. Failed: 0. 38 test files, 71.43 seconds; /tmp/mind-verified-tests.log.
- Baseline: 581. Added: 30. Full suite ran again after final application/request-handling changes.
- Typecheck/build exit 0; git diff --check clean.

## E2E
| Suite | Final result |
|---|---|
| Study Timer + Learning Review | 40/40 |
| Bugfix 1 | 30/30 |
| Writing Support | 38/38 |
| topbar | 53/53 |
| curriculum | 17/17 |
| maintenance | 38/38 |
| register | 27/27 |
| conversation | 57/57 |
| new hardening | 22/23; account-switch isolation guard fails |

Existing suites total 300/300; new hardening 22/23. Browser regression total 322/323. No readiness claim: the failing guard demonstrates a real data-isolation risk. Baseline transient failures and invalid terminal-session fixture expectations are recorded above. Topbar fixtures now use a unique session id per scenario: an id finalized at 390 px cannot be reused as running at 320 px. Final screenshots at desktop/phone widths were visually inspected for Main Write/EDIT and Learning Review; no visual redesign.

Logs are local scratch output: /tmp/mind-verified-tests.log, /tmp/mind-final-{studyReview,bugfix1,writingSupport,topbar,curriculum,maintenance,register,conversation}.log, /tmp/mind-hardening-e2e.log. Screenshots are in the per-suite OS temporary directories printed by these logs.

## TYPECHECK
Pass before and after changes.

## BUILD
Pass before and after changes.

## REAL PROVIDER CALLS
OPENAI: 0
WHISPER: 0
ELEVENLABS: 0
Test environment cleared real keys, E2E server installs fake structured/transcription hooks; new suites additionally block provider network. No audio generated.

## PRODUCTION
ACCESSED: NO
CHANGED: NO
DEPLOY: NO
COMMIT: NO

## KNOWN ISSUES LEFT
- Engineering risk: account switching leaks/copies origin-wide local work; stale tabs/whole-state storage writes; speaking transcript/feedback generation and IndexedDB commit durability; AI retries/duplicates have no durable idempotency; effective provider model and frozen full task context absent from Main snapshots; shallow notebook validation; process-local quotas/SSE; DB transaction load timeouts.
- Pedagogical finding: quote answers excluded from LR; late-unit part1/part3/followUp not all rendered; literal Markdown formatting, late-unit EDIT authoring, generic Review STEAL/Editing source conventions, Core THINK distribution. Curriculum intentionally unchanged.
- Intentionally deferred: English Profile 2.0, Natural Version 2.0, Adaptive Module Review, broad app.js refactor, audio production, deep security audit.
- Requires product decision: safe ownership/recovery of unowned legacy local data; deletion tombstones and keep-both for structured answers; full backup vs server-history restore; immutable conversation restore; Main snapshot retention/export visibility policy; definition of materially new rejected-hypothesis evidence and truncated pattern history.

## RECOMMENDED NEXT BLOCK
Complete local account ownership, stale-tab protection and historical/context/idempotency gaps, with migration that preserves unknown offline learner work. English Profile 2.0 is not recommended until that foundation passes the failing account-switch browser guard and the stated reliability gaps are resolved or explicitly accepted.

MIND_PRODUCT_CONTEXT.md: UPDATED — factual local hardening semantics, backup limits and unresolved client account-isolation gate; changes marked IN DEVELOPMENT, not deployed. Future product features remain deferred/planned.

HOLD — client account switching can expose and sync another user's origin-wide local learner work.
