import {OADocumentObject} from './document-specification.js';

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
   * @param rootBuilder
   * @param options
   */
  constructor(rootBuilder: OADocumentBuilder, options?: OADocumentScopeOptions);

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

  /**
   * Build.
   */
  build(): OADocumentObject;
}
