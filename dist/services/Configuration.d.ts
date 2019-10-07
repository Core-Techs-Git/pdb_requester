import { ServiceConfiguration } from '../models';
export declare class Configuration implements ConfigurationInterface {
    /**
     * Configuration the specify service.
     * @typedef ServiceConfiguration
     * @access protected
     */
    protected serviceConfig: ServiceConfiguration;
    constructor(serviceName: string);
    /**
     * Set service configuration property.
     * @param {string} serviceName Name of the service configuration to look for.
     */
    protected setServiceConfiguration(serviceName: string): void;
    getServiceConfiguration(): ServiceConfiguration;
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
