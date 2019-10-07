import {injectable} from 'inversify';

import {TYPES} from '../const';
import {inversifyContainer} from '../lib';
import {ProtocolInterface} from '../interfaces';

@injectable()
export class ProtocolFactory implements ProtocolFactoryInterface {
  createProtocol(protocol: string): ProtocolInterface {
    return inversifyContainer.getNamed<ProtocolInterface>(TYPES.ProtocolInterface, protocol);
  }
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
