import {ShallowValidationOptions} from './types.js';
import {OAResponseObject} from '../oa-specification.js';

/**
 * Validate shallow OAResponseObject.
 *
 * @param oaResponseObject
 * @param options
 */
export function validateShallowOAResponseObject(
  oaResponseObject: OAResponseObject,
  options?: ShallowValidationOptions,
): void;
