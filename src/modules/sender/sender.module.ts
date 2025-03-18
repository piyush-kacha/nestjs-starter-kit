import { Module } from '@nestjs/common';

import { SenderController } from './sender.controller';
import { SenderService } from './sender.service';

@Module({
  providers: [SenderService],
  controllers: [SenderController],
})
export class SenderModule {}
