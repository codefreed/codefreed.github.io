'use client';

import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { cn } from '@/lib/utils/cn';

const SIDEBAR_STORAGE_KEY = 'codedai-sidebar-collapsed';

export function AppShell({
  children,
  contentClassName
}: {
  children: React.ReactNode;
  contentClassName?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === '1');
    } catch {
      setCollapsed(false);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, collapsed ? '1' : '0');
    } catch {
      // Ignore localStorage write issues.
    }
  }, [collapsed]);

  return (
    <main
      className="studio-scroll-root grid h-[100dvh] gap-3 overflow-hidden p-3 transition-[grid-template-columns] sm:gap-4 sm:p-4 md:gap-5 md:p-5"
      style={{ gridTemplateColumns: `${collapsed ? '86px' : '252px'} minmax(0, 1fr)` }}
    >
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <section className={cn('studio-scroll-content min-h-0 min-w-0', contentClassName)}>{children}</section>
    </main>
  );
}
