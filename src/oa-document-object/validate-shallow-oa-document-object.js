import {InvalidArgumentError} from '@e22m4u/js-format';
import {validateShallowOATagObject} from './validate-shallow-oa-tag-object.js';
import {validateShallowOAInfoObject} from './validate-shallow-oa-info-object.js';
import {validateShallowOAPathsObject} from './validate-shallow-oa-paths-object.js';
import {validateShallowOAServerObject} from './validate-shallow-oa-server-object.js';
import {validateShallowOAWebhooksObject} from './validate-shallow-oa-webhooks-object.js';
import {validateShallowOASecurityRequirementObject} from './validate-shallow-oa-security-requirement-object.js';

/**
 * Document Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#openapi-object
 */
const OA_DOCUMENT_OBJECT_KEYWORDS = [
  'openapi',
  'info',
  'jsonSchemaDialect',
  'servers',
  'paths',
  'webhooks',
  'components',
  'security',
  'tags',
  'externalDocs',
];

/**
 * Validate shallow OADocumentObject.
 *
 * @param {import('../oa-specification.js').OADocumentObject} oaDocumentObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOADocumentObject(
  oaDocumentObject,
  options = {},
) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options,
    );
  }
  if (options.sourceUri !== undefined) {
    if (typeof options.sourceUri !== 'string') {
      throw new InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri,
      );
    }
  }
  const sourceUri = options.sourceUri || '';
  if (
    !oaDocumentObject ||
    typeof oaDocumentObject !== 'object' ||
    Array.isArray(oaDocumentObject)
  ) {
    throw new InvalidArgumentError(
      'OpenAPI Document Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaDocumentObject,
    );
  }
  // [k]
  Object.keys(oaDocumentObject).forEach(keyword => {
    if (
      !/^x-/.test(keyword) &&
      !OA_DOCUMENT_OBJECT_KEYWORDS.includes(keyword)
    ) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // openapi
  if (
    !oaDocumentObject.openapi ||
    typeof oaDocumentObject.openapi !== 'string'
  ) {
    throw new InvalidArgumentError(
      'Keyword "openapi" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaDocumentObject.openapi,
    );
  }
  // info
  if (
    !oaDocumentObject.info ||
    typeof oaDocumentObject.info !== 'object' ||
    Array.isArray(oaDocumentObject.info)
  ) {
    throw new InvalidArgumentError(
      'Keyword "info" at %v must be an Object, but %v was given.',
      sourceUri,
      oaDocumentObject.info,
    );
  }
  validateShallowOAInfoObject(oaDocumentObject.info, {
    sourceUri: `${sourceUri}/info`,
  });
  // jsonSchemaDialect
  if (oaDocumentObject.jsonSchemaDialect !== undefined) {
    if (
      !oaDocumentObject.jsonSchemaDialect ||
      typeof oaDocumentObject.jsonSchemaDialect !== 'string'
    ) {
      throw new InvalidArgumentError(
        'Keyword "jsonSchemaDialect" at %v must be a non-empty String, ' +
          'but %v was given.',
        sourceUri,
        oaDocumentObject.jsonSchemaDialect,
      );
    }
  }
  // servers
  if (oaDocumentObject.servers !== undefined) {
    if (!Array.isArray(oaDocumentObject.servers)) {
      throw new InvalidArgumentError(
        'Keyword "servers" at %v must be an Array, but %v was given.',
        sourceUri,
        oaDocumentObject.servers,
      );
    }
    // servers[n]
    oaDocumentObject.servers.forEach((oaServerObject, index) => {
      if (
        !oaServerObject ||
        typeof oaServerObject !== 'object' ||
        Array.isArray(oaServerObject)
      ) {
        throw new InvalidArgumentError(
          'Element %d at %v must be an Object, but %v was given.',
          index,
          `${sourceUri}/servers`,
          oaServerObject,
        );
      }
      validateShallowOAServerObject(oaServerObject, {
        sourceUri: `${sourceUri}/servers/${index}`,
      });
    });
  }
  // paths
  if (oaDocumentObject.paths !== undefined) {
    if (
      !oaDocumentObject.paths ||
      typeof oaDocumentObject.paths !== 'object' ||
      Array.isArray(oaDocumentObject.paths)
    ) {
      throw new InvalidArgumentError(
        'Keyword "paths" at %v must be an Object, but %v was given.',
        sourceUri,
        oaDocumentObject.paths,
      );
    }
    validateShallowOAPathsObject(oaDocumentObject.paths, {
      sourceUri: `${sourceUri}/paths`,
    });
  }
  // webhooks
  if (oaDocumentObject.webhooks !== undefined) {
    if (
      !oaDocumentObject.webhooks ||
      typeof oaDocumentObject.webhooks !== 'object' ||
      Array.isArray(oaDocumentObject.webhooks)
    ) {
      throw new InvalidArgumentError(
        'Keyword "webhooks" at %v must be an Object, but %v was given.',
        sourceUri,
        oaDocumentObject.webhooks,
      );
    }
    validateShallowOAWebhooksObject(oaDocumentObject.webhooks, {
      sourceUri: `${sourceUri}/webhooks`,
    });
  }
  // components
  if (oaDocumentObject.components !== undefined) {
    if (
      !oaDocumentObject.components ||
      typeof oaDocumentObject.components !== 'object' ||
      Array.isArray(oaDocumentObject.components)
    ) {
      throw new InvalidArgumentError(
        'Keyword "components" at %v must be an Object, but %v was given.',
        sourceUri,
        oaDocumentObject.components,
      );
    }
  }
  // security
  if (oaDocumentObject.security !== undefined) {
    if (!Array.isArray(oaDocumentObject.security)) {
      throw new InvalidArgumentError(
        'Keyword "security" at %v must be an Array, but %v was given.',
        sourceUri,
        oaDocumentObject.security,
      );
    }
    // security[n]
    oaDocumentObject.security.forEach((oaSecurityRequirementObject, index) => {
      if (
        !oaSecurityRequirementObject ||
        typeof oaSecurityRequirementObject !== 'object' ||
        Array.isArray(oaSecurityRequirementObject)
      ) {
        throw new InvalidArgumentError(
          'Element %d at %v must be an Object, but %v was given.',
          index,
          `${sourceUri}/security`,
          oaSecurityRequirementObject,
        );
      }
      validateShallowOASecurityRequirementObject(oaSecurityRequirementObject, {
        sourceUri: `${sourceUri}/security/${index}`,
      });
    });
  }
  // tags
  if (oaDocumentObject.tags !== undefined) {
    if (!Array.isArray(oaDocumentObject.tags)) {
      throw new InvalidArgumentError(
        'Keyword "tags" at %v must be an Array, but %v was given.',
        sourceUri,
        oaDocumentObject.tags,
      );
    }
    // tags[n]
    oaDocumentObject.tags.forEach((oaTagObject, index) => {
      if (
        !oaTagObject ||
        typeof oaTagObject !== 'object' ||
        Array.isArray(oaTagObject)
      ) {
        throw new InvalidArgumentError(
          'Element %d at %v must be an Object, but %v was given.',
          index,
          `${sourceUri}/tags`,
          oaTagObject,
        );
      }
      validateShallowOATagObject(oaTagObject, {
        sourceUri: `${sourceUri}/tags/${index}`,
      });
    });
  }
  // externalDocs
  if (oaDocumentObject.externalDocs !== undefined) {
    if (
      !oaDocumentObject.externalDocs ||
      typeof oaDocumentObject.externalDocs !== 'object' ||
      Array.isArray(oaDocumentObject.externalDocs)
    ) {
      throw new InvalidArgumentError(
        'Keyword "externalDocs" at %v must be an Object, but %v was given.',
        sourceUri,
        oaDocumentObject.externalDocs,
      );
    }
  }
}
