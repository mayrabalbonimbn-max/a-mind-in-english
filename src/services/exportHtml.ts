import { randomBytes } from 'crypto';
import type { Response } from 'express';
import type { ExportFeedbackData } from './ai/feedbackExport';
import type { EvRef, LearningReport, ReportObservation, ReportProposal } from './learningReview/merge';
import { STATUS_LABEL } from './learningReview/pdf';

/* Readable HTML exports (Main Write feedback, Learning Review) in the book's own identity:
   espresso cover, creme paper, powder-pink accents, Jost / Figtree. Self-contained (inline CSS,
   one tiny nonce'd script for the print button), print-ready (A4), so "Save as PDF" from the
   browser gives a good-looking PDF. Serialises saved data only: never calls the AI.
   Everything that comes from the learner or the model is escaped. */

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const day = (iso: string | null | undefined) => (iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '');
const time = (iso: string | null | undefined) => (iso ? new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) + ' UTC' : '');
const plural = (n: number, one: string, many = one + 's') => `${n} ${n === 1 ? one : many}`;
const list = (items: unknown[] | undefined, cls = '') => (items && items.length ? `<ul${cls ? ` class="${cls}"` : ''}>${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '');

/** Content-Security-Policy for an exported page: no network except the two font hosts, one nonce'd script. */
export const exportCsp = (nonce: string) =>
  [
    "default-src 'none'",
    "style-src 'unsafe-inline' https://fonts.googleapis.com",
    'font-src https://fonts.gstatic.com',
    `script-src 'nonce-${nonce}'`,
    "img-src data:",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'none'",
  ].join('; ');

const CSS = `
:root{--esp:#1C1817;--esp2:#262120;--creme:#F3EBE3;--creme2:#E9DFD4;--paper:#FBF7F2;--rosa:#E8BCC1;--rosa2:#F6DCDF;--ink:#9A4E5C;--taupe:#B9ADA6;--cinza:#6E625C;--line:#DCCFC2;--text:#2B2422;--ok:#4F6B4A;--ok-bg:#E4EADF;
  --display:'Jost',Futura,'Century Gothic',system-ui,sans-serif;--body:'Figtree',system-ui,-apple-system,'Segoe UI',sans-serif;color-scheme:light}
*{box-sizing:border-box}
html,body{margin:0}
body{background:var(--creme2);color:var(--text);font-family:var(--body);font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:var(--display);margin:0;text-wrap:balance;font-weight:400}
p{margin:0 0 10px}
ul,ol{margin:6px 0 10px;padding-left:22px}
li{margin:3px 0}
.cover{background:var(--esp);color:var(--creme);padding:44px 24px 72px}
.wrap{max-width:780px;margin:0 auto}
.topline{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.brand{font-family:var(--display);font-size:11px;font-weight:500;letter-spacing:.32em;text-transform:uppercase;color:var(--rosa)}
.print{font-family:var(--display);font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;background:transparent;color:var(--creme);border:1px solid rgba(243,235,227,.3);border-radius:999px;padding:9px 16px;cursor:pointer;transition:background .2s,border-color .2s}
.print:hover{background:rgba(243,235,227,.08);border-color:var(--rosa)}
.print:focus-visible{outline:2px solid var(--rosa);outline-offset:3px}
.cover h1{font-weight:300;font-size:42px;line-height:1.12;margin:34px 0 10px;letter-spacing:-.005em}
.cover .sub{color:var(--taupe);font-size:15px}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
.chip{font-family:var(--display);font-size:10.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;border:1px solid rgba(243,235,227,.2);color:var(--creme);padding:6px 12px;border-radius:999px;white-space:nowrap}
.chip.accent{border-color:var(--rosa);color:var(--rosa)}
main.paper{background:var(--paper);max-width:780px;margin:-40px auto 56px;padding:44px 56px 48px;border-radius:18px;box-shadow:0 1px 0 var(--line),0 24px 60px rgba(28,24,23,.10)}
.lead{font-size:15px;color:var(--cinza);margin-bottom:6px}
section{margin-top:38px}
section:first-child{margin-top:0}
.sec-h{display:flex;gap:12px;align-items:baseline;border-top:1px solid var(--line);padding-top:16px;margin-bottom:14px;break-after:avoid}
section:first-child .sec-h{border-top:0;padding-top:0}
.sec-h .n{font-family:var(--display);font-size:11px;font-weight:500;letter-spacing:.2em;color:var(--ink);min-width:20px}
.sec-h h2{font-size:23px;line-height:1.25}
.sec-h .hint{margin-left:auto;font-family:var(--display);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--cinza);white-space:nowrap}
h3{font-size:17px;font-weight:500;margin:0 0 6px;line-height:1.35}
.prompt{background:var(--creme);border-radius:12px;padding:16px 20px;color:#3d3431}
.learner{white-space:pre-wrap;background:#fff;border:1px solid var(--line);border-left:3px solid var(--rosa);border-radius:4px 14px 14px 4px;padding:22px 26px;font-size:16.5px;line-height:1.8;overflow-wrap:anywhere}
.words{font-family:var(--display);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--cinza);margin-top:8px}
.card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin-top:12px;break-inside:avoid}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.grid .card{margin-top:0}
.k{font-family:var(--display);font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--cinza);margin:12px 0 2px}
.k.good{color:var(--ok)}
.k.sharp{color:var(--ink)}
.good-list li::marker{color:var(--ok)}
.sharp-list li::marker{color:var(--ink)}
.start{background:var(--rosa2);border-radius:14px;padding:18px 22px 10px}
.start ol{padding-left:20px}
.start li{margin:6px 0;font-size:16.5px}
.pill{display:inline-block;font-family:var(--display);font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;padding:3px 10px;border-radius:999px;white-space:nowrap;border:1px solid var(--line);color:var(--cinza);background:#fff;vertical-align:middle}
.pill.error{background:#F3D8D5;border-color:#F3D8D5;color:#722D28}
.pill.awkward{background:#F4E6D6;border-color:#F4E6D6;color:#7A5226}
.pill.register{background:var(--rosa2);border-color:var(--rosa2);color:var(--ink)}
.pill.style{background:var(--creme);border-color:var(--creme);color:var(--cinza)}
.pill.strong{background:var(--ok-bg);border-color:var(--ok-bg);color:var(--ok)}
.pill.fact{background:#fff;border-color:var(--text);color:var(--text)}
.pill.ai{background:var(--rosa2);border-color:var(--rosa2);color:var(--ink)}
.pill.human{background:var(--esp);border-color:var(--esp);color:var(--creme)}
.pill.prop{background:#fff;border:1px dashed var(--ink);color:var(--ink)}
blockquote{margin:10px 0 8px;padding:4px 0 4px 16px;border-left:2px solid var(--rosa);font-style:italic;color:#3d3431}
.row{display:grid;grid-template-columns:128px 1fr;gap:4px 14px;margin-top:8px;font-size:15px}
.row dt{font-family:var(--display);font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--cinza);padding-top:4px}
.row dd{margin:0}
.meta{font-size:13.5px;color:var(--cinza);margin:4px 0 10px}
.meta .pill{margin-right:4px}
.ai-block{background:var(--rosa2);border-radius:10px;padding:12px 16px;margin-top:10px}
.ai-block p:last-child{margin-bottom:0}
.judge{margin-top:10px;font-size:14.5px}
.ev{margin-top:12px;border-top:1px dashed var(--line);padding-top:10px}
.ev ul{list-style:none;padding:0;margin:4px 0 0}
.ev li{margin:8px 0;font-size:14.5px}
.ev .src{display:block;font-size:12.5px;color:var(--cinza)}
.ev q{display:block;font-style:italic;color:#3d3431;quotes:'“' '”'}
.legend{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;font-size:13.5px;color:var(--cinza)}
.muted{color:var(--cinza)}
.empty{color:var(--cinza);font-style:italic}
.cols{columns:2;column-gap:28px;font-size:14px;padding-left:18px}
.cols li{break-inside:avoid}
.foot{max-width:780px;margin:0 auto 48px;padding:0 24px;font-size:12.5px;color:var(--cinza);text-align:center;line-height:1.6}
@media (max-width:680px){
  .cover{padding:28px 20px 56px}.cover h1{font-size:30px;margin-top:26px}
  main.paper{margin:-32px 12px 40px;padding:28px 20px 32px;border-radius:14px}
  .grid{grid-template-columns:1fr}.row{grid-template-columns:1fr}.cols{columns:1}
  .learner{padding:18px 18px;font-size:16px}.sec-h .hint{display:none}
}
@media print{
  @page{size:A4;margin:14mm 14mm 16mm}
  body{background:#fff;font-size:11pt}
  .cover{-webkit-print-color-adjust:exact;print-color-adjust:exact;padding:22px 26px 26px;border-radius:12px}
  .cover h1{font-size:26pt;margin-top:16px}
  .print{display:none}
  main.paper{box-shadow:none;margin:0;padding:22px 0 0;border-radius:0;background:#fff;max-width:none}
  .card,.start,.ai-block,.pill,.prompt,.learner{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .card,.row,blockquote,.ev li{break-inside:avoid}
  .learner{border-radius:4px}
  section{margin-top:24px}
  .foot{margin-top:18px}
  a{color:inherit;text-decoration:none}
}`;

function page(o: { title: string; kind: string; heading: string; sub: string; chips: string[]; body: string; foot: string; nonce: string }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Figtree:ital,wght@0,400;0,500;0,600;1,400&display=swap">
<style>${CSS}</style></head>
<body>
<header class="cover"><div class="wrap">
  <div class="topline"><span class="brand">A Mind in English · ${esc(o.kind)}</span><button class="print" id="print" type="button">Print · Save as PDF</button></div>
  <h1>${o.heading}</h1>
  <p class="sub">${o.sub}</p>
  <div class="chips">${o.chips.join('')}</div>
</div></header>
<main class="paper">${o.body}</main>
<footer class="foot">${o.foot}</footer>
<script nonce="${esc(o.nonce)}">document.getElementById('print').addEventListener('click',function(){window.print()});</script>
</body></html>`;
}

const chip = (s: string, accent = false) => `<span class="chip${accent ? ' accent' : ''}">${esc(s)}</span>`;

function sectionsWithNumbers(parts: { title: string; hint?: string; html: string }[]) {
  return parts
    .filter((p) => p.html)
    .map((p, i) => `<section><div class="sec-h"><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${esc(p.title)}</h2>${p.hint ? `<span class="hint">${esc(p.hint)}</span>` : ''}</div>${p.html}</section>`)
    .join('');
}

/* ── Main Write feedback ───────────────────────────────────────────────── */

const OBS: Record<string, [string, string]> = {
  ERROR: ['Error', 'error'],
  AWKWARD: ['Awkward · less natural', 'awkward'],
  REGISTER_MISMATCH: ['Register mismatch', 'register'],
  STYLE_CHOICE: ['Style choice', 'style'],
  STRONG_LANGUAGE: ['Strong language', 'strong'],
};

const DIMENSIONS: [string, string[]][] = [
  ['Task achievement', ['taskAchievement']],
  ['Argument development', ['argumentDevelopment', 'argumentationReasoning']],
  ['Organisation & coherence', ['organisationCoherence', 'organisation']],
  ['Clarity', ['clarity']],
  ['Grammatical accuracy & range', ['grammaticalAccuracyRange', 'grammarAccuracy']],
  ['Lexical precision & range', ['lexicalPrecisionRange', 'vocabularyCollocations', 'lexicalPrecision']],
  ['Naturalness', ['naturalness']],
  ['Register & tone', ['registerTone', 'register']],
  ['Hedging & stance', ['hedgingStance']],
  ['Cohesion & pragmatics', ['cohesionPragmatics', 'cohesion']],
  ['Unnecessary repetition', ['unnecessaryRepetition']],
];

function dimensionCard(title: string, sec: any) {
  if (!sec) return '';
  const summary = typeof sec === 'string' ? sec : sec.summary;
  return `<div class="card"><h3>${esc(title)}</h3>${summary ? `<p>${esc(summary)}</p>` : ''}${
    sec.strengths?.length ? `<div class="k good">Working</div>${list(sec.strengths, 'good-list')}` : ''}${
    sec.improvements?.length ? `<div class="k sharp">To sharpen</div>${list(sec.improvements, 'sharp-list')}` : ''}</div>`;
}

export function renderMainWriteHtml(d: ExportFeedbackData, nonce: string): string {
  const f = d.feedback || {};
  const draftLabel = d.draft === 'revised' ? 'Draft 2' : 'Draft 1';
  const dims = DIMENSIONS.map(([title, keys]) => dimensionCard(title, keys.map((k) => f[k]).find(Boolean))).filter(Boolean);

  const observations = (f.observations || []).map((o: any) => {
    const [label, cls] = OBS[o.type] || [String(o.type || 'Note'), 'style'];
    return `<div class="card"><span class="pill ${cls}">${esc(label)}</span><blockquote>${esc(o.quote)}</blockquote>
      <dl class="row"><dt>What happens</dt><dd>${esc(o.explanation)}</dd>${o.effect ? `<dt>Effect</dt><dd>${esc(o.effect)}</dd>` : ''}${o.revisionStrategy ? `<dt>How to revise</dt><dd>${esc(o.revisionStrategy)}</dd>` : ''}${o.microExample ? `<dt>Micro-example</dt><dd><i>${esc(o.microExample)}</i> <span class="muted">(different context)</span></dd>` : ''}</dl></div>`;
  }).join('');

  const recurring = (f.recurringErrors || []).map((r: any) => `<div class="card"><h3>${esc(r.pattern)}</h3>${r.explanation ? `<p>${esc(r.explanation)}</p>` : ''}${(r.examples || []).map((x: string) => `<blockquote>${esc(x)}</blockquote>`).join('')}</div>`).join('');

  const isolated = [
    ...(f.isolatedErrors || []).map((x: any) => ({ a: x.original, b: x.correction, why: x.note })),
    ...(f.corrections || []).map((x: any) => ({ a: x.original, b: x.corrected, why: x.explanation })),
  ].map((x) => `<div class="card"><dl class="row"><dt>You wrote</dt><dd><s>${esc(x.a)}</s></dd><dt>Correct form</dt><dd>${esc(x.b)}</dd>${x.why ? `<dt>Why</dt><dd>${esc(x.why)}</dd>` : ''}</dl></div>`).join('');

  const errorLog = (f.suggestedErrorLog || []).map((e: any) => `<div class="card"><dl class="row"><dt>Yours</dt><dd><s>${esc(e.mine)}</s></dd><dt>Correct</dt><dd>${esc(e.corr)}</dd><dt>Rule</dt><dd>${esc(e.why)}</dd>${e.ex ? `<dt>New example</dt><dd><i>${esc(e.ex)}</i></dd>` : ''}</dl></div>`).join('');

  const body = sectionsWithNumbers([
    { title: 'The task', html: d.taskPrompt ? `<div class="prompt">${esc(d.taskPrompt)}</div><p class="words">${esc(d.taskObjective)}</p>` : '' },
    { title: `Your text · ${draftLabel}`, hint: `${d.words} words`, html: `<div class="learner">${esc(d.learnerText)}</div>` },
    { title: 'What already works', html: f.strengthsSummary?.length ? list(f.strengthsSummary, 'good-list') : '' },
    { title: d.draft === 'revised' ? 'Priorities for your next revision' : 'Start here · priorities for Draft 2', html: f.nextDraftPriorities?.length ? `<div class="start"><ol>${f.nextDraftPriorities.map((p: string) => `<li>${esc(p)}</li>`).join('')}</ol></div>` : '' },
    { title: 'Diagnosis by dimension', html: dims.length ? `<div class="grid">${dims.join('')}</div>` : '' },
    { title: 'Specific observations', hint: plural((f.observations || []).length, 'excerpt'), html: observations ? `<p class="lead">Each excerpt is classified. Only <b>Error</b> means something is wrong; the others are about naturalness, register, a valid choice, or language worth keeping.</p>${observations}` : '' },
    { title: 'Questions for you as the writer', html: list(f.questionsForWriter) },
    { title: 'Recurring patterns', html: recurring },
    { title: 'Isolated errors', html: isolated },
    { title: 'Suggested Error Log entries', html: errorLog },
    { title: 'Estimated level of this piece', html: f.estimatedLevel ? `<p><b>${esc(f.estimatedLevel.level)}</b> · <span class="muted">${esc(f.estimatedLevel.rationale)}</span></p><p class="muted">An AI estimate for this one text, not a measure of your English.</p>` : '' },
  ]);

  const chips = [
    chip(`${day(d.createdAt)} · ${time(d.createdAt)}`),
    chip(`${draftLabel} · ${d.words} words`, true),
    chip(d.supportUsed ? 'Writing support used' : 'Writing support: not recorded'),
    d.revisionExists ? chip('Draft 2 written') : '',
  ].filter(Boolean);

  return page({
    nonce,
    title: `Main Write feedback · Unit ${d.unit} · ${d.taskTitle}`,
    kind: 'Main Write feedback',
    heading: esc(d.taskTitle),
    sub: `Unit ${esc(d.unit)} · ${esc(d.unitTitle)} · ${esc(d.taskKind)}`,
    chips,
    body,
    foot: `Model ${esc(d.model)} · prompt ${esc(d.promptVersion)}<br>Feedback diagnoses; it never rewrites your text. Exporting makes no AI call.`,
  });
}

/* ── Learning Review ───────────────────────────────────────────────────── */

const ORIGIN: Record<string, string> = { learner: 'Your work', check: 'Checked answer', record: 'Your record', ai: 'Earlier AI feedback' };
const JUDGMENT: Record<string, string> = { agree: 'You agreed with this interpretation.', disagree: 'You disagreed with this interpretation.', not_sure: 'You were not sure about this interpretation.' };

function evidence(refs: EvRef[], title: string) {
  if (!refs || !refs.length) return '';
  return `<div class="ev"><span class="pill fact">${esc(title)}</span><ul>${refs.map((r) => `<li><span class="src">${esc(ORIGIN[r.origin] || r.origin)} · ${esc(r.label)}${r.at ? ` · ${esc(day(r.at))}` : ''}</span><q>${esc(r.snippet)}</q></li>`).join('')}</ul></div>`;
}

function observation(o: ReportObservation) {
  return `<div class="card"><h3>${esc(o.label)}</h3>
    <p class="meta"><span class="pill">${esc(STATUS_LABEL[o.status] || o.status)}</span><span class="pill">${esc(o.confidence)} confidence</span> ${plural(o.evidenceCount, 'piece')} of evidence · ${plural(o.activityCount, 'activity', 'activities')} · first seen ${esc(day(o.firstSeen))} · last seen ${esc(day(o.lastSeen))}</p>
    <div class="ai-block"><span class="pill ai">AI interpretation</span><p style="margin-top:8px">${esc(o.interpretation)}</p>${o.implication ? `<p class="muted">${esc(o.implication)}</p>` : ''}</div>
    ${o.humanJudgment ? `<p class="judge"><span class="pill human">Your judgment</span> ${esc(JUDGMENT[o.humanJudgment] || o.humanJudgment)}</p>` : ''}
    ${evidence(o.evidence, 'Fact · evidence')}${evidence(o.counterEvidence, 'Fact · counter-evidence')}</div>`;
}

function proposal(p: ReportProposal) {
  return `<div class="card"><span class="pill prop">Proposal · ${esc(p.action)} · not applied</span><h3 style="margin-top:10px">${esc(p.activityLabel)}</h3>
    <dl class="row"><dt>Current objective</dt><dd>${esc(p.currentObjective)}</dd><dt>Pattern</dt><dd>${esc(p.patterns.join('; '))}</dd><dt>Why</dt><dd>${esc(p.rationale)}</dd><dt>Proposed change</dt><dd>${esc(p.proposedChange)}</dd><dt>Workload</dt><dd>${esc(p.workloadImpact)}</dd><dt>Constraints</dt><dd>${list(p.constraints)}</dd><dt>Risks</dt><dd>${esc(p.risks)}</dd></dl>
    ${evidence(p.evidence, 'Fact · evidence')}</div>`;
}

export function renderLearningReviewHtml(r: LearningReport, nonce: string): string {
  const e = r.evidence, s = r.sections;
  const obs = (items: ReportObservation[]) => (items || []).map(observation).join('');
  const period = r.period.from ? `Evidence from ${day(r.period.from)} to ${day(r.period.to)}` : `All evidence up to ${day(r.period.to)} · first review`;

  const body = `<p class="legend"><span class="pill fact">Fact</span> what you did or a check recorded <span class="pill ai">AI interpretation</span> what the model reads in it <span class="pill human">Your judgment</span> your answer to it <span class="pill prop">Proposal</span> a suggestion, never applied</p>` + sectionsWithNumbers([
    { title: 'What you worked on', hint: 'Fact', html: r.workedOn.map((w) => `<div class="card"><h3>${esc(w.area)}</h3><p>${esc(w.facts)}</p><p class="muted">${esc(w.activities.join(', '))}</p></div>`).join('') },
    { title: 'Getting stronger', html: obs(s.gettingStronger) },
    { title: 'Emerging', html: obs(s.emerging) },
    { title: 'Recurring patterns', html: obs(s.recurring) },
    { title: 'Improving', html: obs(s.improving) },
    { title: 'Recognition → production', html: obs(s.recognitionToProduction) },
    { title: 'Not enough evidence yet', html: s.notEnoughEvidence.map((n) => `<div class="card"><h3>${esc(n.label)}</h3><p class="muted">${esc(n.note)}</p>${evidence(n.evidence, 'Fact · evidence')}</div>`).join('') },
    { title: 'Next session', hint: 'AI suggestion', html: r.nextSession.length ? `<div class="start"><ol>${r.nextSession.map((n) => `<li><b>${esc(n.action)}</b><br><span class="muted">${esc(n.why)}</span></li>`).join('')}</ol></div>` : '' },
    { title: 'Proposed adaptations', html: r.proposals.length ? `<p class="lead">For the next unit you have not started. Nothing has been changed: a person decides.</p>${r.proposals.map(proposal).join('')}` : '<p class="empty">None. The evidence in this period does not justify changing the next unit.</p>' },
    { title: 'Warnings and uncertainties', html: r.warnings.length || r.uncertainties.length ? `<ul>${r.warnings.map((w) => `<li><span class="pill fact">Fact</span> ${esc(w)}</li>`).join('')}${r.uncertainties.map((u) => `<li><span class="pill ai">AI</span> ${esc(u)}</li>`).join('')}</ul>` : '' },
    { title: 'Evidence considered', hint: plural(e.activities.length, 'activity', 'activities'), html: e.activities.length ? `<ul class="cols">${e.activities.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>` : '' },
  ]);

  const chips = [
    chip(plural(e.total, 'new item'), true),
    chip(`${e.byOrigin.learner} your work`),
    chip(`${e.byOrigin.check} checked`),
    chip(`${e.byOrigin.record} records`),
    chip(`${e.byOrigin.ai} earlier AI feedback`),
    e.deferred ? chip(`${e.deferred} deferred to next review`) : '',
  ].filter(Boolean);

  return page({
    nonce,
    title: `Learning Review · ${day(r.generatedAt)}`,
    kind: 'Learning Review',
    heading: esc(day(r.generatedAt)),
    sub: esc(period),
    chips,
    body,
    foot: `The review observes; it never changes a unit, an answer, your Glossary, Error Log or progress.<br>Exporting makes no AI call.`,
  });
}

/** Sends an exported page: its own strict CSP (with a fresh nonce), never cached, inline or as a download. */
export function sendExportHtml(res: Response, render: (nonce: string) => string, filename: string, download: boolean) {
  const nonce = randomBytes(16).toString('base64');
  res.setHeader('Content-Security-Policy', exportCsp(nonce));
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('Content-Disposition', `${download ? 'attachment' : 'inline'}; filename="${filename.replace(/[^A-Za-z0-9._-]/g, '_')}"`);
  res.send(render(nonce));
}
