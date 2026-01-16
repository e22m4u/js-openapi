import {Service} from '@e22m4u/js-service';

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
  OAComponentsObject,
  OARequestBodyObject,
  OASecuritySchemeObject,
} from './document-specification.js';

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
 * Component type to components key map.
 */
export declare const OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP: {
  [OAComponentType.SCHEMA]: 'schemas';
  [OAComponentType.RESPONSE]: 'responses';
  [OAComponentType.PARAMETER]: 'parameters';
  [OAComponentType.EXAMPLE]: 'examples';
  [OAComponentType.REQUEST_BODY]: 'requestBodies';
  [OAComponentType.HEADER]: 'headers';
  [OAComponentType.SECURITY_SCHEME]: 'securitySchemes';
  [OAComponentType.LINK]: 'links';
  [OAComponentType.CALLBACK]: 'callbacks';
  [OAComponentType.PATH_ITEM]: 'pathItems';
};

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
 * Component registry.
 */
export class OAComponentRegistry extends Service {
  /**
   * Get components object.
   */
  getComponentsObject(): Required<OAComponentsObject>;

  /**
   * Define schema.
   *
   * @param schemaDef
   */
  defineSchema(schemaDef: OASchemaComponentDefinition): this;

  /**
   * Has schema.
   *
   * @param name
   */
  hasSchema(name: string): boolean;

  /**
   * Get schema.
   *
   * @param name
   */
  getSchema(name: string): OASchemaObject;

  /**
   * Define response.
   *
   * @param responseDef
   */
  defineResponse(responseDef: OAResponseComponentDefinition): this;

  /**
   * Has response.
   *
   * @param name
   */
  hasResponse(name: string): boolean;

  /**
   * Get response.
   *
   * @param name
   */
  getResponse(name: string): OAResponseObject;

  /**
   * Define parameter.
   *
   * @param parameterDef
   */
  defineParameter(parameterDef: OAParameterComponentDefinition): this;

  /**
   * Has parameter.
   *
   * @param name
   */
  hasParameter(name: string): boolean;

  /**
   * Get parameter.
   *
   * @param name
   */
  getParameter(name: string): OAParameterObject;

  /**
   * Define example.
   *
   * @param exampleDef
   */
  defineExample(exampleDef: OAExampleComponentDefinition): this;

  /**
   * Has example.
   *
   * @param name
   */
  hasExample(name: string): boolean;

  /**
   * Get example.
   *
   * @param name
   */
  getExample(name: string): OAExampleObject;

  /**
   * Define request body.
   *
   * @param requestBodyDef
   */
  defineRequestBody(requestBodyDef: OARequestBodyComponentDefinition): this;

  /**
   * Has request body.
   *
   * @param name
   */
  hasRequestBody(name: string): boolean;

  /**
   * Get request body.
   *
   * @param name
   */
  getRequestBody(name: string): OARequestBodyObject;

  /**
   * Define header.
   *
   * @param headerDef
   */
  defineHeader(headerDef: OAHeaderComponentDefinition): this;

  /**
   * Has header.
   *
   * @param name
   */
  hasHeader(name: string): boolean;

  /**
   * Get header.
   *
   * @param name
   */
  getHeader(name: string): OAHeaderObject;

  /**
   * Define security scheme.
   *
   * @param securitySchemeDef
   */
  defineSecurityScheme(
    securitySchemeDef: OASecuritySchemeComponentDefinition,
  ): this;

  /**
   * Has security scheme.
   *
   * @param name
   */
  hasSecurityScheme(name: string): boolean;

  /**
   * Get security scheme.
   *
   * @param name
   */
  getSecurityScheme(name: string): OASecuritySchemeObject;

  /**
   * Define link.
   *
   * @param linkDef
   */
  defineLink(linkDef: OALinkComponentDefinition): this;

  /**
   * Has link.
   *
   * @param name
   */
  hasLink(name: string): boolean;

  /**
   * Get link.
   *
   * @param name
   */
  getLink(name: string): OALinkObject;

  /**
   * Define callback.
   *
   * @param callbackDef
   */
  defineCallback(callbackDef: OACallbackComponentDefinition): this;

  /**
   * Has callback.
   *
   * @param name
   */
  hasCallback(name: string): boolean;

  /**
   * Get callback.
   *
   * @param name
   */
  getCallback(name: string): OACallbackObject;

  /**
   * Define path item.
   *
   * @param pathItemDef
   */
  definePathItem(pathItemDef: OAPathItemComponentDefinition): this;

  /**
   * Has path item.
   *
   * @param name
   */
  hasPathItem(name: string): boolean;

  /**
   * Get path item.
   *
   * @param name
   */
  getPathItem(name: string): OAPathItemObject;
}
