/**
 * Joins URL paths.
 *
 * @param {...string} segments
 * @returns {string}
 */
export function joinPath(...segments) {
  // фильтрация пустых значений (null, undefined, "")
  const parts = segments.filter(seg => seg != undefined && String(seg) !== '');
  if (parts.length === 0) {
    return '/';
  }
  // простое объединение через разделитель
  // и замена множественных слешей на один
  let joined = parts.join('/').replace(/\/+/g, '/');
  // проверка на наличие протокола в начале строки
  // RFC 3986: scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
  const protocolRegex = /^([a-z][a-z0-9+.-]*):\//i;
  const protocolMatch = joined.match(protocolRegex);
  if (protocolMatch) {
    // если это URL (есть схема), то восстанавливается
    // двойной слеш "https:/" -> "https://"
    joined = joined.replace(protocolRegex, '$1://');
  } else {
    // если это не URL, а путь файловой системы или API,
    // то гарантируется наличие слеша в начале
    if (!joined.startsWith('/')) {
      joined = '/' + joined;
    }
  }
  // удаление слеша в конце, если это не корень
  if (joined.length > 1 && joined.endsWith('/')) {
    joined = joined.slice(0, -1);
  }
  return joined;
}
