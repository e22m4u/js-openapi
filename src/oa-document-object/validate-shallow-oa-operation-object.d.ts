import {OAOperationObject} from '../oa-specification.js';
import {ShallowValidationOptions} from './types.js';

/**
 * Validate shallow OAOperationObject.
 *
 * @param oaOperationObject
 * @param options
 */
export declare function validateShallowOAOperationObject(
  oaOperationObject: OAOperationObject,
  options?: ShallowValidationOptions,
): void;
