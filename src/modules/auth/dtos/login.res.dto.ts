import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../user/user.schema';

export class LoginResDto {
  @ApiProperty({
    description: 'Message to the user',
    example: 'Login successful',
  })
  message: string;

  @ApiProperty({
    description: 'Access token for the user',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User details',
    type: User,
  })
  user: User;
}
