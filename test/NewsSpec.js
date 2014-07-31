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

  });

});