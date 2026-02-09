import {InvalidArgumentError} from '@e22m4u/js-format';
import {OAOperationsScope} from './oa-operations-scope.js';
import {isServiceContainer, Service} from '@e22m4u/js-service';
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
export class OADocumentBuilder extends Service {
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
    components: {},
  };

  /**
   * Constructor.
   *
   * @param {import('@e22m4u/js-service').ServiceContainer|import('./oa-document-builder.js').OADocumentInput} containerOrDocument
   * @param {import('./oa-document-builder.js').OADocumentInput} document
   */
  constructor(containerOrDocument, document) {
    if (isServiceContainer(containerOrDocument)) {
      super(containerOrDocument);
    } else {
      super();
      // containerOrDocument
      if (containerOrDocument !== undefined) {
        if (
          !containerOrDocument ||
          typeof containerOrDocument !== 'object' ||
          Array.isArray(containerOrDocument)
        ) {
          throw new InvalidArgumentError(
            'Parameter "containerOrDocument" must be an Object, ' +
              'but %v was given.',
            containerOrDocument,
          );
        }
      }
      document = document === undefined ? containerOrDocument : document;
    }
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
   * @param {object} definition
   * @returns {this}
   */
  defineComponent(type, definition) {
    // type
    if (!OA_COMPONENT_TYPES.includes(type)) {
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
        'Keyword "name" must be a non-empty String, but %v was given.',
        definition.name,
      );
    }
    if (!OA_COMPONENT_NAME_REGEX.test(definition.name)) {
      throw new InvalidArgumentError(
        'Component name %v contains invalid characters.',
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
        'Keyword %v must be an Object, but %v was given.',
        type,
        component,
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
    // definition name
    const definitionName = OA_COMPONENT_TYPE_TO_DEFINITION_NAME_MAP[type];
    if (!definitionName) {
      throw new InvalidArgumentError(
        'Component type %v does not have a reference to the definition name.',
        definitionName,
      );
    }
    // validation
    validateOADocumentObject(component, {
      schemaUri: `#/$defs/${definitionName}`,
      dataSourceUri: `/components/${componentsKey}/${escapeJsonPointer(definition.name)}`,
    });
    this._document.components = this._document.components || {};
    this._document.components[componentsKey] =
      this._document.components[componentsKey] || {};
    this._document.components[componentsKey][definition.name] =
      structuredClone(component);
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
    // name
    if (!name || typeof name !== 'string') {
      throw new InvalidArgumentError(
        'Parameter "name" must be a non-empty String, but %v was given.',
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
    // name
    if (!name || typeof name !== 'string') {
      throw new InvalidArgumentError(
        'Parameter "name" must be a non-empty String, but %v was given.',
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
   * @param {object} schemaDef
   * @returns {this}
   */
  defineSchemaComponent(schemaDef) {
    return this.defineComponent(OAComponentType.SCHEMA, schemaDef);
  }

  /**
   * Define response component.
   *
   * @param {object} responseDef
   * @returns {this}
   */
  defineResponseComponent(responseDef) {
    return this.defineComponent(OAComponentType.RESPONSE, responseDef);
  }

  /**
   * Define parameter component.
   *
   * @param {object} parameterDef
   * @returns {this}
   */
  defineParameterComponent(parameterDef) {
    return this.defineComponent(OAComponentType.PARAMETER, parameterDef);
  }

  /**
   * Define example component.
   *
   * @param {object} exampleDef
   * @returns {this}
   */
  defineExampleComponent(exampleDef) {
    return this.defineComponent(OAComponentType.EXAMPLE, exampleDef);
  }

  /**
   * Define request body component.
   *
   * @param {object} requestBodyDef
   * @returns {this}
   */
  defineRequestBodyComponent(requestBodyDef) {
    return this.defineComponent(OAComponentType.REQUEST_BODY, requestBodyDef);
  }

  /**
   * Define header component.
   *
   * @param {object} headerDef
   * @returns {this}
   */
  defineHeaderComponent(headerDef) {
    return this.defineComponent(OAComponentType.HEADER, headerDef);
  }

  /**
   * Define security scheme component.
   *
   * @param {object} securitySchemeDef
   * @returns {this}
   */
  defineSecuritySchemeComponent(securitySchemeDef) {
    return this.defineComponent(
      OAComponentType.SECURITY_SCHEME,
      securitySchemeDef,
    );
  }

  /**
   * Define link component.
   *
   * @param {object} linkDef
   * @returns {this}
   */
  defineLinkComponent(linkDef) {
    return this.defineComponent(OAComponentType.LINK, linkDef);
  }

  /**
   * Define callback component.
   *
   * @param {object} callbackDef
   * @returns {this}
   */
  defineCallbackComponent(callbackDef) {
    return this.defineComponent(OAComponentType.CALLBACK, callbackDef);
  }

  /**
   * Define path item component.
   *
   * @param {object} pathItemDef
   * @returns {this}
   */
  definePathItemComponent(pathItemDef) {
    return this.defineComponent(OAComponentType.PATH_ITEM, pathItemDef);
  }

  /**
   * Define operation.
   *
   * @param {object} operationDef
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
        'Operation path must start with "/", but %v was given.',
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
      dataSourceUri: `/paths/${escapeJsonPointer(operationDef.path)}/${escapeJsonPointer(operationDef.method)}`,
    });
    if (!this._document.paths) {
      this._document.paths = {};
    }
    if (!this._document.paths[operationDef.path]) {
      this._document.paths[operationDef.path] = {};
    }
    this._document.paths[operationDef.path][operationDef.method] =
      structuredClone(operationDef.operation);
    return this;
  }

  /**
   * Create scope.
   *
   * @param {object} [options]
   * @returns {OAOperationsScope}
   */
  createScope(options) {
    return new OAOperationsScope(this, options);
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
