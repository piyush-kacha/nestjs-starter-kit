import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';
import { Identifier } from '../../shared/types/schema.type';

@Schema({
  timestamps: true,
  collection: DatabaseCollectionNames.WORKSPACE,
})
export class Workspace {
  @ApiProperty({
    description: 'The unique identifier of the workspace',
    example: '507f191e810c19729de860ea',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  _id?: Types.ObjectId;

  @ApiProperty({
    description: 'The name of the workspace',
    example: 'My Workspace',
  })
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Date of creation',
  })
  @Prop()
  createdAt?: Date;

  @ApiProperty({
    description: 'Date of last update',
  })
  @Prop()
  updatedAt?: Date;
}

export type WorkspaceIdentifier = Identifier | Workspace;

export type WorkspaceDocument = HydratedDocument<Workspace>;
export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
