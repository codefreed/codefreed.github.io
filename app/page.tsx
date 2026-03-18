import Link from 'next/link';
import type { Metadata } from 'next';
import { Bot, LayoutTemplate, Rocket, ShieldCheck, Sparkles, UploadCloud, Wand2 } from 'lucide-react';
import { CodeFreedLogo } from '@/components/branding/codefreed-logo';
import { HomeTitleRotator } from '@/components/marketing/home-title-rotator';
import { GlassPanel } from '@/components/ui/glass-panel';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'CodeFreed | Free AI Website Builder',
  description:
    'Build websites with AI for free on CodeFreed. Generate pages, refine them with chat, preview changes live, and export launch-ready files.',
  path: '/'
});

const featureCards = [
  {
    title: 'Describe it, get a website',
    copy:
      'Type what you want — a landing page, a portfolio, a product site — and get a real working draft in under a minute. Instead of starting with a theme and bending it into shape, you begin with your idea and let the builder create the structure around it.',
    icon: Sparkles
  },
  {
    title: 'Keep editing with AI',
    copy:
      'Not happy with something? Just say so. You can keep refining the same project through chat instead of starting from scratch, which makes the workflow feel more like collaborating with a fast assistant than generating one disposable result.',
    icon: Bot
  },
  {
    title: 'Ship it',
    copy:
      'Export your files, connect your stack, or push to Vercel. The whole path from idea to live site stays in one place, so you do not lose momentum moving between disconnected tools.',
    icon: Rocket
  },
  {
    title: 'Shape the prompt first',
    copy:
      'Use Prompt Lab to choose the type of website, pick features, set a visual direction, and let AI write a deeper brief before generation starts. You can even chat with it just to refine the prompt until it feels strong.',
    icon: Wand2
  }
];

const workflowSteps = [
  'Write a prompt — your idea, your words, no special syntax.',
  'Watch the AI generate your pages, sections, and files.',
  'Preview it live, tweak with chat, or drop into IDE mode.',
  'Export or deploy when you\'re happy with it.'
];

const showcaseCards = [
  {
    label: 'Landing Pages',
    copy:
      'Get a polished marketing site for your startup or product without hiring a designer. CodeFreed gives you a fast first draft and enough editing room to make it feel like your brand instead of a stock template.'
  },
  {
    label: 'Portfolio Sites',
    copy:
      'A site that actually looks like you made it — not like everyone else\'s template. You can steer the tone, section flow, and visual direction until the site feels personal instead of generic.'
  },
  {
    label: 'MVP Frontends',
    copy:
      'Spin up a working frontend fast and validate your idea before you invest more time. This is especially useful when you need something credible to demo, test, or share while the rest of the product is still taking shape.'
  }
];

const comparisonCards = [
  {
    title: 'You can keep going',
    copy:
      'Most AI builders give you one shot. CodeFreed lets you keep editing the same project through conversation, which is much closer to how real website work actually happens after the first draft.'
  },
  {
    title: 'Pick your model',
    copy:
      'Switch between GPT-4.1, GPT-5, and Gemini mid-project. Use whatever works best for what you are building, whether you want steady iteration, bigger creative jumps, or another provider option.'
  },
  {
    title: 'Everything in one place',
    copy:
      'Preview, code editor, file uploads, exports, and deploy helpers are all around the same project, not scattered across tabs. That unified workspace helps you move faster because context stays in front of you.'
  }
];

const additionalUseCases = [
  'Startup landing pages',
  'Creator portfolios',
  'Waitlists & product launches',
  'Internal tool frontends',
  'Fast MVP website shells',
  'Marketing refreshes from a reference'
];

const pricingComparisonRows = [
  { label: 'Price to start', codefreed: 'COMPLETELY FREE', base44: 'Paid or plan-based pricing' },
  { label: 'Card required', codefreed: 'No', base44: 'Can depend on current plan structure' },
  { label: 'Best time to try it', codefreed: 'Right now, before spending anything', base44: 'Usually after thinking about cost' }
];

export default function LandingPage() {
  const primaryLinkClass =
    'inline-flex h-10 items-center justify-center whitespace-nowrap rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(64,134,255,0.24)]';
  const navLinkClass =
    'clean-surface inline-flex h-10 items-center justify-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white';
  const primaryLinkLargeClass =
    'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(64,134,255,0.24)]';
  const secondaryLinkLargeClass =
    'clean-surface inline-flex h-11 items-center justify-center whitespace-nowrap rounded-2xl px-5 py-2 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5';

  return (
    <main className="relative min-h-screen px-4 py-6 md:px-8 xl:px-12">
      <header className="mx-auto mb-6 flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-white/60 bg-white/70 px-4 py-3 shadow-[0_18px_40px_rgba(99,119,154,0.14)] backdrop-blur-xl animate-fadeInUp">
        <div className="animate-drift">
          <CodeFreedLogo compact />
        </div>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
          <Link href="/ai" className={navLinkClass}>AI</Link>
          <Link href="/features" className={navLinkClass}>Features</Link>
          <Link href="/why-us" className={navLinkClass}>Why Us</Link>
          <Link href="/api" className={navLinkClass}>API</Link>
          <Link href="/blog" className={navLinkClass}>Blog</Link>
          <Link href="/pricing" className={navLinkClass}>Pricing</Link>
          <Link href="/faq" className={navLinkClass}>FAQ</Link>
          <ThemeToggle />
          <Link href="/app" className={primaryLinkClass}>Open Studio</Link>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-[1600px] items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-xs text-cyan-600 dark:text-cyan-300">
            <Wand2 className="h-4 w-4" />
            Free — no card required
          </div>
          <HomeTitleRotator />
          <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-300">
            Describe what you need, get a working site, and keep refining it with AI chat until it looks exactly right.
            No complicated setup. No designer required.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/app" className={primaryLinkLargeClass}>Start building free</Link>
            <Link href="/features" className={secondaryLinkLargeClass}>See how it works</Link>
          </div>
          <div className="grid gap-3 pt-4 sm:grid-cols-3">
            <div className="glass rounded-2xl p-4 animate-drift">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">AI</p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">Generates pages, sections, and edits from plain English.</p>
              <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">
                You can start simple or give the AI a much richer brief with goals, style notes, and page requirements.
              </p>
            </div>
            <div className="glass rounded-2xl p-4 animate-drift animate-delay-1">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">Live</p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">See your changes as you make them, in the same window.</p>
              <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">
                Preview and chat stay side by side so it is easier to compare what you asked for with what the project actually became.
              </p>
            </div>
            <div className="glass rounded-2xl p-4 animate-drift animate-delay-2">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">Free</p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">The whole thing. No trial, no credit card, no catch.</p>
              <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">
                That makes it easier to test ideas and compare builders without paying before you know whether the workflow fits you.
              </p>
            </div>
          </div>
        </div>

        <GlassPanel className="animate-drift animate-delay-1" variant="card">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-cyan-500">How it works</p>
              <LayoutTemplate className="h-5 w-5 text-cyan-500" />
            </div>
            <div className="space-y-3">
              {workflowSteps.map((step, index) => (
              <div key={step} className="glass rounded-2xl p-4 animate-drift">
                  <p className="text-xs text-cyan-500">Step {index + 1}</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{step}</p>
                  <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">
                    {index === 0
                      ? 'The builder is designed to understand natural prompts, so you can write like a person instead of memorizing command syntax.'
                      : index === 1
                        ? 'The generated project includes real files and sections, which gives you something concrete to review immediately.'
                        : index === 2
                          ? 'You can stay visual in preview or switch into IDE mode when you want deeper control over the structure.'
                          : 'Once the project is where you want it, you can keep it in CodeFreed or move it into your own workflow.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1600px] animate-fadeInUp animate-delay-1">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">What it does</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">The core workflow in three steps.</p>
          </div>
          <Link href="/pricing" className="text-sm text-cyan-600 dark:text-cyan-300">Pricing →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">What people build with it</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Not just demos. People use CodeFreed to ship actual sites — for clients, for side projects, for launches.
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
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Ready when you are</h2>
          <div className="mt-4 space-y-4">
            <div className="glass rounded-2xl p-4 animate-drift">
              <ShieldCheck className="mb-2 h-4 w-4 text-cyan-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Trust pages included</h3>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Privacy policy, terms, sitemap, robots.txt — the stuff you always forget to add. It's there.
              </p>
            </div>
            <div className="glass rounded-2xl p-4 animate-drift animate-delay-1">
              <UploadCloud className="mb-2 h-4 w-4 text-cyan-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Show it your reference files</h3>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Upload a design, a doc, or existing code. The AI uses it as context while it edits.
              </p>
            </div>
            <div className="glass rounded-2xl p-4 animate-drift animate-delay-2">
              <Rocket className="mb-2 h-4 w-4 text-cyan-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white">Export or deploy</h3>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Download a zip, push to Vercel, or keep the files in-app. Your project, your call.
              </p>
            </div>
          </div>
        </GlassPanel>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1600px] gap-4 lg:grid-cols-[0.95fr_1.05fr] animate-fadeInUp animate-delay-3">
        <GlassPanel className="animate-drift">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Why not just use another AI builder?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Most tools give you one generation and stop there. CodeFreed is built for what happens after the first draft —
            the back-and-forth, the tweaks, the "can you change just this section" moments.
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
            Full comparison →
          </Link>
        </GlassPanel>

        <GlassPanel className="animate-drift animate-delay-1">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Good for a lot of different projects</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {additionalUseCases.map((item) => (
              <div key={item} className="glass rounded-2xl p-4 text-sm text-slate-700 dark:text-slate-300 animate-drift">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Start with a prompt. Use file uploads and live preview to keep improving it. Drop into IDE mode when you need more control.
          </div>
        </GlassPanel>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1600px] animate-fadeInUp animate-delay-3">
        <GlassPanel className="animate-drift">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Read more before you launch</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300">
                Content depth matters for trust, users, and advertising reviews. The CodeFreed blog covers AI website builders, no-code tools,
                and practical web development advice so the site feels like a real publishing property instead of a thin product shell.
              </p>
            </div>
            <Link href="/blog" className={primaryLinkLargeClass}>Visit the blog</Link>
          </div>
        </GlassPanel>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1600px] animate-fadeInUp animate-delay-3">
        <GlassPanel className="animate-drift">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">CodeFreed vs Base44 on price</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300">
                The fastest comparison is also the clearest one: CodeFreed is completely free right now, while Base44 is a paid or
                plan-based option.
              </p>
            </div>
            <div className="rounded-3xl bg-[linear-gradient(135deg,rgba(38,198,249,0.12),rgba(255,138,26,0.14))] px-5 py-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Main Difference</p>
              <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-900 dark:text-white md:text-3xl">We are COMPLETELY FREE</p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-slate-900/80 text-sm font-semibold text-white">
              <div className="border-r border-white/10 px-4 py-4">Category</div>
              <div className="border-r border-white/10 px-4 py-4 text-cyan-300">CodeFreed</div>
              <div className="px-4 py-4 text-slate-300">Base44</div>
            </div>
            {pricingComparisonRows.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.1fr_1fr_1fr] text-sm md:text-base ${index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}`}
              >
                <div className="border-r border-t border-white/10 px-4 py-4 font-medium text-slate-900 dark:text-white">{row.label}</div>
                <div className="border-r border-t border-white/10 px-4 py-4 text-slate-700 dark:text-slate-200">{row.codefreed}</div>
                <div className="border-t border-white/10 px-4 py-4 text-slate-600 dark:text-slate-300">{row.base44}</div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1600px] gap-4 md:grid-cols-2 animate-fadeInUp animate-delay-3">
        <GlassPanel className="animate-drift">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Free to use</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Build, preview, export, and deploy. No trial period, no credit card asked.</p>
        </GlassPanel>
        <GlassPanel className="animate-drift animate-delay-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Everything you need to ship</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Public pages, trust docs, and deployment helpers are there when you need them.</p>
        </GlassPanel>
      </section>

      <footer className="mx-auto mt-6 flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-6 text-sm text-slate-600 dark:text-slate-300">
        <p>CodeFreed</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/ai">AI</Link>
          <Link href="/features">Features</Link>
          <Link href="/why-us">Why Us</Link>
          <Link href="/api">API</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/sitemap.xml">Sitemap</Link>
        </div>
      </footer>
    </main>
  );
}
