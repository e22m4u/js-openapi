/**
 * Resolve json pointer.
 *
 * @param document
 * @param pointer
 */
export function resolveJsonPointer<T = any>(
  document: object | unknown[],
  pointer: string,
): T;
