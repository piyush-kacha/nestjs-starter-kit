import { Injectable } from '@nestjs/common';

import { InternalServerErrorException } from '../../exceptions/internal-server-error.exception';

import { Workspace } from './workspace.schema';
import { WorkspaceRepository } from './workspace.repository';

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
