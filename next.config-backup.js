/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGODB_URI: "YOUR MONGODB URI HERE",
    COOKIE_SECRET: "32 character string",
  },
};

module.exports = nextConfig;
