require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    handlebars: '../bower_components/handlebars/handlebars',
    hbs: '../bower_components/require-handlebars-plugin/hbs',
    alert: '../bower_components/bootstrap/js/alert'
  },
  hbs: {
    helpers: true,            // default: true
    i18n: false,              // default: false
    templateExtension: 'hbs', // default: 'hbs'
    partialsUrl: ''           // default: '', base url for loading partials so that you don't have to provide the full path every time you need to load a partial within a template.
  }
});

require(['app'], function(app) {
  app.init();
});