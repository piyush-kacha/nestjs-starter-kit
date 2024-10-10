// Purpose: User repository for user module.
// External dependencies
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';

import { DatabaseCollectionNames } from 'src/shared';
import { DatabaseAbstractRepository } from 'src/core/database/abstracts';

import { User, UserDocument } from './user.schema';

/**
 * UserRepository class to handle database operations for UserDocument.
 */
@Injectable()
export class UserRepository extends DatabaseAbstractRepository<UserDocument> {
  /**
   * Constructor to inject the user model.
   * @param userModel - The user model injected by Mongoose.
   */
  constructor(@InjectModel(DatabaseCollectionNames.USER) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  /**
   * Finds users based on the provided filter.
   * @param filter - The filter query to find users.
   * @returns A promise that resolves to an array of users.
   */
  async find(filter: FilterQuery<UserDocument>): Promise<User[]> {
    return await this.userModel.find(filter);
  }

  /**
   * Finds a user by their ID.
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the user or null if not found.
   */
  async findById(id: string | Types.ObjectId): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  /**
   * Finds a single user based on the provided filter.
   * @param filter - The filter query to find a user.
   * @returns A promise that resolves to the user or null if not found.
   */
  async findOne(filter: FilterQuery<UserDocument>): Promise<User | null> {
    return await this.userModel.findOne(filter);
  }

  /**
   * Creates a new user.
   * @param user - The user data to create.
   * @returns A promise that resolves to the created user document.
   */
  async create(user: User): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  /**
   * Finds a single user based on the provided filter and updates it.
   * @param filter - The filter query to find a user.
   * @param update - The update query to apply to the user.
   * @param options - Additional query options.
   * @returns A promise that resolves to the updated user document or null if not found.
   */
  async findOneAndUpdate(
    filter: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>,
    options: QueryOptions<UserDocument>,
  ): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(filter, update, options);
  }

  /**
   * Finds a user by their ID and updates it.
   * @param id - The ID of the user to update.
   * @param update - The update query to apply to the user.
   * @param options - Additional query options.
   * @returns A promise that resolves to the updated user document or null if not found.
   */
  async findByIdAndUpdate(
    id: string | Types.ObjectId,
    update: UpdateQuery<UserDocument>,
    options: QueryOptions<UserDocument>,
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, update, options);
  }
}
