# ACCOUNT OWNERSHIP HARDENING REPORT

## ROOT CAUSE

The server already owned records by authenticated user, but the browser loaded one origin-wide learner state, revision map, pending queue and recording database. Signing into B could reuse A's local work and upload it through B's shared cookie. Stale tabs also used whichever cookie was current when a request was sent.

Scope: only account ownership and directly related startup/session/request hazards. Earlier hardening edits are preserved. No English Profile 2.0, redesign, deployment, production access, commit or real provider call.

## STORAGE OWNERSHIP MODEL

The server-confirmed immutable user ID is bound once per document, before the book or sync metadata loads. Keys use `<existing base>.account:<encodeURIComponent(user.id)>`:

| Store | Owned contents |
|---|---|
| `klang.mind.v1.account:<id>` | Unit/review answers, sections/progress, glossary, retained Language Bank, errors, portfolio, bookmarks, current affairs, timer, support provenance, judgment cache, speaking metadata/transcripts, profile cache, conversations, preferences and navigation/backup metadata |
| `klang.mind.revs.v1.account:<id>` | Server revision references |
| `klang.mind.pending.v1.account:<id>` | Pending editable scopes |
| `klang.mind.talkclient.v1.account:<id>` | Conversation client identity and sequence |
| `klang.mind.talkdraft.v1.account:<id>` (sessionStorage) | Composer drafts |
| `klang.mind.demo.v1.account:<id>` (sessionStorage) | Temporary demo learner state |

`klang.mind.active-account.v1` contains only the account ID used to coordinate invalidation. It never selects a learner's storage or establishes authenticated ownership. The gate message is UI coordination, not learner state.

The existing local editing state and user-owned server documents remain the sources of truth, with their existing CAS and server-owned judgment rules. Quarantined legacy stores are never a live fallback. Preparing sync metadata before startup edits prevents timer initialization from overwriting revision references; preparation is idempotent for the bound owner.

## LEGACY MIGRATION STRATEGY

No automatic adoption. A legacy origin-wide store cannot safely identify its owner and may contain work from several accounts. The verified account loads its existing cloud documents or its own empty local namespace.

All old keys and the original recording database remain intact. The backup area offers a deliberate, unassigned recovery download; it includes raw legacy state verbatim, parsed state when valid, old revisions/queue, conversation client metadata and session drafts/demo data. Malformed state is retained verbatim. It displays no legacy work in the learner UI and never syncs it automatically.

Recovery procedure:

1. Preserve the recovery copy and original stores. Review the copy offline; verify ownership independently. Separate mixed-account entries. Uncertain entries remain unassigned.
2. Sign into the verified owner. Restore only verified work using the existing validated file import and explicit replacement confirmation. New backups include `ownerId`; confirmation explains that import deliberately assigns work to the signed-in account.
3. Never import legacy revisions, pending queues or client sequence as cloud authority. Normal owned sync uses that account's current server revisions. Existing server-owned judgments and finalized timer history retain their authority.
4. Raw legacy recordings require separate, deliberate recovery: verify each recording's owner and matching attempt metadata, export/copy it only into that verified account's recording namespace, and leave ambiguous blobs untouched. There is no automatic raw-recording claim or fallback. JSON recovery does not include audio blobs.

## STALE TAB PROTECTION

Cross-tab storage events and focus checks invalidate documents whose captured owner differs from the active-account marker, including signout and storage clearing. Invalidated tabs abort requests, stop sync/retries/SSE and relock/reload. They cannot rebind their existing in-memory state to B.

SSE reconnects carry the immutable owner ID; the server refuses a different session identity. Owner checks also guard state application, dirty marking and local writes. Session expiry/signout do not rewrite a stale in-memory queue over another tab's already persisted pending work.

## IN-FLIGHT REQUEST PROTECTION

Same-origin private API fetches capture `X-Learner-Id` at dispatch. The server compares it with the identity captured by authentication middleware before executing the route. Mismatches return 403 `account_changed`, including reads, logout, mutations and SSE. Authenticated browser mutations without an owner return 428, protecting old unbound tabs. Login/registration remain public; ordinary non-browser API compatibility is retained.

Account invalidation aborts dispatched requests. Owner checks run after response headers and before/after asynchronous body consumption, so a late A response cannot hydrate a B document. A request already authenticated as A remains A-owned on the server; changing the shared browser cookie cannot reinterpret that request as B. A delayed A request dispatched with B's cookie is rejected.

## INDEXEDDB OWNERSHIP

Each account uses `klang-private-recordings-v1.account:<id>`, with the existing `recordings` object store. Operations capture the database name before awaiting open and recheck ownership after open and transaction completion. Writes resolve only after commit. Identical recording IDs in A and B are isolated; metadata/transcripts are owned through their learner state. The original `klang-private-recordings-v1` stays untouched and is never queried as a fallback.

## TESTS ADDED

Eight added unit/integration cases cover immutable binding, preservation of valid/malformed legacy bytes, cross-tab invalidation and recovery, dispatch headers/abortion, late response bodies, server owner mismatch (including logout/SSE), unbound browser writes, and loading revisions before startup edits. Existing session-expiry coverage now asserts that another A tab's queued scope survives.

New browser suite: 27 checks. It exercises A login/work/logout/B login, isolation across learner domains and conversation metadata, B cloud isolation, owned pending queues, stale-tab relock, an actual intercepted browser request aborted during switching, rejection of late consumption and A headers with B cookies, refresh, return to A with pending recovery, recording ID collisions, and preservation of legacy state/queue/revisions/recordings.

The previously failing hardening account-switch assertion remains in place and now passes. Existing E2E fixtures use explicit owned keys. The Maintenance old-schema fixture has a known test-account ID; it does not imply automatic migration of real unowned data. Timer DB fixtures carry the matching local revision.

## FULL TEST RESULTS

| Check | Final result |
|---|---|
| Full `npm test` | 619/619 tests; 39/39 files; 37.36 seconds |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |
| `git diff --check` | PASS |

Local disposable test database: `amindinenglish_test`. Browser server used deterministic fake providers. No production database, real learner account, real model or transcription service was used.

## E2E RESULTS

Final serial run, all checks retained:

| Suite | Result |
|---|---|
| Study Review | 40/40 |
| Bugfix 1 | 30/30 |
| Writing Support | 38/38 |
| Topbar | 53/53 |
| Curriculum | 17/17 |
| Maintenance | 38/38 |
| Register | 27/27 |
| Conversation | 57/57 |
| Hardening | 23/23 |
| Account ownership | 27/27 |
| **Total** | **350/350** |

The existing eight suites total 300/300. The formerly failing same-browser account-switch guard passes. Exploratory failures were investigated rather than ignored: early metadata loading fixed a real startup revision race; stale global-key and pre-login fixtures were corrected; intercepted-request observation was made deterministic. Final runs contain no failing checks.

Evidence logs: `/tmp/mind-ownership-full-tests.log`, `/tmp/mind-ownership-typecheck.log`, `/tmp/mind-ownership-build.log`, and `/tmp/mind-ownership-<suite>-e2e.log` for the ten named suites.

## FILES CHANGED

Changes in this ownership follow-up (earlier hardening files remain preserved):

- Runtime: `public/ownership.js` (new), `public/index.html`, `public/boot.js`, `public/app.js`, `public/sync.js`, `public/media.js`, `public/character-chat.js`, `src/app.ts`.
- Unit/integration: `tests/accountOwnership.test.ts` (new), `tests/hardening.test.ts`, `tests/syncClient.test.ts`, `tests/conversationSync.test.ts`, `tests/maintenancePass.test.ts`, `tests/phase2.test.ts`, `tests/helpers/appHarness.ts`, `tests/helpers/browserSync.ts`.
- Browser: `tests/e2e/accountOwnership.e2e.mjs` (new), `tests/e2e/hardening.e2e.mjs`, `tests/e2e/studyReview.e2e.mjs`, `tests/e2e/bugfix1.e2e.mjs`, `tests/e2e/writingSupport.e2e.mjs`, `tests/e2e/topbar.e2e.mjs`, `tests/e2e/maintenance.e2e.mjs`, `tests/e2e/register.e2e.mjs`, `tests/e2e/conversation.e2e.mjs`. Curriculum was rerun unchanged.
- Documentation: this report (new), `MIND_PRODUCT_CONTEXT.md`, historical note in `HARDENING_REPORT.md`.

No database schema, migration, curriculum, style system, profile engine or deployment file was changed for this follow-up.

## REMAINING RISKS

No unresolved account-ownership readiness blocker remains in the verified local build. Legacy ownership cannot be reconstructed automatically; ambiguous work and recordings stay preserved and unassigned until verified recovery. Raw recordings remain outside ordinary JSON backups. Browser storage eviction is still subject to browser/OS policy. The result is local verification only; production remains unchanged and was not tested or deployed.

HARDENING VERIFIED — READY FOR ENGLISH PROFILE 2.0
