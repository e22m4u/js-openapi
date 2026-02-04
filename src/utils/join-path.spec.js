import {expect} from 'chai';
import {joinPath} from './join-path.js';

describe('joinPath', function () {
  describe('path joining', function () {
    it('should join multiple segments with a forward slash', function () {
      const result = joinPath('api', 'v1', 'users');
      expect(result).to.be.eq('/api/v1/users');
    });

    it('should always return a path starting with a single forward slash', function () {
      expect(joinPath('users')).to.be.eq('/users');
      expect(joinPath('/users')).to.be.eq('/users');
    });

    it('should remove leading slashes from segments', function () {
      const result = joinPath('/api', '/v1', '/users');
      expect(result).to.be.eq('/api/v1/users');
    });

    it('should remove trailing slashes from segments', function () {
      const result = joinPath('api/', 'v1/', 'users/');
      expect(result).to.be.eq('/api/v1/users');
    });

    it('should handle segments with both leading and trailing slashes', function () {
      const result = joinPath('/api/', '/v1/', '/users/');
      expect(result).to.be.eq('/api/v1/users');
    });

    it('should ignore empty string segments', function () {
      const result = joinPath('api', '', 'v1', '', 'users');
      expect(result).to.be.eq('/api/v1/users');
    });

    it('should ignore null and undefined segments', function () {
      const result = joinPath('api', null, 'v1', undefined, 'users');
      expect(result).to.be.eq('/api/v1/users');
    });

    it('should handle a single segment correctly', function () {
      expect(joinPath('users')).to.be.eq('/users');
      expect(joinPath('/users/')).to.be.eq('/users');
    });

    it('should return a single slash when no segments are provided', function () {
      const result = joinPath();
      expect(result).to.be.eq('/');
    });

    it('should return a single slash if all segments are empty or falsy', function () {
      const result = joinPath('', null, '', undefined);
      expect(result).to.be.eq('/');
    });

    it('should treat a single slash segment as an empty segment', function () {
      const result = joinPath('api', '/', 'users');
      expect(result).to.be.eq('/api/users');
    });

    it('should not add extra slashes if segments are already joined', function () {
      const result = joinPath('api/v1', 'users');
      expect(result).to.be.eq('/api/v1/users');
    });

    it('should convert number arguments to string segments', function () {
      const result = joinPath(-10, 0, 10);
      expect(result).to.be.eq('/-10/0/10');
    });

    it('should remove duplicate slashes', function () {
      const result = joinPath('/', '//foo//', '///bar///');
      expect(result).to.be.eq('/foo/bar');
    });
  });

  describe('url joining', function () {
    it('should preserve http:// protocol', function () {
      const result = joinPath('http://example.com', 'api', 'v1');
      expect(result).to.be.eq('http://example.com/api/v1');
    });

    it('should preserve https:// protocol', function () {
      const result = joinPath('https://api.example.com/', '/users');
      expect(result).to.be.eq('https://api.example.com/users');
    });

    it('should handle protocols with extra slashes in segments', function () {
      const result = joinPath('https://site.com//', '//api//');
      expect(result).to.be.eq('https://site.com/api');
    });

    it('should handle custom protocols (e.g. postgres://)', function () {
      const result = joinPath('postgres://user:pass@localhost', 'db');
      expect(result).to.be.eq('postgres://user:pass@localhost/db');
    });

    it('should not add a leading slash if a protocol is present', function () {
      const result = joinPath('http://localhost');
      expect(result).to.be.eq('http://localhost');
      expect(result.startsWith('/')).to.be.false;
    });
  });
});
