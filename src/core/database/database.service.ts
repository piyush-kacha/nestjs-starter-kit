import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly configService: ConfigService) {}

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
