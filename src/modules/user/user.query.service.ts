import { Injectable } from '@nestjs/common';

import { InternalServerErrorException } from 'src/core/exceptions';
import { Identifier } from 'src/shared';

import { UserRepository } from './user.repository';
import { User, UserDocument } from './user.schema';

/**
 * @class UserQueryService
 * @description Service to handle user-related queries.
 */
@Injectable()
export class UserQueryService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Finds all users.
   * @returns {Promise<User[]>} - A promise that resolves to an array of user objects.
   * @throws {InternalServerErrorException} - Throws an internal server error if the query fails.
   */
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.findAllDocuments();
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  /**
   * Finds a user by their email address.
   * @param {string} email - The email address of the user.
   * @returns {Promise<User>} - A promise that resolves to the user object.
   * @throws {InternalServerErrorException} - Throws an internal server error if the query fails.
   */
  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ email });
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  /**
   * Finds a user by their unique identifier.
   * @param {Identifier} id - The unique identifier of the user.
   * @returns {Promise<User>} - A promise that resolves to the user object.
   * @throws {InternalServerErrorException} - Throws an internal server error if the query fails.
   */
  async findById(id: Identifier): Promise<User> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  /**
   * Creates a new user.
   * @param {User} user - The user object to be created.
   * @returns {Promise<UserDocument>} - A promise that resolves to the created user document.
   * @throws {InternalServerErrorException} - Throws an internal server error if the creation fails.
   */
  async create(user: User): Promise<UserDocument> {
    try {
      return await this.userRepository.create(user);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }
}
