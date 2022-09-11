/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    loader: 'akamai',
    path: '',
  },
}

module.exports = nextConfig
