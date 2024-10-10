import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { generateSlug } from 'src/utils';

export class CreateWorkspaceReqDto {
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

export class FindWorkspaceBySlugReqDto {
  @ApiProperty({
    type: String,
    description: 'The slug of the workspace',
    example: 'my-workspace',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => generateSlug(value))
  slug: string;
}
