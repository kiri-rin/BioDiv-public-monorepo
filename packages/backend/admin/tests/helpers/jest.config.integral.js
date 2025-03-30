/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testPathIgnorePatterns: ["/node_modules/", ".tmp", ".cache"],
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      { tsconfig: "./tests/helpers/ts-jest.tsconfig.json" },
    ],
  },
  testEnvironment: "./tests/helpers/jest.environment.integral.js",
  testMatch: ["**/?(*.)+(integral.test).[jt]s?(x)"],
  rootDir: "../../",
};
