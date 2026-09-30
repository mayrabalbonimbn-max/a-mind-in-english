import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { contentIndex } from '../../src/services/content';

/* Consumer contract of the curriculum: the fields the book's renderers (public/app.js) and the server
   really read, checked on the real data of Units 01–32 and Module Reviews 1–7. Shape, not counts. */

const ROOT = path.resolve(__dirname, '../..');
export type Issue = { where: string; problem: string };
const ITEM_TYPES = new Set(['mc', 'tf', 'open', 'produce', 'label', 'match', 'group', 'quote']);
const LISTEN_Q = new Set(['mc', 'tf', 'fill', 'open']);
const str = (v: unknown) => typeof v === 'string' && v.trim().length > 0;
const arr = (v: unknown, min = 1) => Array.isArray(v) && v.length >= min;

/** CORE map and pronunciation exactly as the browser defines them. */
export function bookGlobals() {
  const app = fs.readFileSync(path.join(ROOT, 'public/app.js'), 'utf8');
  const m = app.match(/const CORE = (\{[\s\S]*?\n  \});/);
  const CORE = m ? vm.runInNewContext(`(${m[1]})`) : {};
  const ctx: any = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'public/data/pronunciation.js'), 'utf8'), ctx);
  return { CORE, PRON: ctx.window.KLANG?.pronunciation || {} };
}

export function audioPath(file: string) { return path.join(ROOT, 'public', file.replace(/^\//, '')); }

function checkItem(it: any, where: string, out: Issue[], ids: Map<string, string>) {
  const w = `${where} ${it?.id ?? '?'}`;
  if (!it || typeof it !== 'object') { out.push({ where, problem: 'item is not an object' }); return; }
  if (it.type === 'group') { if (!arr(it.items)) out.push({ where: w, problem: 'group without items' }); (it.items || []).forEach((x: any) => checkItem(x, where, out, ids)); return; }
  if (!str(it.id)) out.push({ where: w, problem: 'missing id' });
  else if (ids.has(it.id)) out.push({ where: w, problem: `duplicate id (also in ${ids.get(it.id)})` }); else ids.set(it.id, where);
  if (!ITEM_TYPES.has(it.type)) { out.push({ where: w, problem: `type "${it.type}" has no renderer (would render nothing)` }); return; }
  if (!str(it.q)) out.push({ where: w, problem: 'missing q (question text)' });
  if (it.type === 'mc') {
    const opts = it.options || it.choices;
    if (!arr(opts, 2)) out.push({ where: w, problem: 'mc without ≥2 options' });
    else if (!Number.isInteger(it.answer) || it.answer < 0 || it.answer >= opts.length) out.push({ where: w, problem: `mc answer ${JSON.stringify(it.answer)} not an index of its options` });
  }
  if (it.type === 'tf' && typeof it.answer !== 'boolean') out.push({ where: w, problem: 'tf answer is not boolean' });
  if (it.type === 'quote' && (!str(it.find) || !str(it.quote))) out.push({ where: w, problem: 'quote without find/quote (nothing to check against)' });
  if (it.type === 'produce' && !arr(it.model)) out.push({ where: w, problem: 'produce without model (check answer would show nothing)' });
  if (it.type === 'label' && (!arr(it.rows) || !arr(it.labels))) out.push({ where: w, problem: 'label without rows/labels' });
  if (it.type === 'match' && (!arr(it.pairs) || !it.pairs.every((p: any) => Array.isArray(p) && p.length === 2))) out.push({ where: w, problem: 'match without [left,right] pairs' });
}

function checkWriting(it: any, where: string, out: Issue[], ids: Map<string, string>) {
  const w = `${where} ${it?.id ?? '?'}`;
  if (!it) { out.push({ where, problem: 'missing writing task' }); return; }
  if (!str(it.id)) out.push({ where: w, problem: 'missing id' }); else if (ids.has(it.id)) out.push({ where: w, problem: 'duplicate id' }); else ids.set(it.id, where);
  if (it.type !== 'writing') out.push({ where: w, problem: `writing task type is ${JSON.stringify(it.type)} (expected "writing")` });
  for (const f of ['kind', 'title', 'prompt']) if (!str(it[f])) out.push({ where: w, problem: `writing task missing ${f}` });
  if (!(+it.min > 0) || !(+it.max >= +it.min)) out.push({ where: w, problem: `writing task min/max invalid (${it.min}–${it.max})` });
}

export type MediaRow = { owner: string; id: string; file: string | null; ready: boolean; exists: boolean };
function checkListening(list: any, owner: string, dirRe: RegExp, out: Issue[], media: MediaRow[]) {
  if (!arr(list)) { out.push({ where: `${owner} listening`, problem: 'no listening' }); return; }
  const lids = new Set<string>();
  for (const l of list) {
    const w = `${owner} listening ${l?.id}`;
    if (!str(l?.id)) out.push({ where: w, problem: 'missing id' }); else if (lids.has(l.id)) out.push({ where: w, problem: 'duplicate id' }); else lids.add(l.id);
    if (!str(l.title)) out.push({ where: w, problem: 'missing title' });
    if (l.audioReady !== false && (typeof l.duration !== 'number' || !(l.duration > 0))) out.push({ where: w, problem: `recorded track without a positive duration (${l.duration})` });
    const file = l.file || l.audio || null;
    const ready = l.audioReady !== false;
    const exists = !!file && fs.existsSync(audioPath(file));
    media.push({ owner, id: l.id, file, ready, exists });
    if (ready && !file) out.push({ where: w, problem: 'marked ready but has no audio file' });
    if (ready && file && !exists) out.push({ where: w, problem: `marked ready but ${file} does not exist` });
    if (file && !dirRe.test(file)) out.push({ where: w, problem: `audio ${file} does not belong to ${owner}` });
    if (!arr(l.questions)) out.push({ where: w, problem: 'no questions' });
    const qids = new Set<string>();
    for (const q of l.questions || []) {
      const qw = `${w} ${q?.id}`;
      if (!str(q?.id) || qids.has(q.id)) out.push({ where: qw, problem: 'missing or duplicate question id' }); else qids.add(q.id);
      if (!LISTEN_Q.has(q.type)) out.push({ where: qw, problem: `question type "${q.type}" has no renderer` });
      if (!str(q.q)) out.push({ where: qw, problem: 'missing q' });
      if (q.type === 'mc' && (!arr(q.options, 2) || !Number.isInteger(q.answer) || q.answer >= q.options.length)) out.push({ where: qw, problem: 'mc options/answer invalid' });
      if (q.type === 'tf' && typeof q.answer !== 'boolean') out.push({ where: qw, problem: 'tf answer not boolean' });
      if (q.type === 'fill' && !arr(q.answers)) out.push({ where: qw, problem: 'fill without answers' });
      if (q.type === 'open' && !arr(q.rubric)) out.push({ where: qw, problem: 'open without rubric (rendered after submit)' });
      if ((q.type === 'mc' || q.type === 'tf' || q.type === 'fill') && !str(q.explain)) out.push({ where: qw, problem: 'missing explain (shown after submit)' });
    }
  }
}

/** Canonical speaking contract (what speakingHtml renders without any fallback). */
function checkSpeaking(s: any, where: string, out: Issue[]) {
  const w = `${where} speaking`;
  if (!s) { out.push({ where: w, problem: 'missing' }); return; }
  for (const f of ['id', 'label', 'level', 'prompt', 'prepare']) if (!str(s[f])) out.push({ where: w, problem: `missing ${f} (non-canonical speaking shape)` });
  if (!Array.isArray(s.seconds) || s.seconds.length !== 2 || !s.seconds.every((n: any) => typeof n === 'number' && n > 0)) out.push({ where: w, problem: 'seconds is not [min,max]' });
  if (!Array.isArray(s.targets)) out.push({ where: w, problem: 'targets is not an array' });
  if (!arr(s.rubric)) out.push({ where: w, problem: 'rubric missing' });
}

function hasUndefinedString(v: any, where: string, out: Issue[]) {
  const walk = (x: any, p: string) => {
    if (typeof x === 'string') { if (/\bundefined\b|\bNaN\b|\[object Object\]/.test(x)) out.push({ where: `${where} ${p}`, problem: `string contains "${(x.match(/\bundefined\b|\bNaN\b|\[object Object\]/) || [])[0]}"` }); return; }
    if (x && typeof x === 'object') Object.keys(x).forEach((k) => walk(x[k], p ? `${p}.${k}` : k));
  };
  walk(v, '');
}

export function auditUnits(): { issues: Issue[]; media: MediaRow[] } {
  const { units, unitIds } = contentIndex() as any;
  const { CORE, PRON } = bookGlobals();
  const out: Issue[] = [], media: MediaRow[] = [];
  for (let i = 1; i <= 32; i++) {
    const u = String(i).padStart(2, '0'), d = units[u], W = `U${u}`;
    if (!d) { out.push({ where: W, problem: 'unit missing' }); continue; }
    const ids = new Map<string, string>();
    if (d.id !== u) out.push({ where: W, problem: `id is ${JSON.stringify(d.id)}` });
    for (const f of ['title', 'question']) if (!str(d[f])) out.push({ where: W, problem: `missing ${f}` });
    // KNOW
    const k = d.know;
    if (!k || !str(k.lead) || !arr(k.terms) || !k.terms.every((t: any) => str(t.term) && str(t.def))) out.push({ where: `${W} know`, problem: 'lead/terms{term,def} incomplete' });
    (k?.items || []).forEach((it: any) => checkItem(it, `${W} know`, out, ids));
    // READ
    for (const which of ['main', 'counter']) {
      const r = d.read?.[which];
      if (!r) { if (which === 'main') out.push({ where: `${W} read`, problem: 'no main reading' }); continue; }
      for (const f of ['label', 'format', 'title', 'standfirst']) if (!str(r[f])) out.push({ where: `${W} read.${which}`, problem: `missing ${f}` });
      if (!arr(r.paras) || !r.paras.every(str)) out.push({ where: `${W} read.${which}`, problem: 'paras empty or not strings' });
    }
    // INTERPRET + listening
    if (!str(d.interpret?.lead)) out.push({ where: `${W} interpret`, problem: 'missing lead' });
    (d.interpret?.items || []).forEach((it: any) => checkItem(it, `${W} interpret`, out, ids));
    checkListening(d.listening, W, new RegExp(`^/audio/en/unit-${u}/u${u}-`), out, media);
    // NOTICE
    if (!arr(d.notice?.focuses)) out.push({ where: `${W} notice`, problem: 'no focuses' });
    (d.notice?.focuses || []).forEach((f: any, fi: number) => {
      if (!str(f.title)) out.push({ where: `${W} notice.focus${fi + 1}`, problem: 'missing title' });
      [...(f.ask || []), ...(f.make || [])].forEach((it: any) => checkItem(it, `${W} notice.focus${fi + 1}`, out, ids));
    });
    (d.notice?.mini?.items || []).forEach((it: any) => checkItem(it, `${W} notice.mini`, out, ids));
    // STEAL
    const s = d.steal;
    (s?.vocab || []).forEach((v: any) => { for (const f of ['key', 'w', 'pos', 'def', 'ctx', 'ex']) if (!str(v[f])) out.push({ where: `${W} steal.vocab ${v.key || v.w}`, problem: `missing ${f}` }); if (!Array.isArray(v.col) || !Array.isArray(v.syn)) out.push({ where: `${W} steal.vocab ${v.key}`, problem: 'col/syn not arrays' }); });
    (s?.chunks || []).forEach((c: any) => { for (const f of ['key', 'c', 'meaning', 'func', 'reg', 'ex']) if (!str(c[f])) out.push({ where: `${W} steal.chunk ${c.key}`, problem: `missing ${f}` }); checkItem(c.task, `${W} steal.chunk ${c.key}`, out, ids); });
    (s?.practice || []).forEach((p: any) => checkItem(p, `${W} steal.practice`, out, ids));
    if (!arr(s?.vocab) || !arr(s?.chunks) || !Array.isArray(s?.practice)) out.push({ where: `${W} steal`, problem: 'vocab/chunks/practice missing' });
    // THINK
    if (!str(d.think?.title) || !str(d.think?.lead) || !Array.isArray(d.think?.defs)) out.push({ where: `${W} think`, problem: 'title/lead/defs missing' });
    (d.think?.items || []).forEach((it: any) => checkItem(it, `${W} think`, out, ids));
    // WRITE + EDIT
    const wf = d.write?.focus;
    if (!wf || !str(wf.title) || !str(wf.text) || !str(wf.weak) || !str(wf.strong)) out.push({ where: `${W} write.focus`, problem: 'title/text/weak/strong incomplete' });
    (d.write?.items || []).forEach((it: any) => checkWriting(it, `${W} write`, out, ids));
    const mains = (d.write?.items || []).filter((x: any) => x.main);
    if (mains.length !== 1) out.push({ where: `${W} write`, problem: `${mains.length} Main Write tasks (expected 1)` });
    const e = d.edit;
    if (!e || !str(e.draftOf) || !(d.write?.items || []).some((x: any) => x.id === e.draftOf)) out.push({ where: `${W} edit`, problem: `draftOf ${e?.draftOf} is not a write task` });
    if (!arr(e?.checklist) || !Array.isArray(e?.challenges)) out.push({ where: `${W} edit`, problem: 'checklist/challenges missing' });
    if (![...(e?.checklist || []), ...(e?.challenges || [])].every(str)) out.push({ where: `${W} edit`, problem: 'checklist/challenges must be strings (rendered as labels)' });
    if (e?.revised) { if (e.revised.revisionOf !== e.draftOf) out.push({ where: `${W} edit.revised`, problem: 'revisionOf ≠ draftOf' }); if (!str(e.revised.id)) out.push({ where: `${W} edit.revised`, problem: 'missing id' }); }
    if (mains[0] && e?.draftOf !== mains[0].id) out.push({ where: `${W} edit`, problem: 'EDIT does not revise the Main Write' });
    // RETRIEVE
    if (!str(d.retrieve?.lead)) out.push({ where: `${W} retrieve`, problem: 'missing lead' });
    (d.retrieve?.items || []).forEach((it: any) => checkItem(it, `${W} retrieve`, out, ids));
    if (!(d.retrieve?.items || []).length) out.push({ where: `${W} retrieve`, problem: 'no items' });
    // SPEAKING
    checkSpeaking(d.speaking, W, out);
    // CORE references
    const c = CORE[u];
    if (!c) out.push({ where: `${W} core`, problem: 'no Core map' });
    else {
      const has = (stage: string, id: string) => { const all = new Map<string, any>(); const walk = (x: any) => { if (Array.isArray(x)) return x.forEach(walk); if (x && typeof x === 'object') { if (x.id) all.set(x.id, x); Object.values(x).forEach(walk); } }; walk(d[stage]); return all.has(id); };
      for (const st of ['think', 'interpret', 'retrieve']) (c[st] || []).forEach((id: string) => { if (!has(st, id)) out.push({ where: `${W} core.${st}`, problem: `Core id ${id} does not exist in ${st}` }); });
      (c.steal || []).forEach((id: string) => { if (!(s?.chunks || []).some((ch: any) => ch.task?.id === id)) out.push({ where: `${W} core.steal`, problem: `Core id ${id} is not a chunk task` }); });
      if (typeof c.notice === 'number' && !(d.notice?.focuses || [])[c.notice]) out.push({ where: `${W} core.notice`, problem: `focus index ${c.notice} missing` });
      if ((c.think || []).length !== 1) out.push({ where: `${W} core.think`, problem: `${(c.think || []).length} Core THINK (expected 1)` });
    }
    // PRONUNCIATION
    const p = PRON[u];
    if (!p) out.push({ where: `${W} pronunciation`, problem: 'missing' });
    else {
      for (const f of ['focus', 'why', 'listenFor']) if (!str(p[f])) out.push({ where: `${W} pronunciation`, problem: `missing ${f}` });
      if (!arr(p.tags) || !arr(p.items) || !p.items.every((x: any) => str(x.text) && str(x.src))) out.push({ where: `${W} pronunciation`, problem: 'tags/items{text,src} incomplete' });
      if (!p.task || !str(p.task.q)) out.push({ where: `${W} pronunciation`, problem: 'task.q missing' });
      (p.listen || []).forEach((x: any) => { if (!(d.listening || []).some((l: any) => l.id === x.lid)) out.push({ where: `${W} pronunciation`, problem: `listen refers to missing listening ${x.lid}` }); });
    }
    if (!unitIds.includes(u)) out.push({ where: W, problem: 'not in curriculum' });
    hasUndefinedString(d, W, out);
  }
  return { issues: out, media };
}

export function auditReviews(): { issues: Issue[]; media: MediaRow[] } {
  const { reviews } = contentIndex();
  const out: Issue[] = [], media: MediaRow[] = [];
  for (let i = 1; i <= 7; i++) {
    const d = reviews[String(i)], W = `R${i}`;
    if (!d) { out.push({ where: W, problem: 'review missing' }); continue; }
    const ids = new Map<string, string>();
    for (const f of ['title', 'question']) if (!str(d[f])) out.push({ where: W, problem: `missing ${f}` });
    if (!arr(d.units)) out.push({ where: W, problem: 'units missing' });
    if (!d.areas || !['grammar', 'vocabulary', 'reading', 'reasoning'].every((k) => Array.isArray(d.areas[k]))) out.push({ where: `${W} areas`, problem: 'areas.{grammar,vocabulary,reading,reasoning} missing' });
    for (const st of ['retrieve', 'language', 'steal', 'reasoning']) {
      if (!str(d[st]?.lead) || !arr(d[st]?.items)) out.push({ where: `${W} ${st}`, problem: 'lead/items missing' });
      (d[st]?.items || []).forEach((it: any) => checkItem(it, `${W} ${st}`, out, ids));
    }
    const r = d.reading;
    for (const f of ['label', 'format', 'title', 'standfirst']) if (!str(r?.[f])) out.push({ where: `${W} reading`, problem: `missing ${f}` });
    if (!arr(r?.paras)) out.push({ where: `${W} reading`, problem: 'paras missing' });
    (r?.items || []).forEach((it: any) => checkItem(it, `${W} reading`, out, ids));
    if (!str(d.editing?.lead) || !arr(d.editing?.items)) out.push({ where: `${W} editing`, problem: 'lead/items missing' });
    (d.editing?.items || []).forEach((it: any) => checkItem(it, `${W} editing`, out, ids));
    checkWriting(d.synthesis, `${W} synthesis`, out, ids);
    if (!d.synthesis?.main) out.push({ where: `${W} synthesis`, problem: 'not marked main' });
    if (d.timed) { checkWriting(d.timed, `${W} timed`, out, ids); if (!(typeof d.timed.minutes === 'number' && d.timed.minutes > 0)) out.push({ where: `${W} timed`, problem: 'minutes missing (countdown would be NaN)' }); if (d.timed.timed !== true) out.push({ where: `${W} timed`, problem: 'timed flag missing (Writing Support must stay off)' }); }
    if (d.teacherLens && (!str(d.teacherLens.lead) || !arr(d.teacherLens.points))) out.push({ where: `${W} teacherLens`, problem: 'lead/points missing' });
    checkListening(d.listening, W, new RegExp(`^/audio/en/reviews/r${String(i).padStart(2, '0')}-`), out, media);
    checkSpeaking(d.speaking, W, out);
    hasUndefinedString(d, W, out);
  }
  return { issues: out, media };
}
