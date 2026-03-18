import { NextResponse } from 'next/server';
import { PromptBuilderRequestSchema, PromptBuilderResponseSchema } from '@/lib/ai/schema';
import { PRIMARY_MODEL, SUPPORTED_MODELS, isGeminiModel, isTimeoutError, runJsonAi } from '@/lib/ai/provider';

const systemPrompt = `You are CodeFreed Prompt Lab, an expert prompt strategist for website generation.
Return ONLY JSON.
Schema:
{
  "assistant_message": "string",
  "prompt_draft": "string",
  "suggestions": ["string"]
}
Rules:
- Write strong, detailed website-building prompts that a code-generation AI can act on immediately.
- Expand beyond the bare request when it improves the final website brief.
- Suggest extra pages, sections, trust elements, navigation, conversion elements, and content depth when they fit the website type.
- Choose a fitting style direction instead of mirroring whatever existing theme the user may have seen before.
- If the user is refining an existing draft, improve the prompt while preserving the useful intent.
- Make the prompt sound actionable, specific, and production-minded.
- Keep suggestions concise and useful.
- Never include markdown fences.
`;

function buildPromptPayload(input: {
  mode: 'generate' | 'refine';
  siteName?: string;
  websiteType?: string;
  selectedFeatures?: string[];
  selectedStyle?: string;
  customStyleNotes?: string;
  audience?: string;
  goals?: string;
  notes?: string;
  currentPrompt?: string;
  refinementMessage?: string;
  chatHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}) {
  return JSON.stringify(
    {
      mode: input.mode,
      siteName: input.siteName ?? null,
      websiteType: input.websiteType ?? null,
      selectedFeatures: input.selectedFeatures ?? [],
      selectedStyle: input.selectedStyle ?? null,
      customStyleNotes: input.customStyleNotes ?? null,
      audience: input.audience ?? null,
      goals: input.goals ?? null,
      notes: input.notes ?? null,
      currentPrompt: input.currentPrompt ?? null,
      refinementMessage: input.refinementMessage ?? null,
      chatHistory: input.chatHistory ?? []
    },
    null,
    2
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = PromptBuilderRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid prompt builder payload.' }, { status: 400 });
    }

    const selectedModel =
      parsed.data.model && SUPPORTED_MODELS.has(parsed.data.model) ? parsed.data.model : PRIMARY_MODEL;

    if (!isGeminiModel(selectedModel) && !process.env.OPENAI_API_KEY?.trim()) {
      return NextResponse.json(
        { error: 'Missing OPENAI_API_KEY. Add it to .env.local and restart dev server.' },
        { status: 400 }
      );
    }

    if (isGeminiModel(selectedModel) && !process.env.GEMINI_API_KEY?.trim()) {
      return NextResponse.json(
        { error: 'Missing GEMINI_API_KEY. Add it to .env.local and restart dev server.' },
        { status: 400 }
      );
    }

    const response = await runJsonAi({
      systemPrompt,
      content: buildPromptPayload(parsed.data),
      selectedModel,
      validate: (value) => {
        const validated = PromptBuilderResponseSchema.safeParse(value);
        return validated.success ? { success: true as const, data: validated.data } : { success: false as const };
      }
    });

    return NextResponse.json(response);
  } catch (error) {
    if (isTimeoutError(error)) {
      return NextResponse.json(
        { error: 'The selected AI model took too long to respond. Please try again.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected prompt builder error' },
      { status: 500 }
    );
  }
}
