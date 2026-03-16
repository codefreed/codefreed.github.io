'use client';

import { CookieConsentBanner } from '@/components/marketing/cookie-consent-banner';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/components/providers/auth-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <CookieConsentBanner />
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}
