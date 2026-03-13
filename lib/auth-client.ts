'use client';

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getFirebaseAuthClient, getFirebaseClient } from '@/lib/firebase/client';
import { IS_STATIC_EXPORT } from '@/lib/runtime';

const googleProvider = new GoogleAuthProvider();

export function authAvailable() {
  return !!getFirebaseAuthClient();
}

async function syncUserDoc(user: User) {
  const client = getFirebaseClient();
  if (!client) return;

  try {
    const userRef = doc(client.db, 'users', user.uid);
    const existing = await getDoc(userRef);

    if (!existing.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName ?? '',
        email: user.email ?? '',
        createdAt: serverTimestamp()
      });
    }
  } catch {
    // Do not block auth if Firestore is offline/unavailable.
  }
}

async function setSessionCookie(user: User) {
  if (IS_STATIC_EXPORT) return;
  const idToken = await user.getIdToken();
  await fetch('/api/auth/session', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken })
  });
}

function queuePostSignInSetup(user: User) {
  void Promise.allSettled([syncUserDoc(user), setSessionCookie(user)]);
}

export async function loginWithEmail(email: string, password: string) {
  const client = getFirebaseAuthClient();
  if (!client) throw new Error('Firebase is not configured.');
  const cred = await signInWithEmailAndPassword(client.auth, email, password);
  queuePostSignInSetup(cred.user);
  return cred.user;
}

export async function registerWithEmail(email: string, password: string) {
  const client = getFirebaseAuthClient();
  if (!client) throw new Error('Firebase is not configured.');
  const cred = await createUserWithEmailAndPassword(client.auth, email, password);
  queuePostSignInSetup(cred.user);
  return cred.user;
}

export async function loginWithGoogle() {
  const client = getFirebaseAuthClient();
  if (!client) throw new Error('Firebase is not configured.');
  const cred = await signInWithPopup(client.auth, googleProvider);
  queuePostSignInSetup(cred.user);
  return cred.user;
}

export async function logoutClient() {
  const client = getFirebaseAuthClient();
  if (!client) return;
  await signOut(client.auth);
  if (IS_STATIC_EXPORT) return;
  await fetch('/api/auth/logout', { method: 'POST', keepalive: true });
}
