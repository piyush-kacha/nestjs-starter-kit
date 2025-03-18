import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis, { RedisOptions } from 'ioredis';

import { IBullMQRedisConfig } from '../../config/bullmq.config';

@Injectable()
export class BullmqService {
  private readonly logger = new Logger(BullmqService.name);

  private readonly connection: IORedis;

  private queues = {};

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
      MPS: 20,
    },
    {
      id: 3,
      phoneNumber: '911234567893',
      name: 'Bot 3',
      MPS: 30,
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
      retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
      },
    };

    if (redisConfig.isTlsEnabled) {
      redisOptions.tls = {
        rejectUnauthorized: true,
      };
    }

    this.connection = new IORedis(redisOptions);
  }

  async initialize() {
    // eslint-disable-next-line no-restricted-syntax
    for (const bot of this.bots) {
      // eslint-disable-next-line no-await-in-loop
      await this.addQueue(bot);
    }
  }

  async addQueue(bot) {
    // Check if queue already exists
    if (this.queues[bot.id]) {
      this.logger.log(`Queue for ${bot.id} already exists`);
      return;
    }

    const queueName = `whatsapp-queue-${bot.id}`;
    this.queues[bot.id] = new Queue(queueName, {
      connection: this.connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: 100,
        removeOnFail: 500,
      },
    });
  }

  async sendTemplate(botId: number, message: any) {
    if (!this.queues[botId]) {
      this.logger.log(`Queue for ${botId} does not exist`);
      return false;
    }

    const { templateName, recipient, parameters } = message;

    const queue: Queue = this.queues[botId];
    await queue.add(
      'send-template',
      { templateName, recipient, parameters, timestamp: new Date().toISOString() },
      {
        removeOnComplete: true,
        removeOnFail: true,
        stackTraceLimit: 20,
      },
    );

    return true;
  }
}
