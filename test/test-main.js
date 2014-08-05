var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // Do not have paths starting with '../' because Karma RequireJS Adapter
  // will not resolve them properly when the production code uses them with no other path portion.
  // If you encounter karma errors related to requirejs, add console.logs to
  //    node_modules/karma-requirejs/lib/adapter.js, method: createPatchedLoad
  // Log the values of moduleName, url before and after normalizing
  paths: {
    jquery: 'app/bower_components/jquery/jquery',
    handlebars: 'app/bower_components/handlebars/handlebars',
    hbs: 'app/bower_components/require-handlebars-plugin/hbs',
    chai: '../bower_components/chai/chai',
    sinon: '../bower_components/sinon/lib/sinon',
    testUtils: 'test/TestUtils'
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
