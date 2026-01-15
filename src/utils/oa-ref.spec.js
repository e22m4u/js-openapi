import {expect} from 'chai';
import {format} from '@e22m4u/js-format';

import {
  oaRef,
  oaLinkRef,
  oaSchemaRef,
  oaExampleRef,
  oaResponseRef,
  oaPathItemRef,
  oaCallbackRef,
  oaParameterRef,
  OAComponentType,
  oaRequestBodyRef,
  oaSecuritySchemeRef,
  OA_COMPONENT_TYPE_TO_KEY_MAP,
} from './oa-ref.js';

describe('oaRef', function () {
  it('should require the "name" parameter to be a non-empty String', function () {
    const throwable = v => () => oaRef(v, OAComponentType.SCHEMA);
    const error = s =>
      format(
        'Parameter "name" must be a non-empty String, but %s was given.',
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
    throwable('str')();
  });

  it('should require the "type" parameter to be a non-empty String', function () {
    const throwable = v => () => oaRef('Model', v);
    const error = s =>
      format(
        'Parameter "type" must be a non-empty String, but %s was given.',
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
    throwable(OAComponentType.SCHEMA)();
  });

  it('should throw an error if a given type is not supported', function () {
    const throwable = () => oaRef('name', 'unknown');
    expect(throwable).to.throw('Component type "unknown" is not supported.');
  });

  it('should set the "name" argument to the component path', function () {
    expect(oaRef('Model', OAComponentType.SCHEMA)).to.be.eql({
      $ref: '#/components/schemas/Model',
    });
  });

  it('should set the correct segment by a given component type', function () {
    Object.keys(OA_COMPONENT_TYPE_TO_KEY_MAP).forEach(type => {
      const key = OA_COMPONENT_TYPE_TO_KEY_MAP[type];
      expect(oaRef('name', type)).to.be.eql({
        $ref: `#/components/${key}/name`,
      });
    });
  });

  describe('aliases', function () {
    it('should use the correct type', function () {
      const aliasesToResultMap = [
        [oaSchemaRef, {$ref: '#/components/schemas/name'}],
        [oaResponseRef, {$ref: '#/components/responses/name'}],
        [oaParameterRef, {$ref: '#/components/parameters/name'}],
        [oaExampleRef, {$ref: '#/components/examples/name'}],
        [oaRequestBodyRef, {$ref: '#/components/requestBodies/name'}],
        [oaSecuritySchemeRef, {$ref: '#/components/securitySchemes/name'}],
        [oaLinkRef, {$ref: '#/components/links/name'}],
        [oaCallbackRef, {$ref: '#/components/callbacks/name'}],
        [oaPathItemRef, {$ref: '#/components/pathItems/name'}],
      ];
      aliasesToResultMap.forEach(([fn, res]) => {
        expect(fn('name')).to.be.eql(res);
      });
    });
  });
});
