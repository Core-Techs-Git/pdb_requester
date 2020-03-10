/**
 * @module service
 * @packageDocumentation
 */

import {has, get} from 'config';
import {inject, injectable} from 'inversify';

import {PARAMS} from '@/const';
import {ConfigurationError} from '@/error';
import {ServiceConfiguration} from '@/models';

/** Implementation of a configuration loader */
@injectable()
export class Configuration implements ConfigurationInterface {
  /**
   * Configuration of the specify service.
   * @type {ServiceConfiguration}
   * @access protected
   */
  protected serviceConfig: ServiceConfiguration;

  /**
   * @param {string} serviceName Name of the service whose configuration is to be loaded.
   */
  constructor(@inject(PARAMS.SERVICE_NAME) serviceName: string) {
    this.setMissingCertificateAuthorities();
    this.setServiceConfiguration(serviceName);
  }

  /**
   * Set service configuration property.
   * @param {string} serviceName Name of the service configuration to look for.
   */
  protected setServiceConfiguration(serviceName: string): void {
    if (!serviceName) throw new ConfigurationError('Missing configuration service name');
    if (typeof serviceName !== 'string') throw new ConfigurationError('Invalid configuration service name');
    try {
      serviceName = serviceName.toLowerCase();
      if (has(serviceName)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const config: {[prop: string]: any} = get(serviceName);

        this.serviceConfig = {
          proxy: config.proxy || false,
        };

        if (config.protocol && config.host) {
          if (!/^https?$/.test(config.protocol)) throw new ConfigurationError(`Invalid protocol for entry '${serviceName}' in configuration`);
          this.serviceConfig.baseUrl = `${config.protocol}://${config.host}/`;
          // Remove first character if it's /
          if (config.path) this.serviceConfig.baseUrl += `${config.path.replace(/^\//, '')}`;
        }
      } else throw new ConfigurationError(`Missing entry '${serviceName}' in configuration`);
    } catch (err) {
      if (err instanceof ConfigurationError) throw err;
      throw new ConfigurationError(`An error occured when loading configuration — ${err.stack}`);
    }
  }

  getServiceConfiguration(): ServiceConfiguration {
    return this.serviceConfig;
  }

  /** Set root, intermadiate and extra certificates if specified in env variable `NODE_EXTRA_CA_CERTS`. */
  protected setMissingCertificateAuthorities(): void {
    if (process.env.NODE_EXTRA_CA_CERTS) {
      const rootCas = require('ssl-root-cas').create();
      rootCas.addFile(process.env.NODE_EXTRA_CA_CERTS);
      require('https').globalAgent.options.ca = rootCas;
    }
  }
}

/** Configuration loader */
export interface ConfigurationInterface {
  /**
   * Read the configuration parameters for a service.
   * @returns {ServiceConfiguration} Configuration of the specify service.
   */
  getServiceConfiguration(): ServiceConfiguration;
}
