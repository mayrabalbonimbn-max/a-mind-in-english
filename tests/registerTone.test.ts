import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import request from 'supertest';

// Every network request made by the real OpenAI client lands on this stub: nothing leaves the machine.
const calls: { url: string; body: any }[] = [];
let reply: (body: any) => Response = () => new Response('{}', { status: 500 });
vi.stubGlobal('fetch', async (url: any, init: any) => {
  if (String(url).startsWith('data:')) return new Response('');
  const body = init?.body && typeof init.body === 'string' ? JSON.parse(init.body) : null;
  calls.push({ url: String(url), body });
  return reply(body);
});

import { zodTextFormat } from 'openai/helpers/zod';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';
import { allModels } from './helpers/aiModels';
import { __setStructuredCallForTests, AiRequestError } from '../src/services/ai/provider';
import { RegisterCompareSchema } from '../src/services/ai/schemas';
import { REGISTER_COMPARE_SYSTEM, buildRegisterComparePrompt } from '../src/services/ai/prompts';
import { loadApp } from './helpers/appHarness';

const version = (example: string, bestFor = 'b') => ({ example, bestFor });
const good = {
  canCompare: true, note: '', original: 'I think this is a bad idea.', meaning: 'Disagreeing with a proposal.',
  registers: {
    casual: version("I don't think this is a great idea."),
    neutral: version("I don't think this is a good idea."),
    professional: version('I have some concerns about this approach.'),
    formal: version('I have reservations about this approach.'),
    academic: version('This approach presents several potential limitations.'),
  },
  changes: [{ feature: 'stance', explanation: 'e1' }, { feature: 'hedging', explanation: 'e2' }, { feature: 'framing', explanation: 'e3' }, { feature: 'lexis', explanation: 'e4' }, { feature: 'extra', explanation: 'e5' }],
  interchangeabilityNote: 'n',
};
const completed = (json: any, model: string) => new Response(JSON.stringify({
  id: 'resp_1', object: 'response', status: 'completed', model,
  output: [{ type: 'message', id: 'msg_1', status: 'completed', role: 'assistant', content: [{ type: 'output_text', text: JSON.stringify(json), annotations: [] }] }],
  usage: { input_tokens: 700, input_tokens_details: { cached_tokens: 0 }, output_tokens: 350, output_tokens_details: { reasoning_tokens: 0 }, total_tokens: 1050 },
}), { status: 200, headers: { 'content-type': 'application/json' } });

const ROUTE = '/api/ai/register-compare';
const req = (over: any = {}) => ({ unit: '01', section: 'read', source: 'book', selection: 'I think this is a bad idea.', context: '', ...over });

describe('Register & Tone · compare registers API', () => {
  const stamp = Date.now();
  const email = `register-${stamp}@example.com`, limitEmail = `register-limit-${stamp}@example.com`;
  let cookie: string, limitCookie: string;
  const original = { ...config.ai };
  const register = async (e: string) => (await request(app).post('/api/auth/register').send({ email: e, password: 'Password123!' })).headers['set-cookie'].find((c: string) => c.includes('klang_session='))!;

  beforeAll(async () => { cookie = await register(email); limitCookie = await register(limitEmail); });
  afterEach(() => { Object.assign(config.ai, original); __setStructuredCallForTests(null); calls.length = 0; });
  afterAll(async () => { await prisma.user.deleteMany({ where: { email: { in: [email, limitEmail] } } }); await prisma.$disconnect(); });
  const stubbed = (fn: (p: any) => any = () => good) => {
    config.ai.apiKey = 'sk-test-not-real'; config.ai.models = allModels('test-model');
    const seen: any[] = [];
    __setStructuredCallForTests(async (p: any) => { seen.push(p); return fn(p); });
    return seen;
  };

  it('returns exactly the five registers, keeps the original and caps the observations at four', async () => {
    stubbed();
    const res = await request(app).post(ROUTE).set('Cookie', cookie).send(req());
    expect(res.status).toBe(200);
    expect(Object.keys(res.body.comparison.registers)).toEqual(['casual', 'neutral', 'professional', 'formal', 'academic']);
    expect(res.body.comparison.original).toBe('I think this is a bad idea.');
    expect(res.body.comparison.changes).toHaveLength(4);
  });

  it('the schema is a valid strict structured-output format and rejects a missing register', () => {
    expect(() => zodTextFormat(RegisterCompareSchema, 'register_compare')).not.toThrow();
    const { academic, ...four } = good.registers;
    expect(RegisterCompareSchema.safeParse({ ...good, registers: four }).success).toBe(false);
    expect(RegisterCompareSchema.safeParse({ ...good, registers: { ...good.registers, poetic: version('x') } }).success).toBe(true); // extra keys are stripped, never rendered
    expect(RegisterCompareSchema.safeParse(good).success).toBe(true);
  });

  it('rejects an invalid provider output (schema mismatch or empty version) with a clean error', async () => {
    config.ai.apiKey = 'sk-test-not-real'; config.ai.models = allModels('gpt-5.4-nano');
    const { academic, ...four } = good.registers;
    reply = (b) => completed({ ...good, registers: four }, b.model);
    const bad = await request(app).post(ROUTE).set('Cookie', cookie).send(req());
    expect(bad.status).toBe(502);
    expect(calls).toHaveLength(1);
    stubbed(() => ({ ...good, registers: { ...good.registers, formal: version('  ') } }));
    const empty = await request(app).post(ROUTE).set('Cookie', cookie).send(req());
    expect(empty.status).toBe(502);
    expect(empty.body.error).toBe('ai_bad_output');
  });

  it('lets the model decline when there is not enough context, instead of inventing a meaning', async () => {
    stubbed(() => ({ ...good, canCompare: false, note: 'This fragment needs its sentence.', registers: Object.fromEntries(Object.keys(good.registers).map((k) => [k, version('', '')])), changes: [{ feature: 'x', explanation: 'y' }] }));
    const res = await request(app).post(ROUTE).set('Cookie', cookie).send(req({ selection: 'of the and then' }));
    expect(res.status).toBe(200);
    expect(res.body.comparison.canCompare).toBe(false);
    expect(res.body.comparison.changes).toEqual([]);
    expect(REGISTER_COMPARE_SYSTEM).toMatch(/set canCompare to false/);
  });

  it('requires authentication', async () => {
    const res = await request(app).post(ROUTE).send(req());
    expect(res.status).toBe(401);
  });

  it('rate-limits per user', async () => {
    stubbed();
    const statuses: number[] = [];
    for (let i = 0; i < config.ai.registerComparePerHour + 1; i++) statuses.push((await request(app).post(ROUTE).set('Cookie', limitCookie).send(req())).status);
    expect(statuses.slice(0, config.ai.registerComparePerHour).every((s) => s === 200)).toBe(true);
    expect(statuses.at(-1)).toBe(429);
    // Another user is not affected
    expect((await request(app).post(ROUTE).set('Cookie', cookie).send(req())).status).toBe(200);
  });

  it('rejects empty and oversized selections without calling the provider', async () => {
    const seen = stubbed();
    for (const selection of ['', '   ', '...']) expect((await request(app).post(ROUTE).set('Cookie', cookie).send(req({ selection }))).status).toBe(400);
    const big = await request(app).post(ROUTE).set('Cookie', cookie).send(req({ selection: 'word '.repeat(60) }));
    expect(big.status).toBe(400);
    expect(big.body.message).toMatch(/shorter passage/);
    expect((await request(app).post(ROUTE).set('Cookie', cookie).send(req({ context: 'x'.repeat(601) }))).status).toBe(400);
    expect(seen).toHaveLength(0);
  });

  it('sends only the selection (plus the course sentence), never the learner\'s draft, Profile or Error Log', async () => {
    const seen = stubbed();
    await request(app).post(ROUTE).set('Cookie', cookie).send(req({ source: 'mine', selection: "I reckon it's a bad call.", context: 'PRIVATE-DRAFT-PARAGRAPH', profile: 'PRIVATE-PROFILE', errors: ['PRIVATE-ERROR'] }));
    await request(app).post(ROUTE).set('Cookie', cookie).send(req({ context: 'Course sentence with the bad idea in it.' }));
    const [mine, book] = seen.map((p) => p.system + '\n' + p.user);
    for (const secret of ['PRIVATE-DRAFT-PARAGRAPH', 'PRIVATE-PROFILE', 'PRIVATE-ERROR']) expect(mine).not.toContain(secret);
    expect(mine).toContain("<selection>I reckon it's a bad call.</selection>");
    expect(mine).toContain("learner's own writing");
    expect(book).toContain('<sentence>Course sentence with the bad idea in it.</sentence>');
    // No answer keys or unit reading are added to the prompt
    expect(book.length).toBeLessThan(REGISTER_COMPARE_SYSTEM.length + 400);
  });

  it('never logs the selected text', async () => {
    stubbed();
    const logs: string[] = [];
    const spies = ['info', 'warn', 'error'].map((m) => vi.spyOn(console, m as any).mockImplementation((...a: any[]) => { logs.push(a.join(' ')); }));
    await request(app).post(ROUTE).set('Cookie', cookie).send(req({ selection: 'MY SECRET SENTENCE here' }));
    spies.forEach((s) => s.mockRestore());
    expect(logs.join('\n')).toContain('[ai] register compare');
    expect(logs.join('\n')).not.toContain('MY SECRET SENTENCE');
  });

  it('uses only its own model (gpt-5.4-nano, effort none, one call, capped output) and never falls back', async () => {
    config.ai.apiKey = 'sk-test-not-real';
    config.ai.models = { ...allModels(''), explain: 'gpt-5.4-nano', writing: 'gpt-5.6-expensive' };
    const off = await request(app).post(ROUTE).set('Cookie', cookie).send(req());
    expect(off.status).toBe(503);
    expect(calls).toHaveLength(0);

    config.ai.models = { ...allModels(''), registerCompare: 'gpt-5.4-nano', writing: 'gpt-5.6-expensive' };
    config.ai.reasoning = { ...config.ai.reasoning, registerCompare: 'none' };
    reply = (b) => completed(good, b.model);
    const ok = await request(app).post(ROUTE).set('Cookie', cookie).send(req());
    expect(ok.status).toBe(200);
    expect(calls).toHaveLength(1);
    const sent = calls[0].body;
    expect(calls[0].url).toMatch(/\/responses$/);
    expect(sent.model).toBe('gpt-5.4-nano');
    expect(sent.reasoning).toEqual({ effort: 'none' });
    expect(sent.max_output_tokens).toBe(800);
    expect(sent.text.format).toMatchObject({ type: 'json_schema', strict: true });
    expect(sent.store).toBe(false);

    calls.length = 0;
    reply = () => new Response(JSON.stringify({ error: { message: 'boom', type: 'server_error' } }), { status: 500, headers: { 'content-type': 'application/json' } });
    const failed = await request(app).post(ROUTE).set('Cookie', cookie).send(req());
    expect(failed.status).toBe(502);
    expect(calls).toHaveLength(1);     // no retry, no second model
    expect(calls.every((c) => !/gpt-5\.6/.test(JSON.stringify(c.body)))).toBe(true);
  });

  it('makes no real OpenAI call: without a key it answers 503, and the test env has no key', async () => {
    expect(process.env.AI_API_KEY || process.env.OPENAI_API_KEY || '').toBe('');
    config.ai.apiKey = '';
    const res = await request(app).post(ROUTE).set('Cookie', cookie).send(req());
    expect(res.status).toBe(503);
    expect(calls).toHaveLength(0);
  });

  it('maps provider failures to clean errors', async () => {
    config.ai.apiKey = 'sk-test-not-real'; config.ai.models = allModels('test-model');
    __setStructuredCallForTests(async () => { throw new AiRequestError('The AI took too long to answer', 'timeout'); });
    expect((await request(app).post(ROUTE).set('Cookie', cookie).send(req())).status).toBe(504);
    __setStructuredCallForTests(async () => { throw new AiRequestError('The AI provider is busy or out of quota', 'rate_limited'); });
    const busy = await request(app).post(ROUTE).set('Cookie', cookie).send(req());
    expect(busy.status).toBe(429);
    expect(busy.body.message).toMatch(/busy or out of quota/);
  });

  it('keeps contractions and informal language as data, unchanged', async () => {
    const seen = stubbed();
    const casual = "Nah, I don't reckon it's gonna work, tbh.";
    const res = await request(app).post(ROUTE).set('Cookie', cookie).send(req({ selection: casual }));
    expect(res.status).toBe(200);
    expect(seen[0].user).toContain(`<selection>${casual}</selection>`);
    expect(REGISTER_COMPARE_SYSTEM).toMatch(/contractions, informal language and slang/);
  });

  it('the prompt treats registers as contexts: academic is not better, casual is not worse, meaning is preserved', () => {
    const s = REGISTER_COMPARE_SYSTEM;
    expect(s).toMatch(/Registers are contexts, not levels of quality/);
    expect(s).toMatch(/Casual is not worse English and academic is not better English/);
    expect(s).toMatch(/Never describe a version as better, smarter, more advanced or more correct/);
    expect(s).toMatch(/Preserve the original intention, stance and strength of claim/);
    expect(s).toMatch(/Do not add ideas, facts, reasons or opinions/);
    expect(s).toMatch(/not formal English with difficult words/);
    expect(s).toMatch(/Do not turn every academic version into the passive voice/);
    expect(s).toMatch(/There is no linear scale/);
    expect(s).toMatch(/If two registers would naturally use the same wording, repeat it/);
    // The five definitions come from the same file as the in-book writing support
    for (const r of ['CASUAL', 'NEUTRAL', 'PROFESSIONAL', 'FORMAL', 'ACADEMIC']) expect(s).toContain(`- ${r}:`);
    expect(buildRegisterComparePrompt({ unitId: '99', section: 'read', source: 'book', selection: 'a b c', context: '' })).toBeNull();
  });
});

describe('Register & Tone · in the book (selection → compare registers → result)', () => {
  const flush = () => new Promise((r) => setImmediate(r));
  // Fakes a text selection in the reading and runs the (debounced) selection handler synchronously
  const setup = (reply: (url: string, body: any) => any, text = 'I think this is a bad idea.', sentence = 'Honestly, I think this is a bad idea. We should wait.') => {
    const a: any = loadApp({ last: { u: '01', s: 'read' } }, { fetch: reply });
    a.go('u01-read');
    const block = { textContent: sentence };
    const node: any = { nodeType: 1, closest: (q: string) => (q === '#stage' ? {} : q.startsWith('p,') ? block : null) };
    a.ctx.getSelection = () => ({ isCollapsed: false, rangeCount: 1, toString: () => text, getRangeAt: () => ({ commonAncestorContainer: node, getBoundingClientRect: () => ({ top: 10, left: 10, bottom: 20, width: 100 }) }) });
    const appended: any[] = [];
    a.ctx.document.body.appendChild = (el: any) => appended.push(el);
    a.select_ = () => {
      const st = a.ctx.setTimeout;
      a.ctx.setTimeout = (f: Function) => { f(); return 0; };
      a.fire('selectionchange', {});
      a.ctx.setTimeout = st;
    };
    return { a, sel: { appended } };
  };

  it('shows "compare registers" for a phrase, calls the API once on click, and renders the five registers escaped', async () => {
    const payload = { ...good, registers: { ...good.registers, casual: version('<img src=x onerror=alert(1)> nah'), formal: version("I have reservations about this approach.") }, changes: [{ feature: '<b>stance</b>', explanation: 'x' }] };
    const { a, sel } = setup((url) => (url.includes('register-compare') ? { status: 200, body: { success: true, comparison: payload } } : { status: 503, body: {} }));
    const pops = sel.appended;
    a.select_();
    const pop = pops.find((el: any) => el.id === 'selpop');
    expect(pop.innerHTML).toContain('data-act="selrg"');
    expect(pop.innerHTML).toContain('compare registers');
    expect(a.fetches.filter((f: any) => f.url.includes('/api/ai/') && f.url !== '/api/ai/status')).toHaveLength(0);   // selecting alone sends nothing

    a.click({ act: 'selrg' });
    await flush(); await flush();
    const aiCalls = a.fetches.filter((f: any) => f.url.includes('register-compare'));
    expect(aiCalls).toHaveLength(1);
    expect(Object.keys(aiCalls[0].body).sort()).toEqual(['context', 'section', 'selection', 'source', 'unit']);
    expect(aiCalls[0].body).toMatchObject({ unit: '01', source: 'book', selection: 'I think this is a bad idea.', context: 'Honestly, I think this is a bad idea.' });
    const modal = pops.filter((el: any) => el.id === 'modal').at(-1).innerHTML as string;
    for (const label of ['Casual', 'Neutral', 'Professional', 'Formal', 'Academic']) expect(modal).toContain(`<dt>${label}</dt>`);
    expect(modal).toContain('What changed?');
    expect(modal).toContain("These aren't interchangeable");
    expect(modal).toContain('none of these is “better English”');
    expect(modal).toContain('Sent to the AI provider: only the selected text and the sentence it comes from.');
    expect(modal).not.toContain('<img');
    expect(modal).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(modal).toContain('&lt;b&gt;stance&lt;/b&gt;');
    expect(modal).not.toMatch(/score|CEFR|%|meter/i);

    // The same selection again is not a second paid call
    a.click({ act: 'selrg' });
    await flush(); await flush();
    expect(a.fetches.filter((f: any) => f.url.includes('register-compare'))).toHaveLength(1);

    // The Language Bank is retired: no save buttons, nothing saved, and the footer says so plainly
    expect(modal).not.toContain('rg2bank');
    expect(modal).not.toMatch(/Language Bank|>save</i);
    expect(modal).toContain('Nothing is saved.');
    expect(modal).not.toContain('unless you save it');
    a.click({ act: 'rg2bank', rk: 'professional' });   // a stale button from an old page does nothing
    expect(a.state().bank).toEqual([]);
  });

  it('a provider failure shows a clean message and changes nothing', async () => {
    const { a, sel } = setup(() => ({ status: 502, body: { error: 'ai_upstream', message: 'The AI provider returned an error' } }));
    const before = JSON.stringify(a.state());
    a.select_();
    a.click({ act: 'selrg' });
    await flush(); await flush();
    const modal = sel.appended.filter((el: any) => el.id === 'modal').at(-1).innerHTML as string;
    expect(modal).toContain('The AI provider returned an error');
    expect(modal).toContain('Nothing was saved or changed.');
    expect(modal).toContain('data-act="close"');
    expect(JSON.stringify(a.state())).toBe(before);
  });

  it('long selections offer only compare registers; single words keep Glossary/Explain only', () => {
    const long = 'The writer separates accuracy, fluency and automaticity, and argues that the last one fades first.';
    let s = setup(() => ({ status: 503, body: {} }), long, long);
    s.a.select_();
    let pop = s.sel.appended.find((el: any) => el.id === 'selpop').innerHTML;
    expect(pop).toContain('selrg');
    expect(pop).not.toContain('selgl');
    s = setup(() => ({ status: 503, body: {} }), 'falter', 'You falter, you search.');
    s.a.select_();
    pop = s.sel.appended.find((el: any) => el.id === 'selpop').innerHTML;
    expect(pop).toContain('selgl');
    expect(pop).not.toContain('selrg');
  });
});
