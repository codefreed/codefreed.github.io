import { NextResponse } from 'next/server';
import { AiRequestSchema, AiResponseSchema } from '@/lib/ai/schema';
import { PRIMARY_MODEL, SUPPORTED_MODELS, isGeminiModel, isTimeoutError, runJsonAi } from '@/lib/ai/provider';

export const maxDuration = 300;

const systemPrompt = `You are CodeFreed, a production web app code generator.
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
- Do not cling to the existing theme or styling direction unless the user explicitly asks you to preserve it.
- If the request sounds like a fresh build, major redesign, or a different type of site, choose the theme, layout, color direction, and structure you think fit best.
- Go deeper than the literal prompt when it improves the result. Add supporting sections, extra pages, navigation, trust content, and useful structure when the project would clearly benefit from them.
- Treat vague prompts as permission to make strong product decisions. It is better to create a thoughtfully expanded site than a thin one-page mockup.
- Prefer modifying existing files when that keeps the project cleaner, but create new files freely when it improves structure.
- Support creating, editing, and deleting files across app, components, styles, scripts, assets, and config.
- You may add JavaScript, TypeScript, JSX, TSX, CSS, JSON, Markdown, and public asset files.
- Do not wait for the user to ask for extra files, CSS, or JavaScript. Add them automatically whenever they improve quality, maintainability, or visual polish.
- For non-trivial pages, proactively split large code into reusable components and supporting style files instead of one oversized page file.
- When the prompt implies a broader site, add additional pages like about, contact, FAQ, pricing, blog, legal, or feature pages whenever they would make the experience feel more complete.
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

function buildUserPayload(input: {
  instruction: string;
  files: Record<string, string>;
  attachments?: Array<{ name: string; content: string }>;
  projectMeta?: { name?: string; id?: string };
  errorContext?: string;
}) {
  return JSON.stringify(
    {
      instruction: input.instruction,
      projectMeta: input.projectMeta ?? null,
      errorContext: input.errorContext ?? null,
      creativeGuidance: {
        preserveExistingThemeOnlyWhenExplicitlyRequested: true,
        expandScopeWhenUseful: true,
        addSupportingPagesWhenAppropriate: true
      },
      previewCapabilities: {
        renderer: 'sandpack-react',
        supportsNextRuntime: false,
        supportsTailwindProcessing: false,
        supportsPathAliases: false,
        stylingPreference: 'plain-css-or-css-modules'
      },
      attachments: input.attachments ?? [],
      files: input.files
    },
    null,
    2
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = AiRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input payload' }, { status: 400 });
    }

    const selectedModel =
      parsed.data.model && SUPPORTED_MODELS.has(parsed.data.model) ? parsed.data.model : PRIMARY_MODEL;

    if (!isGeminiModel(selectedModel) && !process.env.OPENAI_API_KEY?.trim()) {
      return NextResponse.json(
        {
          error:
            'Missing OPENAI_API_KEY. Add it to .env.local and restart dev server. Use /app/settings for setup instructions.'
        },
        { status: 400 }
      );
    }

    if (isGeminiModel(selectedModel) && !process.env.GEMINI_API_KEY?.trim()) {
      return NextResponse.json(
        {
          error: 'Missing GEMINI_API_KEY. Add it to .env.local and restart dev server.'
        },
        { status: 400 }
      );
    }

    const payload = buildUserPayload(parsed.data);
    const response = await runJsonAi({
      systemPrompt,
      content: payload,
      selectedModel,
      validate: (value) => {
        const validated = AiResponseSchema.safeParse(value);
        return validated.success ? { success: true as const, data: validated.data } : { success: false as const };
      }
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error && error.message.toLowerCase().includes('gemini')) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (isTimeoutError(error)) {
      return NextResponse.json(
        { error: 'The selected AI model took too long to respond. Please try again.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected AI route error' },
      { status: 500 }
    );
  }
}
