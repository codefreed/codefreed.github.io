import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let initialized = false;

export function getFirebaseAdmin() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  if (!getApps().length && !initialized) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
    initialized = true;
  }

  return {
    auth: getAuth(),
    db: getFirestore()
  };
}
