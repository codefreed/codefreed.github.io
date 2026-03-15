import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-white/15 px-4 py-6">
        <div className="mx-auto w-full max-w-6xl">
          <MarketingHeader />
        </div>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <div>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Say hello</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Whether it's a bug, feedback, a question, or just an idea — we'd like to hear it.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <article className="glass rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Reach us by email</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
              Email us at{' '}
              <a className="text-cyan-600 dark:text-cyan-300" href="mailto:support@codefreed.app">
                support@codefreed.app
              </a>
              . We actually read it — no ticket system, no bot replies.
            </p>
          </article>

          <article className="glass rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">What we can help with</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
              <p>– Something's broken</p>
              <p>– Privacy or policy questions</p>
              <p>– Advertising inquiries</p>
              <p>– Feature ideas or feedback</p>
            </div>
          </article>
        </div>
        <div className="mx-auto mt-10 w-full max-w-6xl">
          <MarketingFooter />
        </div>
      </section>
    </main>
  );
}
