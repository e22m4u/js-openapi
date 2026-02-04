import {OADataType} from '../oa-specification.js';

/**
 * Infer OpenAPI data type.
 *
 * @param data
 */
export function inferOpenApiDataType(data: unknown): OADataType;

/**
 * Infer OpenAPI data type.
 *
 * @param data
 * @param returnJsTypeOnFail
 */
export function inferOpenApiDataType(
  data: unknown,
  returnJsTypeOnFail: true,
): OADataType | string;

/**
 * Infer OpenAPI data type.
 *
 * @param data
 * @param returnJsTypeOnFail
 */
export function inferOpenApiDataType(
  data: unknown,
  returnJsTypeOnFail?: boolean,
): OADataType | string;
