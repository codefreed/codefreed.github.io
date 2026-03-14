import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://codefreed.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/app/settings`,
      lastModified: new Date()
    }
  ];
}
