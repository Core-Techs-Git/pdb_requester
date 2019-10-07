/// <reference types="node" />
import * as http from 'http';
/**
 * Request options accepted by requester.
 * @typedef {Object} RequestOptionsDTO
 */
export declare type RequestOptionsDTO = http.RequestOptions & {
    body?: string;
};
