import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { conversationWriteProblems } from '../src/services/conversation/policy';
import { loadSyncClient, flush, type FetchImpl } from './helpers/browserSync';

const engine = require('../public/conversation-engine.js');
const T = (m: number) => `2026-09-30T11:${String(m).padStart(2, '0')}:00.000Z`;
const KEY = 'conversation:conversation_sync1';
const fresh = () => engine.createEpisode({ conversationId: 'conversation_sync1', unitId: '01', characterId: 'fixture_character', characterCardVersion: '1.0.0', sourceContentVersion: 'u01-v1', createdAt: T(0) });
let n = 0;
const say = (c: any, id: string, clientId = 'device_a', createdAt = T(1)) => engine.appendUserTurn(c, { id, text: id, clientId, clientSequence: ++n, createdAt });
const reply = (c: any, id: string, to: string, createdAt = T(2)) => engine.appendTurn(c, { id, role: 'character', text: id, parentTurnId: to, replyToTurnId: to, branchId: c.turns.find((x: any) => x.id === to).branchId, logicalClock: Math.max(...c.turns.map((x: any) => x.logicalClock)) + 1, clientId: 'server_ai', clientSequence: 0, createdAt, provenance: 'character', assistanceId: null });
const clone = (x: any) => JSON.parse(JSON.stringify(x));
const emptyState = () => ({ a: {}, sec: {}, ud: {}, rd: {}, md: {}, gl: {}, bm: [], bank: [], errs: [], pf: {}, last: null, prefs: { fs: 19, w: 66 }, ca: [], lb: null } as any);
const wait = () => new Promise(r => setTimeout(r, 30));

/** In-memory stand-in for the sync API with the same CAS order and the real conversation policy. */
function fakeServer() {
  const docs = new Map<string, { data: any; revision: number }>();
  const calls: string[] = [];
  let online = true;
  const guard = (key: string, data: any, base: number | null | undefined) => {
    if (!key.startsWith('conversation:')) return [];
    const cur = docs.get(key);
    return conversationWriteProblems(key, data, cur && (base ?? 0) === cur.revision ? cur.data : null);
  };
  const fetch: FetchImpl = async (url, opts) => {
    if (!online && url !== '/api/auth/me') return 'network-error';
    calls.push(`${opts?.method || 'GET'} ${url}`);
    if (url === '/api/auth/me') return { status: 200, body: { authenticated: true, user: { id: 'u', email: 'e' } } };
    if (url === '/api/docs') return { status: 200, body: { success: true, documents: [...docs].map(([key, d]) => ({ key, data: clone(d.data), revision: d.revision })) } };
    const put = url.match(/^\/api\/docs\/(.+)$/);
    const body = opts?.body ? JSON.parse(opts.body) : {};
    if (put && opts?.method === 'PUT') {
      const key = decodeURIComponent(put[1]), cur = docs.get(key);
      const problems = guard(key, body.data, body.baseRevision);
      if (problems.length) return { status: 409, body: { error: 'conversation_write_rejected', problems } };
      if (cur && (body.baseRevision ?? 0) !== cur.revision) return { status: 409, body: { error: 'conflict', serverDoc: { key, data: clone(cur.data), revision: cur.revision } } };
      const revision = (cur?.revision || 0) + 1; docs.set(key, { data: clone(body.data), revision });
      return { status: 200, body: { success: true, doc: { key, data: body.data, revision } } };
    }
    if (url === '/api/sync/batch') {
      const saved: any[] = [], conflicts: any[] = [], rejected: any[] = [];
      body.documents.forEach((d: any) => {
        const cur = docs.get(d.key), problems = guard(d.key, d.data, d.baseRevision);
        if (problems.length) rejected.push({ key: d.key, problems });
        else if (cur && (d.baseRevision ?? 0) !== cur.revision) conflicts.push({ key: d.key });
        else { const revision = (cur?.revision || 0) + 1; docs.set(d.key, { data: clone(d.data), revision }); saved.push({ key: d.key, revision }); }
      });
      return { status: 200, body: { success: true, saved, conflicts, rejected } };
    }
    if (url === '/api/sync/resolve-conflict') {
      const cur = docs.get(body.key)!;
      if (cur.revision !== body.expectedServerRevision) return { status: 409, body: { error: 'conflict', serverDoc: { key: body.key, data: clone(cur.data), revision: cur.revision } } };
      const problems = guard(body.key, body.resolvedData, body.expectedServerRevision);
      if (problems.length) return { status: 409, body: { error: 'conversation_write_rejected', problems } };
      docs.set(body.key, { data: clone(body.resolvedData), revision: cur.revision + 1 });
      return { status: 200, body: { success: true, doc: { key: body.key, data: body.resolvedData, revision: cur.revision + 1 } } };
    }
    return { status: 200, body: {} };
  };
  return { docs, calls, fetch, setOnline: (v: boolean) => { online = v; } };
}

function device(server: ReturnType<typeof fakeServer>, storage: Record<string, string> = {}) {
  const S = emptyState();
  const client = loadSyncClient(server.fetch, storage);
  client.api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
  const write = async (conversation: any) => { S.conversations = { conversation_sync1: conversation }; client.api.markDirty(KEY); await client.api.syncPending(); await wait(); };
  return { S, client, write };
}

describe('conversation sync (client, lossless merge by immutable turn id)', () => {
  it('two devices writing concurrently: both histories survive, the branch stays explicit, no modal', async () => {
    const server = fakeServer();
    const base = reply(say(fresh(), 'user_q0001'), 'char_r0001', 'user_q0001');
    const a = device(server); await wait(); await a.write(base);
    const b = device(server); await wait();
    expect(b.S.conversations.conversation_sync1.turns).toHaveLength(2);           // login elsewhere hydrates the doc
    await b.write(say(clone(b.S.conversations.conversation_sync1), 'user_b0001', 'device_b', T(0)));  // B clock behind
    await a.write(say(clone(base), 'user_a0001', 'device_a', T(5)));              // A has a stale base -> 409 -> merge
    const stored = server.docs.get(KEY)!.data;
    expect(stored.turns.map((t: any) => t.id)).toEqual(expect.arrayContaining(['user_q0001', 'char_r0001', 'user_a0001', 'user_b0001']));
    expect(stored.mergeState.requiresResolution).toBe(true);
    expect(stored.mergeState.reasons.some((r: string) => r.startsWith('divergent_children:char_r0001'))).toBe(true);
    expect(a.client.modals).toEqual([]);
    expect(a.S.conversations.conversation_sync1.turns).toHaveLength(4);
    expect(server.calls).toContain('POST /api/sync/resolve-conflict');
  });

  it('two tabs taking turns merge without conflict (append-only, no loss)', async () => {
    const server = fakeServer();
    const first = say(fresh(), 'user_q0001');
    const tab1 = device(server); await wait(); await tab1.write(first);
    const tab2 = device(server); await wait();
    const answered = reply(clone(tab2.S.conversations.conversation_sync1), 'char_r0001', 'user_q0001');
    await tab2.write(answered);
    // tab1 saw the reply locally (same immutable turns) but still holds the old revision
    await tab1.write(say(clone(answered), 'user_q0002'));
    const stored = server.docs.get(KEY)!.data;
    expect(stored.turns.map((t: any) => t.id)).toEqual(['user_q0001', 'char_r0001', 'user_q0002']);
    expect(stored.mergeState?.requiresResolution ?? false).toBe(false);
  });

  it('ended on one device while the other kept writing: the late turn is kept and flagged', async () => {
    const server = fakeServer();
    const base = reply(say(fresh(), 'user_q0001'), 'char_r0001', 'user_q0001');
    const a = device(server); await wait(); await a.write(base);
    const b = device(server); await wait();
    await b.write(engine.endConversation(clone(b.S.conversations.conversation_sync1), T(9)));
    await a.write(say(clone(base), 'user_late01'));
    const stored = server.docs.get(KEY)!.data;
    expect(stored.status).toBe('ended'); expect(stored.endedAtTurnId).toBe('char_r0001');
    expect(stored.turns.map((t: any) => t.id)).toContain('user_late01');
    expect(stored.mergeState.reasons).toContain('turns_outside_ended_path:1:user_late01');
  });

  it('offline then reconnect: the conversation stays pending and is pushed later', async () => {
    const server = fakeServer();
    const a = device(server); await wait();
    server.setOnline(false);
    await a.write(say(fresh(), 'user_q0001'));
    expect(server.docs.has(KEY)).toBe(false);
    server.setOnline(true); a.client.context.navigator.onLine = true; a.client.fire('online');
    await wait(); await flush();
    expect(server.docs.get(KEY)!.data.turns[0].id).toBe('user_q0001');
  });

  it('refresh: a pending conversation survives in local sync metadata and is pushed after reload', async () => {
    const server = fakeServer();
    const first = device(server); await wait();
    server.setOnline(false);
    await first.write(say(fresh(), 'user_q0001'));
    const storage = Object.fromEntries(first.client.storage);
    expect(JSON.parse(storage['klang.mind.pending.v1'])).toContain(KEY);
    server.setOnline(true);
    const S = emptyState(); S.conversations = { conversation_sync1: say(fresh(), 'user_q0001') }; // app state restored from its own storage
    const reloaded = loadSyncClient(server.fetch, storage);
    reloaded.api.init({ state: S, onRemoteUpdate() {}, onSaveLocal() {} });
    await wait(); await flush();
    expect(server.docs.get(KEY)!.data.turns[0].id).toBe('user_q0001');
  });
});

describe('conversation documents on the sync API (server authority)', () => {
  const email = `conversation-sync-${Date.now()}@example.com`; let cookie = '';
  beforeAll(async () => { cookie = (await request(app).post('/api/auth/register').send({ email, password: 'Password123!' })).headers['set-cookie'][0]; });
  afterAll(async () => { await prisma.user.deleteMany({ where: { email } }); await prisma.$disconnect(); });
  const put = (data: any, baseRevision: number, key = KEY) => request(app).put(`/api/docs/${key}`).set('Cookie', cookie).send({ data, baseRevision });
  const stored = say(fresh(), 'user_q0001');

  it('accepts valid episodes, rejects malformed ones and key mismatches', async () => {
    expect((await put({ conversationId: 'conversation_sync1', turns: 'nope' }, 0)).status).toBe(400);
    expect((await put(fresh(), 0, 'conversation:another_conv1')).body.problems).toContain('conversation_key_mismatch');
    const r = await put(stored, 0);
    expect(r.status).toBe(200); expect(r.body.doc.revision).toBe(1);
  });

  it('is append-only: removed or edited turns, reopened endings and changed frozen reviews are refused', async () => {
    const edited = clone(stored); edited.turns[0].text = 'rewritten';
    expect((await put({ ...stored, turns: [] }, 1)).body.problems).toContain('turn_removed:user_q0001');
    expect((await put(edited, 1)).body.problems).toContain('turn_modified:user_q0001');
    const ended = engine.endConversation(reply(stored, 'char_r0001', 'user_q0001'), T(9));
    expect((await put(ended, 1)).status).toBe(200);
    expect((await put({ ...ended, status: 'active', endedAt: null, endedAtTurnId: null }, 2)).body.problems).toContain('ended_episode_changed');
    const reviewed = { ...ended, reviewState: { status: 'complete', revision: 1, result: { summary: 'a' }, audit: null } };
    expect((await put(reviewed, 2)).status).toBe(200);
    const r = await put({ ...reviewed, reviewState: { ...reviewed.reviewState, result: { summary: 'silently re-evaluated' } } }, 3);
    expect(r.status).toBe(409); expect(r.body.problems).toContain('frozen_review_changed');
  });

  it('a stale write gets the normal CAS conflict (with the server copy) so the device can merge', async () => {
    const r = await put(say(fresh(), 'user_other1'), 1);
    expect(r.status).toBe(409); expect(r.body.serverDoc.revision).toBe(3);
  });

  it('batch sync leaves invalid conversations out without blocking other documents', async () => {
    const r = await request(app).post('/api/sync/batch').set('Cookie', cookie).send({ documents: [
      { key: 'conversation:conversation_bad1', data: { nope: true }, baseRevision: 0 },
      { key: 'glossary', data: { gl: { word: 'new' } }, baseRevision: 0 },
    ] });
    expect(r.status).toBe(200);
    expect(r.body.rejected.map((x: any) => x.key)).toEqual(['conversation:conversation_bad1']);
    expect(r.body.saved.map((x: any) => x.key)).toEqual(['glossary']);
  });

  it('conflict resolution cannot drop turns either', async () => {
    const r = await request(app).post('/api/sync/resolve-conflict').set('Cookie', cookie).send({ key: KEY, resolvedData: fresh(), expectedServerRevision: 3 });
    expect(r.status).toBe(409); expect(r.body.problems).toEqual(expect.arrayContaining(['turn_removed:user_q0001', 'ended_episode_changed']));
  });
});
