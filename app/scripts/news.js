define([
  'jquery',
  './api',
  './sentiment',
  './display',
  'alert'
],
  function($, api, sentiment, display) {

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
      var query = config.query.val();
      if (!validate(query)) {
        display.displayError(config.loadIntoError, 'Invalid', 'Please enter a valid search term');
        return;
      }
      api.search(query).then(
        function(data) {
          display.displayResults(config.loadInto, process(data.response.results));
        },
        function(jqXHR, textStatus, errorThrown) {
          console.error('textStatus: ' + textStatus + ', errorThrown: ' + errorThrown);
        }
      );
    };

    var validate = function(value) {
      if (!value || (value + '').length < 2) {
        return false;
      } else {
        return true;
      }
    };

    var process = function(items) {
      return items.map(function(item) {
        return {
          publishedDate: item.webPublicationDate,
          title: item.webTitle,
          url: item.webUrl,
          image: item.fields.thumbnail,
          author: item.fields.byline,
          content: item.fields.trailText,
          sentimentResult: sentiment.analyze(item.fields.trailText)
        };
      });
    };

    return {
      init: init,
      validate: validate,
      process: process
    };

  });