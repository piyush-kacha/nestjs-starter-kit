import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from 'src/shared';

import { WorkspaceQueryService } from './workspace.query-service';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceSchema } from './workspace.schema';

/**
 * The WorkspaceModule is responsible for managing the workspace-related functionalities.
 *
 * @module WorkspaceModule
 *
 * @description
 * This module imports the MongooseModule to define the Workspace schema and provides
 * the WorkspaceQueryService and WorkspaceRepository for handling workspace data operations.
 * It also exports the WorkspaceQueryService for use in other modules.
 *
 * @imports
 * - MongooseModule: Registers the Workspace schema with Mongoose.
 *
 * @providers
 * - WorkspaceQueryService: Service for querying workspace data.
 * - WorkspaceRepository: Repository for workspace data operations.
 *
 * @exports
 * - WorkspaceQueryService: Makes the WorkspaceQueryService available to other modules.
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: DatabaseCollectionNames.WORKSPACE, schema: WorkspaceSchema }])],
  providers: [WorkspaceQueryService, WorkspaceRepository],
  exports: [WorkspaceQueryService],
})
export class WorkspaceModule {}
