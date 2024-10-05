import { SchemaOptions } from '@nestjs/mongoose';

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
