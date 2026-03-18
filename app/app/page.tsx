'use client';

import { useEffect, useRef, useState } from 'react';
import JSZip from 'jszip';
import { toast } from 'sonner';
import { AppShell } from '@/components/layout/app-shell';
import { ChatPanel, fixPreviewWithAi } from '@/components/builder/chat-panel';
import { TopBar } from '@/components/builder/top-bar';
import { PreviewPanel } from '@/components/builder/preview-panel';
import { useAuth } from '@/components/providers/auth-provider';
import { saveProjectBundle } from '@/lib/project-service';
import { useBuilderStore } from '@/lib/store/builder-store';
import { IS_STATIC_EXPORT } from '@/lib/runtime';

const TEXT_FILE_EXTENSIONS = new Set([
  '.css',
  '.csv',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.svg',
  '.ts',
  '.tsx',
  '.txt',
  '.xml',
  '.yml',
  '.yaml'
]);

function normalizeImportedPath(filePath: string) {
  return filePath.replace(/^\/+/, '').replace(/\\/g, '/');
}

function extension(filePath: string) {
  const normalized = normalizeImportedPath(filePath);
  const fileName = normalized.split('/').pop() ?? '';
  const index = fileName.lastIndexOf('.');
  return index === -1 ? '' : fileName.slice(index).toLowerCase();
}

function isTextWebsiteFile(filePath: string) {
  const normalized = normalizeImportedPath(filePath);
  const fileName = normalized.split('/').pop() ?? '';

  if (!fileName || fileName.startsWith('.DS_Store')) {
    return false;
  }

  if (!fileName.includes('.')) {
    return ['dockerfile', 'license', 'readme', 'makefile'].includes(fileName.toLowerCase());
  }

  return TEXT_FILE_EXTENSIONS.has(extension(filePath));
}

function inferProjectName(fileName: string) {
  return fileName.replace(/\.(zip)$/i, '').trim() || 'Imported Project';
}

function clampChatPanelWidth(rawWidth: number, viewportWidth: number, wideLayout: boolean) {
  if (wideLayout) {
    const minWidth = 280;
    const maxWidth = Math.min(620, Math.max(320, viewportWidth - 520));
    return Math.max(minWidth, Math.min(maxWidth, rawWidth));
  }

  const minWidth = 220;
  const maxWidth = Math.min(420, Math.max(260, viewportWidth - 160));
  return Math.max(minWidth, Math.min(maxWidth, rawWidth));
}

export default function BuilderPage() {
  const splitHandleRef = useRef<HTMLDivElement | null>(null);
  const folderInputRef = useRef<HTMLInputElement | null>(null);
  const zipInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();
  const { projectId, projectName, files, versions, messages, loadProject, replaceProjectContents, setSaving, markSaved } =
    useBuilderStore();
  const [mounted, setMounted] = useState(false);
  const [chatWidth, setChatWidth] = useState(540);
  const [resizing, setResizing] = useState(false);
  const [isWideLayout, setIsWideLayout] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1440);

  const importFileTree = (nextFiles: Record<string, string>, importedName?: string) => {
    if (!Object.keys(nextFiles).length) {
      toast.error('No supported website files were found to import');
      return;
    }

    replaceProjectContents({
      projectName: importedName || projectName,
      files: nextFiles
    });
    toast.success(`Imported ${Object.keys(nextFiles).length} file${Object.keys(nextFiles).length === 1 ? '' : 's'}`);
  };

  const importFolder = async (selectedFiles: FileList | null) => {
    if (!selectedFiles?.length) {
      return;
    }

    const nextFiles: Record<string, string> = {};
    let skipped = 0;

    await Promise.all(
      Array.from(selectedFiles).map(async (file) => {
        const relativePath = normalizeImportedPath((file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name);
        if (!isTextWebsiteFile(relativePath)) {
          skipped += 1;
          return;
        }

        nextFiles[relativePath] = await file.text();
      })
    );

    const importedRoot = normalizeImportedPath((selectedFiles[0] as File & { webkitRelativePath?: string }).webkitRelativePath || '');
    const folderName = importedRoot.split('/')[0] || 'Imported Project';
    importFileTree(nextFiles, folderName);

    if (skipped) {
      toast.message(`Skipped ${skipped} unsupported file${skipped === 1 ? '' : 's'}`);
    }
  };

  const importZip = async (selectedFile: File | null) => {
    if (!selectedFile) {
      return;
    }

    const zip = await JSZip.loadAsync(selectedFile);
    const nextFiles: Record<string, string> = {};
    let skipped = 0;

    await Promise.all(
      Object.values(zip.files).map(async (entry) => {
        if (entry.dir) {
          return;
        }

        const filePath = normalizeImportedPath(entry.name);
        if (!isTextWebsiteFile(filePath)) {
          skipped += 1;
          return;
        }

        nextFiles[filePath] = await entry.async('string');
      })
    );

    importFileTree(nextFiles, inferProjectName(selectedFile.name));

    if (skipped) {
      toast.message(`Skipped ${skipped} unsupported file${skipped === 1 ? '' : 's'} from the zip`);
    }
  };

  const openImportPicker = () => {
    const selection = window.prompt('Type "folder" to import a website folder or "zip" to import a .zip file.');
    if (!selection) {
      return;
    }

    const normalized = selection.trim().toLowerCase();
    if (normalized === 'folder') {
      folderInputRef.current?.click();
      return;
    }

    if (normalized === 'zip') {
      zipInputRef.current?.click();
      return;
    }

    toast.error('Type "folder" or "zip" to choose an import type');
  };

  const exportProject = async () => {
    const currentFiles = useBuilderStore.getState().files;
    const currentProjectName = useBuilderStore.getState().projectName || 'codedai-project';

    if (IS_STATIC_EXPORT) {
      const zip = new JSZip();

      Object.entries(currentFiles).forEach(([path, content]) => {
        zip.file(path, content);
      });

      if (!currentFiles['README.md']) {
        zip.file(
          'README.md',
          `# ${currentProjectName}\n\nGenerated by CodeFreed.\n\n## Run locally\n\n1. npm install\n2. npm run dev\n\n## Deploy\n\nUse Vercel and add your env vars.`
        );
      }

      if (!currentFiles['vercel.json']) {
        zip.file('vercel.json', JSON.stringify({ framework: 'nextjs' }, null, 2));
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentProjectName}.zip`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('Project exported');
      return;
    }

    const response = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectName: currentProjectName, files: currentFiles })
    });

    if (!response.ok) {
      toast.error('Export failed');
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentProjectName}.zip`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Project exported');
  };

  const deployProject = async () => {
    const repositoryUrl = window.prompt('Paste your GitHub/GitLab/Bitbucket repo URL to deploy on Vercel:');
    if (!repositoryUrl) return;

    const requiredEnvKeys = [
      'OPENAI_API_KEY',
      'GEMINI_API_KEY',
      'NEXT_PUBLIC_FIREBASE_API_KEY',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'NEXT_PUBLIC_FIREBASE_APP_ID'
    ];

    try {
      const host = new URL(repositoryUrl).hostname.toLowerCase();
      if (!['github.com', 'gitlab.com', 'bitbucket.org'].includes(host)) {
        toast.error('Repository URL must be from GitHub, GitLab, or Bitbucket');
        return;
      }

      const params = new URLSearchParams();
      params.set('repository-url', repositoryUrl);
      params.set('env', requiredEnvKeys.join(','));
      params.set('project-name', useBuilderStore.getState().projectName);
      window.open(`https://vercel.com/new/clone?${params.toString()}`, '_blank', 'noopener,noreferrer');
      toast.success('Opened one-click Vercel deploy');
    } catch {
      toast.error('Invalid repository URL');
    }
  };

  useEffect(() => {
    setMounted(true);
    try {
      const savedWidth = window.localStorage.getItem('codedai-chat-width');
      if (savedWidth) {
        const parsed = Number(savedWidth);
        if (!Number.isNaN(parsed)) {
          setChatWidth(parsed);
        }
      }
    } catch {
      // Ignore localStorage read issues.
    }
  }, []);

  useEffect(() => {
    const syncLayout = () => {
      setViewportWidth(window.innerWidth);
      const wide = window.innerWidth >= 1024;
      setIsWideLayout(wide);
    };

    syncLayout();
    window.addEventListener('resize', syncLayout);

    return () => {
      window.removeEventListener('resize', syncLayout);
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('codedai-chat-width', String(chatWidth));
    } catch {
      // Ignore localStorage write issues.
    }
  }, [chatWidth]);

  useEffect(() => {
    setChatWidth((current) => clampChatPanelWidth(current, viewportWidth, isWideLayout));
  }, [isWideLayout, viewportWidth]);

  useEffect(() => {
    if (!resizing) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      const shell = splitHandleRef.current?.parentElement;
      if (!shell) {
        return;
      }

      const bounds = shell.getBoundingClientRect();
      const nextWidth = event.clientX - bounds.left;
      setChatWidth(clampChatPanelWidth(nextWidth, bounds.width, true));
    };

    const onPointerUp = () => setResizing(false);

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [resizing]);

  if (!mounted) return null;

  const effectiveChatWidth = clampChatPanelWidth(chatWidth, viewportWidth, isWideLayout);
  const studioColumns = isWideLayout ? `${effectiveChatWidth}px 20px minmax(0, 1fr)` : `${effectiveChatWidth}px minmax(0, 1fr)`;

  return (
    <AppShell contentClassName="grid min-h-0 grid-rows-[auto_1fr] gap-3 overflow-hidden">
      <>
        <input
          ref={folderInputRef}
          className="hidden"
          type="file"
          multiple
          // @ts-expect-error webkitdirectory is not in the React type definitions.
          webkitdirectory=""
          onChange={(event) => {
            void importFolder(event.target.files);
            event.target.value = '';
          }}
        />
        <input
          ref={zipInputRef}
          className="hidden"
          type="file"
          accept=".zip,application/zip"
          onChange={(event) => {
            void importZip(event.target.files?.[0] ?? null);
            event.target.value = '';
          }}
        />
        <TopBar
          onImport={openImportPicker}
          onExport={exportProject}
          onDeploy={deployProject}
          onSave={async () => {
            try {
              setSaving(true);
              const bundle = await saveProjectBundle({
                ownerId: user?.uid ?? 'guest',
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
              toast.success(user ? 'Project saved' : 'Project saved locally');
            } catch (error) {
              toast.error(error instanceof Error ? error.message : 'Project save failed');
            } finally {
              setSaving(false);
            }
          }}
        />

        <section
          className="grid min-h-0 min-w-0 gap-3 overflow-hidden xl:gap-0"
          style={{
            gridTemplateColumns: studioColumns
          }}
        >
          <ChatPanel projectId={projectId} />
          <div
            ref={splitHandleRef}
            className={`relative hidden lg:flex lg:items-center lg:justify-center ${resizing ? 'bg-cyan-400/10' : ''}`}
            onPointerDown={() => setResizing(true)}
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize chat and preview panels"
          >
            <div className="h-full w-px bg-white/10" />
            <div className="absolute flex flex-col items-center gap-3">
              <div className="rounded-full border border-cyan-300/25 bg-slate-950/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200 shadow-[0_10px_24px_rgba(6,182,212,0.16)]">
                Drag
              </div>
              <div className="h-28 w-3 cursor-col-resize rounded-full bg-white/30 transition hover:bg-cyan-400/75" />
            </div>
          </div>
          <PreviewPanel
            files={files}
            onFixWithAi={async (errorText) => {
              try {
                const payload = await fixPreviewWithAi(projectId, files, errorText);
                useBuilderStore.getState().applyAiResponse(payload);
                toast.success('Applied AI fix from preview error');
              } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Fix with AI failed');
              }
            }}
          />
        </section>
      </>
    </AppShell>
  );
}
