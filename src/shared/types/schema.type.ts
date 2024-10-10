import { Types } from 'mongoose';

/**
 * @type {Identifier}
 *
 * Represents a unique identifier which can be either a MongoDB ObjectId or a string.
 * This type is used to define entities that can be identified by either type of identifier.
 *
 * @example
 * const id1: Identifier = new Types.ObjectId(); // MongoDB ObjectId
 * const id2: Identifier = 'some-string-id'; // String identifier
 */
export type Identifier = Types.ObjectId | string;
