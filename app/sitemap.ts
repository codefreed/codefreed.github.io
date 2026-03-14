import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://codefreed.vercel.app';
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/features',
    '/api',
    '/pricing',
    '/faq',
    '/login',
    '/app/settings'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
