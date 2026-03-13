'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, FolderKanban, FileCode2, ImageIcon, Flame, Settings, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { GlassPanel } from '@/components/ui/glass-panel';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { logoutClient } from '@/lib/auth-client';

const navItems = [
  { href: '/app/projects', label: 'Projects', icon: FolderKanban },
  { href: '/app', label: 'Pages', icon: FileCode2 },
  { href: '/app', label: 'Assets', icon: ImageIcon },
  { href: '/app/firebase', label: 'Firebase', icon: Flame },
  { href: '/app/settings', label: 'Settings', icon: Settings }
];

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <GlassPanel variant="sidebar" className="h-full overflow-hidden">
      <div className={cn('relative mb-4 flex items-center px-2', collapsed ? 'justify-center' : 'justify-between')}>
        <div className={cn('font-semibold transition-all', collapsed ? 'text-sm' : 'text-lg')}>{collapsed ? 'CA' : 'CodedAI'}</div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 px-0"
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
      <div className="mt-4 border-t border-white/20 pt-3">
        <Button
          variant="ghost"
          className={cn('w-full', collapsed ? 'justify-center px-0' : 'justify-start')}
          onClick={async () => {
            await logoutClient();
            window.location.href = '/login';
          }}
          title="Logout"
        >
          <LogOut className={cn('h-4 w-4', collapsed ? '' : 'mr-2')} />
          {collapsed ? null : 'Logout'}
        </Button>
      </div>
    </GlassPanel>
  );
}
