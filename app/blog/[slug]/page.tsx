import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { editorialBlogPosts, estimateReadingTime, getBlogPost } from '@/lib/content/blog';
import { buildPageMetadata } from '@/lib/site-config';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return editorialBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return buildPageMetadata({
      title: 'Article Not Found | CodeFreed',
      description: 'The requested blog article could not be found.',
      path: '/blog'
    });
  }

  return buildPageMetadata({
    title: `${post.title} | CodeFreed`,
    description: post.description,
    path: `/blog/${post.slug}`
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = estimateReadingTime(post);

  const relatedLinks = [
    { href: '/features', label: 'Explore all features' },
    { href: '/blog', label: 'Read more articles' },
    { href: '/app', label: 'Try the builder free' },
  ];

  return (
    <main className="min-h-screen px-4 py-8">
      <article className="mx-auto w-full max-w-[1600px]">
        <MarketingHeader />
        <header className="glass rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
            <span>{post.category}</span>
            <span className="text-slate-400">•</span>
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span className="text-slate-400">•</span>
            <span>{post.author}</span>
            <span className="text-slate-400">•</span>
            <span>{readingTime} min read</span>
            <span className="text-slate-400">•</span>
            <span>{post.source === 'community' ? 'Community post' : 'Editorial'}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300 md:text-lg">{post.description}</p>
        </header>

        <div className="mt-6 space-y-6">
          {post.sections.map((section) => (
            <section key={section.heading} className="glass rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-sm leading-8 text-slate-700 dark:text-slate-300 md:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-6 glass rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Continue reading</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">More from the CodeFreed blog and product.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="clean-surface inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium text-slate-800 transition-all hover:-translate-y-0.5 dark:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <MarketingFooter />
      </article>
    </main>
  );
}
