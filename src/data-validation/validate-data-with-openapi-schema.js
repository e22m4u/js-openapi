import {ACCESS_MODE_LIST} from '../constants.js';
import {countUnicode} from '../utils/count-unicode.js';
import {toSpacedJson} from '../utils/to-spaced-json.js';
import {toPascalCase} from '../utils/to-pascal-case.js';
import {OADataValidationError} from '../errors/index.js';
import {inferOpenApiDataType} from '../data-type/index.js';
import {format, InvalidArgumentError} from '@e22m4u/js-format';
import {OADataType, OAAccessMode} from '../oa-specification.js';
import {resolveOAReferenceObject} from '../oa-reference-object/index.js';
import {OA_BUILT_IN_DATA_FORMAT_VALIDATOR_MAP} from './data-format-validator-map.js';

/**
 * Регулярное выражение для целых чисел в формате JSON.
 * Согласно RFC 8259, не допускает дробной части,
 * экспоненты и явного знака "+".
 */
export const JSON_INTEGER_REGEXP = /^-?\d+$/;

/**
 * Регулярное выражение для чисел в формате JSON.
 * Поддерживает дробную часть и научную нотацию
 * (например, -1.5e+10).
 */
export const JSON_NUMBER_REGEXP = /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/;

/**
 * Unsupported schema properties.
 */
const UNSUPPORTED_SCHEMA_KEYWORDS = [
  'nullable', // удалено в 3.1.0
  '$dynamicRef',
  'contentEncoding',
  'contentMediaType',
  'contentSchema',
  'discriminator',
];

/**
 * Validate data with OpenAPI Schema.
 *
 * @param {*} data
 * @param {boolean|object} schema
 * @param {object} [options]
 * @returns {object}
 */
export function validateDataWithOpenApiSchema(data, schema, options = {}) {
  if (
    schema === null ||
    (typeof schema !== 'boolean' && typeof schema !== 'object') ||
    Array.isArray(schema)
  ) {
    throw new InvalidArgumentError(
      'Parameter "schema" must be a Boolean or an Object, but %v was given.',
      schema,
    );
  }
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options,
    );
  }
  if (options.rootDocument !== undefined) {
    if (
      !options.rootDocument ||
      typeof options.rootDocument !== 'object' ||
      Array.isArray(options.rootDocument)
    ) {
      throw new InvalidArgumentError(
        'Option "rootDocument" must be an Object, but %v was given.',
        options.rootDocument,
      );
    }
  }
  if (options.required !== undefined) {
    if (typeof options.required !== 'boolean') {
      throw new InvalidArgumentError(
        'Option "required" must be a Boolean, but %v was given.',
        options.required,
      );
    }
  }
  if (options.coerceTypes !== undefined) {
    if (typeof options.coerceTypes !== 'boolean') {
      throw new InvalidArgumentError(
        'Option "coerceTypes" must be a Boolean, but %v was given.',
        options.coerceTypes,
      );
    }
  }
  if (options.applyDefaults !== undefined) {
    if (typeof options.applyDefaults !== 'boolean') {
      throw new InvalidArgumentError(
        'Option "applyDefaults" must be a Boolean, but %v was given.',
        options.applyDefaults,
      );
    }
  }
  if (options.stripUnknown !== undefined) {
    if (typeof options.stripUnknown !== 'boolean') {
      throw new InvalidArgumentError(
        'Option "stripUnknown" must be a Boolean, but %v was given.',
        options.stripUnknown,
      );
    }
  }
  if (options.dataSourceUri !== undefined) {
    if (!options.dataSourceUri || typeof options.dataSourceUri !== 'string') {
      throw new InvalidArgumentError(
        'Option "dataSourceUri" must be a non-empty String, but %v was given.',
        options.dataSourceUri,
      );
    }
  }
  if (options.schemaSourceUri !== undefined) {
    if (
      !options.schemaSourceUri ||
      typeof options.schemaSourceUri !== 'string'
    ) {
      throw new InvalidArgumentError(
        'Option "schemaSourceUri" must be a non-empty String, ' +
          'but %v was given.',
        options.schemaSourceUri,
      );
    }
  }
  if (options.silent !== undefined) {
    if (typeof options.silent !== 'boolean') {
      throw new InvalidArgumentError(
        'Option "silent" must be a Boolean, but %v was given.',
        options.silent,
      );
    }
  }
  if (options.accessMode !== undefined) {
    if (!ACCESS_MODE_LIST.includes(options.accessMode)) {
      throw new InvalidArgumentError(
        'Access mode %v is not supported.',
        options.accessMode,
      );
    }
  }
  if (options.formatValidators !== undefined) {
    if (
      !options.formatValidators ||
      typeof options.formatValidators !== 'object' ||
      Array.isArray(options.formatValidators)
    ) {
      throw new InvalidArgumentError(
        'Option "formatValidators" must be an Object, but %v was given.',
        options.formatValidators,
      );
    }
    Object.keys(options.formatValidators).forEach(formatName => {
      const formatValidator = options.formatValidators[formatName];
      if (
        formatValidator !== undefined &&
        typeof formatValidator !== 'function'
      ) {
        throw new InvalidArgumentError(
          'Format validator %v must be a Function, but %v was given.',
          formatName,
          formatValidator,
        );
      }
    });
  }
  if (options.parseJson !== undefined) {
    if (typeof options.parseJson !== 'boolean') {
      throw new InvalidArgumentError(
        'Option "parseJson" must be a Boolean, but %v was given.',
        options.parseJson,
      );
    }
  }
  // если обязательное значение является
  // undefined, то выбрасывается ошибка
  if (options.required === true && data === undefined) {
    const result = {
      isValid: false,
      value: data,
      valueUri: options.dataSourceUri || '',
      schemaUri: options.schemaSourceUri || '',
      reason: format(
        'Value at %v is required, but %v was given.',
        options.dataSourceUri || '',
        data,
      ),
    };
    if (!options.silent) {
      throw new OADataValidationError(result.reason);
    } else {
      return result;
    }
  }
  const subResult = _validate(data, schema, {
    ...options,
    dataSourceUri: options.dataSourceUri || '',
    schemaSourceUri: options.schemaSourceUri || '',
  });
  // если данные не прошли проверку, а тихий
  // режим отключен, то выбрасывается ошибка
  if (!subResult.isValid && !options.silent) {
    throw new OADataValidationError(subResult.reason);
  }
  const result = {
    isValid: subResult.isValid,
    reason: subResult.reason,
    value: subResult.value,
    valueUri: subResult.valueUri,
    schemaUri: subResult.schemaUri,
  };
  // если проверка выполнена успешно,
  // то из результата исключается "reason"
  if (result.isValid) {
    delete result.reason;
  }
  return result;
}

/**
 * Validate (internal).
 *
 * @param {*} data
 * @param {boolean|object} schema
 * @param {object} options
 * @returns {object}
 */
function _validate(data, schema, options) {
  if (
    schema === null ||
    (typeof schema !== 'boolean' && typeof schema !== 'object') ||
    Array.isArray(schema)
  ) {
    throw new InvalidArgumentError(
      'Schema at %v must be a Boolean or an Object, but %v was given.',
      options.schemaSourceUri,
      schema,
    );
  }
  // если схема является логическим значением,
  // то значение используется как правило допуска
  if (typeof schema === 'boolean') {
    if (schema === true) {
      return {
        isValid: true,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
      };
    } else if (data !== undefined) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Value at %v is rejected by the boolean schema at %v.',
          options.dataSourceUri,
          options.schemaSourceUri,
        ),
      };
    }
  }
  // сеты для сбора проверенных индексов массива
  // и свойств объекта на текущем уровне вложенности
  let evaluatedIndexes = new Set();
  let evaluatedProperties = new Set();
  // если параметр "applyDefaults" имеет значение true,
  // а исходным значением является undefined, то исходное
  // значение подменяется значением по умолчанию
  if (
    schema.default !== undefined &&
    data === undefined &&
    options.applyDefaults === true
  ) {
    data = schema.default;
  }
  // parse json
  if (
    options.parseJson === true &&
    schema.type !== undefined &&
    typeof data === 'string'
  ) {
    data = _parseJson(data, schema.type);
  }
  // coerce type
  if (
    options.coerceTypes === true &&
    schema.type !== undefined &&
    data !== undefined
  ) {
    data = _coerceType(data, schema.type);
  }
  // если текущая схема содержит свойство "$ref",
  // то выполняется извлечение целевой схемы
  // и проверка данных
  if (schema.$ref !== undefined) {
    const resSchema = resolveOAReferenceObject(schema, {
      rootDocument: options.rootDocument,
    });
    const result = _validate(data, resSchema, {
      ...options,
      schemaSourceUri: schema.$ref,
    });
    if (!result.isValid) {
      return result;
    }
    // данные могли измениться во время рекурсии,
    // выполняется обновление исходного значения
    data = result.value;
    // внедрение аннотаций о проверенных индексах
    // из результата успешной проверки
    if (result.evaluatedIndexes) {
      evaluatedIndexes = new Set([
        ...evaluatedIndexes,
        ...result.evaluatedIndexes,
      ]);
    }
    // внедрение аннотаций о проверенных свойствах
    // из результата успешной проверки
    if (result.evaluatedProperties) {
      evaluatedProperties = new Set([
        ...evaluatedProperties,
        ...result.evaluatedProperties,
      ]);
    }
    // аннотации могут всплывать из "$ref" и "$dynamicRef"
    // аппликаторов, но не передаются во вложенные схемы,
    // на которые ссылаются данные ключевые слова
  }
  // при наличии неподдерживаемых ключевых
  // слов схемы выбрасывается ошибка
  UNSUPPORTED_SCHEMA_KEYWORDS.forEach(keyword => {
    if (schema[keyword] !== undefined) {
      throw new InvalidArgumentError(
        'Schema keyword %v is not supported.',
        keyword,
      );
    }
  });
  // readOnly
  if (
    options.accessMode === OAAccessMode.WRITE &&
    schema.readOnly === true &&
    data !== undefined
  ) {
    return {
      isValid: false,
      value: data,
      valueUri: options.dataSourceUri,
      schemaUri: options.schemaSourceUri,
      reason: format(
        'Value at %v is read-only and cannot be sent in a write context.',
        options.dataSourceUri,
      ),
    };
  }
  // writeOnly
  if (
    options.accessMode === OAAccessMode.READ &&
    schema.writeOnly === true &&
    data !== undefined
  ) {
    return {
      isValid: false,
      value: data,
      valueUri: options.dataSourceUri,
      schemaUri: options.schemaSourceUri,
      reason: format(
        'Value at %v is write-only and cannot be present in a read context.',
        options.dataSourceUri,
      ),
    };
  }
  // прежде чем перейти к проверке данных "in-place" аппликаторами,
  // нужно учитывать, что согласно спецификации JSON Schema 2020-12,
  // аннотации должны всплывать снизу вверх или действовать на текущем
  // уровне, а не погружаться в подсхемы аппликаторов
  // allOf
  if (schema.allOf && Array.isArray(schema.allOf)) {
    for (const index in schema.allOf) {
      const subSchema = schema.allOf[index];
      const result = _validate(data, subSchema, {
        ...options,
        schemaSourceUri: options.schemaSourceUri + '/allOf/' + index,
      });
      if (!result.isValid) {
        return result;
      }
      // данные могли измениться во время рекурсии,
      // выполняется обновление исходного значения
      data = result.value;
      // внедрение аннотаций о проверенных индексах
      // из результата успешной проверки
      if (result.evaluatedIndexes) {
        evaluatedIndexes = new Set([
          ...evaluatedIndexes,
          ...result.evaluatedIndexes,
        ]);
      }
      // внедрение аннотаций о проверенных свойствах
      // из результата успешной проверки
      if (result.evaluatedProperties) {
        evaluatedProperties = new Set([
          ...evaluatedProperties,
          ...result.evaluatedProperties,
        ]);
      }
    }
  }
  // oneOf
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    let matches = 0;
    let matchedResultValue = data;
    let matchedEvaluatedIndexes = undefined;
    let matchedEvaluatedProperties = undefined;
    for (const index in schema.oneOf) {
      const subSchema = schema.oneOf[index];
      const result = _validate(data, subSchema, {
        ...options,
        schemaSourceUri: options.schemaSourceUri + '/oneOf/' + index,
      });
      if (result.isValid) {
        matches++;
        // сохранение результата приведения типов
        // из последней успешной проверки
        matchedResultValue = result.value;
        // сохранение аннотаций о проверенных
        // свойствах из успешной проверки
        matchedEvaluatedIndexes = result.evaluatedIndexes;
        // сохранение аннотаций о проверенных
        // свойствах из успешной проверки
        matchedEvaluatedProperties = result.evaluatedProperties;
      }
    }
    if (matches !== 1) {
      const schemaUri = options.schemaSourceUri + '/oneOf';
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri,
        reason: format(
          'Value at %v must match exactly one of schemas at %v, ' +
            'but %d matched.',
          options.dataSourceUri,
          schemaUri,
          matches,
        ),
      };
    }
    // обновление исходных данных
    // значением успешной проверки
    data = matchedResultValue;
    // внедрение аннотаций о проверенных индексах
    // из результата успешной проверки
    if (matchedEvaluatedIndexes) {
      evaluatedIndexes = new Set([
        ...evaluatedIndexes,
        ...matchedEvaluatedIndexes,
      ]);
    }
    // внедрение аннотаций о проверенных свойствах
    // из результата успешной проверки
    if (matchedEvaluatedProperties) {
      evaluatedProperties = new Set([
        ...evaluatedProperties,
        ...matchedEvaluatedProperties,
      ]);
    }
  }
  // anyOf
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    let matchFound = false;
    for (const index in schema.anyOf) {
      const subSchema = schema.anyOf[index];
      const result = _validate(data, subSchema, {
        ...options,
        schemaSourceUri: options.schemaSourceUri + '/anyOf/' + index,
      });
      if (result.isValid) {
        // обновление исходных данных значением
        // из первой успешной проверки
        if (!matchFound) {
          data = result.value;
        }
        // внедрение аннотаций о проверенных индексах
        // из результата успешной проверки
        if (result.evaluatedIndexes) {
          evaluatedIndexes = new Set([
            ...evaluatedIndexes,
            ...result.evaluatedIndexes,
          ]);
        }
        // внедрение аннотаций о проверенных свойствах
        // из результата успешной проверки
        if (result.evaluatedProperties) {
          evaluatedProperties = new Set([
            ...evaluatedProperties,
            ...result.evaluatedProperties,
          ]);
        }
        matchFound = true;
      }
    }
    if (!matchFound) {
      const schemaUri = options.schemaSourceUri + '/anyOf';
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri,
        reason: format(
          'Value at %v must match at least one of schemas at %v, ' +
            'but 0 matched.',
          options.dataSourceUri,
          schemaUri,
        ),
      };
    }
  }
  // not
  if (schema.not) {
    const {isValid} = _validate(data, schema.not, {
      ...options,
      schemaSourceUri: options.schemaSourceUri + '/not',
    });
    if (isValid) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri + '/not',
        reason: format(
          'Value at %v must not match the "not" schema.',
          options.dataSourceUri,
        ),
      };
    }
    // @todo должны ли мы учитывать свойства, которые
    // прошли проверку в аннотациях проверенных свойств?
  }
  // if / then / else
  if (schema.if) {
    // если данные не соответствуют схеме "if",
    // то результат проверки будет проигнорирован
    // без ошибки для всего документа
    const ifResult = _validate(data, schema.if, {
      ...options,
      schemaSourceUri: options.schemaSourceUri + '/if',
    });
    if (ifResult.isValid) {
      // так как при проверке по схеме "if" данные
      // могли измениться, выполняется обновление
      // исходного значения
      data = ifResult.value;
      // внедрение аннотаций о проверенных индексах
      // из результата успешной проверки схемой "if"
      if (ifResult.evaluatedIndexes) {
        evaluatedIndexes = new Set([
          ...evaluatedIndexes,
          ...ifResult.evaluatedIndexes,
        ]);
      }
      // внедрение аннотаций о проверенных свойствах
      // из результата успешной проверки схемой "if"
      if (ifResult.evaluatedProperties) {
        evaluatedProperties = new Set([
          ...evaluatedProperties,
          ...ifResult.evaluatedProperties,
        ]);
      }
      // если определена схема "then", то данные
      // обязаны соответствовать указанной схеме
      if (schema.then) {
        const result = _validate(data, schema.then, {
          ...options,
          schemaSourceUri: options.schemaSourceUri + '/then',
        });
        if (!result.isValid) {
          return result;
        }
        // так как при проверке по схеме "then" данные
        // могли измениться, выполняется обновление
        // исходного значения
        data = result.value;
        // внедрение аннотаций о проверенных индексах
        // из результата успешной проверки схемой "then"
        if (result.evaluatedIndexes) {
          evaluatedIndexes = new Set([
            ...evaluatedIndexes,
            ...result.evaluatedIndexes,
          ]);
        }
        // внедрение аннотаций о проверенных свойствах
        // из результата успешной проверки схемой "then"
        if (result.evaluatedProperties) {
          evaluatedProperties = new Set([
            ...evaluatedProperties,
            ...result.evaluatedProperties,
          ]);
        }
      }
    } else {
      // если определена схема "else", то данные
      // должны соответствовать указанной схеме
      if (schema.else) {
        const result = _validate(data, schema.else, {
          ...options,
          schemaSourceUri: options.schemaSourceUri + '/else',
        });
        if (!result.isValid) {
          return result;
        }
        // так как при проверке по схеме "else" данные
        // могли измениться, выполняется обновление
        // исходного значения
        data = result.value;
        // внедрение аннотаций о проверенных индексах
        // из результата успешной проверки схемой "else"
        if (result.evaluatedIndexes) {
          evaluatedIndexes = new Set([
            ...evaluatedIndexes,
            ...result.evaluatedIndexes,
          ]);
        }
        // внедрение аннотаций о проверенных свойствах
        // из результата успешной проверки схемой "else"
        if (result.evaluatedProperties) {
          evaluatedProperties = new Set([
            ...evaluatedProperties,
            ...result.evaluatedProperties,
          ]);
        }
      }
    }
  }
  // type
  if (schema.type !== undefined && data !== undefined) {
    const result = _validateType(data, schema.type, options);
    if (!result.isValid) {
      return result;
    }
  }
  // format
  if (schema.format) {
    const result = _validateFormat(
      data,
      schema.format,
      {...OA_BUILT_IN_DATA_FORMAT_VALIDATOR_MAP, ...options.formatValidators},
      options,
    );
    if (!result.isValid) {
      return result;
    }
  }
  // const
  if (schema.const !== undefined) {
    if (!_areValuesEqual(schema.const, data)) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Value at %v must be equal to constant %s, but %s was given.',
          options.dataSourceUri,
          toSpacedJson(schema.const, {truncate: 50}),
          toSpacedJson(data, {truncate: 50}),
        ),
      };
    }
  }
  // enum
  if (schema.enum && Array.isArray(schema.enum)) {
    const isFoundInEnum = schema.enum.some(el => _areValuesEqual(el, data));
    if (!isFoundInEnum) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Value at %v must be one of %s, but %s was given.',
          options.dataSourceUri,
          toSpacedJson(schema.enum, {truncate: 50}),
          toSpacedJson(data, {truncate: 50}),
        ),
      };
    }
  }
  // определение типа и проверка
  // значения согласно данному типу
  const currentType = inferOpenApiDataType(data, true);
  if (currentType === OADataType.STRING) {
    const result = _validateString(data, schema, options);
    if (!result.isValid) {
      return result;
    }
  } else if (
    currentType === OADataType.NUMBER ||
    currentType === OADataType.INTEGER
  ) {
    const result = _validateNumber(data, schema, options);
    if (!result.isValid) {
      return result;
    }
  } else if (currentType === OADataType.ARRAY) {
    const result = _validateArray(data, schema, evaluatedIndexes, options);
    if (!result.isValid) {
      return result;
    }
    // данные могли измениться во время проверки,
    // выполняется обновление исходного значения
    data = result.value;
    // внедрение аннотаций о проверенных
    // индексах из результата проверки
    if (result.evaluatedIndexes) {
      evaluatedIndexes = new Set([
        ...evaluatedIndexes,
        ...result.evaluatedIndexes,
      ]);
    }
  } else if (currentType === OADataType.OBJECT) {
    const result = _validateObject(data, schema, evaluatedProperties, options);
    if (!result.isValid) {
      return result;
    }
    // данные могли измениться во время проверки,
    // выполняется обновление исходного значения
    data = result.value;
    // внедрение аннотаций о проверенных
    // свойствах из результата проверки
    if (result.evaluatedProperties) {
      evaluatedProperties = new Set([
        ...evaluatedProperties,
        ...result.evaluatedProperties,
      ]);
    }
  }

  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri,
    evaluatedIndexes,
    evaluatedProperties,
  };
}

/**
 * Parse JSON.
 *
 * @param {*} data
 * @param {string|string[]} expectedType
 * @returns {*}
 */
function _parseJson(data, expectedType) {
  if (typeof data !== 'string') {
    return data;
  }
  const types = Array.isArray(expectedType) ? expectedType : [expectedType];
  // json спецификация RFC 8259 разрешает
  // пробельные символы перед началом значения
  const trimmedData = data.trim();
  // разбор json строки должен выполняться только
  // при наличии совместимого содержания с указанными
  // в схеме типами данных
  /* prettier-ignore */
  if (
    (types.includes(OADataType.ARRAY) && trimmedData[0] === '[') ||
    (types.includes(OADataType.OBJECT) && trimmedData[0] === '{') ||
    (types.includes(OADataType.INTEGER) && JSON_INTEGER_REGEXP.test(trimmedData)) ||
    (types.includes(OADataType.NUMBER) && JSON_NUMBER_REGEXP.test(trimmedData)) ||
    (types.includes(OADataType.BOOLEAN) && (trimmedData === 'true' || trimmedData === 'false')) ||
    (types.includes(OADataType.NULL) && trimmedData === 'null')
  ) {
    try {
      return JSON.parse(trimmedData);
    } catch {
      return data;
    }
  }
  return data;
}

/**
 * Coerce type.
 *
 * @param {*} data
 * @param {string|string[]} expectedType
 * @returns {*}
 */
function _coerceType(data, expectedType) {
  const types = Array.isArray(expectedType) ? expectedType : [expectedType];
  const actualType = inferOpenApiDataType(data, true);
  // если тип уже соответствует ожиданию,
  // то значение возвращается без изменений
  if (types.includes(actualType)) {
    return data;
  }
  // если текущий тип является "integer",
  // а ожидаемый "number" то значение
  // возвращается без изменений
  if (actualType === OADataType.INTEGER && types.includes(OADataType.NUMBER)) {
    return data;
  }
  for (const type of types) {
    switch (type) {
      case OADataType.STRING: {
        if (typeof data === 'number' || typeof data === 'boolean') {
          return String(data);
        }
        break;
      }
      case OADataType.NUMBER:
      case OADataType.INTEGER: {
        if (typeof data === 'string' && data.trim() !== '') {
          const num = Number(data);
          if (!Number.isNaN(num)) {
            if (type === OADataType.INTEGER && Number.isInteger(num)) {
              return num;
            }
            if (type === OADataType.NUMBER) {
              return num;
            }
          }
        }
        break;
      }
      case OADataType.BOOLEAN: {
        if (data === 'true') {
          return true;
        }
        if (data === 'false') {
          return false;
        }
        break;
      }
    }
  }
  return data;
}

/**
 * Validate type.
 *
 * @param {unknown} data
 * @param {string|string[]} expectedType
 * @param {object} options
 * @returns {object}
 */
function _validateType(data, expectedType, options) {
  const allowedTypes = [expectedType].flat();
  const actualType = inferOpenApiDataType(data, true);
  const isMatch = allowedTypes.some(allowedType => {
    if (allowedType === actualType) {
      return true;
    }
    if (
      allowedType === OADataType.NUMBER &&
      actualType === OADataType.INTEGER
    ) {
      return true;
    }
    return false;
  });
  if (allowedTypes.length && !isMatch) {
    return {
      isValid: false,
      value: data,
      valueUri: options.dataSourceUri,
      schemaUri: options.schemaSourceUri,
      reason: format(
        'Value at %v must be %s, but %s was given.',
        options.dataSourceUri,
        allowedTypes.map(v => toPascalCase(v)).join(' or '),
        toPascalCase(actualType),
      ),
    };
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri,
  };
}

/**
 * Validate format.
 *
 * @param {*} data
 * @param {string} expectedFormat
 * @param {object} validatorsMap
 * @param {object} options
 * @returns {object}
 */
function _validateFormat(data, expectedFormat, validatorsMap, options) {
  const validator = validatorsMap[expectedFormat];
  if (validator) {
    const isValid = validator(data);
    if (!isValid) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Value at %v must match format %v, but %s was given.',
          options.dataSourceUri,
          expectedFormat,
          toSpacedJson(data, {truncate: 50}),
        ),
      };
    }
  }
  // если валидатора нет, спецификация OpenAPI
  // рекомендует игнорировать неизвестные форматы
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri,
  };
}

/**
 * Deep equality check for "enum" and "uniqueItems" option.
 *
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
function _areValuesEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }
  // Date
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  // RegExp
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }
  // Array
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }
  if (Array.isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!_areValuesEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  // Object
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }
    if (!_areValuesEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

/**
 * Validate string.
 *
 * @param {string} data
 * @param {object} schema
 * @param {object} options
 * @returns {object}
 */
function _validateString(data, schema, options) {
  // minLength
  if (typeof schema.minLength === 'number') {
    const dataLength = countUnicode(data);
    if (dataLength < schema.minLength) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'String at %v must be at least %d characters long, but %d was given.',
          options.dataSourceUri,
          schema.minLength,
          dataLength,
        ),
      };
    }
  }
  // maxLength
  if (typeof schema.maxLength === 'number') {
    const dataLength = countUnicode(data);
    if (dataLength > schema.maxLength) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'String at %v must be at most %d characters long, but %d was given.',
          options.dataSourceUri,
          schema.maxLength,
          dataLength,
        ),
      };
    }
  }
  // pattern
  if (schema.pattern) {
    let regex;
    try {
      regex = new RegExp(schema.pattern, 'u');
    } catch {
      throw new InvalidArgumentError(
        'Schema pattern %v at %v has an invalid expression.',
        schema.pattern,
        options.schemaSourceUri,
      );
    }
    if (!regex.test(data)) {
      const reString =
        schema.pattern instanceof RegExp
          ? String(schema.pattern)
          : schema.pattern;
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'String at %v must match pattern %v, but %s was given.',
          options.dataSourceUri,
          reString,
          toSpacedJson(data, {truncate: 50}),
        ),
      };
    }
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri,
  };
}

/**
 * Validate number/integer.
 *
 * @param {number} data
 * @param {object} schema
 * @param {object} options
 * @returns {object}
 */
function _validateNumber(data, schema, options) {
  // minimum
  if (typeof schema.minimum === 'number') {
    if (data < schema.minimum) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Value at %v must be greater than or equal to %d, but %v was given.',
          options.dataSourceUri,
          schema.minimum,
          data,
        ),
      };
    }
  }
  // maximum
  if (typeof schema.maximum === 'number') {
    if (data > schema.maximum) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Value at %v must be less than or equal to %d, but %v was given.',
          options.dataSourceUri,
          schema.maximum,
          data,
        ),
      };
    }
  }
  // exclusiveMinimum
  if (typeof schema.exclusiveMinimum === 'number') {
    if (data <= schema.exclusiveMinimum) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Value at %v must be greater than %d, but %v was given.',
          options.dataSourceUri,
          schema.exclusiveMinimum,
          data,
        ),
      };
    }
  }
  // exclusiveMaximum
  if (typeof schema.exclusiveMaximum === 'number') {
    if (data >= schema.exclusiveMaximum) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Value at %v must be less than %d, but %v was given.',
          options.dataSourceUri,
          schema.exclusiveMaximum,
          data,
        ),
      };
    }
  }
  // multipleOf
  if (typeof schema.multipleOf === 'number') {
    // если "multipleOf" равен или меньше 0,
    // то выбрасывается ошибка
    if (schema.multipleOf <= 0) {
      throw new InvalidArgumentError(
        'Schema keyword "multipleOf" must be a Number strictly ' +
          'greater than 0, but %v was given.',
        schema.multipleOf,
      );
    }
    const quotient = data / schema.multipleOf;
    // EPSILON (1e-9 достаточно для большинства API задач)
    // используется для компенсации ошибок округления IEEE 754,
    // например, чтобы 0.3 считалось кратным 0.1, хотя в бинарном
    // виде 0.3 / 0.1 дает 2.9999999999999996
    const isInteger = Math.abs(quotient - Math.round(quotient)) < 1e-9;
    if (!isInteger) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Value at %v must be a multiple of %v, but %v was given.',
          options.dataSourceUri,
          schema.multipleOf,
          data,
        ),
      };
    }
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri,
  };
}

/**
 * Validate array.
 *
 * @param {Array} data
 * @param {object} schema
 * @param {Set} evaluatedIndexes
 * @param {object} options
 * @returns {object}
 */
function _validateArray(data, schema, evaluatedIndexes, options) {
  // чтобы избежать мутации набора проверенных
  // индексов, выполняется копирование набора
  evaluatedIndexes = new Set(evaluatedIndexes);
  // чтобы избежать проблем с производительностью,
  // копирование данных будет выполнено только в момент
  // изменения элементов массива
  const originalData = data;
  // если определен "prefixItems", то "items" проверяет
  // только хвост массива, по этой причине, необходимо
  // отслеживать последний проверенный элемент
  let validationStartIndex = 0;
  // prefixItems
  if (Array.isArray(schema.prefixItems)) {
    // при проверке кортежа, элементов может быть меньше,
    // чем схем в "prefixItems", это является допустимым
    // (проверка длины выполняется через minItems).
    const loopLimit = Math.min(schema.prefixItems.length, data.length);
    for (let i = 0; i < loopLimit; i++) {
      const item = data[i];
      const subSchema = schema.prefixItems[i];
      const result = _validate(item, subSchema, {
        ...options,
        dataSourceUri: `${options.dataSourceUri}/${i}`,
        schemaSourceUri: `${options.schemaSourceUri}/prefixItems/${i}`,
      });
      if (!result.isValid) {
        return result;
      }
      // если элемент массива изменился, то выполняется
      // обновление исходных данных без мутации оригинала
      // (поверхностное копирование массива)
      if (item !== result.value) {
        if (data === originalData) {
          data = [...originalData];
        }
        data[i] = result.value;
      }
      // если проверка элемента выполнена успешно,
      // то элемент помечается как проверенный
      evaluatedIndexes.add(i);
    }
    // свойство схемы "items" должно применяться
    // только к элементам после проверки "prefixItems"
    validationStartIndex = schema.prefixItems.length;
  }
  // items
  if (schema.items !== undefined) {
    // схема "items" проверяет только элементы,
    // выходящие за пределы длины "prefixItems"
    for (let i = validationStartIndex; i < data.length; i++) {
      const item = data[i];
      const result = _validate(item, schema.items, {
        ...options,
        dataSourceUri: `${options.dataSourceUri}/${i}`,
        schemaSourceUri: `${options.schemaSourceUri}/items`,
      });
      if (!result.isValid) {
        return result;
      }
      // если элемент массива изменился, то выполняется
      // обновление исходных данных без мутации оригинала
      // (поверхностное копирование массива)
      if (item !== result.value) {
        if (data === originalData) {
          data = [...originalData];
        }
        data[i] = result.value;
      }
      // если проверка элемента выполнена успешно,
      // то элемент помечается как проверенный
      evaluatedIndexes.add(i);
    }
  }
  // minItems
  if (typeof schema.minItems === 'number') {
    if (data.length < schema.minItems) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Array at %v must contain at least %d items, but %d was given.',
          options.dataSourceUri,
          schema.minItems,
          data.length,
        ),
      };
    }
  }
  // maxItems
  if (typeof schema.maxItems === 'number') {
    if (data.length > schema.maxItems) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Array at %v must contain at most %d items, but %d was given.',
          options.dataSourceUri,
          schema.maxItems,
          data.length,
        ),
      };
    }
  }
  // uniqueItems
  if (schema.uniqueItems === true) {
    // для проверки уникальности используется массив
    // уже просмотренных элементов и глубокое сравнение
    // для каждого нового элемента
    for (let i = 0; i < data.length; i++) {
      // алгоритм O(N^2) является приемлемым для проверки
      // конфигураций или запросов типичного размера
      for (let j = i + 1; j < data.length; j++) {
        if (_areValuesEqual(data[i], data[j])) {
          return {
            isValid: false,
            value: data,
            valueUri: options.dataSourceUri,
            schemaUri: options.schemaSourceUri,
            reason: format(
              'Array at %v must contain unique items, ' +
                'but items at index %d and %d are identical.',
              options.dataSourceUri,
              i,
              j,
            ),
          };
        }
      }
    }
  }
  // contains / minContains / maxContains
  if (schema.contains) {
    let matches = 0;
    for (let i = 0, l = data.length; i < l; i++) {
      const item = data[i];
      // проверка каждого элемента на соответствие схеме "contains",
      // используется опция "silent", чтобы не выбрасывать ошибку,
      // а только проверить факт соответствия
      const {isValid} = _validate(item, schema.contains, {
        ...options,
        silent: true,
        schemaSourceUri: options.schemaSourceUri + '/contains',
      });
      if (isValid) {
        matches++;
        // если проверка элемента выполнена успешно,
        // то элемент помечается как проверенный
        evaluatedIndexes.add(i);
      }
    }
    // minContains
    // если "minContains" не указан, но есть "contains", то по умолчанию
    // он равен 1, но если "minContains" явно равен 0, то проверка
    // на соответствие "хотя бы один" отключается
    const minContains =
      typeof schema.minContains === 'number' ? schema.minContains : 1;
    if (matches < minContains) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri + '/contains',
        reason: format(
          'Array at %v must contain at least %d item(s) matching ' +
            'the "contains" schema, but %d was found.',
          options.dataSourceUri,
          minContains,
          matches,
        ),
      };
    }
    // maxContains
    if (typeof schema.maxContains === 'number') {
      if (matches > schema.maxContains) {
        return {
          isValid: false,
          value: data,
          valueUri: options.dataSourceUri,
          schemaUri: options.schemaSourceUri + '/contains',
          reason: format(
            'Array at %v must contain at most %d item(s) matching ' +
              'the "contains" schema, but %d was found.',
            options.dataSourceUri,
            schema.maxContains,
            matches,
          ),
        };
      }
    }
  }
  // unevaluatedItems
  if (schema.unevaluatedItems !== undefined) {
    // ключевое слово применяется к элементам, которые еще не были
    // проверены ключевыми словами "prefixItems", "items", "contains"
    // или другими аппликаторами
    for (let i = 0, l = data.length; i < l; i++) {
      // если индекс уже есть в сете, значит данный
      // элемент массива известен и был проверен ранее
      if (evaluatedIndexes.has(i)) {
        continue;
      }
      const result = _validate(data[i], schema.unevaluatedItems, {
        ...options,
        dataSourceUri: `${options.dataSourceUri}/${i}`,
        schemaSourceUri: `${options.schemaSourceUri}/unevaluatedItems`,
      });
      if (!result.isValid) {
        // так как логическое значение false для данной опции
        // является наиболее частым случаем, то возвращается
        // особое сообщение
        if (schema.unevaluatedItems === false) {
          return {
            isValid: false,
            value: data[i],
            valueUri: `${options.dataSourceUri}/${i}`,
            schemaUri: `${options.schemaSourceUri}/unevaluatedItems`,
            reason: format(
              'Array at %v has unevaluated item at index %d, ' +
                'which is not allowed.',
              options.dataSourceUri,
              i,
            ),
          };
        }
        return result;
      }
      // если элемент массива изменился, то выполняется
      // обновление исходных данных без мутации оригинала
      // (поверхностное копирование массива)
      if (data[i] !== result.value) {
        if (data === originalData) {
          data = [...originalData];
        }
        data[i] = result.value;
      }
      // если проверка элемента выполнена успешно,
      // то элемент помечается как проверенный,
      // хотя на этом уровне это уже последний шаг
      evaluatedIndexes.add(i);
    }
  }
  // stripUnknown
  if (options.stripUnknown === true) {
    // если на данном этапе есть хотя бы один проверенный
    // индекс элемента, то это значит, что структура массива
    // определена схемой, и можно выполнить удаление
    // неизвестных элементов
    if (evaluatedIndexes.size > 0) {
      for (let i = 0, l = data.length; i < l; i++) {
        if (evaluatedIndexes.has(i)) {
          continue;
        }
        // чтобы избежать мутации исходных данных,
        // выполняется копирование оригинала
        if (data === originalData) {
          data = [...originalData];
        }
        data.splice(i, 1);
      }
    }
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri,
    evaluatedIndexes,
  };
}

/**
 * Validate object.
 *
 * @param {object} data
 * @param {object} schema
 * @param {Set} evaluatedProperties
 * @param {object} options
 * @returns {object}
 */
function _validateObject(data, schema, evaluatedProperties, options) {
  // чтобы избежать мутации набора проверенных
  // свойств, выполняется копирование набора
  evaluatedProperties = new Set(evaluatedProperties);
  // чтобы избежать проблем с производительностью,
  // копирование данных будет выполнено только в момент
  // изменения элементов массива
  const originalData = data;
  // maxProperties
  if (typeof schema.maxProperties === 'number') {
    const propsNumber = Object.keys(data).length;
    if (propsNumber > schema.maxProperties) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Object at %v must contain at most %d properties, but %d was given.',
          options.dataSourceUri,
          schema.maxProperties,
          propsNumber,
        ),
      };
    }
  }
  // minProperties
  if (typeof schema.minProperties === 'number') {
    const propsNumber = Object.keys(data).length;
    if (propsNumber < schema.minProperties) {
      return {
        isValid: false,
        value: data,
        valueUri: options.dataSourceUri,
        schemaUri: options.schemaSourceUri,
        reason: format(
          'Object at %v must contain at least %d properties, but %d was given.',
          options.dataSourceUri,
          schema.minProperties,
          propsNumber,
        ),
      };
    }
  }
  // required
  if (Array.isArray(schema.required)) {
    for (const propName of schema.required) {
      if (data[propName] === undefined) {
        // прежде чем выбросить ошибку, что обязательное свойство
        // не определено, требуется проверить режим доступа, так
        // как свойство может быть исключено в данном режиме
        if (options.accessMode) {
          const propSchema =
            schema.properties !== null &&
            typeof schema.properties === 'object' &&
            schema.properties[propName] !== null &&
            typeof schema.properties[propName] === 'object' &&
            schema.properties[propName];
          // проверка на наличие исключающего ключевого
          // слова "readOnly" или "writeOnly" выполняется,
          // только если определена схема свойства
          if (propSchema) {
            if (
              (options.accessMode === OAAccessMode.WRITE &&
                propSchema.readOnly === true) ||
              (options.accessMode === OAAccessMode.READ &&
                propSchema.writeOnly === true)
            ) {
              continue;
            }
          }
        }
        const propValue = data[propName];
        return {
          isValid: false,
          value: propValue,
          valueUri: `${options.dataSourceUri}/${propName}`,
          schemaUri: options.schemaSourceUri,
          reason: format(
            'Property %v at %v is required, but %v was given.',
            propName,
            options.dataSourceUri,
            propValue,
          ),
        };
      }
    }
  }
  // dependentRequired
  if (
    schema.dependentRequired &&
    typeof schema.dependentRequired === 'object' &&
    !Array.isArray(schema.dependentRequired)
  ) {
    // формат конфигурации {"propertyA": ["propertyB", "propertyC"]}
    // если есть "propertyA", то "propertyB" и "propertyC" тоже обязательны
    for (const triggerProp of Object.keys(schema.dependentRequired)) {
      const requiredProps = schema.dependentRequired[triggerProp];
      // если свойство-триггер присутствует в данных
      if (data[triggerProp] !== undefined) {
        if (Array.isArray(requiredProps)) {
          for (const requiredProp of requiredProps) {
            if (data[requiredProp] === undefined) {
              // прежде чем выбросить ошибку, что обязательное свойство
              // не определено, требуется проверить режим доступа, так
              // как свойство может быть исключено в данном режиме
              if (options.accessMode) {
                const requiredPropSchema =
                  schema.properties !== null &&
                  typeof schema.properties === 'object' &&
                  schema.properties[requiredProp] !== null &&
                  typeof schema.properties[requiredProp] === 'object' &&
                  schema.properties[requiredProp];
                // проверка на наличие исключающего ключевого
                // слова "readOnly" или "writeOnly" выполняется,
                // только если определена схема обязательного
                // свойства
                if (requiredPropSchema) {
                  if (
                    (options.accessMode === OAAccessMode.WRITE &&
                      requiredPropSchema.readOnly === true) ||
                    (options.accessMode === OAAccessMode.READ &&
                      requiredPropSchema.writeOnly === true)
                  ) {
                    continue;
                  }
                }
              }
              return {
                isValid: false,
                value: data[requiredProp],
                valueUri: `${options.dataSourceUri}/${requiredProp}`,
                schemaUri: options.schemaSourceUri,
                reason: format(
                  'Property %v at %v is required because ' +
                    'the property %v is present.',
                  requiredProp,
                  options.dataSourceUri,
                  triggerProp,
                ),
              };
            }
          }
        }
      }
    }
  }
  // dependentSchemas
  if (
    schema.dependentSchemas &&
    typeof schema.dependentSchemas === 'object' &&
    !Array.isArray(schema.dependentSchemas)
  ) {
    for (const triggerProp of Object.keys(schema.dependentSchemas)) {
      const subSchema = schema.dependentSchemas[triggerProp];
      if (data[triggerProp] !== undefined) {
        const result = _validate(data, subSchema, {
          ...options,
          schemaSourceUri: `${options.schemaSourceUri}/dependentSchemas/${triggerProp}`,
        });
        if (!result.isValid) {
          return result;
        }
        // данные могли измениться во время проверки,
        // выполняется обновление исходного значения
        data = result.value;
        // внедрение аннотаций о проверенных свойствах
        // из результата успешной проверки
        if (result.evaluatedProperties) {
          evaluatedProperties = new Set([
            ...evaluatedProperties,
            ...result.evaluatedProperties,
          ]);
        }
      }
    }
  }
  // propertyNames
  if (
    schema.propertyNames &&
    typeof schema.propertyNames === 'object' &&
    !Array.isArray(schema.propertyNames)
  ) {
    for (const propName of Object.keys(data)) {
      const result = _validate(propName, schema.propertyNames, {
        ...options,
        dataSourceUri: `${options.dataSourceUri}`,
        schemaSourceUri: `${options.schemaSourceUri}/propertyNames`,
      });
      if (!result.isValid) {
        return result;
      }
    }
  }
  // properties
  if (schema.properties && typeof schema.properties === 'object') {
    for (const propName of Object.keys(schema.properties)) {
      const propSchema = schema.properties[propName];
      // перед началом проверки свойства, требуется
      // определить его наличие и необходимость
      // установки значения по умолчанию
      const isPropValuePresent = data[propName] !== undefined;
      const shouldApplyDefault =
        options.applyDefaults === true &&
        propSchema !== null &&
        typeof propSchema === 'object' &&
        propSchema.default !== undefined;
      // проверка свойства выполняется только если
      // свойство присутствует в данных, либо ожидается
      // установка значения по умолчанию
      if (isPropValuePresent || shouldApplyDefault) {
        const propValue = data[propName];
        const result = _validate(propValue, propSchema, {
          ...options,
          dataSourceUri: `${options.dataSourceUri}/${propName}`,
          schemaSourceUri: `${options.schemaSourceUri}/properties/${propName}`,
        });
        if (!result.isValid) {
          return result;
        }
        // если значение свойства изменилось, то выполняется
        // обновление исходных данных без мутации оригинала
        // (поверхностное копирование объекта)
        if (data[propName] !== result.value) {
          if (data === originalData) {
            data = {...originalData};
          }
          data[propName] = result.value;
        }
        // если проверка свойства прошла успешно,
        // то свойство помечается как проверенное
        evaluatedProperties.add(propName);
      }
    }
  }
  // patternProperties
  const passedPatternProperties = [];
  if (
    schema.patternProperties &&
    typeof schema.patternProperties === 'object'
  ) {
    // проверка каждого имени свойств объекта
    // на соответствие регулярным выражениям
    for (const pattern of Object.keys(schema.patternProperties)) {
      const patternSchema = schema.patternProperties[pattern];
      let regex;
      try {
        regex = new RegExp(pattern, 'u');
      } catch {
        throw new InvalidArgumentError(
          'Property pattern %v at %v has an invalid expression.',
          pattern,
          options.schemaSourceUri,
        );
      }
      for (const propName of Object.keys(data)) {
        if (regex.test(propName)) {
          const propValue = data[propName];
          const result = _validate(propValue, patternSchema, {
            ...options,
            dataSourceUri: `${options.dataSourceUri}/${propName}`,
            schemaSourceUri: `${options.schemaSourceUri}/patternProperties/${pattern}`,
          });
          if (!result.isValid) {
            return result;
          }
          // если значение свойства изменилось, то выполняется
          // обновление исходных данных без мутации оригинала
          // (поверхностное копирование объекта)
          if (data[propName] !== result.value) {
            if (data === originalData) {
              data = {...originalData};
            }
            data[propName] = result.value;
          }
          // если проверка свойства прошла успешно,
          // то свойство помечается как проверенное
          evaluatedProperties.add(propName);
          // добавление проверенного свойства
          // в массив проверенных по шаблону
          passedPatternProperties.push(propName);
        }
      }
    }
  }
  // additionalProperties
  if (schema.additionalProperties !== undefined) {
    const definedProps = schema.properties
      ? Object.keys(schema.properties)
      : [];
    for (const propName of Object.keys(data)) {
      // если свойство определено в "properties",
      // то свойство не является дополнительным
      if (definedProps.includes(propName)) {
        continue;
      }
      // если свойство обработано "patternProperties",
      // то такое свойство не является дополнительным
      if (passedPatternProperties.includes(propName)) {
        continue;
      }
      // если значение параметра "additionalProperties" определено
      // как false, то любые неизвестные свойства вызывают ошибку
      if (schema.additionalProperties === false) {
        return {
          isValid: false,
          value: data[propName],
          valueUri: `${options.dataSourceUri}/${propName}`,
          schemaUri: `${options.schemaSourceUri}/additionalProperties`,
          reason: format(
            'Property %v at %v is not allowed.',
            propName,
            options.dataSourceUri,
          ),
        };
      }
      // если значение параметра "additionalProperties" является
      // схемой, то проверяется значение неизвестного свойства
      if (
        schema.additionalProperties !== null &&
        typeof schema.additionalProperties === 'object' &&
        !Array.isArray(schema.additionalProperties)
      ) {
        const propValue = data[propName];
        const result = _validate(propValue, schema.additionalProperties, {
          ...options,
          dataSourceUri: `${options.dataSourceUri}/${propName}`,
          schemaSourceUri: `${options.schemaSourceUri}/additionalProperties`,
        });
        if (!result.isValid) {
          return result;
        }
        // если значение свойства изменилось, то выполняется
        // обновление исходных данных без мутации оригинала
        // (поверхностное копирование объекта)
        if (data[propName] !== result.value) {
          if (data === originalData) {
            data = {...originalData};
          }
          data[propName] = result.value;
        }
      }
      // если проверка свойства прошла успешно,
      // то свойство помечается как проверенное
      evaluatedProperties.add(propName);
    }
  }
  // unevaluatedProperties
  if (schema.unevaluatedProperties !== undefined) {
    // проход по всем ключам объекта для обработки
    // незатронутых свойств
    for (const propName of Object.keys(data)) {
      // если свойство было проверено ранее,
      // то свойство пропускается
      if (evaluatedProperties.has(propName)) {
        continue;
      }
      // если свойство не было проверено,
      // применяется схема "unevaluatedProperties"
      if (schema.unevaluatedProperties === false) {
        return {
          isValid: false,
          value: data[propName],
          valueUri: `${options.dataSourceUri}/${propName}`,
          schemaUri: `${options.schemaSourceUri}/unevaluatedProperties`,
          reason: format(
            'Property %v at %v is not evaluated and not allowed.',
            propName,
            options.dataSourceUri,
          ),
        };
      } else if (
        schema.unevaluatedProperties &&
        typeof schema.unevaluatedProperties === 'object' &&
        !Array.isArray(schema.unevaluatedProperties)
      ) {
        const propValue = data[propName];
        const result = _validate(propValue, schema.unevaluatedProperties, {
          ...options,
          dataSourceUri: `${options.dataSourceUri}/${propName}`,
          schemaSourceUri: `${options.schemaSourceUri}/unevaluatedProperties`,
        });
        if (!result.isValid) {
          return result;
        }
        // если значение свойства изменилось, то выполняется
        // обновление исходных данных без мутации оригинала
        // (поверхностное копирование объекта)
        if (data[propName] !== result.value) {
          if (data === originalData) {
            data = {...originalData};
          }
          data[propName] = result.value;
        }
        // если проверка свойства прошла успешно,
        // то свойство помечается как проверенное
        evaluatedProperties.add(propName);
      }
    }
  }
  // stripUnknown
  if (options.stripUnknown === true) {
    // если на данном этапе есть хотя бы одно проверенное
    // свойство, то это значит, что структура объекта
    // определена схемой, и можно выполнить удаление
    // неизвестных свойств
    if (evaluatedProperties.size > 0) {
      for (const propName of Object.keys(data)) {
        if (evaluatedProperties.has(propName)) {
          continue;
        }
        // чтобы избежать мутации исходных данных,
        // выполняется копирование оригинала
        if (data === originalData) {
          data = {...originalData};
        }
        delete data[propName];
      }
    }
  }
  return {
    isValid: true,
    value: data,
    valueUri: options.dataSourceUri,
    schemaUri: options.schemaSourceUri,
    evaluatedProperties,
  };
}
