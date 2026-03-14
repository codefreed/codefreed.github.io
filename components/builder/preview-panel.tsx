'use client';

import { useEffect, useMemo, useState } from 'react';
import { Sandpack, type SandpackFiles } from '@codesandbox/sandpack-react';
import { Code2, Copy, Eye, FileCode2, Files, FolderTree, MonitorSmartphone, Play, Search, Wand2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';
import type { FileTree } from '@/types/project';

const fallbackStyles = `:root {
  color-scheme: dark;
  --bg: #07111f;
  --bg-accent: #0f1f38;
  --surface: rgba(10, 19, 35, 0.72);
  --border: rgba(148, 163, 184, 0.18);
  --text: #e5eefc;
  --muted: #9fb0ca;
  --brand: #7dd3fc;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  min-height: 100%;
  font-family: "Inter", "Segoe UI", sans-serif;
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.16), transparent 30%),
    radial-gradient(circle at top right, rgba(129, 140, 248, 0.14), transparent 26%),
    linear-gradient(180deg, var(--bg), var(--bg-accent));
  color: var(--text);
}

body {
  min-height: 100vh;
  padding: 24px;
}

main,
section,
article {
  display: block;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

a,
button {
  color: inherit;
  font: inherit;
}

.page-shell,
.hero,
.hero-card {
  width: min(960px, 100%);
  margin: 0 auto;
}

.hero-card,
.card,
[class*="card"] {
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 24px 60px rgba(2, 8, 23, 0.32);
}
`;

function sortFilePaths(files: FileTree) {
  return Object.keys(files).sort((a, b) => {
    const priority = (path: string) => {
      if (path === 'app/page.tsx') return 0;
      if (path === 'app/layout.tsx') return 1;
      if (path === 'app/globals.css') return 2;
      if (path.endsWith('.css')) return 3;
      if (path.endsWith('.tsx')) return 4;
      if (path.endsWith('.ts')) return 5;
      if (path.endsWith('.jsx')) return 6;
      if (path.endsWith('.js')) return 7;
      return 8;
    };

    return priority(a) - priority(b) || a.localeCompare(b);
  });
}

function detectPreviewIssues(files: FileTree) {
  const allContent = Object.values(files).join('\n');
  const usesNextImports = /from\s+['"]next\//.test(allContent);
  const usesTailwindDirectives = /@tailwind|@apply/.test(allContent);
  const usesPathAliases = /from\s+['"]@\//.test(allContent);
  const likelyTailwindClasses =
    /(className|class)\s*=\s*["'`][^"'`]*(?:\b(?:bg|text|px|py|mx|my|grid|flex|rounded|shadow|min-h|max-w|gap|items|justify)-)/.test(
      allContent
    );

  if (!usesNextImports && !usesTailwindDirectives && !usesPathAliases && !likelyTailwindClasses) {
    return null;
  }

  return {
    title: 'Preview compatibility warning',
    message:
      'This version likely uses Tailwind or Next-specific features that the live preview cannot style correctly yet.'
  };
}

function mapFilesForSandpack(files: FileTree): SandpackFiles {
  const sandpackFiles: SandpackFiles = {
    '/index.js': {
      code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);
`
    },
    '/styles.css': {
      code:
        files['app/globals.css'] ??
        fallbackStyles
    },
    '/App.tsx': {
      code: `import Page from './app/page';

export default function App(){
  return <Page />;
}
`
    },
    '/app/page.tsx': {
      code:
        files['app/page.tsx'] ??
        `export default function Page(){return <main style={{padding:24}}>No page generated yet.</main>;}`
    }
  };

  for (const [path, content] of Object.entries(files)) {
    if (path === 'app/page.tsx' || path === 'app/globals.css') continue;
    sandpackFiles[`/${path}`] = { code: content };
  }

  return sandpackFiles;
}

export function PreviewPanel({
  files,
  onFixWithAi
}: {
  files: FileTree;
  onFixWithAi: (error: string) => void;
}) {
  const sandpackFiles = useMemo(() => mapFilesForSandpack(files), [files]);
  const filePaths = useMemo(() => sortFilePaths(files), [files]);
  const previewIssue = useMemo(() => detectPreviewIssues(files), [files]);
  const [ideOpen, setIdeOpen] = useState(false);
  const [idePane, setIdePane] = useState<'explorer' | 'search' | 'preview'>('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [selectedFile, setSelectedFile] = useState('app/page.tsx');

  useEffect(() => {
    if (!filePaths.length) {
      setSelectedFile('');
      return;
    }

    if (!filePaths.includes(selectedFile)) {
      setSelectedFile(filePaths[0]);
    }
  }, [filePaths, selectedFile]);

  const previewFrameClassName =
    viewport === 'mobile'
      ? 'mx-auto w-full max-w-[390px]'
      : viewport === 'tablet'
        ? 'mx-auto w-full max-w-[820px]'
        : 'w-full';
  const filteredFilePaths = filePaths.filter((path) => path.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <GlassPanel className="h-full">
        <div className="flex h-full flex-col">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold">Live Preview</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Preview stays visual here. Code only appears in IDE mode.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Tabs value={viewport} onValueChange={(value) => setViewport(value as typeof viewport)}>
                <TabsList>
                  <TabsTrigger value="mobile">Mobile</TabsTrigger>
                  <TabsTrigger value="tablet">Tablet</TabsTrigger>
                  <TabsTrigger value="desktop">Desktop</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button size="sm" onClick={() => setIdeOpen(true)}>
                <Code2 className="mr-1 h-4 w-4" /> IDE Mode
              </Button>
            </div>
          </div>

          {previewIssue ? (
            <div className="mb-4 rounded-2xl border border-amber-300/30 bg-amber-500/10 p-3 text-sm text-amber-100">
              <div className="font-medium">{previewIssue.title}</div>
              <p className="mt-1 text-amber-50/85">{previewIssue.message}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    onFixWithAi(
                      'Convert the project to preview-safe React and real CSS. Replace Tailwind utility classes, Next-only imports, and @/ aliases with standard CSS files and relative imports while keeping the design intent.'
                    )
                  }
                >
                  <Wand2 className="mr-1 h-4 w-4" /> Make Preview Match
                </Button>
              </div>
            </div>
          ) : null}

          <div className="flex-1 overflow-auto rounded-[28px] border border-white/15 bg-slate-950/30 p-4">
            <div className={previewFrameClassName}>
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1020] shadow-[0_30px_80px_rgba(2,8,23,0.45)]">
                <div className="flex items-center justify-between border-b border-white/10 bg-[#11182b] px-4 py-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <MonitorSmartphone className="h-4 w-4" />
                    <span>Preview Canvas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="h-3.5 w-3.5" />
                    <span>{viewport === 'desktop' ? 'Desktop' : viewport === 'tablet' ? 'Tablet' : 'Mobile'}</span>
                  </div>
                </div>
                <Sandpack
                  template="react-ts"
                  files={sandpackFiles}
                  options={{
                    layout: 'preview',
                    showNavigator: false,
                    showTabs: false,
                    showRefreshButton: true,
                    editorHeight: 780
                  }}
                  customSetup={{
                    dependencies: {
                      react: '^18.2.0',
                      'react-dom': '^18.2.0'
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <Button
            className="mt-4 w-full"
            variant="secondary"
            onClick={() => onFixWithAi('Preview compile/runtime issue from sandbox')}
          >
            Fix with AI
          </Button>
        </div>
      </GlassPanel>

      {ideOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm">
          <div className="flex h-full flex-col p-3">
            <div className="mb-2 flex items-center justify-between rounded-t-2xl border border-white/10 bg-[#181d29] px-4 py-2 text-sm text-slate-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <span>CodedAI IDE</span>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setIdeOpen(false)}>
                <X className="mr-1 h-4 w-4" /> Close
              </Button>
            </div>

            <div className="grid h-[calc(100vh-5.75rem)] grid-cols-[52px_260px_minmax(0,1fr)] overflow-hidden rounded-b-2xl border border-white/10 bg-[#1e1e1e]">
              <div className="flex flex-col items-center gap-4 border-r border-white/10 bg-[#181818] py-4 text-slate-400">
                <button type="button" onClick={() => setIdePane('explorer')} className={idePane === 'explorer' ? 'text-cyan-300' : ''}>
                  <Files className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => setIdePane('search')} className={idePane === 'search' ? 'text-cyan-300' : ''}>
                  <Search className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => setIdePane('preview')} className={idePane === 'preview' ? 'text-cyan-300' : ''}>
                  <MonitorSmartphone className="h-5 w-5" />
                </button>
              </div>

              <div className="flex min-h-0 flex-col border-r border-white/10 bg-[#252526]">
                <div className="flex items-center gap-2 border-b border-white/10 px-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {idePane === 'search' ? <Search className="h-4 w-4" /> : idePane === 'preview' ? <MonitorSmartphone className="h-4 w-4" /> : <FolderTree className="h-4 w-4" />}
                  {idePane === 'search' ? 'Search' : idePane === 'preview' ? 'Preview' : 'Explorer'}
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
                  {idePane === 'search' ? (
                    <div className="space-y-3">
                      <input
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search files..."
                        className="w-full rounded-md border border-white/10 bg-[#1f1f1f] px-3 py-2 text-sm text-white outline-none"
                      />
                      {filteredFilePaths.map((path) => (
                        <button
                          key={path}
                          className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                            path === selectedFile
                              ? 'bg-[#37373d] text-white'
                              : 'text-slate-300 hover:bg-[#2a2d2e] hover:text-white'
                          }`}
                          onClick={() => {
                            setSelectedFile(path);
                            setIdePane('explorer');
                          }}
                          type="button"
                        >
                          <FileCode2 className="h-4 w-4 shrink-0 text-sky-300" />
                          <span className="truncate">{path}</span>
                        </button>
                      ))}
                    </div>
                  ) : idePane === 'preview' ? (
                    <div className="rounded-xl border border-white/10 bg-[#1f1f1f] p-3 text-sm text-slate-300">
                      Open a live preview beside the editor while keeping the file tree available.
                    </div>
                  ) : (
                    filePaths.map((path) => (
                      <button
                        key={path}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                          path === selectedFile
                            ? 'bg-[#37373d] text-white'
                            : 'text-slate-300 hover:bg-[#2a2d2e] hover:text-white'
                        }`}
                        onClick={() => setSelectedFile(path)}
                        type="button"
                      >
                        <FileCode2 className="h-4 w-4 shrink-0 text-sky-300" />
                        <span className="truncate">{path}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div
                className={`grid min-h-0 bg-[#1e1e1e] ${idePane === 'preview' ? 'grid-rows-[auto_1fr_auto]' : 'grid-rows-[auto_1fr_auto]'}`}
              >
                <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-4 py-2">
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <FileCode2 className="h-4 w-4 text-sky-300" />
                    <span>{selectedFile || 'No file selected'}</span>
                  </div>
                  {selectedFile ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(files[selectedFile] ?? '');
                          toast.success(`Copied ${selectedFile}`);
                        } catch {
                          toast.error('Could not copy file');
                        }
                      }}
                    >
                      <Copy className="mr-1 h-4 w-4" /> Copy
                    </Button>
                  ) : null}
                </div>

                <div className={`min-h-0 ${idePane === 'preview' ? 'grid gap-px bg-white/10 xl:grid-cols-[minmax(0,1fr)_420px]' : 'overflow-auto bg-[#1e1e1e]'}`}>
                  <div className="min-h-0 overflow-auto bg-[#1e1e1e]">
                    <pre className="min-h-full p-5 font-mono text-[13px] leading-6 text-slate-100">
                      <code>{selectedFile ? files[selectedFile] : 'No file selected.'}</code>
                    </pre>
                  </div>
                  {idePane === 'preview' ? (
                    <div className="min-h-0 overflow-hidden bg-[#11182b]">
                      <Sandpack
                        template="react-ts"
                        files={sandpackFiles}
                        options={{
                          layout: 'preview',
                          showNavigator: false,
                          showTabs: false,
                          showRefreshButton: true,
                          editorHeight: 900
                        }}
                        customSetup={{
                          dependencies: {
                            react: '^18.2.0',
                            'react-dom': '^18.2.0'
                          }
                        }}
                      />
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center justify-between bg-[#007acc] px-4 py-1.5 text-xs text-white">
                  <span>IDE Mode</span>
                  <span>{selectedFile || 'No file selected'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
