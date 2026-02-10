import {
  OADocumentBuilder,
  OAOperationDefinition,
} from './oa-document-builder.js';

/**
 * Operation group options.
 */
export type OAOperationGroupOptions = {
  pathPrefix?: string;
  tags?: string[];
};

/**
 * Operation group.
 */
export declare class OAOperationGroup {
  /**
   * @param builder
   * @param options
   */
  constructor(builder: OADocumentBuilder, options?: OAOperationGroupOptions);

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
   * Create operation group.
   *
   * @param options
   */
  createOperationGroup(options?: OAOperationGroupOptions): OAOperationGroup;
}
