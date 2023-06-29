/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')

const nextConfig = nextTranslate({
  trailingSlash: true,
  reactStrictMode: true,
})

module.exports = nextConfig
