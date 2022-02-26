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
    ntaLayer: "dcp_nta_2010",
  },
};
