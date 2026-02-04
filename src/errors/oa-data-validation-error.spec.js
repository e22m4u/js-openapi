import {expect} from 'chai';
import {InvalidArgumentError} from '@e22m4u/js-format';
import {OADataValidationError} from './oa-data-validation-error.js';

describe('OADataValidationError', function () {
  describe('constructor', function () {
    it('should interpolate an error message with given arguments', function () {
      const res = new OADataValidationError('message %v %s', 'str', 10);
      expect(res.message).to.be.eql('message "str" 10');
    });

    it('should not extend the InvalidArgumentError class', function () {
      const res = new OADataValidationError('message');
      expect(res).to.be.not.instanceOf(InvalidArgumentError);
    });
  });
});
