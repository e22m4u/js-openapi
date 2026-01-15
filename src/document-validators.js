import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Validate shallow OADocumentObject.
 *
 * @param {object} documentObject
 */
export function validateShallowOADocumentObject(documentObject) {
  if (
    !documentObject ||
    typeof documentObject !== 'object' ||
    Array.isArray(documentObject)
  ) {
    throw new InvalidArgumentError(
      'OpenAPI Document Object must be an Object, but %v was given.',
      documentObject,
    );
  }
  // openapi
  if (!documentObject.openapi || typeof documentObject.openapi !== 'string') {
    throw new InvalidArgumentError(
      'Property "openapi" must be a non-empty String, but %v was given.',
      documentObject.openapi,
    );
  }
  // info
  if (
    !documentObject.info ||
    typeof documentObject.info !== 'object' ||
    Array.isArray(documentObject.info)
  ) {
    throw new InvalidArgumentError(
      'Property "info" must be an Object, but %v was given.',
      documentObject.info,
    );
  }
  // jsonSchemaDialect
  if (documentObject.jsonSchemaDialect !== undefined) {
    if (
      !documentObject.jsonSchemaDialect ||
      typeof documentObject.jsonSchemaDialect !== 'string'
    ) {
      throw new InvalidArgumentError(
        'Property "jsonSchemaDialect" must be a non-empty String, ' +
          'but %v was given.',
        documentObject.jsonSchemaDialect,
      );
    }
  }
  // servers
  if (documentObject.servers !== undefined) {
    if (!Array.isArray(documentObject.servers)) {
      throw new InvalidArgumentError(
        'Property "servers" must be an Array, but %v was given.',
        documentObject.servers,
      );
    }
    documentObject.servers.forEach((serverObject, index) => {
      if (
        !serverObject ||
        typeof serverObject !== 'object' ||
        Array.isArray(serverObject)
      ) {
        throw new InvalidArgumentError(
          'Element "servers[%d]" must be an Object, but %v was given.',
          index,
          serverObject,
        );
      }
    });
  }
  // paths
  if (documentObject.paths !== undefined) {
    if (
      !documentObject.paths ||
      typeof documentObject.paths !== 'object' ||
      Array.isArray(documentObject.paths)
    ) {
      throw new InvalidArgumentError(
        'Property "paths" must be an Object, but %v was given.',
        documentObject.paths,
      );
    }
  }
  // webhooks
  if (documentObject.webhooks !== undefined) {
    if (
      !documentObject.webhooks ||
      typeof documentObject.webhooks !== 'object' ||
      Array.isArray(documentObject.webhooks)
    ) {
      throw new InvalidArgumentError(
        'Property "webhooks" must be an Object, but %v was given.',
        documentObject.webhooks,
      );
    }
  }
  // components
  if (documentObject.components !== undefined) {
    if (
      !documentObject.components ||
      typeof documentObject.components !== 'object' ||
      Array.isArray(documentObject.components)
    ) {
      throw new InvalidArgumentError(
        'Property "components" must be an Object, but %v was given.',
        documentObject.components,
      );
    }
  }
  // security
  if (documentObject.security !== undefined) {
    if (!Array.isArray(documentObject.security)) {
      throw new InvalidArgumentError(
        'Property "security" must be an Array, but %v was given.',
        documentObject.security,
      );
    }
    documentObject.security.forEach((securityRequirementObject, index) => {
      if (
        !securityRequirementObject ||
        typeof securityRequirementObject !== 'object' ||
        Array.isArray(securityRequirementObject)
      ) {
        throw new InvalidArgumentError(
          'Element "security[%d]" must be an Object, but %v was given.',
          index,
          securityRequirementObject,
        );
      }
    });
  }
  // tags
  if (documentObject.tags !== undefined) {
    if (!Array.isArray(documentObject.tags)) {
      throw new InvalidArgumentError(
        'Property "tags" must be an Array, but %v was given.',
        documentObject.tags,
      );
    }
    documentObject.tags.forEach((tagObject, index) => {
      if (
        !tagObject ||
        typeof tagObject !== 'object' ||
        Array.isArray(tagObject)
      ) {
        throw new InvalidArgumentError(
          'Element "tags[%d]" must be an Object, but %v was given.',
          index,
          tagObject,
        );
      }
    });
  }
  // externalDocs
  if (documentObject.externalDocs !== undefined) {
    if (
      !documentObject.externalDocs ||
      typeof documentObject.externalDocs !== 'object' ||
      Array.isArray(documentObject.externalDocs)
    ) {
      throw new InvalidArgumentError(
        'Property "externalDocs" must be an Object, but %v was given.',
        documentObject.externalDocs,
      );
    }
  }
}
