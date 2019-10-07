/**
 * A service configuration properties
 * @typedef {Object} ServiceConfiguration
 */
export type ServiceConfiguration = {
  name: string;
  proxy: boolean;
  protocol: 'http' | 'https';
};
