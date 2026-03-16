import Script from 'next/script';
import './globals.css';
import type { Metadata } from 'next';
import { AppProviders } from '@/components/providers/app-providers';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CodeFreed',
    template: '%s'
  },
  description: 'CodeFreed is a free AI website builder with live preview, exports, blog content, and launch-ready trust pages.',
  openGraph: {
    title: 'CodeFreed',
    description: 'CodeFreed is a free AI website builder with live preview, exports, blog content, and launch-ready trust pages.',
    url: SITE_URL,
    siteName: 'CodeFreed',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeFreed',
    description: 'CodeFreed is a free AI website builder with live preview, exports, blog content, and launch-ready trust pages.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3346774865779509"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
