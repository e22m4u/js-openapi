import {OATagObject} from '../oa-specification.js';
import {ShallowValidationOptions} from './types.js';

/**
 * Validate shallow OATagObject.
 *
 * @param oaTagObject
 * @param options
 */
export function validateShallowOATagObject(
  oaTagObject: OATagObject,
  options?: ShallowValidationOptions,
): void;
