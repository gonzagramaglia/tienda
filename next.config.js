const isGithubActions = process.env.GITHUB_ACTIONS || false
let basePath = ''
let assetPrefix = ''

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || 'tienda'
  basePath = `/${repo}`
  assetPrefix = `/${repo}/`
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || basePath,
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || assetPrefix,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
