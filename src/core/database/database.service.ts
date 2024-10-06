import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

import { Connection } from 'mongoose';

/**
 * Service responsible for configuring and providing Mongoose options.
 * Implements the `MongooseOptionsFactory` interface to create Mongoose options.
 *
 * @class
 * @implements {MongooseOptionsFactory}
 */
@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  /**
   * Logger instance for logging messages related to the DatabaseService.
   * @private
   * @readonly
   * @type {Logger}
   */
  private readonly logger: Logger = new Logger(DatabaseService.name);

  /**
   * Creates an instance of DatabaseService.
   * @param {ConfigService} configService - The configuration service to retrieve database settings.
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Creates and returns Mongoose module options.
   * Logs the process of creating Mongoose options and retrieves settings from the configuration service.
   * Optionally enables the mongoose-autopopulate plugin if auto-populate is enabled in the configuration.
   *
   * @returns {MongooseModuleOptions} The Mongoose module options.
   */
  createMongooseOptions(): MongooseModuleOptions {
    this.logger.error('Creating Mongoose options...');
    const autoPopulate: boolean = this.configService.get<boolean>('database.autoPopulate', {
      infer: true,
    });
    this.logger.error(`Auto-populate: ${autoPopulate}`);
    return {
      uri: this.configService.get<string>('database.uri', {
        infer: true,
      }),
      autoCreate: this.configService.get<boolean>('database.autoCreate', {
        infer: true,
      }),
      heartbeatFrequencyMS: this.configService.get<boolean>('database.heartbeatFrequencyMS', {
        infer: true,
      }),
      onConnectionCreate(connection: Connection) {
        if (autoPopulate) {
          connection.plugin(require('mongoose-autopopulate')); // Enable the mongoose-autopopulate plugin
        }
      },
    };
  }
}
