import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from 'src/shared';

import { UserController } from './user.controller';
import { UserQueryService } from './user.query.service';
import { UserRepository } from './user.repository';
import { UserSchema } from './user.schema';

/**
 * The UserModule is a NestJS module that provides the necessary configurations
 * for the user-related functionalities. It imports the MongooseModule to define
 * the User schema, and it provides the UserQueryService and UserRepository for
 * handling user queries and data persistence. The UserQueryService is also exported
 * for use in other modules. Additionally, the UserController is included to handle
 * incoming HTTP requests related to users.
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: DatabaseCollectionNames.USER, schema: UserSchema }])],
  providers: [UserQueryService, UserRepository],
  exports: [UserQueryService],
  controllers: [UserController],
})
export class UserModule {}
