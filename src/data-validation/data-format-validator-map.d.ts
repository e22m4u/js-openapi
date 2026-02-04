import {OADataFormatValidator} from './data-format-validators.js';

/**
 * Data format validator map.
 */
export type OADataFormatValidatorMap = {
  [format: string]: OADataFormatValidator | undefined;
};

/**
 * Built-in data format validator map.
 */
export declare const OA_BUILT_IN_DATA_FORMAT_VALIDATOR_MAP: OADataFormatValidatorMap;
