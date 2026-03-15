import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';

const faqs = [
  {
    question: 'What actually is CodeFreed?',
    answer: 'It\'s an AI website builder. You describe what you want, it generates a real working site, and you keep refining it through chat until it\'s right. The files are yours to export or deploy.'
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'No. If you can describe what you want, you can build with CodeFreed. That said, if you do know how to code, you can drop into IDE mode and edit the files directly.'
  },
  {
    question: 'Can I export my project?',
    answer: 'Yes. Download a zip of your project files and take them anywhere — hand them to a developer, open them in VS Code, or deploy them yourself.'
  },
  {
    question: 'Can I see the site before publishing?',
    answer: 'Yes. There\'s a live preview built into the editor. You can watch changes happen as you chat with the AI.'
  },
  {
    question: 'Is it really free?',
    answer: 'Yes. No card required, no trial period. We want people to actually use it before we think about what paid plans might look like.'
  },
  {
    question: 'Which AI models does it use?',
    answer: 'You can pick from GPT-4.1, GPT-5, and Gemini right inside the builder. Switch between them anytime depending on what gives better results for your project.'
  }
];

export default function FaqPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-5xl">
        <MarketingHeader />
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Questions we get a lot</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Straight answers about how CodeFreed works.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="glass rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{faq.question}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
            </article>
          ))}
        </div>
        <MarketingFooter />
      </section>
    </main>
  );
}
