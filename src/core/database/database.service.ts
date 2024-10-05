import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    this.logger.debug('Creating Mongoose options...');
    const autoPopulate: boolean = this.configService.get<boolean>('database.autoPopulate', {
      infer: true,
    });
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
      connectionFactory(connection) {
        if (autoPopulate) {
          connection.plugin(require('mongoose-autopopulate'));
        }
        return connection;
      },
    };
  }
}
