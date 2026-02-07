import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Response Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#response-object
 */
const OA_RESPONSE_OBJECT_KEYWORDS = [
  'description',
  'headers',
  'content',
  'links',
];

/**
 * Validate shallow OAResponseObject.
 *
 * @param {import('../oa-specification.js').OAResponseObject} oaResponseObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAResponseObject(
  oaResponseObject,
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
    !oaResponseObject ||
    typeof oaResponseObject !== 'object' ||
    Array.isArray(oaResponseObject)
  ) {
    throw new InvalidArgumentError(
      'Response Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaResponseObject,
    );
  }
  // [k]
  Object.keys(oaResponseObject).forEach(keyword => {
    if (
      !/^x-/.test(keyword) &&
      !OA_RESPONSE_OBJECT_KEYWORDS.includes(keyword)
    ) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // description
  if (
    !oaResponseObject.description ||
    typeof oaResponseObject.description !== 'string'
  ) {
    throw new InvalidArgumentError(
      'Keyword "description" at %v must be a non-empty String, ' +
        'but %v was given.',
      sourceUri,
      oaResponseObject.description,
    );
  }
  // headers
  if (oaResponseObject.headers !== undefined) {
    if (
      !oaResponseObject.headers ||
      typeof oaResponseObject.headers !== 'object' ||
      Array.isArray(oaResponseObject.headers)
    ) {
      throw new InvalidArgumentError(
        'Keyword "headers" at %v must be an Object, but %v was given.',
        sourceUri,
        oaResponseObject.headers,
      );
    }
  }
  // content
  if (oaResponseObject.content !== undefined) {
    if (
      !oaResponseObject.content ||
      typeof oaResponseObject.content !== 'object' ||
      Array.isArray(oaResponseObject.content)
    ) {
      throw new InvalidArgumentError(
        'Keyword "content" at %v must be an Object, but %v was given.',
        sourceUri,
        oaResponseObject.content,
      );
    }
  }
  // links
  if (oaResponseObject.links !== undefined) {
    if (
      !oaResponseObject.links ||
      typeof oaResponseObject.links !== 'object' ||
      Array.isArray(oaResponseObject.links)
    ) {
      throw new InvalidArgumentError(
        'Keyword "links" at %v must be an Object, but %v was given.',
        sourceUri,
        oaResponseObject.links,
      );
    }
  }
}
