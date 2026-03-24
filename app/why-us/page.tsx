import Link from 'next/link';
import type { Metadata } from 'next';
import { Boxes, Compass, Eye, FileCode2, GitBranchPlus, Workflow } from 'lucide-react';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'Why Us | CodeFreed',
  description: 'See what makes CodeFreed different from other AI website builders, including pricing, workflow, model choice, and control.',
  path: '/why-us'
});

const reasons = [
  {
    title: 'Built for back-and-forth',
    copy: 'You generate, look at it, decide what\'s off, and fix it. CodeFreed is built around that loop — not the idea that one prompt should do everything.',
    detail: 'Most website projects require several passes before they feel right. The first draft reveals what is missing. The second pass fixes the structure. The third tightens the copy. CodeFreed supports that natural progression because each conversation builds on the previous one rather than discarding it. You do not need to start over every time you want to change something.',
    icon: Workflow
  },
  {
    title: 'A real workspace, not just output',
    copy: 'Chat, live preview, IDE mode, file uploads, exports — all around the same project. You\'re not copying results out of a chatbox.',
    detail: 'The difference between a workspace and a generator is significant in practice. A generator hands you a result and leaves you to figure out what to do with it. A workspace keeps all your tools organized around the same project so you can move between chat, preview, and code editing without losing context. That coherence makes the whole process faster and less frustrating.',
    icon: Boxes
  },
  {
    title: 'Actually focused on websites',
    copy: 'The whole tool is designed around building web pages. The AI understands that context, and the workflow reflects it.',
    detail: 'General-purpose AI tools can produce website code, but they were not built with web publishing workflows in mind. CodeFreed is. The prompts, the file structure, the preview environment, and the deployment helpers are all oriented toward getting a website out the door rather than producing code output that you then have to figure out how to run.',
    icon: Compass
  },
  {
    title: 'You can see what\'s happening',
    copy: 'Preview changes as they happen, inspect the files, tweak specific sections. You\'re in control — the AI is the fast part, not the mystery.',
    detail: 'One of the frustrations with AI tools is the black-box quality of their output. You put in a prompt and receive something back, but you cannot easily see what was generated, why, or how to adjust it. CodeFreed keeps the files, the structure, and the preview all visible and editable. The AI does the heavy lifting, but you stay oriented in the project at all times.',
    icon: Eye
  },
  {
    title: 'You own what you build',
    copy: 'The files are yours. Export them, edit them outside CodeFreed, hand them off to a developer. No lock-in.',
    detail: 'Platform lock-in is a real problem with website builders. If the tool you use stores your site in a proprietary format or makes it difficult to export the underlying files, you end up dependent on their pricing, availability, and feature roadmap forever. CodeFreed generates real files in standard formats. You can take them anywhere, open them in any editor, and continue working on them completely outside of this platform.',
    icon: FileCode2
  },
  {
    title: 'Fits a longer project',
    copy: 'Most AI tools are great for a quick first pass. CodeFreed is useful when a project takes more than one session to get right.',
    detail: 'Some websites come together in an afternoon. Others require multiple sessions of refinement as the product evolves, the messaging gets clearer, or the audience becomes better defined. CodeFreed stores your project and keeps the conversation history so you can pick up exactly where you left off. There is no friction returning to a project after a week away.',
    icon: GitBranchPlus
  }
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
      <section className="mx-auto w-full max-w-[1600px]">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Why CodeFreed</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-900 dark:text-white md:text-5xl">
              CodeFreed is COMPLETELY FREE.
            </h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              No card required. No paid plan needed to try the core builder. But the price difference is only the beginning — here is the full picture of what makes CodeFreed worth choosing.
            </p>
          </div>
          <Link
            href="/app"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Try it free
          </Link>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason.title} className="glass rounded-3xl p-6 md:p-7">
              <reason.icon className="h-5 w-5 text-cyan-500" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{reason.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">{reason.copy}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{reason.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 glass rounded-3xl p-6 md:p-7">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">The case for an iterative builder</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Why one-shot generation is not enough</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
                Most AI builders are optimized to produce an impressive first result. They generate something complete-looking in response to your prompt, and then the relationship ends. That works well for demos but not for real projects, because real projects almost always require revision. Messaging evolves, the offer changes, design feedback comes in, and a page that looked right on Tuesday needs updates by Friday.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
                An iterative builder handles that reality without forcing you to start over. When you can keep refining the same project through conversation — asking for a headline rewrite, adding a section, adjusting the tone — you maintain momentum instead of losing it every time something needs to change. That is a fundamentally different product category from a one-shot generator, even if the underlying AI technology looks similar from the outside.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Why model choice matters</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
                You can switch between GPT-4.1, GPT-5, and Gemini inside the same project. That might sound like a minor feature, but in practice it gives you meaningful flexibility. Some tasks — like producing clean, minimal layout code — are handled well by a fast model that prioritizes structure. Others, like rewriting copy to have a specific voice or generating an unusually complex section, benefit from a more capable model that can handle nuance.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
                Being locked into a single model means your builder is only as good as that provider is on a given day. Multi-model access means you can choose based on the task rather than accepting whatever the platform decided to hardcode. It is the kind of flexibility that does not seem important until you have needed it.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/features"
              className="clean-surface inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 dark:text-white"
            >
              Explore all features →
            </Link>
            <Link
              href="/blog/how-ai-website-builders-help-you-launch-faster"
              className="clean-surface inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 dark:text-white"
            >
              Read: why iteration wins →
            </Link>
          </div>
        </section>

        <section className="mt-8 glass rounded-3xl p-6 md:p-7">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">CodeFreed vs Base44</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
            The biggest difference is simple: CodeFreed is completely free right now. If someone is comparing it to Base44, the first thing to know is that CodeFreed lets you build, test, and iterate without paying just to get started. But beyond pricing, the two products have genuinely different philosophies about how website creation should work.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
            Base44 positions itself as a broader AI builder for apps and products. CodeFreed is focused specifically on websites and landing pages, which means the workflow, the prompting system, and the preview environment are all optimized for that specific use case rather than trying to cover every category of software creation. If your goal is to get a website live quickly and keep improving it, that focus makes a practical difference.
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
