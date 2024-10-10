import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto for the response
 */
export class ResponseDto<T> {
  @ApiProperty()
  payload: T;
  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  timestamp: string;
}
