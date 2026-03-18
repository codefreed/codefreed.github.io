import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MarketingFooter, MarketingHeader } from '@/components/layout/marketing-chrome';
import { editorialBlogPosts, getBlogPost } from '@/lib/content/blog';
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

  return (
    <main className="min-h-screen px-4 py-8">
      <article className="mx-auto w-full max-w-4xl">
        <MarketingHeader />
        <header className="glass rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
            <span>{post.category}</span>
            <span className="text-slate-400">•</span>
            <span>{post.publishedAt}</span>
            <span className="text-slate-400">•</span>
            <span>{post.author}</span>
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
        <MarketingFooter />
      </article>
    </main>
  );
}
