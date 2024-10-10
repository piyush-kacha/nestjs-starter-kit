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

/**
 * Registers the application configuration using the `registerAs` function.
 * Validates the environment variables using `validateConfigUtil` and `EnvironmentVariablesValidator`.
 *
 * @returns {AppConfig} The application configuration object.
 *
 * @property {string} env - The environment in which the application is running. Defaults to 'production'.
 * @property {number} port - The port on which the application will run. Defaults to 3000.
 * @property {string} host - The host address of the application. Defaults to 'localhost'.
 * @property {string} logLevel - The logging level for the application. Defaults to 'info'.
 */
export default registerAs<AppConfig>('app', (): AppConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);

  return {
    env: process.env.NODE_ENV || E_APP_ENVIRONMENTS.PRODUCTION,
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || 'localhost',
    logLevel: process.env.LOG_LEVEL || 'info',
  };
});
