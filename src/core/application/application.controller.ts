import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { Public } from 'src/modules/auth/decorators';

import { ApplicationService } from './application.service';

@ApiTags('Health Check')
@Controller()
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.applicationService.getHello();
  }
}
