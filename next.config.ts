import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tvmaze.com',
      },
    ],
  },
};

export default nextConfig;
