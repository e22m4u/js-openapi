import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Info Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#info-object
 */
const OA_INFO_OBJECT_KEYWORDS = [
  'title',
  'summary',
  'description',
  'termsOfService',
  'contact',
  'license',
  'version',
];

/**
 * Validate shallow OAInfoObject.
 *
 * @param {import('../oa-specification.js').OAInfoObject} oaInfoObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAInfoObject(oaInfoObject, options = {}) {
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
    !oaInfoObject ||
    typeof oaInfoObject !== 'object' ||
    Array.isArray(oaInfoObject)
  ) {
    throw new InvalidArgumentError(
      'OpenAPI Info Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaInfoObject,
    );
  }
  // [k]
  Object.keys(oaInfoObject).forEach(keyword => {
    if (!/^x-/.test(keyword) && !OA_INFO_OBJECT_KEYWORDS.includes(keyword)) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // title
  if (!oaInfoObject.title || typeof oaInfoObject.title !== 'string') {
    throw new InvalidArgumentError(
      'Keyword "title" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaInfoObject.title,
    );
  }
  // summary
  if (oaInfoObject.summary !== undefined) {
    if (typeof oaInfoObject.summary !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "summary" at %v must be a String, but %v was given.',
        sourceUri,
        oaInfoObject.summary,
      );
    }
  }
  // description
  if (oaInfoObject.description !== undefined) {
    if (typeof oaInfoObject.description !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaInfoObject.description,
      );
    }
  }
  // termsOfService
  if (oaInfoObject.termsOfService !== undefined) {
    if (typeof oaInfoObject.termsOfService !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "termsOfService" at %v must be a String, but %v was given.',
        sourceUri,
        oaInfoObject.termsOfService,
      );
    }
  }
  // contact
  if (oaInfoObject.contact !== undefined) {
    if (
      !oaInfoObject.contact ||
      typeof oaInfoObject.contact !== 'object' ||
      Array.isArray(oaInfoObject.contact)
    ) {
      throw new InvalidArgumentError(
        'Keyword "contact" at %v must be an Object, but %v was given.',
        sourceUri,
        oaInfoObject.contact,
      );
    }
  }
  // license
  if (oaInfoObject.license !== undefined) {
    if (
      !oaInfoObject.license ||
      typeof oaInfoObject.license !== 'object' ||
      Array.isArray(oaInfoObject.license)
    ) {
      throw new InvalidArgumentError(
        'Keyword "license" at %v must be an Object, but %v was given.',
        sourceUri,
        oaInfoObject.license,
      );
    }
  }
  // version
  if (!oaInfoObject.version || typeof oaInfoObject.version !== 'string') {
    throw new InvalidArgumentError(
      'Keyword "version" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaInfoObject.version,
    );
  }
}
