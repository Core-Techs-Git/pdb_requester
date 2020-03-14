/**
 * @module lib
 * @packageDocumentation
 */

import {Container} from 'inversify';

import {TYPES} from '@/const';
import {Requester, RequesterInterface, ConfigurationInterface, Configuration} from '@/services';

/**
 * Inversion of control container.
 * Provided by  [InversifyJS]{@link http://inversify.io/}
 * @type {Container}
 */
const container: Container = new Container();

//  Define autowiring by binding interfaces to instanciated class.
container.bind<RequesterInterface>(TYPES.RequesterInterface).to(Requester);
container.bind<ConfigurationInterface>(TYPES.ConfigurationInterface).to(Configuration);

export default container;
