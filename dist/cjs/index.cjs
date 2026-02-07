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
  COMPONENT_NAME_REGEX: () => COMPONENT_NAME_REGEX,
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
  OA_PARAMETER_LOCATION_LIST: () => OA_PARAMETER_LOCATION_LIST,
  OA_PARAMETER_STYLE_LIST: () => OA_PARAMETER_STYLE_LIST,
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
  validatePasswordFormat: () => validatePasswordFormat,
  validateShallowOACallbackObject: () => validateShallowOACallbackObject,
  validateShallowOACallbacksObject: () => validateShallowOACallbacksObject,
  validateShallowOADocumentObject: () => validateShallowOADocumentObject,
  validateShallowOAExternalDocumentationObject: () => validateShallowOAExternalDocumentationObject,
  validateShallowOAInfoObject: () => validateShallowOAInfoObject,
  validateShallowOAOperationObject: () => validateShallowOAOperationObject,
  validateShallowOAParameterObject: () => validateShallowOAParameterObject,
  validateShallowOAPathItemObject: () => validateShallowOAPathItemObject,
  validateShallowOAPathsObject: () => validateShallowOAPathsObject,
  validateShallowOAReferenceObject: () => validateShallowOAReferenceObject,
  validateShallowOARequestBodyObject: () => validateShallowOARequestBodyObject,
  validateShallowOAResponseObject: () => validateShallowOAResponseObject,
  validateShallowOAResponsesObject: () => validateShallowOAResponsesObject,
  validateShallowOASecurityRequirementObject: () => validateShallowOASecurityRequirementObject,
  validateShallowOAServerObject: () => validateShallowOAServerObject,
  validateShallowOATagObject: () => validateShallowOATagObject,
  validateShallowOAWebhooksObject: () => validateShallowOAWebhooksObject,
  validateUriFormat: () => validateUriFormat,
  validateUuidFormat: () => validateUuidFormat
});
module.exports = __toCommonJS(index_exports);

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

// src/constants.js
var OA_DATA_TYPE_LIST = Object.values(OADataType);
var OA_PARAMETER_LOCATION_LIST = Object.values(OAParameterLocation);
var OA_PARAMETER_STYLE_LIST = Object.values(OAParameterStyle);
var ACCESS_MODE_LIST = Object.values(OAAccessMode);

// src/errors/oa-data-validation-error.js
var import_js_format = require("@e22m4u/js-format");
var OADataValidationError = class extends import_js_format.Errorf {
  static {
    __name(this, "OADataValidationError");
  }
};

// src/data-type/infer-openapi-data-type.js
var import_js_format2 = require("@e22m4u/js-format");
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
var import_js_format26 = require("@e22m4u/js-format");

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
var import_js_format25 = require("@e22m4u/js-format");
var import_js_service = require("@e22m4u/js-service");

// src/oa-document-object/validate-shallow-oa-tag-object.js
var import_js_format4 = require("@e22m4u/js-format");

// src/oa-document-object/validate-shallow-oa-external-documentation-object.js
var import_js_format3 = require("@e22m4u/js-format");
var OA_DOCUMENTATION_OBJECT_KEYWORDS = ["description", "url"];
function validateShallowOAExternalDocumentationObject(oaExternalDocumentationObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format3.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaExternalDocumentationObject || typeof oaExternalDocumentationObject !== "object" || Array.isArray(oaExternalDocumentationObject)) {
    throw new import_js_format3.InvalidArgumentError(
      "External Documentation Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaExternalDocumentationObject
    );
  }
  Object.keys(oaExternalDocumentationObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_DOCUMENTATION_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format3.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (oaExternalDocumentationObject.description !== void 0) {
    if (typeof oaExternalDocumentationObject.description !== "string") {
      throw new import_js_format3.InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaExternalDocumentationObject.description
      );
    }
  }
  if (!oaExternalDocumentationObject.url || typeof oaExternalDocumentationObject.url !== "string") {
    throw new import_js_format3.InvalidArgumentError(
      'Keyword "url" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaExternalDocumentationObject.url
    );
  }
}
__name(validateShallowOAExternalDocumentationObject, "validateShallowOAExternalDocumentationObject");

// src/oa-document-object/validate-shallow-oa-tag-object.js
var OA_TAG_OBJECT_KEYWORDS = ["name", "description", "externalDocs"];
function validateShallowOATagObject(oaTagObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format4.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format4.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaTagObject || typeof oaTagObject !== "object" || Array.isArray(oaTagObject)) {
    throw new import_js_format4.InvalidArgumentError(
      "Tag Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaTagObject
    );
  }
  Object.keys(oaTagObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_TAG_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format4.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (!oaTagObject.name || typeof oaTagObject.name !== "string") {
    throw new import_js_format4.InvalidArgumentError(
      'Keyword "name" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaTagObject.name
    );
  }
  if (oaTagObject.description !== void 0) {
    if (typeof oaTagObject.description !== "string") {
      throw new import_js_format4.InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaTagObject.description
      );
    }
  }
  if (oaTagObject.externalDocs !== void 0) {
    if (!oaTagObject.externalDocs || typeof oaTagObject.externalDocs !== "object" || Array.isArray(oaTagObject.externalDocs)) {
      throw new import_js_format4.InvalidArgumentError(
        'Keyword "externalDocs" at %v must be an Object, but %v was given.',
        sourceUri,
        oaTagObject.externalDocs
      );
    }
    validateShallowOAExternalDocumentationObject(oaTagObject.externalDocs, {
      sourceUri: `${sourceUri}/externalDocs`
    });
  }
}
__name(validateShallowOATagObject, "validateShallowOATagObject");

// src/oa-document-object/validate-shallow-oa-info-object.js
var import_js_format5 = require("@e22m4u/js-format");
var OA_INFO_OBJECT_KEYWORDS = [
  "title",
  "summary",
  "description",
  "termsOfService",
  "contact",
  "license",
  "version"
];
function validateShallowOAInfoObject(oaInfoObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format5.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format5.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaInfoObject || typeof oaInfoObject !== "object" || Array.isArray(oaInfoObject)) {
    throw new import_js_format5.InvalidArgumentError(
      "Info Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaInfoObject
    );
  }
  Object.keys(oaInfoObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_INFO_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format5.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (!oaInfoObject.title || typeof oaInfoObject.title !== "string") {
    throw new import_js_format5.InvalidArgumentError(
      'Keyword "title" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaInfoObject.title
    );
  }
  if (oaInfoObject.summary !== void 0) {
    if (typeof oaInfoObject.summary !== "string") {
      throw new import_js_format5.InvalidArgumentError(
        'Keyword "summary" at %v must be a String, but %v was given.',
        sourceUri,
        oaInfoObject.summary
      );
    }
  }
  if (oaInfoObject.description !== void 0) {
    if (typeof oaInfoObject.description !== "string") {
      throw new import_js_format5.InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaInfoObject.description
      );
    }
  }
  if (oaInfoObject.termsOfService !== void 0) {
    if (typeof oaInfoObject.termsOfService !== "string") {
      throw new import_js_format5.InvalidArgumentError(
        'Keyword "termsOfService" at %v must be a String, but %v was given.',
        sourceUri,
        oaInfoObject.termsOfService
      );
    }
  }
  if (oaInfoObject.contact !== void 0) {
    if (!oaInfoObject.contact || typeof oaInfoObject.contact !== "object" || Array.isArray(oaInfoObject.contact)) {
      throw new import_js_format5.InvalidArgumentError(
        'Keyword "contact" at %v must be an Object, but %v was given.',
        sourceUri,
        oaInfoObject.contact
      );
    }
  }
  if (oaInfoObject.license !== void 0) {
    if (!oaInfoObject.license || typeof oaInfoObject.license !== "object" || Array.isArray(oaInfoObject.license)) {
      throw new import_js_format5.InvalidArgumentError(
        'Keyword "license" at %v must be an Object, but %v was given.',
        sourceUri,
        oaInfoObject.license
      );
    }
  }
  if (!oaInfoObject.version || typeof oaInfoObject.version !== "string") {
    throw new import_js_format5.InvalidArgumentError(
      'Keyword "version" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaInfoObject.version
    );
  }
}
__name(validateShallowOAInfoObject, "validateShallowOAInfoObject");

// src/oa-document-object/validate-shallow-oa-paths-object.js
var import_js_format21 = require("@e22m4u/js-format");

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

// src/oa-document-object/validate-shallow-oa-path-item-object.js
var import_js_format20 = require("@e22m4u/js-format");

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
    if (value.$ref !== void 0) {
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
  throw new import_js_format10.InvalidArgumentError(
    "Reference object does not have reference properties."
  );
}
__name(resolveOAReferenceObject, "resolveOAReferenceObject");

// src/oa-document-object/validate-shallow-oa-server-object.js
var import_js_format11 = require("@e22m4u/js-format");
var OA_SERVER_OBJECT_KEYWORDS = ["url", "description", "variables"];
function validateShallowOAServerObject(oaServerObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format11.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format11.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaServerObject || typeof oaServerObject !== "object" || Array.isArray(oaServerObject)) {
    throw new import_js_format11.InvalidArgumentError(
      "Server Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaServerObject
    );
  }
  Object.keys(oaServerObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_SERVER_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format11.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (!oaServerObject.url || typeof oaServerObject.url !== "string") {
    throw new import_js_format11.InvalidArgumentError(
      'Keyword "url" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaServerObject.url
    );
  }
  if (oaServerObject.description !== void 0) {
    if (typeof oaServerObject.description !== "string") {
      throw new import_js_format11.InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaServerObject.description
      );
    }
  }
  if (oaServerObject.variables !== void 0) {
    if (!oaServerObject.variables || typeof oaServerObject.variables !== "object" || Array.isArray(oaServerObject.variables)) {
      throw new import_js_format11.InvalidArgumentError(
        'Keyword "variables" at %v must be an Object, but %v was given.',
        sourceUri,
        oaServerObject.variables
      );
    }
  }
}
__name(validateShallowOAServerObject, "validateShallowOAServerObject");

// src/oa-document-object/validate-shallow-oa-operation-object.js
var import_js_format19 = require("@e22m4u/js-format");

// src/oa-document-object/validate-shallow-oa-parameter-object.js
var import_js_format12 = require("@e22m4u/js-format");
var OA_PARAMETER_OBJECT_KEYWORDS = [
  "name",
  "in",
  "description",
  "required",
  "deprecated",
  "allowEmptyValue",
  "style",
  "explode",
  "allowReserved",
  "schema",
  "content",
  "example",
  "examples"
];
function validateShallowOAParameterObject(oaParameterObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format12.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format12.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaParameterObject || typeof oaParameterObject !== "object" || Array.isArray(oaParameterObject)) {
    throw new import_js_format12.InvalidArgumentError(
      "Parameter Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaParameterObject
    );
  }
  Object.keys(oaParameterObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_PARAMETER_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format12.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (!oaParameterObject.name || typeof oaParameterObject.name !== "string") {
    throw new import_js_format12.InvalidArgumentError(
      'Keyword "name" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaParameterObject.name
    );
  }
  if (!OA_PARAMETER_LOCATION_LIST.includes(oaParameterObject.in)) {
    throw new import_js_format12.InvalidArgumentError(
      'Keyword "in" at %v must be one of values: %l, but %v was given.',
      sourceUri,
      OA_PARAMETER_LOCATION_LIST,
      oaParameterObject.in
    );
  }
  if (oaParameterObject.description !== void 0) {
    if (typeof oaParameterObject.description !== "string") {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaParameterObject.description
      );
    }
  }
  if (oaParameterObject.required !== void 0) {
    if (typeof oaParameterObject.required !== "boolean") {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "required" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaParameterObject.required
      );
    }
  }
  if (oaParameterObject.in === OAParameterLocation.PATH) {
    if (oaParameterObject.required !== true) {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "required" at %v must be true when "in" is "path", but %v was given.',
        sourceUri,
        oaParameterObject.required
      );
    }
  }
  if (oaParameterObject.deprecated !== void 0) {
    if (typeof oaParameterObject.deprecated !== "boolean") {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "deprecated" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaParameterObject.deprecated
      );
    }
  }
  if (oaParameterObject.allowEmptyValue !== void 0) {
    if (typeof oaParameterObject.allowEmptyValue !== "boolean") {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "allowEmptyValue" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaParameterObject.allowEmptyValue
      );
    }
  }
  if (oaParameterObject.style !== void 0) {
    if (!OA_PARAMETER_STYLE_LIST.includes(oaParameterObject.style)) {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "style" at %v must be one of values: %l, but %v was given.',
        sourceUri,
        OA_PARAMETER_STYLE_LIST,
        oaParameterObject.style
      );
    }
  }
  if (oaParameterObject.explode !== void 0) {
    if (typeof oaParameterObject.explode !== "boolean") {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "explode" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaParameterObject.explode
      );
    }
  }
  if (oaParameterObject.allowReserved !== void 0) {
    if (typeof oaParameterObject.allowReserved !== "boolean") {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "allowReserved" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaParameterObject.allowReserved
      );
    }
  }
  if (oaParameterObject.schema !== void 0) {
    if (typeof oaParameterObject.schema !== "boolean" && (!oaParameterObject.schema || typeof oaParameterObject.schema !== "object" || Array.isArray(oaParameterObject.schema))) {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "schema" at %v must be a Boolean or an Object, but %v was given.',
        sourceUri,
        oaParameterObject.schema
      );
    }
  }
  if (oaParameterObject.content !== void 0) {
    if (!oaParameterObject.content || typeof oaParameterObject.content !== "object" || Array.isArray(oaParameterObject.content)) {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "content" at %v must be an Object, but %v was given.',
        sourceUri,
        oaParameterObject.content
      );
    }
  }
  if (oaParameterObject.examples !== void 0) {
    if (!oaParameterObject.examples || typeof oaParameterObject.examples !== "object" || Array.isArray(oaParameterObject.examples)) {
      throw new import_js_format12.InvalidArgumentError(
        'Keyword "examples" at %v must be an Object, but %v was given.',
        sourceUri,
        oaParameterObject.examples
      );
    }
  }
  if (oaParameterObject.schema === void 0 && oaParameterObject.content === void 0) {
    throw new import_js_format12.InvalidArgumentError(
      'Parameter Object at %v must contain either "schema" or "content" keyword.',
      sourceUri
    );
  }
  if (oaParameterObject.schema !== void 0 && oaParameterObject.content !== void 0) {
    throw new import_js_format12.InvalidArgumentError(
      'Parameter Object at %v cannot contain both "schema" and "content" keywords.',
      sourceUri
    );
  }
}
__name(validateShallowOAParameterObject, "validateShallowOAParameterObject");

// src/oa-document-object/validate-shallow-oa-reference-object.js
var import_js_format13 = require("@e22m4u/js-format");
var OA_REFERENCE_OBJECT_KEYWORDS = ["$ref", "summary", "description"];
function validateShallowOAReferenceObject(oaReferenceObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format13.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format13.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaReferenceObject || typeof oaReferenceObject !== "object" || Array.isArray(oaReferenceObject)) {
    throw new import_js_format13.InvalidArgumentError(
      "Reference Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaReferenceObject
    );
  }
  Object.keys(oaReferenceObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_REFERENCE_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format13.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (typeof oaReferenceObject.$ref !== "string") {
    throw new import_js_format13.InvalidArgumentError(
      'Keyword "$ref" at %v must be a String, but %v was given.',
      sourceUri,
      oaReferenceObject.$ref
    );
  }
  if (oaReferenceObject.summary !== void 0) {
    if (typeof oaReferenceObject.summary !== "string") {
      throw new import_js_format13.InvalidArgumentError(
        'Keyword "summary" at %v must be a String, but %v was given.',
        sourceUri,
        oaReferenceObject.summary
      );
    }
  }
  if (oaReferenceObject.description !== void 0) {
    if (typeof oaReferenceObject.description !== "string") {
      throw new import_js_format13.InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaReferenceObject.description
      );
    }
  }
}
__name(validateShallowOAReferenceObject, "validateShallowOAReferenceObject");

// src/oa-document-object/validate-shallow-oa-responses-object.js
var import_js_format15 = require("@e22m4u/js-format");

// src/oa-document-object/validate-shallow-oa-response-object.js
var import_js_format14 = require("@e22m4u/js-format");
var OA_RESPONSE_OBJECT_KEYWORDS = [
  "description",
  "headers",
  "content",
  "links"
];
function validateShallowOAResponseObject(oaResponseObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format14.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format14.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaResponseObject || typeof oaResponseObject !== "object" || Array.isArray(oaResponseObject)) {
    throw new import_js_format14.InvalidArgumentError(
      "Response Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaResponseObject
    );
  }
  Object.keys(oaResponseObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_RESPONSE_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format14.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (!oaResponseObject.description || typeof oaResponseObject.description !== "string") {
    throw new import_js_format14.InvalidArgumentError(
      'Keyword "description" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaResponseObject.description
    );
  }
  if (oaResponseObject.headers !== void 0) {
    if (!oaResponseObject.headers || typeof oaResponseObject.headers !== "object" || Array.isArray(oaResponseObject.headers)) {
      throw new import_js_format14.InvalidArgumentError(
        'Keyword "headers" at %v must be an Object, but %v was given.',
        sourceUri,
        oaResponseObject.headers
      );
    }
  }
  if (oaResponseObject.content !== void 0) {
    if (!oaResponseObject.content || typeof oaResponseObject.content !== "object" || Array.isArray(oaResponseObject.content)) {
      throw new import_js_format14.InvalidArgumentError(
        'Keyword "content" at %v must be an Object, but %v was given.',
        sourceUri,
        oaResponseObject.content
      );
    }
  }
  if (oaResponseObject.links !== void 0) {
    if (!oaResponseObject.links || typeof oaResponseObject.links !== "object" || Array.isArray(oaResponseObject.links)) {
      throw new import_js_format14.InvalidArgumentError(
        'Keyword "links" at %v must be an Object, but %v was given.',
        sourceUri,
        oaResponseObject.links
      );
    }
  }
}
__name(validateShallowOAResponseObject, "validateShallowOAResponseObject");

// src/oa-document-object/validate-shallow-oa-responses-object.js
function validateShallowOAResponsesObject(oaResponsesObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format15.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format15.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaResponsesObject || typeof oaResponsesObject !== "object" || Array.isArray(oaResponsesObject)) {
    throw new import_js_format15.InvalidArgumentError(
      "Responses Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaResponsesObject
    );
  }
  Object.keys(oaResponsesObject).forEach((oaStatusCode) => {
    if (oaStatusCode.startsWith("x-")) {
      return;
    }
    if (oaStatusCode !== "default" && !/^[1-5][0-9]{2}$/.test(oaStatusCode)) {
      throw new import_js_format15.InvalidArgumentError(
        'Key in %v must be "default" or a HTTP status code, but %v was given.',
        sourceUri,
        oaStatusCode
      );
    }
    const oaResponseObject = oaResponsesObject[oaStatusCode];
    if (!oaResponseObject || typeof oaResponseObject !== "object" || Array.isArray(oaResponseObject)) {
      throw new import_js_format15.InvalidArgumentError(
        "Value at %v must be an Object, but %v was given.",
        `${sourceUri}/${oaStatusCode}`,
        oaResponseObject
      );
    }
    if (isOAReferenceObject(oaResponseObject)) {
      validateShallowOAReferenceObject(oaResponseObject, {
        sourceUri: `${sourceUri}/${oaStatusCode}`
      });
    } else {
      validateShallowOAResponseObject(oaResponseObject, {
        sourceUri: `${sourceUri}/${oaStatusCode}`
      });
    }
  });
}
__name(validateShallowOAResponsesObject, "validateShallowOAResponsesObject");

// src/oa-document-object/validate-shallow-oa-callbacks-object.js
var import_js_format16 = require("@e22m4u/js-format");
function validateShallowOACallbacksObject(oaCallbacksObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format16.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format16.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaCallbacksObject || typeof oaCallbacksObject !== "object" || Array.isArray(oaCallbacksObject)) {
    throw new import_js_format16.InvalidArgumentError(
      "Callback Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaCallbacksObject
    );
  }
  Object.keys(oaCallbacksObject).forEach((oaCallbackId) => {
    if (oaCallbackId.startsWith("x-")) {
      return;
    }
    if (!oaCallbackId) {
      throw new import_js_format16.InvalidArgumentError(
        "Key in %v must be a non-empty String, but %v was given.",
        sourceUri,
        oaCallbackId
      );
    }
    const oaCallbackObject = oaCallbacksObject[oaCallbackId];
    if (!oaCallbackObject || typeof oaCallbackObject !== "object" || Array.isArray(oaCallbackObject)) {
      throw new import_js_format16.InvalidArgumentError(
        "Value at %v must be an Object, but %v was given.",
        `${sourceUri}/${escapeJsonPointer(oaCallbackId)}`,
        oaCallbackObject
      );
    }
    if (isOAReferenceObject(oaCallbackObject)) {
      validateShallowOAReferenceObject(oaCallbackObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaCallbackId)}`
      });
    } else {
      validateShallowOACallbacksObject(oaCallbackObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaCallbackId)}`
      });
    }
  });
}
__name(validateShallowOACallbacksObject, "validateShallowOACallbacksObject");

// src/oa-document-object/validate-shallow-oa-request-body-object.js
var import_js_format17 = require("@e22m4u/js-format");
var OA_REQUEST_BODY_OBJECT_KEYWORDS = ["description", "content", "required"];
function validateShallowOARequestBodyObject(oaRequestBodyObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format17.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format17.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaRequestBodyObject || typeof oaRequestBodyObject !== "object" || Array.isArray(oaRequestBodyObject)) {
    throw new import_js_format17.InvalidArgumentError(
      "Request Body Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaRequestBodyObject
    );
  }
  Object.keys(oaRequestBodyObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_REQUEST_BODY_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format17.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (oaRequestBodyObject.description !== void 0) {
    if (typeof oaRequestBodyObject.description !== "string") {
      throw new import_js_format17.InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaRequestBodyObject.description
      );
    }
  }
  if (!oaRequestBodyObject.content || typeof oaRequestBodyObject.content !== "object" || Array.isArray(oaRequestBodyObject.content)) {
    throw new import_js_format17.InvalidArgumentError(
      'Keyword "content" at %v must be an Object, but %v was given.',
      sourceUri,
      oaRequestBodyObject.content
    );
  }
  if (oaRequestBodyObject.required !== void 0) {
    if (typeof oaRequestBodyObject.required !== "boolean") {
      throw new import_js_format17.InvalidArgumentError(
        'Keyword "required" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaRequestBodyObject.required
      );
    }
  }
}
__name(validateShallowOARequestBodyObject, "validateShallowOARequestBodyObject");

// src/oa-document-object/validate-shallow-oa-security-requirement-object.js
var import_js_format18 = require("@e22m4u/js-format");
function validateShallowOASecurityRequirementObject(oaSecurityRequirementObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format18.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format18.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaSecurityRequirementObject || typeof oaSecurityRequirementObject !== "object" || Array.isArray(oaSecurityRequirementObject)) {
    throw new import_js_format18.InvalidArgumentError(
      "Security Requirement Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaSecurityRequirementObject
    );
  }
  Object.keys(oaSecurityRequirementObject).forEach((oaSchemeName) => {
    if (!oaSchemeName) {
      throw new import_js_format18.InvalidArgumentError(
        "Key in %v must be a non-empty String, but %v was given.",
        sourceUri,
        oaSchemeName
      );
    }
    const oaSecurityScopes = oaSecurityRequirementObject[oaSchemeName];
    if (!Array.isArray(oaSecurityScopes)) {
      throw new import_js_format18.InvalidArgumentError(
        "Value at %v must be an Array, but %v was given.",
        `${sourceUri}/${escapeJsonPointer(oaSchemeName)}`,
        oaSecurityScopes
      );
    }
    oaSecurityScopes.forEach((oaSecurityScope, index) => {
      if (!oaSecurityScope || typeof oaSecurityScope !== "string") {
        throw new import_js_format18.InvalidArgumentError(
          "Element %v at %v must be a non-empty String, but %v was given.",
          index,
          `${sourceUri}/${escapeJsonPointer(oaSchemeName)}`,
          oaSecurityScope
        );
      }
    });
  });
}
__name(validateShallowOASecurityRequirementObject, "validateShallowOASecurityRequirementObject");

// src/oa-document-object/validate-shallow-oa-operation-object.js
var OA_OPERATION_OBJECT_KEYWORDS = [
  "tags",
  "summary",
  "description",
  "externalDocs",
  "operationId",
  "parameters",
  "requestBody",
  "responses",
  "callbacks",
  "deprecated",
  "security",
  "servers"
];
function validateShallowOAOperationObject(oaOperationObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format19.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format19.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaOperationObject || typeof oaOperationObject !== "object" || Array.isArray(oaOperationObject)) {
    throw new import_js_format19.InvalidArgumentError(
      "Operation Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaOperationObject
    );
  }
  Object.keys(oaOperationObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_OPERATION_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format19.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (oaOperationObject.tags !== void 0) {
    if (!Array.isArray(oaOperationObject.tags)) {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "tags" at %v must be an Array, but %v was given.',
        sourceUri,
        oaOperationObject.tags
      );
    }
    oaOperationObject.tags.forEach((oaTagName, index) => {
      if (!oaTagName || typeof oaTagName !== "string") {
        throw new import_js_format19.InvalidArgumentError(
          "Element %v at %v must be a non-empty String, but %v was given.",
          index,
          `${sourceUri}/tags`,
          oaTagName
        );
      }
    });
  }
  if (oaOperationObject.summary !== void 0) {
    if (typeof oaOperationObject.summary !== "string") {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "summary" at %v must be a String, but %v was given.',
        sourceUri,
        oaOperationObject.summary
      );
    }
  }
  if (oaOperationObject.description !== void 0) {
    if (typeof oaOperationObject.description !== "string") {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaOperationObject.description
      );
    }
  }
  if (oaOperationObject.externalDocs !== void 0) {
    if (!oaOperationObject.externalDocs || typeof oaOperationObject.externalDocs !== "object" || Array.isArray(oaOperationObject.externalDocs)) {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "externalDocs" at %v must be an Object, but %v was given.',
        sourceUri,
        oaOperationObject.externalDocs
      );
    }
    validateShallowOAExternalDocumentationObject(
      oaOperationObject.externalDocs,
      { sourceUri: `${sourceUri}/externalDocs` }
    );
  }
  if (oaOperationObject.operationId !== void 0) {
    if (!oaOperationObject.operationId || typeof oaOperationObject.operationId !== "string") {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "operationId" at %v must be a non-empty String, but %v was given.',
        sourceUri,
        oaOperationObject.operationId
      );
    }
  }
  if (oaOperationObject.parameters !== void 0) {
    if (!Array.isArray(oaOperationObject.parameters)) {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "parameters" at %v must be an Array, but %v was given.',
        sourceUri,
        oaOperationObject.parameters
      );
    }
    oaOperationObject.parameters.forEach((oaParameterObject, index) => {
      if (!oaParameterObject || typeof oaParameterObject !== "object" || Array.isArray(oaParameterObject)) {
        throw new import_js_format19.InvalidArgumentError(
          "Element %v at %v must be an Object, but %v was given.",
          index,
          `${sourceUri}/parameters`,
          oaParameterObject
        );
      }
      if (isOAReferenceObject(oaParameterObject)) {
        validateShallowOAReferenceObject(oaParameterObject, {
          sourceUri: `${sourceUri}/parameters/${index}`
        });
      } else {
        validateShallowOAParameterObject(oaParameterObject, {
          sourceUri: `${sourceUri}/parameters/${index}`
        });
      }
    });
  }
  if (oaOperationObject.requestBody !== void 0) {
    if (!oaOperationObject.requestBody || typeof oaOperationObject.requestBody !== "object" || Array.isArray(oaOperationObject.requestBody)) {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "requestBody" at %v must be an Object, but %v was given.',
        sourceUri,
        oaOperationObject.requestBody
      );
    }
    if (isOAReferenceObject(oaOperationObject.requestBody)) {
      validateShallowOAReferenceObject(oaOperationObject.requestBody, {
        sourceUri: `${sourceUri}/requestBody`
      });
    } else {
      validateShallowOARequestBodyObject(oaOperationObject.requestBody, {
        sourceUri: `${sourceUri}/requestBody`
      });
    }
  }
  if (oaOperationObject.responses !== void 0) {
    if (!oaOperationObject.responses || typeof oaOperationObject.responses !== "object" || Array.isArray(oaOperationObject.responses)) {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "responses" at %v must be an Object, but %v was given.',
        sourceUri,
        oaOperationObject.responses
      );
    }
    validateShallowOAResponsesObject(oaOperationObject.responses, {
      sourceUri: `${sourceUri}/responses`
    });
  }
  if (oaOperationObject.callbacks !== void 0) {
    if (!oaOperationObject.callbacks || typeof oaOperationObject.callbacks !== "object" || Array.isArray(oaOperationObject.callbacks)) {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "callbacks" at %v must be an Object, but %v was given.',
        sourceUri,
        oaOperationObject.callbacks
      );
    }
    validateShallowOACallbacksObject(oaOperationObject.callbacks, {
      sourceUri: `${sourceUri}/callbacks`
    });
  }
  if (oaOperationObject.deprecated !== void 0) {
    if (typeof oaOperationObject.deprecated !== "boolean") {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "deprecated" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaOperationObject.deprecated
      );
    }
  }
  if (oaOperationObject.security !== void 0) {
    if (!Array.isArray(oaOperationObject.security)) {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "security" at %v must be an Array, but %v was given.',
        sourceUri,
        oaOperationObject.security
      );
    }
    oaOperationObject.security.forEach((oaSecurityRequirementObject, index) => {
      if (!oaSecurityRequirementObject || typeof oaSecurityRequirementObject !== "object" || Array.isArray(oaSecurityRequirementObject)) {
        throw new import_js_format19.InvalidArgumentError(
          "Element %v at %v must be an Object, but %v was given.",
          index,
          `${sourceUri}/security`,
          oaSecurityRequirementObject
        );
      }
      validateShallowOASecurityRequirementObject(oaSecurityRequirementObject, {
        sourceUri: `${sourceUri}/security/${index}`
      });
    });
  }
  if (oaOperationObject.servers !== void 0) {
    if (!Array.isArray(oaOperationObject.servers)) {
      throw new import_js_format19.InvalidArgumentError(
        'Keyword "servers" at %v must be an Array, but %v was given.',
        sourceUri,
        oaOperationObject.servers
      );
    }
    oaOperationObject.servers.forEach((oaServerObject, index) => {
      if (!oaServerObject || typeof oaServerObject !== "object" || Array.isArray(oaServerObject)) {
        throw new import_js_format19.InvalidArgumentError(
          "Element %v at %v must be an Object, but %v was given.",
          index,
          `${sourceUri}/servers`,
          oaServerObject
        );
      }
      validateShallowOAServerObject(oaServerObject, {
        sourceUri: `${sourceUri}/servers/${index}`
      });
    });
  }
}
__name(validateShallowOAOperationObject, "validateShallowOAOperationObject");

// src/oa-document-object/validate-shallow-oa-path-item-object.js
var OA_PATH_ITEM_OBJECT_KEYWORDS = [
  "$ref",
  "summary",
  "description",
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
  "servers",
  "parameters"
];
function validateShallowOAPathItemObject(oaPathItemObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format20.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format20.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaPathItemObject || typeof oaPathItemObject !== "object" || Array.isArray(oaPathItemObject)) {
    throw new import_js_format20.InvalidArgumentError(
      "Path Item Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaPathItemObject
    );
  }
  Object.keys(oaPathItemObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_PATH_ITEM_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format20.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (oaPathItemObject.$ref !== void 0) {
    if (typeof oaPathItemObject.$ref !== "string") {
      throw new import_js_format20.InvalidArgumentError(
        'Keyword "$ref" at %v must be a String, but %v was given.',
        sourceUri,
        oaPathItemObject.$ref
      );
    }
  }
  if (oaPathItemObject.summary !== void 0) {
    if (typeof oaPathItemObject.summary !== "string") {
      throw new import_js_format20.InvalidArgumentError(
        'Keyword "summary" at %v must be a String, but %v was given.',
        sourceUri,
        oaPathItemObject.summary
      );
    }
  }
  if (oaPathItemObject.description !== void 0) {
    if (typeof oaPathItemObject.description !== "string") {
      throw new import_js_format20.InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaPathItemObject.description
      );
    }
  }
  ["get", "put", "post", "delete", "options", "head", "patch", "trace"].forEach(
    (keyword) => {
      if (oaPathItemObject[keyword] !== void 0) {
        if (!oaPathItemObject[keyword] || typeof oaPathItemObject[keyword] !== "object" || Array.isArray(oaPathItemObject[keyword])) {
          throw new import_js_format20.InvalidArgumentError(
            "Keyword %v at %v must be an Object, but %v was given.",
            keyword,
            sourceUri,
            oaPathItemObject[keyword]
          );
        }
        validateShallowOAOperationObject(oaPathItemObject[keyword], {
          sourceUri: `${sourceUri}/${keyword}`
        });
      }
    }
  );
  if (oaPathItemObject.servers !== void 0) {
    if (!Array.isArray(oaPathItemObject.servers)) {
      throw new import_js_format20.InvalidArgumentError(
        'Keyword "servers" at %v must be an Array, but %v was given.',
        sourceUri,
        oaPathItemObject.servers
      );
    }
    oaPathItemObject.servers.forEach((oaServerObject, index) => {
      if (!oaServerObject || typeof oaServerObject !== "object" || Array.isArray(oaServerObject)) {
        throw new import_js_format20.InvalidArgumentError(
          "Element %v at %v must be an Object, but %v was given.",
          index,
          `${sourceUri}/servers`,
          oaServerObject
        );
      }
      validateShallowOAServerObject(oaServerObject, {
        sourceUri: `${sourceUri}/servers/${index}`
      });
    });
  }
  if (oaPathItemObject.parameters !== void 0) {
    if (!Array.isArray(oaPathItemObject.parameters)) {
      throw new import_js_format20.InvalidArgumentError(
        'Keyword "parameters" at %v must be an Array, but %v was given.',
        sourceUri,
        oaPathItemObject.parameters
      );
    }
    oaPathItemObject.parameters.forEach((oaParameterObject, index) => {
      if (!oaParameterObject || typeof oaParameterObject !== "object" || Array.isArray(oaParameterObject)) {
        throw new import_js_format20.InvalidArgumentError(
          "Element %v at %v must be an Object, but %v was given.",
          index,
          `${sourceUri}/parameters`,
          oaParameterObject
        );
      }
      if (isOAReferenceObject(oaParameterObject)) {
        validateShallowOAReferenceObject(oaParameterObject, {
          sourceUri: `${sourceUri}/parameters/${index}`
        });
      } else {
        validateShallowOAParameterObject(oaParameterObject, {
          sourceUri: `${sourceUri}/parameters/${index}`
        });
      }
    });
  }
}
__name(validateShallowOAPathItemObject, "validateShallowOAPathItemObject");

// src/oa-document-object/validate-shallow-oa-paths-object.js
function validateShallowOAPathsObject(oaPathsObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format21.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format21.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaPathsObject || typeof oaPathsObject !== "object" || Array.isArray(oaPathsObject)) {
    throw new import_js_format21.InvalidArgumentError(
      "Paths Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaPathsObject
    );
  }
  Object.keys(oaPathsObject).forEach((oaPathName) => {
    if (oaPathName.startsWith("x-")) {
      return;
    }
    if (!oaPathName) {
      throw new import_js_format21.InvalidArgumentError(
        "Key in %v must be a non-empty String, but %v was given.",
        sourceUri,
        oaPathName
      );
    }
    if (!oaPathName.startsWith("/")) {
      throw new import_js_format21.InvalidArgumentError(
        'Key in %v must start with "/", but %v was given.',
        sourceUri,
        oaPathName
      );
    }
    const oaPathItemObject = oaPathsObject[oaPathName];
    if (!oaPathItemObject || typeof oaPathItemObject !== "object" || Array.isArray(oaPathItemObject)) {
      throw new import_js_format21.InvalidArgumentError(
        "Value at %v must be an Object, but %v was given.",
        `${sourceUri}/${escapeJsonPointer(oaPathName)}`,
        oaPathItemObject
      );
    }
    validateShallowOAPathItemObject(oaPathsObject[oaPathName], {
      sourceUri: `${sourceUri}/${escapeJsonPointer(oaPathName)}`
    });
  });
}
__name(validateShallowOAPathsObject, "validateShallowOAPathsObject");

// src/oa-document-object/validate-shallow-oa-callback-object.js
var import_js_format22 = require("@e22m4u/js-format");
function validateShallowOACallbackObject(oaCallbackObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format22.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format22.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaCallbackObject || typeof oaCallbackObject !== "object" || Array.isArray(oaCallbackObject)) {
    throw new import_js_format22.InvalidArgumentError(
      "Callback Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaCallbackObject
    );
  }
  Object.keys(oaCallbackObject).forEach((oaRuntimeExpression) => {
    if (oaRuntimeExpression.startsWith("x-")) {
      return;
    }
    if (!oaRuntimeExpression) {
      throw new import_js_format22.InvalidArgumentError(
        "Key in %v must be a non-empty String, but %v was given.",
        sourceUri,
        oaRuntimeExpression
      );
    }
    const oaPathItemObject = oaCallbackObject[oaRuntimeExpression];
    if (!oaPathItemObject || typeof oaPathItemObject !== "object" || Array.isArray(oaPathItemObject)) {
      throw new import_js_format22.InvalidArgumentError(
        "Value at %v must be an Object, but %v was given.",
        `${sourceUri}/${escapeJsonPointer(oaRuntimeExpression)}`,
        oaPathItemObject
      );
    }
    if (isOAReferenceObject(oaPathItemObject)) {
      validateShallowOAReferenceObject(oaPathItemObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaRuntimeExpression)}`
      });
    } else {
      validateShallowOAPathItemObject(oaPathItemObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaRuntimeExpression)}`
      });
    }
  });
}
__name(validateShallowOACallbackObject, "validateShallowOACallbackObject");

// src/oa-document-object/validate-shallow-oa-document-object.js
var import_js_format24 = require("@e22m4u/js-format");

// src/oa-document-object/validate-shallow-oa-webhooks-object.js
var import_js_format23 = require("@e22m4u/js-format");
function validateShallowOAWebhooksObject(oaWebhooksObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format23.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format23.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaWebhooksObject || typeof oaWebhooksObject !== "object" || Array.isArray(oaWebhooksObject)) {
    throw new import_js_format23.InvalidArgumentError(
      "Webhooks Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaWebhooksObject
    );
  }
  Object.keys(oaWebhooksObject).forEach((oaWebhookName) => {
    if (oaWebhookName.startsWith("x-")) {
      return;
    }
    if (!oaWebhookName) {
      throw new import_js_format23.InvalidArgumentError(
        "Key in %v must be a non-empty String, but %v was given.",
        sourceUri,
        oaWebhookName
      );
    }
    const oaPathItemObject = oaWebhooksObject[oaWebhookName];
    if (!oaPathItemObject || typeof oaPathItemObject !== "object" || Array.isArray(oaPathItemObject)) {
      throw new import_js_format23.InvalidArgumentError(
        "Value at %v must be an Object, but %v was given.",
        `${sourceUri}/${escapeJsonPointer(oaWebhookName)}`,
        oaPathItemObject
      );
    }
    if (isOAReferenceObject(oaPathItemObject)) {
      validateShallowOAReferenceObject(oaPathItemObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaWebhookName)}`
      });
    } else {
      validateShallowOAPathItemObject(oaPathItemObject, {
        sourceUri: `${sourceUri}/${escapeJsonPointer(oaWebhookName)}`
      });
    }
  });
}
__name(validateShallowOAWebhooksObject, "validateShallowOAWebhooksObject");

// src/oa-document-object/validate-shallow-oa-document-object.js
var OA_DOCUMENT_OBJECT_KEYWORDS = [
  "openapi",
  "info",
  "jsonSchemaDialect",
  "servers",
  "paths",
  "webhooks",
  "components",
  "security",
  "tags",
  "externalDocs"
];
function validateShallowOADocumentObject(oaDocumentObject, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format24.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format24.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const sourceUri = options.sourceUri || "";
  if (!oaDocumentObject || typeof oaDocumentObject !== "object" || Array.isArray(oaDocumentObject)) {
    throw new import_js_format24.InvalidArgumentError(
      "Document Object at %v must be an Object, but %v was given.",
      sourceUri,
      oaDocumentObject
    );
  }
  Object.keys(oaDocumentObject).forEach((keyword) => {
    if (!/^x-/.test(keyword) && !OA_DOCUMENT_OBJECT_KEYWORDS.includes(keyword)) {
      throw new import_js_format24.InvalidArgumentError(
        "Keyword %v at %v is not supported.",
        keyword,
        sourceUri
      );
    }
  });
  if (!oaDocumentObject.openapi || typeof oaDocumentObject.openapi !== "string") {
    throw new import_js_format24.InvalidArgumentError(
      'Keyword "openapi" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaDocumentObject.openapi
    );
  }
  if (!oaDocumentObject.info || typeof oaDocumentObject.info !== "object" || Array.isArray(oaDocumentObject.info)) {
    throw new import_js_format24.InvalidArgumentError(
      'Keyword "info" at %v must be an Object, but %v was given.',
      sourceUri,
      oaDocumentObject.info
    );
  }
  validateShallowOAInfoObject(oaDocumentObject.info, {
    sourceUri: `${sourceUri}/info`
  });
  if (oaDocumentObject.jsonSchemaDialect !== void 0) {
    if (!oaDocumentObject.jsonSchemaDialect || typeof oaDocumentObject.jsonSchemaDialect !== "string") {
      throw new import_js_format24.InvalidArgumentError(
        'Keyword "jsonSchemaDialect" at %v must be a non-empty String, but %v was given.',
        sourceUri,
        oaDocumentObject.jsonSchemaDialect
      );
    }
  }
  if (oaDocumentObject.servers !== void 0) {
    if (!Array.isArray(oaDocumentObject.servers)) {
      throw new import_js_format24.InvalidArgumentError(
        'Keyword "servers" at %v must be an Array, but %v was given.',
        sourceUri,
        oaDocumentObject.servers
      );
    }
    oaDocumentObject.servers.forEach((oaServerObject, index) => {
      if (!oaServerObject || typeof oaServerObject !== "object" || Array.isArray(oaServerObject)) {
        throw new import_js_format24.InvalidArgumentError(
          "Element %v at %v must be an Object, but %v was given.",
          index,
          `${sourceUri}/servers`,
          oaServerObject
        );
      }
      validateShallowOAServerObject(oaServerObject, {
        sourceUri: `${sourceUri}/servers/${index}`
      });
    });
  }
  if (oaDocumentObject.paths !== void 0) {
    if (!oaDocumentObject.paths || typeof oaDocumentObject.paths !== "object" || Array.isArray(oaDocumentObject.paths)) {
      throw new import_js_format24.InvalidArgumentError(
        'Keyword "paths" at %v must be an Object, but %v was given.',
        sourceUri,
        oaDocumentObject.paths
      );
    }
    validateShallowOAPathsObject(oaDocumentObject.paths, {
      sourceUri: `${sourceUri}/paths`
    });
  }
  if (oaDocumentObject.webhooks !== void 0) {
    if (!oaDocumentObject.webhooks || typeof oaDocumentObject.webhooks !== "object" || Array.isArray(oaDocumentObject.webhooks)) {
      throw new import_js_format24.InvalidArgumentError(
        'Keyword "webhooks" at %v must be an Object, but %v was given.',
        sourceUri,
        oaDocumentObject.webhooks
      );
    }
    validateShallowOAWebhooksObject(oaDocumentObject.webhooks, {
      sourceUri: `${sourceUri}/webhooks`
    });
  }
  if (oaDocumentObject.components !== void 0) {
    if (!oaDocumentObject.components || typeof oaDocumentObject.components !== "object" || Array.isArray(oaDocumentObject.components)) {
      throw new import_js_format24.InvalidArgumentError(
        'Keyword "components" at %v must be an Object, but %v was given.',
        sourceUri,
        oaDocumentObject.components
      );
    }
  }
  if (oaDocumentObject.security !== void 0) {
    if (!Array.isArray(oaDocumentObject.security)) {
      throw new import_js_format24.InvalidArgumentError(
        'Keyword "security" at %v must be an Array, but %v was given.',
        sourceUri,
        oaDocumentObject.security
      );
    }
    oaDocumentObject.security.forEach((oaSecurityRequirementObject, index) => {
      if (!oaSecurityRequirementObject || typeof oaSecurityRequirementObject !== "object" || Array.isArray(oaSecurityRequirementObject)) {
        throw new import_js_format24.InvalidArgumentError(
          "Element %v at %v must be an Object, but %v was given.",
          index,
          `${sourceUri}/security`,
          oaSecurityRequirementObject
        );
      }
      validateShallowOASecurityRequirementObject(oaSecurityRequirementObject, {
        sourceUri: `${sourceUri}/security/${index}`
      });
    });
  }
  if (oaDocumentObject.tags !== void 0) {
    if (!Array.isArray(oaDocumentObject.tags)) {
      throw new import_js_format24.InvalidArgumentError(
        'Keyword "tags" at %v must be an Array, but %v was given.',
        sourceUri,
        oaDocumentObject.tags
      );
    }
    oaDocumentObject.tags.forEach((oaTagObject, index) => {
      if (!oaTagObject || typeof oaTagObject !== "object" || Array.isArray(oaTagObject)) {
        throw new import_js_format24.InvalidArgumentError(
          "Element %v at %v must be an Object, but %v was given.",
          index,
          `${sourceUri}/tags`,
          oaTagObject
        );
      }
      validateShallowOATagObject(oaTagObject, {
        sourceUri: `${sourceUri}/tags/${index}`
      });
    });
  }
  if (oaDocumentObject.externalDocs !== void 0) {
    if (!oaDocumentObject.externalDocs || typeof oaDocumentObject.externalDocs !== "object" || Array.isArray(oaDocumentObject.externalDocs)) {
      throw new import_js_format24.InvalidArgumentError(
        'Keyword "externalDocs" at %v must be an Object, but %v was given.',
        sourceUri,
        oaDocumentObject.externalDocs
      );
    }
    validateShallowOAExternalDocumentationObject(
      oaDocumentObject.externalDocs,
      { sourceUri: `${sourceUri}/externalDocs` }
    );
  }
}
__name(validateShallowOADocumentObject, "validateShallowOADocumentObject");

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
var COMPONENT_NAME_REGEX = /^[a-zA-Z0-9.\-_]+$/;
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
        throw new import_js_format25.InvalidArgumentError(
          "Document Object must be an Object, but %v was given.",
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
        throw new import_js_format25.InvalidArgumentError(
          'Keyword "info" must be an Object, but %v was given.',
          document.info
        );
      }
      if (!document.info.title) {
        document.info.title = this._document.info.title;
      }
      if (!document.info.version) {
        document.info.version = this._document.info.version;
      }
      validateShallowOADocumentObject(document, { sourceUri: "document" });
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
      throw new import_js_format25.InvalidArgumentError(
        "Components type %v is not supported.",
        type
      );
    }
    if (!definition || typeof definition !== "object" || Array.isArray(definition)) {
      throw new import_js_format25.InvalidArgumentError(
        "Component definition must be an Object, but %v was given.",
        definition
      );
    }
    if (!definition.name || typeof definition.name !== "string") {
      throw new import_js_format25.InvalidArgumentError(
        'Keyword "name" must be a non-empty String, but %v was given.',
        definition.name
      );
    }
    if (!COMPONENT_NAME_REGEX.test(definition.name)) {
      throw new import_js_format25.InvalidArgumentError(
        "Component name %v contains invalid characters.",
        definition.name
      );
    }
    const component = definition[type];
    if (!component || typeof component !== "object" || Array.isArray(component)) {
      throw new import_js_format25.InvalidArgumentError(
        "Keyword %v must be an Object, but %v was given.",
        type,
        component
      );
    }
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new import_js_format25.InvalidArgumentError(
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
      throw new import_js_format25.InvalidArgumentError(
        'Parameter "name" must be a non-empty String, but %v was given.',
        name
      );
    }
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new import_js_format25.InvalidArgumentError(
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
      throw new import_js_format25.InvalidArgumentError(
        'Parameter "name" must be a non-empty String, but %v was given.',
        name
      );
    }
    const key = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!key) {
      throw new import_js_format25.InvalidArgumentError(
        "Component type %v does not have a reference to the components key.",
        type
      );
    }
    const component = this._document && this._document.components && this._document.components[key] && this._document.components[key][name];
    if (!component) {
      throw new import_js_format25.InvalidArgumentError(
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
      throw new import_js_format25.InvalidArgumentError(
        "Operation Definition must be an Object, but %v was given.",
        operationDef
      );
    }
    if (!operationDef.path || typeof operationDef.path !== "string") {
      throw new import_js_format25.InvalidArgumentError(
        'Keyword "path" must be a non-empty String, but %v was given.',
        operationDef.path
      );
    }
    if (!Object.values(OAOperationMethod).includes(operationDef.method)) {
      throw new import_js_format25.InvalidArgumentError(
        'Keyword "method" must be one of values: %l, but %v was given.',
        Object.values(OAOperationMethod)
      );
    }
    if (!operationDef.operation || typeof operationDef.operation !== "object" || Array.isArray(operationDef.operation)) {
      throw new import_js_format25.InvalidArgumentError(
        'Keyword "operation" must be an Object, but %v was given.',
        operationDef.operation
      );
    }
    validateShallowOAOperationObject(operationDef.operation, {
      sourceUri: "operation"
    });
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
      throw new import_js_format26.InvalidArgumentError(
        'Parameter "builder" must be an instance of OADocumentBuilder, but %v was given.',
        builder
      );
    }
    if (!options || typeof options !== "object" || Array.isArray(options)) {
      throw new import_js_format26.InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options
      );
    }
    if (options.pathPrefix !== void 0) {
      if (!options.pathPrefix || typeof options.pathPrefix !== "string") {
        throw new import_js_format26.InvalidArgumentError(
          'Property "pathPrefix" must be a non-empty String, but %v was given.',
          options.pathPrefix
        );
      }
    }
    if (options.tags !== void 0) {
      if (!Array.isArray(options.tags)) {
        throw new import_js_format26.InvalidArgumentError(
          'Property "tags" must be an Array, but %v was given.',
          options.tags
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== "string") {
          throw new import_js_format26.InvalidArgumentError(
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
      throw new import_js_format26.InvalidArgumentError(
        "Operation Definition must be an Object, but %v was given.",
        operationDef
      );
    }
    if (!operationDef.path || typeof operationDef.path !== "string") {
      throw new import_js_format26.InvalidArgumentError(
        'Property "path" must be a non-empty String, but %v was given.',
        operationDef.path
      );
    }
    if (!operationDef.method || typeof operationDef.method !== "string") {
      throw new import_js_format26.InvalidArgumentError(
        'Property "method" must be a non-empty String, but %v was given.',
        operationDef.method
      );
    }
    if (!Object.values(OAOperationMethod).includes(operationDef.method)) {
      throw new import_js_format26.InvalidArgumentError(
        'Property "method" must be one of values: %l, but %v was given.',
        Object.values(OAOperationMethod)
      );
    }
    if (!operationDef.operation || typeof operationDef.operation !== "object" || Array.isArray(operationDef.operation)) {
      throw new import_js_format26.InvalidArgumentError(
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
      throw new import_js_format26.InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options
      );
    }
    if (options.pathPrefix !== void 0) {
      if (!options.pathPrefix || typeof options.pathPrefix !== "string") {
        throw new import_js_format26.InvalidArgumentError(
          'Property "pathPrefix" must be a non-empty String, but %v was given.',
          options.pathPrefix
        );
      }
    }
    if (options.tags !== void 0) {
      if (!Array.isArray(options.tags)) {
        throw new import_js_format26.InvalidArgumentError(
          'Property "tags" must be an Array, but %v was given.',
          options.tags
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== "string") {
          throw new import_js_format26.InvalidArgumentError(
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
var validatePasswordFormat = /* @__PURE__ */ __name(() => true, "validatePasswordFormat");

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
  [OADataFormat.URI]: validateUriFormat,
  [OADataFormat.PASSWORD]: validatePasswordFormat
};

// src/data-validation/validate-data-with-openapi-schema.js
var import_js_format27 = require("@e22m4u/js-format");
var JSON_INTEGER_REGEXP = /^-?\d+$/;
var JSON_NUMBER_REGEXP = /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/;
var UNSUPPORTED_SCHEMA_KEYWORDS = [
  "nullable",
  // удалено в 3.1.0
  "$dynamicRef",
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  "discriminator"
];
function validateDataWithOpenApiSchema(data, schema, options = {}) {
  if (schema === null || typeof schema !== "boolean" && typeof schema !== "object" || Array.isArray(schema)) {
    throw new import_js_format27.InvalidArgumentError(
      'Parameter "schema" must be a Boolean or an Object, but %v was given.',
      schema
    );
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format27.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.rootDocument !== void 0) {
    if (!options.rootDocument || typeof options.rootDocument !== "object" || Array.isArray(options.rootDocument)) {
      throw new import_js_format27.InvalidArgumentError(
        'Option "rootDocument" must be an Object, but %v was given.',
        options.rootDocument
      );
    }
  }
  if (options.required !== void 0) {
    if (typeof options.required !== "boolean") {
      throw new import_js_format27.InvalidArgumentError(
        'Option "required" must be a Boolean, but %v was given.',
        options.required
      );
    }
  }
  if (options.coerceTypes !== void 0) {
    if (typeof options.coerceTypes !== "boolean") {
      throw new import_js_format27.InvalidArgumentError(
        'Option "coerceTypes" must be a Boolean, but %v was given.',
        options.coerceTypes
      );
    }
  }
  if (options.applyDefaults !== void 0) {
    if (typeof options.applyDefaults !== "boolean") {
      throw new import_js_format27.InvalidArgumentError(
        'Option "applyDefaults" must be a Boolean, but %v was given.',
        options.applyDefaults
      );
    }
  }
  if (options.stripUnknown !== void 0) {
    if (typeof options.stripUnknown !== "boolean") {
      throw new import_js_format27.InvalidArgumentError(
        'Option "stripUnknown" must be a Boolean, but %v was given.',
        options.stripUnknown
      );
    }
  }
  if (options.dataSourceUri !== void 0) {
    if (!options.dataSourceUri || typeof options.dataSourceUri !== "string") {
      throw new import_js_format27.InvalidArgumentError(
        'Option "dataSourceUri" must be a non-empty String, but %v was given.',
        options.dataSourceUri
      );
    }
  }
  if (options.schemaSourceUri !== void 0) {
    if (!options.schemaSourceUri || typeof options.schemaSourceUri !== "string") {
      throw new import_js_format27.InvalidArgumentError(
        'Option "schemaSourceUri" must be a non-empty String, but %v was given.',
        options.schemaSourceUri
      );
    }
  }
  if (options.silent !== void 0) {
    if (typeof options.silent !== "boolean") {
      throw new import_js_format27.InvalidArgumentError(
        'Option "silent" must be a Boolean, but %v was given.',
        options.silent
      );
    }
  }
  if (options.accessMode !== void 0) {
    if (!ACCESS_MODE_LIST.includes(options.accessMode)) {
      throw new import_js_format27.InvalidArgumentError(
        "Access mode %v is not supported.",
        options.accessMode
      );
    }
  }
  if (options.formatValidators !== void 0) {
    if (!options.formatValidators || typeof options.formatValidators !== "object" || Array.isArray(options.formatValidators)) {
      throw new import_js_format27.InvalidArgumentError(
        'Option "formatValidators" must be an Object, but %v was given.',
        options.formatValidators
      );
    }
    Object.keys(options.formatValidators).forEach((formatName) => {
      const formatValidator = options.formatValidators[formatName];
      if (formatValidator !== void 0 && typeof formatValidator !== "function") {
        throw new import_js_format27.InvalidArgumentError(
          "Format validator %v must be a Function, but %v was given.",
          formatName,
          formatValidator
        );
      }
    });
  }
  if (options.parseJson !== void 0) {
    if (typeof options.parseJson !== "boolean") {
      throw new import_js_format27.InvalidArgumentError(
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
      reason: (0, import_js_format27.format)(
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
    throw new import_js_format27.InvalidArgumentError(
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
        reason: (0, import_js_format27.format)(
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
  if (schema.$ref !== void 0) {
    const resSchema = resolveOAReferenceObject(schema, {
      rootDocument: options.rootDocument
    });
    const result = _validate(data, resSchema, {
      ...options,
      schemaSourceUri: schema.$ref
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
      throw new import_js_format27.InvalidArgumentError(
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
      reason: (0, import_js_format27.format)(
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
      reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
      reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
      throw new import_js_format27.InvalidArgumentError(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
      throw new import_js_format27.InvalidArgumentError(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
            reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
          reason: (0, import_js_format27.format)(
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
            reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
        reason: (0, import_js_format27.format)(
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
          reason: (0, import_js_format27.format)(
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
                reason: (0, import_js_format27.format)(
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
        throw new import_js_format27.InvalidArgumentError(
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
          reason: (0, import_js_format27.format)(
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
          reason: (0, import_js_format27.format)(
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
  COMPONENT_NAME_REGEX,
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
  OA_PARAMETER_LOCATION_LIST,
  OA_PARAMETER_STYLE_LIST,
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
  validatePasswordFormat,
  validateShallowOACallbackObject,
  validateShallowOACallbacksObject,
  validateShallowOADocumentObject,
  validateShallowOAExternalDocumentationObject,
  validateShallowOAInfoObject,
  validateShallowOAOperationObject,
  validateShallowOAParameterObject,
  validateShallowOAPathItemObject,
  validateShallowOAPathsObject,
  validateShallowOAReferenceObject,
  validateShallowOARequestBodyObject,
  validateShallowOAResponseObject,
  validateShallowOAResponsesObject,
  validateShallowOASecurityRequirementObject,
  validateShallowOAServerObject,
  validateShallowOATagObject,
  validateShallowOAWebhooksObject,
  validateUriFormat,
  validateUuidFormat
});
