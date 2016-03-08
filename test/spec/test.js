(function () {
  'use strict';

  describe('Sample test', function () {
    describe('Array tests', function () {
      it('should run here few assertions', function () {
        [1, 2, 3].indexOf(5).should.equal(-1);
      });
      it('should fail', function () {
        [1, 2, 3].indexOf(5).should.equal(0);
      });
    });
    describe('String tests', function () {
      it('should run here few assertions', function () {
        var object = { foo: 'bar' };
        var expected = '{"foo":"bar"}';
        var result = JSON.stringify(object);
        result.should.be.a('string');
        result.should.equal(expected);
      });
    });
  });
})();
