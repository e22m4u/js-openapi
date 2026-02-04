import {OADataFormatValidatorMap} from './data-format-validator-map.js';

import {
  OAAccessMode,
  OASchemaObject,
  OABooleanSchema,
} from '../oa-specification.js';

/**
 * Data validation options.
 */
export type OADataValidationOptions = {
  rootDocument?: object | unknown[];
  required?: boolean;
  coerceTypes?: boolean;
  applyDefaults?: boolean;
  stripUnknown?: boolean;
  dataSourceUri?: string;
  schemaSourceUri?: string;
  silent?: boolean;
  accessMode?: OAAccessMode;
  formatValidators?: OADataFormatValidatorMap;
  parseJson?: boolean;
};

/**
 * Data validation result.
 */
export type OADataValidationResult<T> = {
  isValid: boolean;
  reason: string;
  value?: T;
};

/**
 * Validate data with OpenAPI Schema.
 *
 * @param data
 * @param schema
 * @param options
 */
export function validateDataWithOpenApiSchema<T = any>(
  data: unknown,
  schema: OABooleanSchema | OASchemaObject,
  options?: OADataValidationOptions,
): OADataValidationResult<T>;
