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
  OAComponentType: () => OAComponentType,
  OADataFormat: () => OADataFormat,
  OADataType: () => OADataType,
  OADocumentBuilder: () => OADocumentBuilder,
  OADocumentScope: () => OADocumentScope,
  OAMediaType: () => OAMediaType,
  OAOperationMethod: () => OAOperationMethod,
  OAParameterLocation: () => OAParameterLocation,
  OAParameterStyle: () => OAParameterStyle,
  OASecuritySchemeType: () => OASecuritySchemeType,
  OA_COMPONENT_TYPE_TO_KEY_MAP: () => OA_COMPONENT_TYPE_TO_KEY_MAP,
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

// src/utils/oa-ref.js
var import_js_format = require("@e22m4u/js-format");
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
var OA_COMPONENT_TYPE_TO_KEY_MAP = {
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
function oaRef(name, type) {
  if (!name || typeof name !== "string") {
    throw new import_js_format.InvalidArgumentError(
      'Parameter "name" must be a non-empty String, but %v was given.',
      name
    );
  }
  if (!type || typeof type !== "string") {
    throw new import_js_format.InvalidArgumentError(
      'Parameter "type" must be a non-empty String, but %v was given.',
      type
    );
  }
  const key = OA_COMPONENT_TYPE_TO_KEY_MAP[type];
  if (!key) {
    throw new import_js_format.InvalidArgumentError("Component type %v is not supported.", type);
  }
  return { $ref: `#/components/${key}/${name}` };
}
__name(oaRef, "oaRef");
var oaSchemaRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentType.SCHEMA), "oaSchemaRef");
var oaResponseRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentType.RESPONSE), "oaResponseRef");
var oaParameterRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentType.PARAMETER), "oaParameterRef");
var oaExampleRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentType.EXAMPLE), "oaExampleRef");
var oaRequestBodyRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentType.REQUEST_BODY), "oaRequestBodyRef");
var oaSecuritySchemeRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentType.SECURITY_SCHEME), "oaSecuritySchemeRef");
var oaLinkRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentType.LINK), "oaLinkRef");
var oaCallbackRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentType.CALLBACK), "oaCallbackRef");
var oaPathItemRef = /* @__PURE__ */ __name((name) => oaRef(name, OAComponentType.PATH_ITEM), "oaPathItemRef");

// src/utils/join-path.js
function joinPath(...segments) {
  const path = segments.filter(Boolean).map((seg) => seg.replace(/(^\/|\/$)/g, "")).filter(Boolean).join("/");
  return "/" + path;
}
__name(joinPath, "joinPath");

// src/oa-document-scope.js
var import_js_format4 = require("@e22m4u/js-format");

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
var _OADocumentBuilder = class _OADocumentBuilder extends import_js_service.Service {
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
   * @param {string} targetKey
   * @param {string} componentKey
   * @param {string} definitionLabel
   * @param {object} definition
   * @returns {this}
   */
  _defineComponent(targetKey, componentKey, definitionLabel, definition) {
    if (!targetKey || typeof targetKey !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Property "targetKey" must be a non-empty String, but %v was given.',
        targetKey
      );
    }
    if (!componentKey || typeof componentKey !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Property "componentKey" must be a non-empty String, but %v was given.',
        componentKey
      );
    }
    if (!definitionLabel || typeof definitionLabel !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Property "definitionLabel" must be a non-empty String, but %v was given.',
        definitionLabel
      );
    }
    if (!definition || typeof definition !== "object" || Array.isArray(definition)) {
      throw new import_js_format3.InvalidArgumentError(
        "%s Definition must be an Object, but %v was given.",
        definitionLabel,
        definition
      );
    }
    if (!definition.name || typeof definition.name !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Property "name" must be a non-empty String, but %v was given.',
        definition.name
      );
    }
    const component = definition[componentKey];
    if (!component || typeof component !== "object" || Array.isArray(component)) {
      throw new import_js_format3.InvalidArgumentError(
        "Property %v must be an Object, but %v was given.",
        componentKey,
        component
      );
    }
    if (!this._document.components) {
      this._document.components = {};
    }
    if (!this._document.components[targetKey]) {
      this._document.components[targetKey] = {};
    }
    this._document.components[targetKey][definition.name] = component;
    return this;
  }
  /**
   * Define schema component.
   *
   * @param {import('./oa-document-builder.js').OASchemaComponentDefinition} schemaDef
   * @returns {this}
   */
  defineSchemaComponent(schemaDef) {
    return this._defineComponent("schemas", "schema", "Schema", schemaDef);
  }
  /**
   * Define response component.
   *
   * @param {import('./oa-document-builder.js').OAResponseComponentDefinition} responseDef
   * @returns {this}
   */
  defineResponseComponent(responseDef) {
    return this._defineComponent(
      "responses",
      "response",
      "Response",
      responseDef
    );
  }
  /**
   * Define parameter component.
   *
   * @param {import('./oa-document-builder.js').OAParameterComponentDefinition} parameterDef
   * @returns {this}
   */
  defineParameterComponent(parameterDef) {
    return this._defineComponent(
      "parameters",
      "parameter",
      "Parameter",
      parameterDef
    );
  }
  /**
   * Define example component.
   *
   * @param {import('./oa-document-builder.js').OAExampleComponentDefinition} exampleDef
   * @returns {this}
   */
  defineExampleComponent(exampleDef) {
    return this._defineComponent("examples", "example", "Example", exampleDef);
  }
  /**
   * Define request body component.
   *
   * @param {import('./oa-document-builder.js').OARequestBodyComponentDefinition} requestBodyDef
   * @returns {this}
   */
  defineRequestBodyComponent(requestBodyDef) {
    return this._defineComponent(
      "requestBodies",
      "requestBody",
      "Request body",
      requestBodyDef
    );
  }
  /**
   * Define header component.
   *
   * @param {import('./oa-document-builder.js').OAHeaderComponentDefinition} headerDef
   * @returns {this}
   */
  defineHeaderComponent(headerDef) {
    return this._defineComponent("headers", "header", "Header", headerDef);
  }
  /**
   * Define security scheme component.
   *
   * @param {import('./oa-document-builder.js').OASecuritySchemeComponentDefinition} securitySchemeDef
   * @returns {this}
   */
  defineSecuritySchemeComponent(securitySchemeDef) {
    return this._defineComponent(
      "securitySchemes",
      "securityScheme",
      "Security Scheme",
      securitySchemeDef
    );
  }
  /**
   * Define link component.
   *
   * @param {import('./oa-document-builder.js').OALinkComponentDefinition} linkDef
   * @returns {this}
   */
  defineLinkComponent(linkDef) {
    return this._defineComponent("links", "link", "Link", linkDef);
  }
  /**
   * Define callback component.
   *
   * @param {import('./oa-document-builder.js').OACallbackComponentDefinition} callbackDef
   * @returns {this}
   */
  defineCallbackComponent(callbackDef) {
    return this._defineComponent(
      "callbacks",
      "callback",
      "Callback",
      callbackDef
    );
  }
  /**
   * Define path item component.
   *
   * @param {import('./oa-document-builder.js').OAPathItemComponentDefinition} pathItemDef
   * @returns {this}
   */
  definePathItemComponent(pathItemDef) {
    return this._defineComponent(
      "pathItems",
      "pathItem",
      "Path Item",
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
    if (operationDef.path[0] !== "/") {
      throw new import_js_format3.InvalidArgumentError(
        'Property "path" must start with forward slash "/", but %v was given.',
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
    if (!this._document.paths) {
      this._document.paths = {};
    }
    if (!this._document.paths[operationDef.path]) {
      this._document.paths[operationDef.path] = {};
    }
    this._document.paths[operationDef.path][operationDef.method] = structuredClone(operationDef.operation);
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
};
__name(_OADocumentBuilder, "OADocumentBuilder");
var OADocumentBuilder = _OADocumentBuilder;

// src/oa-document-scope.js
var _OADocumentScope = class _OADocumentScope {
  /**
   * @param {object} rootBuilder
   * @param {object} [options]
   */
  constructor(rootBuilder, options = {}) {
    if (!(rootBuilder instanceof OADocumentBuilder)) {
      throw new import_js_format4.InvalidArgumentError(
        'Parameter "rootBuilder" must be an instance of OADocumentBuilder, but %v was given.',
        rootBuilder
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
          'Parameter "pathPrefix" must be a non-empty String, but %v was given.',
          options.pathPrefix
        );
      }
    }
    if (options.tags !== void 0) {
      if (!Array.isArray(options.tags)) {
        throw new import_js_format4.InvalidArgumentError(
          'Parameter "tags" must be an Array, but %v was given.',
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
    this.rootBuilder = rootBuilder;
    this.pathPrefix = options.pathPrefix || "/";
    this.tags = options.tags || [];
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
    if (operationDef.path[0] !== "/") {
      throw new import_js_format4.InvalidArgumentError(
        'Property "path" must start with forward slash "/", but %v was given.',
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
    const fullPath = joinPath(this.pathPrefix, operationDef.path);
    const operation = structuredClone(operationDef.operation);
    if (this.tags.length > 0) {
      operation.tags = [...this.tags, ...operation.tags || []];
      operation.tags = [...new Set(operation.tags)];
    }
    this.rootBuilder.defineOperation({
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
          'Parameter "pathPrefix" must be a non-empty String, but %v was given.',
          options.pathPrefix
        );
      }
    }
    if (options.tags !== void 0) {
      if (!Array.isArray(options.tags)) {
        throw new import_js_format4.InvalidArgumentError(
          'Parameter "tags" must be an Array, but %v was given.',
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
    return new _OADocumentScope(this.rootBuilder, {
      pathPrefix: joinPath(this.pathPrefix, options.pathPrefix),
      tags: [...this.tags, ...options.tags || []]
    });
  }
  /**
   * Build.
   *
   * @returns {object}
   */
  build() {
    return this.rootBuilder.build();
  }
};
__name(_OADocumentScope, "OADocumentScope");
var OADocumentScope = _OADocumentScope;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OAApiKeyLocation,
  OAComponentType,
  OADataFormat,
  OADataType,
  OADocumentBuilder,
  OADocumentScope,
  OAMediaType,
  OAOperationMethod,
  OAParameterLocation,
  OAParameterStyle,
  OASecuritySchemeType,
  OA_COMPONENT_TYPE_TO_KEY_MAP,
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
