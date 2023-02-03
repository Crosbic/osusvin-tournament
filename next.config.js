/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    disableStaticImages: false,
    loader: 'default',
    path: '',
  },
}

module.exports = nextConfig
