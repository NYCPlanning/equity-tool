module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/map/datatool/census",
        permanent: true,
      },
    ];
  },
};
