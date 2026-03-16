import type { Metadata } from 'next';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'Pricing | CodeFreed',
  description: 'See CodeFreed pricing details and learn why the AI website builder is completely free to use right now.',
  path: '/pricing'
});

const plans = [
  {
    name: 'Free',
    headline: 'Everything you need to start building',
    note: 'No credit card. No trial. Just free.',
    bullets: [
      'Full AI website builder',
      'Live preview while you edit',
      'Export your project files anytime',
      'Deploy to Vercel or download a zip'
    ]
  },
  {
    name: 'Coming later',
    headline: 'More as the product grows',
    note: 'No timeline yet — we\'ll be upfront when that changes.',
    bullets: [
      'Higher generation limits',
      'More workflow tools',
      'Team and collaboration features',
      'Additional builder capabilities'
    ]
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-6xl">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Pricing</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Right now, CodeFreed is free. We want people to actually use it and tell us what's working before we talk about paid plans.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.name} className="glass rounded-3xl p-6 md:p-8">
              <p className="text-sm text-cyan-500">{plan.name}</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{plan.headline}</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{plan.note}</p>
              <div className="mt-6 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {plan.bullets.map((bullet) => (
                  <p key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 text-cyan-500">–</span>
                    {bullet}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
        <MarketingFooter />
      </section>
    </main>
  );
}
