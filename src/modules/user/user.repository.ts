// Purpose: User repository for user module.
// External dependencies
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';

import { DatabaseCollectionNames } from 'src/shared';
import { DatabaseAbstractRepository } from 'src/core/database/abstracts';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository extends DatabaseAbstractRepository<UserDocument> {
  constructor(@InjectModel(DatabaseCollectionNames.USER) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async find(filter: FilterQuery<UserDocument>): Promise<User[]> {
    return await this.userModel.find(filter);
  }

  async findById(id: string | Types.ObjectId): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async findOne(filter: FilterQuery<UserDocument>): Promise<User | null> {
    return await this.userModel.findOne(filter);
  }

  async create(user: User): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async findOneAndUpdate(
    filter: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>,
    options: QueryOptions<UserDocument>,
  ): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(filter, update, options);
  }

  async findByIdAndUpdate(id, update: UpdateQuery<UserDocument>, options: QueryOptions<UserDocument>): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, update, options);
  }
}
