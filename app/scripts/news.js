define(['jquery', './sentiment', 'hbs!templates/searchResults'], function($, sentiment, template) {

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
        console.error('You have entered an invalid search term');
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

    var display = function(loadInto, displayItems) {
      loadInto.empty();
      loadInto.append(template({items: displayItems}));
    };

    return {
      init: init,
      validate: validate,
      search: search,
      process: process,
      display: display
    };

  });