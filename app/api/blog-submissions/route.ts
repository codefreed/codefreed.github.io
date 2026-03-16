import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createPendingSubmission, getBlogSubmissions } from '@/lib/content/blog';

function hasMinimumWords(value: string, minimum: number) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length >= minimum;
}

const submissionSchema = z.object({
  title: z.string().refine((value) => hasMinimumWords(value, 5), 'Title needs at least 5 words.'),
  description: z.string().refine((value) => hasMinimumWords(value, 10), 'Summary needs at least 10 words.'),
  author: z.string().min(1, 'Author is required.'),
  email: z.string().email(),
  category: z.string().min(1, 'Category is required.'),
  content: z.string().refine((value) => hasMinimumWords(value, 10), 'Article body needs at least 10 words.')
});

function hasValidToken(request: Request) {
  const expected = process.env.BLOG_MODERATION_TOKEN;
  if (!expected) {
    return false;
  }

  const token = request.headers.get('x-moderation-token');
  return token === expected;
}

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = submissionSchema.parse(raw);
    const submission = await createPendingSubmission(parsed);

    return NextResponse.json({
      ok: true,
      submissionId: submission.id,
      flaggedReasons: submission.flaggedReasons,
      message:
        submission.flaggedReasons.length > 0
          ? 'Article submitted for review and flagged for manual moderation.'
          : 'Article submitted for review.'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? 'Invalid submission.' }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unable to submit article right now.'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  if (!hasValidToken(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status');
    const status =
      statusParam === 'pending' || statusParam === 'approved' || statusParam === 'rejected' ? statusParam : undefined;
    const submissions = await getBlogSubmissions(status);

    return NextResponse.json({ submissions });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to load submissions.' },
      { status: 500 }
    );
  }
}
