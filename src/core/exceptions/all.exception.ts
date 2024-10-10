/**
 * A custom exception that represents a All error.
 */

// Import required modules
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

import { ExceptionConstants } from './constants';
import { IException, IHttpAllExceptionResponse } from './interfaces';

/**
 * Represents a custom exception that extends the HttpException class.
 * This class is used to handle all types of exceptions in a standardized way.
 */
export class AllException extends HttpException {
  /**
   * A unique code identifying the error.
   */
  @ApiProperty({
    enum: ExceptionConstants.InternalServerErrorCodes,
    description: 'A unique code identifying the error.',
    example: ExceptionConstants.InternalServerErrorCodes.UNEXPECTED_ERROR,
  })
  code: number; // Internal status code

  /**
   * Message for the exception.
   */
  @ApiProperty({
    description: 'Message for the exception',
    example: 'Internal Server Error',
  })
  message: string; // Message for the exception

  /**
   * A description of the error message.
   */
  @ApiProperty({
    description: 'A description of the error message.',
    example: 'An unexpected error occurred',
  })
  description: string; // Description of the exception

  /**
   * The cause of the exception.
   */
  @ApiPropertyOptional({
    description: 'The cause of the exception',
    example: {},
  })
  error?: unknown; // Error object

  /**
   * Timestamp of the exception.
   */
  @ApiProperty({
    description: 'Timestamp of the exception',
    format: 'date-time',
    example: '2022-12-31T23:59:59.999Z',
  })
  timestamp: string; // Timestamp of the exception

  /**
   * Trace ID of the request.
   */
  @ApiProperty({
    description: 'Trace ID of the request',
    example: '65b5f773-df95-4ce5-a917-62ee832fcdd0',
  })
  traceId: string; // Trace ID of the request

  /**
   * Constructs a new AllException object.
   * @param exception An object containing the exception details.
   *  - message: A string representing the error message.
   *  - cause: An object representing the cause of the error.
   *  - description: A string describing the error in detail.
   *  - code: A number representing internal status code which helpful in future for frontend
   */
  constructor(exception: IException) {
    super(exception.message, HttpStatus.INTERNAL_SERVER_ERROR, {
      cause: exception.cause,
      description: exception.description,
    });

    this.code = exception.code;
    this.message = exception.message;
    this.description = exception.description;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Set the Trace ID of the AllException instance.
   * @param traceId A string representing the Trace ID.
   */
  setTraceId = (traceId: string) => {
    this.traceId = traceId;
  };

  /**
   * Set the error of the AllException instance.
   * @param error An object representing the error.
   */
  setError = (error: unknown) => {
    this.error = error;
  };

  /**
   * Generate an HTTP response body representing the AllException instance.
   * @param message A string representing the message to include in the response body.
   * @returns An object representing the HTTP response body.
   */
  generateHttpResponseBody = (message?: string): IHttpAllExceptionResponse => {
    return {
      code: this.code,
      message: message || this.message,
      description: this.description,
      error: this.error,
      timestamp: this.timestamp,
      traceId: this.traceId,
    };
  };

  /**
   * Returns a new instance of BadRequestException representing an Unexpected Error.
   * @param msg A string representing the error message.
   * @returns An instance of BadRequestException representing the error.
   */
  static UNEXPECTED = (msg?: string) => {
    return new AllException({
      message: msg || 'Unexpected Error',
      code: ExceptionConstants.InternalServerErrorCodes.UNEXPECTED_ERROR,
    });
  };
}
