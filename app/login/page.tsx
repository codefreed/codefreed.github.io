import Link from 'next/link';
import { GlassPanel } from '@/components/ui/glass-panel';

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <GlassPanel className="w-full max-w-md" variant="modal">
        <h1 className="mb-2 text-2xl font-semibold">Login is temporarily disabled</h1>
        <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
          The public site is being simplified for review and ad approval.
        </p>
        <p className="mb-6 text-xs text-cyan-600 dark:text-cyan-300">You can still open the studio and work locally.</p>

        <Link href="/app" className="mt-6 block text-center text-xs text-slate-500">
          Open studio
        </Link>
      </GlassPanel>
    </main>
  );
}
