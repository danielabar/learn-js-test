define([
  '../app/scripts/news',
  '../app/scripts/api',
  '../app/scripts/sentiment',
  '../app/scripts/display',
  '../app/bower_components/chai/chai',
  'jquery',
  'testUtils'
], function(fixture, api, sentiment, display, chai, $, testUtils) {

  var expect = chai.expect;

  describe('NewsSpec.js: ', function() {

    it('Module is defined', function() {
      expect(fixture).not.to.be.null;
      expect(fixture).not.to.be.undefined;
    });

    describe('Validate', function() {
      it('Rejects null value', function () {
        var result = fixture.validate(null);
        expect(result).to.be.false;
      });
      it('Rejects undefined value', function () {
        var result = fixture.validate();
        expect(result).to.be.false;
      });
      it('Rejects value of single character', function () {
        var result = fixture.validate('a');
        expect(result).to.be.false;
      });
      it('Accepts value of two characters', function () {
        var result = fixture.validate('ab');
        expect(result).to.be.true;
      });
      it('Accepts value of more than two characters', function () {
        var result = fixture.validate('hello there');
        expect(result).to.be.true;
      });
      it('Rejects a single number', function () {
        var result = fixture.validate(5);
        expect(result).to.be.false;
      });
      it('Accepts multiple numbers', function () {
        var result = fixture.validate(56);
        expect(result).to.be.true;
      });
    });

    describe('Process', function () {
      var sandbox = sinon.sandbox.create();
      afterEach(function () {
        sandbox.restore();
      });

      it('Converts api items for display and calls sentiment analysis', function () {
        var sentimentStub = sandbox.stub(sentiment, 'analyze').returns('good');
        var items = testUtils.guardianApiSuccessResponse().response.results;

        var results = fixture.process(items);

        expect(results).to.have.length(items.length);
        for(var i = 0; i < results.length; i++) {
          expect(results[i].publishedDate).to.equal(items[i].webPublicationDate);
          expect(results[i].title).to.equal(items[i].webTitle);
          expect(results[i].url).to.equal(items[i].webUrl);
          expect(results[i].image).to.equal(items[i].fields.thumbnail);
          expect(results[i].author).to.equal(items[i].fields.byline);
          expect(results[i].content).to.equal(items[i].fields.trailText);
          sinon.assert.calledWith(sentimentStub, items[i].fields.trailText);
        }
      });
    });

    describe('Execute', function() {
      var sandbox = sinon.sandbox.create();
      beforeEach(function() {
        document.body.innerHTML = window.__html__['test/html/AppSpec.html'];
      });
      afterEach(function () {
        sandbox.restore();
      });

      it('Displays Results when api call is successful',  function() {
        $('#query').val('foo');
        var config = {
          query: $('#query'),
          loadInto: $('#searchResults'),
        };

        var apiStub = sandbox.stub(api, 'search', function() {
          var d = $.Deferred();
          d.resolve(testUtils.guardianApiSuccessResponse());
          return d.promise();
        });

        var displayStub = sandbox.stub(display, 'displayResults');

        fixture.execute(config);
        sinon.assert.calledWith(apiStub, 'foo');
        sinon.assert.calledWith(displayStub, config.loadInto);
      });

    });

  });

});