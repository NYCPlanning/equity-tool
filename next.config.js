module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/nta",
        permanent: false,
      },
    ];
  },
};
