import {expect} from 'chai';
import {isOAReferenceObject} from './is-oa-reference-object.js';

describe('isOAReferenceObject', function () {
  it('should return true when the given value is a reference object', function () {
    expect(isOAReferenceObject('str')).to.be.false;
    expect(isOAReferenceObject('')).to.be.false;
    expect(isOAReferenceObject(10)).to.be.false;
    expect(isOAReferenceObject(0)).to.be.false;
    expect(isOAReferenceObject(true)).to.be.false;
    expect(isOAReferenceObject(false)).to.be.false;
    expect(isOAReferenceObject({})).to.be.false;
    expect(isOAReferenceObject([])).to.be.false;
    expect(isOAReferenceObject(undefined)).to.be.false;
    expect(isOAReferenceObject(null)).to.be.false;
    expect(isOAReferenceObject({$ref: '123'})).to.be.true;
    expect(isOAReferenceObject({$dynamicRef: '123'})).to.be.false;
  });
});
