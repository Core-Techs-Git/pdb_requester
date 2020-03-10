/**
 * @module error
 * @packageDocumentation
 */
/** Module default errors */
export declare class RequesterError extends Error {
    /**
     * @param info Information about the error
     */
    constructor(info?: string | Error);
}
