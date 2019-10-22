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
        this.setServiceConfiguration(serviceName);
    }
    /**
     * Set service configuration property.
     * @param {string} serviceName Name of the service configuration to look for.
     */
    setServiceConfiguration(serviceName) {
        let configPath;
        try {
            configPath = path_1.resolve(process.cwd(), 'config.js');
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
            }
            else
                throw new Error(`PDB_REQUESTER: Missing entry '${serviceName}' in configuration file '${configPath}'`);
        }
        catch (err) {
            if (/^PDB_REQUESTER/.test(err.message))
                throw err;
            if (/^Cannot find module/.test(err.message) || err.code === 'ENOENT')
                throw new Error(`PDB_REQUESTER: Missing configuration file '${configPath}'`);
            throw new Error('PDB_REQUESTER: An error occured when loading configuration.');
        }
    }
    getServiceConfiguration() {
        return this.serviceConfig;
    }
};
Configuration = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(const_1.PARAMS.SERVICE_NAME)),
    __metadata("design:paramtypes", [String])
], Configuration);
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map