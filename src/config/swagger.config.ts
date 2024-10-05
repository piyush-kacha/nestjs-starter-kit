import { registerAs } from '@nestjs/config';

export interface SwaggerConfig {
  swaggerEnabled: boolean;
  swaggerTitle: string;
  swaggerDescription: string;
  swaggerVersion: string;
  swaggerPath: string;
  swaggerJsonPath: string;
  swaggerYamlPath: string;
}

export default registerAs(
  'swagger',
  (): SwaggerConfig => ({
    swaggerEnabled: process.env.SWAGGER_ENABLED && process.env.SWAGGER_ENABLED === 'false' ? false : true,
    swaggerTitle: process.env.SWAGGER_TITLE || 'NestJS Starter API',
    swaggerDescription: process.env.SWAGGER_DESCRIPTION || 'The API for the NestJS Starter project',
    swaggerVersion: process.env.SWAGGER_VERSION || '1.0',
    swaggerPath: process.env.SWAGGER_PATH || 'docs',
    swaggerJsonPath: process.env.SWAGGER_JSON_PATH || 'docs/json',
    swaggerYamlPath: process.env.SWAGGER_YAML_PATH || 'docs/yaml',
  }),
);
