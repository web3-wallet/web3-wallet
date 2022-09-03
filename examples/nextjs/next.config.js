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
  /**
   * Tell Next.js where the `public` folder is.
   * Replace `nextjs-github-pages` with your Github repo project name.
   */
  assetPrefix: process.env.IS_LOCAL ? '' : '/web3-wallet/',
};

module.exports = nextConfig;
