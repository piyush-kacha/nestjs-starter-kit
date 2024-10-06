import { Logger, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';

/**
 * Abstract class representing a generic database repository.
 * Provides common CRUD operations for database documents.
 *
 * @template T - The type of the document.
 */
export abstract class DatabaseAbstractRepository<T> {
  /**
   * Logger instance for logging repository actions.
   */
  private readonly log: Logger;

  /**
   * Creates an instance of DatabaseAbstractRepository.
   *
   * @param model - The Mongoose model representing the document.
   */
  constructor(private readonly model: Model<T>) {
    this.log = new Logger(this.constructor.name);
  }

  /**
   * Retrieves all documents from the database.
   *
   * @returns A promise that resolves to an array of documents.
   */
  async findAllDocuments(): Promise<T[]> {
    return this.model.find().exec();
  }

  /**
   * Retrieves a single document by its ID.
   *
   * @param id - The ID of the document to retrieve.
   * @returns A promise that resolves to the document if found.
   * @throws NotFoundException if the document with the given ID is not found.
   */
  async findOneDocumentById(id: string): Promise<T> {
    const document = await this.model.findById(id).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  /**
   * Updates a document by its ID with the provided data.
   *
   * @param id - The ID of the document to update.
   * @param data - The partial data to update the document with.
   * @returns A promise that resolves to the updated document.
   * @throws NotFoundException if the document with the given ID is not found.
   */
  async updateDocumentById(id: string, data: Partial<T>): Promise<T> {
    const updatedDocument = await this.model.findByIdAndUpdate(id, data, { new: true, useFindAndModify: false }).exec();
    if (!updatedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return updatedDocument;
  }

  /**
   * Deletes a document by its ID.
   *
   * @param id - The ID of the document to delete.
   * @returns A promise that resolves to the deleted document.
   * @throws NotFoundException if the document with the given ID is not found.
   */
  async deleteDocumentById(id: string): Promise<T> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();
    if (!deletedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return deletedDocument;
  }
}
