/**
 * Count unicode.
 *
 * Подсчет длины строки выполняется с учетом символов, выходящих
 * за пределы BMP (Basic Multilingual Plane) например, эмодзи
 * или некоторые иероглифы в JS имеют `.length === 2`,
 * но должны считаться за один символ.
 *
 * @param data
 */
export function countUnicode(data: string): number;
