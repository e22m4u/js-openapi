import {
  OADocumentBuilder,
  OAOperationDefinition,
} from './oa-document-builder.js';

/**
 * Operations scope options.
 */
export type OAOperationsScopeOptions = {
  pathPrefix?: string;
  tags?: string[];
};

/**
 * Operations scope.
 */
export declare class OAOperationsScope {
  /**
   * @param builder
   * @param options
   */
  constructor(builder: OADocumentBuilder, options?: OAOperationsScopeOptions);

  /**
   * Get builder.
   */
  getBuilder(): OADocumentBuilder;

  /**
   * Get path prefix.
   */
  getPathPrefix(): string;

  /**
   * Get tags.
   */
  getTags(): string[];

  /**
   * Define operation.
   *
   * @param operationDef
   */
  defineOperation(operationDef: OAOperationDefinition): this;

  /**
   * Create scope.
   *
   * @param options
   */
  createScope(options?: OAOperationsScopeOptions): OAOperationsScope;
}
