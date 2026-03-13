'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Input } from '@/components/ui/input';
import { authAvailable, loginWithEmail, loginWithGoogle, registerWithEmail } from '@/lib/auth-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/app');
  }, [router]);

  const submit = async () => {
    try {
      setBusy(true);
      if (!authAvailable()) {
        toast.error('Shared Firebase config missing. Add NEXT_PUBLIC_FIREBASE_* in .env.local.');
        return;
      }
      if (isRegister) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      router.replace('/app');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Auth failed');
    } finally {
      setBusy(false);
    }
  };

  const loginGoogle = async () => {
    try {
      setBusy(true);
      if (!authAvailable()) {
        toast.error('Shared Firebase config missing. Add NEXT_PUBLIC_FIREBASE_* in .env.local.');
        return;
      }
      await loginWithGoogle();
      router.replace('/app');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Google sign-in failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <GlassPanel className="w-full max-w-md" variant="modal">
        <h1 className="mb-2 text-2xl font-semibold">{isRegister ? 'Create account' : 'Login to CodedAI'}</h1>
        <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
          Login uses the platform's shared Firebase project.
        </p>
        <p className="mb-6 text-xs text-cyan-600 dark:text-cyan-300">Sign in with your account to start building.</p>

        <div className="space-y-3">
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full" onClick={submit} disabled={busy || !email || !password}>
            {busy ? 'Working...' : isRegister ? 'Create account' : 'Login'}
          </Button>
          <Button className="w-full" onClick={loginGoogle} variant="secondary" disabled={busy}>
            Continue with Google
          </Button>
          <button
            className="w-full text-xs text-cyan-600 dark:text-cyan-300"
            onClick={() => setIsRegister((v) => !v)}
            type="button"
          >
            {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>
        </div>

        <Link href="/" className="mt-6 block text-center text-xs text-slate-500">
          Back to home
        </Link>
      </GlassPanel>
    </main>
  );
}
