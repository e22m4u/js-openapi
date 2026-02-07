import {OAReferenceObject} from '../oa-specification.js';
import {ShallowValidationOptions} from './types.js';

/**
 * Validate shallow OAReferenceObject.
 *
 * @param oaReferenceObject
 * @param options
 */
export declare function validateShallowOAReferenceObject(
  oaReferenceObject: OAReferenceObject,
  options?: ShallowValidationOptions,
): void;
