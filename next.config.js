/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ppy.sh',
      },
    ],
    domains: ['osu.ppy.sh', 'a.ppy.sh'],
    disableStaticImages: false,
    loader: 'default',
    path: '',
  },
}

module.exports = nextConfig
