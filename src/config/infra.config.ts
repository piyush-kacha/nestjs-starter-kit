import { registerAs } from '@nestjs/config';

export interface InfraConfig {
  clusteringEnabled: boolean;
}

export default registerAs(
  'infra',
  (): InfraConfig => ({
    clusteringEnabled: process.env.CLUSTERING && process.env.CLUSTERING === 'true' ? true : false,
  }),
);
