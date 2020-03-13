import { RequestAPI, Request, CoreOptions, RequiredUriUrl } from 'request';
import { ConfigurationInterface } from "./Configuration";
export declare class Requester implements RequesterInterface {
    /**
     * Service configuration.
     * @typedef ConfigurationInterface
     * @access protected
     */
    protected config: ConfigurationInterface;
    constructor(config: ConfigurationInterface);
    getInstance(): RequestAPI<Request, CoreOptions, RequiredUriUrl>;
}
/**
 * Handle requests base on provided data and configurations.
 */
export interface RequesterInterface {
    /**
     * Make an instance of request based on config.
     */
    getInstance(): RequestAPI<Request, CoreOptions, RequiredUriUrl>;
}
