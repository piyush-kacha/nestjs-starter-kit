import { ApiProperty } from '@nestjs/swagger';

import { User } from '../user.schema';

export class GetProfileResDto {
  @ApiProperty({
    description: 'Message to the user',
    example: 'Login successful',
  })
  message: string;

  @ApiProperty({
    description: 'User details',
    type: User,
  })
  user: User;
}
