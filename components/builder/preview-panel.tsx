'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Sandpack, SandpackPreview, SandpackProvider, type SandpackFiles, type SandpackPreviewRef } from '@codesandbox/sandpack-react';
import { Check, Code2, Copy, ExternalLink, FileCode2, Files, FolderTree, MonitorSmartphone, PencilLine, Play, RotateCcw, Save, Search, Shuffle, Wand2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useBuilderStore } from '@/lib/store/builder-store';
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

const previewLinkShim = `import React from 'react';

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

function normalizeHref(href: string) {
  if (!href) return '/';
  return href.startsWith('/') ? href : \`/\${href.replace(/^#/, '')}\`;
}

export default function Link({ href, children, onClick, ...props }: LinkProps) {
  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if (href.startsWith('#')) return;
        event.preventDefault();
        window.location.hash = normalizeHref(href);
      }}
    >
      {children}
    </a>
  );
}
`;

const previewImageShim = `import React from 'react';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

export default function Image(props: ImageProps) {
  return <img {...props} />;
}
`;

const previewScriptShim = `import { useEffect } from 'react';

type ScriptProps = React.ScriptHTMLAttributes<HTMLScriptElement> & {
  strategy?: string;
};

export default function Script({ strategy, ...props }: ScriptProps) {
  useEffect(() => {
    const script = document.createElement('script');
    Object.entries(props).forEach(([key, value]) => {
      if (value == null || key === 'children') return;
      if (key === 'async') {
        script.async = Boolean(value);
        return;
      }
      script.setAttribute(key, String(value));
    });
    if (typeof props.children === 'string') {
      script.textContent = props.children;
    }
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [props]);

  return null;
}
`;

const previewNavigationShim = `function currentPreviewPath() {
  if (typeof window === 'undefined') return '/';
  const raw = window.location.hash.replace(/^#/, '') || '/';
  return raw.startsWith('/') ? raw : \`/\${raw}\`;
}

export function useRouter() {
  return {
    push: (href) => {
      if (typeof window !== 'undefined') {
        window.location.hash = String(href ?? '/');
      }
    },
    replace: (href) => {
      if (typeof window !== 'undefined') {
        window.location.hash = String(href ?? '/');
      }
    },
    back: () => {
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    },
    refresh: () => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  };
}

export function usePathname() {
  return currentPreviewPath();
}

export function useSearchParams() {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export function redirect(href) {
  if (typeof window !== 'undefined') {
    window.location.hash = String(href ?? '/');
  }
}
`;

const previewHeadShim = `import React from 'react';

export default function Head({ children }) {
  return <>{children}</>;
}
`;

const previewFontShim = `export function Inter() {
  return { className: '', variable: '' };
}

export function Geist() {
  return { className: '', variable: '' };
}

export function Geist_Mono() {
  return { className: '', variable: '' };
}

export default function createFont() {
  return { className: '', variable: '' };
}
`;

const previewCnShim = `export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
`;

const previewButtonShim = `import React from 'react';
import { cn } from '../../lib/utils/cn';

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium transition-all',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
`;

const previewGlassPanelShim = `import React from 'react';
import { cn } from '../../lib/utils/cn';

export function GlassPanel({ className, children }) {
  return (
    <section className={cn('glass noise-overlay rounded-3xl p-4', className)}>
      {children}
    </section>
  );
}
`;

const previewThemeToggleShim = `import React from 'react';

export function ThemeToggle() {
  return (
    <button
      type="button"
      className="glass inline-flex h-10 items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100"
      onClick={() => document.documentElement.classList.toggle('dark')}
    >
      Theme
    </button>
  );
}
`;

const PREVIEW_DEPENDENCIES = {
  '@radix-ui/react-dialog': '^1.1.4',
  '@radix-ui/react-tabs': '^1.1.2',
  '@radix-ui/react-toast': '^1.2.4',
  'class-variance-authority': '^0.7.1',
  clsx: '^2.1.1',
  firebase: '^11.1.0',
  'framer-motion': '^12.4.7',
  jszip: '^3.10.1',
  'lucide-react': '^0.468.0',
  react: '^18.2.0',
  'react-dom': '^18.2.0',
  sonner: '^1.7.1',
  'tailwind-merge': '^2.6.0',
  uuid: '^11.0.5',
  zod: '^3.24.1',
  zustand: '^5.0.2'
} as const;

function ensureRelativeImport(value: string) {
  return value.startsWith('.') ? value : `./${value}`;
}

function dirname(filePath: string) {
  const normalized = filePath.replace(/\/+/g, '/');
  const index = normalized.lastIndexOf('/');
  return index <= 0 ? '/' : normalized.slice(0, index);
}

function extension(filePath: string) {
  const lastSegment = filePath.split('/').pop() ?? '';
  const index = lastSegment.lastIndexOf('.');
  return index === -1 ? '' : lastSegment.slice(index);
}

function joinPath(...parts: string[]) {
  return parts
    .join('/')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '');
}

function relativePath(fromDir: string, toPath: string) {
  const fromParts = fromDir.split('/').filter(Boolean);
  const toParts = toPath.split('/').filter(Boolean);

  while (fromParts.length && toParts.length && fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }

  const up = fromParts.map(() => '..');
  return [...up, ...toParts].join('/');
}

function resolveAliasTarget(importPath: string, sourcePath: string, targetPath: string) {
  const relativeTarget = relativePath(dirname(sourcePath), targetPath);
  const withPrefix = ensureRelativeImport(relativeTarget);
  const sourceExt = extension(importPath);
  const targetExt = extension(targetPath);

  if (!sourceExt && targetExt && withPrefix.endsWith(targetExt)) {
    return withPrefix.slice(0, -targetExt.length);
  }

  return withPrefix;
}

function rewritePreviewImports(sourcePath: string, content: string, knownFiles: Set<string>) {
  const linkShimPath = resolveAliasTarget('lib/preview/next-link', sourcePath, '/lib/preview/next-link.tsx');
  const imageShimPath = resolveAliasTarget('lib/preview/next-image', sourcePath, '/lib/preview/next-image.tsx');
  const scriptShimPath = resolveAliasTarget('lib/preview/next-script', sourcePath, '/lib/preview/next-script.tsx');
  const navigationShimPath = resolveAliasTarget('lib/preview/next-navigation', sourcePath, '/lib/preview/next-navigation.ts');
  const headShimPath = resolveAliasTarget('lib/preview/next-head', sourcePath, '/lib/preview/next-head.tsx');
  const fontShimPath = resolveAliasTarget('lib/preview/next-font', sourcePath, '/lib/preview/next-font.ts');

  return content
    .replace(/import\s+type\s+\{[^}]+\}\s+from\s+['"]next['"];?\s*/g, '')
    .replace(/import\s+['"]@\/([^'"]+)['"]/g, (_match, importPath: string) => {
      const candidates = [
        importPath,
        `${importPath}.ts`,
        `${importPath}.tsx`,
        `${importPath}.js`,
        `${importPath}.jsx`,
        `${importPath}.css`,
        joinPath(importPath, 'index.ts'),
        joinPath(importPath, 'index.tsx'),
        joinPath(importPath, 'index.js'),
        joinPath(importPath, 'index.jsx')
      ];
      const target = candidates.find((candidate) => knownFiles.has(candidate));
      if (!target) {
        return `import '@/${importPath}'`;
      }
      return `import '${resolveAliasTarget(importPath, sourcePath, `/${target}`)}'`;
    })
    .replace(/from\s+['"]@\/([^'"]+)['"]/g, (_match, importPath: string) => {
      const candidates = [
        importPath,
        `${importPath}.ts`,
        `${importPath}.tsx`,
        `${importPath}.js`,
        `${importPath}.jsx`,
        `${importPath}.css`,
        joinPath(importPath, 'index.ts'),
        joinPath(importPath, 'index.tsx'),
        joinPath(importPath, 'index.js'),
        joinPath(importPath, 'index.jsx')
      ];
      const target = candidates.find((candidate) => knownFiles.has(candidate));
      if (!target) {
        return `from '@/${importPath}'`;
      }
      return `from '${resolveAliasTarget(importPath, sourcePath, `/${target}`)}'`;
    })
    .replace(/from\s+['"]next\/link['"]/g, `from '${linkShimPath}'`)
    .replace(/from\s+['"]next\/image['"]/g, `from '${imageShimPath}'`)
    .replace(/from\s+['"]next\/script['"]/g, `from '${scriptShimPath}'`)
    .replace(/from\s+['"]next\/navigation['"]/g, `from '${navigationShimPath}'`)
    .replace(/from\s+['"]next\/head['"]/g, `from '${headShimPath}'`)
    .replace(/from\s+['"]next\/font\/(?:google|local)['"]/g, `from '${fontShimPath}'`);
}

function sanitizePreviewCss(content: string) {
  return content
    .replace(/^\s*@tailwind[^\n]*$/gm, '')
    .replace(/@apply\s+border-slate-200\s+dark:border-slate-700;/g, 'border-color: rgba(148, 163, 184, 0.22);')
    .replace(/@apply\s+[^;]+;/g, '')
    .trim();
}

function sortFilePaths(files: FileTree) {
  return Object.keys(files).sort((a, b) => {
    const priority = (filePath: string) => {
      if (filePath === 'app/page.tsx') return 0;
      if (filePath === 'app/layout.tsx') return 1;
      if (filePath === 'app/globals.css') return 2;
      if (filePath.endsWith('.css')) return 3;
      if (filePath.endsWith('.tsx')) return 4;
      if (filePath.endsWith('.ts')) return 5;
      if (filePath.endsWith('.jsx')) return 6;
      if (filePath.endsWith('.js')) return 7;
      return 8;
    };

    return priority(a) - priority(b) || a.localeCompare(b);
  });
}

function detectPreviewIssues(files: FileTree) {
  const allContent = Object.values(files).join('\n');
  const usesTailwindDirectives = /@tailwind|@apply/.test(allContent);
  const usesUnsupportedNextFeatures = /from\s+['"]next\/(?:headers|server|cache)['"]/.test(allContent);
  const likelyTailwindClasses =
    /(className|class)\s*=\s*["'`][^"'`]*(?:\b(?:bg|text|px|py|mx|my|grid|flex|rounded|shadow|min-h|max-w|gap|items|justify)-)/.test(
      allContent
    );

  if (!usesUnsupportedNextFeatures && !usesTailwindDirectives && !likelyTailwindClasses) {
    return null;
  }

  return {
    title: 'Preview compatibility warning',
    message:
      'This version likely uses Tailwind utilities or server-only Next features that the live preview cannot style or run correctly yet.'
  };
}

function createPreviewAppCode(files: FileTree) {
  const routeEntries = Object.keys(files)
    .filter((filePath) => filePath.startsWith('app/') && filePath.endsWith('/page.tsx') && !filePath.includes('/api/') && !/\[[^/]+\]/.test(filePath))
    .map((filePath) => {
      const routePath =
        filePath === 'app/page.tsx'
          ? '/'
          : `/${filePath.replace(/^app\//, '').replace(/\/page\.tsx$/, '')}`;
      const importPath = `.${filePath === 'app/page.tsx' ? '/app/page' : `/${filePath.replace(/\.tsx$/, '')}`}`;
      const importName = `Route${Math.abs(
        filePath.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
      )}`;

      return { filePath, routePath, importPath, importName };
    })
    .sort((left, right) => left.routePath.localeCompare(right.routePath));

  const imports = routeEntries.map((entry) => `import ${entry.importName} from '${entry.importPath}';`).join('\n');
  const cases = routeEntries
    .map((entry) => `  '${entry.routePath}': ${entry.importName},`)
    .join('\n');

  return `import React from 'react';
${imports}

const routes = {
${cases}
};

function currentPath() {
  if (typeof window === 'undefined') return '/';
  const raw = window.location.hash.replace(/^#/, '') || '/';
  return raw.startsWith('/') ? raw : \`/\${raw}\`;
}

export default function App() {
  const [path, setPath] = React.useState(currentPath);

  React.useEffect(() => {
    const sync = () => setPath(currentPath());
    window.addEventListener('hashchange', sync);
    sync();
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const ActivePage = routes[path] ?? routes['/'];
  return <ActivePage />;
}
`;
}

function mapFilesForSandpack(files: FileTree): SandpackFiles {
  const knownFiles = new Set(Object.keys(files));
  const wrappedAppCode = createPreviewAppCode(files);

  const sandpackFiles: SandpackFiles = {
    '/index.tsx': {
      code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);
`
    },
    '/styles.css': {
      code: sanitizePreviewCss(files['app/globals.css'] ?? fallbackStyles) || fallbackStyles
    },
    '/App.tsx': {
      code: wrappedAppCode
    },
    '/lib/preview/next-link.tsx': {
      code: previewLinkShim
    },
    '/lib/preview/next-image.tsx': {
      code: previewImageShim
    },
    '/lib/preview/next-script.tsx': {
      code: previewScriptShim
    },
    '/lib/preview/next-navigation.ts': {
      code: previewNavigationShim
    },
    '/lib/preview/next-head.tsx': {
      code: previewHeadShim
    },
    '/lib/preview/next-font.ts': {
      code: previewFontShim
    },
    '/lib/utils/cn.ts': {
      code: previewCnShim
    },
    '/components/ui/button.tsx': {
      code: previewButtonShim
    },
    '/components/ui/glass-panel.tsx': {
      code: previewGlassPanelShim
    },
    '/components/ui/theme-toggle.tsx': {
      code: previewThemeToggleShim
    },
    '/app/globals.css': {
      code: sanitizePreviewCss(files['app/globals.css'] ?? fallbackStyles) || fallbackStyles
    },
    '/app/page.tsx': {
      code:
        rewritePreviewImports(
          '/app/page.tsx',
          files['app/page.tsx'] ??
            `export default function Page(){return <main style={{padding:24}}>No page generated yet.</main>;}`,
          knownFiles
        )
    }
  };

  for (const [filePath, content] of Object.entries(files)) {
    if (
      filePath === 'app/page.tsx' ||
      filePath === 'app/globals.css' ||
      filePath === 'app/layout.tsx' ||
      filePath === 'components/ui/button.tsx' ||
      filePath === 'components/ui/glass-panel.tsx' ||
      filePath === 'components/ui/theme-toggle.tsx' ||
      filePath === 'lib/utils/cn.ts'
    ) {
      continue;
    }
    sandpackFiles[`/${filePath}`] = { code: rewritePreviewImports(`/${filePath}`, content, knownFiles) };
  }

  return sandpackFiles;
}

function createPreviewFingerprint(files: FileTree) {
  return Object.entries(files)
    .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
    .map(([filePath, content]) => `${filePath}:${content.length}:${content.slice(0, 120)}`)
    .join('|');
}

export function PreviewPanel({
  files,
  onFixWithAi
}: {
  files: FileTree;
  onFixWithAi: (error: string) => void;
}) {
  const sandpackFiles = useMemo(() => mapFilesForSandpack(files), [files]);
  const previewFingerprint = useMemo(() => createPreviewFingerprint(files), [files]);
  const filePaths = useMemo(() => sortFilePaths(files), [files]);
  const previewIssue = useMemo(() => detectPreviewIssues(files), [files]);
  const [ideOpen, setIdeOpen] = useState(false);
  const [idePane, setIdePane] = useState<'explorer' | 'search' | 'preview'>('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [selectedFile, setSelectedFile] = useState('app/page.tsx');
  const [editorDraft, setEditorDraft] = useState('');
  const previewRef = useRef<SandpackPreviewRef | null>(null);
  const updateFileContent = useBuilderStore((state) => state.updateFileContent);

  useEffect(() => {
    if (!filePaths.length) {
      setSelectedFile('');
      return;
    }

    if (!filePaths.includes(selectedFile)) {
      setSelectedFile(filePaths[0]);
    }
  }, [filePaths, selectedFile]);

  useEffect(() => {
    setEditorDraft(selectedFile ? files[selectedFile] ?? '' : '');
  }, [files, selectedFile]);

  const previewFrameClassName =
    viewport === 'mobile'
      ? 'mx-auto w-full max-w-[390px]'
      : viewport === 'tablet'
        ? 'mx-auto w-full max-w-[820px]'
        : 'w-full';
  const cycleViewport = () => {
    setViewport((current) => (current === 'mobile' ? 'tablet' : current === 'tablet' ? 'desktop' : 'mobile'));
  };
  const filteredFilePaths = filePaths.filter((filePath) => filePath.toLowerCase().includes(searchQuery.toLowerCase()));
  const isEditorDirty = selectedFile ? editorDraft !== (files[selectedFile] ?? '') : false;

  const saveEditorDraft = () => {
    if (!selectedFile) {
      return;
    }

    updateFileContent(selectedFile, editorDraft);
    toast.success(`Updated ${selectedFile}`);
  };

  const openPreviewInNewTab = () => {
    const client = previewRef.current?.getClient();
    const iframe = client?.iframe;

    if (!iframe) {
      toast.error('Preview is not ready yet');
      return;
    }

    try {
      const nestedFrame = iframe.contentDocument?.querySelector('iframe');
      const nestedFrameUrl =
        nestedFrame?.getAttribute('src') ||
        nestedFrame?.contentWindow?.location?.href ||
        nestedFrame?.contentDocument?.location?.href;

      if (nestedFrameUrl && nestedFrameUrl !== 'about:blank') {
        window.open(nestedFrameUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    } catch {
      // Ignore nested iframe access issues and continue with other fallbacks.
    }

    try {
      const livePreviewUrl = iframe.contentWindow?.location?.href || iframe.contentDocument?.location?.href;
      if (livePreviewUrl && livePreviewUrl !== 'about:blank') {
        window.open(livePreviewUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    } catch {
      // Continue to markup snapshot fallback.
    }

    const iframeSrc = iframe.getAttribute('src') || iframe.getAttribute('data-src');
    if (iframeSrc && iframeSrc !== 'about:blank') {
      window.open(iframeSrc, '_blank', 'noopener,noreferrer');
      return;
    }

    const previewMarkup = iframe.contentDocument?.documentElement?.outerHTML;
    if (!previewMarkup) {
      toast.error('Could not open preview in a new tab');
      return;
    }

    const previewWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!previewWindow) {
      toast.error('Pop-up blocked while opening preview');
      return;
    }

    previewWindow.document.open();
    previewWindow.document.write(`<!doctype html>${previewMarkup}`);
    previewWindow.document.close();
  };

  return (
    <>
      <GlassPanel className="h-full min-w-0">
        <div className="flex h-full flex-col">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold">Live Preview</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Preview stays visual here. Code only appears in IDE mode.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="secondary" onClick={cycleViewport} title={`Viewport: ${viewport}`}>
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" onClick={openPreviewInNewTab} title="Open preview in new tab">
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={() => setIdeOpen(true)} title="Open IDE mode">
                <Code2 className="h-4 w-4" />
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

          <div className="flex-1 min-w-0 overflow-auto rounded-[28px] border border-white/15 bg-slate-950/30 p-3 [-webkit-overflow-scrolling:touch] sm:p-4">
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
                <SandpackProvider
                  key={previewFingerprint}
                  template="react-ts"
                  files={sandpackFiles}
                  customSetup={{
                    entry: '/index.tsx',
                    dependencies: PREVIEW_DEPENDENCIES
                  }}
                >
              <SandpackPreview
                    ref={previewRef}
                    className="h-[68vh] min-h-[560px] lg:h-[780px]"
                    showNavigator={false}
                    showRefreshButton
                    showOpenInCodeSandbox={false}
                    showOpenNewtab={false}
                    showRestartButton={false}
                    showSandpackErrorOverlay
                  />
                </SandpackProvider>
              </div>
            </div>
          </div>

          <Button className="mt-4 w-full" variant="secondary" onClick={() => onFixWithAi('Preview compile/runtime issue from sandbox')}>
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
                <span>CodeFreed IDE</span>
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
                      {filteredFilePaths.map((filePath) => (
                        <button
                          key={filePath}
                          className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                            filePath === selectedFile
                              ? 'bg-[#37373d] text-white'
                              : 'text-slate-300 hover:bg-[#2a2d2e] hover:text-white'
                          }`}
                          onClick={() => {
                            setSelectedFile(filePath);
                            setIdePane('explorer');
                          }}
                          type="button"
                        >
                          <FileCode2 className="h-4 w-4 shrink-0 text-sky-300" />
                          <span className="truncate">{filePath}</span>
                        </button>
                      ))}
                    </div>
                  ) : idePane === 'preview' ? (
                    <div className="rounded-xl border border-white/10 bg-[#1f1f1f] p-3 text-sm text-slate-300">
                      Open a live preview beside the editor while keeping the file tree available.
                    </div>
                  ) : (
                    filePaths.map((filePath) => (
                      <button
                        key={filePath}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                          filePath === selectedFile
                            ? 'bg-[#37373d] text-white'
                            : 'text-slate-300 hover:bg-[#2a2d2e] hover:text-white'
                        }`}
                        onClick={() => setSelectedFile(filePath)}
                        type="button"
                      >
                        <FileCode2 className="h-4 w-4 shrink-0 text-sky-300" />
                        <span className="truncate">{filePath}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="grid min-h-0 grid-rows-[auto_1fr_auto] bg-[#1e1e1e]">
                <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-4 py-2">
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <FileCode2 className="h-4 w-4 text-sky-300" />
                    <span>{selectedFile || 'No file selected'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedFile ? (
                      <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-400 md:inline-flex">
                        <PencilLine className="h-3.5 w-3.5" />
                        Editable
                      </div>
                    ) : null}
                    {selectedFile ? (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={!isEditorDirty}
                          onClick={() => setEditorDraft(files[selectedFile] ?? '')}
                        >
                          <RotateCcw className="mr-1 h-4 w-4" /> Revert
                        </Button>
                        <Button size="sm" onClick={saveEditorDraft} disabled={!isEditorDirty}>
                          {isEditorDirty ? <Save className="mr-1 h-4 w-4" /> : <Check className="mr-1 h-4 w-4" />}
                          {isEditorDirty ? 'Save' : 'Saved'}
                        </Button>
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
                      </>
                    ) : null}
                  </div>
                </div>

                <div className={`min-h-0 ${idePane === 'preview' ? 'grid gap-px bg-white/10 xl:grid-cols-[minmax(0,1fr)_420px]' : 'overflow-auto bg-[#1e1e1e]'}`}>
                  <div className="min-h-0 overflow-auto bg-[#1e1e1e]">
                    {selectedFile ? (
                      <textarea
                        value={editorDraft}
                        onChange={(event) => setEditorDraft(event.target.value)}
                        spellCheck={false}
                        className="min-h-full w-full resize-none border-0 bg-[#1e1e1e] p-5 font-mono text-[13px] leading-6 text-slate-100 outline-none"
                        onKeyDown={(event) => {
                          if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
                            event.preventDefault();
                            saveEditorDraft();
                          }
                        }}
                      />
                    ) : (
                      <pre className="min-h-full p-5 font-mono text-[13px] leading-6 text-slate-100">
                        <code>No file selected.</code>
                      </pre>
                    )}
                  </div>
                  {idePane === 'preview' ? (
                    <div className="min-h-0 overflow-hidden bg-[#11182b]">
                      <Sandpack
                        key={previewFingerprint}
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
                          entry: '/index.tsx',
                          dependencies: PREVIEW_DEPENDENCIES
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
