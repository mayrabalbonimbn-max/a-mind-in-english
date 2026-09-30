import type { EvRef, LearningReport, ReportObservation } from './merge';

/* Learning Review · PDF. A small text-only PDF writer (standard Helvetica fonts, WinAnsi, A4) so the
   report can be read and shared on its own without adding a dependency. It prints facts, the AI's
   interpretation and proposals, each labelled; no ids, tokens, prompts or model reasoning. */

// Helvetica / Helvetica-Bold advance widths (AFM, 1/1000 em) for ASCII 32–126
const W_REG = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
const W_BOLD = [278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];
// Unicode → WinAnsi (cp1252) bytes for the typography the app uses; anything else is approximated
const CP1252: Record<string, number> = { '€': 0x80, '‚': 0x82, '„': 0x84, '…': 0x85, '‘': 0x91, '’': 0x92, '“': 0x93, '”': 0x94, '•': 0x95, '–': 0x96, '—': 0x97, '™': 0x99 };
const REPLACE: Record<string, string> = { '→': '->', '←': '<-', '≥': '>=', '≤': '<=', '×': 'x', '·': '·', ' ': ' ', '★': '*', '✓': 'v' };
const EXTRA_W: Record<number, number> = { 0x85: 1000, 0x91: 222, 0x92: 222, 0x93: 333, 0x94: 333, 0x95: 350, 0x96: 556, 0x97: 1000, 0x80: 556, 0x82: 222, 0x84: 333, 0x99: 1000 };

function toBytes(s: string): number[] {
  const out: number[] = [];
  for (const ch of String(s).normalize('NFC')) {
    const r = REPLACE[ch];
    if (r !== undefined && r !== ch) { out.push(...toBytes(r)); continue; }
    const c = ch.codePointAt(0)!;
    if (c >= 32 && c <= 126) out.push(c);
    else if (CP1252[ch]) out.push(CP1252[ch]);
    else if (c >= 0xa0 && c <= 0xff) out.push(c);
    else if (c === 9 || c === 10) out.push(32);
    else out.push(0x3f); // '?'
  }
  return out;
}
const width = (bytes: number[], bold: boolean, size: number) =>
  bytes.reduce((w, b) => w + (b >= 32 && b <= 126 ? (bold ? W_BOLD : W_REG)[b - 32] : EXTRA_W[b] || 556), 0) * size / 1000;
const pdfStr = (bytes: number[]) => '(' + bytes.map((b) => (b === 0x28 || b === 0x29 || b === 0x5c ? '\\' + String.fromCharCode(b) : String.fromCharCode(b))).join('') + ')';

const PAGE_W = 595.28, PAGE_H = 841.89, M = 56, BOTTOM = 64;
type Style = { size?: number; bold?: boolean; gray?: number; indent?: number; after?: number; leading?: number };

class Doc {
  pages: string[][] = [[]];
  y = PAGE_H - M;
  private get page() { return this.pages[this.pages.length - 1]; }
  private newPage() { this.pages.push([]); this.y = PAGE_H - M; }
  ensure(h: number) { if (this.y - h < BOTTOM) this.newPage(); }
  text(s: string, st: Style = {}) {
    const size = st.size || 10, bold = !!st.bold, lead = st.leading || size * 1.42, x = M + (st.indent || 0), maxW = PAGE_W - M - x;
    for (const para of String(s || '').split('\n')) {
      const words = toBytes(para).reduce((acc: number[][], b) => { if (b === 32) acc.push([]); else acc[acc.length - 1].push(b); return acc; }, [[]]).filter((w) => w.length);
      let line: number[] = [];
      const flush = () => {
        this.ensure(lead);
        this.y -= lead;
        this.page.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${st.gray ?? 0} g ${x.toFixed(2)} ${this.y.toFixed(2)} Td ${pdfStr(line)} Tj ET`);
        line = [];
      };
      for (const w of words) {
        const trial = line.length ? [...line, 32, ...w] : w;
        if (width(trial, bold, size) <= maxW) { line = trial; continue; }
        if (line.length) flush();
        let rest = w;                                      // a single word longer than the line is split
        while (width(rest, bold, size) > maxW) { let n = rest.length; while (n > 1 && width(rest.slice(0, n), bold, size) > maxW) n--; line = rest.slice(0, n); flush(); rest = rest.slice(n); }
        line = rest;
      }
      if (line.length || !words.length) flush();
    }
    this.y -= st.after ?? 2;
  }
  gap(h: number) { this.y -= h; }
  rule(gray = 0.75) { this.ensure(10); this.y -= 6; this.page.push(`${gray} G 0.6 w ${M} ${this.y.toFixed(2)} m ${(PAGE_W - M).toFixed(2)} ${this.y.toFixed(2)} l S`); this.y -= 6; }
  build(footer: (n: number, total: number) => string): Buffer {
    const total = this.pages.length;
    const objs: string[] = [];
    const add = (s: string) => { objs.push(s); return objs.length; };
    add('<< /Type /Catalog /Pages 2 0 R >>');
    add('PAGES');
    const f1 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    const f2 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    const kids: number[] = [];
    this.pages.forEach((ops, i) => {
      const foot = `BT /F1 8 Tf 0.45 g ${M} 34 Td ${pdfStr(toBytes(footer(i + 1, total)))} Tj ET`;
      const stream = [...ops, foot].join('\n');
      const c = add(`<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`);
      kids.push(add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> >> /Contents ${c} 0 R >>`));
    });
    objs[1] = `<< /Type /Pages /Kids [${kids.map((k) => `${k} 0 R`).join(' ')}] /Count ${kids.length} >>`;
    let out = '%PDF-1.4\n%\xe2\xe3\xcf\xd3\n';
    const offsets: number[] = [];
    objs.forEach((o, i) => { offsets.push(Buffer.byteLength(out, 'latin1')); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
    const xref = Buffer.byteLength(out, 'latin1');
    out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}`;
    out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
    return Buffer.from(out, 'latin1');
  }
}

const day = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '');
const ORIGIN: Record<string, string> = { learner: 'Your work', check: 'Checked answer', record: 'Your record', ai: 'Earlier AI feedback' };
export const STATUS_LABEL: Record<string, string> = {
  one_off: 'one-off', possible_pattern: 'possible pattern', recurring: 'recurring', improving: 'improving', apparently_resolved: 'apparently resolved',
  emerging: 'emerging', getting_stronger: 'getting stronger', recognition_to_production: 'recognition → production',
};

function evidenceBlock(d: Doc, refs: EvRef[], title = 'FACT · Evidence') {
  if (!refs.length) return;
  d.text(title, { size: 7.5, bold: true, gray: 0.4, indent: 12, after: 1 });
  refs.forEach((r) => d.text(`• ${ORIGIN[r.origin] || r.origin} · ${r.label}${r.at ? ` · ${day(r.at)}` : ''}\n   "${r.snippet}"`, { size: 8.5, indent: 12, gray: 0.15, after: 1 }));
}

function observation(d: Doc, o: ReportObservation) {
  d.ensure(60);
  d.text(o.label, { size: 11, bold: true, after: 1 });
  d.text(`${STATUS_LABEL[o.status]} · ${o.confidence} confidence · ${o.evidenceCount} piece${o.evidenceCount === 1 ? '' : 's'} of evidence in ${o.activityCount} activit${o.activityCount === 1 ? 'y' : 'ies'} · first seen ${day(o.firstSeen)} · last seen ${day(o.lastSeen)}`, { size: 8.5, gray: 0.35, after: 3 });
  d.text('AI INTERPRETATION', { size: 7.5, bold: true, gray: 0.4, indent: 12, after: 1 });
  d.text(o.interpretation + (o.implication ? `\nImplication: ${o.implication}` : ''), { size: 9.5, indent: 12, after: 3 });
  if (o.humanJudgment) {
    d.text('HUMAN JUDGMENT', { size: 7.5, bold: true, gray: 0.4, indent: 12, after: 1 });
    d.text(({ agree: 'Agree', disagree: 'Disagree', not_sure: 'Not sure' } as Record<string, string>)[o.humanJudgment] || o.humanJudgment, { size: 9.5, indent: 12, after: 3 });
  }
  evidenceBlock(d, o.evidence);
  if (o.counterEvidence.length) evidenceBlock(d, o.counterEvidence, 'FACT · Where it went well');
  d.gap(8);
}

export function reportPdf(r: LearningReport): Buffer {
  const d = new Doc();
  d.text('A MIND IN ENGLISH', { size: 8, bold: true, gray: 0.45, after: 4 });
  d.text('Learning Review', { size: 22, bold: true, after: 4 });
  d.text(`${day(r.generatedAt)} · ${r.period.from ? `evidence from ${day(r.period.from)} to ${day(r.period.to)}` : `all evidence up to ${day(r.period.to)} (first review)`}`, { size: 10, gray: 0.3, after: 6 });
  d.text('This report observes your learning. It changes nothing: no unit, answer, Glossary or Error Log entry, progress or profile was modified. Proposals are specifications for a human to decide on.', { size: 9, gray: 0.3, after: 4 });
  d.text('FACT = what you did or what a check recorded · AI INTERPRETATION = what the model reads in it · PROPOSAL = a suggestion, not applied.', { size: 8.5, gray: 0.4 });
  d.rule();

  const e = r.evidence;
  d.text('Evidence considered', { size: 13, bold: true, after: 3 });
  d.text(`FACT · ${e.total} new item${e.total === 1 ? '' : 's'}: ${e.byOrigin.learner} of your own work, ${e.byOrigin.check} checked answers, ${e.byOrigin.record} records, ${e.byOrigin.ai} earlier AI assessments.${e.deferred ? ` ${e.deferred} more wait for the next review.` : ''}`, { size: 9.5 });
  d.text(`Types: ${Object.entries(e.byKind).map(([k, n]) => `${k.replace(/_/g, ' ')} ${n}`).join(', ')}`, { size: 9, gray: 0.3 });
  d.text('Activities:', { size: 9, bold: true, after: 1 });
  e.activities.forEach((a) => d.text(`• ${a}`, { size: 8.5, indent: 10, after: 0 }));
  d.gap(6);

  const section = (title: string, items: ReportObservation[]) => { if (!items.length) return; d.rule(0.85); d.text(title, { size: 13, bold: true, after: 6 }); items.forEach((o) => observation(d, o)); };
  if (r.workedOn.length) {
    d.rule(0.85); d.text('What you worked on', { size: 13, bold: true, after: 4 });
    r.workedOn.forEach((w) => d.text(`${w.area}: ${w.facts}. ${w.activities.slice(0, 12).join(', ')}`, { size: 9.5, after: 3 }));
  }
  section('Getting stronger', r.sections.gettingStronger);
  section('Emerging', r.sections.emerging);
  section('Recurring patterns', r.sections.recurring);
  section('Improving / resolving', r.sections.improving);
  section('Recognition → production', r.sections.recognitionToProduction);
  if (r.sections.notEnoughEvidence.length) {
    d.rule(0.85); d.text('Not enough evidence yet', { size: 13, bold: true, after: 6 });
    r.sections.notEnoughEvidence.forEach((n) => { d.text(n.label, { size: 10.5, bold: true, after: 1 }); d.text(n.note, { size: 9.5, after: 2 }); evidenceBlock(d, n.evidence); d.gap(6); });
  }
  if (r.nextSession.length) {
    d.rule(0.85); d.text('Next session', { size: 13, bold: true, after: 6 });
    r.nextSession.forEach((n, i) => { d.text(`${i + 1}. ${n.action}`, { size: 10.5, bold: true, after: 1 }); d.text(`Why: ${n.why}`, { size: 9.5, indent: 12, after: 2 }); evidenceBlock(d, n.evidence); d.gap(6); });
  }
  d.rule(0.85); d.text('Proposed adaptations', { size: 13, bold: true, after: 4 });
  if (!r.proposals.length) d.text('None. The evidence in this period does not justify changing the next unit.', { size: 9.5 });
  r.proposals.forEach((p) => {
    d.ensure(120);
    d.text(`PROPOSAL · ${p.action.toUpperCase()} · ${p.activityLabel}`, { size: 10.5, bold: true, after: 2 });
    d.text(`Unit ${p.unit} · ${p.unitTitle}. Status: ${p.status}.`, { size: 8.5, gray: 0.35, after: 3 });
    d.text(`Current objective: ${p.currentObjective}`, { size: 9.5, after: 2 });
    d.text(`Pattern(s): ${p.patterns.join('; ')}`, { size: 9.5, after: 2 });
    d.text(`Reason: ${p.rationale}`, { size: 9.5, after: 2 });
    d.text(`Proposed change: ${p.proposedChange}`, { size: 9.5, after: 2 });
    d.text(`Workload impact: ${p.workloadImpact}`, { size: 9.5, after: 2 });
    d.text('Constraints:', { size: 9.5, bold: true, after: 1 });
    p.constraints.forEach((c) => d.text(`• ${c}`, { size: 9, indent: 10, after: 0 }));
    d.text(`Risks: ${p.risks}`, { size: 9.5, after: 2 });
    evidenceBlock(d, p.evidence);
    d.gap(8);
  });
  if (r.uncertainties.length || r.warnings.length) {
    d.rule(0.85); d.text('Warnings and uncertainties', { size: 13, bold: true, after: 4 });
    r.warnings.forEach((w) => d.text(`• FACT · ${w}`, { size: 9, after: 1 }));
    r.uncertainties.forEach((u) => d.text(`• AI · ${u}`, { size: 9, after: 1 }));
  }
  return d.build((n, t) => `A Mind in English · Learning Review · ${day(r.generatedAt)} · page ${n} of ${t}`);
}

export function reportMarkdown(r: LearningReport): string {
  const L: string[] = [
    `# Learning Review · A Mind in English · ${day(r.generatedAt)}`,
    `**Period:** ${r.period.from ? `From ${day(r.period.from)} to ${day(r.period.to)}` : `Up to ${day(r.period.to)} (first review)`}`,
    `**Model:** ${r.model.name} (${r.model.promptVersion})`,
    `**Evidence Count:** ${r.evidence.total} (${r.evidence.byOrigin.learner} learner work, ${r.evidence.byOrigin.check} checks, ${r.evidence.byOrigin.record} records, ${r.evidence.byOrigin.ai} earlier AI assessments)`,
    '',
    '---',
    '## Evidence Considered',
    ...r.evidence.activities.map((a) => `- ${a}`),
    '',
  ];

  if (r.workedOn.length) {
    L.push('## What You Worked On');
    r.workedOn.forEach((w) => {
      L.push(`- **${w.area}:** ${w.facts} (${w.activities.join(', ')})`);
    });
    L.push('');
  }

  const renderSection = (title: string, list: ReportObservation[]) => {
    if (!list.length) return;
    L.push(`## ${title}`);
    list.forEach((o) => {
      L.push(`### ${o.label} [${STATUS_LABEL[o.status] || o.status} · ${o.confidence} confidence]`);
      L.push(`- **First seen:** ${day(o.firstSeen)} | **Last seen:** ${day(o.lastSeen)}`);
      L.push(`- **AI Interpretation:** ${o.interpretation}`);
      if (o.implication) L.push(`- **Implication:** ${o.implication}`);
      if (o.humanJudgment) L.push(`- **Human Judgment:** ${o.humanJudgment}`);
      if (o.evidence.length) {
        L.push('- **Evidence:**');
        o.evidence.forEach((e) => L.push(`  - [${e.origin}] ${e.label}: "${e.snippet}"`));
      }
      if (o.counterEvidence.length) {
        L.push('- **Counter-evidence:**');
        o.counterEvidence.forEach((e) => L.push(`  - [${e.origin}] ${e.label}: "${e.snippet}"`));
      }
      L.push('');
    });
  };

  renderSection('Getting Stronger', r.sections.gettingStronger);
  renderSection('Emerging', r.sections.emerging);
  renderSection('Recurring Patterns', r.sections.recurring);
  renderSection('Improving / Resolving', r.sections.improving);
  renderSection('Recognition → Production', r.sections.recognitionToProduction);

  if (r.sections.notEnoughEvidence.length) {
    L.push('## Not Enough Evidence Yet');
    r.sections.notEnoughEvidence.forEach((n) => {
      L.push(`- **${n.label}:** ${n.note}`);
    });
    L.push('');
  }

  if (r.nextSession.length) {
    L.push('## Next Session Concrete Steps');
    r.nextSession.forEach((n, i) => {
      L.push(`${i + 1}. **${n.action}** — ${n.why}`);
    });
    L.push('');
  }

  L.push('## Proposed Adaptations');
  if (!r.proposals.length) {
    L.push('None. The evidence in this period does not justify changing the next unit.');
  } else {
    r.proposals.forEach((p) => {
      L.push(`### Proposal · ${p.action.toUpperCase()} · ${p.activityLabel} (Status: ${p.status})`);
      L.push(`- **Current Objective:** ${p.currentObjective}`);
      L.push(`- **Rationale:** ${p.rationale}`);
      L.push(`- **Proposed Change:** ${p.proposedChange}`);
      L.push(`- **Workload Impact:** ${p.workloadImpact}`);
      L.push(`- **Constraints:** ${p.constraints.join('; ')}`);
      L.push(`- **Risks:** ${p.risks}`);
      L.push('');
    });
  }

  if (r.warnings.length || r.uncertainties.length) {
    L.push('', '## Warnings and Uncertainties');
    r.warnings.forEach((w) => L.push(`- [FACT] ${w}`));
    r.uncertainties.forEach((u) => L.push(`- [AI] ${u}`));
  }

  return L.join('\n');
}
