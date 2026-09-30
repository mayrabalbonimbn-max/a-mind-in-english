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
        <button type="button" class="btn line xs lr-jbtn ${current === 'agree' ? 'active' : ''}" data-lr-judge="agree" data-lr-key="${esc(key)}" aria-pressed="${current === 'agree'}">Agree</button>
        <button type="button" class="btn line xs lr-jbtn ${current === 'disagree' ? 'active' : ''}" data-lr-judge="disagree" data-lr-key="${esc(key)}" aria-pressed="${current === 'disagree'}">Disagree</button>
        <button type="button" class="btn line xs lr-jbtn ${current === 'not_sure' ? 'active' : ''}" data-lr-judge="not_sure" data-lr-key="${esc(key)}" aria-pressed="${current === 'not_sure'}">Not sure</button>
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
    // Same persisted report, grouped as the book reads it: each group is shown only when it has content
    let n = 0;
    const group = (title, note, parts, tag = '') => {
      const inner = parts.filter(Boolean).join('');
      if (!inner) return '';
      return `<section class="lr-sec lr-group"><div class="lr-gh"><span class="lr-n">${String(++n).padStart(2, '0')}</span><h3>${esc(title)}</h3>${tag}</div>${note ? `<p class="lr-gsub">${esc(note)}</p>` : ''}${inner}</section>`;
    };
    const sub = (title, items, render) => (items && items.length ? `<div class="lr-sub"><h4 class="lr-subh">${esc(title)}</h4>${items.map(render).join('')}</div>` : '');
    const count = (k, label) => `<div class="lr-stat"><b>${k}</b><span>${esc(label)}</span></div>`;
    const patterns = (s.emerging.length + s.recurring.length + s.recognitionToProduction.length);
    const working = s.gettingStronger.length + s.improving.length;
    const glance = `<div class="lr-glance">${count(e.total, e.total === 1 ? 'new item' : 'new items')}${count(e.byOrigin.learner, 'of your own work')}${count(e.byOrigin.check, 'checked')}${count(e.byOrigin.record, e.byOrigin.record === 1 ? 'record' : 'records')}${count(e.byOrigin.ai, 'earlier feedback')}</div>
      <p class="lr-glance-line muted">${plural(working, 'thing', 'things')} working · ${plural(patterns, 'pattern')} to watch · ${plural(r.nextSession.length, 'step')} for next session · ${plural(r.proposals.length, 'proposal')}${e.deferred ? ` · ${e.deferred} more items next time` : ''}</p>`;
    const body = [
      group('At a glance', period, [glance], '<span class="lr-tag fact">Fact</span>'),
      group("What's working", '', [sub('Getting stronger', s.gettingStronger, observation), sub('Improving', s.improving, observation)]),
      group('Patterns', '', [sub('Emerging', s.emerging, observation), sub('Recurring patterns', s.recurring, observation), sub('Recognition → production', s.recognitionToProduction, observation)]),
      group('Since last review', 'What you worked on', [r.workedOn.map(w => `<p class="lr-worked"><b>${esc(w.area)}</b> · ${esc(w.facts)}<br><span class="muted">${esc(w.activities.join(', '))}</span></p>`).join('')], '<span class="lr-tag fact">Fact</span>'),
      group('Next session', '', [r.nextSession.map(x => `<article class="lr-next"><div class="lr-tag ai">AI suggestion</div><h4>${esc(x.action)}</h4><p class="muted">${esc(x.why)}</p>${x.evidence.length ? `<details class="lr-more"><summary>see the evidence (${x.evidence.length}) <span aria-hidden="true">→</span></summary>${evidenceList(x.evidence)}</details>` : ''}</article>`).join('')]),
      group('Proposals', 'Proposed adaptations · never applied', [r.proposals.length ? '<p class="muted">For the next unit you have not started. Nothing has been changed: a person decides whether to adapt anything.</p>' + r.proposals.map(proposal).join('') : '<p class="muted">None. The evidence in this period does not justify changing the next unit.</p>']),
      group('Uncertainties', 'Warnings and uncertainties', [
        (r.warnings.length || r.uncertainties.length) ? `<ul class="lr-warn">${r.warnings.map(w => `<li><span class="lr-tag fact">Fact</span> ${esc(w)}</li>`).join('')}${r.uncertainties.map(u => `<li><span class="lr-tag ai">AI</span> ${esc(u)}</li>`).join('')}</ul>` : '',
        sub('Not enough evidence yet', s.notEnoughEvidence, x => `<article class="lr-obs"><h4>${esc(x.label)}</h4><p class="muted">${esc(x.note)}</p>${x.evidence.length ? `<details class="lr-more"><summary>see the evidence (${x.evidence.length}) <span aria-hidden="true">→</span></summary>${evidenceList(x.evidence)}</details>` : ''}</article>`),
      ]),
      group('Evidence', 'Evidence considered', [e.activities && e.activities.length ? `<details class="lr-more"><summary>${plural(e.activities.length, 'activity', 'activities')} <span aria-hidden="true">→</span></summary><ul class="lr-evlist">${e.activities.map(x => `<li>${esc(x)}</li>`).join('')}</ul></details>` : ''], '<span class="lr-tag fact">Fact</span>'),
    ].join('');
    return `<div class="lr-report" id="lr-report">
      <header class="lr-head"><div class="kl">Learning review</div><h2>${esc(day(r.generatedAt))}</h2><p class="muted">${esc(period)} · ${plural(e.total, 'new item')} (${e.byOrigin.learner} of your own work, ${e.byOrigin.check} checked, ${e.byOrigin.record} records, ${e.byOrigin.ai} earlier AI feedback)${e.deferred ? ` · ${e.deferred} more next time` : ''}</p>
        <p class="lr-legend"><span class="lr-tag fact">Fact</span> what you did or a check recorded <span class="lr-tag ai">AI interpretation</span> what the model reads in it <span class="lr-tag judge">Your judgment</span> your agree / disagree / not sure <span class="lr-tag prop">Proposal</span> a suggestion, never applied</p>
        <div class="lr-head-acts" style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
          <a class="btn line sm" data-lr="pdf" href="/api/learning-review/runs/${esc(r.runId)}/export?format=pdf" download>export PDF →</a>
          <a class="btn line sm" data-lr="md" href="/api/learning-review/runs/${esc(r.runId)}/export?format=md" download>export Markdown →</a>
        </div></header>
      ${body}</div>`;
  }

  function controlsHtml() {
    const d = DATA || {};
    if (d.isDemo) return `<div class="lr-box"><p>The Learning Review is not available in Demo Mode.</p></div>`;
    // A failed request is not "not configured": say what actually happened
    if (d.loadError) return `<div class="lr-box"><p>${d.status === 0 ? 'You seem to be offline, so the Learning Review could not be loaded.' : 'The Learning Review could not be loaded right now.'} Your work is safe; nothing was analysed.</p><div class="lr-acts"><button class="btn line sm" data-lr="reload">try again</button></div></div>`;
    if (d.available === false) return `<div class="lr-box"><p>The Learning Review is not configured on this server yet. Your work is safe; nothing is analysed.</p></div>`;
    const pending = d.pending || 0;
    const studyMins = d.studyMinutes !== undefined ? d.studyMinutes : 0;
    const nightly = d.nightlyEnabled
      ? (d.report ? 'A review also runs by itself at night once there are 60 minutes of study since the last one and something new to read.' : 'After your first review, one can also run by itself at night once there are 60 minutes of study since the last one and something new to read.')
      : 'Reviews run only when you ask for one.';
    const failed = d.lastRun && d.lastRun.status === 'failed' && (!d.report || d.lastRun.startedAt > d.report.generatedAt);
    return `<div class="lr-box">
      <p class="lr-uses"><b>Uses AI</b> · one request, and only when there is new evidence since your last review. <b>Nothing is changed</b>: no unit, answer, Glossary or Error Log entry, progress or profile.</p>
      <p class="lr-study-info" style="font-size:14px;margin:8px 0;color:var(--ink-light)">Study timer since your last review: <b>${studyMins} min</b>. <span class="muted">${esc(nightly)}</span></p>
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

  // Agree / Disagree / Not sure, saved on the server; choosing the active one again clears it.
  // The page shows only what the server confirmed, so it can never differ from what was stored.
  async function setJudgment(patternKey, judgment) {
    if (!patternKey || !judgment) return;
    if (D && D.isDemo && D.isDemo()) { return; }
    const s = DATA && DATA.report && DATA.report.sections;
    const all = s ? [...(s.gettingStronger || []), ...(s.emerging || []), ...(s.recurring || []), ...(s.improving || []), ...(s.recognitionToProduction || [])] : [];
    const targets = all.filter(o => (o.key || o.label) === patternKey);
    const before = targets.length ? targets[0].humanJudgment || null : null;
    const next = before === judgment ? null : judgment;
    targets.forEach(o => { o.humanJudgment = next; });
    paint();
    const r = await api('/api/learning-review/judgments', { method: 'POST', body: JSON.stringify({ patternKey, judgment: next }) });
    if (!r.ok) {
      targets.forEach(o => { o.humanJudgment = before; });
      NOTICE = { kind: 'error', text: 'Your evaluation could not be saved. Nothing was changed; try again.' };
    } else {
      targets.forEach(o => { o.humanJudgment = r.data.judgment || null; });
    }
    paint();
  }

  async function load() {
    const r = await api('/api/learning-review');
    if (r.status === 401) { D.needSignIn && D.needSignIn(); return; }
    DATA = r.ok ? r.data : { loadError: true, status: r.status };
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
    const tReload = e.target.closest && e.target.closest('[data-lr="reload"]');
    if (tReload) { e.preventDefault(); DATA = null; paint(); load(); return true; }
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
    _html: () => ({ controls: controlsHtml(), report: DATA && DATA.report ? reportHtml(DATA.report) : '' }),   // tests only
  };
})();
