/**
 * @module error
 * @packageDocumentation
 */

/** Module default errors */
export class RequesterError extends Error {
  /**
   * @param info Information about the error
   */
  constructor(info?: string | Error) {
    if (typeof info === 'string') super(info);
    else if (info instanceof Error) super(info.message);
    else super('An unidentify error occured.');

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
