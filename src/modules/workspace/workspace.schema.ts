import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { DatabaseCollectionNames } from 'src/shared';
import { getDatabaseSchemaOptions } from 'src/core/database/database-schema-options';
import { EntityDocumentHelper } from 'src/utils';

export type WorkspaceDocument = HydratedDocument<Workspace>;

@Schema(getDatabaseSchemaOptions(DatabaseCollectionNames.WORKSPACE))
export class Workspace extends EntityDocumentHelper<Workspace> {
  @ApiProperty({
    type: String,
    description: 'The name of the workspace',
    example: 'My Workspace',
  })
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The description of the workspace',
    example: 'This is my workspace',
  })
  @Prop({
    type: String,
    required: false,
    default: '',
  })
  description?: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

WorkspaceSchema.index({ name: 1 }, { unique: true });
