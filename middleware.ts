import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Client-side Firebase auth guard handles app protection to avoid
  // cookie propagation races that can cause login redirect loops.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)']
};
