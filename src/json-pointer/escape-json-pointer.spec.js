import {expect} from 'chai';
import {format} from '@e22m4u/js-format';
import {escapeJsonPointer} from './escape-json-pointer.js';

describe('escapeJsonPointer', function () {
  it('should require the "jsonPointer" parameter to be a String', function () {
    const throwable = v => () => escapeJsonPointer(v);
    const error = s =>
      format('Parameter "jsonPointer" must be a String, but %s was given.', s);
    expect(throwable(10)).to.throw(error('10'));
    expect(throwable(0)).to.throw(error('0'));
    expect(throwable(true)).to.throw(error('true'));
    expect(throwable(false)).to.throw(error('false'));
    expect(throwable([])).to.throw(error('Array'));
    expect(throwable(undefined)).to.throw(error('undefined'));
    expect(throwable(null)).to.throw(error('null'));
    throwable('str')();
    throwable('')();
  });

  it('should replace "~" with "~0"', function () {
    expect(escapeJsonPointer('example~test')).to.eq('example~0test');
  });

  it('should replace "/" with "~1"', function () {
    expect(escapeJsonPointer('models/User')).to.eq('models~1User');
  });

  it('should handle complex strings', function () {
    expect(escapeJsonPointer('a/b~c')).to.eq('a~1b~0c');
  });

  it('should do nothing if no special chars are present', function () {
    expect(escapeJsonPointer('simple')).to.eq('simple');
  });
});
