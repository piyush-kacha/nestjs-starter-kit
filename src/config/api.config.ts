import { registerAs } from '@nestjs/config';

export interface ApiConfig {
  prefixEnabled: boolean;
  prefix: string;
}

export default registerAs(
  'api',
  (): ApiConfig => ({
    prefixEnabled: process.env.API_PREFIX_ENABLED && process.env.API_PREFIX_ENABLED === 'false' ? false : true,
    prefix: process.env.API_PREFIX || 'api',
  }),
);
