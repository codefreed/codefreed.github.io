'use client';

import { AuthGuard } from '@/components/layout/auth-guard';
import { usePathname } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const publicPaths = pathname === '/app/firebase' || pathname === '/app/settings';

  return publicPaths ? children : <AuthGuard>{children}</AuthGuard>;
}
