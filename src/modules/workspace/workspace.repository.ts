import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { FilterQuery, Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';

import { DatabaseCollectionNames } from 'src/shared';
import { DatabaseAbstractRepository } from 'src/core/database/abstracts';

import { Workspace, WorkspaceDocument } from './workspace.schema';

@Injectable()
export class WorkspaceRepository extends DatabaseAbstractRepository<WorkspaceDocument> {
  constructor(@InjectModel(DatabaseCollectionNames.WORKSPACE) private workspaceModel: Model<WorkspaceDocument>) {
    super(workspaceModel);
  }

  async find(filter: FilterQuery<WorkspaceDocument>, selectOptions?: ProjectionType<WorkspaceDocument>): Promise<WorkspaceDocument[]> {
    return this.workspaceModel.find(filter, selectOptions);
  }

  async findOne(filter: FilterQuery<WorkspaceDocument>): Promise<WorkspaceDocument> {
    return this.workspaceModel.findOne(filter);
  }

  async create(workspace: Workspace): Promise<WorkspaceDocument> {
    return this.workspaceModel.create(workspace);
  }

  async findById(workspaceId: string): Promise<WorkspaceDocument> {
    return this.workspaceModel.findById(workspaceId);
  }

  async findOneAndUpdate(
    filter: FilterQuery<WorkspaceDocument>,
    update: UpdateQuery<Workspace>,
    options?: QueryOptions<Workspace>,
  ): Promise<WorkspaceDocument> {
    return this.workspaceModel.findOneAndUpdate(filter, update, options);
  }

  async findByIdAndDelete(workspaceId: string): Promise<WorkspaceDocument> {
    return this.workspaceModel.findByIdAndDelete(workspaceId);
  }
}
