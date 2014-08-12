// NOTE:  Use './news' rather than 'news' so that Karma RequireJS adapter can parse base path
define(
  [
    './news',
    'jquery'
  ],
  function(news, $) {

    var init = function() {
      news.init({
        query: $('#query'),
        action: $('#searchNews'),
        loadInto: $('#searchResults'),
        loadIntoError: $('#error')
      });
    };

    return {
      init: init,
    };

  });