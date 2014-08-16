// Karma configuration
// Generated on Mon Jun 16 2014 11:46:17 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'requirejs'],

    /*
    http://stackoverflow.com/questions/20570301/typeerror-undefined-is-not-a-function-evaluating-sinon-spy
    "sinon/lib/sinon.js",
"sinon/lib/sinon/spy.js",
"sinon/lib/sinon/call.js",
"sinon/lib/sinon/behavior.js",
"sinon/lib/sinon/stub.js",
"sinon/lib/sinon/mock.js",
"sinon/lib/sinon/collection.js",
"sinon/lib/sinon/assert.js",
"sinon/lib/sinon/sandbox.js",
"sinon/lib/sinon/test.js",
"sinon/lib/sinon/test_case.js",
"sinon/lib/sinon/assert.js",
"sinon/lib/sinon/match.js"
    */


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'app/bower_components/**/*.js', included: false},
      {pattern: 'app/bower_components/sinon/lib/**/*.js', included: true},
      {pattern: 'app/scripts/**/*.js', included: false},
      {pattern: 'app/scripts/templates/**/*.hbs', included: false},
      'test/html/*Spec.html',
      {pattern: 'test/**/*Spec.js', included: false},
      {pattern: 'test/TestUtils.js', included: false},
      'test/test-main.js'
    ],


    // list of files to exclude
    exclude: [
      'app/scripts/main.js',
      // 'app/bower_components/bootstrap/**/*.js',
      'app/bower_components/jquery/test/**/*.js',
      'app/bower_components/sinon/test/**/*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.html': ['html2js'],
      'app/scripts/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // coverage reporter options https://github.com/karma-runner/karma-coverage
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    // set to false if using grunt-contrib-watch
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    customLaunchers: {
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
