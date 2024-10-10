import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { FilterQuery, Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';

import { DatabaseCollectionNames } from 'src/shared';
import { DatabaseAbstractRepository } from 'src/core/database/abstracts';

import { Workspace, WorkspaceDocument } from './workspace.schema';

@Injectable()
export class WorkspaceRepository extends DatabaseAbstractRepository<WorkspaceDocument> {
  /**
   * Creates an instance of WorkspaceRepository.
   *
   * @param workspaceModel - The Mongoose model for Workspace documents.
   */
  constructor(@InjectModel(DatabaseCollectionNames.WORKSPACE) private workspaceModel: Model<WorkspaceDocument>) {
    super(workspaceModel);
  }

  /**
   * Finds multiple Workspace documents based on the provided filter.
   *
   * @param filter - The filter query to match documents.
   * @param selectOptions - Optional projection options to select specific fields.
   * @returns A promise that resolves to an array of Workspace documents.
   */
  async find(filter: FilterQuery<WorkspaceDocument>, selectOptions?: ProjectionType<WorkspaceDocument>): Promise<WorkspaceDocument[]> {
    return this.workspaceModel.find(filter, selectOptions);
  }

  /**
   * Finds a single Workspace document based on the provided filter.
   *
   * @param filter - The filter query to match the document.
   * @returns A promise that resolves to a Workspace document.
   */
  async findOne(filter: FilterQuery<WorkspaceDocument>): Promise<WorkspaceDocument> {
    return this.workspaceModel.findOne(filter);
  }

  /**
   * Creates a new Workspace document.
   *
   * @param workspace - The Workspace data to create the document.
   * @returns A promise that resolves to the created Workspace document.
   */
  async create(workspace: Workspace): Promise<WorkspaceDocument> {
    return this.workspaceModel.create(workspace);
  }

  /**
   * Finds a Workspace document by its ID.
   *
   * @param workspaceId - The ID of the Workspace document to find.
   * @returns A promise that resolves to the found Workspace document.
   */
  async findById(workspaceId: string): Promise<WorkspaceDocument> {
    return this.workspaceModel.findById(workspaceId);
  }

  /**
   * Finds a Workspace document by its slug.
   *
   * @param slug - The slug of the Workspace document to find.
   * @returns A promise that resolves to the found Workspace document.
   */
  async findBySlug(slug: string): Promise<WorkspaceDocument> {
    return this.findOne({ slug });
  }

  /**
   * Finds a single Workspace document based on the provided filter and updates it.
   *
   * @param filter - The filter query to match the document.
   * @param update - The update query to apply to the document.
   * @param options - Optional query options.
   * @returns A promise that resolves to the updated Workspace document.
   */
  async findOneAndUpdate(
    filter: FilterQuery<WorkspaceDocument>,
    update: UpdateQuery<Workspace>,
    options?: QueryOptions<Workspace>,
  ): Promise<WorkspaceDocument> {
    return this.workspaceModel.findOneAndUpdate(filter, update, options);
  }

  /**
   * Finds a Workspace document by its ID and deletes it.
   *
   * @param workspaceId - The ID of the Workspace document to delete.
   * @returns A promise that resolves to the deleted Workspace document.
   */
  async findByIdAndDelete(workspaceId: string): Promise<WorkspaceDocument> {
    return this.workspaceModel.findByIdAndDelete(workspaceId);
  }
}
