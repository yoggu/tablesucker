/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: cacheComponents disabled for now - requires wrapping dynamic data access in Suspense
  // cacheComponents: true,

  // Enable React Compiler (stable in Next.js 16)
  reactCompiler: true,

  // Experimental features
  experimental: {
    // Server Actions config
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },

  // Logging config
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig
