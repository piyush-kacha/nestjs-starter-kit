import { Module } from '@nestjs/common';

import { ApplicationModule } from './application/application.module';

/**
 * The CoreModule is a fundamental module in the NestJS application.
 * It imports the ApplicationModule and serves as a central module
 * for the core functionalities of the application.
 *
 * @module CoreModule
 */
@Module({
  imports: [ApplicationModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
