'use client';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type Firestore,
  writeBatch
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { getFirebaseClient } from '@/lib/firebase/client';
import type { ChatMessage, FileTree, Project, VersionSnapshot } from '@/types/project';

export interface ProjectBundle {
  project: Project;
  files: FileTree;
  versions: VersionSnapshot[];
  messages: ChatMessage[];
}

const LS_KEY = 'codedai-projects';
const LOCAL_PROJECT_ID = 'local-project';
const FIRESTORE_TIMEOUT_MS = 45_000;
const WRITE_BATCH_LIMIT = 400;

function withFirestoreTimeout<T>(promise: Promise<T>, label: string, timeoutMs = FIRESTORE_TIMEOUT_MS) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return Promise.race([
    promise.finally(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }),
    new Promise<T>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`${label} timed out after ${Math.round(timeoutMs / 1000)}s. Check Firebase rules and your connection, then try again.`));
      }, timeoutMs);
    })
  ]);
}

async function commitWriteOperations(
  db: Firestore,
  operations: Array<(batch: ReturnType<typeof writeBatch>) => void>,
  label: string
) {
  if (!operations.length) {
    return;
  }

  const totalBatches = Math.ceil(operations.length / WRITE_BATCH_LIMIT);

  for (let index = 0; index < operations.length; index += WRITE_BATCH_LIMIT) {
    const batch = writeBatch(db);
    const slice = operations.slice(index, index + WRITE_BATCH_LIMIT);

    for (const operation of slice) {
      operation(batch);
    }

    const batchNumber = Math.floor(index / WRITE_BATCH_LIMIT) + 1;
    const suffix = totalBatches > 1 ? ` (${batchNumber}/${totalBatches})` : '';
    await withFirestoreTimeout(batch.commit(), `${label}${suffix}`);
  }
}

function toMillis(value: unknown, fallback = Date.now()) {
  if (typeof value === 'number') {
    return value;
  }

  if (value && typeof value === 'object' && 'toMillis' in value && typeof value.toMillis === 'function') {
    return value.toMillis();
  }

  return fallback;
}

function normalizeProjectName(name: string) {
  const trimmed = name.trim();
  return trimmed || 'Untitled Project';
}

function upsertLocalBundle(bundle: ProjectBundle) {
  const items = readLocalStore();
  const index = items.findIndex((item) => item.project.id === bundle.project.id);

  if (index >= 0) {
    items[index] = bundle;
  } else {
    items.unshift(bundle);
  }

  writeLocalStore(items);
}

function readLocalStore(): ProjectBundle[] {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ProjectBundle[];
  } catch {
    return [];
  }
}

function writeLocalStore(items: ProjectBundle[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export async function createProject(ownerId: string, name: string, initialFiles: FileTree): Promise<ProjectBundle> {
  const now = Date.now();
  const base: Project = {
    id: uuid(),
    ownerId,
    name: normalizeProjectName(name),
    createdAt: now,
    updatedAt: now,
    currentVersionId: 'init'
  };

  const initialVersion: VersionSnapshot = {
    id: 'init',
    createdAt: now,
    commitMessage: 'Initial scaffold',
    files: initialFiles
  };

  const bundle: ProjectBundle = {
    project: base,
    files: initialFiles,
    versions: [initialVersion],
    messages: []
  };

  const client = getFirebaseClient();
  if (client) {
    try {
      await withFirestoreTimeout(
        setDoc(doc(client.db, 'projects', base.id), {
          ownerId,
          name: base.name,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          currentVersionId: 'init'
        }),
        'Creating Firebase project'
      );

      await commitWriteOperations(
        client.db,
        [
          (batch) =>
            batch.set(doc(client.db, 'projects', base.id, 'versions', 'init'), {
              createdAt: serverTimestamp(),
              commitMessage: 'Initial scaffold',
              files: initialFiles
            })
        ],
        'Saving initial project version'
      );
    } catch {
      // Fall back to local-only persistence.
    }
  }

  upsertLocalBundle(bundle);
  return bundle;
}

export async function saveProjectBundle(params: {
  ownerId: string;
  projectId: string;
  name: string;
  files: FileTree;
  versions: VersionSnapshot[];
  messages: ChatMessage[];
}) {
  const client = getFirebaseClient();
  const now = Date.now();
  const creatingProject = params.projectId === LOCAL_PROJECT_ID;
  const projectId = creatingProject ? uuid() : params.projectId;
  const projectName = normalizeProjectName(params.name);
  const fallbackVersion: VersionSnapshot = {
    id: 'init',
    createdAt: now,
    commitMessage: 'Initial scaffold',
    files: params.files
  };
  const versions = params.versions.length ? params.versions : [fallbackVersion];
  const currentVersion = versions[versions.length - 1];

  const bundle: ProjectBundle = {
    project: {
      id: projectId,
      ownerId: params.ownerId,
      name: projectName,
      createdAt: versions[0]?.createdAt ?? now,
      updatedAt: now,
      currentVersionId: currentVersion?.id
    },
    files: params.files,
    versions,
    messages: [...params.messages].sort((a, b) => a.createdAt - b.createdAt)
  };

  if (client) {
    const projectDocRef = doc(client.db, 'projects', projectId);
    try {
      if (creatingProject) {
        await withFirestoreTimeout(
          setDoc(
            projectDocRef,
            {
              ownerId: params.ownerId,
              name: projectName,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              currentVersionId: currentVersion?.id ?? null
            },
            { merge: true }
          ),
          'Creating Firebase project'
        );
      }

      const operations: Array<(batch: ReturnType<typeof writeBatch>) => void> = [];

      if (!creatingProject) {
        operations.push((batch) =>
          batch.set(
            projectDocRef,
            {
              ownerId: params.ownerId,
              name: projectName,
              updatedAt: serverTimestamp(),
              currentVersionId: currentVersion?.id ?? null
            },
            { merge: true }
          )
        );
      }

      for (const version of bundle.versions) {
        operations.push((batch) =>
          batch.set(doc(client.db, 'projects', projectId, 'versions', version.id), {
            createdAt: version.createdAt,
            commitMessage: version.commitMessage,
            files: version.files
          })
        );
      }

      for (const message of bundle.messages) {
        operations.push((batch) =>
          batch.set(doc(client.db, 'projects', projectId, 'chats', 'main', 'messages', message.id), {
            role: message.role,
            content: message.content,
            createdAt: message.createdAt,
            versionIdApplied: message.versionIdApplied ?? null,
            diffSummary: message.diffSummary ?? []
          })
        );
      }

      await commitWriteOperations(client.db, operations, 'Saving project to Firebase');
    } catch {
      // Match the rest of the project persistence flow: keep working locally
      // when Firestore is slow or temporarily unavailable.
    }
  }

  upsertLocalBundle(bundle);
  return bundle;
}

export async function listProjects(ownerId: string): Promise<Project[]> {
  const local = readLocalStore().map((item) => item.project).filter((project) => project.ownerId === ownerId);

  const client = getFirebaseClient();
  if (!client) {
    return local;
  }

  try {
    const projectsRef = collection(client.db, 'projects');
    const q = query(projectsRef, orderBy('updatedAt', 'desc'), limit(20));
    const snap = await getDocs(q);

    const remote = snap.docs
      .map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Record<string, unknown>) }))
      .map((project) => project as Record<string, unknown>)
      .filter((project) => project.ownerId === ownerId)
      .map(
        (project) =>
          ({
            id: String(project.id),
            ownerId: String(project.ownerId),
            name: String(project.name ?? 'Untitled'),
            createdAt: toMillis(project.createdAt),
            updatedAt: toMillis(project.updatedAt),
            currentVersionId: String(project.currentVersionId ?? '')
          }) satisfies Project
      );

    return remote.length ? remote : local;
  } catch {
    return local;
  }
}

export async function loadProject(projectId: string): Promise<ProjectBundle | null> {
  const local = readLocalStore().find((item) => item.project.id === projectId);

  const client = getFirebaseClient();
  if (!client) {
    return local ?? null;
  }

  try {
    const projectRef = doc(client.db, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      return local ?? null;
    }

    const versionsSnap = await getDocs(collection(client.db, 'projects', projectId, 'versions'));
    const messagesSnap = await getDocs(collection(client.db, 'projects', projectId, 'chats', 'main', 'messages'));

    const versions = versionsSnap.docs
      .map((v) => ({ id: v.id, ...(v.data() as Record<string, unknown>) }))
      .map((item) => item as Record<string, unknown>)
      .map(
        (item) =>
          ({
            id: String(item.id),
            createdAt: toMillis(item.createdAt),
            commitMessage: String(item.commitMessage ?? 'Update files'),
            files: (item.files as FileTree) ?? {}
          }) satisfies VersionSnapshot
      )
      .sort((a, b) => a.createdAt - b.createdAt);

    const latest = versions[versions.length - 1];

    const messages = messagesSnap.docs.map((message) => {
      const data = message.data();
      return {
        id: message.id,
        role: data.role,
        content: data.content,
        createdAt: toMillis(data.createdAt),
        versionIdApplied: data.versionIdApplied,
        diffSummary: data.diffSummary
      } as ChatMessage;
    }).sort((a, b) => a.createdAt - b.createdAt);

    return {
      project: {
        id: projectSnap.id,
        ownerId: projectSnap.data().ownerId,
        name: projectSnap.data().name,
        createdAt: toMillis(projectSnap.data().createdAt),
        updatedAt: toMillis(projectSnap.data().updatedAt),
        currentVersionId: projectSnap.data().currentVersionId
      },
      files: latest?.files ?? local?.files ?? {},
      versions: versions.length ? versions : local?.versions ?? [],
      messages: messages.length ? messages : local?.messages ?? []
    };
  } catch {
    return local ?? null;
  }
}

export async function saveVersion(projectId: string, commitMessage: string, files: FileTree, message?: ChatMessage) {
  const versionId = uuid();
  const version: VersionSnapshot = {
    id: versionId,
    createdAt: Date.now(),
    commitMessage,
    files
  };

  const client = getFirebaseClient();
  if (client && projectId !== LOCAL_PROJECT_ID) {
    try {
      const batch = writeBatch(client.db);
      batch.set(doc(client.db, 'projects', projectId, 'versions', versionId), {
        createdAt: serverTimestamp(),
        commitMessage,
        files
      });
      batch.update(doc(client.db, 'projects', projectId), {
        currentVersionId: versionId,
        updatedAt: serverTimestamp()
      });

      if (message) {
        batch.set(doc(client.db, 'projects', projectId, 'chats', 'main', 'messages', message.id), {
          role: message.role,
          content: message.content,
          createdAt: serverTimestamp(),
          versionIdApplied: message.versionIdApplied,
          diffSummary: message.diffSummary ?? []
        });
      }

      await withFirestoreTimeout(batch.commit(), 'Syncing project changes');
    } catch {
      // Keep local save path working if Firestore is unavailable.
    }
  }

  const items = readLocalStore();
  const index = items.findIndex((item) => item.project.id === projectId);

  if (index >= 0) {
    items[index].versions.push(version);
    items[index].files = files;
    if (message) {
      items[index].messages.push(message);
    }
    items[index].project.updatedAt = Date.now();
    items[index].project.currentVersionId = versionId;
  }

  writeLocalStore(items);
  return versionId;
}

export async function saveChatMessage(projectId: string, message: ChatMessage) {
  const client = getFirebaseClient();
  if (client && projectId !== LOCAL_PROJECT_ID) {
    try {
      await withFirestoreTimeout(
        setDoc(doc(client.db, 'projects', projectId, 'chats', 'main', 'messages', message.id), {
          role: message.role,
          content: message.content,
          createdAt: serverTimestamp()
        }),
        'Syncing chat message'
      );
    } catch {
      // Keep local message history as fallback.
    }
  }

  const items = readLocalStore();
  const index = items.findIndex((item) => item.project.id === projectId);
  if (index >= 0) {
    items[index].messages.push(message);
  }
  writeLocalStore(items);
}

export async function saveFirebaseWebConfig(ownerId: string | null, config: Record<string, string>) {
  const client = getFirebaseClient();
  localStorage.setItem('codedai-firebase-config', JSON.stringify(config));

  if (client && ownerId) {
    try {
      await setDoc(doc(client.db, 'users', ownerId, 'settings', 'firebase'), {
        config,
        savedAt: serverTimestamp()
      });
    } catch {
      // Local copy already saved above.
    }
  }
}

export function getSavedFirebaseWebConfig() {
  try {
    const raw = localStorage.getItem('codedai-firebase-config');
    return raw ? (JSON.parse(raw) as Record<string, string>) : null;
  } catch {
    return null;
  }
}
