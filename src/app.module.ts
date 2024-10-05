// Import required modules
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as crypto from 'crypto';

import { LoggerModule } from 'nestjs-pino';

import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AllExceptionsFilter,
  BadRequestExceptionFilter,
  ForbiddenExceptionFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter,
  ValidationExceptionFilter,
} from './filters';

import apiConfig from './config/api.config';
import appConfig, { E_APP_ENVIRONMENTS, E_APP_LOG_LEVELS } from './config/app.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import infraConfig from './config/infra.config';
import swaggerConfig from './config/swagger.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';

// Import other modules

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

    // Configure logging
    LoggerModule.forRootAsync({
      inject: [ConfigService], // Inject the ConfigService into the factory function
      // useFactory: async (configService: ConfigService) => AppConfig.getLoggerConfig(),
      useFactory: async (configService: ConfigService) => {
        const appEnvironment = configService.get<string>('app.env', {
          infer: true,
        });
        const logLevel = configService.get<string>('app.logLevel', {
          infer: true,
        });
        const clusteringEnabled = configService.get<boolean>('infra.clusteringEnabled', {
          infer: true,
        });
        return {
          exclude: [], // Exclude specific path from the logs and may not work for e2e testing
          pinoHttp: {
            genReqId: () => crypto.randomUUID(), // Generate a random UUID for each incoming request
            autoLogging: true, // Automatically log HTTP requests and responses
            base: clusteringEnabled === 'true' ? { pid: process.pid } : {}, // Include the process ID in the logs if clustering is enabled
            customAttributeKeys: {
              responseTime: 'timeSpent', // Rename the responseTime attribute to timeSpent
            },
            level: logLevel || (appEnvironment === E_APP_ENVIRONMENTS.PRODUCTION ? E_APP_LOG_LEVELS.INFO : E_APP_LOG_LEVELS.TRACE), // Set the log level based on the environment and configuration
            serializers: {
              req(request: IncomingMessage) {
                return {
                  method: request.method,
                  url: request.url,
                  id: request.id,
                  // Including the headers in the log could be in violation of privacy laws, e.g. GDPR.
                  // headers: request.headers,
                };
              },
              res(reply: ServerResponse) {
                return {
                  statusCode: reply.statusCode,
                };
              },
            },
            transport:
              appEnvironment !== E_APP_ENVIRONMENTS.PRODUCTION // Only use Pino-pretty in non-production environments
                ? {
                    target: 'pino-pretty',
                    options: {
                      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                    },
                  }
                : null,
          },
        };
      },
    }),

    // Configure mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule so that it can be injected into the factory function
      inject: [ConfigService], // Inject the ConfigService into the factory function
      useFactory: async (configService: ConfigService) => ({
        // Get the required configuration settings from the ConfigService
        uri: configService.get<string>('database.uri', {
          infer: true,
        }),
      }),
    }),
    // Import other modules
    AuthModule,
    UserModule,
    WorkspaceModule,
  ],
  controllers: [AppController], // Define the application's controller
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    { provide: APP_FILTER, useClass: BadRequestExceptionFilter },
    { provide: APP_FILTER, useClass: UnauthorizedExceptionFilter },
    { provide: APP_FILTER, useClass: ForbiddenExceptionFilter },
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    {
      // Allowing to do validation through DTO
      // Since class-validator library default throw BadRequestException, here we use exceptionFactory to throw
      // their internal exception so that filter can recognize it
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
        }),
    },
  ], // Define the application's service
})
export class AppModule {}
