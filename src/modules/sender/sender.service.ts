import { Injectable, Logger } from '@nestjs/common';

import { BullmqQueueService } from '../bullmq/bullmq.queue.service';

@Injectable()
export class SenderService {
  private readonly logger = new Logger(SenderService.name);

  constructor(private readonly bullmqService: BullmqQueueService) {}

  private generate100TemplateMessage(botId: number) {
    const messages = [];
    for (let i = 0; i < 10000; i += 1) {
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
    // eslint-disable-next-line no-restricted-syntax
    for (const message of messages) {
      // eslint-disable-next-line no-await-in-loop
      this.bullmqService.sendTemplate(botId, message).catch((err) => {
        this.logger.error(err, `Failed to send template message for bot ${botId}`);
      });
    }
  }
}
