import {Service} from '@e22m4u/js-service';
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
 * Component type to components key map.
 */
export const OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP = {
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
 * Component registry.
 */
export class OAComponentRegistry extends Service {
  /**
   * Components.
   */
  _components = {
    schemas: {},
    responses: {},
    parameters: {},
    examples: {},
    requestBodies: {},
    headers: {},
    securitySchemes: {},
    links: {},
    callbacks: {},
    pathItems: {},
  };

  /**
   * Get components object.
   *
   * @returns {object}
   */
  getComponentsObject() {
    return structuredClone(this._components);
  }

  /**
   * Define component.
   *
   * @protected
   * @param {string} type
   * @param {object} definition
   * @returns {this}
   */
  _defineComponent(type, definition) {
    // componentType
    if (!Object.values(OAComponentType).includes(type)) {
      throw new InvalidArgumentError(
        'Components type %v is not supported.',
        type,
      );
    }
    // definition
    if (
      !definition ||
      typeof definition !== 'object' ||
      Array.isArray(definition)
    ) {
      throw new InvalidArgumentError(
        'Component definition must be an Object, but %v was given.',
        definition,
      );
    }
    // definition.name
    if (!definition.name || typeof definition.name !== 'string') {
      throw new InvalidArgumentError(
        'Property "name" must be a non-empty String, but %v was given.',
        definition.name,
      );
    }
    // definition[type]
    const component = definition[type];
    if (
      !component ||
      typeof component !== 'object' ||
      Array.isArray(component)
    ) {
      throw new InvalidArgumentError(
        'Property %v must be an Object, but %v was given.',
        type,
        component,
      );
    }
    // components key
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new InvalidArgumentError(
        'Component type %v does not have a reference to the components key.',
        type,
      );
    }
    this._components[key] = structuredClone(component);
    return this;
  }

  /**
   * Has component.
   *
   * @protected
   * @param {string} type
   * @param {string} name
   * @returns {boolean}
   */
  _hasComponent(type, name) {
    // name
    if (!name || typeof name !== 'string') {
      throw new InvalidArgumentError(
        'Parameter "name" must be a non-empty String, but %v was given.',
        name,
      );
    }
    // components key
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new InvalidArgumentError(
        'Component type %v does not have a reference to the components key.',
        type,
      );
    }
    return Boolean(this._components[key][name]);
  }

  /**
   * Get component.
   *
   * @param {string} type
   * @param {string} name
   * @returns {object}
   */
  _getComponent(type, name) {
    // name
    if (!name || typeof name !== 'string') {
      throw new InvalidArgumentError(
        'Parameter "name" must be a non-empty String, but %v was given.',
        name,
      );
    }
    // components key
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new InvalidArgumentError(
        'Component type %v does not have a reference to the components key.',
        type,
      );
    }
    const component = this._components[key][name];
    if (!component) {
      throw new InvalidArgumentError(
        'Component "#/components/%s/%s" does not exist.',
        key,
        name,
      );
    }
    return structuredClone(component);
  }

  /**
   * Define schema.
   *
   * @param {object} schemaDef
   * @returns {this}
   */
  defineSchema(schemaDef) {
    return this._defineComponent(OAComponentType.SCHEMA, schemaDef);
  }

  /**
   * Has schema.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasSchema(name) {
    return this._hasComponent(OAComponentType.SCHEMA, name);
  }

  /**
   * Get schema.
   *
   * @param {string} name
   * @returns {object}
   */
  getSchema(name) {
    return this._getComponent(OAComponentType.SCHEMA, name);
  }

  /**
   * Define response.
   *
   * @param {object} responseDef
   * @returns {this}
   */
  defineResponse(responseDef) {
    return this._defineComponent(OAComponentType.RESPONSE, responseDef);
  }

  /**
   * Has response.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasResponse(name) {
    return this._hasComponent(OAComponentType.RESPONSE, name);
  }

  /**
   * Get response.
   *
   * @param {string} name
   * @returns {object}
   */
  getResponse(name) {
    return this._getComponent(OAComponentType.RESPONSE, name);
  }

  /**
   * Define parameter.
   *
   * @param {object} parameterDef
   * @returns {this}
   */
  defineParameter(parameterDef) {
    return this._defineComponent(OAComponentType.PARAMETER, parameterDef);
  }

  /**
   * Has parameter.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasParameter(name) {
    return this._hasComponent(OAComponentType.PARAMETER, name);
  }

  /**
   * Get parameter.
   *
   * @param {string} name
   * @returns {object}
   */
  getParameter(name) {
    return this._getComponent(OAComponentType.PARAMETER, name);
  }

  /**
   * Define example.
   *
   * @param {object} exampleDef
   * @returns {this}
   */
  defineExample(exampleDef) {
    return this._defineComponent(OAComponentType.EXAMPLE, exampleDef);
  }

  /**
   * Has example.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasExample(name) {
    return this._hasComponent(OAComponentType.EXAMPLE, name);
  }

  /**
   * Get example.
   *
   * @param {string} name
   * @returns {object}
   */
  getExample(name) {
    return this._getComponent(OAComponentType.EXAMPLE, name);
  }

  /**
   * Define request body.
   *
   * @param {object} requestBodyDef
   * @returns {this}
   */
  defineRequestBody(requestBodyDef) {
    return this._defineComponent(OAComponentType.REQUEST_BODY, requestBodyDef);
  }

  /**
   * Has request body.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasRequestBody(name) {
    return this._hasComponent(OAComponentType.REQUEST_BODY, name);
  }

  /**
   * Get request body.
   *
   * @param {string} name
   * @returns {object}
   */
  getRequestBody(name) {
    return this._getComponent(OAComponentType.REQUEST_BODY, name);
  }

  /**
   * Define header.
   *
   * @param {object} headerDef
   * @returns {this}
   */
  defineHeader(headerDef) {
    return this._defineComponent(OAComponentType.HEADER, headerDef);
  }

  /**
   * Has header.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasHeader(name) {
    return this._hasComponent(OAComponentType.HEADER, name);
  }

  /**
   * Get header.
   *
   * @param {string} name
   * @returns {object}
   */
  getHeader(name) {
    return this._getComponent(OAComponentType.HEADER, name);
  }

  /**
   * Define security scheme.
   *
   * @param {object} securitySchemeDef
   * @returns {this}
   */
  defineSecurityScheme(securitySchemeDef) {
    return this._defineComponent(
      OAComponentType.SECURITY_SCHEME,
      securitySchemeDef,
    );
  }

  /**
   * Has security scheme.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasSecurityScheme(name) {
    return this._hasComponent(OAComponentType.SECURITY_SCHEME, name);
  }

  /**
   * Get security scheme.
   *
   * @param {string} name
   * @returns {object}
   */
  getSecurityScheme(name) {
    return this._getComponent(OAComponentType.SECURITY_SCHEME, name);
  }

  /**
   * Define link.
   *
   * @param {object} linkDef
   * @returns {this}
   */
  defineLink(linkDef) {
    return this._defineComponent(OAComponentType.LINK, linkDef);
  }

  /**
   * Has link.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasLink(name) {
    return this._hasComponent(OAComponentType.LINK, name);
  }

  /**
   * Get link.
   *
   * @param {string} name
   * @returns {object}
   */
  getLink(name) {
    return this._getComponent(OAComponentType.LINK, name);
  }

  /**
   * Define callback.
   *
   * @param {object} callbackDef
   * @returns {this}
   */
  defineCallback(callbackDef) {
    return this._defineComponent(OAComponentType.CALLBACK, callbackDef);
  }

  /**
   * Has callback.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasCallback(name) {
    return this._hasComponent(OAComponentType.CALLBACK, name);
  }

  /**
   * Get callback.
   *
   * @param {string} name
   * @returns {object}
   */
  getCallback(name) {
    return this._getComponent(OAComponentType.CALLBACK, name);
  }

  /**
   * Define path item.
   *
   * @param {object} pathItemDef
   * @returns {this}
   */
  definePathItem(pathItemDef) {
    return this._defineComponent(OAComponentType.PATH_ITEM, pathItemDef);
  }

  /**
   * Has path item.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasPathItem(name) {
    return this._hasComponent(OAComponentType.PATH_ITEM, name);
  }

  /**
   * Get path item.
   *
   * @param {string} name
   * @returns {object}
   */
  getPathItem(name) {
    return this._getComponent(OAComponentType.PATH_ITEM, name);
  }
}
