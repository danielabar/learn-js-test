define(
  [
    '../app/scripts/display',
    '../app/bower_components/chai/chai',
    '../app/bower_components/sinon/lib/sinon',
    'jquery',
    'testUtils'
  ],
  function(fixture, chai, sinon, $, testUtils) {

    var expect = chai.expect;
    var sandbox = sinon.sandbox.create();

    beforeEach(function() {
      document.body.innerHTML = window.__html__['test/html/AppSpec.html'];
    });

    afterEach(function() {
      sandbox.restore();
    });

    describe('Display', function() {

      it('Module is defined', function() {
        expect(fixture).not.to.be.null;
        expect(fixture).not.to.be.undefined;
      });

      it('Displays search results', function() {
        var loadInto = $('#searchResults');
        expect(loadInto.find('#oldContent').text()).to.equal('Old Content');

        var displayItems = testUtils.newsDisplayItems();
        fixture.displayResults(loadInto, displayItems);

        expect(loadInto.find('#oldContent').text()).to.equal('');

        for(var i = 0; i < displayItems.length; i++) {
          var heading = loadInto.find('h4').eq(i).text();
          expect(heading).to.equal(displayItems[i].title);

          var content = loadInto.find('.media-body').eq(i).text();
          expect(content).to.contain(displayItems[i].content);

          var info = loadInto.find('.info').eq(i).text();
          expect(info).to.contain(displayItems[i].author);
          expect(info).to.contain(displayItems[i].publishedDate);
        }
      });

      it('Displays error title and message', function () {
        var loadIntoError = $('#error');
        var errorTitle = 'Boo';
        var errorMessage = 'Something went wrong';

        fixture.displayError(loadIntoError, errorTitle, errorMessage);

        var actualTitle = loadIntoError.find('strong').text();
        expect(actualTitle).to.equal(errorTitle);

        var actualMessage = loadIntoError.find('.message').text();
        expect(actualMessage).to.equal(errorMessage);
      });

    });

  });