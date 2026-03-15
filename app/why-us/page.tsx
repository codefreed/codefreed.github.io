import { Boxes, Compass, Eye, FileCode2, GitBranchPlus, Workflow } from 'lucide-react';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';

const reasons = [
  {
    title: 'Built for back-and-forth',
    copy: 'You generate, look at it, decide what\'s off, and fix it. CodeFreed is built around that loop — not the idea that one prompt should do everything.',
    icon: Workflow
  },
  {
    title: 'A real workspace, not just output',
    copy: 'Chat, live preview, IDE mode, file uploads, exports — all around the same project. You\'re not copying results out of a chatbox.',
    icon: Boxes
  },
  {
    title: 'Actually focused on websites',
    copy: 'The whole tool is designed around building web pages. The AI understands that context, and the workflow reflects it.',
    icon: Compass
  },
  {
    title: 'You can see what\'s happening',
    copy: 'Preview changes as they happen, inspect the files, tweak specific sections. You\'re in control — the AI is the fast part, not the mystery.',
    icon: Eye
  },
  {
    title: 'You own what you build',
    copy: 'The files are yours. Export them, edit them outside CodeFreed, hand them off to a developer. No lock-in.',
    icon: FileCode2
  },
  {
    title: 'Fits a longer project',
    copy: 'Most AI tools are great for a quick first pass. CodeFreed is useful when a project takes more than one session to get right.',
    icon: GitBranchPlus
  }
];

const comparisonPoints = [
  'Most AI builders hand you a result and stop there. CodeFreed is built for what comes after — the iterations, the adjustments, the "change just this part" moments.',
  'You can switch between GPT-4.1, GPT-5, and Gemini inside the same project. Use whatever model gives better results for the task at hand.',
  'Preview, IDE mode, reference file uploads, exports, and deployment helpers are all inside the same project flow — not separate tools.',
  'The goal was never to replace a developer. It was to make the early stages of building a site much, much faster.'
];

const comparisonRows = [
  {
    label: 'Cost to use',
    codefreed: 'COMPLETELY FREE',
    base44: 'Paid pricing or usage-based cost depending on their current plans'
  },
  {
    label: 'Best fit',
    codefreed: 'Try it freely without worrying about paying before you know if it works for you',
    base44: 'Can mean thinking about cost earlier in the process'
  },
  {
    label: 'Model choice',
    codefreed: 'Pick from GPT-4.1, GPT-5, or Gemini',
    base44: 'Less emphasis on model switching'
  },
  {
    label: 'Editing style',
    codefreed: 'Chat-first, iterative — keep going as long as you need',
    base44: 'More focused on the initial generation'
  },
  {
    label: 'Preview & code',
    codefreed: 'Live preview, IDE mode, file attachments, exports',
    base44: 'More streamlined, less editor-focused'
  },
  {
    label: 'Focus',
    codefreed: 'Websites and landing pages specifically',
    base44: 'Broader AI builder positioning'
  }
];

export default function WhyUsPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-6xl">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Pricing Difference</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-900 dark:text-white md:text-5xl">
              CodeFreed is COMPLETELY FREE.
            </h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              No card required. No paid plan needed to try the core builder.
            </p>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason.title} className="glass rounded-3xl p-6 md:p-7">
              <reason.icon className="h-5 w-5 text-cyan-500" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{reason.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">{reason.copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 glass rounded-3xl p-6 md:p-7">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">What makes it different</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {comparisonPoints.map((point) => (
              <div key={point} className="glass rounded-2xl p-4 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
                {point}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 glass rounded-3xl p-6 md:p-7">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">CodeFreed vs Base44</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
            The biggest difference is simple: CodeFreed is completely free right now. If someone is comparing it to Base44,
            the first thing to know is that CodeFreed lets you build, test, and iterate without paying just to get started.
          </p>

          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
            <div className="grid grid-cols-[1.15fr_1fr_1fr] bg-slate-900/80 text-sm font-semibold text-white">
              <div className="border-r border-white/10 px-4 py-4">Category</div>
              <div className="border-r border-white/10 px-4 py-4 text-cyan-300">CodeFreed</div>
              <div className="px-4 py-4 text-slate-300">Base44</div>
            </div>
            {comparisonRows.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.15fr_1fr_1fr] text-sm md:text-base ${
                  index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'
                }`}
              >
                <div className="border-r border-t border-white/10 px-4 py-4 font-medium text-slate-900 dark:text-white">{row.label}</div>
                <div className="border-r border-t border-white/10 px-4 py-4 text-slate-700 dark:text-slate-200">{row.codefreed}</div>
                <div className="border-t border-white/10 px-4 py-4 text-slate-600 dark:text-slate-300">{row.base44}</div>
              </div>
            ))}
          </div>
        </section>
        <MarketingFooter />
      </section>
    </main>
  );
}
