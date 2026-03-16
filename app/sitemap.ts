import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/content/blog';
import { SITE_URL } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/ai',
    '/about',
    '/blog',
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
    ...blogPosts.map((post) => `/blog/${post.slug}`)
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified: new Date()
  }));
}
