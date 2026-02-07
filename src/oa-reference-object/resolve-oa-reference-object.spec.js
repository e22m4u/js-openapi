import {expect} from 'chai';
import {format} from '@e22m4u/js-format';
import {resolveOAReferenceObject} from './resolve-oa-reference-object.js';

describe('resolveOAReferenceObject', function () {
  it('should require the parameter "referenceObj" to be an Object', function () {
    const throwable = v => () =>
      resolveOAReferenceObject(v, {rootDocument: {}});
    const error = s =>
      format(
        'Parameter "referenceObj" must be an Object, but %s was given.',
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
    throwable({$ref: '#'})();
  });

  it('should require the parameter "options" to be an Object', function () {
    const throwable = v => () => resolveOAReferenceObject({$ref: '#'}, v);
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
    throwable({rootDocument: {}})();
  });

  it('should require the option "rootDocument" to be an Object or an Array', function () {
    const throwable = v => () =>
      resolveOAReferenceObject({$ref: '#'}, {rootDocument: v});
    const error = s =>
      format(
        'Option "rootDocument" must be an Object or an Array, but %s was given.',
        s,
      );
    expect(throwable('str')).to.throw(error('"str"'));
    expect(throwable('')).to.throw(error('""'));
    expect(throwable(10)).to.throw(error('10'));
    expect(throwable(0)).to.throw(error('0'));
    expect(throwable(true)).to.throw(error('true'));
    expect(throwable(false)).to.throw(error('false'));
    expect(throwable(null)).to.throw(error('null'));
    throwable([])();
    throwable({})();
  });

  it('should require at least one reference property', function () {
    const throwable = () => resolveOAReferenceObject({});
    expect(throwable).to.throw(
      'Reference object does not have reference properties.',
    );
  });

  describe('$ref', function () {
    it('should require the property "$ref" to be a non-empty String', function () {
      const throwable = v => () =>
        resolveOAReferenceObject({$ref: v}, {rootDocument: {}});
      const error = s =>
        format(
          'Schema keyword "$ref" must be a non-empty String, ' +
            'but %s was given.',
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
      throwable('#')();
    });

    describe('a document reference (URI starts with "#")', function () {
      it('should require the option "rootDocument" when resolving the same-document', function () {
        const throwable = v => () => resolveOAReferenceObject({$ref: v});
        ['#', '#/', '#/path'].forEach(uri => {
          expect(throwable(uri)).to.throw(
            'Option "rootDocument" is required to resolve the same-document ' +
              'reference (URI starts with "#").',
          );
        });
      });

      it('should return the root document when resolving the root reference', function () {
        const rootDocument = {};
        const res = resolveOAReferenceObject({$ref: '#'}, {rootDocument});
        expect(res).to.be.eq(rootDocument);
      });

      it('should return a node with an empty string key', function () {
        const node = {foo: 'bar'};
        const res1 = resolveOAReferenceObject(
          {$ref: '#/'},
          {rootDocument: {'': node}},
        );
        expect(res1).to.be.eq(node);
        const res2 = resolveOAReferenceObject(
          {$ref: '#/path/'},
          {rootDocument: {path: {'': node}}},
        );
        expect(res2).to.be.eq(node);
      });

      it('should unescape segments of the json pointer', function () {
        const node = {foo: 'bar'};
        const res = resolveOAReferenceObject(
          {$ref: '#/~1path'},
          {rootDocument: {'/path': node}},
        );
        expect(res).to.be.eq(node);
      });

      it('should resolve a document node by the json pointer with multiple segments', function () {
        const node = {foo: 'bar'};
        const res = resolveOAReferenceObject(
          {$ref: '#/a/b/c'},
          {rootDocument: {a: {b: {c: node}}}},
        );
        expect(res).to.be.eq(node);
      });

      it('should resolve an array element when the root document is an array', function () {
        const res = resolveOAReferenceObject(
          {$ref: '#/1'},
          {rootDocument: ['foo', 'bar', 'baz']},
        );
        expect(res).to.be.eq('bar');
      });

      it('should be able to walk through an array element', function () {
        const res = resolveOAReferenceObject(
          {$ref: '#/1/prop'},
          {rootDocument: [{prop: 'foo'}, {prop: 'bar'}, {prop: 'baz'}]},
        );
        expect(res).to.be.eq('bar');
      });

      it('should ignore an array index with zero prefix', function () {
        const throwable = () =>
          resolveOAReferenceObject(
            {$ref: '#/01'},
            {rootDocument: ['foo', 'bar', 'baz']},
          );
        expect(throwable).to.throw(
          'Unable to resolve "/01" in the given document.',
        );
      });

      it('should throw an error if a value of the target property is undefined', function () {
        const node = {foo: undefined};
        const throwable = () =>
          resolveOAReferenceObject({$ref: '#/foo'}, {rootDocument: node});
        expect(throwable).to.throw(
          'Unable to resolve "/foo" in the given document.',
        );
      });

      it('should not throw an error when a value of the target property is defined', function () {
        const values = ['str', '', 10, 0, true, false, {}, [], null];
        values.forEach(value => {
          const rootDocument = {foo: value};
          const res = resolveOAReferenceObject({$ref: '#/foo'}, {rootDocument});
          expect(res).to.be.eq(value);
        });
      });
    });

    describe('an anchor reference (example "#SomeAnchor")', function () {
      it('should throw an error when the URI has an anchor name', function () {
        const throwable = () =>
          resolveOAReferenceObject({$ref: '#SomeAnchor'}, {rootDocument: {}});
        expect(throwable).to.throw(
          'Anchor reference is not supported, but "#SomeAnchor" was given.',
        );
      });
    });

    describe('an external resource (example "http://example.com")', function () {
      it('should throw an error when the URI starts with http(s) protocol', function () {
        const throwable = v => () =>
          resolveOAReferenceObject({$ref: v}, {rootDocument: {}});
        ['http://example', 'https://example'].forEach(uri => {
          expect(throwable(uri)).to.throw(
            format(
              'External resource is not supported, but %v was given.',
              uri,
            ),
          );
        });
      });
    });

    describe('a relative reference (example "/path")', function () {
      it('should throw an error when the URI has a relative reference', function () {
        const throwable = v => () =>
          resolveOAReferenceObject({$ref: v}, {rootDocument: {}});
        ['/path', 'path', './path', '../path'].forEach(uri => {
          expect(throwable(uri)).to.throw(
            format(
              'Relative reference is not supported, but %v was given.',
              uri,
            ),
          );
        });
      });
    });
  });
});
