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
})

  
  module.exports = nextConfig;

