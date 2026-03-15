'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const navLinkClass =
  'glass inline-flex h-10 items-center justify-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white';
const primaryLinkClass =
  'glass inline-flex h-10 items-center justify-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-glow dark:text-slate-100';

export function MarketingHeader() {
  return (
    <header className="mx-auto mb-8 flex w-full max-w-6xl flex-wrap items-center justify-between gap-4">
      <Link href="/" className="glass rounded-full px-4 py-2 text-sm">
        CodeFreed
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
    <footer className="mx-auto mt-10 flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-6 text-sm text-slate-600 dark:text-slate-300">
      <p>CodeFreed</p>
      <div className="flex flex-wrap gap-4">
        <Link href="/ai">AI</Link>
        <Link href="/features">Features</Link>
        <Link href="/why-us">Why Us</Link>
        <Link href="/api">API</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/about">About</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  );
}
