import type { MetadataRoute } from 'next';
import { editorialBlogPosts, getApprovedCommunityPosts } from '@/lib/content/blog';
import { SITE_URL } from '@/lib/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const communityPosts = await getApprovedCommunityPosts();
  const staticRoutes = [
    '/',
    '/ai',
    '/about',
    '/blog',
    '/blog/submit',
    '/contact',
    '/why-us',
    '/privacy',
    '/terms',
    '/features',
    '/api',
    '/pricing',
    '/faq',
    '/login',
    '/app/settings'
  ];
  const routes = [
    ...staticRoutes,
    ...editorialBlogPosts.map((post) => `/blog/${post.slug}`),
    ...communityPosts.map((post) => `/blog/${post.slug}`)
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified: new Date()
  }));
}
