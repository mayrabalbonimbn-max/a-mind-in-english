/* Renders every layout fixture to a PDF for visual comparison with `modelo pdf/`:
   OUT=/some/dir npx tsx tests/helpers/renderPdfFixtures.ts   (needs a local Chrome/Chromium) */
import fs from 'fs';
import path from 'path';
import { htmlToPdf } from '../../src/services/pdf/render';
import { mainWriteHtml } from '../../src/services/pdf/mainWriteHtml';
import { learningReviewHtml } from '../../src/services/pdf/learningReviewHtml';
import { mainWriteFixtures, learningReviewFixtures } from './pdfFixtures';

(async () => {
  const out = process.env.OUT || path.resolve('pdf-fixtures');
  fs.mkdirSync(out, { recursive: true });
  for (const [name, d] of Object.entries(mainWriteFixtures)) {
    const pdf = await htmlToPdf(mainWriteHtml(d), `A Mind in English · Main Write feedback · Unit ${d.unit}`);
    if (!pdf) throw new Error('no Chromium available');
    fs.writeFileSync(path.join(out, `${name}.pdf`), pdf);
    console.log(name, pdf.length);
  }
  for (const [name, r] of Object.entries(learningReviewFixtures)) {
    const pdf = await htmlToPdf(learningReviewHtml(r), 'A Mind in English · Learning Review');
    fs.writeFileSync(path.join(out, `${name}.pdf`), pdf!);
    console.log(name, pdf!.length);
  }
})().catch((e) => { console.error(e); process.exit(1); });
