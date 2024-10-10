import { SchemaOptions } from '@nestjs/mongoose';

/**
 * Generates schema options for a Mongoose schema.
 *
 * @param collectionName - The name of the collection.
 * @param deleteProperties - Optional array of property names to delete from the JSON and object representations.
 * @returns The schema options object.
 *
 * @remarks
 * The returned schema options include:
 * - `timestamps`: Automatically adds `createdAt` and `updatedAt` fields.
 * - `collection`: Customizes the name of the collection.
 * - `minimize`: Disables the removal of empty objects.
 * - `versionKey`: Disables the `__v` version key.
 * - `toJSON` and `toObject`: Customizes the transformation of the document to JSON and plain objects, respectively.
 *   - Removes `id`, `createdAt`, `updatedAt`, and `__v` fields.
 *   - Removes additional properties specified in `deleteProperties`.
 */
export function getDatabaseSchemaOptions(collectionName: string, deleteProperties?: string[]): SchemaOptions {
  return {
    timestamps: true,
    collection: collectionName, // Permite personalizar el nombre de la colección
    minimize: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
      getters: true,
      transform: (_doc, ret) => {
        delete ret.id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        if (deleteProperties && deleteProperties.length > 0) {
          deleteProperties.forEach((property) => {
            delete ret[property];
          });
        }
      },
    },
    toObject: {
      virtuals: true,
      getters: true,
      transform: (_doc, ret) => {
        delete ret.id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        if (deleteProperties && deleteProperties.length > 0) {
          deleteProperties.forEach((property) => {
            delete ret[property];
          });
        }
      },
    },
  };
}
