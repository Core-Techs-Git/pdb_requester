import * as http from 'http';
import {injectable} from 'inversify';
import HttpProxyAgent from 'http-proxy-agent';

import {HypertextTransferProtocol} from './HypertextTransferProtocol';

@injectable()
export class HttpProtocol extends HypertextTransferProtocol {
  constructor() {
    super();
    this.requestor = http;
    this.agent = process.env.http_proxy !== undefined ? new HttpProxyAgent(process.env.http_proxy) : undefined;
  }
}
