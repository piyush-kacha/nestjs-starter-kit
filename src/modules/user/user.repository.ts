import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { DatabaseCollectionNames } from '../../shared/enums/db.enum';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(DatabaseCollectionNames.USER) private userModel: Model<UserDocument>) {}

  async find(filter: FilterQuery<UserDocument>): Promise<User[]> {
    return this.userModel.find(filter).lean();
  }

  async findById(id: string | Types.ObjectId): Promise<User | null> {
    return this.userModel.findById(id).lean();
  }

  async findOne(filter: FilterQuery<UserDocument>): Promise<User | null> {
    return this.userModel.findOne(filter).lean();
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
