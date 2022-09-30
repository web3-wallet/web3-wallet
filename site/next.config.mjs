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
    // https://webpack.js.org/configuration/resolve/#resolvefallback
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'utf-8-validate': false,
      bufferutil: false,
    };
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
    return config;
  },
  /**
   * Tell Next.js where the `public` folder is.
   * Replace `nextjs-github-pages` with your Github repo project name.
   */
  assetPrefix: process.env.IS_LOCAL ? '' : '/web3-wallet/',
};

export default nextConfig;
