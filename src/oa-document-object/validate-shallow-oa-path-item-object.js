import {InvalidArgumentError} from '@e22m4u/js-format';
import {isOAReferenceObject} from '../oa-reference-object/index.js';
import {validateShallowOAServerObject} from './validate-shallow-oa-server-object.js';
import {validateShallowOAOperationObject} from './validate-shallow-oa-operation-object.js';
import {validateShallowOAParameterObject} from './validate-shallow-oa-parameter-object.js';
import {validateShallowOAReferenceObject} from './validate-shallow-oa-reference-object.js';

/**
 * Path Item Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#path-item-object
 */
const OA_PATH_ITEM_OBJECT_KEYWORDS = [
  '$ref',
  'summary',
  'description',
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
  'servers',
  'parameters',
];

/**
 * Validate shallow OAPathItemObject.
 *
 * @param {import('../oa-specification.js').OAPathItemObject} oaPathItemObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAPathItemObject(
  oaPathItemObject,
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
    !oaPathItemObject ||
    typeof oaPathItemObject !== 'object' ||
    Array.isArray(oaPathItemObject)
  ) {
    throw new InvalidArgumentError(
      'OpenAPI Path Item Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaPathItemObject,
    );
  }
  // [k]
  Object.keys(oaPathItemObject).forEach(keyword => {
    if (
      !/^x-/.test(keyword) &&
      !OA_PATH_ITEM_OBJECT_KEYWORDS.includes(keyword)
    ) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // $ref
  if (oaPathItemObject.$ref !== undefined) {
    if (typeof oaPathItemObject.$ref !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "$ref" at %v must be a String, but %v was given.',
        sourceUri,
        oaPathItemObject.$ref,
      );
    }
  }
  // summary
  if (oaPathItemObject.summary !== undefined) {
    if (typeof oaPathItemObject.summary !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "summary" at %v must be a String, but %v was given.',
        sourceUri,
        oaPathItemObject.summary,
      );
    }
  }
  // description
  if (oaPathItemObject.description !== undefined) {
    if (typeof oaPathItemObject.description !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaPathItemObject.description,
      );
    }
  }
  // methods
  ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'].forEach(
    keyword => {
      if (oaPathItemObject[keyword] !== undefined) {
        if (
          !oaPathItemObject[keyword] ||
          typeof oaPathItemObject[keyword] !== 'object' ||
          Array.isArray(oaPathItemObject[keyword])
        ) {
          throw new InvalidArgumentError(
            'Keyword %v at %v must be an Object, but %v was given.',
            keyword,
            sourceUri,
            oaPathItemObject[keyword],
          );
        }
        validateShallowOAOperationObject(oaPathItemObject[keyword], {
          sourceUri: `${sourceUri}/${keyword}`,
        });
      }
    },
  );
  // servers
  if (oaPathItemObject.servers !== undefined) {
    if (!Array.isArray(oaPathItemObject.servers)) {
      throw new InvalidArgumentError(
        'Keyword "servers" at %v must be an Array, but %v was given.',
        sourceUri,
        oaPathItemObject.servers,
      );
    }
    // servers[n]
    oaPathItemObject.servers.forEach((oaServerObject, index) => {
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
  // parameters
  if (oaPathItemObject.parameters !== undefined) {
    if (!Array.isArray(oaPathItemObject.parameters)) {
      throw new InvalidArgumentError(
        'Keyword "parameters" at %v must be an Array, but %v was given.',
        sourceUri,
        oaPathItemObject.parameters,
      );
    }
    // parameters[n]
    oaPathItemObject.parameters.forEach((oaParameterObject, index) => {
      if (
        !oaParameterObject ||
        typeof oaParameterObject !== 'object' ||
        Array.isArray(oaParameterObject)
      ) {
        throw new InvalidArgumentError(
          'Element %d at %v must be an Object, but %v was given.',
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
}
