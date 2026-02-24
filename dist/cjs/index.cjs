"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  OAAccessMode: () => OAAccessMode,
  OAApiKeyLocation: () => OAApiKeyLocation,
  OAComponentType: () => OAComponentType,
  OADataFormat: () => OADataFormat,
  OADataType: () => OADataType,
  OADocumentBuilder: () => OADocumentBuilder,
  OADocumentObjectValidationError: () => OADocumentObjectValidationError,
  OAMediaType: () => OAMediaType,
  OAOperationGroup: () => OAOperationGroup,
  OAOperationMethod: () => OAOperationMethod,
  OAParameterLocation: () => OAParameterLocation,
  OAParameterStyle: () => OAParameterStyle,
  OASecuritySchemeType: () => OASecuritySchemeType,
  OA_COMPONENT_NAME_REGEX: () => OA_COMPONENT_NAME_REGEX,
  OA_COMPONENT_TYPES: () => OA_COMPONENT_TYPES,
  OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP: () => OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP,
  OA_COMPONENT_TYPE_TO_DEFINITION_NAME_MAP: () => OA_COMPONENT_TYPE_TO_DEFINITION_NAME_MAP,
  OPENAPI_VERSION: () => OPENAPI_VERSION,
  escapeJsonPointer: () => escapeJsonPointer,
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
  validateOADocumentObject: () => validateOADocumentObject
});
module.exports = __toCommonJS(index_exports);

// src/errors/oa-document-object-validation-error.js
var import_js_format = require("@e22m4u/js-format");
var OADocumentObjectValidationError = class extends import_js_format.Errorf {
  static {
    __name(this, "OADocumentObjectValidationError");
  }
};

// src/oa-specification.js
var OPENAPI_VERSION = "3.1.2";
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
  APPLICATION_OCTET_STREAM: "application/octet-stream",
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

// src/json-pointer/escape-json-pointer.js
var import_js_format2 = require("@e22m4u/js-format");
function escapeJsonPointer(jsonPointer) {
  if (typeof jsonPointer !== "string") {
    throw new import_js_format2.InvalidArgumentError(
      'Parameter "jsonPointer" must be a String, but %v was given.',
      jsonPointer
    );
  }
  return jsonPointer.replace(/~/g, "~0").replace(/\//g, "~1");
}
__name(escapeJsonPointer, "escapeJsonPointer");

// src/json-pointer/resolve-json-pointer.js
var import_js_format3 = require("@e22m4u/js-format");
var ARRAY_INDEX_PATTERN = /^(0|[1-9][0-9]*)$/;
function resolveJsonPointer(document, pointer) {
  if (!document || typeof document !== "object") {
    throw new import_js_format3.InvalidArgumentError(
      'Parameter "document" must be an Object or an Array, but %v was given.',
      document
    );
  }
  if (typeof pointer !== "string") {
    throw new import_js_format3.InvalidArgumentError(
      "JSON pointer must be a String, but %v was given.",
      pointer
    );
  }
  if (pointer === "") {
    return document;
  }
  if (!pointer.startsWith("/")) {
    throw new import_js_format3.InvalidArgumentError(
      'JSON pointer must start with "/", but %v was given.',
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
      throw new import_js_format3.InvalidArgumentError(
        "Unable to resolve %v in the given document.",
        currentPointer
      );
    }
  }
  return current;
}
__name(resolveJsonPointer, "resolveJsonPointer");

// src/json-pointer/unescape-json-pointer.js
var import_js_format4 = require("@e22m4u/js-format");
function unescapeJsonPointer(jsonPointer) {
  if (typeof jsonPointer !== "string") {
    throw new import_js_format4.InvalidArgumentError(
      'Parameter "jsonPointer" must be a String, but %v was given.',
      jsonPointer
    );
  }
  return jsonPointer.replace(/~1/g, "/").replace(/~0/g, "~");
}
__name(unescapeJsonPointer, "unescapeJsonPointer");

// src/oa-operation-group.js
var import_js_format7 = require("@e22m4u/js-format");

// src/oa-document-builder.js
var import_js_format6 = require("@e22m4u/js-format");
var import_js_service = require("@e22m4u/js-service");

// src/oa-document-object/validate-oa-document-object.js
var import_js_format5 = require("@e22m4u/js-format");

// src/ajv.js
var import_ajv_formats = __toESM(require("ajv-formats"), 1);
var import__ = __toESM(require("ajv/dist/2020.js"), 1);

// schema/openapi-3-1/schema.js
var schema_default = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "The description of OpenAPI v3.1.x Documents without Schema Object validation",
  "type": "object",
  "properties": {
    "openapi": {
      "type": "string",
      "pattern": "^3\\.1\\.\\d+(-.+)?$"
    },
    "info": {
      "$ref": "#/$defs/info"
    },
    "jsonSchemaDialect": {
      "type": "string",
      "format": "uri-reference",
      "default": "https://spec.openapis.org/oas/3.1/dialect/base"
    },
    "servers": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/server"
      },
      "default": [
        {
          "url": "/"
        }
      ]
    },
    "paths": {
      "$ref": "#/$defs/paths"
    },
    "webhooks": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/$defs/path-item"
      }
    },
    "components": {
      "$ref": "#/$defs/components"
    },
    "security": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/security-requirement"
      }
    },
    "tags": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/tag"
      }
    },
    "externalDocs": {
      "$ref": "#/$defs/external-documentation"
    }
  },
  "required": [
    "openapi",
    "info"
  ],
  "anyOf": [
    {
      "required": [
        "paths"
      ]
    },
    {
      "required": [
        "components"
      ]
    },
    {
      "required": [
        "webhooks"
      ]
    }
  ],
  "$ref": "#/$defs/specification-extensions",
  "unevaluatedProperties": false,
  "$defs": {
    "info": {
      "$comment": "https://spec.openapis.org/oas/v3.1#info-object",
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "summary": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "termsOfService": {
          "type": "string",
          "format": "uri-reference"
        },
        "contact": {
          "$ref": "#/$defs/contact"
        },
        "license": {
          "$ref": "#/$defs/license"
        },
        "version": {
          "type": "string"
        }
      },
      "required": [
        "title",
        "version"
      ],
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "contact": {
      "$comment": "https://spec.openapis.org/oas/v3.1#contact-object",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "url": {
          "type": "string",
          "format": "uri-reference"
        },
        "email": {
          "type": "string",
          "format": "email"
        }
      },
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "license": {
      "$comment": "https://spec.openapis.org/oas/v3.1#license-object",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "identifier": {
          "type": "string"
        },
        "url": {
          "type": "string",
          "format": "uri-reference"
        }
      },
      "required": [
        "name"
      ],
      "dependentSchemas": {
        "identifier": {
          "not": {
            "required": [
              "url"
            ]
          }
        }
      },
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "server": {
      "$comment": "https://spec.openapis.org/oas/v3.1#server-object",
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "variables": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/server-variable"
          }
        }
      },
      "required": [
        "url"
      ],
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "server-variable": {
      "$comment": "https://spec.openapis.org/oas/v3.1#server-variable-object",
      "type": "object",
      "properties": {
        "enum": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "minItems": 1
        },
        "default": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "default"
      ],
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "components": {
      "$comment": "https://spec.openapis.org/oas/v3.1#components-object",
      "type": "object",
      "properties": {
        "schemas": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/schema"
          }
        },
        "responses": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/response-or-reference"
          }
        },
        "parameters": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/parameter-or-reference"
          }
        },
        "examples": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/example-or-reference"
          }
        },
        "requestBodies": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/request-body-or-reference"
          }
        },
        "headers": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/header-or-reference"
          }
        },
        "securitySchemes": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/security-scheme-or-reference"
          }
        },
        "links": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/link-or-reference"
          }
        },
        "callbacks": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/callbacks-or-reference"
          }
        },
        "pathItems": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/path-item"
          }
        }
      },
      "patternProperties": {
        "^(schemas|responses|parameters|examples|requestBodies|headers|securitySchemes|links|callbacks|pathItems)$": {
          "$comment": "Enumerating all of the property names in the regex above is necessary for unevaluatedProperties to work as expected",
          "propertyNames": {
            "pattern": "^[a-zA-Z0-9._-]+$"
          }
        }
      },
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "paths": {
      "$comment": "https://spec.openapis.org/oas/v3.1#paths-object",
      "type": "object",
      "patternProperties": {
        "^/": {
          "$ref": "#/$defs/path-item"
        }
      },
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "path-item": {
      "$comment": "https://spec.openapis.org/oas/v3.1#path-item-object",
      "type": "object",
      "properties": {
        "$ref": {
          "type": "string",
          "format": "uri-reference"
        },
        "summary": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "servers": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/server"
          }
        },
        "parameters": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/parameter-or-reference"
          }
        },
        "get": {
          "$ref": "#/$defs/operation"
        },
        "put": {
          "$ref": "#/$defs/operation"
        },
        "post": {
          "$ref": "#/$defs/operation"
        },
        "delete": {
          "$ref": "#/$defs/operation"
        },
        "options": {
          "$ref": "#/$defs/operation"
        },
        "head": {
          "$ref": "#/$defs/operation"
        },
        "patch": {
          "$ref": "#/$defs/operation"
        },
        "trace": {
          "$ref": "#/$defs/operation"
        }
      },
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "operation": {
      "$comment": "https://spec.openapis.org/oas/v3.1#operation-object",
      "type": "object",
      "properties": {
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "summary": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "externalDocs": {
          "$ref": "#/$defs/external-documentation"
        },
        "operationId": {
          "type": "string"
        },
        "parameters": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/parameter-or-reference"
          }
        },
        "requestBody": {
          "$ref": "#/$defs/request-body-or-reference"
        },
        "responses": {
          "$ref": "#/$defs/responses"
        },
        "callbacks": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/callbacks-or-reference"
          }
        },
        "deprecated": {
          "default": false,
          "type": "boolean"
        },
        "security": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/security-requirement"
          }
        },
        "servers": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/server"
          }
        }
      },
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "external-documentation": {
      "$comment": "https://spec.openapis.org/oas/v3.1#external-documentation-object",
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "url": {
          "type": "string",
          "format": "uri-reference"
        }
      },
      "required": [
        "url"
      ],
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "parameter": {
      "$comment": "https://spec.openapis.org/oas/v3.1#parameter-object",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "in": {
          "enum": [
            "query",
            "header",
            "path",
            "cookie"
          ]
        },
        "description": {
          "type": "string"
        },
        "required": {
          "default": false,
          "type": "boolean"
        },
        "deprecated": {
          "default": false,
          "type": "boolean"
        },
        "schema": {
          "$ref": "#/$defs/schema"
        },
        "content": {
          "$ref": "#/$defs/content",
          "minProperties": 1,
          "maxProperties": 1
        }
      },
      "required": [
        "name",
        "in"
      ],
      "oneOf": [
        {
          "required": [
            "schema"
          ]
        },
        {
          "required": [
            "content"
          ]
        }
      ],
      "if": {
        "properties": {
          "in": {
            "const": "query"
          }
        },
        "required": [
          "in"
        ]
      },
      "then": {
        "properties": {
          "allowEmptyValue": {
            "default": false,
            "type": "boolean"
          }
        }
      },
      "dependentSchemas": {
        "schema": {
          "properties": {
            "style": {
              "type": "string"
            },
            "explode": {
              "type": "boolean"
            }
          },
          "allOf": [
            {
              "$ref": "#/$defs/examples"
            },
            {
              "$ref": "#/$defs/parameter/dependentSchemas/schema/$defs/styles-for-path"
            },
            {
              "$ref": "#/$defs/parameter/dependentSchemas/schema/$defs/styles-for-header"
            },
            {
              "$ref": "#/$defs/parameter/dependentSchemas/schema/$defs/styles-for-query"
            },
            {
              "$ref": "#/$defs/parameter/dependentSchemas/schema/$defs/styles-for-cookie"
            },
            {
              "$ref": "#/$defs/styles-for-form"
            }
          ],
          "$defs": {
            "styles-for-path": {
              "if": {
                "properties": {
                  "in": {
                    "const": "path"
                  }
                },
                "required": [
                  "in"
                ]
              },
              "then": {
                "properties": {
                  "style": {
                    "default": "simple",
                    "enum": [
                      "matrix",
                      "label",
                      "simple"
                    ]
                  },
                  "required": {
                    "const": true
                  }
                },
                "required": [
                  "required"
                ]
              }
            },
            "styles-for-header": {
              "if": {
                "properties": {
                  "in": {
                    "const": "header"
                  }
                },
                "required": [
                  "in"
                ]
              },
              "then": {
                "properties": {
                  "style": {
                    "default": "simple",
                    "const": "simple"
                  }
                }
              }
            },
            "styles-for-query": {
              "if": {
                "properties": {
                  "in": {
                    "const": "query"
                  }
                },
                "required": [
                  "in"
                ]
              },
              "then": {
                "properties": {
                  "style": {
                    "default": "form",
                    "enum": [
                      "form",
                      "spaceDelimited",
                      "pipeDelimited",
                      "deepObject"
                    ]
                  },
                  "allowReserved": {
                    "default": false,
                    "type": "boolean"
                  }
                }
              }
            },
            "styles-for-cookie": {
              "if": {
                "properties": {
                  "in": {
                    "const": "cookie"
                  }
                },
                "required": [
                  "in"
                ]
              },
              "then": {
                "properties": {
                  "style": {
                    "default": "form",
                    "const": "form"
                  }
                }
              }
            }
          }
        }
      },
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "parameter-or-reference": {
      "if": {
        "type": "object",
        "required": [
          "$ref"
        ]
      },
      "then": {
        "$ref": "#/$defs/reference"
      },
      "else": {
        "$ref": "#/$defs/parameter"
      }
    },
    "request-body": {
      "$comment": "https://spec.openapis.org/oas/v3.1#request-body-object",
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "content": {
          "$ref": "#/$defs/content"
        },
        "required": {
          "default": false,
          "type": "boolean"
        }
      },
      "required": [
        "content"
      ],
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "request-body-or-reference": {
      "if": {
        "type": "object",
        "required": [
          "$ref"
        ]
      },
      "then": {
        "$ref": "#/$defs/reference"
      },
      "else": {
        "$ref": "#/$defs/request-body"
      }
    },
    "content": {
      "$comment": "https://spec.openapis.org/oas/v3.1#fixed-fields-10",
      "type": "object",
      "additionalProperties": {
        "$ref": "#/$defs/media-type"
      },
      "propertyNames": {
        "format": "media-range"
      }
    },
    "media-type": {
      "$comment": "https://spec.openapis.org/oas/v3.1#media-type-object",
      "type": "object",
      "properties": {
        "schema": {
          "$ref": "#/$defs/schema"
        },
        "encoding": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/encoding"
          }
        }
      },
      "allOf": [
        {
          "$ref": "#/$defs/specification-extensions"
        },
        {
          "$ref": "#/$defs/examples"
        }
      ],
      "unevaluatedProperties": false
    },
    "encoding": {
      "$comment": "https://spec.openapis.org/oas/v3.1#encoding-object",
      "type": "object",
      "properties": {
        "contentType": {
          "type": "string",
          "format": "media-range"
        },
        "headers": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/header-or-reference"
          }
        },
        "style": {
          "default": "form",
          "enum": [
            "form",
            "spaceDelimited",
            "pipeDelimited",
            "deepObject"
          ]
        },
        "explode": {
          "type": "boolean"
        },
        "allowReserved": {
          "default": false,
          "type": "boolean"
        }
      },
      "allOf": [
        {
          "$ref": "#/$defs/specification-extensions"
        },
        {
          "$ref": "#/$defs/styles-for-form"
        }
      ],
      "unevaluatedProperties": false
    },
    "responses": {
      "$comment": "https://spec.openapis.org/oas/v3.1#responses-object",
      "type": "object",
      "properties": {
        "default": {
          "$ref": "#/$defs/response-or-reference"
        }
      },
      "patternProperties": {
        "^[1-5](?:[0-9]{2}|XX)$": {
          "$ref": "#/$defs/response-or-reference"
        }
      },
      "minProperties": 1,
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false,
      "if": {
        "$comment": "either default, or at least one response code property must exist",
        "patternProperties": {
          "^[1-5](?:[0-9]{2}|XX)$": false
        }
      },
      "then": {
        "required": [
          "default"
        ]
      }
    },
    "response": {
      "$comment": "https://spec.openapis.org/oas/v3.1#response-object",
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "headers": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/header-or-reference"
          }
        },
        "content": {
          "$ref": "#/$defs/content"
        },
        "links": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/link-or-reference"
          }
        }
      },
      "required": [
        "description"
      ],
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "response-or-reference": {
      "if": {
        "type": "object",
        "required": [
          "$ref"
        ]
      },
      "then": {
        "$ref": "#/$defs/reference"
      },
      "else": {
        "$ref": "#/$defs/response"
      }
    },
    "callbacks": {
      "$comment": "https://spec.openapis.org/oas/v3.1#callback-object",
      "type": "object",
      "$ref": "#/$defs/specification-extensions",
      "additionalProperties": {
        "$ref": "#/$defs/path-item"
      }
    },
    "callbacks-or-reference": {
      "if": {
        "type": "object",
        "required": [
          "$ref"
        ]
      },
      "then": {
        "$ref": "#/$defs/reference"
      },
      "else": {
        "$ref": "#/$defs/callbacks"
      }
    },
    "example": {
      "$comment": "https://spec.openapis.org/oas/v3.1#example-object",
      "type": "object",
      "properties": {
        "summary": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "value": true,
        "externalValue": {
          "type": "string",
          "format": "uri-reference"
        }
      },
      "not": {
        "required": [
          "value",
          "externalValue"
        ]
      },
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "example-or-reference": {
      "if": {
        "type": "object",
        "required": [
          "$ref"
        ]
      },
      "then": {
        "$ref": "#/$defs/reference"
      },
      "else": {
        "$ref": "#/$defs/example"
      }
    },
    "link": {
      "$comment": "https://spec.openapis.org/oas/v3.1#link-object",
      "type": "object",
      "properties": {
        "operationRef": {
          "type": "string",
          "format": "uri-reference"
        },
        "operationId": {
          "type": "string"
        },
        "parameters": {
          "$ref": "#/$defs/map-of-strings"
        },
        "requestBody": true,
        "description": {
          "type": "string"
        },
        "server": {
          "$ref": "#/$defs/server"
        }
      },
      "oneOf": [
        {
          "required": [
            "operationRef"
          ]
        },
        {
          "required": [
            "operationId"
          ]
        }
      ],
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "link-or-reference": {
      "if": {
        "type": "object",
        "required": [
          "$ref"
        ]
      },
      "then": {
        "$ref": "#/$defs/reference"
      },
      "else": {
        "$ref": "#/$defs/link"
      }
    },
    "header": {
      "$comment": "https://spec.openapis.org/oas/v3.1#header-object",
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "required": {
          "default": false,
          "type": "boolean"
        },
        "deprecated": {
          "default": false,
          "type": "boolean"
        },
        "schema": {
          "$ref": "#/$defs/schema"
        },
        "content": {
          "$ref": "#/$defs/content",
          "minProperties": 1,
          "maxProperties": 1
        }
      },
      "oneOf": [
        {
          "required": [
            "schema"
          ]
        },
        {
          "required": [
            "content"
          ]
        }
      ],
      "dependentSchemas": {
        "schema": {
          "properties": {
            "style": {
              "default": "simple",
              "const": "simple"
            },
            "explode": {
              "default": false,
              "type": "boolean"
            }
          },
          "$ref": "#/$defs/examples"
        }
      },
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "header-or-reference": {
      "if": {
        "type": "object",
        "required": [
          "$ref"
        ]
      },
      "then": {
        "$ref": "#/$defs/reference"
      },
      "else": {
        "$ref": "#/$defs/header"
      }
    },
    "tag": {
      "$comment": "https://spec.openapis.org/oas/v3.1#tag-object",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "externalDocs": {
          "$ref": "#/$defs/external-documentation"
        }
      },
      "required": [
        "name"
      ],
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false
    },
    "reference": {
      "$comment": "https://spec.openapis.org/oas/v3.1#reference-object",
      "type": "object",
      "properties": {
        "$ref": {
          "type": "string",
          "format": "uri-reference"
        },
        "summary": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      }
    },
    "schema": {
      "$comment": "https://spec.openapis.org/oas/v3.1#schema-object",
      "$ref": "https://spec.openapis.org/oas/3.1/dialect/base"
    },
    "security-scheme": {
      "$comment": "https://spec.openapis.org/oas/v3.1#security-scheme-object",
      "type": "object",
      "properties": {
        "type": {
          "enum": [
            "apiKey",
            "http",
            "mutualTLS",
            "oauth2",
            "openIdConnect"
          ]
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ],
      "allOf": [
        {
          "$ref": "#/$defs/specification-extensions"
        },
        {
          "$ref": "#/$defs/security-scheme/$defs/type-apikey"
        },
        {
          "$ref": "#/$defs/security-scheme/$defs/type-http"
        },
        {
          "$ref": "#/$defs/security-scheme/$defs/type-http-bearer"
        },
        {
          "$ref": "#/$defs/security-scheme/$defs/type-oauth2"
        },
        {
          "$ref": "#/$defs/security-scheme/$defs/type-oidc"
        }
      ],
      "unevaluatedProperties": false,
      "$defs": {
        "type-apikey": {
          "if": {
            "properties": {
              "type": {
                "const": "apiKey"
              }
            },
            "required": [
              "type"
            ]
          },
          "then": {
            "properties": {
              "name": {
                "type": "string"
              },
              "in": {
                "enum": [
                  "query",
                  "header",
                  "cookie"
                ]
              }
            },
            "required": [
              "name",
              "in"
            ]
          }
        },
        "type-http": {
          "if": {
            "properties": {
              "type": {
                "const": "http"
              }
            },
            "required": [
              "type"
            ]
          },
          "then": {
            "properties": {
              "scheme": {
                "type": "string"
              }
            },
            "required": [
              "scheme"
            ]
          }
        },
        "type-http-bearer": {
          "if": {
            "properties": {
              "type": {
                "const": "http"
              },
              "scheme": {
                "type": "string",
                "pattern": "^[Bb][Ee][Aa][Rr][Ee][Rr]$"
              }
            },
            "required": [
              "type",
              "scheme"
            ]
          },
          "then": {
            "properties": {
              "bearerFormat": {
                "type": "string"
              }
            }
          }
        },
        "type-oauth2": {
          "if": {
            "properties": {
              "type": {
                "const": "oauth2"
              }
            },
            "required": [
              "type"
            ]
          },
          "then": {
            "properties": {
              "flows": {
                "$ref": "#/$defs/oauth-flows"
              }
            },
            "required": [
              "flows"
            ]
          }
        },
        "type-oidc": {
          "if": {
            "properties": {
              "type": {
                "const": "openIdConnect"
              }
            },
            "required": [
              "type"
            ]
          },
          "then": {
            "properties": {
              "openIdConnectUrl": {
                "type": "string",
                "format": "uri-reference"
              }
            },
            "required": [
              "openIdConnectUrl"
            ]
          }
        }
      }
    },
    "security-scheme-or-reference": {
      "if": {
        "type": "object",
        "required": [
          "$ref"
        ]
      },
      "then": {
        "$ref": "#/$defs/reference"
      },
      "else": {
        "$ref": "#/$defs/security-scheme"
      }
    },
    "oauth-flows": {
      "type": "object",
      "properties": {
        "implicit": {
          "$ref": "#/$defs/oauth-flows/$defs/implicit"
        },
        "password": {
          "$ref": "#/$defs/oauth-flows/$defs/password"
        },
        "clientCredentials": {
          "$ref": "#/$defs/oauth-flows/$defs/client-credentials"
        },
        "authorizationCode": {
          "$ref": "#/$defs/oauth-flows/$defs/authorization-code"
        }
      },
      "$ref": "#/$defs/specification-extensions",
      "unevaluatedProperties": false,
      "$defs": {
        "implicit": {
          "type": "object",
          "properties": {
            "authorizationUrl": {
              "type": "string",
              "format": "uri-reference"
            },
            "refreshUrl": {
              "type": "string",
              "format": "uri-reference"
            },
            "scopes": {
              "$ref": "#/$defs/map-of-strings"
            }
          },
          "required": [
            "authorizationUrl",
            "scopes"
          ],
          "$ref": "#/$defs/specification-extensions",
          "unevaluatedProperties": false
        },
        "password": {
          "type": "object",
          "properties": {
            "tokenUrl": {
              "type": "string",
              "format": "uri-reference"
            },
            "refreshUrl": {
              "type": "string",
              "format": "uri-reference"
            },
            "scopes": {
              "$ref": "#/$defs/map-of-strings"
            }
          },
          "required": [
            "tokenUrl",
            "scopes"
          ],
          "$ref": "#/$defs/specification-extensions",
          "unevaluatedProperties": false
        },
        "client-credentials": {
          "type": "object",
          "properties": {
            "tokenUrl": {
              "type": "string",
              "format": "uri-reference"
            },
            "refreshUrl": {
              "type": "string",
              "format": "uri-reference"
            },
            "scopes": {
              "$ref": "#/$defs/map-of-strings"
            }
          },
          "required": [
            "tokenUrl",
            "scopes"
          ],
          "$ref": "#/$defs/specification-extensions",
          "unevaluatedProperties": false
        },
        "authorization-code": {
          "type": "object",
          "properties": {
            "authorizationUrl": {
              "type": "string",
              "format": "uri-reference"
            },
            "tokenUrl": {
              "type": "string",
              "format": "uri-reference"
            },
            "refreshUrl": {
              "type": "string",
              "format": "uri-reference"
            },
            "scopes": {
              "$ref": "#/$defs/map-of-strings"
            }
          },
          "required": [
            "authorizationUrl",
            "tokenUrl",
            "scopes"
          ],
          "$ref": "#/$defs/specification-extensions",
          "unevaluatedProperties": false
        }
      }
    },
    "security-requirement": {
      "$comment": "https://spec.openapis.org/oas/v3.1#security-requirement-object",
      "type": "object",
      "additionalProperties": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "specification-extensions": {
      "$comment": "https://spec.openapis.org/oas/v3.1#specification-extensions",
      "patternProperties": {
        "^x-": true
      }
    },
    "examples": {
      "properties": {
        "example": true,
        "examples": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/$defs/example-or-reference"
          }
        }
      }
    },
    "map-of-strings": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "styles-for-form": {
      "if": {
        "properties": {
          "style": {
            "const": "form"
          }
        },
        "required": [
          "style"
        ]
      },
      "then": {
        "properties": {
          "explode": {
            "default": true
          }
        }
      },
      "else": {
        "properties": {
          "explode": {
            "default": false
          }
        }
      }
    }
  }
};

// schema/openapi-3-1/schema-base.js
var schema_base_default = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/applicator": true,
    "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": true,
    "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
    "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
    "https://json-schema.org/draft/2020-12/vocab/content": true,
    "https://spec.openapis.org/oas/3.1/vocab/base": false
  },
  "description": "The description of OpenAPI v3.1.x Documents using the OpenAPI JSON Schema dialect",
  "$ref": "https://spec.openapis.org/oas/3.1/schema",
  "properties": {
    "jsonSchemaDialect": { "$ref": "#/$defs/dialect" }
  },
  "$defs": {
    "dialect": { "const": "https://spec.openapis.org/oas/3.1/dialect/base" },
    "schema": {
      "$ref": "https://spec.openapis.org/oas/3.1/dialect/base",
      "properties": {
        "$schema": { "$ref": "#/$defs/dialect" }
      }
    }
  }
};

// schema/openapi-3-1/meta/base.js
var base_default = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "OAS Base Vocabulary",
  "description": "A JSON Schema Vocabulary used in the OpenAPI Schema Dialect",
  "type": ["object", "boolean"],
  "properties": {
    "example": true,
    "discriminator": { "$ref": "#/$defs/discriminator" },
    "externalDocs": { "$ref": "#/$defs/external-docs" },
    "xml": { "$ref": "#/$defs/xml" }
  },
  "$defs": {
    "extensible": {
      "patternProperties": {
        "^x-": true
      }
    },
    "discriminator": {
      "$ref": "#/$defs/extensible",
      "type": "object",
      "properties": {
        "propertyName": {
          "type": "string"
        },
        "mapping": {
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        }
      },
      "required": ["propertyName"],
      "unevaluatedProperties": false
    },
    "external-docs": {
      "$ref": "#/$defs/extensible",
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "format": "uri-reference"
        },
        "description": {
          "type": "string"
        }
      },
      "required": ["url"],
      "unevaluatedProperties": false
    },
    "xml": {
      "$ref": "#/$defs/extensible",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "namespace": {
          "type": "string",
          "format": "uri"
        },
        "prefix": {
          "type": "string"
        },
        "attribute": {
          "type": "boolean"
        },
        "wrapped": {
          "type": "boolean"
        }
      },
      "unevaluatedProperties": false
    }
  }
};

// schema/openapi-3-1/dialect/base.js
var base_default2 = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/applicator": true,
    "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": true,
    "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
    "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
    "https://json-schema.org/draft/2020-12/vocab/content": true,
    "https://spec.openapis.org/oas/3.1/vocab/base": false
  },
  "title": "OpenAPI 3.1 Schema Object Dialect",
  "description": "A JSON Schema dialect describing schemas found in OpenAPI v3.1 Descriptions",
  "allOf": [
    { "$ref": "https://json-schema.org/draft/2020-12/schema" },
    { "$ref": "https://spec.openapis.org/oas/3.1/meta/base" }
  ]
};

// src/ajv.js
var ajv = new import__.default({
  strictTypes: false,
  validateFormats: true,
  allowUnionTypes: true,
  allowMatchingProperties: true
});
(0, import_ajv_formats.default)(ajv);
ajv.addFormat("media-range", {
  type: "string",
  validate: /* @__PURE__ */ __name((value) => {
    return /^[a-z]+\/([a-z0-9\-+.]+|\*)$/i.test(value);
  }, "validate")
});
ajv.addSchema(base_default, "https://spec.openapis.org/oas/3.1/meta/base");
ajv.addSchema(base_default2, "https://spec.openapis.org/oas/3.1/dialect/base");
ajv.addSchema(schema_base_default, "https://spec.openapis.org/oas/3.1/schema-base");
ajv.addSchema(schema_default, "https://spec.openapis.org/oas/3.1/schema");
var OA_DOCUMENT_OBJECT_JSON_SCHEMA_URI = "https://spec.openapis.org/oas/3.1/schema";
ajv.getSchema(OA_DOCUMENT_OBJECT_JSON_SCHEMA_URI);

// src/oa-document-object/validate-oa-document-object.js
function validateOADocumentObject(instance, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format5.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.schemaUri !== void 0) {
    if (typeof options.schemaUri !== "string") {
      throw new import_js_format5.InvalidArgumentError(
        'Option "schemaUri" must be a String, but %v was given.',
        options.schemaUri
      );
    }
  }
  if (options.sourceUri !== void 0) {
    if (typeof options.sourceUri !== "string") {
      throw new import_js_format5.InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri
      );
    }
  }
  const validate = ajv.getSchema(
    `${OA_DOCUMENT_OBJECT_JSON_SCHEMA_URI}${options.schemaUri || ""}`
  );
  const isValid = validate(instance);
  if (!isValid) {
    const error = validate.errors[0];
    let instancePath = error.instancePath || "";
    let sourceUri = options.sourceUri || "";
    if (!options.schemaUri && !options.sourceUri) {
      sourceUri = "#";
    }
    throw new OADocumentObjectValidationError(
      "Value at %v %s.",
      sourceUri && error.instancePath ? [sourceUri, error.instancePath].join("/").replace(/\/+/g, "/") : sourceUri + instancePath,
      error.message.replace(/'/g, '"')
    );
  }
}
__name(validateOADocumentObject, "validateOADocumentObject");

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
var OA_COMPONENT_NAME_REGEX = /^[a-zA-Z0-9.\-_]+$/;
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
var OA_COMPONENT_TYPE_TO_DEFINITION_NAME_MAP = {
  [OAComponentType.SCHEMA]: "schema",
  [OAComponentType.RESPONSE]: "response-or-reference",
  [OAComponentType.PARAMETER]: "parameter-or-reference",
  [OAComponentType.EXAMPLE]: "example-or-reference",
  [OAComponentType.REQUEST_BODY]: "request-body-or-reference",
  [OAComponentType.HEADER]: "header-or-reference",
  [OAComponentType.SECURITY_SCHEME]: "security-scheme-or-reference",
  [OAComponentType.LINK]: "link-or-reference",
  [OAComponentType.CALLBACK]: "callbacks-or-reference",
  [OAComponentType.PATH_ITEM]: "path-item"
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
    },
    paths: {}
  };
  /**
   * Constructor.
   *
   * @param {import('@e22m4u/js-service').ServiceContainer|import('./oa-document-builder.js').OADocumentInput} containerOrDocument
   * @param {import('./oa-document-builder.js').OADocumentInput} document
   */
  constructor(containerOrDocument, document) {
    if ((0, import_js_service.isServiceContainer)(containerOrDocument)) {
      super(containerOrDocument);
    } else {
      super();
      if (containerOrDocument !== void 0) {
        if (!containerOrDocument || typeof containerOrDocument !== "object" || Array.isArray(containerOrDocument)) {
          throw new import_js_format6.InvalidArgumentError(
            'Parameter "containerOrDocument" must be an Object, but %v was given.',
            containerOrDocument
          );
        }
      }
      document = document === void 0 ? containerOrDocument : document;
    }
    if (document !== void 0) {
      if (!document || typeof document !== "object" || Array.isArray(document)) {
        throw new import_js_format6.InvalidArgumentError(
          'Parameter "document" must be an Object, but %v was given.',
          document
        );
      }
      document = structuredClone(document);
      this._document = { ...this._document, ...document };
    }
    validateOADocumentObject(this._document);
  }
  /**
   * Get document object reference.
   *
   * @returns {import('./oa-specification.js').OADocumentObject}
   */
  getDocumentObjectRef() {
    return this._document;
  }
  /**
   * Define component.
   *
   * @param {string} type
   * @param {object} name
   * @param {object} component
   * @returns {this}
   */
  defineComponent(type, name, component) {
    if (!OA_COMPONENT_TYPES.includes(type)) {
      throw new import_js_format6.InvalidArgumentError(
        "Components type %v is not supported.",
        type
      );
    }
    if (!name || typeof name !== "string") {
      throw new import_js_format6.InvalidArgumentError(
        "Component name must be a non-empty String, but %v was given.",
        name
      );
    }
    if (!OA_COMPONENT_NAME_REGEX.test(name)) {
      throw new import_js_format6.InvalidArgumentError(
        "Component name %v contains invalid characters.",
        name
      );
    }
    if (!component || typeof component !== "object" || Array.isArray(component)) {
      throw new import_js_format6.InvalidArgumentError(
        "Component %v must be an Object, but %v was given.",
        name,
        component
      );
    }
    const componentsKey = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!componentsKey) {
      throw new import_js_format6.InvalidArgumentError(
        "Component type %v does not have a reference to the components key.",
        componentsKey
      );
    }
    const definitionName = OA_COMPONENT_TYPE_TO_DEFINITION_NAME_MAP[type];
    if (!definitionName) {
      throw new import_js_format6.InvalidArgumentError(
        "Component type %v does not have a reference to the definition name.",
        definitionName
      );
    }
    validateOADocumentObject(component, {
      schemaUri: `#/$defs/${definitionName}`,
      sourceUri: `#/components/${componentsKey}/${escapeJsonPointer(name)}`
    });
    this._document.components = this._document.components || {};
    this._document.components[componentsKey] = this._document.components[componentsKey] || {};
    this._document.components[componentsKey][name] = structuredClone(component);
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
    if (!OA_COMPONENT_TYPES.includes(type)) {
      throw new import_js_format6.InvalidArgumentError(
        "Components type %v is not supported.",
        type
      );
    }
    if (!name || typeof name !== "string") {
      throw new import_js_format6.InvalidArgumentError(
        "Component name must be a non-empty String, but %v was given.",
        name
      );
    }
    if (!OA_COMPONENT_NAME_REGEX.test(name)) {
      throw new import_js_format6.InvalidArgumentError(
        "Component name %v contains invalid characters.",
        name
      );
    }
    const componentsKey = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!componentsKey) {
      throw new import_js_format6.InvalidArgumentError(
        "Component type %v does not have a reference to the components key.",
        componentsKey
      );
    }
    return Boolean(
      this._document.components && this._document.components[componentsKey] && this._document.components[componentsKey][name]
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
    if (!OA_COMPONENT_TYPES.includes(type)) {
      throw new import_js_format6.InvalidArgumentError(
        "Components type %v is not supported.",
        type
      );
    }
    if (!name || typeof name !== "string") {
      throw new import_js_format6.InvalidArgumentError(
        "Component name must be a non-empty String, but %v was given.",
        name
      );
    }
    if (!OA_COMPONENT_NAME_REGEX.test(name)) {
      throw new import_js_format6.InvalidArgumentError(
        "Component name %v contains invalid characters.",
        name
      );
    }
    const componentsKey = OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP[type];
    if (!componentsKey) {
      throw new import_js_format6.InvalidArgumentError(
        "Component type %v does not have a reference to the components key.",
        type
      );
    }
    const component = this._document && this._document.components && this._document.components[componentsKey] && this._document.components[componentsKey][name];
    if (!component) {
      throw new import_js_format6.InvalidArgumentError(
        'Component "#/components/%s/%s" does not exist.',
        componentsKey,
        name
      );
    }
    return component;
  }
  /**
   * Define schema component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineSchemaComponent(name, component) {
    return this.defineComponent(OAComponentType.SCHEMA, name, component);
  }
  /**
   * Define response component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineResponseComponent(name, component) {
    return this.defineComponent(OAComponentType.RESPONSE, name, component);
  }
  /**
   * Define parameter component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineParameterComponent(name, component) {
    return this.defineComponent(OAComponentType.PARAMETER, name, component);
  }
  /**
   * Define example component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineExampleComponent(name, component) {
    return this.defineComponent(OAComponentType.EXAMPLE, name, component);
  }
  /**
   * Define request body component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineRequestBodyComponent(name, component) {
    return this.defineComponent(OAComponentType.REQUEST_BODY, name, component);
  }
  /**
   * Define header component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineHeaderComponent(name, component) {
    return this.defineComponent(OAComponentType.HEADER, name, component);
  }
  /**
   * Define security scheme component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineSecuritySchemeComponent(name, component) {
    return this.defineComponent(
      OAComponentType.SECURITY_SCHEME,
      name,
      component
    );
  }
  /**
   * Define link component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineLinkComponent(name, component) {
    return this.defineComponent(OAComponentType.LINK, name, component);
  }
  /**
   * Define callback component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  defineCallbackComponent(name, component) {
    return this.defineComponent(OAComponentType.CALLBACK, name, component);
  }
  /**
   * Define path item component.
   *
   * @param {string} name
   * @param {object} component
   * @returns {this}
   */
  definePathItemComponent(name, component) {
    return this.defineComponent(OAComponentType.PATH_ITEM, name, component);
  }
  /**
   * Define operation.
   *
   * @param {import('./oa-document-builder.js').OAOperationDefinition} operationDef
   * @returns {this}
   */
  defineOperation(operationDef) {
    if (!operationDef || typeof operationDef !== "object" || Array.isArray(operationDef)) {
      throw new import_js_format6.InvalidArgumentError(
        "Operation Definition must be an Object, but %v was given.",
        operationDef
      );
    }
    if (typeof operationDef.path !== "string") {
      throw new import_js_format6.InvalidArgumentError(
        'Keyword "path" must be a String, but %v was given.',
        operationDef.path
      );
    }
    if (!operationDef.path.startsWith("/")) {
      throw new import_js_format6.InvalidArgumentError(
        'Keyword "path" must start with "/", but %v was given.',
        operationDef.path
      );
    }
    if (!Object.values(OAOperationMethod).includes(operationDef.method)) {
      throw new import_js_format6.InvalidArgumentError(
        'Keyword "method" must be one of the allowed values, but %v was given.',
        operationDef.method
      );
    }
    if (operationDef.operation !== void 0) {
      if (!operationDef.operation || typeof operationDef.operation !== "object" || Array.isArray(operationDef.operation)) {
        throw new import_js_format6.InvalidArgumentError(
          'Keyword "operation" must be an Object, but %v was given.',
          operationDef.operation
        );
      }
      validateOADocumentObject(operationDef.operation, {
        schemaUri: "#/$defs/operation",
        sourceUri: `#/paths/${escapeJsonPointer(operationDef.path)}/${escapeJsonPointer(operationDef.method)}`
      });
    }
    const operation = operationDef.operation ? structuredClone(operationDef.operation) : {};
    if (!this._document.paths) {
      this._document.paths = {};
    }
    if (!this._document.paths[operationDef.path]) {
      this._document.paths[operationDef.path] = {};
    }
    this._document.paths[operationDef.path][operationDef.method] = operation;
    return this;
  }
  /**
   * Create operation group.
   *
   * @param {import('./oa-operation-group.js').OAOperationGroupOptions} [options]
   * @returns {OAOperationGroup}
   */
  createOperationGroup(options) {
    return new OAOperationGroup(this, options);
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

// src/oa-operation-group.js
var OAOperationGroup = class _OAOperationGroup {
  static {
    __name(this, "OAOperationGroup");
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
      throw new import_js_format7.InvalidArgumentError(
        'Parameter "builder" must be an instance of OADocumentBuilder, but %v was given.',
        builder
      );
    }
    if (!options || typeof options !== "object" || Array.isArray(options)) {
      throw new import_js_format7.InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options
      );
    }
    if (options.pathPrefix !== void 0) {
      if (typeof options.pathPrefix !== "string") {
        throw new import_js_format7.InvalidArgumentError(
          'Option "pathPrefix" must be a String, but %v was given.',
          options.pathPrefix
        );
      }
      if (!options.pathPrefix.startsWith("/")) {
        throw new import_js_format7.InvalidArgumentError(
          'Option "pathPrefix" must start with "/", but %v was given.',
          options.pathPrefix
        );
      }
    }
    if (options.tags !== void 0) {
      if (!Array.isArray(options.tags)) {
        throw new import_js_format7.InvalidArgumentError(
          'Option "tags" must be an Array, but %v was given.',
          options.tags
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== "string") {
          throw new import_js_format7.InvalidArgumentError(
            'Element %v in the option "tags" must be a non-empty String, but %v was given.',
            index,
            tag
          );
        }
      });
    }
    this._builder = builder;
    this._pathPrefix = options.pathPrefix || "/";
    this._tags = [...new Set(options.tags || [])];
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
   * @param {import('./oa-document-builder.js').OAOperationDefinition} operationDef
   * @returns {this}
   */
  defineOperation(operationDef) {
    if (!operationDef || typeof operationDef !== "object" || Array.isArray(operationDef)) {
      throw new import_js_format7.InvalidArgumentError(
        "Operation Definition must be an Object, but %v was given.",
        operationDef
      );
    }
    if (typeof operationDef.path !== "string") {
      throw new import_js_format7.InvalidArgumentError(
        'Keyword "path" must be a String, but %v was given.',
        operationDef.path
      );
    }
    if (!operationDef.path.startsWith("/")) {
      throw new import_js_format7.InvalidArgumentError(
        'Keyword "path" must start with "/", but %v was given.',
        operationDef.path
      );
    }
    if (!Object.values(OAOperationMethod).includes(operationDef.method)) {
      throw new import_js_format7.InvalidArgumentError(
        'Keyword "method" must be one of the allowed values, but %v was given.',
        operationDef.method
      );
    }
    if (operationDef.operation !== void 0) {
      if (!operationDef.operation || typeof operationDef.operation !== "object" || Array.isArray(operationDef.operation)) {
        throw new import_js_format7.InvalidArgumentError(
          'Keyword "operation" must be an Object, but %v was given.',
          operationDef.operation
        );
      }
    }
    let fullPath = this._pathPrefix;
    if (operationDef.path !== "/") {
      if (fullPath === "/") {
        fullPath = operationDef.path;
      } else {
        fullPath += operationDef.path;
      }
    }
    const operation = { ...operationDef.operation };
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
   * Create operation group.
   *
   * @param {object} [options]
   * @returns {OAOperationGroup}
   */
  createOperationGroup(options = {}) {
    if (!options || typeof options !== "object" || Array.isArray(options)) {
      throw new import_js_format7.InvalidArgumentError(
        'Parameter "options" must be an Object, but %v was given.',
        options
      );
    }
    if (options.pathPrefix !== void 0) {
      if (typeof options.pathPrefix !== "string") {
        throw new import_js_format7.InvalidArgumentError(
          'Option "pathPrefix" must be a String, but %v was given.',
          options.pathPrefix
        );
      }
      if (!options.pathPrefix.startsWith("/")) {
        throw new import_js_format7.InvalidArgumentError(
          'Option "pathPrefix" must start with "/", but %v was given.',
          options.pathPrefix
        );
      }
    }
    if (options.tags !== void 0) {
      if (!Array.isArray(options.tags)) {
        throw new import_js_format7.InvalidArgumentError(
          'Option "tags" must be an Array, but %v was given.',
          options.tags
        );
      }
      options.tags.forEach((tag, index) => {
        if (!tag || typeof tag !== "string") {
          throw new import_js_format7.InvalidArgumentError(
            'Element %v in the option "tags" must be a non-empty String, but %v was given.',
            index,
            tag
          );
        }
      });
    }
    let fullPathPrefix = this._pathPrefix;
    if (options.pathPrefix && options.pathPrefix !== "/") {
      if (fullPathPrefix === "/") {
        fullPathPrefix = options.pathPrefix;
      } else {
        fullPathPrefix += options.pathPrefix;
      }
    }
    return new _OAOperationGroup(this._builder, {
      pathPrefix: fullPathPrefix,
      tags: [...this._tags, ...options.tags || []]
    });
  }
};

// src/oa-reference-object/oa-ref.js
var import_js_format8 = require("@e22m4u/js-format");
function oaRef(name, segment) {
  if (!name || typeof name !== "string") {
    throw new import_js_format8.InvalidArgumentError(
      'Parameter "name" must be a non-empty String, but %v was given.',
      name
    );
  }
  if (!OA_COMPONENT_NAME_REGEX.test(name)) {
    throw new import_js_format8.InvalidArgumentError(
      "Component name %v contains invalid characters.",
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
var import_js_format9 = require("@e22m4u/js-format");
function resolveOAReferenceObject(referenceObj, options = {}) {
  if (!referenceObj || typeof referenceObj !== "object" || Array.isArray(referenceObj)) {
    throw new import_js_format9.InvalidArgumentError(
      'Parameter "referenceObj" must be an Object, but %v was given.',
      referenceObj
    );
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new import_js_format9.InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options
    );
  }
  if (options.rootDocument !== void 0) {
    if (!options.rootDocument || typeof options.rootDocument !== "object") {
      throw new import_js_format9.InvalidArgumentError(
        'Option "rootDocument" must be an Object or an Array, but %v was given.',
        options.rootDocument
      );
    }
  }
  if (referenceObj.$ref !== void 0) {
    if (!referenceObj.$ref || typeof referenceObj.$ref !== "string") {
      throw new import_js_format9.InvalidArgumentError(
        'Schema keyword "$ref" must be a non-empty String, but %v was given.',
        referenceObj.$ref
      );
    }
    const refUri = referenceObj.$ref;
    if (refUri.startsWith("#")) {
      if (!options.rootDocument) {
        throw new import_js_format9.InvalidArgumentError(
          'Option "rootDocument" is required to resolve the same-document reference (URI starts with "#").'
        );
      }
      if (refUri === "#") {
        return options.rootDocument;
      } else if (refUri.startsWith("#/")) {
        return resolveJsonPointer(options.rootDocument, refUri.substring(1));
      }
      throw new import_js_format9.InvalidArgumentError(
        "Anchor reference is not supported, but %v was given.",
        refUri
      );
    }
    if (refUri.startsWith("http://") || refUri.startsWith("https://")) {
      throw new import_js_format9.InvalidArgumentError(
        "External resource is not supported, but %v was given.",
        refUri
      );
    }
    throw new import_js_format9.InvalidArgumentError(
      "Relative reference is not supported, but %v was given.",
      refUri
    );
  }
  throw new import_js_format9.InvalidArgumentError(
    "Reference object does not have reference properties."
  );
}
__name(resolveOAReferenceObject, "resolveOAReferenceObject");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OAAccessMode,
  OAApiKeyLocation,
  OAComponentType,
  OADataFormat,
  OADataType,
  OADocumentBuilder,
  OADocumentObjectValidationError,
  OAMediaType,
  OAOperationGroup,
  OAOperationMethod,
  OAParameterLocation,
  OAParameterStyle,
  OASecuritySchemeType,
  OA_COMPONENT_NAME_REGEX,
  OA_COMPONENT_TYPES,
  OA_COMPONENT_TYPE_TO_COMPONENTS_KEY_MAP,
  OA_COMPONENT_TYPE_TO_DEFINITION_NAME_MAP,
  OPENAPI_VERSION,
  escapeJsonPointer,
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
  validateOADocumentObject
});
