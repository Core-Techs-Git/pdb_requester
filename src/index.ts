import 'module-alias/register';
import 'reflect-metadata';
import {RequestAPI, Request, CoreOptions, RequiredUriUrl} from 'request';

import {TYPES, PARAMS} from '@pdb_requester/const';
import {RequesterError} from '@pdb_requester/error';
import {inversifyContainer} from '@pdb_requester/lib';
import {RequesterInterface} from '@pdb_requester/services';

/**
 * Makes requests according to defined configuration.
 * @param {string} serviceName Service configuration to be used.
 */
export = (serviceName: string): RequestAPI<Request, CoreOptions, RequiredUriUrl> => {
  try {
    if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue(serviceName);
    else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue(serviceName);
    const requester: RequesterInterface = inversifyContainer.get<RequesterInterface>(TYPES.RequesterInterface);
    return requester.getInstance();
  } catch (err) {
    throw new RequesterError(err);
  }
};
