import {InvalidArgumentError} from '@e22m4u/js-format';
import {escapeJsonPointer} from '../json-pointer/index.js';
import {OA_COMPONENT_NAME_REGEX} from '../oa-document-builder.js';

/**
 * Create the Reference Object.
 *
 * @param {string} name
 * @param {string} segment
 * @returns {object}
 */
function oaRef(name, segment) {
  if (!name || typeof name !== 'string') {
    throw new InvalidArgumentError(
      'Parameter "name" must be a non-empty String, but %v was given.',
      name,
    );
  }
  if (!OA_COMPONENT_NAME_REGEX.test(name)) {
    throw new InvalidArgumentError(
      'Component name %v contains invalid characters.',
      name,
    );
  }
  const escapedName = escapeJsonPointer(name);
  return {$ref: `#/components/${segment}/${escapedName}`};
}

/* aliases */
export const oaSchemaRef = name => oaRef(name, 'schemas');
export const oaResponseRef = name => oaRef(name, 'responses');
export const oaParameterRef = name => oaRef(name, 'parameters');
export const oaExampleRef = name => oaRef(name, 'examples');
export const oaRequestBodyRef = name => oaRef(name, 'requestBodies');
export const oaSecuritySchemeRef = name => oaRef(name, 'securitySchemes');
export const oaLinkRef = name => oaRef(name, 'links');
export const oaCallbackRef = name => oaRef(name, 'callbacks');
export const oaPathItemRef = name => oaRef(name, 'pathItems');
