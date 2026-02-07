import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Server Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#server-object
 */
const OA_SERVER_OBJECT_KEYWORDS = ['url', 'description', 'variables'];

/**
 * Validate shallow OAServerObject.
 *
 * @param {import('../oa-specification.js').OAServerObject} oaServerObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAServerObject(oaServerObject, options = {}) {
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
    !oaServerObject ||
    typeof oaServerObject !== 'object' ||
    Array.isArray(oaServerObject)
  ) {
    throw new InvalidArgumentError(
      'OpenAPI Server Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaServerObject,
    );
  }
  // [k]
  Object.keys(oaServerObject).forEach(keyword => {
    if (!/^x-/.test(keyword) && !OA_SERVER_OBJECT_KEYWORDS.includes(keyword)) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // url
  if (!oaServerObject.url || typeof oaServerObject.url !== 'string') {
    throw new InvalidArgumentError(
      'Keyword "url" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaServerObject.url,
    );
  }
  // description
  if (oaServerObject.description !== undefined) {
    if (typeof oaServerObject.description !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaServerObject.description,
      );
    }
  }
  // variables
  if (oaServerObject.variables !== undefined) {
    if (
      !oaServerObject.variables ||
      typeof oaServerObject.variables !== 'object' ||
      Array.isArray(oaServerObject.variables)
    ) {
      throw new InvalidArgumentError(
        'Keyword "variables" at %v must be an Object, but %v was given.',
        sourceUri,
        oaServerObject.variables,
      );
    }
  }
}
