import {InvalidArgumentError} from '@e22m4u/js-format';

import {
  OAComponentType,
  OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP,
} from '../oa-component-registry.js';

/**
 * Create the Reference Object.
 *
 * @param {string} name
 * @param {string} type
 * @returns {object}
 */
function oaRef(name, type) {
  if (!name || typeof name !== 'string') {
    throw new InvalidArgumentError(
      'Parameter "name" must be a non-empty String, but %v was given.',
      name,
    );
  }
  if (!Object.values(OAComponentType).includes(type)) {
    throw new InvalidArgumentError('Component type %v is not supported.', type);
  }
  const segment = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
  return {$ref: `#/components/${segment}/${name}`};
}

/* aliases */
export const oaSchemaRef = name => oaRef(name, OAComponentType.SCHEMA);
export const oaResponseRef = name => oaRef(name, OAComponentType.RESPONSE);
export const oaParameterRef = name => oaRef(name, OAComponentType.PARAMETER);
export const oaExampleRef = name => oaRef(name, OAComponentType.EXAMPLE);
export const oaRequestBodyRef = name =>
  oaRef(name, OAComponentType.REQUEST_BODY);
export const oaSecuritySchemeRef = name =>
  oaRef(name, OAComponentType.SECURITY_SCHEME);
export const oaLinkRef = name => oaRef(name, OAComponentType.LINK);
export const oaCallbackRef = name => oaRef(name, OAComponentType.CALLBACK);
export const oaPathItemRef = name => oaRef(name, OAComponentType.PATH_ITEM);
