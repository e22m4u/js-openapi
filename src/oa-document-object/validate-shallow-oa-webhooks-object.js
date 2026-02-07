import {InvalidArgumentError} from '@e22m4u/js-format';
import {escapeJsonPointer} from '../json-pointer/index.js';
import {isOAReferenceObject} from '../oa-reference-object/is-oa-reference-object.js';
import {validateShallowOAPathItemObject} from './validate-shallow-oa-path-item-object.js';
import {validateShallowOAReferenceObject} from './validate-shallow-oa-reference-object.js';

/**
 * Validate shallow OAWebhooksObject.
 *
 * @param {import('../oa-specification.js').OAWebhooksObject} oaWebhooksObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAWebhooksObject(
  oaWebhooksObject,
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
    !oaWebhooksObject ||
    typeof oaWebhooksObject !== 'object' ||
    Array.isArray(oaWebhooksObject)
  ) {
    throw new InvalidArgumentError(
      'Webhooks Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaWebhooksObject,
    );
  }
  Object.keys(oaWebhooksObject).forEach(oaWebhookName => {
    // extension
    if (oaWebhookName.startsWith('x-')) {
      return;
    }
    // key
    if (!oaWebhookName) {
      throw new InvalidArgumentError(
        'Key in %v must be a non-empty String, but %v was given.',
        sourceUri,
        oaWebhookName,
      );
    }
    // value
    const oaPathItemObject = oaWebhooksObject[oaWebhookName];
    if (
      !oaPathItemObject ||
      typeof oaPathItemObject !== 'object' ||
      Array.isArray(oaPathItemObject)
    ) {
      throw new InvalidArgumentError(
        'Value at %v must be an Object, but %v was given.',
        `${sourceUri}/${escapeJsonPointer(oaWebhookName)}`,
        oaPathItemObject,
      );
    }
    if (isOAReferenceObject(oaPathItemObject)) {
      validateShallowOAReferenceObject(oaPathItemObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaWebhookName)}`,
      });
    } else {
      validateShallowOAPathItemObject(oaPathItemObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaWebhookName)}`,
      });
    }
  });
}
