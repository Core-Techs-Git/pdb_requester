"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const path_1 = require("path");
const fs_1 = require("fs");
const const_1 = require("../../const");
const lib_1 = require("../../lib");
describe('Requester service', () => {
    test('Should make request through the proxy if set so', done => {
        const configPath = path_1.resolve(process.cwd(), 'config.js');
        fs_1.writeFileSync(configPath, 'module.exports={search:{proxy:true}};');
        // eslint-disable-next-line @typescript-eslint/camelcase
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
    test('Should throw an error if environment variable http_proxy is missing', () => {
        let configPath;
        try {
            configPath = path_1.resolve(process.cwd(), 'config.js');
            fs_1.writeFileSync(configPath, 'module.exports={search:{proxy:true}};');
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
});
//# sourceMappingURL=Requester.test.js.map