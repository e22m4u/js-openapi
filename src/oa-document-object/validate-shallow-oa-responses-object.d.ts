import {ShallowValidationOptions} from './types.js';
import {OAResponsesObject} from '../oa-specification.js';

/**
 * Validate shallow OAResponsesObject.
 *
 * @param oaResponsesObject
 * @param options
 */
export function validateShallowOAResponsesObject(
  oaResponsesObject: OAResponsesObject,
  options?: ShallowValidationOptions,
): void;
