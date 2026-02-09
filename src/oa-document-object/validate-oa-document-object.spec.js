import {expect} from 'chai';
import {validateOADocumentObject} from './validate-oa-document-object.js';
import {format} from '@e22m4u/js-format';

const VALID_DOC_SAMPLE = {
  openapi: '3.1.2',
  info: {
    title: 'API Documentation',
    version: '0.0.1',
  },
  components: {},
};

describe('validateOADocumentObject', function () {
  it('should require the parameter "option" to be an Object', function () {
    const throwable = v => () => validateOADocumentObject(VALID_DOC_SAMPLE, v);
    const error = s =>
      format('Parameter "options" must be an Object, but %s was given.', s);
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

  it('should require the option "schemaUri" to be a String', function () {
    const throwable = v => () =>
      validateOADocumentObject(VALID_DOC_SAMPLE, {schemaUri: v});
    const error = s =>
      format('Option "schemaUri" must be a String, but %s was given.', s);
    expect(throwable(10)).to.throw(error('10'));
    expect(throwable(0)).to.throw(error('0'));
    expect(throwable(true)).to.throw(error('true'));
    expect(throwable(false)).to.throw(error('false'));
    expect(throwable([])).to.throw(error('Array'));
    expect(throwable({})).to.throw(error('Object'));
    expect(throwable(null)).to.throw(error('null'));
    throwable('#')();
    throwable(undefined)();
  });

  it('should require the option "dataSourceUri" to be a String', function () {
    const throwable = v => () =>
      validateOADocumentObject(VALID_DOC_SAMPLE, {dataSourceUri: v});
    const error = s =>
      format('Option "dataSourceUri" must be a String, but %s was given.', s);
    expect(throwable(10)).to.throw(error('10'));
    expect(throwable(0)).to.throw(error('0'));
    expect(throwable(true)).to.throw(error('true'));
    expect(throwable(false)).to.throw(error('false'));
    expect(throwable([])).to.throw(error('Array'));
    expect(throwable({})).to.throw(error('Object'));
    expect(throwable(null)).to.throw(error('null'));
    throwable('/str')();
    throwable('')();
    throwable(undefined)();
  });

  it('should pass validation for a valid document', function () {
    validateOADocumentObject({
      openapi: '3.1.2',
      info: {
        title: 'API Documentation',
        version: '0.0.1',
      },
      components: {},
    });
  });

  it('should require the "openapi" keyword', function () {
    const throwable = () =>
      validateOADocumentObject({
        info: {
          title: 'API Documentation',
          version: '0.0.1',
        },
        components: {},
      });
    expect(throwable).to.throw(
      'Value at "" must have required property "openapi".',
    );
  });

  it('should require the "info" keyword', function () {
    const throwable = () =>
      validateOADocumentObject({
        openapi: '3.1.2',
        components: {},
      });
    expect(throwable).to.throw(
      'Value at "" must have required property "info".',
    );
  });

  it('should allow to select the schema by the "schemaUri" option', function () {
    const throwable = () =>
      validateOADocumentObject({type: 123}, {schemaUri: '#/$defs/schema'});
    expect(throwable).to.throw(
      'Value at "/type" must be equal to one of the allowed values.',
    );
  });

  it('should add the "dataSourceUri" option as prefix to the instance path', function () {
    const throwable = () =>
      validateOADocumentObject(
        {type: 123},
        {
          schemaUri: '#/$defs/schema',
          dataSourceUri: '/components/schemas/mySchema',
        },
      );
    expect(throwable).to.throw(
      'Value at "/components/schemas/mySchema/type" ' +
        'must be equal to one of the allowed values.',
    );
  });
});
