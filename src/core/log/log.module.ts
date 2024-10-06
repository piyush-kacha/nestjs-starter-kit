import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IncomingMessage, ServerResponse } from 'http';

import { LoggerModule } from 'nestjs-pino';

import { E_APP_ENVIRONMENTS, E_APP_LOG_LEVELS } from 'src/config/app.config';

import { RequestLoggerMiddleware } from '../middlewares';

/**
 * LogModule is a NestJS module that configures the logging mechanism for the application.
 * It uses the LoggerModule with asynchronous configuration to set up logging based on the application's environment and configuration settings.
 *
 * @module LogModule
 *
 * @description
 * This module imports the LoggerModule and configures it using the `forRootAsync` method.
 * It injects the `ConfigService` to retrieve configuration values for the logging setup.
 *
 * @property {Array} imports - An array of modules to import.
 * @property {Array} controllers - An array of controllers to include in the module.
 * @property {Array} providers - An array of providers to include in the module.
 * @property {Array} exports - An array of providers to export from the module.
 *
 * @method configure
 * @description
 * Configures middleware for the module. Applies the `RequestLoggerMiddleware` to all routes.
 *
 * @param {MiddlewareConsumer} consumer - The middleware consumer to configure.
 *
 * @example
 * // Example configuration for LoggerModule
 * LoggerModule.forRootAsync({
 *   inject: [ConfigService],
 *   useFactory: async (configService: ConfigService) => {
 *     const appEnvironment = configService.get<string>('app.env', { infer: true });
 *     const logLevel = configService.get<string>('app.logLevel', { infer: true });
 *     const clusteringEnabled = configService.get<boolean>('infra.clusteringEnabled', { infer: true });
 *     return {
 *       exclude: [],
 *       pinoHttp: {
 *         genReqId: () => crypto.randomUUID(),
 *         autoLogging: true,
 *         base: clusteringEnabled === 'true' ? { pid: process.pid } : {},
 *         customAttributeKeys: {
 *           responseTime: 'timeSpent',
 *         },
 *         level: logLevel || (appEnvironment === E_APP_ENVIRONMENTS.PRODUCTION ? E_APP_LOG_LEVELS.INFO : E_APP_LOG_LEVELS.TRACE),
 *         serializers: {
 *           req(request: IncomingMessage) {
 *             return {
 *               method: request.method,
 *               url: request.url,
 *               id: request.id,
 *             };
 *           },
 *           res(reply: ServerResponse) {
 *             return {
 *               statusCode: reply.statusCode,
 *             };
 *           },
 *         },
 *         transport: appEnvironment !== E_APP_ENVIRONMENTS.PRODUCTION
 *           ? {
 *               target: 'pino-pretty',
 *               options: {
 *                 translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
 *               },
 *             }
 *           : null,
 *       },
 *     };
 *   },
 * });
 */
@Module({
  imports: [
    // Configure logging
    LoggerModule.forRootAsync({
      inject: [ConfigService], // Inject the ConfigService into the factory function
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
          // forRoutes: ['*'], // Log all requests
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class LogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware configuration
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
