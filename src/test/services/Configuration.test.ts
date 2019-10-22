import 'reflect-metadata';
import {resolve} from 'path';
import {writeFileSync, unlinkSync} from 'fs';

import {PARAMS, TYPES} from '../../const';
import {inversifyContainer} from '../../lib';
import {ServiceConfiguration} from '../../models';
import {ConfigurationInterface} from '../../services/Configuration';

describe('Configuration service', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Should return service proxy config if correctly configured', () => {
    const configPath = resolve(process.cwd(), 'config.js');
    writeFileSync(configPath, "module.exports={search:{proxy:true,protocol:'https',host:'host.name',path:'/path'}};");

    if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
    else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');
    const config: ServiceConfiguration = inversifyContainer.get<ConfigurationInterface>(TYPES.ConfigurationInterface).getServiceConfiguration();

    unlinkSync(configPath);
    expect(config.name).toBe('search');
    expect(config.proxy).toBe(true);
    expect(config.baseUrl).toBe('https://host.name/path');
  });

  test("Should throw an error if service protocol config isn't http or https", () => {
    let configPath;
    try {
      configPath = resolve(process.cwd(), 'config.js');
      writeFileSync(configPath, "module.exports={search:{protocol:'wrong'}};");

      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');

      inversifyContainer.get<ConfigurationInterface>(TYPES.ConfigurationInterface);
    } catch (err) {
      expect(err.message).toBe(`PDB_REQUESTER: Invalid protocol for entry 'search' in configuration file '${configPath}'`);
    } finally {
      unlinkSync(configPath);
    }
  });

  test('Should throw an error if service proxy config is missing', () => {
    let configPath;
    try {
      configPath = resolve(process.cwd(), 'config.js');
      writeFileSync(configPath, 'module.exports={search:{test:true}};');

      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');

      inversifyContainer.get<ConfigurationInterface>(TYPES.ConfigurationInterface);
    } catch (err) {
      expect(err.message).toBe(`PDB_REQUESTER: Missing entry 'search' in configuration file '${configPath}'`);
    } finally {
      unlinkSync(configPath);
    }
  });

  test('Should throw an error if config.js is missing', () => {
    try {
      if (inversifyContainer.isBound(PARAMS.SERVICE_NAME)) inversifyContainer.rebind(PARAMS.SERVICE_NAME).toConstantValue('search');
      else inversifyContainer.bind(PARAMS.SERVICE_NAME).toConstantValue('search');
      inversifyContainer.get<ConfigurationInterface>(TYPES.ConfigurationInterface);
    } catch (err) {
      expect(err.message).toBe(`PDB_REQUESTER: Missing configuration file '${resolve(process.cwd(), 'config.js')}'`);
    }
  });
});
