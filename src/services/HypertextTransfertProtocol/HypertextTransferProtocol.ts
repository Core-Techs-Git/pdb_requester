import {injectable} from 'inversify';
import {Agent, ClientRequest, IncomingMessage} from 'http';

import {ProtocolInterface} from '../../interfaces';
import {ProtocolRequestOptions, Callback} from '../../models';

@injectable()
export abstract class HypertextTransferProtocol implements ProtocolInterface {
  /**
   * Proxy agent object according to configuration.
   * @access protected
   */
  protected agent: Agent;

  /**
   * Request object according to configuration.
   * @access protected
   */
  protected requestor;

  request(options: ProtocolRequestOptions, callback: Callback): void {
    const body: string = options.body;
    delete options.body;

    options.agent = options.useProxy ? this.agent : undefined;
    delete options.useProxy;

    const request: ClientRequest = this.requestor.request(options, (response: IncomingMessage) => {
      let data = '';
      response
        .setEncoding('utf8')
        .on('data', chunk => {
          data += chunk;
        })
        .on('end', () => {
          callback(null, 'test' + data);
        });
    });
    request.on('error', (err: Error) => {
      callback(err);
    });
    request.end(body);
  }
}
