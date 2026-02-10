import {expect} from 'chai';
import {Errorf} from '@e22m4u/js-format';
import {OADocumentObjectValidationError} from './oa-document-object-validation-error.js';

describe('OADocumentObjectValidationError', function () {
  it('should extend the Errorf class', function () {
    const error = new OADocumentObjectValidationError();
    expect(error).to.be.instanceof(Errorf);
  });
});
