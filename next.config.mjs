const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStaticExport ? 'export' : undefined,
  images: {
    unoptimized: isStaticExport
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
};

export default nextConfig;
