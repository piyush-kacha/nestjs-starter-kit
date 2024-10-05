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

export default registerAs<ApiConfig>('api', (): ApiConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);

  return {
    prefixEnabled: process.env.API_PREFIX_ENABLED === 'true' ? true : false,
    prefix: process.env.API_PREFIX || 'api',
  };
});
