import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8">
      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">CodeFreed</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Contact</h1>
          </div>
          <Link href="/" className="text-sm text-cyan-600 dark:text-cyan-300">
            Back to home
          </Link>
        </div>

        <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
          For questions about CodeFreed, privacy, advertising, or site policies, please contact us by email at{' '}
          <a className="text-cyan-600 dark:text-cyan-300" href="mailto:support@codefreed.app">
            support@codefreed.app
          </a>
          .
        </p>
      </div>
    </main>
  );
}
