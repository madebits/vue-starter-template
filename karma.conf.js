var path = require('path')
var webpackConfig = require('./webpack.config.js')({ 'build-test': true })
if (!process.env.CHROME_BIN) {
  process.env.CHROME_BIN = require('puppeteer').executablePath()
}
process.env.NODE_ENV = 'test'

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: ['./src/vendor/index.js', 'test.bundle.js'],

    preprocessors: {
      './src/vendor/index.js': ['webpack', 'sourcemap'],
      'test.bundle.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha', 'html', 'coverage'],

    coverageReporter: {
      dir: 'testresults/coverage/',
      reporters: [{ type: 'text-summary' }, { type: 'html' }]
    },

    htmlReporter: {
      outputDir: 'testresults/Reports/',
      namedFiles: true,
      reportName: 'jstest-1',
      pageTitle: 'JsTest'
    },

    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['ChromeHeadless'],

    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    }
  })
}
