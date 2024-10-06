// External dependencies
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, Logger, UseGuards } from '@nestjs/common';

import { ApiErrorResponses } from 'src/shared';

import { GetUser } from '../auth/decorators';

import { GetProfileResDto } from './dtos';
import { UserDocument } from './user.schema';

/**
 * Controller for handling user-related operations.
 *
 * @class UserController
 * @description This controller provides endpoints for user operations such as retrieving the user's profile.
 *
 * @method getFullAccess
 * @description Retrieves the full profile of the authenticated user.
 * @param {UserDocument} user - The authenticated user's document.
 * @returns {Promise<GetProfileResDto>} The user's profile data wrapped in a response DTO.
 *
 * @example
 * // Example usage:
 * // GET /user/me
 * // Response: { message: 'Profile retrieved successfully', user: { ... } }
 */
@ApiBearerAuth()
@ApiErrorResponses()
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
