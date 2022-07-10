module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['dist'],
  moduleNameMapper: {
    '^@web3-wallet/(.*)$': [
      '<rootDir>/packages/$1/src',
      '<rootDir>/connectors/$1/src',
    ],
  },
};
