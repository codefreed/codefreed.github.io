import type { Metadata } from 'next';
import { ContactForm } from '@/components/marketing/contact-form';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata, SUPPORT_EMAIL } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact | CodeFreed',
  description: 'Contact CodeFreed with questions, feedback, advertising inquiries, or support requests through the site email form.',
  path: '/contact'
});

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
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Send a message</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
              Use the form below to open a pre-filled email draft, or write to us directly at{' '}
              <a className="text-cyan-600 dark:text-cyan-300" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              . We actually read it, whether the message is a bug report, a partnership request, or a question about the product.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </article>

          <article className="glass rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">What we can help with</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200 md:text-base">
              <p>– Something is broken in the builder or preview</p>
              <p>– Privacy, policy, or AdSense review questions</p>
              <p>– Advertising or partnership inquiries</p>
              <p>– Feature ideas, missing workflows, or product feedback</p>
              <p>– Questions about exports, deployment, or Firebase setup</p>
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
