/**
 * Validates environment variables configurations and emits a warning if any of them are incorrect.
 */
import { registerAs } from '@nestjs/config';

import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { validateConfigUtil } from 'src/utils';

export type ApiConfig = {
  prefixEnabled: boolean;
  prefix: string;
};

class EnvironmentVariablesValidator {
  @IsNotEmpty()
  @IsBoolean()
  API_PREFIX_ENABLED: boolean;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  API_PREFIX: string;
}

/**
 * Registers the API configuration settings.
 *
 * This configuration includes:
 * - `prefixEnabled`: A boolean indicating if the API prefix is enabled, derived from the environment variable `API_PREFIX_ENABLED`.
 * - `prefix`: A string representing the API prefix, derived from the environment variable `API_PREFIX` or defaults to 'api'.
 *
 * @returns {ApiConfig} The API configuration object.
 */
export default registerAs<ApiConfig>('api', (): ApiConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);

  return {
    prefixEnabled: process.env.API_PREFIX_ENABLED === 'true' ? true : false,
    prefix: process.env.API_PREFIX || 'api',
  };
});
