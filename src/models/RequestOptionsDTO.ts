import * as http from 'http';

/**
 * Request options accepted by requester.
 * @typedef {Object} RequestOptionsDTO
 */
export type RequestOptionsDTO = http.RequestOptions & {
  body?: string;
};
