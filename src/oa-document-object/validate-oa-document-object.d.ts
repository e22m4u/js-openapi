/**
 * Document object validation options.
 */
export type OADocumentObjectValidationOptions = {
  schemaUri?: string;
  sourceUri?: string;
};

/**
 * Validate OADocumentObject.
 *
 * @param instance
 * @param options
 */
export function validateOADocumentObject(
  instance: any,
  options?: OADocumentObjectValidationOptions,
): void;
