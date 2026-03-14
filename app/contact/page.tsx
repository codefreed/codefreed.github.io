import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-white/15 px-4 py-6">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">CodeFreed</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Contact</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Questions, feedback, advertising inquiries, or product ideas are welcome.
            </p>
          </div>
          <Link href="/" className="text-sm text-cyan-600 dark:text-cyan-300">
            Back to home
          </Link>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <article className="glass rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Get in Touch</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
              For questions about CodeFreed, privacy, advertising, or site policies, please contact us by email at{' '}
              <a className="text-cyan-600 dark:text-cyan-300" href="mailto:support@codefreed.app">
                support@codefreed.app
              </a>
              .
            </p>
          </article>

          <article className="glass rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Response Topics</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
              <p>General support</p>
              <p>Privacy and policy questions</p>
              <p>Advertising and AdSense-related inquiries</p>
              <p>Feedback and feature suggestions</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
