import dotenv from 'dotenv';
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://localhost:5432/amindinenglish_dev',
  sessionTtlDays: parseInt(process.env.SESSION_TTL_DAYS || '30', 10),
  cookieSecure: process.env.COOKIE_SECURE === 'true' || isProd,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  sessionCookieName: 'klang_session',
  // Registration control: in dev defaults to true; in prod defaults to false unless explicitly 'true'
  allowRegistration: process.env.ALLOW_REGISTRATION !== undefined
    ? process.env.ALLOW_REGISTRATION === 'true'
    : !isProd,
  ai: {
    // Only 'openai' is implemented. Leave AI_API_KEY or AI_MODEL empty to disable AI features.
    provider: (process.env.AI_PROVIDER || 'openai').toLowerCase(),
    apiKey: process.env.AI_API_KEY || process.env.OPENAI_API_KEY || '',
    // One model per AI function, deliberately without a global fallback: an empty value
    // disables only that function (503), so a cheap model is never silently replaced.
    models: {
      explain: process.env.AI_MODEL_EXPLAIN || '',
      writing: process.env.AI_MODEL_WRITING || '',
      speakingFeedback: process.env.AI_MODEL_SPEAKING_FEEDBACK || '',
      listening: process.env.AI_MODEL_LISTENING || '',
      outline: process.env.AI_MODEL_OUTLINE || '',
      teacherLens: process.env.AI_MODEL_TEACHER_LENS || '',
      lightLanguage: process.env.AI_MODEL_LIGHT_LANGUAGE || process.env.AI_MODEL_EXPLAIN || process.env.AI_MODEL_WRITING || '',
      interpretItem: process.env.AI_MODEL_INTERPRET_ITEM || process.env.AI_MODEL_EXPLAIN || process.env.AI_MODEL_WRITING || '',
      explainQuestion: process.env.AI_MODEL_EXPLAIN_QUESTION || process.env.AI_MODEL_EXPLAIN || process.env.AI_MODEL_WRITING || '',
      characterChat: process.env.AI_MODEL_CHARACTER_CHAT || '',
      conversationHelp: process.env.AI_MODEL_CONVERSATION_HELP || '',
      conversationReview: process.env.AI_MODEL_CONVERSATION_REVIEW || '',
      registerCompare: process.env.AI_MODEL_REGISTER_COMPARE || '',
      // Main text / core long-form write correction: gpt-5.6-sol by default
      mainWrite: process.env.AI_MODEL_MAIN_WRITE || process.env.AI_MAIN_WRITE_MODEL || 'gpt-5.6-sol',
      // Learning Review (button + nightly job share it). Its own model, no fallback.
      nightlyLearningReview: process.env.AI_MODEL_NIGHTLY_LEARNING_REVIEW || '',
    },
    // Reasoning effort per function (none | minimal | low | medium | high). Empty = not sent,
    // which lets the model use its own default, so set it explicitly for reasoning models.
    reasoning: {
      explain: process.env.AI_REASONING_EXPLAIN || '',
      writing: process.env.AI_REASONING_WRITING || '',
      mainWrite: process.env.AI_REASONING_MAIN_WRITE || '',
      speakingFeedback: process.env.AI_REASONING_SPEAKING_FEEDBACK || '',
      listening: process.env.AI_REASONING_LISTENING || '',
      outline: process.env.AI_REASONING_OUTLINE || '',
      teacherLens: process.env.AI_REASONING_TEACHER_LENS || '',
      lightLanguage: process.env.AI_REASONING_LIGHT_LANGUAGE || '',
      interpretItem: process.env.AI_REASONING_INTERPRET_ITEM || '',
      explainQuestion: process.env.AI_REASONING_EXPLAIN_QUESTION || '',
      characterChat: process.env.AI_REASONING_CHARACTER_CHAT || '',
      conversationHelp: process.env.AI_REASONING_CONVERSATION_HELP || '',
      conversationReview: process.env.AI_REASONING_CONVERSATION_REVIEW || '',
      registerCompare: process.env.AI_REASONING_REGISTER_COMPARE || '',
      nightlyLearningReview: process.env.AI_REASONING_NIGHTLY_LEARNING_REVIEW || '',
    },
    transcriptionModel: process.env.AI_TRANSCRIPTION_MODEL || 'whisper-1',
    timeoutMs: parseInt(process.env.AI_TIMEOUT_MS || '120000', 10),
    maxWritingChars: parseInt(process.env.AI_MAX_WRITING_CHARS || '15000', 10),
    feedbackPerHour: parseInt(process.env.AI_FEEDBACK_PER_HOUR || '12', 10),
    explainPerHour: parseInt(process.env.AI_EXPLAIN_PER_HOUR || '60', 10),
    characterChatPerHour: parseInt(process.env.AI_CHARACTER_CHAT_PER_HOUR || '80', 10),
    conversationHelpPerHour: parseInt(process.env.AI_CONVERSATION_HELP_PER_HOUR || '30', 10),
    conversationReviewPerHour: parseInt(process.env.AI_CONVERSATION_REVIEW_PER_HOUR || '8', 10),
    registerComparePerHour: parseInt(process.env.AI_REGISTER_COMPARE_PER_HOUR || '30', 10),
    // Speaking transcription (audio minutes are the costliest AI unit): generous for real practice, capped against loops/accidents
    transcribePerHour: parseInt(process.env.AI_TRANSCRIBE_PER_HOUR || '20', 10),
  },
  learningReview: {
    // Manual "Run review now" runs that reach the AI (a click with nothing new never counts)
    perHour: parseInt(process.env.LEARNING_REVIEW_PER_HOUR || '4', 10),
    timeoutMs: parseInt(process.env.LEARNING_REVIEW_TIMEOUT_MS || '90000', 10),
    maxOutputTokens: parseInt(process.env.LEARNING_REVIEW_MAX_OUTPUT_TOKENS || '3500', 10),
    // Evidence items per run; the rest is deferred to the next run (never silently dropped)
    maxItems: parseInt(process.env.LEARNING_REVIEW_MAX_ITEMS || '60', 10),
    // The scheduler does nothing unless this is 'true', and even then only for learners who
    // have already run their first review by hand.
    nightlyEnabled: process.env.LEARNING_REVIEW_NIGHTLY === 'true',
  },
};
