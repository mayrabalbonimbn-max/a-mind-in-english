import fs from 'fs';
import path from 'path';

/* Visual system of the exported PDFs, taken from the approved models in `modelo pdf/`
   (Main Write feedback and Learning Review): the book's own tokens (public/styles.css :root),
   Jost for display, Figtree for text, a dark header card, numbered sections, cards, chips and
   tinted callouts. Content never comes from here: every template fills it from persisted data. */

// Fonts are embedded (SIL Open Font License, see fonts/OFL-*.txt), so rendering never touches the network.
// Resolved from the repository root so it works from src/ (tsx) and from dist/ (compiled).
const FONT_DIR = path.resolve(__dirname, '../../../src/services/pdf/fonts');
let fontCss: string | null = null;
function fonts(): string {
  if (fontCss !== null) return fontCss;
  const face = (family: string, file: string, style: string) => {
    const b64 = fs.readFileSync(path.join(FONT_DIR, file)).toString('base64');
    return `@font-face{font-family:'${family}';src:url(data:font/ttf;base64,${b64}) format('truetype');font-weight:100 900;font-style:${style};font-display:block}`;
  };
  fontCss = [face('Jost', 'Jost[wght].ttf', 'normal'), face('Figtree', 'Figtree[wght].ttf', 'normal'), face('Figtree', 'Figtree-Italic[wght].ttf', 'italic')].join('\n');
  return fontCss;
}

export const esc = (s: unknown) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

const CSS = `
:root{
  --esp:#1C1817; --creme:#F3EBE3; --paper:#FBF7F2; --task:#F3E9E3; --rosa:#E8BCC1; --rosa2:#F6DCDF; --ink:#9A4E5C;
  --taupe:#B9ADA6; --cinza:#6E625C; --text:#2B2422; --line:#DCCFC2; --line2:#EADCD4; --ok:#4F6B4A; --ok-bg:#E4EADF;
  --warn:#8A5A3A; --warn-bg:#F6E6D8; --neutral-bg:#F1E9E3; --err:#9A3B3B; --err-bg:#F6DADA;
  --display:'Jost',Futura,sans-serif; --body:'Figtree',system-ui,sans-serif;
}
@page{size:A4;margin:16mm 15mm 18mm}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:var(--body);font-weight:400;color:var(--text);font-size:10.5pt;line-height:1.62;-webkit-print-color-adjust:exact;print-color-adjust:exact;overflow-wrap:anywhere}
p{margin:0}
.muted{color:var(--cinza)}
.caps{font-family:var(--display);text-transform:uppercase;letter-spacing:.16em;font-size:7pt;font-weight:500}

/* header card */
.hero{background:var(--esp);color:var(--creme);border-radius:9px;padding:19pt 20pt 17pt;margin-bottom:14pt;break-inside:avoid}
.hero .eyebrow{font-family:var(--display);font-size:7.5pt;letter-spacing:.28em;text-transform:uppercase;color:var(--rosa);font-weight:500}
.hero h1{font-family:var(--display);font-weight:300;font-size:25pt;line-height:1.2;margin:7pt 0 3pt;color:var(--creme)}
.hero .sub{font-size:10.5pt;color:var(--taupe)}
.pills{display:flex;flex-wrap:wrap;gap:6pt;margin-top:12pt}
.pill{display:inline-block;border:1px solid rgba(243,235,227,.28);border-radius:999px;padding:4pt 10pt;font-family:var(--display);font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:var(--creme);font-weight:500;line-height:1.3}
.pill.hi{border-color:var(--rosa);color:var(--rosa)}

/* sections */
.sec{border-top:1px solid var(--line);padding-top:12pt;margin-top:14pt}
.sec.first{border-top:0;padding-top:0;margin-top:4pt}
.sec-h{display:flex;align-items:baseline;gap:9pt;margin-bottom:9pt;break-after:avoid}
.sec-h .n{font-family:var(--display);font-size:7.5pt;letter-spacing:.14em;color:var(--ink);font-weight:500}
.sec-h h2{font-family:var(--display);font-weight:400;font-size:17pt;line-height:1.25;margin:0;flex:1}
.sec-h .tag{font-family:var(--display);font-size:6.8pt;letter-spacing:.18em;text-transform:uppercase;color:var(--cinza)}
.keep{break-inside:avoid}

/* blocks */
.task{background:var(--task);border-radius:9px;padding:11pt 14pt;color:#4F4541;font-size:10pt;line-height:1.7;break-inside:avoid}
.under{margin-top:7pt;font-family:var(--display);font-size:6.8pt;letter-spacing:.16em;text-transform:uppercase;color:var(--cinza)}
.draft{orphans:3;widows:3;border:1px solid var(--line2);border-left:3px solid var(--rosa);border-radius:5px;padding:12pt 16pt;font-size:11pt;line-height:1.85;white-space:pre-wrap}
.draft.missing{font-style:italic;color:var(--cinza);font-size:10pt}
.note{font-size:9pt;color:var(--cinza);margin-top:6pt}
.pink{background:var(--rosa2);border-radius:9px;padding:11pt 14pt 11pt 12pt;break-inside:avoid}
ol.pri{margin:0;padding-left:16pt;font-size:11pt;line-height:1.75}
ol.pri li{margin:2pt 0}
ul.dots{margin:0;padding-left:14pt;line-height:1.7}
ul.dots li::marker{color:var(--ok)}
ul.dots.rose li::marker{color:var(--ink)}
ul.dots.plain li::marker{color:var(--text)}

/* cards */
.card{border:1px solid var(--line2);border-radius:11px;padding:13pt 15pt;margin-bottom:9pt;break-inside:avoid;background:#fff}
.card h3{font-family:var(--display);font-weight:500;font-size:11.5pt;margin:0 0 4pt;line-height:1.3}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:9pt}
.card.flow{break-inside:auto}
.grid2 .card{margin-bottom:0}
.grid2.row{margin-bottom:9pt;break-inside:avoid}
.lab{font-family:var(--display);font-size:6.6pt;letter-spacing:.18em;text-transform:uppercase;font-weight:500;margin:8pt 0 3pt}
.lab.ok{color:var(--ok)} .lab.rose{color:var(--ink)} .lab.grey{color:var(--cinza)}
.chip{display:inline-block;border-radius:999px;padding:3pt 9pt;font-family:var(--display);font-size:6.6pt;letter-spacing:.14em;text-transform:uppercase;font-weight:500;line-height:1.35}
.chip.strong{background:var(--ok-bg);color:var(--ok)}
.chip.awkward{background:var(--warn-bg);color:var(--warn)}
.chip.style{background:var(--neutral-bg);color:var(--cinza)}
.chip.error{background:var(--err-bg);color:var(--err)}
.chip.register{background:var(--rosa2);color:var(--ink)}
.chip.out{border:1px solid var(--line);color:var(--cinza);background:#fff}
.chip.fact{border:1px solid var(--text);color:var(--text);background:#fff}
.chip.ai{background:var(--rosa2);color:var(--ink)}
.chip.judge{background:var(--esp);color:var(--creme)}
.chip.prop{border:1px dashed var(--ink);color:var(--ink);background:#fff}
.quote{border-left:2.5px solid var(--rosa);padding:1pt 0 1pt 10pt;margin:9pt 0;font-style:italic;color:#4F4541;font-size:10.5pt;line-height:1.65}
table.kv{border-collapse:collapse;width:100%;font-size:10pt}
table.kv td{padding:3pt 0;vertical-align:top;line-height:1.55}
table.kv td.k{width:28%;font-family:var(--display);font-size:6.8pt;letter-spacing:.16em;text-transform:uppercase;color:var(--cinza);padding-top:5pt;padding-right:8pt}
.strike{text-decoration:line-through;color:var(--cinza)}
.foot{text-align:center;color:var(--cinza);font-size:8.5pt;margin-top:20pt;line-height:1.7;break-inside:avoid}

/* Learning Review */
.legend{display:grid;grid-template-columns:auto 1fr auto 1fr;gap:7pt 9pt;align-items:center;font-size:9pt;color:var(--cinza);margin:0 0 4pt}
.legend .chip{justify-self:start}
.meta{font-size:9pt;color:var(--cinza);margin:2pt 0 8pt;line-height:1.7}
.meta .chip{margin-right:4pt;vertical-align:1px}
.aibox{background:var(--rosa2);border-radius:8px;padding:9pt 12pt;margin:6pt 0 7pt}
.aibox .lab{margin-top:0;color:var(--ink)}
.aibox .impl{color:var(--cinza);margin-top:5pt}
.judge-row{margin:6pt 0 2pt;font-size:10pt}
.judge-row .chip{margin-right:6pt}
.dash{border-top:1px dashed var(--line);margin:8pt 0}
.ev{margin:4pt 0 6pt;break-inside:avoid}
.ev .src{font-size:8.2pt;color:var(--cinza)}
.ev q{display:block;font-style:italic;color:#4F4541;quotes:'\\201C' '\\201D';font-size:10pt}
.ev q::before{content:open-quote}.ev q::after{content:close-quote}
.next li{margin-bottom:5pt}
.next b{font-weight:600}
.next .why{display:block;color:var(--cinza)}
.none{font-style:italic;color:var(--cinza)}
.warn li{margin-bottom:4pt}
.warn .chip{margin-right:5pt}
.cols{columns:2;column-gap:18pt}
.cols li{break-inside:avoid}
.prop dl{display:grid;grid-template-columns:28% 1fr;gap:3pt 8pt;margin:6pt 0 0;font-size:9.8pt}
.prop dt{font-family:var(--display);font-size:6.8pt;letter-spacing:.16em;text-transform:uppercase;color:var(--cinza);padding-top:3pt}
.prop dd{margin:0}
`;

export function page(title: string, body: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${fonts()}\n${CSS}</style></head><body>${body}</body></html>`;
}

/** Running footer printed by the browser on every page (same quiet type as the section tags). */
export function footerTemplate(label: string): string {
  return `<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:6.5pt;letter-spacing:.14em;text-transform:uppercase;color:#9C9089;text-align:center;padding:0 15mm">${esc(label)} · <span class="pageNumber"></span> / <span class="totalPages"></span></div>`;
}

export const day = (iso: string | null | undefined) => (iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '');
export const dayTime = (iso: string | null | undefined) => (iso ? `${day(iso)} · ${new Date(iso).toISOString().slice(11, 16)} UTC` : '');
export const two = (n: number) => String(n).padStart(2, '0');
