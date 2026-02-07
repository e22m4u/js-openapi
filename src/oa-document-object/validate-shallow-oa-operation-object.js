import {InvalidArgumentError} from '@e22m4u/js-format';
import {isOAReferenceObject} from '../oa-reference-object/index.js';
import {validateShallowOAServerObject} from './validate-shallow-oa-server-object.js';
import {validateShallowOAParameterObject} from './validate-shallow-oa-parameter-object.js';
import {validateShallowOAReferenceObject} from './validate-shallow-oa-reference-object.js';
import {validateShallowOAResponsesObject} from './validate-shallow-oa-responses-object.js';
import {validateShallowOACallbacksObject} from './validate-shallow-oa-callbacks-object.js';
import {validateShallowOARequestBodyObject} from './validate-shallow-oa-request-body-object.js';
import {validateShallowOASecurityRequirementObject} from './validate-shallow-oa-security-requirement-object.js';
import {validateShallowOAExternalDocumentationObject} from './validate-shallow-oa-external-documentation-object.js';

/**
 * Operation Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#operation-object
 */
const OA_OPERATION_OBJECT_KEYWORDS = [
  'tags',
  'summary',
  'description',
  'externalDocs',
  'operationId',
  'parameters',
  'requestBody',
  'responses',
  'callbacks',
  'deprecated',
  'security',
  'servers',
];

/**
 * Validate shallow OAOperationObject.
 *
 * @param {import('../oa-specification.js').OAOperationObject} oaOperationObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAOperationObject(
  oaOperationObject,
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
    !oaOperationObject ||
    typeof oaOperationObject !== 'object' ||
    Array.isArray(oaOperationObject)
  ) {
    throw new InvalidArgumentError(
      'Operation Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaOperationObject,
    );
  }
  // [k]
  Object.keys(oaOperationObject).forEach(keyword => {
    if (
      !/^x-/.test(keyword) &&
      !OA_OPERATION_OBJECT_KEYWORDS.includes(keyword)
    ) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // tags
  if (oaOperationObject.tags !== undefined) {
    if (!Array.isArray(oaOperationObject.tags)) {
      throw new InvalidArgumentError(
        'Keyword "tags" at %v must be an Array, but %v was given.',
        sourceUri,
        oaOperationObject.tags,
      );
    }
    // tags[n]
    oaOperationObject.tags.forEach((oaTagName, index) => {
      if (!oaTagName || typeof oaTagName !== 'string') {
        throw new InvalidArgumentError(
          'Element %v at %v must be a non-empty String, but %v was given.',
          index,
          `${sourceUri}/tags`,
          oaTagName,
        );
      }
    });
  }
  // summary
  if (oaOperationObject.summary !== undefined) {
    if (typeof oaOperationObject.summary !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "summary" at %v must be a String, but %v was given.',
        sourceUri,
        oaOperationObject.summary,
      );
    }
  }
  // description
  if (oaOperationObject.description !== undefined) {
    if (typeof oaOperationObject.description !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaOperationObject.description,
      );
    }
  }
  // externalDocs
  if (oaOperationObject.externalDocs !== undefined) {
    if (
      !oaOperationObject.externalDocs ||
      typeof oaOperationObject.externalDocs !== 'object' ||
      Array.isArray(oaOperationObject.externalDocs)
    ) {
      throw new InvalidArgumentError(
        'Keyword "externalDocs" at %v must be an Object, but %v was given.',
        sourceUri,
        oaOperationObject.externalDocs,
      );
    }
    validateShallowOAExternalDocumentationObject(
      oaOperationObject.externalDocs,
      {sourceUri: `${sourceUri}/externalDocs`},
    );
  }
  // operationId
  if (oaOperationObject.operationId !== undefined) {
    if (
      !oaOperationObject.operationId ||
      typeof oaOperationObject.operationId !== 'string'
    ) {
      throw new InvalidArgumentError(
        'Keyword "operationId" at %v must be a non-empty String, ' +
          'but %v was given.',
        sourceUri,
        oaOperationObject.operationId,
      );
    }
  }
  // parameters
  if (oaOperationObject.parameters !== undefined) {
    if (!Array.isArray(oaOperationObject.parameters)) {
      throw new InvalidArgumentError(
        'Keyword "parameters" at %v must be an Array, but %v was given.',
        sourceUri,
        oaOperationObject.parameters,
      );
    }
    // parameters[n]
    oaOperationObject.parameters.forEach((oaParameterObject, index) => {
      if (
        !oaParameterObject ||
        typeof oaParameterObject !== 'object' ||
        Array.isArray(oaParameterObject)
      ) {
        throw new InvalidArgumentError(
          'Element %v at %v must be an Object, but %v was given.',
          index,
          `${sourceUri}/parameters`,
          oaParameterObject,
        );
      }
      if (isOAReferenceObject(oaParameterObject)) {
        validateShallowOAReferenceObject(oaParameterObject, {
          sourceUri: `${sourceUri}/parameters/${index}`,
        });
      } else {
        validateShallowOAParameterObject(oaParameterObject, {
          sourceUri: `${sourceUri}/parameters/${index}`,
        });
      }
    });
  }
  // requestBody
  if (oaOperationObject.requestBody !== undefined) {
    if (
      !oaOperationObject.requestBody ||
      typeof oaOperationObject.requestBody !== 'object' ||
      Array.isArray(oaOperationObject.requestBody)
    ) {
      throw new InvalidArgumentError(
        'Keyword "requestBody" at %v must be an Object, but %v was given.',
        sourceUri,
        oaOperationObject.requestBody,
      );
    }
    if (isOAReferenceObject(oaOperationObject.requestBody)) {
      validateShallowOAReferenceObject(oaOperationObject.requestBody, {
        sourceUri: `${sourceUri}/requestBody`,
      });
    } else {
      validateShallowOARequestBodyObject(oaOperationObject.requestBody, {
        sourceUri: `${sourceUri}/requestBody`,
      });
    }
  }
  // responses
  if (oaOperationObject.responses !== undefined) {
    if (
      !oaOperationObject.responses ||
      typeof oaOperationObject.responses !== 'object' ||
      Array.isArray(oaOperationObject.responses)
    ) {
      throw new InvalidArgumentError(
        'Keyword "responses" at %v must be an Object, but %v was given.',
        sourceUri,
        oaOperationObject.responses,
      );
    }
    validateShallowOAResponsesObject(oaOperationObject.responses, {
      sourceUri: `${sourceUri}/responses`,
    });
  }
  // callbacks
  if (oaOperationObject.callbacks !== undefined) {
    if (
      !oaOperationObject.callbacks ||
      typeof oaOperationObject.callbacks !== 'object' ||
      Array.isArray(oaOperationObject.callbacks)
    ) {
      throw new InvalidArgumentError(
        'Keyword "callbacks" at %v must be an Object, but %v was given.',
        sourceUri,
        oaOperationObject.callbacks,
      );
    }
    validateShallowOACallbacksObject(oaOperationObject.callbacks, {
      sourceUri: `${sourceUri}/callbacks`,
    });
  }
  // deprecated
  if (oaOperationObject.deprecated !== undefined) {
    if (typeof oaOperationObject.deprecated !== 'boolean') {
      throw new InvalidArgumentError(
        'Keyword "deprecated" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaOperationObject.deprecated,
      );
    }
  }
  // security
  if (oaOperationObject.security !== undefined) {
    if (!Array.isArray(oaOperationObject.security)) {
      throw new InvalidArgumentError(
        'Keyword "security" at %v must be an Array, but %v was given.',
        sourceUri,
        oaOperationObject.security,
      );
    }
    // security[n]
    oaOperationObject.security.forEach((oaSecurityRequirementObject, index) => {
      if (
        !oaSecurityRequirementObject ||
        typeof oaSecurityRequirementObject !== 'object' ||
        Array.isArray(oaSecurityRequirementObject)
      ) {
        throw new InvalidArgumentError(
          'Element %v at %v must be an Object, but %v was given.',
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
  // servers
  if (oaOperationObject.servers !== undefined) {
    if (!Array.isArray(oaOperationObject.servers)) {
      throw new InvalidArgumentError(
        'Keyword "servers" at %v must be an Array, but %v was given.',
        sourceUri,
        oaOperationObject.servers,
      );
    }
    // servers[n]
    oaOperationObject.servers.forEach((oaServerObject, index) => {
      if (
        !oaServerObject ||
        typeof oaServerObject !== 'object' ||
        Array.isArray(oaServerObject)
      ) {
        throw new InvalidArgumentError(
          'Element %v at %v must be an Object, but %v was given.',
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
}
