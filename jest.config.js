module.exports = {
  verbose: true,
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.+)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  coverageReporters: ['lcov'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: ['src/**/*.ts', '!jest.config.js', '!.eslint.js', '!**/coverage/**', '!**/node_modules/**', '!**/test/**'],
  coverageDirectory: 'coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'Integgration tests',
        outputName: 'junit-report.xml',
        outputDirectory: 'coverage',
        classNameTemplate: '{title}',
        titleTemplate: '{classname}',
        ancestorSeparator: '    |>>>>>    ',
      },
    ],
  ],
};
