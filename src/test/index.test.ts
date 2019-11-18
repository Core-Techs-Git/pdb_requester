/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
import {resolve} from 'path';
import {writeFileSync, unlinkSync} from 'fs';

let tmpProxy;
describe('PDB Requester', () => {
  beforeAll(() => {
    if (process.env.http_proxy) tmpProxy = process.env.http_proxy;
  });

  test('Should return a request module object', () => {
    const configPath = resolve(process.cwd(), 'config.js');
    writeFileSync(configPath, 'module.exports={search:{proxy:true}};');
    process.env.http_proxy = 'http://host.name';

    const requester = require('../index')('search');
    const request = require('request').defaults({
      tunnel: false,
      proxy: true,
    });

    unlinkSync(configPath);
    expect(1).toBe(2);
    expect(JSON.stringify(requester)).toBe(JSON.stringify(request));
  });

  afterAll(() => {
    if (tmpProxy) process.env.http_proxy = tmpProxy;
  });
});
