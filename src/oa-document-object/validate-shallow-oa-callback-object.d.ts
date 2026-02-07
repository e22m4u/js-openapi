import {ShallowValidationOptions} from './types.js';
import {OACallbackObject} from '../oa-specification.js';

/**
 * Validate shallow OACallbackObject.
 *
 * @param oaCallbackObject
 * @param options
 */
export function validateShallowOACallbackObject(
  oaCallbackObject: OACallbackObject,
  options?: ShallowValidationOptions,
): void;
