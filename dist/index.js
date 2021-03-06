"use strict";
/**
 * @ignore
 * @packageDocumentation
 */
require("reflect-metadata");
const const_1 = require("./const");
const error_1 = require("./error");
const lib_1 = require("./lib");
module.exports = (serviceName) => {
    try {
        if (lib_1.inversifyContainer.isBound(const_1.PARAMS.SERVICE_NAME))
            lib_1.inversifyContainer.rebind(const_1.PARAMS.SERVICE_NAME).toConstantValue(serviceName);
        else
            lib_1.inversifyContainer.bind(const_1.PARAMS.SERVICE_NAME).toConstantValue(serviceName);
        const requester = lib_1.inversifyContainer.get(const_1.TYPES.RequesterInterface);
        return requester.getInstance();
    }
    catch (err) {
        throw new error_1.RequesterError(err);
    }
};
//# sourceMappingURL=index.js.map