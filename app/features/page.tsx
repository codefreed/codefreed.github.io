import Link from 'next/link';
import type { Metadata } from 'next';
import { Bot, FileCode2, MonitorSmartphone, Rocket, Sparkles, UploadCloud, Wand2 } from 'lucide-react';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'Features | CodeFreed',
  description: 'Explore CodeFreed features including AI prompting, live preview, file exports, uploads, and launch-ready website workflows.',
  path: '/features'
});

const features = [
  {
    title: 'Start with a prompt',
    copy: 'Describe what you want in plain English and CodeFreed generates real working files — not a screenshot, not a mockup, an actual site with properly structured HTML, CSS, and JavaScript. You can be as brief as "a landing page for a fitness coaching service" or as detailed as a multi-paragraph creative brief that specifies sections, tone, audience, and visual direction.',
    detail: 'This matters because the quality of AI output scales with the quality of input. A vague prompt produces a generic result; a specific one produces something that feels custom. For example, a founder building a waitlist page can describe the product name, the target user, the core benefit, and what should appear above the fold — and the builder translates all of that into a structured draft immediately.',
    icon: Wand2,
    relatedLink: { href: '/blog/how-to-build-a-landing-page-in-under-10-minutes-using-ai', label: 'How to write an effective prompt →' }
  },
  {
    title: 'Keep refining with chat',
    copy: 'After the first draft is generated, you can keep improving it through conversation without restarting the project. Ask for a different headline, request a new section, tell the AI the features list is too long, or ask it to make the tone less formal — and it applies those changes to the existing project.',
    detail: 'This is meaningfully different from tools that treat generation as a one-shot event. Real website work involves iteration: review, feedback, another pass, more feedback. The chat interface makes that loop fast and natural. A startup team reviewing a draft can leave specific comments in the same session, and the builder applies each one without touching the parts that are already working.',
    icon: Bot,
    relatedLink: { href: '/blog/how-ai-website-builders-help-you-launch-faster', label: 'Why iteration beats one-shot generation →' }
  },
  {
    title: 'Preview and code side by side',
    copy: 'The live preview and code editor stay open together, so you can see the visual result and the underlying files at the same time. There is no need to switch between tabs, refresh a browser window, or copy code into a separate environment to check what it looks like.',
    detail: 'This matters especially when you are making targeted edits and want to verify the result immediately. A designer can check spacing and responsiveness in the preview while a developer inspects the component structure in the editor. Switch into IDE mode whenever you want to hand-edit something directly — the two views stay in sync, so there is no reconciliation step.',
    icon: MonitorSmartphone,
    relatedLink: { href: '/blog/web-development-tips-for-turning-ai-generated-sites-into-real-projects', label: 'Tips for reviewing AI-generated code →' }
  },
  {
    title: 'Your files, your project',
    copy: 'Every project in CodeFreed is backed by real files that you own. There is no proprietary format, no lock-in, and no dependency on our servers to run the site you build. You can export the full project at any point, open it locally, edit it in any code editor, or hand it to a developer.',
    detail: 'File ownership is an underappreciated feature. Many AI website tools give you impressive output inside a closed interface but make it difficult or impossible to take the underlying code and work with it elsewhere. CodeFreed is designed around the assumption that the site you build should belong entirely to you. That means when the project outgrows the builder, your work does not have to start over.',
    icon: FileCode2,
    relatedLink: { href: '/faq', label: 'See export and ownership FAQ →' }
  },
  {
    title: 'Give it more context',
    copy: 'You can upload reference files before or during editing — a design mockup, a brand guidelines document, an existing codebase, or a competitor page you want to use as inspiration. The AI uses those files as context when making edits, which produces output that is much more consistent with your existing brand or style.',
    detail: 'Reference uploads are especially useful for teams that already have a visual identity but need to move quickly on a new page or campaign. Instead of describing the brand tone and style from scratch in every prompt, you upload the reference once and the AI applies it across all edits in that session. This significantly reduces the amount of iteration needed to get results that feel on-brand.',
    icon: UploadCloud,
    relatedLink: { href: '/blog/no-code-vs-ai-website-builders-whats-the-difference', label: 'When AI builders have an edge over no-code →' }
  },
  {
    title: 'Ship when you\'re ready',
    copy: 'When the project is ready, you have multiple paths to publishing. Export a zip file and deploy it manually with any hosting provider. Connect to Vercel and deploy directly from the builder. Or keep the project inside CodeFreed and share a preview link while the build is still in progress.',
    detail: 'The deployment helpers remove the friction that often slows the final step of a project. Vercel connection means you go from finished draft to live URL without leaving the workspace. The zip export gives you total flexibility for teams with their own hosting infrastructure. Either way, the path from working draft to published site does not require setting up a separate pipeline or learning a new deployment tool from scratch.',
    icon: Rocket,
    relatedLink: { href: '/blog/how-to-go-from-idea-to-live-website-without-hiring-a-developer', label: 'Full guide: idea to live website →' }
  },
  {
    title: 'Prompt Lab',
    copy: 'Before you generate anything, Prompt Lab walks you through a guided setup that asks the right questions: what type of site you are building, which sections and features it should include, the visual tone you are going for, and the audience you are designing for. It then drafts a detailed prompt from your answers.',
    detail: 'Most people underestimate how much a richer brief improves the generated output. Prompt Lab makes it easy to get there without needing to know what good prompt engineering looks like. After the guided flow, you can also chat with the AI to refine the brief further before the generation starts — which means the first draft is often closer to what you actually want, requiring fewer rounds of revision.',
    icon: Sparkles,
    relatedLink: { href: '/blog/5-things-every-startup-landing-page-needs', label: 'What every startup landing page needs →' }
  }
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-[1600px]">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">What CodeFreed can do</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Built for the whole process — from the first idea to a deployed site — not just the first generation. Every feature below is designed to reduce the time between what you want and what actually ships.
            </p>
          </div>
          <Link
            href="/app"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Try it free
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="glass rounded-3xl p-6 flex flex-col">
              <feature.icon className="h-5 w-5 text-cyan-500" />
              <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{feature.copy}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{feature.detail}</p>
              {feature.relatedLink && (
                <div className="mt-auto pt-5">
                  <Link
                    href={feature.relatedLink.href}
                    className="text-xs font-medium text-cyan-600 hover:text-cyan-500 dark:text-cyan-400"
                  >
                    {feature.relatedLink.label}
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8 glass rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Everything in one workspace</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
            Most website workflows require bouncing between a design tool, a code editor, a preview environment, and a deployment platform. CodeFreed keeps all of that inside a single project view. Your chat history, live preview, file editor, and export controls are always visible together, which means you spend less time on context switching and more time on the actual work.
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
            This is especially valuable for solo founders and small teams who cannot afford to have separate people managing separate tools. One person can move from prompt to preview to deployment without handing anything off or losing momentum between steps.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Start building free
            </Link>
            <Link
              href="/why-us"
              className="clean-surface inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 dark:text-white"
            >
              Why CodeFreed →
            </Link>
          </div>
        </div>

        <MarketingFooter />
      </section>
    </main>
  );
}
