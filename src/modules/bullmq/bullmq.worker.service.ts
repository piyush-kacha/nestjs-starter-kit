import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Job, Worker } from 'bullmq';
import IORedis, { RedisOptions } from 'ioredis';

import { IBullMQRedisConfig } from '../../config/bullmq.config';

@Injectable()
export class BullmqWorkerService implements OnModuleDestroy {
  private readonly logger = new Logger(BullmqWorkerService.name);

  private readonly connection: IORedis;

  private workers = {};

  private bots = [
    {
      id: 1,
      phoneNumber: '911234567891',
      name: 'Bot 1',
      MPS: 10,
    },
    {
      id: 2,
      phoneNumber: '911234567892',
      name: 'Bot 2',
      MPS: 10,
    },
    {
      id: 3,
      phoneNumber: '911234567893',
      name: 'Bot 3',
      MPS: 10,
    },
  ];

  constructor(private readonly configService: ConfigService) {
    const redisConfig: IBullMQRedisConfig = this.configService.get('bullmq');
    const redisOptions: RedisOptions = {
      host: redisConfig.redisHost,
      port: redisConfig.redisPort,
      username: redisConfig.redisUsername,
      password: redisConfig.redisPassword,
      keepAlive: 30000,
      retryStrategy: (times: number) => {
        return Math.max(Math.min(Math.exp(times), 20000), 1000);
      },
      maxRetriesPerRequest: null,
      // enableOfflineQueue: true,
      enableReadyCheck: true,
      reconnectOnError: (err) => {
        this.logger.warn(`BullMQRedis connection error: ${err?.message}. Attempting to reconnect...`);
        return true; // Always reconnect on error
      },
    };

    if (redisConfig.isTlsEnabled) {
      redisOptions.tls = {
        rejectUnauthorized: true,
      };
    }

    this.connection = new IORedis(redisOptions);

    // Set up connection event listeners for better monitoring
    this.connection.on('connect', () => {
      this.logger.log('BullMQ Redis connection established');
    });

    this.connection.on('ready', () => {
      this.logger.log('BullMQ Redis connection is ready');
    });

    this.connection.on('error', (err) => {
      this.logger.error(`BullMQ Redis connection error: ${err?.message}`);
    });

    this.connection.on('close', () => {
      this.logger.warn('BullMQ Redis connection closed');
    });

    this.connection.on('reconnecting', (delay) => {
      this.logger.warn(`BullMQ Redis reconnecting in ${delay}ms`);
    });

    this.initialize()
      .then(() => {
        this.logger.log('BullMQ worker initialized');
        this.setupSignalHandlers();
      })
      .catch((error) => {
        this.logger.error(error);
      });
  }

  /**
   * Set up signal handlers for graceful shutdown
   */
  private setupSignalHandlers() {
    process.on('SIGINT', async () => {
      this.logger.log('SIGINT signal received');
      await this.gracefulShutdown('SIGINT');
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      this.logger.log('SIGTERM signal received');
      await this.gracefulShutdown('SIGTERM');
      process.exit(0);
    });

    this.logger.log('Signal handlers for graceful shutdown set up');
  }

  /**
   * Gracefully shutdown all workers when the application is stopping
   */
  async onModuleDestroy() {
    this.logger.log('Gracefully shutting down BullMQ workers...');
    await this.gracefulShutdown('Application Shutdown');
  }

  /**
   * Gracefully shutdown all workers
   * @param signal The signal that triggered the shutdown
   */
  async gracefulShutdown(signal: string) {
    this.logger.log(`Received ${signal}, closing all workers...`);

    const closePromises = Object.keys(this.workers).map(async (botId) => {
      try {
        this.logger.log(`Closing worker for bot ${botId}...`);
        await this.workers[botId].close();
        this.logger.log(`Worker for bot ${botId} closed successfully`);
      } catch (error) {
        this.logger.error(`Error closing worker for bot ${botId}: ${error.message}`);
      }
    });

    await Promise.all(closePromises);

    // Close Redis connection
    if (this.connection) {
      this.logger.log('Closing Redis connection...');
      await this.connection.quit();
      this.logger.log('Redis connection closed');
    }

    this.logger.log('All workers and connections closed successfully');
  }

  private async initialize() {
    // eslint-disable-next-line no-restricted-syntax
    for (const bot of this.bots) {
      // eslint-disable-next-line no-await-in-loop
      await this.addWorker(bot);
    }
  }

  async addBot(bot: any) {
    await this.addWorker(bot);
    this.bots.push(bot);
    return true;
  }

  async removeBot(botId: number) {
    if (!this.workers[botId]) {
      return false;
    }

    await this.workers[botId].close();
    delete this.workers[botId];
    this.bots = this.bots.filter((b) => b.id !== botId);
    return true;
  }

  private async addWorker(bot: any) {
    // Check if worker already exists
    if (this.workers[bot.id]) {
      this.logger.log(`Worker for ${bot.id} already exists`);
      return;
    }

    const concurrency = Math.max(1, Math.ceil(bot.MPS));
    this.logger.log(`Adding worker for ${bot.id} with concurrency ${concurrency}`);
    const queueName = `whatsapp-queue-${bot.id}`;
    const worker = new Worker(
      queueName,
      async (job: Job) => {
        try {
          this.logger.log(`Processing message from: ${job.id} recipient:${job?.data?.recipient} :${job?.data?.templateName}`);

          return true;
        } catch (error) {
          this.logger.error(error);
          throw error;
        }
      },
      {
        connection: this.connection,
        concurrency,
        lockDuration: 30000,
        limiter: {
          max: bot.MPS,
          duration: 1000,
        },
        // Set a reasonable stalledInterval to detect stalled jobs
        stalledInterval: 30000,
        // Add drainDelay to wait before considering the queue is empty
        drainDelay: 5000,
      },
    );

    worker.on('error', (error) => {
      this.logger.fatal(error, `Worker ${queueName} message: ${error?.message}`);
    });

    // // Add more event listeners for better monitoring and debugging
    // worker.on('failed', (job, err) => {
    //   this.logger.error(`Job ${job.id} failed with error: ${err.message}`);
    // });

    // worker.on('stalled', (jobId) => {
    //   this.logger.warn(`Job ${jobId} has stalled`);
    // });

    // worker.on('completed', (job) => {
    //   this.logger.debug(`Job ${job.id} completed successfully`);
    // });

    worker.on('closing', () => {
      this.logger.log(`Worker ${queueName} is closing`);
    });

    worker.on('closed', () => {
      this.logger.log(`Worker ${queueName} has closed`);
    });

    this.workers[bot.id] = worker;
  }
}
