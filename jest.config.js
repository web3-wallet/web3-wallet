module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['dist'],
  testMatch: ['<rootDir>/packages/**/*.spec.[jt]s?(x)'],
  moduleNameMapper: {
    '^@web3-wallet/(.*)$': [
      '<rootDir>/packages/$1/src',
      '<rootDir>/connectors/$1/src',
    ],
  },
};
