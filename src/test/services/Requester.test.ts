import 'reflect-metadata';
import {resolve} from 'path';
import {writeFileSync, unlinkSync} from 'fs';
import {RequestAPI, Request, CoreOptions, RequiredUriUrl} from 'request';

import {PARAMS, TYPES} from '../../const';
import {inversifyContainer} from '../../lib';
import {RequesterInterface} from '../../services';

describe('Requester service', () => {
  test('Should make request through the proxy if set so', done => {
    const configPath = resolve(process.cwd(), 'config.js');
    writeFileSync(configPath, 'module.exports={search:{proxy:true}};');
    // eslint-disable-next-line @typescript-eslint/camelcase
    process.env.http_proxy = 'http://host.name';

    if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
    else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');
    const requester: RequestAPI<Request, CoreOptions, RequiredUriUrl> = inversifyContainer
      .get<RequesterInterface>(TYPES.RequesterInterface)
      .getInstance();

    unlinkSync(configPath);
    requester('https://laplateforme.com/', err => {
      expect(err.code).toBe('ENOTFOUND');
      expect(err.host).toBe('host.name');
      done();
    });
  });

  test('Should throw an error if environment variable http_proxy is missing', () => {
    let configPath;
    try {
      configPath = resolve(process.cwd(), 'config.js');
      writeFileSync(configPath, 'module.exports={search:{proxy:true}};');

      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');
      inversifyContainer.get<RequesterInterface>(TYPES.RequesterInterface);
    } catch (err) {
      expect(err.message).toBe("PDB_REQUESTER: Missing environment variable 'http_proxy'");
    } finally {
      unlinkSync(configPath);
    }
  });
});
