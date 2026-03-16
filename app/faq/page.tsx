import type { Metadata } from 'next';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'FAQ | CodeFreed',
  description: 'Get answers about CodeFreed pricing, privacy, exports, frameworks, AI models, and how the website builder works.',
  path: '/faq'
});

const faqs = [
  {
    question: 'What actually is CodeFreed?',
    answer:
      'CodeFreed is an AI website builder focused on helping people turn prompts into real web projects. You describe what you want, review a live draft, and keep refining the same project through chat until it is ready to export or deploy.'
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'No. If you can describe what you want, you can build with CodeFreed. If you do know how to code, the builder still gives you IDE-style editing and exports so you can step in manually whenever you want more control.'
  },
  {
    question: 'Can I export my project?',
    answer:
      'Yes. You can export your project files and keep them outside the platform. That makes it easier to open the project locally, hand it to a developer, or deploy it with your own hosting workflow.'
  },
  {
    question: 'Can I see the site before publishing?',
    answer:
      'Yes. There is a live preview built into the editor so you can compare your prompt, the generated result, and each revision without leaving the workspace. That helps you catch layout or messaging issues before you publish.'
  },
  {
    question: 'Is it really free?',
    answer:
      'Yes. CodeFreed is completely free to use right now, with no card required and no time-limited trial. The goal is to let people build and evaluate the workflow before any future pricing conversation exists.'
  },
  {
    question: 'Which AI models does it use?',
    answer:
      'You can pick from GPT-4.1, GPT-5, and Gemini right inside the builder. The selector exists so users can choose a model that matches the task, whether that means balanced editing, larger creative jumps, or another provider preference.'
  },
  {
    question: 'What frameworks or project styles does CodeFreed support?',
    answer:
      'CodeFreed is currently centered on website generation and front-end project structures that fit the builder preview and export flow. It is especially good for landing pages, marketing sites, portfolio layouts, and early frontend shells that can be refined over multiple passes.'
  },
  {
    question: 'Can I bring my own Firebase configuration?',
    answer:
      'Yes. The app includes a Firebase setup flow so you can add your own web config keys for generated projects. That is useful if you want the site you build to connect to your own authentication, Firestore, or storage setup instead of relying on a shared default.'
  },
  {
    question: 'How does CodeFreed handle privacy and user data?',
    answer:
      'CodeFreed includes a public privacy policy and trust pages that explain how site data may be handled, including cookies and advertising disclosures. As with any AI workflow, users should avoid sharing sensitive information they would not want processed by the service.'
  },
  {
    question: 'Can I use CodeFreed on a custom domain?',
    answer:
      'Yes, and if you plan to apply for AdSense you should use a real custom domain rather than a temporary preview subdomain. A custom domain makes the site look more established, helps with branding, and is a better fit for long-term publishing.'
  },
  {
    question: 'Does CodeFreed replace a developer?',
    answer:
      'No. It is best viewed as a speed tool that gets you to a strong starting point much faster. Developers still add value by reviewing structure, validating integrations, tightening quality, and handling the edge cases that always appear in real projects.'
  },
  {
    question: 'What should I review before deploying an AI-generated site?',
    answer:
      'You should review copy, links, responsiveness, legal pages, contact details, and any integrations such as forms or Firebase. AI can save a lot of time on the draft, but a human should still verify that the site is accurate and ready for real visitors.'
  },
  {
    question: 'Can I use CodeFreed for advertising or content sites?',
    answer:
      'Yes, but you should make sure the final site has enough original content, clear purpose, contact information, and policy pages before submitting it for ad review. Thin sites with only generated sections and little substance tend to have a harder time earning trust.'
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
