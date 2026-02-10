import {expect} from 'chai';
import {format} from '@e22m4u/js-format';
import {OAOperationGroup} from './oa-operation-group.js';
import {OADocumentBuilder} from './oa-document-builder.js';

import {
  OADataType,
  OAOperationMethod,
  OAParameterLocation,
} from './oa-specification.js';

describe('OAOperationGroup', function () {
  describe('constructor', function () {
    it('should require the parameter "builder" to be an instance of OADocumentBuilder', function () {
      const throwable = v => () => new OAOperationGroup(v);
      const error = s =>
        format(
          'Parameter "builder" must be an instance of OADocumentBuilder, ' +
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
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(new OADocumentBuilder())();
    });

    it('should require the parameter "option" to be an Object', function () {
      const builder = new OADocumentBuilder();
      const throwable = v => () => new OAOperationGroup(builder, v);
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

    it('should require the option "pathPrefix" to be a String', function () {
      const builder = new OADocumentBuilder();
      const throwable = v => () =>
        new OAOperationGroup(builder, {pathPrefix: v});
      const error = s =>
        format('Option "pathPrefix" must be a String, but %s was given.', s);
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(null)).to.throw(error('null'));
      throwable('/')();
      throwable(undefined)();
    });

    it('should require the option "pathPrefix" to start with a forward slash', function () {
      const builder = new OADocumentBuilder();
      const throwable = v => () =>
        new OAOperationGroup(builder, {pathPrefix: v});
      const error = s =>
        format('Option "pathPrefix" must start with "/", but %s was given.', s);
      expect(throwable('path')).to.throw(error('"path"'));
      expect(throwable('')).to.throw(error('""'));
      throwable('/path')();
      throwable('/')();
    });

    it('should require the option "tags" to be an Array', function () {
      const builder = new OADocumentBuilder();
      const throwable = v => () => new OAOperationGroup(builder, {tags: v});
      const error = s =>
        format('Option "tags" must be an Array, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(null)).to.throw(error('null'));
      throwable([])();
      throwable(undefined)();
    });

    it('should require elements in the option "tags" to be a non-empty String', function () {
      const builder = new OADocumentBuilder();
      const throwable = v => () => new OAOperationGroup(builder, {tags: [v]});
      const error = s =>
        format(
          'Element 0 in the option "tags" must be a non-empty String, ' +
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
      throwable('str')();
    });

    it('should set a forward slash as the default path prefix', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder);
      expect(S.getPathPrefix()).to.be.eq('/');
    });

    it('should add the given path prefix to the group state', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {pathPrefix: '/prefix'});
      expect(S.getPathPrefix()).to.be.eq('/prefix');
    });

    it('should set an empty array as the default tags list', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder);
      expect(S.getTags()).to.be.eql([]);
    });

    it('should deduplicate the given tags list', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {tags: ['foo', 'foo', 'bar']});
      expect(S.getTags()).to.be.eql(['foo', 'bar']);
    });
  });

  describe('getBuilder', function () {
    it('should return an instance of the OADocumentBuilder', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder);
      expect(S.getBuilder()).to.be.eql(builder);
    });
  });

  describe('getPathPrefix', function () {
    it('should return a forward slash when no path prefix is specified', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder);
      expect(S.getPathPrefix()).to.be.eq('/');
    });

    it('should return the current path prefix', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {pathPrefix: '/prefix'});
      expect(S.getPathPrefix()).to.be.eq('/prefix');
    });
  });

  describe('getTags', function () {
    it('should return an empty array when no tags are specified', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder);
      expect(S.getTags()).to.be.eql([]);
    });

    it('should return a shallow copy of the current tags', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {tags: ['foo', 'bar']});
      const res1 = S.getTags();
      const res2 = S.getTags();
      expect(res1).to.be.eql(['foo', 'bar']);
      expect(res1).to.be.not.eq(res2);
    });
  });

  describe('defineOperation', function () {
    it('should require the parameter "operationDef" to be an Object', function () {
      const throwable = v => () => {
        const builder = new OADocumentBuilder();
        const S = new OAOperationGroup(builder);
        S.defineOperation(v);
      };
      const error = s =>
        format('Operation Definition must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({
        method: OAOperationMethod.POST,
        path: '/create',
        operation: {},
      })();
    });

    it('should require the keyword "path" to be a String', function () {
      const throwable = v => () => {
        const builder = new OADocumentBuilder();
        const S = new OAOperationGroup(builder);
        S.defineOperation({
          method: OAOperationMethod.POST,
          path: v,
          operation: {},
        });
      };
      const error = s =>
        format('Keyword "path" must be a String, but %s was given.', s);
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable('/path')();
    });

    it('should require the keyword "path" to start with a forward slash', function () {
      const throwable = v => () => {
        const builder = new OADocumentBuilder();
        const S = new OAOperationGroup(builder);
        S.defineOperation({
          method: OAOperationMethod.POST,
          path: v,
          operation: {},
        });
      };
      const error = s =>
        format('Operation path must start with "/", but %s was given.', s);
      expect(throwable('path')).to.throw(error('"path"'));
      expect(throwable('')).to.throw(error('""'));
      throwable('/path')();
      throwable('/')();
    });

    it('should require the keyword "method" to be a correct value', function () {
      const throwable = v => () => {
        const builder = new OADocumentBuilder();
        const S = new OAOperationGroup(builder);
        S.defineOperation({
          method: v,
          path: '/',
          operation: {},
        });
      };
      const error = s =>
        format(
          'Keyword "method" must be one of the allowed values, ' +
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
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      Object.values(OAOperationMethod).forEach(method => {
        throwable(method)();
      });
    });

    it('should require the keyword "operation" to be an Object', function () {
      const throwable = v => () => {
        const builder = new OADocumentBuilder();
        const S = new OAOperationGroup(builder);
        S.defineOperation({
          method: OAOperationMethod.GET,
          path: '/',
          operation: v,
        });
      };
      const error = s =>
        format('Keyword "operation" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({})();
    });

    it('should define operation in the document builder', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder);
      const operation = {
        parameters: [
          {
            name: 'id',
            in: OAParameterLocation.QUERY,
            schema: {type: OADataType.STRING},
          },
        ],
      };
      S.defineOperation({
        method: OAOperationMethod.POST,
        path: '/create',
        operation,
      });
      const doc = builder.getDocumentObjectRef();
      expect(doc.paths['/create'].post).to.be.eql(operation);
    });

    it('should add the path prefix to the operation path', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {pathPrefix: '/prefix'});
      S.defineOperation({
        method: OAOperationMethod.GET,
        path: '/path',
        operation: {},
      });
      const res = builder.getDocumentObjectRef();
      expect(res.paths['/prefix/path'].get).to.be.an('object');
    });

    it('should ignore the path prefix with a forward slash only', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {pathPrefix: '/'});
      S.defineOperation({
        method: OAOperationMethod.GET,
        path: '/path',
        operation: {},
      });
      const res = builder.getDocumentObjectRef();
      expect(res.paths['/path'].get).to.be.an('object');
    });

    it('should ignore the operation path with a forward slash only', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {pathPrefix: '/prefix'});
      S.defineOperation({
        method: OAOperationMethod.GET,
        path: '/',
        operation: {},
      });
      const res = builder.getDocumentObjectRef();
      expect(res.paths['/prefix'].get).to.be.an('object');
    });

    it('should add the group tags to the operation object', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {tags: ['foo', 'bar']});
      S.defineOperation({
        method: OAOperationMethod.GET,
        path: '/path',
        operation: {},
      });
      const res = builder.getDocumentObjectRef();
      expect(res.paths['/path'].get.tags).to.be.eql(['foo', 'bar']);
    });

    it('should merge the operation tags with the group tags', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {tags: ['foo']});
      S.defineOperation({
        method: OAOperationMethod.GET,
        path: '/path',
        operation: {tags: ['bar']},
      });
      const res = builder.getDocumentObjectRef();
      expect(res.paths['/path'].get.tags).to.be.eql(['foo', 'bar']);
    });

    it('should ignore the group tags existed in the operation object', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {tags: ['foo', 'bar']});
      S.defineOperation({
        method: OAOperationMethod.GET,
        path: '/path',
        operation: {tags: ['bar', 'baz']},
      });
      const res = builder.getDocumentObjectRef();
      expect(res.paths['/path'].get.tags).to.be.eql(['foo', 'bar', 'baz']);
    });

    it('should return itself', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder);
      const res = S.defineOperation({
        method: OAOperationMethod.GET,
        path: '/path',
        operation: {tags: ['bar', 'baz']},
      });
      expect(res).to.be.eq(S);
    });
  });

  describe('createOperationGroup', function () {
    it('should require the parameter "option" to be an Object', function () {
      const builder = new OADocumentBuilder();
      const throwable = v => () => {
        const S = new OAOperationGroup(builder);
        S.createOperationGroup(v);
      };
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

    it('should require the option "pathPrefix" to be a String', function () {
      const builder = new OADocumentBuilder();
      const throwable = v => () => {
        const S = new OAOperationGroup(builder);
        S.createOperationGroup({pathPrefix: v});
      };
      const error = s =>
        format('Option "pathPrefix" must be a String, but %s was given.', s);
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(null)).to.throw(error('null'));
      throwable('/')();
      throwable(undefined)();
    });

    it('should require the option "pathPrefix" to start with a forward slash', function () {
      const builder = new OADocumentBuilder();
      const throwable = v => () => {
        const S = new OAOperationGroup(builder);
        S.createOperationGroup({pathPrefix: v});
      };
      const error = s =>
        format('Option "pathPrefix" must start with "/", but %s was given.', s);
      expect(throwable('path')).to.throw(error('"path"'));
      expect(throwable('')).to.throw(error('""'));
      throwable('/path')();
      throwable('/')();
    });

    it('should require the option "tags" to be an Array', function () {
      const builder = new OADocumentBuilder();
      const throwable = v => () => {
        const S = new OAOperationGroup(builder);
        S.createOperationGroup({tags: v});
      };
      const error = s =>
        format('Option "tags" must be an Array, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(null)).to.throw(error('null'));
      throwable([])();
      throwable(undefined)();
    });

    it('should require elements in the option "tags" to be a non-empty String', function () {
      const builder = new OADocumentBuilder();
      const throwable = v => () => {
        const S = new OAOperationGroup(builder);
        S.createOperationGroup({tags: [v]});
      };
      const error = s =>
        format(
          'Element 0 in the option "tags" must be a non-empty String, ' +
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
      throwable('str')();
    });

    it('should add the current path prefix to the new group', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {pathPrefix: '/prefix'});
      const res = S.createOperationGroup();
      expect(res.getPathPrefix()).to.be.eq('/prefix');
    });

    it('should prepend the current path prefix to the new prefix', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {pathPrefix: '/a'});
      const res = S.createOperationGroup({pathPrefix: '/b'});
      expect(res.getPathPrefix()).to.be.eq('/a/b');
    });

    it('should ignore the current path prefix with a forward slash only', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {pathPrefix: '/'});
      const res = S.createOperationGroup({pathPrefix: '/prefix'});
      expect(res.getPathPrefix()).to.be.eq('/prefix');
    });

    it('should ignore the new path prefix with a forward slash only', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {pathPrefix: '/prefix'});
      const res = S.createOperationGroup({pathPrefix: '/'});
      expect(res.getPathPrefix()).to.be.eq('/prefix');
    });

    it('should add the current tags to the new group', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {tags: ['foo', 'bar']});
      const res = S.createOperationGroup();
      expect(res.getTags()).to.be.eql(['foo', 'bar']);
    });

    it('should merge the current tags with the new tags', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {tags: ['foo']});
      const res = S.createOperationGroup({tags: ['bar']});
      expect(res.getTags()).to.be.eql(['foo', 'bar']);
    });

    it('should ignore the current tags existed in the new tags', function () {
      const builder = new OADocumentBuilder();
      const S = new OAOperationGroup(builder, {tags: ['foo', 'bar']});
      const res = S.createOperationGroup({tags: ['bar', 'baz']});
      expect(res.getTags()).to.be.eql(['foo', 'bar', 'baz']);
    });
  });
});
