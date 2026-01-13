/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig