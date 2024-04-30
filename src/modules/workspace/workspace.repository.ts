import { FilterQuery, Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';
import { Workspace, WorkspaceDocument } from './workspace.schema';

@Injectable()
export class WorkspaceRepository {
  constructor(@InjectModel(DatabaseCollectionNames.WORKSPACE) private workspaceModel: Model<WorkspaceDocument>) {}

  async find(filter: FilterQuery<WorkspaceDocument>, selectOptions?: ProjectionType<WorkspaceDocument>): Promise<Workspace[]> {
    return this.workspaceModel.find(filter, selectOptions).lean();
  }

  async findOne(filter: FilterQuery<WorkspaceDocument>): Promise<Workspace> {
    return this.workspaceModel.findOne(filter).lean();
  }

  async create(workspace: Workspace): Promise<Workspace> {
    return this.workspaceModel.create(workspace);
  }

  async findById(workspaceId: string): Promise<Workspace> {
    return this.workspaceModel.findById(workspaceId).lean();
  }

  async findOneAndUpdate(
    filter: FilterQuery<WorkspaceDocument>,
    update: UpdateQuery<Workspace>,
    options?: QueryOptions<Workspace>,
  ): Promise<WorkspaceDocument> {
    return this.workspaceModel.findOneAndUpdate(filter, update, options).lean();
  }

  async findByIdAndDelete(workspaceId: string): Promise<Workspace> {
    return this.workspaceModel.findByIdAndDelete(workspaceId).lean();
  }
}
