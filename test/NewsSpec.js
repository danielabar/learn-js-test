define([
  '../app/scripts/news',
  '../app/bower_components/chai/chai',
  '../app/bower_components/sinon/lib/sinon',
  'jquery'
], function(fixture, chai, sinon, $) {

  var expect = chai.expect;

  beforeEach(function() {
    document.body.innerHTML = window.__html__['test/html/AppSpec.html'];
  });

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

    describe('Search News', function () {
      var sandbox = sinon.sandbox.create();
      afterEach(function () {
        sandbox.restore();
      });

      it('Queries the Guardian API', function () {
        var apiResponse = {
          'response': {
            'status': 'ok',
            'total': 2,
            'results' : [
              {
                'webPublicationDate': '2014-07-31T12:26:50Z',
                'webTitle': 'Collaboration between charities can help them embrace risk and adapt',
                'webUrl': 'http://www.theguardian.com/voluntary-sector-network/2014/jul/31/collaboration-charities-embrace-risk',
                'fields' : {
                  'trailText': '<p>Any innovation carries with it the threat of failure; for charities, that could mean needy people stripped of their services. And yet they must adapt to remain effective</p>',
                  'headline': 'Collaboration between charities can help them embrace risk and adapt',
                  'thumbnail': 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/7/30/1406721764161/Virgin-London-Marathon-20-006.jpg',
                  'byline': 'Harriet Swain'
                }
              },
              {
                'webPublicationDate': '2014-07-31T10:45:12Z',
                'webTitle': 'Obama\'s plan to get out the vote by mocking the GOP totally works',
                'webUrl': 'http://www.theguardian.com/commentisfree/2014/jul/31/obama-get-out-the-vote-plan-works-republican-voters',
                'fields' : {
                  'trailText': '<strong>Ana Marie Cox:</strong> But if the goal of his second term was broad, lasting policy changes, it’s disappointing to everyone except liberal fundraisers',
                  'headline': 'Collaboration between charities can help them embrace risk and adapt',
                  'thumbnail': 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/7/30/1406756274186/b53ee655-5ded-4364-a674-b8f1f8301327-140x84.jpeg',
                  'byline': 'Ana Marie Cox'
                }
              }
            ]
          }
        };
        var ajaxStub = sandbox.stub($, 'ajax', function() {
          var d = $.Deferred();
          d.resolve(apiResponse);
          return d.promise();
        });
        var result = fixture.searchNews('election');
        expect(result.state()).to.equal('resolved');
        sinon.assert.calledWith(ajaxStub, sinon.match({url: 'http://content.guardianapis.com/search?show-fields=all'}));
        sinon.assert.calledWith(ajaxStub, sinon.match({data: {q: 'election'}}));
        sinon.assert.calledWith(ajaxStub, sinon.match({dataType: 'jsonp'}));
      });
    });

  });

});