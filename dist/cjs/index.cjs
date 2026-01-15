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
  OAApiKeyLocation: () => OAApiKeyLocation,
  OAComponentsSegment: () => OAComponentsSegment,
  OADataFormat: () => OADataFormat,
  OADataType: () => OADataType,
  OADocumentBuilder: () => OADocumentBuilder,
  OADocumentScope: () => OADocumentScope,
  OAMediaType: () => OAMediaType,
  OAOperationMethod: () => OAOperationMethod,
  OAParameterLocation: () => OAParameterLocation,
  OAParameterStyle: () => OAParameterStyle,
  OASecuritySchemeType: () => OASecuritySchemeType,
  OPENAPI_VERSION: () => OPENAPI_VERSION,
  oaCallbackRef: () => oaCallbackRef,
  oaExampleRef: () => oaExampleRef,
  oaLinkRef: () => oaLinkRef,
  oaParameterRef: () => oaParameterRef,
  oaPathItemRef: () => oaPathItemRef,
  oaRef: () => oaRef,
  oaRequestBodyRef: () => oaRequestBodyRef,
  oaResponseRef: () => oaResponseRef,
  oaSchemaRef: () => oaSchemaRef,
  oaSecuritySchemeRef: () => oaSecuritySchemeRef
});
module.exports = __toCommonJS(index_exports);

// src/constants.js
var OPENAPI_VERSION = "3.1.0";
var OAComponentsSegment = {
  SCHEMAS: "schemas",
  RESPONSES: "responses",
  PARAMETERS: "parameters",
  EXAMPLES: "examples",
  REQUEST_BODIES: "requestBodies",
  HEADERS: "headers",
  SECURITY_SCHEMES: "securitySchemes",
  LINKS: "links",
  CALLBACKS: "callbacks",
  PATH_ITEMS: "pathItems"
};

// src/oa-document-scope.js
var import_js_format4 = require("@e22m4u/js-format");

// src/utils/oa-ref.js
var import_js_format = require("@e22m4u/js-format");
function oaRef(name, segment) {
  if (!name || typeof name !== "string") {
    throw new import_js_format.InvalidArgumentError(
      'Parameter "name" must be a non-empty String, but %v was given.',
      name
    );
  }
  if (!Object.values(OAComponentsSegment).includes(segment)) {
    throw new import_js_format.InvalidArgumentError(
      'Parameter "segment" must be one of values: %l, but %v was given.',
      Object.values(OAComponentsSegment),
      segment
    );
  }
  return { $ref: `#/components/${segment}/${name}` };
}
__name(oaRef, "oaRef");
var oaSchemaRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentsSegment.SCHEMAS), "oaSchemaRef");
var oaResponseRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentsSegment.RESPONSES), "oaResponseRef");
var oaParameterRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentsSegment.PARAMETERS), "oaParameterRef");
var oaExampleRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentsSegment.EXAMPLES), "oaExampleRef");
var oaRequestBodyRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentsSegment.REQUEST_BODIES), "oaRequestBodyRef");
var oaSecuritySchemeRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentsSegment.SECURITY_SCHEMES), "oaSecuritySchemeRef");
var oaLinkRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentsSegment.LINKS), "oaLinkRef");
var oaCallbackRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentsSegment.CALLBACKS), "oaCallbackRef");
var oaPathItemRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentsSegment.PATH_ITEMS), "oaPathItemRef");

// src/utils/join-path.js
function joinPath(...segments) {
  const path = segments.filter((seg) => seg != void 0).map((seg) => String(seg).replace(/(^\/+|\/+$)/g, "")).filter(Boolean).join("/");
  return ("/" + path).replace(/\/+/g, "/");
}
__name(joinPath, "joinPath");

// src/utils/normalize-path.js
function normalizePath(value, noStartingSlash = false) {
  if (typeof value !== "string") {
    return "/";
  }
  const res = value.trim().replace(/\/+/g, "/").replace(/(^\/|\/$)/g, "");
  return noStartingSlash ? res : "/" + res;
}
__name(normalizePath, "normalizePath");

// src/oa-document-builder.js
var import_js_format3 = require("@e22m4u/js-format");

// src/document-specification.js
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
var OADataFormat = {
  INT32: "int32",
  INT64: "int64",
  FLOAT: "float",
  DOUBLE: "double",
  PASSWORD: "password",
  BINARY: "binary"
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

// src/oa-document-builder.js
var import_js_service = require("@e22m4u/js-service");

// src/document-validators.js
var import_js_format2 = require("@e22m4u/js-format");
function validateShallowOADocumentObject(documentObject) {
  if (!documentObject || typeof documentObject !== "object" || Array.isArray(documentObject)) {
    throw new import_js_format2.InvalidArgumentError(
      "OpenAPI Document Object must be an Object, but %v was given.",
      documentObject
    );
  }
  if (!documentObject.openapi || typeof documentObject.openapi !== "string") {
    throw new import_js_format2.InvalidArgumentError(
      'Property "openapi" must be a non-empty String, but %v was given.',
      documentObject.openapi
    );
  }
  if (!documentObject.info || typeof documentObject.info !== "object" || Array.isArray(documentObject.info)) {
    throw new import_js_format2.InvalidArgumentError(
      'Property "info" must be an Object, but %v was given.',
      documentObject.info
    );
  }
  if (!documentObject.info.title || typeof documentObject.info.title !== "string") {
    throw new import_js_format2.InvalidArgumentError(
      'Property "info.title" must be a non-empty String, but %v was given.',
      documentObject.info.title
    );
  }
  if (!documentObject.info.version || typeof documentObject.info.version !== "string") {
    throw new import_js_format2.InvalidArgumentError(
      'Property "info.version" must be a non-empty String, but %v was given.',
      documentObject.info.version
    );
  }
  if (documentObject.jsonSchemaDialect !== void 0) {
    if (!documentObject.jsonSchemaDialect || typeof documentObject.jsonSchemaDialect !== "string") {
      throw new import_js_format2.InvalidArgumentError(
        'Property "jsonSchemaDialect" must be a non-empty String, but %v was given.',
        documentObject.jsonSchemaDialect
      );
    }
  }
  if (documentObject.servers !== void 0) {
    if (!Array.isArray(documentObject.servers)) {
      throw new import_js_format2.InvalidArgumentError(
        'Property "servers" must be an Array, but %v was given.',
        documentObject.servers
      );
    }
    documentObject.servers.forEach((serverObject, index) => {
      if (!serverObject || typeof serverObject !== "object" || Array.isArray(serverObject)) {
        throw new import_js_format2.InvalidArgumentError(
          'Element "servers[%d]" must be an Object, but %v was given.',
          index,
          serverObject
        );
      }
    });
  }
  if (documentObject.paths !== void 0) {
    if (!documentObject.paths || typeof documentObject.paths !== "object" || Array.isArray(documentObject.paths)) {
      throw new import_js_format2.InvalidArgumentError(
        'Property "paths" must be an Object, but %v was given.',
        documentObject.paths
      );
    }
  }
  if (documentObject.webhooks !== void 0) {
    if (!documentObject.webhooks || typeof documentObject.webhooks !== "object" || Array.isArray(documentObject.webhooks)) {
      throw new import_js_format2.InvalidArgumentError(
        'Property "webhooks" must be an Object, but %v was given.',
        documentObject.webhooks
      );
    }
  }
  if (documentObject.components !== void 0) {
    if (!documentObject.components || typeof documentObject.components !== "object" || Array.isArray(documentObject.components)) {
      throw new import_js_format2.InvalidArgumentError(
        'Property "components" must be an Object, but %v was given.',
        documentObject.components
      );
    }
  }
  if (documentObject.security !== void 0) {
    if (!Array.isArray(documentObject.security)) {
      throw new import_js_format2.InvalidArgumentError(
        'Property "security" must be an Array, but %v was given.',
        documentObject.security
      );
    }
    documentObject.security.forEach((securityRequirementObject, index) => {
      if (!securityRequirementObject || typeof securityRequirementObject !== "object" || Array.isArray(securityRequirementObject)) {
        throw new import_js_format2.InvalidArgumentError(
          'Element "security[%d]" must be an Object, but %v was given.',
          index,
          securityRequirementObject
        );
      }
    });
  }
  if (documentObject.tags !== void 0) {
    if (!Array.isArray(documentObject.tags)) {
      throw new import_js_format2.InvalidArgumentError(
        'Property "tags" must be an Array, but %v was given.',
        documentObject.tags
      );
    }
    documentObject.tags.forEach((tagObject, index) => {
      if (!tagObject || typeof tagObject !== "object" || Array.isArray(tagObject)) {
        throw new import_js_format2.InvalidArgumentError(
          'Element "tags[%d]" must be an Object, but %v was given.',
          index,
          tagObject
        );
      }
    });
  }
  if (documentObject.externalDocs !== void 0) {
    if (!documentObject.externalDocs || typeof documentObject.externalDocs !== "object" || Array.isArray(documentObject.externalDocs)) {
      throw new import_js_format2.InvalidArgumentError(
        'Property "externalDocs" must be an Object, but %v was given.',
        documentObject.externalDocs
      );
    }
  }
}
__name(validateShallowOADocumentObject, "validateShallowOADocumentObject");

// src/oa-document-builder.js
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
        throw new import_js_format3.InvalidArgumentError(
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
        throw new import_js_format3.InvalidArgumentError(
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
      validateShallowOADocumentObject(document);
      this._document = document;
    }
  }
  /**
   * Define component.
   *
   * @param {string} segmentName
   * @param {string} propertyName
   * @param {object} definition
   * @returns {this}
   */
  _defineComponent(segmentName, propertyName, definition) {
    if (!Object.values(OAComponentsSegment).includes(segmentName)) {
      throw new import_js_format3.InvalidArgumentError(
        'Property "segmentName" must be one of values: %l, but %v was given.',
        Object.values(OAComponentsSegment),
        segmentName
      );
    }
    if (!propertyName || typeof propertyName !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Property "propertyName" must be a non-empty String, but %v was given.',
        propertyName
      );
    }
    if (!definition || typeof definition !== "object" || Array.isArray(definition)) {
      throw new import_js_format3.InvalidArgumentError(
        "Component definition must be an Object, but %v was given.",
        definition
      );
    }
    if (!definition.name || typeof definition.name !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Property "name" must be a non-empty String, but %v was given.',
        definition.name
      );
    }
    const component = definition[propertyName];
    if (!component || typeof component !== "object" || Array.isArray(component)) {
      throw new import_js_format3.InvalidArgumentError(
        "Property %v must be an Object, but %v was given.",
        propertyName,
        component
      );
    }
    if (!this._document.components) {
      this._document.components = {};
    }
    if (!this._document.components[segmentName]) {
      this._document.components[segmentName] = {};
    }
    this._document.components[segmentName][definition.name] = structuredClone(component);
    return this;
  }
  /**
   * Define schema component.
   *
   * @param {object} schemaDef
   * @returns {this}
   */
  defineSchemaComponent(schemaDef) {
    return this._defineComponent(
      OAComponentsSegment.SCHEMAS,
      "schema",
      schemaDef
    );
  }
  /**
   * Define response component.
   *
   * @param {object} responseDef
   * @returns {this}
   */
  defineResponseComponent(responseDef) {
    return this._defineComponent(
      OAComponentsSegment.RESPONSES,
      "response",
      responseDef
    );
  }
  /**
   * Define parameter component.
   *
   * @param {object} parameterDef
   * @returns {this}
   */
  defineParameterComponent(parameterDef) {
    return this._defineComponent(
      OAComponentsSegment.PARAMETERS,
      "parameter",
      parameterDef
    );
  }
  /**
   * Define example component.
   *
   * @param {object} exampleDef
   * @returns {this}
   */
  defineExampleComponent(exampleDef) {
    return this._defineComponent(
      OAComponentsSegment.EXAMPLES,
      "example",
      exampleDef
    );
  }
  /**
   * Define request body component.
   *
   * @param {object} requestBodyDef
   * @returns {this}
   */
  defineRequestBodyComponent(requestBodyDef) {
    return this._defineComponent(
      OAComponentsSegment.REQUEST_BODIES,
      "requestBody",
      requestBodyDef
    );
  }
  /**
   * Define header component.
   *
   * @param {object} headerDef
   * @returns {this}
   */
  defineHeaderComponent(headerDef) {
    return this._defineComponent(
      OAComponentsSegment.HEADERS,
      "header",
      headerDef
    );
  }
  /**
   * Define security scheme component.
   *
   * @param {object} securitySchemeDef
   * @returns {this}
   */
  defineSecuritySchemeComponent(securitySchemeDef) {
    return this._defineComponent(
      OAComponentsSegment.SECURITY_SCHEMES,
      "securityScheme",
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
    return this._defineComponent(
      OAComponentsSegment.LINKS,
      "link",
      linkDef
    );
  }
  /**
   * Define callback component.
   *
   * @param {object} callbackDef
   * @returns {this}
   */
  defineCallbackComponent(callbackDef) {
    return this._defineComponent(
      OAComponentsSegment.CALLBACKS,
      "callback",
      callbackDef
    );
  }
  /**
   * Define path item component.
   *
   * @param {object} pathItemDef
   * @returns {this}
   */
  definePathItemComponent(pathItemDef) {
    return this._defineComponent(
      OAComponentsSegment.PATH_ITEMS,
      "pathItem",
      pathItemDef
    );
  }
  /**
   * Define operation.
   *
   * @param {object} operationDef
   */
  defineOperation(operationDef) {
    if (!operationDef || typeof operationDef !== "object" || Array.isArray(operationDef)) {
      throw new import_js_format3.InvalidArgumentError(
        "Operation Definition must be an Object, but %v was given.",
        operationDef
      );
    }
    if (!operationDef.path || typeof operationDef.path !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Property "path" must be a non-empty String, but %v was given.',
        operationDef.path
      );
    }
    if (!operationDef.method || typeof operationDef.method !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Property "method" must be a non-empty String, but %v was given.',
        operationDef.method
      );
    }
    if (!Object.values(OAOperationMethod).includes(operationDef.method)) {
      throw new import_js_format3.InvalidArgumentError(
        'Property "method" must be one of values: %l, but %v was given.',
        Object.values(OAOperationMethod)
      );
    }
    if (!operationDef.operation || typeof operationDef.operation !== "object" || Array.isArray(operationDef.operation)) {
      throw new import_js_format3.InvalidArgumentError(
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
    return JSON.stringify(this._document, null, space);
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
      throw new import_js_format4.InvalidArgumentError(
        'Parameter "builder" must be an instance of OADocumentBuilder, but %v was given.',
        builder
      );
    }
    if (!options || typeof options !== "object" || Array.isArray(options)) {
      throw new import_js_format4.InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options
      );
    }
    if (options.pathPrefix !== void 0) {
      if (!options.pathPrefix || typeof options.pathPrefix !== "string") {
        throw new import_js_format4.InvalidArgumentError(
          'Property "pathPrefix" must be a non-empty String, but %v was given.',
          options.pathPrefix
        );
      }
    }
    if (options.tags !== void 0) {
      if (!Array.isArray(options.tags)) {
        throw new import_js_format4.InvalidArgumentError(
          'Property "tags" must be an Array, but %v was given.',
          options.tags
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== "string") {
          throw new import_js_format4.InvalidArgumentError(
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
      throw new import_js_format4.InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options
      );
    }
    if (options.pathPrefix !== void 0) {
      if (!options.pathPrefix || typeof options.pathPrefix !== "string") {
        throw new import_js_format4.InvalidArgumentError(
          'Property "pathPrefix" must be a non-empty String, but %v was given.',
          options.pathPrefix
        );
      }
    }
    if (options.tags !== void 0) {
      if (!Array.isArray(options.tags)) {
        throw new import_js_format4.InvalidArgumentError(
          'Property "tags" must be an Array, but %v was given.',
          options.tags
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== "string") {
          throw new import_js_format4.InvalidArgumentError(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OAApiKeyLocation,
  OAComponentsSegment,
  OADataFormat,
  OADataType,
  OADocumentBuilder,
  OADocumentScope,
  OAMediaType,
  OAOperationMethod,
  OAParameterLocation,
  OAParameterStyle,
  OASecuritySchemeType,
  OPENAPI_VERSION,
  oaCallbackRef,
  oaExampleRef,
  oaLinkRef,
  oaParameterRef,
  oaPathItemRef,
  oaRef,
  oaRequestBodyRef,
  oaResponseRef,
  oaSchemaRef,
  oaSecuritySchemeRef
});
