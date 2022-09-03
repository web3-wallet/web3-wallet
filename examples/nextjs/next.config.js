/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    infuraKey: process.env.INFURA_KEY,
    alchemyKey: process.env.ALCHEMY_KEY,
  },
  webpack(config) {
    // walletconnect
    // https://webpack.js.org/configuration/resolve/#resolvefallback
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'utf-8-validate': false,
      bufferutil: false,
    };
    return config;
  },
};

module.exports = nextConfig;
