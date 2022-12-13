const withTM = require('next-transpile-modules')(['ui'])
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(withTM({
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
    unoptimized: true,
  },
}))
