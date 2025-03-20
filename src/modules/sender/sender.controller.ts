import { Body, Controller, Delete, Logger, Param, Post } from '@nestjs/common';
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

  @Post('bots')
  async addBot(@Body() bot: any) {
    await this.senderService.addBot(bot);
    return { message: `Bot ${bot.id} added successfully` };
  }

  @Delete('bots/:botId')
  async removeBot(@Param('botId') botId: number) {
    await this.senderService.removeBot(botId);
    return { message: `Bot ${botId} removed successfully` };
  }
}
