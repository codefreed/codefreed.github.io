import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://codefreed.vercel.app';
  const routes = [
    '',
    '/ai',
    '/about',
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

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
