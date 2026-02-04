import {expect} from 'chai';
import {format} from '@e22m4u/js-format';

import {
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

const ALIASES_MAP = [
  [oaSchemaRef, 'schemas'],
  [oaResponseRef, 'responses'],
  [oaParameterRef, 'parameters'],
  [oaExampleRef, 'examples'],
  [oaRequestBodyRef, 'requestBodies'],
  [oaSecuritySchemeRef, 'securitySchemes'],
  [oaLinkRef, 'links'],
  [oaCallbackRef, 'callbacks'],
  [oaPathItemRef, 'pathItems'],
];

describe('oaRef aliases', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  ALIASES_MAP.forEach(([fn, segment]) => {
    describe(fn.name, function () {
      it('should require the "name" parameter to be a none-empty String', function () {
        const throwable = v => () => fn(v);
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
        throwable('name')();
      });

      it('should return the correct reference', function () {
        expect(fn('name')).to.be.eql({$ref: `#/components/${segment}/name`});
      });
    });
  });
});
