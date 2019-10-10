import 'reflect-metadata';
import {RequestAPI, Request, CoreOptions, RequiredUriUrl} from 'request';

import {inversifyContainer} from './lib';
import {RequesterInterface} from './services';
import {TYPES, PARAMS} from './const';

/**
 * Makes requests according to defined configuration.
 * @param {string} serviceName Service configuration to be used.
 */
export = (serviceName: string): RequestAPI<Request, CoreOptions, RequiredUriUrl> => {
  if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue(serviceName.toLowerCase());
  else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue(serviceName.toLowerCase());
  const requester: RequesterInterface = inversifyContainer.get<RequesterInterface>(TYPES.RequesterInterface);
  return requester.getInstance();
};
