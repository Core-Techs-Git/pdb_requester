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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https = __importStar(require("https"));
const inversify_1 = require("inversify");
const https_proxy_agent_1 = __importDefault(require("https-proxy-agent"));
const HypertextTransferProtocol_1 = require("./HypertextTransferProtocol");
let HttpsProtocol = class HttpsProtocol extends HypertextTransferProtocol_1.HypertextTransferProtocol {
    constructor() {
        super();
        this.requestor = https;
        this.agent = process.env.http_proxy !== undefined ? new https_proxy_agent_1.default(process.env.http_proxy) : undefined;
    }
};
HttpsProtocol = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], HttpsProtocol);
exports.HttpsProtocol = HttpsProtocol;
//# sourceMappingURL=HttpsProtocol.js.map