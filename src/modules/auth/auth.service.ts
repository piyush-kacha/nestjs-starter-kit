// External dependencies
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcryptjs';

import { generateOTPCode, generateSlug } from 'src/utils';
import { BadRequestException, UnauthorizedException } from 'src/core/exceptions';

import { UserQueryService } from '../user/user.query.service';
import { User } from '../user/user.schema';
import { WorkspaceQueryService } from '../workspace/workspace.query-service';
import { Workspace } from '../workspace/workspace.schema';

import { LoginReqDto, LoginResDto, SignupReqDto, SignupResDto } from './dtos';
import { JwtUserPayload } from './interfaces';

@Injectable()
export class AuthService {
  private saltOrRounds: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userQueryService: UserQueryService,
    private readonly workspaceQueryService: WorkspaceQueryService,
  ) {
    this.saltOrRounds = this.configService.get<number>('authentication.bcryptSaltRounds', {
      infer: true,
    });
  }

  async signup(signupReqDto: SignupReqDto): Promise<SignupResDto> {
    const { email, password, workspaceName, name } = signupReqDto;

    const user: User = await this.userQueryService.findByEmail(email);
    if (user) {
      throw BadRequestException.RESOURCE_ALREADY_EXISTS(`User with email ${email} already exists`);
    }

    // Manage workspace
    const workspaceSlug: string = generateSlug(workspaceName);
    const existingWorkspace: Workspace = await this.workspaceQueryService.findBySlug(workspaceSlug);

    let workspacePayload: Workspace;
    if (existingWorkspace) {
      workspacePayload = existingWorkspace;
    } else {
      workspacePayload = await this.workspaceQueryService.create({
        slug: workspaceSlug,
        name: workspaceName,
      });
    }
    const workspace: Workspace = await this.workspaceQueryService.create(workspacePayload);

    // Hash password
    const hashedPassword: string = await bcrypt.hash(password, this.saltOrRounds);

    const userPayload: User = {
      email,
      password: hashedPassword,
      workspace: workspace,
      name,
      verified: false,
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

    const user: User = await this.userQueryService.findByEmail(email);
    if (!user) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS('Invalid credentials');
    }

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS('Invalid credentials');
    }

    if (!user.verified) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS('User is not verified');
    }

    const payload: JwtUserPayload = {
      user: user._id,
      email: user.email,
      code: user.registerCode,
    };
    const accessToken: string = await this.jwtService.signAsync(payload);

    delete user.password;

    return {
      message: 'Login successfully',
      accessToken,
      user,
    };
  }
}
