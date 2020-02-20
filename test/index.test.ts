/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {get, has} from 'config';
import {defaults} from 'request';

import requester from '../src/index';
import {RequesterError} from '../src/error/RequesterError';

jest.mock('config', () => ({
  has: jest.fn(),
  get: jest.fn(),
}));

jest.mock('request', () => ({
  defaults: jest.fn(),
}));

describe('PDB Requester', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Should return a request module object', () => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    process.env.http_proxy = 'http://hostname.com';
    (has as any).mockReturnValue(true);
    (get as any).mockReturnValue({
      proxy: true,
      protocol: 'https',
      host: 'hostname.com',
      path: '/path',
    });

    const requesterObj = {test: 'object'};
    (defaults as any).mockReturnValue(requesterObj);

    expect(requester('search')).toMatchObject(requesterObj);
    expect(requester('test')).toMatchObject(requesterObj);
  });

  test('Should throw an error if anything goes wrong', () => {
    (defaults as any).mockImplementation(() => {
      throw new Error('test');
    });

    expect(() => {
      requester('search');
    }).toThrowError(RequesterError);

    (defaults as any).mockImplementation(() => {
      throw undefined;
    });

    expect(() => {
      requester('search');
    }).toThrowError(RequesterError);
  });

  afterAll(() => {
    jest.unmock('config');
    jest.unmock('request');
  });
});
