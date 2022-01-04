module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/map?geography=census",
        permanent: true,
      },
    ];
  },
};
