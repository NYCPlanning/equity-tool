/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  rootDir: "../",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
  ],
};
