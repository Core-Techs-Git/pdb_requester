/// <reference types="node" />
import { Agent } from 'http';
import { ProtocolInterface } from '../../interfaces';
import { ProtocolRequestOptions, Callback } from '../../models';
export declare abstract class HypertextTransferProtocol implements ProtocolInterface {
    /**
     * Proxy agent object according to configuration.
     * @access protected
     */
    protected agent: Agent;
    /**
     * Request object according to configuration.
     * @access protected
     */
    protected requestor: any;
    request(options: ProtocolRequestOptions, callback: Callback): void;
}
