"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/camelcase */
require("reflect-metadata");
const path_1 = require("path");
const fs_1 = require("fs");
const const_1 = require("../../const");
const lib_1 = require("../../lib");
let tmpProxy;
describe('Requester service', () => {
    beforeAll(() => {
        if (process.env.http_proxy)
            tmpProxy = process.env.http_proxy;
    });
    beforeEach(() => {
        jest.resetModules();
    });
    test('Should make request through the proxy if set so', done => {
        const configPath = path_1.resolve(process.cwd(), 'config.js');
        fs_1.writeFileSync(configPath, 'module.exports={search:{proxy:true}};');
        process.env.http_proxy = 'http://host.name';
        if (lib_1.inversifyContainer.isBound(const_1.PARAMS.SERVICE_NAME))
            lib_1.inversifyContainer.rebind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
        else
            lib_1.inversifyContainer.bind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
        const requester = lib_1.inversifyContainer
            .get(const_1.TYPES.RequesterInterface)
            .getInstance();
        fs_1.unlinkSync(configPath);
        requester('https://laplateforme.com/', err => {
            expect(err.code).toBe('ENOTFOUND');
            expect(err.host).toBe('host.name');
            done();
        });
    });
    test('Should make request using baseUrl if set so', done => {
        const configPath = path_1.resolve(process.cwd(), 'config.js');
        fs_1.writeFileSync(configPath, "module.exports={search:{proxy:false,protocol:'https',host:'somehost.name',path:'/path'}};");
        if (lib_1.inversifyContainer.isBound(const_1.PARAMS.SERVICE_NAME))
            lib_1.inversifyContainer.rebind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
        else
            lib_1.inversifyContainer.bind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
        const requester = lib_1.inversifyContainer
            .get(const_1.TYPES.RequesterInterface)
            .getInstance();
        fs_1.unlinkSync(configPath);
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
            configPath = path_1.resolve(process.cwd(), 'config.js');
            fs_1.writeFileSync(configPath, 'module.exports={search:{proxy:true}};');
            if (process.env.http_proxy)
                delete process.env.http_proxy;
            if (lib_1.inversifyContainer.isBound(const_1.PARAMS.SERVICE_NAME))
                lib_1.inversifyContainer.rebind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
            else
                lib_1.inversifyContainer.bind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
            lib_1.inversifyContainer.get(const_1.TYPES.RequesterInterface);
        }
        catch (err) {
            expect(err.message).toBe("PDB_REQUESTER: Missing environment variable 'http_proxy'");
        }
        finally {
            fs_1.unlinkSync(configPath);
        }
    });
    afterAll(() => {
        if (tmpProxy)
            process.env.http_proxy = tmpProxy;
    });
});
//# sourceMappingURL=Requester.test.js.map