import {ProtocolRequestOptions, Callback} from '../models';

/**
 * Handle requests base on provided options.
 */
export interface ProtocolInterface {
  /**
   * Make a request with provided parameters.
   * @param {ProtocolRequestOptions} options Request options
   * @param {Callback} callback Execute when request is done.
   */
  request(options: ProtocolRequestOptions, callback: Callback): void;
}
