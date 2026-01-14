import {OPENAPI_VERSION} from './constants.js';
import {OADocumentScope} from './oa-document-scope.js';
import {InvalidArgumentError} from '@e22m4u/js-format';
import {OAOperationMethod} from './document-specification.js';
import {isServiceContainer, Service} from '@e22m4u/js-service';
import {validateShallowOADocumentObject} from './document-validators.js';

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
      validateShallowOADocumentObject(document);
      this._document = document;
    }
  }

  /**
   * Define component.
   *
   * @param {string} targetKey
   * @param {string} componentKey
   * @param {string} definitionLabel
   * @param {object} definition
   * @returns {this}
   */
  _defineComponent(targetKey, componentKey, definitionLabel, definition) {
    // targetKey
    if (!targetKey || typeof targetKey !== 'string') {
      throw new InvalidArgumentError(
        'Property "targetKey" must be a non-empty String, ' +
          'but %v was given.',
        targetKey,
      );
    }
    // componentKey
    if (!componentKey || typeof componentKey !== 'string') {
      throw new InvalidArgumentError(
        'Property "componentKey" must be a non-empty String, ' +
          'but %v was given.',
        componentKey,
      );
    }
    // definitionLabel
    if (!definitionLabel || typeof definitionLabel !== 'string') {
      throw new InvalidArgumentError(
        'Property "definitionLabel" must be a non-empty String, ' +
          'but %v was given.',
        definitionLabel,
      );
    }
    // definition
    if (
      !definition ||
      typeof definition !== 'object' ||
      Array.isArray(definition)
    ) {
      throw new InvalidArgumentError(
        '%s Definition must be an Object, but %v was given.',
        definitionLabel,
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
    // definition[componentKey]
    const component = definition[componentKey];
    if (
      !component ||
      typeof component !== 'object' ||
      Array.isArray(component)
    ) {
      throw new InvalidArgumentError(
        'Property %v must be an Object, but %v was given.',
        componentKey,
        component,
      );
    }
    if (!this._document.components) {
      this._document.components = {};
    }
    if (!this._document.components[targetKey]) {
      this._document.components[targetKey] = {};
    }
    this._document.components[targetKey][definition.name] = component;
    return this;
  }

  /**
   * Define schema component.
   *
   * @param {import('./oa-document-builder.js').OASchemaComponentDefinition} schemaDef
   * @returns {this}
   */
  defineSchemaComponent(schemaDef) {
    return this._defineComponent('schemas', 'schema', 'Schema', schemaDef);
  }

  /**
   * Define response component.
   *
   * @param {import('./oa-document-builder.js').OAResponseComponentDefinition} responseDef
   * @returns {this}
   */
  defineResponseComponent(responseDef) {
    return this._defineComponent(
      'responses',
      'response',
      'Response',
      responseDef,
    );
  }

  /**
   * Define parameter component.
   *
   * @param {import('./oa-document-builder.js').OAParameterComponentDefinition} parameterDef
   * @returns {this}
   */
  defineParameterComponent(parameterDef) {
    return this._defineComponent(
      'parameters',
      'parameter',
      'Parameter',
      parameterDef,
    );
  }

  /**
   * Define example component.
   *
   * @param {import('./oa-document-builder.js').OAExampleComponentDefinition} exampleDef
   * @returns {this}
   */
  defineExampleComponent(exampleDef) {
    return this._defineComponent('examples', 'example', 'Example', exampleDef);
  }

  /**
   * Define request body component.
   *
   * @param {import('./oa-document-builder.js').OARequestBodyComponentDefinition} requestBodyDef
   * @returns {this}
   */
  defineRequestBodyComponent(requestBodyDef) {
    return this._defineComponent(
      'requestBodies',
      'requestBody',
      'Request body',
      requestBodyDef,
    );
  }

  /**
   * Define header component.
   *
   * @param {import('./oa-document-builder.js').OAHeaderComponentDefinition} headerDef
   * @returns {this}
   */
  defineHeaderComponent(headerDef) {
    return this._defineComponent('headers', 'header', 'Header', headerDef);
  }

  /**
   * Define security scheme component.
   *
   * @param {import('./oa-document-builder.js').OASecuritySchemeComponentDefinition} securitySchemeDef
   * @returns {this}
   */
  defineSecuritySchemeComponent(securitySchemeDef) {
    return this._defineComponent(
      'securitySchemes',
      'securityScheme',
      'Security Scheme',
      securitySchemeDef,
    );
  }

  /**
   * Define link component.
   *
   * @param {import('./oa-document-builder.js').OALinkComponentDefinition} linkDef
   * @returns {this}
   */
  defineLinkComponent(linkDef) {
    return this._defineComponent('links', 'link', 'Link', linkDef);
  }

  /**
   * Define callback component.
   *
   * @param {import('./oa-document-builder.js').OACallbackComponentDefinition} callbackDef
   * @returns {this}
   */
  defineCallbackComponent(callbackDef) {
    return this._defineComponent(
      'callbacks',
      'callback',
      'Callback',
      callbackDef,
    );
  }

  /**
   * Define path item component.
   *
   * @param {import('./oa-document-builder.js').OAPathItemComponentDefinition} pathItemDef
   * @returns {this}
   */
  definePathItemComponent(pathItemDef) {
    return this._defineComponent(
      'pathItems',
      'pathItem',
      'Path Item',
      pathItemDef,
    );
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
    if (operationDef.path[0] !== '/') {
      throw new InvalidArgumentError(
        'Property "path" must start with forward slash "/", but %v was given.',
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
    if (!this._document.paths) {
      this._document.paths = {};
    }
    if (!this._document.paths[operationDef.path]) {
      this._document.paths[operationDef.path] = {};
    }
    this._document.paths[operationDef.path][operationDef.method] =
      structuredClone(operationDef.operation);
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
}
