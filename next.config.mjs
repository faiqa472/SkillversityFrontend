/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/outlines',
        destination: '/learning-paths',
        permanent: true,
      },
      {
        source: '/outlines/:path*',
        destination: '/learning-paths/:path*',
        permanent: true,
      },
      {
        source: '/outline/:path*',
        destination: '/learning-paths/:path*',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
};

export default nextConfig;
