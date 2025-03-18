import { Module } from '@nestjs/common';
import { ReceiverService } from './receiver.service';

@Module({
  providers: [ReceiverService],
})
export class ReceiverModule {}
