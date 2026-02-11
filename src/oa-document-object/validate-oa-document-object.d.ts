/**
 * Document object validation options.
 */
export type OADocumentObjectValidationOptions = {
  schemaUri?: string;
  dataSourceUri?: string;
};

/**
 * Validate OADocumentObject.
 *
 * @param data
 * @param options
 */
export function validateOADocumentObject(
  data: any,
  options?: OADocumentObjectValidationOptions,
): void;
