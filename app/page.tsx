import Link from 'next/link';
import { Bot, LayoutTemplate, Rocket, ShieldCheck, Sparkles, UploadCloud, Wand2 } from 'lucide-react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const featureCards = [
  {
    title: 'Prompt to Website',
    copy: 'Describe your business, product, or idea and turn it into a real website draft in minutes.',
    icon: Sparkles
  },
  {
    title: 'AI Editing Workspace',
    copy: 'Chat with the builder, refine layouts, upload references, and preview changes without leaving the editor.',
    icon: Bot
  },
  {
    title: 'Launch Flow',
    copy: 'Export, connect your stack, and ship to Vercel with a simpler path from concept to live site.',
    icon: Rocket
  }
];

const workflowSteps = [
  'Start with a prompt, idea, or reference files.',
  'Let the AI generate pages, sections, and supporting files.',
  'Preview the site, tweak with chat, and open IDE mode when needed.',
  'Export or deploy when the project is ready.'
];

const showcaseCards = [
  {
    label: 'Landing Pages',
    copy: 'Create polished marketing sites for startups, apps, and products.'
  },
  {
    label: 'Portfolio Sites',
    copy: 'Generate a personal site that feels custom instead of boilerplate.'
  },
  {
    label: 'MVP Frontends',
    copy: 'Prototype ideas quickly with editable files and instant previews.'
  }
];

const comparisonCards = [
  {
    title: 'Chat-first editing',
    copy: 'Keep refining the same project through conversation instead of relying on a single one-shot generation.'
  },
  {
    title: 'Model choice in the builder',
    copy: 'Switch between GPT-4.1, GPT-5, and Gemini from the AI selector as your project changes.'
  },
  {
    title: 'Workspace around the output',
    copy: 'Preview, IDE mode, file attachments, imports, exports, and deploy helpers all sit around the generation flow.'
  }
];

const additionalUseCases = [
  'Startup landing pages',
  'Creator portfolios',
  'Waitlists and product launches',
  'Internal tool frontends',
  'Fast MVP website shells',
  'Marketing refreshes from an existing reference'
];

export default function LandingPage() {
  const primaryLinkClass =
    'glass inline-flex h-10 items-center justify-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-glow dark:text-slate-100';
  const navLinkClass =
    'glass inline-flex h-10 items-center justify-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white';
  const primaryLinkLargeClass =
    'glass inline-flex h-11 items-center justify-center whitespace-nowrap rounded-2xl px-5 py-2 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-glow dark:text-slate-100';
  const secondaryLinkLargeClass =
    'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-2xl bg-slate-200 px-5 py-2 text-sm font-medium text-slate-900 transition-all hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600';

  return (
    <main className="relative min-h-screen px-4 py-6 md:px-8 xl:px-12">
      <header className="mx-auto mb-6 flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-4 animate-fadeInUp">
        <div className="glass rounded-full px-4 py-2 text-sm animate-drift">CodeFreed</div>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
          <Link href="/ai" className={navLinkClass}>
            AI
          </Link>
          <Link href="/features" className={navLinkClass}>
            Features
          </Link>
          <Link href="/why-us" className={navLinkClass}>
            Why Us
          </Link>
          <Link href="/api" className={navLinkClass}>
            API
          </Link>
          <Link href="/pricing" className={navLinkClass}>
            Pricing
          </Link>
          <Link href="/faq" className={navLinkClass}>
            FAQ
          </Link>
          <ThemeToggle />
          <Link href="/app" className={primaryLinkClass}>
            Open Studio
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-[1600px] items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
            <Wand2 className="h-4 w-4" />
            Free AI Website Generator
          </div>
          <h1 className="text-5xl font-semibold leading-tight text-slate-900 dark:text-white md:text-6xl">
            Build, edit, and launch websites with AI.
          </h1>
          <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-300">
            CodeFreed helps you turn prompts into real websites, refine them with AI chat, and publish faster without
            a complicated setup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/app" className={primaryLinkLargeClass}>
              Open Studio
            </Link>
            <Link href="/features" className={secondaryLinkLargeClass}>
              Explore Features
            </Link>
          </div>
          <div className="grid gap-3 pt-4 sm:grid-cols-3">
            <div className="glass rounded-2xl p-4 animate-drift">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">AI</p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">Generate layouts, sections, and edits from prompts.</p>
            </div>
            <div className="glass rounded-2xl p-4 animate-drift animate-delay-1">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">Live</p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">Preview your project and iterate in one workspace.</p>
            </div>
            <div className="glass rounded-2xl p-4 animate-drift animate-delay-2">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">Fast</p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">Move from concept to deployment with fewer steps.</p>
            </div>
          </div>
        </div>

        <GlassPanel className="animate-drift animate-delay-1" variant="card">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-wide text-cyan-500">How it works</p>
              <LayoutTemplate className="h-5 w-5 text-cyan-500" />
            </div>
            <div className="space-y-3">
              {workflowSteps.map((step, index) => (
                <div key={step} className="glass rounded-2xl p-4 animate-drift">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-500">Step {index + 1}</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1600px] animate-fadeInUp animate-delay-1">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-wide text-cyan-500">Why CodeFreed</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Built for faster website creation</h2>
          </div>
          <Link href="/pricing" className="text-sm text-cyan-600 dark:text-cyan-300">
            View pricing
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((card) => (
            <GlassPanel key={card.title} className="animate-drift">
              <card.icon className="h-5 w-5 text-cyan-500" />
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{card.copy}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1600px] gap-4 lg:grid-cols-[1.1fr_0.9fr] animate-fadeInUp animate-delay-2">
        <GlassPanel className="animate-drift">
          <p className="text-sm uppercase tracking-wide text-cyan-500">Use Cases</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">More than a simple demo builder</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Use CodeFreed for landing pages, startup websites, creator sites, experiments, and fast MVP frontends.
          </p>
          <div className="mt-6 grid gap-3">
            {showcaseCards.map((item) => (
              <div key={item.label} className="glass rounded-2xl p-4 animate-drift">
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.label}</h3>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.copy}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="animate-drift animate-delay-1">
          <p className="text-sm uppercase tracking-wide text-cyan-500">Launch Ready</p>
          <div className="mt-4 space-y-4">
            <div className="glass rounded-2xl p-4 animate-drift">
              <ShieldCheck className="mb-2 h-4 w-4 text-cyan-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Public site pages included</h3>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Trust pages, sitemap, robots, and advertising files can live alongside your builder.
              </p>
            </div>
            <div className="glass rounded-2xl p-4 animate-drift animate-delay-1">
              <UploadCloud className="mb-2 h-4 w-4 text-cyan-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Reference-driven editing</h3>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Upload files, feed longer prompts, and let the AI use richer context while it edits.
              </p>
            </div>
            <div className="glass rounded-2xl p-4 animate-drift animate-delay-2">
              <Rocket className="mb-2 h-4 w-4 text-cyan-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Export or deploy</h3>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Keep your files, export a project zip, or move toward Vercel deployment when you are ready.
              </p>
            </div>
          </div>
        </GlassPanel>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1600px] gap-4 lg:grid-cols-[0.95fr_1.05fr] animate-fadeInUp animate-delay-3">
        <GlassPanel className="animate-drift">
          <p className="text-sm uppercase tracking-wide text-cyan-500">Compared to simpler builders</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Built for more than a quick first draft</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            If you are comparing CodeFreed with tools like Base44, the biggest difference is the workflow around the result.
            CodeFreed is built for ongoing editing, model switching, previewing, and exporting instead of stopping at the first generated page.
          </p>
          <div className="mt-6 grid gap-3">
            {comparisonCards.map((item) => (
              <div key={item.title} className="glass rounded-2xl p-4 animate-drift">
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.copy}</p>
              </div>
            ))}
          </div>
          <Link href="/why-us" className="mt-6 inline-flex text-sm text-cyan-600 dark:text-cyan-300">
            Explore why teams pick CodeFreed
          </Link>
        </GlassPanel>

        <GlassPanel className="animate-drift animate-delay-1">
          <p className="text-sm uppercase tracking-wide text-cyan-500">More Use Cases</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Made for a wide range of web projects</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {additionalUseCases.map((item) => (
              <div key={item} className="glass rounded-2xl p-4 text-sm text-slate-700 dark:text-slate-300 animate-drift">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Use AI to create the first pass, then keep going with longer prompts, file uploads, live preview, and IDE mode when the project needs more control.
          </div>
        </GlassPanel>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1600px] gap-4 md:grid-cols-2 animate-fadeInUp animate-delay-3">
        <GlassPanel className="animate-drift">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Core builder, preview, export, and deploy tools.</p>
        </GlassPanel>
        <GlassPanel className="animate-drift animate-delay-1">
          <h2 className="text-xl font-semibold">Launch Ready</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Clean public pages and deployment support while auth features are paused.</p>
        </GlassPanel>
      </section>

      <footer className="mx-auto mt-6 flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-6 text-sm text-slate-600 dark:text-slate-300">
        <p>CodeFreed</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/ai">AI</Link>
          <Link href="/features">Features</Link>
          <Link href="/why-us">Why Us</Link>
          <Link href="/api">API</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </main>
  );
}
