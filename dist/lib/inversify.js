"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const const_1 = require("../const");
const factories_1 = require("../factories");
const services_1 = require("../services");
const container = new inversify_1.Container();
//  Define autowiring by binding interfaces to instanciated class.
container.bind(const_1.TYPES.RequesterInterface).to(services_1.Requester);
container.bind(const_1.TYPES.ConfigurationInterface).to(services_1.Configuration);
container.bind(const_1.TYPES.ProtocolFactoryInterface).to(factories_1.ProtocolFactory);
container
    .bind(const_1.TYPES.ProtocolInterface)
    .to(services_1.HttpProtocol)
    .whenTargetNamed(const_1.PROTOCOLS.HTTP);
container
    .bind(const_1.TYPES.ProtocolInterface)
    .to(services_1.HttpsProtocol)
    .whenTargetNamed(const_1.PROTOCOLS.HTTPS);
exports.default = container;
//# sourceMappingURL=inversify.js.map