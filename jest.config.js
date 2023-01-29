module.exports = {
  cacheDirectory: './jest-cache',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  verbose: true
};
