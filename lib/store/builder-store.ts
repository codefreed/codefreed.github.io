'use client';

import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { type ChatMessage, type FileTree, type VersionSnapshot } from '@/types/project';
import type { AiModel, AiResponsePayload } from '@/lib/ai/schema';

interface BuilderState {
  projectId: string;
  projectName: string;
  selectedModel: AiModel;
  files: FileTree;
  versions: VersionSnapshot[];
  messages: ChatMessage[];
  isSaving: boolean;
  lastSavedAt?: number;
  setProjectName: (name: string) => void;
  setSelectedModel: (model: AiModel) => void;
  replaceProjectContents: (params: {
    projectName?: string;
    files: FileTree;
  }) => void;
  loadProject: (params: {
    projectId: string;
    projectName: string;
    files: FileTree;
    versions: VersionSnapshot[];
    messages: ChatMessage[];
  }) => void;
  setSaving: (state: boolean) => void;
  markSaved: () => void;
  addUserMessage: (content: string) => string;
  applyAiResponse: (payload: AiResponsePayload) => { versionId: string; diffSummary: string[] };
  rollbackVersion: (versionId: string) => void;
  resetProject: () => void;
}

const starterFiles: FileTree = {
  'app/layout.tsx': `import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
  'app/globals.css': `:root {
  color-scheme: dark;
  --bg: #07111f;
  --bg-accent: #0f1f38;
  --surface: rgba(10, 19, 35, 0.72);
  --surface-strong: rgba(15, 27, 49, 0.88);
  --border: rgba(148, 163, 184, 0.18);
  --text: #e5eefc;
  --muted: #9fb0ca;
  --brand: #7dd3fc;
  --brand-strong: #38bdf8;
  --glow: rgba(56, 189, 248, 0.32);
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
    radial-gradient(circle at top right, rgba(129, 140, 248, 0.16), transparent 26%),
    linear-gradient(180deg, var(--bg), var(--bg-accent));
  color: var(--text);
}

body {
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

.page-shell {
  min-height: 100vh;
  padding: 56px 20px;
}

.hero-card {
  width: min(960px, 100%);
  margin: 0 auto;
  padding: 48px;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(15, 27, 49, 0.92), rgba(8, 15, 28, 0.9));
  border: 1px solid var(--border);
  box-shadow: 0 30px 80px rgba(2, 8, 23, 0.45);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(125, 211, 252, 0.12);
  color: var(--brand);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-title {
  margin: 20px 0 16px;
  font-size: clamp(2.8rem, 7vw, 5.8rem);
  line-height: 0.94;
  letter-spacing: -0.05em;
}

.hero-copy {
  max-width: 640px;
  margin: 0;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
}

.primary-button {
  background: linear-gradient(135deg, var(--brand), var(--brand-strong));
  color: #03111f;
  box-shadow: 0 14px 40px var(--glow);
}

.secondary-button {
  background: rgba(148, 163, 184, 0.08);
  border-color: var(--border);
  color: var(--text);
}

.primary-button:hover,
.secondary-button:hover {
  transform: translateY(-1px);
}

.feature-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 36px;
}

.feature-card {
  padding: 20px;
  border-radius: 22px;
  background: var(--surface);
  border: 1px solid var(--border);
}

.feature-card h2 {
  margin: 0 0 8px;
  font-size: 1rem;
}

.feature-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

@media (max-width: 720px) {
  .hero-card {
    padding: 28px 22px;
  }
}
`,
  'app/page.tsx': `export default function Page() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="eyebrow">CodedAI starter</div>
        <h1 className="hero-title">Start chatting and shape the site from here.</h1>
        <p className="hero-copy">
          Describe the business, the vibe, and what the page should do. The builder can expand this into a fuller
          layout with real styling and supporting files.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#build">
            Generate the site
          </a>
          <a className="secondary-button" href="#ideas">
            Explore ideas
          </a>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <h2>Polished foundation</h2>
            <p>The preview now starts with real CSS so new projects do not look raw and unfinished.</p>
          </article>
          <article className="feature-card">
            <h2>Versioned changes</h2>
            <p>Each AI pass can add or revise files while keeping a history of what changed.</p>
          </article>
          <article className="feature-card">
            <h2>Faster iteration</h2>
            <p>Use the chat to restyle, restructure, or refine the experience without hand-editing everything.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
`
};

function applyFileOps(files: FileTree, ops: AiResponsePayload['file_ops']) {
  const next = { ...files };
  const diffSummary: string[] = [];

  for (const op of ops) {
    if (op.type === 'delete') {
      delete next[op.path];
      diffSummary.push(`Deleted ${op.path}`);
      continue;
    }

    const existed = Object.prototype.hasOwnProperty.call(next, op.path);
    next[op.path] = op.content ?? '';
    diffSummary.push(`${existed ? 'Updated' : 'Created'} ${op.path}`);
  }

  return { next, diffSummary };
}

const initialVersion: VersionSnapshot = {
  id: 'init',
  createdAt: Date.now(),
  commitMessage: 'Initial scaffold',
  files: starterFiles
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  projectId: 'local-project',
  projectName: 'Untitled Project',
  selectedModel: 'gpt-4.1',
  files: starterFiles,
  versions: [initialVersion],
  messages: [],
  isSaving: false,
  setProjectName: (name) => set({ projectName: name }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  replaceProjectContents: ({ projectName, files }) => {
    const version: VersionSnapshot = {
      id: uuid(),
      createdAt: Date.now(),
      commitMessage: 'Imported project',
      files
    };

    set((state) => ({
      projectName: projectName ?? state.projectName,
      files,
      versions: [version],
      messages: [],
      lastSavedAt: undefined
    }));
  },
  loadProject: ({ projectId, projectName, files, versions, messages }) => {
    set({ projectId, projectName, files, versions, messages });
  },
  setSaving: (state) => set({ isSaving: state }),
  markSaved: () => set({ lastSavedAt: Date.now() }),
  addUserMessage: (content) => {
    const id = uuid();
    const message: ChatMessage = { id, role: 'user', content, createdAt: Date.now() };
    set((state) => ({ messages: [...state.messages, message] }));
    return id;
  },
  applyAiResponse: (payload) => {
    const state = get();
    const { next, diffSummary } = applyFileOps(state.files, payload.file_ops);
    const versionId = uuid();
    const version: VersionSnapshot = {
      id: versionId,
      createdAt: Date.now(),
      commitMessage: payload.commit_message,
      files: next
    };

    const assistant: ChatMessage = {
      id: uuid(),
      role: 'assistant',
      content: payload.assistant_message,
      createdAt: Date.now(),
      versionIdApplied: versionId,
      diffSummary
    };

    set({ files: next, versions: [...state.versions, version], messages: [...state.messages, assistant] });

    return { versionId, diffSummary };
  },
  rollbackVersion: (versionId) => {
    const version = get().versions.find((item) => item.id === versionId);
    if (!version) return;
    set({ files: version.files });
  },
  resetProject: () => {
    set({
      projectId: 'local-project',
      projectName: 'Untitled Project',
      selectedModel: 'gpt-4.1',
      files: starterFiles,
      versions: [{ ...initialVersion, createdAt: Date.now() }],
      messages: [],
      isSaving: false,
      lastSavedAt: undefined
    });
  }
}));
