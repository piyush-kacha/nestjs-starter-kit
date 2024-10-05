import { registerAs } from '@nestjs/config';

export enum E_APP_ENVIRONMENTS {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export enum E_APP_LOG_LEVELS {
  SILENT = 'silent',
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

export interface AppConfig {
  env: string;
  port: number;
  host: string;
  logLevel: string;
}

export default registerAs(
  'app',
  (): AppConfig => ({
    env: process.env.NODE_ENV || E_APP_ENVIRONMENTS.PRODUCTION,
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || 'localhost',
    logLevel: process.env.LOG_LEVEL || 'info',
  }),
);
