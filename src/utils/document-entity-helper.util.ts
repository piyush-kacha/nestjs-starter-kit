import { Prop } from '@nestjs/mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

export abstract class EntityDocumentHelper<T = any> {
  @ApiPropertyOptional({
    type: String,
    description: 'The unique identifier of the entity',
    example: '643405452324db8c464c0584',
    required: false,
  })
  public _id?: string;

  @ApiPropertyOptional({
    type: Date,
    description: 'Date of creation',
    example: '2021-08-01T00:00:00.000Z',
    required: true,
  })
  @Prop({
    type: Date,
    default: new Date(),
  })
  public createdAt?: Date;

  @ApiPropertyOptional({
    type: Date,
    description: 'Date of last update',
    example: '2021-08-01T00:00:00.000Z',
    required: false,
  })
  @Prop({
    type: Date,
    default: new Date(),
  })
  public updatedAt?: Date;

  constructor(partial?: Partial<T>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
