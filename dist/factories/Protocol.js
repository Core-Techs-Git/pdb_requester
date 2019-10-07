"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const const_1 = require("../const");
const lib_1 = require("../lib");
let ProtocolFactory = class ProtocolFactory {
    createProtocol(protocol) {
        return lib_1.inversifyContainer.getNamed(const_1.TYPES.ProtocolInterface, protocol);
    }
};
ProtocolFactory = __decorate([
    inversify_1.injectable()
], ProtocolFactory);
exports.ProtocolFactory = ProtocolFactory;
//# sourceMappingURL=Protocol.js.map