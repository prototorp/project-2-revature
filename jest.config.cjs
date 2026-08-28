module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: [
    "<rootDir>/src/test/setup.ts",
  ],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};