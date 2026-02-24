import {Errorf} from '@e22m4u/js-format';

/**
 * Document object validation error.
 */
export class OADocumentObjectValidationError extends Errorf {
  /**
   * Instance path.
   *
   * @type {string|undefined}
   */
  instancePath;

  /**
   * Reason.
   *
   * @type {string|undefined}
   */
  reason;
}
