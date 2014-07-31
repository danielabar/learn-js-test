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
      // validate(config.query.val())
      // execute ajax api search
      // convert api items to display items
      // display items in dom
    };

    var validate = function(value) {
      if (!value) {
        return false;
      }
      var stringValue = value + '';
      if (stringValue.length < 2) {
        return false;
      }
      return true;
    };

    return {
      init: init,
      validate: validate
    };

  });