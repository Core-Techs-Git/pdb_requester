import { ProtocolInterface } from '../interfaces';
export declare class ProtocolFactory implements ProtocolFactoryInterface {
    createProtocol(protocol: string): ProtocolInterface;
}
/**
 * Provide a protocol object based on parameters provided.
 */
export interface ProtocolFactoryInterface {
    /**
     * Create a protocol object.
     * @param {string} protocol The name of the protocol to instanciate
     * @returns {ProtocolInterface} A protocol object to be use.
     */
    createProtocol(protocol: string): ProtocolInterface;
}
