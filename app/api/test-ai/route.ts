import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 400 });
  }

  try {
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: 'Reply with: CodedAI test passed.'
    });

    const message = response.output_text || 'CodedAI test passed.';
    return NextResponse.json({ message });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'status' in error && (error as { status?: number }).status === 401) {
      return NextResponse.json({ error: 'OpenAI auth failed (401). Check OPENAI_API_KEY.' }, { status: 401 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'OpenAI request failed' },
      { status: 500 }
    );
  }
}
