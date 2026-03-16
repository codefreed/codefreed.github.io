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
      'The mission is simple: remove the dead time between inspiration and execution. If someone has an idea for a product page, portfolio, launch site, or experiment, they should be able to build momentum right away instead of getting trapped in tooling.'
    ]
  },
  {
    title: 'The story behind the product',
    body: [
      'CodeFreed was shaped by a common frustration: most website projects do not fail because the final polish is impossible, they fail because the first draft takes too long. By the time a person has picked tools, chosen a theme, made a layout plan, and written placeholder content, the energy behind the idea has already started to fade.',
      'That is where AI becomes genuinely useful. Instead of replacing human taste or technical skill, it can remove the slow and repetitive parts of getting started. CodeFreed was built around that belief, with a chat-first workflow that helps people create the first version quickly and then keep improving it instead of throwing it away.'
    ]
  },
  {
    title: 'What makes CodeFreed different',
    body: [
      'A lot of AI builders are optimized for a single impressive generation. CodeFreed is optimized for the reality that good websites usually come from iteration. You generate something, review it, ask for changes, compare versions, upload references, and keep refining the same project until it finally feels right.',
      'We also care about control. The site you build should not disappear behind a closed interface. That is why preview, file structure, exports, and configuration tools matter here. The goal is not just to impress you for thirty seconds. The goal is to help you produce a site you can actually keep working with.'
    ]
  },
  {
    title: 'Who it is for',
    body: [
      'CodeFreed is for founders validating ideas, creators who need a clean web presence, developers who want a faster starting point, and curious builders who like experimenting with AI-assisted workflows. Some users will stay in the no-code experience, while others will use it as the fastest path to editable project files.',
      'In every case, the aim is the same: reduce the barrier to shipping something real. If a website builder can save time without taking away ownership, it becomes useful to both beginners and technical users.'
    ]
  },
  {
    title: 'Still improving',
    body: [
      'CodeFreed is still evolving, and that is intentional. We are continuing to improve the builder, the content around it, and the quality of the generated output as more people use the product and show us where the workflow feels smooth or where it still needs work.',
      'If you have feedback, questions, or a request for a new capability, the Contact page is the best place to reach out. The product gets better when real builders tell us what would make it more useful.'
    ]
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-white/15 px-4 py-6">
        <div className="mx-auto w-full max-w-6xl">
          <MarketingHeader />
        </div>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <div>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">About CodeFreed</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              A free AI website builder made for people who want to go from idea to live site without the usual friction.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
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
        <div className="mx-auto mt-10 w-full max-w-6xl">
          <MarketingFooter />
        </div>
      </section>
    </main>
  );
}
