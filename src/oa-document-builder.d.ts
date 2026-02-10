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
    name: string,
    component: OASchemaObject | OAReferenceObject,
  ): this;

  /**
   * Define component (response).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.RESPONSE,
    name: string,
    component: OAResponseObject | OAReferenceObject,
  ): this;

  /**
   * Define component (parameter).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.PARAMETER,
    name: string,
    component: OAParameterObject | OAReferenceObject,
  ): this;

  /**
   * Define component (example).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.EXAMPLE,
    name: string,
    component: OAExampleObject | OAReferenceObject,
  ): this;

  /**
   * Define component (request body).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.REQUEST_BODY,
    name: string,
    component: OARequestBodyObject | OAReferenceObject,
  ): this;

  /**
   * Define component (header).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.HEADER,
    name: string,
    component: OAHeaderObject | OAReferenceObject,
  ): this;

  /**
   * Define component (security scheme).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.SECURITY_SCHEME,
    name: string,
    component: OASecuritySchemeObject | OAReferenceObject,
  ): this;

  /**
   * Define component (link).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.LINK,
    name: string,
    component: OALinkObject | OAReferenceObject,
  ): this;

  /**
   * Define component (callback).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.CALLBACK,
    name: string,
    component: OACallbackObject | OAReferenceObject,
  ): this;

  /**
   * Define component (path item).
   *
   * @param type
   * @param definition
   */
  defineComponent(
    type: typeof OAComponentType.PATH_ITEM,
    name: string,
    component: OAPathItemObject | OAReferenceObject,
  ): this;

  /**
   * Define component.
   *
   * @param type
   * @param definition
   */
  defineComponent(type: OAComponentType, name: string, component: object): this;

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
   * @param name
   * @param component
   */
  defineSchemaComponent(
    name: string,
    component: OASchemaObject | OAReferenceObject,
  ): this;

  /**
   * Define response component.
   *
   * @param name
   * @param component
   */
  defineResponseComponent(
    name: string,
    component: OAResponseObject | OAReferenceObject,
  ): this;

  /**
   * Define parameter component.
   *
   * @param name
   * @param component
   */
  defineParameterComponent(
    name: string,
    component: OAParameterObject | OAReferenceObject,
  ): this;

  /**
   * Define example component.
   *
   * @param name
   * @param component
   */
  defineExampleComponent(
    name: string,
    component: OAExampleObject | OAReferenceObject,
  ): this;

  /**
   * Define request body component.
   *
   * @param name
   * @param component
   */
  defineRequestBodyComponent(
    name: string,
    component: OARequestBodyObject | OAReferenceObject,
  ): this;

  /**
   * Define header component.
   *
   * @param name
   * @param component
   */
  defineHeaderComponent(
    name: string,
    component: OAHeaderObject | OAReferenceObject,
  ): this;

  /**
   * Define security scheme component.
   *
   * @param name
   * @param component
   */
  defineSecuritySchemeComponent(
    name: string,
    component: OASecuritySchemeObject | OAReferenceObject,
  ): this;

  /**
   * Define link component.
   *
   * @param name
   * @param component
   */
  defineLinkComponent(
    name: string,
    component: OALinkObject | OAReferenceObject,
  ): this;

  /**
   * Define callback component.
   *
   * @param name
   * @param component
   */
  defineCallbackComponent(
    name: string,
    component: OACallbackObject | OAReferenceObject,
  ): this;

  /**
   * Define path item component.
   *
   * @param name
   * @param component
   */
  definePathItemComponent(name: string, component: OAPathItemObject): this;

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
