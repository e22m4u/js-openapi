import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Escape JSON Pointer.
 * Replaces "~" with "~0" and "/" with "~1".
 *
 * @param {string} jsonPointer
 * @returns {string}
 */
export function escapeJsonPointer(jsonPointer) {
  if (typeof jsonPointer !== 'string') {
    throw new InvalidArgumentError(
      'Parameter "jsonPointer" must be a String, but %v was given.',
      jsonPointer,
    );
  }
  return jsonPointer.replace(/~/g, '~0').replace(/\//g, '~1');
}
