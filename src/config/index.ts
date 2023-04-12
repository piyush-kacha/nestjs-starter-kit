import { IAppConfig, appConfig } from './app.config';
import { IDatabaseConfig, databaseConfig } from './database.config';
import { ITransmitterConfig, transmitterConfig } from './transmitter.config';
import { NodeEnv } from '../shared/enums/node-env.enum';

export interface IConfig {
  env: string;
  port: number;
  host: string;
  logLevel: string;
  clustering: string;
  database: IDatabaseConfig;
  logo: string;
  app: IAppConfig;
  transmitter: ITransmitterConfig;
}

export const configuration = (): Partial<IConfig> => ({
  env: process.env.NODE_ENV || NodeEnv.DEVELOPMENT,
  port: parseInt(process.env.PORT, 10) || 3009,
  host: process.env.HOST || '127.0.0.1',
  logLevel: process.env.LOG_LEVEL,
  clustering: process.env.CLUSTERING,
  database: databaseConfig(),
  app: appConfig(),
  transmitter: transmitterConfig(),
});
