/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {join} from 'path';
import {get, has} from 'config';

import {TYPES} from '../../src/const/types';
import {PARAMS} from '../../src/const/params';
import {inversifyContainer} from '../../src/lib';
import {ConfigurationError} from '../../src/error/ConfigurationError';
import {ConfigurationInterface} from '../../src/services/Configuration';
import {ServiceConfiguration} from '../../src/models/ServiceConfiguration';

jest.mock('config', () => ({
  has: jest.fn(),
  get: jest.fn(),
}));

describe('Configuration service', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Should return service proxy config if correctly configured', () => {
    process.env.NODE_EXTRA_CA_CERTS = join(__dirname, '../fixture/cert/test.pem');
    (has as any).mockReturnValue(true);
    (get as any).mockReturnValue({
      proxy: true,
      protocol: 'https',
      host: 'hostname.com',
    });

    if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
    else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');
    const config: ServiceConfiguration = inversifyContainer.get<ConfigurationInterface>(TYPES.ConfigurationInterface).getServiceConfiguration();

    delete process.env.NODE_EXTRA_CA_CERTS;

    expect(config.proxy).toBe(true);
    expect(config.baseUrl).toBe('https://hostname.com/');
  });

  test('Should throw an error if service name is missing', done => {
    try {
      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue(undefined);
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue(undefined);

      inversifyContainer.get<ConfigurationInterface>(TYPES.ConfigurationInterface);
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
      expect(err.message).toBe(`Missing configuration service name`);
      done();
    }
  });

  test('Should throw an error if service name type is not string', done => {
    try {
      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue(1);
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue(1);

      inversifyContainer.get<ConfigurationInterface>(TYPES.ConfigurationInterface);
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
      expect(err.message).toBe(`Invalid configuration service name`);
      done();
    }
  });

  test("Should throw an error if service protocol config isn't http or https", done => {
    (has as any).mockReturnValue(true);
    (get as any).mockReturnValue({
      proxy: true,
      protocol: 'wrong',
      host: 'hostname.com',
    });
    try {
      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');

      inversifyContainer.get<ConfigurationInterface>(TYPES.ConfigurationInterface);
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
      expect(err.message).toBe(`Invalid protocol for entry 'search' in configuration`);
      done();
    }
  });

  test('Should throw an error if service name entry in config is missing', done => {
    (has as any).mockReturnValue(false);
    try {
      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');

      inversifyContainer.get<ConfigurationInterface>(TYPES.ConfigurationInterface);
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
      expect(err.message).toBe(`Missing entry 'search' in configuration`);
      done();
    }
  });

  test('Should throw an error if anything goes wrong', done => {
    (has as any).mockReturnValue(true);
    (get as any).mockImplementation(() => {
      throw new Error('test');
    });
    try {
      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');

      inversifyContainer.get<ConfigurationInterface>(TYPES.ConfigurationInterface);
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
      expect(err.message).toMatch(/^An error occured when loading configuration — Error: test/);
      done();
    }
  });

  afterAll(() => {
    jest.unmock('config');
  });
});
