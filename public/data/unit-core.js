/* Shared content constructor for Units 02–10.
   It keeps the data contract explicit while letting each unit spend its words on
   pedagogy rather than repeating structural boilerplate. */
window.KLANG = window.KLANG || {};
window.KLANG.units = window.KLANG.units || {};

(function (K) {
  'use strict';

  const open = (id, q, guide, rows = 4, tag) => ({ id, type: 'open', q, guide, rows, tag });
  const produce = (id, q, model, explain) => ({ id, type: 'produce', q, model: Array.isArray(model) ? model : [model], explain });

  function vocabulary(v, i) {
    const [w, pos, def, ctx, ex, col, syn, note, pron, ant] = v;
    return {
      key: w.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      w, pos, def, ctx, ex,
      col: Array.isArray(col) ? col : (col ? [col] : []),
      syn: Array.isArray(syn) ? syn : (syn ? [syn] : []),
      note, pron,
      ant: ant ? (Array.isArray(ant) ? ant : [ant]) : null
    };
  }

  function chunk(c, i, id) {
    const [text, meaning, func, reg, ex, prompt, model, explain] = c;
    return {
      key: text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').slice(0, 44),
      c: text, meaning, func, reg, ex,
      task: produce(`${id}c${i + 1}`, prompt, model, explain)
    };
  }

  function noticeFocus(f, fi, id) {
    const ask = (f.questions || f.ask || []).map((q, i) =>
      typeof q === 'string' ? open(`${id}n${fi + 1}a${i + 1}`, q, null, 2) : q
    );
    const make = (f.practice || f.make || []).map((p, i) => {
      if (Array.isArray(p)) {
        return produce(`${id}n${fi + 1}m${i + 1}`, p[0], p[1], p[2]);
      } else if (p && typeof p === 'object') {
        return produce(`${id}n${fi + 1}m${i + 1}`, p.q || p.prompt, p.a || p.model || p.ans, p.explain || p.why);
      }
      return p;
    });
    let compare = f.compare;
    if (Array.isArray(compare)) {
      compare = {
        head: ['Pattern', 'Example / Analytical gain'],
        rows: compare
      };
    }
    const radar = (f.radar || []).map(r => {
      if (typeof r === 'string') {
        return { wrong: '', right: '', why: r };
      }
      return r;
    });

    return {
      id: `${id}n${fi + 1}`,
      title: f.title,
      sub: f.sub || f.lead || '',
      noticeIt: f.examples || f.noticeIt || [],
      ask,
      explain: f.explain,
      compare,
      make,
      radar,
      help: f.help
    };
  }

  function makeUnit(id, s) {
    const vocab = s.vocab.map(vocabulary);
    const chunks = s.chunks.map((c, i) => chunk(c, i, id));
    const mainWriting = s.writing.main;
    const shortWriting = s.writing.short;
    return {
      id,
      module: s.module,
      title: s.title,
      titleEm: s.titleEm,
      question: s.question,
      know: {
        lead: s.knowLead,
        terms: s.terms.map(t => ({ term: t[0], def: t[1] })),
        timeline: s.timeline && s.timeline.map(t => ({ when: t[0], what: t[1] })),
        views: s.views && {
          title: s.views[0],
          a: { name: s.views[1], text: s.views[2] },
          b: { name: s.views[3], text: s.views[4] },
          note: s.views[5]
        },
        items: [open(`${id}k1`, s.knowPrompt, s.knowGuide, 5, 'Before you read')]
      },
      read: {
        main: {
          label: s.read.main.label || 'Main reading',
          format: s.read.main.format,
          title: s.read.main.title,
          standfirst: s.read.main.standfirst,
          pull: s.read.main.pull,
          notes: s.read.main.notes,
          paras: s.read.main.paras
        },
        counter: s.read.counter && {
          label: s.read.counter.label || 'Counterpoint',
          format: s.read.counter.format,
          title: s.read.counter.title,
          standfirst: s.read.counter.standfirst,
          pull: s.read.counter.pull,
          notes: s.read.counter.notes,
          paras: s.read.counter.paras
        },
        sources: s.sources
      },
      interpret: {
        lead: s.interpretLead || 'Answer before checking. The first questions test close reading; the later ones ask you to weigh evidence, assumptions and implications.',
        items: s.interpret
      },
      notice: {
        focuses: s.notice.map((f, i) => noticeFocus(f, i, id)),
        mini: s.mini && {
          id: `${id}n3`, title: s.mini.title, explain: s.mini.explain,
          items: s.mini.items.map((p, i) => produce(`${id}n3m${i + 1}`, p[0], p[1], p[2]))
        }
      },
      steal: {
        vocab,
        chunks,
        practice: [
          {
            id: `${id}s1`, type: 'match', title: 'Structures and their jobs',
            q: 'Match each formulation to what it allows a writer to do.',
            pairs: chunks.slice(0, 6).map(c => [c.c, c.func])
          },
          {
            id: `${id}s2`, type: 'group', title: 'Choose the natural collocation',
            items: s.collocations.map((p, i) => ({ id: `${id}s2${i + 1}`, type: 'mc', q: p[0], options: p[1], answer: p[2], explain: p[3] }))
          },
          {
            id: `${id}s3`, type: 'group', title: 'Upgrade the thought',
            lead: 'Rewrite the basic sentence with language from this unit. Preserve the meaning; improve the precision.',
            items: s.upgrades.map((p, i) => produce(`${id}s3${i + 1}`, p[0], p[1], p[2]))
          }
        ]
      },
      think: {
        title: s.think.title,
        lead: s.think.lead,
        defs: (s.think.defs || []).map(d => ({ term: d[0], def: d[1] })),
        // Every authored field is kept (options, answer, explain, labels…): only missing ones get a default
        items: (s.think.items || []).map(t => Object.assign({}, t, {
          id: t.id,
          type: t.type || 'open',
          tag: t.tag || 'Critical reasoning',
          q: t.q || t.task || t.prompt || (t.title ? `<b>${t.title}:</b> ${t.task || ''}` : ''),
          guide: Array.isArray(t.guide) ? t.guide : (t.guide ? [t.guide] : null),
          rows: t.rows || 4
        }))
      },
      write: {
        focus: {
          title: s.writing.focus.title,
          text: s.writing.focus.text,
          weak: s.writing.focus.weak,
          strong: s.writing.focus.strong
        },
        items: [
          {
            id: `${id}w1`, type: 'writing', kind: shortWriting.kind, title: shortWriting.title,
            min: shortWriting.min, max: shortWriting.max, prompt: shortWriting.prompt,
            support: Array.isArray(shortWriting.support) ? shortWriting.support : (shortWriting.support ? [shortWriting.support] : []), guide: shortWriting.guide
          },
          {
            id: `${id}w2`, type: 'writing', kind: mainWriting.kind, title: mainWriting.title,
            min: mainWriting.min, max: mainWriting.max, prompt: mainWriting.prompt,
            support: Array.isArray(mainWriting.support) ? mainWriting.support : (mainWriting.support ? [mainWriting.support] : []), guide: mainWriting.guide, main: true
          }
        ]
      },
      edit: {
        draftOf: `${id}w2`,
        checklist: s.edit.checklist,
        // EDIT shows challenges as a checklist of strings; a challenge written as an exercise object
        // ({ title, task, bad, good }) shows its own title and task, and the full object is kept
        challenges: (s.edit.challenges || []).map(c => (typeof c === 'string' ? c : `<b>${c.title}.</b> ${c.task}`)),
        challengeExercises: (s.edit.challenges || []).filter(c => c && typeof c === 'object'),
        revised: {
          id: `${id}w2r`, type: 'writing', kind: `${mainWriting.kind} · revised`,
          title: `${mainWriting.title} · second draft`, min: mainWriting.min, max: mainWriting.max,
          revisionOf: `${id}w2`, prompt: 'Rewrite the piece after applying the checklist and your chosen challenges.'
        }
      },
      retrieve: {
        lead: 'Close the unit and do not scroll up. Reconstruct first; verify only after you have committed an answer.',
        items: [
          open(`${id}r1`, 'Write 8 vocabulary items from this unit and one natural collocation for at least four of them.', null, 4),
          open(`${id}r2`, 'Reconstruct 5 chunks or sentence frames. For each one, state its rhetorical function.', null, 4),
          open(`${id}r3`, 'Use 3 of those structures in a short paragraph that is unrelated to the unit topic.', null, 5),
          open(`${id}r4`, s.retrieve.content, s.retrieve.contentGuide, 5),
          open(`${id}r5`, s.retrieve.grammar, s.retrieve.grammarGuide, 4),
          open(`${id}r6`, s.retrieve.reasoning, s.retrieve.reasoningGuide, 4),
          { id: `${id}r7`, type: 'open', q: 'Write a 100-word synthesis of the unit. Include the main claim, the strongest complication, and your present view.', rows: 6, target: [90, 110] },
          open(`${id}r8`, 'Return mentally to your answer in KNOW. What would you now revise, qualify or defend? Do not look at it until you have answered.', null, 4),
          open(`${id}r9`, s.retrieve.cumulative || 'Connect this unit to one earlier unit: identify a shared idea and one important difference.', null, 4)
        ],
        reveal: { summary: s.retrieve.summary }
      }
    };
  }

  K.makeUnit = makeUnit;

  /* Speaking in the one contract the book renders ({ id, label, level, seconds, prompt, prepare, targets,
     rubric[] }). A unit written as a three-part card (part1 / part2 {topic, prompts, guide} / part3,
     rubric as an object) keeps every authored field; the canonical fields are built from its own words. */
  K.canonicalSpeaking = function (s) {
    if (!s || s.prompt) return s;
    const p2 = s.part2 || {};
    const cues = (p2.prompts || []).map(x => String(x).replace(/\.$/, ''));
    return Object.assign({}, s, {
      id: s.id || 's1', label: s.label || 'SAY IT', level: s.level || 'B2+ → C1', seconds: s.seconds || [60, 120],
      prompt: [p2.topic, cues.length ? `Cover: ${cues.join('; ')}.` : ''].filter(Boolean).join(' '),
      prepare: p2.guide || 'Prepare with keywords, not a script.',
      targets: Array.isArray(s.targets) ? s.targets : [],
      rubric: Array.isArray(s.rubric) ? s.rubric : Object.entries(s.rubric || {}).map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`),
    });
  };

  /* Listening whose audio is not recorded yet: honest about it (audioReady:false, no player), pointing
     at where the recording will live (/audio/en/unit-NN/uNN-listening-0N.mp3). Scripts and questions
     are kept as authored; an unrecorded track never claims a length. */
  K.pendingListening = function (unit, list) {
    return (list || []).map((l, i) => {
      const out = Object.assign({}, l, { file: `/audio/en/unit-${unit}/u${unit}-listening-${String(i + 1).padStart(2, '0')}.mp3`, audioReady: false });
      delete out.audio;
      return out;
    });
  };
})(window.KLANG);
