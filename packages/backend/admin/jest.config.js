/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testPathIgnorePatterns: ["/node_modules/", ".tmp", ".cache"],
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      { tsconfig: "./tests/helpers/ts-jest.tsconfig.json" },
    ],
  },
  moduleNameMapper: {
    "@rrrcn/services/src": "@rrrcn/services/dist/src",
    "@rrrcn/common-helpers/src": "@rrrcn/common/dist/src",
  },
  projects: [
    "./tests/helpers/jest.config.unit.js",
    "./tests/helpers/jest.config.integral.js",
  ],
};
