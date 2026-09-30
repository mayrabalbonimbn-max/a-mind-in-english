import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { config } from '../src/config';
import { allModels } from './helpers/aiModels';
import { __setStructuredCallForTests, __setTranscriptionCallForTests } from '../src/services/ai/provider';
import { SpeakingFeedbackSchema, ListeningFeedbackSchema } from '../src/services/ai/schemas';

const root = path.resolve(__dirname, '..');

function loadKlangClient(overrides: Record<string, any> = {}) {
  const sandbox: any = {
    window: {
      location: { hash: '#u01-think' },
      addEventListener: vi.fn(),
      document: {
        currentScript: { dataset: { book: '' } },
        addEventListener: vi.fn(),
      },
    },
    document: {
      addEventListener: vi.fn(),
      currentScript: { dataset: { book: '' } },
      body: { classList: { add: vi.fn(), remove: vi.fn() } },
    },
    navigator: {
      mediaDevices: {
        getUserMedia: vi.fn(),
      },
    },
    MediaRecorder: class MockMediaRecorder {
      static isTypeSupported() { return true; }
    },
    indexedDB: {
      open: vi.fn(),
    },
    localStorage: {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    },
    ...overrides,
  };
  sandbox.window.window = sandbox.window;
  sandbox.window.document = sandbox.document;
  sandbox.window.navigator = sandbox.navigator;
  sandbox.window.MediaRecorder = sandbox.MediaRecorder;
  sandbox.window.indexedDB = sandbox.indexedDB;
  sandbox.window.localStorage = sandbox.localStorage;

  vm.createContext(sandbox);
  for (const f of [
    'data/curriculum.js',
    'data/critical-thinking.js',
    'data/unit-01.js',
    'data/unit-01-media.js',
    'media.js',
  ]) {
    vm.runInContext(fs.readFileSync(path.join(root, 'public', f), 'utf8'), sandbox);
  }
  return sandbox;
}

describe('Unit 01 Listening + Speaking Pilot & Critical Thinking Spine', () => {
  const email = `media-pilot-${Date.now()}@example.com`;
  let cookie: string;
  const originalAiConfig = { ...config.ai };

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/register').send({ email, password: 'Password123!' });
    cookie = res.headers['set-cookie']?.find((c: string) => c.includes('klang_session=')) || '';
  });

  afterEach(() => {
    Object.assign(config.ai, originalAiConfig);
    __setStructuredCallForTests(null);
    __setTranscriptionCallForTests(null);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
    await prisma.$disconnect();
  });

  /* ─────────────────────────────────────────────────────────────
     1. Audio Assets & Curriculum Integrity
  ───────────────────────────────────────────────────────────── */
  describe('Audio Assets and Metadata', () => {
    it('ships two real matching audio files in public/audio/en/unit-01/', () => {
      const sandbox = loadKlangClient();
      const u = sandbox.window.KLANG.units['01'];
      expect(u.listening).toHaveLength(2);

      const [l1, l2] = u.listening;
      expect(l1.file).toBe('/audio/en/unit-01/u01-listening-01.mp3');
      expect(l2.file).toBe('/audio/en/unit-01/u01-listening-02.mp3');

      const stat1 = fs.statSync(path.join(root, 'public', l1.file));
      const stat2 = fs.statSync(path.join(root, 'public', l2.file));

      // Real ElevenLabs mp3 files (> 500KB)
      expect(stat1.size).toBeGreaterThan(500_000);
      expect(stat2.size).toBeGreaterThan(500_000);
      expect(l1.duration).toBe(129);
      expect(l2.duration).toBe(117);

      // Verify MP3 header (starts with ID3 tag or sync word 0xFF)
      const buf1 = fs.readFileSync(path.join(root, 'public', l1.file));
      const isMp3_1 = buf1.slice(0, 3).toString('ascii') === 'ID3' || (buf1[0] === 0xff && (buf1[1] & 0xe0) === 0xe0);
      expect(isMp3_1).toBe(true);
    });

    it('has complete pedagogical metadata for both listening activities', () => {
      const sandbox = loadKlangClient();
      const u = sandbox.window.KLANG.units['01'];
      for (const l of u.listening) {
        expect(l.title).toBeTruthy();
        expect(l.format).toBeTruthy();
        expect(l.level).toMatch(/B2\+|C1/);
        expect(l.voice).toBeTruthy();
        expect(l.passes).toHaveLength(3);
        expect(l.transcript.split(/\s+/).length).toBeGreaterThan(150);
        expect(l.questions.length).toBeGreaterThanOrEqual(4);
      }
    });

    it('implements deterministic closed answers and semantic rubrics for open questions', () => {
      const sandbox = loadKlangClient();
      const u = sandbox.window.KLANG.units['01'];
      const allQs = u.listening.flatMap((l: any) => l.questions);

      const mcQs = allQs.filter((q: any) => q.type === 'mc');
      expect(mcQs.length).toBeGreaterThanOrEqual(2);
      mcQs.forEach((q: any) => {
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(q.options[q.answer]).toBeDefined();
        expect(q.explain).toBeTruthy();
      });

      const tfQs = allQs.filter((q: any) => q.type === 'tf');
      expect(tfQs.length).toBeGreaterThanOrEqual(1);
      tfQs.forEach((q: any) => {
        expect(typeof q.answer).toBe('boolean');
        expect(q.explain).toBeTruthy();
      });

      const fillQs = allQs.filter((q: any) => q.type === 'fill');
      expect(fillQs.length).toBeGreaterThanOrEqual(2);
      fillQs.forEach((q: any) => {
        expect(Array.isArray(q.answers)).toBe(true);
        expect(q.answers.length).toBeGreaterThan(0);
        expect(q.explain).toBeTruthy();
      });

      const openQs = allQs.filter((q: any) => q.type === 'open');
      expect(openQs.length).toBeGreaterThanOrEqual(3);
      openQs.forEach((q: any) => {
        expect(Array.isArray(q.rubric)).toBe(true);
        expect(q.rubric.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('has complete speaking metadata in Unit 01', () => {
      const sandbox = loadKlangClient();
      const s = sandbox.window.KLANG.units['01'].speaking;
      expect(s.id).toBe('s1');
      expect(s.label).toBe('SAY IT');
      expect(s.level).toMatch(/B2\+|C1/);
      expect(s.seconds).toEqual([60, 120]);
      expect(s.prompt).toContain('Distinguish evidence from inference');
      expect(s.prepare).toBeTruthy();
      expect(s.grammar).toBeTruthy();
      expect(s.targets.length).toBeGreaterThanOrEqual(4);
      expect(s.rubric.length).toBeGreaterThanOrEqual(6);
    });
  });

  /* ─────────────────────────────────────────────────────────────
     2. Listening UI, Gating, Objective & Open Evaluation
  ───────────────────────────────────────────────────────────── */
  describe('Listening Component UX and Evaluation', () => {
    const appCode = fs.readFileSync(path.join(root, 'public/app.js'), 'utf8');

    it('gates transcripts until submission', () => {
      // Confirms app.js hides transcript details before lisubmit
      expect(appCode).toContain('const submitted = !!S.a[`${u}:li:${l.id}:submitted`]');
      expect(appCode).toContain('${submitted ? `<details class="acc"><summary>Transcript + analysis <small>available after submission</small></summary>');
    });

    it('catches audio load errors gracefully without crashing the UI', () => {
      expect(appCode).toContain('data-audio-error="${l.id}" hidden');
      expect(appCode).toContain("document.addEventListener('error'");
      expect(appCode).toContain('data-audio-error');
      expect(appCode).toContain('Audio unavailable. The activity is preserved');
    });

    it('evaluates multiple-choice, true/false, and fill-in-the-blank objectively', () => {
      // MC evaluation check
      expect(appCode).toContain("n === q.answer ? 'right' : (+val === n ? 'wrong' : '')");
      expect(appCode).toContain("+val === q.answer ? 'Correct' : `Answer: ${LET[q.answer]}`");

      // TF evaluation check
      expect(appCode).toContain("((x === 'True') === q.answer) ? 'right' : (val === x ? 'wrong' : '')");
      expect(appCode).toContain("((val === 'True') === q.answer) ? 'Correct' : `Answer: ${q.answer ? 'True' : 'False'}`");

      // Fill evaluation check with normalized substring matching
      expect(appCode).toContain("(q.answers || []).some(a => a.split('|').every(x => val.toLowerCase().includes(x.toLowerCase())))");
    });

    it('provides semantic rubric and AI feedback action for open questions', () => {
      expect(appCode).toContain("data-act=\"lifb\"");
      expect(appCode).toContain("q.rubric.map(x => `<li>${x}</li>`)");
      expect(appCode).toContain("saved.understanding");
      expect(appCode).toContain("saved.missed");
      expect(appCode).toContain("saved.evidence");
      expect(appCode).toContain("saved.nextTime");
    });
  });

  /* ─────────────────────────────────────────────────────────────
     3. Speaking Component: IndexedDB, History, Disclaimer
  ───────────────────────────────────────────────────────────── */
  describe('Speaking Component & Private Audio Storage', () => {
    const appCode = fs.readFileSync(path.join(root, 'public/app.js'), 'utf8');
    const mediaCode = fs.readFileSync(path.join(root, 'public/media.js'), 'utf8');

    it('stores raw audio strictly in IndexedDB, never in localStorage', () => {
      expect(mediaCode).toContain("const DB = 'klang-private-recordings-v1'");
      expect(mediaCode).toContain("STORE = 'recordings'");
      expect(mediaCode).not.toContain('localStorage');
      expect(appCode).toContain("audioStorage: 'indexeddb-local'");
      expect(appCode).toContain('await window.KLANG_MEDIA.put(id, blob)');
    });

    it('gracefully handles missing MediaRecorder support and permission denial', () => {
      expect(appCode).toContain("window.KLANG_MEDIA.supported()");
      expect(appCode).toContain("Recording is not supported in this browser.");
      expect(appCode).toContain("e.name === 'NotAllowedError'");
      expect(appCode).toContain("Microphone permission was denied. Change browser permission, then press record again.");
    });

    it('supports attempt history: Try Again preserves Attempt 1 and increments to Attempt 2', () => {
      expect(appCode).toContain("const attempt = attemptsFor(u, sid).length + 1");
      expect(appCode).toContain("try again");
      expect(appCode).toContain("Speaking portfolio");
      expect(appCode).toContain("Attempt ${a.attempt} · ${a.date.slice(0,10)} · ${a.duration}s");
    });

    it('plays local recording using Object URLs', () => {
      expect(appCode).toContain("URL.createObjectURL(blob)");
      expect(appCode).toContain("URL.revokeObjectURL(p.src)");
      expect(appCode).toContain("This recording exists only on the device where it was made");
    });

    it('makes explicit transcription optional and never automatic', () => {
      // When recording stops, transcript is initialized as empty string
      expect(appCode).toContain("transcript: ''");
      // Explicit action triggered by user button
      expect(appCode).toContain("data-act=\"sptranscribe\"");
      expect(appCode).toContain("transcribeSpeaking(t.dataset.id,t)");
      expect(appCode).toContain("Transcription failed. The recording is still stored locally.");
    });

    it('displays prominent transcript-only disclaimer for AI speaking feedback', () => {
      expect(appCode).toContain("Transcript-only analysis");
      expect(appCode).toContain("No acoustic claims are made.");
      expect(appCode).toContain("Feedback is transcript-only and cannot assess pronunciation, rhythm, pauses or actual fluency.");
    });

    it('integrates speaking feedback corrections with the Error Log only (the Language Bank is retired)', () => {
      expect(appCode).toContain("data-act=\"sp2err\"");
      expect(appCode).not.toContain("sp2bank");
      expect(appCode).toContain("category:c.category||'Speaking'");
      expect(appCode).toContain("source:'speaking'");
    });

    it('persists learner self-check notes', () => {
      expect(appCode).toContain("data-sp-self");
      expect(appCode).toContain("a.selfCheck = t.value");
      expect(appCode).toContain("save('speaking')");
    });
  });

  /* ─────────────────────────────────────────────────────────────
     4. State, Sync, Concurrency & Backup / Restore
  ───────────────────────────────────────────────────────────── */
  describe('Sync, Backup and Restore Integration', () => {
    const syncCode = fs.readFileSync(path.join(root, 'public/sync.js'), 'utf8');
    const appCode = fs.readFileSync(path.join(root, 'public/app.js'), 'utf8');

    it('maps listening answers to unit:01 scope and speaking metadata to speaking scope', () => {
      const sandbox = loadKlangClient();
      vm.runInContext(syncCode, sandbox);
      const sync = sandbox.window.KLANG_SYNC;

      expect(sync.keyToScope('01:li:l1:q1')).toBe('unit:01');
      expect(sync.keyToScope('01:li:l1:submitted')).toBe('unit:01');
      expect(sync.keyToScope('speaking')).toBe('speaking');
    });

    it('excludes raw audio from sync documents and includes only metadata', () => {
      expect(syncCode).toContain("docs['speaking'] = { attempts: S.sp || [] }");
      expect(syncCode).toContain("case 'speaking':");
      expect(syncCode).toContain("return { attempts: S.sp || [] }");
      expect(syncCode).toContain("S.sp = Array.isArray(data.attempts) ? data.attempts : []");
    });

    it('includes speaking in hasWork, backup export and marks speaking dirty on restore', () => {
      expect(appCode).toContain("(S.sp || []).length"); // in hasWork
      expect(appCode).toContain("state: S"); // in doBackup export
      expect(appCode).toContain("sp: []"); // in DEF
      expect(appCode).toContain("['glossary', 'language-bank', 'error-log', 'bookmarks', 'portfolio', 'speaking', 'current-affairs', 'progress'].forEach");
    });
  });

  /* ─────────────────────────────────────────────────────────────
     5. Backend API Endpoints (Transcribe, Speaking & Listening AI, CSP)
  ───────────────────────────────────────────────────────────── */
  describe('Backend AI & Sync Endpoints for Media Pilot', () => {
    it('sets Content-Security-Policy media-src allowing self and blob', async () => {
      const res = await request(app).get('/');
      const csp = res.headers['content-security-policy'] || '';
      expect(csp).toContain("media-src 'self' blob:");
    });

    it('protects audio files with authentication gate', async () => {
      const unauth = await request(app).get('/audio/en/unit-01/u01-listening-01.mp3');
      expect(unauth.status).toBe(401);

      const auth = await request(app)
        .get('/audio/en/unit-01/u01-listening-01.mp3')
        .set('Cookie', cookie);
      expect(auth.status).toBe(200);
      expect(auth.headers['content-type']).toContain('audio/mpeg');
    });

    it('accepts and verifies speaking document persistence in PostgreSQL', async () => {
      const testAttempts = [
        {
          id: 'sp_test_1',
          unit: '01',
          activityId: 's1',
          attempt: 1,
          date: new Date().toISOString(),
          duration: 75,
          mime: 'audio/webm',
          transcript: 'This is my test speech.',
          correctedTranscript: '',
          feedback: null,
          selfCheck: 'Need clearer qualification.',
          audioStorage: 'indexeddb-local',
        },
      ];

      const putRes = await request(app)
        .put('/api/docs/speaking')
        .set('Cookie', cookie)
        .send({ data: { attempts: testAttempts }, baseRevision: 0 });
      expect(putRes.status).toBe(200);
      expect(putRes.body.doc.revision).toBe(1);

      const getRes = await request(app).get('/api/docs/speaking').set('Cookie', cookie);
      expect(getRes.status).toBe(200);
      expect(getRes.body.doc.data.attempts).toHaveLength(1);
      expect(getRes.body.doc.data.attempts[0].id).toBe('sp_test_1');
      expect(getRes.body.doc.data.attempts[0].transcript).toBe('This is my test speech.');
    });

    it('rejects unauthenticated requests to AI media endpoints', async () => {
      const tr = await request(app).post('/api/ai/transcribe').send(Buffer.from('test'));
      expect(tr.status).toBe(401);

      const sp = await request(app).post('/api/ai/speaking-feedback').send({ unit: '01', activityId: 's1', transcript: 'test' });
      expect(sp.status).toBe(401);

      const li = await request(app).post('/api/ai/listening-feedback').send({ unit: '01', activityId: 'l1', questionId: 'q3', answer: 'test' });
      expect(li.status).toBe(401);
    });

    it('executes AI speaking feedback with structured output and prompt validation', async () => {
      config.ai.apiKey = 'test-key';
      config.ai.models = allModels('test-model');

      const mockSpeakingFeedback = {
        analysisMode: 'transcript_only' as const,
        summary: 'Solid reasoning with clear separation between recognition and production.',
        taskFulfilment: 'Directly addresses the prompt and fulfills the core requirement.',
        coherence: 'Logical transitions between points.',
        grammar: 'Accurate use of modal verbs.',
        vocabulary: 'Effective range of B2+/C1 vocabulary.',
        naturalPhrasing: 'Natural phrasing throughout.',
        discourseManagement: 'Well-structured progression.',
        precisionRange: 'Nuanced distinctions.',
        targetLanguage: 'Appropriately integrates target structures.',
        correctedTranscript: 'I understand almost everything...',
        corrections: [
          { original: 'I have lost', better: 'I have had difficulty retrieving', why: 'retrieval vs loss', category: 'Grammar' },
        ],
      };

      let capturedPrompt: any;
      __setStructuredCallForTests(async (p: any) => {
        capturedPrompt = p;
        return mockSpeakingFeedback;
      });

      const res = await request(app)
        .post('/api/ai/speaking-feedback')
        .set('Cookie', cookie)
        .send({
          unit: '01',
          activityId: 's1',
          transcript: 'When someone says I cannot speak so I lost the language, they confuse retrieval with knowledge.',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.feedback.analysisMode).toBe('transcript_only');
      expect(res.body.feedback.corrections).toHaveLength(1);
      expect(capturedPrompt.system).toContain('You received ONLY an automatic transcript, never audio.');
      expect(capturedPrompt.user).toContain('Distinguish evidence from inference');
      expect(capturedPrompt.user).not.toMatch(/language bank/i);
      expect(Object.keys(capturedPrompt.schema.shape)).not.toContain('languageBank');
    });

    it('executes AI listening feedback for open questions with structured rubric comparison', async () => {
      config.ai.apiKey = 'test-key';
      config.ai.models = allModels('test-model');

      const mockListeningFeedback = {
        understanding: 'Accurately captures that failed recall does not prove total loss.',
        missed: 'Did not explicitly mention the word strict from the speaker’s opening story.',
        evidence: 'The speaker uses the analogy of remembering names.',
        nextTime: 'Explicitly state how accessibility differs between recognition and production.',
      };

      let capturedPrompt: any;
      __setStructuredCallForTests(async (p: any) => {
        capturedPrompt = p;
        return mockListeningFeedback;
      });

      const res = await request(app)
        .post('/api/ai/listening-feedback')
        .set('Cookie', cookie)
        .send({
          unit: '01',
          activityId: 'l1',
          questionId: 'q3',
          answer: 'The name analogy shows that you might recognise a name even if you cannot retrieve it yourself.',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.feedback.understanding).toBeTruthy();
      expect(capturedPrompt.system).toContain('Evaluate semantic understanding');
      expect(capturedPrompt.user).toContain('<official_transcript>');
      expect(capturedPrompt.user).toContain('<rubric>');
    });
  });

  /* ─────────────────────────────────────────────────────────────
     6. Critical Thinking Cumulative Spine
  ───────────────────────────────────────────────────────────── */
  describe('Critical Thinking Cumulative Spine & Unit 01 Integration', () => {
    it('defines all 32 cumulative critical thinking focuses across the curriculum', () => {
      const code = fs.readFileSync(path.join(root, 'public/data/critical-thinking.js'), 'utf8');
      const sandbox: any = { window: { KLANG: { curriculum: { modules: [] } } } };
      vm.createContext(sandbox);
      vm.runInContext(code, sandbox);

      const ct = sandbox.window.KLANG.criticalThinking;
      expect(ct).toBeDefined();
      expect(Object.keys(ct.focus)).toHaveLength(32);

      // Check boundary and key milestones
      expect(ct.focus['01']).toContain('evidence vs inference');
      expect(ct.focus['02']).toContain('fact, claim and interpretation');
      expect(ct.focus['08']).toContain('ambiguity and competing explanations');
      expect(ct.focus['16']).toContain('basic steelman');
      expect(ct.focus['32']).toContain('qualified synthesis');
    });

    it('embeds critical thinking into Unit 01 Think stage items t1–t5', () => {
      const sandbox = loadKlangClient();
      const u = sandbox.window.KLANG.units['01'];
      expect(u.think).toBeDefined();
      expect(u.think.items.length).toBeGreaterThanOrEqual(5);

      // Items reflect evidence vs inference, claims, qualification
      const itemTexts = u.think.items.map((t: any) => t.q || t.title || '').join(' ');
      expect(itemTexts).toMatch(/evidence|inference|claim|assumption/i);
    });

    it('embeds reasoning tool retrieval into Unit 01 Retrieve stage with a new micro-case', () => {
      const sandbox = loadKlangClient();
      const u = sandbox.window.KLANG.units['01'];
      expect(u.retrieve).toBeDefined();

      const r6 = u.retrieve.items.find((t: any) => t.id === 'r6');
      expect(r6).toBeDefined();
      expect(r6.q).toContain('distinction between evidence and inference');
      expect(r6.q).toContain('colleague hesitates for three seconds');

      // Verify reveal answers match the micro-case
      const revealCode = fs.readFileSync(path.join(root, 'public/data/unit-01.js'), 'utf8');
      expect(revealCode).toContain('the 3-second pause');
      expect(revealCode).toContain('inferring uncertainty, incompetence, or careful thought');
    });
  });
});
