import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { Public } from 'src/modules/auth/decorators';

import { ApplicationService } from './application.service';

/**
 * Controller responsible for handling application-level routes.
 *
 * @remarks
 * This controller provides a health check endpoint.
 *
 * @example
 * ```typescript
 * @Get()
 * @Public()
 * getHello(): string {
 *   return this.applicationService.getHello();
 * }
 * ```
 *
 * @public
 */
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
