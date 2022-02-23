module.exports = {
  rootDir: "../",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@data/(.*)$": "<rootDir>/src/data/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@type/(.*)$": "<rootDir>/src/type/$1",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
  ],
};
