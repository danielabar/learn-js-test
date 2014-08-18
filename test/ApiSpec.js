define(
  [
    '../app/scripts/api',
    '../app/bower_components/chai/chai',
    'jquery',
    'testUtils'
  ],
  function(fixture, chai, $, testUtils) {

    var expect = chai.expect;

    describe('Search', function() {
      var sandbox = sinon.sandbox.create();
      afterEach(function () {
        sandbox.restore();
      });

      it('Module is defined', function() {
        expect(fixture).not.to.be.null;
        expect(fixture).not.to.be.undefined;
      });

      it('Queries the Guardian API', function (done) {
        var apiResponse = testUtils.guardianApiSuccessResponse();
        var ajaxStub = sandbox.stub($, 'ajax', function() {
          var d = $.Deferred();
          d.resolve(apiResponse);
          return d.promise();
        });

        var result = fixture.search('election');
        expect(result.state()).to.equal('resolved');
        sinon.assert.calledWith(ajaxStub, sinon.match({url: 'http://content.guardianapis.com/search?show-fields=all'}));
        sinon.assert.calledWith(ajaxStub, sinon.match({data: {q: 'election'}}));
        sinon.assert.calledWith(ajaxStub, sinon.match({dataType: 'jsonp'}));

        result.then(
          function(data) {
            expect(data).to.not.be.null;
            done();
          }
        );
      });

      it('Queries the Guardian API and fails', function (done) {
        var apiResponse = testUtils.guardianApiErrorResponse();
        var ajaxStub = sandbox.stub($, 'ajax', function() {
          var d = $.Deferred();
          d.reject(apiResponse);
          return d.promise();
        });

        var result = fixture.search('election');
        expect(result.state()).to.equal('rejected');
        sinon.assert.calledWith(ajaxStub, sinon.match({url: 'http://content.guardianapis.com/search?show-fields=all'}));
        sinon.assert.calledWith(ajaxStub, sinon.match({data: {q: 'election'}}));
        sinon.assert.calledWith(ajaxStub, sinon.match({dataType: 'jsonp'}));

        result.then(
          function(data) { },
          function(error) {
            expect(error).to.not.be.null;
            done();
          }
        );
      });

    });

  });