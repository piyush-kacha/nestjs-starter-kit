import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

import { DatabaseCollectionNames } from 'src/shared';
import { EntityDocumentHelper } from 'src/utils';
import { getDatabaseSchemaOptions } from 'src/core/database/database-schema-options';

import { Workspace } from '../workspace/workspace.schema';

export type UserDocument = HydratedDocument<User>;

@Schema(getDatabaseSchemaOptions(DatabaseCollectionNames.USER, ['password']))
export class User extends EntityDocumentHelper<User> {
  // email is the unique identifier of the user
  @ApiProperty({
    type: String,
    description: 'The unique identifier of the user',
    example: 'john@example.com',
  })
  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  // password is the hashed password of the user
  @ApiHideProperty()
  @Prop()
  password?: string;

  // workspace is the unique identifier of the workspace that the user belongs to
  @ApiProperty({
    description: 'The unique identifier of the workspace',
    example: '643405452324db8c464c0584',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: DatabaseCollectionNames.WORKSPACE,
    required: true,
    autopopulate: true,
  })
  workspace: Workspace;

  // name is the full name of the user
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @Prop()
  name?: string;

  // verified is a boolean value that indicates whether the user has verified their email address
  @ApiProperty({
    description: 'Indicates whether the user has verified their email address',
    example: true,
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  verified: boolean;

  // verificationCode is a 6-digit number that is sent to the user's email address to verify their email address
  @ApiHideProperty()
  @Prop({
    type: Number,
  })
  verificationCode?: number;

  // verificationCodeExpiry is the date and time when the verification code expires
  @ApiHideProperty()
  @Prop({
    type: Date,
  })
  verificationCodeExpiry?: Date;

  @ApiHideProperty()
  @Prop()
  resetToken?: string;

  // registerCode is used for when user is going to reset password or change password perform at time all same user login session will be logout
  @ApiHideProperty()
  @Prop({
    type: Number,
  })
  registerCode?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, isActive: 1 });
