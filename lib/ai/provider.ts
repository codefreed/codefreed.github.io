import OpenAI from 'openai';
import { AI_MODELS, type AiModel } from '@/lib/ai/schema';

function parseTimeout(raw: string | undefined, fallback: number, max = Number.POSITIVE_INFINITY) {
  const parsed = Number(raw);
  const value = Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  return Math.min(value, max);
}

const OPENAI_TIMEOUT_MS = parseTimeout(process.env.OPENAI_TIMEOUT_MS, 150_000, 180_000);
const DEFAULT_PRIMARY_MODEL: AiModel = 'gpt-4.1';
export const PRIMARY_MODEL = ((process.env.OPENAI_MODEL?.trim() as AiModel | undefined) || DEFAULT_PRIMARY_MODEL);
const FALLBACK_MODEL = ((process.env.OPENAI_FALLBACK_MODEL?.trim() as AiModel | undefined) || 'gpt-5');
const TIMEOUT_FALLBACK_MODEL = process.env.OPENAI_TIMEOUT_FALLBACK_MODEL?.trim() || 'gpt-4.1-mini';
const TIMEOUT_FALLBACK_TIMEOUT_MS = parseTimeout(process.env.OPENAI_TIMEOUT_FALLBACK_MS, 90_000, 120_000);
export const SUPPORTED_MODELS = new Set<string>(AI_MODELS);

function isModelResolutionError(error: unknown) {
  if (typeof error !== 'object' || error === null) return false;
  const status = 'status' in error ? (error as { status?: number }).status : undefined;
  const message = 'message' in error ? String((error as { message?: string }).message ?? '') : '';
  return (status === 400 || status === 404) && message.toLowerCase().includes('model');
}

export function isTimeoutError(error: unknown) {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  const name = error.name.toLowerCase();
  return name.includes('abort') || name.includes('timeout') || message.includes('timed out') || message.includes('abort');
}

export function isGeminiModel(model: string) {
  return model.startsWith('gemini');
}

async function createOpenAiCompletion(client: OpenAI, systemPrompt: string, content: string, model: string, timeoutMs = OPENAI_TIMEOUT_MS) {
  const controller = new AbortController();
  let didTimeout = false;
  const timeoutId = setTimeout(() => {
    didTimeout = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await client.responses.create(
      {
        model,
        input: [
          {
            role: 'system',
            content: [{ type: 'input_text', text: systemPrompt }]
          },
          {
            role: 'user',
            content: [{ type: 'input_text', text: content }]
          }
        ],
        text: { format: { type: 'json_object' } },
        temperature: 0.3
      },
      {
        signal: controller.signal,
        timeout: timeoutMs
      }
    );

    return response.output_text?.trim() ?? '';
  } catch (error) {
    if (didTimeout) {
      throw new Error(`OpenAI request timed out after ${Math.round(timeoutMs / 1000)}s`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function createGeminiCompletion(systemPrompt: string, content: string, model: string, timeoutMs = OPENAI_TIMEOUT_MS) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY. Add it to .env.local and restart dev server.');
  }

  const controller = new AbortController();
  let didTimeout = false;
  const timeoutId = setTimeout(() => {
    didTimeout = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: content }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json'
        }
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Gemini request failed with status ${response.status}`);
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('').trim() ?? '';
    if (!text) {
      throw new Error('Gemini returned an empty response');
    }

    return text;
  } catch (error) {
    if (didTimeout) {
      throw new Error(`Gemini request timed out after ${Math.round(timeoutMs / 1000)}s`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function createCompletionWithFallback(systemPrompt: string, content: string, requestedModel: AiModel) {
  if (isGeminiModel(requestedModel)) {
    return createGeminiCompletion(systemPrompt, content, requestedModel);
  }

  const openAiApiKey = process.env.OPENAI_API_KEY?.trim();
  if (!openAiApiKey) {
    throw new Error('Missing OPENAI_API_KEY. Add it to .env.local and restart dev server.');
  }

  const client = new OpenAI({ apiKey: openAiApiKey, maxRetries: 0 });

  try {
    return await createOpenAiCompletion(client, systemPrompt, content, requestedModel);
  } catch (error) {
    if (isModelResolutionError(error)) {
      const fallbackModel = requestedModel === FALLBACK_MODEL ? PRIMARY_MODEL : FALLBACK_MODEL;
      return createOpenAiCompletion(client, systemPrompt, content, fallbackModel);
    }

    if (isTimeoutError(error) && TIMEOUT_FALLBACK_MODEL !== requestedModel) {
      return createOpenAiCompletion(client, systemPrompt, content, TIMEOUT_FALLBACK_MODEL, TIMEOUT_FALLBACK_TIMEOUT_MS);
    }

    throw error;
  }
}

export async function runJsonAi<T>({
  systemPrompt,
  content,
  selectedModel,
  validate
}: {
  systemPrompt: string;
  content: string;
  selectedModel: AiModel;
  validate: (value: unknown) => { success: true; data: T } | { success: false };
}) {
  let raw = await createCompletionWithFallback(systemPrompt, content, selectedModel);
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    raw = await createCompletionWithFallback(systemPrompt, `${content}\n\nReturn ONLY valid JSON. No commentary.`, selectedModel);
    parsed = JSON.parse(raw);
  }

  const firstPass = validate(parsed);
  if (firstPass.success) {
    return firstPass.data;
  }

  raw = await createCompletionWithFallback(
    systemPrompt,
    `${content}\n\nThe previous answer was invalid. Return ONLY valid JSON matching schema.`,
    selectedModel
  );
  parsed = JSON.parse(raw);

  const secondPass = validate(parsed);
  if (!secondPass.success) {
    throw new Error('AI returned invalid JSON structure');
  }

  return secondPass.data;
}
