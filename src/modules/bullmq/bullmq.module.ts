import { Module } from '@nestjs/common';

import { BullmqService } from './bullmq.service';

@Module({
  providers: [BullmqService],
})
export class BullmqModule {}
