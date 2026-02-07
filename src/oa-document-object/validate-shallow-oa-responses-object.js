import {InvalidArgumentError} from '@e22m4u/js-format';
import {isOAReferenceObject} from '../oa-reference-object/is-oa-reference-object.js';
import {validateShallowOAResponseObject} from './validate-shallow-oa-response-object.js';
import {validateShallowOAReferenceObject} from './validate-shallow-oa-reference-object.js';

/**
 * Validate shallow OAResponsesObject.
 *
 * @param {import('../oa-specification.js').OAResponsesObject} oaResponsesObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAResponsesObject(
  oaResponsesObject,
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
    !oaResponsesObject ||
    typeof oaResponsesObject !== 'object' ||
    Array.isArray(oaResponsesObject)
  ) {
    throw new InvalidArgumentError(
      'Responses Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaResponsesObject,
    );
  }
  Object.keys(oaResponsesObject).forEach(oaStatusCode => {
    // extension
    if (oaStatusCode.startsWith('x-')) {
      return;
    }
    // key
    if (oaStatusCode !== 'default' && !/^[1-5][0-9]{2}$/.test(oaStatusCode)) {
      throw new InvalidArgumentError(
        'Key in %v must be "default" or a HTTP status code, but %v was given.',
        sourceUri,
        oaStatusCode,
      );
    }
    // value
    const oaResponseObject = oaResponsesObject[oaStatusCode];
    if (
      !oaResponseObject ||
      typeof oaResponseObject !== 'object' ||
      Array.isArray(oaResponseObject)
    ) {
      throw new InvalidArgumentError(
        'Value at %v must be an Object, but %v was given.',
        `${sourceUri}/${oaStatusCode}`,
        oaResponseObject,
      );
    }
    if (isOAReferenceObject(oaResponseObject)) {
      validateShallowOAReferenceObject(oaResponseObject, {
        sourceUri: `${sourceUri}/${oaStatusCode}`,
      });
    } else {
      validateShallowOAResponseObject(oaResponseObject, {
        sourceUri: `${sourceUri}/${oaStatusCode}`,
      });
    }
  });
}
