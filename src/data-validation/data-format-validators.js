/////////////////////////////////////////////////
////////////// Regular Expressions //////////////
/////////////////////////////////////////////////
const RX_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const RX_DATE = /^\d{4}-\d{2}-\d{2}$/;
const RX_DATE_TIME =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:?\d{2}))$/i;
const RX_IPV4 =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const RX_IPV6 =
  /^((([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])))$/;
const RX_HOSTNAME =
  /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
const RX_EMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const RX_BASE64 =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

/**
 * Validate int32 format.
 * Signed 32-bit integer.
 * Range: [-2,147,483,648 to 2,147,483,647]
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateInt32Format = v => {
  if (typeof v !== 'number') {
    return true;
  }
  return Number.isInteger(v) && v >= -2147483648 && v <= 2147483647;
};

/**
 * Validate int64 format.
 * Signed 64-bit integer.
 * This checks if it's a safe integer in JS context.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateInt64Format = v => {
  if (typeof v !== 'number') {
    return true;
  }
  return Number.isSafeInteger(v);
};

/**
 * Validate float (32-bit) format.
 * Standard IEEE 754 single-precision binary floating-point.
 * Range approx: ±3.4e38.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateFloatFormat = v => {
  if (typeof v !== 'number') {
    return true;
  }
  return (
    !Number.isNaN(v) &&
    Number.isFinite(v) &&
    // Math.fround приводит число к 32-битному float,
    // если результат бесконечен, значит число не влазит в float
    Number.isFinite(Math.fround(v))
  );
};

/**
 * Validate double (64-bit) format.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateDoubleFormat = v => {
  if (typeof v !== 'number') {
    return true;
  }
  return !Number.isNaN(v) && Number.isFinite(v);
};

/**
 * Validate byte format.
 * Base64 encoded characters.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateByteFormat = v => {
  if (typeof v !== 'string') {
    return true;
  }
  return v.length % 4 === 0 && RX_BASE64.test(v);
};

/**
 * Validate date format.
 * Full-date notation as defined by RFC 3339, section 5.6 (YYYY-MM-DD).
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateDateFormat = v => {
  if (typeof v !== 'string') {
    return true;
  }
  if (!RX_DATE.test(v)) {
    return false;
  }
  // проверка на переполнение дней
  const [y, m, d] = v.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  );
};

/**
 * Validate date-time format.
 * The date-time notation as defined by RFC 3339, section 5.6.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateDateTimeFormat = v => {
  if (typeof v !== 'string') {
    return true;
  }
  return RX_DATE_TIME.test(v) && !isNaN(Date.parse(v));
};

/**
 * Validate email format.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateEmailFormat = v => {
  if (typeof v !== 'string') {
    return true;
  }
  return RX_EMAIL.test(v);
};

/**
 * Validate uuid format.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateUuidFormat = v => {
  if (typeof v !== 'string') {
    return true;
  }
  return RX_UUID.test(v);
};

/**
 * Validate ipv4 format.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateIpv4Format = v => {
  if (typeof v !== 'string') {
    return true;
  }
  return RX_IPV4.test(v);
};

/**
 * Validate ipv6 format.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateIpv6Format = v => {
  if (typeof v !== 'string') {
    return true;
  }
  return RX_IPV6.test(v);
};

/**
 * Validate hostname format.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateHostnameFormat = v => {
  if (typeof v !== 'string') {
    return true;
  }
  return v.length <= 255 && RX_HOSTNAME.test(v);
};

/**
 * Validate uri format.
 *
 * @param {*} v
 * @returns {boolean}
 */
export const validateUriFormat = v => {
  if (typeof v !== 'string') {
    return true;
  }
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
};
