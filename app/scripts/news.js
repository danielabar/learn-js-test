define(
  [
    'jquery'
  ],
  function($) {

    var init = function(config) {
      registerHandlers(config);
    };

    var registerHandlers = function(config) {
      config.action.on('click', function(e) {
        execute(config);
        e.preventDefault();
      });
    };

    var execute = function(config) {
      // validate query
      // execute ajax api search
      // convert api items to display items
      // display items in dom
    };

    return {
      init: init,
    };

  });