import type { Metadata } from 'next';
import { BlogSubmitForm } from '@/components/marketing/blog-submit-form';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { buildPageMetadata } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: 'Post Article | CodeFreed',
  description: 'Submit an article to the CodeFreed blog for manual review and filtering before publication.',
  path: '/blog/submit'
});

export default function BlogSubmitPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-[1600px]">
        <MarketingHeader />
        <div className="glass rounded-[2rem] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">Community Publishing</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">Post an article</h1>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300 md:text-lg">
            Submit a full article about AI website builders, no-code tools, design workflow, or practical web development. Every article
            is filtered before publication, so it stays private until approved.
          </p>

          <div className="mt-6 rounded-2xl bg-cyan-500/10 px-4 py-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
            Aim for an original article with real substance. Short, spammy, or off-topic submissions are automatically flagged and will
            not appear publicly unless they are approved.
          </div>

          <div className="mt-8">
            <BlogSubmitForm />
          </div>
        </div>
        <MarketingFooter />
      </section>
    </main>
  );
}
