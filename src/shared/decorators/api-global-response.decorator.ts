import { applyDecorators, NotFoundException, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
  ApiResponseOptions,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiGatewayTimeoutResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import {
  BadRequestException,
  ForbiddenException,
  GatewayTimeoutException,
  InternalServerErrorException,
  UnauthorizedException,
} from 'src/core/exceptions';

import { ResponseDto } from '../dtos';

export const ApiGlobalResponse = <TModel extends Type<any>>(
  model: TModel,
  {
    description,
    isArray = false,
    isCreatedResponse = false,
  }: {
    description?: string;
    isArray?: boolean;
    isCreatedResponse?: boolean;
  },
) => {
  const schemaDescription = description || 'The resource has been successfully retrieved.';

  const apiResponseOptions: ApiResponseOptions = {
    description: schemaDescription,
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            payload: {
              type: isArray ? 'array' : 'object',
              items: isArray ? { $ref: getSchemaPath(model) } : undefined,
              $ref: isArray ? undefined : getSchemaPath(model),
            },
            timestamp: {
              type: 'string',
            },
          },
        },
      ],
    },
  };

  return applyDecorators(
    ApiExtraModels(ResponseDto, model),
    isCreatedResponse ? ApiCreatedResponse(apiResponseOptions) : ApiOkResponse(apiResponseOptions),
    ApiNotFoundResponse({
      description: 'Not Found',
      type: NotFoundException,
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: BadRequestException,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden',
      type: ForbiddenException,
    }),
    ApiGatewayTimeoutResponse({
      description: 'Gateway Timeout',
      type: GatewayTimeoutException,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error',
      type: InternalServerErrorException,
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: UnauthorizedException,
    }),
  );
};
