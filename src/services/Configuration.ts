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
    let configPath;
    try {
      configPath = resolve(process.cwd(), 'config.js');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const config = require(configPath);
      serviceName = serviceName.toLowerCase();
      if (config.hasOwnProperty(serviceName)) {
        this.serviceConfig = {
          name: serviceName,
          proxy: config[serviceName].proxy || false,
        };

        if (config[serviceName].protocol && config[serviceName].host) {
          if (config[serviceName].protocol !== 'http' && config[serviceName].protocol !== 'https')
            throw new Error(`PDB_REQUESTER: Invalid protocol for entry '${serviceName}' in configuration file '${configPath}'`);
          this.serviceConfig.baseUrl = `${config[serviceName].protocol}://${config[serviceName].host}/`;
          if (config[serviceName].path) {
            config[serviceName].path = config[serviceName].path.replace(/^\//, ''); // Remove first character if it's /
            this.serviceConfig.baseUrl += `${config[serviceName].path}`;
          }
        }
      } else throw new Error(`PDB_REQUESTER: Missing entry '${serviceName}' in configuration file '${configPath}'`);
    } catch (err) {
      if (/^PDB_REQUESTER/.test(err.message)) throw err;
      if (/^Cannot find module/.test(err.message) || err.code === 'ENOENT')
        throw new Error(`PDB_REQUESTER: Missing configuration file '${configPath}'`);
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
