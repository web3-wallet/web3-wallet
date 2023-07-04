/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    infuraKey: process.env.INFURA_KEY,
    alchemyKey: process.env.ALCHEMY_KEY,
  },
  webpack(config) {
    // can't resolve modules with Next js
    // see: https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1487801131
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = nextConfig;
