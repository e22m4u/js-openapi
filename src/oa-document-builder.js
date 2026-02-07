import {OADocumentScope} from './oa-document-scope.js';
import {InvalidArgumentError} from '@e22m4u/js-format';
import {normalizePath} from './utils/normalize-path.js';
import {isServiceContainer, Service} from '@e22m4u/js-service';
import {validateShallowOADocumentObject} from './oa-document-object/index.js';
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
  };

  /**
   * Constructor.
   *
   * @param {object} [containerOrDocument]
   * @param {object} [document]
   */
  constructor(containerOrDocument, document) {
    if (isServiceContainer(containerOrDocument)) {
      super(containerOrDocument);
    } else {
      super();
      document = containerOrDocument;
    }
    if (document !== undefined) {
      // если схема документа не является
      // объектом, то выбрасывается ошибка
      if (
        !document ||
        typeof document !== 'object' ||
        Array.isArray(document)
      ) {
        throw new InvalidArgumentError(
          'OpenAPI Document Object must be an Object, but %v was given.',
          document,
        );
      }
      // чтобы избежать мутации аргумента,
      // выполняется копирование документа
      document = structuredClone(document);
      // если версия OpenAPI не определена,
      // то устанавливается версия по умолчанию
      if (!document.openapi) {
        document.openapi = this._document.openapi;
      }
      // если Info Object не определен,
      // то устанавливается значение по умолчанию
      if (!document.info) {
        document.info = this._document.info;
      }
      // если свойство "info" не является
      // объектом, то выбрасывается ошибка
      if (
        !document.info ||
        typeof document.info !== 'object' ||
        Array.isArray(document.info)
      ) {
        throw new InvalidArgumentError(
          'Property "info" must be an Object, but %v was given.',
          document.info,
        );
      }
      // если свойство "info.title" не определено,
      // то устанавливается значение по умолчанию
      if (!document.info.title) {
        document.info.title = this._document.info.title;
      }
      // если свойство "info.version" не определено,
      // то устанавливается значение по умолчанию
      if (!document.info.version) {
        document.info.version = this._document.info.version;
      }
      // поверхностная проверка свойств документа
      // выполняется после установки значений по умолчанию
      validateShallowOADocumentObject(document, {sourceUri: 'document'});
      this._document = document;
    }
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
    this._document.components = this._document.components || {};
    this._document.components[key] = this._document.components[key] || {};
    this._document.components[key][definition.name] =
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
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new InvalidArgumentError(
        'Component type %v does not have a reference to the components key.',
        type,
      );
    }
    return Boolean(
      this._document.components &&
      this._document.components[key] &&
      this._document.components[key][name],
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
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new InvalidArgumentError(
        'Component type %v does not have a reference to the components key.',
        type,
      );
    }
    const component =
      this._document &&
      this._document.components &&
      this._document.components[key] &&
      this._document.components[key][name];
    if (!component) {
      throw new InvalidArgumentError(
        'Component "#/components/%s/%s" does not exist.',
        key,
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
    if (!operationDef.path || typeof operationDef.path !== 'string') {
      throw new InvalidArgumentError(
        'Property "path" must be a non-empty String, but %v was given.',
        operationDef.path,
      );
    }
    // method
    if (!operationDef.method || typeof operationDef.method !== 'string') {
      throw new InvalidArgumentError(
        'Property "method" must be a non-empty String, but %v was given.',
        operationDef.method,
      );
    }
    if (!Object.values(OAOperationMethod).includes(operationDef.method)) {
      throw new InvalidArgumentError(
        'Property "method" must be one of values: %l, but %v was given.',
        Object.values(OAOperationMethod),
      );
    }
    // operation
    if (
      !operationDef.operation ||
      typeof operationDef.operation !== 'object' ||
      Array.isArray(operationDef.operation)
    ) {
      throw new InvalidArgumentError(
        'Property "operation" must be an Object, but %v was given.',
        operationDef.operation,
      );
    }
    const normalizedPath = normalizePath(operationDef.path);
    if (!this._document.paths) {
      this._document.paths = {};
    }
    if (!this._document.paths[normalizedPath]) {
      this._document.paths[normalizedPath] = {};
    }
    this._document.paths[normalizedPath][operationDef.method] = structuredClone(
      operationDef.operation,
    );
  }

  /**
   * Create scope.
   *
   * @param {object} [options]
   * @returns {OADocumentScope}
   */
  createScope(options) {
    return new OADocumentScope(this, options);
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
