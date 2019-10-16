"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const path_1 = require("path");
const fs_1 = require("fs");
const const_1 = require("../../const");
const lib_1 = require("../../lib");
describe('Configuration service', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    test('Should return service proxy config if correctly configured', () => {
        const configPath = path_1.resolve(process.cwd(), 'config.js');
        fs_1.writeFileSync(configPath, 'module.exports={search:{proxy:true}};');
        if (lib_1.inversifyContainer.isBound(const_1.PARAMS.SERVICE_NAME))
            lib_1.inversifyContainer.rebind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
        else
            lib_1.inversifyContainer.bind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
        const config = lib_1.inversifyContainer.get(const_1.TYPES.ConfigurationInterface).getServiceConfiguration();
        fs_1.unlinkSync(configPath);
        expect(config.name).toBe('search');
        expect(config.proxy).toBe(true);
    });
    test('Should throw an error if service proxy config is missing', () => {
        let configPath;
        try {
            configPath = path_1.resolve(process.cwd(), 'config.js');
            fs_1.writeFileSync(configPath, 'module.exports={search:{test:true}};');
            if (lib_1.inversifyContainer.isBound(const_1.PARAMS.SERVICE_NAME))
                lib_1.inversifyContainer.rebind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
            else
                lib_1.inversifyContainer.bind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
            lib_1.inversifyContainer.get(const_1.TYPES.ConfigurationInterface);
        }
        catch (err) {
            expect(err.message).toBe(`PDB_REQUESTER: Missing entry 'search' in configuration file '${configPath}'`);
        }
        finally {
            fs_1.unlinkSync(configPath);
        }
    });
    test('Should throw an error if config.js is missing', () => {
        try {
            if (lib_1.inversifyContainer.isBound(const_1.PARAMS.SERVICE_NAME))
                lib_1.inversifyContainer.rebind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
            else
                lib_1.inversifyContainer.bind(const_1.PARAMS.SERVICE_NAME).toConstantValue('search');
            lib_1.inversifyContainer.get(const_1.TYPES.ConfigurationInterface);
        }
        catch (err) {
            expect(err.message).toBe(`PDB_REQUESTER: Missing configuration file '${path_1.resolve(process.cwd(), 'config.js')}'`);
        }
    });
});
//# sourceMappingURL=Configuration.test.js.map