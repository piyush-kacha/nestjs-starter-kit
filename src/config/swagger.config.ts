import { registerAs } from '@nestjs/config';

import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { validateConfigUtil } from 'src/utils';

export type SwaggerConfig = {
  swaggerEnabled: boolean;
  swaggerTitle: string;
  swaggerDescription: string;
  swaggerVersion: string;
  swaggerPath: string;
  swaggerJsonPath: string;
  swaggerYamlPath: string;
};

class EnvironmentVariablesValidator {
  @IsNotEmpty()
  @IsBoolean()
  SWAGGER_ENABLED: boolean;

  @IsOptional()
  @IsString()
  SWAGGER_TITLE: string;

  @IsOptional()
  @IsString()
  SWAGGER_DESCRIPTION: string;

  @IsOptional()
  @IsString()
  SWAGGER_VERSION: string;

  @IsOptional()
  @IsString()
  SWAGGER_PATH: string;

  @IsOptional()
  @IsString()
  SWAGGER_JSON_PATH: string;

  @IsOptional()
  @IsString()
  SWAGGER_YAML_PATH: string;
}

export default registerAs<SwaggerConfig>('swagger', (): SwaggerConfig => {
  validateConfigUtil(process.env, EnvironmentVariablesValidator);
  return {
    swaggerEnabled: process.env.SWAGGER_ENABLED && process.env.SWAGGER_ENABLED === 'false' ? false : true,
    swaggerTitle: process.env.SWAGGER_TITLE || 'NestJS Starter API',
    swaggerDescription: process.env.SWAGGER_DESCRIPTION || 'The API for the NestJS Starter project',
    swaggerVersion: process.env.SWAGGER_VERSION || '1.0',
    swaggerPath: process.env.SWAGGER_PATH || 'docs',
    swaggerJsonPath: process.env.SWAGGER_JSON_PATH || 'docs/json',
    swaggerYamlPath: process.env.SWAGGER_YAML_PATH || 'docs/yaml',
  };
});
