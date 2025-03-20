import { Module } from '@nestjs/common';

import { BullmqQueueService } from './bullmq.queue.service';
import { BullmqWorkerService } from './bullmq.worker.service';

@Module({
  providers: [BullmqQueueService, BullmqWorkerService],
  exports: [BullmqQueueService, BullmqWorkerService],
})
export class BullmqModule {}
