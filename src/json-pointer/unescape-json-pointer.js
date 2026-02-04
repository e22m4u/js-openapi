import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Unescape JSON Pointer.
 * Replaces "~1" with "/" and "~0" with "~".
 *
 * @param {string} jsonPointer
 * @returns {string}
 */
export function unescapeJsonPointer(jsonPointer) {
  if (typeof jsonPointer !== 'string') {
    throw new InvalidArgumentError(
      'Parameter "jsonPointer" must be a String, but %v was given.',
      jsonPointer,
    );
  }
  return jsonPointer.replace(/~1/g, '/').replace(/~0/g, '~');
}
