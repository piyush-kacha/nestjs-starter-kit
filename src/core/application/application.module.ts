import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import apiConfig from 'src/config/api.config';
import appConfig from 'src/config/app.config';
import authConfig from 'src/config/auth.config';
import databaseConfig from 'src/config/database.config';
import infraConfig from 'src/config/infra.config';
import swaggerConfig from 'src/config/swagger.config';

import { DatabaseModule } from '../database/database.module';
import { LogModule } from '../log/log.module';

import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    // Configure environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration global
      cache: true, // Enable caching of the configuration
      envFilePath: ['.env.local', '.env.development', '.env.test', '.env'], // Load the .env file
      expandVariables: true, // Expand variables in the configuration
      load: [apiConfig, appConfig, authConfig, databaseConfig, infraConfig, swaggerConfig], // Load the environment variables from the configuration file
      validationOptions: {
        // Validate the configuration
        allowUnknown: true, // Allow unknown properties
        abortEarly: true, // Abort on the first error
      },
    }),
    // Import the LogModule
    LogModule,
    // Import the DatabaseModule
    DatabaseModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [],
})
export class ApplicationModule {}
