"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @module service
 * @packageDocumentation
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const config_1 = require("config");
const inversify_1 = require("inversify");
const const_1 = require("../const");
const error_1 = require("../error");
/** Implementation of a configuration loader */
let Configuration = class Configuration {
    /**
     * @param {string} serviceName Name of the service whose configuration is to be loaded.
     */
    constructor(serviceName) {
        this.setMissingCertificateAuthorities();
        this.setServiceConfiguration(serviceName);
    }
    /**
     * Set service configuration property.
     * @param {string} serviceName Name of the service configuration to look for.
     */
    setServiceConfiguration(serviceName) {
        if (!serviceName)
            throw new error_1.ConfigurationError('Missing configuration service name');
        if (typeof serviceName !== 'string')
            throw new error_1.ConfigurationError('Invalid configuration service name');
        try {
            serviceName = serviceName.toLowerCase();
            if (config_1.has(serviceName)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const config = config_1.get(serviceName);
                this.serviceConfig = {
                    proxy: config.proxy || false,
                };
                if (config.protocol && config.host) {
                    if (!/^https?$/.test(config.protocol))
                        throw new error_1.ConfigurationError(`Invalid protocol for entry '${serviceName}' in configuration`);
                    this.serviceConfig.baseUrl = `${config.protocol}://${config.host}/`;
                    // Remove first character if it's /
                    if (config.path)
                        this.serviceConfig.baseUrl += `${config.path.replace(/^\//, '')}`;
                }
            }
            else
                throw new error_1.ConfigurationError(`Missing entry '${serviceName}' in configuration`);
        }
        catch (err) {
            if (err instanceof error_1.ConfigurationError)
                throw err;
            throw new error_1.ConfigurationError(`An error occured when loading configuration — ${err.stack}`);
        }
    }
    getServiceConfiguration() {
        return this.serviceConfig;
    }
    /** Set root, intermadiate and extra certificates if specified in env variable `NODE_EXTRA_CA_CERTS`. */
    setMissingCertificateAuthorities() {
        if (process.env.NODE_EXTRA_CA_CERTS) {
            const rootCas = require('ssl-root-cas').create();
            rootCas.addFile(process.env.NODE_EXTRA_CA_CERTS);
            require('https').globalAgent.options.ca = rootCas;
        }
    }
};
Configuration = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(const_1.PARAMS.SERVICE_NAME)),
    __metadata("design:paramtypes", [String])
], Configuration);
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map