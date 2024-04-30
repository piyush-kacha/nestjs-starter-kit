// External dependencies
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, Logger, UseGuards } from '@nestjs/common';

// Internal dependencies
import { GetProfileResDto } from './dtos';
import { UserDocument } from './user.schema';

// Other modules dependencies
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtUserAuthGuard } from '../auth/guards/jwt-user-auth.guard';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(JwtUserAuthGuard)
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
