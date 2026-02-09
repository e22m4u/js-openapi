import {InvalidArgumentError} from '@e22m4u/js-format';
import {OAOperationMethod} from './oa-specification.js';
import {OADocumentBuilder} from './oa-document-builder.js';

/**
 * Operations scope.
 */
export class OAOperationsScope {
  /**
   * Builder.
   *
   * @type {OADocumentBuilder}
   */
  _builder;

  /**
   * Path prefix.
   *
   * @type {string}
   */
  _pathPrefix;

  /**
   * Tags.
   *
   * @type {string[]}
   */
  _tags;

  /**
   * @param {object} builder
   * @param {object} [options]
   */
  constructor(builder, options = {}) {
    // builder
    if (!(builder instanceof OADocumentBuilder)) {
      throw new InvalidArgumentError(
        'Parameter "builder" must be an instance of OADocumentBuilder, ' +
          'but %v was given.',
        builder,
      );
    }
    // options
    if (!options || typeof options !== 'object' || Array.isArray(options)) {
      throw new InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options,
      );
    }
    // options.pathPrefix
    if (options.pathPrefix !== undefined) {
      if (typeof options.pathPrefix !== 'string') {
        throw new InvalidArgumentError(
          'Option "pathPrefix" must be a String, but %v was given.',
          options.pathPrefix,
        );
      }
      if (!options.pathPrefix.startsWith('/')) {
        throw new InvalidArgumentError(
          'Option "pathPrefix" must start with "/", but %v was given.',
          options.pathPrefix,
        );
      }
    }
    // options.tags
    if (options.tags !== undefined) {
      if (!Array.isArray(options.tags)) {
        throw new InvalidArgumentError(
          'Option "tags" must be an Array, but %v was given.',
          options.tags,
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== 'string') {
          throw new InvalidArgumentError(
            'Element %v in the option "tags" must be a non-empty String, ' +
              'but %v was given.',
            index,
            tag,
          );
        }
      });
    }
    this._builder = builder;
    this._pathPrefix = options.pathPrefix || '/';
    this._tags = [...new Set(options.tags || [])];
  }

  /**
   * Get builder.
   *
   * @returns {OADocumentBuilder}
   */
  getBuilder() {
    return this._builder;
  }

  /**
   * Get path prefix.
   *
   * @returns {string}
   */
  getPathPrefix() {
    return this._pathPrefix;
  }

  /**
   * Get tags.
   *
   * @returns {string[]}
   */
  getTags() {
    return [...this._tags];
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
    let fullPath = this._pathPrefix;
    if (operationDef.path !== '/') {
      if (fullPath === '/') {
        fullPath = operationDef.path;
      } else {
        fullPath += operationDef.path;
      }
    }
    // создание поверхностной копии схемы операции
    // чтобы избежать мутации аргумента
    const operation = {...operationDef.operation};
    // объединение тегов текущей области с тегами
    // текущей операции и удаление дубликатов
    if (this._tags.length > 0) {
      operation.tags = [...this._tags, ...(operation.tags || [])];
      operation.tags = [...new Set(operation.tags)];
    }
    // регистрация операции в родительском
    // экземпляре сборщика документа
    this._builder.defineOperation({
      ...operationDef,
      path: fullPath,
      operation,
    });
    return this;
  }

  /**
   * Create scope.
   *
   * @param {object} [options]
   * @returns {OAOperationsScope}
   */
  createScope(options = {}) {
    // options
    if (!options || typeof options !== 'object' || Array.isArray(options)) {
      throw new InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options,
      );
    }
    // options.pathPrefix
    if (options.pathPrefix !== undefined) {
      if (typeof options.pathPrefix !== 'string') {
        throw new InvalidArgumentError(
          'Option "pathPrefix" must be a String, but %v was given.',
          options.pathPrefix,
        );
      }
      if (!options.pathPrefix.startsWith('/')) {
        throw new InvalidArgumentError(
          'Option "pathPrefix" must start with "/", but %v was given.',
          options.pathPrefix,
        );
      }
    }
    // options.tags
    if (options.tags !== undefined) {
      if (!Array.isArray(options.tags)) {
        throw new InvalidArgumentError(
          'Option "tags" must be an Array, but %v was given.',
          options.tags,
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== 'string') {
          throw new InvalidArgumentError(
            'Element %v in the option "tags" must be a non-empty String, but %v was given.',
            index,
            tag,
          );
        }
      });
    }
    let fullPathPrefix = this._pathPrefix;
    if (options.pathPrefix && options.pathPrefix !== '/') {
      if (fullPathPrefix === '/') {
        fullPathPrefix = options.pathPrefix;
      } else {
        fullPathPrefix += options.pathPrefix;
      }
    }
    return new OAOperationsScope(this._builder, {
      pathPrefix: fullPathPrefix,
      tags: [...this._tags, ...(options.tags || [])],
    });
  }
}
