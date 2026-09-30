/* A MIND IN ENGLISH · character-chat.js
   READING → INTERACTION: a conversation with a voice that belongs to the unit's text.
   The character reacts to meaning and never corrects; language help and the review live outside
   the persona. All causal rules (turns, help links, END, continuation, branches) come from
   conversation-engine.js; the server stays the authority for canon, cost and Demo. */
(function () {
  'use strict';
  const E = window.KLANG_CONVERSATIONS;
  const PRODUCT = 'mind';
  const UNITS = { '01': { back: '#u01-read', backLabel: 'Unit 01 · Read' } };
  const T = {
    cta: 'TALK TO THE NARRATOR →',
    ctaKicker: 'After the reading',
    ctaText: 'The essay\'s "I" is still arguing. Tell it what you think of its explanation: it will answer your ideas, not your grammar.',
    kicker: unit => `Unit ${unit} · Conversation`,
    you: 'You',
    normal: 'Normal', challenge: 'Challenge',
    normalHint: 'A conversation about the text. The voice shares its view and asks yours.',
    challengeHint: 'The voice presses harder on evidence and asks for better reasons. It can still be persuaded.',
    begin: 'BEGIN THE CONVERSATION →',
    modeLegend: 'How should the conversation go?',
    replyLabel: 'Your reply',
    placeholder: 'Write your reply…',
    keysHint: 'Enter sends · Shift+Enter for a new line',
    send: 'Send',
    meaning: 'WHAT DID THEY MEAN? →',
    helpSay: 'HELP ME SAY THIS →',
    helpTitle: 'Help me say this',
    helpIntentLabel: 'What do you want to say? Any language is fine.',
    helpSubmit: 'Suggest wording →',
    helpNote: 'This is help from A Mind in English, not from the voice. Your next reply here will be marked as written with help.',
    helpUse: 'Use this →',
    helpClose: 'Close',
    aidLabel: 'A Mind in English · help',
    aidFormulated: 'Wording you asked for',
    withHelp: 'written with help',
    thinking: name => `${name} is thinking…`,
    noReply: 'No reply yet.',
    retry: 'Try again →',
    end: 'END CONVERSATION',
    endConfirm: 'End this conversation? You can review it afterwards, but nothing more can be added to it.',
    endYes: 'Yes, end it', endNo: 'Keep talking',
    ended: when => `Conversation ended ${when}.`,
    review: 'REVIEW THE CONVERSATION →',
    reviewing: 'Reviewing your conversation…',
    reviewNothing: 'There is nothing of yours to review in this conversation.',
    cont: 'CONTINUE →',
    contHint: 'Continuing starts a new conversation. This one stays as it is.',
    contMode: 'Mode for the new conversation',
    continuation: when => `A new conversation, continuing the one from ${when}.`,
    previous: 'Read the previous conversation →',
    earlier: 'Earlier conversations',
    current: 'Back to the current conversation →',
    demo: 'Conversations are not available in Demo Mode. Nothing is sent to the AI and nothing is saved.',
    unavailable: 'Conversations are not configured on this server yet.',
    loading: 'Loading…',
    loadFailed: 'The conversation could not be loaded. Check your connection and try again.',
    offline: 'No connection. Your message is saved; try again when you are online.',
    conflictTitle: 'This conversation changed on two devices at once',
    forkText: 'Two different replies were written at the same point. Nothing has been deleted. Choose which version to continue from:',
    forkChoose: 'Continue from this version →',
    forkMore: n => `+ ${n} more message${n === 1 ? '' : 's'} after it`,
    lateText: 'Some messages were written on another device after this conversation had ended. They are kept, but they are not part of the ended conversation or its review.',
    reviewTwice: 'Two reviews were made at the same time. Both are kept; the first one is shown.',
    endTwice: 'The conversation was ended on two devices. The first ending is used.',
    collision: 'A message was saved differently on two devices. Both versions are kept.',
    ack: 'Understood, keep everything',
    keptAside: n => `Kept from another device (${n})`,
    r: {
      understood: 'What you understood', responded: 'How you responded', language: 'Your language', reasoning: 'Reasoning',
      verdict: { clear_evidence: 'Clear understanding shown', partial_evidence: 'Understanding partly shown', breakdown: 'Some misunderstanding', not_enough_evidence: 'Not enough in the conversation to tell' },
      unexpected: 'When the conversation took a turn', counter: 'Responding to counterarguments', breakdowns: 'Where communication broke down',
      worked: 'Language that worked', helped: 'with help', issues: 'Worth a look', reform: 'Useful reformulations', chunks: 'Chunks you used on your own', control: 'Grammar and control',
      cat: { error: 'Error', awkward: 'Awkward', register: 'Register', variant: 'Variant (not an error)', suggestion: 'Suggestion (optional)' },
      inYour: 'You wrote', better: 'Try', frozen: when => `Reviewed ${when}. This review is kept as it was made.`,
      profileYes: n => `This conversation counts as one piece of written evidence in your English Profile (${n} ${n === 1 ? 'skill' : 'skills'}). Text chat never counts as speaking.`,
      profileNo: 'Nothing from this conversation counts toward your English Profile.',
      addErr: 'ADD TO ERROR LOG', added: 'added ✓',
      savedNote: 'Saving is a choice, not mastery: nothing is added unless you press the button.',
    },
    fail: 'The request failed. Your conversation is saved.',
  };

  let app = null;
  const meta = {};            // unit -> { characters, available, demo } | 'loading' | 'error'
  const ui = { pending: null, error: null, help: null, endConfirm: false, reviewBusy: false, lastFocus: null };
  // One persistent live region outside the re-rendered page, so replies are actually announced.
  function announce(text) {
    let el = document.getElementById('talk-live');
    if (!el) { el = document.createElement('div'); el.id = 'talk-live'; el.className = 'sr-only'; el.setAttribute('aria-live', 'polite'); document.body.appendChild(el); }
    el.textContent = '';
    setTimeout(() => { el.textContent = text; }, 30);
  }
  const DRAFT_KEY = `klang.${PRODUCT}.talkdraft.v1`;
  const CLIENT_KEY = `klang.${PRODUCT}.talkclient.v1`;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const paras = s => esc(s).split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
  const now = () => new Date().toISOString();
  const when = iso => { try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return ''; } };
  const whenTime = iso => { try { return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } };
  const newId = prefix => `${prefix}_${(window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 12)}`;
  const store = () => { try { return window.localStorage; } catch (e) { return null; } };

  function device() {
    const s = store();
    let d = null;
    try { d = JSON.parse((s && s.getItem(CLIENT_KEY)) || 'null'); } catch (e) { }
    if (!d || !/^[A-Za-z0-9_-]{8,64}$/.test(d.id || '')) d = { id: newId('device').slice(0, 40), seq: 0 };
    d.seq = (d.seq || 0) + 1;
    try { s && s.setItem(CLIENT_KEY, JSON.stringify(d)); } catch (e) { }
    return d;
  }
  function drafts() { try { return JSON.parse(sessionStorage.getItem(DRAFT_KEY) || '{}'); } catch (e) { return {}; } }
  function setDraft(id, text) { const d = drafts(); if (text) d[id] = text; else delete d[id]; try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch (e) { } }

  /* ── state ─────────────────────────────── */
  const S = () => app.state();
  const all = () => Object.values(S().conversations || {});
  const byId = id => (S().conversations || {})[id] || null;
  function put(conv) {
    const st = S();
    st.conversations = st.conversations || {};
    st.conversations[conv.conversationId] = conv;
    app.save(`conversation:${conv.conversationId}`);
  }
  function episodes(unit, characterId) {
    return all().filter(c => c.course === PRODUCT && c.unitId === unit && (!characterId || c.characterId === characterId))
      .sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
  }
  function currentEpisode(unit, characterId) {
    const list = episodes(unit, characterId);
    const continued = new Set(list.map(c => c.continuesFrom).filter(Boolean));
    const heads = list.filter(c => !continued.has(c.conversationId));
    return heads[heads.length - 1] || null;
  }
  function chain(conv) {
    const out = [];
    let c = conv, guard = 0;
    while (c && guard++ < 200) { out.unshift(c); c = c.continuesFrom ? byId(c.continuesFrom) : null; }
    return out;
  }

  /* ── causal path shown to the learner (never a false linearisation) ── */
  function view(conv) {
    const ordered = E.causalOrder(conv.turns).ordered;
    const dialogue = ordered.filter(t => t.role !== 'system_aid');
    let pathIds, fork = null;
    if (conv.status === 'ended' && conv.endedAtTurnId) {
      pathIds = E.ancestry(conv.turns, conv.endedAtTurnId);
    } else {
      pathIds = new Set();
      const kept = new Map((conv.branchResolutions || []).map(r => [r.parentTurnId || 'root', r.keptTurnId]));
      let parent = 'root';
      for (let guard = 0; guard <= dialogue.length; guard++) {
        const kids = dialogue.filter(t => (t.parentTurnId || 'root') === parent);
        if (!kids.length) break;
        const next = kids.length === 1 ? kids[0] : kids.find(t => t.id === kept.get(parent));
        if (!next) { fork = { parent: parent === 'root' ? null : parent, options: kids }; break; }
        pathIds.add(next.id); parent = next.id;
      }
    }
    const path = dialogue.filter(t => pathIds.has(t.id));
    const aids = ordered.filter(t => t.role === 'system_aid' && (!t.parentTurnId || pathIds.has(t.parentTurnId)));
    const forkIds = new Set();
    if (fork) {
      const collect = id => { forkIds.add(id); dialogue.filter(t => t.parentTurnId === id).forEach(t => collect(t.id)); };
      fork.options.forEach(o => collect(o.id));
    }
    const aside = dialogue.filter(t => !pathIds.has(t.id) && !forkIds.has(t.id));
    return { path, aids, fork, aside, leaf: path.length ? path[path.length - 1] : null };
  }
  const subtreeSize = (conv, id) => { let n = 0; const walk = x => conv.turns.filter(t => t.parentTurnId === x && t.role !== 'system_aid').forEach(t => { n++; walk(t.id); }); walk(id); return n; };

  /* ── server metadata (public card presentation only) ── */
  async function loadMeta(unit) {
    if (meta[unit] && meta[unit] !== 'error') return meta[unit];
    meta[unit] = 'loading';
    const r = await app.aiFetch(`/api/ai/characters/${unit}`);
    if (r.status === 401) { app.needSignIn(); return null; }
    meta[unit] = r.ok && r.data.characters && r.data.characters.length ? r.data : 'error';
    return meta[unit];
  }
  const character = unit => (meta[unit] && meta[unit].characters ? meta[unit].characters[0] : null);
  const nameOf = unit => (character(unit) ? character(unit).displayName : 'The voice');

  /* ── CTA inside the unit (READ, after both texts) ── */
  function ctaHtml(unit) {
    if (!UNITS[unit]) return '';
    return `<aside class="talk-cta" aria-labelledby="talk-cta-${unit}">
      <span class="kl">${esc(T.ctaKicker)}</span>
      <p id="talk-cta-${unit}">${esc(T.ctaText)}</p>
      <a class="btn dark" href="#talk${unit}">${esc(T.cta)}</a>
    </aside>`;
  }

  /* ── rendering ─────────────────────────── */
  function render(unit, episodeId, opts) {
    if (!UNITS[unit]) return false;
    if (!episodeId) episodeId = (currentUnit() || {}).episode || null;
    const m = meta[unit];
    if (!m || m === 'loading') {
      shell(unit, `<p class="talk-status" role="status">${esc(T.loading)}</p>`);
      if (!m) loadMeta(unit).then(() => { if (isOn(unit)) render(unit, episodeId, opts); });
      return true;
    }
    if (m === 'error') {
      shell(unit, `<p class="talk-status talk-err" role="alert">${esc(T.loadFailed)}</p><button class="btn line sm" data-cc="reload" data-u="${unit}">${esc(T.retry)}</button>`);
      return true;
    }
    const ch = character(unit);
    const cur = currentEpisode(unit, ch.id);
    const conv = episodeId ? byId(episodeId) : cur;
    const readOnly = !!(episodeId && cur && conv && conv.conversationId !== cur.conversationId);
    let body;
    if (app.isDemo() || m.demo) body = demoHtml(unit, ch);
    else if (!conv) body = startHtml(unit, ch, m);
    else body = episodeHtml(unit, ch, conv, readOnly, m);
    const focusComposer = document.activeElement && document.activeElement.id === 'talk-input';
    const sel = focusComposer ? [document.activeElement.selectionStart, document.activeElement.selectionEnd] : null;
    shell(unit, body, ch);
    const input = document.getElementById('talk-input');
    if (input && focusComposer) { input.focus(); try { input.setSelectionRange(sel[0], sel[1]); } catch (e) { } }
    if (opts && opts.focus) { const el = document.querySelector(opts.focus); if (el) el.focus(); }
    if (opts && opts.scroll) { const last = document.querySelector('.talk-log > li:last-child'); if (last && last.scrollIntoView) last.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }
    return true;
  }
  const isOn = unit => (location.hash || '').startsWith(`#talk${unit}`);

  function shell(unit, body, ch) {
    const u = UNITS[unit];
    app.main().innerHTML = `<section class="page talk-page"><div class="inner talk">
      <a class="talk-back" href="${u.back}">← ${esc(u.backLabel)}</a>
      <header class="talk-head">
        <span class="kl">${esc(T.kicker(unit))}</span>
        <h1 id="talk-title" tabindex="-1">${esc(ch ? ch.displayName : '')}</h1>
        ${ch && ch.subtitle ? `<p class="talk-sub">${esc(ch.subtitle)}</p>` : ''}
        ${ch && ch.disclosure ? `<p class="talk-disclosure">${esc(ch.disclosure)}</p>` : ''}
      </header>
      ${body}
    </div></section>`;
  }

  function demoHtml(unit, ch) {
    return `<ol class="talk-log" aria-label="Conversation">${ch.openings ? turnHtml({ id: 'demo_opening', role: 'character', text: ch.openings.normal }, unit, null, { demo: true }) : ''}</ol>
      <p class="talk-note" role="note">${esc(T.demo)}</p>
      <div class="talk-compose is-disabled"><label class="sr-only" for="talk-input">${esc(T.replyLabel)}</label><textarea id="talk-input" rows="2" disabled placeholder="${esc(T.placeholder)}"></textarea></div>`;
  }

  function modePicker(name, selected) {
    return `<fieldset class="talk-modes"><legend>${esc(name === 'cmode' ? T.contMode : T.modeLegend)}</legend>
      ${['normal', 'challenge'].map(mo => `<label class="talk-mode"><input type="radio" name="${name}" value="${mo}" ${mo === selected ? 'checked' : ''}><span><b>${esc(T[mo])}</b><small>${esc(T[mo + 'Hint'])}</small></span></label>`).join('')}
    </fieldset>`;
  }

  function startHtml(unit, ch, m) {
    const ok = m.available && m.available.characterChat;
    return `<div class="talk-start">${modePicker('mode', 'normal')}
      ${ok ? '' : `<p class="talk-note" role="note">${esc(T.unavailable)}</p>`}
      <button class="btn dark" data-cc="start" data-u="${unit}" ${ok ? '' : 'disabled'}>${esc(T.begin)}</button></div>`;
  }

  function turnHtml(t, unit, conv, opts) {
    const mine = t.role === 'user';
    const helped = mine && conv && E.effectiveProvenance(conv, t) === 'scaffolded';
    const aids = conv && !opts.demo ? conv.turns.filter(a => a.role === 'system_aid' && a.parentTurnId === t.id) : [];
    const canHelp = !opts.demo && !opts.readOnly && opts.available && opts.available.conversationHelp;
    const hasExplain = aids.some(a => a.aidMode === 'explain');
    return `<li class="turn ${mine ? 'turn-you' : 'turn-voice'}" id="turn-${esc(t.id)}">
      <p class="turn-who">${esc(mine ? T.you : nameOf(unit))}${helped ? ` <span class="turn-tag">${esc(T.withHelp)}</span>` : ''}</p>
      <div class="turn-text">${paras(t.text)}</div>
      ${!mine && canHelp && !hasExplain ? `<button class="btn ghost sm turn-act" data-cc="explain" data-u="${unit}" data-c="${esc(conv.conversationId)}" data-t="${esc(t.id)}" ${ui.help && ui.help.busy === t.id ? 'disabled aria-busy="true"' : ''}>${esc(T.meaning)}</button>` : ''}
      ${aids.map(a => `<aside class="aid" aria-label="${esc(T.aidLabel)}"><span class="aid-k">${esc(a.aidMode === 'formulate' ? T.aidFormulated : T.aidLabel)}</span>${a.aidMode === 'formulate' ? `<ul>${a.text.split('\n').filter(Boolean).map(o => `<li>${esc(o)}</li>`).join('')}</ul>` : paras(a.text)}</aside>`).join('')}
    </li>`;
  }

  function conflictHtml(unit, conv, v) {
    const ms = conv.mergeState;
    if (!ms || !ms.requiresResolution) return '';
    const reasons = ms.reasons || [];
    const lines = [];
    if (reasons.some(r => r.startsWith('turns_outside_ended_path'))) lines.push(T.lateText);
    if (reasons.includes('review_divergence')) lines.push(T.reviewTwice);
    if (reasons.includes('end_divergence')) lines.push(T.endTwice);
    if (reasons.some(r => r.startsWith('turn_id_collision') || r.startsWith('version_or_identity') || r.startsWith('branch_resolution'))) lines.push(T.collision);
    const ackable = reasons.filter(r => !r.startsWith('divergent_children'));
    return `<section class="talk-conflict" role="region" aria-labelledby="talk-conflict-h">
      <h2 id="talk-conflict-h">${esc(T.conflictTitle)}</h2>
      ${v.fork ? `<p>${esc(T.forkText)}</p><ul class="talk-fork">${v.fork.options.map(o => {
        const more = subtreeSize(conv, o.id);
        return `<li><blockquote>${paras(o.text)}</blockquote>${more ? `<small>${esc(T.forkMore(more))}</small>` : ''}<button class="btn line sm" data-cc="choose" data-c="${esc(conv.conversationId)}" data-p="${esc(v.fork.parent || '')}" data-t="${esc(o.id)}">${esc(T.forkChoose)}</button></li>`;
      }).join('')}</ul>` : ''}
      ${lines.map(l => `<p>${esc(l)}</p>`).join('')}
      ${ackable.length ? `<button class="btn line sm" data-cc="ack" data-c="${esc(conv.conversationId)}">${esc(T.ack)}</button>` : ''}
    </section>`;
  }

  function episodeHtml(unit, ch, conv, readOnly, m) {
    const v = view(conv);
    const ended = conv.status === 'ended';
    const opts = { readOnly: readOnly || false, available: m.available };
    const prev = conv.continuesFrom ? byId(conv.continuesFrom) : null;
    const pendingHere = ui.pending && ui.pending.conv === conv.conversationId;
    const unanswered = !ended && v.leaf && v.leaf.role === 'user' && !pendingHere;
    const errHere = ui.error && ui.error.conv === conv.conversationId ? ui.error.message : '';
    const blocked = conv.mergeState && conv.mergeState.requiresResolution;
    const chip = `<span class="talk-chip">${esc(T[conv.mode])}</span>`;
    const earlier = chain(conv).slice(0, -1);
    let foot = '';
    if (!ended && !readOnly && !blocked) foot = composerHtml(unit, conv, v, m, pendingHere || unanswered);
    else if (ended) foot = endedHtml(unit, conv, readOnly, m);
    return `<div class="talk-meta">${chip}${readOnly ? `<a class="talk-link" href="#talk${unit}">${esc(T.current)}</a>` : ''}</div>
      ${prev ? `<p class="talk-note">${esc(T.continuation(when(prev.endedAt || prev.createdAt)))} <a class="talk-link" href="#talk${unit}-${esc(prev.conversationId)}">${esc(T.previous)}</a></p>` : ''}
      ${conflictHtml(unit, conv, v)}
      <ol class="talk-log" aria-label="Conversation">${v.path.map(t => turnHtml(t, unit, conv, opts)).join('')}</ol>
      ${pendingHere ? `<p class="talk-status" role="status"><span class="talk-dots" aria-hidden="true"></span>${esc(T.thinking(nameOf(unit)))}</p>` : ''}
      ${unanswered && !readOnly ? `<div class="talk-status" role="${errHere ? 'alert' : 'status'}">${esc(errHere || T.noReply)} <button class="btn line sm" data-cc="retry" data-c="${esc(conv.conversationId)}" data-t="${esc(v.leaf.id)}">${esc(T.retry)}</button></div>` : (errHere && !unanswered && !ended ? `<p class="talk-status talk-err" role="alert">${esc(errHere)}</p>` : '')}
      ${v.aside.length ? `<details class="talk-aside"><summary>${esc(T.keptAside(v.aside.length))}</summary><ol>${v.aside.map(t => `<li><b>${esc(t.role === 'user' ? T.you : nameOf(unit))}:</b> ${esc(t.text)}</li>`).join('')}</ol></details>` : ''}
      ${foot}
      ${earlier.length ? `<nav class="talk-earlier" aria-label="${esc(T.earlier)}"><h2>${esc(T.earlier)}</h2><ul>${earlier.map(c => `<li><a href="#talk${unit}-${esc(c.conversationId)}">${esc(whenTime(c.createdAt))} · ${esc(T[c.mode])}</a></li>`).join('')}</ul></nav>` : ''}`;
  }

  function composerHtml(unit, conv, v, m, waiting) {
    const draft = drafts()[conv.conversationId] || '';
    const helpOn = ui.help && ui.help.conv === conv.conversationId && ui.help.open;
    const canHelp = m.available && m.available.conversationHelp;
    return `${helpOn ? helpHtml(unit, conv) : ''}
      <form class="talk-compose" data-cc-form="send" data-u="${unit}" data-c="${esc(conv.conversationId)}">
        <label class="sr-only" for="talk-input">${esc(T.replyLabel)}</label>
        <textarea id="talk-input" rows="3" placeholder="${esc(T.placeholder)}" aria-describedby="talk-keys" ${waiting ? 'disabled' : ''}>${esc(draft)}</textarea>
        <div class="talk-row">
          <span id="talk-keys" class="talk-keys">${esc(T.keysHint)}</span>
          ${canHelp ? `<button type="button" class="btn ghost sm" data-cc="helpopen" data-c="${esc(conv.conversationId)}" aria-expanded="${helpOn ? 'true' : 'false'}" aria-controls="talk-help">${esc(T.helpSay)}</button>` : ''}
          <button type="submit" class="btn dark sm" ${waiting ? 'disabled' : ''}>${esc(T.send)}</button>
        </div>
      </form>
      <div class="talk-end">${ui.endConfirm === conv.conversationId
        ? `<div class="talk-confirm" role="group" aria-labelledby="talk-end-q"><p id="talk-end-q">${esc(T.endConfirm)}</p><button class="btn dark sm" data-cc="endyes" data-c="${esc(conv.conversationId)}">${esc(T.endYes)}</button><button class="btn line sm" data-cc="endno">${esc(T.endNo)}</button></div>`
        : `<button class="btn line sm" data-cc="end" data-c="${esc(conv.conversationId)}" ${waiting ? 'disabled' : ''}>${esc(T.end)}</button>`}</div>`;
  }

  function helpHtml(unit, conv) {
    const h = ui.help;
    return `<section class="talk-help" id="talk-help" role="region" aria-labelledby="talk-help-h">
      <div class="talk-help-top"><h2 id="talk-help-h">${esc(T.helpTitle)}</h2><button class="btn ghost sm" data-cc="helpclose">${esc(T.helpClose)}</button></div>
      <p class="talk-help-note">${esc(T.helpNote)}</p>
      <form data-cc-form="help" data-u="${unit}" data-c="${esc(conv.conversationId)}">
        <label for="talk-intent">${esc(T.helpIntentLabel)}</label>
        <textarea id="talk-intent" rows="2">${esc(h.intent || '')}</textarea>
        <button type="submit" class="btn line sm" ${h.busy ? 'disabled aria-busy="true"' : ''}>${esc(T.helpSubmit)}</button>
      </form>
      ${h.error ? `<p class="talk-err" role="alert">${esc(h.error)}</p>` : ''}
      ${h.options && h.options.length ? `<ul class="talk-options">${h.options.map((o, i) => `<li><span>${esc(o)}</span><button class="btn ghost sm" data-cc="use" data-i="${i}">${esc(T.helpUse)}</button></li>`).join('')}</ul>` : ''}
    </section>`;
  }

  function endedHtml(unit, conv, readOnly, m) {
    const rs = conv.reviewState || {};
    const hasUser = conv.turns.some(t => t.role === 'user');
    const canReview = m.available && m.available.conversationReview;
    const isHead = !readOnly;
    const blocked = conv.mergeState && conv.mergeState.requiresResolution;
    return `<div class="talk-ended"><p class="talk-note">${esc(T.ended(when(conv.endedAt)))}</p>
      ${rs.status === 'complete' ? reviewHtml(unit, conv) : (ui.reviewBusy === conv.conversationId
        ? `<p class="talk-status" role="status" aria-busy="true"><span class="talk-dots" aria-hidden="true"></span>${esc(T.reviewing)}</p>`
        : (hasUser ? `<button class="btn dark" data-cc="review" data-c="${esc(conv.conversationId)}" ${canReview && !blocked ? '' : 'disabled'}>${esc(T.review)}</button>${canReview ? '' : `<p class="talk-note">${esc(T.unavailable)}</p>`}` : `<p class="talk-note">${esc(T.reviewNothing)}</p>`))}
      ${ui.error && ui.error.conv === conv.conversationId ? `<p class="talk-err" role="alert">${esc(ui.error.message)}</p>` : ''}
      ${isHead ? `<div class="talk-continue">${modePicker('cmode', conv.mode)}<p class="talk-note">${esc(T.contHint)}</p><button class="btn line" data-cc="continue" data-u="${unit}" data-c="${esc(conv.conversationId)}" ${m.available && m.available.characterChat ? '' : 'disabled'}>${esc(T.cont)}</button></div>` : ''}
    </div>`;
  }

  /* ── explicit Error Log action (never automatic). The Language Bank is retired: nothing is saved there. ── */
  const refOf = (conv, kind, i) => `conversation:${conv.conversationId}:${kind}:${i}`;
  const inErrors = ref => (S().errs || []).some(e => e.ref === ref);
  function actionBtn(kind, conv, i, done) {
    return `<button class="btn line sm rv-act" data-cc="${kind}" data-c="${esc(conv.conversationId)}" data-i="${i}" ${done ? 'disabled' : ''}>${esc(done ? T.r.added : T.r.addErr)}</button>`;
  }
  function saveErr(conv, i) {
    const issue = ((conv.reviewState.result || {}).issues || [])[i], ref = refOf(conv, 'issue', i);
    if (!issue || !issue.errorLogEligible || inErrors(ref)) return false;
    const st = S(); st.errs = st.errs || [];
    st.errs.push(errEntry(conv, issue, ref));
    app.save('error-log'); return true;
  }
  function errEntry(conv, issue, ref) {
    return { id: newId('err').slice(0, 40), mine: issue.original, corr: issue.improved, why: issue.explanation, ex: '', category: 'Written language', u: conv.unitId, source: 'character_conversation', ref, n: 0, last: '' };
  }

  function quote(conv, ids) {
    const byTurn = new Map(conv.turns.map(t => [t.id, t]));
    const q = (ids || []).map(id => byTurn.get(id)).filter(t => t && t.role === 'user').map(t => t.text.length > 160 ? t.text.slice(0, 157) + '…' : t.text);
    return q.length ? `<blockquote class="rv-q">${q.map(esc).join('<br>')}</blockquote>` : '';
  }

  const profileCount = conv => (E.profileEvidenceFromReview ? E.profileEvidenceFromReview(conv).length : 0);
  function issueActions(conv, issue) {
    const i = (conv.reviewState.result.issues || []).indexOf(issue);
    const btns = [];
    if (issue.errorLogEligible) btns.push(actionBtn('err', conv, i, inErrors(refOf(conv, 'issue', i))));
    return btns.length ? `<div class="rv-acts">${btns.join('')}</div>` : '';
  }

  function reviewHtml(unit, conv) {
    const res = conv.reviewState.result || {}, R = T.r;
    const comp = res.comprehension || {}, inter = res.interaction || {};
    const issues = res.issues || [];
    const byCat = ['error', 'awkward', 'register', 'variant', 'suggestion'].map(c => [c, issues.filter(i => i.category === c)]).filter(x => x[1].length);
    const reasoning = res.reasoning && res.reasoning.commentary && (res.reasoning.evidenceTurnIds || []).length ? res.reasoning : null;
    return `<section class="talk-review" aria-labelledby="talk-review-h"><h2 id="talk-review-h" tabindex="-1" class="sr-only">${esc(T.review.replace(' →', ''))}</h2>
      ${res.summary ? `<p class="rv-summary">${esc(res.summary)}</p>` : ''}
      <div class="rv-block"><h3>${esc(R.understood)}</h3><p class="rv-verdict">${esc(R.verdict[comp.verdict] || '')}</p>${comp.commentary ? `<p>${esc(comp.commentary)}</p>` : ''}
        ${(comp.evidence || []).map(e => `<div class="rv-item"><p>${esc(e.observation)}</p>${quote(conv, e.turnIds)}</div>`).join('')}</div>
      <div class="rv-block"><h3>${esc(R.responded)}</h3>
        ${inter.unexpectedTurns ? `<h4>${esc(R.unexpected)}</h4><p>${esc(inter.unexpectedTurns)}</p>` : ''}
        ${inter.counterarguments ? `<h4>${esc(R.counter)}</h4><p>${esc(inter.counterarguments)}</p>` : ''}
        ${(inter.communicationBreakdowns || []).length ? `<h4>${esc(R.breakdowns)}</h4><ul>${inter.communicationBreakdowns.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}</div>
      <div class="rv-block"><h3>${esc(R.language)}</h3>
        ${(res.successfulLanguage || []).length ? `<h4>${esc(R.worked)}</h4><ul>${res.successfulLanguage.map(s => `<li>${esc(s.text)}${s.independentlyProduced ? '' : ` <span class="turn-tag">${esc(R.helped)}</span>`}</li>`).join('')}</ul>` : ''}
        ${byCat.length ? `<h4>${esc(R.issues)}</h4>${byCat.map(([c, list]) => `<div class="rv-cat"><span class="rv-cat-k cat-${c}">${esc(R.cat[c])}</span>${list.map(i => `<div class="rv-item"><p><span class="rv-l">${esc(R.inYour)}</span> <s>${esc(i.original)}</s></p><p><span class="rv-l">${esc(R.better)}</span> <ins>${esc(i.improved)}</ins></p><p class="rv-why">${esc(i.explanation)}</p>${issueActions(conv, i)}</div>`).join('')}</div>`).join('')}` : ''}
        ${(res.reformulations || []).length ? `<h4>${esc(R.reform)}</h4>${res.reformulations.map((r, ri) => `<div class="rv-item"><p><s>${esc(r.original)}</s></p><p><ins>${esc(r.reformulated)}</ins></p><p class="rv-why">${esc(r.reason)}</p></div>`).join('')}` : ''}
        ${(res.independentChunks || []).length ? `<h4>${esc(R.chunks)}</h4><ul>${res.independentChunks.map(c => `<li>${esc(c.chunk)}</li>`).join('')}</ul>` : ''}
        ${res.grammarControl ? `<h4>${esc(R.control)}</h4><p>${esc(res.grammarControl)}</p>` : ''}</div>
      ${reasoning ? `<div class="rv-block"><h3>${esc(R.reasoning)}</h3><p>${esc(reasoning.commentary)}</p>${quote(conv, reasoning.evidenceTurnIds)}</div>` : ''}
      <p class="rv-foot">${esc(R.frozen(when(conv.reviewState.audit ? conv.reviewState.audit.reviewedAt : conv.endedAt)))} ${esc(profileCount(conv) ? R.profileYes(profileCount(conv)) : R.profileNo)} ${esc(R.savedNote)}</p>
    </section>`;
  }

  /* ── actions ───────────────────────────── */
  const errorText = r => r.status === 0 ? T.offline : (r.data && r.data.message) || T.fail;
  const payload = conv => JSON.parse(JSON.stringify(conv));

  function start(unit, mode, continueFrom) {
    const ch = character(unit);
    const d = device();
    let conv = continueFrom
      ? E.createContinuation(continueFrom, { conversationId: newId('conv'), createdAt: now(), mode, carryArgument: true })
      : E.createEpisode({ conversationId: newId('conv'), unitId: unit, characterId: ch.id, characterCardVersion: ch.version, sourceContentVersion: ch.sourceContentVersion, mode, createdAt: now() });
    const set = continueFrom ? ch.continuationOpenings : ch.openings;
    // Continuations stay on the frozen card version; its opening is the same text in version 1.
    conv = E.appendTurn(conv, { id: newId('turn'), role: 'character', text: set[mode], parentTurnId: null, replyToTurnId: null, branchId: newId('branch').slice(0, 40), logicalClock: 0, clientId: 'card_opening', clientSequence: d.seq, createdAt: now(), provenance: 'character', assistanceId: null });
    put(conv);
    ui.error = null; ui.help = null; ui.endConfirm = false;
    if (location.hash !== `#talk${unit}`) location.hash = `talk${unit}`; else render(unit, null, { focus: '#talk-input' });
  }

  async function send(unit, convId, text) {
    let conv = byId(convId);
    if (!conv || !text.trim()) return;
    const d = device();
    try {
      conv = E.appendUserTurn(conv, { id: newId('turn'), text: text.trim(), clientId: d.id, clientSequence: d.seq, createdAt: now() });
    } catch (e) { ui.error = { conv: convId, message: T.fail }; render(unit); return; }
    put(conv);
    setDraft(convId, '');
    const leaf = view(conv).leaf;
    if (ui.help && ui.help.conv === convId) ui.help = null;
    await reply(unit, convId, leaf.id);
  }

  async function reply(unit, convId, userTurnId) {
    ui.pending = { conv: convId, turn: userTurnId }; ui.error = null;
    announce(T.thinking(nameOf(unit)));
    render(unit, null, { focus: '#talk-input', scroll: true });
    const r = await app.aiFetch('/api/ai/character-chat', { conversation: payload(byId(convId)), userTurnId });
    ui.pending = null;
    if (r.status === 401) { app.needSignIn(); return; }
    if (r.ok && r.data.characterTurn) {
      let conv = byId(convId);
      if (!conv.turns.some(t => t.role === 'character' && t.replyToTurnId === userTurnId)) {
        try {
          conv = E.appendTurn(conv, r.data.characterTurn);
          conv.structuredMemory = r.data.structuredMemory;
          const known = new Set(conv.assessmentTrace.map(a => a.id));
          conv.assessmentTrace = conv.assessmentTrace.concat((r.data.assessmentTraceEntries || []).filter(a => !known.has(a.id)));
          put(conv);
          announce(`${nameOf(unit)}: ${r.data.characterTurn.text}`);
        } catch (e) { ui.error = { conv: convId, message: T.fail }; }
      }
    } else ui.error = { conv: convId, message: errorText(r) };
    if (isOn(unit)) render(unit, null, { focus: '#talk-input', scroll: true });
  }

  async function explain(unit, convId, turnId) {
    ui.help = Object.assign({}, ui.help || {}, { busy: turnId });
    render(unit);
    const r = await app.aiFetch('/api/ai/conversation-help', { conversation: payload(byId(convId)), mode: 'explain', targetTurnId: turnId, intent: '' });
    if (ui.help) ui.help.busy = null;
    if (r.status === 401) { app.needSignIn(); return; }
    if (r.ok && r.data.aidTurn) {
      try { put(E.appendTurn(byId(convId), r.data.aidTurn)); announce(`${T.aidLabel}: ${r.data.aidTurn.text}`); } catch (e) { ui.error = { conv: convId, message: T.fail }; }
    } else ui.error = { conv: convId, message: errorText(r) };
    render(unit, null, { focus: `#turn-${CSS.escape(turnId)} .aid` });
  }

  async function formulate(unit, convId, intent) {
    const conv = byId(convId);
    const leaf = view(conv).leaf;
    ui.help = Object.assign(ui.help || {}, { conv: convId, open: true, intent, busy: true, error: '', options: [] });
    render(unit);
    const r = await app.aiFetch('/api/ai/conversation-help', { conversation: payload(conv), mode: 'formulate', targetTurnId: leaf ? leaf.id : null, intent });
    ui.help.busy = false;
    if (r.status === 401) { app.needSignIn(); return; }
    if (r.ok && r.data.aidTurn) {
      // Stored causally next to the turn being answered: the reply that follows is scaffolded, whatever the UI does.
      try { put(E.appendTurn(byId(convId), r.data.aidTurn)); ui.help.options = r.data.options || []; } catch (e) { ui.help.error = T.fail; }
    } else ui.help.error = errorText(r);
    render(unit, null, { focus: ui.help.options && ui.help.options.length ? '.talk-options button' : '#talk-intent' });
  }

  function end(unit, convId) {
    try { put(E.endConversation(byId(convId), now())); ui.endConfirm = false; ui.error = null; }
    catch (e) { ui.error = { conv: convId, message: T.fail }; }
    render(unit, null, { focus: '.talk-ended button, #talk-title' });
  }

  async function review(unit, convId) {
    ui.reviewBusy = convId; ui.error = null;
    render(unit);
    const r = await app.aiFetch('/api/ai/conversation-review', { conversation: payload(byId(convId)) });
    ui.reviewBusy = false;
    if (r.status === 401) { app.needSignIn(); return; }
    if (r.ok && r.data.reviewState) {
      const conv = byId(convId);
      conv.reviewState = r.data.reviewState;   // frozen from here on (the server refuses a second review)
      put(conv);
    } else ui.error = { conv: convId, message: errorText(r) };
    render(unit, null, { focus: '#talk-review-h, .talk-ended button' });
  }

  function currentUnit() { const m = (location.hash || '').match(/^#talk(\d\d)(?:-(.+))?$/); return m ? { unit: m[1], episode: m[2] || null } : null; }

  function onClick(e) {
    const t = e.target.closest('[data-cc]');
    if (!t || !app) return false;
    const act = t.dataset.cc, unit = t.dataset.u || (currentUnit() || {}).unit, c = t.dataset.c;
    e.preventDefault();
    switch (act) {
      case 'reload': delete meta[unit]; render(unit); break;
      case 'start': { const m = document.querySelector('input[name="mode"]:checked'); start(unit, m ? m.value : 'normal'); break; }
      case 'continue': { const m = document.querySelector('input[name="cmode"]:checked'); start(unit, m ? m.value : 'normal', byId(c)); break; }
      case 'retry': reply(unit, c, t.dataset.t); break;
      case 'explain': explain(unit, c, t.dataset.t); break;
      case 'helpopen': ui.lastFocus = t; ui.help = ui.help && ui.help.open ? null : { conv: c, open: true, intent: '', options: [] }; render(unit, null, { focus: ui.help ? '#talk-intent' : null }); if (!ui.help) t.focus(); break;
      case 'helpclose': ui.help = null; render(unit, null, { focus: '[data-cc="helpopen"]' }); break;
      case 'use': {
        const opt = ui.help && ui.help.options[+t.dataset.i];
        const input = document.getElementById('talk-input');
        if (opt && input) { input.value = opt; setDraft(ui.help.conv, opt); input.focus(); input.setSelectionRange(opt.length, opt.length); }
        break;
      }
      case 'end': ui.lastFocus = t; ui.endConfirm = c; render(unit, null, { focus: '[data-cc="endno"]' }); break;
      case 'endno': ui.endConfirm = false; render(unit, null, { focus: '[data-cc="end"]' }); break;
      case 'endyes': end(unit, c); break;
      case 'review': review(unit, c); break;
      case 'err': {
        const ok = saveErr(byId(c), +t.dataset.i);
        t.disabled = true; t.textContent = T.r.added;
        if (ok) announce(T.r.addErr);
        break;
      }
      case 'choose': try { put(E.chooseBranch(byId(c), t.dataset.p || null, t.dataset.t, now())); } catch (err) { ui.error = { conv: c, message: T.fail }; } render(unit, null, { focus: '#talk-input, #talk-title' }); break;
      case 'ack': { const conv = byId(c); put(E.acknowledgeConflicts(conv, (conv.mergeState.reasons || []).filter(r => !r.startsWith('divergent_children')))); render(unit, (currentUnit() || {}).episode, { focus: '#talk-title' }); break; }
      default: return false;
    }
    return true;
  }

  function onSubmit(e) {
    const f = e.target.closest('[data-cc-form]');
    if (!f) return false;
    e.preventDefault();
    const unit = f.dataset.u, c = f.dataset.c;
    if (f.dataset.ccForm === 'send') { const input = f.querySelector('textarea'); const text = input.value; if (text.trim()) send(unit, c, text); }
    if (f.dataset.ccForm === 'help') { const v = f.querySelector('textarea').value.trim(); if (v) formulate(unit, c, v); }
    return true;
  }

  function onKey(e) {
    if (!app) return;
    if (e.target && e.target.id === 'talk-input' && e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      const f = e.target.closest('form'); if (f) f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
    if (e.key === 'Escape' && currentUnit()) {
      const unit = currentUnit().unit;
      if (ui.help && ui.help.open) { ui.help = null; render(unit, null, { focus: '[data-cc="helpopen"]' }); }
      else if (ui.endConfirm) { ui.endConfirm = false; render(unit, null, { focus: '[data-cc="end"]' }); }
    }
  }
  function onInput(e) {
    if (e.target && e.target.id === 'talk-input') { const f = e.target.closest('form'); if (f) setDraft(f.dataset.c, e.target.value); }
    if (e.target && e.target.id === 'talk-intent' && ui.help) ui.help.intent = e.target.value;
  }

  window.KLANG_CHAT = {
    attach(bridge) {
      app = bridge;
      document.addEventListener('submit', e => { if (onSubmit(e)) e.stopImmediatePropagation(); }, true);
      document.addEventListener('keydown', onKey);
      document.addEventListener('input', onInput);
    },
    hasCharacter: unit => !!UNITS[unit],
    ctaHtml, render, onClick,
    __view: view,
  };
})();
