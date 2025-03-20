import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Job, Worker } from 'bullmq';
import IORedis, { RedisOptions } from 'ioredis';

import { IBullMQRedisConfig } from '../../config/bullmq.config';

@Injectable()
export class BullmqWorkerService {
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
    };

    if (redisConfig.isTlsEnabled) {
      redisOptions.tls = {
        rejectUnauthorized: true,
      };
    }

    this.connection = new IORedis(redisOptions);
    this.initialize()
      .then(() => {
        this.logger.log('BullMQ worker initialized');
      })
      .catch((error) => {
        this.logger.error(error);
      });
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
      },
    );

    worker.on('error', (error) => {
      this.logger.fatal(error, `Worker ${queueName} message: ${error?.message}`);
    });

    this.workers[bot.id] = worker;
  }
}
