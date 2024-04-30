import { ApiProperty } from '@nestjs/swagger';

export class SignupResDto {
  @ApiProperty({
    example: 'User account created successfully',
  })
  message: string;
}
