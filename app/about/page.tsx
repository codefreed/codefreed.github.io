import Link from 'next/link';
import type { Metadata } from 'next';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'About | CodeFreed',
  description: 'Learn the mission behind CodeFreed, the story behind the product, and what makes this free AI website builder different.',
  path: '/about'
});

const sections = [
  {
    title: 'Our mission',
    body: [
      'CodeFreed exists to make website creation feel less expensive, less intimidating, and much more immediate. We want people to be able to go from a rough idea to a working website draft without needing a design team, a week of setup, or a paid plan just to get started.',
      'The mission is simple: remove the dead time between inspiration and execution. If someone has an idea for a product page, portfolio, launch site, or experiment, they should be able to build momentum right away instead of getting trapped in tooling. That is true whether they are a developer who wants a faster starting point or someone who has never written a line of HTML in their life.',
      'We measure success not by how impressive the first generated draft looks, but by how many of those drafts actually become finished, live websites. The whole product is oriented toward that outcome — getting from idea to real, deployed, useful site — rather than toward generating a compelling screenshot.'
    ]
  },
  {
    title: 'The problem we are solving',
    body: [
      'Most website projects do not fail because the final polish is impossible. They fail because the first draft takes too long. By the time someone has picked the right tools, decided on a theme, sketched a layout plan, and written placeholder copy, the energy behind the original idea has often started to fade. The window where motivation was high closes before the first real version is ready to review.',
      'This is especially true for non-developers. The combination of tools required to build a decent website from scratch — a design tool, a code editor, a hosting platform, a domain registrar, possibly a CMS — creates a setup burden that many people never make it past. And even for experienced developers, the early structural work of a new site is repetitive and slow: the same sections, the same component patterns, the same content placeholder decisions, over and over.',
      'AI can fix exactly this problem. Not by replacing human taste or judgment, but by compressing the time it takes to get from blank page to something worth reviewing. When the first version can be in front of people for feedback within a few minutes rather than a few days, the feedback loop tightens and the project gains the kind of momentum that carries it through to completion.'
    ]
  },
  {
    title: 'The story behind the product',
    body: [
      'CodeFreed was shaped by that frustration with slow starts. Too many good ideas were stalling at the "I need to build a website for this" stage — not because the websites were technically difficult, but because the process of assembling one from scratch was slow and discouraging enough to drain the original motivation before the first draft was even ready.',
      'The early version was an experiment: could a chat-based interface produce a usable website draft fast enough to change the feeling of starting? The answer was yes, but only if the output was genuinely editable and refinable rather than a one-shot curiosity. That insight drove the decision to build around iteration rather than generation — to make the tool most useful after the first draft, not just for producing it.',
      'What followed was a steady build-out of the workspace: live preview, IDE mode, file uploads, version management, deployment helpers, model switching. Each feature was added to answer a real gap in the workflow — something that users needed to keep moving toward a finished site rather than stalling after an impressive but immovable first output.'
    ]
  },
  {
    title: 'What makes CodeFreed different',
    body: [
      'A lot of AI builders are optimized for a single impressive generation. CodeFreed is optimized for the reality that good websites usually come from iteration. You generate something, review it, ask for changes, compare versions, upload references, and keep refining the same project until it finally feels right.',
      'The iterative workflow is the core differentiator. When you can keep refining through conversation, the project becomes more yours over time instead of feeling like a template someone else made. Each revision narrows the gap between what the AI produced and what you actually wanted. By the time you are ready to publish, the site often feels genuinely custom rather than generated.',
      'We also care about control in a specific way. The site you build should not disappear behind a closed interface. That is why preview, file structure, exports, and configuration tools matter here. The goal is not just to impress you for thirty seconds with a generated draft. The goal is to help you produce a site you can actually keep working with, own completely, and take wherever the project needs to go.'
    ]
  },
  {
    title: 'Who it is for',
    body: [
      'CodeFreed is for founders validating ideas, creators who need a clean web presence, developers who want a faster starting point, and curious builders who like experimenting with AI-assisted workflows. Some users will stay in the no-code experience throughout the whole project. Others will use it as the fastest path to editable project files that they can then refine in their own development environment.',
      'The product works best for people building marketing sites, landing pages, portfolios, waitlist pages, product launch sites, and MVP frontends. Those are the use cases where speed matters most and where the value of a strong AI-generated first draft is highest. If your project falls outside that space — a complex database-backed app, a custom e-commerce integration, a highly interactive web product — CodeFreed may still be useful for the marketing layer, but it is not designed to replace a full development workflow.',
      'In every case, the aim is the same: reduce the barrier to shipping something real. If a website builder can save time without taking away ownership, it becomes useful to both beginners and technical users — and that broad usefulness is what we are working toward.'
    ]
  },
  {
    title: 'Still improving',
    body: [
      'CodeFreed is still evolving, and that is intentional. We are continuing to improve the builder, the content around it, and the quality of the generated output as more people use the product and show us where the workflow feels smooth or where it still needs work. Some features that are already on the roadmap include better team collaboration, richer export configurations, and improved handling of complex multi-page projects.',
      'The feedback loop between real users and the product is the most important thing driving improvements right now. When someone builds something with CodeFreed and tells us that a particular step was confusing or that a particular feature was missing at exactly the wrong moment, that information directly shapes what gets built next.',
      'If you have feedback, questions, or a request for a new capability, the Contact page is the best place to reach out. The product gets better when real builders tell us what would make it more useful, and every piece of genuine feedback gets read and considered.'
    ]
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-white/15 px-4 py-6">
        <div className="mx-auto w-full max-w-[1600px]">
          <MarketingHeader />
        </div>
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3">
          <div>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">About CodeFreed</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              A free AI website builder made for people who want to go from idea to live site without the usual friction. Here is the origin, mission, and thinking behind it.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-[1600px] gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="glass rounded-3xl p-6 md:p-7">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1600px] glass rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Keep exploring</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Learn more about what CodeFreed does, read the blog, or jump straight into the builder.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/features"
              className="clean-surface inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 dark:text-white"
            >
              See all features →
            </Link>
            <Link
              href="/blog"
              className="clean-surface inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 dark:text-white"
            >
              Read the blog →
            </Link>
            <Link
              href="/app"
              className="inline-flex h-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Try the builder free →
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[1600px]">
          <MarketingFooter />
        </div>
      </section>
    </main>
  );
}
