"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  ACCESS_MODE_LIST: () => ACCESS_MODE_LIST,
  JSON_INTEGER_REGEXP: () => JSON_INTEGER_REGEXP,
  JSON_NUMBER_REGEXP: () => JSON_NUMBER_REGEXP,
  OAAccessMode: () => OAAccessMode,
  OAApiKeyLocation: () => OAApiKeyLocation,
  OAComponentType: () => OAComponentType,
  OADataFormat: () => OADataFormat,
  OADataType: () => OADataType,
  OADataValidationError: () => OADataValidationError,
  OADocumentBuilder: () => OADocumentBuilder,
  OADocumentScope: () => OADocumentScope,
  OAMediaType: () => OAMediaType,
  OAOperationMethod: () => OAOperationMethod,
  OAParameterLocation: () => OAParameterLocation,
  OAParameterStyle: () => OAParameterStyle,
  OASecuritySchemeType: () => OASecuritySchemeType,
  OA_BUILT_IN_DATA_FORMAT_VALIDATOR_MAP: () => OA_BUILT_IN_DATA_FORMAT_VALIDATOR_MAP,
  OA_COMPONENT_TYPES: () => OA_COMPONENT_TYPES,
  OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP: () => OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP,
  OA_DATA_TYPE_LIST: () => OA_DATA_TYPE_LIST,
  OPENAPI_VERSION: () => OPENAPI_VERSION,
  escapeJsonPointer: () => escapeJsonPointer,
  inferOpenApiDataType: () => inferOpenApiDataType,
  isOAReferenceObject: () => isOAReferenceObject,
  oaCallbackRef: () => oaCallbackRef,
  oaExampleRef: () => oaExampleRef,
  oaLinkRef: () => oaLinkRef,
  oaParameterRef: () => oaParameterRef,
  oaPathItemRef: () => oaPathItemRef,
  oaRequestBodyRef: () => oaRequestBodyRef,
  oaResponseRef: () => oaResponseRef,
  oaSchemaRef: () => oaSchemaRef,
  oaSecuritySchemeRef: () => oaSecuritySchemeRef,
  resolveJsonPointer: () => resolveJsonPointer,
  resolveOAReferenceObject: () => resolveOAReferenceObject,
  unescapeJsonPointer: () => unescapeJsonPointer,
  validateByteFormat: () => validateByteFormat,
  validateDataWithOpenApiSchema: () => validateDataWithOpenApiSchema,
  validateDateFormat: () => validateDateFormat,
  validateDateTimeFormat: () => validateDateTimeFormat,
  validateDoubleFormat: () => validateDoubleFormat,
  validateEmailFormat: () => validateEmailFormat,
  validateFloatFormat: () => validateFloatFormat,
  validateHostnameFormat: () => validateHostnameFormat,
  validateInt32Format: () => validateInt32Format,
  validateInt64Format: () => validateInt64Format,
  validateIpv4Format: () => validateIpv4Format,
  validateIpv6Format: () => validateIpv6Format,
  validateShallowOADocument: () => validateShallowOADocument,
  validateUriFormat: () => validateUriFormat,
  validateUuidFormat: () => validateUuidFormat
});
module.exports = __toCommonJS(index_exports);

// src/errors/oa-data-validation-error.js
var import_js_format = require("@e22m4u/js-format");
var OADataValidationError = class extends import_js_format.Errorf {
  static {
    __name(this, "OADataValidationError");
  }
};

// src/data-type/infer-openapi-data-type.js
var import_js_format2 = require("@e22m4u/js-format");

// src/oa-specification.js
var OPENAPI_VERSION = "3.1.0";
var OAOperationMethod = {
  GET: "get",
  PUT: "put",
  POST: "post",
  DELETE: "delete",
  OPTIONS: "options",
  HEAD: "head",
  PATCH: "patch",
  TRACE: "trace"
};
var OAParameterLocation = {
  QUERY: "query",
  HEADER: "header",
  PATH: "path",
  COOKIE: "cookie"
};
var OAParameterStyle = {
  MATRIX: "matrix",
  LABEL: "label",
  FORM: "form",
  SIMPLE: "simple",
  SPACE_DELIMITED: "spaceDelimited",
  PIPE_DELIMITED: "pipeDelimited",
  DEEP_OBJECT: "deepObject"
};
var OADataType = {
  STRING: "string",
  NUMBER: "number",
  INTEGER: "integer",
  BOOLEAN: "boolean",
  OBJECT: "object",
  ARRAY: "array",
  NULL: "null"
};
var OA_DATA_TYPE_LIST = Object.values(OADataType);
var OADataFormat = {
  // number
  INT32: "int32",
  INT64: "int64",
  FLOAT: "float",
  DOUBLE: "double",
  // date and time
  DATE: "date",
  DATE_TIME: "date-time",
  TIME: "time",
  DURATION: "duration",
  // binary
  BYTE: "byte",
  BINARY: "binary",
  // identifiers and network
  EMAIL: "email",
  IDN_EMAIL: "idn-email",
  UUID: "uuid",
  HOSTNAME: "hostname",
  IDN_HOSTNAME: "idn-hostname",
  IPV4: "ipv4",
  IPV6: "ipv6",
  URI: "uri",
  URI_REFERENCE: "uri-reference",
  IRI: "iri",
  IRI_REFERENCE: "iri-reference",
  // extra
  PASSWORD: "password",
  REGEX: "regex",
  JSON_POINTER: "json-pointer",
  RELATIVE_JSON_POINTER: "relative-json-pointer"
};
var OAMediaType = {
  TEXT_PLAIN: "text/plain",
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xml",
  APPLICATION_JSON: "application/json",
  MULTIPART_FORM_DATA: "multipart/form-data"
};
var OASecuritySchemeType = {
  API_KEY: "apiKey",
  HTTP: "http",
  MUTUAL_TLS: "mutualTLS",
  OAUTH_2: "oauth2",
  OPEN_ID_CONNECT: "openIdConnect"
};
var OAApiKeyLocation = {
  QUERY: "query",
  HEADER: "header",
  COOKIE: "cookie"
};
var OAAccessMode = {
  READ: "read",
  WRITE: "write"
};
var ACCESS_MODE_LIST = Object.values(OAAccessMode);

// src/data-type/infer-openapi-data-type.js
function inferOpenApiDataType(data, returnJsTypeOnFail = false) {
  if (data === null) {
    return OADataType.NULL;
  }
  if (Array.isArray(data)) {
    return OADataType.ARRAY;
  }
  const jsType = typeof data;
  switch (jsType) {
    case "string":
      return OADataType.STRING;
    case "boolean":
      return OADataType.BOOLEAN;
    case "number":
      return Number.isInteger(data) ? OADataType.INTEGER : OADataType.NUMBER;
    case "bigint":
      return OADataType.INTEGER;
    case "object":
      return OADataType.OBJECT;
  }
  if (returnJsTypeOnFail === true) {
    return jsType;
  }
  throw new import_js_format2.InvalidArgumentError(
    "Unable to infer the data type from %v value.",
    data
  );
}
__name(inferOpenApiDataType, "inferOpenApiDataType");

// src/oa-document-scope.js
var import_js_format5 = require("@e22m4u/js-format");

// src/utils/join-path.js
function joinPath(...segments) {
  const parts = segments.filter((seg) => seg != void 0 && String(seg) !== "");
  if (parts.length === 0) {
    return "/";
  }
  let joined = parts.join("/").replace(/\/+/g, "/");
  const protocolRegex = /^([a-z][a-z0-9+.-]*):\//i;
  const protocolMatch = joined.match(protocolRegex);
  if (protocolMatch) {
    joined = joined.replace(protocolRegex, "$1://");
  } else {
    if (!joined.startsWith("/")) {
      joined = "/" + joined;
    }
  }
  if (joined.length > 1 && joined.endsWith("/")) {
    joined = joined.slice(0, -1);
  }
  return joined;
}
__name(joinPath, "joinPath");

// src/utils/count-unicode.js
function countUnicode(data) {
  const matchedChars = String(data).match(/[\s\S]/gu);
  return Array.isArray(matchedChars) ? matchedChars.length : 0;
}
__name(countUnicode, "countUnicode");

// src/utils/normalize-path.js
function normalizePath(value, noStartingSlash = false) {
  if (typeof value !== "string") {
    return "/";
  }
  const res = value.trim().replace(/\/+/g, "/").replace(/(^\/|\/$)/g, "");
  return noStartingSlash ? res : "/" + res;
}
__name(normalizePath, "normalizePath");

// src/utils/to-spaced-json.js
function toSpacedJson(value, options = {}) {
  const stringified = JSON.stringify(value, null, 1);
  const res = stringified ? stringified.replace(/\n\s*/g, " ").replace(/\[\s/g, "[").replace(/\s\]/g, "]").replace(/\{\s/g, "{").replace(/\s\}/g, "}") : "undefined";
  if (options.truncate && typeof options.truncate === "number" && res.length > options.truncate) {
    return res.slice(0, options.truncate) + "...";
  }
  return res;
}
__name(toSpacedJson, "toSpacedJson");

// src/utils/to-pascal-case.js
function toPascalCase(input) {
  if (!input) {
    return "";
  }
  return input.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([0-9])([a-zA-Z])/g, "$1 $2").replace(/[-_]+|[^\p{L}\p{N}]/gu, " ").toLowerCase().replace(new RegExp("(?:^|\\s)(\\p{L})", "gu"), (_, letter) => letter.toUpperCase()).replace(/\s+/g, "");
}
__name(toPascalCase, "toPascalCase");

// src/oa-document-builder.js
var import_js_format4 = require("@e22m4u/js-format");
var import_js_service = require("@e22m4u/js-service");

// src/oa-document-object/validate-shallow-oa-document.js
var import_js_format3 = require("@e22m4u/js-format");
function validateShallowOADocument(documentObject) {
  if (!documentObject || typeof documentObject !== "object" || Array.isArray(documentObject)) {
    throw new import_js_format3.InvalidArgumentError(
      "OpenAPI Document Object must be an Object, but %v was given.",
      documentObject
    );
  }
  if (!documentObject.openapi || typeof documentObject.openapi !== "string") {
    throw new import_js_format3.InvalidArgumentError(
      'Property "openapi" must be a non-empty String, but %v was given.',
      documentObject.openapi
    );
  }
  if (!documentObject.info || typeof documentObject.info !== "object" || Array.isArray(documentObject.info)) {
    throw new import_js_format3.InvalidArgumentError(
      'Property "info" must be an Object, but %v was given.',
      documentObject.info
    );
  }
  if (!documentObject.info.title || typeof documentObject.info.title !== "string") {
    throw new import_js_format3.InvalidArgumentError(
      'Property "info.title" must be a non-empty String, but %v was given.',
      documentObject.info.title
    );
  }
  if (!documentObject.info.version || typeof documentObject.info.version !== "string") {
    throw new import_js_format3.InvalidArgumentError(
      'Property "info.version" must be a non-empty String, but %v was given.',
      documentObject.info.version
    );
  }
  if (documentObject.jsonSchemaDialect !== void 0) {
    if (!documentObject.jsonSchemaDialect || typeof documentObject.jsonSchemaDialect !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Property "jsonSchemaDialect" must be a non-empty String, but %v was given.',
        documentObject.jsonSchemaDialect
      );
    }
  }
  if (documentObject.servers !== void 0) {
    if (!Array.isArray(documentObject.servers)) {
      throw new import_js_format3.InvalidArgumentError(
        'Property "servers" must be an Array, but %v was given.',
        documentObject.servers
      );
    }
    documentObject.servers.forEach((serverObject, index) => {
      if (!serverObject || typeof serverObject !== "object" || Array.isArray(serverObject)) {
        throw new import_js_format3.InvalidArgumentError(
          'Element "servers[%d]" must be an Object, but %v was given.',
          index,
          serverObject
        );
      }
      if (!serverObject.url || typeof serverObject.url !== "string") {
        throw new import_js_format3.InvalidArgumentError(
          'Property "servers[%d].url" must be a non-empty String, but %v was given.',
          index,
          serverObject.url
        );
      }
    });
  }
  if (documentObject.paths !== void 0) {
    if (!documentObject.paths || typeof documentObject.paths !== "object" || Array.isArray(documentObject.paths)) {
      throw new import_js_format3.InvalidArgumentError(
        'Property "paths" must be an Object, but %v was given.',
        documentObject.paths
      );
    }
  }
  if (documentObject.webhooks !== void 0) {
    if (!documentObject.webhooks || typeof documentObject.webhooks !== "object" || Array.isArray(documentObject.webhooks)) {
      throw new import_js_format3.InvalidArgumentError(
        'Property "webhooks" must be an Object, but %v was given.',
        documentObject.webhooks
      );
    }
  }
  if (documentObject.components !== void 0) {
    if (!documentObject.components || typeof documentObject.components !== "object" || Array.isArray(documentObject.components)) {
      throw new import_js_format3.InvalidArgumentError(
        'Property "components" must be an Object, but %v was given.',
        documentObject.components
      );
    }
  }
  if (documentObject.security !== void 0) {
    if (!Array.isArray(documentObject.security)) {
      throw new import_js_format3.InvalidArgumentError(
        'Property "security" must be an Array, but %v was given.',
        documentObject.security
      );
    }
    documentObject.security.forEach((securityRequirementObject, index) => {
      if (!securityRequirementObject || typeof securityRequirementObject !== "object" || Array.isArray(securityRequirementObject)) {
        throw new import_js_format3.InvalidArgumentError(
          'Element "security[%d]" must be an Object, but %v was given.',
          index,
          securityRequirementObject
        );
      }
    });
  }
  if (documentObject.tags !== void 0) {
    if (!Array.isArray(documentObject.tags)) {
      throw new import_js_format3.InvalidArgumentError(
        'Property "tags" must be an Array, but %v was given.',
        documentObject.tags
      );
    }
    documentObject.tags.forEach((tagObject, index) => {
      if (!tagObject || typeof tagObject !== "object" || Array.isArray(tagObject)) {
        throw new import_js_format3.InvalidArgumentError(
          'Element "tags[%d]" must be an Object, but %v was given.',
          index,
          tagObject
        );
      }
      if (!tagObject.name || typeof tagObject.name !== "string") {
        throw new import_js_format3.InvalidArgumentError(
          'Property "tags[%d].name" must be a non-empty String, but %v was given.',
          index,
          tagObject.name
        );
      }
    });
  }
  if (documentObject.externalDocs !== void 0) {
    if (!documentObject.externalDocs || typeof documentObject.externalDocs !== "object" || Array.isArray(documentObject.externalDocs)) {
      throw new import_js_format3.InvalidArgumentError(
        'Property "externalDocs" must be an Object, but %v was given.',
        documentObject.externalDocs
      );
    }
  }
}
__name(validateShallowOADocument, "validateShallowOADocument");

// src/oa-document-builder.js
var OAComponentType = {
  SCHEMA: "schema",
  RESPONSE: "response",
  PARAMETER: "parameter",
  EXAMPLE: "example",
  REQUEST_BODY: "requestBody",
  HEADER: "header",
  SECURITY_SCHEME: "securityScheme",
  LINK: "link",
  CALLBACK: "callback",
  PATH_ITEM: "pathItem"
};
var OA_COMPONENT_TYPES = Object.values(OAComponentType);
var OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP = {
  [OAComponentType.SCHEMA]: "schemas",
  [OAComponentType.RESPONSE]: "responses",
  [OAComponentType.PARAMETER]: "parameters",
  [OAComponentType.EXAMPLE]: "examples",
  [OAComponentType.REQUEST_BODY]: "requestBodies",
  [OAComponentType.HEADER]: "headers",
  [OAComponentType.SECURITY_SCHEME]: "securitySchemes",
  [OAComponentType.LINK]: "links",
  [OAComponentType.CALLBACK]: "callbacks",
  [OAComponentType.PATH_ITEM]: "pathItems"
};
var OADocumentBuilder = class extends import_js_service.Service {
  static {
    __name(this, "OADocumentBuilder");
  }
  /**
   * Document.
   *
   * @private
   * @type {object}
   */
  _document = {
    openapi: OPENAPI_VERSION,
    info: {
      title: "API Documentation",
      version: "0.0.1"
    }
  };
  /**
   * Constructor.
   *
   * @param {object} [containerOrDocument]
   * @param {object} [document]
   */
  constructor(containerOrDocument, document) {
    if ((0, import_js_service.isServiceContainer)(containerOrDocument)) {
      super(containerOrDocument);
    } else {
      super();
      document = containerOrDocument;
    }
    if (document !== void 0) {
      if (!document || typeof document !== "object" || Array.isArray(document)) {
        throw new import_js_format4.InvalidArgumentError(
          "OpenAPI Document Object must be an Object, but %v was given.",
          document
        );
      }
      document = structuredClone(document);
      if (!document.openapi) {
        document.openapi = this._document.openapi;
      }
      if (!document.info) {
        document.info = this._document.info;
      }
      if (!document.info || typeof document.info !== "object" || Array.isArray(document.info)) {
        throw new import_js_format4.InvalidArgumentError(
          'Property "info" must be an Object, but %v was given.',
          document.info
        );
      }
      if (!document.info.title) {
        document.info.title = this._document.info.title;
      }
      if (!document.info.version) {
        document.info.version = this._document.info.version;
      }
      validateShallowOADocument(document);
      this._document = document;
    }
  }
  /**
   * Define component.
   *
   * @param {string} type
   * @param {object} definition
   * @returns {this}
   */
  defineComponent(type, definition) {
    if (!OA_COMPONENT_TYPES.includes(type)) {
      throw new import_js_format4.InvalidArgumentError(
        "Components type %v is not supported.",
        type
      );
    }
    if (!definition || typeof definition !== "object" || Array.isArray(definition)) {
      throw new import_js_format4.InvalidArgumentError(
        "Component definition must be an Object, but %v was given.",
        definition
      );
    }
    if (!definition.name || typeof definition.name !== "string") {
      throw new import_js_format4.InvalidArgumentError(
        'Property "name" must be a non-empty String, but %v was given.',
        definition.name
      );
    }
    const component = definition[type];
    if (!component || typeof component !== "object" || Array.isArray(component)) {
      throw new import_js_format4.InvalidArgumentError(
        "Property %v must be an Object, but %v was given.",
        type,
        component
      );
    }
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new import_js_format4.InvalidArgumentError(
        "Component type %v does not have a reference to the components key.",
        type
      );
    }
    this._document.components = this._document.components || {};
    this._document.components[key] = this._document.components[key] || {};
    this._document.components[key][definition.name] = structuredClone(component);
    return this;
  }
  /**
   * Has component.
   *
   * @param {string} type
   * @param {string} name
   * @returns {boolean}
   */
  hasComponent(type, name) {
    if (!name || typeof name !== "string") {
      throw new import_js_format4.InvalidArgumentError(
        'Parameter "name" must be a non-empty String, but %v was given.',
        name
      );
    }
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new import_js_format4.InvalidArgumentError(
        "Component type %v does not have a reference to the components key.",
        type
      );
    }
    return Boolean(
      this._document.components && this._document.components[key] && this._document.components[key][name]
    );
  }
  /**
   * Get component.
   *
   * @param {string} type
   * @param {string} name
   * @returns {object}
   */
  getComponent(type, name) {
    if (!name || typeof name !== "string") {
      throw new import_js_format4.InvalidArgumentError(
        'Parameter "name" must be a non-empty String, but %v was given.',
        name
      );
    }
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new import_js_format4.InvalidArgumentError(
        "Component type %v does not have a reference to the components key.",
        type
      );
    }
    const component = this._document && this._document.components && this._document.components[key] && this._document.components[key][name];
    if (!component) {
      throw new import_js_format4.InvalidArgumentError(
        'Component "#/components/%s/%s" does not exist.',
        key,
        name
      );
    }
    return component;
  }
  /**
   * Define schema component.
   *
   * @param {object} schemaDef
   * @returns {this}
   */
  defineSchemaComponent(schemaDef) {
    return this.defineComponent(OAComponentType.SCHEMA, schemaDef);
  }
  /**
   * Define response component.
   *
   * @param {object} responseDef
   * @returns {this}
   */
  defineResponseComponent(responseDef) {
    return this.defineComponent(OAComponentType.RESPONSE, responseDef);
  }
  /**
   * Define parameter component.
   *
   * @param {object} parameterDef
   * @returns {this}
   */
  defineParameterComponent(parameterDef) {
    return this.defineComponent(OAComponentType.PARAMETER, parameterDef);
  }
  /**
   * Define example component.
   *
   * @param {object} exampleDef
   * @returns {this}
   */
  defineExampleComponent(exampleDef) {
    return this.defineComponent(OAComponentType.EXAMPLE, exampleDef);
  }
  /**
   * Define request body component.
   *
   * @param {object} requestBodyDef
   * @returns {this}
   */
  defineRequestBodyComponent(requestBodyDef) {
    return this.defineComponent(OAComponentType.REQUEST_BODY, requestBodyDef);
  }
  /**
   * Define header component.
   *
   * @param {object} headerDef
   * @returns {this}
   */
  defineHeaderComponent(headerDef) {
    return this.defineComponent(OAComponentType.HEADER, headerDef);
  }
  /**
   * Define security scheme component.
   *
   * @param {object} securitySchemeDef
   * @returns {this}
   */
  defineSecuritySchemeComponent(securitySchemeDef) {
    return this.defineComponent(
      OAComponentType.SECURITY_SCHEME,
      securitySchemeDef
    );
  }
  /**
   * Define link component.
   *
   * @param {object} linkDef
   * @returns {this}
   */
  defineLinkComponent(linkDef) {
    return this.defineComponent(OAComponentType.LINK, linkDef);
  }
  /**
   * Define callback component.
   *
   * @param {object} callbackDef
   * @returns {this}
   */
  defineCallbackComponent(callbackDef) {
    return this.defineComponent(OAComponentType.CALLBACK, callbackDef);
  }
  /**
   * Define path item component.
   *
   * @param {object} pathItemDef
   * @returns {this}
   */
  definePathItemComponent(pathItemDef) {
    return this.defineComponent(OAComponentType.PATH_ITEM, pathItemDef);
  }
  /**
   * Define operation.
   *
   * @param {object} operationDef
   */
  defineOperation(operationDef) {
    if (!operationDef || typeof operationDef !== "object" || Array.isArray(operationDef)) {
      throw new import_js_format4.InvalidArgumentError(
        "Operation Definition must be an Object, but %v was given.",
        operationDef
      );
    }
    if (!operationDef.path || typeof operationDef.path !== "string") {
      throw new import_js_format4.InvalidArgumentError(
        'Property "path" must be a non-empty String, but %v was given.',
        operationDef.path
      );
    }
    if (!operationDef.method || typeof operationDef.method !== "string") {
      throw new import_js_format4.InvalidArgumentError(
        'Property "method" must be a non-empty String, but %v was given.',
        operationDef.method
      );
    }
    if (!Object.values(OAOperationMethod).includes(operationDef.method)) {
      throw new import_js_format4.InvalidArgumentError(
        'Property "method" must be one of values: %l, but %v was given.',
        Object.values(OAOperationMethod)
      );
    }
    if (!operationDef.operation || typeof operationDef.operation !== "object" || Array.isArray(operationDef.operation)) {
      throw new import_js_format4.InvalidArgumentError(
        'Property "operation" must be an Object, but %v was given.',
        operationDef.operation
      );
    }
    const normalizedPath = normalizePath(operationDef.path);
    if (!this._document.paths) {
      this._document.paths = {};
    }
    if (!this._document.paths[normalizedPath]) {
      this._document.paths[normalizedPath] = {};
    }
    this._document.paths[normalizedPath][operationDef.method] = structuredClone(
      operationDef.operation
    );
  }
  /**
   * Create scope.
   *
   * @param {object} [options]
   * @returns {OADocumentScope}
   */
  createScope(options) {
    return new OADocumentScope(this, options);
  }
  /**
   * Build.
   *
   * @returns {object}
   */
  build() {
    return structuredClone(this._document);
  }
  /**
   * Build JSON.
   *
   * @param {string|number} [space]
   * @returns {string}
   */
  buildJson(space = 0) {
    return JSON.stringify(this.build(), null, space);
  }
};

// src/oa-document-scope.js
var OADocumentScope = class _OADocumentScope {
  static {
    __name(this, "OADocumentScope");
  }
  /**
   * Builder.
   *
   * @type {OADocumentBuilder}
   */
  _builder;
  /**
   * Path prefix.
   *
   * @type {string}
   */
  _pathPrefix;
  /**
   * Tags.
   *
   * @type {string[]}
   */
  _tags;
  /**
   * @param {object} builder
   * @param {object} [options]
   */
  constructor(builder, options = {}) {
    if (!(builder instanceof OADocumentBuilder)) {
      throw new import_js_format5.InvalidArgumentError(
        'Parameter "builder" must be an instance of OADocumentBuilder, but %v was given.',
        builder
      );
    }
    if (!options || typeof options !== "object" || Array.isArray(options)) {
      throw new import_js_format5.InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options
      );
    }
    if (options.pathPrefix !== void 0) {
      if (!options.pathPrefix || typeof options.pathPrefix !== "string") {
        throw new import_js_format5.InvalidArgumentError(
          'Property "pathPrefix" must be a non-empty String, but %v was given.',
          options.pathPrefix
        );
      }
    }
    if (options.tags !== void 0) {
      if (!Array.isArray(options.tags)) {
        throw new import_js_format5.InvalidArgumentError(
          'Property "tags" must be an Array, but %v was given.',
          options.tags
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== "string") {
          throw new import_js_format5.InvalidArgumentError(
            'Element "tags[%d]" must be a non-empty String, but %v was given.',
            index,
            tag
          );
        }
      });
    }
    this._builder = builder;
    this._pathPrefix = normalizePath(options.pathPrefix || "/");
    this._tags = options.tags || [];
  }
  /**
   * Get builder.
   *
   * @returns {OADocumentBuilder}
   */
  getBuilder() {
    return this._builder;
  }
  /**
   * Get path prefix.
   *
   * @returns {string}
   */
  getPathPrefix() {
    return this._pathPrefix;
  }
  /**
   * Get tags.
   *
   * @returns {string[]}
   */
  getTags() {
    return [...this._tags];
  }
  /**
   * Define operation.
   *
   * @param {object} operationDef
   * @returns {this}
   */
  defineOperation(operationDef) {
    if (!operationDef || typeof operationDef !== "object" || Array.isArray(operationDef)) {
      throw new import_js_format5.InvalidArgumentError(
        "Operation Definition must be an Object, but %v was given.",
        operationDef
      );
    }
    if (!operationDef.path || typeof operationDef.path !== "string") {
      throw new import_js_format5.InvalidArgumentError(
        'Property "path" must be a non-empty String, but %v was given.',
        operationDef.path
      );
    }
    if (!operationDef.method || typeof operationDef.method !== "string") {
      throw new import_js_format5.InvalidArgumentError(
        'Property "method" must be a non-empty String, but %v was given.',
        operationDef.method
      );
    }
    if (!Object.values(OAOperationMethod).includes(operationDef.method)) {
      throw new import_js_format5.InvalidArgumentError(
        'Property "method" must be one of values: %l, but %v was given.',
        Object.values(OAOperationMethod)
      );
    }
    if (!operationDef.operation || typeof operationDef.operation !== "object" || Array.isArray(operationDef.operation)) {
      throw new import_js_format5.InvalidArgumentError(
        'Property "operation" must be an Object, but %v was given.',
        operationDef.operation
      );
    }
    const fullPath = joinPath(this._pathPrefix, operationDef.path);
    const operation = structuredClone(operationDef.operation);
    if (this._tags.length > 0) {
      operation.tags = [...this._tags, ...operation.tags || []];
      operation.tags = [...new Set(operation.tags)];
    }
    this._builder.defineOperation({
      ...operationDef,
      path: fullPath,
      operation
    });
    return this;
  }
  /**
   * Create scope.
   *
   * @param {object} [options]
   * @returns {OADocumentScope}
   */
  createScope(options = {}) {
    if (!options || typeof options !== "object" || Array.isArray(options)) {
      throw new import_js_format5.InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options
      );
    }
    if (options.pathPrefix !== void 0) {
      if (!options.pathPrefix || typeof options.pathPrefix !== "string") {
        throw new import_js_format5.InvalidArgumentError(
          'Property "pathPrefix" must be a non-empty String, but %v was given.',
          options.pathPrefix
        );
      }
    }
    if (options.tags !== void 0) {
      if (!Array.isArray(options.tags)) {
        throw new import_js_format5.InvalidArgumentError(
          'Property "tags" must be an Array, but %v was given.',
          options.tags
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== "string") {
          throw new import_js_format5.InvalidArgumentError(
            'Element "tags[%d]" must be a non-empty String, but %v was given.',
            index,
            tag
          );
        }
      });
    }
    return new _OADocumentScope(this._builder, {
      pathPrefix: joinPath(this._pathPrefix, options.pathPrefix),
      tags: [...this._tags, ...options.tags || []]
    });
  }
};

// src/json-pointer/escape-json-pointer.js
var import_js_format6 = require("@e22m4u/js-format");
function escapeJsonPointer(jsonPointer) {
  if (typeof jsonPointer !== "string") {
    throw new import_js_format6.InvalidArgumentError(
      'Parameter "jsonPointer" must be a String, but %v was given.',
      jsonPointer
    );
  }
  return jsonPointer.replace(/~/g, "~0").replace(/\//g, "~1");
}
__name(escapeJsonPointer, "escapeJsonPointer");

// src/json-pointer/resolve-json-pointer.js
var import_js_format7 = require("@e22m4u/js-format");
var ARRAY_INDEX_PATTERN = /^(0|[1-9][0-9]*)$/;
function resolveJsonPointer(document, pointer) {
  if (!document || typeof document !== "object") {
    throw new import_js_format7.InvalidArgumentError(
      'Parameter "document" must be an Object or an Array, but %v was given.',
      document
    );
  }
  if (typeof pointer !== "string") {
    throw new import_js_format7.InvalidArgumentError(
      "JSON pointer must be a String, but %v was given.",
      pointer
    );
  }
  if (pointer === "") {
    return document;
  }
  if (!pointer.startsWith("/")) {
    throw new import_js_format7.InvalidArgumentError(
      'JSON pointer must start with a forward slash "/", but %v was given.',
      pointer
    );
  }
  const pathParts = pointer.substring(1).split("/");
  let current = document;
  for (let i = 0, l = pathParts.length; i < l; i++) {
    const part = pathParts[i];
    const segment = unescapeJsonPointer(part);
    if (current && typeof current === "object" && !Array.isArray(current) && Object.hasOwn(current, segment) && current[segment] !== void 0) {
      current = current[segment];
    } else if (Array.isArray(current) && ARRAY_INDEX_PATTERN.test(segment) && current[segment] !== void 0) {
      current = current[segment];
    } else {
      const currentPointer = "/" + pathParts.slice(0, i + 1).join("/");
      throw new import_js_format7.InvalidArgumentError(
        "Unable to resolve %v in the given document.",
        currentPointer
      );
    }
  }
  return current;
}
__name(resolveJsonPointer, "resolveJsonPointer");

// src/json-pointer/unescape-json-pointer.js
var import_js_format8 = require("@e22m4u/js-format");
function unescapeJsonPointer(jsonPointer) {
  if (typeof jsonPointer !== "string") {
    throw new import_js_format8.InvalidArgumentError(
      'Parameter "jsonPointer" must be a String, but %v was given.',
      jsonPointer
    );
  }
  return jsonPointer.replace(/~1/g, "/").replace(/~0/g, "~");
}
__name(unescapeJsonPointer, "unescapeJsonPointer");

// src/data-validation/data-format-validators.js
var RX_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
var RX_DATE = /^\d{4}-\d{2}-\d{2}$/;
var RX_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:?\d{2}))$/i;
var RX_IPV4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
var RX_IPV6 = /^((([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])))$/;
var RX_HOSTNAME = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
var RX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var RX_BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
var validateInt32Format = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "number") {
    return true;
  }
  return Number.isInteger(v) && v >= -2147483648 && v <= 2147483647;
}, "validateInt32Format");
var validateInt64Format = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "number") {
    return true;
  }
  return Number.isSafeInteger(v);
}, "validateInt64Format");
var validateFloatFormat = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "number") {
    return true;
  }
  return !Number.isNaN(v) && Number.isFinite(v) && // Math.fround приводит число к 32-битному float,
  // если результат бесконечен, значит число не влазит в float
  Number.isFinite(Math.fround(v));
}, "validateFloatFormat");
var validateDoubleFormat = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "number") {
    return true;
  }
  return !Number.isNaN(v) && Number.isFinite(v);
}, "validateDoubleFormat");
var validateByteFormat = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "string") {
    return true;
  }
  return v.length % 4 === 0 && RX_BASE64.test(v);
}, "validateByteFormat");
var validateDateFormat = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "string") {
    return true;
  }
  if (!RX_DATE.test(v)) {
    return false;
  }
  const [y, m, d] = v.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}, "validateDateFormat");
var validateDateTimeFormat = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "string") {
    return true;
  }
  return RX_DATE_TIME.test(v) && !isNaN(Date.parse(v));
}, "validateDateTimeFormat");
var validateEmailFormat = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "string") {
    return true;
  }
  return RX_EMAIL.test(v);
}, "validateEmailFormat");
var validateUuidFormat = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "string") {
    return true;
  }
  return RX_UUID.test(v);
}, "validateUuidFormat");
var validateIpv4Format = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "string") {
    return true;
  }
  return RX_IPV4.test(v);
}, "validateIpv4Format");
var validateIpv6Format = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "string") {
    return true;
  }
  return RX_IPV6.test(v);
}, "validateIpv6Format");
var validateHostnameFormat = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "string") {
    return true;
  }
  return v.length <= 255 && RX_HOSTNAME.test(v);
}, "validateHostnameFormat");
var validateUriFormat = /* @__PURE__ */ __name((v) => {
  if (typeof v !== "string") {
    return true;
  }
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}, "validateUriFormat");

// src/data-validation/data-format-validator-map.js
var OA_BUILT_IN_DATA_FORMAT_VALIDATOR_MAP = {
  [OADataFormat.INT32]: validateInt32Format,
  [OADataFormat.INT64]: validateInt64Format,
  [OADataFormat.FLOAT]: validateFloatFormat,
  [OADataFormat.DOUBLE]: validateDoubleFormat,
  [OADataFormat.DATE]: validateDateFormat,
  [OADataFormat.DATE_TIME]: validateDateTimeFormat,
  [OADataFormat.BYTE]: validateByteFormat,
  [OADataFormat.EMAIL]: validateEmailFormat,
  [OADataFormat.UUID]: validateUuidFormat,
  [OADataFormat.HOSTNAME]: validateHostnameFormat,
  [OADataFormat.IPV4]: validateIpv4Format,
  [OADataFormat.IPV6]: validateIpv6Format,
  [OADataFormat.URI]: validateUriFormat
};

// src/data-validation/validate-data-with-openapi-schema.js
var import_js_format11 = require("@e22m4u/js-format");

// src/oa-reference-object/oa-ref.js
var import_js_format9 = require("@e22m4u/js-format");
function oaRef(name, segment) {
  if (!name || typeof name !== "string") {
    throw new import_js_format9.InvalidArgumentError(
      'Parameter "name" must be a non-empty String, but %v was given.',
      name
    );
  }
  const escapedName = escapeJsonPointer(name);
  return { $ref: `#/components/${segment}/${escapedName}` };
}
__name(oaRef, "oaRef");
var oaSchemaRef = /* @__PURE__ */ __name((name) => oaRef(name, "schemas"), "oaSchemaRef");
var oaResponseRef = /* @__PURE__ */ __name((name) => oaRef(name, "responses"), "oaResponseRef");
var oaParameterRef = /* @__PURE__ */ __name((name) => oaRef(name, "parameters"), "oaParameterRef");
var oaExampleRef = /* @__PURE__ */ __name((name) => oaRef(name, "examples"), "oaExampleRef");
var oaRequestBodyRef = /* @__PURE__ */ __name((name) => oaRef(name, "requestBodies"), "oaRequestBodyRef");
var oaSecuritySchemeRef = /* @__PURE__ */ __name((name) => oaRef(name, "securitySchemes"), "oaSecuritySchemeRef");
var oaLinkRef = /* @__PURE__ */ __name((name) => oaRef(name, "links"), "oaLinkRef");
var oaCallbackRef = /* @__PURE__ */ __name((name) => oaRef(name, "callbacks"), "oaCallbackRef");
var oaPathItemRef = /* @__PURE__ */ __name((name) => oaRef(name, "pathItems"), "oaPathItemRef");

// src/oa-reference-object/is-oa-reference-object.js
function isOAReferenceObject(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if (value.$ref !== void 0 || value.$dynamicRef !== void 0) {
      return true;
    }
  }
  return false;
}
__name(isOAReferenceObject, "isOAReferenceObject");

// src/oa-reference-object/resolve-oa-reference-object.js
var import_js_format10 = require("@e22m4u/js-format");
function resolveOAReferenceObject(referenceObj, options = {}) {
  if (!referenceObj || typeof referenceObj !== "object" || Array.isArray(referenceObj)) {
    throw new import_js_format10.InvalidArgumentError(
      'Parameter "referenceObj" must be an Object, but %v was given.',
      referenceObj
    );
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format10.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.rootDocument !== void 0) {
    if (!options.rootDocument || typeof options.rootDocument !== "object") {
      throw new import_js_format10.InvalidArgumentError(
        'Option "rootDocument" must be an Object or an Array, but %v was given.',
        options.rootDocument
      );
    }
  }
  if (referenceObj.$ref !== void 0) {
    if (!referenceObj.$ref || typeof referenceObj.$ref !== "string") {
      throw new import_js_format10.InvalidArgumentError(
        'Schema keyword "$ref" must be a non-empty String, but %v was given.',
        referenceObj.$ref
      );
    }
    const refUri = referenceObj.$ref;
    if (refUri.startsWith("#")) {
      if (!options.rootDocument) {
        throw new import_js_format10.InvalidArgumentError(
          'Option "rootDocument" is required to resolve the same-document reference (URI starts with "#").'
        );
      }
      if (refUri === "#") {
        return options.rootDocument;
      } else if (refUri.startsWith("#/")) {
        return resolveJsonPointer(options.rootDocument, refUri.substring(1));
      }
      throw new import_js_format10.InvalidArgumentError(
        "Anchor reference is not supported, but %v was given.",
        refUri
      );
    }
    if (refUri.startsWith("http://") || refUri.startsWith("https://")) {
      throw new import_js_format10.InvalidArgumentError(
        "External resource is not supported, but %v was given.",
        refUri
      );
    }
    throw new import_js_format10.InvalidArgumentError(
      "Relative reference is not supported, but %v was given.",
      refUri
    );
  }
  if (referenceObj.$dynamicRef) {
    throw new import_js_format10.InvalidArgumentError(
      'Schema keyword "$dynamicRef" is not supported.'
    );
  }
  throw new import_js_format10.InvalidArgumentError(
    "Reference object does not have reference properties."
  );
}
__name(resolveOAReferenceObject, "resolveOAReferenceObject");

// src/data-validation/validate-data-with-openapi-schema.js
var JSON_INTEGER_REGEXP = /^-?\d+$/;
var JSON_NUMBER_REGEXP = /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/;
var UNSUPPORTED_SCHEMA_KEYWORDS = [
  "nullable",
  // удалено в 3.1.0
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  "discriminator"
];
function validateDataWithOpenApiSchema(data, schema, options = {}) {
  if (schema === null || typeof schema !== "boolean" && typeof schema !== "object" || Array.isArray(schema)) {
    throw new import_js_format11.InvalidArgumentError(
      'Parameter "schema" must be a Boolean or an Object, but %v was given.',
      schema
    );
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format11.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.rootDocument !== void 0) {
    if (!options.rootDocument || typeof options.rootDocument !== "object" || Array.isArray(options.rootDocument)) {
      throw new import_js_format11.InvalidArgumentError(
        'Option "rootDocument" must be an Object, but %v was given.',
        options.rootDocument
      );
    }
  }
  if (options.required !== void 0) {
    if (typeof options.required !== "boolean") {
      throw new import_js_format11.InvalidArgumentError(
        'Option "required" must be a Boolean, but %v was given.',
        options.required
      );
    }
  }
  if (options.coerceTypes !== void 0) {
    if (typeof options.coerceTypes !== "boolean") {
      throw new import_js_format11.InvalidArgumentError(
        'Option "coerceTypes" must be a Boolean, but %v was given.',
        options.coerceTypes
      );
    }
  }
  if (options.applyDefaults !== void 0) {
    if (typeof options.applyDefaults !== "boolean") {
      throw new import_js_format11.InvalidArgumentError(
        'Option "applyDefaults" must be a Boolean, but %v was given.',
        options.applyDefaults
      );
    }
  }
  if (options.stripUnknown !== void 0) {
    if (typeof options.stripUnknown !== "boolean") {
      throw new import_js_format11.InvalidArgumentError(
        'Option "stripUnknown" must be a Boolean, but %v was given.',
        options.stripUnknown
      );
    }
  }
  if (options.dataSourceUri !== void 0) {
    if (!options.dataSourceUri || typeof options.dataSourceUri !== "string") {
      throw new import_js_format11.InvalidArgumentError(
        'Option "dataSourceUri" must be a non-empty String, but %v was given.',
        options.dataSourceUri
      );
    }
  }
  if (options.schemaSourceUri !== void 0) {
    if (!options.schemaSourceUri || typeof options.schemaSourceUri !== "string") {
      throw new import_js_format11.InvalidArgumentError(
        'Option "schemaSourceUri" must be a non-empty String, but %v was given.',
        options.schemaSourceUri
      );
    }
  }
  if (options.silent !== void 0) {
    if (typeof options.silent !== "boolean") {
      throw new import_js_format11.InvalidArgumentError(
        'Option "silent" must be a Boolean, but %v was given.',
        options.silent
      );
    }
  }
  if (options.accessMode !== void 0) {
    if (!ACCESS_MODE_LIST.includes(options.accessMode)) {
      throw new import_js_format11.InvalidArgumentError(
        "Access mode %v is not supported.",
        options.accessMode
      );
    }
  }
  if (options.formatValidators !== void 0) {
    if (!options.formatValidators || typeof options.formatValidators !== "object" || Array.isArray(options.formatValidators)) {
      throw new import_js_format11.InvalidArgumentError(
        'Option "formatValidators" must be an Object, but %v was given.',
        options.formatValidators
      );
    }
    Object.keys(options.formatValidators).forEach((formatName) => {
      const formatValidator = options.formatValidators[formatName];
      if (formatValidator !== void 0 && typeof formatValidator !== "function") {
        throw new import_js_format11.InvalidArgumentError(
          "Format validator %v must be a Function, but %v was given.",
          formatName,
          formatValidator
        );
      }
    });
  }
  if (options.parseJson !== void 0) {
    if (typeof options.parseJson !== "boolean") {
      throw new import_js_format11.InvalidArgumentError(
        'Option "parseJson" must be a Boolean, but %v was given.',
        options.parseJson
      );
    }
  }
  if (options.required === true && data === void 0) {
    const result2 = {
      isValid: false,
      value: data,
      valueUri: options.dataSourceUri || "",
      schemaUri: options.schemaSourceUri || "",
      reason: (0, import_js_format11.format)(
        "Value at %v is required, but %v was given.",
        options.dataSourceUri || "",
        data
      )
    };
    if (!options.silent) {
      throw new OADataValidationError(result2.reason);
    } else {
      return result2;
    }
  }
  const subResult = _validate(data, schema, {
    ...options,
    dataSourceUri: options.dataSourceUri || "",
    schemaSourceUri: options.schemaSourceUri || ""
  });
  if (!subResult.isValid && !options.silent) {
    throw new OADataValidationError(subResult.reason);
  }
  const result = {
    isValid: subResult.isValid,
    reason: subResult.reason,
    value: subResult.value,
    valueUri: subResult.valueUri,
    schemaUri: subResult.schemaUri
  };
  if (result.isValid) {
    delete result.reason;
  }
  return result;
}
__name(validateDataWithOpenApiSchema, "validateDataWithOpenApiSchema");
function _validate(data, schema, options) {
  if (schema === null || typeof schema !== "boolean" && typeof schema !== "object" || Array.isArray(schema)) {
    throw new import_js_format11.InvalidArgumentError(
      "Schema at %v must be a Boolean or an Object, but %v was given.",
      options.schemaSourceUri,
      schema
    );
  }
  if (typeof schema === "boolean") {
    if (schema === true) {
      return {
        isValid: true,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri
      };
    } else if (data !== void 0) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Value at %v is rejected by the boolean schema at %v.",
          options.dataSourceUri,
          options.schemaSourceUri
        )
      };
    }
  }
  let evaluatedIndexes = /* @__PURE__ */ new Set();
  let evaluatedProperties = /* @__PURE__ */ new Set();
  if (schema.default !== void 0 && data === void 0 && options.applyDefaults === true) {
    data = schema.default;
  }
  if (options.parseJson === true && schema.type !== void 0 && typeof data === "string") {
    data = _parseJson(data, schema.type);
  }
  if (options.coerceTypes === true && schema.type !== void 0 && data !== void 0) {
    data = _coerceType(data, schema.type);
  }
  if (schema.$ref !== void 0 || schema.$dynamicRef !== void 0) {
    const resSchema = resolveOAReferenceObject(schema, {
      rootDocument: options.rootDocument
    });
    const result = _validate(data, resSchema, {
      ...options,
      schemaSourceUri: schema.$ref || schema.$dynamicRef
    });
    if (!result.isValid) {
      return result;
    }
    data = result.value;
    if (result.evaluatedIndexes) {
      evaluatedIndexes = /* @__PURE__ */ new Set([
        ...evaluatedIndexes,
        ...result.evaluatedIndexes
      ]);
    }
    if (result.evaluatedProperties) {
      evaluatedProperties = /* @__PURE__ */ new Set([
        ...evaluatedProperties,
        ...result.evaluatedProperties
      ]);
    }
  }
  UNSUPPORTED_SCHEMA_KEYWORDS.forEach((keyword) => {
    if (schema[keyword] !== void 0) {
      throw new import_js_format11.InvalidArgumentError(
        "Schema keyword %v is not supported.",
        keyword
      );
    }
  });
  if (options.accessMode === OAAccessMode.WRITE && schema.readOnly === true && data !== void 0) {
    return {
      isValid: false,
      value: data,
      valueUri: options.dataSourceUri,
      schemaUri: options.schemaSourceUri,
      reason: (0, import_js_format11.format)(
        "Value at %v is read-only and cannot be sent in a write context.",
        options.dataSourceUri
      )
    };
  }
  if (options.accessMode === OAAccessMode.READ && schema.writeOnly === true && data !== void 0) {
    return {
      isValid: false,
      value: data,
      valueUri: options.dataSourceUri,
      schemaUri: options.schemaSourceUri,
      reason: (0, import_js_format11.format)(
        "Value at %v is write-only and cannot be present in a read context.",
        options.dataSourceUri
      )
    };
  }
  if (schema.allOf && Array.isArray(schema.allOf)) {
    for (const index in schema.allOf) {
      const subSchema = schema.allOf[index];
      const result = _validate(data, subSchema, {
        ...options,
        schemaSourceUri: options.schemaSourceUri + "/allOf/" + index
      });
      if (!result.isValid) {
        return result;
      }
      data = result.value;
      if (result.evaluatedIndexes) {
        evaluatedIndexes = /* @__PURE__ */ new Set([
          ...evaluatedIndexes,
          ...result.evaluatedIndexes
        ]);
      }
      if (result.evaluatedProperties) {
        evaluatedProperties = /* @__PURE__ */ new Set([
          ...evaluatedProperties,
          ...result.evaluatedProperties
        ]);
      }
    }
  }
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    let matches = 0;
    let matchedResultValue = data;
    let matchedEvaluatedIndexes = void 0;
    let matchedEvaluatedProperties = void 0;
    for (const index in schema.oneOf) {
      const subSchema = schema.oneOf[index];
      const result = _validate(data, subSchema, {
        ...options,
        schemaSourceUri: options.schemaSourceUri + "/oneOf/" + index
      });
      if (result.isValid) {
        matches++;
        matchedResultValue = result.value;
        matchedEvaluatedIndexes = result.evaluatedIndexes;
        matchedEvaluatedProperties = result.evaluatedProperties;
      }
    }
    if (matches !== 1) {
      const schemaUri = options.schemaSourceUri + "/oneOf";
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri,
        reason: (0, import_js_format11.format)(
          "Value at %v must match exactly one of schemas at %v, but %d matched.",
          options.dataSourceUri,
          schemaUri,
          matches
        )
      };
    }
    data = matchedResultValue;
    if (matchedEvaluatedIndexes) {
      evaluatedIndexes = /* @__PURE__ */ new Set([
        ...evaluatedIndexes,
        ...matchedEvaluatedIndexes
      ]);
    }
    if (matchedEvaluatedProperties) {
      evaluatedProperties = /* @__PURE__ */ new Set([
        ...evaluatedProperties,
        ...matchedEvaluatedProperties
      ]);
    }
  }
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    let matchFound = false;
    for (const index in schema.anyOf) {
      const subSchema = schema.anyOf[index];
      const result = _validate(data, subSchema, {
        ...options,
        schemaSourceUri: options.schemaSourceUri + "/anyOf/" + index
      });
      if (result.isValid) {
        if (!matchFound) {
          data = result.value;
        }
        if (result.evaluatedIndexes) {
          evaluatedIndexes = /* @__PURE__ */ new Set([
            ...evaluatedIndexes,
            ...result.evaluatedIndexes
          ]);
        }
        if (result.evaluatedProperties) {
          evaluatedProperties = /* @__PURE__ */ new Set([
            ...evaluatedProperties,
            ...result.evaluatedProperties
          ]);
        }
        matchFound = true;
      }
    }
    if (!matchFound) {
      const schemaUri = options.schemaSourceUri + "/anyOf";
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri,
        reason: (0, import_js_format11.format)(
          "Value at %v must match at least one of schemas at %v, but 0 matched.",
          options.dataSourceUri,
          schemaUri
        )
      };
    }
  }
  if (schema.not) {
    const { isValid } = _validate(data, schema.not, {
      ...options,
      schemaSourceUri: options.schemaSourceUri + "/not"
    });
    if (isValid) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri + "/not",
        reason: (0, import_js_format11.format)(
          'Value at %v must not match the "not" schema.',
          options.dataSourceUri
        )
      };
    }
  }
  if (schema.if) {
    const ifResult = _validate(data, schema.if, {
      ...options,
      schemaSourceUri: options.schemaSourceUri + "/if"
    });
    if (ifResult.isValid) {
      data = ifResult.value;
      if (ifResult.evaluatedIndexes) {
        evaluatedIndexes = /* @__PURE__ */ new Set([
          ...evaluatedIndexes,
          ...ifResult.evaluatedIndexes
        ]);
      }
      if (ifResult.evaluatedProperties) {
        evaluatedProperties = /* @__PURE__ */ new Set([
          ...evaluatedProperties,
          ...ifResult.evaluatedProperties
        ]);
      }
      if (schema.then) {
        const result = _validate(data, schema.then, {
          ...options,
          schemaSourceUri: options.schemaSourceUri + "/then"
        });
        if (!result.isValid) {
          return result;
        }
        data = result.value;
        if (result.evaluatedIndexes) {
          evaluatedIndexes = /* @__PURE__ */ new Set([
            ...evaluatedIndexes,
            ...result.evaluatedIndexes
          ]);
        }
        if (result.evaluatedProperties) {
          evaluatedProperties = /* @__PURE__ */ new Set([
            ...evaluatedProperties,
            ...result.evaluatedProperties
          ]);
        }
      }
    } else {
      if (schema.else) {
        const result = _validate(data, schema.else, {
          ...options,
          schemaSourceUri: options.schemaSourceUri + "/else"
        });
        if (!result.isValid) {
          return result;
        }
        data = result.value;
        if (result.evaluatedIndexes) {
          evaluatedIndexes = /* @__PURE__ */ new Set([
            ...evaluatedIndexes,
            ...result.evaluatedIndexes
          ]);
        }
        if (result.evaluatedProperties) {
          evaluatedProperties = /* @__PURE__ */ new Set([
            ...evaluatedProperties,
            ...result.evaluatedProperties
          ]);
        }
      }
    }
  }
  if (schema.type !== void 0 && data !== void 0) {
    const result = _validateType(data, schema.type, options);
    if (!result.isValid) {
      return result;
    }
  }
  if (schema.format) {
    const result = _validateFormat(
      data,
      schema.format,
      { ...OA_BUILT_IN_DATA_FORMAT_VALIDATOR_MAP, ...options.formatValidators },
      options
    );
    if (!result.isValid) {
      return result;
    }
  }
  if (schema.const !== void 0) {
    if (!_areValuesEqual(schema.const, data)) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Value at %v must be equal to constant %s, but %s was given.",
          options.dataSourceUri,
          toSpacedJson(schema.const, { truncate: 50 }),
          toSpacedJson(data, { truncate: 50 })
        )
      };
    }
  }
  if (schema.enum && Array.isArray(schema.enum)) {
    const isFoundInEnum = schema.enum.some((el) => _areValuesEqual(el, data));
    if (!isFoundInEnum) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Value at %v must be one of %s, but %s was given.",
          options.dataSourceUri,
          toSpacedJson(schema.enum, { truncate: 50 }),
          toSpacedJson(data, { truncate: 50 })
        )
      };
    }
  }
  const currentType = inferOpenApiDataType(data, true);
  if (currentType === OADataType.STRING) {
    const result = _validateString(data, schema, options);
    if (!result.isValid) {
      return result;
    }
  } else if (currentType === OADataType.NUMBER || currentType === OADataType.INTEGER) {
    const result = _validateNumber(data, schema, options);
    if (!result.isValid) {
      return result;
    }
  } else if (currentType === OADataType.ARRAY) {
    const result = _validateArray(data, schema, evaluatedIndexes, options);
    if (!result.isValid) {
      return result;
    }
    data = result.value;
    if (result.evaluatedIndexes) {
      evaluatedIndexes = /* @__PURE__ */ new Set([
        ...evaluatedIndexes,
        ...result.evaluatedIndexes
      ]);
    }
  } else if (currentType === OADataType.OBJECT) {
    const result = _validateObject(data, schema, evaluatedProperties, options);
    if (!result.isValid) {
      return result;
    }
    data = result.value;
    if (result.evaluatedProperties) {
      evaluatedProperties = /* @__PURE__ */ new Set([
        ...evaluatedProperties,
        ...result.evaluatedProperties
      ]);
    }
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri,
    evaluatedIndexes,
    evaluatedProperties
  };
}
__name(_validate, "_validate");
function _parseJson(data, expectedType) {
  if (typeof data !== "string") {
    return data;
  }
  const types = Array.isArray(expectedType) ? expectedType : [expectedType];
  const trimmedData = data.trim();
  if (types.includes(OADataType.ARRAY) && trimmedData[0] === "[" || types.includes(OADataType.OBJECT) && trimmedData[0] === "{" || types.includes(OADataType.INTEGER) && JSON_INTEGER_REGEXP.test(trimmedData) || types.includes(OADataType.NUMBER) && JSON_NUMBER_REGEXP.test(trimmedData) || types.includes(OADataType.BOOLEAN) && (trimmedData === "true" || trimmedData === "false") || types.includes(OADataType.NULL) && trimmedData === "null") {
    try {
      return JSON.parse(trimmedData);
    } catch {
      return data;
    }
  }
  return data;
}
__name(_parseJson, "_parseJson");
function _coerceType(data, expectedType) {
  const types = Array.isArray(expectedType) ? expectedType : [expectedType];
  const actualType = inferOpenApiDataType(data, true);
  if (types.includes(actualType)) {
    return data;
  }
  if (actualType === OADataType.INTEGER && types.includes(OADataType.NUMBER)) {
    return data;
  }
  for (const type of types) {
    switch (type) {
      case OADataType.STRING: {
        if (typeof data === "number" || typeof data === "boolean") {
          return String(data);
        }
        break;
      }
      case OADataType.NUMBER:
      case OADataType.INTEGER: {
        if (typeof data === "string" && data.trim() !== "") {
          const num = Number(data);
          if (!Number.isNaN(num)) {
            if (type === OADataType.INTEGER && Number.isInteger(num)) {
              return num;
            }
            if (type === OADataType.NUMBER) {
              return num;
            }
          }
        }
        break;
      }
      case OADataType.BOOLEAN: {
        if (data === "true") {
          return true;
        }
        if (data === "false") {
          return false;
        }
        break;
      }
    }
  }
  return data;
}
__name(_coerceType, "_coerceType");
function _validateType(data, expectedType, options) {
  const allowedTypes = [expectedType].flat();
  const actualType = inferOpenApiDataType(data, true);
  const isMatch = allowedTypes.some((allowedType) => {
    if (allowedType === actualType) {
      return true;
    }
    if (allowedType === OADataType.NUMBER && actualType === OADataType.INTEGER) {
      return true;
    }
    return false;
  });
  if (allowedTypes.length && !isMatch) {
    return {
      isValid: false,
      value: data,
      valueUri: options.dataSourceUri,
      schemaUri: options.schemaSourceUri,
      reason: (0, import_js_format11.format)(
        "Value at %v must be %s, but %s was given.",
        options.dataSourceUri,
        allowedTypes.map((v) => toPascalCase(v)).join(" or "),
        toPascalCase(actualType)
      )
    };
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri
  };
}
__name(_validateType, "_validateType");
function _validateFormat(data, expectedFormat, validatorsMap, options) {
  const validator = validatorsMap[expectedFormat];
  if (validator) {
    const isValid = validator(data);
    if (!isValid) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Value at %v must match format %v, but %s was given.",
          options.dataSourceUri,
          expectedFormat,
          toSpacedJson(data, { truncate: 50 })
        )
      };
    }
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri
  };
}
__name(_validateFormat, "_validateFormat");
function _areValuesEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }
  if (Array.isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!_areValuesEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }
    if (!_areValuesEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}
__name(_areValuesEqual, "_areValuesEqual");
function _validateString(data, schema, options) {
  if (typeof schema.minLength === "number") {
    const dataLength = countUnicode(data);
    if (dataLength < schema.minLength) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "String at %v must be at least %d characters long, but %d was given.",
          options.dataSourceUri,
          schema.minLength,
          dataLength
        )
      };
    }
  }
  if (typeof schema.maxLength === "number") {
    const dataLength = countUnicode(data);
    if (dataLength > schema.maxLength) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "String at %v must be at most %d characters long, but %d was given.",
          options.dataSourceUri,
          schema.maxLength,
          dataLength
        )
      };
    }
  }
  if (schema.pattern) {
    let regex;
    try {
      regex = new RegExp(schema.pattern, "u");
    } catch {
      throw new import_js_format11.InvalidArgumentError(
        "Schema pattern %v at %v has an invalid expression.",
        schema.pattern,
        options.schemaSourceUri
      );
    }
    if (!regex.test(data)) {
      const reString = schema.pattern instanceof RegExp ? String(schema.pattern) : schema.pattern;
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "String at %v must match pattern %v, but %s was given.",
          options.dataSourceUri,
          reString,
          toSpacedJson(data, { truncate: 50 })
        )
      };
    }
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri
  };
}
__name(_validateString, "_validateString");
function _validateNumber(data, schema, options) {
  if (typeof schema.minimum === "number") {
    if (data < schema.minimum) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Value at %v must be greater than or equal to %d, but %v was given.",
          options.dataSourceUri,
          schema.minimum,
          data
        )
      };
    }
  }
  if (typeof schema.maximum === "number") {
    if (data > schema.maximum) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Value at %v must be less than or equal to %d, but %v was given.",
          options.dataSourceUri,
          schema.maximum,
          data
        )
      };
    }
  }
  if (typeof schema.exclusiveMinimum === "number") {
    if (data <= schema.exclusiveMinimum) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Value at %v must be greater than %d, but %v was given.",
          options.dataSourceUri,
          schema.exclusiveMinimum,
          data
        )
      };
    }
  }
  if (typeof schema.exclusiveMaximum === "number") {
    if (data >= schema.exclusiveMaximum) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Value at %v must be less than %d, but %v was given.",
          options.dataSourceUri,
          schema.exclusiveMaximum,
          data
        )
      };
    }
  }
  if (typeof schema.multipleOf === "number") {
    if (schema.multipleOf <= 0) {
      throw new import_js_format11.InvalidArgumentError(
        'Schema keyword "multipleOf" must be a Number strictly greater than 0, but %v was given.',
        schema.multipleOf
      );
    }
    const quotient = data / schema.multipleOf;
    const isInteger = Math.abs(quotient - Math.round(quotient)) < 1e-9;
    if (!isInteger) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Value at %v must be a multiple of %v, but %v was given.",
          options.dataSourceUri,
          schema.multipleOf,
          data
        )
      };
    }
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri
  };
}
__name(_validateNumber, "_validateNumber");
function _validateArray(data, schema, evaluatedIndexes, options) {
  evaluatedIndexes = new Set(evaluatedIndexes);
  const originalData = data;
  let validationStartIndex = 0;
  if (Array.isArray(schema.prefixItems)) {
    const loopLimit = Math.min(schema.prefixItems.length, data.length);
    for (let i = 0; i < loopLimit; i++) {
      const item = data[i];
      const subSchema = schema.prefixItems[i];
      const result = _validate(item, subSchema, {
        ...options,
        dataSourceUri: `${options.dataSourceUri}/${i}`,
        schemaSourceUri: `${options.schemaSourceUri}/prefixItems/${i}`
      });
      if (!result.isValid) {
        return result;
      }
      if (item !== result.value) {
        if (data === originalData) {
          data = [...originalData];
        }
        data[i] = result.value;
      }
      evaluatedIndexes.add(i);
    }
    validationStartIndex = schema.prefixItems.length;
  }
  if (schema.items !== void 0) {
    for (let i = validationStartIndex; i < data.length; i++) {
      const item = data[i];
      const result = _validate(item, schema.items, {
        ...options,
        dataSourceUri: `${options.dataSourceUri}/${i}`,
        schemaSourceUri: `${options.schemaSourceUri}/items`
      });
      if (!result.isValid) {
        return result;
      }
      if (item !== result.value) {
        if (data === originalData) {
          data = [...originalData];
        }
        data[i] = result.value;
      }
      evaluatedIndexes.add(i);
    }
  }
  if (typeof schema.minItems === "number") {
    if (data.length < schema.minItems) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Array at %v must contain at least %d items, but %d was given.",
          options.dataSourceUri,
          schema.minItems,
          data.length
        )
      };
    }
  }
  if (typeof schema.maxItems === "number") {
    if (data.length > schema.maxItems) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Array at %v must contain at most %d items, but %d was given.",
          options.dataSourceUri,
          schema.maxItems,
          data.length
        )
      };
    }
  }
  if (schema.uniqueItems === true) {
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (_areValuesEqual(data[i], data[j])) {
          return {
            isValid: false,
            value: data,
            valueUri: options.dataSourceUri,
            schemaUri: options.schemaSourceUri,
            reason: (0, import_js_format11.format)(
              "Array at %v must contain unique items, but items at index %d and %d are identical.",
              options.dataSourceUri,
              i,
              j
            )
          };
        }
      }
    }
  }
  if (schema.contains) {
    let matches = 0;
    for (let i = 0, l = data.length; i < l; i++) {
      const item = data[i];
      const { isValid } = _validate(item, schema.contains, {
        ...options,
        silent: true,
        schemaSourceUri: options.schemaSourceUri + "/contains"
      });
      if (isValid) {
        matches++;
        evaluatedIndexes.add(i);
      }
    }
    const minContains = typeof schema.minContains === "number" ? schema.minContains : 1;
    if (matches < minContains) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri + "/contains",
        reason: (0, import_js_format11.format)(
          'Array at %v must contain at least %d item(s) matching the "contains" schema, but %d was found.',
          options.dataSourceUri,
          minContains,
          matches
        )
      };
    }
    if (typeof schema.maxContains === "number") {
      if (matches > schema.maxContains) {
        return {
          isValid: false,
          value: data,
          valueUri: options.dataSourceUri,
          schemaUri: options.schemaSourceUri + "/contains",
          reason: (0, import_js_format11.format)(
            'Array at %v must contain at most %d item(s) matching the "contains" schema, but %d was found.',
            options.dataSourceUri,
            schema.maxContains,
            matches
          )
        };
      }
    }
  }
  if (schema.unevaluatedItems !== void 0) {
    for (let i = 0, l = data.length; i < l; i++) {
      if (evaluatedIndexes.has(i)) {
        continue;
      }
      const result = _validate(data[i], schema.unevaluatedItems, {
        ...options,
        dataSourceUri: `${options.dataSourceUri}/${i}`,
        schemaSourceUri: `${options.schemaSourceUri}/unevaluatedItems`
      });
      if (!result.isValid) {
        if (schema.unevaluatedItems === false) {
          return {
            isValid: false,
            value: data[i],
            valueUri: `${options.dataSourceUri}/${i}`,
            schemaUri: `${options.schemaSourceUri}/unevaluatedItems`,
            reason: (0, import_js_format11.format)(
              "Array at %v has unevaluated item at index %d, which is not allowed.",
              options.dataSourceUri,
              i
            )
          };
        }
        return result;
      }
      if (data[i] !== result.value) {
        if (data === originalData) {
          data = [...originalData];
        }
        data[i] = result.value;
      }
      evaluatedIndexes.add(i);
    }
  }
  if (options.stripUnknown === true) {
    if (evaluatedIndexes.size > 0) {
      for (let i = 0, l = data.length; i < l; i++) {
        if (evaluatedIndexes.has(i)) {
          continue;
        }
        if (data === originalData) {
          data = [...originalData];
        }
        data.splice(i, 1);
      }
    }
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri,
    evaluatedIndexes
  };
}
__name(_validateArray, "_validateArray");
function _validateObject(data, schema, evaluatedProperties, options) {
  evaluatedProperties = new Set(evaluatedProperties);
  const originalData = data;
  if (typeof schema.maxProperties === "number") {
    const propsNumber = Object.keys(data).length;
    if (propsNumber > schema.maxProperties) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Object at %v must contain at most %d properties, but %d was given.",
          options.dataSourceUri,
          schema.maxProperties,
          propsNumber
        )
      };
    }
  }
  if (typeof schema.minProperties === "number") {
    const propsNumber = Object.keys(data).length;
    if (propsNumber < schema.minProperties) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: (0, import_js_format11.format)(
          "Object at %v must contain at least %d properties, but %d was given.",
          options.dataSourceUri,
          schema.minProperties,
          propsNumber
        )
      };
    }
  }
  if (Array.isArray(schema.required)) {
    for (const propName of schema.required) {
      if (data[propName] === void 0) {
        if (options.accessMode) {
          const propSchema = schema.properties !== null && typeof schema.properties === "object" && schema.properties[propName] !== null && typeof schema.properties[propName] === "object" && schema.properties[propName];
          if (propSchema) {
            if (options.accessMode === OAAccessMode.WRITE && propSchema.readOnly === true || options.accessMode === OAAccessMode.READ && propSchema.writeOnly === true) {
              continue;
            }
          }
        }
        const propValue = data[propName];
        return {
          isValid: false,
          value: propValue,
          valueUri: `${options.dataSourceUri}/${propName}`,
          schemaUri: options.schemaSourceUri,
          reason: (0, import_js_format11.format)(
            "Property %v at %v is required, but %v was given.",
            propName,
            options.dataSourceUri,
            propValue
          )
        };
      }
    }
  }
  if (schema.dependentRequired && typeof schema.dependentRequired === "object" && !Array.isArray(schema.dependentRequired)) {
    for (const triggerProp of Object.keys(schema.dependentRequired)) {
      const requiredProps = schema.dependentRequired[triggerProp];
      if (data[triggerProp] !== void 0) {
        if (Array.isArray(requiredProps)) {
          for (const requiredProp of requiredProps) {
            if (data[requiredProp] === void 0) {
              if (options.accessMode) {
                const requiredPropSchema = schema.properties !== null && typeof schema.properties === "object" && schema.properties[requiredProp] !== null && typeof schema.properties[requiredProp] === "object" && schema.properties[requiredProp];
                if (requiredPropSchema) {
                  if (options.accessMode === OAAccessMode.WRITE && requiredPropSchema.readOnly === true || options.accessMode === OAAccessMode.READ && requiredPropSchema.writeOnly === true) {
                    continue;
                  }
                }
              }
              return {
                isValid: false,
                value: data[requiredProp],
                valueUri: `${options.dataSourceUri}/${requiredProp}`,
                schemaUri: options.schemaSourceUri,
                reason: (0, import_js_format11.format)(
                  "Property %v at %v is required because the property %v is present.",
                  requiredProp,
                  options.dataSourceUri,
                  triggerProp
                )
              };
            }
          }
        }
      }
    }
  }
  if (schema.dependentSchemas && typeof schema.dependentSchemas === "object" && !Array.isArray(schema.dependentSchemas)) {
    for (const triggerProp of Object.keys(schema.dependentSchemas)) {
      const subSchema = schema.dependentSchemas[triggerProp];
      if (data[triggerProp] !== void 0) {
        const result = _validate(data, subSchema, {
          ...options,
          schemaSourceUri: `${options.schemaSourceUri}/dependentSchemas/${triggerProp}`
        });
        if (!result.isValid) {
          return result;
        }
        data = result.value;
        if (result.evaluatedProperties) {
          evaluatedProperties = /* @__PURE__ */ new Set([
            ...evaluatedProperties,
            ...result.evaluatedProperties
          ]);
        }
      }
    }
  }
  if (schema.propertyNames && typeof schema.propertyNames === "object" && !Array.isArray(schema.propertyNames)) {
    for (const propName of Object.keys(data)) {
      const result = _validate(propName, schema.propertyNames, {
        ...options,
        dataSourceUri: `${options.dataSourceUri}`,
        schemaSourceUri: `${options.schemaSourceUri}/propertyNames`
      });
      if (!result.isValid) {
        return result;
      }
    }
  }
  if (schema.properties && typeof schema.properties === "object") {
    for (const propName of Object.keys(schema.properties)) {
      const propSchema = schema.properties[propName];
      const isPropValuePresent = data[propName] !== void 0;
      const shouldApplyDefault = options.applyDefaults === true && propSchema !== null && typeof propSchema === "object" && propSchema.default !== void 0;
      if (isPropValuePresent || shouldApplyDefault) {
        const propValue = data[propName];
        const result = _validate(propValue, propSchema, {
          ...options,
          dataSourceUri: `${options.dataSourceUri}/${propName}`,
          schemaSourceUri: `${options.schemaSourceUri}/properties/${propName}`
        });
        if (!result.isValid) {
          return result;
        }
        if (data[propName] !== result.value) {
          if (data === originalData) {
            data = { ...originalData };
          }
          data[propName] = result.value;
        }
        evaluatedProperties.add(propName);
      }
    }
  }
  const passedPatternProperties = [];
  if (schema.patternProperties && typeof schema.patternProperties === "object") {
    for (const pattern of Object.keys(schema.patternProperties)) {
      const patternSchema = schema.patternProperties[pattern];
      let regex;
      try {
        regex = new RegExp(pattern, "u");
      } catch {
        throw new import_js_format11.InvalidArgumentError(
          "Property pattern %v at %v has an invalid expression.",
          pattern,
          options.schemaSourceUri
        );
      }
      for (const propName of Object.keys(data)) {
        if (regex.test(propName)) {
          const propValue = data[propName];
          const result = _validate(propValue, patternSchema, {
            ...options,
            dataSourceUri: `${options.dataSourceUri}/${propName}`,
            schemaSourceUri: `${options.schemaSourceUri}/patternProperties/${pattern}`
          });
          if (!result.isValid) {
            return result;
          }
          if (data[propName] !== result.value) {
            if (data === originalData) {
              data = { ...originalData };
            }
            data[propName] = result.value;
          }
          evaluatedProperties.add(propName);
          passedPatternProperties.push(propName);
        }
      }
    }
  }
  if (schema.additionalProperties !== void 0) {
    const definedProps = schema.properties ? Object.keys(schema.properties) : [];
    for (const propName of Object.keys(data)) {
      if (definedProps.includes(propName)) {
        continue;
      }
      if (passedPatternProperties.includes(propName)) {
        continue;
      }
      if (schema.additionalProperties === false) {
        return {
          isValid: false,
          value: data[propName],
          valueUri: `${options.dataSourceUri}/${propName}`,
          schemaUri: `${options.schemaSourceUri}/additionalProperties`,
          reason: (0, import_js_format11.format)(
            "Property %v at %v is not allowed.",
            propName,
            options.dataSourceUri
          )
        };
      }
      if (schema.additionalProperties !== null && typeof schema.additionalProperties === "object" && !Array.isArray(schema.additionalProperties)) {
        const propValue = data[propName];
        const result = _validate(propValue, schema.additionalProperties, {
          ...options,
          dataSourceUri: `${options.dataSourceUri}/${propName}`,
          schemaSourceUri: `${options.schemaSourceUri}/additionalProperties`
        });
        if (!result.isValid) {
          return result;
        }
        if (data[propName] !== result.value) {
          if (data === originalData) {
            data = { ...originalData };
          }
          data[propName] = result.value;
        }
      }
      evaluatedProperties.add(propName);
    }
  }
  if (schema.unevaluatedProperties !== void 0) {
    for (const propName of Object.keys(data)) {
      if (evaluatedProperties.has(propName)) {
        continue;
      }
      if (schema.unevaluatedProperties === false) {
        return {
          isValid: false,
          value: data[propName],
          valueUri: `${options.dataSourceUri}/${propName}`,
          schemaUri: `${options.schemaSourceUri}/unevaluatedProperties`,
          reason: (0, import_js_format11.format)(
            "Property %v at %v is not evaluated and not allowed.",
            propName,
            options.dataSourceUri
          )
        };
      } else if (schema.unevaluatedProperties && typeof schema.unevaluatedProperties === "object" && !Array.isArray(schema.unevaluatedProperties)) {
        const propValue = data[propName];
        const result = _validate(propValue, schema.unevaluatedProperties, {
          ...options,
          dataSourceUri: `${options.dataSourceUri}/${propName}`,
          schemaSourceUri: `${options.schemaSourceUri}/unevaluatedProperties`
        });
        if (!result.isValid) {
          return result;
        }
        if (data[propName] !== result.value) {
          if (data === originalData) {
            data = { ...originalData };
          }
          data[propName] = result.value;
        }
        evaluatedProperties.add(propName);
      }
    }
  }
  if (options.stripUnknown === true) {
    if (evaluatedProperties.size > 0) {
      for (const propName of Object.keys(data)) {
        if (evaluatedProperties.has(propName)) {
          continue;
        }
        if (data === originalData) {
          data = { ...originalData };
        }
        delete data[propName];
      }
    }
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri,
    evaluatedProperties
  };
}
__name(_validateObject, "_validateObject");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACCESS_MODE_LIST,
  JSON_INTEGER_REGEXP,
  JSON_NUMBER_REGEXP,
  OAAccessMode,
  OAApiKeyLocation,
  OAComponentType,
  OADataFormat,
  OADataType,
  OADataValidationError,
  OADocumentBuilder,
  OADocumentScope,
  OAMediaType,
  OAOperationMethod,
  OAParameterLocation,
  OAParameterStyle,
  OASecuritySchemeType,
  OA_BUILT_IN_DATA_FORMAT_VALIDATOR_MAP,
  OA_COMPONENT_TYPES,
  OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP,
  OA_DATA_TYPE_LIST,
  OPENAPI_VERSION,
  escapeJsonPointer,
  inferOpenApiDataType,
  isOAReferenceObject,
  oaCallbackRef,
  oaExampleRef,
  oaLinkRef,
  oaParameterRef,
  oaPathItemRef,
  oaRequestBodyRef,
  oaResponseRef,
  oaSchemaRef,
  oaSecuritySchemeRef,
  resolveJsonPointer,
  resolveOAReferenceObject,
  unescapeJsonPointer,
  validateByteFormat,
  validateDataWithOpenApiSchema,
  validateDateFormat,
  validateDateTimeFormat,
  validateDoubleFormat,
  validateEmailFormat,
  validateFloatFormat,
  validateHostnameFormat,
  validateInt32Format,
  validateInt64Format,
  validateIpv4Format,
  validateIpv6Format,
  validateShallowOADocument,
  validateUriFormat,
  validateUuidFormat
});
