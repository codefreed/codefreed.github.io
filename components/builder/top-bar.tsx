'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Undo2, Redo2, Download, FolderUp, Rocket, Save } from 'lucide-react';
import { ScrollToggle, applyScrollMode } from '@/components/marketing/scroll-toggle';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useBuilderStore } from '@/lib/store/builder-store';

const BUILDER_SCROLL_STORAGE_KEY = 'codefreed-builder-scroll-mode';

export function TopBar({
  onImport,
  onExport,
  onDeploy,
  onSave
}: {
  onImport: () => void;
  onExport: () => Promise<void>;
  onDeploy: () => Promise<void>;
  onSave: () => Promise<void>;
}) {
  const { projectName, setProjectName, isSaving, lastSavedAt } = useBuilderStore();

  useEffect(() => {
    const saved = window.localStorage.getItem(BUILDER_SCROLL_STORAGE_KEY);
    applyScrollMode(saved ? saved === 'smooth' : false);
  }, []);

  return (
    <header className="glass noise-overlay flex min-w-0 items-center gap-3 rounded-3xl p-2.5">
      <div className="flex min-w-0 shrink-0 items-center gap-3">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="h-10 w-[clamp(180px,24vw,320px)] max-w-full rounded-xl bg-white/20 px-3 py-2 text-sm text-slate-900 outline-none dark:bg-slate-800/60 dark:text-white"
        />
        <div className="shrink-0 text-right text-[11px] text-slate-600 dark:text-slate-300">
          {isSaving ? 'Saving...' : lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}` : 'Not saved yet'}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Button variant="ghost" size="sm" title="Undo">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" title="Redo">
          <Redo2 className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={onImport} title="Import">
          <FolderUp className="h-4 w-4" />
        </Button>
        <Link
          href="/app/prompt-lab"
          className="inline-flex h-9 items-center justify-center rounded-xl bg-white/20 px-3 text-xs font-medium text-slate-900 transition hover:bg-white/30 dark:bg-slate-800/60 dark:text-white dark:hover:bg-slate-700/70"
        >
          Prompt Lab
        </Link>
        <Button variant="secondary" size="sm" onClick={onExport} title="Export">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="default" size="sm" onClick={onDeploy} title="Deploy">
          <Rocket className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onSave} disabled={isSaving} title="Save">
          <Save className="h-4 w-4" />
        </Button>
        <div className="shrink-0">
          <ScrollToggle storageKey={BUILDER_SCROLL_STORAGE_KEY} />
        </div>
        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
