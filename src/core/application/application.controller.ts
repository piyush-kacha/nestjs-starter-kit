import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { ApplicationService } from './application.service';

@ApiTags('Health-check')
@Controller()
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  getHello(): string {
    return this.applicationService.getHello();
  }
}
