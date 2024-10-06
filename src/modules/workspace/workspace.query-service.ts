import { Injectable } from '@nestjs/common';

import { InternalServerErrorException } from 'src/core/exceptions';

import { WorkspaceRepository } from './workspace.repository';
import { Workspace } from './workspace.schema';

/**
 * Service to handle workspace queries.
 *
 * @class WorkspaceQueryService
 * @constructor
 * @param {WorkspaceRepository} workspaceRepository - The repository to manage workspace data.
 */
@Injectable()
export class WorkspaceQueryService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  /**
   * Creates a new workspace.
   *
   * @method create
   * @param {Workspace} workspace - The workspace entity to be created.
   * @returns {Promise<Workspace>} The created workspace entity.
   * @throws {InternalServerErrorException} If an error occurs during creation.
   */
  async create(workspace: Workspace): Promise<Workspace> {
    try {
      return await this.workspaceRepository.create(workspace);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  /**
   * Finds a workspace by its ID.
   *
   * @method findById
   * @param {string} workspaceId - The ID of the workspace to find.
   * @returns {Promise<Workspace>} The found workspace entity.
   * @throws {InternalServerErrorException} If an error occurs during the search.
   */
  async findById(workspaceId: string): Promise<Workspace> {
    try {
      return await this.workspaceRepository.findById(workspaceId);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }
}
