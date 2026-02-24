import {InvalidArgumentError} from '@e22m4u/js-format';
import {ajv, OA_DOCUMENT_OBJECT_JSON_SCHEMA_URI} from '../ajv.js';
import {OADocumentObjectValidationError} from '../errors/index.js';

/**
 * Validate OADocumentObject.
 *
 * @param {*}      instance  Проверяемый экземпляр.
 * @param {object} [options] Параметры проверки.
 * @param {string} [options.schemaUri]
 *   URI участка JSON-схемы, согласно которому будет
 *   выполняться проверка (прим. "#/$defs/operation").
 *   Используется, если нужно проверить часть OpenAPI
 *   документа, когда в первый аргумент данной функции
 *   передается только проверяемый участок.
 * @param {string} [options.sourceUri]
 *   Строка добавляется префиксом к URI проблемного
 *   значения в сообщении об ошибке (прим. "#/paths/~1/get").
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
    // если URI схемы и источника экземпляра не определен,
    // значит ошибка вызвана при проверке целого OpenAPI
    // документа, и в таком случае, сообщение об ошибке
    // должно содержать путь экземпляра с префиксом "#",
    // указывающем на корень документа, пример: "#/info"
    if (!options.schemaUri && !options.sourceUri) {
      sourceUri = '#';
    }
    // если передан URI источника экземпляра, то значение
    // объединяется с путем экземпляра косой чертой,
    // пример: "#/components/schemas/city" + "/type"
    const sourceUriWithInstancePath =
      sourceUri && instancePath
        ? [sourceUri, instancePath].join('/').replace(/\/+/g, '/')
        : sourceUri + instancePath;
    const errorReason = error.message.replace(/'/g, '"');
    // при создании ошибки выполняется интерполяция сообщения,
    // пример: Value at "#" must have required property "info".
    const validationError = new OADocumentObjectValidationError(
      'Value at %v %s.',
      sourceUriWithInstancePath,
      errorReason,
    );
    // в экземпляр ошибки устанавливаются
    // дополнительные свойства из данных AJV
    validationError.instancePath = error.instancePath;
    validationError.reason = errorReason;
    throw validationError;
  }
}
