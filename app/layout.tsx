import Script from 'next/script';
import './globals.css';
import type { Metadata } from 'next';
import { AppProviders } from '@/components/providers/app-providers';

export const metadata: Metadata = {
  title: 'CodedAI',
  description: 'Chat to build websites with AI. Connect Firebase. Export and deploy.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3346774865779509"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
