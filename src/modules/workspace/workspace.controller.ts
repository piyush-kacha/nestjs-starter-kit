import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { generateSlug } from 'src/utils';
import { ApiErrorResponses } from 'src/shared';

import { CreateWorkspaceReqDto, FindWorkspaceBySlugReqDto } from './dtos';
import { WorkspaceQueryService } from './workspace.query-service';
import { Workspace } from './workspace.schema';

@ApiBearerAuth()
@ApiErrorResponses()
@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceQueryService: WorkspaceQueryService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Workspace,
  })
  @Post()
  async create(@Body() createWorkspaceReqDto: CreateWorkspaceReqDto): Promise<Workspace> {
    const workspaceSlug: string = generateSlug(createWorkspaceReqDto.name);

    const workspace: Workspace = {
      slug: workspaceSlug,
      name: createWorkspaceReqDto.name,
      description: createWorkspaceReqDto.description,
    };

    const existingWorkspace: Workspace = await this.workspaceQueryService.findBySlug(workspaceSlug);
    if (existingWorkspace) {
      return existingWorkspace;
    }

    return await this.workspaceQueryService.create(workspace);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: Workspace,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Workspace[]> {
    return await this.workspaceQueryService.findAllWorkspaces();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: Workspace,
  })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Workspace> {
    return await this.workspaceQueryService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: Workspace,
  })
  @Get('slug/:slug')
  async findOneBySlug(@Param() slug: FindWorkspaceBySlugReqDto): Promise<Workspace> {
    return await this.workspaceQueryService.findBySlug(slug.slug);
  }
}
