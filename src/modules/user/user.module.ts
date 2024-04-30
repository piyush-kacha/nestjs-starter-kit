import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';
import { UserQueryService } from './user.query.service';
import { UserRepository } from './user.repository';
import { UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DatabaseCollectionNames.USER, schema: UserSchema }])],
  providers: [UserQueryService, UserRepository],
  exports: [UserQueryService],
})
export class UserModule {}
