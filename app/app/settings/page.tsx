'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AppShell } from '@/components/layout/app-shell';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '@/lib/store/builder-store';

export default function SettingsPage() {
  const [openAiConfigured, setOpenAiConfigured] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const { resetProject } = useBuilderStore();

  useEffect(() => {
    fetch('/api/env-status')
      .then((res) => res.json())
      .then((data) => setOpenAiConfigured(data.openaiConfigured))
      .catch(() => setOpenAiConfigured(false));
  }, []);

  const runTest = async () => {
    try {
      const response = await fetch('/api/test-ai', { method: 'POST' });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Test failed');
      }
      setTestResult(data.message);
      toast.success('AI test passed');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'AI test failed');
    }
  };

  return (
    <AppShell>
      <GlassPanel className="h-full overflow-y-auto">
        <h1 className="text-2xl font-semibold">Settings</h1>

        <section className="mt-4 space-y-3">
          <div className="glass rounded-2xl p-4">
            <p className="text-sm font-medium">OpenAI API Key Status</p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
              {openAiConfigured ? 'OpenAI key configured.' : 'Missing OPENAI_API_KEY.'}
            </p>
            {!openAiConfigured ? (
              <div className="mt-3 rounded-xl bg-amber-500/20 p-3 text-xs text-amber-200">
                Add `OPENAI_API_KEY` to `.env.local`, then restart `npm run dev`. On hosted deployments, add this in project env vars.
              </div>
            ) : null}
            <Button className="mt-3" onClick={runTest}>
              Test AI
            </Button>
            {testResult ? <p className="mt-2 text-xs text-emerald-300">{testResult}</p> : null}
          </div>

          <div className="glass rounded-2xl p-4">
            <p className="text-sm font-medium">Danger Zone</p>
            <p className="text-xs text-slate-600 dark:text-slate-300">Reset project files, chat, and versions to initial state.</p>
            <Button className="mt-3" variant="danger" onClick={resetProject}>
              Reset Project
            </Button>
          </div>
        </section>
      </GlassPanel>
    </AppShell>
  );
}
