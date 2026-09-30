import type { ExportFeedbackData } from '../ai/feedbackExport';
import { esc, page, dayTime, day, two } from './theme';

/* Main Write feedback export, laid out as the approved model (modelo pdf/main-write.pdf).
   Content: only the persisted analysis (snapshot, feedback, recorded metadata); empty parts are left out,
   and what an older analysis did not record is said to be not recorded. */

const DIMENSIONS: [string, string][] = [
  ['taskAchievement', 'Task achievement'], ['argumentDevelopment', 'Argument development'], ['argumentationReasoning', 'Argument & reasoning'],
  ['organisationCoherence', 'Organisation & coherence'], ['organisation', 'Organisation'], ['clarity', 'Clarity'], ['cohesion', 'Cohesion'],
  ['grammaticalAccuracyRange', 'Grammatical accuracy & range'], ['grammarAccuracy', 'Grammatical accuracy'],
  ['lexicalPrecisionRange', 'Lexical precision & range'], ['vocabularyCollocations', 'Vocabulary & collocations'], ['lexicalPrecision', 'Lexical precision'],
  ['registerTone', 'Register & tone'], ['register', 'Register'], ['naturalness', 'Naturalness'], ['hedgingStance', 'Hedging & stance'],
  ['cohesionPragmatics', 'Cohesion & pragmatics'], ['unnecessaryRepetition', 'Unnecessary repetition'],
];
const CHIP: Record<string, [string, string]> = {
  STRONG_LANGUAGE: ['strong', 'Strong language'], AWKWARD: ['awkward', 'Awkward · less natural'], STYLE_CHOICE: ['style', 'Style choice'],
  ERROR: ['error', 'Error'], REGISTER_MISMATCH: ['register', 'Register mismatch'],
};
const arr = (v: unknown): any[] => (Array.isArray(v) ? v.filter((x) => x != null && x !== '') : []);
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

function supportPill(d: ExportFeedbackData): string {
  if (d.supportUsed === true) {
    const when = d.supportOpenedBeforeWriting === true ? ' · opened before writing' : d.supportOpenedBeforeWriting === false ? ' · opened after starting' : '';
    return `Writing support: used${when}${d.supportLevel ? ` · ${d.supportLevel}` : ''}`;
  }
  if (d.supportUsed === false) return `Writing support: not used${d.supportLevel ? ` · ${d.supportLevel} chosen` : ''}`;
  return 'Writing support: not recorded';
}

export function mainWriteHtml(d: ExportFeedbackData): string {
  const f = d.feedback || {};
  const draftLabel = d.draft === 'revised' ? 'Draft 2' : 'Draft 1';
  let n = 0;
  // A heading never ends a page alone: it is kept with its intro and the first block; the rest flows.
  // inner may be one block or [intro, ...blocks].
  const sec = (title: string, inner: string | string[], tag = '') => {
    const blocks = Array.isArray(inner) ? inner.filter(Boolean) : [inner];
    const head = `<div class="sec-h"><span class="n">${two(++n)}</span><h2>${esc(title)}</h2>${tag ? `<span class="tag">${esc(tag)}</span>` : ''}</div>`;
    const firstBlock = blocks.findIndex((b) => !b.startsWith('<p'));
    const lead = firstBlock < 0 ? blocks.length : firstBlock + 1;
    // Short openings stay with their heading; a long one (a whole draft, a very long card) must be free to
    // start on the same page and flow on, or the heading would push it away and leave an empty page.
    const leadHtml = blocks.slice(0, lead).join('');
    const keepable = leadHtml.replace(/<[^>]+>/g, '').length < 1800;
    return `<section class="sec${n === 1 ? ' first' : ''}">${keepable ? `<div class="keep">${head}${leadHtml}</div>` : `${head}${leadHtml}`}${blocks.slice(lead).join('')}</section>`;
  };
  const parts: string[] = [];

  parts.push(`<header class="hero"><div class="eyebrow">A Mind in English · Main Write feedback</div>
    <h1>${esc(d.taskTitle)}</h1>
    <div class="sub">Unit ${esc(d.unit)} · ${esc(d.unitTitle)}${d.taskKind ? ` · ${esc(d.taskKind)}` : ''}</div>
    <div class="pills">${d.createdAt ? `<span class="pill">${esc(dayTime(d.createdAt))}</span>` : ''}<span class="pill hi">${draftLabel} · ${Number(d.words) || 0} words</span><span class="pill">${esc(supportPill(d))}</span></div></header>`);

  if (d.taskPrompt) parts.push(sec('The task', `<div class="task">${esc(d.taskPrompt)}</div><div class="under">${esc(d.taskObjective.replace(/^Target:\s*/i, 'Target: '))}</div>`));

  parts.push(sec(`Your text · ${draftLabel}`, d.learnerText
    ? `<div class="draft">${esc(d.learnerText)}</div><p class="note">${d.snapshot ? 'Exactly the text that was analysed.' : ''}</p>`
    : `<div class="draft missing">The analysed text was not recorded for this earlier analysis. The current draft is not shown in its place.</div>`,
    `${Number(d.words) || 0} words`));

  if (d.revision) parts.push(sec(`Draft 2 ${d.revision.snapshot ? '· as analysed' : '· not analysed yet'}`,
    `<div class="draft">${esc(d.revision.text)}</div>${d.revision.snapshot && d.revision.analysedAt ? `<p class="note">Analysed on ${esc(day(d.revision.analysedAt))}.</p>` : '<p class="note">Your current Draft 2. It has not been analysed yet.</p>'}`));

  const strengths = arr(f.strengthsSummary);
  if (strengths.length) parts.push(sec('What already works', `<ul class="dots">${strengths.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`));

  const pri = arr(f.nextDraftPriorities);
  if (pri.length) parts.push(sec(d.draft === 'revised' ? 'Start here · priorities for your next revision' : 'Start here · priorities for Draft 2', `<div class="pink"><ol class="pri">${pri.map((p) => `<li>${esc(p)}</li>`).join('')}</ol></div>`));

  const dims = DIMENSIONS.map(([k, label]) => [label, f[k]] as [string, any]).filter(([, s]) => s && (str(s.summary) || arr(s.strengths).length || arr(s.improvements).length));
  const dimCard = ([label, s]: [string, any]) => `<div class="card"><h3>${esc(label)}</h3>${str(s.summary) ? `<p>${esc(s.summary)}</p>` : ''}${arr(s.strengths).length ? `<div class="lab ok">Working</div><ul class="dots">${arr(s.strengths).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${arr(s.improvements).length ? `<div class="lab rose">To sharpen</div><ul class="dots rose">${arr(s.improvements).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</div>`;
  const rows: string[] = [];
  for (let i = 0; i < dims.length; i += 2) rows.push(`<div class="grid2 row">${dims.slice(i, i + 2).map(dimCard).join('')}</div>`);
  if (dims.length) parts.push(sec('Diagnosis by dimension', rows));

  const obs = arr(f.observations);
  if (obs.length) parts.push(sec('Specific observations', [`<p class="muted" style="margin-bottom:10pt">Each excerpt is classified. Only <b style="color:var(--text)">Error</b> means something is wrong; the others are about naturalness, register, a valid choice, or language worth keeping.</p>`, ...obs.map((o) => {
    const [cls, label] = CHIP[o.type] || ['style', String(o.type || 'Observation').replace(/_/g, ' ')];
    return `<div class="card"><span class="chip ${cls}">${esc(label)}</span>${str(o.quote) ? `<div class="quote">${esc(o.quote)}</div>` : ''}<table class="kv">${[['What happens', o.explanation], ['Effect', o.effect], ['How to revise', o.revisionStrategy], ['Micro-example', o.microExample]].filter(([, v]) => str(v)).map(([k, v]) => `<tr><td class="k">${k}</td><td>${esc(v)}</td></tr>`).join('')}</table></div>`;
  })], `${obs.length} excerpt${obs.length === 1 ? '' : 's'}`));

  const rec = arr(f.recurringErrors);
  const iso = arr(f.isolatedErrors);
  if (rec.length || iso.length) parts.push(sec('Errors to look at', [
    ...rec.map((r) => `<div class="card"><span class="chip error">Recurring</span><table class="kv" style="margin-top:8pt"><tr><td class="k">Pattern</td><td>${esc(r.pattern)}</td></tr>${arr(r.examples).length ? `<tr><td class="k">In your text</td><td>${arr(r.examples).map((x) => `<i>${esc(x)}</i>`).join('<br>')}</td></tr>` : ''}${str(r.explanation) ? `<tr><td class="k">Why</td><td>${esc(r.explanation)}</td></tr>` : ''}</table></div>`),
    ...iso.map((r) => `<div class="card"><span class="chip error">Isolated</span><table class="kv" style="margin-top:8pt"><tr><td class="k">Yours</td><td class="strike">${esc(r.original)}</td></tr><tr><td class="k">Correct</td><td>${esc(r.correction)}</td></tr>${str(r.note) ? `<tr><td class="k">Note</td><td>${esc(r.note)}</td></tr>` : ''}</table></div>`),
  ]));

  const qs = arr(f.questionsForWriter);
  if (qs.length) parts.push(sec('Questions for you as the writer', `<ul class="dots plain">${qs.map((q) => `<li>${esc(q)}</li>`).join('')}</ul>`));

  const log = arr(f.suggestedErrorLog);
  if (log.length) parts.push(sec('Suggested Error Log entries', log.map((e) => `<div class="card"><table class="kv">${str(e.mine) ? `<tr><td class="k">Yours</td><td class="strike">${esc(e.mine)}</td></tr>` : ''}${str(e.corr) ? `<tr><td class="k">Correct</td><td>${esc(e.corr)}</td></tr>` : ''}${str(e.why) ? `<tr><td class="k">Rule</td><td>${esc(e.why)}</td></tr>` : ''}${str(e.ex) ? `<tr><td class="k">New example</td><td><i>${esc(e.ex)}</i></td></tr>` : ''}</table></div>`)));

  if (f.estimatedLevel && str(f.estimatedLevel.level)) parts.push(sec('Estimated level of this piece', `<p><b style="font-weight:600">${esc(f.estimatedLevel.level)}</b>${str(f.estimatedLevel.rationale) ? ` <span class="muted">· ${esc(f.estimatedLevel.rationale)}</span>` : ''}</p><p class="muted" style="margin-top:6pt">An AI estimate for this one text, not a measure of your English.</p>`));

  parts.push(`<div class="foot">Model ${esc(d.model || 'not recorded')} · prompt ${esc(d.promptVersion || 'not recorded')}${d.expectedRegister ? ` · expected register ${esc(String(d.expectedRegister).replace(/_/g, ' '))}` : ''}<br>Feedback diagnoses; it never rewrites your text. Exporting makes no AI call.</div>`);
  return page(`Main Write feedback · Unit ${d.unit}`, parts.join('\n'));
}
