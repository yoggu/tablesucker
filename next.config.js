/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
}

module.exports = nextConfig
