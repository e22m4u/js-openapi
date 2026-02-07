import {ShallowValidationOptions} from './types.js';
import {OAParameterObject} from '../oa-specification.js';

/**
 * Validate shallow OAParameterObject.
 *
 * @param oaParameterObject
 * @param options
 */
export function validateShallowOAParameterObject(
  oaParameterObject: OAParameterObject,
  options?: ShallowValidationOptions,
): void;
