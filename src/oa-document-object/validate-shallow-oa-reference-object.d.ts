import {OAPathsObject} from '../oa-specification.js';
import {ShallowValidationOptions} from './types.js';

/**
 * Validate shallow OAReferenceObject.
 *
 * @param oaPathsObject
 * @param options
 */
export declare function validateShallowOAReferenceObject(
  oaPathsObject: OAPathsObject,
  options?: ShallowValidationOptions,
): void;
