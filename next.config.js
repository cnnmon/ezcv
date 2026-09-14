/* eslint-disable no-param-reassign */
module.exports = {
  experimental: {
    esmExternals: 'loose',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.m?js$/,
      include:
        /node_modules\/(@convex-dev|convex|@auth|jose|oauth4webapi|lucia|@oslojs)/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['api.producthunt.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
