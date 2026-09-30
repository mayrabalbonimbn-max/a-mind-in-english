import type { EvRef, LearningReport, ReportObservation } from '../learningReview/merge';
import { esc, page, day, two } from './theme';

/* Learning Review export, laid out as the approved model (modelo pdf/learning-review.pdf).
   Content: the persisted report with the learner's current judgments; FACT, AI INTERPRETATION,
   YOUR JUDGMENT and PROPOSAL are always labelled. No ids, tokens, prompts or model reasoning. */

const STATUS: Record<string, string> = {
  one_off: 'One-off', possible_pattern: 'Possible pattern', recurring: 'Recurring', improving: 'Improving', apparently_resolved: 'Apparently resolved',
  emerging: 'Emerging', getting_stronger: 'Getting stronger', recognition_to_production: 'Recognition → production', rejected_by_human: 'Rejected by you',
};
const ORIGIN: Record<string, string> = { learner: 'Your work', check: 'Checked answer', record: 'Your record', ai: 'Earlier AI feedback' };
const JUDGED: Record<string, string> = { agree: 'You agreed with this interpretation.', disagree: 'You disagreed with this interpretation.', not_sure: 'You were not sure about this interpretation.' };
const plural = (k: number, one: string, many = `${one}s`) => `${k} ${k === 1 ? one : many}`;

const evidence = (refs: EvRef[], title: string) => (refs && refs.length ? `<div class="dash"></div><span class="chip fact">${esc(title)}</span>${refs.map((r) => `<div class="ev"><div class="src">${esc(ORIGIN[r.origin] || r.origin)} · ${esc(r.label)}${r.at ? ` · ${esc(day(r.at))}` : ''}</div>${r.snippet ? `<q>${esc(r.snippet)}</q>` : ''}</div>`).join('')}` : '');

function observation(o: ReportObservation): string {
  const meta = `${plural(o.evidenceCount, 'piece')} of evidence · ${plural(o.activityCount, 'activity', 'activities')}${o.firstSeen ? ` · first seen ${esc(day(o.firstSeen))}` : ''}${o.lastSeen ? ` · last seen ${esc(day(o.lastSeen))}` : ''}`;
  // A card too long for one page flows (it may still start on the current page); shorter cards stay whole
  const long = [o.interpretation, o.implication, ...o.evidence.map((r) => r.snippet), ...o.counterEvidence.map((r) => r.snippet)].join(' ').length > 1500;
  return `<div class="card${long ? ' flow' : ''}"><h3>${esc(o.label)}</h3>
    <div class="meta"><span class="chip out">${esc(STATUS[o.status] || o.status)}</span><span class="chip out">${esc(o.confidence)} confidence</span>${meta}${o.opportunitySummary ? `<br>${esc(o.opportunitySummary)}` : ''}</div>
    <div class="aibox"><div class="lab">AI interpretation</div><p>${esc(o.interpretation)}</p>${o.implication ? `<p class="impl">${esc(o.implication)}</p>` : ''}</div>
    ${o.humanJudgment ? `<div class="judge-row"><span class="chip judge">Your judgment</span>${esc(JUDGED[o.humanJudgment] || o.humanJudgment)}</div>` : ''}
    ${evidence(o.evidence, 'Fact · evidence')}${evidence(o.counterEvidence, 'Fact · counter-evidence')}</div>`;
}

export function learningReviewHtml(r: LearningReport): string {
  const e = r.evidence, s = r.sections;
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
    return `<section class="sec">${keepable ? `<div class="keep">${head}${leadHtml}</div>` : `${head}${leadHtml}`}${blocks.slice(lead).join('')}</section>`;
  };
  const parts: string[] = [];
  const o = e.byOrigin || ({} as any);
  const pills = [
    `<span class="pill hi">${plural(e.total, 'new item')}</span>`,
    o.learner ? `<span class="pill">${o.learner} your work</span>` : '',
    o.check ? `<span class="pill">${o.check} checked</span>` : '',
    o.record ? `<span class="pill">${plural(o.record, 'record')}</span>` : '',
    o.ai ? `<span class="pill">${o.ai} earlier AI feedback</span>` : '',
    e.deferred ? `<span class="pill">${e.deferred} more next time</span>` : '',
  ].join('');
  parts.push(`<header class="hero"><div class="eyebrow">A Mind in English · Learning Review</div><h1>${esc(day(r.generatedAt))}</h1>
    <div class="sub">${r.period.from ? `Evidence from ${esc(day(r.period.from))} to ${esc(day(r.period.to))}` : `All evidence up to ${esc(day(r.period.to))} · first review`}</div><div class="pills">${pills}</div></header>
    <div class="legend"><span class="chip fact">Fact</span><span>what you did or a check recorded</span><span class="chip ai">AI interpretation</span><span>what the model reads in it</span>
    <span class="chip judge">Your judgment</span><span>your answer to it</span><span class="chip prop">Proposal</span><span>a suggestion, never applied</span></div>`);

  if (r.workedOn.length) parts.push(sec('What you worked on', r.workedOn.map((w) => `<div class="card"><h3>${esc(w.area)}</h3><p>${esc(w.facts)}</p>${w.activities.length ? `<p class="muted" style="margin-top:4pt">${esc(w.activities.join(', '))}</p>` : ''}</div>`), 'Fact'));
  const obsSec = (title: string, list: ReportObservation[]) => { if (list && list.length) parts.push(sec(title, list.map(observation))); };
  obsSec('Getting stronger', s.gettingStronger);
  obsSec('Emerging', s.emerging);
  obsSec('Recurring patterns', s.recurring);
  obsSec('Improving / resolving', s.improving);
  obsSec('Recognition → production', s.recognitionToProduction);
  if (s.notEnoughEvidence.length) parts.push(sec('Not enough evidence yet', s.notEnoughEvidence.map((x) => `<div class="card"><h3>${esc(x.label)}</h3><p class="muted">${esc(x.note)}</p>${evidence(x.evidence, 'Fact · evidence')}</div>`)));
  if (r.nextSession.length) parts.push(sec('Next session', `<div class="pink"><ol class="pri next">${r.nextSession.map((x) => `<li><b>${esc(x.action)}</b><span class="why">${esc(x.why)}</span></li>`).join('')}</ol></div>`, 'AI suggestion'));
  parts.push(sec('Proposed adaptations', r.proposals.length
    ? r.proposals.map((p) => `<div class="card prop"><span class="chip prop">Proposal · ${esc(p.action)} · not applied</span><h3 style="margin-top:7pt">${esc(p.activityLabel)}</h3><p class="muted">Unit ${esc(p.unit)} · ${esc(p.unitTitle)}</p><dl>
        <dt>Current objective</dt><dd>${esc(p.currentObjective)}</dd><dt>Pattern</dt><dd>${esc(p.patterns.join('; '))}</dd><dt>Why</dt><dd>${esc(p.rationale)}</dd>
        <dt>Proposed change</dt><dd>${esc(p.proposedChange)}</dd><dt>Workload</dt><dd>${esc(p.workloadImpact)}</dd>
        ${p.constraints.length ? `<dt>Constraints</dt><dd><ul class="dots plain" style="padding-left:12pt">${p.constraints.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></dd>` : ''}<dt>Risks</dt><dd>${esc(p.risks)}</dd></dl>${evidence(p.evidence, 'Fact · evidence')}</div>`)
    : `<p class="none">None. The evidence in this period does not justify changing the next unit.</p>`));
  if (r.warnings.length || r.uncertainties.length) parts.push(sec('Warnings and uncertainties', `<ul class="dots plain warn">${r.warnings.map((w) => `<li><span class="chip fact">Fact</span>${esc(w)}</li>`).join('')}${r.uncertainties.map((u) => `<li><span class="chip ai">AI</span>${esc(u)}</li>`).join('')}</ul>`));
  if (e.activities && e.activities.length) parts.push(sec('Evidence considered', `<ul class="dots plain cols">${e.activities.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>`, plural(e.activities.length, 'activity', 'activities')));
  parts.push(`<div class="foot">The review observes; it never changes a unit, an answer, your Glossary, Error Log or progress.<br>Exporting makes no AI call.</div>`);
  return page(`Learning Review · ${day(r.generatedAt)}`, parts.join('\n'));
}
