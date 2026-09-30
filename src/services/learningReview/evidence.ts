import crypto from 'crypto';
import { contentIndex, plain } from '../content';

/* Learning Review · evidence. Reads what the learner has already synced (user_documents) and the
   trusted curriculum, and turns it into small evidence items. Read-only: nothing here writes.
   Every item says where it came from, so the analysis never mistakes an earlier AI assessment
   for something the learner did:
     learner   = the learner's own words (answers, drafts, transcripts, conversation turns)
     check     = a deterministic check of an objective answer against the answer key
     record    = the learner's own bookkeeping (Glossary status, Error Log row, retrieval log)
     ai        = an earlier AI assessment (secondary: may be wrong, never a primary fact)

   Provenance distinctions:
     independent              = independent production by learner
     support_used             = production with Writing Support or scaffolded help
     after_feedback           = revision or answer submitted after viewing AI feedback
     revision                 = Draft 2 linked to Draft 1 after feedback
     retrieval                = personal retrieval / retrieval practice
     objective_check          = objective check against key
     original_learner_production = direct student text
     ai_generated_assessment  = AI feedback
     transcript               = speech transcript (Whisper: not trusted for fine grammar)
     record_noticing          = glossary rating or error log entry */

export type Origin = 'learner' | 'check' | 'record' | 'ai';
export type Provenance =
  | 'independent'
  | 'support_used'
  | 'after_feedback'
  | 'revision'
  | 'retrieval'
  | 'objective_check'
  | 'original_learner_production'
  | 'ai_generated_assessment'
  | 'transcript'
  | 'record_noticing';

export interface OpportunityInfo {
  count: number | 'unknown';
  type: string;
}

export interface EvidenceItem {
  id: string;
  hash: string;
  unit: string;            // '01' … or 'r1' for a Module Review
  stage: string;           // interpret, think, write, listening, speaking, conversation, glossary, errorlog …
  activityId: string;      // curriculum item id (or a record id)
  activityLabel: string;   // human label, e.g. "Unit 01 · INTERPRET · i8 (Inference)"
  origin: Origin;
  provenance: Provenance;
  kind: string;
  at: string | null;       // item timestamp when the data has one (many answers have none)
  task: string;            // trusted curriculum prompt, shortened (never learner text)
  text: string;            // minimised content sent to the model
  linkedTo?: string;       // for ai items: the learner item they assess
  production?: boolean;    // learner production (vs. recognition/record)
  positive?: boolean;      // positive counter-evidence / correct usage
  supportUsed?: boolean;   // true if hints/writing support was opened
  afterFeedback?: boolean; // true if written after AI feedback
  opportunity?: OpportunityInfo;
}

export interface DocLike { key: string; data: any; revision: number; updatedAt: Date }

// Minimisation: the model gets snippets, never whole essays or whole histories.
export const LIMITS = { answer: 600, writing: 900, transcript: 600, turn: 280, turns: 6, task: 220, note: 220 } as const;

const ITEM_TYPES = new Set(['mc', 'tf', 'open', 'produce', 'label', 'match', 'writing']);
const UNIT_STAGES = ['know', 'interpret', 'notice', 'steal', 'think', 'write', 'edit', 'retrieve'];
const REVIEW_STAGES = ['retrieve', 'language', 'steal', 'reading', 'reasoning', 'editing', 'synthesis', 'timed'];
const PRODUCTION_TYPES = new Set(['open', 'produce', 'writing']);

export const clip = (s: unknown, n: number) => {
  const t = plain(s);
  return t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t;
};
const sha = (v: unknown) => crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex').slice(0, 20);
const isoOrNull = (v: unknown) => (typeof v === 'string' && !Number.isNaN(Date.parse(v)) ? new Date(v).toISOString() : null);
const STAGE_LABEL = (s: string) => s.toUpperCase();

export interface ActivityInfo { id: string; unit: string; stage: string; type: string; tag: string; q: string; main?: boolean; min?: number; max?: number; kind?: string; order: number }

/** Every answerable item of a unit (or review), keyed by id, from the trusted curriculum. */
export function activityIndex(unit: string): Map<string, ActivityInfo> {
  const { units, reviews } = contentIndex();
  const out = new Map<string, ActivityInfo>();
  let order = 0;
  const add = (it: any, stage: string) => {
    if (!it || !it.id || out.has(it.id)) return;
    out.set(it.id, {
      id: it.id, unit, stage, type: it.type, tag: plain(it.tag || it.kind || ''),
      q: clip(it.q || it.prompt || it.title || '', LIMITS.task), main: !!it.main, min: it.min, max: it.max, kind: it.kind, order: order++,
    });
  };
  const walk = (n: any, stage: string) => {
    if (Array.isArray(n)) return n.forEach((x) => walk(x, stage));
    if (n && typeof n === 'object') {
      if (n.id && ITEM_TYPES.has(n.type)) add(n, stage);
      Object.keys(n).forEach((k) => walk(n[k], stage));
    }
  };
  if (/^r\d$/.test(unit)) {
    const r = reviews[unit.slice(1)];
    if (r) REVIEW_STAGES.forEach((s) => walk(r[s], s));
    return out;
  }
  const d = units[unit];
  if (!d) return out;
  UNIT_STAGES.forEach((s) => walk(d[s], s));
  if (d.edit?.revised?.id) add({ type: 'writing', ...d.edit.revised }, 'edit');
  return out;
}

function listeningIndex(unit: string) {
  const { units, reviews } = contentIndex();
  const src = /^r\d$/.test(unit) ? reviews[unit.slice(1)] : units[unit];
  const out = new Map<string, { q: any; activity: any }>();
  (src?.listening || []).forEach((l: any) => (l.questions || []).forEach((q: any) => out.set(`${l.id}:${q.id}`, { q, activity: l })));
  return out;
}

const unitLabel = (unit: string) => (/^r\d$/.test(unit) ? `Module Review ${unit.slice(1)}` : `Unit ${unit}`);
const labelFor = (a: ActivityInfo) => `${unitLabel(a.unit)} · ${STAGE_LABEL(a.stage)} · ${a.id}${a.tag ? ` (${a.tag})` : ''}`;

function objectiveCorrect(it: any, value: unknown): boolean | null {
  if (it.type === 'mc') return Number(value) === it.answer;
  if (it.type === 'tf') return (value === 'True') === it.answer;
  if (it.type === 'fill') return (it.answers || []).some((a: string) => String(a).split('|').every((p) => String(value || '').toLowerCase().includes(p.toLowerCase())));
  return null;
}

/** Evidence from one unit or review document (answers keyed "01:i8", "01:i8:intfb", "01:li:l1:q2" …). */
function fromAnswers(unit: string, answers: Record<string, any>): EvidenceItem[] {
  const out: EvidenceItem[] = [];
  const idx = activityIndex(unit), lidx = listeningIndex(unit);
  const prefix = unit + ':';
  const A = (k: string) => answers[prefix + k];
  for (const full of Object.keys(answers || {})) {
    if (!full.startsWith(prefix)) continue;
    const k = full.slice(prefix.length), v = answers[full];
    if (v == null || v === '' || v === false) continue;

    // Listening: answers, submission marker, feedback
    const li = k.match(/^li:([A-Za-z0-9_-]+):([A-Za-z0-9_-]+)(?::(feedback))?$/);
    if (li && li[2] !== 'submitted') {
      const info = lidx.get(`${li[1]}:${li[2]}`);
      if (!info) continue;
      const label = `${unitLabel(unit)} · LISTENING · ${li[1]} ${li[2]}`;
      const task = clip(info.q.q || '', LIMITS.task);
      if (li[3] === 'feedback') {
        if (typeof v !== 'object' || !v.understanding) continue;
        out.push({
          id: `lifb:${unit}:${li[1]}:${li[2]}`, hash: sha(v), unit, stage: 'listening', activityId: `${li[1]}:${li[2]}`, activityLabel: label, origin: 'ai', provenance: 'ai_generated_assessment', kind: 'listening_feedback', at: isoOrNull(v.at), task,
          text: `understanding: ${clip(v.understanding, LIMITS.note)} | missed: ${clip(v.missed, LIMITS.note)} | language: ${(v.language || []).slice(0, 3).map((x: any) => clip(x, 120)).join(' / ')}`, linkedTo: `li:${unit}:${li[1]}:${li[2]}`,
          opportunity: { count: 'unknown', type: 'listening_assessment' },
        });
        continue;
      }
      const sub = A(`li:${li[1]}:submitted`);
      if (['mc', 'tf', 'fill'].includes(info.q.type)) {
        if (!sub) continue;
        const answer = sub === true ? v : sub.answers?.[li[2]];
        if (String(answer) !== String(v)) continue;
        const ok = objectiveCorrect(info.q, v);
        if (ok === null) continue;
        out.push({
          id: `li:${unit}:${li[1]}:${li[2]}`, hash: sha([v, ok]), unit, stage: 'listening', activityId: `${li[1]}:${li[2]}`, activityLabel: label, origin: 'check', provenance: 'objective_check', kind: 'listening_objective', at: isoOrNull(sub.at), task,
          text: `${info.q.type} answer checked against the key: ${ok ? 'correct' : 'incorrect'}`,
          positive: ok === true,
          opportunity: { count: 1, type: 'recognition' },
        });
      } else if (typeof v === 'string' && v.trim().length >= 1) {
        out.push({
          id: `li:${unit}:${li[1]}:${li[2]}`, hash: sha(v), unit, stage: 'listening', activityId: `${li[1]}:${li[2]}`, activityLabel: label, origin: 'learner', provenance: 'independent', kind: 'listening_answer', at: isoOrNull(sub && sub.at), task, text: clip(v, LIMITS.answer), production: true,
          opportunity: { count: 1, type: 'listening_comprehension' },
        });
      }
      continue;
    }

    const m = k.match(/^([A-Za-z0-9_-]+)(?::(why|intfb|lightfb|outline|explainq))?$/);
    if (m && idx.has(m[1])) {
      const a = idx.get(m[1])!, label = labelFor(a), suffix = m[2];
      const supportUsed = !!(A(`${a.id}:support`) || A('support:open'));
      const isRevision = a.stage === 'edit' || a.id.endsWith('r') || a.id.includes('revised');

      if (!suffix) {
        if (PRODUCTION_TYPES.has(a.type) && typeof v === 'string' && v.trim().length >= 1) {
          const writing = a.type === 'writing';
          const words = v.trim().split(/\s+/).length;
          const prov: Provenance = isRevision ? 'revision' : supportUsed ? 'support_used' : 'independent';
          out.push({
            id: `ans:${unit}:${a.id}`, hash: sha(v), unit, stage: a.stage, activityId: a.id, activityLabel: label, origin: 'learner', provenance: prov, kind: writing ? 'writing_draft' : 'open_answer', at: null,
            task: a.q, text: writing ? `(${words} words; excerpt) ${clip(v, LIMITS.writing)}` : clip(v, LIMITS.answer), production: true,
            supportUsed, afterFeedback: isRevision,
            opportunity: { count: 1, type: writing ? 'extended_writing' : 'cued_production' },
          });
        } else if (a.type === 'mc' || a.type === 'tf') {
          const marker = A(`${a.id}:checked`);
          if (!marker) continue;
          const answer = marker === true ? v : marker.answer;
          if (String(answer) !== String(v)) continue;    // changed after the check: not evaluated
          const it = findItem(unit, a.id);
          const ok = it ? objectiveCorrect(it, v) : null;
          if (ok === null) continue;
          out.push({
            id: `chk:${unit}:${a.id}`, hash: sha([v, ok]), unit, stage: a.stage, activityId: a.id, activityLabel: label, origin: 'check', provenance: 'objective_check', kind: 'objective_check', at: isoOrNull(marker.at), task: a.q,
            text: `${a.type} answer checked against the key: ${ok ? 'correct' : 'incorrect'}`,
            positive: ok === true,
            opportunity: { count: 1, type: 'recognition' },
          });
        }
      } else if (suffix === 'why' && typeof v === 'string' && v.trim().length >= 1) {
        out.push({
          id: `why:${unit}:${a.id}`, hash: sha(v), unit, stage: a.stage, activityId: a.id, activityLabel: label, origin: 'learner', provenance: 'independent', kind: 'justification', at: null, task: a.q, text: clip(v, LIMITS.answer), production: true,
          opportunity: { count: 1, type: 'reasoning_justification' },
        });
      } else if (suffix === 'outline' && typeof v === 'string' && v.trim().length >= 1) {
        out.push({
          id: `outline:${unit}:${a.id}`, hash: sha(v), unit, stage: a.stage, activityId: a.id, activityLabel: label, origin: 'learner', provenance: 'independent', kind: 'outline', at: null, task: a.q, text: clip(v, LIMITS.answer), production: true,
          opportunity: { count: 1, type: 'essay_planning' },
        });
      } else if ((suffix === 'intfb' || suffix === 'lightfb') && v && typeof v === 'object' && v.f) {
        out.push({
          id: `${suffix}:${unit}:${a.id}`, hash: sha(v), unit, stage: a.stage, activityId: a.id, activityLabel: label, origin: 'ai', provenance: 'ai_generated_assessment', kind: suffix === 'intfb' ? 'interpret_feedback' : 'language_feedback', at: isoOrNull(v.at), task: a.q,
          text: compactLightFeedback(suffix === 'intfb' ? v.f.language : v.f, suffix === 'intfb' ? v.f.content : null), linkedTo: `ans:${unit}:${a.id}`,
          opportunity: { count: 'unknown', type: 'ai_feedback' },
        });
      } else if (suffix === 'explainq' && v && typeof v === 'object') {
        out.push({
          id: `explainq:${unit}:${a.id}`, hash: sha(v.at || true), unit, stage: a.stage, activityId: a.id, activityLabel: label, origin: 'record', provenance: 'record_noticing', kind: 'asked_question_explained', at: isoOrNull(v.at), task: a.q,
          text: 'The learner asked for this question to be explained before answering.',
          opportunity: { count: 'unknown', type: 'metacognitive_query' },
        });
      }
      continue;
    }

    // Metacognition, personal retrieval production, pronunciation, retrieval log
    const meta = k.match(/^meta:(before|after)$/);
    if (meta && typeof v === 'string' && v.trim().length >= 1) {
      out.push({
        id: `meta:${unit}:${meta[1]}`, hash: sha(v), unit, stage: 'think', activityId: `meta:${meta[1]}`, activityLabel: `${unitLabel(unit)} · THINK · metacognition (${meta[1]})`, origin: 'learner', provenance: 'independent', kind: 'metacognition', at: null,
        task: meta[1] === 'before' ? 'What was your first conclusion?' : 'Did your conclusion change, and why?', text: clip(v, LIMITS.answer), production: true,
        opportunity: { count: 1, type: 'metacognitive_reflection' },
      });
    } else if ((k === 'rg' || k === 'pron') && typeof v === 'string' && v.trim().length >= 1) {
      out.push({
        id: `${k}:${unit}`, hash: sha(v), unit, stage: k === 'rg' ? 'retrieve' : 'pronunciation', activityId: k, activityLabel: `${unitLabel(unit)} · ${k === 'rg' ? 'RETRIEVE · personal retrieval' : 'PRONUNCIATION in context'}`, origin: 'learner', provenance: k === 'rg' ? 'retrieval' : 'independent',
        kind: k === 'rg' ? 'personal_retrieval_answer' : 'pronunciation_answer', at: null, task: k === 'rg' ? 'Use the retrieved items from earlier units in your own sentences.' : 'Pronunciation-in-context task', text: clip(v, LIMITS.answer), production: true,
        opportunity: { count: 'unknown', type: k === 'rg' ? 'spontaneous_transfer' : 'pronunciation_practice' },
      });
    } else if (k === 'pr:log' && typeof v === 'string') {
      let log: any[] = [];
      try { log = JSON.parse(v); } catch { log = []; }
      if (!Array.isArray(log) || !log.length) continue;
      const last = log[log.length - 1] || {};
      out.push({
        id: `prlog:${unit}`, hash: sha(log), unit, stage: 'retrieve', activityId: 'pr:log', activityLabel: `${unitLabel(unit)} · RETRIEVE · personal retrieval log`, origin: 'record', provenance: 'retrieval', kind: 'retrieval_log', at: isoOrNull(last.d), task: 'Spaced personal retrieval of earlier Glossary and Error Log items',
        text: `${log.length} retrieval session(s); last on ${String(last.d || '').slice(0, 10)} showed ${(last.g || []).length} glossary item(s) and ${(last.e || []).length} Error Log pattern(s).`,
        opportunity: { count: log.length, type: 'spaced_retrieval_session' },
      });
    }
  }
  return out;
}

function findItem(unit: string, id: string): any {
  const { units, reviews } = contentIndex();
  const src = /^r\d$/.test(unit) ? reviews[unit.slice(1)] : units[unit];
  let found: any = null;
  const walk = (n: any) => {
    if (found) return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (n && typeof n === 'object') { if (n.id === id && ITEM_TYPES.has(n.type)) { found = n; return; } Object.keys(n).forEach((k) => walk(n[k])); }
  };
  walk(src);
  return found;
}

function compactLightFeedback(f: any, content: any): string {
  const parts: string[] = [];
  if (content && content.verdict) parts.push(`task verdict: ${content.verdict}`);
  if (f && typeof f === 'object') {
    if (typeof f.meaningClear === 'boolean') parts.push(`meaning clear: ${f.meaningClear ? 'yes' : 'no'}`);
    const pts = (f.pointsToNotice || []).slice(0, 4).map((p: any) => `[${p.category}] "${clip(p.quote, 80)}" → "${clip(p.suggestion, 80)}" (${clip(p.issue, 90)})`);
    if (pts.length) parts.push(`points: ${pts.join('; ')}`);
    if (f.errorLogCandidate) parts.push(`suggested error: "${clip(f.errorLogCandidate.mine, 80)}" → "${clip(f.errorLogCandidate.corr, 80)}"`);
  }
  return parts.join(' | ') || 'no specific points';
}

function fromPortfolio(pf: Record<string, any>): EvidenceItem[] {
  const out: EvidenceItem[] = [];
  for (const taskKey of Object.keys(pf || {})) {
    const p = pf[taskKey], [unit, taskId] = taskKey.split(':');
    if (!p || !Array.isArray(p.fb) || !unit || !taskId) continue;
    const a = activityIndex(unit).get(taskId);
    const label = a ? labelFor(a) : `${unitLabel(unit)} · WRITE · ${taskId}`;
    p.fb.forEach((e: any, i: number) => {
      if (!e || !e.f) return;
      const f = e.f;
      const rec = (f.recurringErrors || []).slice(0, 4).map((r: any) => `${clip(r.pattern, 80)} (e.g. ${(r.examples || []).slice(0, 2).map((x: string) => `"${clip(x, 70)}"`).join(', ')})`);
      const pri = (f.nextDraftPriorities || []).slice(0, 3).map((x: string) => clip(x, 120));
      out.push({
        id: `wfb:${unit}:${taskId}:${e.id || i}`, hash: sha([e.at, e.draft, rec, pri, (f.isolatedErrors || []).length]), unit, stage: a?.stage || 'write', activityId: taskId, activityLabel: label, origin: 'ai', provenance: 'ai_generated_assessment', kind: 'writing_feedback', at: isoOrNull(e.at), task: a?.q || '',
        text: `${e.draft === 'revised' ? 'revised' : 'first'} draft, ${e.words || '?'} words | recurring: ${rec.join('; ') || 'none'} | isolated errors: ${(f.isolatedErrors || []).length} | next-draft priorities: ${pri.join(' / ') || '—'}`,
        linkedTo: `ans:${unit}:${taskId}`,
        opportunity: { count: 'unknown', type: 'writing_assessment' },
      });
    });
  }
  return out;
}

function fromSpeaking(attempts: any[]): EvidenceItem[] {
  const out: EvidenceItem[] = [];
  for (const s of attempts || []) {
    if (!s || !s.id || !/^\d\d$|^r\d$/.test(String(s.unit || ''))) continue;
    const label = `${unitLabel(s.unit)} · SPEAKING · ${s.activityId || 'say it'} (attempt ${s.attempt || 1})`;
    if (typeof s.transcript === 'string' && s.transcript.trim()) {
      out.push({
        id: `sp:${s.id}`, hash: sha(s.transcript), unit: s.unit, stage: 'speaking', activityId: String(s.activityId || 'speaking'), activityLabel: label, origin: 'learner', provenance: 'transcript', kind: 'speaking_transcript', at: isoOrNull(s.date), task: 'Spoken response (automatic transcript; not reliable for fine grammar)',
        text: clip(s.transcript, LIMITS.transcript), production: true,
        opportunity: { count: 1, type: 'spoken_production' },
      });
    }
    if (s.feedback && typeof s.feedback === 'object') {
      const f = s.feedback;
      const cor = (f.corrections || []).slice(0, 4).map((c: any) => `"${clip(c.original, 70)}" → "${clip(c.better, 70)}"`);
      out.push({
        id: `spfb:${s.id}`, hash: sha([f.recurringErrors, cor]), unit: s.unit, stage: 'speaking', activityId: String(s.activityId || 'speaking'), activityLabel: label, origin: 'ai', provenance: 'ai_generated_assessment', kind: 'speaking_feedback', at: isoOrNull(s.date), task: 'Spoken response',
        text: `recurring: ${(f.recurringErrors || []).slice(0, 4).map((x: string) => clip(x, 90)).join('; ') || 'none'} | corrections: ${cor.join('; ') || 'none'}`, linkedTo: `sp:${s.id}`,
        opportunity: { count: 'unknown', type: 'speaking_assessment' },
      });
    }
  }
  return out;
}

function fromConversation(key: string, c: any): EvidenceItem[] {
  const out: EvidenceItem[] = [];
  if (!c || !Array.isArray(c.turns) || !/^\d\d$/.test(String(c.unitId || ''))) return out;
  const id = key.slice('conversation:'.length), unit = c.unitId;
  const label = `${unitLabel(unit)} · CONVERSATION with the Narrator (${c.mode || 'normal'})`;
  const users = c.turns.filter((t: any) => t && t.role === 'user');
  const spontaneous = users.filter((t: any) => t.provenance === 'spontaneous');
  const helped = users.filter((t: any) => t.provenance !== 'spontaneous');

  if (spontaneous.length) {
    const shown = spontaneous.slice(-LIMITS.turns);
    out.push({
      id: `conv:${id}`, hash: sha(users.map((t: any) => [t.id, t.text])), unit, stage: 'conversation', activityId: id, activityLabel: label, origin: 'learner', provenance: 'independent', kind: 'conversation_turns',
      at: isoOrNull(shown[shown.length - 1].createdAt), task: 'Written conversation about the unit text',
      text: `${spontaneous.length} spontaneous turn(s)${helped.length ? `, ${helped.length} written with help` : ''}: ${shown.map((t: any) => `"${clip(t.text, LIMITS.turn)}"`).join(' / ')}`, production: true,
      opportunity: { count: spontaneous.length, type: 'conversational_turn' },
    });
  }
  if (helped.length) {
    const shown = helped.slice(-LIMITS.turns);
    out.push({
      id: `convhelp:${id}`, hash: sha(helped.map((t: any) => [t.id, t.text])), unit, stage: 'conversation', activityId: id, activityLabel: label + ' (scaffolded)', origin: 'learner', provenance: 'support_used', kind: 'conversation_turns_supported',
      at: isoOrNull(shown[shown.length - 1].createdAt), task: 'Written conversation with formulation help',
      text: `${helped.length} turn(s) drafted with formulation help: ${shown.map((t: any) => `"${clip(t.text, LIMITS.turn)}"`).join(' / ')}`, production: true, supportUsed: true,
      opportunity: { count: helped.length, type: 'scaffolded_turn' },
    });
  }
  const rv = c.reviewState;
  if (rv && rv.status === 'complete' && rv.result) {
    const r = rv.result;
    const issues = (r.issues || []).filter((x: any) => x.pedagogicallyRelevant).slice(0, 4).map((x: any) => `[${x.category}${x.recurring ? ', recurring' : ''}] "${clip(x.original, 70)}" → "${clip(x.improved, 70)}"`);
    const indep = (r.successfulLanguage || []).filter((x: any) => x.independentlyProduced).slice(0, 4).map((x: any) => `"${clip(x.text, 70)}"`);
    out.push({
      id: `convrv:${id}`, hash: sha(rv.audit?.reviewedAt || r), unit, stage: 'conversation', activityId: id, activityLabel: label, origin: 'ai', provenance: 'ai_generated_assessment', kind: 'conversation_review', at: isoOrNull(rv.audit?.reviewedAt), task: 'Conversation review',
      text: `comprehension: ${r.comprehension?.verdict || '—'} | issues: ${issues.join('; ') || 'none'} | independently produced: ${indep.join(', ') || 'none'}`, linkedTo: `conv:${id}`,
      opportunity: { count: 'unknown', type: 'conversation_assessment' },
    });
  }
  return out;
}

function fromErrorLog(errs: any[]): EvidenceItem[] {
  return (errs || []).filter((e) => e && e.id && (e.mine || e.corr)).map((e) => {
    const unit = /^\d\d$/.test(String(e.u || e.unit || '')) ? String(e.u || e.unit) : '';
    const practiced = e.n || 0;
    return {
      id: `err:${e.id}`, hash: sha([e.mine, e.corr, e.why, practiced]), unit, stage: 'errorlog', activityId: String(e.id), activityLabel: `Error Log${unit ? ` · from Unit ${unit}` : ''}${e.source ? ` · ${e.source}` : ''}`,
      origin: 'record' as Origin, provenance: 'record_noticing' as Provenance, kind: 'error_log_entry', at: isoOrNull(e.last), task: 'An error the learner chose to keep in the Error Log',
      text: `"${clip(e.mine, 120)}" → "${clip(e.corr, 120)}"${e.why ? ` (${clip(e.why, 100)})` : ''}; practised correctly ${practiced} time(s)`,
      positive: practiced > 0,
      opportunity: { count: practiced, type: 'error_retrieval_practice' },
    };
  });
}

function fromGlossary(gl: Record<string, string>, glx: any[]): EvidenceItem[] {
  const { units } = contentIndex();
  const out: EvidenceItem[] = [];
  for (const key of Object.keys(gl || {})) {
    const status = gl[key];
    if (!['new', 'learning', 'know'].includes(status)) continue;
    const m = key.match(/^(\d\d):(v|c|x):(.+)$/);
    if (!m) continue;
    let term = '';
    if (m[2] === 'x') term = ((glx || []).find((g) => g && g.id === m[3]) || {}).term || '';
    else if (m[2] === 'v') term = ((units[m[1]]?.steal?.vocab || []).find((v: any) => (Array.isArray(v) ? v[0] : v.w) === m[3]) || [m[3]])[0] || m[3];
    else term = plain(((units[m[1]]?.steal?.chunks || []).find((c: any) => c.key === m[3]) || {}).c || m[3]);
    if (!term) continue;
    out.push({
      id: `gl:${key}`, hash: sha(status), unit: m[1], stage: 'glossary', activityId: key, activityLabel: `Glossary · Unit ${m[1]} · ${m[2] === 'x' ? 'own entry' : m[2] === 'c' ? 'chunk' : 'word'}`,
      origin: 'record', provenance: 'record_noticing', kind: 'glossary_status', at: null, task: 'The learner\'s own rating of an item: new / learning / know', text: `"${clip(term, 80)}" marked ${status.toUpperCase()}`,
      positive: status === 'know',
      opportunity: { count: 'unknown', type: 'lexical_noticing' },
    });
  }
  return out;
}

/** All evidence currently in the learner's synced documents. Pure: the same documents give the same items. */
export function extractEvidence(docs: DocLike[]): EvidenceItem[] {
  const items: EvidenceItem[] = [];
  for (const d of docs) {
    const data = d.data || {};
    if (/^unit:\d\d$/.test(d.key)) items.push(...fromAnswers(d.key.slice(5), data.answers || {}));
    else if (/^review:\d$/.test(d.key)) items.push(...fromAnswers('r' + d.key.slice(7), data.answers || {}));
    else if (d.key === 'portfolio') items.push(...fromPortfolio(data.pf || {}));
    else if (d.key === 'speaking') items.push(...fromSpeaking(data.attempts || []));
    else if (d.key === 'error-log') items.push(...fromErrorLog(data.errs || []));
    else if (d.key === 'glossary') items.push(...fromGlossary(data.gl || {}, data.glx || []));
    else if (d.key.startsWith('conversation:')) items.push(...fromConversation(d.key, data));
    // Not evidence: bookmarks, progress/prefs, current-affairs, the derived english-profile, the retired language-bank.
  }
  const seen = new Set<string>();
  return items.filter((i) => (seen.has(i.id) ? false : (seen.add(i.id), true)));
}

/** The document keys whose revisions define a run's boundary. */
export const EVIDENCE_DOC = (key: string) => /^(unit:\d\d|review:\d|portfolio|speaking|error-log|glossary|conversation:.+)$/.test(key);

const PRIORITY: Record<Origin, number> = { learner: 0, ai: 1, check: 2, record: 3 };

/** New = never analysed, or changed since. Returns the batch for this run and how many wait for the next one. */
export function newEvidence(all: EvidenceItem[], analysed: Record<string, string>, maxItems: number) {
  const fresh = all.filter((i) => analysed[i.id] !== i.hash);
  const ordered = fresh.slice().sort((a, b) => PRIORITY[a.origin] - PRIORITY[b.origin] || a.unit.localeCompare(b.unit) || a.id.localeCompare(b.id));
  const batch = ordered.slice(0, Math.max(1, maxItems));
  return { batch, deferred: ordered.length - batch.length, total: fresh.length };
}
