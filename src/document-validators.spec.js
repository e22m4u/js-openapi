import {expect} from 'chai';
import {format} from '@e22m4u/js-format';
import {OPENAPI_VERSION} from './constants.js';
import {validateShallowOADocumentObject} from './document-validators.js';

const MINIMAL_DOCUMENT = {
  openapi: OPENAPI_VERSION,
  info: {title: 'API Documentation', version: '0.0.1'},
};

describe('document validators', function () {
  describe('validateShallowOADocumentObject', function () {
    it('should require the first parameter to be an Object', function () {
      const throwable = v => () => validateShallowOADocumentObject(v);
      const error = s =>
        format(
          'OpenAPI Document Object must be an Object, but %s was given.',
          s,
        );
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(MINIMAL_DOCUMENT)();
    });

    it('should require the "info" property to be an Object', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          openapi: OPENAPI_VERSION,
          info: v,
        });
      const error = s =>
        format('Property "info" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({title: 'API Documentation', version: '0.0.1'})();
    });

    it('should require the "info.title" property to be a non-empty String', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          openapi: OPENAPI_VERSION,
          info: {
            title: v,
            version: '0.0.1',
          },
        });
      const error = s =>
        format(
          'Property "info.title" must be a non-empty String, but %s was given.',
          s,
        );
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable('API Documentation')();
    });

    it('should require the "jsonSchemaDialect" property to be a non-empty String', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          jsonSchemaDialect: v,
        });
      const error = s =>
        format(
          'Property "jsonSchemaDialect" must be a non-empty String, but %s was given.',
          s,
        );
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(null)).to.throw(error('null'));
      throwable('https://json-schema.org/draft/2020-12/schema')();
      throwable(undefined)();
    });

    it('should require the "servers" property to be an Array', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          servers: v,
        });
      const error = s =>
        format('Property "servers" must be an Array, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(null)).to.throw(error('null'));
      throwable([{url: 'http://localhost'}])();
      throwable([])();
    });

    it('should require elements of the "servers" property to be an Object', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          servers: [v],
        });
      const error = s =>
        format('Element "servers[0]" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({url: 'http://localhost'})();
    });

    it('should require the "paths" property to be an Object', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          paths: v,
        });
      const error = s =>
        format('Property "paths" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({})();
    });

    it('should require the "webhooks" property to be an Object', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          webhooks: v,
        });
      const error = s =>
        format('Property "webhooks" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({})();
    });

    it('should require the "components" property to be an Object', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          components: v,
        });
      const error = s =>
        format('Property "components" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({})();
    });

    it('should require the "security" property to be an Array', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          security: v,
        });
      const error = s =>
        format('Property "security" must be an Array, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(null)).to.throw(error('null'));
      throwable([{}])();
      throwable([])();
    });

    it('should require elements of the "security" property to be an Object', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          security: [v],
        });
      const error = s =>
        format('Element "security[0]" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({apiKey: []})();
      throwable({})();
    });

    it('should require the "tags" property to be an Array', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          tags: v,
        });
      const error = s =>
        format('Property "tags" must be an Array, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(null)).to.throw(error('null'));
      throwable([{name: 'tag'}])();
      throwable([])();
    });

    it('should require elements of the "tags" property to be an Object', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          tags: [v],
        });
      const error = s =>
        format('Element "tags[0]" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({name: 'tag'})();
      throwable({})();
    });

    it('should require the "externalDocs" property to be an Object', function () {
      const throwable = v => () =>
        validateShallowOADocumentObject({
          ...MINIMAL_DOCUMENT,
          externalDocs: v,
        });
      const error = s =>
        format(
          'Property "externalDocs" must be an Object, but %s was given.',
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
      throwable({url: 'https://example.com'})();
      throwable(undefined)();
    });
  });
});
