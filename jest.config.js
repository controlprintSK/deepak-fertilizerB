const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  restoreMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "clover", "html"],
  coveragePathIgnorePatterns: [
    "<rootDir>/app/",
    "<rootDir>/config/",
    "<rootDir>/jest.setup.js",
  ],

  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/app/components/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^@/store/(.*)$": "<rootDir>/src/store/$1",
    "^@/redux/(.*)$": "<rootDir>/src/redux/$1",
    "^@/constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@/crashHandling/(.*)$": "<rootDir>/src/crashHandling/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/images/(.*)$": "<rootDir>/src/public/images/$1",
    "^@/api/(.*)$": "<rootDir>/src/app/api/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};

module.exports = createJestConfig(customJestConfig);
