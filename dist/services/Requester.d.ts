import { ProtocolInterface } from '../interfaces';
import { ProtocolFactoryInterface } from '../factories';
import { ConfigurationInterface } from './Configuration';
import { RequestOptionsDTO, Callback } from '../models';
export declare class Requester implements RequesterInterface {
    /**
     * Service configuration.
     * @typedef ConfigurationInterface
     * @access protected
     */
    protected config: ConfigurationInterface;
    /**
     * Protocol used by requester.
     * @typedef ProtocolInterface
     * @access protected
     */
    protected protocol: ProtocolInterface;
    constructor(config: ConfigurationInterface, protocolFactory: ProtocolFactoryInterface);
    request(options: RequestOptionsDTO, callback: Callback): void;
}
/**
 * Handle requests base on provided data and configurations.
 */
export interface RequesterInterface {
    /**
     * Make a request with provided parameters.
     * @param {RequestOptionsDTO} options The request data
     * @param {Callback} callback Execute when request is done.
     */
    request(options: RequestOptionsDTO, callback: Callback): void;
}
