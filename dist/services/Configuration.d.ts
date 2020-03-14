/**
 * @module service
 * @packageDocumentation
 */
import { ServiceConfiguration } from "../models";
/** Implementation of a configuration loader */
export declare class Configuration implements ConfigurationInterface {
    /**
     * Configuration of the specify service.
     * @type {ServiceConfiguration}
     * @access protected
     */
    protected serviceConfig: ServiceConfiguration;
    /**
     * @param {string} serviceName Name of the service whose configuration is to be loaded.
     */
    constructor(serviceName: string);
    /**
     * Set service configuration property.
     * @param {string} serviceName Name of the service configuration to look for.
     */
    protected setServiceConfiguration(serviceName: string): void;
    getServiceConfiguration(): ServiceConfiguration;
    /** Set root, intermadiate and extra certificates if specified in env variable `NODE_EXTRA_CA_CERTS`. */
    protected setMissingCertificateAuthorities(): void;
}
/** Configuration loader */
export interface ConfigurationInterface {
    /**
     * Read the configuration parameters for a service.
     * @returns {ServiceConfiguration} Configuration of the specify service.
     */
    getServiceConfiguration(): ServiceConfiguration;
}
