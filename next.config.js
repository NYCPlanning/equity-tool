module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/map/datatool/district",
        permanent: true,
      },
      {
        source: "/map",
        destination: "/map/datatool/district",
        permanent: true,
      },
      {
        source: "/map/datatool",
        destination: "/map/datatool/district",
        permanent: true,
      },
      {
        source: "/map/dri",
        destination: "/map/dri/nta",
        permanent: true,
      },
    ];
  },
  env: {
    NTA_LAYER: "dcp_nta_2010",
    BOROUGH_LAYER: "dcp_borough_boundary",
  },
};
