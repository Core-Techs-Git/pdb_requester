"use strict";
/**
 * Provide fonctionalities through external libraries.
 *
 * @module lib
 * @preferred
 * @packageDocumentation
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const container = __importStar(require("./inversify"));
/** @ignore */
exports.inversifyContainer = container.default;
//# sourceMappingURL=index.js.map