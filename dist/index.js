"use strict";
require("reflect-metadata");
const lib_1 = require("./lib");
const const_1 = require("./const");
module.exports = (serviceName) => {
    if (lib_1.inversifyContainer.isBound(const_1.PARAMS.SERVICE_NAME))
        lib_1.inversifyContainer.rebind(const_1.PARAMS.SERVICE_NAME).toConstantValue(serviceName.toLowerCase());
    else
        lib_1.inversifyContainer.bind(const_1.PARAMS.SERVICE_NAME).toConstantValue(serviceName.toLowerCase());
    const requester = lib_1.inversifyContainer.get(const_1.TYPES.RequesterInterface);
    return requester.getInstance();
};
//# sourceMappingURL=index.js.map