define([
  'jquery',
  './sentiment',
  'hbs!templates/searchResults',
  'hbs!templates/error',
  'alert'
],
  function($, sentiment, templateResults, templateError) {

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
        displayError(config.loadIntoError, 'Invalid', 'You have entered an invalid search term');
        return;
      }
      search(query).then(
        function(data) {
          display(config.loadInto, process(data.response.results));
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
          content: item.fields.trailText,
          sentimentResult: sentiment.analyze(item.fields.trailText)
        };
      });
    };

    // TODO: Consider refactoring display functions to separate module
    var display = function(loadInto, displayItems) {
      loadInto.empty();
      loadInto.append(templateResults({items: displayItems}));
    };

    var displayError = function(loadIntoError, errorTitle, errorMessage) {
      loadIntoError.empty();
      loadIntoError.append(templateError({title: errorTitle, message: errorMessage}));
    };

    return {
      init: init,
      validate: validate,
      search: search,
      process: process,
      display: display,
      displayError: displayError
    };

  });