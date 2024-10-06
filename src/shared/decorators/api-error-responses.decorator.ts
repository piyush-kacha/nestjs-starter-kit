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

/**
 * A decorator that applies multiple API error response decorators to a route handler.
 *
 * This decorator includes the following responses:
 * - `400 Bad Request`: Indicates that the server cannot process the request due to client error.
 * - `403 Forbidden`: Indicates that the client does not have access rights to the content.
 * - `504 Gateway Timeout`: Indicates that the server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.
 * - `500 Internal Server Error`: Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
 * - `401 Unauthorized`: Indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
 *
 * @returns A function that applies the specified decorators.
 */
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
