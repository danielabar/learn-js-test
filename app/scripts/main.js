require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery'
  }
});

require(['app'], function(app) {
  app.init();
});