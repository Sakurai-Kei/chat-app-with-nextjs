// /** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

const nextConfig = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    cacheStartUrl: true,
    dynamicStartUrl: true,
    dynamicStartUrlRedirect: true
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.imgur.com', 'chat-app-with-nextjs.s3.ap-southeast-1.amazonaws.com'],
    formats: ['image/avif', 'image/webp']
  },
})

  
  module.exports = nextConfig;

