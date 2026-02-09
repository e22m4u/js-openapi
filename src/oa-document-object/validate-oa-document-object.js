import {InvalidArgumentError} from '@e22m4u/js-format';
import {ajv, OA_DOCUMENT_OBJECT_JSON_SCHEMA_URI} from '../ajv.js';

/**
 * Validate OADocumentObject.
 *
 * @param {*} data
 * @param {*} options
 */
export function validateOADocumentObject(data, options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options,
    );
  }
  if (options.schemaUri !== undefined) {
    if (typeof options.schemaUri !== 'string') {
      throw new InvalidArgumentError(
        'Option "schemaUri" must be a String, but %v was given.',
        options.schemaUri,
      );
    }
  }
  if (options.dataSourceUri !== undefined) {
    if (typeof options.dataSourceUri !== 'string') {
      throw new InvalidArgumentError(
        'Option "dataSourceUri" must be a String, but %v was given.',
        options.dataSourceUri,
      );
    }
  }
  const validate = ajv.getSchema(
    `${OA_DOCUMENT_OBJECT_JSON_SCHEMA_URI}${options.schemaUri || ''}`,
  );
  const isValid = validate(data);
  if (!isValid) {
    const error = validate.errors[0];
    throw new InvalidArgumentError(
      'Value at %v %s.',
      options.dataSourceUri && error.instancePath
        ? [options.dataSourceUri, error.instancePath]
            .join('/')
            .replace(/\/+/g, '/')
        : (options.dataSourceUri || '') + (error.instancePath || ''),
      error.message.replace(/'/g, '"'),
    );
  }
}
