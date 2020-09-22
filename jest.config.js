module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/test/**/*.ts"],
  testPathIgnorePatterns: ["test/monad.ts"]
};