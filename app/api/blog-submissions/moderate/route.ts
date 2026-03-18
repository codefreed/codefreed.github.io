import { NextResponse } from 'next/server';
import { z } from 'zod';
import { updateSubmissionStatus } from '@/lib/content/blog';

const moderationSchema = z.object({
  id: z.string().min(1, 'Submission id is required.'),
  status: z.enum(['pending', 'approved', 'rejected']),
  reviewNotes: z.string().max(400).optional()
});

function hasValidToken(request: Request) {
  const expected = process.env.BLOG_MODERATION_TOKEN;
  if (!expected) {
    return false;
  }

  const token = request.headers.get('x-moderation-token');
  return token === expected;
}

export async function PATCH(request: Request) {
  if (!hasValidToken(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const raw = await request.json();
    const parsed = moderationSchema.parse(raw);
    const submission = await updateSubmissionStatus(parsed.id, parsed);

    return NextResponse.json({ submission });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? 'Invalid moderation input.' }, { status: 400 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to update submission.' },
      { status: 500 }
    );
  }
}
