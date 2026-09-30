import type { MainWriteFeedback, WritingFeedback } from './schemas';

/* Main Write Feedback · Export.
   Self-contained export of the saved GPT-5.6 Sol analysis in PDF and Markdown.
   Contains: Unit, task objective, prompt, student text (Draft 1), whether support was used,
   timestamp, model version, categorized feedback, and notes on subsequent revisions.
   Never executes an AI call during export; serializes the saved analysis only. */

export interface ExportFeedbackData {
  unit: string;
  unitTitle: string;
  taskId: string;
  taskKind: string;
  taskTitle: string;
  taskObjective: string;
  taskPrompt: string;
  learnerText: string;
  words: number;
  draft: 'first' | 'revised';
  supportUsed: boolean;
  createdAt: string;
  model: string;
  promptVersion: string;
  feedback: MainWriteFeedback | WritingFeedback | any;
  revisionExists?: boolean;
  revisionDate?: string | null;
}

// AFM / metrics for PDF Helvetica
const W_REG = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
const W_BOLD = [278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];
const CP1252: Record<string, number> = { '€': 0x80, '‚': 0x82, '„': 0x84, '…': 0x85, '‘': 0x91, '’': 0x92, '“': 0x93, '”': 0x94, '•': 0x95, '–': 0x96, '—': 0x97, '™': 0x99 };
const REPLACE: Record<string, string> = { '→': '->', '←': '<-', '≥': '>=', '≤': '<=', '×': 'x', '·': '·', ' ': ' ', '★': '*', '✓': 'v' };
const EXTRA_W: Record<number, number> = { 0x85: 1000, 0x91: 222, 0x92: 222, 0x93: 333, 0x94: 333, 0x95: 350, 0x96: 556, 0x97: 1000, 0x80: 556, 0x82: 222, 0x84: 333, 0x99: 1000 };

function toBytes(s: string): number[] {
  const out: number[] = [];
  for (const ch of String(s || '').normalize('NFC')) {
    const r = REPLACE[ch];
    if (r !== undefined && r !== ch) { out.push(...toBytes(r)); continue; }
    const c = ch.codePointAt(0)!;
    if (c >= 32 && c <= 126) out.push(c);
    else if (CP1252[ch]) out.push(CP1252[ch]);
    else if (c >= 0xa0 && c <= 0xff) out.push(c);
    else if (c === 9 || c === 10) out.push(32);
    else out.push(0x3f);
  }
  return out;
}
const width = (bytes: number[], bold: boolean, size: number) =>
  bytes.reduce((w, b) => w + (b >= 32 && b <= 126 ? (bold ? W_BOLD : W_REG)[b - 32] : EXTRA_W[b] || 556), 0) * size / 1000;
const pdfStr = (bytes: number[]) => '(' + bytes.map((b) => (b === 0x28 || b === 0x29 || b === 0x5c ? '\\' + String.fromCharCode(b) : String.fromCharCode(b))).join('') + ')';

const PAGE_W = 595.28, PAGE_H = 841.89, M = 54, BOTTOM = 60;
type Style = { size?: number; bold?: boolean; gray?: number; indent?: number; after?: number; leading?: number };

class Doc {
  pages: string[][] = [[]];
  y = PAGE_H - M;
  private get page() { return this.pages[this.pages.length - 1]; }
  private newPage() { this.pages.push([]); this.y = PAGE_H - M; }
  ensure(h: number) { if (this.y - h < BOTTOM) this.newPage(); }
  text(s: string, st: Style = {}) {
    const size = st.size || 10, bold = !!st.bold, lead = st.leading || size * 1.4, x = M + (st.indent || 0), maxW = PAGE_W - M - x;
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
        let rest = w;
        while (width(rest, bold, size) > maxW) {
          let n = rest.length;
          while (n > 1 && width(rest.slice(0, n), bold, size) > maxW) n--;
          line = rest.slice(0, n); flush(); rest = rest.slice(n);
        }
        line = rest;
      }
      if (line.length || !words.length) flush();
    }
    this.y -= st.after ?? 2;
  }
  gap(h: number) { this.y -= h; }
  rule(gray = 0.75) { this.ensure(10); this.y -= 5; this.page.push(`${gray} G 0.6 w ${M} ${this.y.toFixed(2)} m ${(PAGE_W - M).toFixed(2)} ${this.y.toFixed(2)} l S`); this.y -= 5; }
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
      const foot = `BT /F1 8 Tf 0.45 g ${M} 30 Td ${pdfStr(toBytes(footer(i + 1, total)))} Tj ET`;
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

export function generateFeedbackMarkdown(d: ExportFeedbackData): string {
  const f = d.feedback || {};
  const lines: string[] = [
    `# Main Write Feedback · Unit ${d.unit}: ${d.unitTitle}`,
    `**Activity:** ${d.taskKind} — "${d.taskTitle}" (${d.taskId})`,
    `**Target Word Count:** ${d.taskObjective}`,
    `**Date & Time:** ${d.createdAt} (${day(d.createdAt)})`,
    `**Draft Analysed:** ${d.draft === 'revised' ? 'Draft 2 (Revised)' : 'Draft 1 (Original)'} (${d.words} words)`,
    `**Writing Support Used Before Submission:** ${d.supportUsed ? 'Yes' : 'No'}`,
    `**Model:** ${d.model}`,
    `**Prompt & Schema Version:** ${d.promptVersion}`,
    d.revisionExists ? `**Subsequent Revision:** Draft 2 exists in portfolio${d.revisionDate ? ` (${day(d.revisionDate)})` : ''}` : '',
    '',
    '---',
    '## Original Prompt',
    d.taskPrompt,
    '',
    '---',
    `## Learner Text (${d.draft === 'revised' ? 'Draft 2' : 'Draft 1'})`,
    d.learnerText,
    '',
    '---',
    '## Diagnostic & Pedagogical Assessment',
    f.estimatedLevel ? `**Estimated Level:** ${f.estimatedLevel.level} — ${f.estimatedLevel.rationale}` : '',
    '',
  ];

  const renderSec = (title: string, sec: any) => {
    if (!sec) return;
    lines.push(`### ${title}`);
    if (sec.summary) lines.push(sec.summary);
    if (sec.strengths && sec.strengths.length) {
      lines.push('', '**Working well:**');
      sec.strengths.forEach((s: string) => lines.push(`- ${s}`));
    }
    if (sec.improvements && sec.improvements.length) {
      lines.push('', '**Areas to sharpen:**');
      sec.improvements.forEach((s: string) => lines.push(`- ${s}`));
    }
    lines.push('');
  };

  renderSec('1. Task Achievement', f.taskAchievement);
  renderSec('2. Argument Development', f.argumentDevelopment || f.argumentationReasoning);
  renderSec('3. Organisation & Global Coherence', f.organisationCoherence || f.organisation);
  renderSec('4. Clarity', f.clarity);
  renderSec('5. Grammatical Accuracy & Range', f.grammaticalAccuracyRange || f.grammarAccuracy);
  renderSec('6. Lexical Precision, Range & Naturalness', f.lexicalPrecisionRange || f.vocabularyCollocations || f.lexicalPrecision);
  renderSec('7. Register & Tone', f.registerTone || f.register);
  renderSec('8. Hedging & Stance', f.hedgingStance);
  renderSec('9. Cohesion & Discourse Pragmatics', f.cohesionPragmatics || f.cohesion);
  renderSec('10. Unnecessary Repetition', f.unnecessaryRepetition);

  if (f.strengthsSummary && f.strengthsSummary.length) {
    lines.push('### Genuine Strengths');
    f.strengthsSummary.forEach((s: string) => lines.push(`- ${s}`));
    lines.push('');
  }

  if (f.observations && f.observations.length) {
    lines.push('### Detailed Specific Observations (Classified)');
    f.observations.forEach((o: any, i: number) => {
      lines.push(`#### Observation ${i + 1} [${o.type}]`);
      lines.push(`> "${o.quote}"`);
      lines.push(`- **Explanation:** ${o.explanation}`);
      lines.push(`- **Rhetorical Effect:** ${o.effect}`);
      lines.push(`- **Revision Strategy:** ${o.revisionStrategy}`);
      if (o.microExample) lines.push(`- **Micro-example (in different context):** ${o.microExample}`);
      lines.push('');
    });
  }

  if (f.questionsForWriter && f.questionsForWriter.length) {
    lines.push('### Questions for the Writer');
    f.questionsForWriter.forEach((q: string) => lines.push(`- ${q}`));
    lines.push('');
  }

  if (f.recurringErrors && f.recurringErrors.length) {
    lines.push('### Recurring Patterns');
    f.recurringErrors.forEach((r: any) => {
      lines.push(`- **${r.pattern}:** ${r.explanation}`);
      if (r.examples) r.examples.forEach((ex: string) => lines.push(`  - "${ex}"`));
    });
    lines.push('');
  }

  if (f.suggestedErrorLog && f.suggestedErrorLog.length) {
    lines.push('### Suggested Error Log Entries');
    f.suggestedErrorLog.forEach((e: any) => {
      lines.push(`- "${e.mine}" -> "${e.corr}" (${e.why})${e.ex ? ` · Example: ${e.ex}` : ''}`);
    });
    lines.push('');
  }

  if (f.nextDraftPriorities && f.nextDraftPriorities.length) {
    lines.push('### Priorities for Draft 2');
    f.nextDraftPriorities.forEach((p: string, i: number) => lines.push(`${i + 1}. ${p}`));
    lines.push('');
  }

  lines.push('---', '*Generated by A Mind in English. Pedagogical audit export.*');
  return lines.filter((l) => l !== undefined).join('\n');
}

export function generateFeedbackPdf(d: ExportFeedbackData): Buffer {
  const doc = new Doc();
  const f = d.feedback || {};

  doc.text('A MIND IN ENGLISH · MAIN WRITE AUDIT', { size: 8, bold: true, gray: 0.4, after: 3 });
  doc.text(`Unit ${d.unit}: ${d.unitTitle}`, { size: 18, bold: true, after: 2 });
  doc.text(`${d.taskKind} — "${d.taskTitle}" (${d.taskId})`, { size: 11, gray: 0.25, after: 4 });
  doc.text(`${day(d.createdAt)} · ${d.draft === 'revised' ? 'Draft 2' : 'Draft 1'} (${d.words} words) · Support used: ${d.supportUsed ? 'Yes' : 'No'} · Model: ${d.model}`, { size: 8.5, gray: 0.35, after: 4 });
  if (d.revisionExists) {
    doc.text(`[Subsequent revision exists: Draft 2 in learner's portfolio${d.revisionDate ? ` on ${day(d.revisionDate)}` : ''}]`, { size: 8.5, bold: true, gray: 0.2, after: 4 });
  }
  doc.rule();

  doc.text('Original Prompt', { size: 11, bold: true, after: 2 });
  doc.text(d.taskPrompt, { size: 9, gray: 0.2, indent: 8, after: 4 });
  doc.rule(0.85);

  doc.text(`Learner Text (${d.draft === 'revised' ? 'Draft 2' : 'Draft 1'})`, { size: 11, bold: true, after: 2 });
  doc.text(d.learnerText, { size: 8.5, gray: 0.15, indent: 8, after: 6 });
  doc.rule();

  if (f.estimatedLevel) {
    doc.text('Estimated Level', { size: 11, bold: true, after: 1 });
    doc.text(`${f.estimatedLevel.level} — ${f.estimatedLevel.rationale}`, { size: 9.5, indent: 8, after: 4 });
    doc.rule(0.85);
  }

  const renderPdfSec = (title: string, sec: any) => {
    if (!sec) return;
    doc.ensure(50);
    doc.text(title, { size: 11, bold: true, after: 2 });
    if (sec.summary) doc.text(sec.summary, { size: 9, indent: 8, after: 3 });
    if (sec.strengths && sec.strengths.length) {
      doc.text('Working well:', { size: 8, bold: true, gray: 0.3, indent: 8, after: 1 });
      sec.strengths.forEach((s: string) => doc.text(`• ${s}`, { size: 8.5, indent: 14, after: 1 }));
    }
    if (sec.improvements && sec.improvements.length) {
      doc.text('To sharpen:', { size: 8, bold: true, gray: 0.3, indent: 8, after: 1 });
      sec.improvements.forEach((s: string) => doc.text(`• ${s}`, { size: 8.5, indent: 14, after: 1 }));
    }
    doc.gap(4);
  };

  renderPdfSec('1. Task Achievement', f.taskAchievement);
  renderPdfSec('2. Argument Development', f.argumentDevelopment || f.argumentationReasoning);
  renderPdfSec('3. Organisation & Coherence', f.organisationCoherence || f.organisation);
  renderPdfSec('4. Clarity', f.clarity);
  renderPdfSec('5. Grammatical Accuracy & Range', f.grammaticalAccuracyRange || f.grammarAccuracy);
  renderPdfSec('6. Lexical Precision & Range', f.lexicalPrecisionRange || f.vocabularyCollocations);
  renderPdfSec('7. Register & Tone', f.registerTone || f.register);
  renderPdfSec('8. Hedging & Stance', f.hedgingStance);
  renderPdfSec('9. Cohesion & Pragmatics', f.cohesionPragmatics || f.cohesion);
  renderPdfSec('10. Unnecessary Repetition', f.unnecessaryRepetition);

  if (f.strengthsSummary && f.strengthsSummary.length) {
    doc.rule(0.85);
    doc.text('Genuine Strengths', { size: 11, bold: true, after: 2 });
    f.strengthsSummary.forEach((s: string) => doc.text(`• ${s}`, { size: 8.5, indent: 8, after: 1 }));
  }

  if (f.observations && f.observations.length) {
    doc.rule(0.85);
    doc.text('Specific Classified Observations', { size: 11, bold: true, after: 3 });
    f.observations.forEach((o: any, i: number) => {
      doc.ensure(60);
      doc.text(`Observation ${i + 1} · [${o.type}]`, { size: 9.5, bold: true, after: 1 });
      doc.text(`"${o.quote}"`, { size: 8.5, indent: 8, gray: 0.2, after: 1 });
      doc.text(`Explanation: ${o.explanation}`, { size: 8.5, indent: 8, after: 1 });
      doc.text(`Rhetorical Effect: ${o.effect}`, { size: 8.5, indent: 8, after: 1 });
      doc.text(`Revision Strategy: ${o.revisionStrategy}`, { size: 8.5, indent: 8, after: 1 });
      if (o.microExample) doc.text(`Micro-example: ${o.microExample}`, { size: 8, indent: 8, gray: 0.35, after: 1 });
      doc.gap(4);
    });
  }

  if (f.questionsForWriter && f.questionsForWriter.length) {
    doc.rule(0.85);
    doc.text('Questions for the Writer', { size: 11, bold: true, after: 2 });
    f.questionsForWriter.forEach((q: string) => doc.text(`• ${q}`, { size: 8.5, indent: 8, after: 1 }));
  }

  if (f.nextDraftPriorities && f.nextDraftPriorities.length) {
    doc.rule(0.85);
    doc.text('Priorities for Draft 2', { size: 11, bold: true, after: 2 });
    f.nextDraftPriorities.forEach((p: string, i: number) => doc.text(`${i + 1}. ${p}`, { size: 9, bold: true, indent: 8, after: 1 }));
  }

  return doc.build((n, t) => `A Mind in English · Main Write Feedback · Unit ${d.unit} (${d.taskId}) · page ${n} of ${t}`);
}
