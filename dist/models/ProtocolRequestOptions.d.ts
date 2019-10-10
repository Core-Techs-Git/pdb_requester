import { RequestOptionsDTO } from '.';
/**
 * Request options accepted by requester.
 * @typedef {Object} ProtocolRequestOptions
 */
export declare type ProtocolRequestOptions = RequestOptionsDTO & {
    useProxy: boolean;
};
