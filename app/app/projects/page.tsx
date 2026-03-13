'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AppShell } from '@/components/layout/app-shell';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/auth-provider';
import { createProject, listProjects, loadProject } from '@/lib/project-service';
import { useBuilderStore } from '@/lib/store/builder-store';
import type { Project } from '@/types/project';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { files, loadProject: loadToStore } = useBuilderStore();

  useEffect(() => {
    if (!user) return;
    listProjects(user.uid)
      .then(setProjects)
      .catch(() => toast.error('Could not load projects'));
  }, [user]);

  const createNew = async () => {
    if (!user) return;
    try {
      setBusy(true);
      const bundle = await createProject(user.uid, `Project ${projects.length + 1}`, files);
      setProjects((prev) => [bundle.project, ...prev]);
      toast.success('Project created');
    } catch {
      toast.error('Project creation failed');
    } finally {
      setBusy(false);
    }
  };

  const openProject = async (projectId: string) => {
    const bundle = await loadProject(projectId);
    if (!bundle) {
      toast.error('Project not found');
      return;
    }
    loadToStore({
      projectId: bundle.project.id,
      projectName: bundle.project.name,
      files: bundle.files,
      versions: bundle.versions,
      messages: bundle.messages
    });
    router.push('/app');
  };

  return (
    <AppShell>
      <GlassPanel className="h-full">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Projects</h1>
          <div className="flex gap-2">
            <Button onClick={createNew} disabled={busy}>
              New Project
            </Button>
            <Link href="/app">
              <Button variant="secondary">Back to Builder</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          {projects.map((project) => (
            <button
              key={project.id}
              className="glass w-full rounded-2xl p-3 text-left"
              onClick={() => openProject(project.id)}
              type="button"
            >
              <div className="font-medium">{project.name}</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">{project.id}</div>
            </button>
          ))}
          {!projects.length ? <p className="text-sm text-slate-600 dark:text-slate-300">No projects yet. Create one to get started.</p> : null}
        </div>
      </GlassPanel>
    </AppShell>
  );
}
