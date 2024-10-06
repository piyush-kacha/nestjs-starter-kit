import { registerAs } from '@nestjs/config';

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

import { validateConfigUtil } from 'src/utils';

export type DatabaseConfig = {
  uri: string;
  autoCreate: boolean;
  autoPopulate: boolean;
  heartbeatFrequencyMS: number;
};

class EnvironmentVariablesValidator {
  @IsNotEmpty()
  @IsString()
  MONGODB_URI: string;

  @IsOptional()
  @IsBoolean()
  MONGODB_AUTO_CREATE: boolean;

  @IsOptional()
  @IsBoolean()
  MONGODB_AUTO_POPULATE: boolean;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(10000)
  MONGODB_HEARTBEAT_FREQUENCY_MS: number;
}

/**
 * Registers the database configuration using the `registerAs` function.
 * Validates the environment variables using `validateConfigUtil` and `EnvironmentVariablesValidator`.
 *
 * @returns {DatabaseConfig} The database configuration object.
 * @property {string} uri - The MongoDB URI from the environment variable `MONGODB_URI`.
 * @property {boolean} autoCreate - Determines if auto creation is enabled, based on the environment variable `MONGODB_AUTO_CREATE`.
 * @property {boolean} autoPopulate - Determines if auto population is enabled, based on the environment variable `MONGODB_AUTO_POPULATE`.
 * @property {number} heartbeatFrequencyMS - The heartbeat frequency in milliseconds, based on the environment variable `MONGODB_HEARTBEAT_FREQUENCY_MS` or defaults to 10000.
 */
export default registerAs<DatabaseConfig>('database', (): DatabaseConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);

  return {
    uri: process.env.MONGODB_URI,
    autoCreate: process.env.MONGODB_AUTO_CREATE && process.env.MONGODB_AUTO_CREATE === 'false' ? false : true,
    autoPopulate: process.env.MONGODB_AUTO_POPULATE && process.env.MONGODB_AUTO_POPULATE === 'false' ? false : true,
    heartbeatFrequencyMS: parseInt(process.env.MONGODB_HEARTBEAT_FREQUENCY_MS, 10) || 10000,
  };
});
