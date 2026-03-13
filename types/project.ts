export type FileTree = Record<string, string>;

export interface Project {
  id: string;
  ownerId: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  currentVersionId?: string;
}

export interface VersionSnapshot {
  id: string;
  createdAt: number;
  commitMessage: string;
  files: FileTree;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
  versionIdApplied?: string;
  diffSummary?: string[];
}
