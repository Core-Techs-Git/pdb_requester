/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {get, has} from 'config';
import {defaults} from 'request';

import {TYPES} from '../../src/const/types';
import {PARAMS} from '../../src/const/params';
import {inversifyContainer} from '../../src/lib';
import {RequesterError} from '../../src/error/RequesterError';
import {RequesterInterface} from '../../src/services/Requester';

jest.mock('config', () => ({
  has: jest.fn(),
  get: jest.fn(),
}));

jest.mock('request', () => ({
  defaults: jest.fn(),
}));

describe('Requester service', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Should return request object configured correctly', () => {
    process.env.http_proxy = 'http://hostname.com';
    (has as any).mockReturnValue(true);
    (get as any).mockReturnValue({
      proxy: true,
      protocol: 'https',
      host: 'hostname.com',
      path: '/path',
    });

    if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
    else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');

    inversifyContainer.get<RequesterInterface>(TYPES.RequesterInterface).getInstance();

    expect(defaults).toHaveBeenCalledWith({
      tunnel: true,
      baseUrl: 'https://hostname.com/path',
      proxy: 'http://hostname.com',
    });

    process.env.http_proxy = 'http://hostname.com';
    (has as any).mockReturnValue(true);
    (get as any).mockReturnValue({
      proxy: false,
    });

    inversifyContainer.get<RequesterInterface>(TYPES.RequesterInterface).getInstance();

    expect(defaults).toHaveBeenCalledWith({
      tunnel: true,
      baseUrl: '',
      proxy: false,
    });
  });

  test('Should throw an error if environment variable http_proxy is missing but needed', done => {
    delete process.env.http_proxy;
    (has as any).mockReturnValue(true);
    (get as any).mockReturnValue({proxy: true});

    try {
      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');

      inversifyContainer.get<RequesterInterface>(TYPES.RequesterInterface).getInstance();
    } catch (err) {
      expect(err).toBeInstanceOf(RequesterError);
      expect(err.message).toBe("Missing environment variable 'http_proxy'");
      done();
    }
  });

  afterAll(() => {
    jest.unmock('config');
    jest.unmock('request');
  });
});
