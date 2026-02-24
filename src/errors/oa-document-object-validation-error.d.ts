import {Errorf} from '@e22m4u/js-format';

/**
 * Document object validation error.
 */
export declare class OADocumentObjectValidationError extends Errorf {
  /**
   * Instance path.
   */
  readonly instancePath?: string;

  /**
   * Reason.
   */
  readonly reason?: string;
}
