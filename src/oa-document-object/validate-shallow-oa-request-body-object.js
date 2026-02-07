import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Request Body Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#request-body-object
 */
const OA_REQUEST_BODY_OBJECT_KEYWORDS = ['description', 'content', 'required'];

/**
 * Validate shallow OARequestBodyObject.
 *
 * @param {import('../oa-specification.js').OARequestBodyObject} oaRequestBodyObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOARequestBodyObject(
  oaRequestBodyObject,
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
    !oaRequestBodyObject ||
    typeof oaRequestBodyObject !== 'object' ||
    Array.isArray(oaRequestBodyObject)
  ) {
    throw new InvalidArgumentError(
      'Request Body Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaRequestBodyObject,
    );
  }
  // [k]
  Object.keys(oaRequestBodyObject).forEach(keyword => {
    if (
      !/^x-/.test(keyword) &&
      !OA_REQUEST_BODY_OBJECT_KEYWORDS.includes(keyword)
    ) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // description
  if (oaRequestBodyObject.description !== undefined) {
    if (typeof oaRequestBodyObject.description !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaRequestBodyObject.description,
      );
    }
  }
  // content
  if (
    !oaRequestBodyObject.content ||
    typeof oaRequestBodyObject.content !== 'object' ||
    Array.isArray(oaRequestBodyObject.content)
  ) {
    throw new InvalidArgumentError(
      'Keyword "content" at %v must be an Object, but %v was given.',
      sourceUri,
      oaRequestBodyObject.content,
    );
  }
  // required
  if (oaRequestBodyObject.required !== undefined) {
    if (typeof oaRequestBodyObject.required !== 'boolean') {
      throw new InvalidArgumentError(
        'Keyword "required" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaRequestBodyObject.required,
      );
    }
  }
}
