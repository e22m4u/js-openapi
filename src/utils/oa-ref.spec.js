import {expect} from 'chai';
import {format} from '@e22m4u/js-format';
import {OAComponentsSegment} from '../constants.js';

import {
  oaRef,
  oaLinkRef,
  oaSchemaRef,
  oaExampleRef,
  oaResponseRef,
  oaPathItemRef,
  oaCallbackRef,
  oaParameterRef,
  oaRequestBodyRef,
  oaSecuritySchemeRef,
} from './oa-ref.js';

describe('oaRef', function () {
  it('should require the "name" parameter to be a non-empty String', function () {
    const throwable = v => () => oaRef(v, OAComponentsSegment.SCHEMAS);
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

  it('should require the "segment" parameter to be a components segment', function () {
    const throwable = v => () => oaRef('Model', v);
    const segments = Object.values(OAComponentsSegment);
    const error = s =>
      format(
        'Parameter "segment" must be one of values: %l, but %s was given.',
        segments,
        s,
      );
    expect(throwable('str')).to.throw(error('"str"'));
    expect(throwable('')).to.throw(error('""'));
    expect(throwable(10)).to.throw(error('10'));
    expect(throwable(0)).to.throw(error('0'));
    expect(throwable(true)).to.throw(error('true'));
    expect(throwable(false)).to.throw(error('false'));
    expect(throwable([])).to.throw(error('Array'));
    expect(throwable({})).to.throw(error('Object'));
    expect(throwable(undefined)).to.throw(error('undefined'));
    expect(throwable(null)).to.throw(error('null'));
    segments.forEach(segment => throwable(segment)());
  });

  it('should set the "name" argument to the reference path', function () {
    expect(oaRef('Model', OAComponentsSegment.SCHEMAS)).to.be.eql({
      $ref: '#/components/schemas/Model',
    });
  });

  it('should set the "segment" argument to the reference path', function () {
    const segments = Object.values(OAComponentsSegment);
    segments.forEach(segment => {
      expect(oaRef('name', segment)).to.be.eql({
        $ref: `#/components/${segment}/name`,
      });
    });
  });

  describe('aliases', function () {
    it('should use the correct segment', function () {
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
