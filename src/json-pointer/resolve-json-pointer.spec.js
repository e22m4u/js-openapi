import {expect} from 'chai';
import {format} from '@e22m4u/js-format';
import {resolveJsonPointer} from './resolve-json-pointer.js';

describe('resolveJsonPointer', function () {
  it('should require the parameter "document" to be an Object or an Array', function () {
    const throwable = v => () => resolveJsonPointer(v, '/0');
    const error = s =>
      format(
        'Parameter "document" must be an Object or an Array, ' +
          'but %s was given.',
        s,
      );
    expect(throwable('str')).to.throw(error('"str"'));
    expect(throwable('')).to.throw(error('""'));
    expect(throwable(10)).to.throw(error('10'));
    expect(throwable(0)).to.throw(error('0'));
    expect(throwable(true)).to.throw(error('true'));
    expect(throwable(false)).to.throw(error('false'));
    expect(throwable(undefined)).to.throw(error('undefined'));
    expect(throwable(null)).to.throw(error('null'));
    throwable({0: 'bar'})();
    throwable(['bar'])();
  });

  it('should require the parameter "pointer" to be a String', function () {
    const throwable = v => () => resolveJsonPointer({foo: 'bar'}, v);
    const error = s =>
      format('JSON pointer must be a String, but %s was given.', s);
    expect(throwable(10)).to.throw(error('10'));
    expect(throwable(0)).to.throw(error('0'));
    expect(throwable(true)).to.throw(error('true'));
    expect(throwable(false)).to.throw(error('false'));
    expect(throwable([])).to.throw(error('Array'));
    expect(throwable(undefined)).to.throw(error('undefined'));
    expect(throwable(null)).to.throw(error('null'));
    throwable('/foo')();
    throwable('')();
  });

  it('should return the document when an empty string is given', function () {
    const document = {};
    const res = resolveJsonPointer(document, '');
    expect(res).to.be.eq(document);
  });

  it('should be able to find a node with an empty string key', function () {
    const node = {foo: 'bar'};
    const res1 = resolveJsonPointer({'': node}, '/');
    expect(res1).to.be.eq(node);
    const res2 = resolveJsonPointer({path: {'': node}}, '/path/');
    expect(res2).to.be.eq(node);
  });

  it('should unescape segments of the json pointer', function () {
    const node = {foo: 'bar'};
    const res = resolveJsonPointer({'/path': node}, '/~1path');
    expect(res).to.be.eq(node);
  });

  it('should return a document node for the segment chain', function () {
    const node = {foo: 'bar'};
    const res = resolveJsonPointer({a: {b: {c: node}}}, '/a/b/c');
    expect(res).to.be.eq(node);
  });

  it('should resolve an array element when the document is an array', function () {
    const res = resolveJsonPointer(['foo', 'bar', 'baz'], '/1');
    expect(res).to.be.eq('bar');
  });

  it('should be able to walk through an array element', function () {
    const res = resolveJsonPointer(
      [{prop: 'foo'}, {prop: 'bar'}, {prop: 'baz'}],
      '/1/prop',
    );
    expect(res).to.be.eq('bar');
  });

  it('should throw an error when an array index has a zero prefix', function () {
    const throwable = () => resolveJsonPointer(['foo', 'bar', 'baz'], '/01');
    expect(throwable).to.throw(
      'Unable to resolve "/01" in the given document.',
    );
  });

  it('should throw an error if a property value is undefined', function () {
    const node = {foo: undefined};
    const throwable = () => resolveJsonPointer(node, '/foo');
    expect(throwable).to.throw(
      'Unable to resolve "/foo" in the given document.',
    );
  });

  it('should return the pointer target when its value is not undefined', function () {
    const values = ['str', '', 10, 0, true, false, {}, [], null];
    values.forEach(value => {
      const document = {foo: value};
      const res = resolveJsonPointer(document, '/foo');
      expect(res).to.be.eq(value);
    });
  });
});
