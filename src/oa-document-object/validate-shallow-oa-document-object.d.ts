import {ShallowValidationOptions} from './types.js';
import {OADocumentObject} from '../oa-specification.js';

/**
 * Validate shallow OADocumentObject.
 *
 * @param oaDocumentObject
 */
export declare function validateShallowOADocumentObject(
  oaDocumentObject: OADocumentObject,
  options?: ShallowValidationOptions,
): void;
