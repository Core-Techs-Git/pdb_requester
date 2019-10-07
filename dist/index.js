"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const lib_1 = require("./lib");
const const_1 = require("./const");
/**
 * Makes requests according to defined configuration.
 * @param {string} service Service configuration to be used.
 */
module.exports = (serviceName) => {
    if (lib_1.inversifyContainer.isBound(const_1.PARAMS.SERVICE_NAME))
        lib_1.inversifyContainer.rebind(const_1.PARAMS.SERVICE_NAME).toConstantValue(serviceName.toLowerCase());
    else
        lib_1.inversifyContainer.bind(const_1.PARAMS.SERVICE_NAME).toConstantValue(serviceName.toLowerCase());
    const requester = lib_1.inversifyContainer.get(const_1.TYPES.RequesterInterface);
    return requester;
};
//# sourceMappingURL=index.js.map