define(
  [
    '../app/scripts/app',
    '../app/scripts/news',
    '../app/bower_components/chai/chai',
    'jquery'
  ],
  function(fixture, news, chai, $) {

    var expect = chai.expect;
    var sandbox = sinon.sandbox.create();

    beforeEach(function() {
      document.body.innerHTML = window.__html__['test/html/AppSpec.html'];
    });

    afterEach(function() {
      sandbox.restore();
    });

    describe('AppSpec.js: ', function() {

      it('Module is defined', function() {
        expect(fixture).not.to.be.null;
        expect(fixture).not.to.be.undefined;
      });

      it('Initializes news with DOM elements', function() {
        var newsStub = sandbox.stub(news, 'init');
        fixture.init();
        sinon.assert.calledWith(newsStub, sinon.match({query: $('#query')}));
        sinon.assert.calledWith(newsStub, sinon.match({action: $('#searchNews')}));
        sinon.assert.calledWith(newsStub, sinon.match({loadInto: $('#searchResults')}));
        sinon.assert.calledWith(newsStub, sinon.match({loadIntoError: $('#error')}));
      });

    });

  });