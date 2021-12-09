module.exports = {
  distDir: "build",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/nta",
        permanent: true,
      },
    ];
  },
};
