/**
 * To spaced JSON options.
 */
export type ToSpacedJsonOptions = {
  truncate?: number;
};

/**
 * Функция превращает объект в JSON с пробелами,
 * но в одну строку.
 *
 * @param value
 */
export function toSpacedJson(
  value: unknown,
  options?: ToSpacedJsonOptions,
): string;
