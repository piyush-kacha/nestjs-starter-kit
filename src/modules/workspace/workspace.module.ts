import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';
import { WorkspaceQueryService } from './workspace.query-service';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceSchema } from './workspace.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DatabaseCollectionNames.WORKSPACE, schema: WorkspaceSchema }])],
  providers: [WorkspaceQueryService, WorkspaceRepository],
  exports: [WorkspaceQueryService],
})
export class WorkspaceModule {}
