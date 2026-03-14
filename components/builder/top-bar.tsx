'use client';

import { Undo2, Redo2, Download, Rocket, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useBuilderStore } from '@/lib/store/builder-store';

export function TopBar({
  onExport,
  onDeploy,
  onSave
}: {
  onExport: () => Promise<void>;
  onDeploy: () => Promise<void>;
  onSave: () => Promise<void>;
}) {
  const { projectName, setProjectName, isSaving, lastSavedAt } = useBuilderStore();

  return (
    <header className="glass noise-overlay flex flex-col gap-3 rounded-3xl p-3 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="rounded-xl bg-white/20 px-3 py-2 text-sm text-slate-900 outline-none dark:bg-slate-800/60 dark:text-white"
        />
        <div className="text-xs text-slate-600 dark:text-slate-300">
          {isSaving ? 'Saving...' : lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}` : 'Not saved yet'}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm">
          <Undo2 className="mr-1 h-4 w-4" /> Undo
        </Button>
        <Button variant="ghost" size="sm">
          <Redo2 className="mr-1 h-4 w-4" /> Redo
        </Button>
        <Button variant="secondary" size="sm" onClick={onExport}>
          <Download className="mr-1 h-4 w-4" /> Export
        </Button>
        <Button variant="default" size="sm" onClick={onDeploy}>
          <Rocket className="mr-1 h-4 w-4" /> Deploy
        </Button>
        <Button variant="ghost" size="sm" onClick={onSave} disabled={isSaving}>
          <Save className="mr-1 h-4 w-4" /> Save
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
