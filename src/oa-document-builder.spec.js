import {expect} from 'chai';
import {format} from '@e22m4u/js-format';
import {ServiceContainer} from '@e22m4u/js-service';
import {OADocumentBuilder} from './oa-document-builder.js';

describe('OADocumentBuilder', function () {
  describe('constructor', function () {
    it('should not require any parameters', function () {
      new OADocumentBuilder();
    });

    it('should pass the ServiceContainer to the super class', function () {
      const cont = new ServiceContainer();
      const S = new OADocumentBuilder(cont);
      expect(S.container).to.be.eq(cont);
    });

    it('should require the first parameter to be an Object', function () {
      const throwable = v => () => new OADocumentBuilder(v);
      const error = s =>
        format(
          'Parameter "containerOrDocument" must be an Object, ' +
            'but %s was given.',
          s,
        );
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({})();
      throwable(undefined)();
    });

    it('should require the second parameter to be an Object', function () {
      const throwable = v => () => new OADocumentBuilder(undefined, v);
      const error = s =>
        format('Parameter "document" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({})();
      throwable(undefined)();
    });

    it('should merge the document from the first parameter with the default document', function () {
      const doc = {
        openapi: '3.1.2',
        info: {
          title: 'My OpenAPI Doc',
          version: '1.0.0',
        },
      };
      const S = new OADocumentBuilder(doc);
      const res = S.getDocumentObjectRef();
      expect(res).to.be.eql({...doc, components: {}});
    });

    it('should merge the document from the second parameter with the default document', function () {
      const doc = {
        openapi: '3.1.2',
        info: {
          title: 'My OpenAPI Doc',
          version: '1.0.0',
        },
      };
      const S = new OADocumentBuilder(undefined, doc);
      const res = S.getDocumentObjectRef();
      expect(res).to.be.eql({...doc, components: {}});
    });

    it('should validate the given document object', function () {
      const doc = {openapi: 'abc'};
      const throwable = () => new OADocumentBuilder(doc);
      expect(throwable).to.throw(
        'Value at "/openapi" must match pattern "^3\\.1\\.\\d+(-.+)?$".',
      );
    });
  });

  describe('getDocumentObjectRef', function () {
    it('should return the document object reference', function () {
      const S = new OADocumentBuilder();
      const ref1 = S.getDocumentObjectRef();
      const ref2 = S.getDocumentObjectRef();
      expect(ref1).to.be.eql(ref2);
    });
  });
});
