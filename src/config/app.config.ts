import { registerAs } from '@nestjs/config';

import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

import { validateConfigUtil } from 'src/utils';

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

export type AppConfig = {
  env: string;
  port: number;
  host: string;
  logLevel: string;
};

class EnvironmentVariablesValidator {
  @IsNotEmpty()
  @IsEnum(E_APP_ENVIRONMENTS)
  NODE_ENV: E_APP_ENVIRONMENTS;

  @IsInt()
  @Min(1024)
  @Max(49151)
  PORT: number;

  @IsNotEmpty()
  @IsString()
  HOST: string;

  @IsNotEmpty()
  @IsEnum(E_APP_LOG_LEVELS)
  LOG_LEVEL: E_APP_LOG_LEVELS;
}

export default registerAs<AppConfig>('app', (): AppConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);

  return {
    env: process.env.NODE_ENV || E_APP_ENVIRONMENTS.PRODUCTION,
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || 'localhost',
    logLevel: process.env.LOG_LEVEL || 'info',
  };
});
