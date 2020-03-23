/**
 * @ignore
 * @packageDocumentation
 */
import 'reflect-metadata';
import { RequestAPI, Request, CoreOptions, RequiredUriUrl } from 'request';
declare const _default: (serviceName: string) => RequestAPI<Request, CoreOptions, RequiredUriUrl>;
/**
 * Makes requests according to defined configuration.
 * @param {string} serviceName Service configuration to be used.
 */
export = _default;
