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
};
