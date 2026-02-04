import {OADataFormat} from '../oa-specification.js';

import {
  validateUriFormat,
  validateIpv4Format,
  validateIpv6Format,
  validateUuidFormat,
  validateByteFormat,
  validateDateFormat,
  validateInt32Format,
  validateFloatFormat,
  validateInt64Format,
  validateEmailFormat,
  validateDoubleFormat,
  validateDateTimeFormat,
  validateHostnameFormat,
} from './data-format-validators.js';

/**
 * Built-in data format validator map.
 */
export const OA_BUILT_IN_DATA_FORMAT_VALIDATOR_MAP = {
  [OADataFormat.INT32]: validateInt32Format,
  [OADataFormat.INT64]: validateInt64Format,
  [OADataFormat.FLOAT]: validateFloatFormat,
  [OADataFormat.DOUBLE]: validateDoubleFormat,
  [OADataFormat.DATE]: validateDateFormat,
  [OADataFormat.DATE_TIME]: validateDateTimeFormat,
  [OADataFormat.BYTE]: validateByteFormat,
  [OADataFormat.EMAIL]: validateEmailFormat,
  [OADataFormat.UUID]: validateUuidFormat,
  [OADataFormat.HOSTNAME]: validateHostnameFormat,
  [OADataFormat.IPV4]: validateIpv4Format,
  [OADataFormat.IPV6]: validateIpv6Format,
  [OADataFormat.URI]: validateUriFormat,
};
