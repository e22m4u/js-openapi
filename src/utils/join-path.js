/**
 * Joins URL paths.
 *
 * @param {...string} segments
 * @returns {string}
 */
export function joinPath(...segments) {
  const path = segments
    .filter(seg => seg != undefined)
    .map(seg => String(seg).replace(/(^\/|\/$)/g, ''))
    .filter(Boolean)
    .join('/');
  return '/' + path;
}
