// OpenApi version 3.1.2
// https://spec.openapis.org/oas/v3.1.2

/**
 * OpenAPI version.
 */
export declare const OPENAPI_VERSION: '3.1.2';

/**
 * Document Object.
 * https://spec.openapis.org/oas/v3.1.2#openapi-object
 */
export type OADocumentObject = {
  openapi: string;
  info: OAInfoObject;
  jsonSchemaDialect?: string;
  servers?: OAServerObject[];
  paths?: OAPathsObject;
  webhooks?: OAWebhooksObject;
  components?: OAComponentsObject;
  security?: OASecurityRequirementObject[];
  tags?: OATagObject[];
  externalDocs?: OAExternalDocumentationObject;
};

/**
 * Info Object.
 * https://spec.openapis.org/oas/v3.1.2#info-object
 */
export type OAInfoObject = {
  title: string;
  summary?: string;
  description?: string;
  termsOfService?: string;
  contact?: OAContactObject;
  license?: OALicenseObject;
  version: string;
};

/**
 * Contact Object.
 * https://spec.openapis.org/oas/v3.1.2#contact-object
 */
export type OAContactObject = {
  name?: string;
  url?: string;
  email?: string;
};

/**
 * License Object.
 * https://spec.openapis.org/oas/v3.1.2#license-object
 */
export type OALicenseObject = {
  name: string;
  identifier?: string;
  url?: string;
};

/**
 * Server Object.
 * https://spec.openapis.org/oas/v3.1.2#server-object
 */
export type OAServerObject = {
  url: string;
  description?: string;
  variables?: OAServerVariablesObject;
};

/**
 * Server variable object.
 * https://spec.openapis.org/oas/v3.1.2#server-variable-object
 */
export type OAServerVariableObject = {
  enum?: string[];
  default: string;
  description?: string;
};

/**
 * Paths Object.
 * https://spec.openapis.org/oas/v3.1.2#paths-object
 */
export type OAPathsObject = {
  [path: string]: OAPathItemObject | undefined;
};

/**
 * Path Item Object
 * https://spec.openapis.org/oas/v3.1.2#path-item-object
 */
export type OAPathItemObject = {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: OAOperationObject;
  put?: OAOperationObject;
  post?: OAOperationObject;
  delete?: OAOperationObject;
  options?: OAOperationObject;
  head?: OAOperationObject;
  patch?: OAOperationObject;
  trace?: OAOperationObject;
  servers?: OAServerObject[];
  parameters?: (OAParameterObject | OAReferenceObject)[];
};

/**
 * Operation Method.
 * https://spec.openapis.org/oas/v3.1.2#path-item-object
 */
export declare const OAOperationMethod: {
  GET: 'get';
  PUT: 'put';
  POST: 'post';
  DELETE: 'delete';
  OPTIONS: 'options';
  HEAD: 'head';
  PATCH: 'patch';
  TRACE: 'trace';
};

/**
 * Operation Method.
 * https://spec.openapis.org/oas/v3.1.2#path-item-object
 */
export type OAOperationMethod =
  (typeof OAOperationMethod)[keyof typeof OAOperationMethod];

/**
 * Parameter Object.
 * https://spec.openapis.org/oas/v3.1.2#parameter-object
 */
export type OAParameterObject = {
  name: string;
  in: OAParameterLocation;
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: OAParameterStyle;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  content?: OAContentObject;
  example?: unknown;
  examples?: OAExamplesObject;
};

/**
 * Parameter Location.
 * https://spec.openapis.org/oas/v3.1.2#parameter-locations
 */
export declare const OAParameterLocation: {
  QUERY: 'query';
  HEADER: 'header';
  PATH: 'path';
  COOKIE: 'cookie';
};

/**
 * Parameter Location.
 * https://spec.openapis.org/oas/v3.1.2#parameter-locations
 */
export type OAParameterLocation =
  (typeof OAParameterLocation)[keyof typeof OAParameterLocation];

/**
 * Parameter Style.
 * https://spec.openapis.org/oas/v3.1.2#style-values
 */
export declare const OAParameterStyle: {
  MATRIX: 'matrix';
  LABEL: 'label';
  FORM: 'form';
  SIMPLE: 'simple';
  SPACE_DELIMITED: 'spaceDelimited';
  PIPE_DELIMITED: 'pipeDelimited';
  DEEP_OBJECT: 'deepObject';
};

/**
 * Parameter Style.
 * https://spec.openapis.org/oas/v3.1.2#style-values
 */
export type OAParameterStyle =
  (typeof OAParameterStyle)[keyof typeof OAParameterStyle];

/**
 * Reference Object.
 * https://spec.openapis.org/oas/v3.1.2#reference-object
 */
export type OAReferenceObject = {
  $ref: string;
  summary?: string;
  description?: string;
};

/**
 * Boolean Schema.
 * https://json-schema.org/draft/2020-12/json-schema-core#section-4.3.2
 */
export type OABooleanSchema = boolean;

/**
 * Schema Object.
 * https://spec.openapis.org/oas/v3.1.2#schema-object
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-01
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-01#name-table-of-contents-2
 */
export type OASchemaObject = {
  $schema?: string;
  $id?: string;
  $anchor?: string;
  $dynamicAnchor?: string;
  $ref?: string;
  $dynamicRef?: string;
  $defs?: OADefinitionsObject;
  $comment?: string;
  $vocabulary?: {[uri: string]: boolean};
  // common
  title?: string;
  description?: string;
  default?: unknown;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  examples?: unknown[];
  // any
  type?: OADataType | OADataType[];
  format?: OADataFormat | string;
  enum?: unknown[];
  const?: unknown;
  // composition
  allOf?: (OABooleanSchema | OASchemaObject | OAReferenceObject)[];
  oneOf?: (OABooleanSchema | OASchemaObject | OAReferenceObject)[];
  anyOf?: (OABooleanSchema | OASchemaObject | OAReferenceObject)[];
  not?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  // string
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  // number and integer
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  // arrays
  items?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  prefixItems?: (OABooleanSchema | OASchemaObject | OAReferenceObject)[];
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  contains?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  maxContains?: number;
  minContains?: number;
  unevaluatedItems?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  // objects
  properties?: OASchemaPropertiesObject;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  dependentRequired?: OADependentRequiredObject;
  dependentSchemas?: OADependentSchemasObject;
  additionalProperties?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  patternProperties?: OAPatternPropertiesObject;
  unevaluatedProperties?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  propertyNames?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  // openapi specific
  xml?: OAXmlObject;
  externalDocs?: OAExternalDocumentationObject;
  discriminator?: OADiscriminatorObject;
  example?: unknown;
  // contents of string-encoded data
  contentEncoding?: string;
  contentMediaType?: string;
  contentSchema?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  // conditional validation
  if?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  then?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  else?: OABooleanSchema | OASchemaObject | OAReferenceObject;
};

/**
 * Data type.
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-4.2.1
 */
export declare const OADataType: {
  STRING: 'string';
  NUMBER: 'number';
  INTEGER: 'integer';
  BOOLEAN: 'boolean';
  OBJECT: 'object';
  ARRAY: 'array';
  NULL: 'null';
};

/**
 * Data type.
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-4.2.1
 */
export type OADataType = (typeof OADataType)[keyof typeof OADataType];

/**
 * Data format.
 * https://spec.openapis.org/oas/v3.1.2#dataTypeFormat
 */
export declare const OADataFormat: {
  // number
  INT32: 'int32';
  INT64: 'int64';
  FLOAT: 'float';
  DOUBLE: 'double';
  // date and time
  DATE: 'date';
  DATE_TIME: 'date-time';
  TIME: 'time';
  DURATION: 'duration';
  // binary
  BYTE: 'byte';
  BINARY: 'binary';
  // identifiers and network
  EMAIL: 'email';
  IDN_EMAIL: 'idn-email';
  UUID: 'uuid';
  HOSTNAME: 'hostname';
  IDN_HOSTNAME: 'idn-hostname';
  IPV4: 'ipv4';
  IPV6: 'ipv6';
  URI: 'uri';
  URI_REFERENCE: 'uri-reference';
  IRI: 'iri';
  IRI_REFERENCE: 'iri-reference';
  // extra
  PASSWORD: 'password';
  REGEX: 'regex';
  JSON_POINTER: 'json-pointer';
  RELATIVE_JSON_POINTER: 'relative-json-pointer';
};

/**
 * Data format.
 * https://spec.openapis.org/oas/v3.1.2#dataTypeFormat
 */
export type OADataFormat = (typeof OADataFormat)[keyof typeof OADataFormat];

/**
 * Discriminator Object.
 * https://spec.openapis.org/oas/v3.1.2#discriminator-object
 */
export type OADiscriminatorObject = {
  propertyName: string;
  mapping?: {[name: string]: string | undefined};
};

/**
 * Xml Object.
 * https://spec.openapis.org/oas/v3.1.2#xml-object
 */
export type OAXmlObject = {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
};

/**
 * External Documentation Object.
 * https://spec.openapis.org/oas/v3.1.2#external-documentation-object
 */
export type OAExternalDocumentationObject = {
  description?: string;
  url: string;
};

/**
 * Operation Object.
 * https://spec.openapis.org/oas/v3.1.2#operation-object
 */
export type OAOperationObject = {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: OAExternalDocumentationObject;
  operationId?: string;
  parameters?: (OAParameterObject | OAReferenceObject)[];
  requestBody?: OARequestBodyObject | OAReferenceObject;
  responses?: OAResponsesObject;
  callbacks?: OACallbacksObject;
  deprecated?: boolean;
  security?: OASecurityRequirementObject[];
  servers?: OAServerObject[];
};

/**
 * Callback Object.
 * https://spec.openapis.org/oas/v3.1.2#callback-object
 */
export type OACallbackObject = {
  [expression: string]: OAPathItemObject | OAReferenceObject | undefined;
};

/**
 * Request Body Object.
 * https://spec.openapis.org/oas/v3.1.2#request-body-object
 */
export type OARequestBodyObject = {
  description?: string;
  content: OAContentObject;
  required?: boolean;
};

/**
 * Media type.
 * https://spec.openapis.org/oas/v3.1.2#media-types
 */
export declare const OAMediaType: {
  TEXT_PLAIN: 'text/plain';
  TEXT_HTML: 'text/html';
  APPLICATION_XML: 'application/xml';
  APPLICATION_JSON: 'application/json';
  APPLICATION_OCTET_STREAM: 'application/octet-stream';
  MULTIPART_FORM_DATA: 'multipart/form-data';
};

/**
 * Media type.
 * https://spec.openapis.org/oas/v3.1.2#media-types
 */
export type OAMediaType = (typeof OAMediaType)[keyof typeof OAMediaType];

/**
 * Responses Object.
 * https://spec.openapis.org/oas/v3.1.2#responses-object
 */
export type OAResponsesObject = {
  [httpStatusCode: string]: OAResponseObject | OAReferenceObject | undefined;
};

/**
 * Response Object.
 * https://spec.openapis.org/oas/v3.1.2#response-object
 */
export type OAResponseObject = {
  description: string;
  headers?: OAHeadersObject;
  content?: OAContentObject;
  links?: OALinksObject;
};

/**
 * Media Type Object.
 * https://spec.openapis.org/oas/v3.1.2#media-type-object
 */
export type OAMediaTypeObject = {
  schema?: OABooleanSchema | OASchemaObject | OAReferenceObject;
  example?: unknown;
  examples?: OAExamplesObject;
  encoding?: OAPropertiesEncodingObject;
};

/**
 * Example Object.
 * https://spec.openapis.org/oas/v3.1.2#example-object
 */
export type OAExampleObject = {
  summary?: string;
  description?: string;
  value?: unknown;
  externalValue?: string;
};

/**
 * Encoding Object.
 * https://spec.openapis.org/oas/v3.1.2#encoding-object
 */
export type OAEncodingObject = {
  contentType?: string;
  headers?: OAHeadersObject;
  style?: OAParameterStyle;
  explode?: boolean;
  allowReserved?: boolean;
};

/**
 * Header Object.
 * https://spec.openapis.org/oas/v3.1.2#header-object
 */
export type OAHeaderObject = Omit<
  OAParameterObject,
  'name' | 'in' | 'allowEmptyValue'
>;

/**
 * Link Object.
 * https://spec.openapis.org/oas/v3.1.2#link-object
 */
export type OALinkObject = {
  operationRef?: string;
  operationId?: string;
  parameters?: {[name: string]: unknown | undefined};
  requestBody?: unknown;
  description?: string;
  server?: OAServerObject;
};

/**
 * Components Object.
 * https://spec.openapis.org/oas/v3.1.2#components-object
 */
export type OAComponentsObject = {
  schemas?: {[name: string]: OABooleanSchema | OASchemaObject | undefined};
  responses?: {
    [name: string]: OAResponseObject | OAReferenceObject | undefined;
  };
  parameters?: {
    [name: string]: OAParameterObject | OAReferenceObject | undefined;
  };
  examples?: {
    [name: string]: OAExampleObject | OAReferenceObject | undefined;
  };
  requestBodies?: {
    [name: string]: OARequestBodyObject | OAReferenceObject | undefined;
  };
  headers?: {
    [name: string]: OAHeaderObject | OAReferenceObject | undefined;
  };
  securitySchemes?: {
    [name: string]: OASecuritySchemeObject | OAReferenceObject | undefined;
  };
  links?: {
    [name: string]: OALinkObject | OAReferenceObject | undefined;
  };
  callbacks?: {
    [name: string]: OACallbackObject | OAReferenceObject | undefined;
  };
  pathItems?: {
    [name: string]: OAPathItemObject | OAReferenceObject | undefined;
  };
};

/**
 * Security Scheme Object.
 * https://spec.openapis.org/oas/v3.1.2#security-scheme-object
 */
export type OASecuritySchemeObject = {
  type: OASecuritySchemeType;
  description?: string;
  name?: string;
  in?: OAApiKeyLocation;
  scheme?: string;
  bearerFormat?: string;
  flows?: OAOAuthFlowsObject;
  openIdConnectUrl?: string;
};

/**
 * Security Scheme Type.
 * https://spec.openapis.org/oas/v3.1.2#security-scheme-object
 */
export declare const OASecuritySchemeType: {
  API_KEY: 'apiKey';
  HTTP: 'http';
  MUTUAL_TLS: 'mutualTLS';
  OAUTH_2: 'oauth2';
  OPEN_ID_CONNECT: 'openIdConnect';
};

/**
 * Security Scheme Type.
 * https://spec.openapis.org/oas/v3.1.2#security-scheme-object
 */
export type OASecuritySchemeType =
  (typeof OASecuritySchemeType)[keyof typeof OASecuritySchemeType];

/**
 * Api Key Location.
 * https://spec.openapis.org/oas/v3.1.2#security-scheme-object
 */
export declare const OAApiKeyLocation: {
  QUERY: 'query';
  HEADER: 'header';
  COOKIE: 'cookie';
};

/**
 * Api Key Location.
 * https://spec.openapis.org/oas/v3.1.2#security-scheme-object
 */
export type OAApiKeyLocation =
  (typeof OAApiKeyLocation)[keyof typeof OAApiKeyLocation];

/**
 * OAuth Flows Object.
 * https://spec.openapis.org/oas/v3.1.2#oauth-flows-object
 */
export type OAOAuthFlowsObject = {
  implicit?: OAOAuthFlowObject;
  password?: OAOAuthFlowObject;
  clientCredentials?: OAOAuthFlowObject;
  authorizationCode?: OAOAuthFlowObject;
};

/**
 * OAuth Flow Object.
 * https://spec.openapis.org/oas/v3.1.2#oauth-flow-object
 */
export type OAOAuthFlowObject = {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: {[name: string]: string | undefined};
};

/**
 * Security Requirement Object.
 * https://spec.openapis.org/oas/v3.1.2#security-requirement-object
 */
export type OASecurityRequirementObject = {
  [name: string]: string[] | undefined;
};

/**
 * Tag Object.
 * https://spec.openapis.org/oas/v3.1.2#tag-object
 */
export type OATagObject = {
  name: string;
  description?: string;
  externalDocs?: OAExternalDocumentationObject;
};

/**
 * Definitions Object.
 * https://json-schema.org/draft/2020-12/json-schema-core#name-schema-re-use-with-defs
 */
export type OADefinitionsObject = {
  [name: string]: OABooleanSchema | OASchemaObject | OAReferenceObject;
};

/**
 * Dependent schemas object.
 * https://json-schema.org/draft/2020-12/json-schema-core#name-dependentschemas
 */
export type OADependentSchemasObject = {
  [key: string]: OABooleanSchema | OASchemaObject | OAReferenceObject;
};

/**
 * Dependent required object.
 * https://json-schema.org/draft/2020-12/json-schema-validation#name-dependentrequired
 */
export type OADependentRequiredObject = {
  [key: string]: string[] | undefined;
};

/**
 * Pattern properties object.
 * https://json-schema.org/draft/2020-12/json-schema-core#name-patternproperties
 */
export type OAPatternPropertiesObject = {
  [pattern: string]: OABooleanSchema | OASchemaObject | OAReferenceObject;
};

/**
 * Access mode.
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-01#name-readonly-and-writeonly
 */
export declare const OAAccessMode: {
  READ: 'read';
  WRITE: 'write';
};

/**
 * Access mode.
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-01#name-readonly-and-writeonly
 */
export type OAAccessMode = (typeof OAAccessMode)[keyof typeof OAAccessMode];

/**
 * Webhooks Object.
 * https://spec.openapis.org/oas/v3.1.2#oasWebhooks
 */
export type OAWebhooksObject = {
  [name: string]: OAPathItemObject | OAReferenceObject | undefined;
};

/**
 * Server Variables Object.
 * (non-spec type)
 */
export type OAServerVariablesObject = {
  [name: string]: OAServerVariableObject | undefined;
};

/**
 * Schema Properties Object.
 * (non-spec type)
 */
export type OASchemaPropertiesObject = {
  [name: string]:
    | OABooleanSchema
    | OASchemaObject
    | OAReferenceObject
    | undefined;
};

/**
 * Callbacks Object.
 * (non-spec type)
 */
export type OACallbacksObject = {
  [key: string]: OACallbackObject | OAReferenceObject | undefined;
};

/**
 * Content Object.
 * (non-spec type)
 */
export type OAContentObject = {
  [mediaType: string]: OAMediaTypeObject | undefined;
};

/**
 * Headers Object.
 * (non-spec type)
 */
export type OAHeadersObject = {
  [name: string]: OAHeaderObject | OAReferenceObject | undefined;
};

/**
 * Links Object.
 * (non-spec type)
 */
export type OALinksObject = {
  [name: string]: OALinkObject | OAReferenceObject | undefined;
};

/**
 * Examples Object.
 * (non-spec type)
 */
export type OAExamplesObject = {
  [name: string]: OAExampleObject | OAReferenceObject | undefined;
};

/**
 * Properties Encoding Object.
 * (non-spec type)
 */
export type OAPropertiesEncodingObject = {
  [propertyName: string]: OAEncodingObject | undefined;
};
