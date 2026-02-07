import {ShallowValidationOptions} from './types.js';
import {OAServerObject} from '../oa-specification.js';

/**
 * Validate shallow OAServerObject.
 *
 * @param oaServerObject
 * @param options
 */
export declare function validateShallowOAServerObject(
  oaServerObject: OAServerObject,
  options?: ShallowValidationOptions,
): void;
