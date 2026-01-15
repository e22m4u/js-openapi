import {OAReferenceObject} from '../document-specification.js';

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
 * Create the Reference Object.
 *
 * Example:
 *
 * ```js
 * oaRef('User', OAComponentType.SCHEMA);
 * // {"$ref": "#/components/schemas/User"}
 * ```
 *
 * @param name
 * @param type
 */
export declare function oaRef(
  name: string,
  type: OAComponentType,
): OAReferenceObject;

/* aliases */
export declare const oaSchemaRef: (name: string) => OAReferenceObject;
export declare const oaResponseRef: (name: string) => OAReferenceObject;
export declare const oaParameterRef: (name: string) => OAReferenceObject;
export declare const oaExampleRef: (name: string) => OAReferenceObject;
export declare const oaRequestBodyRef: (name: string) => OAReferenceObject;
export declare const oaSecuritySchemeRef: (name: string) => OAReferenceObject;
export declare const oaLinkRef: (name: string) => OAReferenceObject;
export declare const oaCallbackRef: (name: string) => OAReferenceObject;
export declare const oaPathItemRef: (name: string) => OAReferenceObject;
