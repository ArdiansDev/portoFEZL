const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  webpack: (config) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    return config;
  },
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      'absolute-mvp-prod.s3.amazonaws.com',
      'absolute-mvp-staging.s3.amazonaws.com',
      'images.unsplash.com',
      's3.amazonaws.com',
      'api.acdevelopment.tech',
      'localhost',
      'localhost:3000',
      'absolute-mvp-staging.s3.us-east-1.amazonaws.com',
      's3.us-west-2.amazonaws.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/cas/serviceValidate',
        destination: '/api/cas/serviceValidate',
      },
      {
        source: '/cas/login',
        destination: '/login',
      },
      {
        source: '/cas/logout',
        destination: '/login',
      },
      {
        source: '/logout',
        destination: '/login',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
      {
        source: '/admin',
        destination: '/admin/usage-completion',
        permanent: false,
      },
    ]
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);

