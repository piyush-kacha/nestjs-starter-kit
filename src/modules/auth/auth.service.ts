// External dependencies
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Internal dependencies
import { JwtUserPayload } from './interfaces/jwt-user-payload.interface';
import { LoginReqDto, LoginResDto, SignupReqDto, SignupResDto } from './dtos';

// Other modules dependencies
import { User } from '../user/user.schema';
import { UserQueryService } from '../user/user.query.service';
import { WorkspaceQueryService } from '../workspace/workspace.query-service';

// Shared dependencies
import { BadRequestException } from '../../exceptions/bad-request.exception';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly userQueryService: UserQueryService,
    private readonly workspaceQueryService: WorkspaceQueryService,
    private readonly jwtService: JwtService,
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
    const saltOrRounds = this.SALT_ROUNDS;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const userPayload: User = {
      email,
      password: hashedPassword,
      workspace: workspace._id,
      name,
      verified: true,
      registerCode: this.generateCode(),
      verificationCode: null,
      verificationCodeExpiry: null,
      resetToken: null,
    };

    await this.userQueryService.create(userPayload);

    return {
      message: 'User created successfully',
    };
  }

  /**
   * Generates a random six digit OTP
   * @returns {number} - returns the generated OTP
   */
  generateCode(): number {
    const OTP_MIN = 100000;
    const OTP_MAX = 999999;
    return Math.floor(Math.random() * (OTP_MAX - OTP_MIN + 1)) + OTP_MIN;
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
