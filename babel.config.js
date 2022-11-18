module.exports = (api) => {
  const isTest = api.env("test");
  return isTest
    ? { presets: ["next/babel", "@babel/preset-typescript"] }
    : {
        presets: [
          "next/babel",
          ["@babel/preset-env", { targets: { node: "16.13" } }],
          "@babel/preset-typescript",
        ],
      };
};
