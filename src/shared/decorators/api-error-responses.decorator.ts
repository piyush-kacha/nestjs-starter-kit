import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiGatewayTimeoutResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  BadRequestException,
  ForbiddenException,
  GatewayTimeoutException,
  InternalServerErrorException,
  UnauthorizedException,
} from 'src/core/exceptions';

export const ApiErrorResponses = () => {
  return applyDecorators(
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
