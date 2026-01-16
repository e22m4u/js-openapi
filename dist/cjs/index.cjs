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
  OAComponentRegistry: () => OAComponentRegistry,
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
  OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP: () => OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP,
  OPENAPI_VERSION: () => OPENAPI_VERSION,
  oaCallbackRef: () => oaCallbackRef,
  oaExampleRef: () => oaExampleRef,
  oaLinkRef: () => oaLinkRef,
  oaParameterRef: () => oaParameterRef,
  oaPathItemRef: () => oaPathItemRef,
  oaRequestBodyRef: () => oaRequestBodyRef,
  oaResponseRef: () => oaResponseRef,
  oaSchemaRef: () => oaSchemaRef,
  oaSecuritySchemeRef: () => oaSecuritySchemeRef
});
module.exports = __toCommonJS(index_exports);

// src/oa-document-scope.js
var import_js_format5 = require("@e22m4u/js-format");

// src/utils/oa-ref.js
var import_js_format2 = require("@e22m4u/js-format");

// src/oa-component-registry.js
var import_js_service = require("@e22m4u/js-service");
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
var OAComponentRegistry = class extends import_js_service.Service {
  static {
    __name(this, "OAComponentRegistry");
  }
  /**
   * Components.
   */
  _components = {
    schemas: {},
    responses: {},
    parameters: {},
    examples: {},
    requestBodies: {},
    headers: {},
    securitySchemes: {},
    links: {},
    callbacks: {},
    pathItems: {}
  };
  /**
   * Get components object.
   *
   * @returns {object}
   */
  getComponentsObject() {
    return structuredClone(this._components);
  }
  /**
   * Define component.
   *
   * @protected
   * @param {string} type
   * @param {object} definition
   * @returns {this}
   */
  _defineComponent(type, definition) {
    if (!Object.values(OAComponentType).includes(type)) {
      throw new import_js_format.InvalidArgumentError(
        "Components type %v is not supported.",
        type
      );
    }
    if (!definition || typeof definition !== "object" || Array.isArray(definition)) {
      throw new import_js_format.InvalidArgumentError(
        "Component definition must be an Object, but %v was given.",
        definition
      );
    }
    if (!definition.name || typeof definition.name !== "string") {
      throw new import_js_format.InvalidArgumentError(
        'Property "name" must be a non-empty String, but %v was given.',
        definition.name
      );
    }
    const component = definition[type];
    if (!component || typeof component !== "object" || Array.isArray(component)) {
      throw new import_js_format.InvalidArgumentError(
        "Property %v must be an Object, but %v was given.",
        type,
        component
      );
    }
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new import_js_format.InvalidArgumentError(
        "Component type %v does not have a reference to the components key.",
        type
      );
    }
    this._components[key] = structuredClone(component);
    return this;
  }
  /**
   * Has component.
   *
   * @protected
   * @param {string} type
   * @param {string} name
   * @returns {boolean}
   */
  _hasComponent(type, name) {
    if (!name || typeof name !== "string") {
      throw new import_js_format.InvalidArgumentError(
        'Parameter "name" must be a non-empty String, but %v was given.',
        name
      );
    }
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new import_js_format.InvalidArgumentError(
        "Component type %v does not have a reference to the components key.",
        type
      );
    }
    return Boolean(this._components[key][name]);
  }
  /**
   * Get component.
   *
   * @param {string} type
   * @param {string} name
   * @returns {object}
   */
  _getComponent(type, name) {
    if (!name || typeof name !== "string") {
      throw new import_js_format.InvalidArgumentError(
        'Parameter "name" must be a non-empty String, but %v was given.',
        name
      );
    }
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new import_js_format.InvalidArgumentError(
        "Component type %v does not have a reference to the components key.",
        type
      );
    }
    const component = this._components[key][name];
    if (!component) {
      throw new import_js_format.InvalidArgumentError(
        'Component "#/components/%s/%s" does not exist.',
        key,
        name
      );
    }
    return structuredClone(component);
  }
  /**
   * Define schema.
   *
   * @param {object} schemaDef
   * @returns {this}
   */
  defineSchema(schemaDef) {
    return this._defineComponent(OAComponentType.SCHEMA, schemaDef);
  }
  /**
   * Has schema.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasSchema(name) {
    return this._hasComponent(OAComponentType.SCHEMA, name);
  }
  /**
   * Get schema.
   *
   * @param {string} name
   * @returns {object}
   */
  getSchema(name) {
    return this._getComponent(OAComponentType.SCHEMA, name);
  }
  /**
   * Define response.
   *
   * @param {object} responseDef
   * @returns {this}
   */
  defineResponse(responseDef) {
    return this._defineComponent(OAComponentType.RESPONSE, responseDef);
  }
  /**
   * Has response.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasResponse(name) {
    return this._hasComponent(OAComponentType.RESPONSE, name);
  }
  /**
   * Get response.
   *
   * @param {string} name
   * @returns {object}
   */
  getResponse(name) {
    return this._getComponent(OAComponentType.RESPONSE, name);
  }
  /**
   * Define parameter.
   *
   * @param {object} parameterDef
   * @returns {this}
   */
  defineParameter(parameterDef) {
    return this._defineComponent(OAComponentType.PARAMETER, parameterDef);
  }
  /**
   * Has parameter.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasParameter(name) {
    return this._hasComponent(OAComponentType.PARAMETER, name);
  }
  /**
   * Get parameter.
   *
   * @param {string} name
   * @returns {object}
   */
  getParameter(name) {
    return this._getComponent(OAComponentType.PARAMETER, name);
  }
  /**
   * Define example.
   *
   * @param {object} exampleDef
   * @returns {this}
   */
  defineExample(exampleDef) {
    return this._defineComponent(OAComponentType.EXAMPLE, exampleDef);
  }
  /**
   * Has example.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasExample(name) {
    return this._hasComponent(OAComponentType.EXAMPLE, name);
  }
  /**
   * Get example.
   *
   * @param {string} name
   * @returns {object}
   */
  getExample(name) {
    return this._getComponent(OAComponentType.EXAMPLE, name);
  }
  /**
   * Define request body.
   *
   * @param {object} requestBodyDef
   * @returns {this}
   */
  defineRequestBody(requestBodyDef) {
    return this._defineComponent(OAComponentType.REQUEST_BODY, requestBodyDef);
  }
  /**
   * Has request body.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasRequestBody(name) {
    return this._hasComponent(OAComponentType.REQUEST_BODY, name);
  }
  /**
   * Get request body.
   *
   * @param {string} name
   * @returns {object}
   */
  getRequestBody(name) {
    return this._getComponent(OAComponentType.REQUEST_BODY, name);
  }
  /**
   * Define header.
   *
   * @param {object} headerDef
   * @returns {this}
   */
  defineHeader(headerDef) {
    return this._defineComponent(OAComponentType.HEADER, headerDef);
  }
  /**
   * Has header.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasHeader(name) {
    return this._hasComponent(OAComponentType.HEADER, name);
  }
  /**
   * Get header.
   *
   * @param {string} name
   * @returns {object}
   */
  getHeader(name) {
    return this._getComponent(OAComponentType.HEADER, name);
  }
  /**
   * Define security scheme.
   *
   * @param {object} securitySchemeDef
   * @returns {this}
   */
  defineSecurityScheme(securitySchemeDef) {
    return this._defineComponent(
      OAComponentType.SECURITY_SCHEME,
      securitySchemeDef
    );
  }
  /**
   * Has security scheme.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasSecurityScheme(name) {
    return this._hasComponent(OAComponentType.SECURITY_SCHEME, name);
  }
  /**
   * Get security scheme.
   *
   * @param {string} name
   * @returns {object}
   */
  getSecurityScheme(name) {
    return this._getComponent(OAComponentType.SECURITY_SCHEME, name);
  }
  /**
   * Define link.
   *
   * @param {object} linkDef
   * @returns {this}
   */
  defineLink(linkDef) {
    return this._defineComponent(OAComponentType.LINK, linkDef);
  }
  /**
   * Has link.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasLink(name) {
    return this._hasComponent(OAComponentType.LINK, name);
  }
  /**
   * Get link.
   *
   * @param {string} name
   * @returns {object}
   */
  getLink(name) {
    return this._getComponent(OAComponentType.LINK, name);
  }
  /**
   * Define callback.
   *
   * @param {object} callbackDef
   * @returns {this}
   */
  defineCallback(callbackDef) {
    return this._defineComponent(OAComponentType.CALLBACK, callbackDef);
  }
  /**
   * Has callback.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasCallback(name) {
    return this._hasComponent(OAComponentType.CALLBACK, name);
  }
  /**
   * Get callback.
   *
   * @param {string} name
   * @returns {object}
   */
  getCallback(name) {
    return this._getComponent(OAComponentType.CALLBACK, name);
  }
  /**
   * Define path item.
   *
   * @param {object} pathItemDef
   * @returns {this}
   */
  definePathItem(pathItemDef) {
    return this._defineComponent(OAComponentType.PATH_ITEM, pathItemDef);
  }
  /**
   * Has path item.
   *
   * @param {string} name
   * @returns {boolean}
   */
  hasPathItem(name) {
    return this._hasComponent(OAComponentType.PATH_ITEM, name);
  }
  /**
   * Get path item.
   *
   * @param {string} name
   * @returns {object}
   */
  getPathItem(name) {
    return this._getComponent(OAComponentType.PATH_ITEM, name);
  }
};

// src/utils/oa-ref.js
function oaRef(name, type) {
  if (!name || typeof name !== "string") {
    throw new import_js_format2.InvalidArgumentError(
      'Parameter "name" must be a non-empty String, but %v was given.',
      name
    );
  }
  if (!Object.values(OAComponentType).includes(type)) {
    throw new import_js_format2.InvalidArgumentError("Component type %v is not supported.", type);
  }
  const segment = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
  return { $ref: `#/components/${segment}/${name}` };
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
var import_js_format4 = require("@e22m4u/js-format");
var import_js_service2 = require("@e22m4u/js-service");

// src/document-validators.js
var import_js_format3 = require("@e22m4u/js-format");
function validateShallowOADocumentObject(documentObject) {
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
__name(validateShallowOADocumentObject, "validateShallowOADocumentObject");

// src/document-specification.js
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
var OADocumentBuilder = class extends import_js_service2.Service {
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
    if ((0, import_js_service2.isServiceContainer)(containerOrDocument)) {
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
      validateShallowOADocumentObject(document);
      this._document = document;
    }
  }
  /**
   * Define schema component.
   *
   * @param {object} schemaDef
   * @returns {this}
   */
  defineSchemaComponent(schemaDef) {
    this.getService(OAComponentRegistry).defineSchema(schemaDef);
    return this;
  }
  /**
   * Define response component.
   *
   * @param {object} responseDef
   * @returns {this}
   */
  defineResponseComponent(responseDef) {
    this.getService(OAComponentRegistry).defineResponse(responseDef);
    return this;
  }
  /**
   * Define parameter component.
   *
   * @param {object} parameterDef
   * @returns {this}
   */
  defineParameterComponent(parameterDef) {
    this.getService(OAComponentRegistry).defineParameter(parameterDef);
    return this;
  }
  /**
   * Define example component.
   *
   * @param {object} exampleDef
   * @returns {this}
   */
  defineExampleComponent(exampleDef) {
    this.getService(OAComponentRegistry).defineExample(exampleDef);
    return this;
  }
  /**
   * Define request body component.
   *
   * @param {object} requestBodyDef
   * @returns {this}
   */
  defineRequestBodyComponent(requestBodyDef) {
    this.getService(OAComponentRegistry).defineRequestBody(requestBodyDef);
    return this;
  }
  /**
   * Define header component.
   *
   * @param {object} headerDef
   * @returns {this}
   */
  defineHeaderComponent(headerDef) {
    this.getService(OAComponentRegistry).defineHeader(headerDef);
    return this;
  }
  /**
   * Define security scheme component.
   *
   * @param {object} securitySchemeDef
   * @returns {this}
   */
  defineSecuritySchemeComponent(securitySchemeDef) {
    this.getService(OAComponentRegistry).defineSecurityScheme(
      securitySchemeDef
    );
    return this;
  }
  /**
   * Define link component.
   *
   * @param {object} linkDef
   * @returns {this}
   */
  defineLinkComponent(linkDef) {
    this.getService(OAComponentRegistry).defineLink(linkDef);
    return this;
  }
  /**
   * Define callback component.
   *
   * @param {object} callbackDef
   * @returns {this}
   */
  defineCallbackComponent(callbackDef) {
    this.getService(OAComponentRegistry).defineCallback(callbackDef);
    return this;
  }
  /**
   * Define path item component.
   *
   * @param {object} pathItemDef
   * @returns {this}
   */
  definePathItemComponent(pathItemDef) {
    this.getService(OAComponentRegistry).definePathItem(pathItemDef);
    return this;
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
    const doc = structuredClone(this._document);
    const compsMap = this.getService(OAComponentRegistry).getComponentsObject();
    doc.components = doc.components || {};
    Object.keys(compsMap).forEach((compsKey) => {
      const compsNames = Object.keys(compsMap[compsKey]);
      if (compsNames.length) {
        doc.components[compsKey] = doc.components[compsKey] || {};
        compsNames.forEach((compName) => {
          doc.components[compsKey][compName] = compsMap[compsKey][compName];
        });
      }
    });
    if (!Object.keys(doc.components).length) {
      delete doc.components;
    }
    return doc;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OAApiKeyLocation,
  OAComponentRegistry,
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
  OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP,
  OPENAPI_VERSION,
  oaCallbackRef,
  oaExampleRef,
  oaLinkRef,
  oaParameterRef,
  oaPathItemRef,
  oaRequestBodyRef,
  oaResponseRef,
  oaSchemaRef,
  oaSecuritySchemeRef
});
