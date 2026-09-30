import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import request from 'supertest';

// Any real network call (OpenAI / Whisper) fails the test loudly
const network: string[] = [];
vi.stubGlobal('fetch', async (url: any) => { network.push(String(url)); throw new Error(`unexpected network call: ${url}`); });

import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';
import { allModels } from './helpers/aiModels';
import { __setTranscriptionCallForTests } from '../src/services/ai/provider';

describe('POST /api/ai/transcribe · per-user hourly limit (AI_TRANSCRIBE_PER_HOUR)', () => {
  const stamp = Date.now();
  const emails = [`tr-a-${stamp}@example.com`, `tr-b-${stamp}@example.com`, `tr-c-${stamp}@example.com`];
  const cookies: string[] = [];
  const original = { ...config.ai };
  let providerCalls = 0;

  beforeAll(async () => {
    for (const email of emails) {
      const res = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
      cookies.push(res.headers['set-cookie'].find((c: string) => c.includes('klang_session='))!);
    }
  });
  const enable = () => {
    config.ai.apiKey = 'sk-test-not-real'; config.ai.models = allModels('test-model'); config.ai.transcriptionModel = 'test-transcribe';
    __setTranscriptionCallForTests(async () => { providerCalls++; return { text: 'I have forgot the word.', uncertain: [] }; });
  };
  afterEach(() => { Object.assign(config.ai, original); __setTranscriptionCallForTests(null); });
  afterAll(async () => { await prisma.user.deleteMany({ where: { email: { in: emails } } }); await prisma.$disconnect(); });

  const send = (cookie: string) => request(app).post('/api/ai/transcribe').set('Cookie', cookie)
    .set('Content-Type', 'audio/webm').set('X-Unit', '01').set('X-Activity', 's1').send(Buffer.from('audio'));

  it('is configured from the environment with a default of 20, documented in .env.example', () => {
    expect(config.ai.transcribePerHour).toBe(parseInt(process.env.AI_TRANSCRIBE_PER_HOUR || '20', 10));
    expect(fs.readFileSync(path.resolve(__dirname, '../.env.example'), 'utf8')).toMatch(/^AI_TRANSCRIBE_PER_HOUR=20$/m);
  });

  it('an unconfigured server answers 503 before the limit, so those requests do not use up the hour', async () => {
    config.ai.apiKey = '';
    for (let i = 0; i < 3; i++) expect((await send(cookies[2])).status).toBe(503);
    enable();
    const max = config.ai.transcribePerHour;
    for (let i = 0; i < max; i++) expect((await send(cookies[2])).status, `request ${i + 1}`).toBe(200);
    expect((await send(cookies[2])).status).toBe(429);
  });

  it('works normally up to the limit, then answers 429 with a clear message; other users are unaffected', async () => {
    enable(); providerCalls = 0;
    const max = config.ai.transcribePerHour;
    for (let i = 0; i < max; i++) {
      const res = await send(cookies[0]);
      expect(res.status, `request ${i + 1}`).toBe(200);
      expect(res.body.transcript).toBe('I have forgot the word.');
    }
    const over = await send(cookies[0]);
    expect(over.status).toBe(429);
    expect(over.body.error).toBe('rate_limited');
    expect(over.body.message).toMatch(/Transcription limit reached for this hour\. Your recording is saved on this device/);
    expect(Number(over.headers['retry-after'])).toBeGreaterThan(0);
    expect(providerCalls).toBe(max);   // the refused request never reached the provider

    const other = await send(cookies[1]);
    expect(other.status).toBe(200);
    expect(providerCalls).toBe(max + 1);
    expect(network).toEqual([]);
  });

  it('speaking feedback keeps its own limiter (the transcription cap does not block it)', async () => {
    enable();
    const res = await request(app).post('/api/ai/speaking-feedback').set('Cookie', cookies[0]).send({ unit: '01', activityId: 's1', transcript: '' });
    expect(res.status).toBe(400);   // reached validation: not rate limited by the transcription cap
  });
});
