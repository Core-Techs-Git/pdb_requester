import * as https from 'https';
import {injectable} from 'inversify';
import HttpsProxyAgent from 'https-proxy-agent';

import {HypertextTransferProtocol} from './HypertextTransferProtocol';

@injectable()
export class HttpsProtocol extends HypertextTransferProtocol {
  constructor() {
    super();
    this.requestor = https;
    this.agent = process.env.http_proxy !== undefined ? new HttpsProxyAgent(process.env.http_proxy) : undefined;
  }
}
