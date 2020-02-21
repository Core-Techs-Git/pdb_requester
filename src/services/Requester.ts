import {inject, injectable} from 'inversify';
import {RequestAPI, Request, CoreOptions, RequiredUriUrl, defaults} from 'request';

import {TYPES} from '@/const';
import {RequesterError} from '@/error';
import {ConfigurationInterface} from '@/services/Configuration';

@injectable()
export class Requester implements RequesterInterface {
  /**
   * Service configuration.
   * @typedef ConfigurationInterface
   * @access protected
   */
  protected config: ConfigurationInterface;

  constructor(@inject(TYPES.ConfigurationInterface) config: ConfigurationInterface) {
    if (config.getServiceConfiguration().proxy && process.env.http_proxy === undefined)
      throw new RequesterError("Missing environment variable 'http_proxy'");
    this.config = config;
  }

  getInstance(): RequestAPI<Request, CoreOptions, RequiredUriUrl> {
    return defaults({
      tunnel: false,
      baseUrl: this.config.getServiceConfiguration().baseUrl || '',
      proxy: this.config.getServiceConfiguration().proxy ? process.env.http_proxy : false,
    });
  }
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
