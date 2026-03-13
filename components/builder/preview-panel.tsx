'use client';

import { useEffect, useMemo, useState } from 'react';
import { Sandpack, type SandpackFiles } from '@codesandbox/sandpack-react';
import { Code2, Copy, Eye, Files, Wand2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [panelView, setPanelView] = useState('preview');
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

  return (
    <>
      <GlassPanel className="h-full">
        <Tabs value={panelView} onValueChange={setPanelView} className="flex h-full flex-col">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-medium">Live Preview</h3>
            <div className="flex flex-wrap items-center gap-2">
              <TabsList>
                <TabsTrigger value="preview">
                  <Eye className="mr-1 h-4 w-4" /> Preview
                </TabsTrigger>
                <TabsTrigger value="files">
                  <Files className="mr-1 h-4 w-4" /> Files
                </TabsTrigger>
              </TabsList>
              {panelView === 'preview' ? (
                <Tabs value={viewport} onValueChange={(value) => setViewport(value as typeof viewport)}>
                  <TabsList>
                    <TabsTrigger value="mobile">Mobile</TabsTrigger>
                    <TabsTrigger value="tablet">Tablet</TabsTrigger>
                    <TabsTrigger value="desktop">Desktop</TabsTrigger>
                  </TabsList>
                </Tabs>
              ) : null}
              <Button size="sm" onClick={() => setIdeOpen(true)}>
                <Code2 className="mr-1 h-4 w-4" /> Open IDE
              </Button>
            </div>
          </div>

          <TabsContent value="preview" className="mt-0 flex min-h-0 flex-1 flex-col">
            {previewIssue ? (
              <div className="mb-3 rounded-2xl border border-amber-300/30 bg-amber-500/10 p-3 text-sm text-amber-100">
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

            <div className="flex-1 overflow-auto rounded-2xl border border-white/20 bg-slate-950/20 p-3">
              <div className={previewFrameClassName}>
                <div className="overflow-hidden rounded-2xl border border-white/15">
                  <Sandpack
                    template="react-ts"
                    files={sandpackFiles}
                    options={{
                      layout: 'preview',
                      showNavigator: false,
                      showTabs: false,
                      showRefreshButton: true,
                      editorHeight: 620
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
              className="mt-3 w-full"
              variant="secondary"
              onClick={() => onFixWithAi('Preview compile/runtime issue from sandbox')}
            >
              Fix with AI
            </Button>
          </TabsContent>

          <TabsContent value="files" className="mt-0 min-h-0 flex-1">
            <div className="grid h-full min-h-0 gap-3 lg:grid-cols-[240px_1fr]">
              <div className="overflow-y-auto rounded-2xl border border-white/20 bg-white/5 p-2">
                {filePaths.map((path) => (
                  <button
                    key={path}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                      path === selectedFile
                        ? 'bg-white/20 text-white'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                    onClick={() => setSelectedFile(path)}
                    type="button"
                  >
                    {path}
                  </button>
                ))}
              </div>

              <div className="min-h-0 overflow-hidden rounded-2xl border border-white/20 bg-slate-950/40">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="truncate text-sm font-medium text-white">{selectedFile || 'No files yet'}</div>
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
                <pre className="h-[620px] overflow-auto p-4 text-xs leading-6 text-slate-100">
                  <code>{selectedFile ? files[selectedFile] : 'No file selected.'}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </GlassPanel>

      {ideOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm">
          <div className="flex h-full flex-col p-4">
            <div className="glass mb-3 flex items-center justify-between rounded-2xl p-3">
              <div className="text-sm font-medium text-white">CodedAI IDE</div>
              <Button variant="secondary" size="sm" onClick={() => setIdeOpen(false)}>
                <X className="mr-1 h-4 w-4" /> Close
              </Button>
            </div>

            <div className="glass h-[calc(100vh-6.5rem)] overflow-hidden rounded-2xl">
              <Sandpack
                template="react-ts"
                files={sandpackFiles}
                options={{
                  showNavigator: true,
                  showTabs: true,
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
          </div>
        </div>
      ) : null}
    </>
  );
}
