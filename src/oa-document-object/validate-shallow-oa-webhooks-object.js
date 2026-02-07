import {InvalidArgumentError} from '@e22m4u/js-format';
import {escapeJsonPointer} from '../json-pointer/index.js';
import {validateShallowOAPathItemObject} from './validate-shallow-oa-path-item-object.js';

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
      'OpenAPI Webhooks Object at %v must be an Object, ' + 'but %v was given.',
      sourceUri,
      oaWebhooksObject,
    );
  }
  Object.keys(oaWebhooksObject).forEach(oaWebhookName => {
    // extension
    if (oaWebhookName.startsWith('x-')) {
      return;
    }
    // webhook name
    if (!oaWebhookName) {
      throw new InvalidArgumentError(
        'Webhook name at %v must be a non-empty String, but %v was given.',
        sourceUri,
        oaWebhookName,
      );
    }
    // path item object
    validateShallowOAPathItemObject(oaWebhooksObject[oaWebhookName], {
      sourceUri: `${sourceUri}/${escapeJsonPointer(oaWebhookName)}`,
    });
  });
}
