/**
 * Count unicode.
 *
 * Подсчет длины строки выполняется с учетом символов, выходящих
 * за пределы BMP (Basic Multilingual Plane) например, эмодзи
 * или некоторые иероглифы в JS имеют `.length === 2`,
 * но должны считаться за один символ.
 *
 * @param {string} data
 * @returns {number}
 */
export function countUnicode(data) {
  const matchedChars = String(data).match(/[\s\S]/gu);
  return Array.isArray(matchedChars) ? matchedChars.length : 0;
}
