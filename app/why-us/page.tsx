import { Boxes, Compass, Eye, FileCode2, GitBranchPlus, Workflow } from 'lucide-react';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';

const reasons = [
  {
    title: 'Built for iteration, not one-shot output',
    copy: 'CodeFreed is meant for back-and-forth building. You generate, review, revise, attach files, switch models, and keep shaping the project instead of starting over each time.',
    icon: Workflow
  },
  {
    title: 'Real workspace around the AI',
    copy: 'Instead of only returning a page draft, CodeFreed gives you chat, preview, IDE mode, imports, exports, and project history in one flow.',
    icon: Boxes
  },
  {
    title: 'Made for website creation',
    copy: 'The product focuses on websites, landing pages, MVP frontends, and marketing sites, so the experience is tuned for web structure and launch tasks.',
    icon: Compass
  },
  {
    title: 'Better visibility while you build',
    copy: 'You can preview changes, inspect files in IDE mode, upload references, and make targeted revisions instead of treating generation like a black box.',
    icon: Eye
  },
  {
    title: 'Own your files',
    copy: 'Generated files stay part of a project you can export, review, and continue editing. That makes it easier to move from experiment to something you can actually ship.',
    icon: FileCode2
  },
  {
    title: 'Fits a longer workflow',
    copy: 'CodeFreed supports the path from prompt to preview to edits to deployment, which is useful when a project needs multiple passes instead of one quick answer.',
    icon: GitBranchPlus
  }
];

const comparisonPoints = [
  'Compared to simpler AI site generators, CodeFreed puts more emphasis on ongoing editing and control.',
  'For people comparing it with tools like Base44, the difference is less about a one-click draft and more about having a fuller builder workflow around the result.',
  'That means model switching, reference uploads, preview, IDE mode, exports, and deployment helpers can all be part of the same project flow.',
  'The goal is to help users keep building after the first generation, not stop at the first generation.'
];

export default function WhyUsPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-6xl">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">Why CodeFreed</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Why teams and creators may choose us</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              CodeFreed is designed for people who want more than a quick AI page draft. It is built around an editable workflow
              so the project can keep improving after the first prompt.
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
          <p className="text-sm uppercase tracking-wide text-cyan-500">Compared to simpler builders</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">More than a first pass</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {comparisonPoints.map((point) => (
              <div key={point} className="glass rounded-2xl p-4 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
                {point}
              </div>
            ))}
          </div>
        </section>
        <MarketingFooter />
      </section>
    </main>
  );
}
