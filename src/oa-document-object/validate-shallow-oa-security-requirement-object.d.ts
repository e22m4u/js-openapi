import {ShallowValidationOptions} from './types.js';
import {OASecurityRequirementObject} from '../oa-specification.js';

/**
 * Validate shallow OASecurityRequirementObject.
 *
 * @param oaSecurityRequirementObject
 * @param options
 */
export declare function validateShallowOASecurityRequirementObject(
  oaSecurityRequirementObject: OASecurityRequirementObject,
  options?: ShallowValidationOptions,
): void;
