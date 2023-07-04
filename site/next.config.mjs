/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: '/web3-wallet',
  env: {
    infuraKey: process.env.INFURA_KEY,
    alchemyKey: process.env.ALCHEMY_KEY,
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  webpack(
    config,
    {
      buildId: _build,
      dev: _dev,
      isServer,
      defaultLoaders: _defaultLoaders,
      nextRuntime: _nextRuntime,
      webpack,
    },
  ) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __SERVER__: isServer,
        __CLIENT__: !isServer,
        __DEV__: process.env.NODE_ENV !== 'production',
        __BASE_PATH__: JSON.stringify(
          process.env.IS_LOCAL ? '' : '/web3-wallet',
        ),
      }),
    );

    // can't resolve modules with Next js
    // see: https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1487801131
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  /**
   * Tell Next.js where the `public` folder is.
   * Replace `nextjs-github-pages` with your Github repo project name.
   */
  assetPrefix: process.env.IS_LOCAL ? '' : '/web3-wallet/',
};

export default nextConfig;
