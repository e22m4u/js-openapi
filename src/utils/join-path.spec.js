import {expect} from 'chai';
import {joinPath} from './join-path.js';

describe('joinPath', function() {
  it('should join multiple segments with a forward slash', function() {
    const result = joinPath('api', 'v1', 'users');
    expect(result).to.be.eq('/api/v1/users');
  });

  it('should always return a path starting with a single forward slash', function() {
    expect(joinPath('users')).to.be.eq('/users');
    expect(joinPath('/users')).to.be.eq('/users');
  });

  it('should remove leading slashes from segments', function() {
    const result = joinPath('/api', '/v1', '/users');
    expect(result).to.be.eq('/api/v1/users');
  });

  it('should remove trailing slashes from segments', function() {
    const result = joinPath('api/', 'v1/', 'users/');
    expect(result).to.be.eq('/api/v1/users');
  });

  it('should handle segments with both leading and trailing slashes', function() {
    const result = joinPath('/api/', '/v1/', '/users/');
    expect(result).to.be.eq('/api/v1/users');
  });

  it('should ignore empty string segments', function() {
    const result = joinPath('api', '', 'v1', '', 'users');
    expect(result).to.be.eq('/api/v1/users');
  });

  it('should ignore null and undefined segments', function() {
    const result = joinPath('api', null, 'v1', undefined, 'users');
    expect(result).to.be.eq('/api/v1/users');
  });

  it('should handle a single segment correctly', function() {
    expect(joinPath('users')).to.be.eq('/users');
    expect(joinPath('/users/')).to.be.eq('/users');
  });

  it('should return a single slash when no segments are provided', function() {
    const result = joinPath();
    expect(result).to.be.eq('/');
  });

  it('should return a single slash if all segments are empty or falsy', function() {
    const result = joinPath('', null, '', undefined);
    expect(result).to.be.eq('/');
  });

  it('should treat a single slash segment as an empty segment', function() {
    const result = joinPath('api', '/', 'users');
    expect(result).to.be.eq('/api/users');
  });

  it('should not add extra slashes if segments are already joined', function() {
    const result = joinPath('api/v1', 'users');
    expect(result).to.be.eq('/api/v1/users');
  });
});
