/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {resolve} from 'path';
import {writeFileSync, unlinkSync} from 'fs';
import {RequestAPI, Request, CoreOptions, RequiredUriUrl} from 'request';

import {PARAMS, TYPES} from '../../const';
import {inversifyContainer} from '../../lib';
import {RequesterInterface} from '../../services';

let tmpProxy;
describe('Requester service', () => {
  beforeAll(() => {
    if (process.env.http_proxy) tmpProxy = process.env.http_proxy;
  });

  beforeEach(() => {
    jest.resetModules();
  });

  test('Should make request through the proxy if set so', done => {
    const configPath = resolve(process.cwd(), 'config.js');
    writeFileSync(configPath, 'module.exports={search:{proxy:true}};');
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

  test('Should make request using baseUrl if set so', done => {
    const configPath = resolve(process.cwd(), 'config.js');
    writeFileSync(configPath, "module.exports={search:{proxy:false,protocol:'https',host:'somehost.name',path:'/path'}};");

    if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
    else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');
    const requester: RequestAPI<Request, CoreOptions, RequiredUriUrl> = inversifyContainer
      .get<RequesterInterface>(TYPES.RequesterInterface)
      .getInstance();

    unlinkSync(configPath);
    // Can also be an empty string
    requester('/other-path', err => {
      expect(err.code).toBe('ENOTFOUND');
      expect(err.host).toBe('somehost.name');
      expect(err.port).toBe(443);
      done();
    });
  });

  test('Should throw an error if environment variable http_proxy is missing', () => {
    let configPath;
    try {
      configPath = resolve(process.cwd(), 'config.js');
      writeFileSync(configPath, 'module.exports={search:{proxy:true}};');
      if (process.env.http_proxy) delete process.env.http_proxy;

      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');
      inversifyContainer.get<RequesterInterface>(TYPES.RequesterInterface);
    } catch (err) {
      expect(err.message).toBe("PDB_REQUESTER: Missing environment variable 'http_proxy'");
    } finally {
      unlinkSync(configPath);
    }
  });

  afterAll(() => {
    if (tmpProxy) process.env.http_proxy = tmpProxy;
  });
});
