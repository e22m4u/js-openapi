/**
 * Unescape JSON Pointer.
 * Replaces "~1" with "/" and "~0" with "~".
 *
 * @param {string} jsonPointer
 * @returns {string}
 */
export declare function unescapeJsonPointer(jsonPointer: string): string;
