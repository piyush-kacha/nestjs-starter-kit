import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { BadRequestException, InternalServerErrorException, UnauthorizedException } from 'src/core/exceptions';

import { AuthService } from './auth.service';
import { Public } from './decorators';
import { LoginReqDto, LoginResDto, SignupReqDto, SignupResDto } from './dtos';

@ApiBadRequestResponse({
  type: BadRequestException,
})
@ApiInternalServerErrorResponse({
  type: InternalServerErrorException,
})
@ApiUnauthorizedResponse({
  type: UnauthorizedException,
})
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/signup
  @ApiOkResponse({
    type: SignupResDto,
  })
  @HttpCode(200)
  @Public()
  @Post('signup')
  async signup(@Body() signupReqDto: SignupReqDto): Promise<SignupResDto> {
    return this.authService.signup(signupReqDto);
  }

  // POST /auth/login
  @ApiOkResponse({
    type: LoginResDto,
  })
  @HttpCode(200)
  @Public()
  @Post('login')
  async login(@Body() loginReqDto: LoginReqDto): Promise<LoginResDto> {
    return this.authService.login(loginReqDto);
  }
}
