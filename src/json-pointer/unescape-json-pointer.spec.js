import {expect} from 'chai';
import {format} from '@e22m4u/js-format';
import {unescapeJsonPointer} from './unescape-json-pointer.js';

describe('unescapeJsonPointer', function () {
  it('should require the "jsonPointer" parameter to be a String', function () {
    const throwable = v => () => unescapeJsonPointer(v);
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

  it('should replace "~0" with "~"', function () {
    expect(unescapeJsonPointer('example~0test')).to.eq('example~test');
  });

  it('should replace "~1" with "/"', function () {
    expect(unescapeJsonPointer('models~1User')).to.eq('models/User');
  });

  it('should handle complex strings', function () {
    expect(unescapeJsonPointer('a~1b~0c')).to.eq('a/b~c');
  });
});
