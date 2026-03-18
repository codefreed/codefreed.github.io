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
    copy: 'Describe what you want in plain English. CodeFreed generates real working files — not a screenshot, not a mockup, an actual site.',
    icon: Wand2
  },
  {
    title: 'Keep refining with chat',
    copy: 'Not satisfied with a section? Just say what you\'d change. You can keep going back and forth until it\'s right.',
    icon: Bot
  },
  {
    title: 'Preview and code side by side',
    copy: 'Switch between the live preview and the code editor whenever you want. You\'re never locked into one view.',
    icon: MonitorSmartphone
  },
  {
    title: 'Your files, your project',
    copy: 'Everything generates into real files you own. Export them, edit them manually, or keep building inside CodeFreed.',
    icon: FileCode2
  },
  {
    title: 'Give it more context',
    copy: 'Upload a reference file, a design, or existing code. The AI uses it to make better edits instead of guessing.',
    icon: UploadCloud
  },
  {
    title: 'Ship when you\'re ready',
    copy: 'Export a zip or deploy to Vercel. The path from draft to live site doesn\'t require jumping between a dozen tools.',
    icon: Rocket
  },
  {
    title: 'Prompt Lab',
    copy:
      'Start with a guided prompt-builder flow that asks what type of website you want, which features matter, and what style direction fits best. Then chat with AI to improve the prompt before you ever generate the site.',
    icon: Sparkles
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
              Built for the whole process — from the first idea to a deployed site — not just the first generation.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="glass rounded-3xl p-6">
              <feature.icon className="h-5 w-5 text-cyan-500" />
              <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{feature.copy}</p>
            </article>
          ))}
        </div>
        <MarketingFooter />
      </section>
    </main>
  );
}
