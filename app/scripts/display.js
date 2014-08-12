define(
  [
    'hbs!templates/searchResults',
    'hbs!templates/error'
  ],
  function(templateResults, templateError) {

    var displayResults = function(loadInto, displayItems) {
      loadInto.empty();
      loadInto.append(templateResults({items: displayItems}));
    };

    var displayError = function(loadInto, errorTitle, errorMessage) {
      loadInto.empty();
      loadInto.append(templateError({title: errorTitle, message: errorMessage}));
    };

    return {
      displayResults: displayResults,
      displayError: displayError
    };

  });