import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IncomingMessage, ServerResponse } from 'http';

import { LoggerModule } from 'nestjs-pino';

import { E_APP_ENVIRONMENTS, E_APP_LOG_LEVELS } from 'src/config/app.config';

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
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class LogModule {}
