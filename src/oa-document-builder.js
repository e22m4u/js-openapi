import {OADocumentScope} from './oa-document-scope.js';
import {InvalidArgumentError} from '@e22m4u/js-format';
import {normalizePath} from './utils/normalize-path.js';
import {OAComponentRegistry} from './oa-component-registry.js';
import {isServiceContainer, Service} from '@e22m4u/js-service';
import {validateShallowOADocumentObject} from './document-validators.js';
import {OPENAPI_VERSION, OAOperationMethod} from './document-specification.js';

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
   * Define schema component.
   *
   * @param {object} schemaDef
   * @returns {this}
   */
  defineSchemaComponent(schemaDef) {
    this.getService(OAComponentRegistry).defineSchema(schemaDef);
    return this;
  }

  /**
   * Define response component.
   *
   * @param {object} responseDef
   * @returns {this}
   */
  defineResponseComponent(responseDef) {
    this.getService(OAComponentRegistry).defineResponse(responseDef);
    return this;
  }

  /**
   * Define parameter component.
   *
   * @param {object} parameterDef
   * @returns {this}
   */
  defineParameterComponent(parameterDef) {
    this.getService(OAComponentRegistry).defineParameter(parameterDef);
    return this;
  }

  /**
   * Define example component.
   *
   * @param {object} exampleDef
   * @returns {this}
   */
  defineExampleComponent(exampleDef) {
    this.getService(OAComponentRegistry).defineExample(exampleDef);
    return this;
  }

  /**
   * Define request body component.
   *
   * @param {object} requestBodyDef
   * @returns {this}
   */
  defineRequestBodyComponent(requestBodyDef) {
    this.getService(OAComponentRegistry).defineRequestBody(requestBodyDef);
    return this;
  }

  /**
   * Define header component.
   *
   * @param {object} headerDef
   * @returns {this}
   */
  defineHeaderComponent(headerDef) {
    this.getService(OAComponentRegistry).defineHeader(headerDef);
    return this;
  }

  /**
   * Define security scheme component.
   *
   * @param {object} securitySchemeDef
   * @returns {this}
   */
  defineSecuritySchemeComponent(securitySchemeDef) {
    this.getService(OAComponentRegistry).defineSecurityScheme(
      securitySchemeDef,
    );
    return this;
  }

  /**
   * Define link component.
   *
   * @param {object} linkDef
   * @returns {this}
   */
  defineLinkComponent(linkDef) {
    this.getService(OAComponentRegistry).defineLink(linkDef);
    return this;
  }

  /**
   * Define callback component.
   *
   * @param {object} callbackDef
   * @returns {this}
   */
  defineCallbackComponent(callbackDef) {
    this.getService(OAComponentRegistry).defineCallback(callbackDef);
    return this;
  }

  /**
   * Define path item component.
   *
   * @param {object} pathItemDef
   * @returns {this}
   */
  definePathItemComponent(pathItemDef) {
    this.getService(OAComponentRegistry).definePathItem(pathItemDef);
    return this;
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
    const doc = structuredClone(this._document);
    // внедрение зарегистрированных компонентов
    // в компоненты текущего документа
    const compsMap = this.getService(OAComponentRegistry).getComponentsObject();
    doc.components = doc.components || {};
    Object.keys(compsMap).forEach(compsKey => {
      const compsNames = Object.keys(compsMap[compsKey]);
      if (compsNames.length) {
        doc.components[compsKey] = doc.components[compsKey] || {};
        compsNames.forEach(compName => {
          doc.components[compsKey][compName] = compsMap[compsKey][compName];
        });
      }
    });
    if (!Object.keys(doc.components).length) {
      delete doc.components;
    }
    return doc;
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
