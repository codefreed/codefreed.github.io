import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AiRequestSchema, AiResponseSchema } from '@/lib/ai/schema';

function parseTimeout(raw: string | undefined, fallback: number, max = Number.POSITIVE_INFINITY) {
  const parsed = Number(raw);
  const value = Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  return Math.min(value, max);
}

const OPENAI_TIMEOUT_MS = parseTimeout(process.env.OPENAI_TIMEOUT_MS, 150_000, 180_000);
const PRIMARY_MODEL = process.env.OPENAI_MODEL?.trim() || 'gpt-5';
const FALLBACK_MODEL = process.env.OPENAI_FALLBACK_MODEL?.trim() || 'gpt-4.1';
const TIMEOUT_FALLBACK_MODEL = process.env.OPENAI_TIMEOUT_FALLBACK_MODEL?.trim() || 'gpt-4.1-mini';
const TIMEOUT_FALLBACK_TIMEOUT_MS = parseTimeout(process.env.OPENAI_TIMEOUT_FALLBACK_MS, 90_000, 120_000);
export const maxDuration = 300;

const systemPrompt = `You are CodedAI, a production web app code generator.
Return ONLY JSON and no extra text.
Schema:
{
  "assistant_message": "string",
  "commit_message": "string",
  "file_ops": [
    {"path": "string", "type": "upsert|delete", "content": "string optional for upsert"}
  ]
}
Rules:
- Produce concise but complete changes.
- Default to polished, production-quality results even when the user gives a short prompt.
- Infer tasteful design choices when details are missing and aim for a finished-looking UI, not a bare scaffold.
- Prefer modifying existing files when that keeps the project cleaner, but create new files freely when it improves structure.
- Support creating, editing, and deleting files across app, components, styles, scripts, assets, and config.
- You may add JavaScript, TypeScript, JSX, TSX, CSS, JSON, Markdown, and public asset files.
- Do not wait for the user to ask for extra files, CSS, or JavaScript. Add them automatically whenever they improve quality, maintainability, or visual polish.
- For non-trivial pages, proactively split large code into reusable components and supporting style files instead of one oversized page file.
- Make layouts responsive by default and include thoughtful spacing, typography, hierarchy, and hover/focus states when relevant.
- Avoid bland default output. Choose a clear visual direction with strong styling and sensible motion when appropriate.
- The live builder preview does not compile Tailwind utilities or Next.js-only features reliably.
- Prefer standard CSS in app/globals.css or imported CSS files, relative imports, and client-renderable React components.
- Do not rely on @apply, Tailwind class names, next/font, server-only code, or @/ path aliases unless the user explicitly asks for that tradeoff.
- If you create a new file, wire it into the existing entry points when needed so the feature is actually used.
- Keep the project runnable with the current dependency set and favor browser-safe React code.
- You may output CSS, TSX, JSON, Markdown, and other project files as needed.
- Never include markdown fences.
- Refuse disallowed harmful requests and return safe minimal changes.
`;

function isModelResolutionError(error: unknown) {
  if (typeof error !== 'object' || error === null) return false;
  const status = 'status' in error ? (error as { status?: number }).status : undefined;
  const message = 'message' in error ? String((error as { message?: string }).message ?? '') : '';
  return (status === 400 || status === 404) && message.toLowerCase().includes('model');
}

function isTimeoutError(error: unknown) {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  const name = error.name.toLowerCase();
  return name.includes('abort') || name.includes('timeout') || message.includes('timed out') || message.includes('abort');
}

async function createCompletion(client: OpenAI, content: string, model: string, timeoutMs = OPENAI_TIMEOUT_MS) {
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

async function createCompletionWithFallback(client: OpenAI, content: string) {
  try {
    return await createCompletion(client, content, PRIMARY_MODEL);
  } catch (error) {
    if (isModelResolutionError(error)) {
      return createCompletion(client, content, FALLBACK_MODEL);
    }

    if (isTimeoutError(error) && TIMEOUT_FALLBACK_MODEL !== PRIMARY_MODEL) {
      return createCompletion(client, content, TIMEOUT_FALLBACK_MODEL, TIMEOUT_FALLBACK_TIMEOUT_MS);
    }

    throw error;
  }
}

function buildUserPayload(input: {
  instruction: string;
  files: Record<string, string>;
  projectMeta?: { name?: string; id?: string };
  errorContext?: string;
}) {
  return JSON.stringify(
    {
      instruction: input.instruction,
      projectMeta: input.projectMeta ?? null,
      errorContext: input.errorContext ?? null,
      previewCapabilities: {
        renderer: 'sandpack-react',
        supportsNextRuntime: false,
        supportsTailwindProcessing: false,
        supportsPathAliases: false,
        stylingPreference: 'plain-css-or-css-modules'
      },
      files: input.files
    },
    null,
    2
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'Missing OPENAI_API_KEY. Add it to .env.local and restart dev server. Use /app/settings for setup instructions.'
      },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const parsed = AiRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input payload' }, { status: 400 });
    }

    const client = new OpenAI({ apiKey, maxRetries: 0 });
    const userPayload = buildUserPayload(parsed.data);

    let raw = await createCompletionWithFallback(client, userPayload);
    let json: unknown;

    try {
      json = JSON.parse(raw);
    } catch {
      raw = await createCompletionWithFallback(client, `${userPayload}\n\nReturn ONLY valid JSON. No commentary.`);
      json = JSON.parse(raw);
    }

    const validated = AiResponseSchema.safeParse(json);
    if (!validated.success) {
      raw = await createCompletionWithFallback(
        client,
        `${userPayload}\n\nThe previous answer was invalid. Return ONLY valid JSON matching schema.`
      );
      json = JSON.parse(raw);
      const secondValidated = AiResponseSchema.safeParse(json);
      if (!secondValidated.success) {
        return NextResponse.json({ error: 'AI returned invalid JSON structure' }, { status: 502 });
      }
      return NextResponse.json(secondValidated.data);
    }

    return NextResponse.json(validated.data);
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'status' in error && (error as { status?: number }).status === 401) {
      return NextResponse.json(
        { error: 'OpenAI auth failed (401). Check OPENAI_API_KEY and restart the server.' },
        { status: 401 }
      );
    }
    if (isTimeoutError(error)) {
      return NextResponse.json(
        { error: 'OpenAI took too long to respond. Please try again.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected AI route error' },
      { status: 500 }
    );
  }
}
