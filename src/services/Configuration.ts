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
    this.setMissingCertificateAuthorities();
    this.setServiceConfiguration(serviceName);
  }

  /**
   * Set service configuration property.
   * @param {string} serviceName Name of the service configuration to look for.
   */
  protected setServiceConfiguration(serviceName: string): void {
    try {
      const configPath = resolve(process.cwd(), 'config.js');
      const config = require(configPath).requester[serviceName.toLowerCase()];
      this.serviceConfig = {
        name: serviceName.toLowerCase(),
        proxy: config.proxy || false,
        protocol: config.protocol || 'http',
      };
    } catch (err) {
      if (/^Cannot read property/.test(err.message)) {
        switch (/^Cannot read property '(?<property>.*)'/gi.exec(err.message).groups.property) {
          case 'proxy':
          case 'protocol':
            throw new Error(`Missing entry <requester.${serviceName}> in configuration file`);
          default:
            throw new Error(`Missing entry <requester> in configuration file`);
        }
      }
      if (/^Cannot find module/.test(err.message)) throw new Error('Missing configuration file <config.js>');
      throw new Error('An error occured when loading configuration.');
    }
  }

  getServiceConfiguration(): ServiceConfiguration {
    return this.serviceConfig;
  }

  /**
   * Set root, intermadiate and extra certificates.
   */
  protected setMissingCertificateAuthorities(): void {
    if (process.env.NODE_EXTRA_CA_CERTS) {
      const rootCas = require('ssl-root-cas/latest').create();
      rootCas.addFile(process.env.NODE_EXTRA_CA_CERTS);
      require('https').globalAgent.options.ca = rootCas;
    }
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
