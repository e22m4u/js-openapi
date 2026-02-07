import {InvalidArgumentError} from '@e22m4u/js-format';
import {escapeJsonPointer} from '../json-pointer/index.js';
import {validateShallowOAPathItemObject} from './validate-shallow-oa-path-item-object.js';

/**
 * Validate shallow OAPathsObject.
 *
 * @param {import('../oa-specification.js').OAPathsObject} oaPathsObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAPathsObject(oaPathsObject, options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options,
    );
  }
  if (options.sourceUri !== undefined) {
    if (typeof options.sourceUri !== 'string') {
      throw new InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri,
      );
    }
  }
  const sourceUri = options.sourceUri || '';
  if (
    !oaPathsObject ||
    typeof oaPathsObject !== 'object' ||
    Array.isArray(oaPathsObject)
  ) {
    throw new InvalidArgumentError(
      'Paths Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaPathsObject,
    );
  }
  Object.keys(oaPathsObject).forEach(oaPathName => {
    // extension
    if (oaPathName.startsWith('x-')) {
      return;
    }
    // key
    if (!oaPathName) {
      throw new InvalidArgumentError(
        'Key in %v must be a non-empty String, but %v was given.',
        sourceUri,
        oaPathName,
      );
    }
    if (!oaPathName.startsWith('/')) {
      throw new InvalidArgumentError(
        'Key in %v must start with "/", but %v was given.',
        sourceUri,
        oaPathName,
      );
    }
    // value
    const oaPathItemObject = oaPathsObject[oaPathName];
    if (
      !oaPathItemObject ||
      typeof oaPathItemObject !== 'object' ||
      Array.isArray(oaPathItemObject)
    ) {
      throw new InvalidArgumentError(
        'Value at %v must be an Object, but %v was given.',
        `${sourceUri}/${escapeJsonPointer(oaPathName)}`,
        oaPathItemObject,
      );
    }
    validateShallowOAPathItemObject(oaPathsObject[oaPathName], {
      sourceUri: `${sourceUri}/${escapeJsonPointer(oaPathName)}`,
    });
  });
}
