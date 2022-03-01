module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/map/datatool/district",
        permanent: true,
      },
    ];
  },
  env: {
    NTA_LAYER: "dcp_nta_2010",
  },
};
