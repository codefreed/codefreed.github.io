import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    firebaseWebConfigured: Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
  });
}
