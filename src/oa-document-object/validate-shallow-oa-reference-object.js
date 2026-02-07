import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Reference Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#reference-object
 */
const OA_REFERENCE_OBJECT_KEYWORDS = ['$ref', 'summary', 'description'];

/**
 * Validate shallow OAReferenceObject.
 *
 * @param {import('../oa-specification.js').OAReferenceObject} oaReferenceObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAReferenceObject(
  oaReferenceObject,
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
    !oaReferenceObject ||
    typeof oaReferenceObject !== 'object' ||
    Array.isArray(oaReferenceObject)
  ) {
    throw new InvalidArgumentError(
      'Reference Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaReferenceObject,
    );
  }
  // [k]
  Object.keys(oaReferenceObject).forEach(keyword => {
    if (
      !/^x-/.test(keyword) &&
      !OA_REFERENCE_OBJECT_KEYWORDS.includes(keyword)
    ) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // $ref
  if (typeof oaReferenceObject.$ref !== 'string') {
    throw new InvalidArgumentError(
      'Keyword "$ref" at %v must be a String, but %v was given.',
      sourceUri,
      oaReferenceObject.$ref,
    );
  }
  // summary
  if (oaReferenceObject.summary !== undefined) {
    if (typeof oaReferenceObject.summary !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "summary" at %v must be a String, but %v was given.',
        sourceUri,
        oaReferenceObject.summary,
      );
    }
  }
  // description
  if (oaReferenceObject.description !== undefined) {
    if (typeof oaReferenceObject.description !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaReferenceObject.description,
      );
    }
  }
}
