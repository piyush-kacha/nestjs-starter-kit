// External dependencies
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, Logger, UseGuards } from '@nestjs/common';

import { GetUser } from '../auth/decorators';

import { GetProfileResDto } from './dtos';
import { UserDocument } from './user.schema';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  // GET /user/me
  @HttpCode(200)
  @ApiOkResponse({
    type: GetProfileResDto,
  })
  @Get('me')
  async getFullAccess(@GetUser() user: UserDocument): Promise<GetProfileResDto> {
    this.logger.debug(`User ${user.email} requested their profile`);
    return {
      message: 'Profile retrieved successfully',
      user,
    };
  }
}
