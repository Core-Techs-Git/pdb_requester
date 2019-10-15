import {resolve} from 'path';
import {inject, injectable} from 'inversify';

import {PARAMS} from '../const';
import {ServiceConfiguration} from '../models';

@injectable()
export class Configuration implements ConfigurationInterface {
  /**
   * Configuration the specify service.
   * @typedef ServiceConfiguration
   * @access protected
   */
  protected serviceConfig: ServiceConfiguration;

  constructor(@inject(PARAMS.SERVICE_NAME) serviceName: string) {
    this.setServiceConfiguration(serviceName);
  }

  /**
   * Set service configuration property.
   * @param {string} serviceName Name of the service configuration to look for.
   */
  protected setServiceConfiguration(serviceName: string): void {
    try {
      const configPath = resolve(process.cwd(), 'config.js');
      const config = import(configPath);

      if (config.hasOwnProperty(serviceName.toLowerCase())) {
        this.serviceConfig = {
          name: serviceName.toLowerCase(),
          proxy: config[serviceName.toLowerCase()].proxy || false,
        };
      } else throw new Error(`PDB_REQUESTER: Missing entry >> ${serviceName.toLowerCase()} << in configuration file`);
    } catch (err) {
      if (/^PDB_REQUESTER/.test(err.message)) throw err;
      if (/^Cannot find module/.test(err.message)) throw new Error('PDB_REQUESTER: Missing configuration file >> config.js <<');
      throw new Error('PDB_REQUESTER: An error occured when loading configuration.');
    }
  }

  getServiceConfiguration(): ServiceConfiguration {
    return this.serviceConfig;
  }
}

/**
 * Configuration loader.
 */
export interface ConfigurationInterface {
  /**
   * Read the parameters for a service.
   * @returns {ServiceConfiguration} Configuration of the specify service.
   */
  getServiceConfiguration(): ServiceConfiguration;
}
