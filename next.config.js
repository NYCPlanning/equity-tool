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
};

module.exports = nextConfig;
