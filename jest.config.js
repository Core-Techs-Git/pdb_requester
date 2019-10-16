module.exports = {
  verbose: true,
  testMatch: ['**/*.test.js'],
  coverageReporters: ['lcov'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.js', '!jest.config.js', '!**/coverage/**', '!**/node_modules/**', '!**/test/**', '!**/src/**'],
  coverageDirectory: 'coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'pdb_requester tests',
        outputName: 'junit-report.xml',
        outputDirectory: 'coverage',
        classNameTemplate: '{title}',
        titleTemplate: '{classname}',
        ancestorSeparator: '    |>>>>>    ',
      },
    ],
  ],
};
