import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';

import { Identifier } from '../../shared/types/schema.type';
import { InternalServerErrorException } from '../../exceptions/internal-server-error.exception';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserQueryService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Generates a random six digit OTP
   * @returns {number} - returns the generated OTP
   */
  generateCode(): number {
    const OTP_MIN = 100000;
    const OTP_MAX = 999999;
    return Math.floor(Math.random() * (OTP_MAX - OTP_MIN + 1)) + OTP_MIN;
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ email });
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  async findById(id: Identifier): Promise<User> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  async createVerifiedUser(user: User): Promise<UserDocument> {
    try {
      user.isActive = true;
      user.verified = true;
      user.registerCode = this.generateCode();
      user.verificationCode = null;
      user.verificationCodeExpiry = null;
      return await this.userRepository.create(user);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }
}
