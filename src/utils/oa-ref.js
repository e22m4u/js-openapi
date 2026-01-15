import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Component type.
 */
export const OAComponentType = {
  SCHEMA: 'schema',
  RESPONSE: 'response',
  PARAMETER: 'parameter',
  EXAMPLE: 'example',
  REQUEST_BODY: 'requestBody',
  HEADER: 'header',
  SECURITY_SCHEME: 'securityScheme',
  LINK: 'link',
  CALLBACK: 'callback',
  PATH_ITEM: 'pathItem',
};

/**
 * Component type to key map.
 */
export const OA_COMPONENT_TYPE_TO_KEY_MAP = {
  [OAComponentType.SCHEMA]: 'schemas',
  [OAComponentType.RESPONSE]: 'responses',
  [OAComponentType.PARAMETER]: 'parameters',
  [OAComponentType.EXAMPLE]: 'examples',
  [OAComponentType.REQUEST_BODY]: 'requestBodies',
  [OAComponentType.HEADER]: 'headers',
  [OAComponentType.SECURITY_SCHEME]: 'securitySchemes',
  [OAComponentType.LINK]: 'links',
  [OAComponentType.CALLBACK]: 'callbacks',
  [OAComponentType.PATH_ITEM]: 'pathItems',
};

/**
 * Create the Reference Object.
 *
 * Example:
 *
 * ```js
 * oaRef('User', OAComponentType.SCHEMA);
 * // {"$ref": "#/components/schemas/User"}
 * ```
 *
 * @param {string} name
 * @param {string} type
 * @returns {object}
 */
export function oaRef(name, type) {
  if (!name || typeof name !== 'string') {
    throw new InvalidArgumentError(
      'Parameter "name" must be a non-empty String, but %v was given.',
      name,
    );
  }
  if (!type || typeof type !== 'string') {
    throw new InvalidArgumentError(
      'Parameter "type" must be a non-empty String, but %v was given.',
      type,
    );
  }
  const key = OA_COMPONENT_TYPE_TO_KEY_MAP[type];
  if (!key) {
    throw new InvalidArgumentError('Component type %v is not supported.', type);
  }
  return {$ref: `#/components/${key}/${name}`};
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
