import {InvalidArgumentError} from '@e22m4u/js-format';
import {OAOperationMethod} from './oa-specification.js';
import {joinPath, normalizePath} from './utils/index.js';
import {OADocumentBuilder} from './oa-document-builder.js';

/**
 * Document scope.
 */
export class OADocumentScope {
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
      if (!options.pathPrefix || typeof options.pathPrefix !== 'string') {
        throw new InvalidArgumentError(
          'Option "pathPrefix" must be a non-empty String, ' +
            'but %v was given.',
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
            'Element %v at the option "tags" must be a non-empty String, ' +
              'but %v was given.',
            index,
            tag,
          );
        }
      });
    }
    this._builder = builder;
    this._pathPrefix = normalizePath(options.pathPrefix || '/');
    this._tags = options.tags || [];
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
    // склеивание пути
    const fullPath = joinPath(this._pathPrefix, operationDef.path);
    // создание копии схемы операции
    // чтобы избежать мутацию аргумента
    const operation = structuredClone(operationDef.operation);
    // объединение тегов текущей области
    // с тегами текущей операции и удаление
    // дубликатов
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
   * @returns {OADocumentScope}
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
      if (!options.pathPrefix || typeof options.pathPrefix !== 'string') {
        throw new InvalidArgumentError(
          'Property "pathPrefix" must be a non-empty String, ' +
            'but %v was given.',
          options.pathPrefix,
        );
      }
    }
    // options.tags
    if (options.tags !== undefined) {
      if (!Array.isArray(options.tags)) {
        throw new InvalidArgumentError(
          'Property "tags" must be an Array, but %v was given.',
          options.tags,
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== 'string') {
          throw new InvalidArgumentError(
            'Element "tags[%d]" must be a non-empty String, but %v was given.',
            index,
            tag,
          );
        }
      });
    }
    return new OADocumentScope(this._builder, {
      pathPrefix: joinPath(this._pathPrefix, options.pathPrefix),
      tags: [...this._tags, ...(options.tags || [])],
    });
  }
}
