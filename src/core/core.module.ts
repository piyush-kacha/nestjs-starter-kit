import { Module } from '@nestjs/common';

import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
