// OpenApi version 3.1.0
// https://spec.openapis.org/oas/v3.1.0

/**
 * OpenAPI version.
 */
export const OPENAPI_VERSION = '3.1.0';

/**
 * Operation Method.
 * https://spec.openapis.org/oas/v3.1.0#path-item-object
 */
export const OAOperationMethod = {
  GET: 'get',
  PUT: 'put',
  POST: 'post',
  DELETE: 'delete',
  OPTIONS: 'options',
  HEAD: 'head',
  PATCH: 'patch',
  TRACE: 'trace',
};

/**
 * Parameter Location.
 * https://spec.openapis.org/oas/v3.1.0#parameter-locations
 */
export const OAParameterLocation = {
  QUERY: 'query',
  HEADER: 'header',
  PATH: 'path',
  COOKIE: 'cookie',
};

/**
 * Parameter Style.
 * https://spec.openapis.org/oas/v3.1.0#style-values
 */
export const OAParameterStyle = {
  MATRIX: 'matrix',
  LABEL: 'label',
  FORM: 'form',
  SIMPLE: 'simple',
  SPACE_DELIMITED: 'spaceDelimited',
  PIPE_DELIMITED: 'pipeDelimited',
  DEEP_OBJECT: 'deepObject',
};

/**
 * Data type.
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-4.2.1
 */
export const OADataType = {
  STRING: 'string',
  NUMBER: 'number',
  INTEGER: 'integer',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',
  NULL: 'null',
};

/**
 * Data format.
 * https://spec.openapis.org/oas/v3.1.0#dataTypeFormat
 */
export const OADataFormat = {
  // number
  INT32: 'int32',
  INT64: 'int64',
  FLOAT: 'float',
  DOUBLE: 'double',
  // date and time
  DATE: 'date',
  DATE_TIME: 'date-time',
  TIME: 'time',
  DURATION: 'duration',
  // binary
  BYTE: 'byte',
  BINARY: 'binary',
  // identifiers and network
  EMAIL: 'email',
  IDN_EMAIL: 'idn-email',
  UUID: 'uuid',
  HOSTNAME: 'hostname',
  IDN_HOSTNAME: 'idn-hostname',
  IPV4: 'ipv4',
  IPV6: 'ipv6',
  URI: 'uri',
  URI_REFERENCE: 'uri-reference',
  IRI: 'iri',
  IRI_REFERENCE: 'iri-reference',
  // extra
  PASSWORD: 'password',
  REGEX: 'regex',
  JSON_POINTER: 'json-pointer',
  RELATIVE_JSON_POINTER: 'relative-json-pointer',
};

/**
 * Media type.
 * https://spec.openapis.org/oas/v3.1.0#media-types
 */
export const OAMediaType = {
  TEXT_PLAIN: 'text/plain',
  TEXT_HTML: 'text/html',
  APPLICATION_XML: 'application/xml',
  APPLICATION_JSON: 'application/json',
  MULTIPART_FORM_DATA: 'multipart/form-data',
};

/**
 * Security Scheme Type.
 * https://spec.openapis.org/oas/v3.1.0#security-scheme-object
 */
export const OASecuritySchemeType = {
  API_KEY: 'apiKey',
  HTTP: 'http',
  MUTUAL_TLS: 'mutualTLS',
  OAUTH_2: 'oauth2',
  OPEN_ID_CONNECT: 'openIdConnect',
};

/**
 * Api Key Location.
 * https://spec.openapis.org/oas/v3.1.0#security-scheme-object
 */
export const OAApiKeyLocation = {
  QUERY: 'query',
  HEADER: 'header',
  COOKIE: 'cookie',
};

/**
 * Access mode.
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-01#name-readonly-and-writeonly
 */
export const OAAccessMode = {
  READ: 'read',
  WRITE: 'write',
};
