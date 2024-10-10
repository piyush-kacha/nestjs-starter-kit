import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { DatabaseService } from './database.service';

/**
 * The `DatabaseModule` is responsible for configuring and providing database-related services.
 *
 * @module
 *
 * @description
 * This module imports the `MongooseModule` and configures it asynchronously using the `DatabaseService` class.
 * The `ConfigService` is injected to provide necessary configuration for the database connection.
 *
 * @imports
 * - `MongooseModule`: A module that provides MongoDB support via Mongoose.
 *
 * @injects
 * - `ConfigService`: A service that provides configuration values.
 *
 * @useClass
 * - `DatabaseService`: A service class that contains the logic for configuring the database connection.
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useClass: DatabaseService,
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
