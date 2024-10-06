import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

import { ExceptionConstants } from './constants';
import { IException, IHttpGatewayTimeOutExceptionResponse } from './interfaces';

/**
 * Represents a Gateway Timeout Exception.
 *
 * @class GatewayTimeoutException
 * @extends {HttpException}
 *
 * @property {number} code - A unique code identifying the error.
 * @property {Error} cause - Error object causing the exception.
 * @property {string} message - Message for the exception.
 * @property {string} [description] - A description of the error message.
 * @property {string} timestamp - Timestamp of the exception.
 * @property {string} traceId - Trace ID of the request.
 * @property {string} path - Requested path.
 *
 * @constructor
 * @param {IException} exception - The exception object containing error details.
 *
 * @method setTraceId
 * @param {string} traceId - Sets the trace ID of the request.
 *
 * @method setPath
 * @param {string} path - Sets the requested path.
 *
 * @method generateHttpResponseBody
 * @param {string} [message] - Optional custom message for the response body.
 * @returns {IHttpGatewayTimeOutExceptionResponse} - The HTTP response body for the exception.
 */
export class GatewayTimeoutException extends HttpException {
  @ApiProperty({
    enum: ExceptionConstants.BadRequestCodes,
    description: 'A unique code identifying the error.',
    example: ExceptionConstants.BadRequestCodes.VALIDATION_ERROR,
  })
  code: number; // Internal status code

  @ApiHideProperty()
  cause: Error; // Error object causing the exception

  @ApiProperty({
    description: 'Message for the exception',
    example: 'Gateway Timeout',
  })
  message: string; // Message for the exception

  @ApiProperty({
    description: 'A description of the error message.',
    example: 'The server is taking too long to respond.',
  })
  description?: string; // Description of the exception

  @ApiProperty({
    description: 'Timestamp of the exception',
    format: 'date-time',
    example: '2022-12-31T23:59:59.999Z',
  })
  timestamp: string; // Timestamp of the exception

  @ApiProperty({
    description: 'Trace ID of the request',
    example: '65b5f773-df95-4ce5-a917-62ee832fcdd0',
  })
  traceId: string; // Trace ID of the request

  @ApiProperty({
    description: 'Request path',
    example: '/',
  })
  path: string; // requested path

  constructor(exception: IException) {
    super(exception.message, HttpStatus.BAD_REQUEST, {
      cause: exception.cause,
      description: exception.description,
    });

    this.message = exception.message;
    this.cause = exception.cause ?? new Error();
    this.description = exception.description;
    this.code = exception.code ?? HttpStatus.BAD_REQUEST;
    this.timestamp = new Date().toISOString();
  }

  setTraceId = (traceId: string) => {
    this.traceId = traceId;
  };

  setPath = (path: string) => {
    this.path = path;
  };

  generateHttpResponseBody = (message?: string): IHttpGatewayTimeOutExceptionResponse => {
    return {
      message: message || this.message,
      description: this.description,
      timestamp: this.timestamp,
      code: this.code,
      traceId: this.traceId,
      path: this.path,
    };
  };
}
