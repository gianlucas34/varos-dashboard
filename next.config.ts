import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/**/*': ['./prisma/generated/**/*'],
    '/*': ['./prisma/generated/**/*'],
  },
}

export default nextConfig
