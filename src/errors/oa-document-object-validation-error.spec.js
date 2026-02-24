import {expect} from 'chai';
import {Errorf} from '@e22m4u/js-format';
import {OADocumentObjectValidationError} from './oa-document-object-validation-error.js';

describe('OADocumentObjectValidationError', function () {
  describe('constructor', function () {
    it('should extend Errorf class', function () {
      const error = new OADocumentObjectValidationError();
      expect(error).to.be.instanceof(Errorf);
    });

    it('should interpolate the given message with arguments', function () {
      const error = new OADocumentObjectValidationError('%v and %v', 1, 2);
      expect(error.message).to.be.eq('1 and 2');
    });
  });
});
