module.exports = {
    // ...otras configuraciones...
    collectCoverage: true,
    collectCoverageFrom: [
      'src/routers/*.js',
    ],
    coverageReporters: ['text', 'lcov'],
  };
