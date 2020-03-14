"use strict";
/**
 * @module lib
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const const_1 = require("../const");
const services_1 = require("../services");
/**
 * Inversion of control container.
 * Provided by  [InversifyJS]{@link http://inversify.io/}
 * @type {Container}
 */
const container = new inversify_1.Container();
//  Define autowiring by binding interfaces to instanciated class.
container.bind(const_1.TYPES.RequesterInterface).to(services_1.Requester);
container.bind(const_1.TYPES.ConfigurationInterface).to(services_1.Configuration);
exports.default = container;
//# sourceMappingURL=inversify.js.map