import Link from 'next/link';

const faqs = [
  {
    question: 'What is CodeFreed?',
    answer: 'CodeFreed is a free AI website generator that helps people create, edit, and launch websites faster.'
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'No. CodeFreed is designed to make website creation easier for beginners while still being useful to more technical users.'
  },
  {
    question: 'Can I export my project?',
    answer: 'Yes. You can export your project files and continue working with them outside the builder.'
  },
  {
    question: 'Can I preview the site before publishing?',
    answer: 'Yes. CodeFreed includes a live preview workflow so you can inspect the site as you iterate.'
  },
  {
    question: 'Is CodeFreed free to use?',
    answer: 'The core product is positioned as free to use, with room for future upgrades as the platform evolves.'
  }
];

export default function FaqPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">CodeFreed</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">FAQ</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Quick answers about how CodeFreed works and what you can do with it.
            </p>
          </div>
          <Link href="/" className="text-sm text-cyan-600 dark:text-cyan-300">
            Back to home
          </Link>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="glass rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{faq.question}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
