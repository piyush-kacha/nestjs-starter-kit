/**
 * A custom exception that represents a BadRequest error.
 */

// Import required modules
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';

// Import internal modules
import { ExceptionConstants } from './exceptions.constants';
import { IException, IHttpBadRequestExceptionResponse } from './exceptions.interface';

export class BadRequestException extends HttpException {
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
    example: 'Bad Request',
  })
  message: string; // Message for the exception

  @ApiProperty({
    description: 'A description of the error message.',
    example: 'The input provided was invalid',
  })
  description: string; // Description of the exception

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

  /**
   * Constructs a new BadRequestException object.
   * @param exception An object containing the exception details.
   *  - message: A string representing the error message.
   *  - cause: An object representing the cause of the error.
   *  - description: A string describing the error in detail.
   *  - code: A number representing internal status code which helpful in future for frontend
   */
  constructor(exception: IException) {
    super(exception.message, HttpStatus.BAD_REQUEST, {
      cause: exception.cause,
      description: exception.description,
    });
    this.message = exception.message;
    this.cause = exception.cause;
    this.description = exception.description;
    this.code = exception.code;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Set the Trace ID of the BadRequestException instance.
   * @param traceId A string representing the Trace ID.
   */
  setTraceId = (traceId: string) => {
    this.traceId = traceId;
  };

  /**
   * Generate an HTTP response body representing the BadRequestException instance.
   * @param message A string representing the message to include in the response body.
   * @returns An object representing the HTTP response body.
   */
  generateHttpResponseBody = (message?: string): IHttpBadRequestExceptionResponse => {
    return {
      code: this.code,
      message: message || this.message,
      description: this.description,
      timestamp: this.timestamp,
      traceId: this.traceId,
    };
  };

  /**
   * Returns a new instance of BadRequestException representing an HTTP Request Timeout error.
   * @returns An instance of BadRequestException representing the error.
   */
  static HTTP_REQUEST_TIMEOUT = () => {
    return new BadRequestException({
      message: 'HTTP Request Timeout',
      code: ExceptionConstants.BadRequestCodes.HTTP_REQUEST_TIMEOUT,
    });
  };

  /**
   * Create a BadRequestException for when a resource already exists.
   * @param {string} [msg] - Optional message for the exception.
   * @returns {BadRequestException} - A BadRequestException with the appropriate error code and message.
   */
  static RESOURCE_ALREADY_EXISTS = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Resource Already Exists',
      code: ExceptionConstants.BadRequestCodes.RESOURCE_ALREADY_EXISTS,
    });
  };

  /**
   * Create a BadRequestException for when a resource is not found.
   * @param {string} [msg] - Optional message for the exception.
   * @returns {BadRequestException} - A BadRequestException with the appropriate error code and message.
   */
  static RESOURCE_NOT_FOUND = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Resource Not Found',
      code: ExceptionConstants.BadRequestCodes.RESOURCE_NOT_FOUND,
    });
  };

  /**
   * Returns a new instance of BadRequestException representing a Validation Error.
   * @param msg A string representing the error message.
   * @returns An instance of BadRequestException representing the error.
   */
  static VALIDATION_ERROR = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Validation Error',
      code: ExceptionConstants.BadRequestCodes.VALIDATION_ERROR,
    });
  };

  /**
   * Returns a new instance of BadRequestException representing an Unexpected Error.
   * @param msg A string representing the error message.
   * @returns An instance of BadRequestException representing the error.
   */
  static UNEXPECTED = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Unexpected Error',
      code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
    });
  };

  /**
   * Returns a new instance of BadRequestException representing an Invalid Input.
   * @param msg A string representing the error message.
   * @returns An instance of BadRequestException representing the error.
   */
  static INVALID_INPUT = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Invalid Input',
      code: ExceptionConstants.BadRequestCodes.INVALID_INPUT,
    });
  };
}
