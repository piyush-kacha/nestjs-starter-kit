import { Injectable } from '@nestjs/common';

import { InternalServerErrorException } from 'src/core/exceptions';

import { WorkspaceRepository } from './workspace.repository';
import { Workspace } from './workspace.schema';

@Injectable()
export class WorkspaceQueryService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async create(workspace: Workspace): Promise<Workspace> {
    try {
      return await this.workspaceRepository.create(workspace);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  async findById(workspaceId: string): Promise<Workspace> {
    try {
      return await this.workspaceRepository.findById(workspaceId);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }
}
