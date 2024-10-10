import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from 'class-validator';

import { Transform } from 'class-transformer';

export class SignupReqDto {
  @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
  name: string;

  @ApiProperty({
    description:
      'Password for the user account. Must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one special character.',
    example: 'MySecure@Password!#',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsStrongPassword()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @ApiProperty({ description: 'Name of the workspace', example: 'My Company' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
  workspaceName: string;
}
