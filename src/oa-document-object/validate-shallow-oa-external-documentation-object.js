import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * External Documentation Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#external-documentation-object
 */
const OA_DOCUMENTATION_OBJECT_KEYWORDS = ['description', 'url'];

/**
 * Validate shallow OAExternalDocumentationObject.
 *
 * @param {import('../oa-specification.js').OAExternalDocumentationObject} oaExternalDocumentationObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAExternalDocumentationObject(
  oaExternalDocumentationObject,
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
    !oaExternalDocumentationObject ||
    typeof oaExternalDocumentationObject !== 'object' ||
    Array.isArray(oaExternalDocumentationObject)
  ) {
    throw new InvalidArgumentError(
      'External Documentation Object at %v must be an Object, ' +
        'but %v was given.',
      sourceUri,
      oaExternalDocumentationObject,
    );
  }
  // [k]
  Object.keys(oaExternalDocumentationObject).forEach(keyword => {
    if (
      !/^x-/.test(keyword) &&
      !OA_DOCUMENTATION_OBJECT_KEYWORDS.includes(keyword)
    ) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // description
  if (oaExternalDocumentationObject.description !== undefined) {
    if (typeof oaExternalDocumentationObject.description !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaExternalDocumentationObject.description,
      );
    }
  }
  // url
  if (
    !oaExternalDocumentationObject.url ||
    typeof oaExternalDocumentationObject.url !== 'string'
  ) {
    throw new InvalidArgumentError(
      'Keyword "url" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaExternalDocumentationObject.url,
    );
  }
}
