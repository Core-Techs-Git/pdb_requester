"use strict";
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
exports.Requester = void 0;
const inversify_1 = require("inversify");
const request_1 = require("request");
const const_1 = require("../const");
const error_1 = require("../error");
/** Implementation of a requester */
let Requester = class Requester {
    /**
     * @param {ConfigurationInterface} config Configuration loader
     */
    constructor(config) {
        if (config.getServiceConfiguration().proxy && process.env.http_proxy === undefined)
            throw new error_1.RequesterError("Missing environment variable 'http_proxy'");
        this.config = config;
    }
    getInstance() {
        return request_1.defaults({
            tunnel: true,
            baseUrl: this.config.getServiceConfiguration().baseUrl || '',
            proxy: this.config.getServiceConfiguration().proxy ? process.env.http_proxy : false,
        });
    }
};
Requester = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(const_1.TYPES.ConfigurationInterface)),
    __metadata("design:paramtypes", [Object])
], Requester);
exports.Requester = Requester;
//# sourceMappingURL=Requester.js.map