/**
 * Is OpenAPI Reference Object.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isOAReferenceObject(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    if (value.$ref !== undefined) {
      return true;
    }
  }
  return false;
}
