import {ShallowValidationOptions} from './types.js';
import {OAWebhooksObject} from '../oa-specification.js';

/**
 * Validate shallow OAWebhooksObject.
 *
 * @param oaWebhooksObject
 * @param options
 */
export function validateShallowOAWebhooksObject(
  oaWebhooksObject: OAWebhooksObject,
  options?: ShallowValidationOptions,
): void;
