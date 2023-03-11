/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['test-samybread.myshopify.com', 'cdn.shopify.com'],
  },
}

module.exports = nextConfig;

