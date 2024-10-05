// External dependencies
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcryptjs';

import { generateOTPCode } from 'src/utils';

import { UserQueryService } from '../user/user.query.service';
import { User } from '../user/user.schema';
import { WorkspaceQueryService } from '../workspace/workspace.query-service';
import { BadRequestException } from '../../exceptions/bad-request.exception';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';

import { LoginReqDto, LoginResDto, SignupReqDto, SignupResDto } from './dtos';

import { JwtUserPayload } from './interfaces/jwt-user-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userQueryService: UserQueryService,
    private readonly workspaceQueryService: WorkspaceQueryService,
  ) {}

  async signup(signupReqDto: SignupReqDto): Promise<SignupResDto> {
    const { email, password, workspaceName, name } = signupReqDto;

    const user = await this.userQueryService.findByEmail(email);
    if (user) {
      throw BadRequestException.RESOURCE_ALREADY_EXISTS(`User with email ${email} already exists`);
    }

    const workspacePayload = {
      name: workspaceName,
    };
    const workspace = await this.workspaceQueryService.create(workspacePayload);

    // Hash password
    const saltOrRounds = this.configService.get<number>('authentication.bcryptSaltRounds', {
      infer: true,
    });
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const userPayload: User = {
      email,
      password: hashedPassword,
      workspace: workspace._id,
      name,
      verified: true,
      registerCode: generateOTPCode(),
      verificationCode: null,
      verificationCodeExpiry: null,
      resetToken: null,
    };

    await this.userQueryService.create(userPayload);

    return {
      message: 'User created successfully',
    };
  }

  async login(loginReqDto: LoginReqDto): Promise<LoginResDto> {
    const { email, password } = loginReqDto;

    const user = await this.userQueryService.findByEmail(email);
    if (!user) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS('Invalid credentials');
    }

    const payload: JwtUserPayload = {
      user: user._id,
      email: user.email,
      code: user.registerCode,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    delete user.password;

    return {
      message: 'Login successful',
      accessToken,
      user,
    };
  }
}
