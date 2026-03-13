'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AppShell } from '@/components/layout/app-shell';
import { TopBar } from '@/components/builder/top-bar';
import { ChatPanel } from '@/components/builder/chat-panel';
import { PreviewPanel } from '@/components/builder/preview-panel';
import { useAuth } from '@/components/providers/auth-provider';
import { saveProjectBundle } from '@/lib/project-service';
import { useBuilderStore } from '@/lib/store/builder-store';

export default function BuilderPage() {
  const { user } = useAuth();
  const { projectId, projectName, files, versions, messages, applyAiResponse, loadProject, setSaving, markSaved } =
    useBuilderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <AppShell contentClassName="grid min-h-0 grid-rows-[auto_1fr] gap-4">
      <>
        <TopBar
          onExport={async () => {
            const response = await fetch('/api/export', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ projectName: useBuilderStore.getState().projectName, files })
            });

            if (!response.ok) {
              toast.error('Export failed');
              return;
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${useBuilderStore.getState().projectName || 'codedai-project'}.zip`;
            link.click();
            URL.revokeObjectURL(url);
            toast.success('Project exported');
          }}
          onDeploy={async () => {
            const repositoryUrl = window.prompt('Paste your GitHub/GitLab/Bitbucket repo URL to deploy on Vercel:');
            if (!repositoryUrl) return;

            const response = await fetch('/api/deploy-guide', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                repositoryUrl,
                projectName: useBuilderStore.getState().projectName
              })
            });

            const data = await response.json();
            if (!response.ok) {
              toast.error(data.error || 'Could not generate deploy URL');
              return;
            }

            window.open(data.deployUrl, '_blank', 'noopener,noreferrer');
            toast.success('Opened one-click Vercel deploy');
          }}
          onSave={async () => {
            if (!user) {
              toast.error('You need to be logged in to save.');
              return;
            }

            try {
              setSaving(true);
              const bundle = await saveProjectBundle({
                ownerId: user.uid,
                projectId,
                name: projectName,
                files,
                versions,
                messages
              });

              loadProject({
                projectId: bundle.project.id,
                projectName: bundle.project.name,
                files: bundle.files,
                versions: bundle.versions,
                messages: bundle.messages
              });
              markSaved();
              toast.success('Project saved to Firebase');
            } catch (error) {
              toast.error(error instanceof Error ? error.message : 'Project save failed');
            } finally {
              setSaving(false);
            }
          }}
        />

        <section className="grid min-h-0 grid-cols-1 gap-4 xl:grid-cols-[380px_1fr]">
          <ChatPanel projectId={projectId} />
          <PreviewPanel
            files={files}
            onFixWithAi={async (errorText) => {
              const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  instruction: 'Fix the project errors while preserving design intent.',
                  files,
                  errorContext: errorText
                })
              });

              if (!response.ok) {
                toast.error('Fix with AI failed');
                return;
              }

              const payload = await response.json();
              applyAiResponse(payload);
              toast.success('Applied AI fix from preview error');
            }}
          />
        </section>
      </>
    </AppShell>
  );
}
