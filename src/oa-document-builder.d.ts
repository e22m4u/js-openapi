import {Optional} from './types.js';
import {Service, ServiceContainer} from '@e22m4u/js-service';
import {OADocumentScope, OADocumentScopeOptions} from './oa-document-scope.js';

import {
  OALinkObject,
  OASchemaObject,
  OAHeaderObject,
  OAExampleObject,
  OADocumentObject,
  OACallbackObject,
  OAResponseObject,
  OAPathItemObject,
  OAOperationMethod,
  OAOperationObject,
  OAReferenceObject,
  OAParameterObject,
  OARequestBodyObject,
  OASecuritySchemeObject,
} from './document-specification.js';

/**
 * Document input.
 */
export type OADocumentInput = Optional<OADocumentObject, 'openapi' | 'info'>;

/**
 * Schema component definition.
 */
export type OASchemaComponentDefinition = {
  name: string;
  schema: OASchemaObject;
};

/**
 * Response component definition.
 */
export type OAResponseComponentDefinition = {
  name: string;
  response: OAResponseObject | OAReferenceObject;
};

/**
 * Parameter component definition.
 */
export type OAParameterComponentDefinition = {
  name: string;
  parameter: OAParameterObject | OAReferenceObject;
};

/**
 * Example component definition.
 */
export type OAExampleComponentDefinition = {
  name: string;
  example: OAExampleObject | OAReferenceObject;
};

/**
 * Request body component definition.
 */
export type OARequestBodyComponentDefinition = {
  name: string;
  requestBody: OARequestBodyObject | OAReferenceObject;
};

/**
 * Header component definition.
 */
export type OAHeaderComponentDefinition = {
  name: string;
  header: OAHeaderObject | OAReferenceObject;
};

/**
 * Security scheme component definition.
 */
export type OASecuritySchemeComponentDefinition = {
  name: string;
  securityScheme: OASecuritySchemeObject | OAReferenceObject;
};

/**
 * Link component definition.
 */
export type OALinkComponentDefinition = {
  name: string;
  link: OALinkObject | OAReferenceObject;
};

/**
 * Callback component definition.
 */
export type OACallbackComponentDefinition = {
  name: string;
  callback: OACallbackObject | OAReferenceObject;
};

/**
 * Path item component definition.
 */
export type OAPathItemComponentDefinition = {
  name: string;
  pathItem: OAPathItemObject | OAReferenceObject;
};

/**
 * Operation definition.
 */
export type OAOperationDefinition = {
  path: string;
  method: OAOperationMethod;
  operation: OAOperationObject;
};

/**
 * Document builder.
 */
export declare class OADocumentBuilder extends Service {
  /**
   * Constructor.
   *
   * @param container
   * @param document
   */
  constructor(container: ServiceContainer, document?: OADocumentInput);

  /**
   * Constructor.
   *
   * @param document
   */
  constructor(document?: OADocumentInput);

  /**
   * Constructor.
   *
   * @param containerOrDocument
   * @param document
   */
  constructor(
    containerOrDocument?: ServiceContainer | OADocumentInput,
    document?: OADocumentInput,
  );

  /**
   * Define schema component.
   *
   * @param schemaDef
   */
  defineSchemaComponent(schemaDef: OASchemaComponentDefinition): this;

  /**
   * Define response component.
   *
   * @param responseDef
   */
  defineResponseComponent(responseDef: OAResponseComponentDefinition): this;

  /**
   * Define parameter component.
   *
   * @param parameterDef
   */
  defineParameterComponent(parameterDef: OAParameterComponentDefinition): this;

  /**
   * Define example component.
   *
   * @param exampleDef
   */
  defineExampleComponent(exampleDef: OAExampleComponentDefinition): this;

  /**
   * Define request body component.
   *
   * @param requestBodyDef
   */
  defineRequestBodyComponent(
    requestBodyDef: OARequestBodyComponentDefinition,
  ): this;

  /**
   * Define header component.
   *
   * @param headerDef
   */
  defineHeaderComponent(headerDef: OAHeaderComponentDefinition): this;

  /**
   * Define security scheme component.
   *
   * @param securitySchemeDef
   */
  defineSecuritySchemeComponent(
    securitySchemeDef: OASecuritySchemeComponentDefinition,
  ): this;

  /**
   * Define link component.
   *
   * @param linkDef
   */
  defineLinkComponent(linkDef: OALinkComponentDefinition): this;

  /**
   * Define callback component.
   *
   * @param callbackDef
   */
  defineCallbackComponent(callbackDef: OACallbackComponentDefinition): this;

  /**
   * Define path item component.
   *
   * @param pathItemDef
   */
  definePathItemComponent(pathItemDef: OAPathItemComponentDefinition): this;

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

  /**
   * Build JSON.
   *
   * @param space
   */
  buildJson(space?: string | number): string;
}
