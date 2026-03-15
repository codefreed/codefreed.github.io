'use client';

import { Undo2, Redo2, Download, FolderUp, Rocket, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useBuilderStore } from '@/lib/store/builder-store';

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

  return (
    <header className="glass noise-overlay flex flex-col gap-2 rounded-3xl p-2.5 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="min-w-[160px] rounded-xl bg-white/20 px-3 py-2 text-sm text-slate-900 outline-none dark:bg-slate-800/60 dark:text-white"
        />
        <div className="text-xs text-slate-600 dark:text-slate-300">
          {isSaving ? 'Saving...' : lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}` : 'Not saved yet'}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" title="Undo">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" title="Redo">
          <Redo2 className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={onImport} title="Import">
          <FolderUp className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={onExport} title="Export">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="default" size="sm" onClick={onDeploy} title="Deploy">
          <Rocket className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onSave} disabled={isSaving} title="Save">
          <Save className="h-4 w-4" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
