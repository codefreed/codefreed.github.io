import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogSubmitForm } from '@/components/marketing/blog-submit-form';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { getAllBlogPosts } from '@/lib/content/blog';
import { buildPageMetadata } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog | CodeFreed',
  description: 'Read articles from CodeFreed and submit your own article for review on AI website builders, no-code tools, and web development.',
  path: '/blog'
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-6xl">
        <MarketingHeader />
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">CodeFreed Blog</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">
            Articles for people building with AI on the web
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300 md:text-lg">
            The blog now accepts community submissions too. Every outside article is filtered before publication, so only approved posts
            show up in the public feed.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5">
            {posts.map((post) => (
              <article key={post.slug} className="glass rounded-3xl p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                  <span>{post.category}</span>
                  <span className="text-slate-400">•</span>
                  <span>{post.publishedAt}</span>
                  <span className="text-slate-400">•</span>
                  <span>{post.author}</span>
                  <span className="text-slate-400">•</span>
                  <span>{post.source === 'community' ? 'Community post' : 'Editorial'}</span>
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{post.title}</h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">{post.description}</p>
                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
                  {post.sections[0]?.paragraphs[0]}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#26c6f9,#ff8a1a)] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Read article
                </Link>
              </article>
            ))}
          </div>

          <aside className="glass rounded-3xl p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">Submit an article</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Want to contribute?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
              You can submit articles about AI website builders, no-code tools, design workflows, or web development tips. Every
              submission is reviewed before it goes live, and low-quality or spammy articles stay filtered out.
            </p>
            <div className="mt-6">
              <BlogSubmitForm />
            </div>
          </aside>
        </div>
        <MarketingFooter />
      </section>
    </main>
  );
}
