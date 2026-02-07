import {ShallowValidationOptions} from './types.js';
import {OARequestBodyObject} from '../oa-specification.js';

/**
 * Validate shallow OARequestBodyObject.
 *
 * @param oaRequestBodyObject
 * @param options
 */
export function validateShallowOARequestBodyObject(
  oaRequestBodyObject: OARequestBodyObject,
  options?: ShallowValidationOptions,
): void;
