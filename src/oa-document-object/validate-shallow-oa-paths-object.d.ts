import {ShallowValidationOptions} from './types.js';
import {OAPathsObject} from '../oa-specification.js';

/**
 * Validate shallow OAPathsObject.
 *
 * @param oaPathsObject
 * @param options
 */
export declare function validateShallowOAPathsObject(
  oaPathsObject: OAPathsObject,
  options?: ShallowValidationOptions,
): void;
