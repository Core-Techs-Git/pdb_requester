"use strict";
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
const path_1 = require("path");
const inversify_1 = require("inversify");
const const_1 = require("../const");
let Configuration = class Configuration {
    constructor(serviceName) {
        this.setMissingCertificateAuthorities();
        this.setServiceConfiguration(serviceName);
    }
    /**
     * Set service configuration property.
     * @param {string} serviceName Name of the service configuration to look for.
     */
    setServiceConfiguration(serviceName) {
        try {
            const configPath = path_1.resolve(process.cwd(), 'config.js');
            const config = require(configPath).requester[serviceName.toLowerCase()];
            this.serviceConfig = {
                name: serviceName.toLowerCase(),
                proxy: config.proxy || false,
                protocol: config.protocol || 'http',
            };
        }
        catch (err) {
            if (/^Cannot read property/.test(err.message)) {
                switch (/^Cannot read property '(?<property>.*)'/gi.exec(err.message).groups.property) {
                    case 'proxy':
                    case 'protocol':
                        throw new Error(`Missing entry <requester.${serviceName}> in configuration file`);
                    default:
                        throw new Error(`Missing entry <requester> in configuration file`);
                }
            }
            if (/^Cannot find module/.test(err.message))
                throw new Error('Missing configuration file <config.js>');
            throw new Error('An error occured when loading configuration.');
        }
    }
    getServiceConfiguration() {
        return this.serviceConfig;
    }
    /**
     * Set root, intermadiate and extra certificates.
     */
    setMissingCertificateAuthorities() {
        if (process.env.NODE_EXTRA_CA_CERTS) {
            const rootCas = require('ssl-root-cas/latest').create();
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