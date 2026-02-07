import {InvalidArgumentError} from '@e22m4u/js-format';
import {validateShallowOAExternalDocumentationObject} from './validate-shallow-oa-external-documentation-object.js';

/**
 * Tag Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#tag-object
 */
const OA_TAG_OBJECT_KEYWORDS = ['name', 'description', 'externalDocs'];

/**
 * Validate shallow OATagObject.
 *
 * @param {import('../oa-specification.js').OATagObject} oaTagObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOATagObject(oaTagObject, options = {}) {
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
    !oaTagObject ||
    typeof oaTagObject !== 'object' ||
    Array.isArray(oaTagObject)
  ) {
    throw new InvalidArgumentError(
      'Tag Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaTagObject,
    );
  }
  // [k]
  Object.keys(oaTagObject).forEach(keyword => {
    if (!/^x-/.test(keyword) && !OA_TAG_OBJECT_KEYWORDS.includes(keyword)) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // name
  if (!oaTagObject.name || typeof oaTagObject.name !== 'string') {
    throw new InvalidArgumentError(
      'Keyword "name" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaTagObject.name,
    );
  }
  // description
  if (oaTagObject.description !== undefined) {
    if (typeof oaTagObject.description !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaTagObject.description,
      );
    }
  }
  // externalDocs
  if (oaTagObject.externalDocs !== undefined) {
    if (
      !oaTagObject.externalDocs ||
      typeof oaTagObject.externalDocs !== 'object' ||
      Array.isArray(oaTagObject.externalDocs)
    ) {
      throw new InvalidArgumentError(
        'Keyword "externalDocs" at %v must be an Object, but %v was given.',
        sourceUri,
        oaTagObject.externalDocs,
      );
    }
    validateShallowOAExternalDocumentationObject(oaTagObject.externalDocs, {
      sourceUri: `${sourceUri}/externalDocs`,
    });
  }
}
