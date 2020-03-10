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
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
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
