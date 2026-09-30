import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { toFile } from 'openai/uploads';
import type { z } from 'zod/v4';
import { config } from '../../config';

export class AiUnavailableError extends Error {}
export class AiRequestError extends Error {
  constructor(message: string, public readonly code: 'timeout' | 'rate_limited' | 'declined' | 'upstream' | 'bad_output') {
    super(message);
  }
}

export type AiFn = keyof typeof config.ai.models;

/** A function is available only when its own model is configured (no global fallback). */
export function isAiAvailable(fn?: AiFn): boolean {
  if (config.ai.provider !== 'openai' || !config.ai.apiKey) return false;
  return fn ? !!config.ai.models[fn] : Object.values(config.ai.models).some(Boolean);
}
export function isTranscriptionAvailable(): boolean { return config.ai.provider === 'openai' && !!config.ai.apiKey && !!config.ai.transcriptionModel; }

let client: OpenAI | null = null;
function getClient(): OpenAI {
  if (!client) {
    // maxRetries 0: a timed-out request may already be billed, so never pay for a silent second call
    client = new OpenAI({ apiKey: config.ai.apiKey, timeout: config.ai.timeoutMs, maxRetries: 0 });
  }
  return client;
}

function toAiError(err: unknown, what: string): AiRequestError {
  if (err instanceof AiRequestError) return err;
  if (err instanceof OpenAI.APIConnectionTimeoutError) return new AiRequestError(`${what} timed out`, 'timeout');
  if (err instanceof OpenAI.RateLimitError) return new AiRequestError('The AI provider is busy or out of quota', 'rate_limited');
  if (err instanceof OpenAI.APIError) {
    // Metadata only (status/code/param), never prompt contents
    console.error(`[ai] provider error status=${err.status} code=${(err as any).code ?? '-'} param=${(err as any).param ?? '-'}`);
    return new AiRequestError('The AI provider returned an error', 'upstream');
  }
  console.error('[ai] unexpected error', (err as Error)?.name);
  return new AiRequestError('Unexpected AI error', 'upstream');
}

/** Test hook: lets tests replace the network call. */
export type StructuredCall = <T>(params: { fn: AiFn; name: string; system: string; user: string; schema: z.ZodType<T>; maxTokens: number; timeoutMs?: number }) => Promise<T>;
let override: StructuredCall | null = null;
export function __setStructuredCallForTests(fn: StructuredCall | null) {
  override = fn;
}
export type TranscriptionCall = (buffer: Buffer, filename: string, mime: string) => Promise<{ text: string; uncertain?: string[] }>;
let transcriptionOverride: TranscriptionCall | null = null;
export function __setTranscriptionCallForTests(fn: TranscriptionCall | null) { transcriptionOverride = fn; }

// Learner speech must be transcribed as spoken: errors, repetitions and false starts are the evidence.
export const TRANSCRIPTION_PROMPT = 'Transcribe exactly what the speaker says, word for word. Do not correct grammar or word choice, do not complete unfinished sentences, and keep repetitions and false starts.';

export async function transcribeAudio(buffer: Buffer, filename: string, mime: string, model = config.ai.transcriptionModel) {
  if (transcriptionOverride) return transcriptionOverride(buffer, filename, mime);
  if (!isTranscriptionAvailable()) throw new AiUnavailableError('Transcription is not configured');
  try {
    const file = await toFile(buffer, filename, { type: mime });
    const result: any = await getClient().audio.transcriptions.create({ file, model, language: 'en', prompt: TRANSCRIPTION_PROMPT, response_format: 'json' });
    return { text: String(result.text || '').trim(), uncertain: [] };
  } catch (err) {
    throw toAiError(err, 'Transcription');
  }
}

export interface AiUsage { model: string; input: number; cachedInput: number; output: number; reasoning: number }

/**
 * One structured-output call with the model configured for this function; returns the parsed
 * object plus token usage. Throws AiRequestError; never falls back to another model.
 * Never logs the prompt contents (they contain the student's writing).
 */
export async function callStructuredWithUsage<T>(params: {
  fn: AiFn;
  name: string;
  system: string;
  user: string;
  schema: z.ZodType<T>;
  maxTokens: number;
  /** Per-call timeout (defaults to the client's AI_TIMEOUT_MS). */
  timeoutMs?: number;
}): Promise<{ output: T; usage: AiUsage | null }> {
  if (override) return { output: await override(params), usage: null };
  const model = config.ai.models[params.fn], effort = config.ai.reasoning[params.fn];
  if (!isAiAvailable(params.fn)) throw new AiUnavailableError(`AI is not configured for ${params.fn}`);

  try {
    const response = await getClient().responses.parse({
      model,
      instructions: params.system,
      input: params.user,
      max_output_tokens: params.maxTokens,
      text: { format: zodTextFormat(params.schema, params.name) },
      ...(effort ? { reasoning: { effort: effort as any } } : {}),
      store: false,
    }, params.timeoutMs ? { timeout: params.timeoutMs } : undefined);

    const refused = response.output.some(
      (item) => item.type === 'message' && item.content.some((c) => c.type === 'refusal')
    );
    if (refused) throw new AiRequestError('The AI declined this request', 'declined');
    const u: any = response.usage || {};
    const usage: AiUsage = {
      model: response.model,
      input: u.input_tokens ?? 0,
      cachedInput: u.input_tokens_details?.cached_tokens ?? 0,
      output: u.output_tokens ?? 0,
      reasoning: u.output_tokens_details?.reasoning_tokens ?? 0,
    };
    if (response.status === 'incomplete' || !response.output_parsed) {
      console.warn(`[ai] incomplete fn=${params.fn} model=${usage.model} out=${usage.output} reasoning=${usage.reasoning} cap=${params.maxTokens} reason=${(response as any).incomplete_details?.reason ?? '-'}`);
      throw new AiRequestError('The AI response was incomplete', 'bad_output');
    }
    console.info(`[ai] ok fn=${params.fn} model=${usage.model} in=${usage.input} cached=${usage.cachedInput} out=${usage.output} reasoning=${usage.reasoning}`);
    return { output: response.output_parsed as T, usage };
  } catch (err) {
    throw toAiError(err, 'The AI');
  }
}

export async function callStructured<T>(params: Parameters<typeof callStructuredWithUsage<T>>[0]): Promise<T> {
  return (await callStructuredWithUsage(params)).output;
}
