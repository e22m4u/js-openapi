import {InvalidArgumentError} from '@e22m4u/js-format';
import {escapeJsonPointer} from '../json-pointer/index.js';
import {isOAReferenceObject} from '../oa-reference-object/is-oa-reference-object.js';
import {validateShallowOAPathItemObject} from './validate-shallow-oa-path-item-object.js';
import {validateShallowOAReferenceObject} from './validate-shallow-oa-reference-object.js';

/**
 * Validate shallow OACallbackObject.
 *
 * @param {import('../oa-specification.js').OACallbackObject} oaCallbackObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOACallbackObject(
  oaCallbackObject,
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
    !oaCallbackObject ||
    typeof oaCallbackObject !== 'object' ||
    Array.isArray(oaCallbackObject)
  ) {
    throw new InvalidArgumentError(
      'Callback Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaCallbackObject,
    );
  }
  Object.keys(oaCallbackObject).forEach(oaRuntimeExpression => {
    // extension
    if (oaRuntimeExpression.startsWith('x-')) {
      return;
    }
    // key
    if (!oaRuntimeExpression) {
      throw new InvalidArgumentError(
        'Key in %v must be a non-empty String, but %v was given.',
        sourceUri,
        oaRuntimeExpression,
      );
    }
    // value
    const oaPathItemObject = oaCallbackObject[oaRuntimeExpression];
    if (
      !oaPathItemObject ||
      typeof oaPathItemObject !== 'object' ||
      Array.isArray(oaPathItemObject)
    ) {
      throw new InvalidArgumentError(
        'Value at %v must be an Object, but %v was given.',
        `${sourceUri}/${escapeJsonPointer(oaRuntimeExpression)}`,
        oaPathItemObject,
      );
    }
    if (isOAReferenceObject(oaPathItemObject)) {
      validateShallowOAReferenceObject(oaPathItemObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaRuntimeExpression)}`,
      });
    } else {
      validateShallowOAPathItemObject(oaPathItemObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaRuntimeExpression)}`,
      });
    }
  });
}
