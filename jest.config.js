module.exports = {
    // ...otras configuraciones...
    collectCoverage: true,
    collectCoverageFrom: [
      'app.js',
    ],
    coverageReporters: ['text', 'lcov'],
  };
