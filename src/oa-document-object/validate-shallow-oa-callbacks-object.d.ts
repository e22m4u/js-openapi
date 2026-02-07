import {ShallowValidationOptions} from './types.js';
import {OACallbacksObject} from '../oa-specification.js';

/**
 * Validate shallow OACallbacksObject.
 *
 * @param oaCallbacksObject
 * @param options
 */
export function validateShallowOACallbacksObject(
  oaCallbacksObject: OACallbacksObject,
  options?: ShallowValidationOptions,
): void;
