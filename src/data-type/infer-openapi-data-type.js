import {InvalidArgumentError} from '@e22m4u/js-format';
import {OADataType} from '../oa-specification.js';

/**
 * Infer OpenAPI data type.
 *
 * @param {*} data
 * @param {boolean} [returnJsTypeOnFail]
 * @returns {OADataType}
 */
export function inferOpenApiDataType(data, returnJsTypeOnFail = false) {
  if (data === null) {
    return OADataType.NULL;
  }
  if (Array.isArray(data)) {
    return OADataType.ARRAY;
  }
  const jsType = typeof data;
  switch (jsType) {
    case 'string':
      return OADataType.STRING;
    case 'boolean':
      return OADataType.BOOLEAN;
    case 'number':
      return Number.isInteger(data) ? OADataType.INTEGER : OADataType.NUMBER;
    case 'bigint':
      return OADataType.INTEGER;
    case 'object':
      return OADataType.OBJECT;
  }
  if (returnJsTypeOnFail === true) {
    return jsType;
  }
  throw new InvalidArgumentError(
    'Unable to infer the data type from %v value.',
    data,
  );
}
