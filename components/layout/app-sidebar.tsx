'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, FolderKanban, FileCode2, Home, Flame, Settings, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { CodeFreedLogo, CodeFreedMark } from '@/components/branding/codefreed-logo';
import { GlassPanel } from '@/components/ui/glass-panel';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/app/projects', label: 'Projects', icon: FolderKanban },
  { href: '/app', label: 'Builder', icon: FileCode2 },
  { href: '/app/prompt-lab', label: 'Prompt Lab', icon: Sparkles },
  { href: '/app/firebase', label: 'Firebase', icon: Flame },
  { href: '/app/settings', label: 'Settings', icon: Settings }
];

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <GlassPanel variant="sidebar" className="h-full overflow-hidden">
      <div className={cn('relative mb-4 flex items-center', collapsed ? 'justify-center px-2' : 'justify-between gap-2 px-1')}>
        <div className={cn('min-w-0 transition-all', collapsed ? 'scale-95' : 'scale-100')}>
          {collapsed ? <CodeFreedMark className="h-8 w-10" /> : <CodeFreedLogo compact className="max-w-[172px]" />}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={cn('h-8 w-8 shrink-0 px-0', collapsed && 'absolute right-0 top-1/2 -translate-y-1/2')}
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                'flex items-center rounded-2xl px-3 py-2 text-sm text-slate-700 transition hover:bg-white/30 dark:text-slate-200 dark:hover:bg-slate-700/40',
                collapsed ? 'justify-center gap-0 px-0' : 'gap-2',
                active && 'bg-white/60 text-slate-900 dark:bg-slate-700/70 dark:text-white'
              )}
            >
              <item.icon className="h-4 w-4" />
              {collapsed ? null : item.label}
            </Link>
          );
        })}
      </nav>
    </GlassPanel>
  );
}
