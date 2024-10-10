import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWorkspaceResDto {
  @ApiProperty({
    type: String,
    description: 'The slug of the workspace',
    example: 'my-workspace',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    type: String,
    description: 'Name of the workspace',
    example: 'My Workspace',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(120)
  @Transform(({ value }) => value.trim().replace(/\s\s+/g, ' ').toUppercCase())
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Description of the workspace',
    example: 'My workspace description',
  })
  description?: string;
}
