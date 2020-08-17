"use strict";
/**
 * @module error
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequesterError = void 0;
/** Module default errors */
class RequesterError extends Error {
    /**
     * @param info Information about the error
     */
    constructor(info) {
        if (typeof info === 'string')
            super(info);
        else if (info instanceof Error)
            super(info.message);
        else
            super('An unidentify error occured.');
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.RequesterError = RequesterError;
//# sourceMappingURL=RequesterError.js.map