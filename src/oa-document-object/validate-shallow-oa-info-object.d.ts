import {OAInfoObject} from '../oa-specification.js';
import {ShallowValidationOptions} from './types.js';

/**
 * Validate shallow OAInfoObject.
 *
 * @param {object} oaInfoObject
 * @param {object} [options]
 */
export declare function validateShallowOAInfoObject(
  oaInfoObject: OAInfoObject,
  options?: ShallowValidationOptions,
): void;
