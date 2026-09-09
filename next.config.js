// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
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
  output: "standalone",
  experimental: { instrumentationHook: true }, // remove on Next 15
};

module.exports = withSentryConfig(nextConfig, {
  org: "nyc-planning",
  project: "ds-equity-tool",
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
});
