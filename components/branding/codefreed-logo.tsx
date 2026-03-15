import { cn } from '@/lib/utils/cn';

export function CodeFreedMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 112" aria-hidden="true" className={cn('h-10 w-14', className)}>
      <defs>
        <linearGradient id="cf-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#26c6f9" />
          <stop offset="100%" stopColor="#3657d6" />
        </linearGradient>
        <linearGradient id="cf-center" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8a1a" />
          <stop offset="55%" stopColor="#9a3cc3" />
          <stop offset="100%" stopColor="#4b43d3" />
        </linearGradient>
        <linearGradient id="cf-orange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b2c" />
          <stop offset="100%" stopColor="#ffab1f" />
        </linearGradient>
      </defs>

      <path d="M54 22 6 52l48 30 8-15-25-15 25-15 16-15H54Z" fill="url(#cf-blue)" />
      <path d="M84 22 58 82h19l26-60H84Z" fill="url(#cf-center)" />
      <path d="m110 36-8 15 25 15-25 15-8 15h24l48-30-48-30h-10Z" fill="url(#cf-orange)" />
      <path d="M113 12c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5Zm17-9c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6Z" fill="#9a3cc3" />
      <path d="M131 0c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7Z" fill="#ff7b1f" opacity=".9" />
    </svg>
  );
}

export function CodeFreedLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <CodeFreedMark className={compact ? 'h-9 w-12' : 'h-11 w-16'} />
      <span className={cn('text-2xl font-black tracking-[-0.04em]', compact ? 'text-xl' : 'text-3xl')}>
        <span className="bg-[linear-gradient(135deg,#26c6f9,#3657d6)] bg-clip-text text-transparent">Code</span>
        <span className="bg-[linear-gradient(135deg,#ff6b2c,#ff9b1f)] bg-clip-text text-transparent">Freed</span>
      </span>
    </div>
  );
}
