const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', 
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', 
    '!src/**/*.d.ts',
    '!src/app/layout.tsx', 
    '!src/app/globals.css',
    '!src/store/index.ts',
    '!src/types/index.ts',
    '!src/__tests__/**', 
  ],
  coverageProvider: 'v8',
}

module.exports = createJestConfig(customJestConfig);