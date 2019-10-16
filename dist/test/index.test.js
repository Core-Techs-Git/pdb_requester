"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const path_1 = require("path");
const fs_1 = require("fs");
let tmpProxy;
describe('Pdb_requester', () => {
    beforeAll(() => {
        if (process.env.http_proxy)
            tmpProxy = process.env.http_proxy;
    });
    test('Should return a request module object', () => {
        const configPath = path_1.resolve(process.cwd(), 'config.js');
        fs_1.writeFileSync(configPath, 'module.exports={search:{proxy:true}};');
        process.env.http_proxy = 'http://host.name';
        const requester = require('../index')('search');
        const request = require('request').defaults({
            tunnel: false,
            proxy: true,
        });
        fs_1.unlinkSync(configPath);
        expect(JSON.stringify(requester)).toBe(JSON.stringify(request));
    });
    afterAll(() => {
        if (tmpProxy)
            process.env.http_proxy = tmpProxy;
    });
});
//# sourceMappingURL=index.test.js.map