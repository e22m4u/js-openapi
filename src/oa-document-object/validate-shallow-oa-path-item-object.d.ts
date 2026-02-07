import {ShallowValidationOptions} from './types.js';
import {OAPathItemObject} from '../oa-specification.js';

/**
 * Validate shallow OAPathItemObject.
 *
 * @param oaPathItemObject
 */
export declare function validateShallowOAPathItemObject(
  oaPathItemObject: OAPathItemObject,
  options?: ShallowValidationOptions,
): void;
