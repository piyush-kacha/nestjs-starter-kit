import { registerAs } from '@nestjs/config';

import { IsBoolean, IsNotEmpty } from 'class-validator';

import { validateConfigUtil } from 'src/utils';

export type InfraConfig = {
  clusteringEnabled: boolean;
};

class EnvironmentVariablesValidator {
  @IsBoolean()
  @IsNotEmpty()
  CLUSTERING: boolean;
}

export default registerAs<InfraConfig>('infra', (): InfraConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);
  return {
    clusteringEnabled: process.env.CLUSTERING && process.env.CLUSTERING === 'true' ? true : false,
  };
});
