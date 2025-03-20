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

  private generate100TemplateMessage(botId: number) {
    const messages = [];
    for (let i = 0; i < 100; i += 1) {
      messages.push({
        templateName: `template-bot-${botId}`,
        recipient: `91123456789${i}`,
        parameters: {
          name: `Name ${i}-${new Date().toISOString()}`,
          phone: `91123456789${i}`,
        },
      });
    }
    return messages;
  }

  async send100TemplateMessages(botId: number) {
    const messages = this.generate100TemplateMessage(botId);
    try {
      await Promise.all(messages.map((message) => this.bullmqService.sendTemplate(botId, message)));
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
