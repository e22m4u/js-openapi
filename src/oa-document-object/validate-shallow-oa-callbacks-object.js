import {InvalidArgumentError} from '@e22m4u/js-format';
import {escapeJsonPointer} from '../json-pointer/index.js';
import {isOAReferenceObject} from '../oa-reference-object/is-oa-reference-object.js';
import {validateShallowOAReferenceObject} from './validate-shallow-oa-reference-object.js';

/**
 * Validate shallow OACallbacksObject.
 *
 * @param {import('../oa-specification.js').OACallbacksObject} oaCallbacksObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOACallbacksObject(
  oaCallbacksObject,
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
    !oaCallbacksObject ||
    typeof oaCallbacksObject !== 'object' ||
    Array.isArray(oaCallbacksObject)
  ) {
    throw new InvalidArgumentError(
      'Callback Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaCallbacksObject,
    );
  }
  Object.keys(oaCallbacksObject).forEach(oaCallbackId => {
    // extension
    if (oaCallbackId.startsWith('x-')) {
      return;
    }
    // key
    if (!oaCallbackId) {
      throw new InvalidArgumentError(
        'Key in %v must be a non-empty String, but %v was given.',
        sourceUri,
        oaCallbackId,
      );
    }
    // value
    const oaCallbackObject = oaCallbacksObject[oaCallbackId];
    if (
      !oaCallbackObject ||
      typeof oaCallbackObject !== 'object' ||
      Array.isArray(oaCallbackObject)
    ) {
      throw new InvalidArgumentError(
        'Value at %v must be an Object, but %v was given.',
        `${sourceUri}/${escapeJsonPointer(oaCallbackId)}`,
        oaCallbackObject,
      );
    }
    if (isOAReferenceObject(oaCallbackObject)) {
      validateShallowOAReferenceObject(oaCallbackObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaCallbackId)}`,
      });
    } else {
      validateShallowOACallbacksObject(oaCallbackObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaCallbackId)}`,
      });
    }
  });
}
