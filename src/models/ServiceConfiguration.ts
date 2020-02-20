/**
 * A service configuration properties
 * @typedef {Object} ServiceConfiguration
 */
export type ServiceConfiguration = {
  proxy: boolean;
  baseUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
};
