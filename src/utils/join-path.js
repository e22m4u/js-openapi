/**
 * Joins URL paths.
 *
 * @param {...string} segments
 * @returns {string}
 */
export function joinPath(...segments) {
  const path = segments
    .filter(Boolean)
    .map(seg => seg.replace(/(^\/|\/$)/g, ''))
    .filter(Boolean)
    .join('/');
  return '/' + path;
}
