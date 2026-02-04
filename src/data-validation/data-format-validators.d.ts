/**
 * Data format validator.
 */
export type OADataFormatValidator = (value: unknown) => boolean;

/**
 * Validate int32 format.
 * Signed 32-bit integer.
 * Range: [-2,147,483,648 to 2,147,483,647]
 */
export declare const validateInt32Format: OADataFormatValidator;

/**
 * Validate int64 format.
 * Signed 64-bit integer.
 * Note: JS Numbers lose precision beyond 2^53.
 * This checks if it's a safe integer in JS context.
 */
export declare const validateInt64Format: OADataFormatValidator;

/**
 * Validate float (32-bit) format.
 * Standard IEEE 754 single-precision binary floating-point.
 * Range approx: ±3.4e38.
 */
export declare const validateFloatFormat: OADataFormatValidator;

/**
 * Validate double (64-bit) format.
 */
export declare const validateDoubleFormat: OADataFormatValidator;

/**
 * Validate byte format.
 * Base64 encoded characters.
 */
export declare const validateByteFormat: OADataFormatValidator;

/**
 * Validate date format.
 * Full-date notation as defined by RFC 3339, section 5.6 (YYYY-MM-DD).
 */
export declare const validateDateFormat: OADataFormatValidator;

/**
 * Validate date-time format.
 * The date-time notation as defined by RFC 3339, section 5.6.
 */
export declare const validateDateTimeFormat: OADataFormatValidator;

/**
 * Validate email format.
 */
export declare const validateEmailFormat: OADataFormatValidator;

/**
 * Validate uuid format.
 */
export declare const validateUuidFormat: OADataFormatValidator;

/**
 * Validate ipv4 format.
 */
export declare const validateIpv4Format: OADataFormatValidator;

/**
 * Validate ipv6 format.
 */
export declare const validateIpv6Format: OADataFormatValidator;

/**
 * Validate hostname format.
 */
export declare const validateHostnameFormat: OADataFormatValidator;

/**
 * Validate uri format.
 */
export declare const validateUriFormat: OADataFormatValidator;

/**
 * Validate password format.
 */
export declare const validatePasswordFormat: OADataFormatValidator;
