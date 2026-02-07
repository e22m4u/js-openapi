import {InvalidArgumentError} from '@e22m4u/js-format';

import {
  OA_PARAMETER_STYLE_LIST,
  OA_PARAMETER_LOCATION_LIST,
} from '../constants.js';
import {OAParameterLocation} from '../oa-specification.js';

/**
 * Parameter Object Keywords.
 * https://spec.openapis.org/oas/v3.1.0#parameter-object
 */
const OA_PARAMETER_OBJECT_KEYWORDS = [
  'name',
  'in',
  'description',
  'required',
  'deprecated',
  'allowEmptyValue',
  'style',
  'explode',
  'allowReserved',
  'schema',
  'content',
  'example',
  'examples',
];

/**
 * Validate shallow OAParameterObject.
 *
 * @param {import('../oa-specification.js').OAParameterObject} oaParameterObject
 * @param {import('./types.js').ShallowValidationOptions} [options]
 */
export function validateShallowOAParameterObject(
  oaParameterObject,
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
    !oaParameterObject ||
    typeof oaParameterObject !== 'object' ||
    Array.isArray(oaParameterObject)
  ) {
    throw new InvalidArgumentError(
      'Parameter Object at %v must be an Object, but %v was given.',
      sourceUri,
      oaParameterObject,
    );
  }
  // [k]
  Object.keys(oaParameterObject).forEach(keyword => {
    if (
      !/^x-/.test(keyword) &&
      !OA_PARAMETER_OBJECT_KEYWORDS.includes(keyword)
    ) {
      throw new InvalidArgumentError(
        'Keyword %v at %v is not supported.',
        keyword,
        sourceUri,
      );
    }
  });
  // name
  if (!oaParameterObject.name || typeof oaParameterObject.name !== 'string') {
    throw new InvalidArgumentError(
      'Keyword "name" at %v must be a non-empty String, but %v was given.',
      sourceUri,
      oaParameterObject.name,
    );
  }
  // in
  if (!OA_PARAMETER_LOCATION_LIST.includes(oaParameterObject.in)) {
    throw new InvalidArgumentError(
      'Keyword "in" at %v must be one of values: %l, but %v was given.',
      sourceUri,
      OA_PARAMETER_LOCATION_LIST,
      oaParameterObject.in,
    );
  }
  // description
  if (oaParameterObject.description !== undefined) {
    if (typeof oaParameterObject.description !== 'string') {
      throw new InvalidArgumentError(
        'Keyword "description" at %v must be a String, but %v was given.',
        sourceUri,
        oaParameterObject.description,
      );
    }
  }
  // required
  if (oaParameterObject.required !== undefined) {
    if (typeof oaParameterObject.required !== 'boolean') {
      throw new InvalidArgumentError(
        'Keyword "required" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaParameterObject.required,
      );
    }
  }
  if (oaParameterObject.in === OAParameterLocation.PATH) {
    if (oaParameterObject.required !== true) {
      throw new InvalidArgumentError(
        'Keyword "required" at %v must be true when "in" is "path", ' +
          'but %v was given.',
        sourceUri,
        oaParameterObject.required,
      );
    }
  }
  // deprecated
  if (oaParameterObject.deprecated !== undefined) {
    if (typeof oaParameterObject.deprecated !== 'boolean') {
      throw new InvalidArgumentError(
        'Keyword "deprecated" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaParameterObject.deprecated,
      );
    }
  }
  // allowEmptyValue
  if (oaParameterObject.allowEmptyValue !== undefined) {
    if (typeof oaParameterObject.allowEmptyValue !== 'boolean') {
      throw new InvalidArgumentError(
        'Keyword "allowEmptyValue" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaParameterObject.allowEmptyValue,
      );
    }
  }
  // style
  if (oaParameterObject.style !== undefined) {
    if (!OA_PARAMETER_STYLE_LIST.includes(oaParameterObject.style)) {
      throw new InvalidArgumentError(
        'Keyword "style" at %v must be one of values: %l, but %v was given.',
        sourceUri,
        OA_PARAMETER_STYLE_LIST,
        oaParameterObject.style,
      );
    }
  }
  // explode
  if (oaParameterObject.explode !== undefined) {
    if (typeof oaParameterObject.explode !== 'boolean') {
      throw new InvalidArgumentError(
        'Keyword "explode" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaParameterObject.explode,
      );
    }
  }
  // allowReserved
  if (oaParameterObject.allowReserved !== undefined) {
    if (typeof oaParameterObject.allowReserved !== 'boolean') {
      throw new InvalidArgumentError(
        'Keyword "allowReserved" at %v must be a Boolean, but %v was given.',
        sourceUri,
        oaParameterObject.allowReserved,
      );
    }
  }
  // schema
  if (oaParameterObject.schema !== undefined) {
    if (
      typeof oaParameterObject.schema !== 'boolean' &&
      (!oaParameterObject.schema ||
        typeof oaParameterObject.schema !== 'object' ||
        Array.isArray(oaParameterObject.schema))
    ) {
      throw new InvalidArgumentError(
        'Keyword "schema" at %v must be a Boolean or an Object, ' +
          'but %v was given.',
        sourceUri,
        oaParameterObject.schema,
      );
    }
  }
  // content
  if (oaParameterObject.content !== undefined) {
    if (
      !oaParameterObject.content ||
      typeof oaParameterObject.content !== 'object' ||
      Array.isArray(oaParameterObject.content)
    ) {
      throw new InvalidArgumentError(
        'Keyword "content" at %v must be an Object, but %v was given.',
        sourceUri,
        oaParameterObject.content,
      );
    }
  }
  // examples
  if (oaParameterObject.examples !== undefined) {
    if (
      !oaParameterObject.examples ||
      typeof oaParameterObject.examples !== 'object' ||
      Array.isArray(oaParameterObject.examples)
    ) {
      throw new InvalidArgumentError(
        'Keyword "examples" at %v must be an Object, but %v was given.',
        sourceUri,
        oaParameterObject.examples,
      );
    }
  }
  // согласно спецификации OpenAPI 3.1.0 (и более ранних),
  // параметр должен содержать либо "schema", либо "content",
  // но не оба сразу
  if (
    oaParameterObject.schema === undefined &&
    oaParameterObject.content === undefined
  ) {
    throw new InvalidArgumentError(
      'Parameter Object at %v must contain ' +
        'either "schema" or "content" keyword.',
      sourceUri,
    );
  }
  if (
    oaParameterObject.schema !== undefined &&
    oaParameterObject.content !== undefined
  ) {
    throw new InvalidArgumentError(
      'Parameter Object at %v cannot contain ' +
        'both "schema" and "content" keywords.',
      sourceUri,
    );
  }
}
