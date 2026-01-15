import {joinPath} from './utils/index.js';
import {InvalidArgumentError} from '@e22m4u/js-format';
import {OADocumentBuilder} from './oa-document-builder.js';
import {OAOperationMethod} from './document-specification.js';

/**
 * Document scope.
 */
export class OADocumentScope {
  /**
   * @param {object} rootBuilder
   * @param {object} [options]
   */
  constructor(rootBuilder, options = {}) {
    if (!(rootBuilder instanceof OADocumentBuilder)) {
      throw new InvalidArgumentError(
        'Parameter "rootBuilder" must be an instance of OADocumentBuilder, ' +
          'but %v was given.',
        rootBuilder,
      );
    }
    if (!options || typeof options !== 'object' || Array.isArray(options)) {
      throw new InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options,
      );
    }
    if (options.pathPrefix !== undefined) {
      if (!options.pathPrefix || typeof options.pathPrefix !== 'string') {
        throw new InvalidArgumentError(
          'Parameter "pathPrefix" must be a non-empty String, ' +
            'but %v was given.',
          options.pathPrefix,
        );
      }
    }
    if (options.tags !== undefined) {
      if (!Array.isArray(options.tags)) {
        throw new InvalidArgumentError(
          'Parameter "tags" must be an Array, ' + 'but %v was given.',
          options.tags,
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== 'string') {
          throw new InvalidArgumentError(
            'Element "tags[%d]" must be a non-empty String, ' +
              'but %v was given.',
            index,
            tag,
          );
        }
      });
    }
    this.rootBuilder = rootBuilder;
    this.pathPrefix = options.pathPrefix || '/';
    this.tags = options.tags || [];
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
    // склеивание пути
    const fullPath = joinPath(this.pathPrefix, operationDef.path);
    // создание копии схемы операции
    // чтобы избежать мутацию аргумента
    const operation = structuredClone(operationDef.operation);
    // объединение тегов текущей области
    // с тегами текущей операции и удаление
    // дубликатов
    if (this.tags.length > 0) {
      operation.tags = [...this.tags, ...(operation.tags || [])];
      operation.tags = [...new Set(operation.tags)];
    }
    // регистрация операции в родительском
    // экземпляре сборщика документа
    this.rootBuilder.defineOperation({
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
    if (!options || typeof options !== 'object' || Array.isArray(options)) {
      throw new InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options,
      );
    }
    if (options.pathPrefix !== undefined) {
      if (!options.pathPrefix || typeof options.pathPrefix !== 'string') {
        throw new InvalidArgumentError(
          'Parameter "pathPrefix" must be a non-empty String, ' +
            'but %v was given.',
          options.pathPrefix,
        );
      }
    }
    if (options.tags !== undefined) {
      if (!Array.isArray(options.tags)) {
        throw new InvalidArgumentError(
          'Parameter "tags" must be an Array, ' + 'but %v was given.',
          options.tags,
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== 'string') {
          throw new InvalidArgumentError(
            'Element "tags[%d]" must be a non-empty String, ' +
              'but %v was given.',
            index,
            tag,
          );
        }
      });
    }
    return new OADocumentScope(this.rootBuilder, {
      pathPrefix: joinPath(this.pathPrefix, options.pathPrefix),
      tags: [...this.tags, ...(options.tags || [])],
    });
  }
}
