import {Optional} from './types.js';
import {Service, ServiceContainer} from '@e22m4u/js-service';

import {
  OAOperationGroup,
  OAOperationGroupOptions,
} from './oa-operation-group.js';

import {
  OADocumentObject,
  OAOperationMethod,
  OAOperationObject,
} from './oa-specification.js';

import {
  OALinkObject,
  OASchemaObject,
  OAHeaderObject,
  OAExampleObject,
  OACallbackObject,
  OAResponseObject,
  OAPathItemObject,
  OAReferenceObject,
  OAParameterObject,
  OARequestBodyObject,
  OASecuritySchemeObject,
} from './oa-specification.js';

/**
 * Component type.
 */
export declare const OAComponentType: {
  SCHEMA: 'schema';
  RESPONSE: 'response';
  PARAMETER: 'parameter';
  EXAMPLE: 'example';
  REQUEST_BODY: 'requestBody';
  HEADER: 'header';
  SECURITY_SCHEME: 'securityScheme';
  LINK: 'link';
  CALLBACK: 'callback';
  PATH_ITEM: 'pathItem';
};

export type OAComponentType =
  (typeof OAComponentType)[keyof typeof OAComponentType];

/**
 * Component types.
 */
export declare const OA_COMPONENT_TYPES: OAComponentType[];

/**
 * Component type to components key map.
 */
export declare const OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP: {
  [k in OAComponentType]: string | undefined;
};

/**
 * Component type to definition name map.
 * "#/$defs/${name}"
 */
export declare const OA_COMPONENT_TYPE_TO_DEFINITION_NAME_MAP: {
  [k in OAComponentType]: string | undefined;
};

/**
 * Schema component definition.
 */
export type OASchemaComponentDefinition = {
  name: string;
  schema: OASchemaObject | OAReferenceObject;
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
  pathItem: OAPathItemObject;
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
 * Document input.
 */
export type OADocumentInput = Optional<OADocumentObject, 'openapi' | 'info'>;

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
   * Get document object reference.
   */
  getDocumentObjectRef(): OADocumentObject;

  /**
   * Define component (schema).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.SCHEMA,
    definition: OASchemaComponentDefinition,
  ): this;

  /**
   * Define component (response).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.RESPONSE,
    definition: OAResponseComponentDefinition,
  ): this;

  /**
   * Define component (parameter).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.PARAMETER,
    definition: OAParameterComponentDefinition,
  ): this;

  /**
   * Define component (example).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.EXAMPLE,
    definition: OAExampleComponentDefinition,
  ): this;

  /**
   * Define component (request body).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.REQUEST_BODY,
    definition: OARequestBodyComponentDefinition,
  ): this;

  /**
   * Define component (header).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.HEADER,
    definition: OAHeaderComponentDefinition,
  ): this;

  /**
   * Define component (security scheme).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.SECURITY_SCHEME,
    definition: OASecuritySchemeComponentDefinition,
  ): this;

  /**
   * Define component (link).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.LINK,
    definition: OALinkComponentDefinition,
  ): this;

  /**
   * Define component (callback).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.CALLBACK,
    definition: OACallbackComponentDefinition,
  ): this;

  /**
   * Define component (path item).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.PATH_ITEM,
    definition: OAPathItemComponentDefinition,
  ): this;

  /**
   * Define component.
   *
   * @param type
   * @param definition
   */
  defineComponent(type: OAComponentType, definition: object): this;

  /**
   * Has component.
   *
   * @param type
   * @param name
   */
  hasComponent(type: OAComponentType, name: string): boolean;

  /**
   * Get component (schema).
   *
   * @param type
   * @param definition
   */
  getComponent(
    type: typeof OAComponentType.SCHEMA,
    name: string,
  ): OASchemaObject | OAReferenceObject;

  /**
   * Get component (response).
   *
   * @param type
   * @param definition
   */
  getComponent(
    type: typeof OAComponentType.RESPONSE,
    name: string,
  ): OAResponseObject | OAReferenceObject;

  /**
   * Get component (parameter).
   *
   * @param type
   * @param definition
   */
  getComponent(
    type: typeof OAComponentType.PARAMETER,
    name: string,
  ): OAParameterObject | OAReferenceObject;

  /**
   * Get component (example).
   *
   * @param type
   * @param definition
   */
  getComponent(
    type: typeof OAComponentType.EXAMPLE,
    name: string,
  ): OAExampleObject | OAReferenceObject;

  /**
   * Get component (request body).
   *
   * @param type
   * @param definition
   */
  getComponent(
    type: typeof OAComponentType.REQUEST_BODY,
    name: string,
  ): OARequestBodyObject | OAReferenceObject;

  /**
   * Get component (header).
   *
   * @param type
   * @param definition
   */
  getComponent(
    type: typeof OAComponentType.HEADER,
    name: string,
  ): OAHeaderObject | OAReferenceObject;

  /**
   * Get component (security scheme).
   *
   * @param type
   * @param definition
   */
  getComponent(
    type: typeof OAComponentType.SECURITY_SCHEME,
    name: string,
  ): OASecuritySchemeObject | OAReferenceObject;

  /**
   * Get component (link).
   *
   * @param type
   * @param definition
   */
  getComponent(
    type: typeof OAComponentType.LINK,
    name: string,
  ): OALinkObject | OAReferenceObject;

  /**
   * Get component (callback).
   *
   * @param type
   * @param definition
   */
  getComponent(
    type: typeof OAComponentType.CALLBACK,
    name: string,
  ): OACallbackObject | OAReferenceObject;

  /**
   * Get component (path item).
   *
   * @param type
   * @param definition
   */
  getComponent(
    type: typeof OAComponentType.PATH_ITEM,
    name: string,
  ): OAPathItemObject | OAReferenceObject;

  /**
   * Get component.
   *
   * @param type
   * @param name
   */
  getComponent<T = any>(type: OAComponentType, name: string): T;

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
   * Create operation group.
   *
   * @param options
   */
  createOperationGroup(options?: OAOperationGroupOptions): OAOperationGroup;

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
