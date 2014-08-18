define(['jquery'],
  function($) {

    var search = function(query) {
      return $.ajax({
        url: 'http://content.guardianapis.com/search?show-fields=all',
        data: {
          q: query
        },
        dataType: 'jsonp'
      }).promise();
    };

    return {
      search: search,
    };

  });