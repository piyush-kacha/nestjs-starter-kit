import { Logger, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';

export abstract class DatabaseAbstractRepository<T> {
  private readonly log: Logger;

  constructor(private readonly model: Model<T>) {
    this.log = new Logger(this.constructor.name);
  }

  async findAllDocuments(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOneDocumentById(id: string): Promise<T> {
    const document = await this.model.findById(id).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async updateDocumentById(id: string, data: Partial<T>): Promise<T> {
    const updatedDocument = await this.model.findByIdAndUpdate(id, data, { new: true, useFindAndModify: false }).exec();
    if (!updatedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return updatedDocument;
  }

  async deleteDocumentById(id: string): Promise<T> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();
    if (!deletedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return deletedDocument;
  }
}
