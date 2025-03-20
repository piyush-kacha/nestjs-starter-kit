import { BulkJobOptions } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';

import { BullmqQueueService } from '../bullmq/bullmq.queue.service';
import { BullmqWorkerService } from '../bullmq/bullmq.worker.service';

@Injectable()
export class SenderService {
  private readonly logger = new Logger(SenderService.name);

  constructor(
    private readonly bullmqService: BullmqQueueService,
    private readonly bullmqWorkerService: BullmqWorkerService,
  ) {}

  private generate100TemplateMessages(botId: number): { name: string; data: any; opts?: BulkJobOptions }[] {
    const messages: { name: string; data: any; opts?: BulkJobOptions }[] = [];
    for (let i = 0; i < 100; i += 1) {
      messages.push({
        name: 'send-template',
        data: {
          templateName: `template-bot-${botId}`,
          recipient: `91123456789${i}`,
          parameters: {
            name: `Name ${i}-${new Date().toISOString()}`,
            phone: `91123456789${i}`,
          },
        },
        opts: {
          removeOnComplete: true,
          removeOnFail: true,
          stackTraceLimit: 20,
        },
      });
    }
    return messages;
  }

  async send100TemplateMessages(botId: number) {
    const messages = this.generate100TemplateMessages(botId);
    try {
      // await Promise.all(messages.map((message) => this.bullmqService.sendTemplate(botId, message)));
      await this.bullmqService.sendTemplateUsingBulk(botId, messages);
    } catch (error) {
      this.logger.error(error, `Failed to send template messages for bot ${botId}`);
      throw error;
    }
  }

  async addBot(bot: any) {
    await this.bullmqService.addBot(bot);
    await this.bullmqWorkerService.addBot(bot);
    return true;
  }

  async removeBot(botId: number) {
    await this.bullmqService.removeBot(botId);
    await this.bullmqWorkerService.removeBot(botId);
    return true;
  }
}
