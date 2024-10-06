/**
 * Interface representing the abstract schema for a database entity.
 *
 * @property _id - Optional unique identifier for the entity.
 * @property createdAt - Optional timestamp indicating when the entity was created.
 * @property updatedAt - Optional timestamp indicating when the entity was last updated.
 */
export interface IDatabaseAbstractSchema {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
