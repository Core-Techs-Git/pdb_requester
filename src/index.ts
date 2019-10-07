import 'reflect-metadata';
import {inversifyContainer} from './lib';
import {RequesterInterface} from './services';
import {TYPES, PARAMS} from './const';

/**
 * Makes requests according to defined configuration.
 * @param {string} service Service configuration to be used.
 */
module.exports = (serviceName: string): RequesterInterface => {
  if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue(serviceName.toLowerCase());
  else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue(serviceName.toLowerCase());
  const requester: RequesterInterface = inversifyContainer.get<RequesterInterface>(TYPES.RequesterInterface);
  return requester;
};
