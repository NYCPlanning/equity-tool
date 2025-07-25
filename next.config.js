// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/map/data/district",
        permanent: true,
      },
      {
        source: "/map",
        destination: "/map/data/district",
        permanent: true,
      },
      {
        source: "/map/data",
        destination: "/map/data/district",
        permanent: true,
      },
      {
        source: "/map/drm",
        destination: "/map/drm/nta",
        permanent: true,
      },
    ];
  },
  env: {
    NTA_LAYER: "dcp_nta_2020",
    BOROUGH_LAYER: "dcp_borough_boundary",
    DOMAIN: "equitableexplorer.planninglabs.nyc",
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
