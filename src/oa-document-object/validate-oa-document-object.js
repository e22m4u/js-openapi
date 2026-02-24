import {InvalidArgumentError} from '@e22m4u/js-format';
import {ajv, OA_DOCUMENT_OBJECT_JSON_SCHEMA_URI} from '../ajv.js';
import {OADocumentObjectValidationError} from '../errors/index.js';

/**
 * Validate OADocumentObject.
 *
 * @param {*} instance
 * @param {*} options
 */
export function validateOADocumentObject(instance, options = {}) {
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
  if (options.sourceUri !== undefined) {
    if (typeof options.sourceUri !== 'string') {
      throw new InvalidArgumentError(
        'Option "sourceUri" must be a String, but %v was given.',
        options.sourceUri,
      );
    }
  }
  const validate = ajv.getSchema(
    `${OA_DOCUMENT_OBJECT_JSON_SCHEMA_URI}${options.schemaUri || ''}`,
  );
  const isValid = validate(instance);
  if (!isValid) {
    const error = validate.errors[0];
    let instancePath = error.instancePath || '';
    let sourceUri = options.sourceUri || '';
    if (!options.schemaUri && !options.sourceUri) {
      sourceUri = '#';
    }
    throw new OADocumentObjectValidationError(
      'Value at %v %s.',
      sourceUri && error.instancePath
        ? [sourceUri, error.instancePath].join('/').replace(/\/+/g, '/')
        : sourceUri + instancePath,
      error.message.replace(/'/g, '"'),
    );
  }
}
