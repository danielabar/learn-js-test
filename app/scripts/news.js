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
      // searchNews(config.query.val())
      //  success: process(apiResponse.response.results)
      // display items in dom
    };

    var validate = function(value) {
      if (!value || (value + '').length < 2) {
        return false;
      } else {
        return true;
      }
    };

    var search = function(query) {
      return $.ajax({
        url: 'http://content.guardianapis.com/search?show-fields=all',
        data: {
          q: query
        },
        dataType: 'jsonp'
      }).promise();
    };

    var process = function(items) {
      return items.map(function(item) {
        return {
          publishedDate: item.webPublicationDate,
          title: item.webTitle,
          url: item.webUrl,
          image: item.fields.thumbnail,
          author: item.fields.byline,
          content: item.fields.trailText
        };
      });
    };

    return {
      init: init,
      validate: validate,
      search: search,
      process: process
    };

  });