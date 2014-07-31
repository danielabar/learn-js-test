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
      if (!value || (value + '').length < 2) {
        return false;
      } else {
        return true;
      }
    };

    var searchNews = function(query) {
      return $.ajax({
        url: 'http://content.guardianapis.com/search?show-fields=all',
        data: {
          q: query
        },
        dataType: 'jsonp'
      }).promise();
    };

    return {
      init: init,
      validate: validate,
      searchNews: searchNews
    };

  });