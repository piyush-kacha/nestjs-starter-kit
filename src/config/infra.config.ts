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

export default registerAs<InfraConfig>('infra', (): InfraConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);
  return {
    clusteringEnabled: process.env.CLUSTERING && process.env.CLUSTERING === 'true' ? true : false,
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT, 10) || 30000, // 30 seconds
  };
});
