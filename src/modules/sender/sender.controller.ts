import { Controller, Logger, Param, Post } from '@nestjs/common';
import { SenderService } from './sender.service';

@Controller('sender')
export class SenderController {
  private readonly logger = new Logger(SenderController.name);

  constructor(private readonly senderService: SenderService) {}

  @Post('send100TemplateMessages/:botId')
  async send100TemplateMessages(@Param('botId') botId: number) {
    this.senderService
      .send100TemplateMessages(botId)
      .then(() => {
        this.logger.log('100 template messages sent successfully');
      })
      .catch((err) => {
        this.logger.error(err, `Failed to send 100 template messages for bot ${botId}`);
      });
    return { message: '100 template messages sent successfully' };
  }
}
