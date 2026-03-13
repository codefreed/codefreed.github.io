import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { enableIndexedDbPersistence, getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const envConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export type FirebaseRuntimeConfig = FirebaseOptions;
const RUNTIME_CONFIG_KEY = 'codedai-firebase-runtime-config';
type FirebaseAuthClient = ReturnType<typeof createAuthClient>;
type FirebaseFullClient = ReturnType<typeof createFullClient>;

let cachedAuthClient: FirebaseAuthClient | null | undefined;
let cachedFullClient: FirebaseFullClient | null | undefined;

const hasFullConfig = Object.values(envConfig).every(Boolean);

function resolveConfig(configOverride?: FirebaseRuntimeConfig) {
  const config = configOverride ?? envConfig;
  if (!Object.values(config).every(Boolean)) {
    return null;
  }

  return config;
}

function createAuthClient(config: FirebaseOptions) {
  const app = getApps().length ? getApp() : initializeApp(config);
  const auth = getAuth(app);

  return { app, auth };
}

function createFullClient(config: FirebaseOptions) {
  const authClient = createAuthClient(config);
  let db;
  try {
    db = initializeFirestore(authClient.app, {
      experimentalAutoDetectLongPolling: true
    });
  } catch {
    db = getFirestore(authClient.app);
  }
  const storage = getStorage(authClient.app);

  return { ...authClient, db, storage };
}

export function getFirebaseAuthClient(configOverride?: FirebaseRuntimeConfig) {
  const config = resolveConfig(configOverride);
  if (!config) {
    return null;
  }

  if (!configOverride && cachedAuthClient !== undefined) {
    return cachedAuthClient;
  }

  const client = createAuthClient(config);

  if (!configOverride) {
    cachedAuthClient = client;
  }

  return client;
}

export function getFirebaseClient(configOverride?: FirebaseRuntimeConfig) {
  const config = resolveConfig(configOverride);
  if (!config) {
    return null;
  }

  if (!configOverride && cachedFullClient !== undefined) {
    return cachedFullClient;
  }

  const client = createFullClient(config);

  if (!configOverride) {
    cachedAuthClient = { app: client.app, auth: client.auth };
    cachedFullClient = client;
  }

  return client;
}

export async function enablePersistenceSafe() {
  const client = getFirebaseClient();
  if (!client) return false;

  try {
    await enableIndexedDbPersistence(client.db);
    return true;
  } catch {
    return false;
  }
}

export function firebaseEnvConfigured() {
  return hasFullConfig;
}

export function getFirebaseRuntimeConfig(): FirebaseRuntimeConfig | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(RUNTIME_CONFIG_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as FirebaseRuntimeConfig;
  } catch {
    return null;
  }
}

export function setFirebaseRuntimeConfig(config: FirebaseRuntimeConfig) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(RUNTIME_CONFIG_KEY, JSON.stringify(config));
}
