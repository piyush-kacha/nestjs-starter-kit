// Import external modules
import * as cluster from 'cluster';
import * as os from 'os';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger as Pino } from 'nestjs-pino';

// Import internal modules
import { AppModule } from './app.module';

// Create a logger for the bootstrap process
const logger = new Logger('bootstrap');

// Define the main function
async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Use the Pino logger for the application
  app.useLogger(app.get(Pino));

  // Allow all origins
  app.enableCors();

  // Define the Swagger options and document
  const options = new DocumentBuilder()
    .setTitle('NestJS Starter API')
    .setDescription('The API for the NestJS Starter project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // Set up the Swagger UI endpoint
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // Get the configuration service from the application
  const configService = app.get(ConfigService);

  // Get the port number from the configuration
  const PORT = configService.get<number>('port');

  // Start the application
  await app.listen(PORT);

  // Log a message to indicate that the application is running
  logger.log(`Application listening on port ${PORT}`);
}

// Check if clustering is enabled
if (process.env.CLUSTERING === 'true') {
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
