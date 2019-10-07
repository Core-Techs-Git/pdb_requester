import {Container} from 'inversify';

import {TYPES, PROTOCOLS} from '../const';
import {ProtocolInterface} from '../interfaces';
import {ProtocolFactoryInterface, ProtocolFactory} from '../factories';
import {HttpProtocol, Requester, RequesterInterface, ConfigurationInterface, Configuration, HttpsProtocol} from '../services';

const container = new Container();
//  Define autowiring by binding interfaces to instanciated class.
container.bind<RequesterInterface>(TYPES.RequesterInterface).to(Requester);
container.bind<ConfigurationInterface>(TYPES.ConfigurationInterface).to(Configuration);
container.bind<ProtocolFactoryInterface>(TYPES.ProtocolFactoryInterface).to(ProtocolFactory);
container
  .bind<ProtocolInterface>(TYPES.ProtocolInterface)
  .to(HttpProtocol)
  .whenTargetNamed(PROTOCOLS.HTTP);
container
  .bind<ProtocolInterface>(TYPES.ProtocolInterface)
  .to(HttpsProtocol)
  .whenTargetNamed(PROTOCOLS.HTTPS);

export default container;
