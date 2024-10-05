import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  uri: string;
}

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nestjs',
  }),
);
