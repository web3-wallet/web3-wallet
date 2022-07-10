module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['dist'],
  moduleNameMapper: {
    '^@vvswallet/(.*)$': [
      '<rootDir>/packages/$1/src',
      '<rootDir>/connectors/$1/src',
    ],
  },
};
