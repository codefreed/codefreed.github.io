import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';

const plans = [
  {
    name: 'Free',
    headline: 'Start building at no cost',
    bullets: ['Use the AI builder', 'Preview and edit sites', 'Export project files', 'Launch your first drafts quickly']
  },
  {
    name: 'Future Pro',
    headline: 'Planned upgrades as the platform grows',
    bullets: ['Higher limits', 'More workflow tools', 'Expanded collaboration options', 'Additional builder features']
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-6xl">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">CodeFreed</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Pricing</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              CodeFreed is focused on making AI website creation accessible. The core experience is available for free.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.name} className="glass rounded-3xl p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-500">{plan.name}</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{plan.headline}</h2>
              <div className="mt-6 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {plan.bullets.map((bullet) => (
                  <p key={bullet}>{bullet}</p>
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
