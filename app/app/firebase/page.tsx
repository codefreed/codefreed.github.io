'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { AppShell } from '@/components/layout/app-shell';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/auth-provider';
import { saveFirebaseWebConfig } from '@/lib/project-service';

const schema = z.object({
  apiKey: z.string().min(1),
  authDomain: z.string().min(1),
  projectId: z.string().min(1),
  storageBucket: z.string().min(1),
  messagingSenderId: z.string().min(1),
  appId: z.string().min(1)
});

const rulesExample = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /projects/{projectId} {
      allow create: if request.auth != null && request.resource.data.ownerId == request.auth.uid;
      allow read, update, delete: if request.auth != null && resource.data.ownerId == request.auth.uid;
    }
    match /projects/{projectId}/{document=**} {
      allow read, write: if request.auth != null
        && get(/databases/$(database)/documents/projects/$(projectId)).data.ownerId == request.auth.uid;
    }
  }
}`;

export default function FirebaseWizardPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  });
  const [toggles, setToggles] = useState({ auth: true, persistence: true, storage: true });

  const envSnippet = useMemo(
    () =>
      `NEXT_PUBLIC_FIREBASE_API_KEY=${form.apiKey}\nNEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${form.authDomain}\nNEXT_PUBLIC_FIREBASE_PROJECT_ID=${form.projectId}\nNEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${form.storageBucket}\nNEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${form.messagingSenderId}\nNEXT_PUBLIC_FIREBASE_APP_ID=${form.appId}`,
    [form]
  );

  const save = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error('Invalid Firebase config shape');
      return;
    }

    try {
      const { initializeApp, deleteApp } = await import('firebase/app');
      const testApp = initializeApp(parsed.data, `codedai-test-${Date.now()}`);
      await deleteApp(testApp);

      await saveFirebaseWebConfig(user?.uid ?? null, parsed.data);
      toast.success('Custom site Firebase config saved');
    } catch {
      toast.error('Firebase config test/save failed');
    }
  };

  return (
    <AppShell>
      <GlassPanel className="h-full overflow-y-auto">
        <h1 className="text-2xl font-semibold">Custom Firebase for Generated Sites</h1>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
          CodeFreed app auth uses one shared Firebase config from environment variables. Use this screen only if you want
          a different Firebase config inside sites you generate.
        </p>

        <section className="mt-6 space-y-3">
          {Object.entries(form).map(([key, value]) => (
            <Input
              key={key}
              placeholder={key}
              value={value}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          ))}
        </section>

        <section className="mt-4 flex flex-wrap gap-2 text-sm">
          <label className="glass rounded-2xl px-3 py-2">
            <input
              type="checkbox"
              checked={toggles.auth}
              onChange={(e) => setToggles((prev) => ({ ...prev, auth: e.target.checked }))}
              className="mr-2"
            />
            Enable Auth
          </label>
          <label className="glass rounded-2xl px-3 py-2">
            <input
              type="checkbox"
              checked={toggles.persistence}
              onChange={(e) => setToggles((prev) => ({ ...prev, persistence: e.target.checked }))}
              className="mr-2"
            />
            Firestore persistence
          </label>
          <label className="glass rounded-2xl px-3 py-2">
            <input
              type="checkbox"
              checked={toggles.storage}
              onChange={(e) => setToggles((prev) => ({ ...prev, storage: e.target.checked }))}
              className="mr-2"
            />
            Storage uploads
          </label>
        </section>

        <div className="mt-4 flex gap-2">
          <Button onClick={save}>Validate & Save</Button>
          <Button
            variant="secondary"
            onClick={() => {
              navigator.clipboard.writeText(envSnippet);
              toast.success('.env snippet copied');
            }}
          >
            Copy .env.local snippet
          </Button>
        </div>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Firestore Rules Example</h2>
          <pre className="glass mt-2 overflow-auto rounded-2xl p-3 text-xs">{rulesExample}</pre>
          <Button
            className="mt-2"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(rulesExample);
              toast.success('Rules copied');
            }}
          >
            Copy Rules
          </Button>
        </section>
      </GlassPanel>
    </AppShell>
  );
}
