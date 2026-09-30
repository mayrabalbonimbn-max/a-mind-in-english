import fs from 'fs';
import path from 'path';
import vm from 'vm';

// Loads the pedagogical content (public/data/*.js, written for the browser) on the
// server, so AI prompts are built from trusted unit data rather than client-sent context.

export interface CurriculumUnit {
  id: string;
  title: string;
  q: string;
  grammar: string;
  think: string;
  write: string;
  module: number;
  moduleTitle: string;
}

let cache: { curriculum: Map<string, CurriculumUnit>; units: Record<string, any>; reviews: Record<string, any> } | null = null;

const dataDir = path.resolve(__dirname, '../../public/data');

// Browser-authored content files have a small dependency graph: curriculum
// metadata must exist before its extensions, the shared unit constructor must
// exist before generated units, and unit extensions must run after base units.
// Keep those phases explicit so adding an extension cannot silently discard it.
function contentFilePhase(file: string): number {
  if (file === 'curriculum.js') return 0;
  if (file === 'critical-thinking.js') return 1;
  if (file === 'unit-core.js') return 2;
  if (/^unit-\d{2}\.js$/.test(file)) return 3;
  if (/^unit-\d{2}-.+\.js$/.test(file)) return 4;
  return 5;
}

function load() {
  if (cache) return cache;
  const sandbox: any = { window: {} };
  vm.createContext(sandbox);
  const files = fs
    .readdirSync(dataDir)
    .filter((f) => f.endsWith('.js'))
    .sort((a, b) => {
      return contentFilePhase(a) - contentFilePhase(b) || a.localeCompare(b);
    });
  for (const f of files) {
    vm.runInContext(fs.readFileSync(path.join(dataDir, f), 'utf8'), sandbox, { filename: f, timeout: 2000 });
  }
  const K = sandbox.window.KLANG || {};
  const curriculum = new Map<string, CurriculumUnit>();
  for (const m of K.curriculum?.modules || []) {
    for (const u of m.units) {
      curriculum.set(u.id, { ...u, module: m.id, moduleTitle: m.title });
    }
  }
  cache = { curriculum, units: K.units || {}, reviews: K.reviews || {} };
  return cache;
}

/** Strips the HTML tags and {{word|key}} markers used by the unit files. */
export function plain(s: unknown): string {
  return String(s ?? '')
    .replace(/\{\{([^|}]+)\|[^}]+\}\}/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getUnit(unitId: string): { meta: CurriculumUnit; data: any } | null {
  const { curriculum, units, reviews } = load();
  if (/^r[1-7]$/.test(unitId)) {
    const id = unitId.slice(1), review = reviews[id];
    if (!review) return null;
    const sourceUnits = (review.units || []).map((u: string) => units[u]).filter(Boolean);
    return {
      meta: {
        id: unitId,
        title: `Module ${id} Review · ${review.title}`,
        q: review.question,
        grammar: review.grammarTargets,
        think: review.reasoningTargets,
        write: 'Module synthesis · 600–900 words',
        module: Number(id),
        moduleTitle: review.title,
      },
      data: {
        ...review,
        question: review.question,
        write: { items: [review.synthesis, review.timed].filter(Boolean) },
        notice: { focuses: sourceUnits.flatMap((u: any) => u.notice?.focuses || []) },
        steal: {
          vocab: sourceUnits.flatMap((u: any) => u.steal?.vocab || []),
          chunks: sourceUnits.flatMap((u: any) => u.steal?.chunks || []),
        },
        think: {
          title: 'Cumulative reasoning transfer',
          defs: sourceUnits.flatMap((u: any) => u.think?.defs || []),
        },
      },
    };
  }
  const meta = curriculum.get(unitId);
  const data = units[unitId];
  if (!meta || !data) return null;
  return { meta, data };
}

/** Finds a writing task (WRITE items or the EDIT revised draft) by id. */
export function getWritingTask(unitId: string, taskId: string): { task: any; isRevision: boolean } | null {
  const unit = getUnit(unitId);
  if (!unit) return null;
  const item = (unit.data.write?.items || []).find((it: any) => it.id === taskId);
  if (item) return { task: item, isRevision: false };
  const revised = unit.data.edit?.revised;
  if (revised && revised.id === taskId) {
    const original = (unit.data.write?.items || []).find((it: any) => it.id === revised.revisionOf);
    // The revised draft answers the original prompt
    return { task: { ...original, ...revised, prompt: original?.prompt || revised.prompt }, isRevision: true };
  }
  return null;
}

export const TARGET_LEVEL = 'B2+ → C1';

/** Unit ids in curriculum order that have content, and the raw Module Review objects (read-only). */
export function contentIndex(): { unitIds: string[]; units: Record<string, any>; reviews: Record<string, any> } {
  const { curriculum, units, reviews } = load();
  return { unitIds: [...curriculum.keys()].filter((id) => !!units[id]), units, reviews };
}
