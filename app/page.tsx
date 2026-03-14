import Link from 'next/link';
import { UploadCloud, Rocket, ShieldCheck } from 'lucide-react';
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
          <Link href="/app">
            <Button size="sm">Open Studio</Button>
          </Link>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 animate-fadeInUp">
          <h1 className="text-5xl font-semibold leading-tight text-slate-900 dark:text-white">Build and publish your website.</h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Edit pages, preview instantly, connect Firebase, and export or deploy from one workspace.
          </p>
          <div className="flex gap-3">
            <Link href="/app">
              <Button size="lg">Open Studio</Button>
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
                <ShieldCheck className="mb-2 h-4 w-4" />
                Build a cleaner public-facing site for launch and review.
              </div>
              <div className="glass rounded-2xl p-4">
                <UploadCloud className="mb-2 h-4 w-4" />
                Connect Firebase, save your files, and keep shipping.
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
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Core builder, preview, export, and deploy tools.</p>
        </GlassPanel>
        <GlassPanel>
          <h2 className="text-xl font-semibold">Launch Ready</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Clean public pages and deployment support while auth features are paused.</p>
        </GlassPanel>
      </section>
    </main>
  );
}
