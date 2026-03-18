'use client';

import Link from 'next/link';
import { CodeFreedLogo } from '@/components/branding/codefreed-logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const navLinkClass =
  'clean-surface inline-flex h-10 items-center justify-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white';
const primaryLinkClass =
  'inline-flex h-10 items-center justify-center whitespace-nowrap rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(64,134,255,0.24)]';

export function MarketingHeader() {
  return (
    <header className="mx-auto mb-8 flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-white/60 bg-white/70 px-4 py-3 shadow-[0_18px_40px_rgba(99,119,154,0.14)] backdrop-blur-xl">
      <Link href="/" className="rounded-full px-1 py-1">
        <CodeFreedLogo compact />
      </Link>
      <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
        <Link href="/ai" className={navLinkClass}>
          AI
        </Link>
        <Link href="/features" className={navLinkClass}>
          Features
        </Link>
        <Link href="/why-us" className={navLinkClass}>
          Why Us
        </Link>
        <Link href="/api" className={navLinkClass}>
          API
        </Link>
        <Link href="/blog" className={navLinkClass}>
          Blog
        </Link>
        <Link href="/blog/submit" className={navLinkClass}>
          Post Article
        </Link>
        <Link href="/pricing" className={navLinkClass}>
          Pricing
        </Link>
        <Link href="/faq" className={navLinkClass}>
          FAQ
        </Link>
        <ThemeToggle />
        <Link href="/app" className={primaryLinkClass}>
          Open Studio
        </Link>
      </nav>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="mx-auto mt-10 flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-6 text-sm text-slate-600 dark:text-slate-300">
      <CodeFreedLogo compact />
      <div className="flex flex-wrap gap-4">
        <Link href="/ai">AI</Link>
        <Link href="/features">Features</Link>
        <Link href="/why-us">Why Us</Link>
        <Link href="/api">API</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/about">About</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/sitemap.xml">Sitemap</Link>
      </div>
    </footer>
  );
}
