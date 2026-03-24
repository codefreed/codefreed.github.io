import Link from 'next/link';
import type { Metadata } from 'next';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'Pricing | CodeFreed',
  description: 'See CodeFreed pricing details and learn why the AI website builder is completely free to use right now.',
  path: '/pricing'
});

const freePlanItems = [
  {
    feature: 'Full AI website builder',
    detail: 'Generate complete websites from plain-English prompts using GPT-4.1, GPT-5, or Gemini. No limitations on the number of projects you can start or the number of prompts you can send.'
  },
  {
    feature: 'Prompt Lab',
    detail: 'The guided prompt-building flow that walks you through selecting a site type, features, and visual direction before generation starts. Helps you write a stronger brief so the first draft is closer to what you actually want.'
  },
  {
    feature: 'Live preview',
    detail: 'See your site render in real time as you chat and edit. The preview panel stays open beside the editor so you never have to guess what a change will look like before you commit to it.'
  },
  {
    feature: 'Chat-based refinement',
    detail: 'Keep improving the same project across multiple sessions. Ask for changes to specific sections, request new content, or adjust the tone and layout — all without losing what you already built.'
  },
  {
    feature: 'IDE-style code editor',
    detail: 'Access the underlying files directly when you want more control. Edit HTML, CSS, and JavaScript manually alongside AI-generated output. The two approaches work together rather than competing.'
  },
  {
    feature: 'Reference file uploads',
    detail: 'Upload design files, brand documents, or existing code as context for the AI. This significantly improves consistency when you already have an established style and want new pages to match it.'
  },
  {
    feature: 'Export project files',
    detail: 'Download the full project as a zip at any time. Your files are yours — no proprietary format, no platform lock-in, no permission required to take them somewhere else.'
  },
  {
    feature: 'Deploy to Vercel',
    detail: 'Push directly from the builder to a live Vercel URL without leaving the workspace. The deployment helper removes the friction between a finished draft and a publicly accessible site.'
  }
];

const whyFreeReasons = [
  {
    heading: 'We want real feedback first',
    body: 'CodeFreed is still a young product. Making it free lets more people actually use it, which gives us better signal about what works and what needs improvement. Paid barriers at this stage would reduce the volume of real-world usage we need to make the product better.'
  },
  {
    heading: 'The comparison should be obvious',
    body: 'Most competitors charge before you have had a chance to evaluate whether their workflow actually fits your project. We think the right order is: try it, build something real with it, decide if it is worth paying for later. Not the other way around.'
  },
  {
    heading: 'Launching should not cost money to attempt',
    body: 'Many of the people who need a fast, capable website builder are founders validating ideas or creators testing a new project. Charging upfront adds friction at the worst possible moment — before they know if the idea is worth pursuing. Free access removes that friction entirely.'
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-[1600px]">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Pricing</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              CodeFreed is completely free right now — no credit card, no trial period, no usage caps on the core builder. We want people to use it, build real things with it, and tell us what makes it more useful before we introduce any paid plans.
            </p>
          </div>
          <Link
            href="/app"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Start building free
          </Link>
        </div>

        <article className="glass rounded-3xl p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-medium text-cyan-500 uppercase tracking-[0.18em]">Current plan</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Everything, free</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">No credit card. No trial. No expiry date.</p>
            </div>
            <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(38,198,249,0.12),rgba(255,138,26,0.14))] px-5 py-4 text-center">
              <p className="text-3xl font-black text-slate-900 dark:text-white">$0</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">per month, right now</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {freePlanItems.map((item) => (
              <div key={item.feature} className="glass rounded-2xl p-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.feature}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="mt-6 glass rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Why it is free</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
            Free access is a deliberate choice, not a temporary promotion. Here is the thinking behind it:
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {whyFreeReasons.map((reason) => (
              <div key={reason.heading} className="glass rounded-2xl p-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">{reason.heading}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{reason.body}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="mt-6 glass rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">What about the future?</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
            At some point CodeFreed will likely have paid plans. When that happens, we expect them to be usage-based or feature-tiered rather than a blanket paywall — meaning the core builder workflow will remain accessible to people testing ideas or working on smaller projects. What might sit behind a paid tier in the future includes things like team collaboration, advanced version history, priority model access, and custom deployment configurations.
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
            Nothing in that direction has been announced yet. For now, everything described on this page is fully free, and that will not change without clear communication well in advance. If you are making a decision based on current pricing, the answer is: free, no card required, no expiry.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/faq"
              className="clean-surface inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 dark:text-white"
            >
              Read the FAQ →
            </Link>
            <Link
              href="/features"
              className="clean-surface inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-slate-900 transition-all hover:-translate-y-0.5 dark:text-white"
            >
              See all features →
            </Link>
          </div>
        </article>

        <MarketingFooter />
      </section>
    </main>
  );
}
