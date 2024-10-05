// Import external modules
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

import * as cluster from 'cluster';

import * as os from 'os';

import { Logger as Pino } from 'nestjs-pino';

import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { validationOptionsUtil } from './utils';

import { E_APP_ENVIRONMENTS } from './config/app.config';

// Create a logger for the bootstrap process
const logger: Logger = new Logger('Application Bootstrap');

// Define a variable to store the clustering status
let clusteringEnabled: boolean = process.env.CLUSTERING && process.env.CLUSTERING === 'true' ? true : false;

// Define the main function
export async function bootstrap(): Promise<NestExpressApplication> {
  // Create the NestJS application instance
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    bufferLogs: true,
  });

  // Use the Pino logger for the application
  app.useLogger(app.get(Pino));

  // Use the application container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Get configuration service from the application
  const configService: ConfigService = app.get(ConfigService);

  // Get environment variables
  const env: string = configService.get<string>('app.env', {
    infer: true,
  });
  const port: number = configService.get<number>('app.port', {
    infer: true,
  });
  const host: string = configService.get<string>('app.host', {
    infer: true,
  });
  const prefixEnabled: boolean = configService.get<boolean>('api.prefixEnabled', {
    infer: true,
  });
  const prefix: string = configService.get<string>('api.prefix', {
    infer: true,
  });
  const swaggerEnabled: boolean = configService.get<boolean>('swagger.swaggerEnabled', {
    infer: true,
  });
  const swaggetTitle: string = configService.get<string>('swagger.swaggerTitle', {
    infer: true,
  });
  const swaggerDescription: string = configService.get<string>('swagger.swaggerDescription', {
    infer: true,
  });
  const swaggerVersion: string = configService.get<string>('swagger.swaggerVersion', {
    infer: true,
  });
  const swaggerPath: string = configService.get<string>('swagger.swaggerPath', {
    infer: true,
  });
  const swaggerJsonPath: string = configService.get<string>('swagger.swaggerJsonPath', {
    infer: true,
  });
  const swaggerYamlPath: string = configService.get<string>('swagger.swaggerYamlPath', {
    infer: true,
  });

  // Enable the shutdown hooks
  if (env !== E_APP_ENVIRONMENTS.TEST) {
    app.enableShutdownHooks();
  }

  // Check if API prefix is enabled
  if (prefixEnabled) {
    // Set the global prefix for the application
    app.setGlobalPrefix(prefix, {
      exclude: ['/', '/docs', '/docs/json', '/docs/yaml'],
    });
  }

  // Set up the validation pipe
  app.useGlobalPipes(new ValidationPipe(validationOptionsUtil));

  // Set the global interceptors
  app.useGlobalInterceptors(
    // Use the class serializer interceptor to serialize the response objects
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  // Allow all origins
  app.enableCors();

  // Check if Swagger is enabled
  if (swaggerEnabled) {
    // Define the Swagger options and document
    const options = new DocumentBuilder()
      .setTitle(swaggetTitle)
      .setDescription(swaggerDescription)
      .setVersion(swaggerVersion)
      .addServer(`http://${host}:${port}`, `${env} environment server`)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    // Set up the Swagger UI endpoint
    SwaggerModule.setup(swaggerPath, app, document, {
      jsonDocumentUrl: swaggerJsonPath,
      yamlDocumentUrl: swaggerYamlPath,
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });
  }

  // Start the application
  await app.listen(port, host, () => {
    // Log the application's address and port
    logger.log(`Application listening on port http://${host}:${port}`);

    // Log the application's Swagger UI endpoint
    if (swaggerEnabled) {
      logger.log(`Swagger UI available at http://${host}:${port}/${swaggerPath}`);
      logger.log(`Swagger JSON available at http://${host}:${port}/${swaggerJsonPath}`);
      logger.log(`Swagger YAML available at http://${host}:${port}/${swaggerYamlPath}`);
    }
  });

  // Return the application instance
  return app;
}

// Check if clustering is enabled
if (clusteringEnabled) {
  // Get the number of CPUs on the machine
  const numCPUs = os.cpus().length;

  // If the current process is the master process
  if ((cluster as any).isMaster) {
    logger.log(`Master process is running with PID ${process.pid}`);

    // Fork workers for each available CPU
    for (let i = 0; i < numCPUs; i += 1) {
      (cluster as any).fork();
    }

    // Log when a worker process exits
    (cluster as any).on('exit', (worker, code, signal) => {
      logger.debug(`Worker process ${worker.process.pid} exited with code ${code} and signal ${signal}`);
    });
  } else {
    // If the current process is a worker process, call the bootstrap function to start the application
    bootstrap();
  }
} else {
  // Call the bootstrap function to start the application
  bootstrap();
}
