/**
 * Функция превращает объект в JSON с пробелами,
 * но в одну строку.
 *
 * @param {*} value
 * @param {*} [options]
 * @returns {string}
 */
export function toSpacedJson(value, options = {}) {
  const stringified = JSON.stringify(value, null, 1);
  const res = stringified
    ? stringified
        .replace(/\n\s*/g, ' ')
        .replace(/\[\s/g, '[')
        .replace(/\s\]/g, ']')
        .replace(/\{\s/g, '{')
        .replace(/\s\}/g, '}')
    : 'undefined';
  if (
    options.truncate &&
    typeof options.truncate === 'number' &&
    res.length > options.truncate
  ) {
    return res.slice(0, options.truncate) + '...';
  }
  return res;
}
