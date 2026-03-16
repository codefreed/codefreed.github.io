import type { Metadata } from 'next';
import { Bot, Box, FileUp, Layers3, Sparkles, Wand2 } from 'lucide-react';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Models and Selector | CodeFreed',
  description: 'See which AI models CodeFreed supports, how the model selector works, and what the builder AI is designed to do.',
  path: '/ai'
});

const modelCards = [
  {
    title: 'GPT-4.1',
    copy: 'The default model for the builder right now. It is a strong balance for day-to-day site generation, edits, and structured code updates.',
    icon: Bot
  },
  {
    title: 'GPT-5',
    copy: 'Available in the selector when you want a stronger model for bigger design jumps, more involved editing, and more ambitious prompt handling.',
    icon: Sparkles
  },
  {
    title: 'Gemini 2.5 Flash',
    copy: 'Available as an additional model option when you add your Gemini key. It gives you another fast path for generation inside the same workspace.',
    icon: Wand2
  }
];

const featureCards = [
  {
    title: 'AI Selector',
    copy: 'Switch models directly from the chat composer with the cube selector so you can choose the right model without leaving the workflow.',
    icon: Box
  },
  {
    title: 'Long Prompt Support',
    copy: 'The builder is designed for more than one-sentence prompts. You can describe style, structure, pages, interactions, and revisions in one request.',
    icon: Layers3
  },
  {
    title: 'Reference Uploads',
    copy: 'Attach files and references so the AI has more context when it edits your website, updates sections, or follows an existing visual direction.',
    icon: FileUp
  }
];

const useCases = [
  'Generate a full landing page from a simple product idea.',
  'Revise copy, layout, and styling without opening every file manually.',
  'Create a website foundation, then keep iterating through chat.',
  'Switch models depending on whether you want speed or a stronger creative pass.',
  'Use your own Firebase setup and keep moving toward a deployable project.'
];

export default function AiPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-6xl">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">CodeFreed AI</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">AI models, selector, and generation workflow</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              CodeFreed is built around a real AI editing workflow: choose a model, describe what you want, attach references,
              and keep refining the site as the project grows.
            </p>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {modelCards.map((card) => (
            <article key={card.title} className="glass rounded-3xl p-6 md:p-7">
              <card.icon className="h-5 w-5 text-cyan-500" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{card.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">{card.copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {featureCards.map((card) => (
            <article key={card.title} className="glass rounded-3xl p-6 md:p-7">
              <card.icon className="h-5 w-5 text-cyan-500" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{card.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">{card.copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 glass rounded-3xl p-6 md:p-7">
          <p className="text-sm uppercase tracking-wide text-cyan-500">Use Cases</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">What the AI is good for</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {useCases.map((item) => (
              <div key={item} className="glass rounded-2xl p-4 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
                {item}
              </div>
            ))}
          </div>
        </section>
        <MarketingFooter />
      </section>
    </main>
  );
}
