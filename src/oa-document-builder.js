import {InvalidArgumentError} from '@e22m4u/js-format';
import {OAOperationGroup} from './oa-operation-group.js';
import {validateOADocumentObject} from './oa-document-object/index.js';
import {escapeJsonPointer} from './json-pointer/escape-json-pointer.js';
import {OPENAPI_VERSION, OAOperationMethod} from './oa-specification.js';

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
 * Component types.
 */
export const OA_COMPONENT_TYPES = Object.values(OAComponentType);

/**
 * Component name RegExp.
 */
export const OA_COMPONENT_NAME_REGEX = /^[a-zA-Z0-9.\-_]+$/;

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
 * Component type to definition name map.
 * "#/$defs/${name}"
 */
export const OA_COMPONENT_TYPE_TO_DEFINITION_NAME_MAP = {
  [OAComponentType.SCHEMA]: 'schema',
  [OAComponentType.RESPONSE]: 'response-or-reference',
  [OAComponentType.PARAMETER]: 'parameter-or-reference',
  [OAComponentType.EXAMPLE]: 'example-or-reference',
  [OAComponentType.REQUEST_BODY]: 'request-body-or-reference',
  [OAComponentType.HEADER]: 'header-or-reference',
  [OAComponentType.SECURITY_SCHEME]: 'security-scheme-or-reference',
  [OAComponentType.LINK]: 'link-or-reference',
  [OAComponentType.CALLBACK]: 'callbacks-or-reference',
  [OAComponentType.PATH_ITEM]: 'path-item',
};

/**
 * OpenAPI Document builder.
 */
export class OADocumentBuilder {
  /**
   * Document.
   *
   * @private
   * @type {object}
   */
  _document = {
    openapi: OPENAPI_VERSION,
    info: {
      title: 'API Documentation',
      version: '0.0.1',
    },
    paths: {},
  };

  /**
   * Constructor.
   *
   * @param {import('./oa-document-builder.js').OADocumentInput} [document]
   */
  constructor(document) {
    // document
    if (document !== undefined) {
      if (
        !document ||
        typeof document !== 'object' ||
        Array.isArray(document)
      ) {
        throw new InvalidArgumentError(
          'Parameter "document" must be an Object, but %v was given.',
          document,
        );
      }
      document = structuredClone(document);
      this._document = {...this._document, ...document};
    }
    // validate
    validateOADocumentObject(this._document);
  }

  /**
   * Get document object reference.
   *
   * @returns {import('./oa-specification.js').OADocumentObject}
   */
  getDocumentObjectRef() {
    return this._document;
  }

  /**
   * Define component.
   *
   * @param {string} type
   * @param {object} name
   * @param {object} component
   * @returns {this}
   */
  defineComponent(type, name, component) {
    // type
    if (!OA_COMPONENT_TYPES.includes(type)) {
      throw new InvalidArgumentError(
        'Components type %v is not supported.',
        type,
      );
    }
    // name
    if (!name || typeof name !== 'string') {
      throw new InvalidArgumentError(
        'Component name must be a non-empty String, but %v was given.',
        name,
      );
    }
    if (!OA_COMPONENT_NAME_REGEX.test(name)) {
      throw new InvalidArgumentError(
        'Component name %v contains invalid characters.',
        name,
      );
    }
    // component
    if (
      !component ||
      typeof component !== 'object' ||
      Array.isArray(component)
    ) {
      throw new InvalidArgumentError(
        'Component %v must be an Object, but %v was given.',
        name,
        component,
      );
    }
    // components key
    const componentsKey = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!componentsKey) {
      throw new InvalidArgumentError(
        'Component type %v does not have a reference to the components key.',
        type,
      );
    }
    // definition name
    const definitionName = OA_COMPONENT_TYPE_TO_DEFINITION_NAME_MAP[type];
    if (!definitionName) {
      throw new InvalidArgumentError(
        'Component type %v does not have a reference to the definition name.',
        type,
      );
    }
    // validation
    validateOADocumentObject(component, {
      schemaUri: `#/$defs/${definitionName}`,
      sourceUri: `#/components/${componentsKey}/${escapeJsonPointer(name)}`,
    });
    this._document.components = this._document.components || {};
    this._document.components[componentsKey] =
      this._document.components[componentsKey] || {};
    this._document.components[componentsKey][name] = structuredClone(component);
    return this;
  }

  /**
   * Has component.
   *
   * @param {string} type
   * @param {string} name
   * @returns {boolean}
   */
  hasComponent(type, name) {
    // type
    if (!OA_COMPONENT_TYPES.includes(type)) {
      throw new InvalidArgumentError(
        'Components type %v is not supported.',
        type,
      );
    }
    // name
    if (!name || typeof name !== 'string') {
      throw new InvalidArgumentError(
        'Component name must be a non-empty String, but %v was given.',
        name,
      );
    }
    if (!OA_COMPONENT_NAME_REGEX.test(name)) {
      throw new InvalidArgumentError(
        'Component name %v contains invalid characters.',
        name,
      );
    }
    // components key
    const componentsKey = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!componentsKey) {
      throw new InvalidArgumentError(
        'Component type %v does not have a reference to the components key.',
        componentsKey,
      );
    }
    return Boolean(
      this._document.components &&
      this._document.components[componentsKey] &&
      this._document.components[componentsKey][name],
    );
  }

  /**
   * Get component.
   *
   * @param {string} type
   * @param {string} name
   * @returns {object}
   */
  getComponent(type, name) {
    // type
    if (!OA_COMPONENT_TYPES.includes(type)) {
      throw new InvalidArgumentError(
        'Components type %v is not supported.',
        type,
      );
    }
    // name
    if (!name || typeof name !== 'string') {
      throw new InvalidArgumentError(
        'Component name must be a non-empty String, but %v was given.',
        name,
      );
    }
    if (!OA_COMPONENT_NAME_REGEX.test(name)) {
      throw new InvalidArgumentError(
        'Component name %v contains invalid characters.',
        name,
      );
    }
    // components key
    const componentsKey = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!componentsKey) {
      throw new InvalidArgumentError(
        'Component type %v does not have a reference to the components key.',
        type,
      );
    }
    const component =
      this._document &&
      this._document.components &&
      this._document.components[componentsKey] &&
      this._document.components[componentsKey][name];
    if (!component) {
      throw new InvalidArgumentError(
        'Component "#/components/%s/%s" does not exist.',
        componentsKey,
        name,
      );
    }
    return component;
  }

  /**
   * Define schema component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineSchemaComponent(name, component) {
    return this.defineComponent(OAComponentType.SCHEMA, name, component);
  }

  /**
   * Define response component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineResponseComponent(name, component) {
    return this.defineComponent(OAComponentType.RESPONSE, name, component);
  }

  /**
   * Define parameter component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineParameterComponent(name, component) {
    return this.defineComponent(OAComponentType.PARAMETER, name, component);
  }

  /**
   * Define example component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineExampleComponent(name, component) {
    return this.defineComponent(OAComponentType.EXAMPLE, name, component);
  }

  /**
   * Define request body component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineRequestBodyComponent(name, component) {
    return this.defineComponent(OAComponentType.REQUEST_BODY, name, component);
  }

  /**
   * Define header component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineHeaderComponent(name, component) {
    return this.defineComponent(OAComponentType.HEADER, name, component);
  }

  /**
   * Define security scheme component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineSecuritySchemeComponent(name, component) {
    return this.defineComponent(
      OAComponentType.SECURITY_SCHEME,
      name,
      component,
    );
  }

  /**
   * Define link component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineLinkComponent(name, component) {
    return this.defineComponent(OAComponentType.LINK, name, component);
  }

  /**
   * Define callback component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineCallbackComponent(name, component) {
    return this.defineComponent(OAComponentType.CALLBACK, name, component);
  }

  /**
   * Define path item component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  definePathItemComponent(name, component) {
    return this.defineComponent(OAComponentType.PATH_ITEM, name, component);
  }

  /**
   * Define operation.
   *
   * @param {import('./oa-document-builder.js').OAOperationDefinition} operationDef
   * @returns {this}
   */
  defineOperation(operationDef) {
    if (
      !operationDef ||
      typeof operationDef !== 'object' ||
      Array.isArray(operationDef)
    ) {
      throw new InvalidArgumentError(
        'Operation Definition must be an Object, but %v was given.',
        operationDef,
      );
    }
    // path
    if (typeof operationDef.path !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "path" must be a String, but %v was given.',
        operationDef.path,
      );
    }
    if (!operationDef.path.startsWith('/')) {
      throw new InvalidArgumentError(
        'Keyword "path" must start with "/", but %v was given.',
        operationDef.path,
      );
    }
    // method
    if (!Object.values(OAOperationMethod).includes(operationDef.method)) {
      throw new InvalidArgumentError(
        'Keyword "method" must be one of the allowed values, but %v was given.',
        operationDef.method,
      );
    }
    // operation
    if (operationDef.operation !== undefined) {
      if (
        !operationDef.operation ||
        typeof operationDef.operation !== 'object' ||
        Array.isArray(operationDef.operation)
      ) {
        throw new InvalidArgumentError(
          'Keyword "operation" must be an Object, but %v was given.',
          operationDef.operation,
        );
      }
      // validation
      validateOADocumentObject(operationDef.operation, {
        schemaUri: '#/$defs/operation',
        sourceUri: `#/paths/${escapeJsonPointer(operationDef.path)}/${escapeJsonPointer(operationDef.method)}`,
      });
    }
    // создание поверхностной копии определения
    // операции для избежания мутации аргумента
    const operation = operationDef.operation
      ? structuredClone(operationDef.operation)
      : {};
    if (!this._document.paths) {
      this._document.paths = {};
    }
    if (!this._document.paths[operationDef.path]) {
      this._document.paths[operationDef.path] = {};
    }
    this._document.paths[operationDef.path][operationDef.method] = operation;
    return this;
  }

  /**
   * Create operation group.
   *
   * @param {import('./oa-operation-group.js').OAOperationGroupOptions} [options]
   * @returns {OAOperationGroup}
   */
  createOperationGroup(options) {
    return new OAOperationGroup(this, options);
  }

  /**
   * Build.
   *
   * @returns {object}
   */
  build() {
    return structuredClone(this._document);
  }

  /**
   * Build JSON.
   *
   * @param {string|number} [space]
   * @returns {string}
   */
  buildJson(space = 0) {
    return JSON.stringify(this.build(), null, space);
  }
}
