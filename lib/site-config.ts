import type { Metadata } from 'next';

export const SITE_NAME = 'CodeFreed';
export const DEFAULT_SITE_URL = 'https://codefreed.vercel.app';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
export const SUPPORT_EMAIL = 'support@codefreed.app';
export const ADSENSE_CUSTOM_DOMAIN_NOTICE =
  'Before applying for Google AdSense, deploy CodeFreed on your own custom domain. Do not submit a vercel.app preview or temporary subdomain for review.';

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function buildPageMetadata({ title, description, path = '/' }: MetadataInput): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: SITE_NAME
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
