/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  poweredByHeader: false,
  generateEtags: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.ouorz.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig