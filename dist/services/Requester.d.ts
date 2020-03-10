/**
 * @module service
 * @packageDocumentation
 */
import { RequestAPI, Request, CoreOptions, RequiredUriUrl } from 'request';
import { ConfigurationInterface } from '@/services/Configuration';
/** Implementation of a requester */
export declare class Requester implements RequesterInterface {
    /**
     * Service configuration.
     * @typedef {ConfigurationInterface}
     * @access protected
     */
    protected config: ConfigurationInterface;
    /**
     * @param {ConfigurationInterface} config Configuration loader
     */
    constructor(config: ConfigurationInterface);
    getInstance(): RequestAPI<Request, CoreOptions, RequiredUriUrl>;
}
/**
 * Handle requests base on provided data and configurations.
 */
export interface RequesterInterface {
    /**
     * Make an instance of request based on configuration.
     * @returns {RequestAPI<Request, CoreOptions, RequiredUriUrl>} A request module object used to make request
     */
    getInstance(): RequestAPI<Request, CoreOptions, RequiredUriUrl>;
}
