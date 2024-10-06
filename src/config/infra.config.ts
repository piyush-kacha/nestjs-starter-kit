import { registerAs } from '@nestjs/config';

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

import { validateConfigUtil } from 'src/utils';

export type InfraConfig = {
  clusteringEnabled: boolean;
  requestTimeout: number;
};

class EnvironmentVariablesValidator {
  @IsBoolean()
  @IsNotEmpty()
  CLUSTERING: boolean;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  REQUEST_TIMEOUT: number;
}

/**
 * Registers the infrastructure configuration for the application.
 *
 * @returns {InfraConfig} The infrastructure configuration object.
 *
 * @remarks
 * This function uses the `registerAs` utility to register the configuration
 * under the 'infra' namespace. It validates the environment variables using
 * the `validateConfigUtil` function and the `EnvironmentVariablesValidator`.
 *
 * The configuration includes:
 * - `clusteringEnabled`: A boolean indicating if clustering is enabled, based on the `CLUSTERING` environment variable.
 * - `requestTimeout`: The request timeout duration in milliseconds, based on the `REQUEST_TIMEOUT` environment variable, defaulting to 30 seconds if not provided.
 */
export default registerAs<InfraConfig>('infra', (): InfraConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);
  return {
    clusteringEnabled: process.env.CLUSTERING && process.env.CLUSTERING === 'true' ? true : false,
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT, 10) || 30000, // 30 seconds
  };
});
