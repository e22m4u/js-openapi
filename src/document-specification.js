// OpenApi version 3.1.0
// https://spec.openapis.org/oas/v3.1.0

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
}

/**
 * Parameter Location.
 * https://spec.openapis.org/oas/v3.1.0#parameter-locations
 */
export const OAParameterLocation = {
  QUERY: 'query',
  HEADER: 'header',
  PATH: 'path',
  COOKIE: 'cookie',
}

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
}

/**
 * Data format.
 * https://spec.openapis.org/oas/v3.1.0#dataTypeFormat
 */
export const OADataFormat = {
  INT32: 'int32',
  INT64: 'int64',
  FLOAT: 'float',
  DOUBLE: 'double',
  PASSWORD: 'password',
  BINARY: 'binary',
}

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
}

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
}

/**
 * Api Key Location.
 * https://spec.openapis.org/oas/v3.1.0#security-scheme-object
 */
export const OAApiKeyLocation = {
  QUERY: 'query',
  HEADER: 'header',
  COOKIE: 'cookie',
}