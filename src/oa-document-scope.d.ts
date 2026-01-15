import {
  OADocumentBuilder,
  OAOperationDefinition,
} from './oa-document-builder.js';

/**
 * Document scope options.
 */
export type OADocumentScopeOptions = {
  pathPrefix?: string;
  tags?: string[];
};

/**
 * Document scope.
 */
export declare class OADocumentScope {
  /**
   * @param builder
   * @param options
   */
  constructor(builder: OADocumentBuilder, options?: OADocumentScopeOptions);

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
  createScope(options?: OADocumentScopeOptions): OADocumentScope;
}
