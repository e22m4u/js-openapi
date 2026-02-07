import {InvalidArgumentError} from '@e22m4u/js-format';
import {escapeJsonPointer} from '../json-pointer/index.js';

/**
 * Validate shallow OASecurityRequirementObject.
 *
 * @param {import('../oa-specification.js').OASecurityRequirementObject} oaSecurityRequirementObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOASecurityRequirementObject(
  oaSecurityRequirementObject,
  options = {},
) {
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
    !oaSecurityRequirementObject ||
    typeof oaSecurityRequirementObject !== 'object' ||
    Array.isArray(oaSecurityRequirementObject)
  ) {
    throw new InvalidArgumentError(
      'Security Requirement Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaSecurityRequirementObject,
    );
  }
  Object.keys(oaSecurityRequirementObject).forEach(oaSchemeName => {
    // key
    if (!oaSchemeName) {
      throw new InvalidArgumentError(
        'Key in %v must be a non-empty String, but %v was given.',
        sourceUri,
        oaSchemeName,
      );
    }
    // value
    const oaSecurityScopes = oaSecurityRequirementObject[oaSchemeName];
    if (!Array.isArray(oaSecurityScopes)) {
      throw new InvalidArgumentError(
        'Value at %v must be an Array, but %v was given.',
        `${sourceUri}/${escapeJsonPointer(oaSchemeName)}`,
        oaSecurityScopes,
      );
    }
    oaSecurityScopes.forEach((oaSecurityScope, index) => {
      if (!oaSecurityScope || typeof oaSecurityScope !== 'string') {
        throw new InvalidArgumentError(
          'Element %v at %v must be a non-empty String, but %v was given.',
          index,
          `${sourceUri}/${escapeJsonPointer(oaSchemeName)}`,
          oaSecurityScope,
        );
      }
    });
  });
}
