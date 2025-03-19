import { Module } from '@nestjs/common';

import { BullmqModule } from '../bullmq/bullmq.module';
import { SenderController } from './sender.controller';
import { SenderService } from './sender.service';

@Module({
  imports: [BullmqModule],
  providers: [SenderService],
  controllers: [SenderController],
})
export class SenderModule {}
