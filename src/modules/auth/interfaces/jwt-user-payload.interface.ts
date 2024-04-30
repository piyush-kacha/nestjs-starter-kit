import { Types } from 'mongoose';

export interface JwtUserPayload {
  user: string | Types.ObjectId;
  email: string;
  code: number;
}
