import {OAComponentsSegment} from '../constants.js';
import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Create the Reference Object.
 *
 * Example:
 *
 * ```js
 * oaRef('User', OAComponentsSegment.SCHEMAS);
 * // {"$ref": "#/components/schemas/User"}
 * ```
 *
 * @param {string} name
 * @param {string} segment
 * @returns {object}
 */
export function oaRef(name, segment) {
  if (!name || typeof name !== 'string') {
    throw new InvalidArgumentError(
      'Parameter "name" must be a non-empty String, but %v was given.',
      name,
    );
  }
  if (!Object.values(OAComponentsSegment).includes(segment)) {
    throw new InvalidArgumentError(
      'Parameter "segment" must be one of values: %l, but %v was given.',
      Object.values(OAComponentsSegment),
      segment,
    );
  }
  return {$ref: `#/components/${segment}/${name}`};
}

/* aliases */
export const oaSchemaRef = name => oaRef(name, OAComponentsSegment.SCHEMAS);
export const oaResponseRef = name => oaRef(name, OAComponentsSegment.RESPONSES);
export const oaParameterRef = name =>
  oaRef(name, OAComponentsSegment.PARAMETERS);
export const oaExampleRef = name => oaRef(name, OAComponentsSegment.EXAMPLES);
export const oaRequestBodyRef = name =>
  oaRef(name, OAComponentsSegment.REQUEST_BODIES);
export const oaSecuritySchemeRef = name =>
  oaRef(name, OAComponentsSegment.SECURITY_SCHEMES);
export const oaLinkRef = name => oaRef(name, OAComponentsSegment.LINKS);
export const oaCallbackRef = name => oaRef(name, OAComponentsSegment.CALLBACKS);
export const oaPathItemRef = name =>
  oaRef(name, OAComponentsSegment.PATH_ITEMS);
