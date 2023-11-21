/** @type {import('ts-jest').JestConfigWithTsJest} */

const config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  }
};

module.exports = config;