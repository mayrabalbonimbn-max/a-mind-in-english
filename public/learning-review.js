/* A MIND IN ENGLISH · learning-review.js
   LEARNING REVIEW: reads the latest review, runs the one pipeline on demand, exports PDF/Markdown.
   It observes; it never changes a unit, an answer, the Glossary, the Error Log, progress or the
   profile, and it has no "apply" action: proposals are specifications for a human to decide on.
   Every block says what it is: FACT (your work, checks, records), AI INTERPRETATION, PROPOSAL. */
(function () {
  'use strict';
  let D = null;                 // deps from app.js: { main, esc, isDemo, needSignIn, state, save }
  let DATA = null;              // last GET /api/learning-review
  let RUNNING = false;          // survives re-renders (a sync can re-render the page mid-run)
  let NOTICE = null;            // { kind: 'info'|'error', text }

  const esc = s => (D ? D.esc(s) : String(s == null ? '' : s));
  const day = iso => iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const STATUS = {
    one_off: 'one-off', possible_pattern: 'possible pattern', recurring: 'recurring', improving: 'improving', apparently_resolved: 'apparently resolved',
    emerging: 'emerging', getting_stronger: 'getting stronger', recognition_to_production: 'recognition → production', rejected_by_human: 'rejected by you',
  };
  const ORIGIN = { learner: 'your work', check: 'checked answer', record: 'your record', ai: 'earlier AI feedback' };
  const plural = (n, one, many) => `${n} ${n === 1 ? one : (many || one + 's')}`;

  async function api(path, opts) {
    try {
      const res = await fetch(path, Object.assign({ credentials: 'include', headers: { Accept: 'application/json', 'Content-Type': 'application/json' } }, opts || {}));
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    } catch (e) { return { ok: false, status: 0, data: {} }; }
  }

  function evidenceList(refs, title) {
    if (!refs || !refs.length) return '';
    return `<div class="lr-ev"><div class="lr-tag fact">${esc(title || 'Fact · evidence')}</div><ul>${refs.map(r => `<li><span class="lr-src">${esc(ORIGIN[r.origin] || r.origin)} · ${esc(r.label)}${r.at ? ' · ' + esc(day(r.at)) : ''}${r.provenance ? ' (' + esc(r.provenance) + ')' : ''}</span><q>${esc(r.snippet)}</q></li>`).join('')}</ul></div>`;
  }

  function judgmentControls(o) {
    const key = o.key || o.label;
    const current = o.humanJudgment || null;
    return `<div class="lr-judge-box" data-pattern-key="${esc(key)}">
      <span class="lr-judge-lbl">Your evaluation:</span>
      <div class="lr-judge-btns">
        <button type="button" class="btn line xs lr-jbtn ${current === 'agree' ? 'active' : ''}" data-lr-judge="agree" data-lr-key="${esc(key)}">Agree</button>
        <button type="button" class="btn line xs lr-jbtn ${current === 'disagree' ? 'active' : ''}" data-lr-judge="disagree" data-lr-key="${esc(key)}">Disagree</button>
        <button type="button" class="btn line xs lr-jbtn ${current === 'not_sure' ? 'active' : ''}" data-lr-judge="not_sure" data-lr-key="${esc(key)}">Not sure</button>
      </div>
    </div>`;
  }

  function observation(o) {
    const n = o.evidenceCount + (o.counterEvidence || []).length;
    return `<article class="lr-obs" data-status="${esc(o.status)}">
      <h4>${esc(o.label)}</h4>
      <p class="lr-meta"><span class="tago">${esc(STATUS[o.status] || o.status)}</span><span class="tago">${esc(o.confidence)} confidence</span><span>${plural(o.evidenceCount, 'piece')} of evidence · ${plural(o.activityCount, 'activity', 'activities')} · first seen ${esc(day(o.firstSeen))} · last seen ${esc(day(o.lastSeen))}</span></p>
      <div class="lr-ai"><div class="lr-tag ai">AI interpretation</div><p>${esc(o.interpretation)}</p>${o.implication ? `<p class="muted">${esc(o.implication)}</p>` : ''}</div>
      ${judgmentControls(o)}
      <details class="lr-more"><summary>see the evidence (${n}) <span aria-hidden="true">→</span></summary>${evidenceList(o.evidence)}${evidenceList(o.counterEvidence, 'Fact · counter-evidence / where it went well')}</details>
    </article>`;
  }

  function section(title, items, render) {
    if (!items || !items.length) return '';
    return `<section class="lr-sec"><h3>${esc(title)}</h3>${items.map(render).join('')}</section>`;
  }

  function proposal(p) {
    return `<article class="lr-prop">
      <div class="lr-tag prop">Proposal · ${esc(p.action)} · not applied</div>
      <h4>${esc(p.activityLabel)}</h4>
      <dl>
        <dt>Current objective</dt><dd>${esc(p.currentObjective)}</dd>
        <dt>Pattern</dt><dd>${esc(p.patterns.join('; '))}</dd>
        <dt>Why</dt><dd>${esc(p.rationale)}</dd>
        <dt>Proposed change</dt><dd>${esc(p.proposedChange)}</dd>
        <dt>Workload</dt><dd>${esc(p.workloadImpact)}</dd>
        <dt>Constraints</dt><dd><ul>${p.constraints.map(c => `<li>${esc(c)}</li>`).join('')}</ul></dd>
        <dt>Risks</dt><dd>${esc(p.risks)}</dd>
      </dl>
      <details class="lr-more"><summary>see the evidence (${p.evidence.length}) <span aria-hidden="true">→</span></summary>${evidenceList(p.evidence)}</details>
    </article>`;
  }

  function reportHtml(r) {
    const e = r.evidence, s = r.sections;
    const period = r.period.from ? `Evidence from ${day(r.period.from)} to ${day(r.period.to)}` : `All evidence up to ${day(r.period.to)} · first review`;
    const body = [
      r.workedOn.length ? `<section class="lr-sec"><h3>What you worked on</h3><div class="lr-tag fact">Fact</div>${r.workedOn.map(w => `<p class="lr-worked"><b>${esc(w.area)}</b> · ${esc(w.facts)}<br><span class="muted">${esc(w.activities.join(', '))}</span></p>`).join('')}</section>` : '',
      section('Getting stronger', s.gettingStronger, observation),
      section('Emerging', s.emerging, observation),
      section('Recurring patterns', s.recurring, observation),
      section('Improving', s.improving, observation),
      section('Recognition → production', s.recognitionToProduction, observation),
      section('Not enough evidence yet', s.notEnoughEvidence, n => `<article class="lr-obs"><h4>${esc(n.label)}</h4><p class="muted">${esc(n.note)}</p>${n.evidence.length ? `<details class="lr-more"><summary>see the evidence (${n.evidence.length}) <span aria-hidden="true">→</span></summary>${evidenceList(n.evidence)}</details>` : ''}</article>`),
      section('Next session', r.nextSession, (n, i) => `<article class="lr-next"><div class="lr-tag ai">AI suggestion</div><h4>${esc(n.action)}</h4><p class="muted">${esc(n.why)}</p>${n.evidence.length ? `<details class="lr-more"><summary>see the evidence (${n.evidence.length}) <span aria-hidden="true">→</span></summary>${evidenceList(n.evidence)}</details>` : ''}</article>`),
      `<section class="lr-sec"><h3>Proposed adaptations</h3>${r.proposals.length ? '<p class="muted">For the next unit you have not started. Nothing has been changed: a person decides whether to adapt anything.</p>' + r.proposals.map(proposal).join('') : '<p class="muted">None. The evidence in this period does not justify changing the next unit.</p>'}</section>`,
      (r.warnings.length || r.uncertainties.length) ? `<section class="lr-sec"><h3>Warnings and uncertainties</h3><ul class="lr-warn">${r.warnings.map(w => `<li><span class="lr-tag fact">Fact</span> ${esc(w)}</li>`).join('')}${r.uncertainties.map(u => `<li><span class="lr-tag ai">AI</span> ${esc(u)}</li>`).join('')}</ul></section>` : '',
    ].join('');
    return `<div class="lr-report" id="lr-report">
      <header class="lr-head"><div class="kl">Learning review</div><h2>${esc(day(r.generatedAt))}</h2><p class="muted">${esc(period)} · ${plural(e.total, 'new item')} (${e.byOrigin.learner} of your own work, ${e.byOrigin.check} checked, ${e.byOrigin.record} records, ${e.byOrigin.ai} earlier AI feedback)${e.deferred ? ` · ${e.deferred} more next time` : ''}</p>
        <p class="lr-legend"><span class="lr-tag fact">Fact</span> what you did or a check recorded <span class="lr-tag ai">AI interpretation</span> what the model reads in it <span class="lr-tag prop">Proposal</span> a suggestion, never applied</p>
        <div class="lr-head-acts" style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
          <a class="btn line sm" data-lr="pdf" href="/api/learning-review/runs/${esc(r.runId)}/export?format=pdf" download>export PDF →</a>
          <a class="btn line sm" data-lr="md" href="/api/learning-review/runs/${esc(r.runId)}/export?format=md" download>export Markdown →</a>
        </div></header>
      ${body}</div>`;
  }

  function controlsHtml() {
    const d = DATA || {};
    if (d.isDemo) return `<div class="lr-box"><p>The Learning Review is not available in Demo Mode.</p></div>`;
    if (d.available === false) return `<div class="lr-box"><p>The Learning Review is not configured on this server yet. Your work is safe; nothing is analysed.</p></div>`;
    const pending = d.pending || 0;
    const studyMins = d.studyMinutes !== undefined ? d.studyMinutes : 0;
    const failed = d.lastRun && d.lastRun.status === 'failed' && (!d.report || d.lastRun.startedAt > d.report.generatedAt);
    return `<div class="lr-box">
      <p class="lr-uses"><b>Uses AI</b> · one request, and only when there is new evidence since your last review. <b>Nothing is changed</b>: no unit, answer, Glossary or Error Log entry, progress or profile.</p>
      <p class="lr-study-info" style="font-size:14px;margin:8px 0;color:var(--ink-light)">Active study accumulated since last review: <b>${studyMins} min</b>. <span class="muted">(Nightly automated review eligibility threshold: 60 min).</span></p>
      <p class="lr-pending" id="lr-pending">${RUNNING ? '' : pending ? `${plural(pending, 'new item')} since your last review.` : 'Nothing new since your last review.'}</p>
      <div class="lr-acts"><button class="btn dark" data-lr="run" ${RUNNING ? 'disabled aria-busy="true"' : ''}>${RUNNING ? 'reviewing…' : 'run review now →'}</button></div>
      <p class="lr-status" role="status" aria-live="polite">${RUNNING ? 'Reading your new evidence. This can take up to a minute; you can keep studying in another tab.' : NOTICE ? esc(NOTICE.text) : failed ? `The last attempt (${esc(day(d.lastRun.startedAt))}) could not be completed. The review below is unchanged.` : ''}</p>
    </div>`;
  }

  function paint() {
    const m = D ? D.main() : null;
    if (!m || !document.getElementById('lr-page')) return;
    const c = document.getElementById('lr-controls');
    if (c) c.innerHTML = controlsHtml();
    const r = document.getElementById('lr-body');
    if (r) r.innerHTML = DATA && DATA.report ? reportHtml(DATA.report) : (DATA ? '<p class="muted lr-empty">No review yet. When you have studied, run your first review above.</p>' : '<p class="muted">Loading…</p>');
  }

  async function setJudgment(patternKey, judgment) {
    if (!patternKey || !judgment) return;
    if (D && D.isDemo && D.isDemo()) { return; }
    // Update local DATA in-place
    if (DATA && DATA.report && DATA.report.sections) {
      const s = DATA.report.sections;
      const allObs = [
        ...(s.gettingStronger || []),
        ...(s.emerging || []),
        ...(s.recurring || []),
        ...(s.improving || []),
        ...(s.recognitionToProduction || []),
      ];
      const target = allObs.find(o => (o.key || o.label) === patternKey);
      if (target) {
        target.humanJudgment = target.humanJudgment === judgment ? null : judgment;
      }
    }
    paint();
    try {
      await api('/api/learning-review/judgments', {
        method: 'POST',
        body: JSON.stringify({ patternKey, judgment }),
      });
    } catch (err) {
      console.warn('Failed to post judgment', err);
    }
  }

  async function load() {
    const r = await api('/api/learning-review');
    if (r.status === 401) { D.needSignIn && D.needSignIn(); return; }
    DATA = r.ok ? r.data : { available: false };
    paint();
  }

  async function run() {
    if (RUNNING) return;                         // double submit: one run per click, per tab
    RUNNING = true; NOTICE = null; paint();
    try {
      // Save what was just typed first, so the review sees it
      if (window.KLANG_SYNC && window.KLANG_SYNC.syncPending) { try { await window.KLANG_SYNC.syncPending(); } catch (e) { /* the review still uses what is synced */ } }
      const r = await api('/api/learning-review/run', { method: 'POST', body: '{}' });
      if (r.status === 401) { D.needSignIn && D.needSignIn(); return; }
      if (r.ok && r.data.status === 'no_new_evidence') NOTICE = { kind: 'info', text: 'Nothing new to review yet.' };
      else if (r.ok && r.data.status === 'below_study_threshold') NOTICE = { kind: 'info', text: `Accumulated study time (${r.data.studyMinutes}m) is below the threshold (${r.data.requiredMinutes}m).` };
      else if (r.ok && r.data.status === 'completed') { NOTICE = { kind: 'info', text: 'Review complete.' }; }
      else if (r.status === 409) NOTICE = { kind: 'info', text: 'A review is already running. It will appear here when it finishes.' };
      else if (r.status === 429) NOTICE = { kind: 'error', text: (r.data && r.data.message) || 'Limit reached for this hour. Your previous review is still here.' };
      else NOTICE = { kind: 'error', text: 'The review could not be completed. Your previous review is unchanged, and the same evidence will be used next time.' };
    } finally {
      RUNNING = false;
      await load();
    }
  }

  function render() {
    D.main().innerHTML = `<section class="tpage" id="lr-page"><div class="inner"><div class="eyebrow">Notebook</div><h1>Learning <em>Review</em></h1>
      <p class="intro">An observation of your learning from what you have actually done: your answers, drafts, conversations and records. It looks for progress as much as for difficulty. The AI can suggest; it cannot change your book. You decide.</p>
      <div id="lr-controls"></div><div id="lr-body"></div></div></section>`;
    paint();
    load();
  }

  function onClick(e) {
    const tRun = e.target.closest && e.target.closest('[data-lr="run"]');
    if (tRun) {
      e.preventDefault();
      run();
      return true;
    }
    const tJudge = e.target.closest && e.target.closest('[data-lr-judge]');
    if (tJudge) {
      e.preventDefault();
      const patternKey = tJudge.dataset.lrKey;
      const judgment = tJudge.dataset.lrJudge;
      setJudgment(patternKey, judgment);
      return true;
    }
    return false;
  }

  window.KLANG_LEARNING_REVIEW = {
    attach(deps) { D = deps; },
    render,
    onClick,
    _state: () => ({ RUNNING, NOTICE, DATA }),
  };
})();
