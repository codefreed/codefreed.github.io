import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getFirebaseAdmin } from '@/lib/firebase/admin';

const schema = z.object({
  idToken: z.string().min(10)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const admin = getFirebaseAdmin();
    if (admin) {
      try {
        await admin.auth.verifyIdToken(parsed.data.idToken);
      } catch {
        return NextResponse.json({ error: 'Invalid Firebase token' }, { status: 401 });
      }
    }

    cookies().set('codedai_session', '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not create session' }, { status: 500 });
  }
}
