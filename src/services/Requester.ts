import {inject, injectable} from 'inversify';

import {TYPES} from '../const';
import {ProtocolInterface} from '../interfaces';
import {ProtocolFactoryInterface} from '../factories';
import {ConfigurationInterface} from './Configuration';
import {RequestOptionsDTO, Callback} from '../models';

@injectable()
export class Requester implements RequesterInterface {
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

  constructor(
    @inject(TYPES.ConfigurationInterface) config: ConfigurationInterface,
    @inject(TYPES.ProtocolFactoryInterface) protocolFactory: ProtocolFactoryInterface,
  ) {
    if (config.getServiceConfiguration().proxy && process.env.http_proxy === undefined) throw new Error('Missing environment variable <http_proxy>.');
    this.config = config;
    this.protocol = protocolFactory.createProtocol(config.getServiceConfiguration().protocol);
  }

  request(options: RequestOptionsDTO, callback: Callback): void {
    this.protocol.request(
      {
        ...options,
        useProxy: this.config.getServiceConfiguration().proxy,
      },
      callback,
    );
  }
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
