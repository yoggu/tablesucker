/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Cache Components (allows "use cache" directive)
  cacheComponents: true,

  // Enable React Compiler (stable in Next.js 16)
  reactCompiler: true,

  // Experimental features
  experimental: {
    // Server Actions config
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
}

module.exports = nextConfig
