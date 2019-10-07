import {RequestOptionsDTO} from '.';

/**
 * Request options accepted by requester.
 * @typedef {Object} ProtocolRequestOptions
 */
export type ProtocolRequestOptions = RequestOptionsDTO & {
  useProxy: boolean;
};
