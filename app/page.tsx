import Link from 'next/link';
import { Sparkles, UploadCloud, Rocket } from 'lucide-react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function LandingPage() {
  return (
    <main className="relative mx-auto min-h-screen max-w-6xl px-4 py-6">
      <header className="mb-14 flex items-center justify-between">
        <div className="glass rounded-full px-4 py-2 text-sm">CodedAI</div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button size="sm">Start Building</Button>
          </Link>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 animate-fadeInUp">
          <h1 className="text-5xl font-semibold leading-tight text-slate-900 dark:text-white">Chat to build your website.</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Generate code, preview instantly, connect Firebase, and export/deploy without leaving one workspace.
          </p>
          <div className="flex gap-3">
            <Link href="/login">
              <Button size="lg">Start Building</Button>
            </Link>
            <Link href="/app/settings">
              <Button size="lg" variant="secondary">
                Setup Guides
              </Button>
            </Link>
          </div>
        </div>

        <GlassPanel className="animate-float" variant="card">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wide text-cyan-500">How it works</p>
            <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-200">
              <div className="glass rounded-2xl p-4">
                <Sparkles className="mb-2 h-4 w-4" />
                Chat instructions become code diffs.
              </div>
              <div className="glass rounded-2xl p-4">
                <UploadCloud className="mb-2 h-4 w-4" />
                Connect Firebase Auth + Firestore + Storage.
              </div>
              <div className="glass rounded-2xl p-4">
                <Rocket className="mb-2 h-4 w-4" />
                Export project zip and deploy to Vercel.
              </div>
            </div>
          </div>
        </GlassPanel>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <GlassPanel>
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Core builder, preview, and export.</p>
        </GlassPanel>
        <GlassPanel>
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Higher usage limits and team workflows (placeholder).</p>
        </GlassPanel>
      </section>
    </main>
  );
}
